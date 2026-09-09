import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { useLocale } from '../../../lib/locale'
import AgentImageQualityCropGuidePageEn from '../../en/AgentImageQualityCropGuidePageEn'

const SAFE_PROMPT = `构图要求：
- 主体必须完整出现在画面内，不裁切头部、手部、脚部、道具和衣摆
- 主体居中，整体占画面高度约 65%-75%
- 四周保留 10%-15% 安全留白，背景可以延展到边缘
- 镜头为中远景 / 全身构图，不要 close-up，不要 macro shot
- 如果是角色设定图，每个视图独立占一个清晰分栏，分栏之间留出空隙
- 无文字、无水印、无 UI、无边框`

const SIZE_GUIDE = `gpt-image-2 防裁剪 size 选择示例：

横屏海报 / 视频封面：
- size: 1536x1024
- prompt: wide shot, centered composition, full subject visible

竖屏海报 / 小红书 / 角色全身：
- size: 1024x1536
- prompt: full body shot, ample negative space around the subject

方形电商主图：
- size: 1024x1024
- prompt: centered product shot, product occupies about 70% of the image height

自定义尺寸先检查：
- 宽和高尽量使用 16 的倍数
- 最长边不要超过 3840px
- 宽高比不要超过 3:1 或 1:3
- 最终发布平台如果会二次裁剪，额外保留 10%-15% 安全留白`

const PRODUCT_PROMPT = `电商产品防裁剪提示词模板：

一瓶高端护肤精华液，完整瓶身与泵头都必须出现在画面内。
商品居中，瓶身占画面高度约 70%，四周保留 12% 安全留白。
纯白或浅灰无影背景，柔和棚拍光，真实玻璃材质，边缘清晰。
不要裁切瓶盖、瓶底、标签和包装边缘。无文字，无水印。`

const CHARACTER_PROMPT = `国漫 3D 角色设定图防裁剪提示词模板：

清冷青年角色设定图，国漫电影级 3D 动画质感，纯白无影背景。
画面为横向角色设定表，分成 4 个等宽分栏：
1. 正视脸部特写
2. 正视全身立绘
3. 侧视全身立绘
4. 后视全身立绘

每个分栏中的人物都必须完整在框内，头发、手、脚、衣摆、道具不能被裁切。
全身视图人物高度控制在分栏高度的 72% 左右，四周保留清晰留白。
不要把角色放得过大，不要局部特写替代全身视图，不要让不同视图互相重叠。
材质细节：陶瓷裂纹、玉化质地、冷色能量流、PBR 质感。
无文字、无水印、无 UI 元素。`

const PROMPT_OPTIMIZER = `你是专业 AI 生图提示词工程师。请把下面的中文需求改写成适合 GPT-Image-2 / 图片生成模型使用的英文提示词。

要求：
1. 保留原始需求中的主体、风格、场景、材质和用途
2. 优先补全构图信息：camera distance, subject placement, subject scale, safe margins
3. 明确画幅比例和安全留白，避免裁剪主体
4. 删除互相冲突的词，例如 close-up 和 full body 同时出现
5. 不要输出解释，只输出最终英文 prompt

中文需求：
一张电商护肤精华液主图，高级感，白色背景，玻璃瓶，完整瓶身，不要裁剪，适合淘宝和小红书使用`

const ENGLISH_PROMPT_EXAMPLE = `A premium ecommerce product photo of a luxury skincare serum bottle, full bottle and pump clearly visible, centered composition, medium distance product shot, the bottle occupies about 70% of the image height, with 12% safe margin on all sides. Clean white studio background, soft diffused lighting, realistic glass material, sharp product edges, premium commercial photography style. Do not crop the cap, pump, bottle bottom, label, or package edges. No text, no watermark, no UI elements.`

const API_SAFE_CURL = `curl https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "完整全身角色设定图，人物居中，头发、手、脚、衣摆和道具都不能被裁切，四周保留 12% 安全留白，纯白背景，国漫电影级 3D 质感，无文字，无水印",
    "size": "1024x1536",
    "quality": "high",
    "n": 1
  }'`

const BATCH_CHECKLIST = `批量生图前检查：

1. 是否先用 1-3 张小批量验证过构图
2. 是否明确了最终比例：1:1、3:4、4:5、9:16、16:9 或横向设定表
3. 是否写了“完整主体可见”和“安全留白”
4. 自定义 size 是否满足 16 倍数、最长边不超过 3840px、宽高比不超过 3:1
5. 是否避免了 close-up、macro、half body 与 full body 的互相冲突
6. 是否把复杂任务拆成多个步骤，而不是一张图里塞太多要求
7. 是否准备了失败重试策略：扩图、重绘、拆分生成、后期拼版
8. 是否保留了最终可复用的 prompt、尺寸、质量和样图编号`

