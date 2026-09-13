import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`1. Open Cherry Studio
2. Go to model provider / API settings
3. Choose OpenAI Compatible
4. Set Base URL to https://api.gpt88.cc
5. Paste the API key from the gpt88.cc console
6. Start with one stable chat model
7. Send one minimal test message`,d=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"Introduce gpt88.cc"}]
  }'`,f=`1. Set the provider to OpenAI Compatible
2. Make sure Base URL is exactly https://api.gpt88.cc
3. Use a real API key from the console
4. Start with a known stable chat model
5. Send one minimal message to verify
6. If it fails, validate with curl first`,p=`1. Model list is blank
   - Enter the model ID manually
   - Copy the exact name from the model catalog

2. 401 response
   - Key is invalid or expired

3. 404 response
   - Base URL is wrong or /v1 is missing

4. Replies are slow
   - Switch to a lighter model first
   - Disable knowledge base and long multi-turn context for the first test`;function m(){return(0,l.jsxs)(o,{path:`/docs/integrations/chat/cherry-studio`,title:`Cherry Studio with gpt88.cc`,description:`Connect gpt88.cc into Cherry Studio through the OpenAI-compatible workflow for multi-model usage, prompt templates, and routine chat scenarios.`,headings:[{id:`overview`,text:`What this guide covers`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Quick setup`,level:2},{id:`verify`,text:`Verify connectivity`,level:2},{id:`tips`,text:`Usage tips`,level:2},{id:`faq`,text:`Common questions`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Most reliable setup`,children:(0,l.jsxs)(`p`,{children:[`Cherry Studio usually works best through the OpenAI-compatible path. First make`,(0,l.jsx)(`code`,{children:` https://api.gpt88.cc `}),`work, then expand to more models.`]})}),(0,l.jsx)(`p`,{children:`This guide walks the full setup path: opening provider settings, selecting the right route, verifying connectivity, and debugging failures without guessing.`}),(0,l.jsx)(`h2`,{id:`overview`,children:`What this guide covers`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`How to connect Cherry Studio to the gpt88.cc OpenAI-compatible API.`}),(0,l.jsx)(`li`,{children:`How to start with one stable model and expand later.`}),(0,l.jsx)(`li`,{children:`What to check first when the connection fails.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:f}),(0,l.jsx)(`h2`,{id:`setup`,children:`Quick setup`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`p`,{children:`Use one minimal request to confirm the path first, then import additional models or prompt templates.`}),(0,l.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:d}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verify connectivity`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Save the Cherry Studio provider settings.`}),(0,l.jsx)(`li`,{children:`Create a new chat and send one short prompt.`}),(0,l.jsx)(`li`,{children:`If that works, then gradually increase prompt or context complexity.`}),(0,l.jsx)(`li`,{children:`If it fails, verify the API key and Base URL with curl first.`})]}),(0,l.jsx)(`h2`,{id:`tips`,children:`Usage tips`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Pin one default model to reduce unnecessary switching.`}),(0,l.jsx)(`li`,{children:`Use stronger models for long-context tasks and cheaper models for fast Q&A.`}),(0,l.jsx)(`li`,{children:`Create separate API keys per project for cost tracking and easier revocation.`})]}),(0,l.jsx)(`h2`,{id:`faq`,children:`Common questions`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`If the model list does not load, enter the model ID manually.`}),(0,l.jsxs)(`li`,{children:[`If you see 404, check whether `,(0,l.jsx)(`code`,{children:`/v1`}),` is present in the Base URL.`]}),(0,l.jsx)(`li`,{children:`If you see 401, verify that the API key was copied completely.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/complete-integration/`,`en`),children:`Read the complete integration guide`}),`.`]})]})]})}var h=`1. 打开 Cherry Studio
2. 进入模型提供商 / API 配置
3. 选择 OpenAI Compatible
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 模型先选一个稳定可用的聊天模型
7. 发送一条最小消息测试连通性`,g=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"介绍一下 gpt88.cc"}]
  }'`,_={zh:{title:`最稳接法`,stable:`Cherry Studio 直接按 OpenAI Compatible 接入即可，先用 https://api.gpt88.cc 跑通，再切模型。`,intro:`这篇教程按进入配置、选择提供商、验证连通性、排查失败的完整流程展开。`,overview:[`把 Cherry Studio 接到 gpt88.cc 的 OpenAI 兼容接口。`,`选择一个稳定模型先跑通。`,`连接失败时知道先检查什么。`],checklist:`1. 先把 Provider 选成 OpenAI Compatible
2. Base URL 一定要写成 https://api.gpt88.cc
3. API Key 使用控制台生成的真实 Key
4. 先选一个已知稳定的聊天模型
5. 发一条最小消息验证
6. 如果失败，先回到 cURL 检查接口`,setup:h,setupNote:`建议先用一条最小请求确认通路，再导入更多模型和提示词模板。`,verify:[`先在 Cherry Studio 保存配置。`,`新建对话并发送最短问题。`,`能返回内容后，再逐步增加上下文和提示词复杂度。`,`不能返回时，先用 cURL 验证 Key 和 Base URL。`],tips:[`把常用模型固定成默认项，减少手动切换。`,`长上下文优先用更强模型，快速问答优先用低成本模型。`,`给不同项目单独建 Key，方便统计成本和停用。`],faq:[`模型列表拉不到时，手动输入模型 ID。`,`返回 404 时，检查 Base URL 是否带正确的 /v1。`,`返回 401 时，确认 Key 是否复制完整。`],trouble:`1. 模型列表空白
   - 手动输入模型 ID
   - 到模型导航复制真实模型名

2. 返回 401
   - Key 无效或过期

3. 返回 404
   - Base URL 写错，或者没带 /v1

4. 回复很慢
   - 先换一个更轻的模型
   - 先关掉知识库和多轮长上下文`,next:[`返回集成总览`,`查看完整接入手册`]},hi:{title:`सबसे स्थिर तरीका`,stable:`Cherry Studio को OpenAI Compatible से जोड़ें; पहले https://api.gpt88.cc चलाकर देखें, फिर model बदलें।`,intro:`यह guide configuration, provider selection, connectivity verification और troubleshooting की पूरी flow दिखाती है।`,overview:[`Cherry Studio को gpt88.cc OpenAI-compatible API से जोड़ना।`,`पहले stable model चलाना।`,`Connection fail होने पर पहली जांच जानना।`],checklist:`1. Provider को OpenAI Compatible चुनें
2. Base URL https://api.gpt88.cc रखें
3. Console का real API Key उपयोग करें
4. Known stable chat model चुनें
5. छोटा message भेजकर verify करें
6. Fail हो तो पहले cURL जांचें`,setup:`1. Cherry Studio खोलें
2. Model provider / API config खोलें
3. OpenAI Compatible चुनें
4. Base URL https://api.gpt88.cc दें
5. Console का API Key दें
6. Stable chat model चुनें
7. छोटा test message भेजें`,setupNote:`पहले minimum request से route जांचें, फिर अधिक models और prompt templates जोड़ें।`,verify:[`Cherry Studio में config save करें।`,`नया chat खोलकर छोटा सवाल भेजें।`,`Response मिले तो context और prompt धीरे-धीरे बढ़ाएं।`,`Response न मिले तो cURL से Key और Base URL verify करें।`],tips:[`Common model को default रखें।`,`Long context में strong model और quick Q&A में low-cost model लें।`,`हर project के लिए अलग Key रखें।`],faq:[`Model list न आए तो model ID manually दें।`,`404 पर सही /v1 वाले Base URL की जांच करें।`,`401 पर Key पूरा copy हुआ है या नहीं देखें।`],trouble:`1. Model list blank
   - Model ID manually डालें
   - Model catalog से real name copy करें

2. 401
   - Key invalid या expired

3. 404
   - Base URL या model name गलत

4. Response slow
   - हल्का model चुनें
   - Knowledge base और long context बंद करें`,next:[`Integrations overview पर लौटें`,`Complete integration guide देखें`]},bn:{title:`সবচেয়ে স্থিতিশীল পদ্ধতি`,stable:`Cherry Studio-কে OpenAI Compatible দিয়ে যুক্ত করুন; আগে https://api.gpt88.cc চালিয়ে দেখুন, পরে model বদলান।`,intro:`এই guide configuration, provider selection, connectivity verification ও troubleshooting-এর সম্পূর্ণ flow দেখায়।`,overview:[`Cherry Studio-কে gpt88.cc OpenAI-compatible API-তে যুক্ত করা।`,`আগে stable model চালানো।`,`Connection fail হলে প্রথমে কী দেখবেন।`],checklist:`1. Provider OpenAI Compatible বাছুন
2. Base URL https://api.gpt88.cc দিন
3. Console-এর real API Key ব্যবহার করুন
4. Stable chat model বাছুন
5. ছোট message দিয়ে verify করুন
6. Fail হলে আগে cURL দেখুন`,setup:`1. Cherry Studio খুলুন
2. Model provider / API config খুলুন
3. OpenAI Compatible বাছুন
4. Base URL https://api.gpt88.cc দিন
5. Console-এর API Key দিন
6. Stable chat model বাছুন
7. ছোট test message পাঠান`,setupNote:`আগে minimum request দিয়ে route দেখুন, পরে আরও model ও prompt template যোগ করুন।`,verify:[`Cherry Studio-তে config save করুন।`,`নতুন chat খুলে ছোট প্রশ্ন পাঠান।`,`Response এলে context ও prompt ধীরে বাড়ান।`,`Response না এলে cURL দিয়ে Key ও Base URL যাচাই করুন।`],tips:[`Common model default রাখুন।`,`Long context-এ strong model এবং quick Q&A-তে low-cost model নিন।`,`প্রতিটি project-এ আলাদা Key রাখুন।`],faq:[`Model list না এলে model ID হাতে দিন।`,`404 হলে সঠিক /v1-সহ Base URL দেখুন।`,`401 হলে Key সম্পূর্ণ copy হয়েছে কি না দেখুন।`],trouble:`1. Model list blank
   - Model ID হাতে দিন
   - Model catalog থেকে real name copy করুন

2. 401
   - Key invalid বা expired

3. 404
   - Base URL বা model name ভুল

4. Response slow
   - হালকা model নিন
   - Knowledge base ও long context বন্ধ করুন`,next:[`Integrations overview-এ ফিরুন`,`Complete integration guide দেখুন`]},ur:{title:`سب سے مستحکم طریقہ`,stable:`Cherry Studio کو OpenAI Compatible سے جوڑیں؛ پہلے https://api.gpt88.cc چلا کر دیکھیں، پھر model بدلیں۔`,intro:`یہ guide configuration، provider selection، connectivity verification اور troubleshooting کی مکمل flow دکھاتی ہے۔`,overview:[`Cherry Studio کو gpt88.cc OpenAI-compatible API سے جوڑنا۔`,`پہلے stable model چلانا۔`,`Connection fail پر پہلی جانچ جاننا۔`],checklist:`1. Provider کو OpenAI Compatible منتخب کریں
2. Base URL https://api.gpt88.cc رکھیں
3. Console کا real API Key استعمال کریں
4. Stable chat model منتخب کریں
5. مختصر message سے verify کریں
6. Fail ہو تو پہلے cURL چیک کریں`,setup:`1. Cherry Studio کھولیں
2. Model provider / API config کھولیں
3. OpenAI Compatible منتخب کریں
4. Base URL https://api.gpt88.cc رکھیں
5. Console کا API Key درج کریں
6. Stable chat model منتخب کریں
7. مختصر test message بھیجیں`,setupNote:`پہلے minimum request سے route verify کریں، پھر مزید models اور prompt templates شامل کریں۔`,verify:[`Cherry Studio میں config save کریں۔`,`نیا chat کھول کر مختصر سوال بھیجیں۔`,`Response آئے تو context اور prompt آہستہ بڑھائیں۔`,`Response نہ آئے تو cURL سے Key اور Base URL verify کریں۔`],tips:[`Common model کو default رکھیں۔`,`Long context کے لیے strong model اور quick Q&A کے لیے low-cost model لیں۔`,`ہر project کے لیے الگ Key رکھیں۔`],faq:[`Model list نہ آئے تو model ID manually دیں۔`,`404 پر درست /v1 والے Base URL کو چیک کریں۔`,`401 پر Key مکمل copy ہوئی ہے یا نہیں دیکھیں۔`],trouble:`1. Model list blank
   - Model ID manually دیں
   - Model catalog سے real name copy کریں

2. 401
   - Key invalid یا expired

3. 404
   - Base URL یا model name غلط

4. Response slow
   - ہلکا model منتخب کریں
   - Knowledge base اور long context بند کریں`,next:[`Integrations overview پر واپس جائیں`,`Complete integration guide دیکھیں`]},ta:{title:`மிகவும் நிலையான முறை`,stable:`Cherry Studio-ஐ OpenAI Compatible மூலம் இணைக்கவும்; முதலில் https://api.gpt88.cc இயக்கி, பின்னர் model மாற்றவும்.`,intro:`இந்த guide configuration, provider selection, connectivity verification மற்றும் troubleshooting flow-ஐ முழுமையாகக் காட்டுகிறது.`,overview:[`Cherry Studio-ஐ gpt88.cc OpenAI-compatible API-க்கு இணைப்பது.`,`முதலில் stable model இயக்குவது.`,`Connection fail ஆனால் முதலில் என்ன சரிபார்ப்பது.`],checklist:`1. Provider-ஐ OpenAI Compatible தேர்வு செய்யவும்
2. Base URL https://api.gpt88.cc அமைக்கவும்
3. Console real API Key பயன்படுத்தவும்
4. Stable chat model தேர்வு செய்யவும்
5. சிறிய message மூலம் verify செய்யவும்
6. Fail ஆனால் cURL சரிபார்க்கவும்`,setup:`1. Cherry Studio திறக்கவும்
2. Model provider / API config திறக்கவும்
3. OpenAI Compatible தேர்வு செய்யவும்
4. Base URL https://api.gpt88.cc அமைக்கவும்
5. Console API Key உள்ளிடவும்
6. Stable chat model தேர்வு செய்யவும்
7. சிறிய test message அனுப்பவும்`,setupNote:`முதலில் minimum request மூலம் route சரிபார்த்து, பின்னர் models மற்றும் prompt templates சேர்க்கவும்.`,verify:[`Cherry Studio-ல் config save செய்யவும்.`,`புதிய chat திறந்து சிறிய கேள்வி அனுப்பவும்.`,`Response வந்தால் context மற்றும் prompt-ஐ மெதுவாக அதிகரிக்கவும்.`,`Response வராவிட்டால் cURL மூலம் Key மற்றும் Base URL சரிபார்க்கவும்.`],tips:[`Common model-ஐ default ஆக வைத்திருக்கவும்.`,`Long context-க்கு strong model, quick Q&A-க்கு low-cost model பயன்படுத்தவும்.`,`ஒவ்வொரு project-க்கும் தனி Key வைக்கவும்.`],faq:[`Model list வராவிட்டால் model ID-ஐ கைமுறையாக உள்ளிடவும்.`,`404 என்றால் சரியான /v1 உடன் Base URL சரிபார்க்கவும்.`,`401 என்றால் Key முழுமையாக copy செய்யப்பட்டதா பார்க்கவும்.`],trouble:`1. Model list blank
   - Model ID கைமுறையாக உள்ளிடவும்
   - Model catalog-ல் real name copy செய்யவும்

2. 401
   - Key invalid அல்லது expired

3. 404
   - Base URL அல்லது model name தவறு

4. Response slow
   - இலகுவான model தேர்வு செய்யவும்
   - Knowledge base மற்றும் long context-ஐ அணைக்கவும்`,next:[`Integrations overview-க்கு திரும்பவும்`,`Complete integration guide பார்க்கவும்`]},ne:{title:`सबैभन्दा स्थिर तरिका`,stable:`Cherry Studio लाई OpenAI Compatible बाट जोड्नुहोस्; पहिले https://api.gpt88.cc चलाएर अनि model बदल्नुहोस्।`,intro:`यो guide ले configuration, provider selection, connectivity verification र troubleshooting को पूरा flow देखाउँछ।`,overview:[`Cherry Studio लाई gpt88.cc OpenAI-compatible API मा जोड्ने।`,`पहिले stable model चलाउने।`,`Connection fail हुँदा सुरुमा के जाँच्ने।`],checklist:`1. Provider OpenAI Compatible छान्नुहोस्
2. Base URL https://api.gpt88.cc राख्नुहोस्
3. Console को real API Key प्रयोग गर्नुहोस्
4. Stable chat model छान्नुहोस्
5. सानो message बाट verify गर्नुहोस्
6. Fail भए पहिले cURL जाँच्नुहोस्`,setup:`1. Cherry Studio खोल्नुहोस्
2. Model provider / API config खोल्नुहोस्
3. OpenAI Compatible छान्नुहोस्
4. Base URL https://api.gpt88.cc राख्नुहोस्
5. Console को API Key राख्नुहोस्
6. Stable chat model छान्नुहोस्
7. सानो test message पठाउनुहोस्`,setupNote:`पहिले minimum request बाट route जाँचेर पछि अरू model र prompt template थप्नुहोस्।`,verify:[`Cherry Studio मा config save गर्नुहोस्।`,`नयाँ chat खोलेर सानो प्रश्न पठाउनुहोस्।`,`Response आए context र prompt बिस्तारै बढाउनुहोस्।`,`Response नआए cURL बाट Key र Base URL verify गर्नुहोस्।`],tips:[`Common model लाई default राख्नुहोस्।`,`Long context मा strong model र quick Q&A मा low-cost model प्रयोग गर्नुहोस्।`,`हरेक project का लागि छुट्टै Key राख्नुहोस्।`],faq:[`Model list नआए model ID manually राख्नुहोस्।`,`404 मा सही /v1 भएको Base URL जाँच्नुहोस्।`,`401 मा Key पूरा copy भएको छ कि जाँच्नुहोस्।`],trouble:`1. Model list blank
   - Model ID manually राख्नुहोस्
   - Model catalog बाट real name copy गर्नुहोस्

2. 401
   - Key invalid वा expired

3. 404
   - Base URL वा model name गलत

4. Response slow
   - हल्का model छान्नुहोस्
   - Knowledge base र long context बन्द गर्नुहोस्`,next:[`Integrations overview मा फर्कनुहोस्`,`Complete integration guide हेर्नुहोस्`]},si:{title:`වඩාත් ස්ථාවර ක්‍රමය`,stable:`Cherry Studio OpenAI Compatible ලෙස සම්බන්ධ කරන්න; පළමුව https://api.gpt88.cc ධාවනය කර පසුව model මාරු කරන්න.`,intro:`මෙම guide එක configuration, provider selection, connectivity verification සහ troubleshooting flow එක සම්පූර්ණයෙන් පෙන්වයි.`,overview:[`Cherry Studio gpt88.cc OpenAI-compatible API සමඟ සම්බන්ධ කිරීම.`,`පළමුව stable model එකක් ධාවනය කිරීම.`,`Connection fail වූ විට පළමුව පරීක්ෂා කළ යුතු දේ.`],checklist:`1. Provider OpenAI Compatible ලෙස තෝරන්න
2. Base URL https://api.gpt88.cc යොදන්න
3. Console real API Key භාවිතා කරන්න
4. Stable chat model තෝරන්න
5. කුඩා message එකකින් verify කරන්න
6. Fail නම් පළමුව cURL පරීක්ෂා කරන්න`,setup:`1. Cherry Studio විවෘත කරන්න
2. Model provider / API config විවෘත කරන්න
3. OpenAI Compatible තෝරන්න
4. Base URL https://api.gpt88.cc යොදන්න
5. Console API Key ඇතුළත් කරන්න
6. Stable chat model තෝරන්න
7. කුඩා test message එකක් යවන්න`,setupNote:`පළමුව minimum request එකකින් route පරීක්ෂා කර පසුව models සහ prompt templates එක් කරන්න.`,verify:[`Cherry Studio තුළ config save කරන්න.`,`නව chat එකක් විවෘත කර කුඩා ප්‍රශ්නයක් යවන්න.`,`Response ලැබේ නම් context සහ prompt ක්‍රමයෙන් වැඩි කරන්න.`,`Response නැති නම් cURL මඟින් Key සහ Base URL verify කරන්න.`],tips:[`Common model එක default කර තබන්න.`,`Long context සඳහා strong model, quick Q&A සඳහා low-cost model භාවිතා කරන්න.`,`Project එකකට වෙනම Key එකක් තබන්න.`],faq:[`Model list නොලැබේ නම් model ID අතින් ඇතුළත් කරන්න.`,`404 නම් නිවැරදි /v1 සහිත Base URL පරීක්ෂා කරන්න.`,`401 නම් Key සම්පූර්ණයෙන් copy කර ඇත්ද බලන්න.`],trouble:`1. Model list blank
   - Model ID අතින් ඇතුළත් කරන්න
   - Model catalog එකෙන් real name copy කරන්න

2. 401
   - Key invalid හෝ expired

3. 404
   - Base URL හෝ model name වැරදියි

4. Response slow
   - සැහැල්ලු model එකක් තෝරන්න
   - Knowledge base සහ long context අක්‍රීය කරන්න`,next:[`Integrations overview වෙත ආපසු යන්න`,`Complete integration guide බලන්න`]}};function v(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(m,{});let r=c(e,`cherry-studio`,{title:`Cherry Studio 接入 gpt88.cc`,description:`把 gpt88.cc 接到 Cherry Studio 的 OpenAI 兼容工作流里，适合多模型管理、提示词模板和常用对话场景。`,intro:`选择 OpenAI Compatible provider，填入 Base URL 和 Key，再从稳定模型开始。`}),u=s(e,`cherry-studio`,{overview:`这篇教程讲什么`,prepare:`准备工作`,setup:`快速配置`,verify:`验证连通性`,tips:`使用建议`,faq:`常见问题`,troubleshoot:`排障清单`,next:`下一步`}),d=_[e]??_.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/chat/cherry-studio`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`setup`,text:u.setup,level:2},{id:`verify`,text:u.verify,level:2},{id:`tips`,text:u.tips,level:2},{id:`faq`,text:u.faq,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.stable})}),(0,l.jsx)(`p`,{children:d.intro}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`ul`,{children:d.overview.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.checklist}),(0,l.jsx)(`h2`,{id:`setup`,children:u.setup}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:d.setup}),(0,l.jsx)(`p`,{children:d.setupNote}),(0,l.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:g}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(`ol`,{children:d.verify.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`tips`,children:u.tips}),(0,l.jsx)(`ul`,{children:d.tips.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`faq`,children:u.faq}),(0,l.jsx)(`ul`,{children:d.faq.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/complete-integration/`,children:d.next[1]})})]})]})}export{v as default};