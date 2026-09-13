import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o,r as s,t as c}from"./index-DCJmtdkW.js";import{n as l,t as u}from"./integrationLocaleCopy-DCRt8AIz.js";var d=e(),f=`1. Install Claude Code
2. Prepare either an API key or OAuth login
3. For gpt88.cc, use the compatible OpenAI/Claude routing mode
4. If you need plugin capability, use OAuth instead of API key login
5. Validate the toolchain with one minimal task first`,p=`1. Decide whether you need model access or plugin capability
2. Prefer API key mode for pure model calls
3. Prefer OAuth mode for plugins and account-linked features
4. Clear old environment variables before switching modes
5. Use a minimal task to verify the switch`,m=`1. Plugins are unavailable
   - Confirm whether you are still in API key mode
   - If you need plugins, switch to OAuth

2. Repeated reconnect loops
   - Check proxy variables
   - Check whether an old session config is polluting the environment

3. Model calls fail
   - Check Base URL and API key first
   - Then verify the model name`;function h(){return(0,d.jsxs)(o,{path:`/docs/integrations/dev/claude-code`,title:`Claude Code with gpt88.cc`,description:`How to use Claude Code with gpt88.cc for model access, OAuth login, plugins, and routing decisions.`,headings:[{id:`overview`,text:`What this page covers`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Quick setup`,level:2},{id:`notes`,text:`Mode differences`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,d.jsx)(a,{tone:`warn`,title:`Separate the two modes`,children:(0,d.jsx)(`p`,{children:`API key mode is primarily for model access. OAuth mode is primarily for plugins and account-linked features. Do not troubleshoot them as if they were the same path.`})}),(0,d.jsx)(`p`,{children:`The most common mistake in Claude Code is treating “model access” and “plugin login” as one problem. If you only need the model, API key mode is enough. If you need plugins or account features, you need OAuth.`}),(0,d.jsx)(`h2`,{id:`overview`,children:`What this page covers`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`How to route Claude Code model calls through gpt88.cc.`}),(0,d.jsx)(`li`,{children:`Why plugin capability is tied to OAuth instead of raw API key mode.`}),(0,d.jsx)(`li`,{children:`What should be cleaned before switching modes.`})]}),(0,d.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,d.jsx)(i,{lang:`text`,filename:`checklist`,code:p}),(0,d.jsx)(`h2`,{id:`setup`,children:`Quick setup`}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:f}),(0,d.jsx)(`h2`,{id:`notes`,children:`Mode differences`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`API key mode: better for direct model routing through gpt88.cc.`}),(0,d.jsx)(`li`,{children:`OAuth mode: better for plugins, extensions, and ChatGPT account-linked features.`})]}),(0,d.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,d.jsxs)(`ol`,{children:[(0,d.jsx)(`li`,{children:`Run one small task and confirm the model responds normally.`}),(0,d.jsx)(`li`,{children:`If the plugin panel is missing, switch to the OAuth path.`}),(0,d.jsx)(`li`,{children:`After switching, restart the session and verify no old environment variables remain.`})]}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:m}),(0,d.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the Codex OAuth plugin guide`}),`.`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var g={zh:{warnTitle:`先分清两种模式`,warn:`API Key 模式主要解决模型调用；OAuth 模式主要解决插件和账号权益。不要混用。`,intro:`Claude Code 这里最容易出错的是“把模型接入”和“把插件登录”混成一件事。如果目标只是让模型可用，API Key 就够了；如果目标是插件与账号权益，必须走 OAuth。`,overview:[`模型调用怎么接 gpt88.cc。`,`插件能力为什么会和 OAuth 绑定。`,`切换时要先清理什么。`],notes:[`API Key 模式：更适合直接调用模型。`,`OAuth 模式：更适合插件、扩展能力和账号权益。`],verify:[`先跑一条简单任务，看模型输出是否正常。`,`如果插件面板不可见，再切换到 OAuth 流程。`,`切换后重启会话，确认环境变量没有残留。`],next:[`查看 Codex 插件 OAuth 教程`,`返回集成总览`],setup:`1. 安装 Claude Code
2. 准备 API Key 或 OAuth 登录
3. 如果用 gpt88.cc，中转站走 OpenAI/Claude 兼容配置
4. 如果需要插件能力，改用 OAuth 登录
5. 先跑一条最小任务验证工具链`,checklist:`1. 先判断你要的是模型调用还是插件能力
2. 模型调用优先走 API Key
3. 插件能力优先走 OAuth
4. 切换前先清理旧环境变量
5. 用最小任务验证切换是否成功`,troubleshooting:`1. 插件不可用
   - 先确认是不是 API Key 模式
   - 如果要插件，改用 OAuth

2. 反复 reconnect
   - 检查代理变量
   - 检查会话是否被旧配置污染

3. 模型调用失败
   - 先检查 Base URL 和 Key
   - 再确认模型名`},hi:{warnTitle:`दो modes अलग रखें`,warn:`API Key mode model calls के लिए है; OAuth mode plugins और account entitlements के लिए है। इन्हें mix न करें।`,intro:`Claude Code में common गलती model access और plugin login को एक समझना है। केवल model चाहिए तो API Key पर्याप्त है; plugin और account entitlements के लिए OAuth जरूरी है।`,overview:[`gpt88.cc से model calls जोड़ना।`,`Plugin capability OAuth से क्यों जुड़ी है।`,`Switch से पहले क्या साफ करना है।`],notes:[`API Key mode: direct model calls के लिए बेहतर।`,`OAuth mode: plugins, extensions और account entitlements के लिए बेहतर।`],verify:[`एक छोटा task चलाकर model output जांचें।`,`Plugin panel न दिखे तो OAuth flow पर जाएं।`,`Switch के बाद session restart करके पुराने environment variables जांचें।`],next:[`Codex plugin OAuth tutorial देखें`,`Integrations overview पर लौटें`],setup:`1. Claude Code install करें
2. API Key या OAuth login तैयार करें
3. gpt88.cc के लिए OpenAI/Claude compatible config उपयोग करें
4. Plugin चाहिए तो OAuth login करें
5. छोटी task से toolchain verify करें`,checklist:`1. पहले तय करें model call चाहिए या plugin capability
2. Model call के लिए API Key
3. Plugin के लिए OAuth
4. Switch से पहले पुराने environment variables साफ करें
5. छोटी task से सफलता जांचें`,troubleshooting:`1. Plugin उपलब्ध नहीं
   - API Key mode की जांच करें
   - Plugin के लिए OAuth करें

2. बार-बार reconnect
   - Proxy variables जांचें
   - पुराने config से session प्रभावित तो नहीं देखें

3. Model call fail
   - Base URL और Key जांचें
   - Model name की पुष्टि करें`},bn:{warnTitle:`দুটি mode আলাদা রাখুন`,warn:`API Key mode model call-এর জন্য; OAuth mode plugin ও account entitlement-এর জন্য। এগুলি মেশাবেন না।`,intro:`Claude Code-এ সাধারণ ভুল হল model access ও plugin login-কে এক মনে করা। শুধু model চাইলে API Key যথেষ্ট; plugin ও account entitlement-এর জন্য OAuth দরকার।`,overview:[`gpt88.cc-এ model call যোগ করা।`,`Plugin capability OAuth-এর সঙ্গে কেন যুক্ত।`,`Switch-এর আগে কী পরিষ্কার করতে হবে।`],notes:[`API Key mode: সরাসরি model call-এর জন্য ভালো।`,`OAuth mode: plugin, extension ও account entitlement-এর জন্য ভালো।`],verify:[`একটি ছোট task চালিয়ে model output দেখুন।`,`Plugin panel না দেখালে OAuth flow ব্যবহার করুন।`,`Switch-এর পর session restart করে পুরোনো environment variable নেই দেখুন।`],next:[`Codex plugin OAuth tutorial দেখুন`,`Integrations overview-তে ফিরুন`],setup:`1. Claude Code install করুন
2. API Key বা OAuth login প্রস্তুত করুন
3. gpt88.cc-এর জন্য OpenAI/Claude compatible config ব্যবহার করুন
4. Plugin দরকার হলে OAuth login করুন
5. ছোট task দিয়ে toolchain যাচাই করুন`,checklist:`1. Model call নাকি plugin capability দরকার ঠিক করুন
2. Model call-এর জন্য API Key
3. Plugin-এর জন্য OAuth
4. Switch-এর আগে পুরোনো environment variable সরান
5. ছোট task দিয়ে যাচাই করুন`,troubleshooting:`1. Plugin কাজ করছে না
   - API Key mode পরীক্ষা করুন
   - Plugin-এর জন্য OAuth ব্যবহার করুন

2. বারবার reconnect
   - Proxy variable পরীক্ষা করুন
   - পুরোনো config session-কে প্রভাবিত করছে কি না দেখুন

3. Model call ব্যর্থ
   - Base URL ও Key পরীক্ষা করুন
   - Model name নিশ্চিত করুন`},ur:{warnTitle:`دونوں modes الگ رکھیں`,warn:`API Key mode model calls کے لیے ہے؛ OAuth mode plugins اور account entitlements کے لیے ہے۔ انہیں mix نہ کریں۔`,intro:`Claude Code میں عام غلطی model access اور plugin login کو ایک سمجھنا ہے۔ صرف model چاہیے تو API Key کافی ہے؛ plugin اور account entitlements کے لیے OAuth ضروری ہے۔`,overview:[`gpt88.cc سے model calls جوڑنا۔`,`Plugin capability OAuth سے کیوں جڑی ہے۔`,`Switch سے پہلے کیا صاف کرنا ہے۔`],notes:[`API Key mode: direct model calls کے لیے بہتر۔`,`OAuth mode: plugins، extensions اور account entitlements کے لیے بہتر۔`],verify:[`ایک مختصر task چلا کر model output دیکھیں۔`,`Plugin panel نظر نہ آئے تو OAuth flow اختیار کریں۔`,`Switch کے بعد session restart کر کے پرانے environment variables دیکھیں۔`],next:[`Codex plugin OAuth tutorial دیکھیں`,`Integrations overview پر واپس جائیں`],setup:`1. Claude Code install کریں
2. API Key یا OAuth login تیار کریں
3. gpt88.cc کے لیے OpenAI/Claude compatible config استعمال کریں
4. Plugin چاہیے تو OAuth login کریں
5. مختصر task سے toolchain verify کریں`,checklist:`1. طے کریں model call چاہیے یا plugin capability
2. Model call کے لیے API Key
3. Plugin کے لیے OAuth
4. Switch سے پہلے پرانے environment variables صاف کریں
5. مختصر task سے کامیابی چیک کریں`,troubleshooting:`1. Plugin دستیاب نہیں
   - API Key mode چیک کریں
   - Plugin کے لیے OAuth کریں

2. بار بار reconnect
   - Proxy variables چیک کریں
   - پرانا config session کو متاثر تو نہیں کر رہا

3. Model call ناکام
   - Base URL اور Key چیک کریں
   - Model name کی تصدیق کریں`},ta:{warnTitle:`இரண்டு mode-களையும் பிரிக்கவும்`,warn:`API Key mode model calls-க்கு; OAuth mode plugins மற்றும் account entitlements-க்கு. இரண்டையும் கலக்க வேண்டாம்.`,intro:`Claude Code-ல் பொதுவான தவறு model access மற்றும் plugin login-ஐ ஒன்றாகக் கருதுவது. Model மட்டும் தேவையெனில் API Key போதும்; plugin மற்றும் account entitlements-க்கு OAuth அவசியம்.`,overview:[`gpt88.cc-ல் model calls இணைப்பது.`,`Plugin capability OAuth-உடன் ஏன் இணைகிறது.`,`Switch முன் எதைச் சுத்தம் செய்ய வேண்டும்.`],notes:[`API Key mode: direct model calls-க்கு ஏற்றது.`,`OAuth mode: plugins, extensions மற்றும் account entitlements-க்கு ஏற்றது.`],verify:[`சிறிய task இயக்கி model output சரிபார்க்கவும்.`,`Plugin panel தெரியாவிட்டால் OAuth flow-க்கு மாறவும்.`,`Switch பிறகு session restart செய்து பழைய environment variables உள்ளதா பார்க்கவும்.`],next:[`Codex plugin OAuth tutorial பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`],setup:`1. Claude Code install செய்யவும்
2. API Key அல்லது OAuth login தயார் செய்யவும்
3. gpt88.cc-க்கு OpenAI/Claude compatible config பயன்படுத்தவும்
4. Plugin தேவைப்பட்டால் OAuth login செய்யவும்
5. சிறிய task மூலம் toolchain சரிபார்க்கவும்`,checklist:`1. Model call அல்லது plugin capability எது வேண்டும் தீர்மானிக்கவும்
2. Model call-க்கு API Key
3. Plugin-க்கு OAuth
4. Switch முன் பழைய environment variables நீக்கவும்
5. சிறிய task மூலம் சரிபார்க்கவும்`,troubleshooting:`1. Plugin கிடைக்கவில்லை
   - API Key mode சரிபார்க்கவும்
   - Plugin-க்கு OAuth பயன்படுத்தவும்

2. மீண்டும் மீண்டும் reconnect
   - Proxy variables சரிபார்க்கவும்
   - பழைய config session-ஐ பாதிக்கிறதா பார்க்கவும்

3. Model call தோல்வி
   - Base URL மற்றும் Key சரிபார்க்கவும்
   - Model name உறுதி செய்யவும்`},ne:{warnTitle:`दुई mode अलग राख्नुहोस्`,warn:`API Key mode model call का लागि हो; OAuth mode plugin र account entitlement का लागि हो। मिसाउनु हुँदैन।`,intro:`Claude Code मा सामान्य गल्ती model access र plugin login लाई एउटै ठान्नु हो। Model मात्र चाहिँदा API Key पर्याप्त हुन्छ; plugin र account entitlement का लागि OAuth चाहिन्छ।`,overview:[`gpt88.cc बाट model call जोड्ने।`,`Plugin capability OAuth सँग किन जोडिन्छ।`,`Switch अघि के सफा गर्ने।`],notes:[`API Key mode: direct model call का लागि राम्रो।`,`OAuth mode: plugin, extension र account entitlement का लागि राम्रो।`],verify:[`सानो task चलाएर model output जाँच्नुहोस्।`,`Plugin panel नदेखिए OAuth flow मा जानुहोस्।`,`Switch पछि session restart गरी पुराना environment variables जाँच्नुहोस्।`],next:[`Codex plugin OAuth tutorial हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`],setup:`1. Claude Code install गर्नुहोस्
2. API Key वा OAuth login तयार गर्नुहोस्
3. gpt88.cc का लागि OpenAI/Claude compatible config प्रयोग गर्नुहोस्
4. Plugin चाहिँदा OAuth login गर्नुहोस्
5. सानो task बाट toolchain verify गर्नुहोस्`,checklist:`1. Model call वा plugin capability कुन चाहिन्छ तय गर्नुहोस्
2. Model call का लागि API Key
3. Plugin का लागि OAuth
4. Switch अघि पुराना environment variables हटाउनुहोस्
5. सानो task बाट जाँच्नुहोस्`,troubleshooting:`1. Plugin उपलब्ध छैन
   - API Key mode जाँच्नुहोस्
   - Plugin का लागि OAuth प्रयोग गर्नुहोस्

2. बारम्बार reconnect
   - Proxy variables जाँच्नुहोस्
   - पुरानो config ले session असर गरेको छ कि छैन हेर्नुहोस्

3. Model call असफल
   - Base URL र Key जाँच्नुहोस्
   - Model name पुष्टि गर्नुहोस्`},si:{warnTitle:`mode දෙක වෙන් කර තබන්න`,warn:`API Key mode model calls සඳහාය; OAuth mode plugins සහ account entitlements සඳහාය. ඒවා මිශ්‍ර නොකරන්න.`,intro:`Claude Code හි සාමාන්‍ය දෝෂය model access සහ plugin login එකක් ලෙස සලකීමයි. Model පමණක් අවශ්‍ය නම් API Key ප්‍රමාණවත්ය; plugin සහ account entitlements සඳහා OAuth අවශ්‍යය.`,overview:[`gpt88.cc වෙත model calls සම්බන්ධ කිරීම.`,`Plugin capability OAuth සමඟ සම්බන්ධ වන්නේ ඇයි.`,`Switch කිරීමට පෙර පිරිසිදු කළ යුතු දේ.`],notes:[`API Key mode: direct model calls සඳහා සුදුසුය.`,`OAuth mode: plugins, extensions සහ account entitlements සඳහා සුදුසුය.`],verify:[`කුඩා task එකක් ධාවනය කර model output පරීක්ෂා කරන්න.`,`Plugin panel නොපෙනේ නම් OAuth flow වෙත මාරු වන්න.`,`Switch පසු session restart කර පැරණි environment variables නොමැති බව බලන්න.`],next:[`Codex plugin OAuth tutorial බලන්න`,`Integrations overview වෙත ආපසු යන්න`],setup:`1. Claude Code install කරන්න
2. API Key හෝ OAuth login සූදානම් කරන්න
3. gpt88.cc සඳහා OpenAI/Claude compatible config භාවිතා කරන්න
4. Plugin අවශ්‍ය නම් OAuth login කරන්න
5. කුඩා task එකකින් toolchain verify කරන්න`,checklist:`1. Model call ද plugin capability ද අවශ්‍ය තීරණය කරන්න
2. Model call සඳහා API Key
3. Plugin සඳහා OAuth
4. Switch කිරීමට පෙර පැරණි environment variables ඉවත් කරන්න
5. කුඩා task එකකින් පරීක්ෂා කරන්න`,troubleshooting:`1. Plugin ලබාගත නොහැක
   - API Key mode පරීක්ෂා කරන්න
   - Plugin සඳහා OAuth භාවිතා කරන්න

2. නැවත නැවත reconnect
   - Proxy variables පරීක්ෂා කරන්න
   - පැරණි config එක session එකට බලපානවාද බලන්න

3. Model call අසාර්ථකයි
   - Base URL සහ Key පරීක්ෂා කරන්න
   - Model name තහවුරු කරන්න`}};function _(){let{locale:e}=n();if(e===`en`)return(0,d.jsx)(h,{});let r=u(e,`claude-code`,{title:`Claude Code 使用 GPT88 API`,description:`把 Claude Code 配置为 OpenAI 兼容 API，快速验证 API Key、模型和端点。`,intro:`先区分模型调用和插件能力：API Key 用于模型访问，OAuth 用于插件能力。`}),f=l(e,`claude-code`,{overview:`先理解这页讲什么`,prepare:`准备工作`,setup:`快速配置`,notes:`模式差异`,verify:`验证方法`,troubleshoot:`排障清单`,next:`下一步`}),p=g[e]??g.zh;return(0,d.jsxs)(o,{path:`/docs/integrations/dev/claude-code`,title:r.title,description:r.description,headings:[{id:`overview`,text:f.overview,level:2},{id:`prepare`,text:f.prepare,level:2},{id:`setup`,text:f.setup,level:2},{id:`notes`,text:f.notes,level:2},{id:`verify`,text:f.verify,level:2},{id:`troubleshoot`,text:f.troubleshoot,level:2},{id:`next`,text:f.next,level:2},...c(`claude-code`)],children:[(0,d.jsx)(`p`,{children:r.intro}),(0,d.jsx)(a,{tone:`warn`,title:p.warnTitle,children:(0,d.jsx)(`p`,{children:p.warn})}),(0,d.jsx)(`p`,{children:p.intro}),(0,d.jsx)(`h2`,{id:`overview`,children:f.overview}),(0,d.jsx)(`ul`,{children:p.overview.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`prepare`,children:f.prepare}),(0,d.jsx)(i,{lang:`text`,filename:`checklist`,code:p.checklist}),(0,d.jsx)(`h2`,{id:`setup`,children:f.setup}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:p.setup}),(0,d.jsx)(`h2`,{id:`notes`,children:f.notes}),(0,d.jsx)(`ul`,{children:p.notes.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`verify`,children:f.verify}),(0,d.jsx)(`ol`,{children:p.verify.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:f.troubleshoot}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p.troubleshooting}),(0,d.jsx)(`h2`,{id:`next`,children:f.next}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:(0,d.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:p.next[0]})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(t,{to:`/docs/integrations/`,children:p.next[1]})})]}),(0,d.jsx)(s,{intent:`claude-code`})]})}export{_ as default};