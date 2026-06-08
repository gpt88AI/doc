import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const MODES = `Narrative 轨道
- 短剧 / 漫剧 / 短片
- 重点：故事、人物、场景、分镜节奏

Production 轨道
- 一致性 / 故事板 / 分镜 / 复杂动作
- 重点：镜头控制、场景连续性、角色不穿帮`

const FLOW = `1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 定 Narrative 还是 Production 轨道
4. 先出分镜草案
5. 用户确认镜号
6. 打开对应 reference
7. Prompt 技法回到 prompt-director`

const ROUTING = `女频 / 古风短剧
  narrative/short-drama.md

3D 漫剧资产化
  narrative/3d-anime-drama.md

场景一致性
  narrative/scene-consistency.md

电影感 / 奇幻
  narrative/film-style.md

故事板
  production/storyboard.md

分镜 / 复杂动作
  production/shot-breakdown.md

人物 / 环境一致
  production/consistency.md

场景不穿帮
  production/scene-continuity.md`

const RULES = `1. 成片感来自体系统一，不是单镜好看
2. 故事板优先
3. 每镜一个控制点
4. 一致性问题必须单独管理
5. 废片回收不是失败，而是制片流程的一部分`

export default function VideoGenerationSkillsAiVideoDirectorPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-ai-video-director"
      title="ai-video-director 详细教程"
      description="讲清 video-generation-skills 里的 ai-video-director 如何处理短剧、漫剧、分镜、故事板、场景一致性和复杂动作视频。"
      headings={[
        { id: 'position', text: '它解决的不是单镜，而是制片问题', level: 2 },
        { id: 'modes', text: '两条轨道', level: 2 },
        { id: 'flow', text: '标准工作流', level: 2 },
        { id: 'routing', text: '内容路由', level: 2 },
        { id: 'rules', text: '制片铁律', level: 2 },
      ]}
    >
      <Callout tone="info" title="这是 4 个 skill 里最接近“导演 / 制片”思路的模块">
        <p>
          它不只是帮你写 Prompt，而是帮助你管理短剧、漫剧、故事板、一致性和复杂动作镜头，
          本质上是在做 AI 视频制片。
        </p>
      </Callout>

      <h2 id="position">它解决的不是单镜，而是制片问题</h2>
      <p>
        很多 AI 视频失败不是单个镜头不够美，而是整条片子人物变了、场景穿帮、镜头节奏断了、
        动作接不上。这个模块就是专门处理这类“成片层问题”。
      </p>

      <h2 id="modes">两条轨道</h2>
      <CodeBlock lang="text" filename="modes" code={MODES} />

      <h2 id="flow">标准工作流</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <p>
        这个流程和 <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link> 有强关联：
        它负责制片逻辑和分镜结构，真正落到 Prompt 时仍然会回到提示词底层方法论。
      </p>

      <h2 id="routing">内容路由</h2>
      <CodeBlock lang="text" filename="routing" code={ROUTING} />
      <p>
        仓库里把 narrative 和 production 拆开是很合理的。前者更偏故事和风格，
        后者更偏镜头工程和连续性控制。
      </p>

      <h2 id="rules">制片铁律</h2>
      <CodeBlock lang="text" filename="rules" code={RULES} />
      <p>
        如果你现在主要在做剧情视频，还可以结合站内的
        <Link to="/docs/guides/ai-video-storyboard-guide/"> AI 视频分镜与提示词教程</Link> 一起看。
      </p>
    </DocPage>
  )
}
