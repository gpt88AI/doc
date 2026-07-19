import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'
import AgentImageStudioGuidePageEn from '../../en/AgentImageStudioGuidePageEn'

const ENTRY_POINTS = `推荐入口
  图片工作台: https://agent.gpt88.cc/
  控制台/API Key: https://gpt88.cc

常见相关页面
  Image Studio: /image-studio
  案例提示词库: /xsct-cases
  用量与余额: 控制台 Usage / Dashboard
  API Key: 控制台 Keys`

const WORKFLOW = `1. 登录 GPT88，并确认账号有可用余额
2. 进入 https://agent.gpt88.cc/ 图片工作台
3. 选择任务模式：主图、场景图、模特图、详情页、去背景、局部重绘、扩图或高清增强
4. 上传商品图、参考图或素材图
5. 选择模型、比例、尺寸、格式和质量
6. 先生成 1 张小尺寸草图确认方向
7. 确认提示词和画面后，再切换 2K / 4K 或批量生成
8. 下载成品图，并到控制台核对用量`

const PROMPT_TEMPLATE = `主体：一瓶高端护肤精华液，玻璃瓶身，银色泵头
场景：极简白色浴室台面，柔和自然光，干净高级
构图：商品居中，保留顶部标题区域，适合电商主图
风格：商业摄影，真实材质，高级感，细节清晰
限制：无文字、无水印、无 logo、不改变瓶身结构`

const BATCH_CHECKLIST = `批量生成前检查：

1. 单张样图已经确认风格、构图和商品一致性
2. 提示词里明确了不可变元素，例如品牌瓶型、颜色、包装结构
3. 每个平台所需比例已经列清楚，例如 1:1、3:4、4:3、16:9、9:16
4. 先用 1K 验证，再切到 2K / 4K
5. 批量任务命名清晰，方便后续下载、筛选和复用`

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

