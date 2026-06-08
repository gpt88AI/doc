import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const FLOW = `白底图裂变常用流程：
1. 先拿到干净白底图
2. 固定产品比例、材质和主视角
3. 扩成 3 到 5 张场景主图
4. 从主图衍生详情页、海报和短视频首帧
5. 再扩成 3 到 5 秒单镜头视频片段
6. 最后批量替换场景、道具和文案方向`

const PLATFORM_SPLIT = `平台差异：
淘宝 / 天猫：主图清晰、卖点强、背景克制
Amazon：结构规范、卖点模块化、对比图多
小红书 / 抖音：生活方式、代入感、人物感
TikTok Shop：短视频首帧钩子强、动作更直接`

const PROMPT_BASE = `白底图转场景图写法：
[产品主体]
[目标场景]
[光线方向]
[构图留白区]
[限制比例与材质不变]

例如：
保留原始蓝牙音箱的材质、比例和按键结构不变，
放置在暖色木质客厅边柜上，午后侧光，前景有轻微虚化绿植，
画面右侧保留文案留白区。`

const ASSET_PLAN = `同一 SKU 推荐至少做这 5 类资产：
1. 主图
2. 场景图
3. 详情页模块图
4. 广告海报
5. 短视频首帧`

const STEP_BY_STEP = `逐步执行：
第一步：白底图验收，确认轮廓、颜色、材质、清晰度
第二步：先做 3 张场景图，不先做 30 张
第三步：从 3 张里选 1 套最稳定的风格
第四步：把这套风格扩成详情页和海报
第五步：再把其中 2 到 3 张扩成短视频首帧
第六步：最后才做批量裂变`

const QC = `白底图裂变检查清单：
- 产品比例是否保持不变
- 主体边缘有没有融化
- 材质和颜色有没有跑偏
- 留白区是否足够放文案
- 场景是否在服务产品，而不是喧宾夺主
- 同一组素材的色温和构图语言是否统一`

function DetailBlock({
  title,
  intro,
  bullets,
}: {
  title: string
  intro: string
  bullets: readonly string[]
}) {
  return (
    <section className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
      <h3 className="text-base font-semibold text-ink-50">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-300">{intro}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-200">
        {bullets.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default function VideoGenerationSkillsWhiteBackgroundPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-white-background-scaling"
      title="电商白底图裂变专题"
      description="基于 video-generation-skills 的 ecommerce 模块，详细讲清如何把白底产品图扩成主图、详情页、场景图、短视频首帧和批量广告素材。"
      headings={[
        { id: 'why', text: '为什么白底图最适合裂变', level: 2 },
        { id: 'flow', text: '标准流程', level: 2 },
        { id: 'platform', text: '按平台拆素材', level: 2 },
        { id: 'prompt', text: '白底图转场景图写法', level: 2 },
        { id: 'assets', text: '推荐资产结构', level: 2 },
        { id: 'steps', text: '逐步执行', level: 2 },
        { id: 'mistakes', text: '最常见的失败点', level: 2 },
      ]}
    >
      <Callout tone="info" title="白底图不是最终素材，而是资产起点">
        <p>
          ecommerce 模块反复强调的一件事，就是把单个 SKU 做成资产池。白底图之所以重要，
          是因为它最适合当作结构锚点，方便后续批量裂变。
        </p>
      </Callout>

      <h2 id="why">为什么白底图最适合裂变</h2>
      <p>
        白底图没有复杂背景干扰，产品比例、结构、材质和颜色最容易被锁定。对于电商工作流来说，
        它是最适合做主锚点的输入素材。
      </p>

      <h2 id="flow">标准流程</h2>
      <CodeBlock lang="text" filename="white-bg-flow" code={FLOW} />
      <p>
        正确顺序通常不是“先直接生视频”，而是先扩场景静帧，再把静帧变成视频。这样主图、详情页和短视频会共享同一套视觉系统。
      </p>
      <DetailBlock
        title="为什么先做 3 张，不先做 30 张"
        intro="很多人一开始就追求批量，结果把错误风格一起批量放大。"
        bullets={[
          '先用小批量验证产品比例、光线、场景和构图是不是成立。',
          '确认一套风格稳定后，再做批量裂变，返工成本最低。',
          '如果前 3 张都不稳定，直接扩 30 张只会浪费算力和时间。',
        ]}
      />

      <h2 id="platform">按平台拆素材</h2>
      <CodeBlock lang="text" filename="platform-split" code={PLATFORM_SPLIT} />
      <ul>
        <li>同一款商品不能用一套图同时兼顾淘宝、Amazon 和小红书。</li>
        <li>转化平台更重信息清晰，内容平台更重氛围和代入感。</li>
        <li>做 TikTok 时，首帧钩子和动作感通常比静态排版更重要。</li>
      </ul>

      <h2 id="prompt">白底图转场景图写法</h2>
      <CodeBlock lang="text" filename="white-bg-prompt" code={PROMPT_BASE} />
      <p>
        白底图转场景图时，最关键的是反复强调产品结构不变。场景、光线和留白区可以改，但主体不能像被重新画了一遍。
      </p>
      <DetailBlock
        title="提示词里真正要强调什么"
        intro="白底图裂变不是写得越华丽越好，而是约束越明确越好。"
        bullets={[
          '先写保留主体结构不变，再写场景和光线。',
          '留白区要明确写出来，否则后面文案会没地方放。',
          '目标场景要足够具体，例如客厅边柜、办公桌角、床头柜，而不是泛泛的生活场景。',
          '不要同时要求太多风格，例如既要极简又要复古又要赛博。',
        ]}
      />

      <h2 id="assets">推荐资产结构</h2>
      <CodeBlock lang="text" filename="white-bg-assets" code={ASSET_PLAN} />

      <h2 id="steps">逐步执行</h2>
      <CodeBlock lang="text" filename="white-bg-steps" code={STEP_BY_STEP} />
      <CodeBlock lang="text" filename="white-bg-qc" code={QC} />

      <h2 id="mistakes">最常见的失败点</h2>
      <ul>
        <li>场景比产品更抢戏，导致主图看不清卖什么。</li>
        <li>产品尺寸漂移，放进房间后像贴纸或模型。</li>
        <li>同一批商品图的光线、色温和构图语言完全不统一。</li>
        <li>一开始就想做完整广告视频，跳过了静态场景验证。</li>
      </ul>
      <p>
        如果你接下来要把商品做成更高级的视觉大片，可以继续看
        <Link to="/docs/guides/video-generation-skills-product-cg/"> 产品 CG 专题</Link>。
      </p>
    </DocPage>
  )
}
