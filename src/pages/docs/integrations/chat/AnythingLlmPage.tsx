import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import AnythingLlmPageEn from '../../../en/AnythingLlmPageEn'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest

如果你做知识库问答，先确认 embedding 和 chat 模型分别配置清楚。`

const CHECKLIST = `1. 先准备好 API Key
2. Base URL 用 https://api.gpt88.cc
3. 聊天模型和 embedding 模型分开看
4. 先跑一条最小问答
5. 再导入知识库文档`

const TROUBLESHOOTING = `1. 知识库问答结果不稳定
   - 先换一个更稳的聊天模型
   - 检查文档切块大小

2. 模型不可见
   - 手动输入模型 ID
   - 到模型导航复制真实名称

3. 认证失败
   - 检查 Key 是否完整
   - 检查环境变量是否被覆盖`

type AnythingBody = { title: string; intro: string; overview: string[]; checklist: string; setup: string; verify: string[]; notes: string[]; trouble: string; next: string }
const ANYTHING_BODY_COPY: Record<string, AnythingBody> = {
  zh: { title: '接法', intro: '这页重点是把 AnythingLLM 里的聊天模型和知识库模型拆清楚，避免一上来把所有能力混到同一个配置里。', overview: ['把 gpt88.cc 接进 AnythingLLM。', '先跑通聊天，再接知识库。', '知道失败时先查哪一层。'], checklist: CHECKLIST, setup: SETUP, verify: ['先发一条最短对话，确认模型通路可用。', '再导入一小批知识库文档，验证检索和回答是否正常。', '结果异常时，先把知识库和聊天模型分开排查。'], notes: ['知识库和聊天模型最好分开配置，避免成本和效果混在一起。', '如果有模型缓存，更新后记得刷新。', '先用最小问题测试连通性，再导入文档库。'], trouble: TROUBLESHOOTING, next: '返回集成总览' },
  hi: { title: 'कनेक्शन तरीका', intro: 'इस page में AnythingLLM के chat model और knowledge-base model अलग रखे जाते हैं, ताकि सभी capabilities एक config में न मिलें।', overview: ['AnythingLLM में gpt88.cc जोड़ना।', 'पहले chat चलाना, फिर knowledge base जोड़ना।', 'Failure में पहले कौन-सी layer जांचनी है।'], checklist: '1. API Key तैयार करें\n2. Base URL https://api.gpt88.cc रखें\n3. Chat और embedding model अलग रखें\n4. छोटा Q&A चलाएं\n5. फिर knowledge-base documents import करें', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A में embedding और chat model अलग configure करें।', verify: ['छोटा chat भेजकर model route जांचें।', 'छोटे document batch से retrieval और answer जांचें।', 'Result गलत हो तो knowledge base और chat model अलग-अलग जांचें।'], notes: ['Knowledge-base और chat model अलग रखें ताकि cost और quality स्पष्ट रहें।', 'Model cache हो तो update के बाद refresh करें।', 'Documents import करने से पहले छोटा प्रश्न चलाएं।'], trouble: '1. Knowledge answer unstable\n   - Stable chat model लें\n   - Document chunk size जांचें\n\n2. Model दिखाई नहीं देता\n   - Model ID manually दें\n   - Catalog से real name copy करें\n\n3. Auth fail\n   - Key पूरा है या नहीं देखें\n   - Environment variable override जांचें', next: 'Integrations overview पर लौटें' },
  bn: { title: 'সংযোগ পদ্ধতি', intro: 'এই page-এ AnythingLLM-এর chat model ও knowledge-base model আলাদা রাখা হয়, যাতে সব capability এক config-এ না মেশে।', overview: ['AnythingLLM-এ gpt88.cc যোগ করা।', 'আগে chat চালানো, পরে knowledge base যোগ করা।', 'Failure হলে কোন layer আগে দেখবেন।'], checklist: '1. API Key প্রস্তুত করুন\n2. Base URL https://api.gpt88.cc দিন\n3. Chat ও embedding model আলাদা রাখুন\n4. ছোট Q&A চালান\n5. পরে knowledge-base document import করুন', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A-তে embedding ও chat model আলাদা configure করুন।', verify: ['ছোট chat পাঠিয়ে model route যাচাই করুন।', 'ছোট document batch দিয়ে retrieval ও answer যাচাই করুন।', 'Result ভুল হলে knowledge base ও chat model আলাদা করে দেখুন।'], notes: ['Knowledge-base ও chat model আলাদা রাখুন, যাতে cost ও quality পরিষ্কার থাকে।', 'Model cache থাকলে update-এর পরে refresh করুন।', 'Document import-এর আগে ছোট প্রশ্ন চালান।'], trouble: '1. Knowledge answer unstable\n   - Stable chat model নিন\n   - Document chunk size দেখুন\n\n2. Model দেখা যাচ্ছে না\n   - Model ID হাতে দিন\n   - Catalog থেকে real name copy করুন\n\n3. Auth fail\n   - Key সম্পূর্ণ কি না দেখুন\n   - Environment variable override দেখুন', next: 'Integrations overview-এ ফিরুন' },
  ur: { title: 'کنکشن کا طریقہ', intro: 'یہ page AnythingLLM کے chat model اور knowledge-base model کو الگ رکھتا ہے تاکہ تمام capabilities ایک config میں نہ ملیں۔', overview: ['AnythingLLM میں gpt88.cc شامل کرنا۔', 'پہلے chat چلانا، پھر knowledge base شامل کرنا۔', 'Failure میں پہلے کون سی layer چیک کرنی ہے۔'], checklist: '1. API Key تیار کریں\n2. Base URL https://api.gpt88.cc رکھیں\n3. Chat اور embedding model الگ رکھیں\n4. مختصر Q&A چلائیں\n5. پھر knowledge-base documents import کریں', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A میں embedding اور chat model الگ configure کریں۔', verify: ['مختصر chat سے model route چیک کریں۔', 'چھوٹے document batch سے retrieval اور answer verify کریں۔', 'Result غلط ہو تو knowledge base اور chat model الگ چیک کریں۔'], notes: ['Knowledge-base اور chat model الگ رکھیں تاکہ cost اور quality واضح رہیں۔', 'Model cache ہو تو update کے بعد refresh کریں۔', 'Documents import سے پہلے مختصر سوال چلائیں۔'], trouble: '1. Knowledge answer unstable\n   - Stable chat model لیں\n   - Document chunk size چیک کریں\n\n2. Model نظر نہیں آتا\n   - Model ID manually دیں\n   - Catalog سے real name copy کریں\n\n3. Auth fail\n   - Key مکمل ہے یا نہیں دیکھیں\n   - Environment variable override چیک کریں', next: 'Integrations overview پر واپس جائیں' },
  ta: { title: 'இணைப்பு முறை', intro: 'இந்த page AnythingLLM-ன் chat model மற்றும் knowledge-base model-ஐப் பிரிக்கிறது; எல்லா capabilities-ஐ ஒரே config-ல் கலக்க வேண்டாம்.', overview: ['AnythingLLM-ல் gpt88.cc இணைப்பது.', 'முதலில் chat இயக்கி, பின்னர் knowledge base சேர்ப்பது.', 'Failure வந்தால் முதலில் எந்த layer-ஐச் சரிபார்ப்பது.'], checklist: '1. API Key தயார் செய்யவும்\n2. Base URL https://api.gpt88.cc அமைக்கவும்\n3. Chat மற்றும் embedding model-ஐப் பிரிக்கவும்\n4. சிறிய Q&A இயக்கவும்\n5. பின்னர் knowledge-base documents import செய்யவும்', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A-ல் embedding மற்றும் chat model-ஐ தனித்தனியாக configure செய்யவும்.', verify: ['சிறிய chat மூலம் model route சரிபார்க்கவும்.', 'சிறிய document batch மூலம் retrieval மற்றும் answer சரிபார்க்கவும்.', 'Result தவறாக இருந்தால் knowledge base மற்றும் chat model-ஐ தனித்தனியாக பார்க்கவும்.'], notes: ['Knowledge-base மற்றும் chat model-ஐப் பிரித்து வைத்து cost, quality தெளிவாக இருக்கச் செய்யவும்.', 'Model cache இருந்தால் update பிறகு refresh செய்யவும்.', 'Documents import முன் சிறிய கேள்வி இயக்கவும்.'], trouble: '1. Knowledge answer unstable\n   - Stable chat model பயன்படுத்தவும்\n   - Document chunk size சரிபார்க்கவும்\n\n2. Model தெரியவில்லை\n   - Model ID கைமுறையாக உள்ளிடவும்\n   - Catalog-ல் real name copy செய்யவும்\n\n3. Auth fail\n   - Key முழுமையா பார்க்கவும்\n   - Environment variable override சரிபார்க்கவும்', next: 'Integrations overview-க்கு திரும்பவும்' },
  ne: { title: 'जोड्ने तरिका', intro: 'यो page ले AnythingLLM को chat model र knowledge-base model अलग राख्छ, ताकि सबै capability एउटै config मा नमिसियोस्।', overview: ['AnythingLLM मा gpt88.cc जोड्ने।', 'पहिले chat चलाएर, पछि knowledge base थप्ने।', 'Failure मा कुन layer पहिले जाँच्ने।'], checklist: '1. API Key तयार गर्नुहोस्\n2. Base URL https://api.gpt88.cc राख्नुहोस्\n3. Chat र embedding model अलग राख्नुहोस्\n4. सानो Q&A चलाउनुहोस्\n5. त्यसपछि knowledge-base documents import गर्नुहोस्', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A मा embedding र chat model अलग configure गर्नुहोस्।', verify: ['सानो chat बाट model route जाँच्नुहोस्।', 'सानो document batch बाट retrieval र answer जाँच्नुहोस्।', 'Result गलत भए knowledge base र chat model अलग जाँच्नुहोस्।'], notes: ['Knowledge-base र chat model अलग राख्नुहोस् ताकि cost र quality स्पष्ट होस्।', 'Model cache भए update पछि refresh गर्नुहोस्।', 'Documents import अघि सानो प्रश्न चलाउनुहोस्।'], trouble: '1. Knowledge answer unstable\n   - Stable chat model प्रयोग गर्नुहोस्\n   - Document chunk size जाँच्नुहोस्\n\n2. Model देखिँदैन\n   - Model ID manually राख्नुहोस्\n   - Catalog बाट real name copy गर्नुहोस्\n\n3. Auth fail\n   - Key पूरा छ कि जाँच्नुहोस्\n   - Environment variable override जाँच्नुहोस्', next: 'Integrations overview मा फर्कनुहोस्' },
  si: { title: 'සම්බන්ධ කිරීමේ ක්‍රමය', intro: 'මෙම page එක AnythingLLM chat model සහ knowledge-base model වෙන් කරයි; සියලු capabilities එකම config එකකට මිශ්‍ර නොකරන්න.', overview: ['AnythingLLM වෙත gpt88.cc සම්බන්ධ කිරීම.', 'පළමුව chat ධාවනය කර පසුව knowledge base එක් කිරීම.', 'Failure එකකදී පළමුව පරීක්ෂා කළ යුතු layer එක දැනගැනීම.'], checklist: '1. API Key සූදානම් කරන්න\n2. Base URL https://api.gpt88.cc යොදන්න\n3. Chat සහ embedding model වෙන් කරන්න\n4. කුඩා Q&A එකක් ධාවනය කරන්න\n5. පසුව knowledge-base documents import කරන්න', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: gpt-5-2-chat-latest\n\nKnowledge-base Q&A තුළ embedding සහ chat model වෙන වෙනම configure කරන්න.', verify: ['කුඩා chat එකකින් model route පරීක්ෂා කරන්න.', 'කුඩා document batch එකකින් retrieval සහ answer පරීක්ෂා කරන්න.', 'Result වැරදි නම් knowledge base සහ chat model වෙන වෙනම පරීක්ෂා කරන්න.'], notes: ['Knowledge-base සහ chat model වෙන් කර තබා cost සහ quality පැහැදිලි කරන්න.', 'Model cache තිබේ නම් update පසු refresh කරන්න.', 'Documents import කිරීමට පෙර කුඩා ප්‍රශ්නයක් ධාවනය කරන්න.'], trouble: '1. Knowledge answer unstable\n   - Stable chat model භාවිතා කරන්න\n   - Document chunk size පරීක්ෂා කරන්න\n\n2. Model නොපෙනේ\n   - Model ID අතින් ඇතුළත් කරන්න\n   - Catalog එකෙන් real name copy කරන්න\n\n3. Auth fail\n   - Key සම්පූර්ණද බලන්න\n   - Environment variable override පරීක්ෂා කරන්න', next: 'Integrations overview වෙත ආපසු යන්න' },
}

export default function AnythingLlmPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <AnythingLlmPageEn />
  const copy = getIntegrationCopy(locale, 'anythingllm', { title: 'AnythingLLM 接入 gpt88.cc', description: '把 gpt88.cc 接到 AnythingLLM 的聊天和知识库工作流里。', intro: '聊天模型和 embedding 模型分开配置，先运行一次最小问答测试。' })
  const sections = getIntegrationSections(locale, 'anythingllm', { overview: '教程目标', prepare: '准备工作', setup: '配置方式', verify: '验证方式', notes: '注意事项', troubleshoot: '排障清单', next: '下一步' })
  const body = ANYTHING_BODY_COPY[locale] ?? ANYTHING_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/chat/anythingllm"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 }, { id: 'prepare', text: sections.prepare, level: 2 }, { id: 'setup', text: sections.setup, level: 2 }, { id: 'verify', text: sections.verify, level: 2 }, { id: 'notes', text: sections.notes, level: 2 }, { id: 'troubleshoot', text: sections.troubleshoot, level: 2 }, { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="info" title={body.title}>
        <p>{body.intro}</p>
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

      <h2 id="verify">{sections.verify}</h2>
      <ol>
        {body.verify.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="notes">{sections.notes}</h2>
      <ul>
        {body.notes.map(item => <li key={item}>{item}</li>)}
      </ul>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/integrations/">{body.next}</Link></li>
      </ul>
    </DocPage>
  )
}
