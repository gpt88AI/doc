import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { localizePath, useLocale } from '../../../lib/locale'
import AsyncImageGenerationNoticePageEn from '../../en/AsyncImageGenerationNoticePageEn'

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
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={'border-t border-white/5 align-top' + (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ENDPOINTS = `异步生图入口
  提交任务：POST https://img.gpt88.cc/v1/images/generations
  查询任务：GET  https://img.gpt88.cc/v1/images/generations/{task_id}
  最终结果：data[0].url 或 data[0].b64_json，具体以实际响应为准`

export default function AsyncImageGenerationNoticePage() {
  const { locale } = useLocale()

  if (locale === 'en') return <AsyncImageGenerationNoticePageEn />

  return (
    <DocPage
      path="/docs/guides/async-image-generation-notice/"
      title="异步生图支持公告"
      description="GPT88 图片 API 增加异步生图接入说明：提交任务、保存 task_id、轮询状态并获取最终图片，不必让原始 HTTP 请求一直等待。"
      headings={[
        { id: 'date', text: '发布时间', level: 2 },
        { id: 'what-changed', text: '这次支持什么', level: 2 },
        { id: 'entry-points', text: '接口入口', level: 2 },
        { id: 'when', text: '什么时候使用异步', level: 2 },
        { id: 'compatibility', text: '响应字段与兼容处理', level: 2 },
        { id: 'migration', text: '迁移清单', level: 2 },
        { id: 'notes', text: '重要注意事项', level: 2 },
      ]}
    >
      <Callout tone="tip" title="先看结论">
        <p>
          异步生图是一条三步链路：提交任务、轮询任务 ID、获取完成后的图片。原有同步图片请求仍然可以继续使用；
          当任务耗时较长、图片尺寸较大、客户端有超时限制，或你已经有任务队列时，优先使用异步模式。
        </p>
      </Callout>

      <h2 id="date">发布时间</h2>
      <p>发布时间：<strong>2026 年 8 月 5 日</strong>。本文说明稳定的客户端工作流；动态的模型限制、价格、额度和具体响应字段仍以实时 API 返回为准。</p>

      <h2 id="what-changed">这次支持什么</h2>
      <p>
        图片生成可以作为后台任务接入。你的服务端不需要一直保持原始 HTTP 请求直到图片生成完成，而是先记录任务 ID，
        后续再查询任务状态并处理结果。
      </p>
      <DocTable
        headers={['以前的处理方式', '异步处理方式', '带来的好处']}
        rows={[
          ['一条请求一直等待图片返回', '任务接受后立即结束提交请求', '降低网关、代理和 Serverless 超时压力。'],
          ['把每个响应都当成最终图片', '区分 accepted、processing、succeeded、failed 等状态', '避免把任务对象误当成图片数据。'],
          ['请求超时就重新生成', '已有 task_id 时继续轮询', '减少重复生成和意外增加用量。'],
          ['提交响应一回来就下载', '任务到达终态后再处理图片', '把任务编排和文件处理拆开，代码更容易恢复。'],
        ]}
      />

      <h2 id="entry-points">接口入口</h2>
      <CodeBlock lang="text" filename="async-image-endpoints" code={ENDPOINTS} />
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/generations" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/images/generations/{task_id}" />
      <p>
        提交任务仍然使用图片生成接口。异步开关和任务响应的外层 JSON 结构可能随模型或灰度版本变化，下面的详细教程会采用
        兼容式解析，不把某一个上游字段结构硬编码成唯一答案。
      </p>

      <h2 id="when">什么时候使用异步</h2>
      <DocTable
        headers={['场景', '建议', '取舍']}
        rows={[
          ['单张小尺寸预览、交互式页面', '先使用同步生图', '代码简单，但前端要承受更长的请求等待。'],
          ['高分辨率封面、海报、主视觉', '优先异步生图', '需要维护任务状态，但抗超时能力更好。'],
          ['批量图片任务', '异步 + 持久化任务表', '要额外管理并发、重试、结果保存和失败恢复。'],
          ['大参考图上传、图生图编辑', '客户端超时较短时优先异步', '任务可能已接受，但最终图片还没有生成好。'],
          ['Worker 队列或定时工作流', '把异步作为默认边界', '会增加轮询请求，需要明确停止条件。'],
        ]}
      />

      <h2 id="compatibility">响应字段与兼容处理</h2>
      <p>
        稳定的概念是“任务生命周期”，而不是某一个供应商的固定 JSON。客户端应兼容从 <code>task_id</code> 或
        <code>id</code> 读取任务 ID，从顶层或嵌套 <code>data</code> 读取状态，并在结果对象里查找最终 URL 或 base64 图片。
      </p>
      <CodeBlock
        lang="json"
        filename="lifecycle-shapes.json"
        code={String.raw`// 下面是兼容式示例，实际字段请以当前模型返回为准。
{ "task_id": "imgtask_123", "status": "queued" }
{ "data": { "task_id": "imgtask_123", "status": "processing", "progress": 42 } }
{ "data": { "task_id": "imgtask_123", "status": "succeeded", "result_url": "https://.../image.png" } }
{ "data": { "task_id": "imgtask_123", "status": "failed", "error": { "message": "..." } }}`}
      />
      <Callout tone="warn" title="不要只看 progress 判断成功">
        <p>
          <code>100</code> 或 <code>100%</code> 只代表流程可能已经结束，不足以证明图片可下载。只有任务状态是成功终态，
          并且存在可用图片 URL 或图片 payload 时，才应把任务标记为成功。
        </p>
      </Callout>

      <h2 id="migration">迁移清单</h2>
      <ol>
        <li>保留现有同步请求，把它作为小尺寸预览路径。</li>
        <li>增加异步提交路径，并持久化 <code>task_id</code>、模型、prompt 哈希和提交时间。</li>
        <li>实现有最大间隔和最大时长限制的轮询逻辑。</li>
        <li>分别处理成功、失败、取消、超时、HTTP 错误和异常 JSON。</li>
        <li>出现结果 URL 后尽快下载或转存；不要把临时 URL 当作永久存储。</li>
        <li>在提高并发或批量规模前，到控制台核对真实用量。</li>
      </ol>

      <h2 id="notes">重要注意事项</h2>
      <ul>
        <li>API Key 只放在服务端或 Worker，不要暴露在浏览器 JavaScript、移动端安装包或公开仓库里。</li>
        <li>提交请求已经返回 task_id 时，即使客户端随后超时，也不要直接无脑重新提交同一 prompt。</li>
        <li>轮询遇到临时网络错误或限流时，使用退避后继续查询原 task_id。</li>
        <li>失败、重试、异步、图片和视频的记账行为可能不同，不要自行假设失败一定退款，应该查看用量明细。</li>
        <li>完整的 cURL、Node.js、Python、排错和生产清单，请阅读<Link className="ml-1" to={localizePath('/docs/guides/async-image-generation-guide/', locale)}>异步生图详细教程</Link>。</li>
        <li>同步图片请求字段请参考<Link className="ml-1" to={localizePath('/docs/api/images/', locale)}>图片生成 API</Link>。</li>
      </ul>
    </DocPage>
  )
}
