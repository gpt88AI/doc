import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { useLocale } from '../../../lib/locale'
import { getApiCopy } from '../../../lib/apiLocaleCopy'
import { SeoIntentSections } from '../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../components/seo/SeoIntentMeta'
import ErrorsPageEn from '../../en/ErrorsPageEn'

/**
 * API Reference: 错误码
 *
 * 表格构造：HTTP status -> 业务 code -> 含义 -> 客户端建议处理。
 * 使用一个简单的纯 JS 数组，再用一张表格渲染；不引入 markdown 解析。
 *
 * 注意：业务 code 与 OpenAI 错误码尽量对齐，gpt88.cc 自定义的码以
 * "_gpt88" 后缀或在说明中注明，便于读者识别。
 */

type ErrorRow = {
  status: number
  code: string
  type: string
  message: string
  /** 客户端常见处理策略 */
  handling: string
}

const HTTP_GROUPS: { title: string; rows: ErrorRow[] }[] = [
  {
    title: '4xx 客户端错误',
    rows: [
      {
        status: 400,
        code: 'invalid_request_error',
        type: 'invalid_request_error',
        message: '请求体不合法，例如缺少字段或字段类型错误。',
        handling: '修复请求结构后重试，不要无脑重试。',
      },
      {
        status: 400,
        code: 'context_length_exceeded',
        type: 'invalid_request_error',
        message: '输入 token 超过模型 context_window 上限。',
        handling:
          '裁剪历史消息或换用 context 更大的模型；可以先调用 /v1/models 查 context_window。',
      },
      {
        status: 400,
        code: 'invalid_model',
        type: 'invalid_request_error',
        message: 'model 字段非法或当前账号不可用。',
        handling: '调用 /v1/models 列出可用模型并刷新本地缓存。',
      },
      {
        status: 401,
        code: 'invalid_api_key',
        type: 'authentication_error',
        message: 'API Key 缺失、格式错误或已撤销。',
        handling: '检查环境变量与 Header；必要时在控制台重新生成。',
      },
      {
        status: 403,
        code: 'permission_denied',
        type: 'permission_error',
        message: '当前 Key 没有调用该模型 / 该端点的权限。',
        handling: '在控制台为对应 Key 开通模型权限，或换一把更高权限的 Key。',
      },
      {
        status: 404,
        code: 'model_not_found',
        type: 'invalid_request_error',
        message: '模型 ID 不存在或已下架。',
        handling: '回退到列表中的等价模型；同时刷新 /v1/models 缓存。',
      },
      {
        status: 408,
        code: 'request_timeout',
        type: 'timeout_error',
        message: '上游模型在网关侧设定的超时窗口内未返回。',
        handling: '建议带退避的重试；流式请求可在客户端做断点续读。',
      },
      {
        status: 409,
        code: 'conflict',
        type: 'invalid_request_error',
        message: '资源状态冲突，例如重复的 idempotency key。',
        handling: '更换 idempotency key 或确认上一次请求的最终状态后再处理。',
      },
      {
        status: 413,
        code: 'payload_too_large',
        type: 'invalid_request_error',
        message: '请求体超过网关上限（含 base64 多模态内容）。',
        handling: '压缩或分片上传；图片/音频走对应的多模态接口。',
      },
      {
        status: 422,
        code: 'unprocessable_entity',
        type: 'invalid_request_error',
        message: '语义合法但模型无法处理（例如违反 response_format 约束）。',
        handling: '检查 response_format / tools 定义。',
      },
      {
        status: 429,
        code: 'rate_limit_exceeded',
        type: 'rate_limit_error',
        message: '触发账号 / Key / 模型级限速。',
        handling:
          '退避重试；尊重 Retry-After Header。具体上限以控制台显示为准。',
      },
      {
        status: 429,
        code: 'insufficient_quota',
        type: 'rate_limit_error',
        message: '账户余额或额度不足。',
        handling: '在控制台充值或申请额度，不要重试。',
      },
    ],
  },
  {
    title: '5xx 服务端错误',
    rows: [
      {
        status: 500,
        code: 'internal_error',
        type: 'api_error',
        message: '网关或上游内部错误。',
        handling: '指数退避重试，超过 3 次仍失败建议人工排查并提供 request id。',
      },
      {
        status: 502,
        code: 'upstream_error',
        type: 'api_error',
        message: '上游 provider 返回非预期错误。',
        handling: '可重试；如果稳定复现，换备用模型或联系支持。',
      },
      {
        status: 503,
        code: 'service_unavailable',
        type: 'api_error',
        message: '上游容量受限，常见于热门模型瞬时拥塞。',
        handling: '退避重试；启用智能路由的账号一般会自动切换备用 provider。',
      },
      {
        status: 504,
        code: 'gateway_timeout',
        type: 'api_error',
        message: '网关到上游超时。',
        handling: '同 408；如果是流式请求注意检查 last-event-id。',
      },
    ],
  },
]

