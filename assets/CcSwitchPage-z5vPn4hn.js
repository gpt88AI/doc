import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Install CC-Switch
2. Install the target tools, such as Codex CLI, Claude Code, or Cursor
3. Prepare a gpt88.cc API key
4. Decide whether you need OpenAI-compatible or Claude-compatible routing
5. Remember: plugin capability needs OAuth; model relay uses API key mode`,l=`OpenAI-compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude-compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,u=`1. Open CC-Switch
2. Go to Routes / Providers / API route settings
3. Create the gpt88-openai route
4. Set Base URL to https://api.gpt88.cc
5. Paste the API key
6. Fill in one default chat model
7. Save the route
8. Enable the route
9. Restart the target tool and verify`,d=`1. If the target is Codex or ChatGPT plugin capability, sign out of API key mode first
2. Clear OPENAI_API_KEY, OPENAI_BASE_URL, and related variables
3. Sign in again with OAuth inside the tool
4. Confirm the CC-Switch route is enabled
5. Start a clean session and verify that plugins are visible`,f=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "Test the CC-Switch route"}]
  }'`,p=`1. The tool still uses the old route
   - Confirm the CC-Switch route is enabled
   - Restart the terminal and the target tool

2. 404 response
   - OpenAI-compatible routes must include /v1
   - Claude-compatible routes also use https://api.gpt88.cc

3. Plugins are unavailable
   - Do not keep debugging inside API key mode
   - Sign out of API key mode and switch to OAuth

4. Route looks enabled but requests still fail
   - Test gpt88.cc directly with curl first
   - Then debug the CC-Switch forwarding layer`;function m(){return(0,s.jsxs)(a,{path:`/docs/integrations/dev/cc-switch`,title:`CC-Switch with gpt88.cc`,description:`Route configuration, OpenAI/Claude protocol differences, OAuth switching, and troubleshooting for using gpt88.cc with CC-Switch.`,headings:[{id:`overview`,text:`When to use it`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`routes`,text:`How to fill the routes`,level:2},{id:`flow`,text:`Step-by-step setup`,level:2},{id:`oauth`,text:`OAuth scenarios`,level:2},{id:`verify`,text:`Verify the route`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Why CC-Switch matters`,children:(0,s.jsx)(`p`,{children:`CC-Switch is useful when you want to standardize gpt88.cc routing across multiple tools. API key mode is for model access. Plugin capability still depends on whether the target tool is using OAuth.`})}),(0,s.jsx)(`h2`,{id:`overview`,children:`When to use it`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`You use multiple development tools and want to switch routes centrally.`}),(0,s.jsx)(`li`,{children:`You want OpenAI-compatible and Claude-compatible configurations managed separately.`}),(0,s.jsx)(`li`,{children:`You need to move between API key model access and OAuth-based plugin usage.`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:c}),(0,s.jsx)(`h2`,{id:`routes`,children:`How to fill the routes`}),(0,s.jsxs)(`p`,{children:[`Split routes by protocol first. Do not put `,(0,s.jsx)(`code`,{children:`/v1`}),` into every protocol blindly.`]}),(0,s.jsx)(i,{lang:`text`,filename:`routes`,code:l}),(0,s.jsx)(`h2`,{id:`flow`,children:`Step-by-step setup`}),(0,s.jsx)(i,{lang:`text`,filename:`flow`,code:u}),(0,s.jsx)(`h2`,{id:`oauth`,children:`OAuth scenarios`}),(0,s.jsx)(`p`,{children:`If you are configuring for Codex plugins, ChatGPT account features, or similar OAuth behavior, the key question is the login mode, not just the model Base URL.`}),(0,s.jsx)(i,{lang:`text`,filename:`oauth-flow`,code:d}),(0,s.jsx)(`h2`,{id:`verify`,children:`Verify the route`}),(0,s.jsx)(`p`,{children:`Bypass the tool layer first. Verify that gpt88.cc itself works, then come back to CC-Switch.`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:f}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the OAuth plugin guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/dev/codex-cli/`,`en`),children:`Read the Codex CLI guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var h=`1. 已安装 CC-Switch
2. 已安装需要被路由的工具，例如 Codex CLI / Claude Code / Cursor
3. 已准备 gpt88.cc API Key
4. 已确认要配置 OpenAI 兼容路由还是 Claude 兼容路由
5. 已知道插件能力需要 OAuth，模型中转使用 API Key`,g=`OpenAI 兼容路由
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude 兼容路由
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: claude-sonnet-4-6`,_=`1. 打开 CC-Switch
2. 进入 Routes / Providers / API 路由配置
3. 新建 gpt88-openai 路由
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 填一个默认聊天模型
7. 保存路由
8. 启用路由
9. 重启目标工具并验证`,v=`1. 如果目标是 Codex / ChatGPT 插件能力，先退出 API Key 登录
2. 清理 OPENAI_API_KEY / OPENAI_BASE_URL 等环境变量
3. 在工具里重新走 OAuth 登录
4. 确认 CC-Switch 路由开启
5. 重新开一个干净会话测试插件是否可见`,y=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "测试 CC-Switch 路由"}]
  }'`,b=`1. 工具仍然走旧地址
   - 确认 CC-Switch 路由已经启用
   - 重启终端和目标工具

