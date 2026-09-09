import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'

/**
 * 文档：配置文件导出
 *
 * 文档来源：PM 任务 t-20260509-12if9n；草稿 doc-20260509-0myy76；面向用户与开发者。
 * 内容映射 PM 草稿 (config-export-doc.md) 的 8 个章节，章节标题与 Markdown 严格对齐。
 *
 * 编辑约束：
 * - 配置导出与密钥管理操作直达 Agent API Keys；泛化的说明文字不伪装成操作链接
 * - 标准 API base_url 使用 https://api.gpt88.cc，图片 / 视频直连使用 https://img.gpt88.cc
 * - 价格 / 限速 / SLA / 配额 / 模型可用性等数值不写死——以控制台为准，本文档不写死数值
 * - CC Switch 的自定义协议、桌面端调起、import URL 具体格式不写死，截图未提供，控制台行为为准
 */

const QUICK_FLOW = `1. 在控制台「API Keys」中创建或选择一个 API Key
2. 打开「配置文件导出」页面
3. 选择 API Key（默认列出你账号下的所有 Key）
4. 选择模型（如 claude-haiku-4-5-20251001 / claude-opus-4-7 / gpt-5.4 等）
5. 确认 Base URL：标准 API 使用 https://api.gpt88.cc，图片 / 视频使用 https://img.gpt88.cc
6. 选择要接入的工具 tab（Claude Code / Cursor / Python SDK …）
7a. 复制 Base URL + 复制工具对应的配置片段，粘贴到目标工具的设置中；
    或
7b. 选择 CC Switch 导入目标，点击「一键导入到 CC Switch」
8. 在目标工具中触发一次请求，确认接入成功`

const BASE_URL_RULES = `标准 API 工具 / SDK
  → Base URL：https://api.gpt88.cc
  → OpenAI / Claude / 音频等标准 API 按 endpoint 路径、请求头和请求体字段接入

图片 / 视频直连
  → Base URL：https://img.gpt88.cc
  → 图片与视频 endpoint 按对应 API 文档使用 /v1 或 /v1beta 路径

任何工具
  → 不要手动拼接第二个 /v1`

type ConfigCopy = {
  title: string
  description: string
  purpose: string
  purposeItems: string[]
  flowTitle: string
  flow: string[]
  headings: string[]
}