const SHAPE = `{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded for model deepseek-v4-pro",
    "param": null,
    "request_id": "req_01HZX3..."
  }
}`

const STATUS_COLOR: Record<string, string> = {
  '2': 'text-emerald-300 bg-emerald-500/10 ring-emerald-400/30',
  '4': 'text-amber-300 bg-amber-500/10 ring-amber-400/30',
  '5': 'text-red-300 bg-red-500/10 ring-red-400/30',
}

const ERROR_UI_COPY: Record<string, {
  sections: { shape: string; http: string; retry: string; requestId: string }
  fieldMeaning: string
  headers: { http: string; code: string; meaning: string; handling: string }
  recommend: string
  retryItems: { immediate: string; backoff: string; idempotency: string; fallback: string }
}> = {
  zh: { sections: { shape: '错误响应结构', http: 'HTTP 状态对照', retry: '重试策略', requestId: '排障：使用 request_id' }, fieldMeaning: '字段语义', headers: { http: 'HTTP', code: 'code', meaning: '含义', handling: '建议处理' }, recommend: '建议：', retryItems: { immediate: '立即失败', backoff: '指数退避', idempotency: '幂等性', fallback: '退路模型' } },
  hi: { sections: { shape: 'त्रुटि प्रतिक्रिया संरचना', http: 'HTTP स्थिति संदर्भ', retry: 'रीट्राई रणनीति', requestId: 'समस्या निवारण: request_id का उपयोग' }, fieldMeaning: 'फ़ील्ड का अर्थ', headers: { http: 'HTTP', code: 'code', meaning: 'अर्थ', handling: 'सुझाया गया कदम' }, recommend: 'सुझाव: ', retryItems: { immediate: 'तुरंत विफल करें', backoff: 'एक्सपोनेंशियल बैकऑफ', idempotency: 'आइडेम्पोटेंसी', fallback: 'फॉलबैक मॉडल' } },
  bn: { sections: { shape: 'ত্রুটি প্রতিক্রিয়ার গঠন', http: 'HTTP স্ট্যাটাস রেফারেন্স', retry: 'রিট্রাই কৌশল', requestId: 'সমস্যা সমাধান: request_id ব্যবহার' }, fieldMeaning: 'ফিল্ডের অর্থ', headers: { http: 'HTTP', code: 'code', meaning: 'অর্থ', handling: 'প্রস্তাবিত পদক্ষেপ' }, recommend: 'পরামর্শ: ', retryItems: { immediate: 'তাৎক্ষণিক ব্যর্থতা', backoff: 'এক্সপোনেনশিয়াল ব্যাকঅফ', idempotency: 'আইডেমপোটেন্সি', fallback: 'ফলব্যাক মডেল' } },
  ur: { sections: { shape: 'خرابی کے جواب کی ساخت', http: 'HTTP اسٹیٹس حوالہ', retry: 'دوبارہ کوشش کی حکمت عملی', requestId: 'مسئلہ حل: request_id کا استعمال' }, fieldMeaning: 'فیلڈ کا مطلب', headers: { http: 'HTTP', code: 'code', meaning: 'مطلب', handling: 'تجویز کردہ کارروائی' }, recommend: 'تجویز: ', retryItems: { immediate: 'فوری ناکامی', backoff: 'ایکسپونینشل بیک آف', idempotency: 'آئیڈیمپوٹنسی', fallback: 'فال بیک ماڈل' } },
  ta: { sections: { shape: 'பிழை பதில் அமைப்பு', http: 'HTTP நிலை குறிப்பு', retry: 'மீண்டும் முயற்சி உத்தி', requestId: 'பிழைத்திருத்தம்: request_id பயன்பாடு' }, fieldMeaning: 'புலத்தின் பொருள்', headers: { http: 'HTTP', code: 'code', meaning: 'பொருள்', handling: 'பரிந்துரைக்கப்பட்ட செயல்' }, recommend: 'பரிந்துரை: ', retryItems: { immediate: 'உடனடி தோல்வி', backoff: 'எக்ஸ்போனென்ஷியல் பின்வாங்கல்', idempotency: 'ஐடெம்போட்டென்சி', fallback: 'மாற்று மாதிரி' } },
  ne: { sections: { shape: 'त्रुटि प्रतिक्रियाको संरचना', http: 'HTTP स्थिति सन्दर्भ', retry: 'रिट्राई रणनीति', requestId: 'समस्या समाधान: request_id प्रयोग' }, fieldMeaning: 'फिल्डको अर्थ', headers: { http: 'HTTP', code: 'code', meaning: 'अर्थ', handling: 'सुझाइएको कदम' }, recommend: 'सुझाव: ', retryItems: { immediate: 'तुरुन्त असफल', backoff: 'एक्सपोनेन्शियल ब्याकअफ', idempotency: 'आइडेम्पोटेन्सी', fallback: 'फलब्याक मोडेल' } },
  si: { sections: { shape: 'දෝෂ ප්‍රතිචාර ව්‍යුහය', http: 'HTTP තත්ත්ව යොමුව', retry: 'නැවත උත්සාහ කිරීමේ උපාය', requestId: 'දෝෂ නිරාකරණය: request_id භාවිතය' }, fieldMeaning: 'ක්ෂේත්‍ර අර්ථය', headers: { http: 'HTTP', code: 'code', meaning: 'අර්ථය', handling: 'නිර්දේශිත ක්‍රියාව' }, recommend: 'නිර්දේශය: ', retryItems: { immediate: 'වහා අසාර්ථක කරන්න', backoff: 'ඝාතීය පසුබැසීම', idempotency: 'අයිඩම්පොටෙන්සි', fallback: 'විකල්ප මාදිලිය' } },
}

