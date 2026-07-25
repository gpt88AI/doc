import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { DocPage } from '../../../components/layout/DocPage'

const CURL_MODELS = `curl https://api.gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"`

const CURL_CHAT = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "kimi-k3",
    "stream": false,
    "messages": [
      {"role": "user", "content": "用三句话介绍 Kimi K3。"}
    ]
  }'`

const CLAUDE_ENV = `export ANTHROPIC_BASE_URL=https://api.gpt88.cc
export ANTHROPIC_API_KEY=你的_GPT88_API_KEY
export ANTHROPIC_MODEL=kimi-k3

claude`

const CODEX_CONFIG = `# ~/.codex/config.toml
model = "kimi-k3"
model_provider = "gpt88"

[model_providers.gpt88]
name = "gpt88"
base_url = "https://api.gpt88.cc/v1"
env_key = "GPT88_API_KEY"`

const CODEX_ENV = `export GPT88_API_KEY=你的_GPT88_API_KEY
codex --model kimi-k3`

export default function KimiK3GuidePage() {
  return (
    <DocPage
      path="/docs/guides/kimi-k3-guide"
      title="Kimi K3 使用教程：Base URL、Claude Code 与 Codex 配置"
      description="使用 gpt88.cc 接入 Kimi K3 的完整教程，包含 API 验证、Base URL 选择、Claude Code、Codex CLI 配置和 FailedToOpenSocket 排查。"
      headings={[
        { id: 'answer', text: '先给结论', level: 2 },
        { id: 'prerequisites', text: '准备工作', level: 2 },
        { id: 'verify-api', text: '先验证 API 是否可用', level: 2 },
        { id: 'claude-code', text: 'Claude Code 配置', level: 2 },
        { id: 'codex', text: 'Codex CLI 配置', level: 2 },
        { id: 'choose', text: 'Claude 还是 Codex', level: 2 },
        { id: 'troubleshoot', text: 'FailedToOpenSocket 排查', level: 2 },
        { id: 'checklist', text: '验收清单', level: 2 },
      ]}
    >
      <Callout tone="tip" title="最短成功路径">
        <p>
          先用 <code>https://api.gpt88.cc</code> 验证 API Key 和模型权限；请求体的模型 ID 固定写成 <code>kimi-k3</code>。确认 cURL 成功后，再配置 Claude Code 或 Codex。这样可以把“接口不可用”和“客户端不认识模型”分开定位。
        </p>
      </Callout>

      <h2 id="answer">先给结论</h2>
      <p>
        在 GPT88 中接入 Kimi K3 时，模型 ID 是 <code>kimi-k3</code>。Base URL 根据客户端的协议约定填写：
      </p>
      <ul>
        <li><strong>OpenAI 兼容 SDK、cURL：</strong><code>https://api.gpt88.cc</code>，完整请求路径是 <code>/v1/chat/completions</code>。</li>
        <li><strong>Codex CLI：</strong><code>https://api.gpt88.cc/v1</code>，因为 Codex 的 provider 配置通常会在 Base URL 后拼接 OpenAI 路径。</li>
        <li><strong>Claude Code：</strong><code>https://api.gpt88.cc</code>，使用 Claude Code 所需的 Anthropic 兼容配置；具体能否使用 K3，取决于当前线路是否开放该模型及客户端版本是否允许自定义模型 ID。</li>
      </ul>
      <Callout tone="warn" title="不要把 /v1 重复拼接">
        <p>
          如果某个客户端的配置项叫“API endpoint”并且它要求完整接口地址，就填写 <code>https://api.gpt88.cc/v1/chat/completions</code>。如果配置项叫“Base URL”，通常只填写上面的 Base URL。错误地填写成 <code>https://api.gpt88.cc/v1/v1/chat/completions</code> 会导致请求失败。
        </p>
      </Callout>

      <h2 id="prerequisites">准备工作</h2>
      <ol>
        <li>在 GPT88 控制台创建 API Key，并把它放进环境变量，不要写入 Git 仓库或前端代码。</li>
        <li>确认账户有余额或可用额度，并确认当前 Key 已开放 <code>kimi-k3</code>。</li>
        <li>准备支持自定义 OpenAI 或 Anthropic endpoint 的客户端版本。客户端的“模型选择器”不一定包含 Kimi K3，因此不能只依赖下拉菜单。</li>
      </ol>
      <CodeBlock lang="bash" filename="terminal" code="export GPT88_API_KEY=你的_GPT88_API_KEY" />

      <h2 id="verify-api">先验证 API 是否可用</h2>
      <p>
        先查询模型列表。返回结果里能看到 <code>kimi-k3</code>，说明当前 API Key 至少能够发现该模型：
      </p>
      <CodeBlock lang="bash" filename="list-models" code={CURL_MODELS} />
      <p>然后发送最小对话请求：</p>
      <CodeBlock lang="bash" filename="chat-completions" code={CURL_CHAT} />
      <p>
        成功标准是返回 JSON，并且 <code>choices[0].message.content</code> 中包含模型回答。若这一步失败，先不要继续改 Claude Code 或 Codex 配置；请记录 HTTP 状态码和错误正文，再检查 API Key、余额、模型权限和请求路径。
      </p>
      <p>
        也可以打开 <Link to="/models/kimi-k3/">Kimi K3 模型详情页</Link>，或查看 <Link to="/docs/api/errors/">错误码参考</Link>。
      </p>

      <h2 id="claude-code">Claude Code 配置</h2>
      <p>
        Claude Code 适合在已经习惯 Claude 工作流的项目中使用。它的配置重点是 Anthropic 兼容 Base URL、API Key 和模型名：
      </p>
      <CodeBlock lang="bash" filename="Claude Code" code={CLAUDE_ENV} />
      <p>
        启动后，在客户端的模型选择命令中输入 <code>kimi-k3</code>。如果客户端把模型名限定为官方 Claude 列表，单纯输入模型名可能被拒绝；此时先升级客户端，再检查是否支持自定义 model ID，或改用下方的 Codex CLI / OpenAI 兼容客户端验证。
      </p>
      <Callout tone="info" title="Claude Code 与 OpenAI Base URL 不是同一协议">
        <p>
          Claude Code 的 Base URL 配置不能机械照抄 Codex 的 <code>/v1</code>。Claude Code 走 Anthropic 兼容请求，Codex 走 OpenAI 兼容请求；客户端会使用不同的路径、请求头和请求体。最可靠的判断方式是先完成上面的 cURL 验证，再确认当前 GPT88 线路是否为 Claude Code 提供兼容入口。
        </p>
      </Callout>

      <h2 id="codex">Codex CLI 配置</h2>
      <p>
        如果目标是代码库分析、终端执行和长任务编程，优先使用 Codex。把 GPT88 注册成一个 OpenAI 兼容 provider，并将模型设为 <code>kimi-k3</code>：
      </p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={CODEX_CONFIG} />
      <p>在 shell 中提供 API Key，然后启动：</p>
      <CodeBlock lang="bash" filename="terminal" code={CODEX_ENV} />
      <p>
        如果 Codex 版本使用不同的配置键名，以该版本的配置说明为准，但保留这三个值：模型名是 <code>kimi-k3</code>，provider 的 Base URL 是 <code>https://api.gpt88.cc/v1</code>，API Key 指向 GPT88 的 Key。
      </p>

      <h2 id="choose">Claude 还是 Codex</h2>
      <p>两者都不是 Kimi K3 本身；它们是调用模型的客户端。按工作目标选择：</p>
      <ul>
        <li><strong>选择 Codex：</strong>你主要做代码库修改、终端命令、测试运行、补丁迭代和长周期 Agent 任务。对 GPT88 这类 OpenAI 兼容接口，Codex 通常更容易直接验证。</li>
        <li><strong>选择 Claude Code：</strong>你已经在 Claude Code 中维护项目，并且当前客户端和 GPT88 线路都支持自定义模型及 Anthropic 兼容请求。</li>
        <li><strong>只想测试 K3：</strong>先用 cURL、Python OpenAI SDK 或 ChatBox 测试。客户端越简单，越容易判断问题是在模型、权限还是 Agent 集成层。</li>
      </ul>

      <h2 id="troubleshoot">FailedToOpenSocket 排查</h2>
      <p>
        截图中的 <code>FailedToOpenSocket</code> 只表示客户端没有成功建立或完成 API 连接，不能直接断定是“客户端不认识 Kimi K3”。按以下顺序检查：
      </p>
      <ol>
        <li>用同一 API Key 执行上面的 <code>/v1/models</code> 和 <code>/v1/chat/completions</code> cURL 请求。</li>
        <li>确认模型 ID 是精确的 <code>kimi-k3</code>，不要填写展示名称、大小写变体或 <code>openai/kimi-k3</code>。<code>openai/</code> 前缀只在某些客户端的 provider 命名规则中需要，不是 GPT88 API 的模型 ID。</li>
        <li>检查 Base URL 是否和客户端约定匹配，尤其是是否重复添加了 <code>/v1</code>。</li>
        <li>确认 API Key 没有多余空格、引号或换行，并检查余额、模型权限和代理软件的 HTTPS 连接。</li>
        <li>升级客户端并查看原始错误日志。如果 cURL 成功而客户端失败，问题通常在协议适配、模型白名单、客户端版本或代理配置，不在 Kimi K3 推理本身。</li>
      </ol>
      <Callout tone="danger" title="不要公开 API Key">
        <p>排查时可以分享 HTTP 状态码和脱敏后的错误正文，但不要截图或粘贴完整 API Key。</p>
      </Callout>

      <h2 id="checklist">验收清单</h2>
      <ul>
        <li>API Key 已通过环境变量注入。</li>
        <li><code>GET https://api.gpt88.cc/v1/models</code> 能确认模型权限。</li>
        <li>请求体中的 <code>model</code> 为 <code>kimi-k3</code>。</li>
        <li>OpenAI 兼容请求使用 <code>https://api.gpt88.cc</code>，Codex provider 使用 <code>https://api.gpt88.cc/v1</code>。</li>
        <li>客户端请求成功后，再用真实项目做小规模测试，并记录成功率、延迟、上下文长度和实际扣费。</li>
      </ul>
      <p>
        下一步可以阅读 <Link to="/docs/quickstart/">快速开始</Link>、<Link to="/docs/guides/config-export/">配置文件导出</Link>，或返回 <Link to="/docs/guides/kimi-k3-review/">Kimi K3 实战评测</Link>了解模型选型参考。
      </p>
    </DocPage>
  )
}
