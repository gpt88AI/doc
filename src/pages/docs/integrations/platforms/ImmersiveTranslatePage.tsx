import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import ImmersiveTranslatePageEn from '../../../en/ImmersiveTranslatePageEn'

const PREPARE = `1. 已安装沉浸式翻译浏览器扩展
2. 已准备 gpt88.cc API Key
3. 已确认要使用的聊天模型
4. 浏览器可以访问目标网页
5. 先准备一个短网页或短段落测试`

const SETUP = `服务类型: OpenAI Compatible / 自定义 OpenAI
API Key: sk-你的-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`

const FLOW = `1. 打开浏览器扩展管理页
2. 进入沉浸式翻译设置
3. 找到 AI 翻译服务 / OpenAI 设置
4. 选择 OpenAI Compatible 或自定义 OpenAI
5. 填入 API Key
6. Base URL 填 https://api.gpt88.cc
7. 模型名填 gpt-5-2-chat-latest
8. 保存配置
9. 打开一篇短网页测试翻译`

const PROMPT = `你是专业翻译助手。
请把用户提供的文本翻译成简体中文。
要求：
1. 保留原文段落结构
2. 技术术语保持准确
3. 不要添加解释
4. 不要输出与翻译无关的内容`

const VERIFY = `测试文本：
The model supports streaming responses and tool calls.

预期结果：
模型应翻译为自然中文，并保留 streaming responses、tool calls 等技术含义。`

const TROUBLESHOOTING = `1. 翻译按钮没反应
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
   - 使用固定系统提示词`

