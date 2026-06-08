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