type LocalizedErrorBody = { message: string; handling: string }

const ERROR_BODY_COPY: Record<string, { groups: string[]; rows: LocalizedErrorBody[] }> = {
  hi: {
    groups: ['4xx क्लाइंट त्रुटियां', '5xx सर्वर त्रुटियां'],
    rows: [
      ['अनुरोध body अमान्य है, जैसे field गायब या type गलत होना।', 'अनुरोध संरचना ठीक करके फिर भेजें; बिना सोचे retry न करें।'],
      ['इनपुट token मॉडल की context_window सीमा से अधिक हैं।', 'पुराने संदेश घटाएं या बड़ी context वाला मॉडल चुनें; पहले /v1/models देखें।'],
      ['model field अमान्य है या इस account के लिए उपलब्ध नहीं है।', 'उपलब्ध models के लिए /v1/models बुलाएं और स्थानीय cache अपडेट करें।'],
      ['API Key गायब, गलत format में या revoke की गई है।', 'environment variable और Header जांचें; जरूरत हो तो console में नई key बनाएं।'],
      ['इस Key को मॉडल या endpoint बुलाने की अनुमति नहीं है।', 'console में permission दें या अधिक अधिकार वाली Key इस्तेमाल करें।'],
      ['मॉडल ID मौजूद नहीं है या हटा दिया गया है।', 'सूची के किसी समान मॉडल पर जाएं और /v1/models cache अपडेट करें।'],
      ['अपस्ट्रीम मॉडल ने gateway timeout window में उत्तर नहीं दिया।', 'backoff के साथ retry करें; streaming में client-side resume लागू कर सकते हैं।'],
      ['resource state conflict है, जैसे duplicate idempotency key।', 'idempotency key बदलें या पिछली request की अंतिम स्थिति जांचें।'],
      ['request body gateway सीमा से बड़ा है, जिसमें base64 multimodal data भी शामिल है।', 'compress या chunk करें; image/audio के लिए संबंधित multimodal endpoint उपयोग करें।'],
      ['अर्थ सही है लेकिन मॉडल इसे process नहीं कर सकता, जैसे response_format constraint।', 'response_format और tools definition जांचें।'],
      ['account, Key या model स्तर की rate limit लग गई है।', 'backoff retry करें और Retry-After Header मानें; सीमा console में देखें।'],
      ['account balance या quota पर्याप्त नहीं है।', 'console में recharge या quota request करें; retry न करें।'],
      ['gateway या upstream में internal error है।', 'exponential backoff से retry करें; 3 बार बाद request id के साथ जांच कराएं।'],
      ['upstream provider ने अनपेक्षित error लौटाया।', 'retry कर सकते हैं; स्थायी होने पर backup model या support चुनें।'],
      ['upstream capacity सीमित है, अक्सर लोकप्रिय मॉडल के अचानक व्यस्त होने पर।', 'backoff retry करें; smart routing उपलब्ध हो तो backup provider पर switch करें।'],
      ['gateway से upstream तक timeout हुआ।', '408 जैसा व्यवहार करें; streaming में last-event-id जांचें।'],
    ].map(([message, handling]) => ({ message, handling })),
  },
  bn: {
    groups: ['4xx ক্লায়েন্ট ত্রুটি', '5xx সার্ভার ত্রুটি'],
    rows: [
      ['Request body অবৈধ; field অনুপস্থিত বা type ভুল হতে পারে।', 'Request structure ঠিক করে পাঠান; অন্ধভাবে retry করবেন না।'],
      ['Input token মডেলের context_window সীমা ছাড়িয়েছে।', 'পুরনো message কমান বা বড় context-এর model নিন; আগে /v1/models দেখুন।'],
      ['model field অবৈধ বা account-এর জন্য উপলব্ধ নয়।', 'উপলব্ধ model-এর তালিকার জন্য /v1/models কল করুন।'],
      ['API Key নেই, format ভুল, বা revoke করা হয়েছে।', 'Environment variable ও Header পরীক্ষা করে প্রয়োজনে নতুন key তৈরি করুন।'],
      ['এই Key-এর model বা endpoint ব্যবহারের permission নেই।', 'Console-এ permission দিন বা বেশি অনুমতির Key ব্যবহার করুন।'],
      ['Model ID নেই বা সরিয়ে নেওয়া হয়েছে।', 'তালিকার সমতুল্য model নিন এবং /v1/models cache refresh করুন।'],
      ['Gateway timeout window-তে upstream model উত্তর দেয়নি।', 'Backoff সহ retry করুন; streaming request-এ resume বিবেচনা করুন।'],
      ['Resource state conflict, যেমন duplicate idempotency key।', 'Key বদলান বা আগের request-এর final status যাচাই করুন।'],
      ['Request body gateway সীমার বেশি, base64 multimodal data-সহ।', 'Compress বা ভাগ করুন; image/audio-এর জন্য আলাদা endpoint ব্যবহার করুন।'],
      ['Syntax ঠিক হলেও model এটি process করতে পারেনি, যেমন response_format constraint।', 'response_format ও tools definition পরীক্ষা করুন।'],
      ['Account, Key বা model-এর rate limit অতিক্রম হয়েছে।', 'Backoff retry করুন এবং Retry-After Header মানুন।'],
      ['Account balance বা quota অপর্যাপ্ত।', 'Console-এ recharge বা quota চান; retry করবেন না।'],
      ['Gateway বা upstream internal error।', 'Exponential backoff-এ retry করুন; 3 বারের পর request id দিন।'],
      ['Upstream provider অপ্রত্যাশিত error দিয়েছে।', 'Retry করুন; স্থায়ী হলে backup model বা support নিন।'],
      ['Upstream capacity কম, জনপ্রিয় model ব্যস্ত হলে এমন হয়।', 'Backoff retry করুন বা backup provider-এ switch করুন।'],
      ['Gateway থেকে upstream পর্যন্ত timeout।', '408-এর মতো处理 করুন; streaming-এ last-event-id দেখুন।'],
    ].map(([message, handling]) => ({ message, handling })),
  },
  ur: {
    groups: ['4xx کلائنٹ کی خرابیاں', '5xx سرور کی خرابیاں'],
    rows: [
      ['Request body درست نہیں، مثلاً field غائب یا type غلط ہے۔', 'Request structure درست کریں؛ بلاوجہ retry نہ کریں۔'],
      ['Input tokens ماڈل کی context_window حد سے زیادہ ہیں۔', 'پرانے messages کم کریں یا بڑے context والا model منتخب کریں؛ پہلے /v1/models دیکھیں۔'],
      ['model field غلط ہے یا اس account کے لیے دستیاب نہیں۔', 'دستیاب models کے لیے /v1/models کال کریں۔'],
      ['API Key غائب، غلط format میں یا revoke ہو چکی ہے۔', 'Environment variable اور Header چیک کریں؛ ضرورت ہو تو نئی key بنائیں۔'],
      ['اس Key کو model یا endpoint استعمال کرنے کی اجازت نہیں۔', 'Console میں permission فعال کریں یا زیادہ اختیار والی Key لیں۔'],
      ['Model ID موجود نہیں یا ہٹا دیا گیا ہے۔', 'فہرست کا متبادل model لیں اور /v1/models cache تازہ کریں۔'],
      ['Upstream model نے gateway timeout میں جواب نہیں دیا۔', 'Backoff کے ساتھ retry کریں؛ streaming میں resume کریں۔'],
      ['Resource state conflict ہے، مثلاً duplicate idempotency key۔', 'Key تبدیل کریں یا پچھلی request کی آخری حالت چیک کریں۔'],
      ['Request body gateway حد سے بڑا ہے، base64 multimodal data سمیت۔', 'Compress یا حصوں میں بھیجیں؛ image/audio endpoint استعمال کریں۔'],
      ['معنی درست ہے مگر model process نہیں کر سکا، جیسے response_format constraint۔', 'response_format اور tools definition چیک کریں۔'],
      ['Account، Key یا model کی rate limit پوری ہو گئی ہے۔', 'Backoff retry کریں اور Retry-After Header کی پابندی کریں۔'],
      ['Account balance یا quota ناکافی ہے۔', 'Console میں recharge یا quota مانگیں؛ retry نہ کریں۔'],
      ['Gateway یا upstream کا داخلی error۔', 'Exponential backoff سے retry کریں؛ 3 بار بعد request id دیں۔'],
      ['Upstream provider نے غیر متوقع error دیا۔', 'Retry کریں؛ مستقل رہے تو backup model یا support سے رابطہ کریں۔'],
      ['Upstream capacity محدود ہے، خاص طور پر مقبول model کے مصروف ہونے پر۔', 'Backoff retry کریں یا backup provider پر جائیں۔'],
      ['Gateway سے upstream تک timeout ہوا۔', '408 کی طرح handle کریں؛ streaming میں last-event-id دیکھیں۔'],
    ].map(([message, handling]) => ({ message, handling })),
  },
  ta: {
    groups: ['4xx கிளையன்ட் பிழைகள்', '5xx சேவையகப் பிழைகள்'],
    rows: [
      ['Request body தவறானது; field இல்லாமை அல்லது தவறான type காரணமாக இருக்கலாம்.', 'Request structure-ஐ சரிசெய்து மீண்டும் அனுப்பவும்; கண்மூடித்தனமாக retry செய்ய வேண்டாம்.'],
      ['Input tokens model-ன் context_window வரம்பை மீறுகின்றன.', 'பழைய messages-ஐ குறைக்கவும் அல்லது பெரிய context model-ஐ தேர்வு செய்யவும்.'],
      ['model field தவறானது அல்லது இந்த account-க்கு கிடைக்கவில்லை.', 'கிடைக்கும் models-க்கு /v1/models-ஐ அழைக்கவும்.'],
      ['API Key இல்லை, format தவறு அல்லது revoke செய்யப்பட்டது.', 'Environment variable மற்றும் Header-ஐ சரிபார்த்து புதிய key உருவாக்கவும்.'],
      ['இந்த Key-க்கு model அல்லது endpoint அணுகல் அனுமதி இல்லை.', 'Console-ல் permission வழங்கவும் அல்லது அதிக உரிமை உள்ள Key பயன்படுத்தவும்.'],
      ['Model ID இல்லை அல்லது நீக்கப்பட்டது.', 'பட்டியலில் உள்ள மாற்று model-ஐ பயன்படுத்தி cache-ஐ புதுப்பிக்கவும்.'],
      ['Gateway timeout காலத்திற்குள் upstream model பதிலளிக்கவில்லை.', 'Backoff உடன் retry செய்யவும்; streaming-ல் resume பயன்படுத்தவும்.'],
      ['Resource state conflict, உதாரணமாக duplicate idempotency key.', 'Key-ஐ மாற்றவும் அல்லது முந்தைய request நிலையை சரிபார்க்கவும்.'],
      ['Request body gateway வரம்பை மீறுகிறது; base64 multimodal data உட்பட.', 'Compress அல்லது பகுதிகளாக அனுப்பவும்; image/audio endpoint பயன்படுத்தவும்.'],
      ['Semantic input சரியானது, ஆனால் model process செய்ய முடியவில்லை.', 'response_format மற்றும் tools definition-ஐ சரிபார்க்கவும்.'],
      ['Account, Key அல்லது model rate limit தூண்டப்பட்டுள்ளது.', 'Backoff retry செய்து Retry-After Header-ஐ மதிக்கவும்.'],
      ['Account balance அல்லது quota போதவில்லை.', 'Console-ல் recharge அல்லது quota கோரவும்; retry செய்ய வேண்டாம்.'],
      ['Gateway அல்லது upstream internal error.', 'Exponential backoff-ல் retry செய்யவும்; 3 முறைக்கு பிறகு request id வழங்கவும்.'],
      ['Upstream provider எதிர்பாராத error வழங்கியது.', 'Retry செய்யலாம்; தொடர்ந்து ஏற்பட்டால் backup model அல்லது support பயன்படுத்தவும்.'],
      ['Upstream capacity குறைவு; பிரபலமான model நெரிசலில் இது ஏற்படும்.', 'Backoff retry அல்லது backup provider பயன்படுத்தவும்.'],
      ['Gateway முதல் upstream வரை timeout ஏற்பட்டது.', '408 போல கையாளவும்; streaming-ல் last-event-id சரிபார்க்கவும்.'],
    ].map(([message, handling]) => ({ message, handling })),
  },
  ne: {
    groups: ['4xx क्लाइन्ट त्रुटि', '5xx सर्भर त्रुटि'],
    rows: [
      ['Request body अमान्य छ; field छुटेको वा type गलत हुन सक्छ।', 'Request structure सच्याएर पठाउनुहोस्; अन्धाधुन्ध retry नगर्नुहोस्।'],
      ['Input token ले model को context_window सीमा नाघेको छ।', 'पुराना messages घटाउनुहोस् वा ठूलो context भएको model छान्नुहोस्।'],
      ['model field अमान्य छ वा account का लागि उपलब्ध छैन।', 'उपलब्ध model हेर्न /v1/models call गर्नुहोस्।'],
      ['API Key छैन, format गलत छ वा revoke गरिएको छ।', 'Environment variable र Header जाँचेर आवश्यक परे नयाँ key बनाउनुहोस्।'],
      ['यो Key लाई model वा endpoint प्रयोग गर्ने अनुमति छैन।', 'Console मा permission दिनुहोस् वा बढी अधिकार भएको Key प्रयोग गर्नुहोस्।'],
      ['Model ID छैन वा हटाइएको छ।', 'सूचीको समान model प्रयोग गरी /v1/models cache refresh गर्नुहोस्।'],
      ['Gateway timeout भित्र upstream model ले उत्तर दिएन।', 'Backoff सहित retry गर्नुहोस्; streaming मा resume प्रयोग गर्न सकिन्छ।'],
      ['Resource state conflict छ, जस्तै duplicate idempotency key।', 'Key बदल्नुहोस् वा अघिल्लो request को अन्तिम अवस्था जाँच्नुहोस्।'],
      ['Request body gateway सीमा भन्दा ठूलो छ, base64 multimodal data सहित।', 'Compress वा भाग लगाउनुहोस्; image/audio endpoint प्रयोग गर्नुहोस्।'],
      ['Semantic input सही भए पनि model ले process गर्न सकेन।', 'response_format र tools definition जाँच्नुहोस्।'],
      ['Account, Key वा model को rate limit पुगेको छ।', 'Backoff retry गर्नुहोस् र Retry-After Header मान्नुहोस्।'],
      ['Account balance वा quota अपर्याप्त छ।', 'Console मा recharge वा quota माग्नुहोस्; retry नगर्नुहोस्।'],
      ['Gateway वा upstream internal error।', 'Exponential backoff मा retry गर्नुहोस्; 3 पटकपछि request id दिनुहोस्।'],
      ['Upstream provider ले अनपेक्षित error दियो।', 'Retry गर्न सकिन्छ; निरन्तर भए backup model वा support प्रयोग गर्नुहोस्।'],
      ['Upstream capacity सीमित छ, लोकप्रिय model व्यस्त हुँदा सामान्य हुन्छ।', 'Backoff retry वा backup provider प्रयोग गर्नुहोस्।'],
      ['Gateway देखि upstream सम्म timeout भयो।', '408 जस्तै handle गर्नुहोस्; streaming मा last-event-id जाँच्नुहोस्।'],
    ].map(([message, handling]) => ({ message, handling })),
  },
  si: {
    groups: ['4xx සේවාදායක පාරිභෝගික දෝෂ', '5xx සේවා දෝෂ'],
    rows: [
      ['Request body වලංගු නැත; field එකක් නැති හෝ type වැරදි විය හැක.', 'Request structure නිවැරදි කර නැවත යවන්න; අන්ධ ලෙස retry නොකරන්න.'],
      ['Input tokens model context_window සීමාව ඉක්මවා ඇත.', 'පැරණි messages අඩු කරන්න හෝ විශාල context model එකක් තෝරන්න.'],
      ['model field වලංගු නැත හෝ මෙම account සඳහා ලබාගත නොහැක.', 'ලබාගත හැකි models සඳහා /v1/models අමතන්න.'],
      ['API Key නැත, format වැරදියි හෝ revoke කර ඇත.', 'Environment variable සහ Header පරීක්ෂා කර අවශ්‍ය නම් නව key එකක් සාදන්න.'],
      ['මෙම Key එකට model හෝ endpoint භාවිතා කිරීමට අවසර නැත.', 'Console එකේ permission දෙන්න හෝ වැඩි අවසර ඇති Key එකක් භාවිතා කරන්න.'],
      ['Model ID නොපවතී හෝ ඉවත් කර ඇත.', 'ලැයිස්තුවේ සමාන model එකක් භාවිතා කර /v1/models cache refresh කරන්න.'],
      ['Gateway timeout කාලය තුළ upstream model පිළිතුරු දුන්නේ නැත.', 'Backoff සමඟ retry කරන්න; streaming request එකක් නම් resume කරන්න.'],
      ['Resource state conflict එකක් ඇත, උදාහරණයක් ලෙස duplicate idempotency key.', 'Key එක වෙනස් කරන්න හෝ පෙර request අවසන් තත්ත්වය පරීක්ෂා කරන්න.'],
      ['Request body gateway සීමාව ඉක්මවා ඇත, base64 multimodal data ඇතුළුව.', 'Compress හෝ කොටස් කරන්න; image/audio endpoint භාවිතා කරන්න.'],
      ['අර්ථය නිවැරදි වුවත් model එකට process කළ නොහැක.', 'response_format සහ tools definition පරීක්ෂා කරන්න.'],
      ['Account, Key හෝ model rate limit සීමාවට පැමිණ ඇත.', 'Backoff retry කර Retry-After Header අනුගමනය කරන්න.'],
      ['Account balance හෝ quota ප්‍රමාණවත් නැත.', 'Console එකේ recharge හෝ quota ඉල්ලන්න; retry නොකරන්න.'],
      ['Gateway හෝ upstream internal error එකකි.', 'Exponential backoff සමඟ retry කරන්න; වාර 3කට පසු request id දෙන්න.'],
      ['Upstream provider අනපේක්ෂිත error එකක් ලබා දී ඇත.', 'Retry කළ හැක; දිගටම සිදුවේ නම් backup model හෝ support භාවිතා කරන්න.'],
      ['Upstream capacity සීමිතය; ජනප්‍රිය model එකක් තදබද වූ විට මෙය සිදුවේ.', 'Backoff retry හෝ backup provider භාවිතා කරන්න.'],
      ['Gateway සිට upstream දක්වා timeout විය.', '408 ලෙස handle කරන්න; streaming වල last-event-id පරීක්ෂා කරන්න.'],
    ].map(([message, handling]) => ({ message, handling })),
  },
}

