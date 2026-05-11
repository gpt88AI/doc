import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * SDK 示例：cURL
 *
 * 把"先验证一下、再做更复杂的事"这条线拉直：
 * 1. 检查环境变量；
 * 2. 列模型；
 * 3. 发一次最简调用；
 * 4. 流式调用；
 * 5. 错误处理 + 重试模式（用 shell 脚本演示）。
 */

const CHECK = `# 1. 准备 API Key
export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# 2. 检查 API 是否可达（鉴权 + 网络）
curl -s -o /dev/null -w "%{http_code}\\n" \\
  https://gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"
# 期望输出：200`

const LIST = `curl https://gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY" | jq '.data[].id'`

const CHAT = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "messages": [
      {"role": "system", "content": "You are a concise assistant."},
      {"role": "user", "content": "用 30 字介绍一下 gpt88.cc"}
    ]
  }'`

const STREAM = `# -N 关闭输出缓冲，按行实时打印 SSE
curl -N https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "stream": true,
    "messages": [{"role": "user", "content": "讲一个关于 API 网关的冷笑话"}]
  }'`

const RETRY = `#!/usr/bin/env bash
# 简单的 429/5xx 退避重试示例
set -euo pipefail

call() {
  curl -sS -w "\\n%{http_code}" \\
    https://gpt88.cc/v1/chat/completions \\
    -H "Authorization: Bearer $GPT88_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d "$1"
}

PAYLOAD='{"model":"claude-opus-4-7","messages":[{"role":"user","content":"hi"}]}'

for i in 1 2 3; do
  RESP=$(call "$PAYLOAD")
  CODE=$(echo "$RESP" | tail -n1)
  BODY=$(echo "$RESP" | sed '$d')

  if [ "$CODE" -lt 400 ]; then
    echo "$BODY"
    exit 0
  fi

  # 仅对可重试错误做退避
  case "$CODE" in
    408|429|500|502|503|504)
      sleep $((2 ** (i - 1)))
      ;;
    *)
      echo "Non-retryable error $CODE: $BODY" >&2
      exit 1
      ;;
  esac
done

echo "Exhausted retries" >&2
exit 1`

export default function CurlSdkPage() {
  return (
    <DocPage
      path="/docs/sdk/curl"
      title="cURL 示例"
      description="所有 gpt88.cc API 都可以直接用 cURL 调用，方便快速验证、写 shell 脚本或在 CI 里做健康检查。"
      headings={[
        { id: 'check', text: '健康检查', level: 2 },
        { id: 'list', text: '列模型', level: 2 },
        { id: 'chat', text: '调用 chat/completions', level: 2 },
        { id: 'stream', text: '流式响应', level: 2 },
        { id: 'retry', text: '退避重试脚本', level: 2 },
      ]}
    >
      <h2 id="check">健康检查</h2>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 这里在第一段示例代码上方加一行简短引导，强调 sk-xxx 占位符要替换成真实 Key 来源。
       */}
      <p>把环境准备好，确认 API Key 与网络都没问题：</p>
      <p className="text-sm text-ink-400">
        将下方脚本里的 <code>sk-xxx</code> 替换为你在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台创建的 API Key。
      </p>
      <CodeBlock lang="bash" filename="check.sh" code={CHECK} />

      <Callout tone="warn" title="不要把 API Key 放进客户端代码">
        <p>
          浏览器与 App 客户端无法妥善保管 secret。生产环境请走自有后端转发，
          只有在 server-side 进程内使用 <code>GPT88_API_KEY</code> 环境变量。
        </p>
      </Callout>

      <h2 id="list">列模型</h2>
      <p>
        组合 <code>jq</code> 提取 ID，便于在脚本中按需挑选：
      </p>
      <CodeBlock lang="bash" code={LIST} />

      <h2 id="chat">调用 chat/completions</h2>
      <CodeBlock lang="bash" code={CHAT} />
      <p>
        响应字段与 OpenAI 一致；完整字段定义见{' '}
        <Link to="/docs/api/chat-completions">POST /v1/chat/completions</Link>。
      </p>

      <h2 id="stream">流式响应</h2>
      <CodeBlock lang="bash" code={STREAM} />

      <h2 id="retry">退避重试脚本</h2>
      <p>
        生产场景中务必处理 <code>429</code> / <code>5xx</code>。下面是一个最小可运行的
        bash 重试模板，方便嵌入 CI 或排障会话：
      </p>
      <CodeBlock lang="bash" filename="call.sh" code={RETRY} />
      <p>
        关于错误码与各自的处理建议，请参阅{' '}
        <Link to="/docs/api/errors">错误码</Link> 页。
      </p>
    </DocPage>
  )
}
