import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Admin access to Dify
2. A gpt88.cc API key
3. The chat model ID you plan to use
4. If you will build a knowledge base, also confirm the embedding model
5. One minimal app or workflow for testing`,l=`Provider: OpenAI Compatible
API Key: sk-your-gpt88-api-key
API Base URL: https://api.gpt88.cc
Model Type: LLM
Model Name: gpt-5-2-chat-latest or claude-sonnet-4-6`,u=`1. Open the Dify console
2. Go to Settings / Model Provider
3. Add a new OpenAI Compatible provider
4. Fill in the gpt88.cc API key
5. Set Base URL to https://api.gpt88.cc
6. Save, then open an application
7. Select the model you just added
8. Run one minimal chat test`,d=`1. Create a new Chatflow or Workflow
2. Choose the gpt88.cc model in the LLM node
3. Send one fixed test prompt
4. Run the node and inspect output and error details
5. Only then add knowledge, tools, or more complex prompts`,f=`Knowledge workflows should be configured separately:

Chat Model: final response generation
Embedding Model: document vectorization
Rerank Model: result reranking when needed

Do not configure only the chat model and then immediately import a large knowledge base.
Start with one or two short documents and validate chunking, retrieval, and answer quality first.`,p=`1. Provider save fails
   - Check that the Base URL is https://api.gpt88.cc
   - Check that the API key is complete

2. Model does not appear in the app
   - Confirm the model was added to the Dify provider
   - Enter the real model ID manually

3. Workflow node fails
   - Test the LLM node on its own first
   - Then add knowledge or tool nodes

4. Knowledge answers are inaccurate
   - Adjust chunk size
   - Confirm the embedding model is configured
   - Reduce the initial document import scope

