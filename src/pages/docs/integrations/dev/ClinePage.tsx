import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../../lib/integrationLocaleCopy'
import { SeoIntentSections } from '../../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../../components/seo/SeoIntentMeta'
import ClinePageEn from '../../../en/ClinePageEn'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6`

const FLOW = `1. 打开 VS Code
2. 打开 Cline 设置
3. Provider 选择 OpenAI Compatible
4. 填入 Base URL 和 API Key
5. 添加默认模型
6. 先让 Cline 读取一个小文件验证工具链`

const TROUBLESHOOTING = `1. Cline 不调用工具
   - 先确认 VS Code 权限和工作区是否正常

2. 模型连接失败
   - 先用 curl 验证 gpt88.cc

3. 输出成本偏高
   - 降低上下文范围
   - 先用小模型做简单任务`

const CLINE_BODY_COPY: Record<string, { title: string; info: string; flow: string; setup: string; verify: string[]; trouble: string; next: string }> = {
  zh: { title: '先跑通小任务', info: 'Cline 会读写文件和运行工具，先用小任务验证模型与文件权限，再交给它大规模改代码。', flow: FLOW, setup: SETUP, verify: ['让 Cline 解释当前项目 README。', '让它修改一个无风险的小文件。', '确认文件确实落盘，再执行复杂任务。'], trouble: TROUBLESHOOTING, next: '返回集成总览' },
  hi: { title: 'पहले छोटा task चलाएं', info: 'Cline files पढ़ता-लिखता और tools चलाता है। पहले छोटे task से model और file permissions जांचें, फिर बड़े code changes दें।', flow: '1. VS Code खोलें\n2. Cline settings खोलें\n3. Provider में OpenAI Compatible चुनें\n4. Base URL और API Key भरें\n5. Default model जोड़ें\n6. छोटी file पढ़वाकर toolchain verify करें', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline से project README समझाने को कहें।', 'एक कम जोखिम वाली छोटी file बदलवाएं।', 'File disk पर लिखी गई है यह देखकर complex task चलाएं।'], trouble: '1. Cline tool नहीं चलाता\n   - VS Code permission और workspace जांचें\n\n2. Model connection fail\n   - पहले curl से gpt88.cc verify करें\n\n3. Output cost अधिक\n   - Context range कम करें\n   - सरल task में छोटा model लें', next: 'Integrations overview पर लौटें' },
  bn: { title: 'আগে ছোট task চালান', info: 'Cline file পড়ে-লেখে এবং tool চালায়। আগে ছোট task দিয়ে model ও file permission পরীক্ষা করুন, পরে বড় code change দিন।', flow: '1. VS Code খুলুন\n2. Cline settings খুলুন\n3. Provider-এ OpenAI Compatible বাছুন\n4. Base URL ও API Key দিন\n5. Default model যোগ করুন\n6. ছোট file পড়িয়ে toolchain যাচাই করুন', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline-কে project README ব্যাখ্যা করতে বলুন।', 'কম ঝুঁকির একটি ছোট file বদলাতে বলুন।', 'File disk-এ লেখা হয়েছে নিশ্চিত করে complex task চালান।'], trouble: '1. Cline tool চালাচ্ছে না\n   - VS Code permission ও workspace দেখুন\n\n2. Model connection fail\n   - আগে curl দিয়ে gpt88.cc যাচাই করুন\n\n3. Output cost বেশি\n   - Context range কমান\n   - সহজ task-এ ছোট model ব্যবহার করুন', next: 'Integrations overview-এ ফিরুন' },
  ur: { title: 'پہلے مختصر task چلائیں', info: 'Cline files پڑھتا، لکھتا اور tools چلاتا ہے۔ پہلے مختصر task سے model اور file permissions چیک کریں، پھر بڑے code changes دیں۔', flow: '1. VS Code کھولیں\n2. Cline settings کھولیں\n3. Provider میں OpenAI Compatible منتخب کریں\n4. Base URL اور API Key درج کریں\n5. Default model شامل کریں\n6. مختصر file پڑھوا کر toolchain verify کریں', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline سے project README سمجھانے کو کہیں۔', 'کم خطرے والی چھوٹی file تبدیل کروائیں۔', 'File disk پر save ہونے کی تصدیق کے بعد complex task چلائیں۔'], trouble: '1. Cline tool نہیں چلا رہا\n   - VS Code permission اور workspace چیک کریں\n\n2. Model connection fail\n   - پہلے curl سے gpt88.cc verify کریں\n\n3. Output cost زیادہ\n   - Context range کم کریں\n   - سادہ task کے لیے چھوٹا model لیں', next: 'Integrations overview پر واپس جائیں' },
  ta: { title: 'முதலில் சிறிய task இயக்கவும்', info: 'Cline files-ஐ படித்து எழுதுவதுடன் tools-ஐ இயக்கும். முதலில் சிறிய task மூலம் model மற்றும் file permissions-ஐ சரிபார்த்து, பின்னர் பெரிய code மாற்றங்களை வழங்கவும்.', flow: '1. VS Code திறக்கவும்\n2. Cline settings திறக்கவும்\n3. Provider-ல் OpenAI Compatible தேர்வு செய்யவும்\n4. Base URL மற்றும் API Key உள்ளிடவும்\n5. Default model சேர்க்கவும்\n6. சிறிய file-ஐ படிக்கச் செய்து toolchain சரிபார்க்கவும்', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline-ஐ project README-ஐ விளக்கச் சொல்லவும்.', 'குறைந்த ஆபத்து கொண்ட சிறிய file-ஐ மாற்றச் சொல்லவும்.', 'File disk-ல் save ஆனதை உறுதி செய்து complex task இயக்கவும்.'], trouble: '1. Cline tool-ஐ இயக்கவில்லை\n   - VS Code permission மற்றும் workspace சரிபார்க்கவும்\n\n2. Model connection fail\n   - முதலில் curl மூலம் gpt88.cc சரிபார்க்கவும்\n\n3. Output cost அதிகம்\n   - Context range குறைக்கவும்\n   - எளிய task-க்கு சிறிய model பயன்படுத்தவும்', next: 'Integrations overview-க்கு திரும்பவும்' },
  ne: { title: 'पहिले सानो task चलाउनुहोस्', info: 'Cline ले file पढ्छ, लेख्छ र tools चलाउँछ। पहिले सानो task बाट model र file permission जाँचेर मात्र ठूलो code change दिनुहोस्।', flow: '1. VS Code खोल्नुहोस्\n2. Cline settings खोल्नुहोस्\n3. Provider मा OpenAI Compatible छान्नुहोस्\n4. Base URL र API Key राख्नुहोस्\n5. Default model थप्नुहोस्\n6. सानो file पढाएर toolchain verify गर्नुहोस्', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline लाई project README व्याख्या गर्न लगाउनुहोस्।', 'कम जोखिमको सानो file परिवर्तन गर्न लगाउनुहोस्।', 'File disk मा save भएको पक्का भएपछि complex task चलाउनुहोस्।'], trouble: '1. Cline ले tool चलाउँदैन\n   - VS Code permission र workspace जाँच्नुहोस्\n\n2. Model connection fail\n   - पहिले curl बाट gpt88.cc verify गर्नुहोस्\n\n3. Output cost धेरै\n   - Context range घटाउनुहोस्\n   - सरल task मा सानो model प्रयोग गर्नुहोस्', next: 'Integrations overview मा फर्कनुहोस्' },
  si: { title: 'පළමුව කුඩා task එකක් ධාවනය කරන්න', info: 'Cline files කියවා ලියන අතර tools ධාවනය කරයි. පළමුව කුඩා task එකකින් model සහ file permissions පරීක්ෂා කර පසුව විශාල code වෙනස්කම් දෙන්න.', flow: '1. VS Code විවෘත කරන්න\n2. Cline settings විවෘත කරන්න\n3. Provider තුළ OpenAI Compatible තෝරන්න\n4. Base URL සහ API Key ඇතුළත් කරන්න\n5. Default model එකක් එක් කරන්න\n6. කුඩා file එකක් කියවා toolchain verify කරන්න', setup: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc\nAPI Key: sk-your-gpt88-api-key\nModel: claude-sonnet-4-6', verify: ['Cline හට project README පැහැදිලි කිරීමට කියන්න.', 'අඩු අවදානම් කුඩා file එකක් වෙනස් කිරීමට කියන්න.', 'File එක disk එකට save වී ඇති බව තහවුරු කර complex task ධාවනය කරන්න.'], trouble: '1. Cline tool ධාවනය නොකරයි\n   - VS Code permission සහ workspace පරීක්ෂා කරන්න\n\n2. Model connection fail\n   - පළමුව curl මඟින් gpt88.cc verify කරන්න\n\n3. Output cost වැඩියි\n   - Context range අඩු කරන්න\n   - සරල task සඳහා කුඩා model එකක් භාවිතා කරන්න', next: 'Integrations overview වෙත ආපසු යන්න' },
}

export default function ClineIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ClinePageEn />
  const copy = getIntegrationCopy(locale, 'cline', { title: 'Cline 配置 OpenAI 兼容 API', description: 'Cline 自定义 OpenAI 兼容提供商的配置、最短请求和常见错误排查。', intro: '先让 Cline 读取一个小文件，确认 provider、model 和工具链都正常。' })
  const sections = getIntegrationSections(locale, 'cline', { setup: '配置方法', verify: '验证方式', troubleshoot: '排障清单', next: '下一步' })
  const body = CLINE_BODY_COPY[locale] ?? CLINE_BODY_COPY.zh

  return (
    <DocPage
      path="/docs/integrations/dev/cline"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'setup', text: sections.setup, level: 2 },
        { id: 'verify', text: sections.verify, level: 2 },
        { id: 'troubleshoot', text: sections.troubleshoot, level: 2 },
        { id: 'next', text: sections.next, level: 2 },
        ...seoIntentHeadings('cline'),
      ]}
    >
      <p>{copy.intro}</p>
      <Callout tone="info" title={body.title}>
        <p>{body.info}</p>
      </Callout>

      <h2 id="setup">{sections.setup}</h2>
      <CodeBlock lang="text" filename="flow" code={body.flow} />
      <CodeBlock lang="text" filename="setup" code={body.setup} />

      <h2 id="verify">{sections.verify}</h2>
      <ol>
        {body.verify.map(item => <li key={item}>{item}</li>)}
      </ol>

      <h2 id="troubleshoot">{sections.troubleshoot}</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={body.trouble} />

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li><Link to="/docs/integrations/">{body.next}</Link></li>
      </ul>
      <SeoIntentSections intent="cline" />
    </DocPage>
  )
}
