import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

const SYMPTOM = `你现在的状态通常是这样：

1. 用 CC Switch 把 Codex 切到了 gpt88.cc 中转站 API
2. Base URL 类似 https://gpt88.cc/v1 或 https://china.claudecoder.me/v1
3. API Key 是 gpt88.cc 控制台创建的 sk-...
4. 模型调用可以工作
5. 但是 Codex 里的插件 / Plugin / App 能力不可用或不显示`

const INSTALL_CODEX = `# 1. 确认本机已有 Node.js 与 npm
node -v
npm -v

# 2. 安装或升级 OpenAI Codex CLI
npm install -g @openai/codex

# macOS 用户也可以使用 Homebrew：
# brew install --cask codex

# 3. 验证 codex 命令可用
codex --version`

const ENABLE_OAUTH = `# 1. 如果之前用过 API Key 登录，先退出
codex logout

# 2. 打开 Codex OAuth 登录流程
codex --login

# 3. 在浏览器授权页选择：
# Sign in with ChatGPT / 使用 ChatGPT 登录
#
# 不要粘贴 gpt88.cc API Key，也不要选择 API Key 登录。

# 4. 授权完成后，在项目目录启动 Codex
cd /path/to/your-project
codex`

const LOGOUT_AND_LOGIN = `# 1. 退出当前 Codex API Key 登录
codex logout

# 2. 重新打开 Codex 登录流程
codex --login

# 3. 在登录页选择：
# Sign in with ChatGPT / 使用 ChatGPT 登录
#
# 不要选择手动粘贴 API Key。`

const CC_SWITCH_FLOW = `1. 打开 CC Switch
2. 进入 Codex / Routes / 路由配置
3. 找到当前使用 gpt88.cc API Key 的 Codex 配置
4. 先关闭或取消激活这个 API Key 路由
5. 新建一个 ChatGPT OAuth profile，例如 chatgpt-oauth
6. Auth / 登录方式选择 ChatGPT OAuth / Sign in with ChatGPT
7. Base URL 保持官方默认，不要填 gpt88.cc/v1
8. 打开 Route / Router / Enable / 启用路由 开关
9. 目标工具选择 Codex，并保存 / Apply / Activate
10. 在浏览器中完成 ChatGPT 登录与授权
11. 重启 Codex，重新打开插件面板验证`

const CC_SWITCH_ROUTE_CHECK = `CC Switch 路由检查清单：

route/profile name:
  chatgpt-oauth

target/tool:
  Codex

auth type:
  ChatGPT OAuth / Sign in with ChatGPT

route status:
  Enabled / Active / 已启用

base url:
  使用官方默认
  不要填 https://gpt88.cc/v1
  不要填 https://china.claudecoder.me/v1

api key:
  留空
  不要粘贴 gpt88.cc API Key

after apply:
  重启 Codex
  确认插件面板可见`

const ENV_CHECK = `# 当前终端临时取消 API Key 覆盖，避免 Codex 继续走 API Key 模式
unset OPENAI_API_KEY
unset OPENAI_BASE_URL
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL

# 如果你把这些变量写在 ~/.zshrc、~/.bashrc、~/.profile 或工具配置里，
# 也需要同步删除或注释掉，然后重启终端 / Codex。`

const RECONNECTING_PROXY_FIX = `# 1. 先确认你的代理地址。下面只是示例，请改成自己的本地代理端口。
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
export ALL_PROXY="socks5://127.0.0.1:7890"

# 2. Codex 新会话可能使用 wss:// WebSocket 连接，也要补上 WebSocket 代理。
export WS_PROXY="http://127.0.0.1:7890"
export WSS_PROXY="http://127.0.0.1:7890"

# 3. 写入 ~/.codex/config.toml，让 Codex 子进程也能读到代理。
# 如果已有 config.toml，请把 [env] 段合并进去，不要覆盖原文件。
[env]
HTTP_PROXY = "http://127.0.0.1:7890"
HTTPS_PROXY = "http://127.0.0.1:7890"
ALL_PROXY = "socks5://127.0.0.1:7890"
WS_PROXY = "http://127.0.0.1:7890"
WSS_PROXY = "http://127.0.0.1:7890"

# 4. macOS 图形界面启动的 Codex Desktop 还需要写入 launchctl 环境。
launchctl setenv HTTP_PROXY "http://127.0.0.1:7890"
launchctl setenv HTTPS_PROXY "http://127.0.0.1:7890"
launchctl setenv ALL_PROXY "socks5://127.0.0.1:7890"
launchctl setenv WS_PROXY "http://127.0.0.1:7890"
launchctl setenv WSS_PROXY "http://127.0.0.1:7890"`

