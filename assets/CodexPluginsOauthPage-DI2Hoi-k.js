import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`Typical state:

1. You routed Codex through gpt88.cc with CC-Switch
2. API-key mode uses https://api.gpt88.cc; OAuth mode does not configure an API Base URL
3. The API key is a gpt88.cc sk-... key
4. Model calls work
5. But plugin / app capability is missing or unavailable`,l=`node -v
npm -v
npm install -g @openai/codex
codex --version`,u=`codex logout
codex --login

# choose:
# Sign in with ChatGPT

# do not paste a gpt88.cc API key during this flow`,d=`1. Open CC-Switch
2. Go to Codex / Routes / route settings
3. Disable the current API-key route if it is active
4. Create a new profile such as chatgpt-oauth
5. Choose ChatGPT OAuth as the auth type
6. Keep the official default base URL
7. Enable the route
8. Save and apply
9. Complete ChatGPT login in the browser
10. Restart Codex and verify plugin visibility`,f=`unset OPENAI_API_KEY
unset OPENAI_BASE_URL
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL`,p=`Recommended two-profile setup:

profile: gpt88-api
  purpose: model access through gpt88.cc
  strength: flexible routing, multi-model access, transparent cost view
  limit: no ChatGPT OAuth plugin identity

profile: chatgpt-oauth
  purpose: Codex plugins / apps / ChatGPT account features
  strength: plugin capability and ChatGPT workspace identity
  limit: usage and permissions follow the official ChatGPT / Codex account system`;function m(){return(0,s.jsxs)(a,{path:`/docs/guides/codex-plugins-oauth`,title:`Codex Plugins and ChatGPT OAuth Login`,description:`If Codex can call models through gpt88.cc but plugin capability is missing, switch from API key mode to ChatGPT OAuth and keep CC-Switch on the OAuth route.`,headings:[{id:`problem`,text:`Problem pattern`,level:2},{id:`why`,text:`Why API key mode cannot unlock plugins`,level:2},{id:`prepare`,text:`Prepare three things first`,level:2},{id:`install-codex`,text:`Install Codex CLI`,level:3},{id:`enable-oauth`,text:`Enable ChatGPT OAuth`,level:3},{id:`enable-cc-switch-route`,text:`Enable the CC-Switch OAuth route`,level:3},{id:`switch`,text:`Switch to ChatGPT OAuth`,level:2},{id:`env`,text:`Clear environment overrides`,level:2},{id:`verify`,text:`Verify plugin recovery`,level:2},{id:`two-profiles`,text:`Keep two separate profiles`,level:2}],children:[(0,s.jsx)(o,{tone:`warn`,title:`Clear boundary`,children:(0,s.jsx)(`p`,{children:`A gpt88.cc API key solves model access. Codex plugins depend on ChatGPT / Codex OAuth identity and the permissions attached to that identity. These are two different systems.`})}),(0,s.jsx)(`h2`,{id:`problem`,children:`Problem pattern`}),(0,s.jsx)(i,{lang:`text`,filename:`typical-symptom`,code:c}),(0,s.jsx)(`p`,{children:`This usually does not mean your gpt88.cc API key is broken. It means you are still in API-key model mode while trying to use a product feature that requires ChatGPT OAuth identity.`}),(0,s.jsx)(`h2`,{id:`why`,children:`Why API key mode cannot unlock plugins`}),(0,s.jsx)(`p`,{children:`API key mode only proves that a request may call a model and consume quota. It does not carry your ChatGPT account session, workspace identity, or plugin authorization state.`}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Prepare three things first`}),(0,s.jsx)(`p`,{children:`To restore plugin capability, do not only change the Base URL. You need a working Codex CLI install, a ChatGPT OAuth login, and the correct CC-Switch route if you use CC-Switch.`}),(0,s.jsx)(`h3`,{id:`install-codex`,children:`Install Codex CLI`}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:l}),(0,s.jsx)(`h3`,{id:`enable-oauth`,children:`Enable ChatGPT OAuth`}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:u}),(0,s.jsxs)(`p`,{children:[`During login, choose `,(0,s.jsx)(`strong`,{children:`Sign in with ChatGPT`}),`. Do not paste the gpt88.cc API key in this flow.`]}),(0,s.jsx)(`h3`,{id:`enable-cc-switch-route`,children:`Enable the CC-Switch OAuth route`}),(0,s.jsx)(i,{lang:`text`,filename:`cc-switch-flow`,code:d}),(0,s.jsxs)(`p`,{children:[`The OAuth profile should use the official default login flow. Do not point the OAuth profile itself at`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`.`]}),(0,s.jsx)(`h2`,{id:`switch`,children:`Switch to ChatGPT OAuth`}),(0,s.jsx)(`p`,{children:`The goal is simple: exit API-key login mode and re-enter Codex with ChatGPT OAuth. If the interface keeps asking for an API key, you are still on the wrong path.`}),(0,s.jsx)(`h2`,{id:`env`,children:`Clear environment overrides`}),(0,s.jsx)(`p`,{children:`Even after switching the visible login flow, environment variables may continue forcing API-key mode. Clear them before restarting Codex.`}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:f}),(0,s.jsx)(`h2`,{id:`verify`,children:`Verify plugin recovery`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Restart Codex.`}),(0,s.jsx)(`li`,{children:`Confirm the session shows a ChatGPT login state rather than only API-key routing.`}),(0,s.jsx)(`li`,{children:`Open the plugin or app area again.`}),(0,s.jsx)(`li`,{children:`If it is still missing, verify that the OAuth route is the active one and that no API-key env vars remain.`})]}),(0,s.jsx)(`h2`,{id:`two-profiles`,children:`Keep two separate profiles`}),(0,s.jsx)(i,{lang:`text`,filename:`dual-profile`,code:p}),(0,s.jsx)(`p`,{children:`In practice, keeping one profile for model access and one profile for ChatGPT OAuth avoids a lot of confusion and makes switching intent explicit.`}),(0,s.jsxs)(`p`,{children:[`For related setup work, continue with `,(0,s.jsx)(t,{to:r(`/docs/integrations/dev/codex-cli/`,`en`),children:`Codex CLI`}),` and`,` `,(0,s.jsx)(t,{to:r(`/docs/integrations/dev/cc-switch/`,`en`),children:`CC-Switch`}),`.`]})]})}var h=`你现在的状态通常是这样：

1. 用 CC Switch 把 Codex 切到了 gpt88.cc 中转站 API
2. API Key 模式使用 https://api.gpt88.cc；OAuth 模式不配置 API Base URL
3. API Key 是 gpt88.cc 控制台创建的 sk-...
4. 模型调用可以工作
5. 但是 Codex 里的插件 / Plugin / App 能力不可用或不显示`,g=`# 1. 确认本机已有 Node.js 与 npm
node -v
npm -v

# 2. 安装或升级 OpenAI Codex CLI
npm install -g @openai/codex

# macOS 用户也可以使用 Homebrew：
# brew install --cask codex

# 3. 验证 codex 命令可用
codex --version`,_=`# 1. 如果之前用过 API Key 登录，先退出
codex logout

# 2. 打开 Codex OAuth 登录流程
codex --login

# 3. 在浏览器授权页选择：
# Sign in with ChatGPT / 使用 ChatGPT 登录
#
# 不要粘贴 gpt88.cc API Key，也不要选择 API Key 登录。

# 4. 授权完成后，在项目目录启动 Codex
cd /path/to/your-project
codex`,v=`# 1. 退出当前 Codex API Key 登录
codex logout

# 2. 重新打开 Codex 登录流程
codex --login

# 3. 在登录页选择：
# Sign in with ChatGPT / 使用 ChatGPT 登录
#
# 不要选择手动粘贴 API Key。`,y=`1. 打开 CC Switch
2. 进入 Codex / Routes / 路由配置
3. 找到当前使用 gpt88.cc API Key 的 Codex 配置
4. 先关闭或取消激活这个 API Key 路由
5. 新建一个 ChatGPT OAuth profile，例如 chatgpt-oauth
6. Auth / 登录方式选择 ChatGPT OAuth / Sign in with ChatGPT
7. Base URL 保持官方默认；OAuth 模式不要填 API Base URL
8. 打开 Route / Router / Enable / 启用路由 开关
9. 目标工具选择 Codex，并保存 / Apply / Activate
10. 在浏览器中完成 ChatGPT 登录与授权
11. 重启 Codex，重新打开插件面板验证`,b=`CC Switch 路由检查清单：

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
  不要填 https://api.gpt88.cc 或 https://img.gpt88.cc

api key:
  留空
  不要粘贴 gpt88.cc API Key

after apply:
  重启 Codex
  确认插件面板可见`,x=`# 当前终端临时取消 API Key 覆盖，避免 Codex 继续走 API Key 模式
unset OPENAI_API_KEY
unset OPENAI_BASE_URL
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL

# 如果你把这些变量写在 ~/.zshrc、~/.bashrc、~/.profile 或工具配置里，
# 也需要同步删除或注释掉，然后重启终端 / Codex。`,S=`# 1. 先确认你的代理地址。下面只是示例，请改成自己的本地代理端口。
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
launchctl setenv WSS_PROXY "http://127.0.0.1:7890"`,C=`推荐保留两个配置：

profile: gpt88-api
  用途：通过 gpt88.cc 中转站调用模型
  优点：模型多、线路可选、成本透明
  限制：不提供 ChatGPT OAuth 插件身份

profile: chatgpt-oauth
  用途：使用 Codex 插件 / App / ChatGPT 账号权益
  优点：插件能力可用，继承 ChatGPT 账号或团队空间权限
  限制：模型与用量走 ChatGPT/Codex 官方账号体系`;function w({headers:e,rows:t}){return(0,s.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,s.jsxs)(`table`,{className:`w-full min-w-[42rem] text-left text-sm`,children:[(0,s.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,s.jsx)(`tr`,{children:e.map(e=>(0,s.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,s.jsx)(`tbody`,{children:t.map((e,t)=>(0,s.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,s.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}function T(){let{locale:e}=n();return e===`en`?(0,s.jsx)(m,{}):(0,s.jsxs)(a,{path:`/docs/guides/codex-plugins-oauth`,title:`Codex 插件与 ChatGPT OAuth 登录`,description:`当你通过 CC Switch 使用 gpt88.cc 中转站 API 登录 Codex 后，如果插件能力不可用，可以安装 Codex CLI、开启 ChatGPT OAuth，并在 CC Switch 中启用 Codex OAuth 路由来恢复插件。`,headings:[{id:`problem`,text:`问题现象`,level:2},{id:`why`,text:`为什么 API Key 模式不能用插件`,level:2},{id:`compare`,text:`两种登录模式对比`,level:2},{id:`prepare`,text:`先准备三件事`,level:2},{id:`install-codex`,text:`安装 Codex CLI`,level:3},{id:`enable-oauth`,text:`开启 ChatGPT OAuth 认证`,level:3},{id:`enable-cc-switch-route`,text:`开启 CC Switch 路由`,level:3},{id:`switch`,text:`切换到 ChatGPT OAuth`,level:2},{id:`cc-switch`,text:`通过 CC Switch 切换`,level:3},{id:`codex-cli`,text:`通过 Codex CLI 切换`,level:3},{id:`env`,text:`清理环境变量覆盖`,level:3},{id:`verify`,text:`验证插件是否恢复`,level:2},{id:`two-profiles`,text:`推荐保留双配置`,level:2},{id:`troubleshooting`,text:`常见问题排查`,level:2},{id:`reconnecting`,text:`新会话反复 Reconnecting 1/5`,level:3},{id:`references`,text:`官方参考`,level:2}],children:[(0,s.jsx)(o,{tone:`warn`,title:`先明确一个边界`,children:(0,s.jsx)(`p`,{children:`gpt88.cc 中转站 API Key 解决的是“模型调用”问题；Codex 插件功能依赖 ChatGPT / Codex 的 OAuth 账号身份与对应权限。两者不是同一个登录体系。`})}),(0,s.jsx)(`h2`,{id:`problem`,children:`问题现象`}),(0,s.jsxs)(`p`,{children:[`很多用户会用 `,(0,s.jsx)(`code`,{children:`cc switch`}),` 把 Codex 切到 gpt88.cc 中转站， 这样可以通过统一 API 调用模型。但这时如果你进入 Codex 的插件功能， 可能会发现插件入口不可用、插件列表为空，或者插件相关按钮无法点击。`]}),(0,s.jsx)(i,{lang:`text`,filename:`typical symptom`,code:h}),(0,s.jsxs)(`p`,{children:[`这不是你的 API Key 写错了，也不是 gpt88.cc 模型调用失败。 本质上，这是 `,(0,s.jsx)(`strong`,{children:`API Key 模型调用模式`}),` 和`,(0,s.jsx)(`strong`,{children:`ChatGPT OAuth 产品登录模式`}),` 的能力边界不同。`]}),(0,s.jsx)(`h2`,{id:`why`,children:`为什么 API Key 模式不能用插件`}),(0,s.jsx)(`p`,{children:`API Key 登录只证明“这个请求可以扣费并调用模型”。它不会携带你的 ChatGPT 账号会话，也不会携带 ChatGPT 工作区里的 App / Plugin 授权状态。`}),(0,s.jsx)(`p`,{children:`Codex 插件属于 Codex / ChatGPT 产品侧能力，通常需要知道：`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`你是谁：ChatGPT 账号身份；`}),(0,s.jsx)(`li`,{children:`你属于哪个 workspace：个人、Team、Business、Enterprise / Edu；`}),(0,s.jsx)(`li`,{children:`管理员是否允许插件或 App；`}),(0,s.jsx)(`li`,{children:`当前插件是否在你的 workspace 中可用。`})]}),(0,s.jsx)(`p`,{children:`gpt88.cc API Key 不会也不应该伪装成你的 ChatGPT 登录态。 所以，用 gpt88.cc API Key 可以调用模型，但不能解锁依赖 ChatGPT OAuth 身份的插件功能。`}),(0,s.jsx)(`h2`,{id:`compare`,children:`两种登录模式对比`}),(0,s.jsx)(w,{headers:[`模式`,`适合做什么`,`优点`,`限制`],rows:[[(0,s.jsx)(`strong`,{children:`gpt88.cc API Key 模式`},`api`),`通过中转站调用模型、切换线路、统一成本与模型配置`,`模型多、Base URL 可控、适合开发和自动化调用`,`不提供 ChatGPT OAuth 身份，插件 / App 能力可能不可用`],[(0,s.jsx)(`strong`,{children:`ChatGPT OAuth 模式`},`oauth`),`使用 Codex 插件、App、ChatGPT 账号权益或团队空间授权`,`继承 ChatGPT / Codex 产品侧身份，插件能力可用`,`模型、用量与权限走 ChatGPT/Codex 官方账号体系`]]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`先准备三件事`}),(0,s.jsx)(`p`,{children:`如果你的目标是“Codex 能正常使用插件”，不要只改 Base URL。 需要同时满足三件事：本机装好 Codex CLI、Codex 使用 ChatGPT OAuth 认证、 CC Switch 当前激活的是 Codex OAuth 路由。`}),(0,s.jsx)(`h3`,{id:`install-codex`,children:`安装 Codex CLI`}),(0,s.jsxs)(`p`,{children:[`先确认当前机器能运行 `,(0,s.jsx)(`code`,{children:`codex`}),` 命令。官方推荐通过 npm 安装， macOS 用户也可以用 Homebrew。安装后看到版本号，说明 CLI 已经可用。`]}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:g}),(0,s.jsx)(o,{tone:`info`,title:`如果提示 command not found`,children:(0,s.jsxs)(`p`,{children:[`通常是 npm 全局安装目录没有加入 `,(0,s.jsx)(`code`,{children:`PATH`}),`。先执行`,(0,s.jsx)(`code`,{children:` npm config get prefix`}),` 查看安装位置，再把对应的`,(0,s.jsx)(`code`,{children:` bin`}),` 目录加入 shell 配置。处理好后重开终端，再执行`,(0,s.jsx)(`code`,{children:` codex --version`}),`。`]})}),(0,s.jsx)(`h3`,{id:`enable-oauth`,children:`开启 ChatGPT OAuth 认证`}),(0,s.jsxs)(`p`,{children:[`插件依赖 ChatGPT / Codex 产品侧身份，所以这里必须选择`,(0,s.jsx)(`strong`,{children:` Sign in with ChatGPT`}),`。如果你之前已经用 gpt88.cc API Key 登录过，建议先退出，再重新走 OAuth 登录。`]}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:_}),(0,s.jsxs)(`p`,{children:[`OAuth 授权完成后，Codex 会保存本地认证信息。之后你在项目目录运行`,(0,s.jsx)(`code`,{children:` codex`}),`，应当进入 ChatGPT 登录态，而不是再次要求你粘贴 API Key。`]}),(0,s.jsx)(`h3`,{id:`enable-cc-switch-route`,children:`开启 CC Switch 路由`}),(0,s.jsx)(`p`,{children:`CC Switch 不只是“存配置”，它还决定当前 Codex 请求到底走哪条路由。 如果路由没有启用，或者仍然激活的是 gpt88.cc API Key profile， Codex 可能继续按 API Key 模式运行，插件自然不会恢复。`}),(0,s.jsx)(i,{lang:`yaml`,filename:`cc switch route checklist`,code:b}),(0,s.jsx)(o,{tone:`warn`,title:`OAuth 路由不要填 gpt88.cc Base URL`,children:(0,s.jsxs)(`p`,{children:[`这个 profile 的目标是恢复 Codex 插件能力，所以它应当走 ChatGPT OAuth。 gpt88.cc 的 `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),` 仅用于 API Key profile， 不要把 API Key Base URL 混到 OAuth profile 里。`]})}),(0,s.jsx)(`h2`,{id:`switch`,children:`切换到 ChatGPT OAuth`}),(0,s.jsxs)(`p`,{children:[`目标很简单：退出当前 API Key 登录，让 Codex 重新走`,(0,s.jsx)(`strong`,{children:` Sign in with ChatGPT`}),`。不要在这个流程里粘贴 gpt88.cc 的 API Key。`]}),(0,s.jsx)(`h3`,{id:`cc-switch`,children:`通过 CC Switch 切换`}),(0,s.jsx)(`p`,{children:`如果你是通过 CC Switch 管理 Codex 配置，推荐在 CC Switch 里保留两个 profile： 一个用于 gpt88.cc API 调用，一个用于 ChatGPT OAuth 插件功能。 切换后一定要确认 OAuth profile 的路由状态是 Enabled / Active。`}),(0,s.jsx)(i,{lang:`text`,filename:`cc switch flow`,code:y}),(0,s.jsx)(o,{tone:`info`,title:`不同版本的 CC Switch 菜单可能不同`,children:(0,s.jsxs)(`p`,{children:[`如果你的 CC Switch 菜单文案和上面不完全一致，以“退出 API Key 配置”和 “使用 ChatGPT OAuth 登录”这两个动作作为判断标准。 同时确认 `,(0,s.jsx)(`strong`,{children:`Route / Router / 启用路由`}),` 已经打开。`]})}),(0,s.jsx)(`h3`,{id:`codex-cli`,children:`通过 Codex CLI 切换`}),(0,s.jsx)(`p`,{children:`如果你使用的是 OpenAI Codex CLI，可以按官方建议先退出 API Key 模式，再重新启动登录流程。`}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:v}),(0,s.jsxs)(`p`,{children:[`重新登录时，请选择 `,(0,s.jsx)(`strong`,{children:`Sign in with ChatGPT`}),`。 如果界面再次提示输入 API Key，说明你还在走 API Key 登录路径，需要返回上一步重新选择 OAuth。`]}),(0,s.jsx)(`h3`,{id:`env`,children:`清理环境变量覆盖`}),(0,s.jsx)(`p`,{children:`有时你已经在界面里切到 OAuth，但终端环境变量仍然强制 Codex 走 API Key / Base URL。 这时可以先在当前终端临时取消这些变量，再重启 Codex。`}),(0,s.jsx)(i,{lang:`bash`,filename:`terminal`,code:x}),(0,s.jsx)(`p`,{children:`如果这些变量写在 shell 启动文件、IDE 配置或 CC Switch profile 中， 需要在对应位置一起清理，否则下次打开终端还会重新生效。`}),(0,s.jsx)(`h2`,{id:`verify`,children:`验证插件是否恢复`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`重启 Codex 或重新打开 Codex 会话。`}),(0,s.jsx)(`li`,{children:`确认账号区域显示的是 ChatGPT 登录态，而不是仅显示 API Key / Base URL。`}),(0,s.jsx)(`li`,{children:`打开插件 / Plugins / Apps 面板。`}),(0,s.jsx)(`li`,{children:`确认插件列表可见，或插件相关按钮可以正常启用。`}),(0,s.jsx)(`li`,{children:`任选一个插件做最小测试，例如读取当前页面、打开本地预览或执行一个不敏感操作。`})]}),(0,s.jsx)(o,{tone:`tip`,title:`插件恢复后，模型调用和插件调用是两回事`,children:(0,s.jsx)(`p`,{children:`插件能不能用，取决于 ChatGPT OAuth 身份和 workspace 权限； 模型从哪里走，取决于当前 Codex profile / 工具配置。不要把两者混在一起排障。`})}),(0,s.jsx)(`h2`,{id:`two-profiles`,children:`推荐保留双配置`}),(0,s.jsx)(`p`,{children:`最稳的做法不是二选一，而是在 CC Switch 里保留两个配置。 需要中转模型调用时切到 gpt88.cc API；需要插件时切到 ChatGPT OAuth。`}),(0,s.jsx)(i,{lang:`yaml`,filename:`recommended profiles`,code:C}),(0,s.jsx)(`h2`,{id:`troubleshooting`,children:`常见问题排查`}),(0,s.jsx)(`h3`,{children:`1. 已经 OAuth 登录了，插件还是不可用`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[`检查是否仍有 `,(0,s.jsx)(`code`,{children:`OPENAI_API_KEY`}),` / `,(0,s.jsx)(`code`,{children:`OPENAI_BASE_URL`}),` 环境变量覆盖。`]}),(0,s.jsx)(`li`,{children:`检查 CC Switch 当前激活的 profile 是否仍是 gpt88.cc API profile。`}),(0,s.jsx)(`li`,{children:`如果你在 Business / Enterprise / Edu workspace，检查管理员是否禁用了对应 App / Plugin。`}),(0,s.jsx)(`li`,{children:`退出 Codex 后重新打开，避免旧会话缓存登录状态。`})]}),(0,s.jsx)(`h3`,{children:`2. 我还能继续用 gpt88.cc 中转站吗？`}),(0,s.jsx)(`p`,{children:`可以。只是建议把“中转站 API 调用”和“Codex 插件使用”分成两个配置。 不需要插件时，用 gpt88.cc profile；需要插件时，切到 ChatGPT OAuth profile。`}),(0,s.jsx)(`h3`,{children:`3. OAuth 登录会删除我的 gpt88.cc API Key 吗？`}),(0,s.jsx)(`p`,{children:`不会。OAuth 登录只影响 Codex / ChatGPT 这一侧的身份。 你的 gpt88.cc API Key 仍然在 gpt88.cc 控制台中管理。`}),(0,s.jsx)(`h3`,{children:`4. 什么时候应该用 API Key，什么时候用 OAuth？`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`只需要模型调用、脚本、SDK、批量任务：用 gpt88.cc API Key。`}),(0,s.jsx)(`li`,{children:`需要 Codex 插件、App、ChatGPT 账号权益：用 ChatGPT OAuth。`}),(0,s.jsx)(`li`,{children:`两者都需要：在 CC Switch 里建两个 profile，按任务切换。`})]}),(0,s.jsx)(`h3`,{id:`reconnecting`,children:`5. 新会话每次都反复 Reconnecting 1/5 到 5/5`}),(0,s.jsxs)(`p`,{children:[`如果 Codex 每次开启新会话都会出现 `,(0,s.jsx)(`code`,{children:`Reconnecting... 1/5`}),`、`,(0,s.jsx)(`code`,{children:`2/5`}),`、`,(0,s.jsx)(`code`,{children:`3/5`}),` 直到多次重连，通常不是 OAuth 本身坏了， 而是 Codex 的连接链路没有完整吃到代理。尤其是新会话可能走`,(0,s.jsx)(`code`,{children:`wss://`}),` WebSocket 连接，只配置 `,(0,s.jsx)(`code`,{children:`HTTP_PROXY`}),` 和`,(0,s.jsx)(`code`,{children:`HTTPS_PROXY`}),` 可能不够。`]}),(0,s.jsx)(i,{lang:`toml`,filename:`proxy checklist`,code:S}),(0,s.jsx)(o,{tone:`warn`,title:`设置后必须完全退出 Codex 再重开`,children:(0,s.jsx)(`p`,{children:`不要只是关闭窗口。需要从菜单或 Dock 里彻底退出 Codex，让旧进程结束， 再重新打开。否则旧进程不会自动继承新的代理环境。`})}),(0,s.jsxs)(`p`,{children:[`核心思路是同时覆盖三层：HTTP 代理、WebSocket 代理，以及 Codex Desktop 从 macOS 图形界面启动时能读取到的 `,(0,s.jsx)(`code`,{children:`launchctl`}),` 环境。 如果你使用的代理不是 `,(0,s.jsx)(`code`,{children:`127.0.0.1:7890`}),`，请替换成自己的代理地址。`]}),(0,s.jsx)(`h2`,{id:`references`,children:`官方参考`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`a`,{href:`https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan`,target:`_blank`,rel:`noreferrer`,children:`OpenAI：Using Codex with your ChatGPT plan`}),` `,`— Codex 可通过 ChatGPT 账号登录，插件权限受 workspace App / RBAC 控制。`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`a`,{href:`https://help.openai.com/en/articles/11381614-api-codex-cli-and-sign-in-with-chatgpt`,target:`_blank`,rel:`noreferrer`,children:`OpenAI：Codex CLI and Sign in with ChatGPT`}),` `,`— Codex CLI 的 ChatGPT 登录流程与 OAuth 授权说明。`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),` `,`— Codex 入门、CLI 配置和工作流实践，可作为本教程的扩展阅读。`]}),(0,s.jsxs)(`li`,{children:[`如果你只是想配置 gpt88.cc API 模型调用，继续阅读`,` `,(0,s.jsx)(t,{to:`/docs/guides/config-export/`,children:`配置文件导出`}),`。`]})]})]})}export{T as default};