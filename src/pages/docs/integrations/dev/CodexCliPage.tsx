import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import CodexCliPageEn from '../../../en/CodexCliPageEn'

const PREPARE = `1. 已安装 Codex CLI
2. 已准备 gpt88.cc API Key
3. 已确认当前要走 API Key 模式还是 OAuth 模式
4. 已确认 OpenAI 兼容 Base URL: https://api.gpt88.cc
5. 已准备一个最小验证任务，例如“创建一个 hello.txt”`

const INSTALL = `# macOS / Linux
npm install -g @openai/codex

# 验证安装
codex --version`

const API_CONFIG = `[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`

const ENV = `export OPENAI_API_KEY="sk-你的-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`

const VERIFY = `codex --profile gpt88

# 进入会话后输入：
请创建一个 hello.txt，内容为 hello gpt88，并检查文件是否写入成功。`

const OAUTH_NOTES = `1. 只需要模型调用：使用 API Key 模式
2. 需要 ChatGPT 账号插件能力：退出 API Key，使用 OAuth 登录
3. OAuth 模式不要保留 OPENAI_API_KEY / OPENAI_BASE_URL 污染环境
4. 使用 CC-Switch 时，需要确认路由已经开启
5. 切换模式后，重新开启一个 Codex 会话验证`

const TROUBLESHOOTING = `1. 每次新会话反复 reconnect
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
   - 退出 API Key 登录，改用 OAuth`

