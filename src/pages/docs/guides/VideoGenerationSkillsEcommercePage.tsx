import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const FLOW = `1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 用 AskQuestion 问清品类、平台、输入素材
4. 输出工作流草案
5. 打开对应垂类 reference
6. 逐步输出 Prompt / 操作步骤 / 批量裂变策略`

const ROUTING = `服装
  读：references/fashion.md

3C / 数码
  读：references/3c-digital.md

美妆 / 家居 / 宠物 / 保健
  读：references/verticals.md

通用工作流
  读：references/workflows.md`

const OUTPUT = `## 电商品类 & 平台
## 输入素材
## 工作流步骤
## 每步工具 & 提示词要点
## 批量裂变策略`

const THREE_C_TOPICS = [
  '魔音音箱超写实电商产品图项目教学',
  '漫步者音箱详情页教程',
  '漫步者音箱 AI 视频教程',
  'Sora2 + 剪映商业级音箱切片流程',
  '大透视产品海报生成指南',
  '多产品商业级组合场景工作流',
  'Gemini 自动化生成 Seedance 2.0 产品 CG',
  '批量生成高转化产品卖点海报',
  '逆光剪影美学 3C 海报',
  'GPT Image 详情页 3.0 工作流',
  '泰式反转广告全流程',
  '挂脖风扇广告实战',
] as const

const FASHION_TOPICS = [
  'Sora2 图转视频铺量 TK 视频',
  'LV 手袋商业级成片',
  'AI 生成会说话的服装博主',
  '海外 Ins 买家秀工作流',
  '圣诞营销物料 5 分钟出图',
  '上传一张图生成详情页',
  '白底图生成种草视频',
  'Keevx 电商服装视频实测',
  '黑底闪光灯服装大片',
  '版型 + 纹样自由组合',
  '人货场自动化生成',
  '单品图批量生成 Lookbook',
  'Ins 风平铺穿搭',
  '0 成本量产服装主图',
  '批量制作 Plog 图文',
  '素人种草视频自动生成',
  '白底图裂变 10 条广告片',
  '单品裂变生活方式视频',
  'AI 美妆 UGC',
  '低头杀 + 对镜拍素材',
  '一张图裂变 9 种户外场景',
  'Nike x Super-i 商业概念短片',
  '连贯真实口播视频',
  '冲锋衣详情页全流程',
  '服装营销全链路 UGC',
  '黑衣人赛博试衣',
  '即梦 Seedance 2.0 变装视频',
  'Seedance 2.0 服装视频 5 风格',
  'Lovart 对话流复刻穿搭海报',
  '复刻爆款 UGC 对镜自拍',
  'AI 视频复刻 TVC 与 UGC',
  '三张图生成服装工厂宣传视频',
] as const

const VERTICAL_TOPICS = [
  '电商业 AI 模特图',
  'Nano Banana 电商模特',
  'Nano Banana 场景适配',
  '保健品多语种口播',
  '保健品虚拟主播带货',
  '保健品功效视频',
  '官网宣传图制作全流程',
  'AI 制作保健品广告',
  '保健品身材延时摄影宣传',
  '自动换衣 + 动态走秀',
  '跨境电商 AI 场景图',
  '收腹裤 TikTok 爆款视频',
  '家居官方级宣传图',
  '美妆情人节营销大片',
  '宠物品牌全案',
] as const

const WORKFLOW_TOPICS = [
  'AI 宠物带货视频三步工作流',
  '爆款短视频裂变教程',
  '亚马逊产品头图全流程',
] as const

function TopicList({
  title,
  topics,
}: {
  title: string
  topics: readonly string[]
}) {
  return (
    <section className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
      <h3 className="text-base font-semibold text-ink-50">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-200">
        {topics.map(topic => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </section>
  )
}

export default function VideoGenerationSkillsEcommercePage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-ecommerce"
      title="ecommerce 详细教程"
      description="讲清 video-generation-skills 里的 ecommerce skill 如何处理电商主图、详情页、UGC、种草视频，以及服装、3C、美妆等垂类素材工作流。"
      headings={[
        { id: 'position', text: '它解决什么问题', level: 2 },
        { id: 'flow', text: '标准工作流', level: 2 },
        { id: 'verticals', text: '垂类路由', level: 2 },
        { id: 'topics', text: '教程目录', level: 2 },
        { id: 'boundaries', text: '与其他 skill 的边界', level: 2 },
        { id: 'output', text: '推荐输出结构', level: 2 },
      ]}
    >
      <Callout tone="info" title="ecommerce 不只是出图，它强调工作流">
        <p>
          仓库给它的定义不是“电商提示词集合”，而是“AI 电商素材工作流”。重点在于从产品图走到主图、
          详情页、种草视频，而不是单独一张图。
        </p>
      </Callout>

      <h2 id="position">它解决什么问题</h2>
      <p>
        这个模块面向服装、3C/数码、美妆、家居、宠物等电商场景，覆盖详情页、主图、lookbook、
        UGC 种草视频、TikTok / Ins 内容和批量素材生成。它的优势不是“审美更高级”，而是更懂转化和平台适配。
      </p>

      <h2 id="flow">标准工作流</h2>
      <CodeBlock lang="text" filename="ecommerce-flow" code={FLOW} />
      <p>
        仓库里把“品类 / 平台 / 输入素材未说明时必须先 AskQuestion”写成了硬性规则，这一点非常对。
        电商素材如果不知道是淘宝、亚马逊还是 TK Shop，不知道是服装还是耳机，提示词方向会直接错位。
      </p>

      <h2 id="verticals">垂类路由</h2>
      <CodeBlock lang="text" filename="vertical-routing" code={ROUTING} />
      <p>
        这意味着它不是一套“大一统电商 Prompt”，而是按垂类拆不同 reference。服装和 3C 的卖点表达、
        构图、材质细节和人群氛围差别很大，所以分开是合理的。
      </p>

      <h2 id="topics">教程目录</h2>
      <p>这个模块的原始索引里已经把覆盖主题按垂类列出来了，下面直接整理进文档：</p>
      <TopicList title="3C / 数码（12）" topics={THREE_C_TOPICS} />
      <TopicList title="服装（32）" topics={FASHION_TOPICS} />
      <TopicList title="美妆 / 家居 / 宠物 / 保健（15）" topics={VERTICAL_TOPICS} />
      <TopicList title="通用工作流（3）" topics={WORKFLOW_TOPICS} />

      <h2 id="boundaries">与其他 skill 的边界</h2>
      <ul>
        <li>如果你做的是大牌 TVC 或高端品牌感大片，应该看 <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>。</li>
        <li>如果你做的是剧情短片、人物连续叙事，应该看 <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>。</li>
        <li>如果你只是要学习提示词理论，而不是电商工作流，应该看 <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>。</li>
      </ul>

      <h2 id="output">推荐输出结构</h2>
      <CodeBlock lang="text" filename="ecommerce-output" code={OUTPUT} />
    </DocPage>
  )
}
