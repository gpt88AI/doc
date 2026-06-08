import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const FLOW = `1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 输出视觉策略 + 分镜 / 关键帧草案
4. 用户确认方向
5. 按类型打开 1-2 个 reference
6. Prompt 技法回到 prompt-director`

const ROUTING = `产品 CG
  references/product-cg.md

TVC / 品牌广告
  references/tvc-ads.md

风格美学
  references/brand-aesthetics.md

品牌体系
  references/brand-system.md

创意 MV / 非标准广告
  references/creative-ads.md`

const BRAND_AESTHETICS_TOPICS = [
  '全息点阵风格',
  '幻想梦境风格',
  '迷幻风格',
  '独特摄影风格',
  '韦斯安德森风格',
  '迷幻摄影风格',
  '梦幻彩色风格',
  'Y2K 风格',
  '哈吉克汉堡创意宣传视频',
  'Dior 精华乳高级丝滑感视频',
  'iPhone 宣传视频',
  '尊界 S800 广告视频',
  'Nike 运动鞋 CG 广告',
  '保时捷广告',
  'YSL 口红广告大片',
  '美妆宣传视频',
  '粉底液大片',
  '力量感 Banner',
  '精华 CG 大片',
  'Nike 爆款视频',
  '古驰广告 TikTok 全流程',
  '梦核视频',
  '漫画风视觉形象',
  '工业产品 Banner 标准化流程',
  '咖啡品牌宣传广告',
  '剪贴画风格创作',
  '荒诞无尽夏',
  '十字绣动画',
  '90s 千禧风大片',
  'Rotoscope 涂鸦特效',
  'Riso 印刷设计感',
  '21 种排版',
  '黄金时刻视频处理',
  '横屏转竖屏',
  'Higgsfield 情绪板',
  'GPT Image 2.0 + Seedance 2.0 进阶全案',
] as const

const BRAND_SYSTEM_TOPICS = [
  '科技类 logo 动效',
  'AI 去品牌化处理',
  'AI 速成品牌故事',
  '美妆品牌 Logo 升级',
  '美妆包装升级',
  'MIDI 键盘宣传片',
  '一张图搭建完整品牌体系',
] as const

const CREATIVE_ADS_TOPICS = [
  '美妆爆品宣传片',
  '摩托头盔创意视频',
  '古今名人夸爆手机创意视频',
  '奶油品牌创意视频',
  '篮球创意大片',
  '网球创意视频',
  '婚礼动漫 MV',
  '3D 跑酷爽片',
  '城市宣传片',
  '数码产品爆炸图视频',
  '猫咪 Vlog',
  'K-pop 女团舞蹈 MV',
  '150s 人文科技宣传片',
  '丧尸清道夫复刻',
  '企业宣传片完整流程',
] as const

const PRODUCT_CG_TOPICS = [
  'DNA 链动效',
  '水果饮料宣传视频',
  'AI 产品宣传页',
  '洗面奶泡沫表现',
  'LTX 多角度模特',
  'AI 产品宣传视频',
  '创意植物生长视频',
  '儿童模特海报',
  '科技感冲锋衣',
  'AI 场景图',
  '时尚单品动态广告',
  '创意衬衫广告',
  '3C 类广告宣传视频',
  '游戏手柄产品 CG',
  '耳机宣传视频',
  '游戏鼠标产品 CG',
  'iMac CG 视觉',
  '手机壳高级 CG 视频',
  '证件照生成',
  '羊毛毡微型品宣动画',
  '商业级音箱 CG 视频',
  '小米 15 Ultra 大片',
  '服装马年广告大片',
  '阿迪达斯鞋子 CG',
  '小米 SU7 圣托里尼大片',
] as const

const TVC_TOPICS = [
  '扫地机器人 TVC',
  '仰望 U8 汽车 TVC',
  '宝矿力蓝色青春广告',
  'TVC 与 UGC 复刻全攻略',
] as const

