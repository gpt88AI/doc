import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const PREPARE = `1. 已安装 Codex CLI
2. 已准备 gpt88.cc API Key
3. 已确认当前要走 API Key 模式还是 OAuth 模式
4. 已确认 OpenAI 兼容 Base URL: https://gpt88.cc/v1
5. 已准备一个最小验证任务，例如“创建一个 hello.txt”`

const INSTALL = `# macOS / Linux
npm install -g @openai/codex

# 验证安装
codex --version`

const API_CONFIG = `[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://gpt88.cc/v1"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`

const ENV = `export OPENAI_API_KEY="sk-你的-gpt88-api-key"
export OPENAI_BASE_URL="https://gpt88.cc/v1"`

const VERIFY = `codex --profile gpt88

# 进入会话后输入：
请创建一个 hello.txt，内容为 hello gpt88，并检查文件是否写入成功。`

const OAUTH_NOTES = `1. 只需要模型调用：使用 API Key 模式
2. 需要 ChatGPT 账号插件能力：退出 API Key，使用 OAuth 登录
3. OAuth 模式不要保留 OPENAI_API_KEY / OPENAI_BASE_URL 污染环境
4. 使用 CC-Switch 时，需要确认路由已经开启
5. 切换模式后，重新开启一个 Codex 会话验证`

const TROUBLESHOOTING = `1. 每次新会话反复 reconnect
   - 先检查代理变量和旧的 API Key 环境变量
   - 清理后重新打开终端

2. 工具突然不可调用，代码不能落地
   - 让 Codex 检查当前文件工具是否可用
   - 工具恢复后，明确告诉 Codex: 工具已恢复，直接从第一步开始落代码
   - 这通常不是模型问题，而是会话工具状态问题

3. 返回 401
   - API Key 不正确或权限不足

4. 返回 404
   - Base URL 或模型名写错

5. 插件功能不可用
   - 如果你是 API Key 登录，这是正常限制
   - 退出 API Key 登录，改用 OAuth`

export default function CodexCliIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/dev/codex-cli"
      title="Codex CLI 接入 gpt88.cc"
      description="Codex CLI 使用 gpt88.cc 的模型接入、OAuth 切换、插件限制和工具恢复教程。"
      headings={[
        { id: 'overview', text: '先看结论', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'install', text: '第一步：安装 Codex CLI', level: 2 },
        { id: 'configure', text: '第二步：配置 API Key 模式', level: 2 },
        { id: 'verify', text: '第三步：验证文件工具', level: 2 },
        { id: 'oauth', text: 'OAuth 与插件能力', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'references', text: '扩展阅读', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="warn" title="API Key 和 OAuth 是两套目标">
        <p>
          API Key 模式适合把 Codex CLI 接入 gpt88.cc 调用模型；如果你要使用 ChatGPT
          账号插件能力，需要退出 API Key 登录并使用 OAuth。两种模式不要混在一个会话里排查。
        </p>
      </Callout>

      <Callout tone="tip" title="额外参考">
        <p>
          如果你想看更系统的 Codex 使用、CLI 配置和工作流整理，可以参考{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
          。这是外部实践指南，适合作为本页的补充阅读。
        </p>
      </Callout>

      <h2 id="overview">先看结论</h2>
      <p>
        Codex CLI 作为开发工具接入 gpt88.cc 时，核心是三件事：安装 CLI、配置
        <code>https://gpt88.cc/v1</code>、用一个会写文件的最小任务验证工具链。
        如果遇到插件不可用，要先判断自己是不是还在 API Key 模式。
      </p>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="install">第一步：安装 Codex CLI</h2>
      <p>如果本机还没有 Codex CLI，先安装并确认命令可用。</p>
      <CodeBlock lang="bash" filename="install.sh" code={INSTALL} />

      <h2 id="configure">第二步：配置 API Key 模式</h2>
      <p>
        API Key 模式用于普通模型调用。配置时重点检查 <code>base_url</code> 是否带
        <code>/v1</code>，以及模型名是否是 gpt88.cc 当前支持的真实模型 ID。
      </p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={API_CONFIG} />
      <p>如果你更习惯用环境变量，也可以在当前终端设置：</p>
      <CodeBlock lang="bash" filename=".envrc" code={ENV} />

      <h2 id="verify">第三步：验证文件工具</h2>
      <p>
        不要只问一句聊天问题。Codex 是代码代理，最重要的是确认“能读文件、能写文件、能继续执行任务”。
      </p>
      <CodeBlock lang="bash" filename="verify.sh" code={VERIFY} />
      <ol>
        <li>启动 Codex CLI。</li>
        <li>让它创建一个简单文件。</li>
        <li>让它读取并确认文件内容。</li>
        <li>如果文件工具不可用，先修复工具状态，不要先换模型。</li>
      </ol>

      <h2 id="oauth">OAuth 与插件能力</h2>
      <CodeBlock lang="text" filename="oauth-notes" code={OAUTH_NOTES} />
      <p>
        如果你要的是插件能力，继续看
        <Link to="/docs/guides/codex-plugins-oauth"> Codex 插件 OAuth 教程</Link>。
        如果你只是要稳定调用 gpt88.cc 模型，API Key 模式更直接。
      </p>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="references">扩展阅读</h2>
      <ul>
        <li>
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
          {' '}— Codex 入门、CLI 配置、工作流和实践经验整理，可作为 gpt88.cc Codex 接入教程之外的补充参考。
        </li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-tool-recovery">查看工具恢复教程</Link></li>
        <li><Link to="/docs/guides/codex-plugins-oauth">查看 OAuth 插件教程</Link></li>
        <li><Link to="/docs/integrations/dev/cc-switch">查看 CC-Switch 路由教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
