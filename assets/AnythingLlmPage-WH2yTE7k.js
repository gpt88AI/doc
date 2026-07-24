import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

If you use a knowledge base, configure embedding and chat models separately.`,l=`1. Prepare an API key
2. Use https://api.gpt88.cc as the Base URL
3. Treat chat and embedding models separately
4. Run one minimal Q&A test first
5. Import knowledge documents only after that`,u=`1. Knowledge answers are unstable
   - Switch to a more stable chat model first
   - Check document chunk size

2. Model is not visible
   - Enter the model ID manually
   - Copy the exact name from the model catalog

3. Authentication fails
   - Check whether the key is complete
   - Check whether an environment variable is overriding it`;function d(){return(0,s.jsxs)(a,{path:`/docs/integrations/chat/anythingllm`,title:`AnythingLLM with gpt88.cc`,description:`Connect gpt88.cc to AnythingLLM for chat and knowledge-base workflows.`,headings:[{id:`overview`,text:`Guide goals`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`notes`,text:`Notes`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Recommended route`,children:(0,s.jsxs)(`p`,{children:[`AnythingLLM usually works directly through the OpenAI-compatible path with`,(0,s.jsx)(`code`,{children:` https://api.gpt88.cc`}),`.`]})}),(0,s.jsx)(`p`,{children:`The important distinction in AnythingLLM is between the chat model and the knowledge-base pipeline. Keep them separate instead of mixing everything into one initial configuration.`}),(0,s.jsx)(`h2`,{id:`overview`,children:`Guide goals`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Connect gpt88.cc into AnythingLLM.`}),(0,s.jsx)(`li`,{children:`Make chat work first, then add the knowledge base.`}),(0,s.jsx)(`li`,{children:`Know which layer to inspect first when something fails.`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:l}),(0,s.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:c}),(0,s.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Send one short chat request and confirm the model path works.`}),(0,s.jsx)(`li`,{children:`Then import a small batch of documents to validate retrieval and answers.`}),(0,s.jsx)(`li`,{children:`If results are wrong, debug the knowledge layer and the chat layer separately.`})]}),(0,s.jsx)(`h2`,{id:`notes`,children:`Notes`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Configure knowledge and chat models separately when possible.`}),(0,s.jsx)(`li`,{children:`If the client caches model lists, refresh after changing providers.`}),(0,s.jsx)(`li`,{children:`Always validate connectivity before importing the document set.`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:u}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsx)(`ul`,{children:(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var f=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest

如果你做知识库问答，先确认 embedding 和 chat 模型分别配置清楚。`,p=`1. 先准备好 API Key
2. Base URL 用 https://api.gpt88.cc
3. 聊天模型和 embedding 模型分开看
4. 先跑一条最小问答
5. 再导入知识库文档`,m=`1. 知识库问答结果不稳定
   - 先换一个更稳的聊天模型
   - 检查文档切块大小

2. 模型不可见
   - 手动输入模型 ID
   - 到模型导航复制真实名称

3. 认证失败
   - 检查 Key 是否完整
   - 检查环境变量是否被覆盖`;function h(){let{locale:e}=n();return e===`en`?(0,s.jsx)(d,{}):(0,s.jsxs)(a,{path:`/docs/integrations/chat/anythingllm`,title:`AnythingLLM 接入 gpt88.cc`,description:`把 gpt88.cc 接到 AnythingLLM 的聊天和知识库工作流里。`,headings:[{id:`overview`,text:`教程目标`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`setup`,text:`配置方式`,level:2},{id:`verify`,text:`验证方式`,level:2},{id:`notes`,text:`注意事项`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`接法`,children:(0,s.jsxs)(`p`,{children:[`AnythingLLM 通常可以直接按 OpenAI Compatible 接入，Base URL 使用 `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`。`]})}),(0,s.jsx)(`p`,{children:`这页重点是把 AnythingLLM 里的“聊天模型”和“知识库模型”拆清楚，避免一上来把所有能力混到同一个配置里。`}),(0,s.jsx)(`h2`,{id:`overview`,children:`教程目标`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`把 gpt88.cc 接进 AnythingLLM。`}),(0,s.jsx)(`li`,{children:`先跑通聊天，再接知识库。`}),(0,s.jsx)(`li`,{children:`知道失败时先查哪一层。`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:p}),(0,s.jsx)(`h2`,{id:`setup`,children:`配置方式`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:f}),(0,s.jsx)(`h2`,{id:`verify`,children:`验证方式`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`先发一条最短对话，确认模型通路可用。`}),(0,s.jsx)(`li`,{children:`再导入一小批知识库文档，验证检索和回答是否正常。`}),(0,s.jsx)(`li`,{children:`如果结果异常，先把知识库和聊天模型分开排查。`})]}),(0,s.jsx)(`h2`,{id:`notes`,children:`注意事项`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`知识库和聊天模型最好分开配置，避免成本和效果混在一起。`}),(0,s.jsx)(`li`,{children:`如果有模型缓存，更新后记得刷新。`}),(0,s.jsx)(`li`,{children:`先用最小问题测试连通性，再导入文档库。`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:m}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsx)(`ul`,{children:(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})})]})}export{h as default};