const CAUSE_ANALYSIS = `问题链路可以拆成 5 层：

1. 需求层：一张图里要求太多主体、视角、材质、动作和背景
2. 画布层：目标比例不适合主体形状，例如方图里塞长角色或四视图设定表
3. 构图层：提示词没有指定镜头距离、主体占比和安全留白
4. 质量层：分辨率、细节量和任务复杂度不匹配，模型只能取舍
5. 发布层：原图完整，但平台卡片、视频封面或商品后台再次裁切`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                'border-t border-white/5 align-top' +
                (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
                >
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

export default function AgentImageQualityCropGuidePage() {
  const { locale } = useLocale()

  if (locale !== 'zh') return <AgentImageQualityCropGuidePageEn />
  const meta = {
    zh: ['agent.gpt88.cc 生图质量与裁剪避坑指南', '解释 agent.gpt88.cc 生图时主体被裁剪、细节变糊、多视图角色设定图质量下降、电商产品边缘丢失和批量生成不稳定的原因，并给出解决方案。'],
    hi: ['agent.gpt88.cc image quality and cropping guide', 'Understand cropping, blurry details, character-sheet degradation, missing product edges and unstable batch generation in agent.gpt88.cc, with practical fixes.'],
    bn: ['agent.gpt88.cc image quality and cropping guide', 'agent.gpt88.cc-এ cropping, blurry detail, character-sheet quality loss, missing product edges এবং unstable batch generation-এর কারণ ও সমাধান বুঝুন।'],
    ur: ['agent.gpt88.cc image quality and cropping guide', 'agent.gpt88.cc میں cropping، blurry details، character-sheet quality loss، missing product edges اور unstable batch generation کی وجوہ اور حل سمجھیں۔'],
    ta: ['agent.gpt88.cc image quality and cropping guide', 'agent.gpt88.cc-ல் cropping, blurry details, character-sheet quality loss, missing product edges மற்றும் unstable batch generation-க்கான காரணங்கள் மற்றும் தீர்வுகள்.'],
    ne: ['agent.gpt88.cc image quality and cropping guide', 'agent.gpt88.cc मा cropping, blurry details, character-sheet quality loss, missing product edges र unstable batch generation का कारण र समाधान बुझ्नुहोस्।'],
    si: ['agent.gpt88.cc image quality and cropping guide', 'agent.gpt88.cc හි cropping, blurry details, character-sheet quality loss, missing product edges සහ unstable batch generation සඳහා හේතු සහ විසඳුම් තේරුම් ගන්න.'],
  }[locale as 'zh' | 'hi' | 'bn' | 'ur' | 'ta' | 'ne' | 'si'] ?? undefined
  const issueTable = locale === 'zh'
    ? {
        headers: ['问题', '表现', '优先处理方式'],
        rows: [
          ['生成时就裁剪', '人物头顶、脚、手、商品瓶盖、道具或衣摆直接不在画面里。', '改提示词里的镜头距离、主体占比、安全留白和画幅比例。'],
          ['预览时被裁剪', '原图打开是完整的，但网页卡片、朋友圈、店铺后台或视频封面预览切掉边缘。', '按最终平台比例重新导出，给预览区域留安全框。'],
          ['质量不够', '细节糊、文字乱、材质假、人物手脸崩、复杂设定丢失。', '减少单张图承载的信息量，提高质量档位，必要时拆分生成再合成。'],
        ],
      }
    : {
        headers: ['Issue', 'What it looks like', 'Priority fix'],
        rows: [
          ['Cropped during generation', 'The head, feet, hands, product cap, props or clothing edge is outside the frame.', 'Specify camera distance, subject scale, safe margins and aspect ratio in the prompt.'],
          ['Cropped in preview', 'The source image is complete, but a card, social post, store backend or video cover trims the edges.', 'Export for the final platform ratio and keep a safe frame around the preview area.'],
          ['Insufficient quality', 'Blurry detail, broken text, unrealistic materials, distorted hands/faces or missing complex settings.', 'Reduce information per image, raise the quality tier, or split generation into multiple steps.'],
        ],
      }
  const overviewCopy = {
    zh: ['核心结论', '生图被裁剪通常不是模型“不会画完整”，而是画幅、主体数量、镜头距离和提示词互相冲突。先把构图、比例和安全留白写清楚，再追求材质、风格和细节，成功率会明显提高。', '在 agent.gpt88.cc 做海报、电商图、角色设定图或批量素材时，常见问题可以先分成三类。只有先判断是哪一类，后面的解决方案才不会跑偏。'],
    hi: ['Key takeaway', 'Cropping usually comes from conflicts between aspect ratio, subject count, camera distance and the prompt, not from the model being unable to draw a complete subject. Define composition, ratio and safe margins before adding material, style and detail.', 'When making posters, ecommerce images, character sheets or batch assets in agent.gpt88.cc, classify the problem into three types first. The later fix depends on that classification.'],
    bn: ['মূল কথা', 'Cropping সাধারণত model-এর অক্ষমতা নয়; aspect ratio, subject count, camera distance এবং prompt-এর conflict থেকে হয়। Material, style ও detail যোগ করার আগে composition, ratio এবং safe margin স্পষ্ট করুন।', 'agent.gpt88.cc-এ poster, ecommerce image, character sheet বা batch asset বানালে আগে সমস্যাকে তিন ধরনের একটিতে ভাগ করুন। সঠিক শ্রেণিবিভাগ ছাড়া পরের সমাধান ভুল পথে যেতে পারে।'],
    ur: ['خلاصہ', 'Cropping عموماً model کی ناکامی نہیں بلکہ aspect ratio، subject count، camera distance اور prompt کے تضاد سے ہوتا ہے۔ Material، style اور detail سے پہلے composition، ratio اور safe margins واضح کریں۔', 'agent.gpt88.cc میں poster، ecommerce image، character sheet یا batch asset بناتے وقت پہلے مسئلے کو تین اقسام میں تقسیم کریں۔ درست classification کے بغیر اگلا حل بھٹک سکتا ہے۔'],
    ta: ['முக்கிய கருத்து', 'Cropping பொதுவாக model-ன் குறைபாடு அல்ல; aspect ratio, subject count, camera distance மற்றும் prompt மோதலால் ஏற்படும். Material, style, detail சேர்ப்பதற்கு முன் composition, ratio மற்றும் safe margins-ஐத் தெளிவாக்கவும்.', 'agent.gpt88.cc-ல் poster, ecommerce image, character sheet அல்லது batch asset உருவாக்கும்போது முதலில் பிரச்சினையை மூன்று வகைகளில் ஒன்றாக வகைப்படுத்தவும். அதன் பிறகே சரியான தீர்வைத் தேர்ந்தெடுக்கவும்.'],
    ne: ['मुख्य कुरा', 'Cropping प्रायः model को असक्षमताबाट होइन; aspect ratio, subject count, camera distance र prompt बीचको द्वन्द्वबाट हुन्छ। Material, style र detail थप्नुअघि composition, ratio र safe margins स्पष्ट गर्नुहोस्।', 'agent.gpt88.cc मा poster, ecommerce image, character sheet वा batch asset बनाउँदा पहिले समस्यालाई तीन प्रकारमा वर्गीकरण गर्नुहोस्। वर्गीकरण सही नभए पछिको समाधान गलत हुन सक्छ।'],
    si: ['ප්‍රධාන කරුණ', 'Cropping සාමාන්‍යයෙන් model එකේ අසමත්භාවයක් නොවෙයි; aspect ratio, subject count, camera distance සහ prompt අතර ගැටුමක් නිසා සිදුවේ. Material, style සහ detail එකතු කිරීමට පෙර composition, ratio සහ safe margins පැහැදිලි කරන්න.', 'agent.gpt88.cc හි poster, ecommerce image, character sheet හෝ batch asset සාදන විට පළමුව ගැටලුව වර්ග තුනෙන් එකකට වෙන් කරන්න. නිවැරදි වර්ගීකරණයකින් තොරව ඉදිරි විසඳුම වැරදි විය හැක.'],
  }[locale as 'zh' | 'hi' | 'bn' | 'ur' | 'ta' | 'ne' | 'si'] ?? undefined
  const sectionTitles = {
    zh: ['先判断问题类型', '问题出现原因分析', '为什么会被裁剪', '防裁剪核心写法', 'size 参数控制画布', '用大模型优化英文提示词', '质量下降怎么处理', '角色设定图专项', '已经裁剪怎么修', 'API 批量对接建议', '交付检查清单'],
    hi: ['Classify the problem first', 'Root-cause analysis', 'Why cropping happens', 'Core safe-area prompt pattern', 'Use size to control the canvas', 'Optimize English prompts with a large model', 'How to handle quality loss', 'Character-sheet guidance', 'How to repair an already cropped image', 'Batch API integration advice', 'Delivery checklist'],
    bn: ['প্রথমে সমস্যার ধরন নির্ধারণ করুন', 'Root-cause analysis', 'Cropping কেন হয়', 'Safe-area prompt pattern', 'size দিয়ে canvas নিয়ন্ত্রণ', 'Large model দিয়ে English prompt optimize', 'Quality loss কীভাবে সামলাবেন', 'Character-sheet guidance', 'আগে crop হওয়া image কীভাবে ঠিক করবেন', 'Batch API integration পরামর্শ', 'Delivery checklist'],
    ur: ['پہلے مسئلے کی قسم طے کریں', 'Root-cause analysis', 'Cropping کیوں ہوتی ہے', 'Safe-area prompt pattern', 'size سے canvas control کریں', 'Large model سے English prompt optimize کریں', 'Quality loss کیسے سنبھالیں', 'Character-sheet guidance', 'پہلے سے cropped image کیسے ٹھیک کریں', 'Batch API integration مشورہ', 'Delivery checklist'],
    ta: ['முதலில் பிரச்சினையை வகைப்படுத்தவும்', 'Root-cause analysis', 'Cropping ஏன் ஏற்படுகிறது', 'Safe-area prompt pattern', 'size மூலம் canvas-ஐ கட்டுப்படுத்தவும்', 'Large model மூலம் English prompt-ஐ optimize செய்யவும்', 'Quality loss-ஐ எவ்வாறு கையாள்வது', 'Character-sheet guidance', 'ஏற்கனவே cropped image-ஐ எவ்வாறு சரிசெய்வது', 'Batch API integration ஆலோசனை', 'Delivery checklist'],
    ne: ['पहिले समस्याको प्रकार छुट्याउनुहोस्', 'Root-cause analysis', 'Cropping किन हुन्छ', 'Safe-area prompt pattern', 'size बाट canvas नियन्त्रण', 'Large model बाट English prompt optimize', 'Quality loss कसरी सम्हाल्ने', 'Character-sheet guidance', 'पहिले crop भएको image कसरी सुधार्ने', 'Batch API integration सुझाव', 'Delivery checklist'],
    si: ['පළමුව ගැටලුව වර්ගීකරණය කරන්න', 'Root-cause analysis', 'Cropping සිදුවන්නේ ඇයි', 'Safe-area prompt pattern', 'size මඟින් canvas පාලනය කරන්න', 'Large model එකකින් English prompt optimize කරන්න', 'Quality loss හසුරුවන්නේ කෙසේද', 'Character-sheet guidance', 'දැනටමත් cropped image එකක් repair කරන්නේ කෙසේද', 'Batch API integration උපදෙස්', 'Delivery checklist'],
  }[locale as 'zh' | 'hi' | 'bn' | 'ur' | 'ta' | 'ne' | 'si'] ?? ['Classify the problem first', 'Root-cause analysis', 'Why cropping happens', 'Core safe-area prompt pattern', 'Use size to control the canvas', 'Optimize English prompts with a large model', 'How to handle quality loss', 'Character-sheet guidance', 'How to repair an already cropped image', 'Batch API integration advice', 'Delivery checklist']
  const safeAreaCopy = {
    zh: ['防裁剪不是只加一句“不要裁剪”。更稳定的写法是同时给出主体位置、主体占比、镜头距离和安全留白。', '如果你做的是电商商品图，可以直接把“完整主体”和“安全留白”写到主体描述前面。', '不要只依赖负面词', '“不要裁剪”是必要的，但不够。模型需要知道主体应该占多大、放在哪里、四周留多少空间。只写 negative prompt，通常不如“完整主体 + 中远景 + 70% 占比 + 12% 留白”稳定。', '对 gpt-image-2 这类支持多宽高比的图片模型来说，size 是防裁剪的第一层控制。它决定模型从一开始就在什么画布比例里构图，而不是先生成方图再后期硬裁切。'],
    hi: ['Cropping रोकने के लिए केवल “do not crop” लिखना पर्याप्त नहीं है। अधिक stable prompt में subject placement, subject scale, camera distance और safe margins साथ दें।', 'Ecommerce image बनाते समय “full subject” और “safe margins” को subject description से पहले लिखें।', 'Do not rely on negative words alone', '“Do not crop” आवश्यक है, पर पर्याप्त नहीं। Model को subject scale, placement और चारों ओर space पता होना चाहिए। केवल negative prompt की तुलना में “full subject + medium distance + 70% scale + 12% margin” अधिक stable है।', 'gpt-image-2 जैसे multi-aspect-ratio models में size cropping रोकने का पहला control है। यह शुरू से canvas ratio तय करता है, बजाय square image बनाकर बाद में crop करने के।'],
    bn: ['Cropping রোধ করতে শুধু “do not crop” লেখা যথেষ্ট নয়। Stable prompt-এ subject placement, subject scale, camera distance এবং safe margin একসঙ্গে দিন।', 'Ecommerce image হলে subject description-এর আগে “full subject” এবং “safe margins” লিখুন।', 'শুধু negative word-এর উপর নির্ভর করবেন না', '“Do not crop” দরকার, কিন্তু যথেষ্ট নয়। Model-এর subject scale, placement এবং চারপাশের space জানা দরকার। শুধু negative prompt-এর চেয়ে “full subject + medium distance + 70% scale + 12% margin” বেশি stable।', 'gpt-image-2-এর মতো multi-aspect-ratio model-এ size cropping রোধের প্রথম control। এটি শুরুতেই canvas ratio নির্ধারণ করে, পরে square image crop করার প্রয়োজন কমায়।'],
    ur: ['Cropping روکنے کے لیے صرف “do not crop” لکھنا کافی نہیں۔ زیادہ stable prompt میں subject placement، subject scale، camera distance اور safe margins ایک ساتھ دیں۔', 'Ecommerce image کے لیے subject description سے پہلے “full subject” اور “safe margins” لکھیں۔', 'صرف negative words پر انحصار نہ کریں', '“Do not crop” ضروری ہے مگر کافی نہیں۔ Model کو subject scale، placement اور چاروں طرف space معلوم ہونا چاہیے۔ صرف negative prompt کے مقابلے میں “full subject + medium distance + 70% scale + 12% margin” زیادہ stable ہے۔', 'gpt-image-2 جیسے multi-aspect-ratio models میں size cropping کے خلاف پہلا control ہے۔ یہ شروع ہی میں canvas ratio طے کرتا ہے، بعد میں square image crop کرنے کے بجائے۔'],
    ta: ['Cropping-ஐத் தடுக்க “do not crop” என்று மட்டும் எழுதுவது போதாது. Stable prompt-ல் subject placement, subject scale, camera distance மற்றும் safe margins ஆகியவற்றை ஒன்றாகக் குறிப்பிடவும்.', 'Ecommerce image-க்கு subject description-க்கு முன் “full subject” மற்றும் “safe margins” சேர்க்கவும்.', 'Negative words-ஐ மட்டும் நம்ப வேண்டாம்', '“Do not crop” தேவை, ஆனால் போதாது. Model-க்கு subject scale, placement மற்றும் சுற்றியுள்ள space தெரிந்திருக்க வேண்டும். Negative prompt மட்டும் காட்டிலும் “full subject + medium distance + 70% scale + 12% margin” நிலையானது.', 'gpt-image-2 போன்ற multi-aspect-ratio models-ல் size என்பது cropping-ஐத் தடுக்கும் முதல் control. ஆரம்பத்திலேயே canvas ratio-ஐ நிர்ணயிக்கிறது.'],
    ne: ['Cropping रोक्न “do not crop” मात्र लेख्नु पर्याप्त छैन। Stable prompt मा subject placement, subject scale, camera distance र safe margins सँगै दिनुहोस्।', 'Ecommerce image का लागि subject description भन्दा अघि “full subject” र “safe margins” लेख्नुहोस्।', 'Negative words मा मात्र भर नपर्नुहोस्', '“Do not crop” आवश्यक छ तर पर्याप्त छैन। Model लाई subject scale, placement र वरिपरि space थाहा हुनुपर्छ। केवल negative prompt भन्दा “full subject + medium distance + 70% scale + 12% margin” stable हुन्छ।', 'gpt-image-2 जस्ता multi-aspect-ratio models मा size cropping विरुद्धको पहिलो control हो। यसले सुरुदेखि canvas ratio तय गर्छ।'],
    si: ['Cropping වැළැක්වීමට “do not crop” පමණක් ලිවීම ප්‍රමාණවත් නැත. Stable prompt එකක subject placement, subject scale, camera distance සහ safe margins එකට දක්වන්න.', 'Ecommerce image සඳහා subject description එකට පෙර “full subject” සහ “safe margins” ලියන්න.', 'Negative words මත පමණක් රඳා නොසිටින්න', '“Do not crop” අවශ්‍ය නමුත් ප්‍රමාණවත් නොවේ. Model එකට subject scale, placement සහ වටා space දැනගත යුතුය. Negative prompt එකකට වඩා “full subject + medium distance + 70% scale + 12% margin” ස්ථාවරය.', 'gpt-image-2 වැනි multi-aspect-ratio models තුළ size cropping වැළැක්වීමේ පළමු control එකයි. එය මුල සිටම canvas ratio එක තීරණය කරයි.'],
  }[locale as 'zh' | 'hi' | 'bn' | 'ur' | 'ta' | 'ne' | 'si'] ?? undefined
  const sizeTable = locale === 'zh'
    ? { headers: ['目标画面', '推荐 size', '为什么这样选'], rows: [
        ['横屏海报、视频封面、网页 banner', <code>1536x1024</code>, '横向画布给左右两侧留出空间，适合多人、场景、横向商品组合和标题留白。'],
        ['竖屏海报、角色全身、小红书封面', <code>1024x1536</code>, '竖向画布更适合完整人物、长条商品、服装、角色设定和移动端首图。'],
        ['电商主图、头像、图标、社媒方图', <code>1024x1024</code>, '方图适合主体居中展示，但要明确主体占比，避免模型把商品或人物放得过大。'],
        ['极宽或极长构图', '自定义尺寸', '先确认平台支持该尺寸，再检查宽高是否为 16 的倍数、最长边是否超过 3840px、宽高比是否超过 3:1。'],
      ] }
    : { headers: ['Target canvas', 'Recommended size', 'Why'], rows: [
        ['Landscape poster, video cover or web banner', <code>1536x1024</code>, 'The landscape canvas leaves room on both sides for people, scenes, product groups and title-safe space.'],
        ['Portrait poster, full-body character or social cover', <code>1024x1536</code>, 'The portrait canvas suits complete people, tall products, clothing, character sheets and mobile covers.'],
        ['Ecommerce hero image, avatar, icon or square social image', <code>1024x1024</code>, 'A square canvas centers the subject, but define subject scale so it does not become oversized.'],
        ['Very wide or very tall composition', 'Custom size', 'Confirm platform support, then check 16-pixel multiples, a maximum 3840px edge and a ratio within 3:1.'],
      ] }
  const compositionTable = locale === 'zh'
    ? { headers: ['构图词', '适合场景', '作用'], rows: [
        [<code>full body shot</code>, '人物、模特、角色设定', '提醒模型展示完整身体，减少头、脚、衣摆被切掉的概率。'],
        [<code>wide shot</code>, '场景图、海报、多人构图', '拉远镜头，让主体和背景都有空间。'],
        [<code>un-cropped</code>, '商品、人物、道具边缘容易被切的图', '声明不要裁切主体，但仍建议配合主体占比和安全留白。'],
        [<code>centered composition with ample negative space around the subject</code>, '电商主图、封面、海报', '让主体居中并缩小，四周保留可裁切缓冲区。'],
      ] }
    : { headers: ['Composition term', 'Best for', 'Effect'], rows: [
        [<code>full body shot</code>, 'People, models and character sheets', 'Ask the model to show the complete body and reduce head, feet and clothing-edge cropping.'],
        [<code>wide shot</code>, 'Scenes, posters and group compositions', 'Pull the camera back so both subject and background have room.'],
        [<code>un-cropped</code>, 'Products, people or props with fragile edges', 'Declare that the subject must not be cropped, while still specifying scale and safe margins.'],
        [<code>centered composition with ample negative space around the subject</code>, 'Ecommerce hero images, covers and posters', 'Center and scale down the subject, leaving crop buffer around it.'],
      ] }
  const promptHeaders = locale === 'zh' ? ['做法', '作用', '注意事项'] : ['Method', 'Purpose', '注意事项 / Notes']
  const promptRows = locale === 'zh'
    ? [['先写中文业务需求', '保证商品卖点、角色设定、用途和风格不会遗漏。', '中文需求可以口语化，但必须说清楚最终用途。'], ['让大模型改写成英文 prompt', '稳定表达镜头、构图、材质、摄影和安全边距等术语。', '要求模型只输出最终 prompt，避免把解释放进输入框。'], ['人工检查冲突词', '检查 close-up、macro shot、full body、wide shot 是否互相冲突。', '完整主体优先保留 medium distance、full subject visible、safe margin。'], ['保留可复用模板', '批量生图时复用同一套构图和质量约束。', '每次只替换主体、风格或场景，不要重写整段 prompt。']]
    : [['Write the business requirement first', 'Keep product selling points, character settings, use case and style from being omitted.', 'The requirement may be informal, but state the final use such as an ecommerce hero image or poster.'], ['Ask a large model to rewrite an English prompt', 'Express camera, composition, materials, photography and safe-margin terms consistently.', 'Ask for only the final prompt so explanation text does not enter the image input.'], ['Review conflicting terms manually', 'Check whether close-up, macro shot, full body and wide shot conflict.', 'For a complete subject, prefer medium distance, full subject visible and safe margin.'], ['Keep a reusable template', 'Reuse the same composition and quality constraints for batch generation.', 'Replace only the subject, style or scene instead of rewriting the full prompt each time.']]
  const qualityCopy: [string, string[]] = locale === 'zh'
    ? ['生图质量问题通常来自三个地方：提示词过载、参考图质量差、最终分辨率和任务不匹配。不要把所有问题都归因于模型，先用下面这张表排查。', ['质量问题', '常见原因', '解决方案']]
    : ['Image quality problems usually come from prompt overload, poor reference images, or a mismatch between resolution and task complexity. Diagnose these factors before blaming the model.', ['Quality issue', 'Common cause', 'Fix']]
  const qualityRows = locale === 'zh'
    ? [['细节糊', '低分辨率试图承载太多角色、道具和材质。', '先拆图，最终图用高质量或原生 4K；复杂材质不要和复杂排版挤在同一张图里。'], ['人物手脸不稳', '多人、多姿势、多视角同时出现，模型一致性压力过大。', '单人单视角先生成，再用后期拼版；必要时每个视图单独生成。'], ['商品结构变形', '参考图不清楚，或提示词过度改造商品。', '上传清晰参考图，明确不改变瓶型、包装比例、颜色和标签位置。'], ['文字乱码', '图片模型不适合承载精确小字排版。', '先生成无字底图，再用设计工具或前端模板加文字。'], ['风格变散', '提示词堆了太多互相冲突的风格词。', '只保留一个主风格，材质、光线、镜头作为辅助描述。']]
    : [['Blurry detail', 'Low resolution is carrying too many characters, props and materials.', 'Split the image first; use a higher quality tier or native 4K for the final.'], ['Unstable hands and faces', 'Multiple people, poses and views create too much consistency pressure.', 'Generate one person and one view first, then composite or generate each view separately.'], ['Distorted product structure', 'The reference image is unclear or the prompt changes the product too aggressively.', 'Upload a clear reference and state that bottle shape, package ratio, color and label position must not change.'], ['Garbled text', 'Image models are poor at precise small-text layout.', 'Generate a text-free base image, then add text in a design tool or frontend template.'], ['Scattered style', 'The prompt contains too many conflicting style terms.', 'Keep one primary style and use material, lighting and camera as supporting descriptions.']]
  const characterCopy: [string, string[]] = locale === 'zh'
    ? ['角色设定图最容易出问题，因为它经常要求一张图里同时出现脸部特写、正视全身、侧视全身、背视全身、材质细节和道具。如果没有明确分栏和安全框，模型会把角色放大，导致全身视图被裁切。', ['目标', '推荐做法', '不建议']]
    : ['Character sheets are especially fragile because one image often asks for a face close-up, front/side/back full-body views, material details and props. Without explicit columns and safe frames, the model may enlarge the character and crop the full-body views.', ['Goal', 'Recommended approach', 'Avoid']]
  const characterRows = locale === 'zh'
    ? [['高质量角色设定', '先单独生成正视全身，再生成侧视、背视和脸部特写，最后拼版。', '一条 prompt 同时要求四视图、复杂材质、复杂背景和极致细节。'], ['四视图同图', '明确 4 个等宽分栏、每栏留白、全身视图高度占 72%。', '只写“从左到右排列四个视图”，不写分栏和占比。'], ['保持不裁剪', '写清楚头发、手、脚、衣摆、武器、道具都必须完整可见。', '只写“full body”，但同时又写 close-up 或 cinematic portrait。']]
    : [['High-quality character sheet', 'Generate the front full-body view separately, then side, back and face close-up views before compositing.', 'Ask one prompt for four views, complex materials, a complex background and extreme detail at once.'], ['Four views in one image', 'Specify four equal-width columns, space in each column and 72% height for full-body views.', 'Only say “arrange four views from left to right” without defining columns or scale.'], ['Keep the subject uncropped', 'State that hair, hands, feet, clothing edges, weapons and props must remain fully visible.', 'Write only “full body” while also adding close-up or cinematic portrait.']]
  const batchCopy: [string, string] = locale === 'zh'
    ? ['批量生图时，先用 agent.gpt88.cc 手动打样，确认构图模板稳定后，再把同一套提示词迁移到统一使用 https://img.gpt88.cc 图片 API。API 参数以站内图片 API 文档为准。', '批量任务不要一开始就跑几十张。先抽 3 张样图，确认不裁剪、比例正确、主体完整，再扩大数量。']
    : ['For batch generation, prototype manually in agent.gpt88.cc first. After the composition template is stable, move the same prompts to the shared https://img.gpt88.cc Image API and follow the site API reference for parameters.', 'Do not start a batch with dozens of images. Sample three images first, verify no cropping, correct ratio and complete subjects, then scale up.']
  const deliveryTable = locale === 'zh'
    ? { headers: ['检查项', '通过标准'], rows: [['主体完整', '头部、手脚、商品边缘、道具、衣摆、包装标签都没有被切。'], ['比例正确', '生成图比例和最终平台比例一致，不依赖平台自动裁剪。'], ['安全留白', '主体四周有 10%-15% 可裁切缓冲区。'], ['质量足够', '材质、边缘、五官、商品纹理和关键细节经放大检查可用。'], ['文字处理', '精确文字、价格、卖点和按钮尽量后期排版，不直接让模型画小字。'], ['可复用', '保留 prompt、尺寸、质量档位、样图编号和失败原因，方便批量复现。']] }
    : { headers: ['Check', 'Pass criteria'], rows: [['Complete subject', 'The head, hands, feet, product edges, props, clothing edges and packaging labels are not cropped.'], ['Correct ratio', 'The generated ratio matches the final platform ratio without relying on automatic platform cropping.'], ['Safe margins', 'Keep a 10%-15% crop buffer around the subject.'], ['Sufficient quality', 'Materials, edges, facial features, product texture and key details remain usable when inspected enlarged.'], ['Text handling', 'Add exact text, prices, selling points and buttons in post-processing rather than asking the model to render small text.'], ['Reusable', 'Keep the prompt, size, quality tier, sample ID and failure reason for repeatable batch work.']] }
  const batchChecklist = locale === 'zh' ? BATCH_CHECKLIST : `Batch image-generation checks:

1. Validate composition with a small batch of 1-3 images first.
2. Define the final ratio: 1:1, 3:4, 4:5, 9:16, 16:9 or a landscape character sheet.
3. Specify “full subject visible” and “safe margins”.
4. Check custom size, a maximum 3840px edge and a ratio within 3:1.
5. Avoid conflicts between close-up, macro, half body and full body.
6. Split complex tasks into steps instead of putting every requirement in one image.
7. Prepare outpainting, redraw, split-generation or post-production recovery options.
8. Keep the reusable prompt, size, quality tier and sample identifiers.`
  const safePrompt = locale === 'zh' ? SAFE_PROMPT : `Composition requirements:
- Keep the full subject inside the frame; do not crop the head, hands, feet, props or clothing edges
- Center the subject and make it about 65%-75% of the image height
- Keep 10%-15% safe margins on all sides; let the background extend to the edges
- Use a medium-distance or full-body shot, not a close-up or macro shot
- For a character sheet, give each view its own clear column with spacing between columns
- No text, watermark, UI or border`
  const productPrompt = locale === 'zh' ? PRODUCT_PROMPT : `Ecommerce product anti-cropping prompt:

A premium skincare serum bottle, with the full bottle and pump inside the frame.
Center the product; the bottle occupies about 70% of the image height, with 12% safe margins on all sides.
Pure white or light-gray shadowless background, soft studio lighting, realistic glass material and sharp edges.
Do not crop the cap, bottle bottom, label or package edges. No text or watermark.`
  const characterPrompt = locale === 'zh' ? CHARACTER_PROMPT : `3D character-sheet anti-cropping prompt:

Cool-toned young character, cinematic 3D animation quality, pure white shadowless background.
Use a landscape character sheet divided into four equal-width columns:
1. Front-facing face close-up
2. Front-facing full-body view
3. Side-facing full-body view
4. Back-facing full-body view

Keep every figure fully inside its column; do not crop hair, hands, feet, clothing edges or props.
Keep full-body figures at about 72% of the column height with clear margins around them.
Do not enlarge the character, replace full-body views with close-ups or let views overlap.
Material details: ceramic cracks, jade-like texture, cool energy flow and PBR quality.
No text, watermark or UI elements.`
  const apiSafeCurl = locale === 'zh' ? API_SAFE_CURL : API_SAFE_CURL.replace('完整全身角色设定图，人物居中，头发、手、脚、衣摆和道具都不能被裁切，四周保留 12% 安全留白，纯白背景，国漫电影级 3D 质感，无文字，无水印', 'Complete full-body character sheet, centered figure, hair, hands, feet, clothing edges and props fully visible, 12% safe margins on all sides, pure white background, cinematic 3D animation quality, no text or watermark')
  const promptOptimizer = locale === 'zh' ? PROMPT_OPTIMIZER : `You are a professional AI image-prompt engineer. Rewrite the Chinese requirement below as an English prompt suitable for GPT-Image-2 or an image-generation model.

Requirements:
1. Preserve the subject, style, scene, materials and intended use.
2. Complete composition details first: camera distance, subject placement, subject scale and safe margins.
3. State the aspect ratio and safe margins clearly to prevent subject cropping.
4. Remove conflicting terms such as close-up and full body in the same request.
5. Output only the final English prompt, without explanation.

Chinese requirement:
A premium ecommerce skincare serum hero image on a white background, with a glass bottle fully visible and no cropping, suitable for Taobao and Xiaohongshu.`
  const causeAnalysis = locale === 'zh' ? CAUSE_ANALYSIS : `The problem chain has five layers:

1. Requirement layer: too many subjects, views, materials, actions and background details in one image
2. Canvas layer: the target ratio does not fit the subject, such as a long character or four-view sheet in a square image
3. Composition layer: the prompt does not specify camera distance, subject scale or safe margins
4. Quality layer: resolution, detail volume and task complexity do not match, so the model must trade off
5. Publishing layer: the original is complete, but a product backend, video cover or social card crops it again`
  const rootCauseCopy = locale === 'zh'
    ? { intro: '很多生图问题看起来像“模型质量不行”，实际更常见的是任务设计不合理。图片模型需要在固定画布内同时决定主体大小、镜头距离、构图重心、背景空间和细节优先级。只要这些约束没有写清楚，模型就会按“视觉冲击力”自动取舍，结果往往是主体放大、边缘被切、细节挤压或多视图互相干扰。', headers: ['根因', '怎么判断', '为什么会导致问题'], callout: '先区分两种裁剪', calloutText: '如果下载原图已经缺头、缺脚、缺商品边缘，这是生成裁剪，要改 prompt 和尺寸。如果原图完整但发布后被切，这是展示裁剪，要改最终比例和安全边距。' }
    : { intro: 'Many image problems look like model-quality issues, but poor task design is more common. Within a fixed canvas, the model must decide subject scale, camera distance, composition, background space and detail priority. If these constraints are unclear, it optimizes for visual impact, often enlarging the subject, cropping edges, compressing detail or mixing views.', headers: ['Root cause', 'How to identify it', 'Why it causes problems'], callout: 'Distinguish two types of cropping', calloutText: 'If the downloaded original is already missing the head, feet or product edges, it is generation cropping: change the prompt and size. If the original is complete but cropped after publishing, it is display cropping: change the final ratio and safe margins.' }
  const cropCauseCopy = locale === 'zh'
    ? { intro: '裁剪问题最常见的根因，是提示词只描述“画什么”，没有描述“怎么放进画面”。模型会自动选择它认为更有冲击力的构图，这通常意味着主体更大、更近，也更容易切边。', headers: ['容易踩坑的写法', '为什么会出问题', '建议改法'], rows: [['close-up, full body', '近景和全身互相冲突，模型往往优先放大主体。', '明确写“中远景，全身完整可见，主体占画面高度约 70%”。'], ['一张图里塞多个视图、特写、道具和复杂背景', '画布空间不够，模型会压缩或裁掉某些部分。', '拆成多张图，或明确分栏数量、分栏间距和每栏安全留白。'], ['只写 4K、超清、极致细节', '质量词不能解决构图问题，还会让模型优先画局部细节。', '先写构图和安全框，再写材质和细节。'], ['方图里生成全身长角色或长条商品', '主体纵向比例和画布不匹配。', '全身角色用竖图，横向设定表用横图，电商主图按平台比例选。']] }
    : { intro: 'Cropping usually happens when a prompt says only what to draw, not how to fit it into the frame. The model chooses a more dramatic composition, which often makes the subject larger and closer and increases edge cropping.', headers: ['Risky wording', 'Why it fails', 'Suggested rewrite'], rows: [['close-up, full body', 'Close-up and full body conflict, so the model often enlarges the subject.', 'Write: “medium-distance shot, full subject visible, subject occupies about 70% of image height.”'], ['Multiple views, close-ups, props and a complex background in one image', 'The canvas has insufficient space, so some elements are compressed or cropped.', 'Split into multiple images or define column count, spacing and safe margins for each column.'], ['Only 4K, ultra sharp and extreme detail', 'Quality terms do not solve composition and may prioritize local detail.', 'Write composition and safe frame requirements before materials and detail.'], ['Full-body character or tall product in a square image', 'The subject proportions do not fit the canvas.', 'Use portrait size for full-body subjects, landscape for horizontal sheets and the final platform ratio for ecommerce images.']] }
  const repairCopy: [string, string[], string, string] = locale === 'zh'
    ? ['如果图已经生成出来但边缘被切，不一定要完全重跑。先判断是不是还有可修复价值。', ['如果主体只轻微切边，优先使用扩图 / outpainting，把画布向被裁切方向延展。', '如果头、脸、手、商品 logo 已经变形，建议重生成，不要在错误图上继续修。', '如果只是平台预览裁剪，保留原图，在外层加安全边距或重新排版导出。', '如果是角色设定图某一栏裁剪，单独重做那一栏，再后期拼版。'], '修图优先级', '轻微切边用扩图，结构错误用重生成，文字和排版问题用后期工具。不要把所有修复都交给同一次重绘，否则容易把原本正确的部分也改坏。']
    : ['If an image is already cropped, you may not need to start over. First decide whether the damage is repairable.', ['For a minor edge crop, use outpainting to extend the canvas toward the cropped side.', 'If the head, face, hands or product logo is distorted, regenerate instead of repairing the wrong image.', 'If only a platform preview is cropped, keep the original and add outer margins or re-export the layout.', 'If one character-sheet column is cropped, regenerate that column separately and composite it later.'], 'Repair priority', 'Use outpainting for minor edge crops, regeneration for structural errors, and post-processing tools for text and layout. Do not redraw everything at once or you may damage correct areas.']
  const rootCauseRows: React.ReactNode[][] = locale === 'zh'
    ? [
        ['画布比例不匹配', '方图里要全身长角色、长条包装、四视图角色表，主体天然放不下。', '模型为了让主体清楚，会把主体放大；画布边缘就会先切掉头发、脚、道具或商品边缘。'],
        [<span>镜头语言冲突</span>, <span>同时出现 <code>close-up</code>、<code>portrait</code>、<code>full body</code>、<code>character sheet</code> 这类互相拉扯的词。</span>, '近景词会推动模型拉近镜头，全身词又要求完整展示，冲突时通常牺牲完整性。'],
        ['单张信息过载', '一张图里同时要求脸部特写、正面全身、侧面全身、背面全身、复杂材质、道具和背景。', '模型会把注意力分散到多个目标，导致每个局部都不够稳定，常见结果是糊、变形、裁边和视图错位。'],
        [<span>质量词替代构图词</span>, <span>Prompt 里大量写 <code>4K</code>、<code>ultra detailed</code>、<code>cinematic</code>，但没有写主体占比和留白。</span>, '质量词只会强化局部细节，不会自动保证完整构图；细节越密，模型越容易选择更近的镜头。'],
        ['生成图和发布图不是同一比例', '原图下载后完整，但上传到商品后台、视频封面或社媒卡片后被切。', '这是展示容器二次裁剪，不是模型生成失败；需要按最终平台比例重新留安全框。'],
      ]
    : [
        ['Canvas mismatch', 'A square image is asked to contain a tall full-body character, a long package or a four-view character sheet.', 'To keep the subject legible, the model enlarges it and the canvas edges cut hair, feet, props or product edges first.'],
        ['Conflicting camera language', <span>The prompt combines competing terms such as <code>close-up</code>, <code>portrait</code>, <code>full body</code> and <code>character sheet</code>.</span>, 'Close-up terms pull the camera in while full-body terms require complete visibility; when they conflict, completeness is often sacrificed.'],
        ['Too much information in one image', 'One image requests a face close-up, front/side/back full-body views, complex materials, props and a background at the same time.', 'Attention is split across too many targets, leading to unstable details, distortion, edge crops and misaligned views.'],
        ['Quality words replacing composition requirements', <span>The prompt includes <code>4K</code>, <code>ultra detailed</code> and <code>cinematic</code>, but does not define subject scale or negative space.</span>, 'Quality terms reinforce local detail but do not guarantee complete composition; dense detail can push the model toward a closer camera.'],
        ['Generation and publishing use different ratios', 'The downloaded original is complete, but a product backend, video cover or social card crops it later.', 'This is a second crop in the display container, not a generation failure; define a safe frame for the final platform ratio.'],
      ]

  return (
    <DocPage
      path="/docs/guides/agent-image-quality-crop-guide"
      title={meta?.[0] ?? 'agent.gpt88.cc image quality and cropping guide'}
      description={meta?.[1] ?? 'Practical guidance for image quality, cropping, product edges and stable batch generation.'}
      headings={[
        ...['overview', 'root-cause', 'crop-causes', 'safe-area', 'size-control', 'prompt-optimization', 'quality', 'character-sheet', 'repair', 'api', 'checklist'].map((id, index) => ({ id, text: sectionTitles[index], level: 2 as const })),
      ]}
    >
      <Callout tone="tip" title={overviewCopy?.[0] ?? 'Key takeaway'}>
        <p>
          {overviewCopy?.[1] ?? 'Define composition, aspect ratio and safe margins before optimizing style and detail.'}
        </p>
      </Callout>

      <h2 id="overview">先判断问题类型</h2>
      <p>
        {overviewCopy?.[2] ?? 'When creating posters, ecommerce images, character sheets or batch assets in agent.gpt88.cc, classify the problem before choosing a fix.'}
      </p>
      <DocTable
        headers={issueTable.headers}
        rows={issueTable.rows}
      />

      <h2 id="root-cause">问题出现原因分析</h2>
      <p>
        {rootCauseCopy.intro}
      </p>
      <CodeBlock lang="text" filename="root-cause-map" code={causeAnalysis} />
      <DocTable
        headers={rootCauseCopy.headers}
        rows={rootCauseRows}
      />
      <Callout tone="info" title={rootCauseCopy.callout}>
        <p>
          {rootCauseCopy.calloutText}
        </p>
      </Callout>

      <h2 id="crop-causes">为什么会被裁剪</h2>
      <p>
        {cropCauseCopy.intro}
      </p>
      <DocTable
        headers={cropCauseCopy.headers}
        rows={cropCauseCopy.rows}
      />

      <h2 id="safe-area">防裁剪核心写法</h2>
      <p>
        {safeAreaCopy?.[0] ?? 'A stable anti-cropping prompt specifies subject placement, scale, camera distance and safe margins.'}
      </p>
      <CodeBlock lang="text" filename="safe-area-prompt" code={safePrompt} />
      <p>
        {safeAreaCopy?.[1] ?? 'For ecommerce images, put full-subject and safe-margin requirements before the subject description.'}
      </p>
      <CodeBlock lang="text" filename="product-prompt" code={productPrompt} />
      <Callout tone="warn" title={safeAreaCopy?.[2] ?? 'Do not rely on negative words alone'}>
        <p>
          {safeAreaCopy?.[3] ?? '“Do not crop” is necessary but insufficient; specify scale, placement and margins explicitly.'}
        </p>
      </Callout>

      <h2 id="size-control">size 参数控制画布</h2>
      <p>
        {safeAreaCopy?.[4] ?? 'For models such as gpt-image-2, size is the first anti-cropping control because it sets the canvas ratio before composition begins.'}
      </p>
      <DocTable
        headers={sizeTable.headers}
        rows={sizeTable.rows}
      />
      <CodeBlock lang="text" filename="gpt-image-2-size-guide" code={SIZE_GUIDE} />
      <p>
        选对 <code>size</code> 只能解决画布比例问题，不能自动保证镜头距离正确。如果 prompt 里仍然写了
        <code>close-up</code>、<code>macro shot</code> 或强烈的近景摄影词，主体仍可能被放大到切边。
        所以尺寸要和构图词一起使用。
      </p>
      <DocTable
        headers={compositionTable.headers}
        rows={compositionTable.rows}
      />
      <Callout tone="tip" title="尺寸和提示词要成套使用">
        <p>
          防裁剪的稳定组合是：先用 <code>size</code> 选择正确画布，再在 prompt 里写
          <code>full body shot</code>、<code>wide shot</code>、<code>centered composition</code>、
          <code>ample negative space</code> 和明确的安全留白。
        </p>
      </Callout>

      <h2 id="prompt-optimization">用大模型优化英文提示词</h2>
      <p>
        如果你不是每天写生图 prompt，建议先把中文需求交给大模型整理，再把优化后的英文提示词用于
        <code>agent.gpt88.cc</code> 或统一 API Base URL <code>https://img.gpt88.cc</code>。这样做的重点不是“翻译”，而是让大模型帮你补全构图、
        镜头距离、主体占比、安全留白、材质和负面限制。
      </p>
      <DocTable
        headers={promptHeaders}
        rows={promptRows}
      />
      <CodeBlock lang="text" filename="prompt-optimizer-template" code={promptOptimizer} />
      <CodeBlock lang="text" filename="optimized-english-prompt" code={ENGLISH_PROMPT_EXAMPLE} />
      <Callout tone="tip" title="推荐使用英文提示词">
        <p>
          图片模型对摄影、构图和设计类英文术语更稳定，例如 <code>centered composition</code>、
          <code>medium distance product shot</code>、<code>safe margin</code>、<code>full subject visible</code>。
          中文可以用于表达业务需求，最终生图 prompt 建议用英文版本。
        </p>
      </Callout>

      <h2 id="quality">质量下降怎么处理</h2>
      <p>
        {qualityCopy[0]}
      </p>
      <DocTable
        headers={qualityCopy[1]}
        rows={qualityRows}
      />

      <h2 id="character-sheet">角色设定图专项</h2>
      <p>
        {characterCopy[0]}
      </p>
      <CodeBlock lang="text" filename="character-sheet-prompt" code={characterPrompt} />
      <DocTable
        headers={characterCopy[1]}
        rows={characterRows}
      />

      <h2 id="repair">已经裁剪怎么修</h2>
      <p>
        {repairCopy[0]}
      </p>
      <ol>
        {repairCopy[1].map(item => <li key={item}>{item}</li>)}
      </ol>
      <Callout tone="info" title={repairCopy[2]}>
        <p>
          {repairCopy[3]}
        </p>
      </Callout>

      <h2 id="api">API 批量对接建议</h2>
      <p>
        {batchCopy[0]} <Link to="/docs/api/images/">Image API reference</Link>.
      </p>
      <CodeBlock lang="bash" filename="safe-image-generation.sh" code={apiSafeCurl} />
      <p>
        {batchCopy[1]}
      </p>
      <CodeBlock lang="text" filename="batch-checklist" code={batchChecklist} />

      <h2 id="checklist">交付检查清单</h2>
      <DocTable
        headers={deliveryTable.headers}
        rows={deliveryTable.rows}
      />
    </DocPage>
  )
}
