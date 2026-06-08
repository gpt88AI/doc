import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const MODES = `模式 A：创作
- 输入：小说、剧本、情节、创意 brief
- 流程：确认闸门 -> 分镜草案 -> 只对确认镜生成 Prompt

模式 B：诊断
- 输入：已有 Prompt 效果不好
- 流程：读取 debug-prompt 工作流 -> 找出问题 -> 重写 Prompt`

const FLOW = `1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 用 AskQuestion 收集画幅、工具、风格、镜头密度等未明确项
4. 输出分镜草案
5. 等用户确认镜号
6. 只对确认镜生成 Prompt
7. references 按需最多开 1-2 个`

const OUTPUT = `## creative_brief
[闸门答案 YAML]

## 分镜草案
...

## 分镜 01 - 首帧
Prompt: ...

## 分镜 01 - 视频
运动 / 时间线: ...

还可调整：
- 光线
- 构图
- 节奏`

export default function VideoGenerationSkillsPromptDirectorPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-prompt-director"
      title="prompt-director 详细教程"
      description="讲清 video-generation-skills 里的 prompt-director 怎么把小说、剧本、情节和创意 brief 转成分镜草案与 AI 图像 / 视频 Prompt。"
      headings={[
        { id: 'position', text: '它的定位是什么', level: 2 },
        { id: 'modes', text: '两种模式', level: 2 },
        { id: 'flow', text: '标准工作流', level: 2 },
        { id: 'gates', text: '为什么它强调确认闸门', level: 2 },
        { id: 'references', text: '参考内容怎么分层', level: 2 },
        { id: 'output', text: '输出长什么样', level: 2 },
      ]}
    >
      <Callout tone="info" title="prompt-director 是整个仓库的基础层">
        <p>
          其他 3 个 skill 都更像垂直场景模块，而 <code>prompt-director</code> 负责把叙事内容
          变成可执行的 Prompt 结构，所以它是整个技能包的底座。
        </p>
      </Callout>

      <h2 id="position">它的定位是什么</h2>
      <p>
        这个 skill 的仓库描述写得很直接：把小说、剧本、场景描述或创意 brief 转成 AI 图像 /
        视频 Prompt，并在设置不明确时先问问题，而不是直接猜。这个设计非常关键，
        因为很多提示词失败，并不是词不够华丽，而是一开始就没有确认画幅、工具、图还是视频、镜头密度这些基础变量。
      </p>

      <h2 id="modes">两种模式</h2>
      <CodeBlock lang="text" filename="modes" code={MODES} />

      <h2 id="flow">标准工作流</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <p>
        这套流程的重点在于：先确认，再出草案，再只生成确认镜。这样可以明显减少“我只是想试 2 个镜头，
        结果一次性给了 20 个 Prompt”的上下文浪费。
      </p>

      <h2 id="gates">为什么它强调确认闸门</h2>
      <p>
        仓库里把 <code>confirmation-gates.md</code> 放在非常靠前的位置，说明作者认为：
        用户只给“一个剧情梗概”时，不能直接帮他写最终 Prompt。必须先问清楚产出形态、画幅、工具、
        风格、镜头基调和分镜密度。
      </p>
      <ul>
        <li>用户未说明是图还是视频：必须先问。</li>
        <li>用户未说明要横屏还是竖屏：必须先问。</li>
        <li>用户只给了情节，没有镜头基调：建议先出分镜草案。</li>
      </ul>

      <h2 id="references">参考内容怎么分层</h2>
      <p>
        这个 skill 不是把所有教程一次性塞进上下文，而是分成 <code>cheatsheet</code>、
        <code>workflows</code>、<code>references</code> 三层。
      </p>
      <ul>
        <li><code>cheatsheet</code>：每次创作必读的高频规则。</li>
        <li><code>workflows</code>：叙事转 Prompt、debug Prompt 等任务流水线。</li>
        <li><code>references</code>：按主题按需打开的深度材料，例如构图、光线、镜头、一致性、视频 Prompt。</li>
      </ul>
      <p>
        这套结构很适合作为 Agent skill 的组织方式，也值得我们自己写技能时参考。
      </p>

      <h2 id="output">输出长什么样</h2>
      <CodeBlock lang="text" filename="output" code={OUTPUT} />
      <p>
        如果你主要做剧情视频，可以继续看 <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>；
        如果你主要做电商或广告图视频，也可以看
        <Link to="/docs/guides/video-generation-skills-ecommerce/"> ecommerce</Link> 和
        <Link to="/docs/guides/video-generation-skills-brand-ad-cg/"> brand-ad-cg</Link>。
      </p>
    </DocPage>
  )
}