function getErrorGroups(locale: string) {
  const localized = ERROR_BODY_COPY[locale]
  if (!localized) return HTTP_GROUPS
  let rowIndex = 0
  return localized.groups.map((title, groupIndex) => ({
    title,
    rows: HTTP_GROUPS[groupIndex].rows.map(row => ({
      ...row,
      ...localized.rows[rowIndex++],
    })),
  }))
}

function StatusPill({ status }: { status: number }) {
  const cls = STATUS_COLOR[String(status)[0]] ?? 'text-ink-300 bg-white/5'
  return (
    <span
      className={`inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded font-mono text-[12px] font-semibold ring-1 ${cls}`}
    >
      {status}
    </span>
  )
}

export default function ErrorsPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <ErrorsPageEn />
  const copy = getApiCopy(locale, 'errors', { title: 'OpenAI 兼容接口常见错误排查', description: '从 HTTP 状态、错误 code、request_id 和重试策略定位 OpenAI 兼容接口问题。', intro: '请同时查看错误响应中的 status、code 和 request_id；对于持久性请求错误，先修复输入或权限再重试。' })
  const ui = ERROR_UI_COPY[locale] ?? ERROR_UI_COPY.zh
  const groups = getErrorGroups(locale)

  return (
    <DocPage
      path="/docs/api/errors"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'shape', text: ui.sections.shape, level: 2 },
        { id: 'http', text: ui.sections.http, level: 2 },
        { id: 'retry', text: ui.sections.retry, level: 2 },
        { id: 'request-id', text: ui.sections.requestId, level: 2 },
        ...seoIntentHeadings('openai-compatible-errors'),
      ]}
    >
      <p>{copy.intro}</p>
      <h2 id="shape">{ui.sections.shape}</h2>
      <p>所有错误响应都遵循以下统一结构（与 OpenAI 协议保持兼容）：</p>
      <CodeBlock lang="json" filename="error envelope" code={SHAPE} />

      <Callout tone="info" title={ui.fieldMeaning}>
        <ul className="list-disc pl-5">
          <li><code>type</code>：错误类别，对客户端按类别处理更稳定；</li>
          <li><code>code</code>：更精细的业务码，便于日志检索；</li>
          <li><code>message</code>：人类可读描述，可能随版本微调，不要用作匹配依据；</li>
          <li><code>request_id</code>：唯一请求 ID，提交工单时一定要附上。</li>
        </ul>
      </Callout>

      <h2 id="http">{ui.sections.http}</h2>

      {groups.map(group => (
        <div key={group.title} className="not-prose mt-8">
          <h3 className="mb-2 text-base font-semibold text-ink-50">
            {group.title}
          </h3>
          <div className="overflow-hidden rounded-lg border border-white/5">
            <table className="hidden w-full text-left text-sm md:table">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="w-20 px-4 py-2.5 font-medium">HTTP</th>
                  <th className="px-4 py-2.5 font-medium">code</th>
                  <th className="px-4 py-2.5 font-medium">{ui.headers.meaning}</th>
                  <th className="px-4 py-2.5 font-medium">{ui.headers.handling}</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r, i) => (
                  <tr
                    key={r.code + i}
                    className={`border-t border-white/5 align-top ${
                      i % 2 === 1 ? 'bg-white/[0.012]' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                        {r.code}
                      </code>
                      <div className="mt-1 font-mono text-[11px] text-ink-500">
                        type: {r.type}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                      {r.message}
                    </td>
                    <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-300">
                      {r.handling}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 移动端：卡片 */}
            <ul className="divide-y divide-white/5 md:hidden">
              {group.rows.map((r, i) => (
                <li key={r.code + i} className="space-y-2 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusPill status={r.status} />
                    <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                      {r.code}
                    </code>
                  </div>
                  <div className="text-[13px] text-ink-200">{r.message}</div>
                  <div className="text-[12px] text-ink-400">
                    {ui.recommend}{r.handling}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <h2 id="retry">{ui.sections.retry}</h2>
      <ul>
        <li>
          <strong>{ui.retryItems.immediate}</strong>：<code>4xx</code> 中除
          <code>429</code> / <code>408</code> 外，多数无需重试。
        </li>
        <li>
          <strong>{ui.retryItems.backoff}</strong>：<code>429</code> / <code>5xx</code> 推荐
          base = 500ms 起，乘 2，最大 8s，并尊重响应 Header
          <code>Retry-After</code>。
        </li>
        <li>
          <strong>{ui.retryItems.idempotency}</strong>：可选发送
          <code>Idempotency-Key</code> Header（UUID v4），
          重试时复用同一个 key，网关会避免重复扣费。
        </li>
        <li>
          <strong>{ui.retryItems.fallback}</strong>：在客户端定义一个备选模型列表，
          遇到 <code>model_not_found</code> / <code>service_unavailable</code> 时降级。
        </li>
      </ul>

      <h2 id="request-id">{ui.sections.requestId}</h2>
      <p>
        每次响应（成功或失败）都会带上 <code>X-Request-Id</code> Header，
        失败响应体也包含 <code>error.request_id</code>。
        提交工单或在{' '}
        <Link to="/docs/faq/">FAQ</Link>
        提到的任何排查流程中都需要这个 ID——它能让我们直接定位到具体一次请求的链路日志。
      </p>
      <SeoIntentSections intent="openai-compatible-errors" />
    </DocPage>
  )
}