5. Cost is unclear
   - Check RMB balance and real deductions in the gpt88.cc console`;function m(){return(0,s.jsxs)(a,{path:`/docs/integrations/platforms/dify`,title:`Dify with gpt88.cc`,description:`A step-by-step guide for using gpt88.cc in Dify providers, chat apps, workflows, and knowledge base pipelines.`,headings:[{id:`overview`,text:`Goal of this guide`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`provider`,text:`Step 1: Add the model provider`,level:2},{id:`app`,text:`Step 2: Attach the model to an app`,level:2},{id:`workflow`,text:`Step 3: Attach the model to a workflow`,level:2},{id:`knowledge`,text:`Knowledge base configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Recommended Dify setup`,children:(0,s.jsxs)(`p`,{children:[`In Dify, use an OpenAI Compatible provider pointing to `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`. Validate chat models, embedding models, and knowledge settings separately instead of changing everything at once.`]})}),(0,s.jsx)(`h2`,{id:`overview`,children:`Goal of this guide`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Add gpt88.cc as a Dify model provider.`}),(0,s.jsx)(`li`,{children:`Use the model inside a standard chat application.`}),(0,s.jsx)(`li`,{children:`Validate the LLM node in Chatflow or Workflow.`}),(0,s.jsx)(`li`,{children:`Troubleshoot chat-model and knowledge-model issues separately.`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:c}),(0,s.jsx)(`h2`,{id:`provider`,children:`Step 1: Add the model provider`}),(0,s.jsx)(`p`,{children:`Open the Dify model provider settings and add a new OpenAI-compatible provider.`}),(0,s.jsx)(i,{lang:`text`,filename:`provider`,code:l}),(0,s.jsx)(`h2`,{id:`app`,children:`Step 2: Attach the model to an app`}),(0,s.jsx)(`p`,{children:`After the provider is saved successfully, assign the model inside a real application.`}),(0,s.jsx)(i,{lang:`text`,filename:`app-setup`,code:u}),(0,s.jsx)(`h2`,{id:`workflow`,children:`Step 3: Attach the model to a workflow`}),(0,s.jsx)(`p`,{children:`Dify workflow troubleshooting should start with a single LLM node. Make that node succeed first, then connect knowledge, HTTP tools, or variable processing.`}),(0,s.jsx)(i,{lang:`text`,filename:`workflow`,code:d}),(0,s.jsx)(`h2`,{id:`knowledge`,children:`Knowledge base configuration`}),(0,s.jsx)(i,{lang:`text`,filename:`knowledge`,code:f}),(0,s.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`Save the provider and test the connection.`}),(0,s.jsx)(`li`,{children:`Send one minimal question in a basic chat app.`}),(0,s.jsx)(`li`,{children:`Run the LLM node by itself inside a workflow.`}),(0,s.jsx)(`li`,{children:`If you use knowledge, import only one short document for the first validation pass.`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/api/chat-completions/`,`en`),children:`Read the Chat Completions API reference`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/complete-integration/`,`en`),children:`Read the complete integration guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var h=`1. 已有 Dify 管理员权限
2. 已准备 gpt88.cc API Key
3. 已确认聊天模型 ID
4. 如果要做知识库，另外确认 embedding 模型
5. 已准备一个最小应用用于测试`,g=`Provider: OpenAI Compatible
API Key: sk-你的-gpt88-api-key
API Base URL: https://api.gpt88.cc
Model Type: LLM
Model Name: gpt-5-2-chat-latest 或 claude-sonnet-4-6`,_=`1. 打开 Dify 控制台
2. 进入 Settings / Model Provider
3. 新增 OpenAI Compatible Provider
4. 填入 gpt88.cc API Key
5. Base URL 填 https://api.gpt88.cc
6. 保存后进入应用
7. 在应用模型设置里选择刚才添加的模型
8. 发起一次最小对话测试`,v=`1. 新建 Chatflow 或 Workflow
2. 在 LLM 节点选择 gpt88.cc 模型
3. 输入一个固定测试问题
4. 运行节点，观察输出和错误信息
5. 再逐步加入知识库、工具和复杂 Prompt`,y=`知识库场景需要分开配置：

Chat Model: 负责最终回答
Embedding Model: 负责文档向量化
Rerank Model: 负责结果重排，可按需要配置

不要只配置聊天模型就直接导入大量知识库。先用 1-2 个短文档验证切块、召回和回答效果。`,b=`1. Provider 保存失败
   - 检查 Base URL 是否为 https://api.gpt88.cc
   - 检查 API Key 是否完整

2. 应用里看不到模型
   - 确认模型已添加到 Dify Provider
   - 手动输入真实模型 ID

3. Workflow 节点报错
   - 先单独测试 LLM 节点
   - 再接知识库或工具节点

4. 知识库回答不准
   - 调整切块大小
   - 检查 embedding 模型是否配置
   - 减少一次性导入的文档量

5. 成本不清楚
   - 到 gpt88.cc 控制台查看人民币余额和真实扣费`;function x(){let{locale:e}=n();return e===`en`?(0,s.jsx)(m,{}):(0,s.jsxs)(a,{path:`/docs/integrations/platforms/dify`,title:`Dify 接入 gpt88.cc`,description:`把 gpt88.cc 接入 Dify 平台、Chatflow、Workflow 和知识库的逐步教程。`,headings:[{id:`overview`,text:`教程目标`,level:2},{id:`prepare`,text:`准备工作`,level:2},{id:`provider`,text:`第一步：添加模型供应商`,level:2},{id:`app`,text:`第二步：接入应用`,level:2},{id:`workflow`,text:`第三步：接入工作流`,level:2},{id:`knowledge`,text:`知识库配置`,level:2},{id:`verify`,text:`验证方式`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Dify 推荐接法`,children:(0,s.jsxs)(`p`,{children:[`Dify 使用 OpenAI Compatible Provider 接入 gpt88.cc，Base URL 填`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`。聊天模型、embedding 模型和知识库参数要分开验证。`]})}),(0,s.jsx)(`h2`,{id:`overview`,children:`教程目标`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`在 Dify 模型供应商里添加 gpt88.cc。`}),(0,s.jsx)(`li`,{children:`把模型应用到普通聊天应用。`}),(0,s.jsx)(`li`,{children:`在 Workflow / Chatflow 里验证 LLM 节点。`}),(0,s.jsx)(`li`,{children:`把知识库相关模型和聊天模型拆开排查。`})]}),(0,s.jsx)(`h2`,{id:`prepare`,children:`准备工作`}),(0,s.jsx)(i,{lang:`text`,filename:`checklist`,code:h}),(0,s.jsx)(`h2`,{id:`provider`,children:`第一步：添加模型供应商`}),(0,s.jsx)(`p`,{children:`进入 Dify 后台的模型供应商设置，新增 OpenAI 兼容供应商。`}),(0,s.jsx)(i,{lang:`text`,filename:`provider`,code:g}),(0,s.jsx)(`h2`,{id:`app`,children:`第二步：接入应用`}),(0,s.jsx)(`p`,{children:`供应商保存成功后，再把模型挂到具体应用里。`}),(0,s.jsx)(i,{lang:`text`,filename:`app-setup`,code:_}),(0,s.jsx)(`h2`,{id:`workflow`,children:`第三步：接入工作流`}),(0,s.jsx)(`p`,{children:`Dify 工作流排障要从单节点开始。先让 LLM 节点独立成功，再接知识库、HTTP 工具或变量处理。`}),(0,s.jsx)(i,{lang:`text`,filename:`workflow`,code:v}),(0,s.jsx)(`h2`,{id:`knowledge`,children:`知识库配置`}),(0,s.jsx)(i,{lang:`text`,filename:`knowledge`,code:y}),(0,s.jsx)(`h2`,{id:`verify`,children:`验证方式`}),(0,s.jsxs)(`ol`,{children:[(0,s.jsx)(`li`,{children:`在模型供应商页面保存并测试连接。`}),(0,s.jsx)(`li`,{children:`在普通聊天应用里发一条最短问题。`}),(0,s.jsx)(`li`,{children:`在 Workflow 里单独运行 LLM 节点。`}),(0,s.jsx)(`li`,{children:`如果使用知识库，只导入一个短文档做第一次验证。`})]}),(0,s.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,s.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:b}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/api/chat-completions/`,children:`查看 Chat Completions API`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/guides/complete-integration/`,children:`查看完整接入手册`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]})]})}export{x as default};