const CONFIG_COPY: Record<string, ConfigCopy> = {
  zh: { title: '配置文件导出', description: '把 API Key、模型和调用线路打包给 Claude Code、Cursor、Python SDK、CC Switch 等工具的一站式接入助手。', purpose: '「配置文件导出」是一站式接入助手。', purposeItems: ['已创建的 API Key；', '默认使用的模型；', '适合网络环境的调用线路；', '要接入的目标工具。'], flowTitle: '快速开始流程（推荐顺序）', flow: ['在控制台 API Keys 中创建或选择一个 API Key', '打开配置文件导出页面', '选择 API Key、模型和 Base URL', '选择目标工具 tab', '复制配置，或一键导入 CC Switch', '在目标工具中发送一次请求确认接入成功'], headings: ['这个页面是用来做什么的', '快速开始流程', '字段说明', '选择 API Key', '选择模型', '选择调用线路', 'API 接入地址', '选择工具', 'CC Switch 一键导入', 'Base URL 使用规则速查', 'CC Switch 一键导入说明', '安全与排障', '与本文档站现有内容的关系', '反馈渠道'] },
  hi: { title: 'कॉन्फ़िगरेशन फ़ाइल export', description: 'API Key, model और route को Claude Code, Cursor, Python SDK और CC Switch जैसे tools के लिए पैकेज करने वाला integration assistant।', purpose: 'Configuration export एक unified integration assistant है।', purposeItems: ['बनाई गई API Key;', 'default model;', 'network के लिए उपयुक्त route;', 'जोड़ने वाला target tool।'], flowTitle: 'त्वरित शुरुआत का क्रम', flow: ['Console के API Keys में API Key बनाएं या चुनें', 'Configuration export page खोलें', 'API Key, model और Base URL चुनें', 'Target tool tab चुनें', 'Config copy करें या CC Switch में import करें', 'Tool में request भेजकर connection जांचें'], headings: ['यह page किस काम आता है', 'त्वरित शुरुआत', 'फ़ील्ड विवरण', 'API Key चुनें', 'Model चुनें', 'Route चुनें', 'API access address', 'Tool चुनें', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security और troubleshooting', 'इस docs site से संबंध', 'Feedback channel'] },
  bn: { title: 'কনফিগারেশন ফাইল export', description: 'API Key, model ও route-কে Claude Code, Cursor, Python SDK ও CC Switch-এর জন্য প্যাকেজ করার integration assistant।', purpose: 'Configuration export একটি unified integration assistant।', purposeItems: ['তৈরি করা API Key;', 'default model;', 'network-এর উপযুক্ত route;', 'যে target tool যুক্ত করবেন।'], flowTitle: 'দ্রুত শুরুর ক্রম', flow: ['Console-এর API Keys-এ API Key তৈরি বা বাছুন', 'Configuration export page খুলুন', 'API Key, model ও Base URL বাছুন', 'Target tool tab বাছুন', 'Config copy বা CC Switch-এ import করুন', 'Tool-এ request পাঠিয়ে connection যাচাই করুন'], headings: ['এই page কী কাজে লাগে', 'দ্রুত শুরু', 'ফিল্ডের বিবরণ', 'API Key বাছুন', 'Model বাছুন', 'Route বাছুন', 'API access address', 'Tool বাছুন', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security ও troubleshooting', 'এই docs site-এর সঙ্গে সম্পর্ক', 'Feedback channel'] },
  ur: { title: 'Configuration file export', description: 'API Key، model اور route کو Claude Code، Cursor، Python SDK اور CC Switch جیسے tools کے لیے پیک کرنے والا integration assistant۔', purpose: 'Configuration export ایک unified integration assistant ہے۔', purposeItems: ['بنائی ہوئی API Key؛', 'default model؛', 'network کے لیے مناسب route؛', 'جو target tool جوڑنا ہے۔'], flowTitle: 'تیز آغاز کی ترتیب', flow: ['Console کے API Keys میں API Key بنائیں یا منتخب کریں', 'Configuration export page کھولیں', 'API Key، model اور Base URL منتخب کریں', 'Target tool tab منتخب کریں', 'Config copy کریں یا CC Switch میں import کریں', 'Tool میں request چلا کر connection چیک کریں'], headings: ['یہ page کس کام کا ہے', 'تیز آغاز', 'فیلڈ کی تفصیل', 'API Key منتخب کریں', 'Model منتخب کریں', 'Route منتخب کریں', 'API access address', 'Tool منتخب کریں', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security اور troubleshooting', 'اس docs site سے تعلق', 'Feedback channel'] },
  ta: { title: 'Configuration file export', description: 'API Key, model மற்றும் route-ஐ Claude Code, Cursor, Python SDK மற்றும் CC Switch போன்ற tools-க்கு தொகுக்கும் integration assistant.', purpose: 'Configuration export ஒரு unified integration assistant.', purposeItems: ['உருவாக்கிய API Key;', 'default model;', 'network-க்கு ஏற்ற route;', 'இணைக்க வேண்டிய target tool.'], flowTitle: 'விரைவான தொடக்க வரிசை', flow: ['Console API Keys-ல் API Key உருவாக்கவும் அல்லது தேர்ந்தெடுக்கவும்', 'Configuration export page-ஐத் திறக்கவும்', 'API Key, model மற்றும் Base URL தேர்ந்தெடுக்கவும்', 'Target tool tab தேர்ந்தெடுக்கவும்', 'Config-ஐ copy செய்யவும் அல்லது CC Switch-ல் import செய்யவும்', 'Tool-ல் request இயக்கி connection சரிபார்க்கவும்'], headings: ['இந்த page எதற்காக', 'விரைவான தொடக்கம்', 'புல விவரம்', 'API Key தேர்வு', 'Model தேர்வு', 'Route தேர்வு', 'API access address', 'Tool தேர்வு', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security மற்றும் troubleshooting', 'இந்த docs site உடன் தொடர்பு', 'Feedback channel'] },
  ne: { title: 'Configuration file export', description: 'API Key, model र route लाई Claude Code, Cursor, Python SDK र CC Switch जस्ता tools का लागि प्याक गर्ने integration assistant।', purpose: 'Configuration export unified integration assistant हो।', purposeItems: ['बनाइएको API Key;', 'default model;', 'network का लागि उपयुक्त route;', 'जोड्नुपर्ने target tool।'], flowTitle: 'छिटो सुरु गर्ने क्रम', flow: ['Console को API Keys मा API Key बनाउनुहोस् वा छान्नुहोस्', 'Configuration export page खोल्नुहोस्', 'API Key, model र Base URL छान्नुहोस्', 'Target tool tab छान्नुहोस्', 'Config copy वा CC Switch मा import गर्नुहोस्', 'Tool मा request चलाएर connection जाँच्नुहोस्'], headings: ['यो page केका लागि हो', 'छिटो सुरु', 'Field विवरण', 'API Key छान्नुहोस्', 'Model छान्नुहोस्', 'Route छान्नुहोस्', 'API access address', 'Tool छान्नुहोस्', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security र troubleshooting', 'यो docs site सँग सम्बन्ध', 'Feedback channel'] },
  si: { title: 'Configuration file export', description: 'API Key, model සහ route Claude Code, Cursor, Python SDK සහ CC Switch වැනි tools සඳහා පැකේජ කරන integration assistant එකකි.', purpose: 'Configuration export unified integration assistant එකකි.', purposeItems: ['සාදා ඇති API Key;', 'default model;', 'network එකට සුදුසු route;', 'සම්බන්ධ කළ යුතු target tool.'], flowTitle: 'ඉක්මන් ආරම්භක අනුපිළිවෙල', flow: ['Console API Keys තුළ API Key එකක් සාදන්න හෝ තෝරන්න', 'Configuration export page එක විවෘත කරන්න', 'API Key, model සහ Base URL තෝරන්න', 'Target tool tab එක තෝරන්න', 'Config copy කරන්න හෝ CC Switch වෙත import කරන්න', 'Tool එකේ request එකක් ධාවනය කර connection පරීක්ෂා කරන්න'], headings: ['මෙම page එක කුමක් සඳහාද', 'ඉක්මන් ආරම්භය', 'ක්ෂේත්‍ර විස්තර', 'API Key තෝරන්න', 'Model තෝරන්න', 'Route තෝරන්න', 'API access address', 'Tool තෝරන්න', 'CC Switch one-click import', 'Base URL quick rules', 'CC Switch import details', 'Security සහ troubleshooting', 'මෙම docs site සමඟ සම්බන්ධය', 'Feedback channel'] },
}

const BASE_URL_RULES_COPY: Record<string, string> = {
  zh: BASE_URL_RULES,
  hi: `मानक API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio जैसे standard API endpoint path, headers और body fields के अनुसार चलें

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → संबंधित API docs के अनुसार /v1 या /v1beta endpoint उपयोग करें

कोई भी tool
  → दूसरा /v1 manually न जोड़ें`,
  bn: `সাধারণ API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio-এর মতো standard API endpoint path, header ও body field অনুযায়ী ব্যবহার করুন

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → সংশ্লিষ্ট API docs অনুযায়ী /v1 বা /v1beta endpoint ব্যবহার করুন

যে কোনো tool
  → দ্বিতীয় /v1 নিজে যোগ করবেন না`,
  ur: `معیاری API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio جیسے standard API کو endpoint path، headers اور body fields کے مطابق استعمال کریں

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → متعلقہ API docs کے مطابق /v1 یا /v1beta endpoint استعمال کریں

کوئی بھی tool
  → دوسرا /v1 خود نہ جوڑیں`,
  ta: `நிலையான API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio போன்ற standard API-ஐ endpoint path, headers மற்றும் body fields படி பயன்படுத்தவும்

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → தொடர்புடைய API docs படி /v1 அல்லது /v1beta endpoint பயன்படுத்தவும்

எந்த tool ஆனாலும்
  → இரண்டாவது /v1-ஐ கைமுறையாகச் சேர்க்க வேண்டாம்`,
  ne: `मानक API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio जस्ता standard API लाई endpoint path, headers र body fields अनुसार प्रयोग गर्नुहोस्

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → सम्बन्धित API docs अनुसार /v1 वा /v1beta endpoint प्रयोग गर्नुहोस्

कुनै पनि tool
  → अर्को /v1 manually नथप्नुहोस्`,
  si: `සම්මත API tool / SDK
  → Base URL: https://api.gpt88.cc
  → OpenAI / Claude / audio වැනි standard API endpoint path, headers සහ body fields අනුව භාවිතා කරන්න

Image / video direct access
  → Base URL: https://img.gpt88.cc
  → අදාළ API docs අනුව /v1 හෝ /v1beta endpoint භාවිතා කරන්න

ඕනෑම tool එකක්
  → දෙවන /v1 එකක් අතින් එකතු නොකරන්න`,
}

const FIELD_COPY: Record<string, { model: string[]; routeIntro: string; routeItems: string[] }> = {
  zh: { model: ['该字段决定生成配置中的默认模型。', '默认模型可以是任意可用的聊天模型。', '切换模型后必须重新生成或重新导入，旧配置不会自动更新。', '运行时也可以在工具 UI 或请求参数中临时覆盖 model。'], routeIntro: '标准 API 与图片 / 视频直连分别使用网站首页展示的 Base URL：', routeItems: ['API Key、模型和鉴权方式在所有工具中保持同一套配置。', '协议差异通过 endpoint 路径、请求头和请求体字段处理。', '排查连接问题时，先确认接口类型对应了正确的 Base URL，再检查 API Key、模型、endpoint 和请求格式。'] },
  hi: { model: ['यह field generated config का default model तय करता है।', 'Default model कोई भी उपलब्ध chat model हो सकता है।', 'Model बदलने के बाद config फिर generate या import करें; पुराना config अपने-आप update नहीं होता।', 'Runtime में tool UI या request parameter से model अस्थायी रूप से बदला जा सकता है।'], routeIntro: 'Standard API और image / video direct access के लिए अलग Base URL इस्तेमाल करें:', routeItems: ['सभी tools में API Key, model और authentication configuration एक रखें।', 'Protocol अंतर endpoint path, headers और body fields से संभालें।', 'Connection समस्या में पहले सही Base URL, फिर API Key, model, endpoint और request format जांचें।'] },
  bn: { model: ['এই field generated config-এর default model ঠিক করে।', 'Default model যেকোনো উপলব্ধ chat model হতে পারে।', 'Model বদলালে config আবার generate বা import করুন; পুরোনো config নিজে update হবে না।', 'Runtime-এ tool UI বা request parameter দিয়ে model অস্থায়ীভাবে বদলানো যায়।'], routeIntro: 'Standard API এবং image / video direct access-এর জন্য আলাদা Base URL ব্যবহার করুন:', routeItems: ['সব tool-এ API Key, model ও authentication configuration একই রাখুন।', 'Protocol-এর পার্থক্য endpoint path, header ও body field দিয়ে সামলান।', 'Connection সমস্যায় আগে Base URL, তারপর API Key, model, endpoint ও request format দেখুন।'] },
  ur: { model: ['یہ field generated config کا default model طے کرتا ہے۔', 'Default model کوئی بھی دستیاب chat model ہو سکتا ہے۔', 'Model بدلنے کے بعد config دوبارہ generate یا import کریں؛ پرانا config خود update نہیں ہوگا۔', 'Runtime میں tool UI یا request parameter سے model عارضی طور پر بدلا جا سکتا ہے۔'], routeIntro: 'Standard API اور image / video direct access کے لیے الگ Base URL استعمال کریں:', routeItems: ['تمام tools میں API Key، model اور authentication configuration ایک رکھیں۔', 'Protocol کا فرق endpoint path، headers اور body fields سے handle کریں۔', 'Connection مسئلے میں پہلے Base URL، پھر API Key، model، endpoint اور request format چیک کریں۔'] },
  ta: { model: ['இந்த field generated config-ன் default model-ஐ நிர்ணயிக்கிறது.', 'Default model கிடைக்கும் எந்த chat model-ஆகவும் இருக்கலாம்.', 'Model மாற்றிய பிறகு config-ஐ மீண்டும் generate அல்லது import செய்யவும்; பழைய config தானாக மாறாது.', 'Runtime-ல் tool UI அல்லது request parameter மூலம் model-ஐ தற்காலிகமாக மாற்றலாம்.'], routeIntro: 'Standard API மற்றும் image / video direct access-க்கு வேறு Base URL பயன்படுத்தவும்:', routeItems: ['அனைத்து tools-லும் API Key, model மற்றும் authentication configuration ஒன்றாக இருக்க வேண்டும்.', 'Protocol வேறுபாடுகளை endpoint path, headers மற்றும் body fields மூலம் கையாளவும்.', 'Connection சிக்கலில் முதலில் Base URL, பின்னர் API Key, model, endpoint மற்றும் request format சரிபார்க்கவும்.'] },
  ne: { model: ['यो field ले generated config को default model तय गर्छ।', 'Default model उपलब्ध कुनै पनि chat model हुन सक्छ।', 'Model बदलेपछि config फेरि generate वा import गर्नुहोस्; पुरानो config आफैं update हुँदैन।', 'Runtime मा tool UI वा request parameter बाट model अस्थायी रूपमा बदल्न सकिन्छ।'], routeIntro: 'Standard API र image / video direct access का लागि अलग Base URL प्रयोग गर्नुहोस्:', routeItems: ['सबै tools मा API Key, model र authentication configuration एउटै राख्नुहोस्।', 'Protocol फरक endpoint path, headers र body fields बाट सम्हाल्नुहोस्।', 'Connection समस्या हुँदा पहिले Base URL, त्यसपछि API Key, model, endpoint र request format जाँच्नुहोस्।'] },
  si: { model: ['මෙම field එක generated config එකේ default model එක තීරණය කරයි.', 'Default model එක ලබාගත හැකි ඕනෑම chat model එකක් විය හැක.', 'Model එක වෙනස් කළ පසු config එක නැවත generate හෝ import කරන්න; පැරණි config එක ස්වයංක්‍රීයව update නොවේ.', 'Runtime එකේ tool UI හෝ request parameter මඟින් model එක තාවකාලිකව වෙනස් කළ හැක.'], routeIntro: 'Standard API සහ image / video direct access සඳහා වෙන වෙනම Base URL භාවිතා කරන්න:', routeItems: ['සියලු tools තුළ API Key, model සහ authentication configuration එකම තබන්න.', 'Protocol වෙනස්කම් endpoint path, headers සහ body fields මඟින් හසුරුවන්න.', 'Connection ගැටලුවකදී පළමුව Base URL, පසුව API Key, model, endpoint සහ request format පරීක්ෂා කරන්න.'] },
}

const ADDRESS_COPY: Record<string, { intro: string; headers: string[]; scenarios: string[]; notes: string[] }> = {
  zh: { intro: '页面按接口类型显示首页中的官方 Base URL，协议风格还会影响 endpoint 和配置字段：', headers: ['风格', '路径形态', '适用场景'], scenarios: ['OpenAI 风格 SDK / 工具', 'Anthropic 风格 SDK / 工具', '图片生成、视频生成和 Gemini 原生图片接口'], notes: ['标准文本与 Claude 协议共用 https://api.gpt88.cc；媒体请求使用 https://img.gpt88.cc。', '拼错 Base URL 或路径可能出现 404、unknown route /v1/v1 或 unknown route /messages；先检查 endpoint、请求头和请求体字段。', '点击地址或复制按钮即可复制，工具地址会随调用线路和工具 tab 联动。'] },
  hi: { intro: 'Page interface type के अनुसार official Base URL दिखाता है; protocol style endpoint और config fields को भी बदलता है:', headers: ['style', 'path', 'उपयोग'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation, video generation और Gemini native image API'], notes: ['Text और Claude protocol के लिए https://api.gpt88.cc; media के लिए https://img.gpt88.cc।', 'गलत Base URL या path से 404, unknown route /v1/v1 या unknown route /messages आ सकता है; पहले endpoint, headers और body fields जांचें।', 'Address या copy button दबाकर copy करें; tool address route और tab के साथ बदलता है।'] },
  bn: { intro: 'Page interface type অনুযায়ী official Base URL দেখায়; protocol style endpoint ও config field-ও বদলায়:', headers: ['style', 'path', 'ব্যবহার'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation, video generation ও Gemini native image API'], notes: ['Text ও Claude protocol-এর জন্য https://api.gpt88.cc; media-এর জন্য https://img.gpt88.cc।', 'ভুল Base URL বা path-এ 404, unknown route /v1/v1 বা unknown route /messages আসতে পারে; endpoint, header ও body field আগে দেখুন।', 'Address বা copy button দিয়ে copy করুন; route ও tab অনুযায়ী tool address বদলায়।'] },
  ur: { intro: 'Page interface type کے مطابق official Base URL دکھاتا ہے؛ protocol style endpoint اور config fields کو بھی متاثر کرتا ہے:', headers: ['style', 'path', 'استعمال'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation، video generation اور Gemini native image API'], notes: ['Text اور Claude protocol کے لیے https://api.gpt88.cc؛ media کے لیے https://img.gpt88.cc۔', 'غلط Base URL یا path سے 404، unknown route /v1/v1 یا unknown route /messages آسکتا ہے؛ endpoint، headers اور body fields چیک کریں۔', 'Address یا copy button سے copy کریں؛ tool address route اور tab کے ساتھ بدلتا ہے۔'] },
  ta: { intro: 'Page interface type-க்கு ஏற்ப official Base URL-ஐ காட்டும்; protocol style endpoint மற்றும் config fields-ஐயும் மாற்றும்:', headers: ['style', 'path', 'பயன்பாடு'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation, video generation மற்றும் Gemini native image API'], notes: ['Text மற்றும் Claude protocol-க்கு https://api.gpt88.cc; media-க்கு https://img.gpt88.cc.', 'தவறான Base URL அல்லது path 404, unknown route /v1/v1 அல்லது unknown route /messages ஏற்படுத்தலாம்; endpoint, headers மற்றும் body fields சரிபார்க்கவும்.', 'Address அல்லது copy button மூலம் copy செய்யலாம்; tool address route மற்றும் tab உடன் மாறும்.'] },
  ne: { intro: 'Page ले interface type अनुसार official Base URL देखाउँछ; protocol style ले endpoint र config fields पनि बदल्छ:', headers: ['style', 'path', 'प्रयोग'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation, video generation र Gemini native image API'], notes: ['Text र Claude protocol का लागि https://api.gpt88.cc; media का लागि https://img.gpt88.cc।', 'गलत Base URL वा path ले 404, unknown route /v1/v1 वा unknown route /messages ल्याउन सक्छ; endpoint, headers र body fields जाँच्नुहोस्।', 'Address वा copy button बाट copy गर्नुहोस्; tool address route र tab सँग बदलिन्छ।'] },
  si: { intro: 'Page එක interface type අනුව official Base URL පෙන්වයි; protocol style එක endpoint සහ config fields ද වෙනස් කරයි:', headers: ['style', 'path', 'භාවිතය'], scenarios: ['OpenAI style SDK / tool', 'Anthropic style SDK / tool', 'image generation, video generation සහ Gemini native image API'], notes: ['Text සහ Claude protocol සඳහා https://api.gpt88.cc; media සඳහා https://img.gpt88.cc.', 'වැරදි Base URL හෝ path එකක් 404, unknown route /v1/v1 හෝ unknown route /messages ඇති කළ හැක; endpoint, headers සහ body fields පරීක්ෂා කරන්න.', 'Address හෝ copy button මඟින් copy කරන්න; tool address එක route සහ tab සමඟ වෙනස් වේ.'] },
}

type ToolCopy = { intro: string; headers: string[]; rows: string[][]; switchText: string; note: string }
const TOOL_COPY: Record<string, ToolCopy> = {
  zh: { intro: '页面以 tab 形式列出常见的接入目标，每个 tab 会生成对应工具能识别的配置：', headers: ['工具 tab', '配置形态', '备注'], rows: [['Claude Code', 'Claude 风格配置（包含 baseURL、apiKey、defaultModel）', 'Anthropic SDK 风格'], ['Hermes', '工具自有配置文件', '按 OpenAI 兼容协议接入'], ['OpenClaw', 'Anthropic 风格配置', '配合 Anthropic Base URL 使用'], ['OpenCode', 'OpenAI 风格配置', '配合 OpenAI Base URL 使用'], ['Cursor', 'Cursor 设置中的 Custom OpenAI Base URL + 模型映射', 'Settings → Models → Custom'], ['cURL', '一段可直接 curl 的命令片段', '验证连通性最快的方式'], ['Python SDK', 'OpenAI 或 Anthropic 客户端初始化代码片段', '按所选工具自动选择 SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript 客户端示例', '配合 Anthropic Base URL 使用']], switchText: '切换 tab 时，页面下方的代码块或配置片段会自动重写；右侧「复制」按钮也会随之更新内容。', note: '上表中各工具的配置形态基于截图与通用习惯；具体字段以控制台实际生成的配置为准。' },
  hi: { intro: 'Page tab के रूप में common integration targets दिखाता है; हर tab उस tool के लिए पहचाने जाने योग्य config बनाता है:', headers: ['Tool tab', 'Config form', 'Note'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool का अपना config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL के साथ'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL के साथ'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'सीधा चलने वाला curl command', 'सबसे तेज connectivity check'], ['Python SDK', 'OpenAI या Anthropic client initialization', 'Selected tool के अनुसार SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL के साथ']], switchText: 'Tab बदलने पर नीचे का code या config snippet अपने-आप बदलता है और Copy button भी update होता है।', note: 'Config form screenshot और सामान्य usage पर आधारित है; exact fields console द्वारा generated config से लें।' },
  bn: { intro: 'Page tab আকারে সাধারণ integration target দেখায়; প্রতিটি tab সংশ্লিষ্ট tool-এর উপযোগী config তৈরি করে:', headers: ['Tool tab', 'Config form', 'নোট'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool-এর নিজস্ব config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL-এর সঙ্গে'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL-এর সঙ্গে'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'সরাসরি চালানো যায় এমন curl command', 'দ্রুততম connectivity check'], ['Python SDK', 'OpenAI বা Anthropic client initialization', 'নির্বাচিত tool অনুযায়ী SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL-এর সঙ্গে']], switchText: 'Tab বদলালে নিচের code বা config snippet নিজে update হয় এবং Copy button-ও বদলে যায়।', note: 'Config form screenshot ও সাধারণ usage-এর ভিত্তিতে; exact field console-এর generated config অনুযায়ী নিন।' },
  ur: { intro: 'Page tab کی صورت میں عام integration targets دکھاتا ہے؛ ہر tab متعلقہ tool کے قابلِ فہم config بناتا ہے:', headers: ['Tool tab', 'Config form', 'نوٹ'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool کی اپنی config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL کے ساتھ'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL کے ساتھ'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'براہِ راست چلنے والا curl command', 'تیز connectivity check'], ['Python SDK', 'OpenAI یا Anthropic client initialization', 'منتخب tool کے مطابق SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL کے ساتھ']], switchText: 'Tab بدلنے پر نیچے کا code یا config snippet خود rewrite ہوتا ہے اور Copy button بھی update ہوتا ہے۔', note: 'Config form screenshot اور عام usage پر مبنی ہے؛ exact fields console کے generated config سے لیں۔' },
  ta: { intro: 'Page tab வடிவில் பொதுவான integration targets-ஐ காட்டும்; ஒவ்வொரு tab-மும் அந்த tool புரிந்துகொள்ளும் config-ஐ உருவாக்கும்:', headers: ['Tool tab', 'Config form', 'குறிப்பு'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool-ன் சொந்த config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL உடன்'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL உடன்'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'நேரடியாக இயக்கக்கூடிய curl command', 'வேகமான connectivity check'], ['Python SDK', 'OpenAI அல்லது Anthropic client initialization', 'தேர்ந்தெடுத்த tool-க்கு ஏற்ப SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL உடன்']], switchText: 'Tab மாற்றும்போது கீழுள்ள code அல்லது config snippet தானாக மாறும்; Copy button-மும் update ஆகும்.', note: 'Config form screenshot மற்றும் பொதுவான usage அடிப்படையில்; exact fields-ஐ console generated config-ல் சரிபார்க்கவும்.' },
  ne: { intro: 'Page ले tab का रूपमा सामान्य integration target देखाउँछ; प्रत्येक tab ले सम्बन्धित tool ले बुझ्ने config बनाउँछ:', headers: ['Tool tab', 'Config form', 'नोट'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool को आफ्नै config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL सँग'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL सँग'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'सिधै चलाउन मिल्ने curl command', 'छिटो connectivity check'], ['Python SDK', 'OpenAI वा Anthropic client initialization', 'छानिएको tool अनुसार SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL सँग']], switchText: 'Tab बदल्दा तलको code वा config snippet आफैं बदलिन्छ र Copy button पनि update हुन्छ।', note: 'Config form screenshot र सामान्य usage मा आधारित छ; exact fields console को generated config बाट लिनुहोस्।' },
  si: { intro: 'Page එක tab ලෙස සාමාන්‍ය integration targets පෙන්වයි; සෑම tab එකක්ම අදාළ tool එකට හඳුනාගත හැකි config එකක් සාදයි:', headers: ['Tool tab', 'Config form', 'සටහන'], rows: [['Claude Code', 'Claude-style config (baseURL, apiKey, defaultModel)', 'Anthropic SDK style'], ['Hermes', 'Tool එකේම config file', 'OpenAI-compatible protocol'], ['OpenClaw', 'Anthropic-style config', 'Anthropic Base URL සමඟ'], ['OpenCode', 'OpenAI-style config', 'OpenAI Base URL සමඟ'], ['Cursor', 'Custom OpenAI Base URL + model mapping', 'Settings → Models → Custom'], ['cURL', 'සෘජුව ධාවනය කළ හැකි curl command', 'වේගවත් connectivity check'], ['Python SDK', 'OpenAI හෝ Anthropic client initialization', 'තෝරාගත් tool අනුව SDK'], ['Anthropic SDK', 'Anthropic Python / TypeScript example', 'Anthropic Base URL සමඟ']], switchText: 'Tab මාරු කළ විට පහළ code හෝ config snippet ස්වයංක්‍රීයව වෙනස් වන අතර Copy button එකද update වේ.', note: 'Config form එක screenshot සහ සාමාන්‍ය usage මත පදනම්ය; exact fields console generated config එකෙන් තහවුරු කරන්න.' },
}

type CcSwitchCopy = { intro: string; useCases: string[]; headers: string[]; rows: string[][]; note: string; fallback: string[]; checklistTitle: string; checklist: string[] }
const CC_SWITCH_COPY: Record<string, CcSwitchCopy> = {
  zh: { intro: 'CC Switch 是统一管理多套上游 API 配置的桌面客户端。本节让你跳过手动复制粘贴：', useCases: ['你已经在桌面安装了 CC Switch，并经常在 Claude Code、Codex、OpenCode 之间切换。', '你不想手动维护每个工具的 ~/.config/... 文件。', '你希望 API Key、Base URL、默认模型在多个工具之间保持一致。'], headers: ['导入目标', 'CC Switch 中生成的配置类型'], rows: [['Codex', 'OpenAI 风格 Base URL；OpenAI Compatible 调用'], ['Claude Code', 'Anthropic 风格 Base URL；Claude CLI 风格调用'], ['OpenCode', 'OpenAI 风格 Base URL；OpenCode 兼容'], ['OpenClaw', 'Anthropic 风格 Base URL；OpenClaw 兼容']], note: '实际生成的字段以 CC Switch 的最新版本为准；本表只描述大致风格归属。', fallback: ['浏览器报「无法访问该协议 / Custom protocol blocked」→ 改用「复制导入链接」，在 CC Switch 内手动粘贴。', 'CC Switch 收到后未弹出 → 检查是否已登录、版本是否过旧；必要时退出重启。', '导入后调用失败 → 检查 API Key 是否有效、模型是否可用、线路是否被重置。'], checklistTitle: '导入前的校验清单', checklist: ['API Key 已选中且未禁用', '模型字段为目标应用支持的模型', '调用线路与目标应用所在网络匹配', '工具 tab 与导入目标一致'] },
  hi: { intro: 'CC Switch कई upstream API configs को manage करने वाला desktop client है। यह section manual copy-paste को छोड़ने देता है:', useCases: ['Desktop पर CC Switch install है और Claude Code, Codex, OpenCode के बीच अक्सर switch करते हैं।', 'हर tool की ~/.config/... file को manually maintain नहीं करना चाहते।', 'API Key, Base URL और default model को सभी tools में समान रखना चाहते हैं।'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL; OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL; Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL; OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL; OpenClaw compatible']], note: 'Exact fields CC Switch के current version पर निर्भर हैं; table केवल broad style बताती है।', fallback: ['Browser में protocol blocked हो → Copy import link करें और CC Switch में paste करें।', 'CC Switch न खुले → login, version और restart जांचें।', 'Import के बाद call fail हो → API Key, model availability और route जांचें।'], checklistTitle: 'Import से पहले checklist', checklist: ['API Key selected और enabled है', 'Model target app के साथ compatible है', 'Route target app के network से match करता है', 'Tool tab और import target एक जैसे हैं'] },
  bn: { intro: 'CC Switch একাধিক upstream API config পরিচালনার desktop client। এই section manual copy-paste বাদ দিয়ে import করতে দেয়:', useCases: ['Desktop-এ CC Switch ইনস্টল আছে এবং Claude Code, Codex, OpenCode-এর মধ্যে বদলান।', 'প্রতিটি tool-এর ~/.config/... file হাতে maintain করতে চান না।', 'সব tool-এ API Key, Base URL ও default model এক রাখতে চান।'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL; OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL; Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL; OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL; OpenClaw compatible']], note: 'Exact field CC Switch-এর বর্তমান version অনুযায়ী; table শুধু broad style দেখায়।', fallback: ['Browser protocol blocked হলে Copy import link করে CC Switch-এ paste করুন।', 'CC Switch না খুললে login, version ও restart দেখুন।', 'Import-এর পর call fail হলে API Key, model availability ও route পরীক্ষা করুন।'], checklistTitle: 'Import-এর আগে checklist', checklist: ['API Key নির্বাচিত এবং enabled', 'Model target app-এর সঙ্গে compatible', 'Route target app-এর network-এর সঙ্গে মেলে', 'Tool tab ও import target একই'] },
  ur: { intro: 'CC Switch متعدد upstream API configs کو manage کرنے والا desktop client ہے۔ یہ section manual copy-paste کے بغیر import کی سہولت دیتا ہے:', useCases: ['Desktop پر CC Switch نصب ہے اور Claude Code، Codex، OpenCode کے درمیان switch کرتے ہیں۔', 'ہر tool کی ~/.config/... file دستی طور پر maintain نہیں کرنا چاہتے۔', 'تمام tools میں API Key، Base URL اور default model یکساں رکھنا چاہتے ہیں۔'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL؛ OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL؛ Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL؛ OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL؛ OpenClaw compatible']], note: 'Exact fields CC Switch کے موجودہ version پر منحصر ہیں؛ table صرف broad style بتاتی ہے۔', fallback: ['Browser protocol blocked ہو تو Copy import link کر کے CC Switch میں paste کریں۔', 'CC Switch نہ کھلے تو login، version اور restart چیک کریں۔', 'Import کے بعد call fail ہو تو API Key، model availability اور route چیک کریں۔'], checklistTitle: 'Import سے پہلے checklist', checklist: ['API Key منتخب اور enabled ہے', 'Model target app کے ساتھ compatible ہے', 'Route target app کے network سے match کرتا ہے', 'Tool tab اور import target ایک جیسے ہیں'] },
  ta: { intro: 'CC Switch பல upstream API configs-ஐ நிர்வகிக்கும் desktop client. இந்த section manual copy-paste இல்லாமல் import செய்ய உதவும்:', useCases: ['Desktop-ல் CC Switch install செய்து Claude Code, Codex, OpenCode இடையே மாறுகிறீர்கள்.', 'ஒவ்வொரு tool-ன் ~/.config/... file-ஐ கைமுறையாக maintain செய்ய விரும்பவில்லை.', 'அனைத்து tools-லும் API Key, Base URL, default model ஒன்றாக இருக்க வேண்டும்.'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL; OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL; Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL; OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL; OpenClaw compatible']], note: 'Exact fields CC Switch-ன் current version-ஐப் பொறுத்தது; table broad style-ஐ மட்டும் காட்டுகிறது.', fallback: ['Browser protocol blocked என்றால் Copy import link செய்து CC Switch-ல் paste செய்யவும்.', 'CC Switch திறக்காவிட்டால் login, version மற்றும் restart சரிபார்க்கவும்.', 'Import பிறகு call fail என்றால் API Key, model availability மற்றும் route சரிபார்க்கவும்.'], checklistTitle: 'Import முன் checklist', checklist: ['API Key தேர்ந்தெடுக்கப்பட்டு enabled ஆக உள்ளது', 'Model target app உடன் compatible', 'Route target app network-உடன் பொருந்துகிறது', 'Tool tab மற்றும் import target ஒரேது'] },
  ne: { intro: 'CC Switch धेरै upstream API config व्यवस्थापन गर्ने desktop client हो। यो section ले manual copy-paste बिना import गर्न दिन्छ:', useCases: ['Desktop मा CC Switch install छ र Claude Code, Codex, OpenCode बीच switch गर्नुहुन्छ।', 'हरेक tool को ~/.config/... file manually maintain गर्न चाहनुहुन्न।', 'सबै tools मा API Key, Base URL र default model एउटै राख्न चाहनुहुन्छ।'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL; OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL; Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL; OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL; OpenClaw compatible']], note: 'Exact fields CC Switch को current version मा निर्भर हुन्छन्; table ले broad style मात्र देखाउँछ।', fallback: ['Browser protocol blocked भए Copy import link गरेर CC Switch मा paste गर्नुहोस्।', 'CC Switch नखुले login, version र restart जाँच्नुहोस्।', 'Import पछि call fail भए API Key, model availability र route जाँच्नुहोस्।'], checklistTitle: 'Import अघि checklist', checklist: ['API Key छानिएको र enabled छ', 'Model target app सँग compatible छ', 'Route target app को network सँग मिल्छ', 'Tool tab र import target उस्तै छन्'] },
  si: { intro: 'CC Switch යනු upstream API configs කිහිපයක් කළමනාකරණය කරන desktop client එකකි. මෙම section එක manual copy-paste නැතිව import කිරීමට උපකාරී වේ:', useCases: ['Desktop එකේ CC Switch install කර Claude Code, Codex, OpenCode අතර switch කරයි.', 'එක් එක් tool එකේ ~/.config/... file අතින් maintain කිරීමට අවශ්‍ය නැත.', 'සියලු tools තුළ API Key, Base URL සහ default model එකම තබා ගැනීමට අවශ්‍යය.'], headers: ['Import target', 'Generated config type'], rows: [['Codex', 'OpenAI-style Base URL; OpenAI Compatible call'], ['Claude Code', 'Anthropic-style Base URL; Claude CLI call'], ['OpenCode', 'OpenAI-style Base URL; OpenCode compatible'], ['OpenClaw', 'Anthropic-style Base URL; OpenClaw compatible']], note: 'Exact fields CC Switch current version මත රඳා පවතී; table එක broad style පමණක් පෙන්වයි.', fallback: ['Browser protocol blocked නම් Copy import link කර CC Switch තුළ paste කරන්න.', 'CC Switch නොඇරේ නම් login, version සහ restart පරීක්ෂා කරන්න.', 'Import පසු call fail නම් API Key, model availability සහ route පරීක්ෂා කරන්න.'], checklistTitle: 'Import කිරීමට පෙර checklist', checklist: ['API Key තෝරා enabled කර ඇත', 'Model target app සමඟ compatible වේ', 'Route target app network එක සමඟ ගැලපේ', 'Tool tab සහ import target එකම වේ'] },
}

type SecurityCopy = { key: string[]; route: string[]; issueHeaders: string[]; issues: string[][]; priceTitle: string; price: string; relationItems: string[]; relationIntro: string; feedback: string[] }
const SECURITY_COPY: Record<string, SecurityCopy> = {
  zh: { key: ['不要把 Key 放进 Git 仓库；本地用 .env、~/.aws/credentials 等机制隔离。', '不要在公开论坛、博客、群聊、视频教程中展示完整 Key。', '导出的配置文件本身含完整 Key，等同于密码：传输用私聊或加密通道，存档用受限目录。', '怀疑 Key 泄漏时，进入控制台禁用旧 Key、生成新 Key，并在所有工具里更新。'], route: ['标准 API 使用 https://api.gpt88.cc，图片 / 视频直连使用 https://img.gpt88.cc。', '请求失败或超时时，先检查 endpoint、API Key、模型和请求格式，不要用更换 Base URL 规避问题。', '生产环境固定使用同一个 Base URL，避免配置漂移。'], issueHeaders: ['问题', '可能原因', '处理'], issues: [['401 Unauthorized', 'API Key 错误、被禁用或复制不完整', '重新复制或生成 Key，确认 Authorization: Bearer sk-...'], ['404 Not Found / unknown route', 'Base URL、endpoint 或协议格式不匹配', '选择匹配的 Base URL，再检查 endpoint、headers 和 body'], ['429', '用量配额或上游限流', '查看控制台用量，降低并发并增加退避重试'], ['网络超时 / Connection reset', '当前线路不稳定', '固定匹配接口类型的 Base URL，重新检查 Key、模型和请求格式'], ['model not found', '模型 ID 错误或 Key 未开放该模型', '重新选择模型，并确认控制台中的可用模型范围'], ['CC Switch 无反应', '自定义协议未注册或浏览器拦截', '复制导入链接，在 CC Switch 内粘贴']], priceTitle: '关于价格 / 限速 / SLA', price: '每分钟请求数、单 Key 月度上限、并发上限和 SLA 等具体数值以登录后的 Agent 控制台为准，本页面不写死数字。', relationItems: ['快速开始：拿到 Key 后编写第一行代码。', 'API Reference：查看每个接口的参数和响应。', '本文档：把 Key、模型和线路打包给具体工具。'], relationIntro: '三者互为补充，第一次接入建议按 配置文件导出 → 快速开始 → API Reference 的顺序阅读。', feedback: ['若文档与 Agent 控制台行为不符，请通过控制台反馈入口提交，并附上线路、工具 tab、期望与实际结果。', '文档站的纠错和补充建议，可在 Agent 控制台或仓库 issue 中提出。'] },
  hi: { key: ['Key को Git repository में न रखें; local में .env या ~/.aws/credentials से अलग रखें।', 'Public forum, blog, group chat या video tutorial में पूरा Key न दिखाएं।', 'Exported config में पूरा Key होता है और यह password जैसा है; encrypted channel और restricted directory इस्तेमाल करें।', 'Key leak का संदेह हो तो console में पुराना Key disable, नया Key generate और सभी tools update करें।'], route: ['Standard API के लिए https://api.gpt88.cc और image/video के लिए https://img.gpt88.cc इस्तेमाल करें।', 'Failure या timeout में पहले endpoint, API Key, model और request format जांचें; Base URL बदलकर समस्या न छिपाएं।', 'Production में एक ही Base URL fixed रखें।'], issueHeaders: ['समस्या', 'संभावित कारण', 'उपाय'], issues: [['401 Unauthorized', 'API Key गलत, disabled या अधूरा copied', 'Key फिर copy/generate करें और Authorization header जांचें'], ['404 / unknown route', 'Base URL, endpoint या protocol mismatch', 'सही Base URL चुनकर endpoint, headers और body जांचें'], ['429', 'Quota या upstream rate limit', 'Usage देखें, concurrency घटाएं और retry backoff लगाएं'], ['Network timeout / reset', 'Current route unstable', 'Matching Base URL और credentials फिर जांचें'], ['model not found', 'Model ID गलत या Key पर उपलब्ध नहीं', 'Model फिर चुनें और console availability जांचें'], ['CC Switch silent', 'Custom protocol missing या blocked', 'Import link copy करके CC Switch में paste करें']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute, Key limits, concurrency और SLA जैसे values logged-in Agent console में देखें; इस page में numbers hard-code नहीं हैं।', relationItems: ['Quick start: Key के बाद पहला code request।', 'API Reference: हर endpoint के parameters और response।', 'यह page: Key, model और route को tool config में पैक करना।'], relationIntro: 'पहली integration के लिए Configuration export → Quick start → API Reference क्रम अपनाएं।', feedback: ['Console behavior अलग हो तो feedback में route, tool tab, expected और actual result भेजें।', 'Docs correction या supplement को console या repository issue में भेजें।'] },
  bn: { key: ['Key Git repository-তে রাখবেন না; local-এ .env বা ~/.aws/credentials দিয়ে আলাদা রাখুন।', 'Public forum, blog, group chat বা video tutorial-এ সম্পূর্ণ Key দেখাবেন না।', 'Exported config-এ সম্পূর্ণ Key থাকে, তাই এটি password-এর মতো; encrypted channel ও restricted directory ব্যবহার করুন।', 'Key leak সন্দেহ হলে console-এ পুরোনো Key disable, নতুন Key generate এবং সব tool update করুন।'], route: ['Standard API-তে https://api.gpt88.cc এবং image/video-তে https://img.gpt88.cc ব্যবহার করুন।', 'Failure বা timeout হলে আগে endpoint, API Key, model ও request format দেখুন; Base URL বদলে সমস্যা লুকাবেন না।', 'Production-এ একটি Base URL স্থির রাখুন।'], issueHeaders: ['সমস্যা', 'সম্ভাব্য কারণ', 'সমাধান'], issues: [['401 Unauthorized', 'API Key ভুল, disabled বা অসম্পূর্ণ copy', 'Key আবার copy/generate করে Authorization header দেখুন'], ['404 / unknown route', 'Base URL, endpoint বা protocol mismatch', 'সঠিক Base URL বেছে endpoint, header ও body দেখুন'], ['429', 'Quota বা upstream rate limit', 'Usage দেখুন, concurrency কমান এবং retry backoff দিন'], ['Network timeout / reset', 'বর্তমান route স্থিতিশীল নয়', 'মিল থাকা Base URL ও credentials আবার দেখুন'], ['model not found', 'Model ID ভুল বা Key-তে খোলা নয়', 'Model আবার বাছুন এবং console availability দেখুন'], ['CC Switch নীরব', 'Custom protocol নেই বা blocked', 'Import link copy করে CC Switch-এ paste করুন']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute, Key limit, concurrency ও SLA-এর নির্দিষ্ট value logged-in Agent console-এ দেখুন; এই page-এ number hard-code করা নেই।', relationItems: ['Quick start: Key পাওয়ার পর প্রথম code request।', 'API Reference: প্রতিটি endpoint-এর parameter ও response।', 'এই page: Key, model ও route-কে tool config-এ প্যাক করা।'], relationIntro: 'প্রথম integration-এ Configuration export → Quick start → API Reference ক্রম ব্যবহার করুন।', feedback: ['Console behavior আলাদা হলে route, tool tab, expected ও actual result দিয়ে feedback দিন।', 'Docs correction বা supplement console অথবা repository issue-এ জানান।'] },
  ur: { key: ['Key کو Git repository میں نہ رکھیں؛ local میں .env یا ~/.aws/credentials سے الگ رکھیں۔', 'Public forum، blog، group chat یا video tutorial میں مکمل Key نہ دکھائیں۔', 'Exported config میں مکمل Key ہوتا ہے، اس لیے اسے password سمجھیں؛ encrypted channel اور restricted directory استعمال کریں۔', 'Leak کا شک ہو تو console میں پرانا Key disable، نیا generate اور تمام tools update کریں۔'], route: ['Standard API کے لیے https://api.gpt88.cc اور image/video کے لیے https://img.gpt88.cc استعمال کریں۔', 'Failure یا timeout میں پہلے endpoint، API Key، model اور request format دیکھیں؛ Base URL بدل کر مسئلہ نہ چھپائیں۔', 'Production میں ایک Base URL مستقل رکھیں۔'], issueHeaders: ['مسئلہ', 'ممکنہ وجہ', 'حل'], issues: [['401 Unauthorized', 'API Key غلط، disabled یا نامکمل copy', 'Key دوبارہ copy/generate کریں اور Authorization header دیکھیں'], ['404 / unknown route', 'Base URL، endpoint یا protocol mismatch', 'درست Base URL منتخب کر کے endpoint، headers اور body چیک کریں'], ['429', 'Quota یا upstream rate limit', 'Usage دیکھیں، concurrency کم کریں اور retry backoff لگائیں'], ['Network timeout / reset', 'موجودہ route غیر مستحکم', 'متعلقہ Base URL اور credentials دوبارہ چیک کریں'], ['model not found', 'Model ID غلط یا Key کے لیے دستیاب نہیں', 'Model دوبارہ منتخب کریں اور console availability دیکھیں'], ['CC Switch خاموش', 'Custom protocol موجود نہیں یا blocked', 'Import link copy کر کے CC Switch میں paste کریں']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute، Key limits، concurrency اور SLA کی values logged-in Agent console میں دیکھیں؛ اس page میں numbers hard-code نہیں ہیں۔', relationItems: ['Quick start: Key کے بعد پہلی code request۔', 'API Reference: ہر endpoint کے parameters اور response۔', 'یہ page: Key، model اور route کو tool config میں pack کرنا۔'], relationIntro: 'پہلی integration کے لیے Configuration export → Quick start → API Reference ترتیب اپنائیں۔', feedback: ['Console behavior مختلف ہو تو route، tool tab، expected اور actual result کے ساتھ feedback دیں۔', 'Docs correction یا supplement console یا repository issue میں دیں۔'] },
  ta: { key: ['Key-ஐ Git repository-ல் வைக்க வேண்டாம்; local-ல் .env அல்லது ~/.aws/credentials மூலம் பிரிக்கவும்.', 'Public forum, blog, group chat அல்லது video tutorial-ல் முழு Key-ஐ காட்ட வேண்டாம்.', 'Exported config-ல் முழு Key இருக்கும்; password போல கையாள்ந்து encrypted channel மற்றும் restricted directory பயன்படுத்தவும்.', 'Leak சந்தேகம் இருந்தால் console-ல் பழைய Key-ஐ disable செய்து புதியதை உருவாக்கி எல்லா tools-லும் update செய்யவும்.'], route: ['Standard API-க்கு https://api.gpt88.cc, image/video-க்கு https://img.gpt88.cc பயன்படுத்தவும்.', 'Failure அல்லது timeout வந்தால் endpoint, API Key, model மற்றும் request format முதலில் சரிபார்க்கவும்; Base URL மாற்றி பிரச்சினையை மறைக்க வேண்டாம்.', 'Production-ல் ஒரே Base URL-ஐ நிலையாக வைத்திருக்கவும்.'], issueHeaders: ['சிக்கல்', 'சாத்திய காரணம்', 'தீர்வு'], issues: [['401 Unauthorized', 'API Key தவறு, disabled அல்லது முழுமையற்ற copy', 'Key-ஐ மீண்டும் copy/generate செய்து Authorization header சரிபார்க்கவும்'], ['404 / unknown route', 'Base URL, endpoint அல்லது protocol mismatch', 'சரியான Base URL தேர்ந்தெடுத்து endpoint, headers, body சரிபார்க்கவும்'], ['429', 'Quota அல்லது upstream rate limit', 'Usage பார்த்து concurrency குறைத்து retry backoff சேர்க்கவும்'], ['Network timeout / reset', 'தற்போதைய route நிலையாக இல்லை', 'பொருந்தும் Base URL மற்றும் credentials மீண்டும் சரிபார்க்கவும்'], ['model not found', 'Model ID தவறு அல்லது Key-க்கு திறக்கப்படவில்லை', 'Model மீண்டும் தேர்ந்தெடுத்து console availability பார்க்கவும்'], ['CC Switch அமைதியாக உள்ளது', 'Custom protocol இல்லை அல்லது blocked', 'Import link copy செய்து CC Switch-ல் paste செய்யவும்']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute, Key limits, concurrency மற்றும் SLA values logged-in Agent console-ல் பார்க்கவும்; இந்த page-ல் numbers hard-code செய்யப்படவில்லை.', relationItems: ['Quick start: Key பெற்ற பின் முதல் code request.', 'API Reference: ஒவ்வொரு endpoint-ன் parameters மற்றும் response.', 'இந்த page: Key, model, route-ஐ tool config-ல் pack செய்வது.'], relationIntro: 'முதல் integration-க்கு Configuration export → Quick start → API Reference வரிசையைப் பயன்படுத்தவும்.', feedback: ['Console behavior வேறுபட்டால் route, tool tab, expected மற்றும் actual result உடன் feedback அனுப்பவும்.', 'Docs correction அல்லது supplement-ஐ console அல்லது repository issue-ல் தெரிவிக்கவும்.'] },
  ne: { key: ['Key लाई Git repository मा नराख्नुहोस्; local मा .env वा ~/.aws/credentials बाट अलग राख्नुहोस्।', 'Public forum, blog, group chat वा video tutorial मा पूरा Key नदेखाउनुहोस्।', 'Exported config मा पूरा Key हुन्छ; password जस्तै मानेर encrypted channel र restricted directory प्रयोग गर्नुहोस्।', 'Leak को शंका भए console मा पुरानो Key disable, नयाँ generate र सबै tools update गर्नुहोस्।'], route: ['Standard API का लागि https://api.gpt88.cc र image/video का लागि https://img.gpt88.cc प्रयोग गर्नुहोस्।', 'Failure वा timeout मा पहिले endpoint, API Key, model र request format जाँच्नुहोस्; Base URL बदलेर समस्या नछोप्नुहोस्।', 'Production मा एउटै Base URL स्थिर राख्नुहोस्।'], issueHeaders: ['समस्या', 'सम्भावित कारण', 'समाधान'], issues: [['401 Unauthorized', 'API Key गलत, disabled वा अधुरो copy', 'Key फेरि copy/generate गरी Authorization header जाँच्नुहोस्'], ['404 / unknown route', 'Base URL, endpoint वा protocol mismatch', 'सही Base URL छानेर endpoint, headers र body जाँच्नुहोस्'], ['429', 'Quota वा upstream rate limit', 'Usage हेरी concurrency घटाउनुहोस् र retry backoff थप्नुहोस्'], ['Network timeout / reset', 'हालको route अस्थिर', 'मिल्दो Base URL र credentials फेरि जाँच्नुहोस्'], ['model not found', 'Model ID गलत वा Key का लागि उपलब्ध छैन', 'Model फेरि छानेर console availability जाँच्नुहोस्'], ['CC Switch प्रतिक्रिया छैन', 'Custom protocol छैन वा blocked', 'Import link copy गरेर CC Switch मा paste गर्नुहोस्']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute, Key limits, concurrency र SLA values logged-in Agent console मा हेर्नुहोस्; यस page मा numbers hard-code गरिएको छैन।', relationItems: ['Quick start: Key पछि पहिलो code request।', 'API Reference: प्रत्येक endpoint का parameters र response।', 'यो page: Key, model र route लाई tool config मा pack गर्ने।'], relationIntro: 'पहिलो integration का लागि Configuration export → Quick start → API Reference क्रम प्रयोग गर्नुहोस्।', feedback: ['Console behavior फरक भए route, tool tab, expected र actual result सहित feedback पठाउनुहोस्।', 'Docs correction वा supplement console वा repository issue मा दिनुहोस्।'] },
  si: { key: ['Key එක Git repository තුළ තබන්න එපා; local එකේ .env හෝ ~/.aws/credentials මඟින් වෙන් කර තබන්න.', 'Public forum, blog, group chat හෝ video tutorial තුළ සම්පූර්ණ Key එක පෙන්වන්න එපා.', 'Exported config එකේ සම්පූර්ණ Key තිබේ; password එකක් ලෙස සලකා encrypted channel සහ restricted directory භාවිතා කරන්න.', 'Leak එකක් සැක නම් console තුළ පැරණි Key disable කර නව එකක් සාදා සියලු tools update කරන්න.'], route: ['Standard API සඳහා https://api.gpt88.cc සහ image/video සඳහා https://img.gpt88.cc භාවිතා කරන්න.', 'Failure හෝ timeout එකකදී endpoint, API Key, model සහ request format පළමුව පරීක්ෂා කරන්න; Base URL මාරු කර ගැටලුව සඟවන්න එපා.', 'Production තුළ එකම Base URL එක ස්ථිරව තබන්න.'], issueHeaders: ['ගැටලුව', 'හැකි හේතුව', 'විසඳුම'], issues: [['401 Unauthorized', 'API Key වැරදි, disabled හෝ අසම්පූර්ණ copy', 'Key නැවත copy/generate කර Authorization header පරීක්ෂා කරන්න'], ['404 / unknown route', 'Base URL, endpoint හෝ protocol mismatch', 'ගැළපෙන Base URL තෝරා endpoint, headers සහ body පරීක්ෂා කරන්න'], ['429', 'Quota හෝ upstream rate limit', 'Usage බලමින් concurrency අඩු කර retry backoff එක් කරන්න'], ['Network timeout / reset', 'වත්මන් route ස්ථාවර නැත', 'ගැළපෙන Base URL සහ credentials නැවත පරීක්ෂා කරන්න'], ['model not found', 'Model ID වැරදි හෝ Key සඳහා විවෘත නැත', 'Model නැවත තෝරා console availability බලන්න'], ['CC Switch නිහඬයි', 'Custom protocol නැත හෝ blocked', 'Import link copy කර CC Switch තුළ paste කරන්න']], priceTitle: 'Price / rate limit / SLA', price: 'Requests per minute, Key limits, concurrency සහ SLA values logged-in Agent console තුළ බලන්න; මෙම page එකේ numbers hard-code කර නැත.', relationItems: ['Quick start: Key ලැබුණු පසු පළමු code request.', 'API Reference: එක් එක් endpoint හි parameters සහ response.', 'මෙම page: Key, model සහ route tool config එකකට pack කිරීම.'], relationIntro: 'පළමු integration සඳහා Configuration export → Quick start → API Reference අනුපිළිවෙල භාවිතා කරන්න.', feedback: ['Console behavior වෙනස් නම් route, tool tab, expected සහ actual result සමඟ feedback යවන්න.', 'Docs correction හෝ supplement console හෝ repository issue තුළ ඉදිරිපත් කරන්න.'] },
}

/* ──────────────────────────────────────────────────────────────────
 * 表格：调用线路 / Base URL 风格 / 工具 tab / 导入目标差异 / 排障
 *
 * 用纯 Tailwind 实现深色文档站表格，移动端外层加 overflow-x-auto 横向滚动。
 * 不重新封装表格组件——本页是单次使用，复用现有 prose 体系下的 markdown table 风格。
 * ────────────────────────────────────────────────────────────────── */

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ConfigExportPage() {
  const { locale } = useLocale()
  const copy = CONFIG_COPY[locale] ?? CONFIG_COPY.zh
  const fieldCopy = FIELD_COPY[locale] ?? FIELD_COPY.zh
  const addressCopy = ADDRESS_COPY[locale] ?? ADDRESS_COPY.zh
  const toolCopy = TOOL_COPY[locale] ?? TOOL_COPY.zh
  const ccSwitchCopy = CC_SWITCH_COPY[locale] ?? CC_SWITCH_COPY.zh
  const securityCopy = SECURITY_COPY[locale] ?? SECURITY_COPY.zh
  const configEntryUrl = buildAgentActivationUrl({
    locale,
    surface: 'config_export_entry',
    intent: 'api_access',
    destination: 'keys',
  })
  const keyRotationUrl = buildAgentActivationUrl({
    locale,
    surface: 'config_export_rotation',
    intent: 'api_access',
    destination: 'keys',
  })
  const keySecurityUrl = buildAgentActivationUrl({
    locale,
    surface: 'config_export_security',
    intent: 'api_access',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/guides/config-export"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'purpose', text: copy.headings[0], level: 2 }, { id: 'flow', text: copy.headings[1], level: 2 }, { id: 'fields', text: copy.headings[2], level: 2 }, { id: 'field-key', text: copy.headings[3], level: 3 }, { id: 'field-model', text: copy.headings[4], level: 3 }, { id: 'field-route', text: copy.headings[5], level: 3 }, { id: 'field-baseurl', text: copy.headings[6], level: 3 }, { id: 'field-tool', text: copy.headings[7], level: 3 }, { id: 'field-cc-switch', text: copy.headings[8], level: 3 }, { id: 'baseurl-rules', text: copy.headings[9], level: 2 }, { id: 'cc-switch', text: copy.headings[10], level: 2 }, { id: 'security', text: copy.headings[11], level: 2 }, { id: 'relations', text: copy.headings[12], level: 2 }, { id: 'feedback', text: copy.headings[13], level: 2 },
      ]}
    >
      <Callout tone="info" title="文档定位">
        <p>
          本文档面向 gpt88.cc API 用户与开发者，说明
          {' '}
          <a
            href={configEntryUrl}
            target="_blank"
            rel="noreferrer"
          >
            gpt88.cc 控制台
          </a>{' '}
          内「配置文件导出」页面的完整使用方法。具体菜单路径、字段顺序与按钮文案以控制台为准。
        </p>
      </Callout>

      {/* ── 1. 这个页面是用来做什么的 ─────────────────────────────── */}
      <h2 id="purpose">{copy.headings[0]}</h2>
      <p>{copy.purpose} 它把以下四个变量组合成可以直接复制粘贴或一键导入的配置：</p>
      <ul>{copy.purposeItems.map(item => <li key={item}>{item}</li>)}</ul>

      <p>页面会按以上四项动态生成：</p>
      <ul>
        <li>
          推荐使用的 <strong>Base URL</strong>（OpenAI 兼容版与 Anthropic / Claude 兼容版）
        </li>
        <li>
          每个工具对应的 <strong>配置片段</strong> 或 <strong>导入说明</strong>
        </li>
        <li>
          <strong>CC Switch 一键导入</strong> 入口，直接把生成的应用配置写入 CC Switch（支持 Codex、Claude Code、OpenCode、OpenClaw 等目标）
        </li>
      </ul>

      <p>
        如果你只是想快速试一次接口调用，参见站内文档{' '}
        <Link to="/docs/quickstart/">快速开始</Link>。
        如果你要把 gpt88.cc 接到本地工具或团队 IDE，使用本页面更省事。
      </p>

      {/* ── 2. 快速开始流程 ─────────────────────────────────────── */}
      <h2 id="flow">{copy.flowTitle}</h2>
      <ol>{copy.flow.map(step => <li key={step}>{step}</li>)}</ol>
      <CodeBlock lang="text" filename="recommended order" code={QUICK_FLOW} />

      {/* ── 3. 字段说明 ──────────────────────────────────────────── */}
      <h2 id="fields">字段说明（按页面顺序）</h2>

      <h3 id="field-key">3.1 选择 API Key</h3>
      <ul>
        <li>下拉列出当前账号下所有可用的 API Key（如 <code>ClaudeCode（sk-F9flH0n…）</code>）。</li>
        <li>
          列表里只显示 Key 的名称和首尾几位字符，<strong>完整 Key 不会在前端裸露</strong>；
          导出生成的配置文件中会写入完整 Key。
        </li>
      </ul>
      <p><strong>安全提醒</strong>：</p>
      <ul>
        <li>不要把生成的配置文件、截图或日志直接发到群聊 / 公共代码仓库 / 第三方截图工具。</li>
        <li>在做技术分享或写文档时，请把 Key 中段替换为 <code>***</code>，例如 <code>sk-F9flH0n***ABC1</code>。</li>
        <li>
          如果误泄漏了 Key，请立刻在{' '}
          <a href={keyRotationUrl} target="_blank" rel="noreferrer">
            控制台
          </a>{' '}
          「API Keys」中<strong>禁用并重新生成</strong>。
        </li>
        {/*
         * Key 的权限范围、用量上限、可调用模型范围以控制台为准，本文档不写死具体数值。
         */}
        <li>Key 的权限范围、用量上限、可调用模型范围以控制台显示为准，本文档不写死具体数值。</li>
      </ul>

      <h3 id="field-model">3.2 选择模型</h3>
      <ul>{fieldCopy.model.map(item => <li key={item}>{item}</li>)}</ul>

      <h3 id="field-route">3.3 统一 API 入口</h3>
      <p>{fieldCopy.routeIntro}</p>
      <p><code>https://api.gpt88.cc</code>（标准 API）</p>
      <p><code>https://img.gpt88.cc</code>（图片 / 视频直连）</p>
      <ul>{fieldCopy.routeItems.map(item => <li key={item}>{item}</li>)}</ul>

      <h3 id="field-baseurl">3.4 API 接入地址</h3>
      <p>{addressCopy.intro}</p>
      <DocTable
        headers={addressCopy.headers}
        rows={[
          [
            <strong key="b1-1">OpenAI 兼容 Base URL</strong>,
            <code key="b1-2">https://api.gpt88.cc</code>,
            addressCopy.scenarios[0],
          ],
          [
            <strong key="b2-1">Anthropic / Claude Base URL</strong>,
            <code key="b2-2">https://api.gpt88.cc</code>,
            addressCopy.scenarios[1],
          ],
          [
            <strong key="b3-1">图片 / 视频 Base URL</strong>,
            <code key="b3-2">https://img.gpt88.cc</code>,
            addressCopy.scenarios[2],
          ],
        ]}
      />
      <ul>{addressCopy.notes.map(note => <li key={note}>{note}</li>)}</ul>

      <h3 id="field-tool">3.5 选择工具</h3>
      <p>{toolCopy.intro}</p>
      <DocTable
        headers={toolCopy.headers}
        rows={toolCopy.rows.map(row => [<strong key={row[0]}>{row[0]}</strong>, row[1], row[2]])}
      />
      <p>{toolCopy.switchText}</p>
      <Callout tone="info">
        <p>{toolCopy.note}</p>
      </Callout>

      <h3 id="field-cc-switch">3.6 CC Switch 一键导入</h3>
      <p>{ccSwitchCopy.intro}</p>
      <ul>
        <li><strong>导入目标</strong>：Codex、Claude Code、OpenCode、OpenClaw 等。</li>
        <li><strong>一键导入到 CC Switch</strong>：浏览器通过自定义协议调起本地客户端并写入配置。</li>
        <li><strong>复制导入链接</strong>：无法调起客户端时，复制链接并在 CC Switch 内手动粘贴。</li>
      </ul>
      <p><strong>{ccSwitchCopy.checklistTitle}</strong>：</p>
      <ol>{ccSwitchCopy.checklist.map(item => <li key={item}>{item}</li>)}</ol>

      {/* ── 4. Base URL 使用规则速查 ────────────────────────────── */}
      <h2 id="baseurl-rules">Base URL 使用规则速查</h2>
      <CodeBlock lang="text" filename="rules of thumb" code={BASE_URL_RULES_COPY[locale] ?? BASE_URL_RULES} />
      <p>
        如果你既要在 OpenAI 风格工具中接入，又要在 Anthropic 风格工具中接入，
        可以使用同一个 API Key，只是 Base URL 路径形态不同。
      </p>

      {/* ── 5. CC Switch 一键导入说明 ───────────────────────────── */}
      <h2 id="cc-switch">CC Switch 一键导入说明</h2>

      <h3>5.1 适用场景</h3>
      <ul>{ccSwitchCopy.useCases.map(item => <li key={item}>{item}</li>)}</ul>

      <h3>5.2 导入目标差异</h3>
      <DocTable
        headers={ccSwitchCopy.headers}
        rows={ccSwitchCopy.rows.map(row => [<strong key={row[0]}>{row[0]}</strong>, row[1]])}
      />
      <p>{ccSwitchCopy.note}</p>

      <h3>5.3 一键导入失败时的兜底</h3>
      <ul>{ccSwitchCopy.fallback.map(item => <li key={item}>{item}</li>)}</ul>

      {/* ── 6. 安全与排障 ───────────────────────────────────────── */}
      <h2 id="security">安全与排障</h2>

      <h3>6.1 API Key 安全</h3>
      <ul>{securityCopy.key.map((item, i) => <li key={item}>{i === 3 ? <>{item.replace('控制台', '')}{' '}<a href={keySecurityUrl} target="_blank" rel="noreferrer">控制台</a>{' '}</> : item}</li>)}</ul>

      <h3>6.2 线路选择建议</h3>
      <ul>{securityCopy.route.map(item => <li key={item}>{item}</li>)}</ul>

      <h3>6.3 常见问题与处理</h3>
      <DocTable
        headers={securityCopy.issueHeaders}
        rows={securityCopy.issues.map(row => [<strong key={row[0]}>{row[0]}</strong>, row[1], row[2]])}
      />

      <Callout tone="warn" title={securityCopy.priceTitle}>
        {/*
         * 这些数值（每分钟请求数、单 Key 月度上限、并发上限、SLA 等）
         * 都以控制台为准，本文档不写死任何数字以避免与控制台不同步。
         */}
        <p>{securityCopy.price}</p>
      </Callout>

      {/* ── 7. 与现有文档的关系 ────────────────────────────────── */}
      <h2 id="relations">与本文档站现有内容的关系</h2>
      <ul>
        <li><Link to="/docs/quickstart/">{securityCopy.relationItems[0]}</Link></li>
        <li><Link to="/docs/api/chat-completions/">{securityCopy.relationItems[1]}</Link></li>
        <li>{securityCopy.relationItems[2]}</li>
      </ul>
      <p>{securityCopy.relationIntro}</p>

      {/* ── 8. 反馈渠道 ─────────────────────────────────────────── */}
      <h2 id="feedback">反馈渠道</h2>
      <ul>{securityCopy.feedback.map(item => <li key={item}>{item}</li>)}</ul>
    </DocPage>
  )
}
