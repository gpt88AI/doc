import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`1. Admin access to Dify
2. A gpt88.cc API key
3. The chat model ID you plan to use
4. If you will build a knowledge base, also confirm the embedding model
5. One minimal app or workflow for testing`,d=`Provider: OpenAI Compatible
API Key: sk-your-gpt88-api-key
API Base URL: https://api.gpt88.cc
Model Type: LLM
Model Name: gpt-5-2-chat-latest or claude-sonnet-4-6`,f=`1. Open the Dify console
2. Go to Settings / Model Provider
3. Add a new OpenAI Compatible provider
4. Fill in the gpt88.cc API key
5. Set Base URL to https://api.gpt88.cc
6. Save, then open an application
7. Select the model you just added
8. Run one minimal chat test`,p=`1. Create a new Chatflow or Workflow
2. Choose the gpt88.cc model in the LLM node
3. Send one fixed test prompt
4. Run the node and inspect output and error details
5. Only then add knowledge, tools, or more complex prompts`,m=`Knowledge workflows should be configured separately:

Chat Model: final response generation
Embedding Model: document vectorization
Rerank Model: result reranking when needed

Do not configure only the chat model and then immediately import a large knowledge base.
Start with one or two short documents and validate chunking, retrieval, and answer quality first.`,h=`1. Provider save fails
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
   - Check RMB balance and real deductions in the gpt88.cc console`;function g(){return(0,l.jsxs)(o,{path:`/docs/integrations/platforms/dify`,title:`Dify with gpt88.cc`,description:`A step-by-step guide for using gpt88.cc in Dify providers, chat apps, workflows, and knowledge base pipelines.`,headings:[{id:`overview`,text:`Goal of this guide`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`provider`,text:`Step 1: Add the model provider`,level:2},{id:`app`,text:`Step 2: Attach the model to an app`,level:2},{id:`workflow`,text:`Step 3: Attach the model to a workflow`,level:2},{id:`knowledge`,text:`Knowledge base configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Recommended Dify setup`,children:(0,l.jsxs)(`p`,{children:[`In Dify, use an OpenAI Compatible provider pointing to `,(0,l.jsx)(`code`,{children:`https://api.gpt88.cc`}),`. Validate chat models, embedding models, and knowledge settings separately instead of changing everything at once.`]})}),(0,l.jsx)(`h2`,{id:`overview`,children:`Goal of this guide`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Add gpt88.cc as a Dify model provider.`}),(0,l.jsx)(`li`,{children:`Use the model inside a standard chat application.`}),(0,l.jsx)(`li`,{children:`Validate the LLM node in Chatflow or Workflow.`}),(0,l.jsx)(`li`,{children:`Troubleshoot chat-model and knowledge-model issues separately.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:u}),(0,l.jsx)(`h2`,{id:`provider`,children:`Step 1: Add the model provider`}),(0,l.jsx)(`p`,{children:`Open the Dify model provider settings and add a new OpenAI-compatible provider.`}),(0,l.jsx)(i,{lang:`text`,filename:`provider`,code:d}),(0,l.jsx)(`h2`,{id:`app`,children:`Step 2: Attach the model to an app`}),(0,l.jsx)(`p`,{children:`After the provider is saved successfully, assign the model inside a real application.`}),(0,l.jsx)(i,{lang:`text`,filename:`app-setup`,code:f}),(0,l.jsx)(`h2`,{id:`workflow`,children:`Step 3: Attach the model to a workflow`}),(0,l.jsx)(`p`,{children:`Dify workflow troubleshooting should start with a single LLM node. Make that node succeed first, then connect knowledge, HTTP tools, or variable processing.`}),(0,l.jsx)(i,{lang:`text`,filename:`workflow`,code:p}),(0,l.jsx)(`h2`,{id:`knowledge`,children:`Knowledge base configuration`}),(0,l.jsx)(i,{lang:`text`,filename:`knowledge`,code:m}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Save the provider and test the connection.`}),(0,l.jsx)(`li`,{children:`Send one minimal question in a basic chat app.`}),(0,l.jsx)(`li`,{children:`Run the LLM node by itself inside a workflow.`}),(0,l.jsx)(`li`,{children:`If you use knowledge, import only one short document for the first validation pass.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:h}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/api/chat-completions/`,`en`),children:`Read the Chat Completions API reference`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/complete-integration/`,`en`),children:`Read the complete integration guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var _=`1. 已有 Dify 管理员权限
2. 已准备 gpt88.cc API Key
3. 已确认聊天模型 ID
4. 如果要做知识库，另外确认 embedding 模型
5. 已准备一个最小应用用于测试`,v=`Provider: OpenAI Compatible
API Key: sk-你的-gpt88-api-key
API Base URL: https://api.gpt88.cc
Model Type: LLM
Model Name: gpt-5-2-chat-latest 或 claude-sonnet-4-6`,y=`1. 打开 Dify 控制台
2. 进入 Settings / Model Provider
3. 新增 OpenAI Compatible Provider
4. 填入 gpt88.cc API Key
5. Base URL 填 https://api.gpt88.cc
6. 保存后进入应用
7. 在应用模型设置里选择刚才添加的模型
8. 发起一次最小对话测试`,b=`1. 新建 Chatflow 或 Workflow
2. 在 LLM 节点选择 gpt88.cc 模型
3. 输入一个固定测试问题
4. 运行节点，观察输出和错误信息
5. 再逐步加入知识库、工具和复杂 Prompt`,x={zh:{title:`Dify 推荐接法`,info:`Dify 使用 OpenAI Compatible Provider 接入 gpt88.cc，Base URL 填 https://api.gpt88.cc。聊天模型、embedding 模型和知识库参数要分开验证。`,overview:[`在 Dify 模型供应商里添加 gpt88.cc。`,`把模型应用到普通聊天应用。`,`在 Workflow / Chatflow 里验证 LLM 节点。`,`把知识库模型和聊天模型拆开排查。`],prepare:_,provider:`进入 Dify 后台的模型供应商设置，新增 OpenAI 兼容供应商。`,app:`供应商保存成功后，再把模型挂到具体应用里。`,workflow:`Dify 工作流排障要从单节点开始。先让 LLM 节点独立成功，再接知识库、HTTP 工具或变量处理。`,knowledge:`知识库场景需要分开配置：

Chat Model: 负责最终回答
Embedding Model: 负责文档向量化
Rerank Model: 负责结果重排，可按需要配置

不要只配置聊天模型就直接导入大量知识库。先用 1-2 个短文档验证切块、召回和回答效果。`,verify:[`在模型供应商页面保存并测试连接。`,`在普通聊天应用里发一条最短问题。`,`在 Workflow 里单独运行 LLM 节点。`,`使用知识库时，只导入一个短文档做第一次验证。`],trouble:`1. Provider 保存失败
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
   - 到 gpt88.cc 控制台查看人民币余额和真实扣费`,next:[`查看 Chat Completions API`,`查看完整接入手册`,`返回集成总览`]},hi:{title:`Dify की recommended setup`,info:`Dify में gpt88.cc को OpenAI Compatible Provider से जोड़ें और Base URL https://api.gpt88.cc रखें। Chat, embedding और knowledge-base parameters अलग verify करें।`,overview:[`Dify model provider में gpt88.cc जोड़ें।`,`Model को सामान्य chat app में लगाएं।`,`Workflow / Chatflow में LLM node verify करें।`,`Knowledge-base और chat model अलग troubleshoot करें।`],prepare:`1. Dify admin permission है
2. gpt88.cc API Key तैयार है
3. Chat model ID पता है
4. Knowledge base के लिए embedding model भी तय है
5. छोटा test app तैयार है`,provider:`Dify admin के Model Provider settings में OpenAI-compatible provider जोड़ें।`,app:`Provider save होने के बाद model को किसी app में जोड़ें।`,workflow:`Workflow troubleshooting single node से शुरू करें। पहले LLM node सफल करें, फिर knowledge base, HTTP tool या variables जोड़ें।`,knowledge:`Knowledge base के लिए अलग config रखें:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

बड़ी document library से पहले 1-2 छोटे documents से chunking, retrieval और answer जांचें।`,verify:[`Provider page पर save और connection test करें।`,`Normal chat app में छोटा सवाल भेजें।`,`Workflow में LLM node अकेले चलाएं।`,`Knowledge base हो तो पहले एक छोटा document import करें।`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc देखें
   - API Key पूरा देखें

2. App में model नहीं
   - Provider में model add है देखें
   - Model ID manually दें

3. Workflow error
   - LLM node अलग test करें
   - बाद में knowledge/tool जोड़ें

4. Knowledge answer गलत
   - Chunk size और embedding जांचें
   - एक बार में कम documents import करें

5. Cost unclear
   - Console balance और charge देखें`,next:[`Chat Completions API देखें`,`Complete integration guide देखें`,`Integrations overview पर लौटें`]},bn:{title:`Dify-এর recommended setup`,info:`Dify-তে gpt88.cc-কে OpenAI Compatible Provider দিয়ে যুক্ত করুন এবং Base URL https://api.gpt88.cc রাখুন। Chat, embedding ও knowledge-base parameter আলাদা verify করুন।`,overview:[`Dify model provider-এ gpt88.cc যোগ করুন।`,`Model সাধারণ chat app-এ দিন।`,`Workflow / Chatflow-এ LLM node যাচাই করুন।`,`Knowledge-base ও chat model আলাদা troubleshoot করুন।`],prepare:`1. Dify admin permission আছে
2. gpt88.cc API Key প্রস্তুত
3. Chat model ID জানা
4. Knowledge base-এর embedding model ঠিক করা
5. ছোট test app প্রস্তুত`,provider:`Dify admin-এর Model Provider settings-এ OpenAI-compatible provider যোগ করুন।`,app:`Provider save হলে model-টি নির্দিষ্ট app-এ যোগ করুন।`,workflow:`Workflow troubleshooting single node থেকে শুরু করুন। আগে LLM node সফল করুন, পরে knowledge base, HTTP tool বা variable যোগ করুন।`,knowledge:`Knowledge base আলাদা config রাখুন:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

বড় document library-এর আগে 1-2টি ছোট document দিয়ে chunking, retrieval ও answer পরীক্ষা করুন।`,verify:[`Provider page-এ save ও connection test করুন।`,`Normal chat app-এ ছোট প্রশ্ন পাঠান।`,`Workflow-এ LLM node একা চালান।`,`Knowledge base হলে আগে একটি ছোট document import করুন।`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc দেখুন
   - API Key সম্পূর্ণ দেখুন

2. App-এ model নেই
   - Provider-এ model যোগ হয়েছে কি না দেখুন
   - Model ID হাতে দিন

3. Workflow error
   - LLM node আলাদা test করুন
   - পরে knowledge/tool যোগ করুন

4. Knowledge answer ভুল
   - Chunk size ও embedding দেখুন
   - একবারে কম document import করুন

5. Cost unclear
   - Console balance ও charge দেখুন`,next:[`Chat Completions API দেখুন`,`Complete integration guide দেখুন`,`Integrations overview-এ ফিরুন`]},ur:{title:`Dify کا recommended setup`,info:`Dify میں gpt88.cc کو OpenAI Compatible Provider سے جوڑیں اور Base URL https://api.gpt88.cc رکھیں۔ Chat، embedding اور knowledge-base parameters الگ verify کریں۔`,overview:[`Dify model provider میں gpt88.cc شامل کریں۔`,`Model کو عام chat app میں لگائیں۔`,`Workflow / Chatflow میں LLM node verify کریں۔`,`Knowledge-base اور chat model الگ troubleshoot کریں۔`],prepare:`1. Dify admin permission ہے
2. gpt88.cc API Key تیار ہے
3. Chat model ID معلوم ہے
4. Knowledge base کے لیے embedding model طے ہے
5. مختصر test app تیار ہے`,provider:`Dify admin کے Model Provider settings میں OpenAI-compatible provider شامل کریں۔`,app:`Provider save ہونے کے بعد model کو مخصوص app میں شامل کریں۔`,workflow:`Workflow troubleshooting single node سے شروع کریں۔ پہلے LLM node کامیاب کریں، پھر knowledge base، HTTP tool یا variables جوڑیں۔`,knowledge:`Knowledge base الگ configure کریں:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

بڑی document library سے پہلے 1-2 مختصر documents سے chunking، retrieval اور answer چیک کریں۔`,verify:[`Provider page پر save اور connection test کریں۔`,`Normal chat app میں مختصر سوال بھیجیں۔`,`Workflow میں LLM node الگ چلائیں۔`,`Knowledge base ہو تو پہلے ایک مختصر document import کریں۔`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc چیک کریں
   - API Key مکمل چیک کریں

2. App میں model نہیں
   - Provider میں model add ہے دیکھیں
   - Model ID manually دیں

3. Workflow error
   - LLM node الگ test کریں
   - پھر knowledge/tool جوڑیں

4. Knowledge answer غلط
   - Chunk size اور embedding چیک کریں
   - ایک بار میں کم documents import کریں

5. Cost unclear
   - Console balance اور charge دیکھیں`,next:[`Chat Completions API دیکھیں`,`Complete integration guide دیکھیں`,`Integrations overview پر واپس جائیں`]},ta:{title:`Dify recommended setup`,info:`Dify-ல் gpt88.cc-ஐ OpenAI Compatible Provider மூலம் இணைத்து Base URL-ஐ https://api.gpt88.cc ஆக அமைக்கவும். Chat, embedding மற்றும் knowledge-base parameters-ஐ தனித்தனியாக verify செய்யவும்.`,overview:[`Dify model provider-ல் gpt88.cc சேர்க்கவும்.`,`Model-ஐ சாதாரண chat app-ல் பயன்படுத்தவும்.`,`Workflow / Chatflow-ல் LLM node சரிபார்க்கவும்.`,`Knowledge-base மற்றும் chat model-ஐத் தனித்தனியாக troubleshoot செய்யவும்.`],prepare:`1. Dify admin permission உள்ளது
2. gpt88.cc API Key தயார்
3. Chat model ID தெரியும்
4. Knowledge base-க்கு embedding model தேர்வு
5. சிறிய test app தயார்`,provider:`Dify admin-ன் Model Provider settings-ல் OpenAI-compatible provider சேர்க்கவும்.`,app:`Provider save ஆன பிறகு model-ஐ குறிப்பிட்ட app-ல் சேர்க்கவும்.`,workflow:`Workflow troubleshooting single node-ல் தொடங்க வேண்டும். முதலில் LLM node வெற்றி பெறச் செய்து, பின்னர் knowledge base, HTTP tool அல்லது variables இணைக்கவும்.`,knowledge:`Knowledge base-ஐ தனியாக configure செய்யவும்:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

பெரிய document library முன் 1-2 சிறிய documents மூலம் chunking, retrieval மற்றும் answer சரிபார்க்கவும்.`,verify:[`Provider page-ல் save செய்து connection test செய்யவும்.`,`Normal chat app-ல் சிறிய கேள்வி அனுப்பவும்.`,`Workflow-ல் LLM node-ஐத் தனியாக இயக்கவும்.`,`Knowledge base இருந்தால் முதலில் ஒரு சிறிய document import செய்யவும்.`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc சரிபார்க்கவும்
   - API Key முழுமையா பார்க்கவும்

2. App-ல் model இல்லை
   - Provider-ல் model சேர்க்கப்பட்டதா பார்க்கவும்
   - Model ID கைமுறையாக உள்ளிடவும்

3. Workflow error
   - LLM node தனியாக test செய்யவும்
   - பின்னர் knowledge/tool சேர்க்கவும்

4. Knowledge answer தவறு
   - Chunk size மற்றும் embedding சரிபார்க்கவும்
   - ஒரே நேரத்தில் குறைந்த documents import செய்யவும்

5. Cost unclear
   - Console balance மற்றும் charge பார்க்கவும்`,next:[`Chat Completions API பார்க்கவும்`,`Complete integration guide பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`]},ne:{title:`Dify को recommended setup`,info:`Dify मा gpt88.cc लाई OpenAI Compatible Provider बाट जोडेर Base URL https://api.gpt88.cc राख्नुहोस्। Chat, embedding र knowledge-base parameters अलग verify गर्नुहोस्।`,overview:[`Dify model provider मा gpt88.cc थप्नुहोस्।`,`Model लाई सामान्य chat app मा लगाउनुहोस्।`,`Workflow / Chatflow मा LLM node verify गर्नुहोस्।`,`Knowledge-base र chat model अलग troubleshoot गर्नुहोस्।`],prepare:`1. Dify admin permission छ
2. gpt88.cc API Key तयार छ
3. Chat model ID थाहा छ
4. Knowledge base को embedding model तय छ
5. सानो test app तयार छ`,provider:`Dify admin को Model Provider settings मा OpenAI-compatible provider थप्नुहोस्।`,app:`Provider save भएपछि model लाई app मा जोड्नुहोस्।`,workflow:`Workflow troubleshooting single node बाट सुरु गर्नुहोस्। पहिले LLM node सफल गराएर पछि knowledge base, HTTP tool वा variables जोड्नुहोस्।`,knowledge:`Knowledge base अलग configure गर्नुहोस्:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

ठूलो document library अघि 1-2 साना documents बाट chunking, retrieval र answer जाँच्नुहोस्।`,verify:[`Provider page मा save र connection test गर्नुहोस्।`,`Normal chat app मा सानो प्रश्न पठाउनुहोस्।`,`Workflow मा LLM node अलग चलाउनुहोस्।`,`Knowledge base भए पहिले एउटा सानो document import गर्नुहोस्।`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc जाँच्नुहोस्
   - API Key पूरा जाँच्नुहोस्

2. App मा model छैन
   - Provider मा model add छ कि हेर्नुहोस्
   - Model ID manually राख्नुहोस्

3. Workflow error
   - LLM node अलग test गर्नुहोस्
   - पछि knowledge/tool जोड्नुहोस्

4. Knowledge answer गलत
   - Chunk size र embedding जाँच्नुहोस्
   - एकपटकमा कम documents import गर्नुहोस्

5. Cost unclear
   - Console balance र charge हेर्नुहोस्`,next:[`Chat Completions API हेर्नुहोस्`,`Complete integration guide हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`]},si:{title:`Dify recommended setup`,info:`Dify තුළ gpt88.cc OpenAI Compatible Provider එකක් ලෙස සම්බන්ධ කර Base URL https://api.gpt88.cc යොදන්න. Chat, embedding සහ knowledge-base parameters වෙන වෙනම verify කරන්න.`,overview:[`Dify model provider තුළ gpt88.cc එක් කරන්න.`,`Model එක සාමාන්‍ය chat app එකකට යොදන්න.`,`Workflow / Chatflow තුළ LLM node පරීක්ෂා කරන්න.`,`Knowledge-base සහ chat model වෙන වෙනම troubleshoot කරන්න.`],prepare:`1. Dify admin permission ඇත
2. gpt88.cc API Key සූදානම්
3. Chat model ID දනී
4. Knowledge base සඳහා embedding model තීරණය කර ඇත
5. කුඩා test app එකක් සූදානම්`,provider:`Dify admin හි Model Provider settings තුළ OpenAI-compatible provider එකක් එක් කරන්න.`,app:`Provider save වූ පසු model එක app එකකට එක් කරන්න.`,workflow:`Workflow troubleshooting single node එකකින් ආරම්භ කරන්න. පළමුව LLM node සාර්ථක කර පසුව knowledge base, HTTP tool හෝ variables එක් කරන්න.`,knowledge:`Knowledge base එක වෙනම configure කරන්න:

Chat Model: final answer
Embedding Model: document vectorization
Rerank Model: result reorder, optional

විශාල document library එකකට පෙර documents 1-2 කින් chunking, retrieval සහ answer පරීක්ෂා කරන්න.`,verify:[`Provider page එකේ save කර connection test කරන්න.`,`Normal chat app එකක කුඩා ප්‍රශ්නයක් යවන්න.`,`Workflow තුළ LLM node එක තනිව ධාවනය කරන්න.`,`Knowledge base භාවිතා කරන්නේ නම් පළමුව කුඩා document එකක් import කරන්න.`],trouble:`1. Provider save fail
   - Base URL https://api.gpt88.cc පරීක්ෂා කරන්න
   - API Key සම්පූර්ණද බලන්න

2. App තුළ model නැත
   - Provider තුළ model එක් කර ඇත්ද බලන්න
   - Model ID අතින් ඇතුළත් කරන්න

3. Workflow error
   - LLM node එක තනිව test කරන්න
   - පසුව knowledge/tool එක් කරන්න

4. Knowledge answer වැරදියි
   - Chunk size සහ embedding පරීක්ෂා කරන්න
   - එකවර documents අඩු ප්‍රමාණයක් import කරන්න

5. Cost unclear
   - Console balance සහ charge බලන්න`,next:[`Chat Completions API බලන්න`,`Complete integration guide බලන්න`,`Integrations overview වෙත ආපසු යන්න`]}};function S(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(g,{});let r=c(e,`dify`,{title:`Dify 接入 gpt88.cc`,description:`把 gpt88.cc 接入 Dify 平台、Chatflow、Workflow 和知识库的逐步教程。`,intro:`聊天模型和 embedding 模型需要分开配置，建议先用一个最小应用验证。`}),u=s(e,`dify`,{overview:`教程目标`,prepare:`准备工作`,provider:`第一步：添加模型供应商`,app:`第二步：接入应用`,workflow:`第三步：接入工作流`,knowledge:`知识库配置`,verify:`验证方式`,troubleshoot:`排障清单`,next:`下一步`}),d=x[e]??x.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/platforms/dify`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`provider`,text:u.provider,level:2},{id:`app`,text:u.app,level:2},{id:`workflow`,text:u.workflow,level:2},{id:`knowledge`,text:u.knowledge,level:2},{id:`verify`,text:u.verify,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.info})}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`ul`,{children:d.overview.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.prepare}),(0,l.jsx)(`h2`,{id:`provider`,children:u.provider}),(0,l.jsx)(`p`,{children:d.provider}),(0,l.jsx)(i,{lang:`text`,filename:`provider`,code:v}),(0,l.jsx)(`h2`,{id:`app`,children:u.app}),(0,l.jsx)(`p`,{children:d.app}),(0,l.jsx)(i,{lang:`text`,filename:`app-setup`,code:y}),(0,l.jsx)(`h2`,{id:`workflow`,children:u.workflow}),(0,l.jsx)(`p`,{children:d.workflow}),(0,l.jsx)(i,{lang:`text`,filename:`workflow`,code:b}),(0,l.jsx)(`h2`,{id:`knowledge`,children:u.knowledge}),(0,l.jsx)(i,{lang:`text`,filename:`knowledge`,code:d.knowledge}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(`ol`,{children:d.verify.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/api/chat-completions/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/complete-integration/`,children:d.next[1]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[2]})})]})]})}export{S as default};