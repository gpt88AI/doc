import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`1. Install the Immersive Translate browser extension
2. Prepare a gpt88.cc API key
3. Confirm the chat model you want to use
4. Make sure the browser can access the target page
5. Prepare a short page or short paragraph for the first test`,d=`Service Type: OpenAI Compatible / Custom OpenAI
API Key: sk-your-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`,f=`1. Open the browser extension management page
2. Enter Immersive Translate settings
3. Find AI translation service / OpenAI settings
4. Choose OpenAI Compatible or Custom OpenAI
5. Paste the API key
6. Set Base URL to https://api.gpt88.cc
7. Set the model name to gpt-5-2-chat-latest
8. Save
9. Open a short webpage and test translation`,p=`You are a professional translation assistant.
Translate the user text into Simplified Chinese.
Requirements:
1. Preserve the original paragraph structure
2. Keep technical terminology accurate
3. Do not add explanations
4. Do not output anything unrelated to the translation`,m=`Test text:
The model supports streaming responses and tool calls.

Expected result:
The translation should sound natural in Chinese while preserving the technical meaning of streaming responses and tool calls.`,h=`1. The translate button does nothing
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
   - Use a fixed system prompt`;function g(){return(0,l.jsxs)(o,{path:`/docs/integrations/platforms/immersive-translate`,title:`Immersive Translate with gpt88.cc`,description:`Step-by-step guide for connecting the Immersive Translate browser extension to gpt88.cc through an OpenAI-compatible API.`,headings:[{id:`overview`,text:`Use cases`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`configure`,text:`Step 1: Fill in service settings`,level:2},{id:`flow`,text:`Step 2: Walk through the setup`,level:2},{id:`prompt`,text:`Step 3: Improve the translation prompt`,level:2},{id:`verify`,text:`Step 4: Verify translation quality`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Recommended usage`,children:(0,l.jsx)(`p`,{children:`Immersive Translate works well through the OpenAI-compatible route. Translation tasks value stability and cost control, so start with a lighter chat model and adjust only after the workflow is stable.`})}),(0,l.jsx)(`h2`,{id:`overview`,children:`Use cases`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Full-page webpage translation.`}),(0,l.jsx)(`li`,{children:`Technical documentation translation.`}),(0,l.jsx)(`li`,{children:`Segmented translation for papers, blogs, and product docs.`}),(0,l.jsx)(`li`,{children:`Cases where you want more natural output than baseline machine translation.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:u}),(0,l.jsx)(`h2`,{id:`configure`,children:`Step 1: Fill in service settings`}),(0,l.jsx)(`p`,{children:`Choose the OpenAI-compatible service inside Immersive Translate, then fill the fields below.`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:d}),(0,l.jsx)(`h2`,{id:`flow`,children:`Step 2: Walk through the setup`}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:f}),(0,l.jsx)(`h2`,{id:`prompt`,children:`Step 3: Improve the translation prompt`}),(0,l.jsx)(`p`,{children:`If the extension supports a custom system prompt, use a constrained translation prompt. For technical content, preserve terminology instead of letting the model improvise.`}),(0,l.jsx)(i,{lang:`text`,filename:`translation-prompt`,code:p}),(0,l.jsx)(`h2`,{id:`verify`,children:`Step 4: Verify translation quality`}),(0,l.jsx)(i,{lang:`text`,filename:`verify`,code:m}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Start with one short English paragraph.`}),(0,l.jsx)(`li`,{children:`Confirm the translation does not add extra explanation.`}),(0,l.jsx)(`li`,{children:`Then test a longer page with segmented translation.`}),(0,l.jsx)(`li`,{children:`If cost is high, shorten each request or switch to a lighter model.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:h}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/chat/chatbox/`,`en`),children:`Read the ChatBox guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/gpt88-tutorial/`,`en`),children:`Read the general gpt88.cc guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var _=`1. 已安装沉浸式翻译浏览器扩展
2. 已准备 gpt88.cc API Key
3. 已确认要使用的聊天模型
4. 浏览器可以访问目标网页
5. 先准备一个短网页或短段落测试`,v=`服务类型: OpenAI Compatible / 自定义 OpenAI
API Key: sk-你的-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`,y={zh:{title:`推荐用法`,info:`沉浸式翻译按 OpenAI Compatible 接入即可。翻译任务更看重稳定和成本，建议先用轻量聊天模型测试，再根据网页长度调整模型。`,overview:[`网页全文翻译。`,`技术文档中英互译。`,`论文、博客、产品文档的分段翻译。`,`需要比普通机器翻译更自然的表达。`],prepare:_,configure:`在沉浸式翻译的 AI 服务配置里选择 OpenAI 兼容服务，然后按下面填写。`,flow:`1. 打开浏览器扩展管理页
2. 进入沉浸式翻译设置
3. 找到 AI 翻译服务 / OpenAI 设置
4. 选择 OpenAI Compatible 或自定义 OpenAI
5. 填入 API Key
6. Base URL 填 https://api.gpt88.cc
7. 模型名填 gpt-5-2-chat-latest
8. 保存配置
9. 打开一篇短网页测试翻译`,promptIntro:`如果扩展支持自定义系统提示词，可以使用更稳定的翻译约束。技术文档建议保留术语，不要让模型自由发挥。`,prompt:`你是专业翻译助手。
请把用户提供的文本翻译成简体中文。
要求：
1. 保留原文段落结构
2. 技术术语保持准确
3. 不要添加解释
4. 不要输出与翻译无关的内容`,verify:`测试文本：
The model supports streaming responses and tool calls.

预期结果：
模型应翻译为自然中文，并保留 streaming responses、tool calls 等技术含义。`,verifyList:[`先用一段短英文测试。`,`确认翻译不会添加额外解释。`,`再打开长网页测试分段翻译。`,`成本较高时，降低单次段落长度或切换轻量模型。`],trouble:`1. 翻译按钮没反应
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
   - 使用固定系统提示词`,next:[`查看 ChatBox 接入教程`,`查看 gpt88.cc 通用教程`,`返回集成总览`]},hi:{title:`Recommended उपयोग`,info:`Immersive Translate को OpenAI Compatible से जोड़ें। Translation में stability और cost महत्वपूर्ण हैं; पहले lightweight chat model से test करें।`,overview:[`पूरे webpage का translation।`,`Technical docs का bilingual translation।`,`Paper, blog और product docs का segment translation।`,`सामान्य machine translation से अधिक natural भाषा।`],prepare:`1. Immersive Translate browser extension install है
2. gpt88.cc API Key तैयार है
3. Chat model तय है
4. Browser target page खोल सकता है
5. छोटा webpage या paragraph test के लिए तैयार है`,configure:`Immersive Translate AI service settings में OpenAI-compatible service चुनकर यह भरें।`,flow:`1. Browser extension management खोलें
2. Immersive Translate settings खोलें
3. AI translation / OpenAI settings खोजें
4. OpenAI Compatible चुनें
5. API Key भरें
6. Base URL https://api.gpt88.cc रखें
7. Model gpt-5-2-chat-latest रखें
8. Save करें
9. Short webpage पर translation test करें`,promptIntro:`Custom system prompt उपलब्ध हो तो stable translation constraints रखें। Technical terms preserve करें और model को freely improvise न करने दें।`,prompt:`You are a professional translation assistant.
Translate the user text into Hindi.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Hindi translation while preserving streaming responses and tool calls.`,verifyList:[`Short English passage से test करें।`,`Extra explanation न जुड़ने दें।`,`फिर long webpage पर segment translation test करें।`,`Cost अधिक हो तो paragraph छोटा करें या lightweight model लें।`],trouble:`1. Translate button नहीं चलता
   - Extension enabled और page permission जांचें

2. API 401
   - API Key पूरा है और spaces नहीं हैं देखें

3. API 404
   - Base URL https://api.gpt88.cc और real model ID जांचें

4. Translation slow
   - हल्का model लें
   - Paragraph छोटा करें

5. Style unstable
   - Temperature घटाएं
   - Fixed system prompt रखें`,next:[`ChatBox tutorial देखें`,`gpt88.cc general tutorial देखें`,`Integrations overview पर लौटें`]},bn:{title:`Recommended ব্যবহার`,info:`Immersive Translate-কে OpenAI Compatible দিয়ে যুক্ত করুন। Translation-এ stability ও cost গুরুত্বপূর্ণ; আগে lightweight chat model দিয়ে test করুন।`,overview:[`সম্পূর্ণ webpage translation।`,`Technical docs-এর bilingual translation।`,`Paper, blog ও product docs-এর segment translation।`,`সাধারণ machine translation-এর চেয়ে natural expression।`],prepare:`1. Immersive Translate browser extension install আছে
2. gpt88.cc API Key প্রস্তুত
3. Chat model ঠিক করা
4. Browser target page খুলতে পারে
5. ছোট webpage বা paragraph test-এর জন্য প্রস্তুত`,configure:`Immersive Translate AI service settings-এ OpenAI-compatible service বেছে এটি পূরণ করুন।`,flow:`1. Browser extension management খুলুন
2. Immersive Translate settings খুলুন
3. AI translation / OpenAI settings খুঁজুন
4. OpenAI Compatible বাছুন
5. API Key দিন
6. Base URL https://api.gpt88.cc দিন
7. Model gpt-5-2-chat-latest দিন
8. Save করুন
9. ছোট webpage-এ translation test করুন`,promptIntro:`Custom system prompt থাকলে stable translation constraint রাখুন। Technical term preserve করুন এবং model-কে freely improvise করতে দেবেন না।`,prompt:`You are a professional translation assistant.
Translate the user text into Bengali.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Bengali translation while preserving streaming responses and tool calls.`,verifyList:[`ছোট English passage দিয়ে test করুন।`,`Extra explanation যোগ হচ্ছে না নিশ্চিত করুন।`,`তারপর long webpage-এ segment translation test করুন।`,`Cost বেশি হলে paragraph ছোট করুন বা lightweight model নিন।`],trouble:`1. Translate button কাজ করছে না
   - Extension enabled ও page permission দেখুন

2. API 401
   - API Key সম্পূর্ণ এবং spaces নেই দেখুন

3. API 404
   - Base URL https://api.gpt88.cc ও real model ID দেখুন

4. Translation slow
   - হালকা model নিন
   - Paragraph ছোট করুন

5. Style unstable
   - Temperature কমান
   - Fixed system prompt রাখুন`,next:[`ChatBox tutorial দেখুন`,`gpt88.cc general tutorial দেখুন`,`Integrations overview-এ ফিরুন`]},ur:{title:`Recommended استعمال`,info:`Immersive Translate کو OpenAI Compatible سے جوڑیں۔ Translation میں stability اور cost اہم ہیں؛ پہلے lightweight chat model سے test کریں۔`,overview:[`پورے webpage کا translation۔`,`Technical docs کا bilingual translation۔`,`Paper، blog اور product docs کا segment translation۔`,`عام machine translation سے زیادہ natural expression۔`],prepare:`1. Immersive Translate browser extension install ہے
2. gpt88.cc API Key تیار ہے
3. Chat model طے ہے
4. Browser target page کھول سکتا ہے
5. مختصر webpage یا paragraph test کے لیے تیار ہے`,configure:`Immersive Translate AI service settings میں OpenAI-compatible service منتخب کر کے یہ بھریں۔`,flow:`1. Browser extension management کھولیں
2. Immersive Translate settings کھولیں
3. AI translation / OpenAI settings تلاش کریں
4. OpenAI Compatible منتخب کریں
5. API Key درج کریں
6. Base URL https://api.gpt88.cc رکھیں
7. Model gpt-5-2-chat-latest رکھیں
8. Save کریں
9. مختصر webpage پر translation test کریں`,promptIntro:`Custom system prompt ہو تو stable translation constraints رکھیں۔ Technical terms محفوظ کریں اور model کو آزادانہ improvise نہ کرنے دیں۔`,prompt:`You are a professional translation assistant.
Translate the user text into Urdu.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Urdu translation while preserving streaming responses and tool calls.`,verifyList:[`مختصر English passage سے test کریں۔`,`Extra explanation شامل نہ ہو یہ دیکھیں۔`,`پھر long webpage پر segment translation test کریں۔`,`Cost زیادہ ہو تو paragraph کم کریں یا lightweight model لیں۔`],trouble:`1. Translate button نہیں چلتا
   - Extension enabled اور page permission چیک کریں

2. API 401
   - API Key مکمل ہے اور spaces نہیں چیک کریں

3. API 404
   - Base URL https://api.gpt88.cc اور real model ID چیک کریں

4. Translation slow
   - ہلکا model لیں
   - Paragraph کم کریں

5. Style unstable
   - Temperature کم کریں
   - Fixed system prompt رکھیں`,next:[`ChatBox tutorial دیکھیں`,`gpt88.cc general tutorial دیکھیں`,`Integrations overview پر واپس جائیں`]},ta:{title:`Recommended பயன்பாடு`,info:`Immersive Translate-ஐ OpenAI Compatible மூலம் இணைக்கவும். Translation-ல் stability மற்றும் cost முக்கியம்; முதலில் lightweight chat model-ல் test செய்யவும்.`,overview:[`முழு webpage translation.`,`Technical docs bilingual translation.`,`Paper, blog மற்றும் product docs segment translation.`,`சாதாரண machine translation-ஐ விட natural expression.`],prepare:`1. Immersive Translate browser extension install செய்யப்பட்டுள்ளது
2. gpt88.cc API Key தயார்
3. Chat model தேர்வு செய்யப்பட்டுள்ளது
4. Browser target page-ஐ அணுக முடியும்
5. சிறிய webpage அல்லது paragraph test-க்கு தயார்`,configure:`Immersive Translate AI service settings-ல் OpenAI-compatible service தேர்வு செய்து இதை நிரப்பவும்.`,flow:`1. Browser extension management திறக்கவும்
2. Immersive Translate settings திறக்கவும்
3. AI translation / OpenAI settings தேடவும்
4. OpenAI Compatible தேர்வு செய்யவும்
5. API Key உள்ளிடவும்
6. Base URL https://api.gpt88.cc அமைக்கவும்
7. Model gpt-5-2-chat-latest அமைக்கவும்
8. Save செய்யவும்
9. சிறிய webpage-ல் translation test செய்யவும்`,promptIntro:`Custom system prompt இருந்தால் stable translation constraints பயன்படுத்தவும். Technical terms-ஐ காத்து model-ஐ சுதந்திரமாக improvise செய்ய விட வேண்டாம்.`,prompt:`You are a professional translation assistant.
Translate the user text into Tamil.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Tamil translation while preserving streaming responses and tool calls.`,verifyList:[`சிறிய English passage மூலம் test செய்யவும்.`,`Extra explanation சேராததை உறுதி செய்யவும்.`,`பின்னர் long webpage-ல் segment translation test செய்யவும்.`,`Cost அதிகமானால் paragraph நீளத்தை குறைக்கவும் அல்லது lightweight model மாற்றவும்.`],trouble:`1. Translate button இயங்கவில்லை
   - Extension enabled மற்றும் page permission சரிபார்க்கவும்

2. API 401
   - API Key முழுமையா, spaces இல்லையா பார்க்கவும்

3. API 404
   - Base URL https://api.gpt88.cc மற்றும் real model ID சரிபார்க்கவும்

4. Translation slow
   - இலகுவான model தேர்வு செய்யவும்
   - Paragraph நீளம் குறைக்கவும்

5. Style unstable
   - Temperature குறைக்கவும்
   - Fixed system prompt பயன்படுத்தவும்`,next:[`ChatBox tutorial பார்க்கவும்`,`gpt88.cc general tutorial பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`]},ne:{title:`Recommended प्रयोग`,info:`Immersive Translate लाई OpenAI Compatible बाट जोड्नुहोस्। Translation मा stability र cost महत्वपूर्ण छन्; पहिले lightweight chat model बाट test गर्नुहोस्।`,overview:[`पूरै webpage translation।`,`Technical docs bilingual translation।`,`Paper, blog र product docs segment translation।`,`साधारण machine translation भन्दा natural expression।`],prepare:`1. Immersive Translate browser extension install छ
2. gpt88.cc API Key तयार छ
3. Chat model तय छ
4. Browser ले target page खोल्न सक्छ
5. सानो webpage वा paragraph test का लागि तयार छ`,configure:`Immersive Translate AI service settings मा OpenAI-compatible service छानेर यो भर्नुहोस्।`,flow:`1. Browser extension management खोल्नुहोस्
2. Immersive Translate settings खोल्नुहोस्
3. AI translation / OpenAI settings खोज्नुहोस्
4. OpenAI Compatible छान्नुहोस्
5. API Key राख्नुहोस्
6. Base URL https://api.gpt88.cc राख्नुहोस्
7. Model gpt-5-2-chat-latest राख्नुहोस्
8. Save गर्नुहोस्
9. सानो webpage मा translation test गर्नुहोस्`,promptIntro:`Custom system prompt भए stable translation constraints राख्नुहोस्। Technical terms बचाइराखी model लाई स्वतन्त्र रूपमा improvise गर्न नदिनुहोस्।`,prompt:`You are a professional translation assistant.
Translate the user text into Nepali.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Nepali translation while preserving streaming responses and tool calls.`,verifyList:[`सानो English passage बाट test गर्नुहोस्।`,`Extra explanation थपिएको छैन जाँच्नुहोस्।`,`पछि long webpage मा segment translation test गर्नुहोस्।`,`Cost धेरै भए paragraph छोट्याउनुहोस् वा lightweight model छान्नुहोस्।`],trouble:`1. Translate button चल्दैन
   - Extension enabled र page permission जाँच्नुहोस्

2. API 401
   - API Key पूरा र spaces नभएको जाँच्नुहोस्

3. API 404
   - Base URL https://api.gpt88.cc र real model ID जाँच्नुहोस्

4. Translation slow
   - हल्का model छान्नुहोस्
   - Paragraph छोट्याउनुहोस्

5. Style unstable
   - Temperature घटाउनुहोस्
   - Fixed system prompt राख्नुहोस्`,next:[`ChatBox tutorial हेर्नुहोस्`,`gpt88.cc general tutorial हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`]},si:{title:`Recommended භාවිතය`,info:`Immersive Translate OpenAI Compatible ලෙස සම්බන්ධ කරන්න. Translation සඳහා stability සහ cost වැදගත්ය; පළමුව lightweight chat model එකකින් test කරන්න.`,overview:[`සම්පූර්ණ webpage translation.`,`Technical docs bilingual translation.`,`Paper, blog සහ product docs segment translation.`,`සාමාන්‍ය machine translation එකකට වඩා natural expression.`],prepare:`1. Immersive Translate browser extension install කර ඇත
2. gpt88.cc API Key සූදානම්
3. Chat model තෝරා ඇත
4. Browser හට target page වෙත යා හැක
5. කුඩා webpage හෝ paragraph test සඳහා සූදානම්`,configure:`Immersive Translate AI service settings තුළ OpenAI-compatible service තෝරා මෙය පුරවන්න.`,flow:`1. Browser extension management විවෘත කරන්න
2. Immersive Translate settings විවෘත කරන්න
3. AI translation / OpenAI settings සොයන්න
4. OpenAI Compatible තෝරන්න
5. API Key ඇතුළත් කරන්න
6. Base URL https://api.gpt88.cc යොදන්න
7. Model gpt-5-2-chat-latest යොදන්න
8. Save කරන්න
9. කුඩා webpage එකක translation test කරන්න`,promptIntro:`Custom system prompt සහාය තිබේ නම් stable translation constraints භාවිතා කරන්න. Technical terms තබාගෙන model එකට නිදහසේ improvise කිරීමට ඉඩ නොදෙන්න.`,prompt:`You are a professional translation assistant.
Translate the user text into Sinhala.
Requirements:
1. Preserve paragraph structure
2. Keep technical terms accurate
3. Do not add explanations
4. Do not output unrelated content`,verify:`Test text:
The model supports streaming responses and tool calls.

Expected:
Natural Sinhala translation while preserving streaming responses and tool calls.`,verifyList:[`කුඩා English passage එකකින් test කරන්න.`,`අමතර explanation එක් නොවන බව තහවුරු කරන්න.`,`ඉන්පසු long webpage එකක segment translation test කරන්න.`,`Cost වැඩි නම් paragraph දිග අඩු කරන්න හෝ lightweight model මාරු කරන්න.`],trouble:`1. Translate button ක්‍රියා නොකරයි
   - Extension enabled සහ page permission පරීක්ෂා කරන්න

2. API 401
   - API Key සම්පූර්ණද spaces නැද්ද බලන්න

3. API 404
   - Base URL https://api.gpt88.cc සහ real model ID පරීක්ෂා කරන්න

4. Translation slow
   - සැහැල්ලු model එකක් තෝරන්න
   - Paragraph දිග අඩු කරන්න

5. Style unstable
   - Temperature අඩු කරන්න
   - Fixed system prompt භාවිතා කරන්න`,next:[`ChatBox tutorial බලන්න`,`gpt88.cc general tutorial බලන්න`,`Integrations overview වෙත ආපසු යන්න`]}};function b(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(g,{});let r=c(e,`immersive-translate`,{title:`沉浸式翻译接入 gpt88.cc`,description:`浏览器沉浸式翻译扩展通过 OpenAI 兼容接口接入 gpt88.cc 的逐步教程。`,intro:`选择一段短网页，配置模型和 API endpoint，再检查翻译质量与实际用量。`}),u=s(e,`immersive-translate`,{overview:`适用场景`,prepare:`准备工作`,configure:`第一步：填写服务配置`,flow:`第二步：逐步操作`,prompt:`第三步：优化翻译提示词`,verify:`第四步：验证翻译效果`,troubleshoot:`排障清单`,next:`下一步`}),d=y[e]??y.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/platforms/immersive-translate`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`configure`,text:u.configure,level:2},{id:`flow`,text:u.flow,level:2},{id:`prompt`,text:u.prompt,level:2},{id:`verify`,text:u.verify,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.info})}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`ul`,{children:d.overview.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.prepare}),(0,l.jsx)(`h2`,{id:`configure`,children:u.configure}),(0,l.jsx)(`p`,{children:d.configure}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:d.setup??v}),(0,l.jsx)(`h2`,{id:`flow`,children:u.flow}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:d.flow}),(0,l.jsx)(`h2`,{id:`prompt`,children:u.prompt}),(0,l.jsx)(`p`,{children:d.promptIntro}),(0,l.jsx)(i,{lang:`text`,filename:`translation-prompt`,code:d.prompt}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(i,{lang:`text`,filename:`verify`,code:d.verify}),(0,l.jsx)(`ol`,{children:d.verifyList.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/chat/chatbox/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/gpt88-tutorial/`,children:d.next[1]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[2]})})]})]})}export{b as default};