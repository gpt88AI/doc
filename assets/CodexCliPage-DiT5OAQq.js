import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`1. Install Codex CLI
2. Prepare a gpt88.cc API key
3. Decide whether you need API key mode or OAuth mode
4. Confirm the OpenAI-compatible Base URL: https://api.gpt88.cc
5. Prepare one minimal verification task, such as "create hello.txt"`,d=`# macOS / Linux
npm install -g @openai/codex

# verify
codex --version`,f=`[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`,p=`export OPENAI_API_KEY="sk-your-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,m=`codex --profile gpt88

# after the session opens, ask:
Create a file named hello.txt with the content "hello gpt88", then check whether the file was written successfully.`,h=`1. For pure model access: use API key mode
2. For ChatGPT account plugin capability: log out of API key mode and use OAuth
3. In OAuth mode, do not keep OPENAI_API_KEY or OPENAI_BASE_URL in the environment
4. If you use CC-Switch, confirm the route is enabled
5. After switching modes, start a fresh Codex session and verify again`,g=`1. New sessions reconnect repeatedly
   - Check proxy variables and old API key variables
   - Clear them and reopen the terminal

2. Tools suddenly become unavailable and code cannot be written
   - Ask Codex to check whether file tools are currently available
   - After tools recover, explicitly tell Codex: tools are restored, start implementing from step one
   - This is usually a session tool-state issue, not a model issue

3. 401 response
   - API key is wrong or lacks permission

4. 404 response
   - Base URL or model name is wrong

5. Plugin features are unavailable
   - This is expected if you are logged in with API key mode
   - Exit API key login and switch to OAuth`;function _(){return(0,l.jsxs)(o,{path:`/docs/integrations/dev/codex-cli`,title:`Codex CLI with gpt88.cc`,description:`Connect Codex CLI to gpt88.cc, switch between API key and OAuth modes, understand plugin limits, and recover tool execution when sessions break.`,headings:[{id:`overview`,text:`Bottom line first`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`install`,text:`Step 1: Install Codex CLI`,level:2},{id:`configure`,text:`Step 2: Configure API key mode`,level:2},{id:`verify`,text:`Step 3: Verify file tools`,level:2},{id:`oauth`,text:`OAuth and plugin capability`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`references`,text:`Further reading`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`warn`,title:`API key and OAuth solve different problems`,children:(0,l.jsx)(`p`,{children:`API key mode is the direct way to route Codex CLI model access through gpt88.cc. If you need ChatGPT account plugin capability, you must sign out of API key mode and use OAuth instead.`})}),(0,l.jsx)(a,{tone:`tip`,title:`Supplementary external reference`,children:(0,l.jsxs)(`p`,{children:[`For a broader Codex workflow reference, review`,` `,(0,l.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`.`]})}),(0,l.jsx)(`h2`,{id:`overview`,children:`Bottom line first`}),(0,l.jsxs)(`p`,{children:[`The core path is simple: install the CLI, point it at `,(0,l.jsx)(`code`,{children:`https://api.gpt88.cc`}),`, and verify the toolchain with a task that actually reads and writes files. If plugin capability is missing, first check whether you are still in API key mode.`]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:u}),(0,l.jsx)(`h2`,{id:`install`,children:`Step 1: Install Codex CLI`}),(0,l.jsx)(`p`,{children:`If Codex CLI is not installed yet, install it and confirm the command exists.`}),(0,l.jsx)(i,{lang:`bash`,filename:`install.sh`,code:d}),(0,l.jsx)(`h2`,{id:`configure`,children:`Step 2: Configure API key mode`}),(0,l.jsxs)(`p`,{children:[`API key mode is for normal model usage. The two key checks are whether `,(0,l.jsx)(`code`,{children:`base_url`}),` includes`,(0,l.jsx)(`code`,{children:`/v1`}),` and whether the model name is a real model ID currently supported by gpt88.cc.`]}),(0,l.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:f}),(0,l.jsx)(`p`,{children:`If you prefer environment variables, set them in the terminal session:`}),(0,l.jsx)(i,{lang:`bash`,filename:`.envrc`,code:p}),(0,l.jsx)(`h2`,{id:`verify`,children:`Step 3: Verify file tools`}),(0,l.jsx)(`p`,{children:`Do not stop at a simple chat reply. Codex is an agent, so the critical check is whether it can read files, write files, and continue an implementation task.`}),(0,l.jsx)(i,{lang:`bash`,filename:`verify.sh`,code:m}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Start Codex CLI.`}),(0,l.jsx)(`li`,{children:`Ask it to create a small file.`}),(0,l.jsx)(`li`,{children:`Ask it to read the file back and confirm the content.`}),(0,l.jsx)(`li`,{children:`If file tools are unavailable, fix tool state first instead of changing models.`})]}),(0,l.jsx)(`h2`,{id:`oauth`,children:`OAuth and plugin capability`}),(0,l.jsx)(i,{lang:`text`,filename:`oauth-notes`,code:h}),(0,l.jsxs)(`p`,{children:[`If your real goal is plugin capability, continue with the`,` `,(0,l.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Codex OAuth plugin guide`}),`. If you only need stable model access through gpt88.cc, API key mode is the simpler route.`]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:g}),(0,l.jsxs)(`p`,{children:[`If you see repeated `,(0,l.jsx)(`code`,{children:`Reconnecting 1/5`}),` through `,(0,l.jsx)(`code`,{children:`5/5`}),`, continue with the`,` `,(0,l.jsx)(t,{to:`/en/docs/guides/codex-http-responses-reconnect/`,children:`Codex HTTP / Responses reconnect guide`}),` `,`for a layered check of transport, providers, network, and minimal requests.`]}),(0,l.jsx)(`h2`,{id:`references`,children:`Further reading`}),(0,l.jsx)(`ul`,{children:(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),` `,`for broader Codex onboarding, CLI configuration, and workflow practices.`]})}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/codex-tool-recovery/`,`en`),children:`Read the tool recovery guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/guides/codex-plugins-oauth/`,`en`),children:`Read the OAuth plugin guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/dev/cc-switch/`,`en`),children:`Read the CC-Switch route guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var v=`1. 已安装 Codex CLI
