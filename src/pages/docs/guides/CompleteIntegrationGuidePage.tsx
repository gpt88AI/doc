import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

const FIVE_STEP_FLOW = `1. 注册并登录 gpt88.cc 控制台
2. 创建一把 API Key，并立刻保存完整 Key
3. 选择接入风格：OpenAI 兼容 / Claude 兼容 / Gemini 原生图片
4. 按工具填入 Base URL、API Key、默认模型
5. 发一条最小请求，再到控制台核对用量与扣费`

const BASE_URL_RULES = `OpenAI 兼容工具
  Base URL: https://gpt88.cc/v1
  典型工具: OpenAI SDK、Codex CLI、Cursor、OpenCode、cURL

Claude / Anthropic 兼容工具
  Base URL: https://gpt88.cc
  典型工具: Claude Code、Anthropic SDK、OpenClaw

Google / Gemini 图片生成
  Base URL: https://china.claudecoder.me
  Endpoint: /v1beta/models/{MODEL}:generateContent

海外可选
  海外直连: https://aiapi.up.railway.app/v1
  海外 CDN: https://ai.orbitlink.me/v1`

const CURL_SMOKE_TEST = `export GPT88_API_KEY="sk-你的-gpt88-api-key"

curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const OPENAI_ENV = `# OpenAI 风格客户端常见环境变量
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://gpt88.cc/v1"`

const CLAUDE_ENV = `# Claude / Anthropic 风格客户端常见环境变量
export ANTHROPIC_AUTH_TOKEN="$GPT88_API_KEY"
export ANTHROPIC_BASE_URL="https://gpt88.cc"

# 如果客户端读取 ANTHROPIC_API_KEY，也可以同步设置
export ANTHROPIC_API_KEY="$GPT88_API_KEY"`

const CODEX_CONFIG = `# ~/.codex/config.toml
model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://gpt88.cc/v1"
wire_api = "responses"
requires_openai_auth = true`

const CLAUDE_CODE_CONFIG = `// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://gpt88.cc",
    "ANTHROPIC_AUTH_TOKEN": "你的 gpt88.cc API Key",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`

const USAGE_CHECKLIST = `排查一次请求为什么贵，按这个顺序看：

1. 看模型：是不是用了更贵的大模型
2. 看输入 Token：长对话、代码上下文、工具结果会快速堆高 prompt
3. 看输出 Token：模型输出越长，成本越高
4. 看接口类型：图片、音频、视频可能不是纯 token 计费
5. 看 API Key：是不是某个客户端或脚本在循环调用
6. 看 request_id：需要客服排查时一定要带上`

