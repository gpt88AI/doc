import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-BYmDWq8R.js";import{t as r}from"./CodeBlock-BvvKvitI.js";import{c as i,s as a}from"./index-FnOEfHfs.js";var o=e(),s=`Reconnecting... 1/5
Reconnecting... 2/5
Reconnecting... 3/5
Reconnecting... 4/5
Reconnecting... 5/5
Thinking...`,c=`# macOS / Linux
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# Windows PowerShell
if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "config.toml"
} else {
  Join-Path $HOME ".codex/config.toml"
}

# You can also ask Codex to locate it without editing:
Locate the current Codex config.toml path and tell me only the path. Do not modify the file.`,l=`# macOS / Linux
cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml" "$HOME\\.codex\\config.toml.bak"`,u=`# OpenAI / ChatGPT authentication example from the source post
model_provider = "openai_http"

[model_providers.openai_http]
name = "OpenAI HTTP"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false`,d=`# gpt88.cc API key example
model = "YOUR_MODEL_ID"
model_provider = "gpt88_http"

[model_providers.gpt88_http]
name = "gpt88 HTTP / Responses"
base_url = "https://api.gpt88.cc"
env_key = "OPENAI_API_KEY"
wire_api = "responses"

# Add this only if your Codex version recognizes it:
# supports_websockets = false`,f=`# Set an API key for the current shell
export OPENAI_API_KEY="sk-your-gpt88-api-key"

# Windows PowerShell
$env:OPENAI_API_KEY = "sk-your-gpt88-api-key"`,p=`# Verify the Codex version after reopening the terminal
codex --version

# Start a fresh session
codex

# Start with a minimal test:
Reply with one sentence: Codex connection test passed.

# Then verify a read-only tool task:
List the files in the current directory. Only return file names; do not modify anything.`,m=`# 1. Confirm that the provider id matches exactly
model_provider = "gpt88_http"
[model_providers.gpt88_http]

# 2. Confirm which config directory is active
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# 3. Check for stale overrides
env | grep -E '^(OPENAI_API_KEY|OPENAI_BASE_URL|CODEX_HOME)='

