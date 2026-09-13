import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

If you use a knowledge base, configure embedding and chat models separately.`,d=`1. Prepare an API key
2. Use https://api.gpt88.cc as the Base URL
3. Treat chat and embedding models separately
4. Run one minimal Q&A test first
5. Import knowledge documents only after that`,f=`1. Knowledge answers are unstable
   - Switch to a more stable chat model first
   - Check document chunk size

2. Model is not visible
   - Enter the model ID manually
   - Copy the exact name from the model catalog

3. Authentication fails
   - Check whether the key is complete
   - Check whether an environment variable is overriding it`;function p(){return(0,l.jsxs)(o,{path:`/docs/integrations/chat/anythingllm`,title:`AnythingLLM with gpt88.cc`,description:`Connect gpt88.cc to AnythingLLM for chat and knowledge-base workflows.`,headings:[{id:`overview`,text:`Guide goals`,level:2},{id:`prepare`,text:`Preparation`,level:2},{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`notes`,text:`Notes`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Recommended route`,children:(0,l.jsxs)(`p`,{children:[`AnythingLLM usually works directly through the OpenAI-compatible path with`,(0,l.jsx)(`code`,{children:` https://api.gpt88.cc`}),`.`]})}),(0,l.jsx)(`p`,{children:`The important distinction in AnythingLLM is between the chat model and the knowledge-base pipeline. Keep them separate instead of mixing everything into one initial configuration.`}),(0,l.jsx)(`h2`,{id:`overview`,children:`Guide goals`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Connect gpt88.cc into AnythingLLM.`}),(0,l.jsx)(`li`,{children:`Make chat work first, then add the knowledge base.`}),(0,l.jsx)(`li`,{children:`Know which layer to inspect first when something fails.`})]}),(0,l.jsx)(`h2`,{id:`prepare`,children:`Preparation`}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d}),(0,l.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Send one short chat request and confirm the model path works.`}),(0,l.jsx)(`li`,{children:`Then import a small batch of documents to validate retrieval and answers.`}),(0,l.jsx)(`li`,{children:`If results are wrong, debug the knowledge layer and the chat layer separately.`})]}),(0,l.jsx)(`h2`,{id:`notes`,children:`Notes`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`Configure knowledge and chat models separately when possible.`}),(0,l.jsx)(`li`,{children:`If the client caches model lists, refresh after changing providers.`}),(0,l.jsx)(`li`,{children:`Always validate connectivity before importing the document set.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:f}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsx)(`ul`,{children:(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var m={zh:{title:`接法`,intro:`这页重点是把 AnythingLLM 里的聊天模型和知识库模型拆清楚，避免一上来把所有能力混到同一个配置里。`,overview:[`把 gpt88.cc 接进 AnythingLLM。`,`先跑通聊天，再接知识库。`,`知道失败时先查哪一层。`],checklist:`1. 先准备好 API Key
2. Base URL 用 https://api.gpt88.cc
3. 聊天模型和 embedding 模型分开看
4. 先跑一条最小问答
5. 再导入知识库文档`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest

如果你做知识库问答，先确认 embedding 和 chat 模型分别配置清楚。`,verify:[`先发一条最短对话，确认模型通路可用。`,`再导入一小批知识库文档，验证检索和回答是否正常。`,`结果异常时，先把知识库和聊天模型分开排查。`],notes:[`知识库和聊天模型最好分开配置，避免成本和效果混在一起。`,`如果有模型缓存，更新后记得刷新。`,`先用最小问题测试连通性，再导入文档库。`],trouble:`1. 知识库问答结果不稳定
   - 先换一个更稳的聊天模型
   - 检查文档切块大小

2. 模型不可见
   - 手动输入模型 ID
   - 到模型导航复制真实名称

3. 认证失败
   - 检查 Key 是否完整
   - 检查环境变量是否被覆盖`,next:`返回集成总览`},hi:{title:`कनेक्शन तरीका`,intro:`इस page में AnythingLLM के chat model और knowledge-base model अलग रखे जाते हैं, ताकि सभी capabilities एक config में न मिलें।`,overview:[`AnythingLLM में gpt88.cc जोड़ना।`,`पहले chat चलाना, फिर knowledge base जोड़ना।`,`Failure में पहले कौन-सी layer जांचनी है।`],checklist:`1. API Key तैयार करें
2. Base URL https://api.gpt88.cc रखें
3. Chat और embedding model अलग रखें
4. छोटा Q&A चलाएं
5. फिर knowledge-base documents import करें`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A में embedding और chat model अलग configure करें।`,verify:[`छोटा chat भेजकर model route जांचें।`,`छोटे document batch से retrieval और answer जांचें।`,`Result गलत हो तो knowledge base और chat model अलग-अलग जांचें।`],notes:[`Knowledge-base और chat model अलग रखें ताकि cost और quality स्पष्ट रहें।`,`Model cache हो तो update के बाद refresh करें।`,`Documents import करने से पहले छोटा प्रश्न चलाएं।`],trouble:`1. Knowledge answer unstable
   - Stable chat model लें
   - Document chunk size जांचें

2. Model दिखाई नहीं देता
   - Model ID manually दें
   - Catalog से real name copy करें

3. Auth fail
   - Key पूरा है या नहीं देखें
   - Environment variable override जांचें`,next:`Integrations overview पर लौटें`},bn:{title:`সংযোগ পদ্ধতি`,intro:`এই page-এ AnythingLLM-এর chat model ও knowledge-base model আলাদা রাখা হয়, যাতে সব capability এক config-এ না মেশে।`,overview:[`AnythingLLM-এ gpt88.cc যোগ করা।`,`আগে chat চালানো, পরে knowledge base যোগ করা।`,`Failure হলে কোন layer আগে দেখবেন।`],checklist:`1. API Key প্রস্তুত করুন
2. Base URL https://api.gpt88.cc দিন
3. Chat ও embedding model আলাদা রাখুন
4. ছোট Q&A চালান
5. পরে knowledge-base document import করুন`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A-তে embedding ও chat model আলাদা configure করুন।`,verify:[`ছোট chat পাঠিয়ে model route যাচাই করুন।`,`ছোট document batch দিয়ে retrieval ও answer যাচাই করুন।`,`Result ভুল হলে knowledge base ও chat model আলাদা করে দেখুন।`],notes:[`Knowledge-base ও chat model আলাদা রাখুন, যাতে cost ও quality পরিষ্কার থাকে।`,`Model cache থাকলে update-এর পরে refresh করুন।`,`Document import-এর আগে ছোট প্রশ্ন চালান।`],trouble:`1. Knowledge answer unstable
   - Stable chat model নিন
   - Document chunk size দেখুন

2. Model দেখা যাচ্ছে না
   - Model ID হাতে দিন
   - Catalog থেকে real name copy করুন

3. Auth fail
   - Key সম্পূর্ণ কি না দেখুন
   - Environment variable override দেখুন`,next:`Integrations overview-এ ফিরুন`},ur:{title:`کنکشن کا طریقہ`,intro:`یہ page AnythingLLM کے chat model اور knowledge-base model کو الگ رکھتا ہے تاکہ تمام capabilities ایک config میں نہ ملیں۔`,overview:[`AnythingLLM میں gpt88.cc شامل کرنا۔`,`پہلے chat چلانا، پھر knowledge base شامل کرنا۔`,`Failure میں پہلے کون سی layer چیک کرنی ہے۔`],checklist:`1. API Key تیار کریں
2. Base URL https://api.gpt88.cc رکھیں
3. Chat اور embedding model الگ رکھیں
4. مختصر Q&A چلائیں
5. پھر knowledge-base documents import کریں`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A میں embedding اور chat model الگ configure کریں۔`,verify:[`مختصر chat سے model route چیک کریں۔`,`چھوٹے document batch سے retrieval اور answer verify کریں۔`,`Result غلط ہو تو knowledge base اور chat model الگ چیک کریں۔`],notes:[`Knowledge-base اور chat model الگ رکھیں تاکہ cost اور quality واضح رہیں۔`,`Model cache ہو تو update کے بعد refresh کریں۔`,`Documents import سے پہلے مختصر سوال چلائیں۔`],trouble:`1. Knowledge answer unstable
   - Stable chat model لیں
   - Document chunk size چیک کریں

2. Model نظر نہیں آتا
   - Model ID manually دیں
   - Catalog سے real name copy کریں

3. Auth fail
   - Key مکمل ہے یا نہیں دیکھیں
   - Environment variable override چیک کریں`,next:`Integrations overview پر واپس جائیں`},ta:{title:`இணைப்பு முறை`,intro:`இந்த page AnythingLLM-ன் chat model மற்றும் knowledge-base model-ஐப் பிரிக்கிறது; எல்லா capabilities-ஐ ஒரே config-ல் கலக்க வேண்டாம்.`,overview:[`AnythingLLM-ல் gpt88.cc இணைப்பது.`,`முதலில் chat இயக்கி, பின்னர் knowledge base சேர்ப்பது.`,`Failure வந்தால் முதலில் எந்த layer-ஐச் சரிபார்ப்பது.`],checklist:`1. API Key தயார் செய்யவும்
2. Base URL https://api.gpt88.cc அமைக்கவும்
3. Chat மற்றும் embedding model-ஐப் பிரிக்கவும்
4. சிறிய Q&A இயக்கவும்
5. பின்னர் knowledge-base documents import செய்யவும்`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A-ல் embedding மற்றும் chat model-ஐ தனித்தனியாக configure செய்யவும்.`,verify:[`சிறிய chat மூலம் model route சரிபார்க்கவும்.`,`சிறிய document batch மூலம் retrieval மற்றும் answer சரிபார்க்கவும்.`,`Result தவறாக இருந்தால் knowledge base மற்றும் chat model-ஐ தனித்தனியாக பார்க்கவும்.`],notes:[`Knowledge-base மற்றும் chat model-ஐப் பிரித்து வைத்து cost, quality தெளிவாக இருக்கச் செய்யவும்.`,`Model cache இருந்தால் update பிறகு refresh செய்யவும்.`,`Documents import முன் சிறிய கேள்வி இயக்கவும்.`],trouble:`1. Knowledge answer unstable
   - Stable chat model பயன்படுத்தவும்
   - Document chunk size சரிபார்க்கவும்

2. Model தெரியவில்லை
   - Model ID கைமுறையாக உள்ளிடவும்
   - Catalog-ல் real name copy செய்யவும்

3. Auth fail
   - Key முழுமையா பார்க்கவும்
   - Environment variable override சரிபார்க்கவும்`,next:`Integrations overview-க்கு திரும்பவும்`},ne:{title:`जोड्ने तरिका`,intro:`यो page ले AnythingLLM को chat model र knowledge-base model अलग राख्छ, ताकि सबै capability एउटै config मा नमिसियोस्।`,overview:[`AnythingLLM मा gpt88.cc जोड्ने।`,`पहिले chat चलाएर, पछि knowledge base थप्ने।`,`Failure मा कुन layer पहिले जाँच्ने।`],checklist:`1. API Key तयार गर्नुहोस्
2. Base URL https://api.gpt88.cc राख्नुहोस्
3. Chat र embedding model अलग राख्नुहोस्
4. सानो Q&A चलाउनुहोस्
5. त्यसपछि knowledge-base documents import गर्नुहोस्`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A मा embedding र chat model अलग configure गर्नुहोस्।`,verify:[`सानो chat बाट model route जाँच्नुहोस्।`,`सानो document batch बाट retrieval र answer जाँच्नुहोस्।`,`Result गलत भए knowledge base र chat model अलग जाँच्नुहोस्।`],notes:[`Knowledge-base र chat model अलग राख्नुहोस् ताकि cost र quality स्पष्ट होस्।`,`Model cache भए update पछि refresh गर्नुहोस्।`,`Documents import अघि सानो प्रश्न चलाउनुहोस्।`],trouble:`1. Knowledge answer unstable
   - Stable chat model प्रयोग गर्नुहोस्
   - Document chunk size जाँच्नुहोस्

2. Model देखिँदैन
   - Model ID manually राख्नुहोस्
   - Catalog बाट real name copy गर्नुहोस्

3. Auth fail
   - Key पूरा छ कि जाँच्नुहोस्
   - Environment variable override जाँच्नुहोस्`,next:`Integrations overview मा फर्कनुहोस्`},si:{title:`සම්බන්ධ කිරීමේ ක්‍රමය`,intro:`මෙම page එක AnythingLLM chat model සහ knowledge-base model වෙන් කරයි; සියලු capabilities එකම config එකකට මිශ්‍ර නොකරන්න.`,overview:[`AnythingLLM වෙත gpt88.cc සම්බන්ධ කිරීම.`,`පළමුව chat ධාවනය කර පසුව knowledge base එක් කිරීම.`,`Failure එකකදී පළමුව පරීක්ෂා කළ යුතු layer එක දැනගැනීම.`],checklist:`1. API Key සූදානම් කරන්න
2. Base URL https://api.gpt88.cc යොදන්න
3. Chat සහ embedding model වෙන් කරන්න
4. කුඩා Q&A එකක් ධාවනය කරන්න
5. පසුව knowledge-base documents import කරන්න`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

Knowledge-base Q&A තුළ embedding සහ chat model වෙන වෙනම configure කරන්න.`,verify:[`කුඩා chat එකකින් model route පරීක්ෂා කරන්න.`,`කුඩා document batch එකකින් retrieval සහ answer පරීක්ෂා කරන්න.`,`Result වැරදි නම් knowledge base සහ chat model වෙන වෙනම පරීක්ෂා කරන්න.`],notes:[`Knowledge-base සහ chat model වෙන් කර තබා cost සහ quality පැහැදිලි කරන්න.`,`Model cache තිබේ නම් update පසු refresh කරන්න.`,`Documents import කිරීමට පෙර කුඩා ප්‍රශ්නයක් ධාවනය කරන්න.`],trouble:`1. Knowledge answer unstable
   - Stable chat model භාවිතා කරන්න
   - Document chunk size පරීක්ෂා කරන්න

2. Model නොපෙනේ
   - Model ID අතින් ඇතුළත් කරන්න
   - Catalog එකෙන් real name copy කරන්න

3. Auth fail
   - Key සම්පූර්ණද බලන්න
   - Environment variable override පරීක්ෂා කරන්න`,next:`Integrations overview වෙත ආපසු යන්න`}};function h(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(p,{});let r=c(e,`anythingllm`,{title:`AnythingLLM 接入 gpt88.cc`,description:`把 gpt88.cc 接到 AnythingLLM 的聊天和知识库工作流里。`,intro:`聊天模型和 embedding 模型分开配置，先运行一次最小问答测试。`}),u=s(e,`anythingllm`,{overview:`教程目标`,prepare:`准备工作`,setup:`配置方式`,verify:`验证方式`,notes:`注意事项`,troubleshoot:`排障清单`,next:`下一步`}),d=m[e]??m.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/chat/anythingllm`,title:r.title,description:r.description,headings:[{id:`overview`,text:u.overview,level:2},{id:`prepare`,text:u.prepare,level:2},{id:`setup`,text:u.setup,level:2},{id:`verify`,text:u.verify,level:2},{id:`notes`,text:u.notes,level:2},{id:`troubleshoot`,text:u.troubleshoot,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.intro})}),(0,l.jsx)(`p`,{children:d.intro}),(0,l.jsx)(`h2`,{id:`overview`,children:u.overview}),(0,l.jsx)(`ul`,{children:d.overview.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`prepare`,children:u.prepare}),(0,l.jsx)(i,{lang:`text`,filename:`checklist`,code:d.checklist}),(0,l.jsx)(`h2`,{id:`setup`,children:u.setup}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:d.setup}),(0,l.jsx)(`h2`,{id:`verify`,children:u.verify}),(0,l.jsx)(`ol`,{children:d.verify.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`notes`,children:u.notes}),(0,l.jsx)(`ul`,{children:d.notes.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:u.troubleshoot}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:d.trouble}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsx)(`ul`,{children:(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next})})})]})}export{h as default};