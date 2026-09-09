import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import CherryStudioPageEn from '../../../en/CherryStudioPageEn'

const QUICK_SETUP = `1. 打开 Cherry Studio
2. 进入模型提供商 / API 配置
3. 选择 OpenAI Compatible
4. Base URL 填 https://api.gpt88.cc
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 模型先选一个稳定可用的聊天模型
7. 发送一条最小消息测试连通性`

const EXAMPLE = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"介绍一下 gpt88.cc"}]
  }'`

const CHECKLIST = `1. 先把 Provider 选成 OpenAI Compatible
2. Base URL 一定要写成 https://api.gpt88.cc
3. API Key 使用控制台生成的真实 Key
4. 先选一个已知稳定的聊天模型
5. 发一条最小消息验证
6. 如果失败，先回到 cURL 检查接口`

const TROUBLESHOOTING = `1. 模型列表空白
   - 手动输入模型 ID
   - 到模型导航复制真实模型名

2. 返回 401
   - Key 无效或过期

3. 返回 404
   - Base URL 写错，或者没带 /v1

4. 回复很慢
   - 先换一个更轻的模型
   - 先关掉知识库和多轮长上下文`

type CherryBody = { title: string; stable: string; intro: string; overview: string[]; checklist: string; setup: string; setupNote: string; verify: string[]; tips: string[]; faq: string[]; trouble: string; next: string[] }
const CHERRY_BODY_COPY: Record<string, CherryBody> = {
  zh: { title: '最稳接法', stable: 'Cherry Studio 直接按 OpenAI Compatible 接入即可，先用 https://api.gpt88.cc 跑通，再切模型。', intro: '这篇教程按进入配置、选择提供商、验证连通性、排查失败的完整流程展开。', overview: ['把 Cherry Studio 接到 gpt88.cc 的 OpenAI 兼容接口。', '选择一个稳定模型先跑通。', '连接失败时知道先检查什么。'], checklist: CHECKLIST, setup: QUICK_SETUP, setupNote: '建议先用一条最小请求确认通路，再导入更多模型和提示词模板。', verify: ['先在 Cherry Studio 保存配置。', '新建对话并发送最短问题。', '能返回内容后，再逐步增加上下文和提示词复杂度。', '不能返回时，先用 cURL 验证 Key 和 Base URL。'], tips: ['把常用模型固定成默认项，减少手动切换。', '长上下文优先用更强模型，快速问答优先用低成本模型。', '给不同项目单独建 Key，方便统计成本和停用。'], faq: ['模型列表拉不到时，手动输入模型 ID。', '返回 404 时，检查 Base URL 是否带正确的 /v1。', '返回 401 时，确认 Key 是否复制完整。'], trouble: TROUBLESHOOTING, next: ['返回集成总览', '查看完整接入手册'] },
  hi: { title: 'सबसे स्थिर तरीका', stable: 'Cherry Studio को OpenAI Compatible से जोड़ें; पहले https://api.gpt88.cc चलाकर देखें, फिर model बदलें।', intro: 'यह guide configuration, provider selection, connectivity verification और troubleshooting की पूरी flow दिखाती है।', overview: ['Cherry Studio को gpt88.cc OpenAI-compatible API से जोड़ना।', 'पहले stable model चलाना।', 'Connection fail होने पर पहली जांच जानना।'], checklist: '1. Provider को OpenAI Compatible चुनें\n2. Base URL https://api.gpt88.cc रखें\n3. Console का real API Key उपयोग करें\n4. Known stable chat model चुनें\n5. छोटा message भेजकर verify करें\n6. Fail हो तो पहले cURL जांचें', setup: '1. Cherry Studio खोलें\n2. Model provider / API config खोलें\n3. OpenAI Compatible चुनें\n4. Base URL https://api.gpt88.cc दें\n5. Console का API Key दें\n6. Stable chat model चुनें\n7. छोटा test message भेजें', setupNote: 'पहले minimum request से route जांचें, फिर अधिक models और prompt templates जोड़ें।', verify: ['Cherry Studio में config save करें।', 'नया chat खोलकर छोटा सवाल भेजें।', 'Response मिले तो context और prompt धीरे-धीरे बढ़ाएं।', 'Response न मिले तो cURL से Key और Base URL verify करें।'], tips: ['Common model को default रखें।', 'Long context में strong model और quick Q&A में low-cost model लें।', 'हर project के लिए अलग Key रखें।'], faq: ['Model list न आए तो model ID manually दें।', '404 पर सही /v1 वाले Base URL की जांच करें।', '401 पर Key पूरा copy हुआ है या नहीं देखें।'], trouble: '1. Model list blank\n   - Model ID manually डालें\n   - Model catalog से real name copy करें\n\n2. 401\n   - Key invalid या expired\n\n3. 404\n   - Base URL या model name गलत\n\n4. Response slow\n   - हल्का model चुनें\n   - Knowledge base और long context बंद करें', next: ['Integrations overview पर लौटें', 'Complete integration guide देखें'] },
  bn: { title: 'সবচেয়ে স্থিতিশীল পদ্ধতি', stable: 'Cherry Studio-কে OpenAI Compatible দিয়ে যুক্ত করুন; আগে https://api.gpt88.cc চালিয়ে দেখুন, পরে model বদলান।', intro: 'এই guide configuration, provider selection, connectivity verification ও troubleshooting-এর সম্পূর্ণ flow দেখায়।', overview: ['Cherry Studio-কে gpt88.cc OpenAI-compatible API-তে যুক্ত করা।', 'আগে stable model চালানো।', 'Connection fail হলে প্রথমে কী দেখবেন।'], checklist: '1. Provider OpenAI Compatible বাছুন\n2. Base URL https://api.gpt88.cc দিন\n3. Console-এর real API Key ব্যবহার করুন\n4. Stable chat model বাছুন\n5. ছোট message দিয়ে verify করুন\n6. Fail হলে আগে cURL দেখুন', setup: '1. Cherry Studio খুলুন\n2. Model provider / API config খুলুন\n3. OpenAI Compatible বাছুন\n4. Base URL https://api.gpt88.cc দিন\n5. Console-এর API Key দিন\n6. Stable chat model বাছুন\n7. ছোট test message পাঠান', setupNote: 'আগে minimum request দিয়ে route দেখুন, পরে আরও model ও prompt template যোগ করুন।', verify: ['Cherry Studio-তে config save করুন।', 'নতুন chat খুলে ছোট প্রশ্ন পাঠান।', 'Response এলে context ও prompt ধীরে বাড়ান।', 'Response না এলে cURL দিয়ে Key ও Base URL যাচাই করুন।'], tips: ['Common model default রাখুন।', 'Long context-এ strong model এবং quick Q&A-তে low-cost model নিন।', 'প্রতিটি project-এ আলাদা Key রাখুন।'], faq: ['Model list না এলে model ID হাতে দিন।', '404 হলে সঠিক /v1-সহ Base URL দেখুন।', '401 হলে Key সম্পূর্ণ copy হয়েছে কি না দেখুন।'], trouble: '1. Model list blank\n   - Model ID হাতে দিন\n   - Model catalog থেকে real name copy করুন\n\n2. 401\n   - Key invalid বা expired\n\n3. 404\n   - Base URL বা model name ভুল\n\n4. Response slow\n   - হালকা model নিন\n   - Knowledge base ও long context বন্ধ করুন', next: ['Integrations overview-এ ফিরুন', 'Complete integration guide দেখুন'] },
  ur: { title: 'سب سے مستحکم طریقہ', stable: 'Cherry Studio کو OpenAI Compatible سے جوڑیں؛ پہلے https://api.gpt88.cc چلا کر دیکھیں، پھر model بدلیں۔', intro: 'یہ guide configuration، provider selection، connectivity verification اور troubleshooting کی مکمل flow دکھاتی ہے۔', overview: ['Cherry Studio کو gpt88.cc OpenAI-compatible API سے جوڑنا۔', 'پہلے stable model چلانا۔', 'Connection fail پر پہلی جانچ جاننا۔'], checklist: '1. Provider کو OpenAI Compatible منتخب کریں\n2. Base URL https://api.gpt88.cc رکھیں\n3. Console کا real API Key استعمال کریں\n4. Stable chat model منتخب کریں\n5. مختصر message سے verify کریں\n6. Fail ہو تو پہلے cURL چیک کریں', setup: '1. Cherry Studio کھولیں\n2. Model provider / API config کھولیں\n3. OpenAI Compatible منتخب کریں\n4. Base URL https://api.gpt88.cc رکھیں\n5. Console کا API Key درج کریں\n6. Stable chat model منتخب کریں\n7. مختصر test message بھیجیں', setupNote: 'پہلے minimum request سے route verify کریں، پھر مزید models اور prompt templates شامل کریں۔', verify: ['Cherry Studio میں config save کریں۔', 'نیا chat کھول کر مختصر سوال بھیجیں۔', 'Response آئے تو context اور prompt آہستہ بڑھائیں۔', 'Response نہ آئے تو cURL سے Key اور Base URL verify کریں۔'], tips: ['Common model کو default رکھیں۔', 'Long context کے لیے strong model اور quick Q&A کے لیے low-cost model لیں۔', 'ہر project کے لیے الگ Key رکھیں۔'], faq: ['Model list نہ آئے تو model ID manually دیں۔', '404 پر درست /v1 والے Base URL کو چیک کریں۔', '401 پر Key مکمل copy ہوئی ہے یا نہیں دیکھیں۔'], trouble: '1. Model list blank\n   - Model ID manually دیں\n   - Model catalog سے real name copy کریں\n\n2. 401\n   - Key invalid یا expired\n\n3. 404\n   - Base URL یا model name غلط\n\n4. Response slow\n   - ہلکا model منتخب کریں\n   - Knowledge base اور long context بند کریں', next: ['Integrations overview پر واپس جائیں', 'Complete integration guide دیکھیں'] },
  ta: { title: 'மிகவும் நிலையான முறை', stable: 'Cherry Studio-ஐ OpenAI Compatible மூலம் இணைக்கவும்; முதலில் https://api.gpt88.cc இயக்கி, பின்னர் model மாற்றவும்.', intro: 'இந்த guide configuration, provider selection, connectivity verification மற்றும் troubleshooting flow-ஐ முழுமையாகக் காட்டுகிறது.', overview: ['Cherry Studio-ஐ gpt88.cc OpenAI-compatible API-க்கு இணைப்பது.', 'முதலில் stable model இயக்குவது.', 'Connection fail ஆனால் முதலில் என்ன சரிபார்ப்பது.'], checklist: '1. Provider-ஐ OpenAI Compatible தேர்வு செய்யவும்\n2. Base URL https://api.gpt88.cc அமைக்கவும்\n3. Console real API Key பயன்படுத்தவும்\n4. Stable chat model தேர்வு செய்யவும்\n5. சிறிய message மூலம் verify செய்யவும்\n6. Fail ஆனால் cURL சரிபார்க்கவும்', setup: '1. Cherry Studio திறக்கவும்\n2. Model provider / API config திறக்கவும்\n3. OpenAI Compatible தேர்வு செய்யவும்\n4. Base URL https://api.gpt88.cc அமைக்கவும்\n5. Console API Key உள்ளிடவும்\n6. Stable chat model தேர்வு செய்யவும்\n7. சிறிய test message அனுப்பவும்', setupNote: 'முதலில் minimum request மூலம் route சரிபார்த்து, பின்னர் models மற்றும் prompt templates சேர்க்கவும்.', verify: ['Cherry Studio-ல் config save செய்யவும்.', 'புதிய chat திறந்து சிறிய கேள்வி அனுப்பவும்.', 'Response வந்தால் context மற்றும் prompt-ஐ மெதுவாக அதிகரிக்கவும்.', 'Response வராவிட்டால் cURL மூலம் Key மற்றும் Base URL சரிபார்க்கவும்.'], tips: ['Common model-ஐ default ஆக வைத்திருக்கவும்.', 'Long context-க்கு strong model, quick Q&A-க்கு low-cost model பயன்படுத்தவும்.', 'ஒவ்வொரு project-க்கும் தனி Key வைக்கவும்.'], faq: ['Model list வராவிட்டால் model ID-ஐ கைமுறையாக உள்ளிடவும்.', '404 என்றால் சரியான /v1 உடன் Base URL சரிபார்க்கவும்.', '401 என்றால் Key முழுமையாக copy செய்யப்பட்டதா பார்க்கவும்.'], trouble: '1. Model list blank\n   - Model ID கைமுறையாக உள்ளிடவும்\n   - Model catalog-ல் real name copy செய்யவும்\n\n2. 401\n   - Key invalid அல்லது expired\n\n3. 404\n   - Base URL அல்லது model name தவறு\n\n4. Response slow\n   - இலகுவான model தேர்வு செய்யவும்\n   - Knowledge base மற்றும் long context-ஐ அணைக்கவும்', next: ['Integrations overview-க்கு திரும்பவும்', 'Complete integration guide பார்க்கவும்'] },
  ne: { title: 'सबैभन्दा स्थिर तरिका', stable: 'Cherry Studio लाई OpenAI Compatible बाट जोड्नुहोस्; पहिले https://api.gpt88.cc चलाएर अनि model बदल्नुहोस्।', intro: 'यो guide ले configuration, provider selection, connectivity verification र troubleshooting को पूरा flow देखाउँछ।', overview: ['Cherry Studio लाई gpt88.cc OpenAI-compatible API मा जोड्ने।', 'पहिले stable model चलाउने।', 'Connection fail हुँदा सुरुमा के जाँच्ने।'], checklist: '1. Provider OpenAI Compatible छान्नुहोस्\n2. Base URL https://api.gpt88.cc राख्नुहोस्\n3. Console को real API Key प्रयोग गर्नुहोस्\n4. Stable chat model छान्नुहोस्\n5. सानो message बाट verify गर्नुहोस्\n6. Fail भए पहिले cURL जाँच्नुहोस्', setup: '1. Cherry Studio खोल्नुहोस्\n2. Model provider / API config खोल्नुहोस्\n3. OpenAI Compatible छान्नुहोस्\n4. Base URL https://api.gpt88.cc राख्नुहोस्\n5. Console को API Key राख्नुहोस्\n6. Stable chat model छान्नुहोस्\n7. सानो test message पठाउनुहोस्', setupNote: 'पहिले minimum request बाट route जाँचेर पछि अरू model र prompt template थप्नुहोस्।', verify: ['Cherry Studio मा config save गर्नुहोस्।', 'नयाँ chat खोलेर सानो प्रश्न पठाउनुहोस्।', 'Response आए context र prompt बिस्तारै बढाउनुहोस्।', 'Response नआए cURL बाट Key र Base URL verify गर्नुहोस्।'], tips: ['Common model लाई default राख्नुहोस्।', 'Long context मा strong model र quick Q&A मा low-cost model प्रयोग गर्नुहोस्।', 'हरेक project का लागि छुट्टै Key राख्नुहोस्।'], faq: ['Model list नआए model ID manually राख्नुहोस्।', '404 मा सही /v1 भएको Base URL जाँच्नुहोस्।', '401 मा Key पूरा copy भएको छ कि जाँच्नुहोस्।'], trouble: '1. Model list blank\n   - Model ID manually राख्नुहोस्\n   - Model catalog बाट real name copy गर्नुहोस्\n\n2. 401\n   - Key invalid वा expired\n\n3. 404\n   - Base URL वा model name गलत\n\n4. Response slow\n   - हल्का model छान्नुहोस्\n   - Knowledge base र long context बन्द गर्नुहोस्', next: ['Integrations overview मा फर्कनुहोस्', 'Complete integration guide हेर्नुहोस्'] },
  si: { title: 'වඩාත් ස්ථාවර ක්‍රමය', stable: 'Cherry Studio OpenAI Compatible ලෙස සම්බන්ධ කරන්න; පළමුව https://api.gpt88.cc ධාවනය කර පසුව model මාරු කරන්න.', intro: 'මෙම guide එක configuration, provider selection, connectivity verification සහ troubleshooting flow එක සම්පූර්ණයෙන් පෙන්වයි.', overview: ['Cherry Studio gpt88.cc OpenAI-compatible API සමඟ සම්බන්ධ කිරීම.', 'පළමුව stable model එකක් ධාවනය කිරීම.', 'Connection fail වූ විට පළමුව පරීක්ෂා කළ යුතු දේ.'], checklist: '1. Provider OpenAI Compatible ලෙස තෝරන්න\n2. Base URL https://api.gpt88.cc යොදන්න\n3. Console real API Key භාවිතා කරන්න\n4. Stable chat model තෝරන්න\n5. කුඩා message එකකින් verify කරන්න\n6. Fail නම් පළමුව cURL පරීක්ෂා කරන්න', setup: '1. Cherry Studio විවෘත කරන්න\n2. Model provider / API config විවෘත කරන්න\n3. OpenAI Compatible තෝරන්න\n4. Base URL https://api.gpt88.cc යොදන්න\n5. Console API Key ඇතුළත් කරන්න\n6. Stable chat model තෝරන්න\n7. කුඩා test message එකක් යවන්න', setupNote: 'පළමුව minimum request එකකින් route පරීක්ෂා කර පසුව models සහ prompt templates එක් කරන්න.', verify: ['Cherry Studio තුළ config save කරන්න.', 'නව chat එකක් විවෘත කර කුඩා ප්‍රශ්නයක් යවන්න.', 'Response ලැබේ නම් context සහ prompt ක්‍රමයෙන් වැඩි කරන්න.', 'Response නැති නම් cURL මඟින් Key සහ Base URL verify කරන්න.'], tips: ['Common model එක default කර තබන්න.', 'Long context සඳහා strong model, quick Q&A සඳහා low-cost model භාවිතා කරන්න.', 'Project එකකට වෙනම Key එකක් තබන්න.'], faq: ['Model list නොලැබේ නම් model ID අතින් ඇතුළත් කරන්න.', '404 නම් නිවැරදි /v1 සහිත Base URL පරීක්ෂා කරන්න.', '401 නම් Key සම්පූර්ණයෙන් copy කර ඇත්ද බලන්න.'], trouble: '1. Model list blank\n   - Model ID අතින් ඇතුළත් කරන්න\n   - Model catalog එකෙන් real name copy කරන්න\n\n2. 401\n   - Key invalid හෝ expired\n\n3. 404\n   - Base URL හෝ model name වැරදියි\n\n4. Response slow\n   - සැහැල්ලු model එකක් තෝරන්න\n   - Knowledge base සහ long context අක්‍රීය කරන්න', next: ['Integrations overview වෙත ආපසු යන්න', 'Complete integration guide බලන්න'] },
}

