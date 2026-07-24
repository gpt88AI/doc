import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Install the Immersive Translate browser extension
2. Prepare a gpt88.cc API key
3. Confirm the chat model you want to use
4. Make sure the browser can access the target page
5. Prepare a short page or short paragraph for the first test`,l=`Service Type: OpenAI Compatible / Custom OpenAI
API Key: sk-your-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`,u=`1. Open the browser extension management page
2. Enter Immersive Translate settings
3. Find AI translation service / OpenAI settings
4. Choose OpenAI Compatible or Custom OpenAI
5. Paste the API key
6. Set Base URL to https://api.gpt88.cc
7. Set the model name to gpt-5-2-chat-latest
8. Save
9. Open a short webpage and test translation`,d=`You are a professional translation assistant.
Translate the user text into Simplified Chinese.
Requirements:
1. Preserve the original paragraph structure
2. Keep technical terminology accurate
3. Do not add explanations
4. Do not output anything unrelated to the translation`,f=`Test text:
The model supports streaming responses and tool calls.

Expected result:
The translation should sound natural in Chinese while preserving the technical meaning of streaming responses and tool calls.`,p=`1. The translate button does nothing
   - Check whether the extension is enabled
   - Check whether the current page allows extension execution

2. 401 response
   - Check whether the API key is complete
   - Remove accidental spaces around the key

3. 404 response
   - Base URL should be https://api.gpt88.cc
   - The model ID must be a real supported model

4. Translation is too slow
   - Switch to a lighter model
   - Reduce the paragraph length per request

