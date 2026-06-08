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

const REFERENCE_INDEX = [
  ['composition.md', '§1 / §9 / §26 / §39', '构图、伪透视、负空间、前景遮挡'],
  ['lighting.md', '§2 / §20 / §25 / §47', '光线方向、室内光、天气光、光影重构'],
  ['camera-movement.md', '§3 / §21 / §33 / §36 / §41', '相机角度、运镜、情绪镜头、空间感'],
  ['candid-capture.md', '§4', '纪实抓拍与媒介锁定'],
  ['prompt-precision.md', '§5-8 / §10 / §12', '禁止词、扰动词、剪词、鲁棒性、特征塌陷'],
  ['time-causality.md', '§11 / §13', '时间态与假因果'],
  ['json-and-reverse.md', '§14-16 / §19 / §22 / §27 / §31 / §52', 'JSON 生图、反推、参考图降维、画面结构拆解'],
  ['style-prompts.md', '§17 / §18', '风格提取与 MJ 人像去油腻'],
  ['video-prompt.md', '§28 / §50 / §54', '图生视频、动作状态流、人物动作自然'],
  ['color-grading.md', '§23 / §38', '数据驱动调色、HEX 调色法'],
  ['consistency.md', '§24 / §37 / §40 / §43 / §45 / §46', '视频一致性、多角色、产品一致性、站位与比例'],
  ['atmosphere.md', '§32', '氛围三底层'],
  ['waste-recovery.md', '§30', '废片补救'],
  ['director-storyboard.md', '§34 / §35 / §57', '导演思维、故事板、成片调度'],
  ['edit-fusion.md', '§42 / §44', '局部融合与视觉标注修正'],
  ['character-performance.md', '§29 / §48-49 / §51 / §53 / §55', '微表情、语气、活人感、行为动机、妆造'],
] as const

const WORKFLOW_INDEX = [
  ['confirmation-gates.md', '收集画幅、工具、风格、镜头密度和镜号确认'],
  ['debug-prompt.md', '已有 Prompt 效果不对时的诊断路径'],
  ['narrative-to-prompt.md', '把叙事内容转成分镜 Prompt 的主流程'],
] as const

function IndexTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: readonly (readonly string[])[]
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
          {rows.map((row, i) => (
            <tr
              key={row.join('-')}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {row.map(cell => (
                <td key={cell} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
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
        { id: 'topics', text: '教程目录', level: 2 },
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

      <h2 id="topics">教程目录</h2>
      <p>
        这个模块在仓库里不是按原始教程标题一篇篇展开，而是按技法主题聚合到 reference 文件里。
        下面这张表就是 prompt-director 在站内应覆盖的完整主题目录。
      </p>
      <IndexTable headers={['reference', '覆盖章节', '主题']} rows={REFERENCE_INDEX} />
      <p>工作流文件单独负责创作流程：</p>
      <IndexTable headers={['workflow', '作用']} rows={WORKFLOW_INDEX} />

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