# 4. Upgrade Codex if npm is your installation method
npm install -g @openai/codex@latest`,h=`# macOS / Linux
cp ~/.codex/config.toml.bak ~/.codex/config.toml

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml.bak" "$HOME\\.codex\\config.toml"`,g=`□ Record the original error, time, model, and network
□ Locate the user-level config.toml and check CODEX_HOME
□ Back up the original configuration
□ Make model_provider and the provider id match exactly
□ Set wire_api = "responses"
□ Use env_key for the gpt88 API key path; do not mix it with requires_openai_auth
□ Verify supports_websockets against the installed Codex version
□ Fully close the old session and restart Codex
□ Confirm a normal text request
□ Confirm a minimal read-only tool request
□ Check workspace changes before resuming the original task`;function _(){return(0,o.jsxs)(i,{path:`/docs/guides/codex-http-responses-reconnect`,title:`Codex keeps reconnecting 5/5: HTTP / Responses troubleshooting`,description:`A practical guide to Codex Reconnecting 1/5 through 5/5 symptoms, WebSocket versus HTTP / Responses transport, config.toml providers, verification, and rollback.`,headings:[{id:`conclusion`,text:`Bottom line first`,level:2},{id:`symptom`,text:`What the symptom means`,level:2},{id:`shortest-path`,text:`Fastest recovery path`,level:2},{id:`locate`,text:`Step 1: Find the user-level config.toml`,level:2},{id:`backup`,text:`Step 2: Back up the configuration`,level:2},{id:`configure`,text:`Step 3: Configure an HTTP / Responses provider`,level:2},{id:`restart`,text:`Step 4: Restart and verify`,level:2},{id:`decision`,text:`API key, OAuth, and field choices`,level:2},{id:`troubleshoot`,text:`Troubleshooting order`,level:2},{id:`rollback`,text:`Rollback`,level:2},{id:`checklist`,text:`Acceptance checklist`,level:2},{id:`references`,text:`Sources and references`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,o.jsx)(a,{tone:`warn`,title:`Do not assume that Thinking means the model is slow`,children:(0,o.jsxs)(`p`,{children:[`If Codex first shows `,(0,o.jsx)(`code`,{children:`Reconnecting 1/5`}),` through `,(0,o.jsx)(`code`,{children:`5/5`}),` and only then shows`,` `,(0,o.jsx)(`code`,{children:`Thinking...`}),`, investigate transport, proxy, and provider fallback first. Replaying the same long task usually adds waiting time and context noise.`]})}),(0,o.jsx)(a,{tone:`info`,title:`This is a prioritized troubleshooting path, not a universal root cause`,children:(0,o.jsxs)(`p`,{children:[`This guide summarizes`,` `,(0,o.jsx)(`a`,{href:`https://x.com/yunxi0623/status/2074818514612035683`,target:`_blank`,rel:`noreferrer`,children:`the Codex reconnecting article shared by Yunxi on X`}),`. The source attributes the behavior to WebSocket retries followed by an HTTP fallback. Real environments can also involve version, proxy, gateway, firewall, authentication, and upstream routing issues. Treat the HTTP / Responses switch as an isolation test and verify each layer with a minimal request.`]})}),(0,o.jsx)(`h2`,{id:`conclusion`,children:`Bottom line first`}),(0,o.jsxs)(`p`,{children:[`When Codex is stuck reconnecting, use this order: stop the old session → back up the user-level`,` `,(0,o.jsx)(`code`,{children:`config.toml`}),` → use an HTTP / Responses provider → fully restart Codex → verify normal text first, then a minimal read-only tool call → resume the original task last.`]}),(0,o.jsx)(`p`,{children:`The purpose is to separate model behavior from transport behavior. If a minimal HTTP request is not stable, do not start by changing prompts, choosing a more complex model, or replaying a long task.`}),(0,o.jsx)(`h2`,{id:`symptom`,children:`What the symptom means`}),(0,o.jsx)(r,{lang:`text`,filename:`codex-output.txt`,code:s}),(0,o.jsx)(`p`,{children:`WebSocket is useful for real-time, long-lived interactions and tool calls, but it is more sensitive to proxies, network nodes, corporate firewalls, and intermediary gateways. When connection setup fails, the client may go through a retry and fallback sequence. Five reconnect attempts do not necessarily mean five rounds of deep model reasoning.`}),(0,o.jsx)(`p`,{children:`This is a troubleshooting hypothesis, not a confirmed root cause from terminal text alone. Confidence increases only when a provider or network change produces a clear before-and-after result for both normal and tool requests.`}),(0,o.jsx)(`h2`,{id:`shortest-path`,children:`Fastest recovery path`}),(0,o.jsxs)(`ol`,{children:[(0,o.jsx)(`li`,{children:`Stop the Codex process stuck in reconnecting. Preserve the workspace; do not delete the project.`}),(0,o.jsxs)(`li`,{children:[`Find the user-level `,(0,o.jsx)(`code`,{children:`config.toml`}),` and check whether `,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),` is set.`]}),(0,o.jsx)(`li`,{children:`Back up the file and add a provider; do not delete the original configuration first.`}),(0,o.jsxs)(`li`,{children:[`Set the provider protocol to `,(0,o.jsx)(`code`,{children:`responses`}),`; use `,(0,o.jsx)(`code`,{children:`supports_websockets = false`}),` only if the installed version supports it.`]}),(0,o.jsx)(`li`,{children:`Close the old Codex session and terminal completely.`}),(0,o.jsx)(`li`,{children:`Run one sentence test, then a read-only tool test.`}),(0,o.jsx)(`li`,{children:`Resume the original task only after both minimal tests pass.`})]}),(0,o.jsx)(`h2`,{id:`locate`,children:`Step 1: Find the user-level config.toml`}),(0,o.jsxs)(`p`,{children:[`Codex normally stores user configuration at `,(0,o.jsx)(`code`,{children:`~/.codex/config.toml`}),`. If`,` `,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),` is set, use that directory instead. On Windows, the usual location is`,` `,(0,o.jsx)(`code`,{children:`%USERPROFILE%\\.codex\\config.toml`}),`.`]}),(0,o.jsx)(r,{lang:`bash`,filename:`locate-config.sh`,code:c}),(0,o.jsx)(a,{tone:`tip`,title:`Do not put provider changes only in the project directory`,children:(0,o.jsxs)(`p`,{children:[`The current Codex configuration reference says that project-level `,(0,o.jsx)(`code`,{children:`.codex/config.toml`}),` cannot override some machine-level provider, authentication, and profile settings. Put provider changes in the user-level configuration.`]})}),(0,o.jsx)(`h2`,{id:`backup`,children:`Step 2: Back up the configuration`}),(0,o.jsx)(`p`,{children:`Back up before editing. Also record the Codex version, selected profile, model, and network environment so a rollback has a clear before-and-after comparison.`}),(0,o.jsx)(r,{lang:`bash`,filename:`backup-config.sh`,code:l}),(0,o.jsx)(`h2`,{id:`configure`,children:`Step 3: Configure an HTTP / Responses provider`}),(0,o.jsx)(`p`,{children:`The source post gives an OpenAI / ChatGPT authentication provider example. Its main idea is to use the Responses protocol and avoid preferring the WebSocket path.`}),(0,o.jsx)(r,{lang:`toml`,filename:`source-provider.toml`,code:u}),(0,o.jsx)(a,{tone:`warn`,title:`supports_websockets is version-dependent`,children:(0,o.jsxs)(`p`,{children:[`The current public Codex configuration reference documents custom providers,`,` `,(0,o.jsx)(`code`,{children:`wire_api = "responses"`}),`, `,(0,o.jsx)(`code`,{children:`env_key`}),`, and`,` `,(0,o.jsx)(`code`,{children:`requires_openai_auth`}),`. The `,(0,o.jsx)(`code`,{children:`supports_websockets`}),` field comes from the source post and must be checked against your installed version. If Codex reports an unknown field or fails to parse the file, remove that line, keep the Responses provider, and check the current schema or release notes.`]})}),(0,o.jsxs)(`p`,{children:[`If you use Codex through a gpt88.cc API key, do not copy `,(0,o.jsx)(`code`,{children:`requires_openai_auth = true`}),` from the source post. Use `,(0,o.jsx)(`code`,{children:`env_key`}),` and the gpt88.cc compatible endpoint instead:`]}),(0,o.jsx)(r,{lang:`toml`,filename:`gpt88-provider.toml`,code:d}),(0,o.jsx)(r,{lang:`bash`,filename:`set-api-key.sh`,code:f}),(0,o.jsxs)(`p`,{children:[`The value of `,(0,o.jsx)(`code`,{children:`model_provider`}),` must exactly match the provider id in`,` `,(0,o.jsx)(`code`,{children:`[model_providers.<id>]`}),`. If the id is `,(0,o.jsx)(`code`,{children:`gpt88_http`}),`, do not write`,` `,(0,o.jsx)(`code`,{children:`openai_http`}),` or `,(0,o.jsx)(`code`,{children:`chatgpt_http`}),` at the top.`]}),(0,o.jsx)(`h2`,{id:`restart`,children:`Step 4: Restart and verify`}),(0,o.jsx)(`p`,{children:`Save the file, quit Codex and the terminal, open a new terminal, and start a fresh session. Do not continue only inside the old session; it may retain stale provider, connection, or failure context.`}),(0,o.jsx)(r,{lang:`bash`,filename:`verify-connection.sh`,code:p}),(0,o.jsxs)(`ol`,{children:[(0,o.jsx)(`li`,{children:`Normal text succeeds: authentication, model, and basic HTTP path are at least working.`}),(0,o.jsx)(`li`,{children:`Read-only tool succeeds: the Agent can receive a tool result without failing at the first tool turn.`}),(0,o.jsx)(`li`,{children:`The original task succeeds: the configuration is useful for your real workflow, not just a short smoke test.`})]}),(0,o.jsx)(`h2`,{id:`decision`,children:`API key, OAuth, and field choices`}),(0,o.jsxs)(`table`,{children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{children:`Your goal`}),(0,o.jsx)(`th`,{children:`Prefer`}),(0,o.jsx)(`th`,{children:`Do not mix`})]})}),(0,o.jsxs)(`tbody`,{children:[(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Call models through gpt88.cc`}),(0,o.jsxs)(`td`,{children:[(0,o.jsx)(`code`,{children:`base_url`}),` + `,(0,o.jsx)(`code`,{children:`env_key`}),` + `,(0,o.jsx)(`code`,{children:`wire_api = "responses"`})]}),(0,o.jsxs)(`td`,{children:[`Do not set `,(0,o.jsx)(`code`,{children:`requires_openai_auth = true`}),` in the same profile`]})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Use OpenAI / ChatGPT OAuth`}),(0,o.jsxs)(`td`,{children:[(0,o.jsx)(`code`,{children:`requires_openai_auth = true`}),` and the official login flow`]}),(0,o.jsx)(`td`,{children:`Do not leave gpt88 API key environment variables in the same profile`})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Test WebSocket compatibility`}),(0,o.jsx)(`td`,{children:`Use a minimal HTTP / Responses request as the comparison`}),(0,o.jsx)(`td`,{children:`Do not treat one successful short response as proof that long tasks are stable`})]})]})]}),(0,o.jsxs)(`p`,{children:[`For the complete gpt88.cc Codex CLI setup, continue to`,` `,(0,o.jsx)(t,{to:`/en/docs/integrations/dev/codex-cli/`,children:`Codex CLI with gpt88.cc`}),`. For ChatGPT plugins or OAuth, read `,(0,o.jsx)(t,{to:`/en/docs/guides/codex-plugins-oauth/`,children:`Codex OAuth and plugin login`}),`.`]}),(0,o.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting order`}),(0,o.jsxs)(`ol`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Check the version.`}),` Run `,(0,o.jsx)(`code`,{children:`codex --version`}),`. If it is old, upgrade using your current installation method; npm installations can use `,(0,o.jsx)(`code`,{children:`npm install -g @openai/codex@latest`}),`.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Confirm provider activation.`}),` Check that `,(0,o.jsx)(`code`,{children:`model_provider`}),` and the provider id match exactly, and that Codex is reading the intended `,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),`.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Compare networks.`}),` Test another network, proxy node, or route. If failure is isolated to a corporate network, firewall, or specific node, focus on WebSocket and long-lived connection support.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Start a fresh session.`}),` Reopen the project and launch Codex again. A failed old session is not a valid test of the new provider.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Classify the error.`}),` 401 / 403 usually points to authentication or permission, 404 to Base URL or model, and 524 to a gateway that did not receive a usable upstream response in time. Use the complete error, timestamp, and request id for confirmation.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Check tools separately.`}),` If normal text works but tools fail, inspect shell, hooks, MCP, subprocesses, and tool recovery instead of attributing everything to WebSocket.`]})]}),(0,o.jsx)(r,{lang:`bash`,filename:`diagnose.sh`,code:m}),(0,o.jsx)(a,{tone:`danger`,title:`Do not retry the same long task forever`,children:(0,o.jsxs)(`p`,{children:[`Unstable transport can cause duplicate writes, repeated tool calls, and context growth. Preserve the workspace, run normal and read-only checks first, and inspect `,(0,o.jsx)(`code`,{children:`git status --short`}),` before deciding whether to resume, roll back, or continue.`]})}),(0,o.jsx)(`h2`,{id:`rollback`,children:`Rollback`}),(0,o.jsx)(`p`,{children:`If Codex reports a configuration parse error, model list issue, or worse connection behavior, restore the backup and restart. Rolling back the configuration does not undo files already written to the project; inspect those changes separately.`}),(0,o.jsx)(r,{lang:`bash`,filename:`rollback-config.sh`,code:h}),(0,o.jsxs)(`p`,{children:[`After configuration recovery, run the minimal text test again. If text works but tools still fail, continue with`,` `,(0,o.jsx)(t,{to:`/en/docs/guides/codex-tool-recovery/`,children:`Codex tool recovery`}),` and`,` `,(0,o.jsx)(t,{to:`/en/docs/guides/codex-windows-powershell7-timeout/`,children:`Windows Codex 524 and PowerShell 7`}),`.`]}),(0,o.jsx)(`h2`,{id:`checklist`,children:`Acceptance checklist`}),(0,o.jsx)(r,{lang:`text`,filename:`acceptance-checklist`,code:g}),(0,o.jsx)(`h2`,{id:`references`,children:`Sources and references`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://x.com/yunxi0623/status/2074818514612035683`,target:`_blank`,rel:`noreferrer`,children:`Source X article: Codex keeps reconnecting 5/5`}),` `,`— summarized here with the gpt88 API key boundary added.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-basic`,target:`_blank`,rel:`noreferrer`,children:`Codex Config basics`}),` `,`— official configuration layers and provider overview.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-advanced`,target:`_blank`,rel:`noreferrer`,children:`Codex Advanced Config`}),` `,`— custom providers, Base URL, authentication, and Responses examples.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-reference`,target:`_blank`,rel:`noreferrer`,children:`Codex Configuration Reference`}),` `,`— current config.toml fields and version-sensitive checks.`]})]}),(0,o.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/en/docs/integrations/dev/codex-cli/`,children:`Codex CLI with gpt88.cc`}),`: complete API key, model, and file-tool setup.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/en/docs/guides/codex-tool-recovery/`,children:`Codex tool recovery`}),`: confirm tool state and restart implementation from step one.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/en/docs/guides/codex-windows-powershell7-timeout/`,children:`Windows Codex 524 and PowerShell 7`}),`: continue shell, encoding, and stream troubleshooting.`]})]})]})}var v=`Reconnecting... 1/5
Reconnecting... 2/5
Reconnecting... 3/5
Reconnecting... 4/5
Reconnecting... 5/5
Thinking...`,y=`# macOS / Linux
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# Windows PowerShell
if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "config.toml"
} else {
  Join-Path $HOME ".codex/config.toml"
}

