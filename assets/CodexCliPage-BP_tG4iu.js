import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Install Codex CLI
2. Prepare a gpt88.cc API key
3. Decide whether you need API key mode or OAuth mode
4. Confirm the OpenAI-compatible Base URL: https://api.gpt88.cc
5. Prepare one minimal verification task, such as "create hello.txt"`,l=`# macOS / Linux
npm install -g @openai/codex

# verify
codex --version`,u=`[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`,d=`export OPENAI_API_KEY="sk-your-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,f=`codex --profile gpt88

# after the session opens, ask:
Create a file named hello.txt with the content "hello gpt88", then check whether the file was written successfully.`,p=`1. For pure model access: use API key mode
2. For ChatGPT account plugin capability: log out of API key mode and use OAuth
3. In OAuth mode, do not keep OPENAI_API_KEY or OPENAI_BASE_URL in the environment
4. If you use CC-Switch, confirm the route is enabled
5. After switching modes, start a fresh Codex session and verify again`,m=`1. New sessions reconnect repeatedly
   - Check proxy variables and old API key variables
   - Clear them and reopen the terminal

2. Tools suddenly become unavailable and code cannot be written
   - Ask Codex to check whether file tools are currently available
   - After tools recover, explicitly tell Codex: tools are restored, start implementing from step one
   - This is usually a session tool-state issue, not a model issue

3. 401 response
   - API key is wrong or lacks permission

4. 404 response
   - Base URL or model name is wrong

5. Plugin features are unavailable
   - This is expected if you are logged in with API key mode
   - Exit API key login and switch to OAuth`;function h(){return(0,s.jsxs)(a,{path:`/docs/integrations/dev/codex-cli`,title:`Codex CLI with gpt88.cc`,description:`Connect Codex CLI to gpt88.cc, switch between API key and OAuth modes, understand plugin limits, and recover tool execution when sessions break.`,headings:[{id:`overview`,text:`Bottom line first`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`install`,text:`Step 1: Install Codex CLI`,level:2},{id:`configure`,text:`Step 2: Configure API key mode`,level:2},{id:`verify`,text:`Step 3: Verify file tools`,level:2},{id:`oauth`,text:`OAuth and plugin capability`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`references`,text:`Further reading`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`warn`,title:`API key and OAuth solve different problems`,children:(0,s.jsx)(`p`,{children:`API key mode is the direct way to route Codex CLI model access through gpt88.cc. If you need ChatGPT account plugin capability, you must sign out of API key mode and use OAuth instead.`})}),(0,s.jsx)(o,{tone:`tip`,title:`Supplementary external reference`,children:(0,s.jsxs)(`p`,{children:[`For a broader Codex workflow reference, review`,` `,(0,s.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`.`]})}),(0,s.jsx)(`h2`,{id:`overview`,children:`Bottom line first`}),(0,s.jsxs)(`p`,{children:[`The core path is simple: install the CLI, point it at `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`, and verify the toolchain with a task that actually reads and writes files. If plugin capability is missing, first check whether you are still in API key mode.`]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:c}),(0,s.jsx)(`h2`,{id:`install`,children:`Step 1: Install Codex CLI`}),(0,s.jsx)(`p`,{children:`If Codex CLI is not installed yet, install it and confirm the command exists.`}),(0,s.jsx)(i,{lang:`bash`,filename:`install.sh`,code:l}),(0,s.jsx)(`h2`,{id:`configure`,children:`Step 2: Configure API key mode`}),(0,s.jsxs)(`p`,{children:[`API key mode is for normal model usage. The two key checks are whether `,(0,s.jsx)(`code`,{children:`base_url`}),` includes`,(0,s.jsx)(`code`,{children:`/v1`}),` and whether the model name is a real model ID currently supported by gpt88.cc.`]}),(0,s.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:u}),(0,s.jsx)(`p`,{children:`If you prefer environment variables, set them in the terminal session:`}),(0,s.jsx)(i,{lang:`bash`,filename:`.envrc`,code:d}),(0,s.jsx)(`h2`,{id:`verify`,children:`Step 3: Verify file tools`}),(0,s.jsx)(`p`,{children:`Do not stop at a simple chat reply. Codex is an agent, so the critical check is whether it can read files, write files, and continue an implementation task.`}),(0,s.jsx)(i,{lang:`bash`,filename:`verify.sh`,code:f}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Start Codex CLI.`}),(0,s.jsx)(`li`,{children:`Ask it to create a small file.`}),(0,s.jsx)(`li`,{children:`Ask it to read the file back and confirm the content.`}),(0,s.jsx)(`li`,{children:`If file tools are unavailable, fix tool state first instead of changing models.`})]}),(0,s.jsx)(`h2`,{id:`oauth`,children:`OAuth and plugin capability`}),(0,s.jsx)(i,{lang:`text`,filename:`oauth-notes`,code:p}),(0,s.jsxs)(`p`,{children:[`If your real goal is plugin capability, continue with the`,` `,(0,s.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Codex OAuth plugin guide`}),`. If you only need stable model access through gpt88.cc, API key mode is the simpler route.`]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:m}),(0,s.jsx)(`h2`,{id:`references`,children:`Further reading`}),(0,s.jsx)(`ul`,{children:(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),` `,`for broader Codex onboarding, CLI configuration, and workflow practices.`]})}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/codex-tool-recovery/`,`en`),children:`Read the tool recovery guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the OAuth plugin guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/dev/cc-switch/`,`en`),children:`Read the CC-Switch route guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var g=`1. 已安装 Codex CLI
2. 已准备 gpt88.cc API Key
3. 已确认当前要走 API Key 模式还是 OAuth 模式
4. 已确认 OpenAI 兼容 Base URL: https://api.gpt88.cc
5. 已准备一个最小验证任务，例如“创建一个 hello.txt”`,_=`# macOS / Linux
npm install -g @openai/codex

# 验证安装
codex --version`,v=`[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`,y=`export OPENAI_API_KEY="sk-你的-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,b=`codex --profile gpt88

# 进入会话后输入：
请创建一个 hello.txt，内容为 hello gpt88，并检查文件是否写入成功。`,x=`1. 只需要模型调用：使用 API Key 模式
2. 需要 ChatGPT 账号插件能力：退出 API Key，使用 OAuth 登录
3. OAuth 模式不要保留 OPENAI_API_KEY / OPENAI_BASE_URL 污染环境
4. 使用 CC-Switch 时，需要确认路由已经开启
5. 切换模式后，重新开启一个 Codex 会话验证`,S=`1. 每次新会话反复 reconnect
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
   - 退出 API Key 登录，改用 OAuth`;function C(){let{locale:e}=n();return e===`en`?(0,s.jsx)(h,{}):(0,s.jsxs)(a,{path:`/docs/integrations/dev/codex-cli`,title:`Codex CLI 接入 gpt88.cc`,description:`Codex CLI 使用 gpt88.cc 的模型接入、OAuth 切换、插件限制和工具恢复教程。`,headings:[{id:`overview`,text:`先看结论`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`install`,text:`第一步：安装 Codex CLI`,level:2},{id:`configure`,text:`第二步：配置 API Key 模式`,level:2},{id:`verify`,text:`第三步：验证文件工具`,level:2},{id:`oauth`,text:`OAuth 与插件能力`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`references`,text:`扩展阅读`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`warn`,title:`API Key 和 OAuth 是两套目标`,children:(0,s.jsx)(`p`,{children:`API Key 模式适合把 Codex CLI 接入 gpt88.cc 调用模型；如果你要使用 ChatGPT 账号插件能力，需要退出 API Key 登录并使用 OAuth。两种模式不要混在一个会话里排查。`})}),(0,s.jsx)(o,{tone:`tip`,title:`额外参考`,children:(0,s.jsxs)(`p`,{children:[`如果你想看更系统的 Codex 使用、CLI 配置和工作流整理，可以参考`,` `,(0,s.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`。这是外部实践指南，适合作为本页的补充阅读。`]})}),(0,s.jsx)(`h2`,{id:`overview`,children:`先看结论`}),(0,s.jsxs)(`p`,{children:[`Codex CLI 作为开发工具接入 gpt88.cc 时，核心是三件事：安装 CLI、配置`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`、用一个会写文件的最小任务验证工具链。 如果遇到插件不可用，要先判断自己是不是还在 API Key 模式。`]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:g}),(0,s.jsx)(`h2`,{id:`install`,children:`第一步：安装 Codex CLI`}),(0,s.jsx)(`p`,{children:`如果本机还没有 Codex CLI，先安装并确认命令可用。`}),(0,s.jsx)(i,{lang:`bash`,filename:`install.sh`,code:_}),(0,s.jsx)(`h2`,{id:`configure`,children:`第二步：配置 API Key 模式`}),(0,s.jsxs)(`p`,{children:[`API Key 模式用于普通模型调用。配置时重点检查 `,(0,s.jsx)(`code`,{children:`base_url`}),` 是否带`,(0,s.jsx)(`code`,{children:`/v1`}),`，以及模型名是否是 gpt88.cc 当前支持的真实模型 ID。`]}),(0,s.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:v}),(0,s.jsx)(`p`,{children:`如果你更习惯用环境变量，也可以在当前终端设置：`}),(0,s.jsx)(i,{lang:`bash`,filename:`.envrc`,code:y}),(0,s.jsx)(`h2`,{id:`verify`,children:`第三步：验证文件工具`}),(0,s.jsx)(`p`,{children:`不要只问一句聊天问题。Codex 是代码代理，最重要的是确认“能读文件、能写文件、能继续执行任务”。`}),(0,s.jsx)(i,{lang:`bash`,filename:`verify.sh`,code:b}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`启动 Codex CLI。`}),(0,s.jsx)(`li`,{children:`让它创建一个简单文件。`}),(0,s.jsx)(`li`,{children:`让它读取并确认文件内容。`}),(0,s.jsx)(`li`,{children:`如果文件工具不可用，先修复工具状态，不要先换模型。`})]}),(0,s.jsx)(`h2`,{id:`oauth`,children:`OAuth 与插件能力`}),(0,s.jsx)(i,{lang:`text`,filename:`oauth-notes`,code:x}),(0,s.jsxs)(`p`,{children:[`如果你要的是插件能力，继续看`,(0,s.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:` Codex 插件 OAuth 教程`}),`。 如果你只是要稳定调用 gpt88.cc 模型，API Key 模式更直接。`]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:S}),(0,s.jsx)(`h2`,{id:`references`,children:`扩展阅读`}),(0,s.jsx)(`ul`,{children:(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),` `,`— Codex 入门、CLI 配置、工作流和实践经验整理，可作为 gpt88.cc Codex 接入教程之外的补充参考。`]})}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`查看工具恢复教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`查看 OAuth 插件教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/dev/cc-switch/`,children:`查看 CC-Switch 路由教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]})]})}export{C as default};