5. Translation style is unstable
   - Lower Temperature
   - Use a fixed system prompt`;function m(){return(0,s.jsxs)(a,{path:`/docs/integrations/platforms/immersive-translate`,title:`Immersive Translate with gpt88.cc`,description:`Step-by-step guide for connecting the Immersive Translate browser extension to gpt88.cc through an OpenAI-compatible API.`,headings:[{id:`overview`,text:`Use cases`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`configure`,text:`Step 1: Fill in service settings`,level:2},{id:`flow`,text:`Step 2: Walk through the setup`,level:2},{id:`prompt`,text:`Step 3: Improve the translation prompt`,level:2},{id:`verify`,text:`Step 4: Verify translation quality`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Recommended usage`,children:(0,s.jsx)(`p`,{children:`Immersive Translate works well through the OpenAI-compatible route. Translation tasks value stability and cost control, so start with a lighter chat model and adjust only after the workflow is stable.`})}),(0,s.jsx)(`h2`,{id:`overview`,children:`Use cases`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Full-page webpage translation.`}),(0,s.jsx)(`li`,{children:`Technical documentation translation.`}),(0,s.jsx)(`li`,{children:`Segmented translation for papers, blogs, and product docs.`}),(0,s.jsx)(`li`,{children:`Cases where you want more natural output than baseline machine translation.`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:c}),(0,s.jsx)(`h2`,{id:`configure`,children:`Step 1: Fill in service settings`}),(0,s.jsx)(`p`,{children:`Choose the OpenAI-compatible service inside Immersive Translate, then fill the fields below.`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:l}),(0,s.jsx)(`h2`,{id:`flow`,children:`Step 2: Walk through the setup`}),(0,s.jsx)(i,{lang:`text`,filename:`flow`,code:u}),(0,s.jsx)(`h2`,{id:`prompt`,children:`Step 3: Improve the translation prompt`}),(0,s.jsx)(`p`,{children:`If the extension supports a custom system prompt, use a constrained translation prompt. For technical content, preserve terminology instead of letting the model improvise.`}),(0,s.jsx)(i,{lang:`text`,filename:`translation-prompt`,code:d}),(0,s.jsx)(`h2`,{id:`verify`,children:`Step 4: Verify translation quality`}),(0,s.jsx)(i,{lang:`text`,filename:`verify`,code:f}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Start with one short English paragraph.`}),(0,s.jsx)(`li`,{children:`Confirm the translation does not add extra explanation.`}),(0,s.jsx)(`li`,{children:`Then test a longer page with segmented translation.`}),(0,s.jsx)(`li`,{children:`If cost is high, shorten each request or switch to a lighter model.`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/chat/chatbox/`,`en`),children:`Read the ChatBox guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/gpt88-tutorial/`,`en`),children:`Read the general gpt88.cc guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var h=`1. 已安装沉浸式翻译浏览器扩展
2. 已准备 gpt88.cc API Key
3. 已确认要使用的聊天模型
4. 浏览器可以访问目标网页
5. 先准备一个短网页或短段落测试`,g=`服务类型: OpenAI Compatible / 自定义 OpenAI
API Key: sk-你的-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`,_=`1. 打开浏览器扩展管理页
2. 进入沉浸式翻译设置
3. 找到 AI 翻译服务 / OpenAI 设置
4. 选择 OpenAI Compatible 或自定义 OpenAI
5. 填入 API Key
6. Base URL 填 https://api.gpt88.cc
7. 模型名填 gpt-5-2-chat-latest
8. 保存配置
9. 打开一篇短网页测试翻译`,v=`你是专业翻译助手。
请把用户提供的文本翻译成简体中文。
要求：
1. 保留原文段落结构
2. 技术术语保持准确
3. 不要添加解释
4. 不要输出与翻译无关的内容`,y=`测试文本：
The model supports streaming responses and tool calls.

预期结果：
模型应翻译为自然中文，并保留 streaming responses、tool calls 等技术含义。`,b=`1. 翻译按钮没反应
   - 检查扩展是否启用
   - 检查当前网页是否允许扩展运行

2. API 报 401
   - 检查 API Key 是否完整
   - 确认 Key 没有复制多余空格

3. API 报 404
   - Base URL 应为 https://api.gpt88.cc
   - 模型 ID 必须是真实可用模型

4. 翻译太慢
   - 换更轻的模型
   - 减小单次翻译段落长度

5. 翻译风格不稳定
   - 降低 Temperature
   - 使用固定系统提示词`;function x(){let{locale:e}=n();return e===`en`?(0,s.jsx)(m,{}):(0,s.jsxs)(a,{path:`/docs/integrations/platforms/immersive-translate`,title:`沉浸式翻译接入 gpt88.cc`,description:`浏览器沉浸式翻译扩展通过 OpenAI 兼容接口接入 gpt88.cc 的逐步教程。`,headings:[{id:`overview`,text:`适用场景`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`configure`,text:`第一步：填写服务配置`,level:2},{id:`flow`,text:`第二步：逐步操作`,level:2},{id:`prompt`,text:`第三步：优化翻译提示词`,level:2},{id:`verify`,text:`第四步：验证翻译效果`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`推荐用法`,children:(0,s.jsx)(`p`,{children:`沉浸式翻译按 OpenAI Compatible 接入即可。翻译任务更看重稳定和成本， 建议先用轻量聊天模型测试，再根据网页长度调整模型。`})}),(0,s.jsx)(`h2`,{id:`overview`,children:`适用场景`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`网页全文翻译。`}),(0,s.jsx)(`li`,{children:`技术文档中英互译。`}),(0,s.jsx)(`li`,{children:`论文、博客、产品文档的分段翻译。`}),(0,s.jsx)(`li`,{children:`需要比普通机器翻译更自然的表达。`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:h}),(0,s.jsx)(`h2`,{id:`configure`,children:`第一步：填写服务配置`}),(0,s.jsx)(`p`,{children:`在沉浸式翻译的 AI 服务配置里选择 OpenAI 兼容服务，然后按下面填写。`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:g}),(0,s.jsx)(`h2`,{id:`flow`,children:`第二步：逐步操作`}),(0,s.jsx)(i,{lang:`text`,filename:`flow`,code:_}),(0,s.jsx)(`h2`,{id:`prompt`,children:`第三步：优化翻译提示词`}),(0,s.jsx)(`p`,{children:`如果扩展支持自定义系统提示词，可以使用更稳定的翻译约束。技术文档建议保留术语，不要让模型自由发挥。`}),(0,s.jsx)(i,{lang:`text`,filename:`translation-prompt`,code:v}),(0,s.jsx)(`h2`,{id:`verify`,children:`第四步：验证翻译效果`}),(0,s.jsx)(i,{lang:`text`,filename:`verify`,code:y}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`先用一段短英文测试。`}),(0,s.jsx)(`li`,{children:`确认翻译不会添加额外解释。`}),(0,s.jsx)(`li`,{children:`再打开长网页测试分段翻译。`}),(0,s.jsx)(`li`,{children:`如果成本较高，降低单次段落长度或切换轻量模型。`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:b}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/chat/chatbox/`,children:`查看 ChatBox 接入教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/gpt88-tutorial/`,children:`查看 gpt88.cc 通用教程`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]})]})}export{x as default};