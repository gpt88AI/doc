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
