import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import CcSwitchPageEn from '../../../en/CcSwitchPageEn'

const PREPARE = `1. 已安装 CC-Switch
2. 已安装需要被路由的工具，例如 Codex CLI / Claude Code / Cursor
3. 已准备 gpt88.cc API Key
4. 已确认要配置 OpenAI 兼容路由还是 Claude 兼容路由
5. 已知道插件能力需要 OAuth，模型中转使用 API Key`

const ROUTES = `OpenAI 兼容路由
Name: gpt88-openai
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude 兼容路由
Name: gpt88-claude
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: claude-sonnet-4-6`

const FLOW = `1. 打开 CC-Switch
2. 进入 Routes / Providers / API 路由配置
3. 新建 gpt88-openai 路由
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 填一个默认聊天模型
7. 保存路由
8. 启用路由
9. 重启目标工具并验证`

const OAUTH_FLOW = `1. 如果目标是 Codex / ChatGPT 插件能力，先退出 API Key 登录
2. 清理 OPENAI_API_KEY / OPENAI_BASE_URL 等环境变量
3. 在工具里重新走 OAuth 登录
4. 确认 CC-Switch 路由开启
5. 重新开一个干净会话测试插件是否可见`

const VERIFY = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "测试 CC-Switch 路由"}]
  }'`

const TROUBLESHOOTING = `1. 工具仍然走旧地址
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
   - 再排查 CC-Switch 转发层`