type ImmersiveBody = { title: string; info: string; overview: string[]; prepare: string; configure: string; setup?: string; flow: string; promptIntro: string; prompt: string; verify: string; verifyList: string[]; trouble: string; next: string[] }
const IMMERSIVE_BODY_COPY: Record<string, ImmersiveBody> = {
  zh: { title: '推荐用法', info: '沉浸式翻译按 OpenAI Compatible 接入即可。翻译任务更看重稳定和成本，建议先用轻量聊天模型测试，再根据网页长度调整模型。', overview: ['网页全文翻译。', '技术文档中英互译。', '论文、博客、产品文档的分段翻译。', '需要比普通机器翻译更自然的表达。'], prepare: PREPARE, configure: '在沉浸式翻译的 AI 服务配置里选择 OpenAI 兼容服务，然后按下面填写。', flow: FLOW, promptIntro: '如果扩展支持自定义系统提示词，可以使用更稳定的翻译约束。技术文档建议保留术语，不要让模型自由发挥。', prompt: PROMPT, verify: VERIFY, verifyList: ['先用一段短英文测试。', '确认翻译不会添加额外解释。', '再打开长网页测试分段翻译。', '成本较高时，降低单次段落长度或切换轻量模型。'], trouble: TROUBLESHOOTING, next: ['查看 ChatBox 接入教程', '查看 gpt88.cc 通用教程', '返回集成总览'] },
  hi: { title: 'Recommended उपयोग', info: 'Immersive Translate को OpenAI Compatible से जोड़ें। Translation में stability और cost महत्वपूर्ण हैं; पहले lightweight chat model से test करें।', overview: ['पूरे webpage का translation।', 'Technical docs का bilingual translation।', 'Paper, blog और product docs का segment translation।', 'सामान्य machine translation से अधिक natural भाषा।'], prepare: '1. Immersive Translate browser extension install है\n2. gpt88.cc API Key तैयार है\n3. Chat model तय है\n4. Browser target page खोल सकता है\n5. छोटा webpage या paragraph test के लिए तैयार है', configure: 'Immersive Translate AI service settings में OpenAI-compatible service चुनकर यह भरें।', flow: '1. Browser extension management खोलें\n2. Immersive Translate settings खोलें\n3. AI translation / OpenAI settings खोजें\n4. OpenAI Compatible चुनें\n5. API Key भरें\n6. Base URL https://api.gpt88.cc रखें\n7. Model gpt-5-2-chat-latest रखें\n8. Save करें\n9. Short webpage पर translation test करें', promptIntro: 'Custom system prompt उपलब्ध हो तो stable translation constraints रखें। Technical terms preserve करें और model को freely improvise न करने दें।', prompt: 'You are a professional translation assistant.\nTranslate the user text into Hindi.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Hindi translation while preserving streaming responses and tool calls.', verifyList: ['Short English passage से test करें।', 'Extra explanation न जुड़ने दें।', 'फिर long webpage पर segment translation test करें।', 'Cost अधिक हो तो paragraph छोटा करें या lightweight model लें।'], trouble: '1. Translate button नहीं चलता\n   - Extension enabled और page permission जांचें\n\n2. API 401\n   - API Key पूरा है और spaces नहीं हैं देखें\n\n3. API 404\n   - Base URL https://api.gpt88.cc और real model ID जांचें\n\n4. Translation slow\n   - हल्का model लें\n   - Paragraph छोटा करें\n\n5. Style unstable\n   - Temperature घटाएं\n   - Fixed system prompt रखें', next: ['ChatBox tutorial देखें', 'gpt88.cc general tutorial देखें', 'Integrations overview पर लौटें'] },
  bn: { title: 'Recommended ব্যবহার', info: 'Immersive Translate-কে OpenAI Compatible দিয়ে যুক্ত করুন। Translation-এ stability ও cost গুরুত্বপূর্ণ; আগে lightweight chat model দিয়ে test করুন।', overview: ['সম্পূর্ণ webpage translation।', 'Technical docs-এর bilingual translation।', 'Paper, blog ও product docs-এর segment translation।', 'সাধারণ machine translation-এর চেয়ে natural expression।'], prepare: '1. Immersive Translate browser extension install আছে\n2. gpt88.cc API Key প্রস্তুত\n3. Chat model ঠিক করা\n4. Browser target page খুলতে পারে\n5. ছোট webpage বা paragraph test-এর জন্য প্রস্তুত', configure: 'Immersive Translate AI service settings-এ OpenAI-compatible service বেছে এটি পূরণ করুন।', flow: '1. Browser extension management খুলুন\n2. Immersive Translate settings খুলুন\n3. AI translation / OpenAI settings খুঁজুন\n4. OpenAI Compatible বাছুন\n5. API Key দিন\n6. Base URL https://api.gpt88.cc দিন\n7. Model gpt-5-2-chat-latest দিন\n8. Save করুন\n9. ছোট webpage-এ translation test করুন', promptIntro: 'Custom system prompt থাকলে stable translation constraint রাখুন। Technical term preserve করুন এবং model-কে freely improvise করতে দেবেন না।', prompt: 'You are a professional translation assistant.\nTranslate the user text into Bengali.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Bengali translation while preserving streaming responses and tool calls.', verifyList: ['ছোট English passage দিয়ে test করুন।', 'Extra explanation যোগ হচ্ছে না নিশ্চিত করুন।', 'তারপর long webpage-এ segment translation test করুন।', 'Cost বেশি হলে paragraph ছোট করুন বা lightweight model নিন।'], trouble: '1. Translate button কাজ করছে না\n   - Extension enabled ও page permission দেখুন\n\n2. API 401\n   - API Key সম্পূর্ণ এবং spaces নেই দেখুন\n\n3. API 404\n   - Base URL https://api.gpt88.cc ও real model ID দেখুন\n\n4. Translation slow\n   - হালকা model নিন\n   - Paragraph ছোট করুন\n\n5. Style unstable\n   - Temperature কমান\n   - Fixed system prompt রাখুন', next: ['ChatBox tutorial দেখুন', 'gpt88.cc general tutorial দেখুন', 'Integrations overview-এ ফিরুন'] },
  ur: { title: 'Recommended استعمال', info: 'Immersive Translate کو OpenAI Compatible سے جوڑیں۔ Translation میں stability اور cost اہم ہیں؛ پہلے lightweight chat model سے test کریں۔', overview: ['پورے webpage کا translation۔', 'Technical docs کا bilingual translation۔', 'Paper، blog اور product docs کا segment translation۔', 'عام machine translation سے زیادہ natural expression۔'], prepare: '1. Immersive Translate browser extension install ہے\n2. gpt88.cc API Key تیار ہے\n3. Chat model طے ہے\n4. Browser target page کھول سکتا ہے\n5. مختصر webpage یا paragraph test کے لیے تیار ہے', configure: 'Immersive Translate AI service settings میں OpenAI-compatible service منتخب کر کے یہ بھریں۔', flow: '1. Browser extension management کھولیں\n2. Immersive Translate settings کھولیں\n3. AI translation / OpenAI settings تلاش کریں\n4. OpenAI Compatible منتخب کریں\n5. API Key درج کریں\n6. Base URL https://api.gpt88.cc رکھیں\n7. Model gpt-5-2-chat-latest رکھیں\n8. Save کریں\n9. مختصر webpage پر translation test کریں', promptIntro: 'Custom system prompt ہو تو stable translation constraints رکھیں۔ Technical terms محفوظ کریں اور model کو آزادانہ improvise نہ کرنے دیں۔', prompt: 'You are a professional translation assistant.\nTranslate the user text into Urdu.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Urdu translation while preserving streaming responses and tool calls.', verifyList: ['مختصر English passage سے test کریں۔', 'Extra explanation شامل نہ ہو یہ دیکھیں۔', 'پھر long webpage پر segment translation test کریں۔', 'Cost زیادہ ہو تو paragraph کم کریں یا lightweight model لیں۔'], trouble: '1. Translate button نہیں چلتا\n   - Extension enabled اور page permission چیک کریں\n\n2. API 401\n   - API Key مکمل ہے اور spaces نہیں چیک کریں\n\n3. API 404\n   - Base URL https://api.gpt88.cc اور real model ID چیک کریں\n\n4. Translation slow\n   - ہلکا model لیں\n   - Paragraph کم کریں\n\n5. Style unstable\n   - Temperature کم کریں\n   - Fixed system prompt رکھیں', next: ['ChatBox tutorial دیکھیں', 'gpt88.cc general tutorial دیکھیں', 'Integrations overview پر واپس جائیں'] },
  ta: { title: 'Recommended பயன்பாடு', info: 'Immersive Translate-ஐ OpenAI Compatible மூலம் இணைக்கவும். Translation-ல் stability மற்றும் cost முக்கியம்; முதலில் lightweight chat model-ல் test செய்யவும்.', overview: ['முழு webpage translation.', 'Technical docs bilingual translation.', 'Paper, blog மற்றும் product docs segment translation.', 'சாதாரண machine translation-ஐ விட natural expression.'], prepare: '1. Immersive Translate browser extension install செய்யப்பட்டுள்ளது\n2. gpt88.cc API Key தயார்\n3. Chat model தேர்வு செய்யப்பட்டுள்ளது\n4. Browser target page-ஐ அணுக முடியும்\n5. சிறிய webpage அல்லது paragraph test-க்கு தயார்', configure: 'Immersive Translate AI service settings-ல் OpenAI-compatible service தேர்வு செய்து இதை நிரப்பவும்.', flow: '1. Browser extension management திறக்கவும்\n2. Immersive Translate settings திறக்கவும்\n3. AI translation / OpenAI settings தேடவும்\n4. OpenAI Compatible தேர்வு செய்யவும்\n5. API Key உள்ளிடவும்\n6. Base URL https://api.gpt88.cc அமைக்கவும்\n7. Model gpt-5-2-chat-latest அமைக்கவும்\n8. Save செய்யவும்\n9. சிறிய webpage-ல் translation test செய்யவும்', promptIntro: 'Custom system prompt இருந்தால் stable translation constraints பயன்படுத்தவும். Technical terms-ஐ காத்து model-ஐ சுதந்திரமாக improvise செய்ய விட வேண்டாம்.', prompt: 'You are a professional translation assistant.\nTranslate the user text into Tamil.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Tamil translation while preserving streaming responses and tool calls.', verifyList: ['சிறிய English passage மூலம் test செய்யவும்.', 'Extra explanation சேராததை உறுதி செய்யவும்.', 'பின்னர் long webpage-ல் segment translation test செய்யவும்.', 'Cost அதிகமானால் paragraph நீளத்தை குறைக்கவும் அல்லது lightweight model மாற்றவும்.'], trouble: '1. Translate button இயங்கவில்லை\n   - Extension enabled மற்றும் page permission சரிபார்க்கவும்\n\n2. API 401\n   - API Key முழுமையா, spaces இல்லையா பார்க்கவும்\n\n3. API 404\n   - Base URL https://api.gpt88.cc மற்றும் real model ID சரிபார்க்கவும்\n\n4. Translation slow\n   - இலகுவான model தேர்வு செய்யவும்\n   - Paragraph நீளம் குறைக்கவும்\n\n5. Style unstable\n   - Temperature குறைக்கவும்\n   - Fixed system prompt பயன்படுத்தவும்', next: ['ChatBox tutorial பார்க்கவும்', 'gpt88.cc general tutorial பார்க்கவும்', 'Integrations overview-க்கு திரும்பவும்'] },
  ne: { title: 'Recommended प्रयोग', info: 'Immersive Translate लाई OpenAI Compatible बाट जोड्नुहोस्। Translation मा stability र cost महत्वपूर्ण छन्; पहिले lightweight chat model बाट test गर्नुहोस्।', overview: ['पूरै webpage translation।', 'Technical docs bilingual translation।', 'Paper, blog र product docs segment translation।', 'साधारण machine translation भन्दा natural expression।'], prepare: '1. Immersive Translate browser extension install छ\n2. gpt88.cc API Key तयार छ\n3. Chat model तय छ\n4. Browser ले target page खोल्न सक्छ\n5. सानो webpage वा paragraph test का लागि तयार छ', configure: 'Immersive Translate AI service settings मा OpenAI-compatible service छानेर यो भर्नुहोस्।', flow: '1. Browser extension management खोल्नुहोस्\n2. Immersive Translate settings खोल्नुहोस्\n3. AI translation / OpenAI settings खोज्नुहोस्\n4. OpenAI Compatible छान्नुहोस्\n5. API Key राख्नुहोस्\n6. Base URL https://api.gpt88.cc राख्नुहोस्\n7. Model gpt-5-2-chat-latest राख्नुहोस्\n8. Save गर्नुहोस्\n9. सानो webpage मा translation test गर्नुहोस्', promptIntro: 'Custom system prompt भए stable translation constraints राख्नुहोस्। Technical terms बचाइराखी model लाई स्वतन्त्र रूपमा improvise गर्न नदिनुहोस्।', prompt: 'You are a professional translation assistant.\nTranslate the user text into Nepali.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Nepali translation while preserving streaming responses and tool calls.', verifyList: ['सानो English passage बाट test गर्नुहोस्।', 'Extra explanation थपिएको छैन जाँच्नुहोस्।', 'पछि long webpage मा segment translation test गर्नुहोस्।', 'Cost धेरै भए paragraph छोट्याउनुहोस् वा lightweight model छान्नुहोस्।'], trouble: '1. Translate button चल्दैन\n   - Extension enabled र page permission जाँच्नुहोस्\n\n2. API 401\n   - API Key पूरा र spaces नभएको जाँच्नुहोस्\n\n3. API 404\n   - Base URL https://api.gpt88.cc र real model ID जाँच्नुहोस्\n\n4. Translation slow\n   - हल्का model छान्नुहोस्\n   - Paragraph छोट्याउनुहोस्\n\n5. Style unstable\n   - Temperature घटाउनुहोस्\n   - Fixed system prompt राख्नुहोस्', next: ['ChatBox tutorial हेर्नुहोस्', 'gpt88.cc general tutorial हेर्नुहोस्', 'Integrations overview मा फर्कनुहोस्'] },
  si: { title: 'Recommended භාවිතය', info: 'Immersive Translate OpenAI Compatible ලෙස සම්බන්ධ කරන්න. Translation සඳහා stability සහ cost වැදගත්ය; පළමුව lightweight chat model එකකින් test කරන්න.', overview: ['සම්පූර්ණ webpage translation.', 'Technical docs bilingual translation.', 'Paper, blog සහ product docs segment translation.', 'සාමාන්‍ය machine translation එකකට වඩා natural expression.'], prepare: '1. Immersive Translate browser extension install කර ඇත\n2. gpt88.cc API Key සූදානම්\n3. Chat model තෝරා ඇත\n4. Browser හට target page වෙත යා හැක\n5. කුඩා webpage හෝ paragraph test සඳහා සූදානම්', configure: 'Immersive Translate AI service settings තුළ OpenAI-compatible service තෝරා මෙය පුරවන්න.', flow: '1. Browser extension management විවෘත කරන්න\n2. Immersive Translate settings විවෘත කරන්න\n3. AI translation / OpenAI settings සොයන්න\n4. OpenAI Compatible තෝරන්න\n5. API Key ඇතුළත් කරන්න\n6. Base URL https://api.gpt88.cc යොදන්න\n7. Model gpt-5-2-chat-latest යොදන්න\n8. Save කරන්න\n9. කුඩා webpage එකක translation test කරන්න', promptIntro: 'Custom system prompt සහාය තිබේ නම් stable translation constraints භාවිතා කරන්න. Technical terms තබාගෙන model එකට නිදහසේ improvise කිරීමට ඉඩ නොදෙන්න.', prompt: 'You are a professional translation assistant.\nTranslate the user text into Sinhala.\nRequirements:\n1. Preserve paragraph structure\n2. Keep technical terms accurate\n3. Do not add explanations\n4. Do not output unrelated content', verify: 'Test text:\nThe model supports streaming responses and tool calls.\n\nExpected:\nNatural Sinhala translation while preserving streaming responses and tool calls.', verifyList: ['කුඩා English passage එකකින් test කරන්න.', 'අමතර explanation එක් නොවන බව තහවුරු කරන්න.', 'ඉන්පසු long webpage එකක segment translation test කරන්න.', 'Cost වැඩි නම් paragraph දිග අඩු කරන්න හෝ lightweight model මාරු කරන්න.'], trouble: '1. Translate button ක්‍රියා නොකරයි\n   - Extension enabled සහ page permission පරීක්ෂා කරන්න\n\n2. API 401\n   - API Key සම්පූර්ණද spaces නැද්ද බලන්න\n\n3. API 404\n   - Base URL https://api.gpt88.cc සහ real model ID පරීක්ෂා කරන්න\n\n4. Translation slow\n   - සැහැල්ලු model එකක් තෝරන්න\n   - Paragraph දිග අඩු කරන්න\n\n5. Style unstable\n   - Temperature අඩු කරන්න\n   - Fixed system prompt භාවිතා කරන්න', next: ['ChatBox tutorial බලන්න', 'gpt88.cc general tutorial බලන්න', 'Integrations overview වෙත ආපසු යන්න'] },
}

