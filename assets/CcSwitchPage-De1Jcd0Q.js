import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`1. Install CC-Switch
2. Install the target tools, such as Codex CLI, Claude Code, or Cursor
3. Prepare a gpt88.cc API key
4. Decide whether you need OpenAI-compatible or Claude-compatible routing
5. Remember: plugin capability needs OAuth; model relay uses API key mode`,d=`OpenAI-compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude-compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,f=`1. Open CC-Switch
2. Go to Routes / Providers / API route settings
3. Create the gpt88-openai route
4. Set Base URL to https://api.gpt88.cc
5. Paste the API key
6. Fill in one default chat model
7. Save the route
8. Enable the route
9. Restart the target tool and verify`,p=`1. If the target is Codex or ChatGPT plugin capability, sign out of API key mode first
2. Clear OPENAI_API_KEY, OPENAI_BASE_URL, and related variables
3. Sign in again with OAuth inside the tool
4. Confirm the CC-Switch route is enabled
5. Start a clean session and verify that plugins are visible`,m=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "Test the CC-Switch route"}]
  }'`,h=`1. The tool still uses the old route
   - Confirm the CC-Switch route is enabled
   - Restart the terminal and the target tool

2. 404 response
   - OpenAI-compatible routes must include /v1
   - Claude-compatible routes also use https://api.gpt88.cc

3. Plugins are unavailable
   - Do not keep debugging inside API key mode
   - Sign out of API key mode and switch to OAuth

4. Route looks enabled but requests still fail
   - Test gpt88.cc directly with curl first
   - Then debug the CC-Switch forwarding layer`;function g(){return(0,l.jsxs)(o,{path:`/docs/integrations/dev/cc-switch`,title:`CC-Switch with gpt88.cc`,description:`Route configuration, OpenAI/Claude protocol differences, OAuth switching, and troubleshooting for using gpt88.cc with CC-Switch.`,headings:[{id:`overview`,text:`When to use it`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`routes`,text:`How to fill the routes`,level:2},{id:`flow`,text:`Step-by-step setup`,level:2},{id:`oauth`,text:`OAuth scenarios`,level:2},{id:`verify`,text:`Verify the route`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Why CC-Switch matters`,children:(0,l.jsx)(`p`,{children:`CC-Switch is useful when you want to standardize gpt88.cc routing across multiple tools. API key mode is for model access. Plugin capability still depends on whether the target tool is using OAuth.`})}),(0,l.jsx)(`h2`,{id:`overview`,children:`When to use it`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`You use multiple development tools and want to switch routes centrally.`}),(0,l.jsx)(`li`,{children:`You want OpenAI-compatible and Claude-compatible configurations managed separately.`}),(0,l.jsx)(`li`,{children:`You need to move between API key model access and OAuth-based plugin usage.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:u}),(0,l.jsx)(`h2`,{id:`routes`,children:`How to fill the routes`}),(0,l.jsxs)(`p`,{children:[`Split routes by protocol first. Do not put `,(0,l.jsx)(`code`,{children:`/v1`}),` into every protocol blindly.`]}),(0,l.jsx)(i,{lang:`text`,filename:`routes`,code:d}),(0,l.jsx)(`h2`,{id:`flow`,children:`Step-by-step setup`}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:f}),(0,l.jsx)(`h2`,{id:`oauth`,children:`OAuth scenarios`}),(0,l.jsx)(`p`,{children:`If you are configuring for Codex plugins, ChatGPT account features, or similar OAuth behavior, the key question is the login mode, not just the model Base URL.`}),(0,l.jsx)(i,{lang:`text`,filename:`oauth-flow`,code:p}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verify the route`}),(0,l.jsx)(`p`,{children:`Bypass the tool layer first. Verify that gpt88.cc itself works, then come back to CC-Switch.`}),(0,l.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:m}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:h}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the OAuth plugin guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/dev/codex-cli/`,`en`),children:`Read the Codex CLI guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var _=`1. 已安装 CC-Switch
2. 已安装需要被路由的工具，例如 Codex CLI / Claude Code / Cursor
3. 已准备 gpt88.cc API Key
4. 已确认要配置 OpenAI 兼容路由还是 Claude 兼容路由
5. 已知道插件能力需要 OAuth，模型中转使用 API Key`,v=`OpenAI 兼容路由
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude 兼容路由
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: claude-sonnet-4-6`,y=`1. 打开 CC-Switch
2. 进入 Routes / Providers / API 路由配置
3. 新建 gpt88-openai 路由
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 填一个默认聊天模型
7. 保存路由
8. 启用路由
9. 重启目标工具并验证`,b=`1. 如果目标是 Codex / ChatGPT 插件能力，先退出 API Key 登录
2. 清理 OPENAI_API_KEY / OPENAI_BASE_URL 等环境变量
3. 在工具里重新走 OAuth 登录
4. 确认 CC-Switch 路由开启
5. 重新开一个干净会话测试插件是否可见`,x=`curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "测试 CC-Switch 路由"}]
  }'`,S={zh:{title:`CC-Switch 的价值`,info:`CC-Switch 适合在多个工具之间统一切换中转站路由。模型调用走 gpt88.cc API Key；插件能力仍然要看目标工具是否使用 OAuth 登录。`,overview:[`你有多个开发工具，需要统一切换 gpt88.cc 路由。`,`你想把 OpenAI 兼容和 Claude 兼容配置分开管理。`,`你需要在 API Key 模型调用和 OAuth 插件能力之间切换。`],prepare:_,routesIntro:`先按协议拆成两条路由。不要把 /v1 同时填到所有协议里。`,routes:v,flow:y,oauth:`如果你是为 Codex 插件、ChatGPT 账号能力或类似 OAuth 能力配置，重点不是模型 Base URL，而是登录模式是否正确。`,oauthFlow:b,verify:`先绕过工具层，用最小请求验证 gpt88.cc 本身可用，再回到 CC-Switch。`,trouble:`1. 工具仍然走旧地址
   - 确认 CC-Switch 路由已经启用
   - 重启终端和目标工具

