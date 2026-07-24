import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Open Cherry Studio
2. Go to model provider / API settings
3. Choose OpenAI Compatible
4. Set Base URL to https://api.gpt88.cc
5. Paste the API key from the gpt88.cc console
6. Start with one stable chat model
7. Send one minimal test message`,l=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"Introduce gpt88.cc"}]
  }'`,u=`1. Set the provider to OpenAI Compatible
2. Make sure Base URL is exactly https://api.gpt88.cc
3. Use a real API key from the console
4. Start with a known stable chat model
5. Send one minimal message to verify
6. If it fails, validate with curl first`,d=`1. Model list is blank
   - Enter the model ID manually
   - Copy the exact name from the model catalog

2. 401 response
   - Key is invalid or expired

3. 404 response
   - Base URL is wrong or /v1 is missing

4. Replies are slow
   - Switch to a lighter model first
   - Disable knowledge base and long multi-turn context for the first test`;function f(){return(0,s.jsxs)(a,{path:`/docs/integrations/chat/cherry-studio`,title:`Cherry Studio with gpt88.cc`,description:`Connect gpt88.cc into Cherry Studio through the OpenAI-compatible workflow for multi-model usage, prompt templates, and routine chat scenarios.`,headings:[{id:`overview`,text:`What this guide covers`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Quick setup`,level:2},{id:`verify`,text:`Verify connectivity`,level:2},{id:`tips`,text:`Usage tips`,level:2},{id:`faq`,text:`Common questions`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Most reliable setup`,children:(0,s.jsxs)(`p`,{children:[`Cherry Studio usually works best through the OpenAI-compatible path. First make`,(0,s.jsx)(`code`,{children:` https://api.gpt88.cc `}),`work, then expand to more models.`]})}),(0,s.jsx)(`p`,{children:`This guide walks the full setup path: opening provider settings, selecting the right route, verifying connectivity, and debugging failures without guessing.`}),(0,s.jsx)(`h2`,{id:`overview`,children:`What this guide covers`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`How to connect Cherry Studio to the gpt88.cc OpenAI-compatible API.`}),(0,s.jsx)(`li`,{children:`How to start with one stable model and expand later.`}),(0,s.jsx)(`li`,{children:`What to check first when the connection fails.`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:u}),(0,s.jsx)(`h2`,{id:`setup`,children:`Quick setup`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:c}),(0,s.jsx)(`p`,{children:`Use one minimal request to confirm the path first, then import additional models or prompt templates.`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:l}),(0,s.jsx)(`h2`,{id:`verify`,children:`Verify connectivity`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Save the Cherry Studio provider settings.`}),(0,s.jsx)(`li`,{children:`Create a new chat and send one short prompt.`}),(0,s.jsx)(`li`,{children:`If that works, then gradually increase prompt or context complexity.`}),(0,s.jsx)(`li`,{children:`If it fails, verify the API key and Base URL with curl first.`})]}),(0,s.jsx)(`h2`,{id:`tips`,children:`Usage tips`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Pin one default model to reduce unnecessary switching.`}),(0,s.jsx)(`li`,{children:`Use stronger models for long-context tasks and cheaper models for fast Q&A.`}),(0,s.jsx)(`li`,{children:`Create separate API keys per project for cost tracking and easier revocation.`})]}),(0,s.jsx)(`h2`,{id:`faq`,children:`Common questions`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`If the model list does not load, enter the model ID manually.`}),(0,s.jsxs)(`li`,{children:[`If you see 404, check whether `,(0,s.jsx)(`code`,{children:`/v1`}),` is present in the Base URL.`]}),(0,s.jsx)(`li`,{children:`If you see 401, verify that the API key was copied completely.`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/complete-integration/`,`en`),children:`Read the complete integration guide`}),`.`]})]})]})}var p=`1. 打开 Cherry Studio
2. 进入模型提供商 / API 配置
3. 选择 OpenAI Compatible
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 模型先选一个稳定可用的聊天模型
7. 发送一条最小消息测试连通性`,m=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"介绍一下 gpt88.cc"}]
  }'`,h=`1. 先把 Provider 选成 OpenAI Compatible
2. Base URL 一定要写成 https://api.gpt88.cc
3. API Key 使用控制台生成的真实 Key
4. 先选一个已知稳定的聊天模型
5. 发一条最小消息验证
6. 如果失败，先回到 cURL 检查接口`,g=`1. 模型列表空白
   - 手动输入模型 ID
   - 到模型导航复制真实模型名

2. 返回 401
   - Key 无效或过期

3. 返回 404
   - Base URL 写错，或者没带 /v1

4. 回复很慢
   - 先换一个更轻的模型
   - 先关掉知识库和多轮长上下文`;function _(){let{locale:e}=n();return e===`en`?(0,s.jsx)(f,{}):(0,s.jsxs)(a,{path:`/docs/integrations/chat/cherry-studio`,title:`Cherry Studio 接入 gpt88.cc`,description:`把 gpt88.cc 接到 Cherry Studio 的 OpenAI 兼容工作流里，适合多模型管理、提示词模板和常用对话场景。`,headings:[{id:`overview`,text:`这篇教程讲什么`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`setup`,text:`快速配置`,level:2},{id:`verify`,text:`验证连通性`,level:2},{id:`tips`,text:`使用建议`,level:2},{id:`faq`,text:`常见问题`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`最稳接法`,children:(0,s.jsxs)(`p`,{children:[`Cherry Studio 直接按 OpenAI Compatible 接入即可，先用 `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),` 跑通，再切模型。`]})}),(0,s.jsx)(`p`,{children:`这篇教程不是只告诉你“怎么填几个框”，而是按 APIMart 那种方式，把 进入配置、选择提供商、验证连通性、排查失败这条线完整走一遍。`}),(0,s.jsx)(`h2`,{id:`overview`,children:`这篇教程讲什么`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`如何把 Cherry Studio 接到 gpt88.cc 的 OpenAI 兼容接口。`}),(0,s.jsx)(`li`,{children:`如何选择一个稳定模型先跑通。`}),(0,s.jsx)(`li`,{children:`如果连接失败，应该先检查什么。`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:h}),(0,s.jsx)(`h2`,{id:`setup`,children:`快速配置`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:p}),(0,s.jsx)(`p`,{children:`建议先用一条最小请求确认通路，再导入更多模型和提示词模板。`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:m}),(0,s.jsx)(`h2`,{id:`verify`,children:`验证连通性`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`先在 Cherry Studio 里保存配置。`}),(0,s.jsx)(`li`,{children:`新建一个对话并发送最短问题。`}),(0,s.jsx)(`li`,{children:`如果能返回内容，再逐步增加上下文和提示词复杂度。`}),(0,s.jsx)(`li`,{children:`如果不能返回，先用 cURL 验证 Key 和 Base URL。`})]}),(0,s.jsx)(`h2`,{id:`tips`,children:`使用建议`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`把常用模型固定成默认项，减少每次手动切换。`}),(0,s.jsx)(`li`,{children:`长上下文任务优先选更强模型，快速问答优先选低成本模型。`}),(0,s.jsx)(`li`,{children:`给不同项目单独建 Key，方便统计成本和停用。`})]}),(0,s.jsx)(`h2`,{id:`faq`,children:`常见问题`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`如果拉不到模型列表，手动输入模型 ID。`}),(0,s.jsxs)(`li`,{children:[`如果报 404，优先检查 Base URL 是否带了正确的 `,(0,s.jsx)(`code`,{children:`/v1`}),`。`]}),(0,s.jsx)(`li`,{children:`如果返回 401，确认 Key 是否复制完整。`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:g}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/complete-integration/`,children:`查看完整接入手册`})})]})]})}export{_ as default};