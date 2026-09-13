import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o,r as s,t as c}from"./index-DCJmtdkW.js";import{n as l,t as u}from"./integrationLocaleCopy-DCRt8AIz.js";var d=e(),f=`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 or gpt-5-2-chat-latest`,p=`1. Open Cursor settings
2. Find Models / API Keys / OpenAI Compatible settings
3. Paste the gpt88.cc API key
4. Set Base URL to https://api.gpt88.cc
5. Add the model ID manually
6. Save and test in Composer or Chat`,m=`1. Model cannot be selected
   - Add the model ID manually

2. 401 request
   - Key is invalid or overridden by an environment variable

3. 404 request
   - /v1 is missing or the model name is wrong

4. Agent edits are unstable
   - Switch to a stronger model
   - Reduce one-shot context size`;function h(){return(0,d.jsxs)(o,{path:`/docs/integrations/dev/cursor`,title:`Cursor with gpt88.cc`,description:`Use gpt88.cc as the OpenAI-compatible provider inside Cursor.`,headings:[{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,d.jsx)(a,{tone:`info`,title:`Use the OpenAI-compatible route`,children:(0,d.jsxs)(`p`,{children:[`The core Cursor setup is just two items: a real API key and`,(0,d.jsx)(`code`,{children:` https://api.gpt88.cc`}),`.`]})}),(0,d.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`Create a gpt88.cc API key.`}),(0,d.jsx)(`li`,{children:`Confirm the exact model ID you want to use.`}),(0,d.jsx)(`li`,{children:`Decide on a default model before adding more options.`})]}),(0,d.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,d.jsx)(i,{lang:`text`,filename:`steps`,code:p}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:f}),(0,d.jsx)(`p`,{children:`If you maintain multiple models in Cursor, start with one default model and expand after verification.`}),(0,d.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,d.jsxs)(`ol`,{children:[(0,d.jsx)(`li`,{children:`Open Cursor Chat and send one simple question.`}),(0,d.jsx)(`li`,{children:`Then open Composer and ask it to explain one small file in the current project.`}),(0,d.jsx)(`li`,{children:`If both succeed, move on to real editing tasks.`})]}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:m}),(0,d.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,d.jsx)(`ul`,{children:(0,d.jsxs)(`li`,{children:[(0,d.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var g={zh:{title:`Cursor 推荐用 OpenAI Compatible`,core:`Cursor 接 gpt88.cc 的核心就是两项：API Key 和 https://api.gpt88.cc。`,prepare:[`准备一把 gpt88.cc API Key。`,`确认要用的模型 ID。`,`先决定默认模型，再配置到 Cursor。`],steps:`1. 打开 Cursor 设置
2. 找到 Models / API Keys / OpenAI Compatible 配置
3. 填入 gpt88.cc API Key
4. Base URL 填 https://api.gpt88.cc
5. 手动添加模型 ID
6. 保存后在 Composer 或 Chat 里发起测试`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6 或 gpt-5-2-chat-latest`,multi:`如果你在 Cursor 中同时维护多个模型，建议先固定一个默认模型再逐步扩展。`,verify:[`打开 Cursor Chat，发送一句简单问题。`,`再打开 Composer，让它解释当前项目里的一个小文件。`,`如果两步都通过，再让 Agent 执行改代码任务。`],trouble:`1. 模型不可选
   - 手动添加模型 ID

2. 请求 401
   - Key 无效或被环境变量覆盖

3. 请求 404
   - Base URL 少了 /v1 或模型名写错

4. Agent 改代码不稳定
   - 先换更强模型
   - 减少一次性上下文`,next:`返回集成总览`},hi:{title:`Cursor में OpenAI Compatible उपयोग करें`,core:`Cursor को gpt88.cc से जोड़ने के लिए दो चीजें जरूरी हैं: API Key और https://api.gpt88.cc।`,prepare:[`gpt88.cc API Key तैयार करें।`,`उपयोग करने वाला model ID जांचें।`,`पहले default model तय करके Cursor में configure करें।`],steps:`1. Cursor Settings खोलें
2. Models / API Keys / OpenAI Compatible खोजें
3. gpt88.cc API Key भरें
4. Base URL में https://api.gpt88.cc रखें
5. Model ID manually जोड़ें
6. Save करके Composer या Chat में test करें`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 या gpt-5-2-chat-latest`,multi:`कई models रखने पर पहले एक default model स्थिर करें, फिर धीरे-धीरे विस्तार करें।`,verify:[`Cursor Chat खोलकर छोटा सवाल भेजें।`,`Composer से project की छोटी file समझाने को कहें।`,`दोनों सफल हों तो Agent से code change task चलाएं।`],trouble:`1. Model चुन नहीं सकते
   - Model ID manually जोड़ें

2. Request 401
   - Key invalid है या environment variable ने override किया है

3. Request 404
   - Base URL में /v1 गलत है या model name गलत है

4. Agent code अस्थिर बदलता है
   - मजबूत model चुनें
   - एक बार में context कम करें`,next:`Integrations overview पर लौटें`},bn:{title:`Cursor-এ OpenAI Compatible ব্যবহার করুন`,core:`Cursor-কে gpt88.cc-তে যুক্ত করতে দরকার দুটি জিনিস: API Key এবং https://api.gpt88.cc।`,prepare:[`একটি gpt88.cc API Key প্রস্তুত করুন।`,`ব্যবহার করার model ID নিশ্চিত করুন।`,`Default model ঠিক করে Cursor-এ configure করুন।`],steps:`1. Cursor Settings খুলুন
2. Models / API Keys / OpenAI Compatible খুঁজুন
3. gpt88.cc API Key দিন
4. Base URL-এ https://api.gpt88.cc দিন
5. Model ID হাতে যোগ করুন
6. Save করে Composer বা Chat-এ test করুন`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 বা gpt-5-2-chat-latest`,multi:`একাধিক model রাখলে আগে একটি default model স্থির করে পরে ধীরে বাড়ান।`,verify:[`Cursor Chat খুলে একটি সহজ প্রশ্ন পাঠান।`,`Composer দিয়ে project-এর ছোট file ব্যাখ্যা করান।`,`দুটিই সফল হলে Agent দিয়ে code change task চালান।`],trouble:`1. Model বাছা যাচ্ছে না
   - Model ID হাতে যোগ করুন

2. Request 401
   - Key invalid বা environment variable override করছে

3. Request 404
   - Base URL বা model name ভুল

4. Agent code পরিবর্তন স্থির নয়
   - শক্তিশালী model নিন
   - একবারের context কমান`,next:`Integrations overview-এ ফিরুন`},ur:{title:`Cursor میں OpenAI Compatible استعمال کریں`,core:`Cursor کو gpt88.cc سے جوڑنے کے لیے دو چیزیں درکار ہیں: API Key اور https://api.gpt88.cc۔`,prepare:[`gpt88.cc API Key تیار کریں۔`,`استعمال ہونے والے model ID کی تصدیق کریں۔`,`پہلے default model طے کر کے Cursor میں configure کریں۔`],steps:`1. Cursor Settings کھولیں
2. Models / API Keys / OpenAI Compatible تلاش کریں
3. gpt88.cc API Key درج کریں
4. Base URL میں https://api.gpt88.cc رکھیں
5. Model ID دستی طور پر شامل کریں
6. Save کر کے Composer یا Chat میں test کریں`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 یا gpt-5-2-chat-latest`,multi:`کئی models رکھنے پر پہلے ایک default model مقرر کریں، پھر آہستہ آہستہ بڑھائیں۔`,verify:[`Cursor Chat میں آسان سوال بھیجیں۔`,`Composer سے project کی ایک چھوٹی file سمجھانے کو کہیں۔`,`دونوں کامیاب ہوں تو Agent سے code change task چلائیں۔`],trouble:`1. Model منتخب نہیں ہو رہا
   - Model ID دستی طور پر شامل کریں

2. Request 401
   - Key invalid ہے یا environment variable override کر رہا ہے

3. Request 404
   - Base URL یا model name غلط ہے

4. Agent کا code change غیر مستحکم ہے
   - مضبوط model منتخب کریں
   - ایک بار کا context کم کریں`,next:`Integrations overview پر واپس جائیں`},ta:{title:`Cursor-ல் OpenAI Compatible பயன்படுத்தவும்`,core:`Cursor-ஐ gpt88.cc-க்கு இணைக்க இரண்டு விஷயங்கள் தேவை: API Key மற்றும் https://api.gpt88.cc.`,prepare:[`gpt88.cc API Key ஒன்றைத் தயாரிக்கவும்.`,`பயன்படுத்த வேண்டிய model ID-ஐ உறுதி செய்யவும்.`,`முதலில் default model-ஐத் தேர்ந்தெடுத்து Cursor-ல் configure செய்யவும்.`],steps:`1. Cursor Settings திறக்கவும்
2. Models / API Keys / OpenAI Compatible தேடவும்
3. gpt88.cc API Key உள்ளிடவும்
4. Base URL-ல் https://api.gpt88.cc அமைக்கவும்
5. Model ID-ஐ கைமுறையாகச் சேர்க்கவும்
6. Save செய்து Composer அல்லது Chat-ல் test செய்யவும்`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 அல்லது gpt-5-2-chat-latest`,multi:`பல models பராமரித்தால் முதலில் ஒரு default model-ஐ நிலைநிறுத்தி பின்னர் விரிவாக்கவும்.`,verify:[`Cursor Chat-ல் எளிய கேள்வி அனுப்பவும்.`,`Composer மூலம் project-ன் சிறிய file-ஐ விளக்கச் சொல்லவும்.`,`இரண்டும் வெற்றி பெற்றால் Agent மூலம் code change task இயக்கவும்.`],trouble:`1. Model தேர்வு செய்ய முடியவில்லை
   - Model ID-ஐ கைமுறையாகச் சேர்க்கவும்

2. Request 401
   - Key invalid அல்லது environment variable override

3. Request 404
   - Base URL அல்லது model name தவறு

4. Agent code மாற்றம் நிலையாக இல்லை
   - வலுவான model தேர்வு செய்யவும்
   - ஒருமுறை context-ஐக் குறைக்கவும்`,next:`Integrations overview-க்கு திரும்பவும்`},ne:{title:`Cursor मा OpenAI Compatible प्रयोग गर्नुहोस्`,core:`Cursor लाई gpt88.cc सँग जोड्न दुई कुरा चाहिन्छ: API Key र https://api.gpt88.cc।`,prepare:[`gpt88.cc API Key तयार गर्नुहोस्।`,`प्रयोग गर्ने model ID जाँच्नुहोस्।`,`पहिले default model तय गरी Cursor मा configure गर्नुहोस्।`],steps:`1. Cursor Settings खोल्नुहोस्
2. Models / API Keys / OpenAI Compatible खोज्नुहोस्
3. gpt88.cc API Key राख्नुहोस्
4. Base URL मा https://api.gpt88.cc राख्नुहोस्
5. Model ID manually थप्नुहोस्
6. Save गरी Composer वा Chat मा test गर्नुहोस्`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 वा gpt-5-2-chat-latest`,multi:`धेरै models राख्दा पहिले एउटा default model स्थिर गरी बिस्तारै विस्तार गर्नुहोस्।`,verify:[`Cursor Chat मा सरल प्रश्न पठाउनुहोस्।`,`Composer बाट project को सानो file व्याख्या गराउनुहोस्।`,`दुवै सफल भए Agent बाट code change task चलाउनुहोस्।`],trouble:`1. Model छान्न सकिँदैन
   - Model ID manually थप्नुहोस्

2. Request 401
   - Key invalid वा environment variable ले override गरेको छ

3. Request 404
   - Base URL वा model name गलत छ

4. Agent code change अस्थिर छ
   - बलियो model छान्नुहोस्
   - एकपटकको context घटाउनुहोस्`,next:`Integrations overview मा फर्कनुहोस्`},si:{title:`Cursor තුළ OpenAI Compatible භාවිතා කරන්න`,core:`Cursor gpt88.cc සමඟ සම්බන්ධ කිරීමට අවශ්‍ය දෙක: API Key සහ https://api.gpt88.cc.`,prepare:[`gpt88.cc API Key එකක් සූදානම් කරන්න.`,`භාවිතා කරන model ID තහවුරු කරන්න.`,`පළමුව default model එක තෝරා Cursor තුළ configure කරන්න.`],steps:`1. Cursor Settings විවෘත කරන්න
2. Models / API Keys / OpenAI Compatible සොයන්න
3. gpt88.cc API Key ඇතුළත් කරන්න
4. Base URL ලෙස https://api.gpt88.cc යොදන්න
5. Model ID අතින් එක් කරන්න
6. Save කර Composer හෝ Chat තුළ test කරන්න`,setup:`OpenAI API
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 හෝ gpt-5-2-chat-latest`,multi:`Models කිහිපයක් තබාගන්නේ නම් පළමුව default model එක ස්ථිර කර පසුව පුළුල් කරන්න.`,verify:[`Cursor Chat තුළ සරල ප්‍රශ්නයක් යවන්න.`,`Composer මඟින් project එකේ කුඩා file එකක් පැහැදිලි කරවාගන්න.`,`දෙකම සාර්ථක නම් Agent මඟින් code change task ධාවනය කරන්න.`],trouble:`1. Model තෝරාගත නොහැක
   - Model ID අතින් එක් කරන්න

2. Request 401
   - Key invalid හෝ environment variable override කරයි

3. Request 404
   - Base URL හෝ model name වැරදියි

4. Agent code change ස්ථාවර නැත
   - ශක්තිමත් model එකක් තෝරන්න
   - එක් වරක context අඩු කරන්න`,next:`Integrations overview වෙත ආපසු යන්න`}};function _(){let{locale:e}=n();if(e===`en`)return(0,d.jsx)(h,{});let r=u(e,`cursor`,{title:`Cursor 配置 GPT88 API`,description:`在 Cursor 中使用 GPT88 的 OpenAI 兼容接口，避免把网页登录密码当作 API Key。`,intro:`在 Cursor 中选择 OpenAI Compatible，使用服务端 API Key，并从一个小任务开始验证。`}),f=l(e,`cursor`,{prepare:`准备工作`,setup:`配置方法`,verify:`验证方法`,troubleshoot:`排障清单`,next:`下一步`}),p=g[e]??g.zh;return(0,d.jsxs)(o,{path:`/docs/integrations/dev/cursor`,title:r.title,description:r.description,headings:[{id:`prepare`,text:f.prepare,level:2},{id:`setup`,text:f.setup,level:2},{id:`verify`,text:f.verify,level:2},{id:`troubleshoot`,text:f.troubleshoot,level:2},{id:`next`,text:f.next,level:2},...c(`cursor`)],children:[(0,d.jsx)(`p`,{children:r.intro}),(0,d.jsx)(a,{tone:`info`,title:p.title,children:(0,d.jsx)(`p`,{children:p.core})}),(0,d.jsx)(`h2`,{id:`prepare`,children:f.prepare}),(0,d.jsx)(`ul`,{children:p.prepare.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`setup`,children:f.setup}),(0,d.jsx)(i,{lang:`text`,filename:`steps`,code:p.steps}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:p.setup}),(0,d.jsx)(`p`,{children:p.multi}),(0,d.jsx)(`h2`,{id:`verify`,children:f.verify}),(0,d.jsx)(`ol`,{children:p.verify.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:f.troubleshoot}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p.trouble}),(0,d.jsx)(`h2`,{id:`next`,children:f.next}),(0,d.jsx)(`ul`,{children:(0,d.jsx)(`li`,{children:(0,d.jsx)(t,{to:`/docs/integrations/`,children:p.next})})}),(0,d.jsx)(s,{intent:`cursor`})]})}export{_ as default};