const GATES = `品牌广告开工前先锁定：
- project_type：product_cg / tvc / brand_film / creative_mv / logo_motion
- brand_tone：tech / luxury / youth / guofeng / playful / minimal
- reference：具体品牌参考 or 只有情绪板
- product：汽车 / 3C / 美妆 / 时尚 / 食品
- format：16:9、9:16、Banner 或仅关键帧
- look：纯 CG / 写实 / 实拍感增强`

const PLAYBOOK = `推荐流程：
1. 先出视觉策略，不先写长 Prompt
2. 先定关键帧，再做分镜段落
3. 产品、场景、人物分别锚定
4. 运动镜头交给视频模型，材质与品牌色交给静帧
5. 最后才做音效、剪辑和节奏强化`

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

export default function VideoGenerationSkillsBrandAdCgPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-brand-ad-cg"
      title="brand-ad-cg 详细教程"
      description="讲清 video-generation-skills 里的 brand-ad-cg skill 如何处理品牌广告、TVC、产品 CG、大牌既视感和风格化商业视觉。"
      headings={[
        { id: 'position', text: '它的定位', level: 2 },
        { id: 'flow', text: '创作流程', level: 2 },
        { id: 'routing', text: '内容路由', level: 2 },
        { id: 'topics', text: '教程目录', level: 2 },
        { id: 'chapters', text: '章节精华', level: 2 },
        { id: 'boundary', text: '它和 ecommerce 的区别', level: 2 },
      ]}
    >
      <Callout tone="info" title="brand-ad-cg 追求的是品牌势能，不是铺量转化">
        <p>
          仓库把这个 skill 定义成“品牌营销 / 广告 / CG”，说明它优先服务的是品牌调性、
          高级感和视觉记忆点，而不是电商详情页的转化效率。
        </p>
      </Callout>

      <h2 id="position">它的定位</h2>
      <p>
        如果你的目标是“像大牌广告”“像耳机 TVC”“像产品 CG 大片”“像高端香氛或汽车广告”，
        那它比电商模块更合适。因为它的重点不是把卖点讲明白，而是先把品牌气质建立起来。
      </p>

      <h2 id="flow">创作流程</h2>
      <CodeBlock lang="text" filename="brand-flow" code={FLOW} />
      <CodeBlock lang="text" filename="brand-gates" code={GATES} />
      <CodeBlock lang="text" filename="brand-playbook" code={PLAYBOOK} />
      <p>
        这里最关键的是“先出视觉策略 + 分镜 / 关键帧草案，再出 Prompt”。这比直接写一大段提示词稳定得多，
        也更符合品牌广告创作逻辑。
      </p>

      <h2 id="routing">内容路由</h2>
      <CodeBlock lang="text" filename="brand-routing" code={ROUTING} />
      <p>
        也就是说，这个 skill 其实不是一篇“品牌广告教程”，而是多个广告子场景的入口。
        产品 CG、TVC、品牌体系、风格美学，各自有不同的参考内容。
      </p>

      <h2 id="topics">教程目录</h2>
      <TopicList title="品牌美学（37）" topics={BRAND_AESTHETICS_TOPICS} />
      <TopicList title="品牌体系（7）" topics={BRAND_SYSTEM_TOPICS} />
      <TopicList title="创意广告（15）" topics={CREATIVE_ADS_TOPICS} />
      <TopicList title="产品 CG（29）" topics={PRODUCT_CG_TOPICS} />
      <TopicList title="TVC 广告（4）" topics={TVC_TOPICS} />

      <h2 id="chapters">章节精华</h2>
      <p>
        brand-ad-cg 的重点不是多几种风格词，而是把“品牌感”拆成不同制片模块。下面这些内容已经覆盖了仓库里最有用的操作逻辑。
      </p>
      <DetailBlock
        title="品牌美学：先定视觉工艺，再定主体"
        intro="brand-aesthetics.md 里最有价值的是它把风格拆成可执行工艺，例如 Riso、Y2K、梦核、韦斯安德森，而不是抽象审美词。"
        bullets={[
          'Riso、剪贴画、十字绣、Rotoscope 这类风格，先写工艺特征，再写主体，不要后期靠滤镜硬套。',
          'Higgsfield 情绪板、多张风格参考图比一大段风格形容词更稳定。',
          '品牌大片里，黄金时刻、横转竖、电影级镜头不是附加项，而是制片阶段的一部分。',
          '大牌风格参考适合借镜头和质感，不适合原封不动照抄文案与剧情。',
        ]}
      />
      <DetailBlock
        title="品牌体系：Logo、包装、品牌故事要分三条线做"
        intro="brand-system.md 说明，品牌体系不是一张主视觉图，而是图形、工艺、故事和动效的组合。"
        bullets={[
          'Logo 概念图适合先抽象符号，再让设计工具完成字标和落地排版。',
          '包装升级的重点是纸张、压印、烫金、留白和信息布局，不是图案复杂度。',
          '品牌故事短片适合先用 LLM 搭三幕式，再用图像模型统一关键帧。',
          '科技企业的官网 Logo 动效，优先做可循环、可衔接、可嵌首屏的短段落。',
        ]}
      />
      <DetailBlock
        title="产品 CG：静帧定材质，视频定运动"
        intro="product-cg.md 基本把商单方法讲清了。复杂产品不要期待一步成片，正确流程是关键帧重塑。"
        bullets={[
          '产品图、草图、三维白模、关键帧都可以当锚点，不必迷信纯文生图。',
          '汽车、球鞋、音箱、耳机、鼠标这些项目，最好先做一组静帧，再做每镜 3 到 5 秒动态。',
          '复杂翻转、大透视、爆炸图，更适合先导出关键帧重绘，再回送视频模型。',
          '商业交付最怕 Logo、边缘和材质漂移，所以产品一致性要独立管理。',
        ]}
      />
      <DetailBlock
        title="TVC：先写情绪与卖点，再决定镜头顺序"
        intro="tvc-ads.md 给出的方法很明确：前期脚本优先，单镜华丽其次。"
        bullets={[
          '扫地机器人这类功能型 TVC，要按空间建立、功能显现、剖视可视化、品牌落版来拆镜。',
          '饮料和青春感 TVC，核心是角色和情绪节奏，不是硬拍产品特写。',
          '汽车 TVC 必须按“幕”管理环境与地貌，否则只会变成随机车展图。',
          '爆款复刻不是一条 Prompt 复制整片，而是拆镜、换主体、重建节奏。',
        ]}
      />
      <DetailBlock
        title="创意广告：节奏和结构比画质更重要"
        intro="creative-ads.md 覆盖了企业片、MV、猫咪 Vlog、城市片、K-pop 等内容，说明这个模块能处理非标准广告。"
        bullets={[
          '企业宣传片适合按图片到成片的链式流程做，不用一开始就赌长视频。',
          '复杂动作、跑酷、舞蹈、爆炸图这类内容，要么拆分镜，要么借参考视频。',
          '婚礼动漫、宠物 Vlog、美妆爆品片，本质上都是“情绪脚本 + 节奏剪辑”。',
          '创意片最忌讳只有画面风格，没有节拍、情绪拐点和声音设计。',
        ]}
      />
      <p>
        如果你要继续深挖，优先看
        <Link to="/docs/guides/video-generation-skills-product-cg/"> 产品 CG 工作流</Link> 和
        <Link to="/docs/guides/video-generation-skills-tvc-playbook/"> TVC 广告片专题</Link>。
      </p>

      <h2 id="boundary">它和 ecommerce 的区别</h2>
      <ul>
        <li><strong>brand-ad-cg</strong>：目标是品牌势能、电影感、留白、高级视觉。</li>
        <li><strong>ecommerce</strong>：目标是主图、详情页、UGC、种草、平台转化。</li>
      </ul>
      <p>
        如果你既要品牌感，又要落地卖货，实际工作流通常是：
        先用 <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link> 定视觉，
        再用 <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link> 把素材扩成转化资产。
      </p>
    </DocPage>
  )
}
