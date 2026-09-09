import type { Locale } from './locale'

type ApiKind = 'chat' | 'images' | 'models' | 'errors'

type ApiCopy = { title: string; description: string; intro: string }

const COPY: Partial<Record<Locale, Record<ApiKind, ApiCopy>>> = {
  hi: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming, multimodal messages और tool calling।', intro: 'यह endpoint chat, multimodal input और tools/function calling के लिए OpenAI-compatible अनुरोध स्वीकार करता है।' },
    images: { title: 'Image Generation API', description: 'OpenAI image API और Gemini generateContent image API के endpoints, fields और response formats।', intro: 'इस पेज पर OpenAI image API और Gemini image API को अलग-अलग समझाया गया है, क्योंकि इनके endpoints और fields अलग हैं।' },
    models: { title: 'GET /v1/models', description: 'अपने account के लिए उपलब्ध models, capabilities और context window देखें।', intro: 'पहले इस endpoint से account की उपलब्ध model list लें, फिर model ID को chat या media request में उपयोग करें।' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status, error code, request_id और retry strategy से API समस्याएं पहचानें।', intro: 'Error response में status, code और request_id को साथ पढ़ें। स्थायी request error को दोबारा भेजने के बजाय पहले input या permission ठीक करें।' },
  },
  bn: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming, multimodal message এবং tool calling।', intro: 'এই endpoint chat, multimodal input এবং tools/function calling-এর জন্য OpenAI-compatible request গ্রহণ করে।' },
    images: { title: 'Image Generation API', description: 'OpenAI image API এবং Gemini generateContent image API-এর endpoint, field ও response format।', intro: 'OpenAI image API এবং Gemini image API আলাদা করে দেখুন, কারণ তাদের endpoint ও field এক নয়।' },
    models: { title: 'GET /v1/models', description: 'আপনার account-এ উপলব্ধ model, capability ও context window দেখুন।', intro: 'প্রথমে এই endpoint থেকে account-এর model list নিন, তারপর model ID chat বা media request-এ ব্যবহার করুন।' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status, error code, request_id ও retry strategy দিয়ে API সমস্যা শনাক্ত করুন।', intro: 'Error response-এ status, code ও request_id একসঙ্গে দেখুন। স্থায়ী request error পুনরায় পাঠানোর আগে input বা permission ঠিক করুন।' },
  },
  ur: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming، multimodal messages اور tool calling۔', intro: 'یہ endpoint chat، multimodal input اور tools/function calling کے لیے OpenAI-compatible requests قبول کرتا ہے۔' },
    images: { title: 'Image Generation API', description: 'OpenAI image API اور Gemini generateContent image API کے endpoints، fields اور response formats۔', intro: 'OpenAI image API اور Gemini image API کو الگ سمجھیں، کیونکہ ان کے endpoints اور fields مختلف ہیں۔' },
    models: { title: 'GET /v1/models', description: 'اپنے account کے دستیاب models، capabilities اور context window دیکھیں۔', intro: 'پہلے اس endpoint سے account کی model list حاصل کریں، پھر model ID کو chat یا media request میں استعمال کریں۔' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status، error code، request_id اور retry strategy سے API مسائل تلاش کریں۔', intro: 'Error response میں status، code اور request_id کو ساتھ دیکھیں۔ مستقل request error کو دوبارہ بھیجنے سے پہلے input یا permission درست کریں۔' },
  },
  ta: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming, multimodal messages மற்றும் tool calling.', intro: 'இந்த endpoint chat, multimodal input மற்றும் tools/function calling க்கான OpenAI-compatible கோரிக்கைகளை ஏற்கிறது.' },
    images: { title: 'Image Generation API', description: 'OpenAI image API மற்றும் Gemini generateContent image API endpoints, fields மற்றும் response formats.', intro: 'OpenAI image API மற்றும் Gemini image API தனித்தனியாகப் பயன்படுத்தப்பட வேண்டும்; அவற்றின் endpoints மற்றும் fields வேறுபடும்.' },
    models: { title: 'GET /v1/models', description: 'உங்கள் account-க்கு கிடைக்கும் models, capabilities மற்றும் context window-ஐப் பாருங்கள்.', intro: 'முதலில் இந்த endpoint மூலம் account-ன் model list-ஐப் பெற்று, பின்னர் model ID-ஐ chat அல்லது media கோரிக்கையில் பயன்படுத்தவும்.' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status, error code, request_id மற்றும் retry strategy மூலம் API சிக்கல்களை கண்டறியவும்.', intro: 'Error response-ல் status, code மற்றும் request_id ஆகியவற்றைப் பாருங்கள். நிரந்தர request error-ஐ மீண்டும் அனுப்புவதற்கு முன் input அல்லது permission-ஐச் சரிசெய்யவும்.' },
  },
  ne: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming, multimodal messages र tool calling।', intro: 'यो endpoint ले chat, multimodal input र tools/function calling का लागि OpenAI-compatible request स्वीकार गर्छ।' },
    images: { title: 'Image Generation API', description: 'OpenAI image API र Gemini generateContent image API का endpoint, field र response format।', intro: 'OpenAI image API र Gemini image API अलग-अलग बुझ्नुहोस्, किनकि तिनका endpoint र field फरक छन्।' },
    models: { title: 'GET /v1/models', description: 'तपाईंको account मा उपलब्ध model, capability र context window हेर्नुहोस्।', intro: 'पहिले यो endpoint बाट account को model list लिनुहोस्, त्यसपछि model ID chat वा media request मा प्रयोग गर्नुहोस्।' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status, error code, request_id र retry strategy बाट API समस्या पहिचान गर्नुहोस्।', intro: 'Error response मा status, code र request_id सँगै हेर्नुहोस्। स्थायी request error पुनः पठाउनुअघि input वा permission सुधार्नुहोस्।' },
  },
  si: {
    chat: { title: 'POST /v1/chat/completions', description: 'OpenAI-compatible chat completions API: streaming, multimodal messages සහ tool calling.', intro: 'මෙම endpoint එක chat, multimodal input සහ tools/function calling සඳහා OpenAI-compatible ඉල්ලීම් පිළිගනී.' },
    images: { title: 'Image Generation API', description: 'OpenAI image API සහ Gemini generateContent image API endpoints, fields සහ response formats.', intro: 'OpenAI image API සහ Gemini image API වෙන වෙනම භාවිත කළ යුතුය; ඒවායේ endpoints සහ fields වෙනස් වේ.' },
    models: { title: 'GET /v1/models', description: 'ඔබේ account එකට ලබාගත හැකි models, capabilities සහ context window බලන්න.', intro: 'පළමුව මෙම endpoint එකෙන් account model list එක ලබාගෙන, පසුව model ID එක chat හෝ media request එකක භාවිත කරන්න.' },
    errors: { title: 'OpenAI-compatible API error troubleshooting', description: 'HTTP status, error code, request_id සහ retry strategy මඟින් API ගැටලු හඳුනා ගන්න.', intro: 'Error response එකේ status, code සහ request_id එකට බලන්න. ස්ථිර request error එක නැවත යැවීමට පෙර input හෝ permission නිවැරදි කරන්න.' },
  },
}

export function getApiCopy(locale: Locale, kind: ApiKind, fallback: ApiCopy): ApiCopy {
  return COPY[locale]?.[kind] ?? fallback
}