const TROUBLESHOOTING = `401 invalid_api_key
  检查 Authorization 是否带 Bearer、Key 是否完整、是否用了 gpt88.cc 的 Key。

403 permission_denied
  当前 Key 没有该模型或接口权限，到控制台检查模型权限。

429 rate_limit_exceeded
  触发限速或额度保护，降低并发，按 Retry-After 或 retry_after_seconds 重试。

429 insufficient_quota
  余额或额度不足，到控制台充值或调整配额。

404 model_not_found
  模型名拼错或已下架，先调用 GET /v1/models 刷新本地模型列表。

413 payload_too_large
  请求体过大，压缩图片、裁剪历史消息或拆分请求。

503 service_unavailable / upstream_error
  上游拥塞或临时不可用，退避重试，必要时换模型或线路。

请求很慢
  先区分是网络慢、模型慢、上下文太长，还是流式首 token 慢。`

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
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CompleteIntegrationGuidePage() {
  return (
    <DocPage
      path="/docs/guides/complete-integration"
      title="完整接入手册"
      description="从注册、API Key、Base URL、客户端配置、用量核对到错误排查，一篇教程跑通 gpt88.cc 的完整接入流程。"
      headings={[
        { id: 'goal', text: '这篇手册解决什么问题', level: 2 },
        { id: 'five-steps', text: '5 步完成第一次接入', level: 2 },
        { id: 'concepts', text: '先理解 6 个核心概念', level: 2 },
        { id: 'base-url', text: 'Base URL 选择规则', level: 2 },
        { id: 'clients', text: '按客户端接入', level: 2 },
        { id: 'codex-cli', text: 'Codex CLI', level: 3 },
        { id: 'claude-code', text: 'Claude Code', level: 3 },
        { id: 'openai-sdk', text: 'OpenAI SDK / Cursor / OpenCode', level: 3 },
        { id: 'usage', text: '用量记录与成本排查', level: 2 },
        { id: 'errors', text: '常见错误速查', level: 2 },
        { id: 'best-practices', text: '上线前最佳实践', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="适合第一次接入或迁移用户">
        <p>
          如果你正在从其他中转站、官方 OpenAI / Anthropic API、Claude Code、Codex CLI、
          Cursor 或 OpenCode 迁移到 gpt88.cc，可以先按本文完成一遍端到端接入。
        </p>
      </Callout>

      <h2 id="goal">这篇手册解决什么问题</h2>
      <p>
        很多接入问题不是模型本身导致的，而是 <strong>Base URL 形态</strong>、
        <strong>客户端读取的环境变量</strong>、<strong>API Key 权限</strong>、
        <strong>用量与限速配置</strong> 没有对齐。本文把这些问题串成一条路径：
        先跑通，再分工具接入，最后学会看用量和排错。
      </p>

      <h2 id="five-steps">5 步完成第一次接入</h2>
      <CodeBlock lang="text" filename="integration flow" code={FIVE_STEP_FLOW} />
      <p>
        最快的验证方式是先用 cURL 发一条最小请求。只要 cURL 能通，说明 Key、余额、模型和线路基本可用；
        如果某个客户端失败，再回头检查客户端配置。
      </p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={CURL_SMOKE_TEST} />

      <h2 id="concepts">先理解 6 个核心概念</h2>
      <DocTable
        headers={['概念', '你需要知道什么', '常见误区']}
        rows={[
          [
            <strong key="c1">控制台</strong>,
            '创建 API Key、查看余额、管理用量、配置模型权限和线路。',
            '不要把控制台登录态当成 API Key，服务端调用仍要 Bearer Token。',
          ],
          [
            <strong key="c2">API Key</strong>,
            '每个项目、客户端或环境建议单独建 Key，方便停用、限额和查账。',
            '不要多个团队共用一把 Key，否则用量和事故很难定位。',
          ],
          [
            <strong key="c3">Base URL</strong>,
            'OpenAI 风格通常带 /v1；Claude / Anthropic 风格通常用根地址。',
            '把 /v1 填到 Claude Code，或把根地址填到 OpenAI SDK，是最常见配置错误。',
          ],
          [
            <strong key="c4">模型 ID</strong>,
            '请求体里的 model 必须使用当前账号可用的真实模型 ID。',
            '凭记忆手打模型名容易 404，建议从模型导航或 /v1/models 复制。',
          ],
          [
            <strong key="c5">Token 电力</strong>,
            'gpt88.cc 更偏向按真实人民币余额和实际 Token 消耗计费。',
            '不要用传统积分盘的倍率思维理解每次请求成本。',
          ],
          [
            <strong key="c6">Request ID</strong>,
            '每次请求的唯一标识，排查扣费、延迟、上游错误时非常关键。',
            '联系客服只说“报错了”很难定位，最好带时间、模型、Key 后缀和 request_id。',
          ],
        ]}
      />

      <h2 id="base-url">Base URL 选择规则</h2>
      <p>
        先判断你的工具原本是 OpenAI 风格，还是 Claude / Anthropic 风格。不要只看模型名字，
        要看客户端期待的接口路径。
      </p>
      <CodeBlock lang="text" filename="base-url-rules" code={BASE_URL_RULES} />

      <h2 id="clients">按客户端接入</h2>
      <DocTable
        headers={['客户端', '接口风格', '推荐 Base URL', '关键配置']}
        rows={[
          ['cURL', 'OpenAI 兼容', <code key="curl">https://gpt88.cc/v1</code>, '最快验证连通性，适合排查 Key 和模型。'],
          ['OpenAI Python / Node SDK', 'OpenAI 兼容', <code key="sdk">https://gpt88.cc/v1</code>, '只改 base_url / baseURL 和 api_key。'],
          ['Codex CLI', 'OpenAI 兼容', <code key="codex">https://gpt88.cc/v1</code>, '配置 ~/.codex/config.toml 和 ~/.codex/auth.json。'],
          ['Cursor / OpenCode', 'OpenAI 兼容', <code key="cursor">https://gpt88.cc/v1</code>, '选择 OpenAI compatible provider，填 gpt88 Key。'],
          ['Claude Code', 'Claude 兼容', <code key="claude">https://gpt88.cc</code>, '设置 ANTHROPIC_BASE_URL 和 ANTHROPIC_AUTH_TOKEN。'],
          ['Gemini 图片生成', 'Gemini 原生', <code key="gemini">https://china.claudecoder.me</code>, '调用 /v1beta/models/:generateContent。'],
        ]}
      />

      <h3 id="codex-cli">Codex CLI</h3>
      <p>
        Codex CLI 属于 OpenAI 风格客户端。建议单独创建一把 Key，并给它设置合理限额，避免 Agent
        循环调用导致预算失控。
      </p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={CODEX_CONFIG} />
      <CodeBlock lang="bash" filename="openai env" code={OPENAI_ENV} />

      <h3 id="claude-code">Claude Code</h3>
      <p>
        Claude Code 使用 Anthropic 风格接口，Base URL 不带 <code>/v1</code>。
        如果你发现它仍然要求 OAuth 登录，先确认是否读到了自定义环境变量。
      </p>
      <CodeBlock lang="json" filename="~/.claude/settings.json" code={CLAUDE_CODE_CONFIG} />
      <CodeBlock lang="bash" filename="anthropic env" code={CLAUDE_ENV} />

      <h3 id="openai-sdk">OpenAI SDK / Cursor / OpenCode</h3>
      <p>
        这些工具通常只需要两个字段：<code>base_url</code> 和 <code>api_key</code>。
        如果它们支持自定义 OpenAI provider，就优先选择 OpenAI compatible，而不是写死官方 OpenAI endpoint。
      </p>
      <p>
        更完整的 Python / Node 示例见 <Link to="/docs/sdk/python">Python SDK</Link> 和{' '}
        <Link to="/docs/sdk/nodejs">Node.js SDK</Link>。
      </p>

      <h2 id="usage">用量记录与成本排查</h2>
      <p>
        跑通之后，下一步不是马上上生产，而是去控制台查看这次请求的用量记录：
        确认模型、Token、扣费来源、API Key、接口类型是否符合预期。
      </p>
      <CodeBlock lang="text" filename="usage checklist" code={USAGE_CHECKLIST} />
      <Callout tone="tip" title="给每个客户端单独建 Key">
        <p>
          单独 Key 的好处是非常现实的：某个 IDE 插件、Agent 脚本或服务端任务突然暴增用量时，
          你可以立刻停用那一把 Key，而不会影响其他项目。
        </p>
      </Callout>

      <h2 id="errors">常见错误速查</h2>
      <CodeBlock lang="text" filename="error quick reference" code={TROUBLESHOOTING} />
      <p>
        完整错误结构、HTTP 状态码和重试策略见 <Link to="/docs/api/errors">错误码</Link>。
      </p>

      <h2 id="best-practices">上线前最佳实践</h2>
      <ul>
        <li>生产、测试、本地开发分别使用不同 API Key。</li>
        <li>每个 Key 设置用途名称，例如 <code>codex-macbook</code>、<code>web-prod</code>。</li>
        <li>服务端使用环境变量或 Secret Manager，不要把 Key 写进前端。</li>
        <li>上线前设置日限额、并发控制和失败告警。</li>
        <li>长任务和 Agent 工作流默认开启流式输出，并设置 60-180 秒超时。</li>
        <li>记录 <code>request_id</code>，把它写入服务端日志，方便后续排查。</li>
        <li>从 <code>GET /v1/models</code> 动态刷新模型列表，避免模型下架后客户端继续请求。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li>
          只想快速跑通：看 <Link to="/docs/quickstart">快速开始</Link>。
        </li>
        <li>
          想把配置导入 Claude Code / Cursor / Codex：看{' '}
          <Link to="/docs/guides/config-export">配置文件导出</Link>。
        </li>
        <li>
          想理解人民币余额和 Token 电力：看 <Link to="/docs/auth">认证与计费</Link>。
        </li>
        <li>
          想挑模型：去 <Link to="/models">模型导航</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
