import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import DifyPageEn from '../../../en/DifyPageEn'

const PREPARE = `1. 已有 Dify 管理员权限
2. 已准备 gpt88.cc API Key
3. 已确认聊天模型 ID
4. 如果要做知识库，另外确认 embedding 模型
5. 已准备一个最小应用用于测试`

const PROVIDER_SETUP = `Provider: OpenAI Compatible
API Key: sk-你的-gpt88-api-key
API Base URL: https://api.gpt88.cc
Model Type: LLM
Model Name: gpt-5-2-chat-latest 或 claude-sonnet-4-6`

const APP_SETUP = `1. 打开 Dify 控制台
2. 进入 Settings / Model Provider
3. 新增 OpenAI Compatible Provider
4. 填入 gpt88.cc API Key
5. Base URL 填 https://api.gpt88.cc
6. 保存后进入应用
7. 在应用模型设置里选择刚才添加的模型
8. 发起一次最小对话测试`

const WORKFLOW_SETUP = `1. 新建 Chatflow 或 Workflow
2. 在 LLM 节点选择 gpt88.cc 模型
3. 输入一个固定测试问题
4. 运行节点，观察输出和错误信息
5. 再逐步加入知识库、工具和复杂 Prompt`

const KNOWLEDGE_NOTES = `知识库场景需要分开配置：

Chat Model: 负责最终回答
Embedding Model: 负责文档向量化
Rerank Model: 负责结果重排，可按需要配置

不要只配置聊天模型就直接导入大量知识库。先用 1-2 个短文档验证切块、召回和回答效果。`

const TROUBLESHOOTING = `1. Provider 保存失败
   - 检查 Base URL 是否为 https://api.gpt88.cc
   - 检查 API Key 是否完整

2. 应用里看不到模型
   - 确认模型已添加到 Dify Provider
   - 手动输入真实模型 ID

3. Workflow 节点报错
   - 先单独测试 LLM 节点
   - 再接知识库或工具节点

4. 知识库回答不准
   - 调整切块大小
   - 检查 embedding 模型是否配置
   - 减少一次性导入的文档量

5. 成本不清楚
   - 到 gpt88.cc 控制台查看人民币余额和真实扣费`