export default function ImmersiveTranslateIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ImmersiveTranslatePageEn />
  const copy = getIntegrationCopy(locale, 'immersive-translate', { title: '沉浸式翻译接入 gpt88.cc', description: '浏览器沉浸式翻译扩展通过 OpenAI 兼容接口接入 gpt88.cc 的逐步教程。', intro: '选择一段短网页，配置模型和 API endpoint，再检查翻译质量与实际用量。' })
  const sections = getIntegrationSections(locale, 'immersive-translate', { overview: '适用场景', prepare: '准备工作', configure: '第一步：填写服务配置', flow: '第二步：逐步操作', prompt: '第三步：优化翻译提示词', verify: '第四步：验证翻译效果', troubleshoot: '排障清单', next: '下一步' })
  const body = IMMERSIVE_BODY_COPY[locale] ?? IMMERSIVE_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/platforms/immersive-translate"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 }, { id: 'prepare', text: sections.prepare, level: 2 }, { id: 'configure', text: sections.configure, level: 2 }, { id: 'flow', text: sections.flow, level: 2 }, { id: 'prompt', text: sections.prompt, level: 2 }, { id: 'verify', text: sections.verify, level: 2 }, { id: 'troubleshoot', text: sections.troubleshoot, level: 2 }, { id: 'next', text: sections.next, level: 2 },
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

      <h2 id="configure">{sections.configure}</h2>
      <p>{body.configure}</p>
      <CodeBlock lang="text" filename="setup" code={body.setup ?? SETUP} />

      <h2 id="flow">{sections.flow}</h2>
      <CodeBlock lang="text" filename="flow" code={body.flow} />

      <h2 id="prompt">{sections.prompt}</h2>
      <p>
        {body.promptIntro}
      </p>
      <CodeBlock lang="text" filename="translation-prompt" code={body.prompt} />

      <h2 id="verify">{sections.verify}</h2>
      <CodeBlock lang="text" filename="verify" code={body.verify} />
      <ol>
        {body.verifyList.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/integrations/chat/chatbox/">{body.next[0]}</Link></li>
        <li><Link to="/docs/guides/gpt88-tutorial/">{body.next[1]}</Link></li>
        <li><Link to="/docs/integrations/">{body.next[2]}</Link></li>
      </ul>
    </DocPage>
  )
}
