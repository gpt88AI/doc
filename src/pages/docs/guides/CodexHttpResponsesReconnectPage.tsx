import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { DocPage } from '../../../components/layout/DocPage'
import { useLocale } from '../../../lib/locale'
import CodexHttpResponsesReconnectPageEn from '../../en/CodexHttpResponsesReconnectPageEn'

const SYMPTOM = `Reconnecting... 1/5
Reconnecting... 2/5
Reconnecting... 3/5
Reconnecting... 4/5
Reconnecting... 5/5
Thinking...`

const LOCATE_CONFIG = `# macOS / Linux
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# Windows PowerShell
if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "config.toml"
} else {
  Join-Path $HOME ".codex/config.toml"
}

# 也可以让 Codex 只定位文件，不修改文件：
请帮我定位当前 Codex 的 config.toml 配置文件路径，只告诉我路径，不要修改文件。`

const BACKUP_CONFIG = `# macOS / Linux
cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml" "$HOME\\.codex\\config.toml.bak"`

const SOURCE_PROVIDER = `# 原帖给出的 OpenAI / ChatGPT 登录模式示例
model_provider = "openai_http"

[model_providers.openai_http]
name = "OpenAI HTTP"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false`

const GPT88_PROVIDER = `# gpt88.cc API Key 模式示例
model = "YOUR_MODEL_ID"
model_provider = "gpt88_http"

[model_providers.gpt88_http]
name = "gpt88 HTTP / Responses"
base_url = "https://api.gpt88.cc"
env_key = "OPENAI_API_KEY"
wire_api = "responses"

# 只有当前 Codex 版本识别该字段时才添加：
# supports_websockets = false`

const ENV_SETUP = `# 当前终端临时设置 API Key
export OPENAI_API_KEY="sk-你的-gpt88-api-key"

# Windows PowerShell
$env:OPENAI_API_KEY = "sk-你的-gpt88-api-key"`

const VERIFY = `# 重新打开终端后验证 Codex 版本
codex --version

# 启动一个全新会话
codex

# 先发最小测试，不要立即重放原来的长任务：
请用一句话回复：Codex 连接测试成功。

# 再验证一次最小工具任务：
请列出当前目录中的文件，只告诉我文件名，不要修改任何文件。`

const DIAGNOSE = `# 1. 确认 provider 名称完全一致
model_provider = "gpt88_http"
[model_providers.gpt88_http]

# 2. 确认当前使用的配置文件
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# 3. 确认当前环境没有覆盖旧地址或旧 Key
env | grep -E '^(OPENAI_API_KEY|OPENAI_BASE_URL|CODEX_HOME)='

# 4. 更新 Codex（如果你的安装方式是 npm）
npm install -g @openai/codex@latest`

const ROLLBACK = `# macOS / Linux
cp ~/.codex/config.toml.bak ~/.codex/config.toml

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml.bak" "$HOME\\.codex\\config.toml"`

const CHECKLIST = `□ 已记录原始错误、时间、模型和当前网络环境
□ 已找到用户级 config.toml，并确认是否设置了 CODEX_HOME
□ 已备份原配置
□ provider id 与 model_provider 完全一致
□ wire_api = "responses"
□ gpt88 API Key 模式使用 env_key，不与 requires_openai_auth 混用
□ supports_websockets 字段已按当前 Codex 版本验证
□ 已完全退出旧会话，并重新启动 Codex
□ 普通文本请求成功
□ 最小只读工具请求成功
□ 再恢复原任务前，已确认工作区文件状态`

export default function CodexHttpResponsesReconnectPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CodexHttpResponsesReconnectPageEn />

  return (
    <DocPage
      path="/docs/guides/codex-http-responses-reconnect"
      title="Codex 一直重新连接 5/5：HTTP / Responses 连接排障"
      description="整理 Codex 出现 Reconnecting 1/5 到 5/5、Thinking... 的连接层排查方法，说明 WebSocket、HTTP / Responses、config.toml、provider 配置和回滚验证。"
      headings={[
        { id: 'conclusion', text: '先给结论', level: 2 },
        { id: 'symptom', text: '你看到的现象说明什么', level: 2 },
        { id: 'shortest-path', text: '最快恢复路径', level: 2 },
        { id: 'locate', text: '第一步：找到用户级 config.toml', level: 2 },
        { id: 'backup', text: '第二步：备份配置', level: 2 },
        { id: 'configure', text: '第三步：配置 HTTP / Responses provider', level: 2 },
        { id: 'restart', text: '第四步：重启并验证', level: 2 },
        { id: 'decision', text: 'API Key、OAuth 和字段选择', level: 2 },
        { id: 'troubleshoot', text: '仍然卡住时的排查顺序', level: 2 },
        { id: 'rollback', text: '失败时如何回滚', level: 2 },
        { id: 'checklist', text: '发布前验收清单', level: 2 },
        { id: 'references', text: '来源与参考', level: 2 },
        { id: 'next', text: '下一步阅读', level: 2 },
      ]}
    >
      <Callout tone="warn" title="先不要把“正在思考”直接当成模型慢">
        <p>
          如果 Codex 先连续显示 <code>Reconnecting 1/5</code> 到 <code>5/5</code>，
          然后才显示 <code>Thinking...</code>，优先检查连接层、代理和 provider 回退。
          这类现象可能发生在模型真正开始工作之前，重复发送同一个长任务通常只会增加等待和上下文噪音。
        </p>
      </Callout>

      <Callout tone="info" title="这是一条优先尝试的排障路径，不是所有环境的绝对结论">
        <p>
          本页整理自{' '}
          <a
            href="https://x.com/yunxi0623/status/2074818514612035683"
            target="_blank"
            rel="noreferrer"
          >
            云析在 X 上分享的 Codex 重连排障文章
          </a>
          。文章把问题归因到 WebSocket 连接反复失败后回退 HTTP；实际环境还可能涉及版本、代理、网关、
          防火墙、认证和服务端线路。因此请把“切到 HTTP / Responses”当成隔离变量，按最小请求逐层验证。
        </p>
      </Callout>

      <h2 id="conclusion">先给结论</h2>
      <p>
        当 Codex 长时间卡在重连时，建议按这个顺序处理：停止旧会话 → 备份用户级
        <code>config.toml</code> → 使用 HTTP / Responses provider → 完全重启 Codex →
        先验证普通文本，再验证最小只读工具 → 最后恢复原任务。
      </p>
      <p>
        这个顺序的重点是把“模型能力问题”和“连接 / 协议问题”分开。只要最小 HTTP 请求都没有稳定返回，
        就不应该先继续调提示词、换复杂模型或重放长任务。
      </p>

      <h2 id="symptom">你看到的现象说明什么</h2>
      <CodeBlock lang="text" filename="codex-output.txt" code={SYMPTOM} />
      <p>
        WebSocket 适合实时、持续的长连接和工具调用，但它对代理、网络节点、公司防火墙和中间网关的支持更敏感。
        如果连接建立失败，客户端可能经历“尝试 → 重连 → 回退”的过程，所以终端中的 5 次重连不一定代表模型进行了
        5 次深度推理。
      </p>
      <p>
        这里的判断是排障假设，不是单凭一段终端文字就能确认的根因。只有在切换网络或 provider 后明显恢复，
        并且普通请求与工具请求都能复现对照结果，才能把连接层问题的可信度提高。
      </p>

      <h2 id="shortest-path">最快恢复路径</h2>
      <ol>
        <li>停止卡在重连中的 Codex 进程，保留工作区，不要删除项目目录。</li>
        <li>找到用户级 <code>config.toml</code>，确认是否使用了 <code>CODEX_HOME</code>。</li>
        <li>复制一份备份，再新增 provider；不要先删除原配置。</li>
        <li>把 provider 的协议设置为 <code>responses</code>；仅当当前版本识别时才使用 <code>supports_websockets = false</code>。</li>
        <li>完全关闭旧 Codex，会话和终端都重新打开。</li>
        <li>先发送一句话测试，再做一个只读工具测试。</li>
        <li>两个最小测试都成功后，才恢复原来的长任务。</li>
      </ol>

      <h2 id="locate">第一步：找到用户级 config.toml</h2>
      <p>
        Codex 的用户级配置通常位于 <code>~/.codex/config.toml</code>。如果设置了
        <code>CODEX_HOME</code>，应以该目录为准。Windows 通常对应
        <code>%USERPROFILE%\.codex\config.toml</code>。
      </p>
      <CodeBlock lang="bash" filename="locate-config.sh" code={LOCATE_CONFIG} />
      <Callout tone="tip" title="不要把 provider 配置只放在项目目录">
        <p>
          当前 Codex 配置参考说明，项目级 <code>.codex/config.toml</code> 不能覆盖部分机器级 provider、
          认证和 profile 设置。需要调整 provider 时，优先修改用户级配置；项目级配置只用于项目允许覆盖的选项。
        </p>
      </Callout>

      <h2 id="backup">第二步：备份配置</h2>
      <p>
        先备份再改动。除了复制文件，也建议保留当前 Codex 版本、使用的 profile、模型名和当前网络环境，
        这样回滚后才知道恢复了什么。
      </p>
      <CodeBlock lang="bash" filename="backup-config.sh" code={BACKUP_CONFIG} />

      <h2 id="configure">第三步：配置 HTTP / Responses provider</h2>
      <p>
        原帖给出的配置是 OpenAI / ChatGPT 登录模式的 provider 示例。它表达的核心是：
        provider 使用 Responses 协议，并尝试关闭 WebSocket 优先路径。
      </p>
      <CodeBlock lang="toml" filename="source-provider.toml" code={SOURCE_PROVIDER} />

      <Callout tone="warn" title="supports_websockets 是版本相关字段">
        <p>
          当前公开的 Codex 配置参考明确记录了自定义 provider、<code>wire_api = "responses"</code>、
          <code>env_key</code> 和 <code>requires_openai_auth</code>；原帖中的
          <code>supports_websockets</code> 需要以你安装的 Codex 版本为准。如果启动时报
          <code>unknown field</code> 或配置解析失败，先删除这一行，保留 Responses provider，
          再根据当前版本的 schema 或升级说明处理。
        </p>
      </Callout>

      <p>
        如果你是通过 gpt88.cc API Key 使用 Codex，不要把原帖的
        <code>requires_openai_auth = true</code> 直接复制过来。API Key 模式应使用
        <code>env_key</code>，并把 provider 指向 gpt88.cc 的兼容入口：
      </p>
      <CodeBlock lang="toml" filename="gpt88-provider.toml" code={GPT88_PROVIDER} />
      <CodeBlock lang="bash" filename="set-api-key.sh" code={ENV_SETUP} />
      <p>
        <code>model_provider</code> 的值必须和 <code>[model_providers.&lt;id&gt;]</code> 中的
        provider id 完全一致。例如 provider id 是 <code>gpt88_http</code>，顶部就不能写成
        <code>openai_http</code> 或 <code>chatgpt_http</code>。
      </p>

      <h2 id="restart">第四步：重启并验证</h2>
      <p>
        保存配置后，退出当前 Codex 和终端，重新打开一个终端，再启动全新会话。不要只在旧会话里继续发送消息，
        因为旧会话可能已经保留了旧 provider、旧连接状态或失败上下文。
      </p>
      <CodeBlock lang="bash" filename="verify-connection.sh" code={VERIFY} />
      <ol>
        <li>普通文本请求成功：说明认证、模型和基础 HTTP 通路至少可用。</li>
        <li>只读工具请求成功：说明 Agent 能继续接收工具结果，连接问题没有在第一轮工具调用处复现。</li>
        <li>原任务成功：才可以认为这次配置对你的真实工作流有效。</li>
      </ol>

      <h2 id="decision">API Key、OAuth 和字段选择</h2>
      <table>
        <thead>
          <tr>
            <th>你的目标</th>
            <th>优先配置</th>
            <th>不要混用</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>通过 gpt88.cc 调模型</td>
            <td><code>base_url</code> + <code>env_key</code> + <code>wire_api = "responses"</code></td>
            <td>不要同时设置 <code>requires_openai_auth = true</code></td>
          </tr>
          <tr>
            <td>使用 OpenAI / ChatGPT OAuth</td>
            <td><code>requires_openai_auth = true</code>，按官方登录方式授权</td>
            <td>不要在同一个 profile 中残留 gpt88 API Key 环境变量</td>
          </tr>
          <tr>
            <td>排查 WebSocket 兼容性</td>
            <td>先用最小 HTTP / Responses 请求做对照</td>
            <td>不要把一次成功就当成所有长任务都稳定</td>
          </tr>
        </tbody>
      </table>
      <p>
        如果你还需要完整的 gpt88.cc Codex CLI 配置流程，可以继续阅读{' '}
        <Link to="/docs/integrations/dev/codex-cli/">Codex CLI 接入 gpt88.cc</Link>；
        如果目标是 ChatGPT 插件或 OAuth 能力，请阅读{' '}
        <Link to="/docs/guides/codex-plugins-oauth/">Codex 插件 OAuth 登录</Link>。
      </p>

      <h2 id="troubleshoot">仍然卡住时的排查顺序</h2>
      <ol>
        <li>
          <strong>确认版本。</strong>先运行 <code>codex --version</code>。如果是旧版本，按当前安装方式升级；
          npm 安装可以参考 <code>npm install -g @openai/codex@latest</code>。
        </li>
        <li>
          <strong>确认 provider 配置生效。</strong>检查 <code>model_provider</code> 与 provider id 是否完全一致，
          并确认当前读取的是用户级 config，而不是另一个 <code>CODEX_HOME</code> 目录。
        </li>
        <li>
          <strong>确认网络链路。</strong>换一个网络、代理节点或线路做对照；如果只在公司网络、防火墙或特定节点失败，
          重点检查 WebSocket 和长连接支持，而不是先换模型。
        </li>
        <li>
          <strong>开新会话。</strong>关闭旧会话，重新进入项目目录启动 Codex。旧会话中的失败连接和上下文不能作为新配置的验证结果。
        </li>
        <li>
          <strong>区分错误类型。</strong>401 / 403 更像认证或权限，404 更像 Base URL 或模型名，524 更像网关没有及时得到可用上游响应；
          仍需结合完整错误、时间和 request id 判断。
        </li>
        <li>
          <strong>检查工具状态。</strong>普通文本成功但工具调用失败时，继续看 shell、hook、MCP、子进程和工具恢复，
          不要把所有问题都归因到 WebSocket。
        </li>
      </ol>
      <CodeBlock lang="bash" filename="diagnose.sh" code={DIAGNOSE} />

      <Callout tone="danger" title="不要无限重试同一个长任务">
        <p>
          如果连接层还没有稳定，重复执行会造成重复写文件、重复调用工具和上下文膨胀。先保留工作区，做普通请求和只读工具请求；
          如果工作区可能已经被部分修改，先运行 <code>git status --short</code>，再决定恢复、回滚还是继续。
        </p>
      </Callout>

      <h2 id="rollback">失败时如何回滚</h2>
      <p>
        如果 Codex 启动时报配置解析错误、模型列表异常或连接行为更差，先恢复备份，再重新启动。回滚只针对配置文件，
        不会自动撤销已经写入项目的文件，因此项目改动仍要单独检查。
      </p>
      <CodeBlock lang="bash" filename="rollback-config.sh" code={ROLLBACK} />
      <p>
        配置恢复后，重新运行最小文本测试。如果文本恢复但工具仍失败，可以转到{' '}
        <Link to="/docs/guides/codex-tool-recovery/">Codex 工具恢复</Link> 和{' '}
        <Link to="/docs/guides/codex-windows-powershell7-timeout/">Windows Codex 524 与 PowerShell 7</Link>
        继续分层排查。
      </p>

      <h2 id="checklist">发布前验收清单</h2>
      <CodeBlock lang="text" filename="acceptance-checklist" code={CHECKLIST} />

      <h2 id="references">来源与参考</h2>
      <ul>
        <li>
          <a
            href="https://x.com/yunxi0623/status/2074818514612035683"
            target="_blank"
            rel="noreferrer"
          >
            原始 X 文章：CodeX 老是“正在重新连接 5/5、正在思考”
          </a>
          {' '}— 本页对其现象、配置思路和排查顺序进行了整理，并补充了 gpt88 API Key 的配置边界。
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-basic" target="_blank" rel="noreferrer">
            Codex Config basics
          </a>
          {' '}— 用户级配置、provider 和配置层级的官方说明。
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-advanced" target="_blank" rel="noreferrer">
            Codex Advanced Config
          </a>
          {' '}— 自定义 model provider、Base URL、认证和 Responses 协议示例。
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-reference" target="_blank" rel="noreferrer">
            Codex Configuration Reference
          </a>
          {' '}— 当前 config.toml 字段和版本差异的核对入口。
        </li>
      </ul>

      <h2 id="next">下一步阅读</h2>
      <ul>
        <li>
          <Link to="/docs/integrations/dev/codex-cli/">Codex CLI 接入 gpt88.cc</Link>：完成 API Key、模型和文件工具的完整配置。
        </li>
        <li>
          <Link to="/docs/guides/codex-tool-recovery/">Codex 工具恢复</Link>：工具失效后如何确认状态并从第一步重新落代码。
        </li>
        <li>
          <Link to="/docs/guides/codex-windows-powershell7-timeout/">Windows Codex 524 与 PowerShell 7</Link>：继续排查 shell、编码和流式输出。
        </li>
      </ul>
    </DocPage>
  )
}