type DifyBody = { title: string; info: string; overview: string[]; prepare: string; provider: string; app: string; workflow: string; knowledge: string; verify: string[]; trouble: string; next: string[] }
const DIFY_BODY_COPY: Record<string, DifyBody> = {
  zh: { title: 'Dify 推荐接法', info: 'Dify 使用 OpenAI Compatible Provider 接入 gpt88.cc，Base URL 填 https://api.gpt88.cc。聊天模型、embedding 模型和知识库参数要分开验证。', overview: ['在 Dify 模型供应商里添加 gpt88.cc。', '把模型应用到普通聊天应用。', '在 Workflow / Chatflow 里验证 LLM 节点。', '把知识库模型和聊天模型拆开排查。'], prepare: PREPARE, provider: '进入 Dify 后台的模型供应商设置，新增 OpenAI 兼容供应商。', app: '供应商保存成功后，再把模型挂到具体应用里。', workflow: 'Dify 工作流排障要从单节点开始。先让 LLM 节点独立成功，再接知识库、HTTP 工具或变量处理。', knowledge: KNOWLEDGE_NOTES, verify: ['在模型供应商页面保存并测试连接。', '在普通聊天应用里发一条最短问题。', '在 Workflow 里单独运行 LLM 节点。', '使用知识库时，只导入一个短文档做第一次验证。'], trouble: TROUBLESHOOTING, next: ['查看 Chat Completions API', '查看完整接入手册', '返回集成总览'] },
  hi: { title: 'Dify की recommended setup', info: 'Dify में gpt88.cc को OpenAI Compatible Provider से जोड़ें और Base URL https://api.gpt88.cc रखें। Chat, embedding और knowledge-base parameters अलग verify करें।', overview: ['Dify model provider में gpt88.cc जोड़ें।', 'Model को सामान्य chat app में लगाएं।', 'Workflow / Chatflow में LLM node verify करें।', 'Knowledge-base और chat model अलग troubleshoot करें।'], prepare: '1. Dify admin permission है\n2. gpt88.cc API Key तैयार है\n3. Chat model ID पता है\n4. Knowledge base के लिए embedding model भी तय है\n5. छोटा test app तैयार है', provider: 'Dify admin के Model Provider settings में OpenAI-compatible provider जोड़ें।', app: 'Provider save होने के बाद model को किसी app में जोड़ें।', workflow: 'Workflow troubleshooting single node से शुरू करें। पहले LLM node सफल करें, फिर knowledge base, HTTP tool या variables जोड़ें।', knowledge: 'Knowledge base के लिए अलग config रखें:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nबड़ी document library से पहले 1-2 छोटे documents से chunking, retrieval और answer जांचें।', verify: ['Provider page पर save और connection test करें।', 'Normal chat app में छोटा सवाल भेजें।', 'Workflow में LLM node अकेले चलाएं।', 'Knowledge base हो तो पहले एक छोटा document import करें।'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc देखें\n   - API Key पूरा देखें\n\n2. App में model नहीं\n   - Provider में model add है देखें\n   - Model ID manually दें\n\n3. Workflow error\n   - LLM node अलग test करें\n   - बाद में knowledge/tool जोड़ें\n\n4. Knowledge answer गलत\n   - Chunk size और embedding जांचें\n   - एक बार में कम documents import करें\n\n5. Cost unclear\n   - Console balance और charge देखें', next: ['Chat Completions API देखें', 'Complete integration guide देखें', 'Integrations overview पर लौटें'] },
  bn: { title: 'Dify-এর recommended setup', info: 'Dify-তে gpt88.cc-কে OpenAI Compatible Provider দিয়ে যুক্ত করুন এবং Base URL https://api.gpt88.cc রাখুন। Chat, embedding ও knowledge-base parameter আলাদা verify করুন।', overview: ['Dify model provider-এ gpt88.cc যোগ করুন।', 'Model সাধারণ chat app-এ দিন।', 'Workflow / Chatflow-এ LLM node যাচাই করুন।', 'Knowledge-base ও chat model আলাদা troubleshoot করুন।'], prepare: '1. Dify admin permission আছে\n2. gpt88.cc API Key প্রস্তুত\n3. Chat model ID জানা\n4. Knowledge base-এর embedding model ঠিক করা\n5. ছোট test app প্রস্তুত', provider: 'Dify admin-এর Model Provider settings-এ OpenAI-compatible provider যোগ করুন।', app: 'Provider save হলে model-টি নির্দিষ্ট app-এ যোগ করুন।', workflow: 'Workflow troubleshooting single node থেকে শুরু করুন। আগে LLM node সফল করুন, পরে knowledge base, HTTP tool বা variable যোগ করুন।', knowledge: 'Knowledge base আলাদা config রাখুন:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nবড় document library-এর আগে 1-2টি ছোট document দিয়ে chunking, retrieval ও answer পরীক্ষা করুন।', verify: ['Provider page-এ save ও connection test করুন।', 'Normal chat app-এ ছোট প্রশ্ন পাঠান।', 'Workflow-এ LLM node একা চালান।', 'Knowledge base হলে আগে একটি ছোট document import করুন।'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc দেখুন\n   - API Key সম্পূর্ণ দেখুন\n\n2. App-এ model নেই\n   - Provider-এ model যোগ হয়েছে কি না দেখুন\n   - Model ID হাতে দিন\n\n3. Workflow error\n   - LLM node আলাদা test করুন\n   - পরে knowledge/tool যোগ করুন\n\n4. Knowledge answer ভুল\n   - Chunk size ও embedding দেখুন\n   - একবারে কম document import করুন\n\n5. Cost unclear\n   - Console balance ও charge দেখুন', next: ['Chat Completions API দেখুন', 'Complete integration guide দেখুন', 'Integrations overview-এ ফিরুন'] },
  ur: { title: 'Dify کا recommended setup', info: 'Dify میں gpt88.cc کو OpenAI Compatible Provider سے جوڑیں اور Base URL https://api.gpt88.cc رکھیں۔ Chat، embedding اور knowledge-base parameters الگ verify کریں۔', overview: ['Dify model provider میں gpt88.cc شامل کریں۔', 'Model کو عام chat app میں لگائیں۔', 'Workflow / Chatflow میں LLM node verify کریں۔', 'Knowledge-base اور chat model الگ troubleshoot کریں۔'], prepare: '1. Dify admin permission ہے\n2. gpt88.cc API Key تیار ہے\n3. Chat model ID معلوم ہے\n4. Knowledge base کے لیے embedding model طے ہے\n5. مختصر test app تیار ہے', provider: 'Dify admin کے Model Provider settings میں OpenAI-compatible provider شامل کریں۔', app: 'Provider save ہونے کے بعد model کو مخصوص app میں شامل کریں۔', workflow: 'Workflow troubleshooting single node سے شروع کریں۔ پہلے LLM node کامیاب کریں، پھر knowledge base، HTTP tool یا variables جوڑیں۔', knowledge: 'Knowledge base الگ configure کریں:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nبڑی document library سے پہلے 1-2 مختصر documents سے chunking، retrieval اور answer چیک کریں۔', verify: ['Provider page پر save اور connection test کریں۔', 'Normal chat app میں مختصر سوال بھیجیں۔', 'Workflow میں LLM node الگ چلائیں۔', 'Knowledge base ہو تو پہلے ایک مختصر document import کریں۔'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc چیک کریں\n   - API Key مکمل چیک کریں\n\n2. App میں model نہیں\n   - Provider میں model add ہے دیکھیں\n   - Model ID manually دیں\n\n3. Workflow error\n   - LLM node الگ test کریں\n   - پھر knowledge/tool جوڑیں\n\n4. Knowledge answer غلط\n   - Chunk size اور embedding چیک کریں\n   - ایک بار میں کم documents import کریں\n\n5. Cost unclear\n   - Console balance اور charge دیکھیں', next: ['Chat Completions API دیکھیں', 'Complete integration guide دیکھیں', 'Integrations overview پر واپس جائیں'] },
  ta: { title: 'Dify recommended setup', info: 'Dify-ல் gpt88.cc-ஐ OpenAI Compatible Provider மூலம் இணைத்து Base URL-ஐ https://api.gpt88.cc ஆக அமைக்கவும். Chat, embedding மற்றும் knowledge-base parameters-ஐ தனித்தனியாக verify செய்யவும்.', overview: ['Dify model provider-ல் gpt88.cc சேர்க்கவும்.', 'Model-ஐ சாதாரண chat app-ல் பயன்படுத்தவும்.', 'Workflow / Chatflow-ல் LLM node சரிபார்க்கவும்.', 'Knowledge-base மற்றும் chat model-ஐத் தனித்தனியாக troubleshoot செய்யவும்.'], prepare: '1. Dify admin permission உள்ளது\n2. gpt88.cc API Key தயார்\n3. Chat model ID தெரியும்\n4. Knowledge base-க்கு embedding model தேர்வு\n5. சிறிய test app தயார்', provider: 'Dify admin-ன் Model Provider settings-ல் OpenAI-compatible provider சேர்க்கவும்.', app: 'Provider save ஆன பிறகு model-ஐ குறிப்பிட்ட app-ல் சேர்க்கவும்.', workflow: 'Workflow troubleshooting single node-ல் தொடங்க வேண்டும். முதலில் LLM node வெற்றி பெறச் செய்து, பின்னர் knowledge base, HTTP tool அல்லது variables இணைக்கவும்.', knowledge: 'Knowledge base-ஐ தனியாக configure செய்யவும்:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nபெரிய document library முன் 1-2 சிறிய documents மூலம் chunking, retrieval மற்றும் answer சரிபார்க்கவும்.', verify: ['Provider page-ல் save செய்து connection test செய்யவும்.', 'Normal chat app-ல் சிறிய கேள்வி அனுப்பவும்.', 'Workflow-ல் LLM node-ஐத் தனியாக இயக்கவும்.', 'Knowledge base இருந்தால் முதலில் ஒரு சிறிய document import செய்யவும்.'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc சரிபார்க்கவும்\n   - API Key முழுமையா பார்க்கவும்\n\n2. App-ல் model இல்லை\n   - Provider-ல் model சேர்க்கப்பட்டதா பார்க்கவும்\n   - Model ID கைமுறையாக உள்ளிடவும்\n\n3. Workflow error\n   - LLM node தனியாக test செய்யவும்\n   - பின்னர் knowledge/tool சேர்க்கவும்\n\n4. Knowledge answer தவறு\n   - Chunk size மற்றும் embedding சரிபார்க்கவும்\n   - ஒரே நேரத்தில் குறைந்த documents import செய்யவும்\n\n5. Cost unclear\n   - Console balance மற்றும் charge பார்க்கவும்', next: ['Chat Completions API பார்க்கவும்', 'Complete integration guide பார்க்கவும்', 'Integrations overview-க்கு திரும்பவும்'] },
  ne: { title: 'Dify को recommended setup', info: 'Dify मा gpt88.cc लाई OpenAI Compatible Provider बाट जोडेर Base URL https://api.gpt88.cc राख्नुहोस्। Chat, embedding र knowledge-base parameters अलग verify गर्नुहोस्।', overview: ['Dify model provider मा gpt88.cc थप्नुहोस्।', 'Model लाई सामान्य chat app मा लगाउनुहोस्।', 'Workflow / Chatflow मा LLM node verify गर्नुहोस्।', 'Knowledge-base र chat model अलग troubleshoot गर्नुहोस्।'], prepare: '1. Dify admin permission छ\n2. gpt88.cc API Key तयार छ\n3. Chat model ID थाहा छ\n4. Knowledge base को embedding model तय छ\n5. सानो test app तयार छ', provider: 'Dify admin को Model Provider settings मा OpenAI-compatible provider थप्नुहोस्।', app: 'Provider save भएपछि model लाई app मा जोड्नुहोस्।', workflow: 'Workflow troubleshooting single node बाट सुरु गर्नुहोस्। पहिले LLM node सफल गराएर पछि knowledge base, HTTP tool वा variables जोड्नुहोस्।', knowledge: 'Knowledge base अलग configure गर्नुहोस्:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nठूलो document library अघि 1-2 साना documents बाट chunking, retrieval र answer जाँच्नुहोस्।', verify: ['Provider page मा save र connection test गर्नुहोस्।', 'Normal chat app मा सानो प्रश्न पठाउनुहोस्।', 'Workflow मा LLM node अलग चलाउनुहोस्।', 'Knowledge base भए पहिले एउटा सानो document import गर्नुहोस्।'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc जाँच्नुहोस्\n   - API Key पूरा जाँच्नुहोस्\n\n2. App मा model छैन\n   - Provider मा model add छ कि हेर्नुहोस्\n   - Model ID manually राख्नुहोस्\n\n3. Workflow error\n   - LLM node अलग test गर्नुहोस्\n   - पछि knowledge/tool जोड्नुहोस्\n\n4. Knowledge answer गलत\n   - Chunk size र embedding जाँच्नुहोस्\n   - एकपटकमा कम documents import गर्नुहोस्\n\n5. Cost unclear\n   - Console balance र charge हेर्नुहोस्', next: ['Chat Completions API हेर्नुहोस्', 'Complete integration guide हेर्नुहोस्', 'Integrations overview मा फर्कनुहोस्'] },
  si: { title: 'Dify recommended setup', info: 'Dify තුළ gpt88.cc OpenAI Compatible Provider එකක් ලෙස සම්බන්ධ කර Base URL https://api.gpt88.cc යොදන්න. Chat, embedding සහ knowledge-base parameters වෙන වෙනම verify කරන්න.', overview: ['Dify model provider තුළ gpt88.cc එක් කරන්න.', 'Model එක සාමාන්‍ය chat app එකකට යොදන්න.', 'Workflow / Chatflow තුළ LLM node පරීක්ෂා කරන්න.', 'Knowledge-base සහ chat model වෙන වෙනම troubleshoot කරන්න.'], prepare: '1. Dify admin permission ඇත\n2. gpt88.cc API Key සූදානම්\n3. Chat model ID දනී\n4. Knowledge base සඳහා embedding model තීරණය කර ඇත\n5. කුඩා test app එකක් සූදානම්', provider: 'Dify admin හි Model Provider settings තුළ OpenAI-compatible provider එකක් එක් කරන්න.', app: 'Provider save වූ පසු model එක app එකකට එක් කරන්න.', workflow: 'Workflow troubleshooting single node එකකින් ආරම්භ කරන්න. පළමුව LLM node සාර්ථක කර පසුව knowledge base, HTTP tool හෝ variables එක් කරන්න.', knowledge: 'Knowledge base එක වෙනම configure කරන්න:\n\nChat Model: final answer\nEmbedding Model: document vectorization\nRerank Model: result reorder, optional\n\nවිශාල document library එකකට පෙර documents 1-2 කින් chunking, retrieval සහ answer පරීක්ෂා කරන්න.', verify: ['Provider page එකේ save කර connection test කරන්න.', 'Normal chat app එකක කුඩා ප්‍රශ්නයක් යවන්න.', 'Workflow තුළ LLM node එක තනිව ධාවනය කරන්න.', 'Knowledge base භාවිතා කරන්නේ නම් පළමුව කුඩා document එකක් import කරන්න.'], trouble: '1. Provider save fail\n   - Base URL https://api.gpt88.cc පරීක්ෂා කරන්න\n   - API Key සම්පූර්ණද බලන්න\n\n2. App තුළ model නැත\n   - Provider තුළ model එක් කර ඇත්ද බලන්න\n   - Model ID අතින් ඇතුළත් කරන්න\n\n3. Workflow error\n   - LLM node එක තනිව test කරන්න\n   - පසුව knowledge/tool එක් කරන්න\n\n4. Knowledge answer වැරදියි\n   - Chunk size සහ embedding පරීක්ෂා කරන්න\n   - එකවර documents අඩු ප්‍රමාණයක් import කරන්න\n\n5. Cost unclear\n   - Console balance සහ charge බලන්න', next: ['Chat Completions API බලන්න', 'Complete integration guide බලන්න', 'Integrations overview වෙත ආපසු යන්න'] },
}

export default function DifyIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <DifyPageEn />
  const copy = getIntegrationCopy(locale, 'dify', { title: 'Dify 接入 gpt88.cc', description: '把 gpt88.cc 接入 Dify 平台、Chatflow、Workflow 和知识库的逐步教程。', intro: '聊天模型和 embedding 模型需要分开配置，建议先用一个最小应用验证。' })
  const sections = getIntegrationSections(locale, 'dify', { overview: '教程目标', prepare: '准备工作', provider: '第一步：添加模型供应商', app: '第二步：接入应用', workflow: '第三步：接入工作流', knowledge: '知识库配置', verify: '验证方式', troubleshoot: '排障清单', next: '下一步' })
  const body = DIFY_BODY_COPY[locale] ?? DIFY_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/platforms/dify"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'overview', text: sections.overview, level: 2 }, { id: 'prepare', text: sections.prepare, level: 2 }, { id: 'provider', text: sections.provider, level: 2 }, { id: 'app', text: sections.app, level: 2 }, { id: 'workflow', text: sections.workflow, level: 2 }, { id: 'knowledge', text: sections.knowledge, level: 2 }, { id: 'verify', text: sections.verify, level: 2 }, { id: 'troubleshoot', text: sections.troubleshoot, level: 2 }, { id: 'next', text: sections.next, level: 2 },
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

      <h2 id="provider">{sections.provider}</h2>
      <p>{body.provider}</p>
      <CodeBlock lang="text" filename="provider" code={PROVIDER_SETUP} />

      <h2 id="app">{sections.app}</h2>
      <p>{body.app}</p>
      <CodeBlock lang="text" filename="app-setup" code={APP_SETUP} />

      <h2 id="workflow">{sections.workflow}</h2>
      <p>
        {body.workflow}
      </p>
      <CodeBlock lang="text" filename="workflow" code={WORKFLOW_SETUP} />

      <h2 id="knowledge">{sections.knowledge}</h2>
      <CodeBlock lang="text" filename="knowledge" code={body.knowledge} />

      <h2 id="verify">{sections.verify}</h2>
      <ol>
        {body.verify.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/api/chat-completions/">{body.next[0]}</Link></li>
        <li><Link to="/docs/guides/complete-integration/">{body.next[1]}</Link></li>
        <li><Link to="/docs/integrations/">{body.next[2]}</Link></li>
      </ul>
    </DocPage>
  )
}