2. 404
   - OpenAI 兼容路由必须带 /v1
   - Claude 兼容路由同样使用 https://api.gpt88.cc

3. 插件不可用
   - 不要继续在 API Key 模式排查
   - 退出 API Key 登录后改用 OAuth

4. 路由看起来开启但请求失败
   - 先用 curl 直接请求 gpt88.cc
   - 再排查 CC-Switch 转发层`;function x(){let{locale:e}=n();return e===`en`?(0,s.jsx)(m,{}):(0,s.jsxs)(a,{path:`/docs/integrations/dev/cc-switch`,title:`CC-Switch 接入 gpt88.cc`,description:`CC-Switch 的 gpt88.cc 中转站路由、OpenAI/Claude 协议差异、OAuth 切换和排障教程。`,headings:[{id:`overview`,text:`适用场景`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`routes`,text:`路由怎么填`,level:2},{id:`flow`,text:`逐步配置`,level:2},{id:`oauth`,text:`OAuth 场景`,level:2},{id:`verify`,text:`验证路由`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`CC-Switch 的价值`,children:(0,s.jsx)(`p`,{children:`CC-Switch 适合在多个工具之间统一切换中转站路由。模型调用走 gpt88.cc API Key； 插件能力仍然要看目标工具是否使用 OAuth 登录。`})}),(0,s.jsx)(`h2`,{id:`overview`,children:`适用场景`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`你有多个开发工具，需要统一切换 gpt88.cc 路由。`}),(0,s.jsx)(`li`,{children:`你想把 OpenAI 兼容和 Claude 兼容配置分开管理。`}),(0,s.jsx)(`li`,{children:`你需要在 API Key 模型调用和 OAuth 插件能力之间切换。`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:h}),(0,s.jsx)(`h2`,{id:`routes`,children:`路由怎么填`}),(0,s.jsxs)(`p`,{children:[`先按协议拆成两条路由。不要把 `,(0,s.jsx)(`code`,{children:`/v1`}),` 同时填到所有协议里。`]}),(0,s.jsx)(i,{lang:`text`,filename:`routes`,code:g}),(0,s.jsx)(`h2`,{id:`flow`,children:`逐步配置`}),(0,s.jsx)(i,{lang:`text`,filename:`flow`,code:_}),(0,s.jsx)(`h2`,{id:`oauth`,children:`OAuth 场景`}),(0,s.jsx)(`p`,{children:`如果你是为 Codex 插件、ChatGPT 账号能力或类似 OAuth 能力配置，重点不是模型 Base URL，而是登录模式是否正确。`}),(0,s.jsx)(i,{lang:`text`,filename:`oauth-flow`,code:v}),(0,s.jsx)(`h2`,{id:`verify`,children:`验证路由`}),(0,s.jsx)(`p`,{children:`先绕过工具层，用最小请求验证 gpt88.cc 本身可用，再回到 CC-Switch。`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:y}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:b}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`查看插件 OAuth 教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/dev/codex-cli/`,children:`查看 Codex CLI 接入教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]})]})}export{x as default};