export default function AgentImageStudioGuidePage() {
  const { locale } = useLocale()

  if (locale === 'en') return <AgentImageStudioGuidePageEn />

  const studioIntroUrl = buildAgentActivationUrl({
    locale,
    surface: 'agent_image_studio_intro',
    intent: 'image_api',
    destination: 'image-studio',
  })
  const studioRelatedUrl = buildAgentActivationUrl({
    locale,
    surface: 'agent_image_studio_related',
    intent: 'image_api',
    destination: 'image-studio',
  })

  return (
    <DocPage
      path="/docs/guides/agent-image-studio"
      title="GPT88 Agent 图片工作台教程"
      description="使用 agent.gpt88.cc 的 gpt-image-2 图片工作台生成电商主图、场景图、模特图、详情页素材、案例模板和批量图片。"
      headings={[
        { id: 'overview', text: '入口与定位', level: 2 },
        { id: 'scenarios', text: '适合什么场景', level: 2 },
        { id: 'prepare', text: '开始前准备', level: 2 },
        { id: 'workflow', text: '推荐工作流', level: 2 },
        { id: 'modes', text: '模式说明', level: 2 },
        { id: 'models', text: '模型与规格', level: 2 },
        { id: 'cases', text: '案例提示词库', level: 2 },
        { id: 'batch', text: '批量生成建议', level: 2 },
        { id: 'api-skill', text: '与 API / Skill 的关系', level: 2 },
        { id: 'cost', text: '成本与质量建议', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
      ]}
    >
      <Callout tone="info" title="适合非代码图片生产，也适合 API 用户先打样">
        <p>
          <a
            href={studioIntroUrl}
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 hover:text-violet-200"
          >
            agent.gpt88.cc
          </a>{' '}
          是 GPT88 的图片工作台入口。它把 <code>gpt-image-2</code>、Gemini 图片模型、
          电商图片模板和批量生成流程集中到一个可视化界面里，适合先做创意打样，再决定是否接入 API。
        </p>
      </Callout>

      <Callout tone="tip" title="gpt-image-2 API 对接与价格">
        <p>
          工作台支持 <code>gpt-image-2</code> 生图 API 对接，适合把生成结果再回流到你的代码、脚本或自动化流程。
          目前 1K / 2K / 4K 统一按每张 4 分钱说明，具体以控制台和实际计费为准。
        </p>
      </Callout>

      <h2 id="overview">入口与定位</h2>
      <p>
        GPT88 Agent 图片工作台面向电商、运营、设计和开发者。它不是传统聊天窗口，
        而是围绕图片生产任务组织的工作台：上传商品或参考图，选择生成模式，填写提示词，
        再输出可下载的主图、场景图、模特图、详情页素材或编辑结果。
      </p>
      <CodeBlock lang="text" filename="entry-points" code={ENTRY_POINTS} />

      <h2 id="scenarios">适合什么场景</h2>
      <DocTable
        headers={['场景', '典型用途', '建议']}
        rows={[
          ['电商主图', '商品居中展示、平台首图、广告首屏', '优先控制构图、背景、无文字和商品一致性。'],
          ['场景图', '家居、户外、办公室、节日氛围等生活方式图', '给出具体环境、光线、材质和目标人群。'],
          ['模特图', '服装、配饰、美妆、箱包等真人或虚拟模特展示', '明确模特姿态、肤色、年龄段、镜头距离和商品位置。'],
          ['详情页素材', '卖点图、功能解释图、材质特写、对比图', '先生成无文字底图，再用设计工具或前端排版加文案。'],
          ['背景处理', '去背景、换背景、统一素材风格', '先保留商品主体，再逐步调整背景复杂度。'],
          ['图片编辑', '局部重绘、扩图、高清增强', '用参考图锁定结构，提示词只描述要改变的区域。'],
        ]}
      />

      <h2 id="prepare">开始前准备</h2>
      <ul>
        <li>登录 GPT88 账号，并确认余额可用。</li>
        <li>如果要在代码里复用结果，先到控制台创建 API Key。</li>
        <li>准备商品图、参考图、品牌色、目标平台尺寸和不可改变的商品特征。</li>
        <li>确认图片模型权限，例如 <code>gpt-image-2</code>、<code>gpt-image-1</code> 或 Gemini 图片模型。</li>
      </ul>

      <h2 id="workflow">推荐工作流</h2>
      <p>
        图片工作台最稳的用法是“先单张验证，再放大或批量”。不要一开始就用高尺寸批量跑，
        否则提示词方向错误会直接放大成本。
      </p>
      <CodeBlock lang="text" filename="agent-image-workflow" code={WORKFLOW} />
      <p>一个适合电商主图的提示词骨架：</p>
      <CodeBlock lang="text" filename="prompt-template" code={PROMPT_TEMPLATE} />

      <h2 id="modes">模式说明</h2>
      <DocTable
        headers={['模式', '用途', '输入建议']}
        rows={[
          [<code>main</code>, '电商主图、商品首图、营销首屏', '商品图、白底图、品牌调性、目标平台比例。'],
          [<code>scene</code>, '商品场景图、生活方式图、氛围图', '商品图、目标场景、光线、材质和镜头语言。'],
          [<code>model</code>, '模特展示图、穿搭图、美妆试用图', '商品图、模特描述、姿势、构图和禁改要求。'],
          [<code>detail</code>, '详情页素材、卖点解释图、局部特写', '商品卖点、材质细节、需要强调的部位。'],
          [<code>remove-background</code>, '去背景、抠商品、生成透明或纯色背景素材', '清晰主体图，避免主体边缘过糊。'],
          [<code>background</code>, '换背景、统一店铺视觉', '商品图和新背景描述。'],
          [<code>inpaint</code>, '局部重绘、修复瑕疵、替换区域', '原图、需要修改的区域和不应改变的区域。'],
          [<code>extend</code>, '扩图、补边、适配横竖版尺寸', '原图、目标比例和边缘延展方向。'],
          [<code>upscale</code>, '高清增强、放大出图', '已确认质量的成品图。'],
        ]}
      />

      <h2 id="models">模型与规格</h2>
      <p>
        图片工作台会按账号权限展示可用模型。常见模型包括 OpenAI 图片模型
        <code>gpt-image-2</code> / <code>gpt-image-1</code>，以及 Gemini 图片模型。
        实际可用列表以控制台和工作台展示为准。
      </p>
      <p>
        如果你要做的是稳定生图接入，优先用 <code>gpt-image-2</code> 作为 API 对接模型；
        如果你要的是直接在浏览器里出图打样，优先用 <code>agent.gpt88.cc</code>。
      </p>
      <ul>
        <li>常用尺寸：<code>1K</code>、<code>2K</code>、<code>4K</code>。</li>
        <li>常用比例：<code>1:1</code>、<code>3:4</code>、<code>4:3</code>、<code>2:3</code>、<code>3:2</code>、<code>9:16</code>、<code>16:9</code>、<code>4:7</code>。</li>
        <li>常用格式：<code>png</code>、<code>webp</code>、<code>jpeg</code>。</li>
        <li>质量选项通常包括 <code>auto</code>、<code>high</code>、<code>medium</code>、<code>low</code>。</li>
      </ul>

      <h2 id="cases">案例提示词库</h2>
      <p>
        如果不知道怎么写提示词，先进入案例提示词库。它适合从已有案例中复制结构化提示词，
        再替换商品、场景、风格和尺寸。更稳的做法是先选一个接近目标的案例，
        生成一张类似图，再逐步收紧约束。
      </p>
      <ul>
        <li>用案例库学习提示词结构，而不是直接照抄所有描述。</li>
        <li>保留“无文字、无水印、无 logo、不改变商品结构”等限制词。</li>
        <li>对电商图，优先描述商品一致性、背景、光线和构图。</li>
        <li>对社交媒体图，优先描述情绪、视觉冲击力和标题留白区域。</li>
      </ul>

      <h2 id="batch">批量生成建议</h2>
      <p>
        批量生成适合“同一个商品，多平台、多比例、多风格”的任务。批量前必须先用单张样图验证，
        否则会把错误提示词复制到所有图片里。
      </p>
      <CodeBlock lang="text" filename="batch-checklist" code={BATCH_CHECKLIST} />

      <h2 id="api-skill">与 API / Skill 的关系</h2>
      <DocTable
        headers={['需求', '推荐入口', '说明']}
        rows={[
          ['手动做图、快速打样', <a href={studioRelatedUrl} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">打开 Agent 图片工作台</a>, '直接使用图片工作台，适合运营和设计。'],
          ['代码调用图片生成', <Link to="/docs/api/images/">图片生成 API</Link>, 'OpenAI gpt-image-2 与 Gemini 图片 API 的官方接口说明。'],
          ['Codex 自动生成图片文件', <Link to="/docs/guides/codex-gpt-image-2-skill/">Codex gpt-image-2 Skill</Link>, '适合让 Codex 在项目里直接生成封面、海报和素材。'],
          ['模型能力与接口路径', <Link to="/models/">模型导航</Link>, '查看模型 ID、分类、供应商和接口路径。'],
        ]}
      />

      <h2 id="cost">成本与质量建议</h2>
      <ul>
        <li>先用低尺寸和单张确认方向，再提升到 2K / 4K；当前 1K / 2K / 4K 统一按每张 4 分钱说明。</li>
        <li>不要把“写文案”和“生成图片”混在一张图里，先生成无文字底图，后期再排版。</li>
        <li>商品一致性比风格更重要，电商图要明确“不改变瓶身、包装、颜色、Logo 位置”。</li>
        <li>批量生成前先人工确认 prompts 清单，避免重复生成无效图片。</li>
        <li>生成后到控制台核对用量，形成适合自己业务的单图成本预估。</li>
      </ul>

      <h2 id="faq">常见问题</h2>
      <DocTable
        headers={['问题', '处理方式']}
        rows={[
          ['打不开图片工作台', '先确认是否已登录 GPT88；如果仍不可用，尝试刷新、换浏览器或检查账号权限。'],
          ['看不到某个图片模型', '模型权限或线路可能未开放，以控制台和工作台实际展示为准。'],
          ['生成失败或返回空图', '降低尺寸、换比例、缩短提示词，或换模型重试；如果持续失败，保留任务参数和时间点用于排查。'],
          ['图片不符合商品', '增加参考图，并在提示词中明确不可改变的商品结构、颜色、材质和包装。'],
          ['成本偏高', '先用 1K / 单张测试，确认后再批量；避免反复用高尺寸探索方向。'],
        ]}
      />
    </DocPage>
  )
}
