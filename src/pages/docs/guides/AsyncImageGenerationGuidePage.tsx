import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'
import { localizePath, useLocale } from '../../../lib/locale'
import AsyncImageGenerationGuidePageEn from '../../en/AsyncImageGenerationGuidePageEn'

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => <th key={header} className="px-4 py-2.5 font-medium">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={'border-t border-white/5 align-top' + (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SUBMIT_CURL = String.raw`export GPT88_API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://img.gpt88.cc"

curl -sS -X POST "$BASE_URL/v1/images/generations" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "高级电商护肤品主图，玻璃瓶身，白色石材台面，柔和晨光，干净高级构图，无文字，无水印",
    "size": "1024x1024",
    "quality": "high",
    "n": 1,
    "async": true
  }' | tee create.json

# 兼容顶层 task_id / id 和嵌套 data.task_id / data.id。
TASK_ID=$(jq -r '.task_id // .id // .data.task_id // .data.id // empty' create.json)
test -n "$TASK_ID" || { echo "没有返回 task ID："; cat create.json; exit 1; }
echo "created task: $TASK_ID"`

const POLL_CURL = String.raw`MAX_ATTEMPTS=60
INTERVAL_SECONDS=5

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  curl -sS "$BASE_URL/v1/images/generations/$TASK_ID" \
    -H "Authorization: Bearer $GPT88_API_KEY" > status.json

  STATUS=$(jq -r '.data.status // .status // .task.status // empty' status.json | tr '[:upper:]' '[:lower:]')
  echo "attempt=$attempt status=$STATUS"

  case "$STATUS" in
    succeeded|success|completed)
      RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
      if [ -n "$RESULT_URL" ]; then
        curl -L "$RESULT_URL" -o async-image.png
        echo "已保存 async-image.png"
        exit 0
      fi
      echo "任务成功但没有找到 URL；请检查 status.json 中是否返回 b64_json 或模型专属结果。" >&2
      exit 2
      ;;
    failed|failure|cancelled|canceled)
      echo "异步生图失败：" >&2
      cat status.json >&2
      exit 3
      ;;
  esac

  sleep "$INTERVAL_SECONDS"
done

echo "轮询超时。保留 TASK_ID=$TASK_ID，稍后继续查询。" >&2
exit 4`

const NODE_EXAMPLE = String.raw`const BASE_URL = "https://img.gpt88.cc";
const API_KEY = process.env.GPT88_API_KEY;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const first = (...values) => values.find(value => value !== undefined && value !== null && value !== "");

function taskIdOf(payload) {
  return first(payload.task_id, payload.id, payload.data?.task_id, payload.data?.id);
}

function statusOf(payload) {
  return String(first(payload.data?.status, payload.status, payload.task?.status, "")).toLowerCase();
}

function resultOf(payload) {
  return first(
    payload.data?.result_url,
    payload.result_url,
    payload.data?.result?.data?.[0]?.url,
    payload.result?.data?.[0]?.url,
    payload.data?.[0]?.url,
    payload.data?.result?.data?.[0]?.b64_json,
    payload.data?.[0]?.b64_json,
  );
}

async function generateAsyncImage(prompt) {
  const createResponse = await fetch(BASE_URL + "/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
      async: true,
    }),
  });

  const created = await createResponse.json();
  if (!createResponse.ok) throw new Error("提交失败：" + JSON.stringify(created));

  const taskId = taskIdOf(created);
  if (!taskId) throw new Error("没有返回 task ID：" + JSON.stringify(created));

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    await sleep(5000);
    const pollResponse = await fetch(BASE_URL + "/v1/images/generations/" + encodeURIComponent(taskId), {
      headers: { Authorization: "Bearer " + API_KEY },
    });
    const payload = await pollResponse.json();
    if (!pollResponse.ok) throw new Error("轮询失败：" + JSON.stringify(payload));

    const status = statusOf(payload);
    if (["succeeded", "success", "completed"].includes(status)) {
      const result = resultOf(payload);
      if (!result) throw new Error("任务成功，但没有 URL 或 base64 结果");
      return { taskId, result, raw: payload };
    }
    if (["failed", "failure", "cancelled", "canceled"].includes(status)) {
      throw new Error("异步生图失败：" + JSON.stringify(payload));
    }
  }

  throw new Error("轮询超时，请保留 task ID 后继续查询：" + taskId);
}

const output = await generateAsyncImage("一盏银色台灯的极简编辑风产品图，暖侧光，无文字");
console.log(output);`

const PYTHON_EXAMPLE = String.raw`import base64
import os
import time
from pathlib import Path

import requests

BASE_URL = "https://img.gpt88.cc"
API_KEY = os.environ["GPT88_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

def first(*values):
    return next((value for value in values if value not in (None, "")), None)

def task_id_of(payload):
    data = payload.get("data") or {}
    return first(payload.get("task_id"), payload.get("id"), data.get("task_id"), data.get("id"))

def status_of(payload):
    data = payload.get("data") or {}
    task = payload.get("task") or {}
    return str(first(data.get("status"), payload.get("status"), task.get("status"), "")).lower()

def result_of(payload):
    data = payload.get("data") or {}
    result = data.get("result") or payload.get("result") or {}
    result_data = result.get("data") or data.get("data") or []
    first_item = result_data[0] if result_data else (data[0] if isinstance(data, list) and data else {})
    return first(data.get("result_url"), payload.get("result_url"), first_item.get("url"), first_item.get("b64_json"))

create = requests.post(
    BASE_URL + "/v1/images/generations",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={
        "model": "gpt-image-2",
        "prompt": "高级电商护肤品主图，玻璃瓶身，柔和晨光，无文字",
        "size": "1024x1024",
        "quality": "high",
        "n": 1,
        "async": True,
    },
    timeout=30,
)
create.raise_for_status()
created = create.json()
task_id = task_id_of(created)
if not task_id:
    raise RuntimeError(f"没有返回 task ID：{created}")

for _ in range(60):
    time.sleep(5)
    response = requests.get(
        BASE_URL + "/v1/images/generations/" + task_id,
        headers=HEADERS,
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    status = status_of(payload)
    if status in {"succeeded", "success", "completed"}:
        result = result_of(payload)
        if not result:
            raise RuntimeError(f"任务成功但没有结果：{payload}")
        if result.startswith("http"):
            image = requests.get(result, timeout=60)
            image.raise_for_status()
            Path("async-image.png").write_bytes(image.content)
        else:
            Path("async-image.png").write_bytes(base64.b64decode(result))
        break
    if status in {"failed", "failure", "cancelled", "canceled"}:
        raise RuntimeError(f"异步生图失败：{payload}")
else:
    raise TimeoutError(f"轮询超时，请保留 task ID：{task_id}")`

const TASK_RECORD = `{
  "task_id": "imgtask_123",
  "model": "gpt-image-2",
  "prompt_hash": "sha256:...",
  "status": "processing",
  "submitted_at": "2026-08-05T10:00:00Z",
  "last_polled_at": "2026-08-05T10:00:15Z",
  "attempts": 3,
  "result_url": null,
  "error": null
}`

const REQUEST_ROWS: FieldRow[] = [
  { name: 'model', type: 'string', required: true, description: <>图片模型 ID，例如 <code>gpt-image-2</code>；请先确认当前账号和模型权限。</> },
  { name: 'prompt', type: 'string', required: true, description: <>图片意图和限制条件。排查轮询问题时先保持 prompt 不变。</> },
  { name: 'size', type: 'string', description: <>使用当前模型支持的尺寸。验证链路时先从小尺寸开始。</> },
  { name: 'quality', type: 'string', description: <>当前模型支持的质量档位。质量越高，任务可能越慢。</> },
  { name: 'n', type: 'integer', description: <>生成数量。先使用 <code>1</code>，单任务稳定后再增加。</> },
  { name: 'async', type: 'boolean', description: <>本文示例用 <code>true</code> 请求异步任务。如果当前模型暴露的是其他开关，以实时接口契约为准。</> },
]

export default function AsyncImageGenerationGuidePage() {
  const { locale } = useLocale()

  if (locale === 'en') return <AsyncImageGenerationGuidePageEn />

  return (
    <DocPage
      path="/docs/guides/async-image-generation-guide/"
      title="异步生图 API 详细教程"
      description="从提交异步图片任务、轮询状态、下载结果，到失败恢复、任务持久化、Node.js / Python 客户端和批量扩展的完整教程。"
      headings={[
        { id: 'purpose', text: '目标与完成标准', level: 2 },
        { id: 'concepts', text: '核心概念', level: 2 },
        { id: 'prerequisites', text: '开始前准备', level: 2 },
        { id: 'shortest-path', text: '最短成功路径', level: 2 },
        { id: 'submit', text: '1. 提交异步生图任务', level: 2 },
        { id: 'poll', text: '2. 轮询直到任务结束', level: 2 },
        { id: 'download', text: '3. 保存图片结果', level: 2 },
        { id: 'sdk', text: 'Node.js 与 Python 客户端', level: 2 },
        { id: 'decisions', text: '模式选择指南', level: 2 },
        { id: 'iteration', text: '迭代与评估循环', level: 2 },
        { id: 'production', text: '生产环境任务记录', level: 2 },
        { id: 'troubleshooting', text: '排错与失败恢复', level: 2 },
        { id: 'practice', text: '练习任务与验收清单', level: 2 },
        { id: 'sources', text: '依据与置信度说明', level: 2 },
      ]}
    >
      <Callout tone="info" title="这篇教程要带你完成什么">
        <p>
          你会提交一张异步图片任务，拿到 task ID，用有上限的循环轮询，并把最终 PNG 或图片 URL 保存下来。
          这条链路稳定后，再把同样的生命周期搬进 Worker、任务队列或批量脚本。
        </p>
      </Callout>

      <h2 id="purpose">目标与完成标准</h2>
      <p>
        本教程面向要把 GPT88 图片 API 接入后端、CLI、定时任务或自动化流程的开发者。它不是提示词教程，重点是可靠地编排图片任务。
      </p>
      <p>满足下面所有条件，就算完成：</p>
      <ul>
        <li>提交响应返回的任务 ID 会被你的服务持久化。</li>
        <li>轮询逻辑能区分处理中、成功和失败。</li>
        <li>成功任务能得到可用图片文件，或明确保存结果 URL。</li>
        <li>超时和临时错误能使用原 task ID 恢复，而不是盲目重新生成。</li>
        <li>你可以凭 task ID 和请求元数据审计用量与失败原因。</li>
      </ul>

      <h2 id="concepts">核心概念</h2>
      <DocTable
        headers={['术语', '含义', '实现规则']}
        rows={[
          ['提交任务', '发送图片意图和生成参数。', '先保存原始响应和任务 ID，再做后续处理。'],
          ['Task ID', '后续查询任务状态的稳定句柄。', '从响应的 task_id 或 id 读取，不要在本地自行伪造。'],
          ['轮询', '重复查询任务，直到任务进入终态。', '设置固定间隔、最大次数，临时错误使用退避。'],
          ['终态', '最终成功、失败或取消状态。', '不要因为 progress 到 100 就直接停止。'],
          ['结果', '最终图片 URL 或 base64 payload。', '尽快下载或解码，并转存到自己的持久化位置。'],
          ['任务记录', '用于编排、恢复和审计的本地数据。', '保存模型、prompt 哈希、时间、尝试次数、状态和错误。'],
        ]}
      />

      <h2 id="prerequisites">开始前准备</h2>
      <ul>
        <li>一个有图片模型权限的 GPT88 API Key。</li>
        <li>以下任一环境：cURL + <code>jq</code>、Node.js 20+，或 Python 3.10+ + <code>requests</code>。</li>
        <li>一个可写的本地目录，或用于保存图片的对象存储位置。</li>
        <li>一条已确定的 prompt 和一个小尺寸测试参数；第一次只生成 1 张。</li>
      </ul>
      <Callout tone="warn" title="先核对当前模型契约">
        <p>
          本文示例使用 <code>POST https://img.gpt88.cc/v1/images/generations</code>、<code>async: true</code> 和
          <code>GET /v1/images/generations/{'{task_id}'}</code>。模型权限、支持字段、响应外层结构和结果保留时间可能变化。
          如果当前模型拒绝某个字段，保留“提交 → 保存 ID → 轮询 → 取结果”的生命周期，但以控制台或实时 API 返回的模型契约为准。
        </p>
      </Callout>

      <h2 id="shortest-path">最短成功路径</h2>
      <ol>
        <li>从环境变量读取 API Key，选择小尺寸、单张请求。</li>
        <li>打开异步模式提交任务，并保存返回的任务 ID。</li>
        <li>每 5 秒轮询一次，设置最大轮询次数。</li>
        <li>任务成功后提取结果 URL 或 base64 图片。</li>
        <li>下载或解码图片、检查文件，并记录本次成功参数。</li>
      </ol>

      <h2 id="submit">1. 提交异步生图任务</h2>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/generations" />
      <FieldTable rows={REQUEST_ROWS} />
      <CodeBlock lang="bash" filename="submit-async-image.sh" code={SUBMIT_CURL} />
      <p>进入轮询前先验证：</p>
      <ul>
        <li><code>create.json</code> 存在，并保留了原始响应。</li>
        <li><code>TASK_ID</code> 非空。</li>
        <li>你记录了模型、prompt 哈希、请求尺寸和提交时间。</li>
      </ul>
      <Callout tone="danger" title="客户端超时不等于任务没有创建">
        <p>
          如果连接在服务端可能已经接受请求后断开，先检查客户端或网关是否暴露了 request ID 或 task ID。
          在不能证明任务没有创建之前，不要立即重新提交同一条高成本生图请求。
        </p>
      </Callout>

      <h2 id="poll">2. 轮询直到任务结束</h2>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/images/generations/{task_id}" />
      <p>
        轮询是一个有边界的控制循环，不是没有间隔的重试循环。小规模测试可以从 5 秒开始；批量 Worker 应根据服务建议和并发量调整间隔。
      </p>
      <CodeBlock lang="bash" filename="poll-async-image.sh" code={POLL_CURL} />
      <DocTable
        headers={['状态类型', '应该怎么做', '不要怎么做']}
        rows={[
          ['queued / submitted', '保留 task ID，继续轮询。', '不要因为暂时没有图片就重新提交。'],
          ['processing / in_progress', '继续轮询，更新 last_polled_at。', '不要因为 result URL 为空就判定失败。'],
          ['succeeded / success / completed', '提取 URL 或 base64，再下载或解码。', '结果 payload 为空时不要标记成功。'],
          ['failed / failure', '保存错误，并判断是否需要改参数后再试。', '不要永远重试完全相同的请求。'],
          ['cancelled / canceled', '记录取消，并由用户或业务决定是否新建任务。', '不要继续无限轮询。'],
        ]}
      />

      <h2 id="download">3. 保存图片结果</h2>
      <p>
        优先把 URL 下载到自己控制的存储。如果响应只返回 <code>b64_json</code>，就在服务端解码成字节并写入文件或对象存储。
        上游 URL 应当被视为交付地址，而不是永久素材库。
      </p>
      <CodeBlock lang="bash" filename="download-result.sh" code={String.raw`RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
if [ -n "$RESULT_URL" ]; then
  curl -L "$RESULT_URL" -o async-image.png
else
  B64=$(jq -r '.data.result.data[0].b64_json // .data[0].b64_json // empty' status.json)
  test -n "$B64" || { echo "没有找到 URL 或 base64 图片" >&2; exit 1; }
  printf '%s' "$B64" | base64 -d > async-image.png
fi
file async-image.png`}
      />
      <p>验证最终文件，而不只是验证 HTTP 状态：</p>
      <ul>
        <li>文件存在且大小大于 0。</li>
        <li>MIME 类型和文件扩展名一致。</li>
        <li>尺寸和裁切符合请求参数。</li>
        <li>图片查看器可以打开，且不是被保存成 <code>.png</code> 的错误页。</li>
      </ul>

      <h2 id="sdk">Node.js 与 Python 客户端</h2>
      <p>
        下面的客户端故意兼容几种常见响应外层结构。API 灰度或不同模型可能返回不同包装时，这种写法更容易先跑通；
        生产模型固定后，再围绕实际字段增加严格 schema 校验。
      </p>
      <CodeBlock lang="typescript" filename="async-image.ts" code={NODE_EXAMPLE} />
      <CodeBlock lang="python" filename="async_image.py" code={PYTHON_EXAMPLE} />

      <h2 id="decisions">模式选择指南</h2>
      <DocTable
        headers={['需求', '建议起点', '原因与取舍']}
        rows={[
          ['快速交互式预览', '同步、n=1、小尺寸', '反馈链路最短，编排代码最少。'],
          ['长耗时或高分辨率成图', '异步、n=1', '更抗请求超时；先把单个任务看清楚。'],
          ['同一 brief 生成多个变体', '先稳定 1 张，再提高 n 或排队', '避免把错误 prompt 批量放大。'],
          ['参考图编辑', '上传或生成较慢时使用异步', '上传、任务状态和最终文件都更容易观察。'],
          ['批量生产', '队列 + 并发上限', '吞吐提高，但用量和重试压力也会上升。'],
          ['不确定模型行为', '先跑一条小探针任务', '先确认支持字段和响应结构，再扩大规模。'],
        ]}
      />
      <p>每次只改一个相关变量：一次改 prompt 的一个字段、尺寸或质量档位，便于判断到底是什么造成了变化。</p>

      <h2 id="iteration">迭代与评估循环</h2>
      <ol>
        <li>根据主体正确性、构图、参考图一致性、格式和成本检查最终文件。</li>
        <li>找出最大的单一缺陷：主体、裁切、风格、文字可读性或技术格式。</li>
        <li>只修改一个相关输入，保持任务提交和轮询代码不变。</li>
        <li>重新提交一条任务，与上一张结果做对比。</li>
        <li>保留、回退，或把获胜的 prompt 和参数组合保存成模板。</li>
      </ol>
      <Callout tone="tip" title="把图片质量和任务可靠性分开评估">
        <p>
          轮询成功不代表 prompt 写得好，图片不好也不代表异步接入坏了。把“传输/任务链路”和“创意/图片质量”分成两项记录，
          不要用改 transport 代码的方式修复创意问题。
        </p>
      </Callout>

      <h2 id="production">生产环境任务记录</h2>
      <p>为每条提交任务保留一条持久化记录，重试、客服排查和用量核对都会简单很多。</p>
      <CodeBlock lang="json" filename="image-task-record.json" code={TASK_RECORD} />
      <ul>
        <li><code>prompt_hash</code> 可以在不把完整 prompt 写进日志的情况下识别重复任务。</li>
        <li><code>attempts</code> 统计轮询次数，不统计盲目重新提交。</li>
        <li><code>result_url</code> 应在归档任务前转存到持久化存储。</li>
        <li><code>error</code> 同时保留上游原始消息和你自己的标准化错误分类。</li>
      </ul>

      <h2 id="troubleshooting">排错与失败恢复</h2>
      <DocTable
        headers={['现象', '可能原因', '最小恢复动作']}
        rows={[
          ['提交响应没有 task ID', '请求被拒绝、响应外层不同或异步字段不被支持。', '保留原始响应，先看 HTTP 状态，再核对当前模型契约。'],
          ['轮询返回 404', 'task ID、查询路径错误，或任务暂时不在该路径可见。', '确认原始返回的 ID 和 endpoint，先不要创建替代任务。'],
          ['轮询返回 401/403', 'Key 缺失、错误，或权限/额度问题。', '检查服务端认证头和账号图片模型权限。'],
          ['大量 429', '轮询或提交过于频繁。', '退避、降低并发，继续使用原 task ID。'],
          ['进度长时间不变', '队列拥塞或模型侧延迟。', '保留最大时长，提交 task ID 做排查，不要复制出多个任务。'],
          ['成功但没有 URL', '结果嵌套、只返回 base64，或响应结构变化。', '记录完整成功 payload，为该模型扩展结果提取器。'],
          ['下载文件打不开', '临时 URL 过期，或下载到的是错误响应正文。', '检查 Content-Type/大小，尽快下载并转存自己的副本。'],
          ['实际扣费高于预期', '重复提交、高质量、n > 1 或账号定价差异。', '按 task/request ID 查看用量，再调整并发。'],
        ]}
      />
      <Callout tone="warn" title="重试规则">
        <p>
          网络传输失败和轮询失败可以退避重试。只有在确认没有任务被接受，或业务规则明确允许新建任务时，才重新生成；task ID 就是恢复句柄。
        </p>
      </Callout>

      <h2 id="practice">练习任务与验收清单</h2>
      <p>使用 <code>n=1</code> 生成一张正方形商品图，保存到本地，然后逐项检查：</p>
      <ul>
        <li>[ ] API Key 从环境变量读取。</li>
        <li>[ ] 轮询前已经保存提交响应。</li>
        <li>[ ] task ID 已持久化并打印，方便恢复。</li>
        <li>[ ] 轮询会在成功、失败、取消或超时时停止。</li>
        <li>[ ] 临时轮询错误不会创建第二条任务。</li>
        <li>[ ] 结果已经下载或解码，并检查文件类型。</li>
        <li>[ ] 原始成功/失败响应可用于客服或调试。</li>
        <li>[ ] 提高尺寸、质量、n 或并发前，已经核对真实用量。</li>
      </ul>
      <p>
        这条链路稳定后，再把同一个函数搬进 Worker，并加上队列。不要在单任务还不可靠、成本还没弄清楚之前就上批量并发。
      </p>

      <h2 id="sources">依据与置信度说明</h2>
      <ul>
        <li>本文入口沿用站内已有的图片 API，并参考站内已有异步视频任务的“创建 → 保存 ID → 轮询 → 取结果”范式。</li>
        <li>任务 ID、轮询、终态、结果提取、有上限的重试等生命周期概念，置信度高。</li>
        <li>异步开关的准确字段、状态拼写、结果外层结构、临时 URL 有效期、限速、价格和模型权限都可能动态变化；兼容 JSON 只是示例，实际接入必须验证实时响应。</li>
        <li>发布摘要请看<Link className="ml-1" to={localizePath('/docs/guides/async-image-generation-notice/', locale)}>异步生图支持公告</Link>；同步字段请看<Link className="ml-1" to={localizePath('/docs/api/images/', locale)}>图片生成 API</Link>。</li>
      </ul>
    </DocPage>
  )
}