# 也可以让 Codex 只定位文件，不修改文件：
请帮我定位当前 Codex 的 config.toml 配置文件路径，只告诉我路径，不要修改文件。`,b=`# macOS / Linux
cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml" "$HOME\\.codex\\config.toml.bak"`,x=`# 原帖给出的 OpenAI / ChatGPT 登录模式示例
model_provider = "openai_http"

[model_providers.openai_http]
name = "OpenAI HTTP"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false`,S=`# gpt88.cc API Key 模式示例
model = "YOUR_MODEL_ID"
model_provider = "gpt88_http"

[model_providers.gpt88_http]
name = "gpt88 HTTP / Responses"
base_url = "https://api.gpt88.cc"
env_key = "OPENAI_API_KEY"
wire_api = "responses"

# 只有当前 Codex 版本识别该字段时才添加：
# supports_websockets = false`,C=`# 当前终端临时设置 API Key
export OPENAI_API_KEY="sk-你的-gpt88-api-key"

# Windows PowerShell
$env:OPENAI_API_KEY = "sk-你的-gpt88-api-key"`,w=`# 重新打开终端后验证 Codex 版本
codex --version

# 启动一个全新会话
codex

# 先发最小测试，不要立即重放原来的长任务：
请用一句话回复：Codex 连接测试成功。

