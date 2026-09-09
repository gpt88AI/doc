import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import ChatboxPageEn from '../../../en/ChatboxPageEn'

const PREPARE = `1. 已安装 ChatBox 桌面端
2. 已注册 gpt88.cc 账号并创建 API Key
3. 已确认你要接入的模型 ID
4. 已知道当前工具是 OpenAI 风格还是 Claude 风格
5. 已准备好一条最小测试消息`

const OPENAI_CONFIG = `Provider: OpenAI API
API Key: sk-你的-gpt88-api-key
API Host / API Domain: https://api.gpt88.cc
Model: claude-haiku-4-5-20251001 或 gpt-5-2-chat-latest`

const CLAUDE_CONFIG = `如果你的 ChatBox 版本提供 Claude API 选项：

Provider: Claude API
API Key: sk-你的-gpt88-api-key
API Host / API Domain: https://api.gpt88.cc
Model: claude-sonnet-4-6 或 claude-haiku-4-5-20251001`

const SMOKE_TEST = `export GPT88_API_KEY="sk-你的-gpt88-api-key"

curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const TROUBLESHOOTING = `1. 连不上服务
   - 检查 Base URL 是否为 https://api.gpt88.cc
   - 检查 API Key 是否完整
   - 先用 curl 验证，再回到 ChatBox

2. 模型列表为空
   - 手动输入模型 ID
   - 到 /v1/models 或模型导航复制真实模型名

3. 返回 401
   - Key 无效、过期或权限不足

4. 返回 404
   - 多半是 Base URL 或模型名写错