2. 404
   - OpenAI 兼容路由必须带 /v1
   - Claude 兼容路由同样使用 https://api.gpt88.cc

3. 插件不可用
   - 不要继续在 API Key 模式排查
   - 退出 API Key 登录后改用 OAuth

4. 路由看起来开启但请求失败
   - 先用 curl 直接请求 gpt88.cc
   - 再排查 CC-Switch 转发层`,next:[`查看插件 OAuth 教程`,`查看 Codex CLI 接入教程`,`返回集成总览`]},hi:{title:`CC-Switch का उपयोग`,info:`CC-Switch कई tools में proxy route बदलना आसान बनाता है। Model calls gpt88.cc API Key से होते हैं; plugins के लिए target tool का OAuth login जरूरी है।`,overview:[`कई development tools में एक ही gpt88.cc route बदलना है।`,`OpenAI और Claude compatible configs अलग रखना है।`,`API Key model calls और OAuth plugins के बीच switch करना है।`],prepare:`1. CC-Switch install है
2. Codex CLI / Claude Code / Cursor जैसे tools install हैं
3. gpt88.cc API Key तैयार है
4. OpenAI या Claude compatible route चुन लिया है
5. Plugin के लिए OAuth और model proxy के लिए API Key समझ लिया है`,routesIntro:`Protocol के अनुसार दो routes रखें। सभी protocols में /v1 एक साथ न भरें।`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch खोलें
2. Routes / Providers / API route settings खोलें
3. gpt88-openai route बनाएं
4. Base URL https://api.gpt88.cc रखें
5. Console का API Key भरें
6. Default chat model भरें
7. Save और enable करें
8. Target tool restart करें और verify करें`,oauth:`Codex plugin या ChatGPT account capability के लिए Base URL से अधिक login mode महत्वपूर्ण है।`,oauthFlow:`1. Plugin चाहिए तो API Key login से बाहर निकलें
2. OPENAI_API_KEY / OPENAI_BASE_URL साफ करें
3. Tool में OAuth login करें
4. CC-Switch route चालू है जांचें
5. नया clean session शुरू करें`,verify:`पहले tool layer को bypass करके minimum request से gpt88.cc verify करें, फिर CC-Switch पर लौटें।`,trouble:`1. Tool पुराना address उपयोग करता है
   - Route enabled और tool restart जांचें

2. 404
   - OpenAI route में /v1 जांचें
   - Claude route में https://api.gpt88.cc रखें

3. Plugin नहीं
   - API Key mode में यह अपेक्षित है; OAuth करें

4. Route enabled फिर भी fail
   - curl से सीधे gpt88.cc जांचें
   - फिर CC-Switch forwarding देखें`,next:[`Plugin OAuth tutorial देखें`,`Codex CLI tutorial देखें`,`Integrations overview पर लौटें`]},bn:{title:`CC-Switch-এর উপকারিতা`,info:`CC-Switch একাধিক tool-এ proxy route বদলানো সহজ করে। Model call gpt88.cc API Key দিয়ে হয়; plugin-এর জন্য target tool-এ OAuth login দরকার।`,overview:[`একাধিক development tool-এ একই gpt88.cc route বদলাতে চান।`,`OpenAI ও Claude compatible config আলাদা রাখতে চান।`,`API Key model call ও OAuth plugin-এর মধ্যে switch করতে চান।`],prepare:`1. CC-Switch install আছে
2. Codex CLI / Claude Code / Cursor install আছে
3. gpt88.cc API Key প্রস্তুত
4. OpenAI বা Claude compatible route ঠিক করা
5. Plugin-এর জন্য OAuth এবং model proxy-এর জন্য API Key বুঝে নেওয়া`,routesIntro:`Protocol অনুযায়ী দুটি route রাখুন। সব protocol-এ একসঙ্গে /v1 দেবেন না।`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch খুলুন
2. Routes / Providers / API route settings খুলুন
3. gpt88-openai route তৈরি করুন
4. Base URL https://api.gpt88.cc দিন
5. Console-এর API Key দিন
6. Default chat model দিন
7. Save ও enable করুন
8. Target tool restart করে verify করুন`,oauth:`Codex plugin বা ChatGPT account capability-এর ক্ষেত্রে Base URL-এর চেয়ে login mode গুরুত্বপূর্ণ।`,oauthFlow:`1. Plugin চাইলে API Key login ছাড়ুন
2. OPENAI_API_KEY / OPENAI_BASE_URL সরান
3. Tool-এ OAuth login করুন
4. CC-Switch route চালু আছে দেখুন
5. নতুন clean session চালু করুন`,verify:`আগে tool layer বাদ দিয়ে minimum request-এ gpt88.cc যাচাই করুন, পরে CC-Switch-এ ফিরুন।`,trouble:`1. Tool পুরোনো address ব্যবহার করছে
   - Route enabled ও tool restart দেখুন

2. 404
   - OpenAI route-এ /v1 দেখুন
   - Claude route-এ https://api.gpt88.cc রাখুন

3. Plugin নেই
   - API Key mode-এ এটি স্বাভাবিক; OAuth ব্যবহার করুন

4. Route enabled তবু fail
   - curl দিয়ে gpt88.cc সরাসরি দেখুন
   - তারপর CC-Switch forwarding পরীক্ষা করুন`,next:[`Plugin OAuth tutorial দেখুন`,`Codex CLI tutorial দেখুন`,`Integrations overview-এ ফিরুন`]},ur:{title:`CC-Switch کا فائدہ`,info:`CC-Switch کئی tools میں proxy route بدلنے کے لیے ہے۔ Model calls gpt88.cc API Key سے ہوتی ہیں؛ plugins کے لیے target tool میں OAuth login چاہیے۔`,overview:[`کئی development tools میں ایک gpt88.cc route بدلنا ہے۔`,`OpenAI اور Claude compatible configs الگ رکھنی ہیں۔`,`API Key model calls اور OAuth plugins کے درمیان switch کرنا ہے۔`],prepare:`1. CC-Switch install ہے
2. Codex CLI / Claude Code / Cursor install ہیں
3. gpt88.cc API Key تیار ہے
4. OpenAI یا Claude compatible route منتخب ہے
5. Plugin کے لیے OAuth اور model proxy کے لیے API Key واضح ہے`,routesIntro:`Protocol کے مطابق دو routes رکھیں۔ ہر protocol میں ایک ساتھ /v1 نہ بھریں۔`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch کھولیں
2. Routes / Providers / API route settings کھولیں
3. gpt88-openai route بنائیں
4. Base URL https://api.gpt88.cc رکھیں
5. Console کا API Key درج کریں
6. Default chat model درج کریں
7. Save اور enable کریں
8. Target tool restart کر کے verify کریں`,oauth:`Codex plugin یا ChatGPT account capability کے لیے Base URL سے زیادہ login mode اہم ہے۔`,oauthFlow:`1. Plugin چاہیے تو API Key login چھوڑیں
2. OPENAI_API_KEY / OPENAI_BASE_URL صاف کریں
3. Tool میں OAuth login کریں
4. CC-Switch route آن ہونے کی تصدیق کریں
5. نیا clean session شروع کریں`,verify:`پہلے tool layer bypass کر کے minimum request سے gpt88.cc verify کریں، پھر CC-Switch پر واپس آئیں۔`,trouble:`1. Tool پرانا address استعمال کر رہا ہے
   - Route enabled اور tool restart چیک کریں

2. 404
   - OpenAI route میں /v1 چیک کریں
   - Claude route میں https://api.gpt88.cc رکھیں

3. Plugin دستیاب نہیں
   - API Key mode میں یہ متوقع ہے؛ OAuth استعمال کریں

4. Route enabled مگر fail
   - curl سے gpt88.cc براہِ راست چیک کریں
   - پھر CC-Switch forwarding دیکھیں`,next:[`Plugin OAuth tutorial دیکھیں`,`Codex CLI tutorial دیکھیں`,`Integrations overview پر واپس جائیں`]},ta:{title:`CC-Switch-ன் பயன்`,info:`CC-Switch பல tools இடையே proxy route மாற்ற உதவும். Model calls gpt88.cc API Key மூலம்; plugins-க்கு target tool-ல் OAuth login தேவை.`,overview:[`பல development tools-ல் ஒரே gpt88.cc route மாற்ற வேண்டும்.`,`OpenAI மற்றும் Claude compatible configs-ஐப் பிரித்து நிர்வகிக்க வேண்டும்.`,`API Key model calls மற்றும் OAuth plugins இடையே மாற வேண்டும்.`],prepare:`1. CC-Switch install செய்யப்பட்டுள்ளது
2. Codex CLI / Claude Code / Cursor install செய்யப்பட்டுள்ளன
3. gpt88.cc API Key தயார்
4. OpenAI அல்லது Claude compatible route தேர்ந்தெடுக்கப்பட்டுள்ளது
5. Plugin-க்கு OAuth, model proxy-க்கு API Key என்பதை அறிந்திருக்கவும்`,routesIntro:`Protocol அடிப்படையில் இரண்டு routes அமைக்கவும். எல்லா protocol-களிலும் /v1-ஐ சேர்க்க வேண்டாம்.`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch திறக்கவும்
2. Routes / Providers / API route settings திறக்கவும்
3. gpt88-openai route உருவாக்கவும்
4. Base URL https://api.gpt88.cc அமைக்கவும்
5. Console API Key உள்ளிடவும்
6. Default chat model உள்ளிடவும்
7. Save செய்து enable செய்யவும்
8. Target tool restart செய்து verify செய்யவும்`,oauth:`Codex plugin அல்லது ChatGPT account capability-க்கு Base URL-ஐ விட login mode முக்கியம்.`,oauthFlow:`1. Plugin தேவைப்பட்டால் API Key login-இலிருந்து வெளியேறவும்
2. OPENAI_API_KEY / OPENAI_BASE_URL நீக்கவும்
3. Tool-ல் OAuth login செய்யவும்
4. CC-Switch route இயக்கப்பட்டதா பார்க்கவும்
5. புதிய clean session தொடங்கவும்`,verify:`முதலில் tool layer-ஐத் தவிர்த்து minimum request மூலம் gpt88.cc-ஐச் சரிபார்த்து, பின்னர் CC-Switch-க்கு திரும்பவும்.`,trouble:`1. Tool பழைய address பயன்படுத்துகிறது
   - Route enabled மற்றும் tool restart சரிபார்க்கவும்

2. 404
   - OpenAI route-ல் /v1 சரிபார்க்கவும்
   - Claude route-ல் https://api.gpt88.cc வைக்கவும்

3. Plugin இல்லை
   - API Key mode-ல் இது இயல்பு; OAuth பயன்படுத்தவும்

4. Route enabled ஆனாலும் fail
   - curl மூலம் gpt88.cc நேரடியாக சரிபார்க்கவும்
   - பின்னர் CC-Switch forwarding பார்க்கவும்`,next:[`Plugin OAuth tutorial பார்க்கவும்`,`Codex CLI tutorial பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`]},ne:{title:`CC-Switch को फाइदा`,info:`CC-Switch ले धेरै tools बीच proxy route बदल्न सजिलो बनाउँछ। Model calls gpt88.cc API Key बाट हुन्छन्; plugin का लागि target tool मा OAuth login चाहिन्छ।`,overview:[`धेरै development tools मा एउटै gpt88.cc route बदल्नुपर्छ।`,`OpenAI र Claude compatible configs अलग राख्नुपर्छ।`,`API Key model calls र OAuth plugins बीच switch गर्नुपर्छ।`],prepare:`1. CC-Switch install छ
2. Codex CLI / Claude Code / Cursor install छन्
3. gpt88.cc API Key तयार छ
4. OpenAI वा Claude compatible route तय छ
5. Plugin का लागि OAuth र model proxy का लागि API Key बुझिएको छ`,routesIntro:`Protocol अनुसार दुई routes राख्नुहोस्। सबै protocol मा एकैपटक /v1 नथप्नुहोस्।`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch खोल्नुहोस्
2. Routes / Providers / API route settings खोल्नुहोस्
3. gpt88-openai route बनाउनुहोस्
4. Base URL https://api.gpt88.cc राख्नुहोस्
5. Console को API Key राख्नुहोस्
6. Default chat model राख्नुहोस्
7. Save र enable गर्नुहोस्
8. Target tool restart गरी verify गर्नुहोस्`,oauth:`Codex plugin वा ChatGPT account capability का लागि Base URL भन्दा login mode महत्वपूर्ण हुन्छ।`,oauthFlow:`1. Plugin चाहिँदा API Key login छोड्नुहोस्
2. OPENAI_API_KEY / OPENAI_BASE_URL हटाउनुहोस्
3. Tool मा OAuth login गर्नुहोस्
4. CC-Switch route खुलेको छ कि जाँच्नुहोस्
5. नयाँ clean session सुरु गर्नुहोस्`,verify:`पहिले tool layer bypass गरी minimum request बाट gpt88.cc verify गर्नुहोस्, त्यसपछि CC-Switch मा फर्कनुहोस्।`,trouble:`1. Tool पुरानो address प्रयोग गर्छ
   - Route enabled र tool restart जाँच्नुहोस्

2. 404
   - OpenAI route मा /v1 जाँच्नुहोस्
   - Claude route मा https://api.gpt88.cc राख्नुहोस्

3. Plugin छैन
   - API Key mode मा यो सामान्य हो; OAuth प्रयोग गर्नुहोस्

4. Route enabled तर fail
   - curl बाट gpt88.cc सिधै जाँच्नुहोस्
   - त्यसपछि CC-Switch forwarding हेर्नुहोस्`,next:[`Plugin OAuth tutorial हेर्नुहोस्`,`Codex CLI tutorial हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`]},si:{title:`CC-Switch හි ප්‍රයෝජනය`,info:`CC-Switch tools කිහිපයක් අතර proxy route මාරු කිරීමට උපකාරී වේ. Model calls gpt88.cc API Key මඟින්ය; plugins සඳහා target tool තුළ OAuth login අවශ්‍යය.`,overview:[`Development tools කිහිපයක එකම gpt88.cc route මාරු කළ යුතුය.`,`OpenAI සහ Claude compatible configs වෙන් කර තබාගත යුතුය.`,`API Key model calls සහ OAuth plugins අතර මාරු විය යුතුය.`],prepare:`1. CC-Switch install කර ඇත
2. Codex CLI / Claude Code / Cursor install කර ඇත
3. gpt88.cc API Key සූදානම්
4. OpenAI හෝ Claude compatible route තීරණය කර ඇත
5. Plugin සඳහා OAuth සහ model proxy සඳහා API Key බව දන්නවා`,routesIntro:`Protocol අනුව routes දෙකක් තබන්න. සියලු protocol තුළ /v1 එකවර එක් නොකරන්න.`,routes:`OpenAI compatible route
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude compatible route
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`,flow:`1. CC-Switch විවෘත කරන්න
2. Routes / Providers / API route settings විවෘත කරන්න
3. gpt88-openai route එක සාදන්න
4. Base URL https://api.gpt88.cc ලෙස යොදන්න
5. Console API Key ඇතුළත් කරන්න
6. Default chat model ඇතුළත් කරන්න
7. Save කර enable කරන්න
8. Target tool restart කර verify කරන්න`,oauth:`Codex plugin හෝ ChatGPT account capability සඳහා Base URL ට වඩා login mode වැදගත්ය.`,oauthFlow:`1. Plugin අවශ්‍ය නම් API Key login ඉවත් කරන්න
2. OPENAI_API_KEY / OPENAI_BASE_URL ඉවත් කරන්න
3. Tool තුළ OAuth login කරන්න
4. CC-Switch route සක්‍රීයද බලන්න
5. නව clean session එකක් ආරම්භ කරන්න`,verify:`පළමුව tool layer එක bypass කර minimum request එකකින් gpt88.cc පරීක්ෂා කර, පසුව CC-Switch වෙත ආපසු යන්න.`,trouble:`1. Tool පැරණි address භාවිතා කරයි
   - Route enabled සහ tool restart පරීක්ෂා කරන්න

2. 404
   - OpenAI route තුළ /v1 පරීක්ෂා කරන්න
   - Claude route තුළ https://api.gpt88.cc තබන්න

3. Plugin නොමැත
   - API Key mode තුළ මෙය සාමාන්‍යය; OAuth භාවිතා කරන්න

4. Route enabled නමුත් fail
   - curl මඟින් gpt88.cc සෘජුව පරීක්ෂා කරන්න
   - පසුව CC-Switch forwarding බලන්න`,next:[`Plugin OAuth tutorial බලන්න`,`Codex CLI tutorial බලන්න`,`Integrations overview වෙත ආපසු යන්න`]}};function C(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(g,{});let r=c(e,`cc-switch`,{title:`CC-Switch 接入 gpt88.cc`,description:`CC-Switch 的 gpt88.cc 中转站路由、OpenAI/Claude 协议差异、OAuth 切换和排障教程。`,intro:`先选择目标协议和路由，再应用 API Key 或 OAuth 配置。`}),u=s(e,`cc-switch`,{overview:`适用场景`,prepare:`准备工作`,routes:`路由怎么填`,flow:`逐步配置`,oauth:`OAuth 场景`,verify:`验证路由`,troubleshoot:`排障清单`,next:`下一步`}),d=S[e]??S.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/dev/cc-switch`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`routes`,text:u.routes,level:2},{id:`flow`,text:u.flow,level:2},{id:`oauth`,text:u.oauth,level:2},{id:`verify`,text:u.verify,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.info})}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`ul`,{children:d.overview.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.prepare}),(0,l.jsx)(`h2`,{id:`routes`,children:u.routes}),(0,l.jsx)(`p`,{children:d.routesIntro}),(0,l.jsx)(i,{lang:`text`,filename:`routes`,code:d.routes}),(0,l.jsx)(`h2`,{id:`flow`,children:u.flow}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:d.flow}),(0,l.jsx)(`h2`,{id:`oauth`,children:u.oauth}),(0,l.jsx)(`p`,{children:d.oauth}),(0,l.jsx)(i,{lang:`text`,filename:`oauth-flow`,code:d.oauthFlow}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(`p`,{children:d.verify}),(0,l.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:x}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/dev/codex-cli/`,children:d.next[1]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[2]})})]})]})}export{C as default};