import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,n as o,s,t as c}from"./index-ivPh6OuT.js";var l=e(),u=`1. Install Claude Code
2. Prepare either an API key or OAuth login
3. For gpt88.cc, use the compatible OpenAI/Claude routing mode
4. If you need plugin capability, use OAuth instead of API key login
5. Validate the toolchain with one minimal task first`,d=`1. Decide whether you need model access or plugin capability
2. Prefer API key mode for pure model calls
3. Prefer OAuth mode for plugins and account-linked features
4. Clear old environment variables before switching modes
5. Use a minimal task to verify the switch`,f=`1. Plugins are unavailable
   - Confirm whether you are still in API key mode
   - If you need plugins, switch to OAuth

2. Repeated reconnect loops
   - Check proxy variables
   - Check whether an old session config is polluting the environment

3. Model calls fail
   - Check Base URL and API key first
   - Then verify the model name`;function p(){return(0,l.jsxs)(a,{path:`/docs/integrations/dev/claude-code`,title:`Claude Code with gpt88.cc`,description:`How to use Claude Code with gpt88.cc for model access, OAuth login, plugins, and routing decisions.`,headings:[{id:`overview`,text:`What this page covers`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Quick setup`,level:2},{id:`notes`,text:`Mode differences`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(s,{tone:`warn`,title:`Separate the two modes`,children:(0,l.jsx)(`p`,{children:`API key mode is primarily for model access. OAuth mode is primarily for plugins and account-linked features. Do not troubleshoot them as if they were the same path.`})}),(0,l.jsx)(`p`,{children:`The most common mistake in Claude Code is treating “model access” and “plugin login” as one problem. If you only need the model, API key mode is enough. If you need plugins or account features, you need OAuth.`}),(0,l.jsx)(`h2`,{id:`overview`,children:`What this page covers`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`How to route Claude Code model calls through gpt88.cc.`}),(0,l.jsx)(`li`,{children:`Why plugin capability is tied to OAuth instead of raw API key mode.`}),(0,l.jsx)(`li`,{children:`What should be cleaned before switching modes.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d}),(0,l.jsx)(`h2`,{id:`setup`,children:`Quick setup`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`h2`,{id:`notes`,children:`Mode differences`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`API key mode: better for direct model routing through gpt88.cc.`}),(0,l.jsx)(`li`,{children:`OAuth mode: better for plugins, extensions, and ChatGPT account-linked features.`})]}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Run one small task and confirm the model responds normally.`}),(0,l.jsx)(`li`,{children:`If the plugin panel is missing, switch to the OAuth path.`}),(0,l.jsx)(`li`,{children:`After switching, restart the session and verify no old environment variables remain.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:f}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the Codex OAuth plugin guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var m=`1. 安装 Claude Code
2. 准备 API Key 或 OAuth 登录
3. 如果用 gpt88.cc，中转站走 OpenAI/Claude 兼容配置
4. 如果需要插件能力，改用 OAuth 登录
5. 先跑一条最小任务验证工具链`,h=`1. 先判断你要的是模型调用还是插件能力
2. 模型调用优先走 API Key
3. 插件能力优先走 OAuth
4. 切换前先清理旧环境变量
5. 用最小任务验证切换是否成功`,g=`1. 插件不可用
   - 先确认是不是 API Key 模式
   - 如果要插件，改用 OAuth

2. 反复 reconnect
   - 检查代理变量
   - 检查会话是否被旧配置污染

3. 模型调用失败
   - 先检查 Base URL 和 Key
   - 再确认模型名`;function _(){let{locale:e}=n();return e===`en`?(0,l.jsx)(p,{}):(0,l.jsxs)(a,{path:`/docs/integrations/dev/claude-code`,title:`Claude Code 使用 GPT88 API`,description:`把 Claude Code 配置为 OpenAI 兼容 API，快速验证 API Key、模型和端点。`,headings:[{id:`overview`,text:`先理解这页讲什么`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`setup`,text:`快速配置`,level:2},{id:`notes`,text:`模式差异`,level:2},{id:`verify`,text:`验证方法`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2},...c(`claude-code`)],children:[(0,l.jsx)(s,{tone:`warn`,title:`先分清两种模式`,children:(0,l.jsx)(`p`,{children:`API Key 模式主要解决模型调用；OAuth 模式主要解决插件和账号权益。不要混用。`})}),(0,l.jsx)(`p`,{children:`Claude Code 这里最容易出错的是“把模型接入”和“把插件登录”混成一件事。 如果目标只是让模型可用，API Key 就够了；如果目标是插件与账号权益，必须走 OAuth。`}),(0,l.jsx)(`h2`,{id:`overview`,children:`先理解这页讲什么`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`模型调用怎么接 gpt88.cc。`}),(0,l.jsx)(`li`,{children:`插件能力为什么会和 OAuth 绑定。`}),(0,l.jsx)(`li`,{children:`切换时要先清理什么。`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:h}),(0,l.jsx)(`h2`,{id:`setup`,children:`快速配置`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:m}),(0,l.jsx)(`h2`,{id:`notes`,children:`模式差异`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`API Key 模式：更适合直接调用模型。`}),(0,l.jsx)(`li`,{children:`OAuth 模式：更适合插件、扩展能力和账号权益。`})]}),(0,l.jsx)(`h2`,{id:`verify`,children:`验证方法`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`先跑一条简单任务，看模型输出是否正常。`}),(0,l.jsx)(`li`,{children:`如果插件面板不可见，再切换到 OAuth 流程。`}),(0,l.jsx)(`li`,{children:`切换后重启会话，确认环境变量没有残留。`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:g}),(0,l.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`查看 Codex 插件 OAuth 教程`})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]}),(0,l.jsx)(o,{intent:`claude-code`})]})}export{_ as default};