5. 返回很慢
   - 先换一个更轻的模型测试网络和配置`

const CHATBOX_BODY_COPY: Record<string, { stableTitle: string; stable: string; intro: string; before: string; prepare: string; rows: string[][]; protocolTitle: string; protocol: string; launch: string; launchSteps: string[]; provider: string; apiIntro: string; claudeIntro: string; tableHeaders: string[]; tableRows: string[][]; modelIntro: string; modelHeaders: string[]; modelRows: string[][] }> = {
  zh: { stableTitle: 'ChatBox 里最稳的接法', stable: '绝大多数场景下，直接把 ChatBox 的 OpenAI 兼容配置指向 https://api.gpt88.cc 就够了。只要模型 ID 选对，你基本可以不改聊天工作流。', intro: '这篇教程的目标不是“知道有个配置项”，而是让你按步骤把 ChatBox 从空白状态接成可用状态：先填 API Key，再填 Base URL，再选模型，最后做一轮验证。', before: '开始之前，先确认这几件事：', prepare: PREPARE, rows: [['ChatBox 桌面端', '优先用最新稳定版', '新版本通常更好兼容自定义 API Host 和模型选择。'], ['API Key', '在 gpt88.cc 控制台新建独立 Key', '方便按项目停用、限额和排查用量。'], ['模型 ID', '先从稳定模型开始', '先跑通连通性，再切换更强或更贵模型。'], ['Base URL', 'OpenAI 风格使用 https://api.gpt88.cc', '这是 ChatBox 最通用、配置最少的接法。']], protocolTitle: '先决定你走哪种协议', protocol: 'OpenAI 和 Claude 风格都填写 https://api.gpt88.cc，协议差异通过请求路径、请求头和请求体字段处理。', launch: '首次启动 ChatBox 通常会看到配置向导；如果已经配置过，也可以从设置重新进入。目标是先配好 API Host 和模型 Provider。', launchSteps: ['启动 ChatBox 应用。', '首次使用时进入新建对话或配置向导。', '已配置过则打开设置。', '找到 AI Provider / 模型提供商配置。'], provider: 'gpt88.cc 最常见的方案是选择 OpenAI API。如果 ChatBox 版本提供 Claude API 选项并且要用 Claude 系列模型，也可以切到 Claude 风格。', apiIntro: '推荐先按 OpenAI 风格配置：', claudeIntro: '如果准备走 Claude 风格，再改成下面这样：', tableHeaders: ['配置项', 'OpenAI 风格', 'Claude 风格'], tableRows: [['API Key', '填写 gpt88.cc 控制台生成的 Key', '同样填写 gpt88.cc 控制台生成的 Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['模型选择', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: '配置好 Host 后，模型选择是第二个关键点。下拉列表没有刷新时，直接复制模型 ID 往往更快。', modelHeaders: ['场景', '建议模型', '说明'], modelRows: [['快速问答', 'gpt-4o-mini / claude-haiku-4-5-20251001', '响应快，适合验证连通性。'], ['通用对话', 'gpt-5-2-chat-latest / claude-sonnet-4-6', '适合日常聊天、总结和写作。'], ['长上下文任务', 'claude-sonnet-4-6', '适合长文分析和复杂推理。']] },
  hi: { stableTitle: 'ChatBox में सबसे स्थिर तरीका', stable: 'अधिकांश मामलों में ChatBox की OpenAI-compatible config को https://api.gpt88.cc पर रखें। सही model ID चुनने पर workflow बदलने की जरूरत नहीं होती।', intro: 'लक्ष्य केवल setting जानना नहीं, बल्कि ChatBox को usable बनाना है: API Key, Base URL, model और फिर verification।', before: 'शुरू करने से पहले यह जांचें:', prepare: '1. ChatBox desktop install है\n2. gpt88.cc account और API Key तैयार है\n3. Model ID पता है\n4. Tool OpenAI या Claude style है\n5. छोटा test message तैयार है', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host और model selection बेहतर चलता है।'], ['API Key', 'Console में अलग Key बनाएं', 'Project-wise disable और usage troubleshooting आसान।'], ['Model ID', 'Stable model से शुरू करें', 'पहले connection, फिर stronger/costlier model।'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'सबसे सामान्य और कम configuration वाला तरीका।']], protocolTitle: 'पहले protocol चुनें', protocol: 'OpenAI और Claude दोनों के लिए https://api.gpt88.cc रखें; अंतर path, headers और body fields में संभाला जाता है।', launch: 'पहली बार ChatBox में setup wizard दिखेगा; पहले से configured हो तो Settings से खोलें। पहले API Host और Provider सेट करें।', launchSteps: ['ChatBox शुरू करें।', 'पहली बार हो तो नया chat या setup wizard खोलें।', 'पहले से configured हो तो Settings खोलें।', 'AI Provider / model provider setting खोजें।'], provider: 'gpt88.cc के लिए सामान्य विकल्प OpenAI API है। Claude model चाहिए और version में Claude API हो तो Claude style चुनें।', apiIntro: 'पहले OpenAI style config करें:', claudeIntro: 'Claude style चाहिए तो यह config उपयोग करें:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console का gpt88.cc Key', 'वही gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host के बाद model selection महत्वपूर्ण है। List refresh न हो तो model ID manually paste करें।', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'Fast connection check।'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Daily chat, summary और writing।'], ['Long context', 'claude-sonnet-4-6', 'Long analysis और complex reasoning।']] },
  bn: { stableTitle: 'ChatBox-এ স্থিতিশীল পদ্ধতি', stable: 'বেশিরভাগ ক্ষেত্রে ChatBox-এর OpenAI-compatible config-কে https://api.gpt88.cc দিন। সঠিক model ID হলে workflow বদলাতে হয় না।', intro: 'লক্ষ্য শুধু setting জানা নয়; API Key, Base URL, model দিয়ে ChatBox চালু করে শেষে verification করা।', before: 'শুরু করার আগে এগুলি দেখুন:', prepare: '1. ChatBox desktop install আছে\n2. gpt88.cc account ও API Key প্রস্তুত\n3. Model ID জানা\n4. Tool OpenAI বা Claude style\n5. ছোট test message প্রস্তুত', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host ও model selection ভালো কাজ করে।'], ['API Key', 'Console-এ আলাদা Key তৈরি করুন', 'Project-wise disable ও usage troubleshooting সহজ।'], ['Model ID', 'Stable model দিয়ে শুরু করুন', 'আগে connection, পরে stronger/costlier model।'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'সবচেয়ে সাধারণ ও কম configuration।']], protocolTitle: 'আগে protocol ঠিক করুন', protocol: 'OpenAI ও Claude উভয়ের জন্য https://api.gpt88.cc দিন; পার্থক্য path, headers ও body fields-এ থাকে।', launch: 'প্রথমবার ChatBox-এ setup wizard আসবে; আগে config থাকলে Settings থেকে খুলুন। আগে API Host ও Provider ঠিক করুন।', launchSteps: ['ChatBox চালু করুন।', 'প্রথমবার হলে নতুন chat বা setup wizard খুলুন।', 'আগে config থাকলে Settings খুলুন।', 'AI Provider / model provider setting খুঁজুন।'], provider: 'gpt88.cc-এর জন্য OpenAI API সাধারণ পছন্দ। Claude model এবং version-এ Claude API থাকলে Claude style ব্যবহার করুন।', apiIntro: 'প্রথমে OpenAI style config করুন:', claudeIntro: 'Claude style হলে এই config ব্যবহার করুন:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console-এর gpt88.cc Key', 'একই gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host-এর পরে model selection গুরুত্বপূর্ণ। List refresh না হলে model ID হাতে paste করুন।', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'দ্রুত connection check।'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Daily chat, summary ও writing।'], ['Long context', 'claude-sonnet-4-6', 'Long analysis ও complex reasoning।']] },
  ur: { stableTitle: 'ChatBox میں مستحکم طریقہ', stable: 'زیادہ تر صورتوں میں ChatBox کی OpenAI-compatible config کو https://api.gpt88.cc پر رکھیں۔ درست model ID کے بعد workflow بدلنے کی ضرورت نہیں۔', intro: 'مقصد صرف setting جاننا نہیں بلکہ API Key، Base URL اور model سے ChatBox چلانا اور پھر verify کرنا ہے۔', before: 'شروع کرنے سے پہلے یہ چیک کریں:', prepare: '1. ChatBox desktop install ہے\n2. gpt88.cc account اور API Key تیار ہے\n3. Model ID معلوم ہے\n4. Tool OpenAI یا Claude style ہے\n5. مختصر test message تیار ہے', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host اور model selection بہتر چلتے ہیں۔'], ['API Key', 'Console میں الگ Key بنائیں', 'Project-wise disable اور usage troubleshooting آسان۔'], ['Model ID', 'Stable model سے شروع کریں', 'پہلے connection، پھر stronger/costlier model۔'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'عام اور کم configuration والا طریقہ۔']], protocolTitle: 'پہلے protocol منتخب کریں', protocol: 'OpenAI اور Claude دونوں کے لیے https://api.gpt88.cc رکھیں؛ فرق path، headers اور body fields میں handle ہوتا ہے۔', launch: 'پہلی بار ChatBox setup wizard دکھائے گا؛ پہلے config ہو تو Settings سے کھولیں۔ پہلے API Host اور Provider set کریں۔', launchSteps: ['ChatBox شروع کریں۔', 'پہلی بار ہو تو نیا chat یا setup wizard کھولیں۔', 'پہلے config ہو تو Settings کھولیں۔', 'AI Provider / model provider setting تلاش کریں۔'], provider: 'gpt88.cc کے لیے OpenAI API عام انتخاب ہے۔ Claude model اور Claude API option ہو تو Claude style منتخب کریں۔', apiIntro: 'پہلے OpenAI style config کریں:', claudeIntro: 'Claude style کے لیے یہ config رکھیں:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console کا gpt88.cc Key', 'وہی gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host کے بعد model selection اہم ہے۔ List refresh نہ ہو تو model ID manually paste کریں۔', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'تیز connection check۔'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'روزمرہ chat، summary اور writing۔'], ['Long context', 'claude-sonnet-4-6', 'طویل analysis اور complex reasoning۔']] },
  ta: { stableTitle: 'ChatBox-ல் நிலையான முறை', stable: 'பெரும்பாலான சூழலில் ChatBox OpenAI-compatible config-ஐ https://api.gpt88.cc-க்கு அமைக்கவும். சரியான model ID இருந்தால் workflow மாற்ற வேண்டியதில்லை.', intro: 'API Key, Base URL, model அமைத்து ChatBox-ஐ இயக்கி, இறுதியில் verify செய்வதே இந்த வழிகாட்டியின் நோக்கம்.', before: 'தொடங்கும் முன் இவற்றைச் சரிபார்க்கவும்:', prepare: '1. ChatBox desktop install செய்யப்பட்டுள்ளது\n2. gpt88.cc account மற்றும் API Key தயார்\n3. Model ID தெரியும்\n4. Tool OpenAI அல்லது Claude style\n5. சிறிய test message தயார்', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host மற்றும் model selection சிறப்பாக இயங்கும்.'], ['API Key', 'Console-ல் தனி Key உருவாக்கவும்', 'Project-wise disable மற்றும் usage troubleshooting எளிது.'], ['Model ID', 'Stable model-ல் தொடங்கவும்', 'முதலில் connection, பின்னர் stronger/costlier model.'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'பொதுவான குறைந்த configuration முறை.']], protocolTitle: 'முதலில் protocol தேர்வு செய்யவும்', protocol: 'OpenAI மற்றும் Claude இரண்டிற்கும் https://api.gpt88.cc பயன்படுத்தவும்; வேறுபாடு path, headers மற்றும் body fields மூலம் கையாளப்படும்.', launch: 'முதல் முறையில் ChatBox setup wizard காட்டும்; config இருந்தால் Settings-ல் திறக்கவும். முதலில் API Host மற்றும் Provider அமைக்கவும்.', launchSteps: ['ChatBox தொடங்கவும்.', 'முதல் பயன்பாடு என்றால் புதிய chat அல்லது setup wizard திறக்கவும்.', 'Config இருந்தால் Settings திறக்கவும்.', 'AI Provider / model provider setting கண்டுபிடிக்கவும்.'], provider: 'gpt88.cc-க்கு OpenAI API பொதுவான தேர்வு. Claude model மற்றும் Claude API option இருந்தால் Claude style தேர்வு செய்யலாம்.', apiIntro: 'முதலில் OpenAI style config அமைக்கவும்:', claudeIntro: 'Claude style-க்கு இதைப் பயன்படுத்தவும்:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console gpt88.cc Key', 'அதே gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host பிறகு model selection முக்கியம். List refresh ஆகாவிட்டால் model ID-ஐ கைமுறையாக paste செய்யவும்.', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'வேகமான connection check.'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Daily chat, summary மற்றும் writing.'], ['Long context', 'claude-sonnet-4-6', 'Long analysis மற்றும் complex reasoning.']] },
  ne: { stableTitle: 'ChatBox मा स्थिर तरिका', stable: 'धेरै अवस्थामा ChatBox को OpenAI-compatible config लाई https://api.gpt88.cc मा राख्नुहोस्। सही model ID भए workflow बदल्नुपर्दैन।', intro: 'API Key, Base URL र model राखेर ChatBox चलाउने र अन्त्यमा verify गर्ने यस tutorial को लक्ष्य हो।', before: 'सुरु गर्नुअघि यी जाँच्नुहोस्:', prepare: '1. ChatBox desktop install छ\n2. gpt88.cc account र API Key तयार छ\n3. Model ID थाहा छ\n4. Tool OpenAI वा Claude style हो\n5. सानो test message तयार छ', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host र model selection राम्रो चल्छ।'], ['API Key', 'Console मा छुट्टै Key बनाउनुहोस्', 'Project-wise disable र usage troubleshooting सजिलो।'], ['Model ID', 'Stable model बाट सुरु गर्नुहोस्', 'पहिले connection, पछि stronger/costlier model।'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'सामान्य र कम configuration को तरिका।']], protocolTitle: 'पहिले protocol छान्नुहोस्', protocol: 'OpenAI र Claude दुवैका लागि https://api.gpt88.cc राख्नुहोस्; फरक path, headers र body fields बाट सम्हालिन्छ।', launch: 'पहिलो पटक ChatBox setup wizard देखाउँछ; पहिले config भए Settings बाट खोल्नुहोस्। पहिले API Host र Provider set गर्नुहोस्।', launchSteps: ['ChatBox सुरु गर्नुहोस्।', 'पहिलो पटक भए नयाँ chat वा setup wizard खोल्नुहोस्।', 'Config भए Settings खोल्नुहोस्।', 'AI Provider / model provider setting खोज्नुहोस्।'], provider: 'gpt88.cc का लागि OpenAI API सामान्य विकल्प हो। Claude model र Claude API option भए Claude style रोज्नुहोस्।', apiIntro: 'पहिले OpenAI style config राख्नुहोस्:', claudeIntro: 'Claude style का लागि यो config राख्नुहोस्:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console को gpt88.cc Key', 'उही gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host पछि model selection महत्वपूर्ण छ। List refresh नभए model ID manually paste गर्नुहोस्।', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'छिटो connection check।'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Daily chat, summary र writing।'], ['Long context', 'claude-sonnet-4-6', 'Long analysis र complex reasoning।']] },
  si: { stableTitle: 'ChatBox හි ස්ථාවර ක්‍රමය', stable: 'බොහෝ අවස්ථාවල ChatBox OpenAI-compatible config එක https://api.gpt88.cc වෙත යොදන්න. නිවැරදි model ID එකක් නම් workflow වෙනස් කිරීමට අවශ්‍ය නැත.', intro: 'API Key, Base URL සහ model සකසා ChatBox ක්‍රියාත්මක කර අවසානයේ verify කිරීම මෙම tutorial හි අරමුණයි.', before: 'ආරම්භ කිරීමට පෙර මෙය පරීක්ෂා කරන්න:', prepare: '1. ChatBox desktop install කර ඇත\n2. gpt88.cc account සහ API Key සූදානම්\n3. Model ID දනී\n4. Tool OpenAI හෝ Claude style වේ\n5. කුඩා test message එකක් සූදානම්', rows: [['ChatBox desktop', 'Latest stable version', 'Custom API Host සහ model selection හොඳින් ක්‍රියා කරයි.'], ['API Key', 'Console තුළ වෙනම Key එකක් සාදන්න', 'Project-wise disable සහ usage troubleshooting පහසුය.'], ['Model ID', 'Stable model එකකින් ආරම්භ කරන්න', 'පළමුව connection, පසුව stronger/costlier model.'], ['Base URL', 'OpenAI style: https://api.gpt88.cc', 'සාමාන්‍ය සහ අඩු configuration ක්‍රමය.']], protocolTitle: 'පළමුව protocol එක තෝරන්න', protocol: 'OpenAI සහ Claude දෙකටම https://api.gpt88.cc භාවිතා කරන්න; වෙනස path, headers සහ body fields මඟින් හසුරුවයි.', launch: 'පළමු වරට ChatBox setup wizard පෙන්වයි; config තිබේ නම් Settings තුළින් විවෘත කරන්න. පළමුව API Host සහ Provider සකසන්න.', launchSteps: ['ChatBox ආරම්භ කරන්න.', 'පළමු වරට නම් නව chat හෝ setup wizard විවෘත කරන්න.', 'Config තිබේ නම් Settings විවෘත කරන්න.', 'AI Provider / model provider setting සොයන්න.'], provider: 'gpt88.cc සඳහා OpenAI API සාමාන්‍ය තේරීමයි. Claude model සහ Claude API option තිබේ නම් Claude style තෝරන්න.', apiIntro: 'පළමුව OpenAI style config සකසන්න:', claudeIntro: 'Claude style සඳහා මෙය භාවිතා කරන්න:', tableHeaders: ['Config', 'OpenAI style', 'Claude style'], tableRows: [['API Key', 'Console gpt88.cc Key', 'එම gpt88.cc Key'], ['API Host / Domain', 'https://api.gpt88.cc', 'https://api.gpt88.cc'], ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001']], modelIntro: 'Host පසු model selection වැදගත්ය. List refresh නොවේ නම් model ID අතින් paste කරන්න.', modelHeaders: ['Scenario', 'Suggested model', 'Reason'], modelRows: [['Quick Q&A', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'වේගවත් connection check.'], ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Daily chat, summary සහ writing.'], ['Long context', 'claude-sonnet-4-6', 'Long analysis සහ complex reasoning.']] },
}

const CHATBOX_LOWER_COPY: Record<string, { faq: string[]; tips: string[]; next: string[] }> = {
  zh: { faq: ['Q1：无法连接到 gpt88.cc？', 'Q2：模型列表里没有显示模型？', 'Q3：对话报错怎么办？', 'Q4：怎么看用量和费用？', 'Q5：ChatBox 支持哪些平台？'], tips: ['先跑通最小请求，再调参数。', '把常用模型固定成默认模型，减少手动输入。', '长任务用更强模型，简单问答用更便宜、更快的模型。', '如果主要做开发，先看完整接入手册。'], next: ['如果要理解整个站点的接入心智，可以看 gpt88.cc 通用接入教程。', '如果要把配置同步给其他工具，可以看配置文件导出。', '如果要继续看 API 说明，可以看快速开始和 Chat Completions API。'] },
  hi: { faq: ['Q1: gpt88.cc से connect नहीं हो रहा?', 'Q2: Model list में model नहीं दिखता?', 'Q3: Chat error आए तो क्या करें?', 'Q4: Usage और cost कहां देखें?', 'Q5: ChatBox किन platforms को support करता है?'], tips: ['पहले minimum request चलाएं, फिर parameters बदलें।', 'Common model को default बनाएं ताकि बार-बार input न करना पड़े।', 'Long task में strong model और simple Q&A में सस्ता, तेज model लें।', 'Development के लिए Complete integration guide देखें।'], next: ['पूरे integration mental model के लिए gpt88.cc tutorial देखें।', 'Config दूसरे tools में sync करने के लिए Configuration export देखें।', 'API details के लिए Quickstart और Chat Completions API देखें।'] },
  bn: { faq: ['Q1: gpt88.cc-তে connect হচ্ছে না?', 'Q2: Model list-এ model দেখা যাচ্ছে না?', 'Q3: Chat error হলে কী করবেন?', 'Q4: Usage ও cost কোথায় দেখবেন?', 'Q5: ChatBox কোন platform support করে?'], tips: ['আগে minimum request চালান, পরে parameter বদলান।', 'Common model default করুন যাতে বারবার input না লাগে।', 'Long task-এ strong model এবং simple Q&A-তে সস্তা, দ্রুত model নিন।', 'Development-এর জন্য Complete integration guide দেখুন।'], next: ['পুরো integration mental model-এর জন্য gpt88.cc tutorial দেখুন।', 'অন্য tool-এ config sync করতে Configuration export দেখুন।', 'API details-এর জন্য Quickstart ও Chat Completions API দেখুন।'] },
  ur: { faq: ['Q1: gpt88.cc سے connect نہیں ہو رہا؟', 'Q2: Model list میں model نہیں دکھ رہا؟', 'Q3: Chat error آئے تو کیا کریں؟', 'Q4: Usage اور cost کہاں دیکھیں؟', 'Q5: ChatBox کن platforms کو support کرتا ہے؟'], tips: ['پہلے minimum request چلائیں، پھر parameters بدلیں۔', 'Common model کو default رکھیں تاکہ بار بار input نہ کرنا پڑے۔', 'Long task کے لیے strong model اور simple Q&A کے لیے سستا، تیز model لیں۔', 'Development کے لیے Complete integration guide دیکھیں۔'], next: ['مکمل integration mental model کے لیے gpt88.cc tutorial دیکھیں۔', 'دوسرے tools میں config sync کرنے کے لیے Configuration export دیکھیں۔', 'API details کے لیے Quickstart اور Chat Completions API دیکھیں۔'] },
  ta: { faq: ['Q1: gpt88.cc-க்கு connect ஆகவில்லை?', 'Q2: Model list-ல் model இல்லை?', 'Q3: Chat error வந்தால் என்ன செய்வது?', 'Q4: Usage மற்றும் cost எங்கே பார்க்கலாம்?', 'Q5: ChatBox எந்த platforms-ஐ ஆதரிக்கிறது?'], tips: ['முதலில் minimum request இயக்கி, பின்னர் parameters மாற்றவும்.', 'Common model-ஐ default ஆக வைத்து manual input குறைக்கவும்.', 'Long task-க்கு strong model, simple Q&A-க்கு மலிவான வேகமான model பயன்படுத்தவும்.', 'Development-க்கு Complete integration guide பார்க்கவும்.'], next: ['முழு integration mental model-க்கு gpt88.cc tutorial பார்க்கவும்.', 'மற்ற tools-க்கு config sync செய்ய Configuration export பார்க்கவும்.', 'API details-க்கு Quickstart மற்றும் Chat Completions API பார்க்கவும்.'] },
  ne: { faq: ['Q1: gpt88.cc connect हुँदैन?', 'Q2: Model list मा model देखिँदैन?', 'Q3: Chat error आए के गर्ने?', 'Q4: Usage र cost कहाँ हेर्ने?', 'Q5: ChatBox कुन platforms मा चल्छ?'], tips: ['पहिले minimum request चलाएर मात्र parameters बदल्नुहोस्।', 'Common model लाई default राखेर manual input घटाउनुहोस्।', 'Long task मा strong model र simple Q&A मा सस्तो, छिटो model प्रयोग गर्नुहोस्।', 'Development का लागि Complete integration guide हेर्नुहोस्।'], next: ['सम्पूर्ण integration mental model का लागि gpt88.cc tutorial हेर्नुहोस्।', 'अन्य tools मा config sync गर्न Configuration export हेर्नुहोस्।', 'API details का लागि Quickstart र Chat Completions API हेर्नुहोस्।'] },
  si: { faq: ['Q1: gpt88.cc වෙත connect නොවේද?', 'Q2: Model list එකේ model නොපෙනේද?', 'Q3: Chat error එකක් ආවොත් කුමක් කරන්නද?', 'Q4: Usage සහ cost බලන්නේ කොහොමද?', 'Q5: ChatBox සහාය දක්වන platforms මොනවාද?'], tips: ['පළමුව minimum request එකක් ධාවනය කර පසුව parameters වෙනස් කරන්න.', 'Common model එක default කර manual input අඩු කරන්න.', 'Long task සඳහා strong model, simple Q&A සඳහා අඩු වියදම් වේගවත් model භාවිතා කරන්න.', 'Development සඳහා Complete integration guide බලන්න.'], next: ['සම්පූර්ණ integration mental model සඳහා gpt88.cc tutorial බලන්න.', 'වෙනත් tools වෙත config sync කිරීමට Configuration export බලන්න.', 'API details සඳහා Quickstart සහ Chat Completions API බලන්න.'] },
}

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[42rem] text-left text-sm">
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
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
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

export default function ChatboxPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ChatboxPageEn />
  const copy = getIntegrationCopy(locale, 'chatbox', { title: '在 ChatBox 中使用 gpt88.cc', description: '把 gpt88.cc 接入 ChatBox 桌面端的完整教程：如何配置 OpenAI 兼容接入、如何选择模型、如何验证连通性，以及常见问题怎么排查。', intro: '选择 provider 和协议，填入 API Key，再发送一条最小测试消息。' })
  const sections = getIntegrationSections(locale, 'chatbox', { prepare: '准备工作', launch: '第一步：启动 ChatBox 并开始配置', configure: '第二步：配置 gpt88.cc', provider: '2.1 选择模型提供商', apiInfo: '2.2 填写 API 信息', model: '2.3 选择模型', start: '第三步：开始使用', advanced: '高级功能', faq: '常见问题', tips: '使用技巧', troubleshoot: '排障清单', next: '下一步' })
  const body = CHATBOX_BODY_COPY[locale] ?? CHATBOX_BODY_COPY.zh
  const lower = CHATBOX_LOWER_COPY[locale] ?? CHATBOX_LOWER_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/chat/chatbox"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'prepare', text: sections.prepare, level: 2 }, { id: 'launch', text: sections.launch, level: 2 }, { id: 'configure', text: sections.configure, level: 2 }, { id: 'provider', text: sections.provider, level: 3 }, { id: 'api-info', text: sections.apiInfo, level: 3 }, { id: 'model', text: sections.model, level: 3 }, { id: 'start', text: sections.start, level: 2 }, { id: 'advanced', text: sections.advanced, level: 2 }, { id: 'faq', text: sections.faq, level: 2 }, { id: 'tips', text: sections.tips, level: 2 }, { id: 'troubleshoot', text: sections.troubleshoot, level: 2 }, { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="info" title={body.stableTitle}>
        <p>{body.stable}</p>
      </Callout>

      <p>
        {body.intro}
      </p>

      <h2 id="prepare">{sections.prepare}</h2>
      <p>{body.before}</p>
      <CodeBlock lang="text" filename="checklist" code={body.prepare} />
      <DocTable
        headers={locale === 'zh' ? ['你需要什么', '建议', '原因'] : ['Requirement', 'Recommendation', 'Reason']}
        rows={body.rows.map(row => [<strong key={row[0]}>{row[0]}</strong>, row[1], row[2]])}
      />

      <Callout tone="warn" title={body.protocolTitle}>
        <p>{body.protocol}</p>
      </Callout>

      <h2 id="launch">{sections.launch}</h2>
      <p>
        {body.launch}
      </p>
      <ol>
        {body.launchSteps.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="configure">{sections.configure}</h2>
      <h3 id="provider">{sections.provider}</h3>
      <p>
        {body.provider}
      </p>

      <h3 id="api-info">{sections.apiInfo}</h3>
      <p>{body.apiIntro}</p>
      <CodeBlock lang="text" filename="openai-config" code={OPENAI_CONFIG} />
      <p>{body.claudeIntro}</p>
      <CodeBlock lang="text" filename="claude-config" code={CLAUDE_CONFIG} />
      <p>配置时最容易出错的就是“地址形态”和“模型名”。你可以直接对照下面的简表：</p>
      <DocTable headers={body.tableHeaders} rows={body.tableRows} />

      <Callout tone="warn" title="不要把路径填错">
        <p>
          OpenAI 和 Claude 风格都使用 <code>https://api.gpt88.cc</code>；
          Base URL 写错会直接表现为连接失败、404 或无法拉取模型列表。
        </p>
      </Callout>

      <h3 id="model">{sections.model}</h3>
      <p>
        {body.modelIntro}
      </p>
      <DocTable
        headers={body.modelHeaders}
        rows={body.modelRows}
      />

      <h2 id="start">{sections.start}</h2>
      <p>
        配置完成后，回到主界面发一条最小请求。先确认能正常返回，再调整温度、最大输出长度和模型。
      </p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={SMOKE_TEST} />
      <ol>
        <li>返回主界面，新建一个对话。</li>
        <li>输入一句简单的问题，比如“用一句话介绍 gpt88.cc”。</li>
        <li>检查回复是否正常返回。</li>
        <li>如果成功，再逐步切换到更复杂的提示词。</li>
      </ol>

      <h3>调整模型参数（可选）</h3>
      <DocTable
        headers={['参数', '作用', '建议']}
        rows={[
          ['Temperature', '控制输出随机性', '0.7 适合创意，0.3 适合精确回答'],
          ['Max Tokens', '限制单次输出长度', '先从 2000-4000 试起'],
          ['Top P', '控制采样范围', '默认 0.9 通常足够'],
        ]}
      />

      <h2 id="advanced">{sections.advanced}</h2>
      <ul>
        <li>多会话管理：为不同任务建立独立聊天窗口，避免上下文串线。</li>
        <li>保存和导出对话：把有价值的讨论导出为 Markdown 或 JSON。</li>
        <li>提示词模板：把常用提示词存成模板，减少重复输入。</li>
        <li>模型切换：根据任务在快速模型和高质量模型之间切换。</li>
      </ul>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />
      <p>
        如果你已经按上面的步骤配置完，还是不通，优先去控制台和 cURL 里确认 Key、
        模型权限与 Base URL，而不是先怀疑 ChatBox 本身。
      </p>

      <h2 id="faq">{sections.faq}</h2>
      <p><strong>{lower.faq[0]}</strong></p>
      <ul>
        <li>{locale === 'zh' ? '先确认 API Host 是否写成了 https://api.gpt88.cc。' : 'Confirm that API Host is https://api.gpt88.cc.'}</li>
        <li>{locale === 'zh' ? '确认 API Key 是否完整，且前缀和控制台一致。' : 'Confirm the API Key is complete and matches the console prefix.'}</li>
        <li>{locale === 'zh' ? '先用 cURL 验证接口，再回到 ChatBox 排查客户端设置。' : 'Verify with cURL first, then return to ChatBox settings.'}</li>
      </ul>

      <p><strong>{lower.faq[1]}</strong></p>
      <ul>
        <li>{locale === 'zh' ? '直接手动输入模型 ID。' : 'Enter the model ID manually.'}</li>
        <li><Link to="/docs/api/list-models/">GET /v1/models</Link> / <Link to="/models/">model catalog</Link> से real model name copy करें。</li>
      </ul>

      <p><strong>{lower.faq[2]}</strong></p>
      <ul>
        <li>401: {locale === 'zh' ? '检查 Key 是否有效。' : 'check whether the Key is valid.'}</li>
        <li>404: {locale === 'zh' ? '检查模型名或接口路径。' : 'check the model name or endpoint path.'}</li>
        <li>429: {locale === 'zh' ? '降低并发或换低成本模型。' : 'reduce concurrency or use a lower-cost model.'}</li>
      </ul>

      <p><strong>{lower.faq[3]}</strong></p>
      <ul>
        <li><a href="https://gpt88.cc" target="_blank" rel="noreferrer">gpt88.cc console</a>。</li>
        <li>{locale === 'zh' ? '建议给 ChatBox 单独用一把 Key，方便统计和停用。' : 'Use a separate Key for ChatBox to simplify usage tracking and disabling.'}</li>
      </ul>

      <p><strong>{lower.faq[4]}</strong></p>
      <ul>
        <li>{locale === 'zh' ? '通常支持 Windows、macOS 和 Linux。' : 'It usually supports Windows, macOS and Linux.'}</li>
        <li>{locale === 'zh' ? '不同版本的配置名称可能略有差异，但核心字段通常都是 API Key、API Host、Model。' : 'Setting names may vary, but the core fields are usually API Key, API Host and Model.'}</li>
      </ul>

      <h2 id="tips">{sections.tips}</h2>
      <ol>
        {lower.tips.map((item, i) => <li key={item}>{i === 3 ? <>{item} <Link to="/docs/guides/complete-integration/">Guide</Link></> : item}</li>)}
      </ol>

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li>
          <Link to="/docs/guides/gpt88-tutorial/">{lower.next[0]}</Link>
        </li>
        <li>
          <Link to="/docs/guides/config-export/">{lower.next[1]}</Link>
        </li>
        <li>
          <Link to="/docs/quickstart/">{lower.next[2]}</Link>
        </li>
      </ul>
    </DocPage>
  )
}
