import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import { SeoIntentSections } from '../../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../../components/seo/SeoIntentMeta'
import ClaudeCodePageEn from '../../../en/ClaudeCodePageEn'

const SETUP = `1. 安装 Claude Code
2. 准备 API Key 或 OAuth 登录
3. 如果用 gpt88.cc，中转站走 OpenAI/Claude 兼容配置
4. 如果需要插件能力，改用 OAuth 登录
5. 先跑一条最小任务验证工具链`

const CHECKLIST = `1. 先判断你要的是模型调用还是插件能力
2. 模型调用优先走 API Key
3. 插件能力优先走 OAuth
4. 切换前先清理旧环境变量
5. 用最小任务验证切换是否成功`

const TROUBLESHOOTING = `1. 插件不可用
   - 先确认是不是 API Key 模式
   - 如果要插件，改用 OAuth

2. 反复 reconnect
   - 检查代理变量
   - 检查会话是否被旧配置污染

3. 模型调用失败
   - 先检查 Base URL 和 Key
   - 再确认模型名`

const CLAUDE_BODY_COPY: Record<string, { warnTitle: string; warn: string; intro: string; overview: string[]; notes: string[]; verify: string[]; next: string[]; setup: string; checklist: string; troubleshooting: string }> = {
  zh: { warnTitle: '先分清两种模式', warn: 'API Key 模式主要解决模型调用；OAuth 模式主要解决插件和账号权益。不要混用。', intro: 'Claude Code 这里最容易出错的是“把模型接入”和“把插件登录”混成一件事。如果目标只是让模型可用，API Key 就够了；如果目标是插件与账号权益，必须走 OAuth。', overview: ['模型调用怎么接 gpt88.cc。', '插件能力为什么会和 OAuth 绑定。', '切换时要先清理什么。'], notes: ['API Key 模式：更适合直接调用模型。', 'OAuth 模式：更适合插件、扩展能力和账号权益。'], verify: ['先跑一条简单任务，看模型输出是否正常。', '如果插件面板不可见，再切换到 OAuth 流程。', '切换后重启会话，确认环境变量没有残留。'], next: ['查看 Codex 插件 OAuth 教程', '返回集成总览'], setup: SETUP, checklist: CHECKLIST, troubleshooting: TROUBLESHOOTING },
  hi: { warnTitle: 'दो modes अलग रखें', warn: 'API Key mode model calls के लिए है; OAuth mode plugins और account entitlements के लिए है। इन्हें mix न करें।', intro: 'Claude Code में common गलती model access और plugin login को एक समझना है। केवल model चाहिए तो API Key पर्याप्त है; plugin और account entitlements के लिए OAuth जरूरी है।', overview: ['gpt88.cc से model calls जोड़ना।', 'Plugin capability OAuth से क्यों जुड़ी है।', 'Switch से पहले क्या साफ करना है।'], notes: ['API Key mode: direct model calls के लिए बेहतर।', 'OAuth mode: plugins, extensions और account entitlements के लिए बेहतर।'], verify: ['एक छोटा task चलाकर model output जांचें।', 'Plugin panel न दिखे तो OAuth flow पर जाएं।', 'Switch के बाद session restart करके पुराने environment variables जांचें।'], next: ['Codex plugin OAuth tutorial देखें', 'Integrations overview पर लौटें'], setup: '1. Claude Code install करें\n2. API Key या OAuth login तैयार करें\n3. gpt88.cc के लिए OpenAI/Claude compatible config उपयोग करें\n4. Plugin चाहिए तो OAuth login करें\n5. छोटी task से toolchain verify करें', checklist: '1. पहले तय करें model call चाहिए या plugin capability\n2. Model call के लिए API Key\n3. Plugin के लिए OAuth\n4. Switch से पहले पुराने environment variables साफ करें\n5. छोटी task से सफलता जांचें', troubleshooting: '1. Plugin उपलब्ध नहीं\n   - API Key mode की जांच करें\n   - Plugin के लिए OAuth करें\n\n2. बार-बार reconnect\n   - Proxy variables जांचें\n   - पुराने config से session प्रभावित तो नहीं देखें\n\n3. Model call fail\n   - Base URL और Key जांचें\n   - Model name की पुष्टि करें' },
  bn: { warnTitle: 'দুটি mode আলাদা রাখুন', warn: 'API Key mode model call-এর জন্য; OAuth mode plugin ও account entitlement-এর জন্য। এগুলি মেশাবেন না।', intro: 'Claude Code-এ সাধারণ ভুল হল model access ও plugin login-কে এক মনে করা। শুধু model চাইলে API Key যথেষ্ট; plugin ও account entitlement-এর জন্য OAuth দরকার।', overview: ['gpt88.cc-এ model call যোগ করা।', 'Plugin capability OAuth-এর সঙ্গে কেন যুক্ত।', 'Switch-এর আগে কী পরিষ্কার করতে হবে।'], notes: ['API Key mode: সরাসরি model call-এর জন্য ভালো।', 'OAuth mode: plugin, extension ও account entitlement-এর জন্য ভালো।'], verify: ['একটি ছোট task চালিয়ে model output দেখুন।', 'Plugin panel না দেখালে OAuth flow ব্যবহার করুন।', 'Switch-এর পর session restart করে পুরোনো environment variable নেই দেখুন।'], next: ['Codex plugin OAuth tutorial দেখুন', 'Integrations overview-তে ফিরুন'], setup: '1. Claude Code install করুন\n2. API Key বা OAuth login প্রস্তুত করুন\n3. gpt88.cc-এর জন্য OpenAI/Claude compatible config ব্যবহার করুন\n4. Plugin দরকার হলে OAuth login করুন\n5. ছোট task দিয়ে toolchain যাচাই করুন', checklist: '1. Model call নাকি plugin capability দরকার ঠিক করুন\n2. Model call-এর জন্য API Key\n3. Plugin-এর জন্য OAuth\n4. Switch-এর আগে পুরোনো environment variable সরান\n5. ছোট task দিয়ে যাচাই করুন', troubleshooting: '1. Plugin কাজ করছে না\n   - API Key mode পরীক্ষা করুন\n   - Plugin-এর জন্য OAuth ব্যবহার করুন\n\n2. বারবার reconnect\n   - Proxy variable পরীক্ষা করুন\n   - পুরোনো config session-কে প্রভাবিত করছে কি না দেখুন\n\n3. Model call ব্যর্থ\n   - Base URL ও Key পরীক্ষা করুন\n   - Model name নিশ্চিত করুন' },
  ur: { warnTitle: 'دونوں modes الگ رکھیں', warn: 'API Key mode model calls کے لیے ہے؛ OAuth mode plugins اور account entitlements کے لیے ہے۔ انہیں mix نہ کریں۔', intro: 'Claude Code میں عام غلطی model access اور plugin login کو ایک سمجھنا ہے۔ صرف model چاہیے تو API Key کافی ہے؛ plugin اور account entitlements کے لیے OAuth ضروری ہے۔', overview: ['gpt88.cc سے model calls جوڑنا۔', 'Plugin capability OAuth سے کیوں جڑی ہے۔', 'Switch سے پہلے کیا صاف کرنا ہے۔'], notes: ['API Key mode: direct model calls کے لیے بہتر۔', 'OAuth mode: plugins، extensions اور account entitlements کے لیے بہتر۔'], verify: ['ایک مختصر task چلا کر model output دیکھیں۔', 'Plugin panel نظر نہ آئے تو OAuth flow اختیار کریں۔', 'Switch کے بعد session restart کر کے پرانے environment variables دیکھیں۔'], next: ['Codex plugin OAuth tutorial دیکھیں', 'Integrations overview پر واپس جائیں'], setup: '1. Claude Code install کریں\n2. API Key یا OAuth login تیار کریں\n3. gpt88.cc کے لیے OpenAI/Claude compatible config استعمال کریں\n4. Plugin چاہیے تو OAuth login کریں\n5. مختصر task سے toolchain verify کریں', checklist: '1. طے کریں model call چاہیے یا plugin capability\n2. Model call کے لیے API Key\n3. Plugin کے لیے OAuth\n4. Switch سے پہلے پرانے environment variables صاف کریں\n5. مختصر task سے کامیابی چیک کریں', troubleshooting: '1. Plugin دستیاب نہیں\n   - API Key mode چیک کریں\n   - Plugin کے لیے OAuth کریں\n\n2. بار بار reconnect\n   - Proxy variables چیک کریں\n   - پرانا config session کو متاثر تو نہیں کر رہا\n\n3. Model call ناکام\n   - Base URL اور Key چیک کریں\n   - Model name کی تصدیق کریں' },
  ta: { warnTitle: 'இரண்டு mode-களையும் பிரிக்கவும்', warn: 'API Key mode model calls-க்கு; OAuth mode plugins மற்றும் account entitlements-க்கு. இரண்டையும் கலக்க வேண்டாம்.', intro: 'Claude Code-ல் பொதுவான தவறு model access மற்றும் plugin login-ஐ ஒன்றாகக் கருதுவது. Model மட்டும் தேவையெனில் API Key போதும்; plugin மற்றும் account entitlements-க்கு OAuth அவசியம்.', overview: ['gpt88.cc-ல் model calls இணைப்பது.', 'Plugin capability OAuth-உடன் ஏன் இணைகிறது.', 'Switch முன் எதைச் சுத்தம் செய்ய வேண்டும்.'], notes: ['API Key mode: direct model calls-க்கு ஏற்றது.', 'OAuth mode: plugins, extensions மற்றும் account entitlements-க்கு ஏற்றது.'], verify: ['சிறிய task இயக்கி model output சரிபார்க்கவும்.', 'Plugin panel தெரியாவிட்டால் OAuth flow-க்கு மாறவும்.', 'Switch பிறகு session restart செய்து பழைய environment variables உள்ளதா பார்க்கவும்.'], next: ['Codex plugin OAuth tutorial பார்க்கவும்', 'Integrations overview-க்கு திரும்பவும்'], setup: '1. Claude Code install செய்யவும்\n2. API Key அல்லது OAuth login தயார் செய்யவும்\n3. gpt88.cc-க்கு OpenAI/Claude compatible config பயன்படுத்தவும்\n4. Plugin தேவைப்பட்டால் OAuth login செய்யவும்\n5. சிறிய task மூலம் toolchain சரிபார்க்கவும்', checklist: '1. Model call அல்லது plugin capability எது வேண்டும் தீர்மானிக்கவும்\n2. Model call-க்கு API Key\n3. Plugin-க்கு OAuth\n4. Switch முன் பழைய environment variables நீக்கவும்\n5. சிறிய task மூலம் சரிபார்க்கவும்', troubleshooting: '1. Plugin கிடைக்கவில்லை\n   - API Key mode சரிபார்க்கவும்\n   - Plugin-க்கு OAuth பயன்படுத்தவும்\n\n2. மீண்டும் மீண்டும் reconnect\n   - Proxy variables சரிபார்க்கவும்\n   - பழைய config session-ஐ பாதிக்கிறதா பார்க்கவும்\n\n3. Model call தோல்வி\n   - Base URL மற்றும் Key சரிபார்க்கவும்\n   - Model name உறுதி செய்யவும்' },
  ne: { warnTitle: 'दुई mode अलग राख्नुहोस्', warn: 'API Key mode model call का लागि हो; OAuth mode plugin र account entitlement का लागि हो। मिसाउनु हुँदैन।', intro: 'Claude Code मा सामान्य गल्ती model access र plugin login लाई एउटै ठान्नु हो। Model मात्र चाहिँदा API Key पर्याप्त हुन्छ; plugin र account entitlement का लागि OAuth चाहिन्छ।', overview: ['gpt88.cc बाट model call जोड्ने।', 'Plugin capability OAuth सँग किन जोडिन्छ।', 'Switch अघि के सफा गर्ने।'], notes: ['API Key mode: direct model call का लागि राम्रो।', 'OAuth mode: plugin, extension र account entitlement का लागि राम्रो।'], verify: ['सानो task चलाएर model output जाँच्नुहोस्।', 'Plugin panel नदेखिए OAuth flow मा जानुहोस्।', 'Switch पछि session restart गरी पुराना environment variables जाँच्नुहोस्।'], next: ['Codex plugin OAuth tutorial हेर्नुहोस्', 'Integrations overview मा फर्कनुहोस्'], setup: '1. Claude Code install गर्नुहोस्\n2. API Key वा OAuth login तयार गर्नुहोस्\n3. gpt88.cc का लागि OpenAI/Claude compatible config प्रयोग गर्नुहोस्\n4. Plugin चाहिँदा OAuth login गर्नुहोस्\n5. सानो task बाट toolchain verify गर्नुहोस्', checklist: '1. Model call वा plugin capability कुन चाहिन्छ तय गर्नुहोस्\n2. Model call का लागि API Key\n3. Plugin का लागि OAuth\n4. Switch अघि पुराना environment variables हटाउनुहोस्\n5. सानो task बाट जाँच्नुहोस्', troubleshooting: '1. Plugin उपलब्ध छैन\n   - API Key mode जाँच्नुहोस्\n   - Plugin का लागि OAuth प्रयोग गर्नुहोस्\n\n2. बारम्बार reconnect\n   - Proxy variables जाँच्नुहोस्\n   - पुरानो config ले session असर गरेको छ कि छैन हेर्नुहोस्\n\n3. Model call असफल\n   - Base URL र Key जाँच्नुहोस्\n   - Model name पुष्टि गर्नुहोस्' },
  si: { warnTitle: 'mode දෙක වෙන් කර තබන්න', warn: 'API Key mode model calls සඳහාය; OAuth mode plugins සහ account entitlements සඳහාය. ඒවා මිශ්‍ර නොකරන්න.', intro: 'Claude Code හි සාමාන්‍ය දෝෂය model access සහ plugin login එකක් ලෙස සලකීමයි. Model පමණක් අවශ්‍ය නම් API Key ප්‍රමාණවත්ය; plugin සහ account entitlements සඳහා OAuth අවශ්‍යය.', overview: ['gpt88.cc වෙත model calls සම්බන්ධ කිරීම.', 'Plugin capability OAuth සමඟ සම්බන්ධ වන්නේ ඇයි.', 'Switch කිරීමට පෙර පිරිසිදු කළ යුතු දේ.'], notes: ['API Key mode: direct model calls සඳහා සුදුසුය.', 'OAuth mode: plugins, extensions සහ account entitlements සඳහා සුදුසුය.'], verify: ['කුඩා task එකක් ධාවනය කර model output පරීක්ෂා කරන්න.', 'Plugin panel නොපෙනේ නම් OAuth flow වෙත මාරු වන්න.', 'Switch පසු session restart කර පැරණි environment variables නොමැති බව බලන්න.'], next: ['Codex plugin OAuth tutorial බලන්න', 'Integrations overview වෙත ආපසු යන්න'], setup: '1. Claude Code install කරන්න\n2. API Key හෝ OAuth login සූදානම් කරන්න\n3. gpt88.cc සඳහා OpenAI/Claude compatible config භාවිතා කරන්න\n4. Plugin අවශ්‍ය නම් OAuth login කරන්න\n5. කුඩා task එකකින් toolchain verify කරන්න', checklist: '1. Model call ද plugin capability ද අවශ්‍ය තීරණය කරන්න\n2. Model call සඳහා API Key\n3. Plugin සඳහා OAuth\n4. Switch කිරීමට පෙර පැරණි environment variables ඉවත් කරන්න\n5. කුඩා task එකකින් පරීක්ෂා කරන්න', troubleshooting: '1. Plugin ලබාගත නොහැක\n   - API Key mode පරීක්ෂා කරන්න\n   - Plugin සඳහා OAuth භාවිතා කරන්න\n\n2. නැවත නැවත reconnect\n   - Proxy variables පරීක්ෂා කරන්න\n   - පැරණි config එක session එකට බලපානවාද බලන්න\n\n3. Model call අසාර්ථකයි\n   - Base URL සහ Key පරීක්ෂා කරන්න\n   - Model name තහවුරු කරන්න' },
}

