import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o,r as s,t as c}from"./index-DCJmtdkW.js";import{n as l,t as u}from"./integrationLocaleCopy-DCRt8AIz.js";var d=e(),f=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,p=`1. Open VS Code
2. Open Cline settings
3. Choose OpenAI Compatible as the provider
4. Fill in Base URL and API key
5. Add a default model
6. Ask Cline to read one small file first`,m=`1. Cline does not use tools
   - Confirm VS Code permissions and workspace access first

2. Model connection fails
   - Validate gpt88.cc with curl before debugging the editor

3. Cost is too high
   - Reduce context size
   - Use a smaller model for simple tasks`;function h(){return(0,d.jsxs)(o,{path:`/docs/integrations/dev/cline`,title:`Cline with gpt88.cc`,description:`Model access and agent workflow configuration for using Cline with gpt88.cc.`,headings:[{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,d.jsx)(a,{tone:`info`,title:`Validate with a small task first`,children:(0,d.jsx)(`p`,{children:`Cline reads files, writes files, and uses tools. Validate model routing and workspace permissions with a low-risk task before giving it broad code changes.`})}),(0,d.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,d.jsx)(i,{lang:`text`,filename:`flow`,code:p}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:f}),(0,d.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,d.jsxs)(`ol`,{children:[(0,d.jsx)(`li`,{children:`Ask Cline to explain the current project README.`}),(0,d.jsx)(`li`,{children:`Ask it to modify one safe low-risk file.`}),(0,d.jsx)(`li`,{children:`Confirm the file is actually written before using it for larger tasks.`})]}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:m}),(0,d.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,d.jsx)(`ul`,{children:(0,d.jsxs)(`li`,{children:[(0,d.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var g={zh:{title:`先跑通小任务`,info:`Cline 会读写文件和运行工具，先用小任务验证模型与文件权限，再交给它大规模改代码。`,flow:`1. 打开 VS Code
2. 打开 Cline 设置
3. Provider 选择 OpenAI Compatible
4. 填入 Base URL 和 API Key
5. 添加默认模型
6. 先让 Cline 读取一个小文件验证工具链`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`让 Cline 解释当前项目 README。`,`让它修改一个无风险的小文件。`,`确认文件确实落盘，再执行复杂任务。`],trouble:`1. Cline 不调用工具
   - 先确认 VS Code 权限和工作区是否正常

2. 模型连接失败
   - 先用 curl 验证 gpt88.cc

3. 输出成本偏高
   - 降低上下文范围
   - 先用小模型做简单任务`,next:`返回集成总览`},hi:{title:`पहले छोटा task चलाएं`,info:`Cline files पढ़ता-लिखता और tools चलाता है। पहले छोटे task से model और file permissions जांचें, फिर बड़े code changes दें।`,flow:`1. VS Code खोलें
2. Cline settings खोलें
3. Provider में OpenAI Compatible चुनें
4. Base URL और API Key भरें
5. Default model जोड़ें
6. छोटी file पढ़वाकर toolchain verify करें`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline से project README समझाने को कहें।`,`एक कम जोखिम वाली छोटी file बदलवाएं।`,`File disk पर लिखी गई है यह देखकर complex task चलाएं।`],trouble:`1. Cline tool नहीं चलाता
   - VS Code permission और workspace जांचें

2. Model connection fail
   - पहले curl से gpt88.cc verify करें

3. Output cost अधिक
   - Context range कम करें
   - सरल task में छोटा model लें`,next:`Integrations overview पर लौटें`},bn:{title:`আগে ছোট task চালান`,info:`Cline file পড়ে-লেখে এবং tool চালায়। আগে ছোট task দিয়ে model ও file permission পরীক্ষা করুন, পরে বড় code change দিন।`,flow:`1. VS Code খুলুন
2. Cline settings খুলুন
3. Provider-এ OpenAI Compatible বাছুন
4. Base URL ও API Key দিন
5. Default model যোগ করুন
6. ছোট file পড়িয়ে toolchain যাচাই করুন`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline-কে project README ব্যাখ্যা করতে বলুন।`,`কম ঝুঁকির একটি ছোট file বদলাতে বলুন।`,`File disk-এ লেখা হয়েছে নিশ্চিত করে complex task চালান।`],trouble:`1. Cline tool চালাচ্ছে না
   - VS Code permission ও workspace দেখুন

2. Model connection fail
   - আগে curl দিয়ে gpt88.cc যাচাই করুন

3. Output cost বেশি
   - Context range কমান
   - সহজ task-এ ছোট model ব্যবহার করুন`,next:`Integrations overview-এ ফিরুন`},ur:{title:`پہلے مختصر task چلائیں`,info:`Cline files پڑھتا، لکھتا اور tools چلاتا ہے۔ پہلے مختصر task سے model اور file permissions چیک کریں، پھر بڑے code changes دیں۔`,flow:`1. VS Code کھولیں
2. Cline settings کھولیں
3. Provider میں OpenAI Compatible منتخب کریں
4. Base URL اور API Key درج کریں
5. Default model شامل کریں
6. مختصر file پڑھوا کر toolchain verify کریں`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline سے project README سمجھانے کو کہیں۔`,`کم خطرے والی چھوٹی file تبدیل کروائیں۔`,`File disk پر save ہونے کی تصدیق کے بعد complex task چلائیں۔`],trouble:`1. Cline tool نہیں چلا رہا
   - VS Code permission اور workspace چیک کریں

2. Model connection fail
   - پہلے curl سے gpt88.cc verify کریں

3. Output cost زیادہ
   - Context range کم کریں
   - سادہ task کے لیے چھوٹا model لیں`,next:`Integrations overview پر واپس جائیں`},ta:{title:`முதலில் சிறிய task இயக்கவும்`,info:`Cline files-ஐ படித்து எழுதுவதுடன் tools-ஐ இயக்கும். முதலில் சிறிய task மூலம் model மற்றும் file permissions-ஐ சரிபார்த்து, பின்னர் பெரிய code மாற்றங்களை வழங்கவும்.`,flow:`1. VS Code திறக்கவும்
2. Cline settings திறக்கவும்
3. Provider-ல் OpenAI Compatible தேர்வு செய்யவும்
4. Base URL மற்றும் API Key உள்ளிடவும்
5. Default model சேர்க்கவும்
6. சிறிய file-ஐ படிக்கச் செய்து toolchain சரிபார்க்கவும்`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline-ஐ project README-ஐ விளக்கச் சொல்லவும்.`,`குறைந்த ஆபத்து கொண்ட சிறிய file-ஐ மாற்றச் சொல்லவும்.`,`File disk-ல் save ஆனதை உறுதி செய்து complex task இயக்கவும்.`],trouble:`1. Cline tool-ஐ இயக்கவில்லை
   - VS Code permission மற்றும் workspace சரிபார்க்கவும்

2. Model connection fail
   - முதலில் curl மூலம் gpt88.cc சரிபார்க்கவும்

3. Output cost அதிகம்
   - Context range குறைக்கவும்
   - எளிய task-க்கு சிறிய model பயன்படுத்தவும்`,next:`Integrations overview-க்கு திரும்பவும்`},ne:{title:`पहिले सानो task चलाउनुहोस्`,info:`Cline ले file पढ्छ, लेख्छ र tools चलाउँछ। पहिले सानो task बाट model र file permission जाँचेर मात्र ठूलो code change दिनुहोस्।`,flow:`1. VS Code खोल्नुहोस्
2. Cline settings खोल्नुहोस्
3. Provider मा OpenAI Compatible छान्नुहोस्
4. Base URL र API Key राख्नुहोस्
5. Default model थप्नुहोस्
6. सानो file पढाएर toolchain verify गर्नुहोस्`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline लाई project README व्याख्या गर्न लगाउनुहोस्।`,`कम जोखिमको सानो file परिवर्तन गर्न लगाउनुहोस्।`,`File disk मा save भएको पक्का भएपछि complex task चलाउनुहोस्।`],trouble:`1. Cline ले tool चलाउँदैन
   - VS Code permission र workspace जाँच्नुहोस्

2. Model connection fail
   - पहिले curl बाट gpt88.cc verify गर्नुहोस्

3. Output cost धेरै
   - Context range घटाउनुहोस्
   - सरल task मा सानो model प्रयोग गर्नुहोस्`,next:`Integrations overview मा फर्कनुहोस्`},si:{title:`පළමුව කුඩා task එකක් ධාවනය කරන්න`,info:`Cline files කියවා ලියන අතර tools ධාවනය කරයි. පළමුව කුඩා task එකකින් model සහ file permissions පරීක්ෂා කර පසුව විශාල code වෙනස්කම් දෙන්න.`,flow:`1. VS Code විවෘත කරන්න
2. Cline settings විවෘත කරන්න
3. Provider තුළ OpenAI Compatible තෝරන්න
4. Base URL සහ API Key ඇතුළත් කරන්න
5. Default model එකක් එක් කරන්න
6. කුඩා file එකක් කියවා toolchain verify කරන්න`,setup:`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,verify:[`Cline හට project README පැහැදිලි කිරීමට කියන්න.`,`අඩු අවදානම් කුඩා file එකක් වෙනස් කිරීමට කියන්න.`,`File එක disk එකට save වී ඇති බව තහවුරු කර complex task ධාවනය කරන්න.`],trouble:`1. Cline tool ධාවනය නොකරයි
   - VS Code permission සහ workspace පරීක්ෂා කරන්න

2. Model connection fail
   - පළමුව curl මඟින් gpt88.cc verify කරන්න

3. Output cost වැඩියි
   - Context range අඩු කරන්න
   - සරල task සඳහා කුඩා model එකක් භාවිතා කරන්න`,next:`Integrations overview වෙත ආපසු යන්න`}};function _(){let{locale:e}=n();if(e===`en`)return(0,d.jsx)(h,{});let r=u(e,`cline`,{title:`Cline 配置 OpenAI 兼容 API`,description:`Cline 自定义 OpenAI 兼容提供商的配置、最短请求和常见错误排查。`,intro:`先让 Cline 读取一个小文件，确认 provider、model 和工具链都正常。`}),f=l(e,`cline`,{setup:`配置方法`,verify:`验证方式`,troubleshoot:`排障清单`,next:`下一步`}),p=g[e]??g.zh;return(0,d.jsxs)(o,{path:`/docs/integrations/dev/cline`,title:r.title,description:r.description,headings:[{id:`setup`,text:f.setup,level:2},{id:`verify`,text:f.verify,level:2},{id:`troubleshoot`,text:f.troubleshoot,level:2},{id:`next`,text:f.next,level:2},...c(`cline`)],children:[(0,d.jsx)(`p`,{children:r.intro}),(0,d.jsx)(a,{tone:`info`,title:p.title,children:(0,d.jsx)(`p`,{children:p.info})}),(0,d.jsx)(`h2`,{id:`setup`,children:f.setup}),(0,d.jsx)(i,{lang:`text`,filename:`flow`,code:p.flow}),(0,d.jsx)(i,{lang:`text`,filename:`setup`,code:p.setup}),(0,d.jsx)(`h2`,{id:`verify`,children:f.verify}),(0,d.jsx)(`ol`,{children:p.verify.map(e=>(0,d.jsx)(`li`,{children:e},e))}),(0,d.jsx)(`h2`,{id:`troubleshoot`,children:f.troubleshoot}),(0,d.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:p.trouble}),(0,d.jsx)(`h2`,{id:`next`,children:f.next}),(0,d.jsx)(`ul`,{children:(0,d.jsx)(`li`,{children:(0,d.jsx)(t,{to:`/docs/integrations/`,children:p.next})})}),(0,d.jsx)(s,{intent:`cline`})]})}export{_ as default};