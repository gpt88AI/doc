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