2. 已准备 gpt88.cc API Key
3. 已确认当前要走 API Key 模式还是 OAuth 模式
4. 已确认 OpenAI 兼容 Base URL: https://api.gpt88.cc
5. 已准备一个最小验证任务，例如“创建一个 hello.txt”`,y=`# macOS / Linux
npm install -g @openai/codex

# 验证安装
codex --version`,b=`[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`,x=`export OPENAI_API_KEY="sk-你的-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,S=`codex --profile gpt88

# 进入会话后输入：
请创建一个 hello.txt，内容为 hello gpt88，并检查文件是否写入成功。`,C={zh:{warnTitle:`API Key 和 OAuth 是两套目标`,warn:`API Key 模式适合把 Codex CLI 接入 gpt88.cc 调用模型；如果要使用 ChatGPT 账号插件能力，需要退出 API Key 登录并使用 OAuth。两种模式不要混在一个会话里排查。`,overview:`Codex CLI 接入 gpt88.cc 的核心是：安装 CLI、配置 https://api.gpt88.cc，并用一个会写文件的最小任务验证工具链。`,prepare:v,install:`如果本机还没有 Codex CLI，先安装并确认命令可用。`,configure:`API Key 模式用于普通模型调用。重点检查 base_url 是否带 /v1，以及模型名是否是当前支持的真实 ID。`,env:`如果你更习惯用环境变量，也可以在当前终端设置：`,verify:`不要只问聊天问题。Codex 是代码代理，最重要的是确认能读文件、写文件并继续执行任务。`,verifyList:[`启动 Codex CLI。`,`让它创建一个简单文件。`,`让它读取并确认文件内容。`,`如果文件工具不可用，先修复工具状态，不要先换模型。`],oauth:`1. 只需要模型调用：使用 API Key 模式
2. 需要 ChatGPT 账号插件能力：退出 API Key，使用 OAuth 登录
3. OAuth 模式不要保留 OPENAI_API_KEY / OPENAI_BASE_URL 污染环境
4. 使用 CC-Switch 时，需要确认路由已经开启
5. 切换模式后，重新开启一个 Codex 会话验证`,oauthText:`如果要插件能力，继续查看 Codex 插件 OAuth 教程；如果只是稳定调用 gpt88.cc 模型，API Key 模式更直接。`,trouble:`1. 每次新会话反复 reconnect
   - 先检查代理变量和旧的 API Key 环境变量
   - 清理后重新打开终端

2. 工具突然不可调用，代码不能落地
   - 让 Codex 检查当前文件工具是否可用
   - 工具恢复后，明确告诉 Codex: 工具已恢复，直接从第一步开始落代码
   - 这通常不是模型问题，而是会话工具状态问题

3. 返回 401
   - API Key 不正确或权限不足

4. 返回 404
   - Base URL 或模型名写错

5. 插件功能不可用
   - 如果你是 API Key 登录，这是正常限制
   - 退出 API Key 登录，改用 OAuth`,troubleText:`遇到连续 Reconnecting 1/5 到 5/5 时，按连接层、provider、网络和最小请求顺序排查。`,next:[`查看工具恢复教程`,`查看 OAuth 插件教程`,`查看 CC-Switch 路由教程`,`返回集成总览`]},hi:{warnTitle:`API Key और OAuth अलग उद्देश्य हैं`,warn:`API Key mode Codex CLI को gpt88.cc model calls से जोड़ता है; ChatGPT account plugins के लिए API Key login से बाहर निकलकर OAuth उपयोग करें। दोनों modes को एक session में mix न करें।`,overview:`Codex CLI integration के लिए CLI install करें, https://api.gpt88.cc configure करें और file लिखने वाले छोटे task से toolchain verify करें।`,prepare:`1. Codex CLI install है
2. gpt88.cc API Key तैयार है
3. API Key या OAuth mode तय है
4. OpenAI-compatible Base URL https://api.gpt88.cc है
5. छोटा task तैयार है, जैसे hello.txt बनाना`,install:`Codex CLI न हो तो पहले install करें और command चलना जांचें।`,configure:`API Key mode सामान्य model calls के लिए है। base_url में /v1 और वास्तविक supported model ID जांचें।`,env:`Environment variables पसंद हों तो current terminal में यह सेट करें:`,verify:`केवल chat question न पूछें। Codex agent में file पढ़ना, लिखना और task जारी रखना verify करें।`,verifyList:[`Codex CLI शुरू करें।`,`एक छोटी file बनवाएं।`,`File पढ़वाकर content confirm करें।`,`File tool न चले तो पहले tool state ठीक करें, model न बदलें।`],oauth:`1. केवल model call: API Key mode
2. ChatGPT plugin चाहिए: API Key छोड़कर OAuth login करें
3. OAuth में OPENAI_API_KEY / OPENAI_BASE_URL न रखें
4. CC-Switch route चालू है जांचें
5. Mode बदलने के बाद नया Codex session शुरू करें`,oauthText:`Plugin चाहिए तो Codex plugin OAuth tutorial देखें; केवल model call के लिए API Key mode सरल है।`,trouble:`1. हर नए session में reconnect
   - Proxy और पुराने API Key variables जांचें
   - साफ करके terminal फिर खोलें

2. Tool उपलब्ध नहीं
   - File tool state जांचें और restore के बाद task फिर शुरू करें

3. 401
   - API Key या permissions जांचें

4. 404
   - Base URL या model name जांचें

5. Plugin नहीं
   - API Key mode में यह अपेक्षित है; OAuth उपयोग करें`,troubleText:`लगातार Reconnecting 1/5 से 5/5 हो तो connection, provider, network और minimum request क्रम में जांचें।`,next:[`Tool recovery tutorial देखें`,`OAuth plugin tutorial देखें`,`CC-Switch routing tutorial देखें`,`Integrations overview पर लौटें`]},bn:{warnTitle:`API Key ও OAuth-এর লক্ষ্য আলাদা`,warn:`API Key mode Codex CLI-কে gpt88.cc model call-এ যুক্ত করে; ChatGPT account plugin-এর জন্য API Key login ছেড়ে OAuth ব্যবহার করুন। একই session-এ দুই mode মেশাবেন না।`,overview:`Codex CLI integration-এর জন্য CLI install, https://api.gpt88.cc configure এবং file লেখার ছোট task দিয়ে toolchain যাচাই করুন।`,prepare:`1. Codex CLI install আছে
2. gpt88.cc API Key প্রস্তুত
3. API Key নাকি OAuth mode ঠিক করা
4. OpenAI-compatible Base URL https://api.gpt88.cc
5. hello.txt তৈরির মতো ছোট task প্রস্তুত`,install:`Codex CLI না থাকলে install করে command কাজ করছে কি না দেখুন।`,configure:`API Key mode সাধারণ model call-এর জন্য। base_url-এ /v1 এবং সত্যিকারের supported model ID যাচাই করুন।`,env:`Environment variable ব্যবহার করতে চাইলে current terminal-এ সেট করুন:`,verify:`শুধু chat question নয়। Codex agent file পড়তে, লিখতে এবং task চালিয়ে যেতে পারে কি না দেখুন।`,verifyList:[`Codex CLI চালু করুন।`,`একটি ছোট file তৈরি করতে বলুন।`,`File পড়িয়ে content নিশ্চিত করুন।`,`File tool না চললে model বদলাবেন না, আগে tool state ঠিক করুন।`],oauth:`1. শুধু model call: API Key mode
2. ChatGPT plugin চাইলে API Key ছেড়ে OAuth login
3. OAuth mode-এ OPENAI_API_KEY / OPENAI_BASE_URL রাখবেন না
4. CC-Switch route চালু আছে কি না দেখুন
5. Mode বদলে নতুন Codex session খুলুন`,oauthText:`Plugin দরকার হলে Codex plugin OAuth tutorial দেখুন; শুধু model call-এর জন্য API Key mode সহজ।`,trouble:`1. নতুন session-এ বারবার reconnect
   - Proxy ও পুরোনো API Key variable দেখুন

2. Tool কাজ করছে না
   - File tool state দেখুন এবং restore-এর পর task আবার শুরু করুন

3. 401
   - API Key ও permission দেখুন

4. 404
   - Base URL বা model name দেখুন

5. Plugin নেই
   - API Key mode-এ এটি স্বাভাবিক; OAuth ব্যবহার করুন`,troubleText:`Reconnecting 1/5 থেকে 5/5 হলে connection, provider, network এবং minimum request ক্রমে পরীক্ষা করুন।`,next:[`Tool recovery tutorial দেখুন`,`OAuth plugin tutorial দেখুন`,`CC-Switch routing tutorial দেখুন`,`Integrations overview-এ ফিরুন`]},ur:{warnTitle:`API Key اور OAuth کے مقاصد الگ ہیں`,warn:`API Key mode Codex CLI کو gpt88.cc model calls سے جوڑتا ہے؛ ChatGPT account plugins کے لیے API Key login چھوڑ کر OAuth استعمال کریں۔ دونوں modes ایک session میں mix نہ کریں۔`,overview:`Codex CLI کے لیے CLI install کریں، https://api.gpt88.cc configure کریں اور file لکھنے والے مختصر task سے toolchain verify کریں۔`,prepare:`1. Codex CLI install ہے
2. gpt88.cc API Key تیار ہے
3. API Key یا OAuth mode طے ہے
4. OpenAI-compatible Base URL https://api.gpt88.cc ہے
5. hello.txt بنانے جیسا مختصر task تیار ہے`,install:`Codex CLI نہ ہو تو install کر کے command کی تصدیق کریں۔`,configure:`API Key mode عام model calls کے لیے ہے۔ base_url میں /v1 اور حقیقی supported model ID چیک کریں۔`,env:`Environment variables استعمال کرنے کے لیے current terminal میں یہ set کریں:`,verify:`صرف chat سوال نہ پوچھیں۔ Codex agent کے file read، write اور task continuation کو verify کریں۔`,verifyList:[`Codex CLI شروع کریں۔`,`ایک چھوٹی file بنوائیں۔`,`File پڑھوا کر content confirm کریں۔`,`File tool نہ چلے تو پہلے tool state درست کریں، model نہ بدلیں۔`],oauth:`1. صرف model call: API Key mode
2. ChatGPT plugin چاہیے: API Key چھوڑ کر OAuth login
3. OAuth میں OPENAI_API_KEY / OPENAI_BASE_URL نہ رکھیں
4. CC-Switch route آن ہے چیک کریں
5. Mode بدلنے کے بعد نیا Codex session شروع کریں`,oauthText:`Plugin کے لیے Codex plugin OAuth tutorial دیکھیں؛ صرف model call کے لیے API Key mode آسان ہے۔`,trouble:`1. ہر نئے session میں reconnect
   - Proxy اور پرانے API Key variables چیک کریں

2. Tool دستیاب نہیں
   - File tool state دیکھیں اور restore کے بعد task دوبارہ شروع کریں

3. 401
   - API Key اور permissions چیک کریں

4. 404
   - Base URL یا model name چیک کریں

5. Plugin نہیں
   - API Key mode میں یہ متوقع ہے؛ OAuth استعمال کریں`,troubleText:`مسلسل Reconnecting 1/5 سے 5/5 ہو تو connection، provider، network اور minimum request کی ترتیب سے چیک کریں۔`,next:[`Tool recovery tutorial دیکھیں`,`OAuth plugin tutorial دیکھیں`,`CC-Switch routing tutorial دیکھیں`,`Integrations overview پر واپس جائیں`]},ta:{warnTitle:`API Key மற்றும் OAuth வெவ்வேறு நோக்கங்கள்`,warn:`API Key mode Codex CLI-ஐ gpt88.cc model calls-க்கு இணைக்கும்; ChatGPT account plugins-க்கு API Key login-இலிருந்து வெளியேறி OAuth பயன்படுத்தவும். இரண்டையும் ஒரே session-ல் கலக்க வேண்டாம்.`,overview:`Codex CLI-க்கு CLI install செய்து https://api.gpt88.cc configure செய்து file எழுதும் சிறிய task மூலம் toolchain சரிபார்க்கவும்.`,prepare:`1. Codex CLI install செய்யப்பட்டுள்ளது
2. gpt88.cc API Key தயார்
3. API Key அல்லது OAuth mode தீர்மானிக்கப்பட்டது
4. OpenAI-compatible Base URL https://api.gpt88.cc
5. hello.txt உருவாக்கும் சிறிய task தயார்`,install:`Codex CLI இல்லையெனில் install செய்து command இயங்குகிறதா உறுதி செய்யவும்.`,configure:`API Key mode சாதாரண model calls-க்கு. base_url-ல் /v1 மற்றும் உண்மையான supported model ID சரிபார்க்கவும்.`,env:`Environment variables பயன்படுத்த current terminal-ல் இதை set செய்யவும்:`,verify:`Chat கேள்வி மட்டும் போதாது. Codex agent file read, write மற்றும் task தொடர்வதைச் சரிபார்க்கவும்.`,verifyList:[`Codex CLI தொடங்கவும்.`,`சிறிய file உருவாக்கச் சொல்லவும்.`,`File-ஐ படிக்கச் செய்து content உறுதி செய்யவும்.`,`File tool இயங்காவிட்டால் model மாற்றாமல் முதலில் tool state சரிசெய்யவும்.`],oauth:`1. Model call மட்டும்: API Key mode
2. ChatGPT plugin: API Key விட்டு OAuth login
3. OAuth mode-ல் OPENAI_API_KEY / OPENAI_BASE_URL வைக்க வேண்டாம்
4. CC-Switch route இயக்கப்பட்டதா பார்க்கவும்
5. Mode மாற்றிய பின் புதிய Codex session தொடங்கவும்`,oauthText:`Plugin தேவைப்பட்டால் Codex plugin OAuth tutorial பார்க்கவும்; model call மட்டும் என்றால் API Key mode எளிது.`,trouble:`1. ஒவ்வொரு புதிய session-லும் reconnect
   - Proxy மற்றும் பழைய API Key variables சரிபார்க்கவும்

2. Tool கிடைக்கவில்லை
   - File tool state சரிபார்த்து restore பிறகு task மீண்டும் தொடங்கவும்

3. 401
   - API Key மற்றும் permissions சரிபார்க்கவும்

4. 404
   - Base URL அல்லது model name சரிபார்க்கவும்

5. Plugin இல்லை
   - API Key mode-ல் இது இயல்பு; OAuth பயன்படுத்தவும்`,troubleText:`Reconnecting 1/5 முதல் 5/5 வரை தொடர்ந்தால் connection, provider, network மற்றும் minimum request வரிசையில் சரிபார்க்கவும்.`,next:[`Tool recovery tutorial பார்க்கவும்`,`OAuth plugin tutorial பார்க்கவும்`,`CC-Switch routing tutorial பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`]},ne:{warnTitle:`API Key र OAuth का उद्देश्य अलग छन्`,warn:`API Key mode ले Codex CLI लाई gpt88.cc model calls सँग जोड्छ; ChatGPT account plugin का लागि API Key login छोडेर OAuth प्रयोग गर्नुहोस्। एउटै session मा दुवै नमिसाउनुहोस्।`,overview:`Codex CLI का लागि CLI install, https://api.gpt88.cc configure र file लेख्ने सानो task बाट toolchain verify गर्नुहोस्।`,prepare:`1. Codex CLI install छ
2. gpt88.cc API Key तयार छ
3. API Key वा OAuth mode तय छ
4. OpenAI-compatible Base URL https://api.gpt88.cc छ
5. hello.txt बनाउने सानो task तयार छ`,install:`Codex CLI नभए install गरेर command चल्छ कि जाँच्नुहोस्।`,configure:`API Key mode सामान्य model calls का लागि हो। base_url मा /v1 र वास्तविक supported model ID जाँच्नुहोस्।`,env:`Environment variables प्रयोग गर्न current terminal मा यो set गर्नुहोस्:`,verify:`Chat प्रश्न मात्र नगर्नुहोस्। Codex agent ले file पढ्न, लेख्न र task जारी राख्न सक्छ कि जाँच्नुहोस्।`,verifyList:[`Codex CLI सुरु गर्नुहोस्।`,`सानो file बनाउन लगाउनुहोस्।`,`File पढाएर content पुष्टि गर्नुहोस्।`,`File tool नचले model नबदली पहिले tool state सुधार्नुहोस्।`],oauth:`1. Model call मात्र: API Key mode
2. ChatGPT plugin: API Key छोडेर OAuth login
3. OAuth mode मा OPENAI_API_KEY / OPENAI_BASE_URL नराख्नुहोस्
4. CC-Switch route खुलेको छ कि जाँच्नुहोस्
5. Mode बदलेपछि नयाँ Codex session सुरु गर्नुहोस्`,oauthText:`Plugin चाहिँदा Codex plugin OAuth tutorial हेर्नुहोस्; model call मात्रका लागि API Key mode सरल छ।`,trouble:`1. हरेक नयाँ session मा reconnect
   - Proxy र पुराना API Key variables जाँच्नुहोस्

2. Tool उपलब्ध छैन
   - File tool state जाँचेर restore पछि task फेरि सुरु गर्नुहोस्

3. 401
   - API Key र permissions जाँच्नुहोस्

4. 404
   - Base URL वा model name जाँच्नुहोस्

5. Plugin छैन
   - API Key mode मा यो सामान्य हो; OAuth प्रयोग गर्नुहोस्`,troubleText:`लगातार Reconnecting 1/5 देखि 5/5 भए connection, provider, network र minimum request क्रमशः जाँच्नुहोस्।`,next:[`Tool recovery tutorial हेर्नुहोस्`,`OAuth plugin tutorial हेर्नुहोस्`,`CC-Switch routing tutorial हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`]},si:{warnTitle:`API Key සහ OAuth වෙනස් අරමුණු සඳහාය`,warn:`API Key mode Codex CLI gpt88.cc model calls සමඟ සම්බන්ධ කරයි; ChatGPT account plugins සඳහා API Key login අත්හැර OAuth භාවිතා කරන්න. Modes දෙක එකම session එකක මිශ්‍ර නොකරන්න.`,overview:`Codex CLI සඳහා CLI install කර https://api.gpt88.cc configure කර file ලියන කුඩා task එකකින් toolchain verify කරන්න.`,prepare:`1. Codex CLI install කර ඇත
2. gpt88.cc API Key සූදානම්
3. API Key හෝ OAuth mode තීරණය කර ඇත
4. OpenAI-compatible Base URL https://api.gpt88.cc
5. hello.txt සාදන කුඩා task සූදානම්`,install:`Codex CLI නොමැති නම් install කර command එක ක්‍රියා කරන බව තහවුරු කරන්න.`,configure:`API Key mode සාමාන්‍ය model calls සඳහාය. base_url හි /v1 සහ සැබෑ supported model ID පරීක්ෂා කරන්න.`,env:`Environment variables භාවිතා කිරීමට current terminal එකේ මෙය set කරන්න:`,verify:`Chat ප්‍රශ්නයක් පමණක් නොයවන්න. Codex agent හට file කියවීම, ලිවීම සහ task දිගටම කිරීම හැකිද බලන්න.`,verifyList:[`Codex CLI ආරම්භ කරන්න.`,`කුඩා file එකක් සෑදීමට කියන්න.`,`File කියවා content තහවුරු කිරීමට කියන්න.`,`File tool නොතිබේ නම් model මාරු නොකර පළමුව tool state සකසන්න.`],oauth:`1. Model call පමණක්: API Key mode
2. ChatGPT plugin: API Key ඉවත් කර OAuth login
3. OAuth mode තුළ OPENAI_API_KEY / OPENAI_BASE_URL නොතබන්න
4. CC-Switch route ක්‍රියාත්මකද බලන්න
5. Mode මාරු කළ පසු නව Codex session එකක් ආරම්භ කරන්න`,oauthText:`Plugin අවශ්‍ය නම් Codex plugin OAuth tutorial බලන්න; model call පමණක් නම් API Key mode සරලය.`,trouble:`1. සෑම නව session එකකම reconnect
   - Proxy සහ පැරණි API Key variables පරීක්ෂා කරන්න

2. Tool ලබාගත නොහැක
   - File tool state පරීක්ෂා කර restore පසු task නැවත ආරම්භ කරන්න

3. 401
   - API Key සහ permissions පරීක්ෂා කරන්න

4. 404
   - Base URL හෝ model name පරීක්ෂා කරන්න

5. Plugin නොමැත
   - API Key mode තුළ මෙය සාමාන්‍යය; OAuth භාවිතා කරන්න`,troubleText:`Reconnecting 1/5 සිට 5/5 දක්වා දිගටම නම් connection, provider, network සහ minimum request අනුපිළිවෙලින් පරීක්ෂා කරන්න.`,next:[`Tool recovery tutorial බලන්න`,`OAuth plugin tutorial බලන්න`,`CC-Switch routing tutorial බලන්න`,`Integrations overview වෙත ආපසු යන්න`]}};function w(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(_,{});let r=c(e,`codex-cli`,{title:`Codex CLI 接入 gpt88.cc`,description:`Codex CLI 使用 gpt88.cc 的模型接入、OAuth 切换、插件限制和工具恢复教程。`,intro:`API Key 和 OAuth 是两套目标，先判断你需要模型调用还是插件能力。`}),u=s(e,`codex-cli`,{overview:`先看结论`,prepare:`准备工作`,install:`第一步：安装 Codex CLI`,configure:`第二步：配置 API Key 模式`,verify:`第三步：验证文件工具`,oauth:`OAuth 与插件能力`,troubleshoot:`排障清单`,references:`扩展阅读`,next:`下一步`}),d=C[e]??C.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/dev/codex-cli`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`install`,text:u.install,level:2},{id:`configure`,text:u.configure,level:2},{id:`verify`,text:u.verify,level:2},{id:`oauth`,text:u.oauth,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`references`,text:u.references,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`warn`,title:d.warnTitle,children:(0,l.jsx)(`p`,{children:d.warn})}),(0,l.jsx)(a,{tone:`tip`,title:`额外参考`,children:(0,l.jsxs)(`p`,{children:[`如果你想看更系统的 Codex 使用、CLI 配置和工作流整理，可以参考`,` `,(0,l.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`。这是外部实践指南，适合作为本页的补充阅读。`]})}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`p`,{children:d.overview}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.prepare}),(0,l.jsx)(`h2`,{id:`install`,children:u.install}),(0,l.jsx)(`p`,{children:d.install}),(0,l.jsx)(i,{lang:`bash`,filename:`install.sh`,code:y}),(0,l.jsx)(`h2`,{id:`configure`,children:u.configure}),(0,l.jsx)(`p`,{children:d.configure}),(0,l.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:b}),(0,l.jsx)(`p`,{children:d.env}),(0,l.jsx)(i,{lang:`bash`,filename:`.envrc`,code:x}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(`p`,{children:d.verify}),(0,l.jsx)(i,{lang:`bash`,filename:`verify.sh`,code:S}),(0,l.jsx)(`ol`,{children:d.verifyList.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`oauth`,children:u.oauth}),(0,l.jsx)(i,{lang:`text`,filename:`oauth-notes`,code:d.oauth}),(0,l.jsxs)(`p`,{children:[d.oauthText,` `,(0,l.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex OAuth tutorial`}),`。`]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsxs)(`p`,{children:[d.troubleText,` `,(0,l.jsx)(t,{to:`/docs/guides/codex-http-responses-reconnect/`,children:`HTTP / Responses reconnect guide`}),`。`]}),(0,l.jsx)(`h2`,{id:`references`,children:u.references}),(0,l.jsx)(`ul`,{children:(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),` `,`— Codex 入门、CLI 配置、工作流和实践经验整理，可作为 gpt88.cc Codex 接入教程之外的补充参考。`]})}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:d.next[1]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/dev/cc-switch/`,children:d.next[2]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[3]})})]})]})}export{w as default};