type CodexBody = { warnTitle: string; warn: string; overview: string; prepare: string; install: string; configure: string; env: string; verify: string; verifyList: string[]; oauth: string; oauthText: string; trouble: string; troubleText: string; next: string[] }
const CODEX_BODY_COPY: Record<string, CodexBody> = {
  zh: { warnTitle: 'API Key 和 OAuth 是两套目标', warn: 'API Key 模式适合把 Codex CLI 接入 gpt88.cc 调用模型；如果要使用 ChatGPT 账号插件能力，需要退出 API Key 登录并使用 OAuth。两种模式不要混在一个会话里排查。', overview: 'Codex CLI 接入 gpt88.cc 的核心是：安装 CLI、配置 https://api.gpt88.cc，并用一个会写文件的最小任务验证工具链。', prepare: PREPARE, install: '如果本机还没有 Codex CLI，先安装并确认命令可用。', configure: 'API Key 模式用于普通模型调用。重点检查 base_url 是否带 /v1，以及模型名是否是当前支持的真实 ID。', env: '如果你更习惯用环境变量，也可以在当前终端设置：', verify: '不要只问聊天问题。Codex 是代码代理，最重要的是确认能读文件、写文件并继续执行任务。', verifyList: ['启动 Codex CLI。', '让它创建一个简单文件。', '让它读取并确认文件内容。', '如果文件工具不可用，先修复工具状态，不要先换模型。'], oauth: OAUTH_NOTES, oauthText: '如果要插件能力，继续查看 Codex 插件 OAuth 教程；如果只是稳定调用 gpt88.cc 模型，API Key 模式更直接。', trouble: TROUBLESHOOTING, troubleText: '遇到连续 Reconnecting 1/5 到 5/5 时，按连接层、provider、网络和最小请求顺序排查。', next: ['查看工具恢复教程', '查看 OAuth 插件教程', '查看 CC-Switch 路由教程', '返回集成总览'] },
  hi: { warnTitle: 'API Key और OAuth अलग उद्देश्य हैं', warn: 'API Key mode Codex CLI को gpt88.cc model calls से जोड़ता है; ChatGPT account plugins के लिए API Key login से बाहर निकलकर OAuth उपयोग करें। दोनों modes को एक session में mix न करें।', overview: 'Codex CLI integration के लिए CLI install करें, https://api.gpt88.cc configure करें और file लिखने वाले छोटे task से toolchain verify करें।', prepare: '1. Codex CLI install है\n2. gpt88.cc API Key तैयार है\n3. API Key या OAuth mode तय है\n4. OpenAI-compatible Base URL https://api.gpt88.cc है\n5. छोटा task तैयार है, जैसे hello.txt बनाना', install: 'Codex CLI न हो तो पहले install करें और command चलना जांचें।', configure: 'API Key mode सामान्य model calls के लिए है। base_url में /v1 और वास्तविक supported model ID जांचें।', env: 'Environment variables पसंद हों तो current terminal में यह सेट करें:', verify: 'केवल chat question न पूछें। Codex agent में file पढ़ना, लिखना और task जारी रखना verify करें।', verifyList: ['Codex CLI शुरू करें।', 'एक छोटी file बनवाएं।', 'File पढ़वाकर content confirm करें।', 'File tool न चले तो पहले tool state ठीक करें, model न बदलें।'], oauth: '1. केवल model call: API Key mode\n2. ChatGPT plugin चाहिए: API Key छोड़कर OAuth login करें\n3. OAuth में OPENAI_API_KEY / OPENAI_BASE_URL न रखें\n4. CC-Switch route चालू है जांचें\n5. Mode बदलने के बाद नया Codex session शुरू करें', oauthText: 'Plugin चाहिए तो Codex plugin OAuth tutorial देखें; केवल model call के लिए API Key mode सरल है।', trouble: '1. हर नए session में reconnect\n   - Proxy और पुराने API Key variables जांचें\n   - साफ करके terminal फिर खोलें\n\n2. Tool उपलब्ध नहीं\n   - File tool state जांचें और restore के बाद task फिर शुरू करें\n\n3. 401\n   - API Key या permissions जांचें\n\n4. 404\n   - Base URL या model name जांचें\n\n5. Plugin नहीं\n   - API Key mode में यह अपेक्षित है; OAuth उपयोग करें', troubleText: 'लगातार Reconnecting 1/5 से 5/5 हो तो connection, provider, network और minimum request क्रम में जांचें।', next: ['Tool recovery tutorial देखें', 'OAuth plugin tutorial देखें', 'CC-Switch routing tutorial देखें', 'Integrations overview पर लौटें'] },
  bn: { warnTitle: 'API Key ও OAuth-এর লক্ষ্য আলাদা', warn: 'API Key mode Codex CLI-কে gpt88.cc model call-এ যুক্ত করে; ChatGPT account plugin-এর জন্য API Key login ছেড়ে OAuth ব্যবহার করুন। একই session-এ দুই mode মেশাবেন না।', overview: 'Codex CLI integration-এর জন্য CLI install, https://api.gpt88.cc configure এবং file লেখার ছোট task দিয়ে toolchain যাচাই করুন।', prepare: '1. Codex CLI install আছে\n2. gpt88.cc API Key প্রস্তুত\n3. API Key নাকি OAuth mode ঠিক করা\n4. OpenAI-compatible Base URL https://api.gpt88.cc\n5. hello.txt তৈরির মতো ছোট task প্রস্তুত', install: 'Codex CLI না থাকলে install করে command কাজ করছে কি না দেখুন।', configure: 'API Key mode সাধারণ model call-এর জন্য। base_url-এ /v1 এবং সত্যিকারের supported model ID যাচাই করুন।', env: 'Environment variable ব্যবহার করতে চাইলে current terminal-এ সেট করুন:', verify: 'শুধু chat question নয়। Codex agent file পড়তে, লিখতে এবং task চালিয়ে যেতে পারে কি না দেখুন।', verifyList: ['Codex CLI চালু করুন।', 'একটি ছোট file তৈরি করতে বলুন।', 'File পড়িয়ে content নিশ্চিত করুন।', 'File tool না চললে model বদলাবেন না, আগে tool state ঠিক করুন।'], oauth: '1. শুধু model call: API Key mode\n2. ChatGPT plugin চাইলে API Key ছেড়ে OAuth login\n3. OAuth mode-এ OPENAI_API_KEY / OPENAI_BASE_URL রাখবেন না\n4. CC-Switch route চালু আছে কি না দেখুন\n5. Mode বদলে নতুন Codex session খুলুন', oauthText: 'Plugin দরকার হলে Codex plugin OAuth tutorial দেখুন; শুধু model call-এর জন্য API Key mode সহজ।', trouble: '1. নতুন session-এ বারবার reconnect\n   - Proxy ও পুরোনো API Key variable দেখুন\n\n2. Tool কাজ করছে না\n   - File tool state দেখুন এবং restore-এর পর task আবার শুরু করুন\n\n3. 401\n   - API Key ও permission দেখুন\n\n4. 404\n   - Base URL বা model name দেখুন\n\n5. Plugin নেই\n   - API Key mode-এ এটি স্বাভাবিক; OAuth ব্যবহার করুন', troubleText: 'Reconnecting 1/5 থেকে 5/5 হলে connection, provider, network এবং minimum request ক্রমে পরীক্ষা করুন।', next: ['Tool recovery tutorial দেখুন', 'OAuth plugin tutorial দেখুন', 'CC-Switch routing tutorial দেখুন', 'Integrations overview-এ ফিরুন'] },
  ur: { warnTitle: 'API Key اور OAuth کے مقاصد الگ ہیں', warn: 'API Key mode Codex CLI کو gpt88.cc model calls سے جوڑتا ہے؛ ChatGPT account plugins کے لیے API Key login چھوڑ کر OAuth استعمال کریں۔ دونوں modes ایک session میں mix نہ کریں۔', overview: 'Codex CLI کے لیے CLI install کریں، https://api.gpt88.cc configure کریں اور file لکھنے والے مختصر task سے toolchain verify کریں۔', prepare: '1. Codex CLI install ہے\n2. gpt88.cc API Key تیار ہے\n3. API Key یا OAuth mode طے ہے\n4. OpenAI-compatible Base URL https://api.gpt88.cc ہے\n5. hello.txt بنانے جیسا مختصر task تیار ہے', install: 'Codex CLI نہ ہو تو install کر کے command کی تصدیق کریں۔', configure: 'API Key mode عام model calls کے لیے ہے۔ base_url میں /v1 اور حقیقی supported model ID چیک کریں۔', env: 'Environment variables استعمال کرنے کے لیے current terminal میں یہ set کریں:', verify: 'صرف chat سوال نہ پوچھیں۔ Codex agent کے file read، write اور task continuation کو verify کریں۔', verifyList: ['Codex CLI شروع کریں۔', 'ایک چھوٹی file بنوائیں۔', 'File پڑھوا کر content confirm کریں۔', 'File tool نہ چلے تو پہلے tool state درست کریں، model نہ بدلیں۔'], oauth: '1. صرف model call: API Key mode\n2. ChatGPT plugin چاہیے: API Key چھوڑ کر OAuth login\n3. OAuth میں OPENAI_API_KEY / OPENAI_BASE_URL نہ رکھیں\n4. CC-Switch route آن ہے چیک کریں\n5. Mode بدلنے کے بعد نیا Codex session شروع کریں', oauthText: 'Plugin کے لیے Codex plugin OAuth tutorial دیکھیں؛ صرف model call کے لیے API Key mode آسان ہے۔', trouble: '1. ہر نئے session میں reconnect\n   - Proxy اور پرانے API Key variables چیک کریں\n\n2. Tool دستیاب نہیں\n   - File tool state دیکھیں اور restore کے بعد task دوبارہ شروع کریں\n\n3. 401\n   - API Key اور permissions چیک کریں\n\n4. 404\n   - Base URL یا model name چیک کریں\n\n5. Plugin نہیں\n   - API Key mode میں یہ متوقع ہے؛ OAuth استعمال کریں', troubleText: 'مسلسل Reconnecting 1/5 سے 5/5 ہو تو connection، provider، network اور minimum request کی ترتیب سے چیک کریں۔', next: ['Tool recovery tutorial دیکھیں', 'OAuth plugin tutorial دیکھیں', 'CC-Switch routing tutorial دیکھیں', 'Integrations overview پر واپس جائیں'] },
  ta: { warnTitle: 'API Key மற்றும் OAuth வெவ்வேறு நோக்கங்கள்', warn: 'API Key mode Codex CLI-ஐ gpt88.cc model calls-க்கு இணைக்கும்; ChatGPT account plugins-க்கு API Key login-இலிருந்து வெளியேறி OAuth பயன்படுத்தவும். இரண்டையும் ஒரே session-ல் கலக்க வேண்டாம்.', overview: 'Codex CLI-க்கு CLI install செய்து https://api.gpt88.cc configure செய்து file எழுதும் சிறிய task மூலம் toolchain சரிபார்க்கவும்.', prepare: '1. Codex CLI install செய்யப்பட்டுள்ளது\n2. gpt88.cc API Key தயார்\n3. API Key அல்லது OAuth mode தீர்மானிக்கப்பட்டது\n4. OpenAI-compatible Base URL https://api.gpt88.cc\n5. hello.txt உருவாக்கும் சிறிய task தயார்', install: 'Codex CLI இல்லையெனில் install செய்து command இயங்குகிறதா உறுதி செய்யவும்.', configure: 'API Key mode சாதாரண model calls-க்கு. base_url-ல் /v1 மற்றும் உண்மையான supported model ID சரிபார்க்கவும்.', env: 'Environment variables பயன்படுத்த current terminal-ல் இதை set செய்யவும்:', verify: 'Chat கேள்வி மட்டும் போதாது. Codex agent file read, write மற்றும் task தொடர்வதைச் சரிபார்க்கவும்.', verifyList: ['Codex CLI தொடங்கவும்.', 'சிறிய file உருவாக்கச் சொல்லவும்.', 'File-ஐ படிக்கச் செய்து content உறுதி செய்யவும்.', 'File tool இயங்காவிட்டால் model மாற்றாமல் முதலில் tool state சரிசெய்யவும்.'], oauth: '1. Model call மட்டும்: API Key mode\n2. ChatGPT plugin: API Key விட்டு OAuth login\n3. OAuth mode-ல் OPENAI_API_KEY / OPENAI_BASE_URL வைக்க வேண்டாம்\n4. CC-Switch route இயக்கப்பட்டதா பார்க்கவும்\n5. Mode மாற்றிய பின் புதிய Codex session தொடங்கவும்', oauthText: 'Plugin தேவைப்பட்டால் Codex plugin OAuth tutorial பார்க்கவும்; model call மட்டும் என்றால் API Key mode எளிது.', trouble: '1. ஒவ்வொரு புதிய session-லும் reconnect\n   - Proxy மற்றும் பழைய API Key variables சரிபார்க்கவும்\n\n2. Tool கிடைக்கவில்லை\n   - File tool state சரிபார்த்து restore பிறகு task மீண்டும் தொடங்கவும்\n\n3. 401\n   - API Key மற்றும் permissions சரிபார்க்கவும்\n\n4. 404\n   - Base URL அல்லது model name சரிபார்க்கவும்\n\n5. Plugin இல்லை\n   - API Key mode-ல் இது இயல்பு; OAuth பயன்படுத்தவும்', troubleText: 'Reconnecting 1/5 முதல் 5/5 வரை தொடர்ந்தால் connection, provider, network மற்றும் minimum request வரிசையில் சரிபார்க்கவும்.', next: ['Tool recovery tutorial பார்க்கவும்', 'OAuth plugin tutorial பார்க்கவும்', 'CC-Switch routing tutorial பார்க்கவும்', 'Integrations overview-க்கு திரும்பவும்'] },
  ne: { warnTitle: 'API Key र OAuth का उद्देश्य अलग छन्', warn: 'API Key mode ले Codex CLI लाई gpt88.cc model calls सँग जोड्छ; ChatGPT account plugin का लागि API Key login छोडेर OAuth प्रयोग गर्नुहोस्। एउटै session मा दुवै नमिसाउनुहोस्।', overview: 'Codex CLI का लागि CLI install, https://api.gpt88.cc configure र file लेख्ने सानो task बाट toolchain verify गर्नुहोस्।', prepare: '1. Codex CLI install छ\n2. gpt88.cc API Key तयार छ\n3. API Key वा OAuth mode तय छ\n4. OpenAI-compatible Base URL https://api.gpt88.cc छ\n5. hello.txt बनाउने सानो task तयार छ', install: 'Codex CLI नभए install गरेर command चल्छ कि जाँच्नुहोस्।', configure: 'API Key mode सामान्य model calls का लागि हो। base_url मा /v1 र वास्तविक supported model ID जाँच्नुहोस्।', env: 'Environment variables प्रयोग गर्न current terminal मा यो set गर्नुहोस्:', verify: 'Chat प्रश्न मात्र नगर्नुहोस्। Codex agent ले file पढ्न, लेख्न र task जारी राख्न सक्छ कि जाँच्नुहोस्।', verifyList: ['Codex CLI सुरु गर्नुहोस्।', 'सानो file बनाउन लगाउनुहोस्।', 'File पढाएर content पुष्टि गर्नुहोस्।', 'File tool नचले model नबदली पहिले tool state सुधार्नुहोस्।'], oauth: '1. Model call मात्र: API Key mode\n2. ChatGPT plugin: API Key छोडेर OAuth login\n3. OAuth mode मा OPENAI_API_KEY / OPENAI_BASE_URL नराख्नुहोस्\n4. CC-Switch route खुलेको छ कि जाँच्नुहोस्\n5. Mode बदलेपछि नयाँ Codex session सुरु गर्नुहोस्', oauthText: 'Plugin चाहिँदा Codex plugin OAuth tutorial हेर्नुहोस्; model call मात्रका लागि API Key mode सरल छ।', trouble: '1. हरेक नयाँ session मा reconnect\n   - Proxy र पुराना API Key variables जाँच्नुहोस्\n\n2. Tool उपलब्ध छैन\n   - File tool state जाँचेर restore पछि task फेरि सुरु गर्नुहोस्\n\n3. 401\n   - API Key र permissions जाँच्नुहोस्\n\n4. 404\n   - Base URL वा model name जाँच्नुहोस्\n\n5. Plugin छैन\n   - API Key mode मा यो सामान्य हो; OAuth प्रयोग गर्नुहोस्', troubleText: 'लगातार Reconnecting 1/5 देखि 5/5 भए connection, provider, network र minimum request क्रमशः जाँच्नुहोस्।', next: ['Tool recovery tutorial हेर्नुहोस्', 'OAuth plugin tutorial हेर्नुहोस्', 'CC-Switch routing tutorial हेर्नुहोस्', 'Integrations overview मा फर्कनुहोस्'] },
  si: { warnTitle: 'API Key සහ OAuth වෙනස් අරමුණු සඳහාය', warn: 'API Key mode Codex CLI gpt88.cc model calls සමඟ සම්බන්ධ කරයි; ChatGPT account plugins සඳහා API Key login අත්හැර OAuth භාවිතා කරන්න. Modes දෙක එකම session එකක මිශ්‍ර නොකරන්න.', overview: 'Codex CLI සඳහා CLI install කර https://api.gpt88.cc configure කර file ලියන කුඩා task එකකින් toolchain verify කරන්න.', prepare: '1. Codex CLI install කර ඇත\n2. gpt88.cc API Key සූදානම්\n3. API Key හෝ OAuth mode තීරණය කර ඇත\n4. OpenAI-compatible Base URL https://api.gpt88.cc\n5. hello.txt සාදන කුඩා task සූදානම්', install: 'Codex CLI නොමැති නම් install කර command එක ක්‍රියා කරන බව තහවුරු කරන්න.', configure: 'API Key mode සාමාන්‍ය model calls සඳහාය. base_url හි /v1 සහ සැබෑ supported model ID පරීක්ෂා කරන්න.', env: 'Environment variables භාවිතා කිරීමට current terminal එකේ මෙය set කරන්න:', verify: 'Chat ප්‍රශ්නයක් පමණක් නොයවන්න. Codex agent හට file කියවීම, ලිවීම සහ task දිගටම කිරීම හැකිද බලන්න.', verifyList: ['Codex CLI ආරම්භ කරන්න.', 'කුඩා file එකක් සෑදීමට කියන්න.', 'File කියවා content තහවුරු කිරීමට කියන්න.', 'File tool නොතිබේ නම් model මාරු නොකර පළමුව tool state සකසන්න.'], oauth: '1. Model call පමණක්: API Key mode\n2. ChatGPT plugin: API Key ඉවත් කර OAuth login\n3. OAuth mode තුළ OPENAI_API_KEY / OPENAI_BASE_URL නොතබන්න\n4. CC-Switch route ක්‍රියාත්මකද බලන්න\n5. Mode මාරු කළ පසු නව Codex session එකක් ආරම්භ කරන්න', oauthText: 'Plugin අවශ්‍ය නම් Codex plugin OAuth tutorial බලන්න; model call පමණක් නම් API Key mode සරලය.', trouble: '1. සෑම නව session එකකම reconnect\n   - Proxy සහ පැරණි API Key variables පරීක්ෂා කරන්න\n\n2. Tool ලබාගත නොහැක\n   - File tool state පරීක්ෂා කර restore පසු task නැවත ආරම්භ කරන්න\n\n3. 401\n   - API Key සහ permissions පරීක්ෂා කරන්න\n\n4. 404\n   - Base URL හෝ model name පරීක්ෂා කරන්න\n\n5. Plugin නොමැත\n   - API Key mode තුළ මෙය සාමාන්‍යය; OAuth භාවිතා කරන්න', troubleText: 'Reconnecting 1/5 සිට 5/5 දක්වා දිගටම නම් connection, provider, network සහ minimum request අනුපිළිවෙලින් පරීක්ෂා කරන්න.', next: ['Tool recovery tutorial බලන්න', 'OAuth plugin tutorial බලන්න', 'CC-Switch routing tutorial බලන්න', 'Integrations overview වෙත ආපසු යන්න'] },
}