export default function CherryStudioPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CherryStudioPageEn />
  const copy = getIntegrationCopy(locale, 'cherry-studio', { title: 'Cherry Studio 接入 gpt88.cc', description: '把 gpt88.cc 接到 Cherry Studio 的 OpenAI 兼容工作流里，适合多模型管理、提示词模板和常用对话场景。', intro: '选择 OpenAI Compatible provider，填入 Base URL 和 Key，再从稳定模型开始。' })
  const sections = getIntegrationSections(locale, 'cherry-studio', { overview: '这篇教程讲什么', prepare: '准备工作', setup: '快速配置', verify: '验证连通性', tips: '使用建议', faq: '常见问题', troubleshoot: '排障清单', next: '下一步' })
  const body = CHERRY_BODY_COPY[locale] ?? CHERRY_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/chat/cherry-studio"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 }, { id: 'prepare', text: sections.prepare, level: 2 }, { id: 'setup', text: sections.setup, level: 2 }, { id: 'verify', text: sections.verify, level: 2 }, { id: 'tips', text: sections.tips, level: 2 }, { id: 'faq', text: sections.faq, level: 2 }, { id: 'troubleshoot', text: sections.troubleshoot, level: 2 }, { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="info" title={body.title}>
        <p>{body.stable}</p>
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
      <p>{body.setupNote}</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={EXAMPLE} />

      <h2 id="verify">{sections.verify}</h2>
      <ol>
        {body.verify.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="tips">{sections.tips}</h2>
      <ul>
        {body.tips.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="faq">{sections.faq}</h2>
      <ul>
        {body.faq.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/integrations/">{body.next[0]}</Link></li>
        <li><Link to="/docs/guides/complete-integration/">{body.next[1]}</Link></li>
      </ul>
    </DocPage>
  )
}
