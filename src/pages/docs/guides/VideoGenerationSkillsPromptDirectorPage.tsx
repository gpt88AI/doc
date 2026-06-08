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

const GATES = `必须先确认：
- output_type：图片 / 视频
- aspect_ratio：16:9 / 9:16 / 1:1
- target_tool：MJ / GPT Image / Gemini / Seedance / 可灵
- visual_style：写实 / 日系 / 国风 / 商业广告 / 纪录片
- camera_tone：纪实 / 电影感 / 情绪化 / 静物产品
- shot_granularity：直接出 Prompt 还是先出分镜草案`

const PROMPT_SKELETON = `1. 摄影机位置 / 景别 / 焦段
2. 光线与时间
3. 环境空间与前中后景
4. 主体动作或状态变化
5. 局部关键细节
6. 负向限制 / 排除词`

const VIDEO_RULES = `图生视频只写三类内容：
- 主导动作
- 运镜方式
- 时间线变化

不要再重复写：
- 8K / 电影级 / 超写实
- 首帧已经存在的光影和风格
- 互相冲突的运镜指令`

const DEBUG_CHECKLIST = [
  '表情假：把“大笑、愤怒、悲伤”改成微量情绪 + 生理动作链。',
  '运镜假：只保留一种主导逻辑，不要同时写平滑推进和强手持。',
  '场景漂：先做空间母版，再拆镜头，不要每镜重新文生场景。',
  '产品崩：拆成关键帧重绘，再把关键帧序列送回视频模型。',
  '光影脏：保留构图好的废片，当参考图修动作，不要整张重抽。',
] as const

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
        { id: 'chapters', text: '章节精华', level: 2 },
        { id: 'video', text: '图生视频写法', level: 2 },
        { id: 'debug', text: '排错与废片回收', level: 2 },
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
      <CodeBlock lang="text" filename="confirmation-gates" code={GATES} />
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

      <h2 id="chapters">章节精华</h2>
      <p>
        下面这部分不是目录复述，而是把 reference 里的核心方法重新整理成实际可用的规则。你可以把它当成
        prompt-director 的速查版手册。
      </p>
      <DetailBlock
        title="构图、机位与焦段"
        intro="camera-movement.md 和 composition.md 的共同结论是：角度和焦段必须成对写，情绪来自镜头语言，不是形容词堆砌。"
        bullets={[
          '纪实真实：平视 + 35mm / 50mm，保留空间关系，不要盲目上浅景深。',
          '商业人像：低角度 + 85mm，人会更挺拔，但前提是主体动作清楚。',
          '压迫感不要混写：要么广角畸变仰拍，要么长焦压缩，不要两者一起塞。',
          '去摆拍感的办法不是乱晃，而是“不完整起幅 + 延迟跟随 + 轻微手持误差”。',
        ]}
      />
      <DetailBlock
        title="提示词精度控制"
        intro="prompt-precision.md 讲的是如何减少 AI 自动脑补。核心是把抽象词拆成可见约束，并用负向限制收口。"
        bullets={[
          '不要写 dreamy、high-end、texture 这种抽象词，改写成光线方向、色温、构图和景深。',
          '先写主体与基础光线，再上氛围词；不要一上来写 8K、超写实、电影级。',
          '负向词要按问题分组：脏感、塑料感、假光分别剪，不要只写一个 bad。',
          '想降低 AI 味，可以轻度破坏鲁棒性：off-center framing、uneven lighting、slight color drift。',
        ]}
      />
      <DetailBlock
        title="角色表演与活人感"
        intro="character-performance.md 的重点不是“让角色更会演”，而是避免角色像静态蜡像。"
        bullets={[
          '大情绪要降维：把“开心大笑”改成 faint smile、短暂停顿、呼吸变化、视线躲闪。',
          '表情一定要有动作动机，例如先闻咖啡蒸汽，再轻闭眼，再嘴角变化。',
          '视频里写 Start → Transition → End，模型更容易理解情绪过程。',
          '多人互动不要只写“对视”，要写谁先动、谁回应、谁保持不动。',
        ]}
      />
      <DetailBlock
        title="一致性与空间逻辑"
        intro="consistency.md 解决的是“单张好看但连不成片”的问题。人物、场景、站位、比例都要单独管理。"
        bullets={[
          '人物先做三视图资产包，不要只靠一句“一个黑发女孩”。',
          '场景先做母版：九宫格、全景图、空镜底图任选一种，再拆镜头。',
          '多人站位最好用底图框选或箭头标注，纯文字说左边右边不稳定。',
          '图生图里人物大小优先靠选框控制，提示词只做语义补充。',
        ]}
      />
      <DetailBlock
        title="调色与风格锁定"
        intro="color-grading.md 和 style-prompts.md 的方法很实用：先提取色彩 DNA，再把颜色控制前移。"
        bullets={[
          '系列视觉优先建 HEX 色卡，再写主体和动作，别让每张图重新猜色系。',
          '图生视频阶段不要再重写冷暖和胶片词，首帧已经决定色彩系统。',
          '风格词不要和写实词互相打架，例如梦核 + perfect skin 往往会变油腻。',
          '大师风格更适合拆“镜头逻辑”，不适合简单写成某导演风格。',
        ]}
      />

      <h2 id="video">图生视频写法</h2>
      <p>
        prompt-director 里最容易被误用的部分就是 <code>video-prompt.md</code>。它的原则非常克制：
        图生视频提示词不是重写整张图，而是只补“图里还没发生”的变化。
      </p>
      <CodeBlock lang="text" filename="video-rules" code={VIDEO_RULES} />
      <p>推荐按这个骨架写：</p>
      <CodeBlock lang="text" filename="prompt-skeleton" code={PROMPT_SKELETON} />

      <h2 id="debug">排错与废片回收</h2>
      <p>
        废片补救、局部重绘和 prompt debug 是这个模块非常有价值的部分。它的思路不是“错了就重来”，
        而是尽量保住已经对的构图、光影和色彩。
      </p>
      <ul>
        {DEBUG_CHECKLIST.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        如果你现在最需要的是图生视频阶段的具体写法，可以直接看
        <Link to="/docs/guides/video-generation-skills-i2v-prompt/"> 图生视频提示词专题</Link>。
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