export default function ClaudeCodeIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ClaudeCodePageEn />
  const copy = getIntegrationCopy(locale, 'claude-code', { title: 'Claude Code 使用 GPT88 API', description: '把 Claude Code 配置为 OpenAI 兼容 API，快速验证 API Key、模型和端点。', intro: '先区分模型调用和插件能力：API Key 用于模型访问，OAuth 用于插件能力。' })
  const sections = getIntegrationSections(locale, 'claude-code', { overview: '先理解这页讲什么', prepare: '准备工作', setup: '快速配置', notes: '模式差异', verify: '验证方法', troubleshoot: '排障清单', next: '下一步' })
  const body = CLAUDE_BODY_COPY[locale] ?? CLAUDE_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/dev/claude-code"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 },
        { id: 'prepare', text: sections.prepare, level: 2 },
        { id: 'setup', text: sections.setup, level: 2 },
        { id: 'notes', text: sections.notes, level: 2 },
        { id: 'verify', text: sections.verify, level: 2 },
        { id: 'troubleshoot', text: sections.troubleshoot, level: 2 },
        { id: 'next', text: sections.next, level: 2 },
        ...seoIntentHeadings('claude-code'),
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="warn" title={body.warnTitle}>
        <p>{body.warn}</p>
      </Callout>

      <p>
        {body.intro}
      </p>

      <h2 id="overview">{sections.overview}</h2>
      <ul>
        {body.overview.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="prepare">{sections.prepare}</h2>
      <CodeBlock lang="text" filename="checklist" code={body.checklist} />

      <h2 id="setup">{sections.setup}</h2>
      <CodeBlock lang="text" filename="setup" code={body.setup} />
      <h2 id="notes">{sections.notes}</h2>
      <ul>
        {body.notes.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="verify">{sections.verify}</h2>
      <ol>
        {body.verify.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.troubleshooting} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth/">{body.next[0]}</Link></li>
        <li><Link to="/docs/integrations/">{body.next[1]}</Link></li>
      </ul>
      <SeoIntentSections intent="claude-code" />
    </DocPage>
  )
}