const CC_BODY_COPY: Record<string, { title: string; info: string; overview: string[]; prepare: string; routesIntro: string; routes: string; flow: string; oauth: string; oauthFlow: string; verify: string; trouble: string; next: string[] }> = {
  zh: { title: 'CC-Switch 的价值', info: 'CC-Switch 适合在多个工具之间统一切换中转站路由。模型调用走 gpt88.cc API Key；插件能力仍然要看目标工具是否使用 OAuth 登录。', overview: ['你有多个开发工具，需要统一切换 gpt88.cc 路由。', '你想把 OpenAI 兼容和 Claude 兼容配置分开管理。', '你需要在 API Key 模型调用和 OAuth 插件能力之间切换。'], prepare: PREPARE, routesIntro: '先按协议拆成两条路由。不要把 /v1 同时填到所有协议里。', routes: ROUTES, flow: FLOW, oauth: '如果你是为 Codex 插件、ChatGPT 账号能力或类似 OAuth 能力配置，重点不是模型 Base URL，而是登录模式是否正确。', oauthFlow: OAUTH_FLOW, verify: '先绕过工具层，用最小请求验证 gpt88.cc 本身可用，再回到 CC-Switch。', trouble: TROUBLESHOOTING, next: ['查看插件 OAuth 教程', '查看 Codex CLI 接入教程', '返回集成总览'] },
  hi: { title: 'CC-Switch का उपयोग', info: 'CC-Switch कई tools में proxy route बदलना आसान बनाता है। Model calls gpt88.cc API Key से होते हैं; plugins के लिए target tool का OAuth login जरूरी है।', overview: ['कई development tools में एक ही gpt88.cc route बदलना है।', 'OpenAI और Claude compatible configs अलग रखना है।', 'API Key model calls और OAuth plugins के बीच switch करना है।'], prepare: '1. CC-Switch install है\n2. Codex CLI / Claude Code / Cursor जैसे tools install हैं\n3. gpt88.cc API Key तैयार है\n4. OpenAI या Claude compatible route चुन लिया है\n5. Plugin के लिए OAuth और model proxy के लिए API Key समझ लिया है', routesIntro: 'Protocol के अनुसार दो routes रखें। सभी protocols में /v1 एक साथ न भरें।', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch खोलें\n2. Routes / Providers / API route settings खोलें\n3. gpt88-openai route बनाएं\n4. Base URL https://api.gpt88.cc रखें\n5. Console का API Key भरें\n6. Default chat model भरें\n7. Save और enable करें\n8. Target tool restart करें और verify करें', oauth: 'Codex plugin या ChatGPT account capability के लिए Base URL से अधिक login mode महत्वपूर्ण है।', oauthFlow: '1. Plugin चाहिए तो API Key login से बाहर निकलें\n2. OPENAI_API_KEY / OPENAI_BASE_URL साफ करें\n3. Tool में OAuth login करें\n4. CC-Switch route चालू है जांचें\n5. नया clean session शुरू करें', verify: 'पहले tool layer को bypass करके minimum request से gpt88.cc verify करें, फिर CC-Switch पर लौटें।', trouble: '1. Tool पुराना address उपयोग करता है\n   - Route enabled और tool restart जांचें\n\n2. 404\n   - OpenAI route में /v1 जांचें\n   - Claude route में https://api.gpt88.cc रखें\n\n3. Plugin नहीं\n   - API Key mode में यह अपेक्षित है; OAuth करें\n\n4. Route enabled फिर भी fail\n   - curl से सीधे gpt88.cc जांचें\n   - फिर CC-Switch forwarding देखें', next: ['Plugin OAuth tutorial देखें', 'Codex CLI tutorial देखें', 'Integrations overview पर लौटें'] },
  bn: { title: 'CC-Switch-এর উপকারিতা', info: 'CC-Switch একাধিক tool-এ proxy route বদলানো সহজ করে। Model call gpt88.cc API Key দিয়ে হয়; plugin-এর জন্য target tool-এ OAuth login দরকার।', overview: ['একাধিক development tool-এ একই gpt88.cc route বদলাতে চান।', 'OpenAI ও Claude compatible config আলাদা রাখতে চান।', 'API Key model call ও OAuth plugin-এর মধ্যে switch করতে চান।'], prepare: '1. CC-Switch install আছে\n2. Codex CLI / Claude Code / Cursor install আছে\n3. gpt88.cc API Key প্রস্তুত\n4. OpenAI বা Claude compatible route ঠিক করা\n5. Plugin-এর জন্য OAuth এবং model proxy-এর জন্য API Key বুঝে নেওয়া', routesIntro: 'Protocol অনুযায়ী দুটি route রাখুন। সব protocol-এ একসঙ্গে /v1 দেবেন না।', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch খুলুন\n2. Routes / Providers / API route settings খুলুন\n3. gpt88-openai route তৈরি করুন\n4. Base URL https://api.gpt88.cc দিন\n5. Console-এর API Key দিন\n6. Default chat model দিন\n7. Save ও enable করুন\n8. Target tool restart করে verify করুন', oauth: 'Codex plugin বা ChatGPT account capability-এর ক্ষেত্রে Base URL-এর চেয়ে login mode গুরুত্বপূর্ণ।', oauthFlow: '1. Plugin চাইলে API Key login ছাড়ুন\n2. OPENAI_API_KEY / OPENAI_BASE_URL সরান\n3. Tool-এ OAuth login করুন\n4. CC-Switch route চালু আছে দেখুন\n5. নতুন clean session চালু করুন', verify: 'আগে tool layer বাদ দিয়ে minimum request-এ gpt88.cc যাচাই করুন, পরে CC-Switch-এ ফিরুন।', trouble: '1. Tool পুরোনো address ব্যবহার করছে\n   - Route enabled ও tool restart দেখুন\n\n2. 404\n   - OpenAI route-এ /v1 দেখুন\n   - Claude route-এ https://api.gpt88.cc রাখুন\n\n3. Plugin নেই\n   - API Key mode-এ এটি স্বাভাবিক; OAuth ব্যবহার করুন\n\n4. Route enabled তবু fail\n   - curl দিয়ে gpt88.cc সরাসরি দেখুন\n   - তারপর CC-Switch forwarding পরীক্ষা করুন', next: ['Plugin OAuth tutorial দেখুন', 'Codex CLI tutorial দেখুন', 'Integrations overview-এ ফিরুন'] },
  ur: { title: 'CC-Switch کا فائدہ', info: 'CC-Switch کئی tools میں proxy route بدلنے کے لیے ہے۔ Model calls gpt88.cc API Key سے ہوتی ہیں؛ plugins کے لیے target tool میں OAuth login چاہیے۔', overview: ['کئی development tools میں ایک gpt88.cc route بدلنا ہے۔', 'OpenAI اور Claude compatible configs الگ رکھنی ہیں۔', 'API Key model calls اور OAuth plugins کے درمیان switch کرنا ہے۔'], prepare: '1. CC-Switch install ہے\n2. Codex CLI / Claude Code / Cursor install ہیں\n3. gpt88.cc API Key تیار ہے\n4. OpenAI یا Claude compatible route منتخب ہے\n5. Plugin کے لیے OAuth اور model proxy کے لیے API Key واضح ہے', routesIntro: 'Protocol کے مطابق دو routes رکھیں۔ ہر protocol میں ایک ساتھ /v1 نہ بھریں۔', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch کھولیں\n2. Routes / Providers / API route settings کھولیں\n3. gpt88-openai route بنائیں\n4. Base URL https://api.gpt88.cc رکھیں\n5. Console کا API Key درج کریں\n6. Default chat model درج کریں\n7. Save اور enable کریں\n8. Target tool restart کر کے verify کریں', oauth: 'Codex plugin یا ChatGPT account capability کے لیے Base URL سے زیادہ login mode اہم ہے۔', oauthFlow: '1. Plugin چاہیے تو API Key login چھوڑیں\n2. OPENAI_API_KEY / OPENAI_BASE_URL صاف کریں\n3. Tool میں OAuth login کریں\n4. CC-Switch route آن ہونے کی تصدیق کریں\n5. نیا clean session شروع کریں', verify: 'پہلے tool layer bypass کر کے minimum request سے gpt88.cc verify کریں، پھر CC-Switch پر واپس آئیں۔', trouble: '1. Tool پرانا address استعمال کر رہا ہے\n   - Route enabled اور tool restart چیک کریں\n\n2. 404\n   - OpenAI route میں /v1 چیک کریں\n   - Claude route میں https://api.gpt88.cc رکھیں\n\n3. Plugin دستیاب نہیں\n   - API Key mode میں یہ متوقع ہے؛ OAuth استعمال کریں\n\n4. Route enabled مگر fail\n   - curl سے gpt88.cc براہِ راست چیک کریں\n   - پھر CC-Switch forwarding دیکھیں', next: ['Plugin OAuth tutorial دیکھیں', 'Codex CLI tutorial دیکھیں', 'Integrations overview پر واپس جائیں'] },
  ta: { title: 'CC-Switch-ன் பயன்', info: 'CC-Switch பல tools இடையே proxy route மாற்ற உதவும். Model calls gpt88.cc API Key மூலம்; plugins-க்கு target tool-ல் OAuth login தேவை.', overview: ['பல development tools-ல் ஒரே gpt88.cc route மாற்ற வேண்டும்.', 'OpenAI மற்றும் Claude compatible configs-ஐப் பிரித்து நிர்வகிக்க வேண்டும்.', 'API Key model calls மற்றும் OAuth plugins இடையே மாற வேண்டும்.'], prepare: '1. CC-Switch install செய்யப்பட்டுள்ளது\n2. Codex CLI / Claude Code / Cursor install செய்யப்பட்டுள்ளன\n3. gpt88.cc API Key தயார்\n4. OpenAI அல்லது Claude compatible route தேர்ந்தெடுக்கப்பட்டுள்ளது\n5. Plugin-க்கு OAuth, model proxy-க்கு API Key என்பதை அறிந்திருக்கவும்', routesIntro: 'Protocol அடிப்படையில் இரண்டு routes அமைக்கவும். எல்லா protocol-களிலும் /v1-ஐ சேர்க்க வேண்டாம்.', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch திறக்கவும்\n2. Routes / Providers / API route settings திறக்கவும்\n3. gpt88-openai route உருவாக்கவும்\n4. Base URL https://api.gpt88.cc அமைக்கவும்\n5. Console API Key உள்ளிடவும்\n6. Default chat model உள்ளிடவும்\n7. Save செய்து enable செய்யவும்\n8. Target tool restart செய்து verify செய்யவும்', oauth: 'Codex plugin அல்லது ChatGPT account capability-க்கு Base URL-ஐ விட login mode முக்கியம்.', oauthFlow: '1. Plugin தேவைப்பட்டால் API Key login-இலிருந்து வெளியேறவும்\n2. OPENAI_API_KEY / OPENAI_BASE_URL நீக்கவும்\n3. Tool-ல் OAuth login செய்யவும்\n4. CC-Switch route இயக்கப்பட்டதா பார்க்கவும்\n5. புதிய clean session தொடங்கவும்', verify: 'முதலில் tool layer-ஐத் தவிர்த்து minimum request மூலம் gpt88.cc-ஐச் சரிபார்த்து, பின்னர் CC-Switch-க்கு திரும்பவும்.', trouble: '1. Tool பழைய address பயன்படுத்துகிறது\n   - Route enabled மற்றும் tool restart சரிபார்க்கவும்\n\n2. 404\n   - OpenAI route-ல் /v1 சரிபார்க்கவும்\n   - Claude route-ல் https://api.gpt88.cc வைக்கவும்\n\n3. Plugin இல்லை\n   - API Key mode-ல் இது இயல்பு; OAuth பயன்படுத்தவும்\n\n4. Route enabled ஆனாலும் fail\n   - curl மூலம் gpt88.cc நேரடியாக சரிபார்க்கவும்\n   - பின்னர் CC-Switch forwarding பார்க்கவும்', next: ['Plugin OAuth tutorial பார்க்கவும்', 'Codex CLI tutorial பார்க்கவும்', 'Integrations overview-க்கு திரும்பவும்'] },
  ne: { title: 'CC-Switch को फाइदा', info: 'CC-Switch ले धेरै tools बीच proxy route बदल्न सजिलो बनाउँछ। Model calls gpt88.cc API Key बाट हुन्छन्; plugin का लागि target tool मा OAuth login चाहिन्छ।', overview: ['धेरै development tools मा एउटै gpt88.cc route बदल्नुपर्छ।', 'OpenAI र Claude compatible configs अलग राख्नुपर्छ।', 'API Key model calls र OAuth plugins बीच switch गर्नुपर्छ।'], prepare: '1. CC-Switch install छ\n2. Codex CLI / Claude Code / Cursor install छन्\n3. gpt88.cc API Key तयार छ\n4. OpenAI वा Claude compatible route तय छ\n5. Plugin का लागि OAuth र model proxy का लागि API Key बुझिएको छ', routesIntro: 'Protocol अनुसार दुई routes राख्नुहोस्। सबै protocol मा एकैपटक /v1 नथप्नुहोस्।', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch खोल्नुहोस्\n2. Routes / Providers / API route settings खोल्नुहोस्\n3. gpt88-openai route बनाउनुहोस्\n4. Base URL https://api.gpt88.cc राख्नुहोस्\n5. Console को API Key राख्नुहोस्\n6. Default chat model राख्नुहोस्\n7. Save र enable गर्नुहोस्\n8. Target tool restart गरी verify गर्नुहोस्', oauth: 'Codex plugin वा ChatGPT account capability का लागि Base URL भन्दा login mode महत्वपूर्ण हुन्छ।', oauthFlow: '1. Plugin चाहिँदा API Key login छोड्नुहोस्\n2. OPENAI_API_KEY / OPENAI_BASE_URL हटाउनुहोस्\n3. Tool मा OAuth login गर्नुहोस्\n4. CC-Switch route खुलेको छ कि जाँच्नुहोस्\n5. नयाँ clean session सुरु गर्नुहोस्', verify: 'पहिले tool layer bypass गरी minimum request बाट gpt88.cc verify गर्नुहोस्, त्यसपछि CC-Switch मा फर्कनुहोस्।', trouble: '1. Tool पुरानो address प्रयोग गर्छ\n   - Route enabled र tool restart जाँच्नुहोस्\n\n2. 404\n   - OpenAI route मा /v1 जाँच्नुहोस्\n   - Claude route मा https://api.gpt88.cc राख्नुहोस्\n\n3. Plugin छैन\n   - API Key mode मा यो सामान्य हो; OAuth प्रयोग गर्नुहोस्\n\n4. Route enabled तर fail\n   - curl बाट gpt88.cc सिधै जाँच्नुहोस्\n   - त्यसपछि CC-Switch forwarding हेर्नुहोस्', next: ['Plugin OAuth tutorial हेर्नुहोस्', 'Codex CLI tutorial हेर्नुहोस्', 'Integrations overview मा फर्कनुहोस्'] },
  si: { title: 'CC-Switch හි ප්‍රයෝජනය', info: 'CC-Switch tools කිහිපයක් අතර proxy route මාරු කිරීමට උපකාරී වේ. Model calls gpt88.cc API Key මඟින්ය; plugins සඳහා target tool තුළ OAuth login අවශ්‍යය.', overview: ['Development tools කිහිපයක එකම gpt88.cc route මාරු කළ යුතුය.', 'OpenAI සහ Claude compatible configs වෙන් කර තබාගත යුතුය.', 'API Key model calls සහ OAuth plugins අතර මාරු විය යුතුය.'], prepare: '1. CC-Switch install කර ඇත\n2. Codex CLI / Claude Code / Cursor install කර ඇත\n3. gpt88.cc API Key සූදානම්\n4. OpenAI හෝ Claude compatible route තීරණය කර ඇත\n5. Plugin සඳහා OAuth සහ model proxy සඳහා API Key බව දන්නවා', routesIntro: 'Protocol අනුව routes දෙකක් තබන්න. සියලු protocol තුළ /v1 එකවර එක් නොකරන්න.', routes: 'OpenAI compatible route\nName: gpt88-openai\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: gpt-5-2-chat-latest\n\nClaude compatible route\nName: gpt88-claude\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nDefault Model: claude-sonnet-4-6', flow: '1. CC-Switch විවෘත කරන්න\n2. Routes / Providers / API route settings විවෘත කරන්න\n3. gpt88-openai route එක සාදන්න\n4. Base URL https://api.gpt88.cc ලෙස යොදන්න\n5. Console API Key ඇතුළත් කරන්න\n6. Default chat model ඇතුළත් කරන්න\n7. Save කර enable කරන්න\n8. Target tool restart කර verify කරන්න', oauth: 'Codex plugin හෝ ChatGPT account capability සඳහා Base URL ට වඩා login mode වැදගත්ය.', oauthFlow: '1. Plugin අවශ්‍ය නම් API Key login ඉවත් කරන්න\n2. OPENAI_API_KEY / OPENAI_BASE_URL ඉවත් කරන්න\n3. Tool තුළ OAuth login කරන්න\n4. CC-Switch route සක්‍රීයද බලන්න\n5. නව clean session එකක් ආරම්භ කරන්න', verify: 'පළමුව tool layer එක bypass කර minimum request එකකින් gpt88.cc පරීක්ෂා කර, පසුව CC-Switch වෙත ආපසු යන්න.', trouble: '1. Tool පැරණි address භාවිතා කරයි\n   - Route enabled සහ tool restart පරීක්ෂා කරන්න\n\n2. 404\n   - OpenAI route තුළ /v1 පරීක්ෂා කරන්න\n   - Claude route තුළ https://api.gpt88.cc තබන්න\n\n3. Plugin නොමැත\n   - API Key mode තුළ මෙය සාමාන්‍යය; OAuth භාවිතා කරන්න\n\n4. Route enabled නමුත් fail\n   - curl මඟින් gpt88.cc සෘජුව පරීක්ෂා කරන්න\n   - පසුව CC-Switch forwarding බලන්න', next: ['Plugin OAuth tutorial බලන්න', 'Codex CLI tutorial බලන්න', 'Integrations overview වෙත ආපසු යන්න'] },
}

export default function CcSwitchIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CcSwitchPageEn />
  const copy = getIntegrationCopy(locale, 'cc-switch', { title: 'CC-Switch 接入 gpt88.cc', description: 'CC-Switch 的 gpt88.cc 中转站路由、OpenAI/Claude 协议差异、OAuth 切换和排障教程。', intro: '先选择目标协议和路由，再应用 API Key 或 OAuth 配置。' })
  const sections = getIntegrationSections(locale, 'cc-switch', { overview: '适用场景', prepare: '准备工作', routes: '路由怎么填', flow: '逐步配置', oauth: 'OAuth 场景', verify: '验证路由', troubleshoot: '排障清单', next: '下一步' })
  const body = CC_BODY_COPY[locale] ?? CC_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/dev/cc-switch"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 },
        { id: 'prepare', text: sections.prepare, level: 2 },
        { id: 'routes', text: sections.routes, level: 2 },
        { id: 'flow', text: sections.flow, level: 2 },
        { id: 'oauth', text: sections.oauth, level: 2 },
        { id: 'verify', text: sections.verify, level: 2 },
        { id: 'troubleshoot', text: sections.troubleshoot, level: 2 },
        { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="info" title={body.title}>
        <p>{body.info}</p>
      </Callout>

      <h2 id="overview">{sections.overview}</h2>
      <ul>
        {body.overview.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="prepare">{sections.prepare}</h2>
      <CodeBlock lang="text" filename="checklist" code={body.prepare} />

      <h2 id="routes">{sections.routes}</h2>
      <p>{body.routesIntro}</p>
      <CodeBlock lang="text" filename="routes" code={body.routes} />

      <h2 id="flow">{sections.flow}</h2>
      <CodeBlock lang="text" filename="flow" code={body.flow} />

      <h2 id="oauth">{sections.oauth}</h2>
      <p>
        {body.oauth}
      </p>
      <CodeBlock lang="text" filename="oauth-flow" code={body.oauthFlow} />

      <h2 id="verify">{sections.verify}</h2>
      <p>{body.verify}</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={VERIFY} />

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth/">{body.next[0]}</Link></li>
        <li><Link to="/docs/integrations/dev/codex-cli/">{body.next[1]}</Link></li>
        <li><Link to="/docs/integrations/">{body.next[2]}</Link></li>
      </ul>
    </DocPage>
  )
}