const DUAL_PROFILE = `推荐保留两个配置：

profile: gpt88-api
  用途：通过 gpt88.cc 中转站调用模型
  优点：模型多、线路可选、成本透明
  限制：不提供 ChatGPT OAuth 插件身份

profile: chatgpt-oauth
  用途：使用 Codex 插件 / App / ChatGPT 账号权益
  优点：插件能力可用，继承 ChatGPT 账号或团队空间权限
  限制：模型与用量走 ChatGPT/Codex 官方账号体系`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[42rem] text-left text-sm">
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
                <td
                  key={j}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
                >
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

export default function CodexPluginsOauthPage() {
  return (
    <DocPage
      path="/docs/guides/codex-plugins-oauth"
      title="Codex 插件与 ChatGPT OAuth 登录"
      description="当你通过 CC Switch 使用 gpt88.cc 中转站 API 登录 Codex 后，如果插件能力不可用，可以安装 Codex CLI、开启 ChatGPT OAuth，并在 CC Switch 中启用 Codex OAuth 路由来恢复插件。"
      headings={[
        { id: 'problem', text: '问题现象', level: 2 },
        { id: 'why', text: '为什么 API Key 模式不能用插件', level: 2 },
        { id: 'compare', text: '两种登录模式对比', level: 2 },
        { id: 'prepare', text: '先准备三件事', level: 2 },
        { id: 'install-codex', text: '安装 Codex CLI', level: 3 },
        { id: 'enable-oauth', text: '开启 ChatGPT OAuth 认证', level: 3 },
        { id: 'enable-cc-switch-route', text: '开启 CC Switch 路由', level: 3 },
        { id: 'switch', text: '切换到 ChatGPT OAuth', level: 2 },
        { id: 'cc-switch', text: '通过 CC Switch 切换', level: 3 },
        { id: 'codex-cli', text: '通过 Codex CLI 切换', level: 3 },
        { id: 'env', text: '清理环境变量覆盖', level: 3 },
        { id: 'verify', text: '验证插件是否恢复', level: 2 },
        { id: 'two-profiles', text: '推荐保留双配置', level: 2 },
        { id: 'troubleshooting', text: '常见问题排查', level: 2 },
        { id: 'reconnecting', text: '新会话反复 Reconnecting 1/5', level: 3 },
        { id: 'references', text: '官方参考', level: 2 },
      ]}
    >
      <Callout tone="warn" title="先明确一个边界">
        <p>
          gpt88.cc 中转站 API Key 解决的是“模型调用”问题；Codex 插件功能依赖
          ChatGPT / Codex 的 OAuth 账号身份与对应权限。两者不是同一个登录体系。
        </p>
      </Callout>

      <h2 id="problem">问题现象</h2>
      <p>
        很多用户会用 <code>cc switch</code> 把 Codex 切到 gpt88.cc 中转站，
        这样可以通过统一 API 调用模型。但这时如果你进入 Codex 的插件功能，
        可能会发现插件入口不可用、插件列表为空，或者插件相关按钮无法点击。
      </p>
      <CodeBlock lang="text" filename="typical symptom" code={SYMPTOM} />

      <p>
        这不是你的 API Key 写错了，也不是 gpt88.cc 模型调用失败。
        本质上，这是 <strong>API Key 模型调用模式</strong> 和
        <strong>ChatGPT OAuth 产品登录模式</strong> 的能力边界不同。
      </p>

      <h2 id="why">为什么 API Key 模式不能用插件</h2>
      <p>
        API Key 登录只证明“这个请求可以扣费并调用模型”。它不会携带你的 ChatGPT
        账号会话，也不会携带 ChatGPT 工作区里的 App / Plugin 授权状态。
      </p>
      <p>
        Codex 插件属于 Codex / ChatGPT 产品侧能力，通常需要知道：
      </p>
      <ul>
        <li>你是谁：ChatGPT 账号身份；</li>
        <li>你属于哪个 workspace：个人、Team、Business、Enterprise / Edu；</li>
        <li>管理员是否允许插件或 App；</li>
        <li>当前插件是否在你的 workspace 中可用。</li>
      </ul>
      <p>
        gpt88.cc API Key 不会也不应该伪装成你的 ChatGPT 登录态。
        所以，用 gpt88.cc API Key 可以调用模型，但不能解锁依赖 ChatGPT OAuth 身份的插件功能。
      </p>

      <h2 id="compare">两种登录模式对比</h2>
      <DocTable
        headers={['模式', '适合做什么', '优点', '限制']}
        rows={[
          [
            <strong key="api">gpt88.cc API Key 模式</strong>,
            '通过中转站调用模型、切换线路、统一成本与模型配置',
            '模型多、Base URL 可控、适合开发和自动化调用',
            '不提供 ChatGPT OAuth 身份，插件 / App 能力可能不可用',
          ],
          [
            <strong key="oauth">ChatGPT OAuth 模式</strong>,
            '使用 Codex 插件、App、ChatGPT 账号权益或团队空间授权',
            '继承 ChatGPT / Codex 产品侧身份，插件能力可用',
            '模型、用量与权限走 ChatGPT/Codex 官方账号体系',
          ],
          ]}
      />

      <h2 id="prepare">先准备三件事</h2>
      <p>
        如果你的目标是“Codex 能正常使用插件”，不要只改 Base URL。
        需要同时满足三件事：本机装好 Codex CLI、Codex 使用 ChatGPT OAuth 认证、
        CC Switch 当前激活的是 Codex OAuth 路由。
      </p>

      <h3 id="install-codex">安装 Codex CLI</h3>
      <p>
        先确认当前机器能运行 <code>codex</code> 命令。官方推荐通过 npm 安装，
        macOS 用户也可以用 Homebrew。安装后看到版本号，说明 CLI 已经可用。
      </p>
      <CodeBlock lang="bash" filename="terminal" code={INSTALL_CODEX} />
      <Callout tone="info" title="如果提示 command not found">
        <p>
          通常是 npm 全局安装目录没有加入 <code>PATH</code>。先执行
          <code> npm config get prefix</code> 查看安装位置，再把对应的
          <code> bin</code> 目录加入 shell 配置。处理好后重开终端，再执行
          <code> codex --version</code>。
        </p>
      </Callout>

      <h3 id="enable-oauth">开启 ChatGPT OAuth 认证</h3>
      <p>
        插件依赖 ChatGPT / Codex 产品侧身份，所以这里必须选择
        <strong> Sign in with ChatGPT</strong>。如果你之前已经用 gpt88.cc API Key
        登录过，建议先退出，再重新走 OAuth 登录。
      </p>
      <CodeBlock lang="bash" filename="terminal" code={ENABLE_OAUTH} />
      <p>
        OAuth 授权完成后，Codex 会保存本地认证信息。之后你在项目目录运行
        <code> codex</code>，应当进入 ChatGPT 登录态，而不是再次要求你粘贴 API Key。
      </p>

      <h3 id="enable-cc-switch-route">开启 CC Switch 路由</h3>
      <p>
        CC Switch 不只是“存配置”，它还决定当前 Codex 请求到底走哪条路由。
        如果路由没有启用，或者仍然激活的是 gpt88.cc API Key profile，
        Codex 可能继续按 API Key 模式运行，插件自然不会恢复。
      </p>
      <CodeBlock lang="yaml" filename="cc switch route checklist" code={CC_SWITCH_ROUTE_CHECK} />
      <Callout tone="warn" title="OAuth 路由不要填 gpt88.cc Base URL">
        <p>
          这个 profile 的目标是恢复 Codex 插件能力，所以它应当走 ChatGPT OAuth。
          gpt88.cc 的 <code>https://gpt88.cc/v1</code>、<code>china.claudecoder.me</code>
          等地址继续留给 API Key profile 使用，不要混到 OAuth profile 里。
        </p>
      </Callout>

      <h2 id="switch">切换到 ChatGPT OAuth</h2>
      <p>
        目标很简单：退出当前 API Key 登录，让 Codex 重新走
        <strong> Sign in with ChatGPT</strong>。不要在这个流程里粘贴 gpt88.cc 的 API Key。
      </p>

      <h3 id="cc-switch">通过 CC Switch 切换</h3>
      <p>
        如果你是通过 CC Switch 管理 Codex 配置，推荐在 CC Switch 里保留两个 profile：
        一个用于 gpt88.cc API 调用，一个用于 ChatGPT OAuth 插件功能。
        切换后一定要确认 OAuth profile 的路由状态是 Enabled / Active。
      </p>
      <CodeBlock lang="text" filename="cc switch flow" code={CC_SWITCH_FLOW} />
      <Callout tone="info" title="不同版本的 CC Switch 菜单可能不同">
        <p>
          如果你的 CC Switch 菜单文案和上面不完全一致，以“退出 API Key 配置”和
          “使用 ChatGPT OAuth 登录”这两个动作作为判断标准。
          同时确认 <strong>Route / Router / 启用路由</strong> 已经打开。
        </p>
      </Callout>

      <h3 id="codex-cli">通过 Codex CLI 切换</h3>
      <p>
        如果你使用的是 OpenAI Codex CLI，可以按官方建议先退出 API Key 模式，再重新启动登录流程。
      </p>
      <CodeBlock lang="bash" filename="terminal" code={LOGOUT_AND_LOGIN} />
      <p>
        重新登录时，请选择 <strong>Sign in with ChatGPT</strong>。
        如果界面再次提示输入 API Key，说明你还在走 API Key 登录路径，需要返回上一步重新选择 OAuth。
      </p>

      <h3 id="env">清理环境变量覆盖</h3>
      <p>
        有时你已经在界面里切到 OAuth，但终端环境变量仍然强制 Codex 走 API Key / Base URL。
        这时可以先在当前终端临时取消这些变量，再重启 Codex。
      </p>
      <CodeBlock lang="bash" filename="terminal" code={ENV_CHECK} />
      <p>
        如果这些变量写在 shell 启动文件、IDE 配置或 CC Switch profile 中，
        需要在对应位置一起清理，否则下次打开终端还会重新生效。
      </p>

      <h2 id="verify">验证插件是否恢复</h2>
      <ol>
        <li>重启 Codex 或重新打开 Codex 会话。</li>
        <li>确认账号区域显示的是 ChatGPT 登录态，而不是仅显示 API Key / Base URL。</li>
        <li>打开插件 / Plugins / Apps 面板。</li>
        <li>确认插件列表可见，或插件相关按钮可以正常启用。</li>
        <li>任选一个插件做最小测试，例如读取当前页面、打开本地预览或执行一个不敏感操作。</li>
      </ol>
      <Callout tone="tip" title="插件恢复后，模型调用和插件调用是两回事">
        <p>
          插件能不能用，取决于 ChatGPT OAuth 身份和 workspace 权限；
          模型从哪里走，取决于当前 Codex profile / 工具配置。不要把两者混在一起排障。
        </p>
      </Callout>

      <h2 id="two-profiles">推荐保留双配置</h2>
      <p>
        最稳的做法不是二选一，而是在 CC Switch 里保留两个配置。
        需要中转模型调用时切到 gpt88.cc API；需要插件时切到 ChatGPT OAuth。
      </p>
      <CodeBlock lang="yaml" filename="recommended profiles" code={DUAL_PROFILE} />

      <h2 id="troubleshooting">常见问题排查</h2>
      <h3>1. 已经 OAuth 登录了，插件还是不可用</h3>
      <ul>
        <li>检查是否仍有 <code>OPENAI_API_KEY</code> / <code>OPENAI_BASE_URL</code> 环境变量覆盖。</li>
        <li>检查 CC Switch 当前激活的 profile 是否仍是 gpt88.cc API profile。</li>
        <li>如果你在 Business / Enterprise / Edu workspace，检查管理员是否禁用了对应 App / Plugin。</li>
        <li>退出 Codex 后重新打开，避免旧会话缓存登录状态。</li>
      </ul>

      <h3>2. 我还能继续用 gpt88.cc 中转站吗？</h3>
      <p>
        可以。只是建议把“中转站 API 调用”和“Codex 插件使用”分成两个配置。
        不需要插件时，用 gpt88.cc profile；需要插件时，切到 ChatGPT OAuth profile。
      </p>

      <h3>3. OAuth 登录会删除我的 gpt88.cc API Key 吗？</h3>
      <p>
        不会。OAuth 登录只影响 Codex / ChatGPT 这一侧的身份。
        你的 gpt88.cc API Key 仍然在 gpt88.cc 控制台中管理。
      </p>

      <h3>4. 什么时候应该用 API Key，什么时候用 OAuth？</h3>
      <ul>
        <li>只需要模型调用、脚本、SDK、批量任务：用 gpt88.cc API Key。</li>
        <li>需要 Codex 插件、App、ChatGPT 账号权益：用 ChatGPT OAuth。</li>
        <li>两者都需要：在 CC Switch 里建两个 profile，按任务切换。</li>
      </ul>

      <h3 id="reconnecting">5. 新会话每次都反复 Reconnecting 1/5 到 5/5</h3>
      <p>
        如果 Codex 每次开启新会话都会出现 <code>Reconnecting... 1/5</code>、
        <code>2/5</code>、<code>3/5</code> 直到多次重连，通常不是 OAuth 本身坏了，
        而是 Codex 的连接链路没有完整吃到代理。尤其是新会话可能走
        <code>wss://</code> WebSocket 连接，只配置 <code>HTTP_PROXY</code> 和
        <code>HTTPS_PROXY</code> 可能不够。
      </p>
      <CodeBlock lang="toml" filename="proxy checklist" code={RECONNECTING_PROXY_FIX} />
      <Callout tone="warn" title="设置后必须完全退出 Codex 再重开">
        <p>
          不要只是关闭窗口。需要从菜单或 Dock 里彻底退出 Codex，让旧进程结束，
          再重新打开。否则旧进程不会自动继承新的代理环境。
        </p>
      </Callout>
      <p>
        核心思路是同时覆盖三层：HTTP 代理、WebSocket 代理，以及 Codex Desktop
        从 macOS 图形界面启动时能读取到的 <code>launchctl</code> 环境。
        如果你使用的代理不是 <code>127.0.0.1:7890</code>，请替换成自己的代理地址。
      </p>

      <h2 id="references">官方参考</h2>
      <ul>
        <li>
          <a
            href="https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI：Using Codex with your ChatGPT plan
          </a>
          {' '}— Codex 可通过 ChatGPT 账号登录，插件权限受 workspace App / RBAC 控制。
        </li>
        <li>
          <a
            href="https://help.openai.com/en/articles/11381614-api-codex-cli-and-sign-in-with-chatgpt"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI：Codex CLI and Sign in with ChatGPT
          </a>
          {' '}— Codex CLI 的 ChatGPT 登录流程与 OAuth 授权说明。
        </li>
        <li>
          如果你只是想配置 gpt88.cc API 模型调用，继续阅读{' '}
          <Link to="/docs/guides/config-export">配置文件导出</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
