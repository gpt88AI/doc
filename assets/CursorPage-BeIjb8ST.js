import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,n as o,s,t as c}from"./index-ivPh6OuT.js";var l=e(),u=`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 or gpt-5-2-chat-latest`,d=`1. Open Cursor settings
2. Find Models / API Keys / OpenAI Compatible settings
3. Paste the gpt88.cc API key
4. Set Base URL to https://api.gpt88.cc
5. Add the model ID manually
6. Save and test in Composer or Chat`,f=`1. Model cannot be selected
   - Add the model ID manually

2. 401 request
   - Key is invalid or overridden by an environment variable

3. 404 request
   - /v1 is missing or the model name is wrong

4. Agent edits are unstable
   - Switch to a stronger model
   - Reduce one-shot context size`;function p(){return(0,l.jsxs)(a,{path:`/docs/integrations/dev/cursor`,title:`Cursor with gpt88.cc`,description:`Use gpt88.cc as the OpenAI-compatible provider inside Cursor.`,headings:[{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(s,{tone:`info`,title:`Use the OpenAI-compatible route`,children:(0,l.jsxs)(`p`,{children:[`The core Cursor setup is just two items: a real API key and`,(0,l.jsx)(`code`,{children:` https://api.gpt88.cc`}),`.`]})}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Create a gpt88.cc API key.`}),(0,l.jsx)(`li`,{children:`Confirm the exact model ID you want to use.`}),(0,l.jsx)(`li`,{children:`Decide on a default model before adding more options.`})]}),(0,l.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,l.jsx)(i,{lang:`text`,filename:`steps`,code:d}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`p`,{children:`If you maintain multiple models in Cursor, start with one default model and expand after verification.`}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Open Cursor Chat and send one simple question.`}),(0,l.jsx)(`li`,{children:`Then open Composer and ask it to explain one small file in the current project.`}),(0,l.jsx)(`li`,{children:`If both succeed, move on to real editing tasks.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:f}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsx)(`ul`,{children:(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var m=`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6 或 gpt-5-2-chat-latest`,h=`1. 打开 Cursor 设置
2. 找到 Models / API Keys / OpenAI Compatible 配置
3. 填入 gpt88.cc API Key
4. Base URL 填 https://api.gpt88.cc
5. 手动添加模型 ID
6. 保存后在 Composer 或 Chat 里发起测试`,g=`1. 模型不可选
   - 手动添加模型 ID

2. 请求 401
   - Key 无效或被环境变量覆盖

3. 请求 404
   - Base URL 少了 /v1 或模型名写错

4. Agent 改代码不稳定
   - 先换更强模型
   - 减少一次性上下文`;function _(){let{locale:e}=n();return e===`en`?(0,l.jsx)(p,{}):(0,l.jsxs)(a,{path:`/docs/integrations/dev/cursor`,title:`Cursor 配置 GPT88 API`,description:`在 Cursor 中使用 GPT88 的 OpenAI 兼容接口，避免把网页登录密码当作 API Key。`,headings:[{id:`prepare`,text:`准备工作`,level:2},{id:`setup`,text:`配置方法`,level:2},{id:`verify`,text:`验证方法`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2},...c(`cursor`)],children:[(0,l.jsx)(s,{tone:`info`,title:`Cursor 推荐用 OpenAI Compatible`,children:(0,l.jsxs)(`p`,{children:[`Cursor 接 gpt88.cc 的核心就是两项：`,(0,l.jsx)(`code`,{children:`API Key`}),` 和 `,(0,l.jsx)(`code`,{children:`https://api.gpt88.cc`}),`。`]})}),(0,l.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`准备一把 gpt88.cc API Key。`}),(0,l.jsx)(`li`,{children:`确认要用的模型 ID。`}),(0,l.jsx)(`li`,{children:`先决定默认模型，再配置到 Cursor。`})]}),(0,l.jsx)(`h2`,{id:`setup`,children:`配置方法`}),(0,l.jsx)(i,{lang:`text`,filename:`steps`,code:h}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:m}),(0,l.jsx)(`p`,{children:`如果你在 Cursor 中同时维护多个模型，建议先固定一个默认模型再逐步扩展。`}),(0,l.jsx)(`h2`,{id:`verify`,children:`验证方法`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`打开 Cursor Chat，发送一句简单问题。`}),(0,l.jsx)(`li`,{children:`再打开 Composer，让它解释当前项目里的一个小文件。`}),(0,l.jsx)(`li`,{children:`如果两步都通过，再让 Agent 执行改代码任务。`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:g}),(0,l.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,l.jsx)(`ul`,{children:(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})}),(0,l.jsx)(o,{intent:`cursor`})]})}export{_ as default};