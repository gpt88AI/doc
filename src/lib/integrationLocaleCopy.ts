import type { Locale } from './locale'

type IntegrationKind = 'cursor' | 'cline' | 'claude-code' | 'gemini-cli' | 'codex-cli' | 'cc-switch' | 'hub' | 'dify' | 'immersive-translate' | 'chatbox' | 'cherry-studio' | 'anythingllm'
type IntegrationCopy = { title: string; description: string; intro: string }

export type IntegrationSections = Record<string, string>

const SECTION_COPY: Partial<Record<Locale, Partial<Record<IntegrationKind, IntegrationSections>>>> = {
  hi: {
    cursor: { prepare: 'तैयारी', setup: 'कॉन्फ़िगरेशन विधि', verify: 'सत्यापन विधि', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    cline: { setup: 'कॉन्फ़िगरेशन विधि', verify: 'सत्यापन विधि', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    'claude-code': { overview: 'इस पेज का उद्देश्य', prepare: 'तैयारी', setup: 'त्वरित कॉन्फ़िगरेशन', notes: 'मोड के अंतर', verify: 'सत्यापन विधि', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    'gemini-cli': { setup: 'कॉन्फ़िगरेशन विधि', image: 'इमेज API परीक्षण', notes: 'महत्वपूर्ण बातें', next: 'अगला कदम' },
    'codex-cli': { overview: 'निष्कर्ष पहले', prepare: 'तैयारी', install: 'पहला चरण: Codex CLI इंस्टॉल करें', configure: 'दूसरा चरण: API Key मोड कॉन्फ़िगर करें', verify: 'तीसरा चरण: फ़ाइल टूल सत्यापित करें', oauth: 'OAuth और plugin capability', troubleshoot: 'समस्या निवारण सूची', references: 'आगे पढ़ें', next: 'अगला कदम' },
    'cc-switch': { overview: 'उपयुक्त उपयोग', prepare: 'तैयारी', routes: 'रूट कैसे भरें', flow: 'चरण-दर-चरण कॉन्फ़िगरेशन', oauth: 'OAuth उपयोग', verify: 'रूट सत्यापित करें', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    chatbox: { prepare: 'तैयारी', launch: 'चरण 1: ChatBox शुरू करें', configure: 'चरण 2: gpt88.cc कॉन्फ़िगर करें', provider: '2.1 मॉडल प्रदाता चुनें', apiInfo: '2.2 API जानकारी भरें', model: '2.3 मॉडल चुनें', start: 'चरण 3: उपयोग शुरू करें', advanced: 'उन्नत सुविधाएँ', troubleshoot: 'समस्या निवारण सूची', faq: 'अक्सर पूछे जाने वाले प्रश्न', tips: 'उपयोग सुझाव', next: 'अगला कदम' },
    'cherry-studio': { overview: 'यह ट्यूटोरियल क्या बताता है', prepare: 'तैयारी', setup: 'त्वरित कॉन्फ़िगरेशन', verify: 'कनेक्टिविटी सत्यापित करें', tips: 'उपयोग सुझाव', faq: 'अक्सर पूछे जाने वाले प्रश्न', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    anythingllm: { overview: 'ट्यूटोरियल का लक्ष्य', prepare: 'तैयारी', setup: 'कॉन्फ़िगरेशन विधि', verify: 'सत्यापन विधि', notes: 'ध्यान देने योग्य बातें', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    dify: { overview: 'ट्यूटोरियल का लक्ष्य', prepare: 'तैयारी', provider: 'पहला चरण: मॉडल प्रदाता जोड़ें', app: 'दूसरा चरण: ऐप से जोड़ें', workflow: 'तीसरा चरण: वर्कफ़्लो से जोड़ें', knowledge: 'नॉलेज बेस कॉन्फ़िगरेशन', verify: 'सत्यापन विधि', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    'immersive-translate': { overview: 'उपयुक्त उपयोग', prepare: 'तैयारी', configure: 'पहला चरण: सेवा कॉन्फ़िगरेशन भरें', flow: 'दूसरा चरण: क्रम से चलाएं', prompt: 'तीसरा चरण: अनुवाद prompt सुधारें', verify: 'चौथा चरण: अनुवाद परिणाम जांचें', troubleshoot: 'समस्या निवारण सूची', next: 'अगला कदम' },
    hub: { chatApps: 'चैट ऐप्स', devTools: 'डेवलपर टूल', platforms: 'ऐप प्लेटफ़ॉर्म', references: 'आगे पढ़ें', next: 'अगला कदम' },
  },
  bn: {
    cursor: { prepare: 'প্রস্তুতি', setup: 'কনফিগারেশন পদ্ধতি', verify: 'যাচাই পদ্ধতি', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    cline: { setup: 'কনফিগারেশন পদ্ধতি', verify: 'যাচাই পদ্ধতি', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    'claude-code': { overview: 'এই পৃষ্ঠার উদ্দেশ্য', prepare: 'প্রস্তুতি', setup: 'দ্রুত কনফিগারেশন', notes: 'মোডের পার্থক্য', verify: 'যাচাই পদ্ধতি', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    'gemini-cli': { setup: 'কনফিগারেশন পদ্ধতি', image: 'ইমেজ API পরীক্ষা', notes: 'গুরুত্বপূর্ণ বিষয়', next: 'পরবর্তী ধাপ' },
    'codex-cli': { overview: 'আগে সিদ্ধান্ত দেখুন', prepare: 'প্রস্তুতি', install: 'প্রথম ধাপ: Codex CLI ইনস্টল করুন', configure: 'দ্বিতীয় ধাপ: API Key মোড কনফিগার করুন', verify: 'তৃতীয় ধাপ: ফাইল টুল যাচাই করুন', oauth: 'OAuth ও plugin capability', troubleshoot: 'সমস্যা সমাধানের তালিকা', references: 'আরও পড়ুন', next: 'পরবর্তী ধাপ' },
    'cc-switch': { overview: 'উপযুক্ত ব্যবহার', prepare: 'প্রস্তুতি', routes: 'রুট কীভাবে পূরণ করবেন', flow: 'ধাপে ধাপে কনফিগারেশন', oauth: 'OAuth ব্যবহার', verify: 'রুট যাচাই করুন', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    chatbox: { prepare: 'প্রস্তুতি', launch: 'ধাপ ১: ChatBox শুরু করুন', configure: 'ধাপ ২: gpt88.cc কনফিগার করুন', provider: '২.১ মডেল provider বাছাই', apiInfo: '২.২ API তথ্য পূরণ', model: '২.৩ মডেল বাছাই', start: 'ধাপ ৩: ব্যবহার শুরু', advanced: 'উন্নত সুবিধা', troubleshoot: 'সমস্যা সমাধানের তালিকা', faq: 'সাধারণ প্রশ্ন', tips: 'ব্যবহারের পরামর্শ', next: 'পরবর্তী ধাপ' },
    'cherry-studio': { overview: 'এই টিউটোরিয়ালে কী আছে', prepare: 'প্রস্তুতি', setup: 'দ্রুত কনফিগারেশন', verify: 'সংযোগ যাচাই', tips: 'ব্যবহারের পরামর্শ', faq: 'সাধারণ প্রশ্ন', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    anythingllm: { overview: 'টিউটোরিয়ালের লক্ষ্য', prepare: 'প্রস্তুতি', setup: 'কনফিগারেশন পদ্ধতি', verify: 'যাচাই পদ্ধতি', notes: 'গুরুত্বপূর্ণ বিষয়', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    dify: { overview: 'টিউটোরিয়ালের লক্ষ্য', prepare: 'প্রস্তুতি', provider: 'প্রথম ধাপ: model provider যোগ করুন', app: 'দ্বিতীয় ধাপ: app-এ যুক্ত করুন', workflow: 'তৃতীয় ধাপ: workflow-এ যুক্ত করুন', knowledge: 'knowledge base কনফিগারেশন', verify: 'যাচাই পদ্ধতি', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    'immersive-translate': { overview: 'উপযুক্ত ব্যবহার', prepare: 'প্রস্তুতি', configure: 'প্রথম ধাপ: service configuration পূরণ', flow: 'দ্বিতীয় ধাপ: ধাপে ধাপে চালান', prompt: 'তৃতীয় ধাপ: translation prompt উন্নত করুন', verify: 'চতুর্থ ধাপ: অনুবাদ ফল যাচাই', troubleshoot: 'সমস্যা সমাধানের তালিকা', next: 'পরবর্তী ধাপ' },
    hub: { chatApps: 'চ্যাট অ্যাপ', devTools: 'ডেভেলপার টুল', platforms: 'অ্যাপ প্ল্যাটফর্ম', references: 'আরও পড়ুন', next: 'পরবর্তী ধাপ' },
  },
  ur: {
    cursor: { prepare: 'تیاری', setup: 'کنفیگریشن کا طریقہ', verify: 'تصدیق کا طریقہ', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    cline: { setup: 'کنفیگریشن کا طریقہ', verify: 'تصدیق کا طریقہ', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    'claude-code': { overview: 'اس صفحے کا مقصد', prepare: 'تیاری', setup: 'فوری کنفیگریشن', notes: 'موڈ کا فرق', verify: 'تصدیق کا طریقہ', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    'gemini-cli': { setup: 'کنفیگریشن کا طریقہ', image: 'امیج API ٹیسٹ', notes: 'اہم باتیں', next: 'اگلا قدم' },
    'codex-cli': { overview: 'پہلے نتیجہ دیکھیں', prepare: 'تیاری', install: 'پہلا مرحلہ: Codex CLI انسٹال کریں', configure: 'دوسرا مرحلہ: API Key موڈ configure کریں', verify: 'تیسرا مرحلہ: فائل ٹول verify کریں', oauth: 'OAuth اور plugin capability', troubleshoot: 'مسئلہ حل فہرست', references: 'مزید مطالعہ', next: 'اگلا قدم' },
    'cc-switch': { overview: 'موزوں استعمال', prepare: 'تیاری', routes: 'روٹ کیسے بھریں', flow: 'مرحلہ وار کنفیگریشن', oauth: 'OAuth استعمال', verify: 'روٹ verify کریں', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    chatbox: { prepare: 'تیاری', launch: 'مرحلہ ۱: ChatBox شروع کریں', configure: 'مرحلہ ۲: gpt88.cc configure کریں', provider: '۲.۱ model provider منتخب کریں', apiInfo: '۲.۲ API معلومات بھریں', model: '۲.۳ model منتخب کریں', start: 'مرحلہ ۳: استعمال شروع کریں', advanced: 'اعلیٰ خصوصیات', troubleshoot: 'مسئلہ حل فہرست', faq: 'اکثر پوچھے گئے سوالات', tips: 'استعمال کی تجاویز', next: 'اگلا قدم' },
    'cherry-studio': { overview: 'یہ tutorial کیا بتاتا ہے', prepare: 'تیاری', setup: 'فوری کنفیگریشن', verify: 'کنیکٹیویٹی verify کریں', tips: 'استعمال کی تجاویز', faq: 'اکثر پوچھے گئے سوالات', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    anythingllm: { overview: 'tutorial کا مقصد', prepare: 'تیاری', setup: 'کنفیگریشن کا طریقہ', verify: 'تصدیق کا طریقہ', notes: 'اہم باتیں', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    dify: { overview: 'tutorial کا مقصد', prepare: 'تیاری', provider: 'پہلا مرحلہ: model provider شامل کریں', app: 'دوسرا مرحلہ: app سے جوڑیں', workflow: 'تیسرا مرحلہ: workflow سے جوڑیں', knowledge: 'knowledge base کنفیگریشن', verify: 'تصدیق کا طریقہ', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    'immersive-translate': { overview: 'موزوں استعمال', prepare: 'تیاری', configure: 'پہلا مرحلہ: service configuration بھریں', flow: 'دوسرا مرحلہ: ترتیب سے چلائیں', prompt: 'تیسرا مرحلہ: translation prompt بہتر کریں', verify: 'چوتھا مرحلہ: ترجمہ چیک کریں', troubleshoot: 'مسئلہ حل فہرست', next: 'اگلا قدم' },
    hub: { chatApps: 'چیٹ ایپس', devTools: 'developer tools', platforms: 'app platforms', references: 'مزید مطالعہ', next: 'اگلا قدم' },
  },
  ta: {
    cursor: { prepare: 'தயாரிப்பு', setup: 'கட்டமைப்பு முறை', verify: 'சரிபார்ப்பு முறை', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    cline: { setup: 'கட்டமைப்பு முறை', verify: 'சரிபார்ப்பு முறை', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    'claude-code': { overview: 'இந்தப் பக்கத்தின் நோக்கம்', prepare: 'தயாரிப்பு', setup: 'விரைவு கட்டமைப்பு', notes: 'முறைகளின் வேறுபாடு', verify: 'சரிபார்ப்பு முறை', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    'gemini-cli': { setup: 'கட்டமைப்பு முறை', image: 'பட API சோதனை', notes: 'முக்கிய குறிப்புகள்', next: 'அடுத்த படி' },
    'codex-cli': { overview: 'முதலில் முடிவைப் பாருங்கள்', prepare: 'தயாரிப்பு', install: 'முதல் படி: Codex CLI நிறுவுக', configure: 'இரண்டாம் படி: API Key முறையை அமைக்கவும்', verify: 'மூன்றாம் படி: கோப்பு கருவியைச் சரிபார்க்கவும்', oauth: 'OAuth மற்றும் plugin capability', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', references: 'மேலும் படிக்க', next: 'அடுத்த படி' },
    'cc-switch': { overview: 'பொருத்தமான பயன்பாடு', prepare: 'தயாரிப்பு', routes: 'Route-ஐ எவ்வாறு நிரப்புவது', flow: 'படிப்படியான கட்டமைப்பு', oauth: 'OAuth பயன்பாடு', verify: 'Route-ஐச் சரிபார்க்கவும்', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    chatbox: { prepare: 'தயாரிப்பு', launch: 'படி 1: ChatBox தொடங்கவும்', configure: 'படி 2: gpt88.cc அமைக்கவும்', provider: '2.1 model provider தேர்வு', apiInfo: '2.2 API தகவலை நிரப்பவும்', model: '2.3 model தேர்வு', start: 'படி 3: பயன்படுத்தத் தொடங்கவும்', advanced: 'மேம்பட்ட அம்சங்கள்', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', tips: 'பயன்பாட்டு பரிந்துரைகள்', next: 'அடுத்த படி' },
    'cherry-studio': { overview: 'இந்த tutorial என்ன சொல்கிறது', prepare: 'தயாரிப்பு', setup: 'விரைவு கட்டமைப்பு', verify: 'இணைப்பைச் சரிபார்க்கவும்', tips: 'பயன்பாட்டு பரிந்துரைகள்', faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    anythingllm: { overview: 'Tutorial நோக்கம்', prepare: 'தயாரிப்பு', setup: 'கட்டமைப்பு முறை', verify: 'சரிபார்ப்பு முறை', notes: 'முக்கிய குறிப்புகள்', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    dify: { overview: 'Tutorial நோக்கம்', prepare: 'தயாரிப்பு', provider: 'முதல் படி: model provider சேர்க்கவும்', app: 'இரண்டாம் படி: app-க்கு இணைக்கவும்', workflow: 'மூன்றாம் படி: workflow-க்கு இணைக்கவும்', knowledge: 'knowledge base கட்டமைப்பு', verify: 'சரிபார்ப்பு முறை', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    'immersive-translate': { overview: 'பொருத்தமான பயன்பாடு', prepare: 'தயாரிப்பு', configure: 'முதல் படி: service configuration நிரப்பவும்', flow: 'இரண்டாம் படி: வரிசையாக இயக்கவும்', prompt: 'மூன்றாம் படி: translation prompt மேம்படுத்தவும்', verify: 'நான்காம் படி: மொழிபெயர்ப்பைச் சரிபார்க்கவும்', troubleshoot: 'பிழைத்திருத்தப் பட்டியல்', next: 'அடுத்த படி' },
    hub: { chatApps: 'Chat apps', devTools: 'Developer tools', platforms: 'App platforms', references: 'மேலும் படிக்க', next: 'அடுத்த படி' },
  },
  ne: {
    cursor: { prepare: 'तयारी', setup: 'कन्फिगरेसन विधि', verify: 'प्रमाणीकरण विधि', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    cline: { setup: 'कन्फिगरेसन विधि', verify: 'प्रमाणीकरण विधि', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    'claude-code': { overview: 'यो पृष्ठको उद्देश्य', prepare: 'तयारी', setup: 'द्रुत कन्फिगरेसन', notes: 'मोडको भिन्नता', verify: 'प्रमाणीकरण विधि', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    'gemini-cli': { setup: 'कन्फिगरेसन विधि', image: 'छवि API परीक्षण', notes: 'महत्त्वपूर्ण कुरा', next: 'अर्को कदम' },
    'codex-cli': { overview: 'पहिले निष्कर्ष हेर्नुहोस्', prepare: 'तयारी', install: 'पहिलो चरण: Codex CLI इन्स्टल गर्नुहोस्', configure: 'दोस्रो चरण: API Key मोड कन्फिगर गर्नुहोस्', verify: 'तेस्रो चरण: फाइल टुल प्रमाणित गर्नुहोस्', oauth: 'OAuth र plugin capability', troubleshoot: 'समस्या समाधान सूची', references: 'थप पढाइ', next: 'अर्को कदम' },
    'cc-switch': { overview: 'उपयुक्त प्रयोग', prepare: 'तयारी', routes: 'रुट कसरी भर्ने', flow: 'चरणबद्ध कन्फिगरेसन', oauth: 'OAuth प्रयोग', verify: 'रुट प्रमाणित गर्नुहोस्', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    chatbox: { prepare: 'तयारी', launch: 'चरण १: ChatBox सुरु गर्नुहोस्', configure: 'चरण २: gpt88.cc कन्फिगर गर्नुहोस्', provider: '२.१ model provider छान्नुहोस्', apiInfo: '२.२ API जानकारी भर्नुहोस्', model: '२.३ model छान्नुहोस्', start: 'चरण ३: प्रयोग सुरु गर्नुहोस्', advanced: 'उन्नत सुविधा', troubleshoot: 'समस्या समाधान सूची', faq: 'सामान्य प्रश्न', tips: 'प्रयोग सुझाव', next: 'अर्को कदम' },
    'cherry-studio': { overview: 'यो tutorial ले के बताउँछ', prepare: 'तयारी', setup: 'द्रुत कन्फिगरेसन', verify: 'कनेक्टिभिटी प्रमाणित गर्नुहोस्', tips: 'प्रयोग सुझाव', faq: 'सामान्य प्रश्न', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    anythingllm: { overview: 'Tutorial को लक्ष्य', prepare: 'तयारी', setup: 'कन्फिगरेसन विधि', verify: 'प्रमाणीकरण विधि', notes: 'महत्त्वपूर्ण कुरा', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    dify: { overview: 'Tutorial को लक्ष्य', prepare: 'तयारी', provider: 'पहिलो चरण: model provider थप्नुहोस्', app: 'दोस्रो चरण: app मा जोड्नुहोस्', workflow: 'तेस्रो चरण: workflow मा जोड्नुहोस्', knowledge: 'knowledge base कन्फिगरेसन', verify: 'प्रमाणीकरण विधि', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    'immersive-translate': { overview: 'उपयुक्त प्रयोग', prepare: 'तयारी', configure: 'पहिलो चरण: service configuration भर्नुहोस्', flow: 'दोस्रो चरण: क्रमशः चलाउनुहोस्', prompt: 'तेस्रो चरण: translation prompt सुधार्नुहोस्', verify: 'चौथो चरण: अनुवाद जाँच्नुहोस्', troubleshoot: 'समस्या समाधान सूची', next: 'अर्को कदम' },
    hub: { chatApps: 'Chat apps', devTools: 'Developer tools', platforms: 'App platforms', references: 'थप पढाइ', next: 'अर्को कदम' },
  },
  si: {
    cursor: { prepare: 'සූදානම', setup: 'වින්‍යාස ක්‍රමය', verify: 'සත්‍යාපන ක්‍රමය', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    cline: { setup: 'වින්‍යාස ක්‍රමය', verify: 'සත්‍යාපන ක්‍රමය', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    'claude-code': { overview: 'මෙම පිටුවේ අරමුණ', prepare: 'සූදානම', setup: 'ඉක්මන් වින්‍යාසය', notes: 'මාදිලි අතර වෙනස', verify: 'සත්‍යාපන ක්‍රමය', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    'gemini-cli': { setup: 'වින්‍යාස ක්‍රමය', image: 'රූප API පරීක්ෂාව', notes: 'වැදගත් කරුණු', next: 'ඊළඟ පියවර' },
    'codex-cli': { overview: 'පළමුව නිගමනය බලන්න', prepare: 'සූදානම', install: 'පළමු පියවර: Codex CLI ස්ථාපනය කරන්න', configure: 'දෙවන පියවර: API Key මාදිලිය සකසන්න', verify: 'තුන්වන පියවර: ගොනු මෙවලම සත්‍යාපනය කරන්න', oauth: 'OAuth සහ plugin capability', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', references: 'වැඩිදුර කියවීම', next: 'ඊළඟ පියවර' },
    'cc-switch': { overview: 'සුදුසු භාවිතය', prepare: 'සූදානම', routes: 'Route පුරවන්නේ කෙසේද', flow: 'පියවරෙන් පියවර වින්‍යාසය', oauth: 'OAuth භාවිතය', verify: 'Route සත්‍යාපනය කරන්න', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    chatbox: { prepare: 'සූදානම', launch: 'පියවර 1: ChatBox ආරම්භ කරන්න', configure: 'පියවර 2: gpt88.cc සකසන්න', provider: '2.1 model provider තෝරන්න', apiInfo: '2.2 API තොරතුරු පුරවන්න', model: '2.3 model තෝරන්න', start: 'පියවර 3: භාවිතය ආරම්භ කරන්න', advanced: 'උසස් විශේෂාංග', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', faq: 'නිතර අසන ප්‍රශ්න', tips: 'භාවිත නිර්දේශ', next: 'ඊළඟ පියවර' },
    'cherry-studio': { overview: 'මෙම tutorial එකේ අන්තර්ගතය', prepare: 'සූදානම', setup: 'ඉක්මන් වින්‍යාසය', verify: 'සම්බන්ධතාව සත්‍යාපනය කරන්න', tips: 'භාවිත නිර්දේශ', faq: 'නිතර අසන ප්‍රශ්න', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    anythingllm: { overview: 'Tutorial අරමුණ', prepare: 'සූදානම', setup: 'වින්‍යාස ක්‍රමය', verify: 'සත්‍යාපන ක්‍රමය', notes: 'වැදගත් කරුණු', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    dify: { overview: 'Tutorial අරමුණ', prepare: 'සූදානම', provider: 'පළමු පියවර: model provider එක් කරන්න', app: 'දෙවන පියවර: app එකට සම්බන්ධ කරන්න', workflow: 'තුන්වන පියවර: workflow එකට සම්බන්ධ කරන්න', knowledge: 'knowledge base වින්‍යාසය', verify: 'සත්‍යාපන ක්‍රමය', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    'immersive-translate': { overview: 'සුදුසු භාවිතය', prepare: 'සූදානම', configure: 'පළමු පියවර: service configuration පුරවන්න', flow: 'දෙවන පියවර: අනුපිළිවෙළින් ධාවනය කරන්න', prompt: 'තුන්වන පියවර: translation prompt වැඩිදියුණු කරන්න', verify: 'හතරවන පියවර: පරිවර්තනය පරීක්ෂා කරන්න', troubleshoot: 'දෝෂ නිරාකරණ ලැයිස්තුව', next: 'ඊළඟ පියවර' },
    hub: { chatApps: 'Chat apps', devTools: 'Developer tools', platforms: 'App platforms', references: 'වැඩිදුර කියවීම', next: 'ඊළඟ පියවර' },
  },
}

const COPY: Partial<Record<Locale, Partial<Record<IntegrationKind, IntegrationCopy>>>> = {
  hi: {
    cursor: { title: 'Cursor में GPT88 API कॉन्फ़िगर करें', description: 'Cursor में GPT88 का OpenAI-compatible API उपयोग करें और API Key, model और endpoint की पुष्टि करें।', intro: 'Cursor में OpenAI Compatible विकल्प चुनें, server-side API Key उपयोग करें और छोटे task से शुरुआत करें।' },
    cline: { title: 'Cline में OpenAI-compatible API कॉन्फ़िगर करें', description: 'Cline में custom OpenAI-compatible provider, छोटा request और सामान्य troubleshooting।', intro: 'पहले छोटा file task चलाकर provider, model और tool chain की पुष्टि करें।' },
    'claude-code': { title: 'Claude Code में GPT88 API उपयोग करें', description: 'Claude Code को OpenAI-compatible API से जोड़ें और API Key, model और endpoint verify करें।', intro: 'Model request और plugin capability को अलग समझें: API Key model access के लिए, OAuth plugin access के लिए है।' },
    'gemini-cli': { title: 'Gemini CLI को gpt88.cc से जोड़ें', description: 'Gemini CLI और Google image models के लिए gpt88.cc integration guide।', intro: 'Text requests और native Gemini image requests के लिए अलग protocol और endpoint उपयोग करें।' },
    'codex-cli': { title: 'Codex CLI को gpt88.cc से जोड़ें', description: 'Codex CLI में model access, OAuth switching, plugin limits और tool recovery guide।', intro: 'API Key और OAuth अलग लक्ष्य हैं; पहले तय करें कि आपको model call चाहिए या plugin capability।' },
    'cc-switch': { title: 'CC-Switch को gpt88.cc से जोड़ें', description: 'CC-Switch में gpt88.cc routes, OpenAI/Claude protocol differences, OAuth switching और troubleshooting।', intro: 'पहले target protocol और route तय करें, फिर Key या OAuth configuration लागू करें।' },
  },
  bn: {
    cursor: { title: 'Cursor-এ GPT88 API কনফিগার করুন', description: 'Cursor-এ GPT88-এর OpenAI-compatible API ব্যবহার করে Key, model ও endpoint যাচাই করুন।', intro: 'Cursor-এ OpenAI Compatible নির্বাচন করুন, server-side API Key ব্যবহার করুন এবং ছোট task দিয়ে শুরু করুন।' },
    cline: { title: 'Cline-এ OpenAI-compatible API কনফিগার করুন', description: 'Cline-এর custom OpenAI-compatible provider, ছোট request ও সাধারণ troubleshooting।', intro: 'প্রথমে ছোট file task চালিয়ে provider, model ও tool chain যাচাই করুন।' },
    'claude-code': { title: 'Claude Code-এ GPT88 API ব্যবহার করুন', description: 'Claude Code-কে OpenAI-compatible API-তে যুক্ত করে Key, model ও endpoint যাচাই করুন।', intro: 'Model request ও plugin capability আলাদা: API Key model access-এর জন্য, OAuth plugin access-এর জন্য।' },
    'gemini-cli': { title: 'Gemini CLI-কে gpt88.cc-তে যুক্ত করুন', description: 'Gemini CLI ও Google image model-এর জন্য gpt88.cc integration guide।', intro: 'Text request ও native Gemini image request-এর জন্য আলাদা protocol ও endpoint ব্যবহার করুন।' },
    'codex-cli': { title: 'Codex CLI-কে gpt88.cc-তে যুক্ত করুন', description: 'Codex CLI-তে model access, OAuth switching, plugin limit ও tool recovery guide।', intro: 'API Key ও OAuth আলাদা লক্ষ্য; আগে ঠিক করুন model call নাকি plugin capability দরকার।' },
    'cc-switch': { title: 'CC-Switch-কে gpt88.cc-তে যুক্ত করুন', description: 'CC-Switch route, OpenAI/Claude protocol difference, OAuth switching ও troubleshooting।', intro: 'প্রথমে target protocol ও route ঠিক করুন, তারপর Key বা OAuth configuration প্রয়োগ করুন।' },
  },
  ur: {
    cursor: { title: 'Cursor میں GPT88 API configure کریں', description: 'Cursor میں GPT88 کا OpenAI-compatible API استعمال کر کے Key، model اور endpoint verify کریں۔', intro: 'Cursor میں OpenAI Compatible منتخب کریں، server-side API Key رکھیں اور چھوٹے task سے شروع کریں۔' },
    cline: { title: 'Cline میں OpenAI-compatible API configure کریں', description: 'Cline کے custom OpenAI-compatible provider، مختصر request اور عام troubleshooting۔', intro: 'پہلے چھوٹا file task چلا کر provider، model اور tool chain کی تصدیق کریں۔' },
    'claude-code': { title: 'Claude Code میں GPT88 API استعمال کریں', description: 'Claude Code کو OpenAI-compatible API سے جوڑ کر Key، model اور endpoint verify کریں۔', intro: 'Model request اور plugin capability الگ ہیں: API Key model access اور OAuth plugin access کے لیے ہے۔' },
    'gemini-cli': { title: 'Gemini CLI کو gpt88.cc سے جوڑیں', description: 'Gemini CLI اور Google image models کے لیے gpt88.cc integration guide۔', intro: 'Text requests اور native Gemini image requests کے لیے الگ protocol اور endpoint استعمال کریں۔' },
    'codex-cli': { title: 'Codex CLI کو gpt88.cc سے جوڑیں', description: 'Codex CLI میں model access، OAuth switching، plugin limits اور tool recovery guide۔', intro: 'API Key اور OAuth الگ مقاصد ہیں؛ پہلے طے کریں کہ model call یا plugin capability چاہیے۔' },
    'cc-switch': { title: 'CC-Switch کو gpt88.cc سے جوڑیں', description: 'CC-Switch routes، OpenAI/Claude protocol differences، OAuth switching اور troubleshooting۔', intro: 'پہلے target protocol اور route طے کریں، پھر Key یا OAuth configuration لگائیں۔' },
  },
  ta: {
    cursor: { title: 'Cursor-ல் GPT88 API-ஐ அமைக்கவும்', description: 'Cursor-ல் GPT88 OpenAI-compatible API-ஐப் பயன்படுத்தி Key, model மற்றும் endpoint-ஐச் சரிபார்க்கவும்.', intro: 'Cursor-ல் OpenAI Compatible-ஐத் தேர்வு செய்து, server-side API Key-ஐப் பயன்படுத்தி சிறிய task-ல் தொடங்கவும்.' },
    cline: { title: 'Cline-ல் OpenAI-compatible API-ஐ அமைக்கவும்', description: 'Cline custom OpenAI-compatible provider, குறைந்தபட்ச request மற்றும் troubleshooting.', intro: 'முதலில் சிறிய file task மூலம் provider, model மற்றும் tool chain-ஐச் சரிபார்க்கவும்.' },
    'claude-code': { title: 'Claude Code-ல் GPT88 API-ஐப் பயன்படுத்தவும்', description: 'Claude Code-ஐ OpenAI-compatible API-க்கு இணைத்து Key, model மற்றும் endpoint-ஐச் சரிபார்க்கவும்.', intro: 'Model request மற்றும் plugin capability வேறுபடும்: API Key model access-க்கும் OAuth plugin access-க்கும் பயன்படும்.' },
    'gemini-cli': { title: 'Gemini CLI-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'Gemini CLI மற்றும் Google image models-க்கான gpt88.cc integration guide.', intro: 'Text requests மற்றும் native Gemini image requests-க்கு வேறு protocol மற்றும் endpoint பயன்படுத்தவும்.' },
    'codex-cli': { title: 'Codex CLI-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'Codex CLI model access, OAuth switching, plugin limits மற்றும் tool recovery guide.', intro: 'API Key மற்றும் OAuth வேறு நோக்கங்களுக்கானவை; model call அல்லது plugin capability எது தேவை என முதலில் தீர்மானிக்கவும்.' },
    'cc-switch': { title: 'CC-Switch-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'CC-Switch routes, OpenAI/Claude protocol differences, OAuth switching மற்றும் troubleshooting.', intro: 'முதலில் target protocol மற்றும் route-ஐத் தேர்வு செய்து, பிறகு Key அல்லது OAuth configuration அமைக்கவும்.' },
  },
  ne: {
    cursor: { title: 'Cursor मा GPT88 API सेटअप गर्नुहोस्', description: 'Cursor मा GPT88 को OpenAI-compatible API प्रयोग गरी Key, model र endpoint जाँच्नुहोस्।', intro: 'Cursor मा OpenAI Compatible छान्नुहोस्, server-side API Key राख्नुहोस् र सानो task बाट सुरु गर्नुहोस्।' },
    cline: { title: 'Cline मा OpenAI-compatible API सेटअप गर्नुहोस्', description: 'Cline custom OpenAI-compatible provider, छोटो request र troubleshooting guide।', intro: 'पहिले सानो file task चलाएर provider, model र tool chain जाँच्नुहोस्।' },
    'claude-code': { title: 'Claude Code मा GPT88 API प्रयोग गर्नुहोस्', description: 'Claude Code लाई OpenAI-compatible API सँग जोडेर Key, model र endpoint जाँच्नुहोस्।', intro: 'Model request र plugin capability छुट्टाछुट्टै हुन्: API Key model access र OAuth plugin access का लागि हो।' },
    'gemini-cli': { title: 'Gemini CLI लाई gpt88.cc मा जोड्नुहोस्', description: 'Gemini CLI र Google image models का लागि gpt88.cc integration guide।', intro: 'Text request र native Gemini image request का लागि फरक protocol र endpoint प्रयोग गर्नुहोस्।' },
    'codex-cli': { title: 'Codex CLI लाई gpt88.cc मा जोड्नुहोस्', description: 'Codex CLI model access, OAuth switching, plugin limits र tool recovery guide।', intro: 'API Key र OAuth फरक लक्ष्यका हुन्; पहिले model call वा plugin capability के चाहिन्छ तय गर्नुहोस्।' },
    'cc-switch': { title: 'CC-Switch लाई gpt88.cc मा जोड्नुहोस्', description: 'CC-Switch routes, OpenAI/Claude protocol differences, OAuth switching र troubleshooting।', intro: 'पहिले target protocol र route छान्नुहोस्, त्यसपछि Key वा OAuth configuration लागू गर्नुहोस्।' },
  },
  si: {
    cursor: { title: 'Cursor තුළ GPT88 API සකසන්න', description: 'Cursor තුළ GPT88 OpenAI-compatible API භාවිත කර Key, model සහ endpoint පරීක්ෂා කරන්න.', intro: 'Cursor තුළ OpenAI Compatible තෝරා server-side API Key භාවිත කර කුඩා task එකකින් ආරම්භ කරන්න.' },
    cline: { title: 'Cline තුළ OpenAI-compatible API සකසන්න', description: 'Cline custom OpenAI-compatible provider, කෙටි request සහ troubleshooting.', intro: 'පළමුව කුඩා file task එකක් ධාවනය කර provider, model සහ tool chain පරීක්ෂා කරන්න.' },
    'claude-code': { title: 'Claude Code තුළ GPT88 API භාවිත කරන්න', description: 'Claude Code OpenAI-compatible API එකකට සම්බන්ධ කර Key, model සහ endpoint පරීක්ෂා කරන්න.', intro: 'Model request සහ plugin capability වෙනස් වේ: API Key model access සඳහාත් OAuth plugin access සඳහාත්ය.' },
    'gemini-cli': { title: 'Gemini CLI gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'Gemini CLI සහ Google image models සඳහා gpt88.cc integration guide.', intro: 'Text requests සහ native Gemini image requests සඳහා වෙනස් protocol සහ endpoint භාවිත කරන්න.' },
    'codex-cli': { title: 'Codex CLI gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'Codex CLI model access, OAuth switching, plugin limits සහ tool recovery guide.', intro: 'API Key සහ OAuth වෙනස් අරමුණු සඳහාය; model call හෝ plugin capability අවශ්‍යදැයි පළමුව තීරණය කරන්න.' },
    'cc-switch': { title: 'CC-Switch gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'CC-Switch routes, OpenAI/Claude protocol differences, OAuth switching සහ troubleshooting.', intro: 'පළමුව target protocol සහ route තෝරා, පසුව Key හෝ OAuth configuration යොදන්න.' },
  },
}

const PLATFORM_COPY: Partial<Record<Locale, Partial<Record<IntegrationKind, IntegrationCopy>>>> = {
  hi: {
    hub: { title: 'Integration Guide', description: 'Chat apps, developer tools और platforms के लिए gpt88.cc integration index।', intro: 'अपना tool चुनें, फिर Base URL, API Key और model configuration के अनुसार सबसे छोटा setup flow अपनाएं।' },
    dify: { title: 'Dify को gpt88.cc से जोड़ें', description: 'Dify platform, Chatflow, Workflow और knowledge base के लिए step-by-step guide।', intro: 'Chat और embedding models को अलग configure करें और पहले एक छोटा app test करें।' },
    'immersive-translate': { title: 'Immersive Translate को gpt88.cc से जोड़ें', description: 'Browser translation extension को OpenAI-compatible API के माध्यम से gpt88.cc से जोड़ने का guide।', intro: 'एक छोटा webpage चुनें, model और API endpoint सेट करें, फिर translation quality और usage जांचें।' },
    chatbox: { title: 'ChatBox में gpt88.cc उपयोग करें', description: 'ChatBox desktop में OpenAI-compatible provider, model selection, connectivity और troubleshooting।', intro: 'Provider और protocol चुनें, API Key लगाएं और एक छोटा test message भेजें।' },
    'cherry-studio': { title: 'Cherry Studio को gpt88.cc से जोड़ें', description: 'Cherry Studio में multi-model management, prompt templates और chat workflows के लिए guide।', intro: 'OpenAI Compatible provider चुनें, Base URL और Key भरें और stable model से शुरुआत करें।' },
    anythingllm: { title: 'AnythingLLM को gpt88.cc से जोड़ें', description: 'AnythingLLM chat और knowledge-base workflow में gpt88.cc integration guide।', intro: 'Chat और embedding models अलग रखें और पहले एक छोटा question-answer test चलाएं।' },
  },
  bn: {
    hub: { title: 'ইন্টিগ্রেশন গাইড', description: 'Chat app, developer tool ও platform-এর জন্য gpt88.cc integration index।', intro: 'আপনার tool বেছে নিয়ে Base URL, API Key ও model configuration অনুযায়ী ছোট setup flow অনুসরণ করুন।' },
    dify: { title: 'Dify-কে gpt88.cc-তে যুক্ত করুন', description: 'Dify platform, Chatflow, Workflow ও knowledge base-এর step-by-step guide।', intro: 'Chat ও embedding model আলাদা configure করে আগে ছোট app test করুন।' },
    'immersive-translate': { title: 'Immersive Translate-কে gpt88.cc-তে যুক্ত করুন', description: 'Browser translation extension-কে OpenAI-compatible API দিয়ে gpt88.cc-তে যুক্ত করার guide।', intro: 'ছোট webpage বেছে model ও API endpoint সেট করে translation quality ও usage যাচাই করুন।' },
    chatbox: { title: 'ChatBox-এ gpt88.cc ব্যবহার করুন', description: 'ChatBox desktop-এ OpenAI-compatible provider, model selection, connectivity ও troubleshooting।', intro: 'Provider ও protocol বেছে API Key বসিয়ে একটি ছোট test message পাঠান।' },
    'cherry-studio': { title: 'Cherry Studio-কে gpt88.cc-তে যুক্ত করুন', description: 'Cherry Studio-তে multi-model management, prompt template ও chat workflow-এর guide।', intro: 'OpenAI Compatible provider বেছে Base URL ও Key দিয়ে stable model দিয়ে শুরু করুন।' },
    anythingllm: { title: 'AnythingLLM-কে gpt88.cc-তে যুক্ত করুন', description: 'AnythingLLM chat ও knowledge-base workflow-এ gpt88.cc integration guide।', intro: 'Chat ও embedding model আলাদা রাখুন এবং ছোট question-answer test চালান।' },
  },
  ur: {
    hub: { title: 'Integration Guide', description: 'Chat apps، developer tools اور platforms کے لیے gpt88.cc integration index۔', intro: 'اپنا tool منتخب کریں، پھر Base URL، API Key اور model configuration کے مطابق مختصر setup flow اپنائیں۔' },
    dify: { title: 'Dify کو gpt88.cc سے جوڑیں', description: 'Dify platform، Chatflow، Workflow اور knowledge base کے لیے step-by-step guide۔', intro: 'Chat اور embedding models الگ configure کریں اور پہلے چھوٹا app test کریں۔' },
    'immersive-translate': { title: 'Immersive Translate کو gpt88.cc سے جوڑیں', description: 'Browser translation extension کو OpenAI-compatible API کے ذریعے gpt88.cc سے جوڑنے کا guide۔', intro: 'ایک مختصر webpage پر model اور API endpoint سیٹ کر کے translation quality اور usage دیکھیں۔' },
    chatbox: { title: 'ChatBox میں gpt88.cc استعمال کریں', description: 'ChatBox desktop میں OpenAI-compatible provider، model selection، connectivity اور troubleshooting۔', intro: 'Provider اور protocol منتخب کر کے API Key لگائیں اور مختصر test message بھیجیں۔' },
    'cherry-studio': { title: 'Cherry Studio کو gpt88.cc سے جوڑیں', description: 'Cherry Studio میں multi-model management، prompt templates اور chat workflows کے لیے guide۔', intro: 'OpenAI Compatible provider منتخب کریں، Base URL اور Key درج کریں اور stable model سے شروع کریں۔' },
    anythingllm: { title: 'AnythingLLM کو gpt88.cc سے جوڑیں', description: 'AnythingLLM chat اور knowledge-base workflow میں gpt88.cc integration guide۔', intro: 'Chat اور embedding models الگ رکھیں اور مختصر question-answer test چلائیں۔' },
  },
  ta: {
    hub: { title: 'Integration Guide', description: 'Chat apps, developer tools மற்றும் platforms க்கான gpt88.cc integration index.', intro: 'உங்கள் tool-ஐத் தேர்வு செய்து Base URL, API Key மற்றும் model configuration படி குறுகிய setup flow-ஐப் பின்பற்றவும்.' },
    dify: { title: 'Dify-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'Dify platform, Chatflow, Workflow மற்றும் knowledge base-க்கான step-by-step guide.', intro: 'Chat மற்றும் embedding models-ஐ தனித்தனியாக configure செய்து சிறிய app-ஐ முதலில் சோதிக்கவும்.' },
    'immersive-translate': { title: 'Immersive Translate-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'Browser translation extension-ஐ OpenAI-compatible API மூலம் gpt88.cc-க்கு இணைக்கும் guide.', intro: 'சிறிய webpage-ஐத் தேர்ந்தெடுத்து model மற்றும் API endpoint அமைத்து translation quality மற்றும் usage-ஐச் சரிபார்க்கவும்.' },
    chatbox: { title: 'ChatBox-ல் gpt88.cc பயன்படுத்தவும்', description: 'ChatBox desktop-ல் OpenAI-compatible provider, model selection, connectivity மற்றும் troubleshooting.', intro: 'Provider மற்றும் protocol தேர்வு செய்து API Key-ஐச் சேர்த்து சிறிய test message அனுப்பவும்.' },
    'cherry-studio': { title: 'Cherry Studio-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'Cherry Studio multi-model management, prompt templates மற்றும் chat workflows guide.', intro: 'OpenAI Compatible provider-ஐத் தேர்வு செய்து Base URL மற்றும் Key அமைத்து நிலையான model-ல் தொடங்கவும்.' },
    anythingllm: { title: 'AnythingLLM-ஐ gpt88.cc-க்கு இணைக்கவும்', description: 'AnythingLLM chat மற்றும் knowledge-base workflow-க்கான gpt88.cc integration guide.', intro: 'Chat மற்றும் embedding models-ஐத் தனியாக வைத்து சிறிய question-answer test இயக்கவும்.' },
  },
  ne: {
    hub: { title: 'Integration Guide', description: 'Chat app, developer tool र platform का लागि gpt88.cc integration index।', intro: 'आफ्नो tool छान्नुहोस् र Base URL, API Key तथा model configuration अनुसार छोटो setup flow अपनाउनुहोस्।' },
    dify: { title: 'Dify लाई gpt88.cc मा जोड्नुहोस्', description: 'Dify platform, Chatflow, Workflow र knowledge base का लागि step-by-step guide।', intro: 'Chat र embedding model अलग configure गरी पहिले सानो app test गर्नुहोस्।' },
    'immersive-translate': { title: 'Immersive Translate लाई gpt88.cc मा जोड्नुहोस्', description: 'Browser translation extension लाई OpenAI-compatible API मार्फत gpt88.cc मा जोड्ने guide।', intro: 'सानो webpage छानेर model र API endpoint सेट गरी translation quality र usage जाँच्नुहोस्।' },
    chatbox: { title: 'ChatBox मा gpt88.cc प्रयोग गर्नुहोस्', description: 'ChatBox desktop मा OpenAI-compatible provider, model selection, connectivity र troubleshooting।', intro: 'Provider र protocol छान्नुहोस्, API Key राख्नुहोस् र सानो test message पठाउनुहोस्।' },
    'cherry-studio': { title: 'Cherry Studio लाई gpt88.cc मा जोड्नुहोस्', description: 'Cherry Studio multi-model management, prompt templates र chat workflows guide।', intro: 'OpenAI Compatible provider छानेर Base URL र Key भर्नुहोस् र स्थिर model बाट सुरु गर्नुहोस्।' },
    anythingllm: { title: 'AnythingLLM लाई gpt88.cc मा जोड्नुहोस्', description: 'AnythingLLM chat र knowledge-base workflow मा gpt88.cc integration guide।', intro: 'Chat र embedding model अलग राख्नुहोस् र सानो question-answer test चलाउनुहोस्।' },
  },
  si: {
    hub: { title: 'Integration Guide', description: 'Chat apps, developer tools සහ platforms සඳහා gpt88.cc integration index.', intro: 'ඔබේ tool එක තෝරා Base URL, API Key සහ model configuration අනුව කෙටි setup flow එක අනුගමනය කරන්න.' },
    dify: { title: 'Dify gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'Dify platform, Chatflow, Workflow සහ knowledge base සඳහා step-by-step guide.', intro: 'Chat සහ embedding models වෙන වෙනම configure කර මුලින් කුඩා app එකක් පරීක්ෂා කරන්න.' },
    'immersive-translate': { title: 'Immersive Translate gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'Browser translation extension එක OpenAI-compatible API හරහා gpt88.cc වෙත සම්බන්ධ කිරීමේ guide.', intro: 'කුඩා webpage එකක් තෝරා model සහ API endpoint සකසා translation quality සහ usage පරීක්ෂා කරන්න.' },
    chatbox: { title: 'ChatBox තුළ gpt88.cc භාවිත කරන්න', description: 'ChatBox desktop තුළ OpenAI-compatible provider, model selection, connectivity සහ troubleshooting.', intro: 'Provider සහ protocol තෝරා API Key එක් කර කුඩා test message එකක් යවන්න.' },
    'cherry-studio': { title: 'Cherry Studio gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'Cherry Studio multi-model management, prompt templates සහ chat workflows සඳහා guide.', intro: 'OpenAI Compatible provider තෝරා Base URL සහ Key සකසා ස්ථාවර model එකකින් ආරම්භ කරන්න.' },
    anythingllm: { title: 'AnythingLLM gpt88.cc වෙත සම්බන්ධ කරන්න', description: 'AnythingLLM chat සහ knowledge-base workflow සඳහා gpt88.cc integration guide.', intro: 'Chat සහ embedding models වෙන්ව තබා කුඩා question-answer test එකක් ධාවනය කරන්න.' },
  },
}

export function getIntegrationCopy(locale: Locale, kind: IntegrationKind, fallback: IntegrationCopy): IntegrationCopy {
  return COPY[locale]?.[kind] ?? PLATFORM_COPY[locale]?.[kind] ?? fallback
}

export function getIntegrationSections(locale: Locale, kind: IntegrationKind, fallback: IntegrationSections): IntegrationSections {
  return { ...fallback, ...SECTION_COPY[locale]?.[kind] }
}