export default function CodexCliIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CodexCliPageEn />
  const copy = getIntegrationCopy(locale, 'codex-cli', { title: 'Codex CLI 接入 gpt88.cc', description: 'Codex CLI 使用 gpt88.cc 的模型接入、OAuth 切换、插件限制和工具恢复教程。', intro: 'API Key 和 OAuth 是两套目标，先判断你需要模型调用还是插件能力。' })
  const sections = getIntegrationSections(locale, 'codex-cli', { overview: '先看结论', prepare: '准备工作', install: '第一步：安装 Codex CLI', configure: '第二步：配置 API Key 模式', verify: '第三步：验证文件工具', oauth: 'OAuth 与插件能力', troubleshoot: '排障清单', references: '扩展阅读', next: '下一步' })
  const body = CODEX_BODY_COPY[locale] ?? CODEX_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/dev/codex-cli"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 },
        { id: 'prepare', text: sections.prepare, level: 2 },
        { id: 'install', text: sections.install, level: 2 },
        { id: 'configure', text: sections.configure, level: 2 },
        { id: 'verify', text: sections.verify, level: 2 },
        { id: 'oauth', text: sections.oauth, level: 2 },
        { id: 'troubleshoot', text: sections.troubleshoot, level: 2 },
        { id: 'references', text: sections.references, level: 2 },
        { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="warn" title={body.warnTitle}>
        <p>{body.warn}</p>
      </Callout>

      <Callout tone="tip" title="额外参考">
        <p>
          如果你想看更系统的 Codex 使用、CLI 配置和工作流整理，可以参考{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
          。这是外部实践指南，适合作为本页的补充阅读。
        </p>
      </Callout>

      <h2 id="overview">{sections.overview}</h2>
      <p>
        {body.overview}
      </p>

      <h2 id="prepare">{sections.prepare}</h2>
      <CodeBlock lang="text" filename="checklist" code={body.prepare} />

      <h2 id="install">{sections.install}</h2>
      <p>{body.install}</p>
      <CodeBlock lang="bash" filename="install.sh" code={INSTALL} />

      <h2 id="configure">{sections.configure}</h2>
      <p>
        {body.configure}
      </p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={API_CONFIG} />
      <p>{body.env}</p>
      <CodeBlock lang="bash" filename=".envrc" code={ENV} />

      <h2 id="verify">{sections.verify}</h2>
      <p>
        {body.verify}
      </p>
      <CodeBlock lang="bash" filename="verify.sh" code={VERIFY} />
      <ol>
        {body.verifyList.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="oauth">{sections.oauth}</h2>
      <CodeBlock lang="text" filename="oauth-notes" code={body.oauth} />
      <p>{body.oauthText} <Link to="/docs/guides/codex-plugins-oauth/">Codex OAuth tutorial</Link>。</p>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />
      <p>{body.troubleText} <Link to="/docs/guides/codex-http-responses-reconnect/">HTTP / Responses reconnect guide</Link>。</p>

      <h2 id="references">{sections.references}</h2>
      <ul>
        <li>
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
          {' '}— Codex 入门、CLI 配置、工作流和实践经验整理，可作为 gpt88.cc Codex 接入教程之外的补充参考。
        </li>
      </ul>

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/guides/codex-tool-recovery/">{body.next[0]}</Link></li>
        <li><Link to="/docs/guides/codex-plugins-oauth/">{body.next[1]}</Link></li>
        <li><Link to="/docs/integrations/dev/cc-switch/">{body.next[2]}</Link></li>
        <li><Link to="/docs/integrations/">{body.next[3]}</Link></li>
      </ul>
    </DocPage>
  )
}