# 再验证一次最小工具任务：
请列出当前目录中的文件，只告诉我文件名，不要修改任何文件。`,T=`# 1. 确认 provider 名称完全一致
model_provider = "gpt88_http"
[model_providers.gpt88_http]

# 2. 确认当前使用的配置文件
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# 3. 确认当前环境没有覆盖旧地址或旧 Key
env | grep -E '^(OPENAI_API_KEY|OPENAI_BASE_URL|CODEX_HOME)='

# 4. 更新 Codex（如果你的安装方式是 npm）
npm install -g @openai/codex@latest`,E=`# macOS / Linux
cp ~/.codex/config.toml.bak ~/.codex/config.toml

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml.bak" "$HOME\\.codex\\config.toml"`,D=`□ 已记录原始错误、时间、模型和当前网络环境
□ 已找到用户级 config.toml，并确认是否设置了 CODEX_HOME
□ 已备份原配置
□ provider id 与 model_provider 完全一致
□ wire_api = "responses"
□ gpt88 API Key 模式使用 env_key，不与 requires_openai_auth 混用
□ supports_websockets 字段已按当前 Codex 版本验证
□ 已完全退出旧会话，并重新启动 Codex
□ 普通文本请求成功
□ 最小只读工具请求成功
□ 再恢复原任务前，已确认工作区文件状态`;function O(){let{locale:e}=n();return e===`en`?(0,o.jsx)(_,{}):(0,o.jsxs)(i,{path:`/docs/guides/codex-http-responses-reconnect`,title:`Codex 一直重新连接 5/5：HTTP / Responses 连接排障`,description:`整理 Codex 出现 Reconnecting 1/5 到 5/5、Thinking... 的连接层排查方法，说明 WebSocket、HTTP / Responses、config.toml、provider 配置和回滚验证。`,headings:[{id:`conclusion`,text:`先给结论`,level:2},{id:`symptom`,text:`你看到的现象说明什么`,level:2},{id:`shortest-path`,text:`最快恢复路径`,level:2},{id:`locate`,text:`第一步：找到用户级 config.toml`,level:2},{id:`backup`,text:`第二步：备份配置`,level:2},{id:`configure`,text:`第三步：配置 HTTP / Responses provider`,level:2},{id:`restart`,text:`第四步：重启并验证`,level:2},{id:`decision`,text:`API Key、OAuth 和字段选择`,level:2},{id:`troubleshoot`,text:`仍然卡住时的排查顺序`,level:2},{id:`rollback`,text:`失败时如何回滚`,level:2},{id:`checklist`,text:`发布前验收清单`,level:2},{id:`references`,text:`来源与参考`,level:2},{id:`next`,text:`下一步阅读`,level:2}],children:[(0,o.jsx)(a,{tone:`warn`,title:`先不要把“正在思考”直接当成模型慢`,children:(0,o.jsxs)(`p`,{children:[`如果 Codex 先连续显示 `,(0,o.jsx)(`code`,{children:`Reconnecting 1/5`}),` 到 `,(0,o.jsx)(`code`,{children:`5/5`}),`， 然后才显示 `,(0,o.jsx)(`code`,{children:`Thinking...`}),`，优先检查连接层、代理和 provider 回退。 这类现象可能发生在模型真正开始工作之前，重复发送同一个长任务通常只会增加等待和上下文噪音。`]})}),(0,o.jsx)(a,{tone:`info`,title:`这是一条优先尝试的排障路径，不是所有环境的绝对结论`,children:(0,o.jsxs)(`p`,{children:[`本页整理自`,` `,(0,o.jsx)(`a`,{href:`https://x.com/yunxi0623/status/2074818514612035683`,target:`_blank`,rel:`noreferrer`,children:`云析在 X 上分享的 Codex 重连排障文章`}),`。文章把问题归因到 WebSocket 连接反复失败后回退 HTTP；实际环境还可能涉及版本、代理、网关、 防火墙、认证和服务端线路。因此请把“切到 HTTP / Responses”当成隔离变量，按最小请求逐层验证。`]})}),(0,o.jsx)(`h2`,{id:`conclusion`,children:`先给结论`}),(0,o.jsxs)(`p`,{children:[`当 Codex 长时间卡在重连时，建议按这个顺序处理：停止旧会话 → 备份用户级`,(0,o.jsx)(`code`,{children:`config.toml`}),` → 使用 HTTP / Responses provider → 完全重启 Codex → 先验证普通文本，再验证最小只读工具 → 最后恢复原任务。`]}),(0,o.jsx)(`p`,{children:`这个顺序的重点是把“模型能力问题”和“连接 / 协议问题”分开。只要最小 HTTP 请求都没有稳定返回， 就不应该先继续调提示词、换复杂模型或重放长任务。`}),(0,o.jsx)(`h2`,{id:`symptom`,children:`你看到的现象说明什么`}),(0,o.jsx)(r,{lang:`text`,filename:`codex-output.txt`,code:v}),(0,o.jsx)(`p`,{children:`WebSocket 适合实时、持续的长连接和工具调用，但它对代理、网络节点、公司防火墙和中间网关的支持更敏感。 如果连接建立失败，客户端可能经历“尝试 → 重连 → 回退”的过程，所以终端中的 5 次重连不一定代表模型进行了 5 次深度推理。`}),(0,o.jsx)(`p`,{children:`这里的判断是排障假设，不是单凭一段终端文字就能确认的根因。只有在切换网络或 provider 后明显恢复， 并且普通请求与工具请求都能复现对照结果，才能把连接层问题的可信度提高。`}),(0,o.jsx)(`h2`,{id:`shortest-path`,children:`最快恢复路径`}),(0,o.jsxs)(`ol`,{children:[(0,o.jsx)(`li`,{children:`停止卡在重连中的 Codex 进程，保留工作区，不要删除项目目录。`}),(0,o.jsxs)(`li`,{children:[`找到用户级 `,(0,o.jsx)(`code`,{children:`config.toml`}),`，确认是否使用了 `,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),`。`]}),(0,o.jsx)(`li`,{children:`复制一份备份，再新增 provider；不要先删除原配置。`}),(0,o.jsxs)(`li`,{children:[`把 provider 的协议设置为 `,(0,o.jsx)(`code`,{children:`responses`}),`；仅当当前版本识别时才使用 `,(0,o.jsx)(`code`,{children:`supports_websockets = false`}),`。`]}),(0,o.jsx)(`li`,{children:`完全关闭旧 Codex，会话和终端都重新打开。`}),(0,o.jsx)(`li`,{children:`先发送一句话测试，再做一个只读工具测试。`}),(0,o.jsx)(`li`,{children:`两个最小测试都成功后，才恢复原来的长任务。`})]}),(0,o.jsx)(`h2`,{id:`locate`,children:`第一步：找到用户级 config.toml`}),(0,o.jsxs)(`p`,{children:[`Codex 的用户级配置通常位于 `,(0,o.jsx)(`code`,{children:`~/.codex/config.toml`}),`。如果设置了`,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),`，应以该目录为准。Windows 通常对应`,(0,o.jsx)(`code`,{children:`%USERPROFILE%\\.codex\\config.toml`}),`。`]}),(0,o.jsx)(r,{lang:`bash`,filename:`locate-config.sh`,code:y}),(0,o.jsx)(a,{tone:`tip`,title:`不要把 provider 配置只放在项目目录`,children:(0,o.jsxs)(`p`,{children:[`当前 Codex 配置参考说明，项目级 `,(0,o.jsx)(`code`,{children:`.codex/config.toml`}),` 不能覆盖部分机器级 provider、 认证和 profile 设置。需要调整 provider 时，优先修改用户级配置；项目级配置只用于项目允许覆盖的选项。`]})}),(0,o.jsx)(`h2`,{id:`backup`,children:`第二步：备份配置`}),(0,o.jsx)(`p`,{children:`先备份再改动。除了复制文件，也建议保留当前 Codex 版本、使用的 profile、模型名和当前网络环境， 这样回滚后才知道恢复了什么。`}),(0,o.jsx)(r,{lang:`bash`,filename:`backup-config.sh`,code:b}),(0,o.jsx)(`h2`,{id:`configure`,children:`第三步：配置 HTTP / Responses provider`}),(0,o.jsx)(`p`,{children:`原帖给出的配置是 OpenAI / ChatGPT 登录模式的 provider 示例。它表达的核心是： provider 使用 Responses 协议，并尝试关闭 WebSocket 优先路径。`}),(0,o.jsx)(r,{lang:`toml`,filename:`source-provider.toml`,code:x}),(0,o.jsx)(a,{tone:`warn`,title:`supports_websockets 是版本相关字段`,children:(0,o.jsxs)(`p`,{children:[`当前公开的 Codex 配置参考明确记录了自定义 provider、`,(0,o.jsx)(`code`,{children:`wire_api = "responses"`}),`、`,(0,o.jsx)(`code`,{children:`env_key`}),` 和 `,(0,o.jsx)(`code`,{children:`requires_openai_auth`}),`；原帖中的`,(0,o.jsx)(`code`,{children:`supports_websockets`}),` 需要以你安装的 Codex 版本为准。如果启动时报`,(0,o.jsx)(`code`,{children:`unknown field`}),` 或配置解析失败，先删除这一行，保留 Responses provider， 再根据当前版本的 schema 或升级说明处理。`]})}),(0,o.jsxs)(`p`,{children:[`如果你是通过 gpt88.cc API Key 使用 Codex，不要把原帖的`,(0,o.jsx)(`code`,{children:`requires_openai_auth = true`}),` 直接复制过来。API Key 模式应使用`,(0,o.jsx)(`code`,{children:`env_key`}),`，并把 provider 指向 gpt88.cc 的兼容入口：`]}),(0,o.jsx)(r,{lang:`toml`,filename:`gpt88-provider.toml`,code:S}),(0,o.jsx)(r,{lang:`bash`,filename:`set-api-key.sh`,code:C}),(0,o.jsxs)(`p`,{children:[(0,o.jsx)(`code`,{children:`model_provider`}),` 的值必须和 `,(0,o.jsx)(`code`,{children:`[model_providers.<id>]`}),` 中的 provider id 完全一致。例如 provider id 是 `,(0,o.jsx)(`code`,{children:`gpt88_http`}),`，顶部就不能写成`,(0,o.jsx)(`code`,{children:`openai_http`}),` 或 `,(0,o.jsx)(`code`,{children:`chatgpt_http`}),`。`]}),(0,o.jsx)(`h2`,{id:`restart`,children:`第四步：重启并验证`}),(0,o.jsx)(`p`,{children:`保存配置后，退出当前 Codex 和终端，重新打开一个终端，再启动全新会话。不要只在旧会话里继续发送消息， 因为旧会话可能已经保留了旧 provider、旧连接状态或失败上下文。`}),(0,o.jsx)(r,{lang:`bash`,filename:`verify-connection.sh`,code:w}),(0,o.jsxs)(`ol`,{children:[(0,o.jsx)(`li`,{children:`普通文本请求成功：说明认证、模型和基础 HTTP 通路至少可用。`}),(0,o.jsx)(`li`,{children:`只读工具请求成功：说明 Agent 能继续接收工具结果，连接问题没有在第一轮工具调用处复现。`}),(0,o.jsx)(`li`,{children:`原任务成功：才可以认为这次配置对你的真实工作流有效。`})]}),(0,o.jsx)(`h2`,{id:`decision`,children:`API Key、OAuth 和字段选择`}),(0,o.jsxs)(`table`,{children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{children:`你的目标`}),(0,o.jsx)(`th`,{children:`优先配置`}),(0,o.jsx)(`th`,{children:`不要混用`})]})}),(0,o.jsxs)(`tbody`,{children:[(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`通过 gpt88.cc 调模型`}),(0,o.jsxs)(`td`,{children:[(0,o.jsx)(`code`,{children:`base_url`}),` + `,(0,o.jsx)(`code`,{children:`env_key`}),` + `,(0,o.jsx)(`code`,{children:`wire_api = "responses"`})]}),(0,o.jsxs)(`td`,{children:[`不要同时设置 `,(0,o.jsx)(`code`,{children:`requires_openai_auth = true`})]})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`使用 OpenAI / ChatGPT OAuth`}),(0,o.jsxs)(`td`,{children:[(0,o.jsx)(`code`,{children:`requires_openai_auth = true`}),`，按官方登录方式授权`]}),(0,o.jsx)(`td`,{children:`不要在同一个 profile 中残留 gpt88 API Key 环境变量`})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`排查 WebSocket 兼容性`}),(0,o.jsx)(`td`,{children:`先用最小 HTTP / Responses 请求做对照`}),(0,o.jsx)(`td`,{children:`不要把一次成功就当成所有长任务都稳定`})]})]})]}),(0,o.jsxs)(`p`,{children:[`如果你还需要完整的 gpt88.cc Codex CLI 配置流程，可以继续阅读`,` `,(0,o.jsx)(t,{to:`/docs/integrations/dev/codex-cli/`,children:`Codex CLI 接入 gpt88.cc`}),`； 如果目标是 ChatGPT 插件或 OAuth 能力，请阅读`,` `,(0,o.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex 插件 OAuth 登录`}),`。`]}),(0,o.jsx)(`h2`,{id:`troubleshoot`,children:`仍然卡住时的排查顺序`}),(0,o.jsxs)(`ol`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`确认版本。`}),`先运行 `,(0,o.jsx)(`code`,{children:`codex --version`}),`。如果是旧版本，按当前安装方式升级； npm 安装可以参考 `,(0,o.jsx)(`code`,{children:`npm install -g @openai/codex@latest`}),`。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`确认 provider 配置生效。`}),`检查 `,(0,o.jsx)(`code`,{children:`model_provider`}),` 与 provider id 是否完全一致， 并确认当前读取的是用户级 config，而不是另一个 `,(0,o.jsx)(`code`,{children:`CODEX_HOME`}),` 目录。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`确认网络链路。`}),`换一个网络、代理节点或线路做对照；如果只在公司网络、防火墙或特定节点失败， 重点检查 WebSocket 和长连接支持，而不是先换模型。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`开新会话。`}),`关闭旧会话，重新进入项目目录启动 Codex。旧会话中的失败连接和上下文不能作为新配置的验证结果。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`区分错误类型。`}),`401 / 403 更像认证或权限，404 更像 Base URL 或模型名，524 更像网关没有及时得到可用上游响应； 仍需结合完整错误、时间和 request id 判断。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`检查工具状态。`}),`普通文本成功但工具调用失败时，继续看 shell、hook、MCP、子进程和工具恢复， 不要把所有问题都归因到 WebSocket。`]})]}),(0,o.jsx)(r,{lang:`bash`,filename:`diagnose.sh`,code:T}),(0,o.jsx)(a,{tone:`danger`,title:`不要无限重试同一个长任务`,children:(0,o.jsxs)(`p`,{children:[`如果连接层还没有稳定，重复执行会造成重复写文件、重复调用工具和上下文膨胀。先保留工作区，做普通请求和只读工具请求； 如果工作区可能已经被部分修改，先运行 `,(0,o.jsx)(`code`,{children:`git status --short`}),`，再决定恢复、回滚还是继续。`]})}),(0,o.jsx)(`h2`,{id:`rollback`,children:`失败时如何回滚`}),(0,o.jsx)(`p`,{children:`如果 Codex 启动时报配置解析错误、模型列表异常或连接行为更差，先恢复备份，再重新启动。回滚只针对配置文件， 不会自动撤销已经写入项目的文件，因此项目改动仍要单独检查。`}),(0,o.jsx)(r,{lang:`bash`,filename:`rollback-config.sh`,code:E}),(0,o.jsxs)(`p`,{children:[`配置恢复后，重新运行最小文本测试。如果文本恢复但工具仍失败，可以转到`,` `,(0,o.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex 工具恢复`}),` 和`,` `,(0,o.jsx)(t,{to:`/docs/guides/codex-windows-powershell7-timeout/`,children:`Windows Codex 524 与 PowerShell 7`}),`继续分层排查。`]}),(0,o.jsx)(`h2`,{id:`checklist`,children:`发布前验收清单`}),(0,o.jsx)(r,{lang:`text`,filename:`acceptance-checklist`,code:D}),(0,o.jsx)(`h2`,{id:`references`,children:`来源与参考`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://x.com/yunxi0623/status/2074818514612035683`,target:`_blank`,rel:`noreferrer`,children:`原始 X 文章：CodeX 老是“正在重新连接 5/5、正在思考”`}),` `,`— 本页对其现象、配置思路和排查顺序进行了整理，并补充了 gpt88 API Key 的配置边界。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-basic`,target:`_blank`,rel:`noreferrer`,children:`Codex Config basics`}),` `,`— 用户级配置、provider 和配置层级的官方说明。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-advanced`,target:`_blank`,rel:`noreferrer`,children:`Codex Advanced Config`}),` `,`— 自定义 model provider、Base URL、认证和 Responses 协议示例。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`a`,{href:`https://learn.chatgpt.com/docs/config-file/config-reference`,target:`_blank`,rel:`noreferrer`,children:`Codex Configuration Reference`}),` `,`— 当前 config.toml 字段和版本差异的核对入口。`]})]}),(0,o.jsx)(`h2`,{id:`next`,children:`下一步阅读`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/docs/integrations/dev/codex-cli/`,children:`Codex CLI 接入 gpt88.cc`}),`：完成 API Key、模型和文件工具的完整配置。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex 工具恢复`}),`：工具失效后如何确认状态并从第一步重新落代码。`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(t,{to:`/docs/guides/codex-windows-powershell7-timeout/`,children:`Windows Codex 524 与 PowerShell 7`}),`：继续排查 shell、编码和流式输出。`]})]})]})}export{O as default};