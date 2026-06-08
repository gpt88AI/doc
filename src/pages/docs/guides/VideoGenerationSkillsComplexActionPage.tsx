import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const LOGIC = `分镜四问：
1. 角色为什么行动
2. 角色要去哪里
3. 中途有什么阻力
4. 结果为什么成立`

const METHODS = `复杂动作两种主方法：
方法 A：12 宫格分镜法
- 适合原创动作设计

方法 B：参考视频替换法
- 适合快速拿到稳定运动节奏`

const WORKFLOW = `推荐流程：
1. 先做角色与场景设定
2. 先拆分镜，不先写长动作句
3. 确定主动作锚点
4. 用 12 宫格或参考视频锁动作顺序
5. 单镜只做一个主动作
6. 生成多个短段，再剪辑拼接`

const CASE_LOGIC = `案例：男主赶去咖啡馆见人
错误分镜：
收到消息 -> 出门 -> 走街上 -> 坐到女主对面

更完整的分镜：
收到消息 -> 看时间发现迟到 -> 快速出门 -> 路口被红灯拦住
-> 到咖啡馆门口停一下确认 -> 推门进去 -> 看到女主已经等很久 -> 坐下后冷场`

const TWELVE_GRID = `12 宫格分镜法：
1. 先定角色和场景
2. 把复杂动作拆成 12 个连续状态
3. 每格只表达一个中间姿态
4. 再把 12 格整理成 3 到 4 个可生成视频的短段
5. 每段只保留一个主动作链`

const REF_VIDEO = `参考视频替换法：
1. 找动作节奏合适的参考视频
2. 拆出关键镜头和动作节点
3. 用自己的角色、场景和风格替换主体
4. 保留原动作节奏，不重写成完全不同的运动结构
5. 生成后再做局部修正和剪辑拼接`

const TROUBLESHOOT = `复杂动作排错：
动作像抽搐 -> 一个镜头里主动作太多，删到只剩一个
角色突然飘移 -> 没有角色资产或场景锚点
镜头因果断裂 -> 缺少“为什么动、去哪、结果为什么成立”
动作虽然对但不好看 -> 先修分镜逻辑，再谈镜头美学
参考视频复刻失败 -> 你换掉了动作结构，只保留了外观`

const OUTPUT_TEMPLATE = `推荐输出：
## 剧情目标
## 分镜四问回答
## 角色 / 场景参考
## 12 宫格或参考视频方案
## 拆段视频提示词
## 剪辑拼接顺序`

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

export default function VideoGenerationSkillsComplexActionPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-complex-action-storyboard"
      title="复杂动作与分镜专题"
      description="基于 video-generation-skills 的 ai-video-director 模块，详细讲清复杂动作、分镜逻辑、12 宫格设计法和参考视频替换法。"
      headings={[
        { id: 'why', text: '为什么复杂动作最容易崩', level: 2 },
        { id: 'logic', text: '先补分镜逻辑', level: 2 },
        { id: 'methods', text: '两种动作方法', level: 2 },
        { id: 'case', text: '案例拆解', level: 2 },
        { id: 'template', text: '输出模板', level: 2 },
        { id: 'workflow', text: '推荐流程', level: 2 },
      ]}
    >
      <Callout tone="info" title="复杂动作的核心不是画面好看，而是顺序正确">
        <p>
          复杂动作失败，通常不是因为模型不会动，而是因为提示词没有给出动作因果链和主次关系。
        </p>
      </Callout>

      <h2 id="why">为什么复杂动作最容易崩</h2>
      <p>
        一旦一个镜头里同时出现奔跑、跳跃、转身、挥手、回头、说话，模型就会把多个动作揉成一团。
        正确方式不是继续加描述，而是先拆镜头和动作顺序。
      </p>

      <h2 id="logic">先补分镜逻辑</h2>
      <CodeBlock lang="text" filename="shot-logic" code={LOGIC} />
      <p>
        这四个问题解决的是镜头因果，而不是动作美学。先知道角色为什么动，再决定镜头怎么拍。
      </p>
      <DetailBlock
        title="为什么复杂动作首先是剧情工程"
        intro="多数动作崩坏都不是身体不会动，而是前后动作缺少逻辑支撑。"
        bullets={[
          '观众不知道角色为什么急，就感受不到奔跑的压力。',
          '观众不知道角色要去哪，镜头切换就只剩随机运动。',
          '观众不知道结果为什么成立，最后的情绪反应就会显得假。',
        ]}
      />

      <h2 id="methods">两种动作方法</h2>
      <CodeBlock lang="text" filename="action-methods" code={METHODS} />
      <CodeBlock lang="text" filename="twelve-grid-method" code={TWELVE_GRID} />
      <CodeBlock lang="text" filename="ref-video-method" code={REF_VIDEO} />
      <ul>
        <li>12 宫格分镜法更适合原创内容、跑酷、格斗、舞蹈和情绪动作链。</li>
        <li>参考视频替换法更适合快速复现已有节奏，但要注意版权和发布边界。</li>
      </ul>

      <h2 id="case">案例拆解</h2>
      <p>
        下面这个“赶去咖啡馆见人”的案例很典型。它说明复杂动作的问题，往往不是跑得不够像，而是中间缺了因果节点。
      </p>
      <CodeBlock lang="text" filename="complex-action-case" code={CASE_LOGIC} />
      <DetailBlock
        title="这个案例该怎么拆成视频段"
        intro="比起一条长镜到底，更稳的是拆成几段各有重点的片段。"
        bullets={[
          '第一段做“收到消息 + 看时间 + 立刻起身”。',
          '第二段做“街头赶路 + 红灯受阻”。',
          '第三段做“门口停顿 + 推门进入 + 对视冷场”。',
          '每段控制在 3 到 5 秒，再通过剪辑把压力和节奏连起来。',
        ]}
      />

      <h2 id="template">输出模板</h2>
      <CodeBlock lang="text" filename="complex-action-output" code={OUTPUT_TEMPLATE} />
      <CodeBlock lang="text" filename="complex-action-troubleshoot" code={TROUBLESHOOT} />

      <h2 id="workflow">推荐流程</h2>
      <CodeBlock lang="text" filename="complex-action-workflow" code={WORKFLOW} />
      <p>
        如果你发现问题并不在动作本身，而是在人物和空间不稳定，先回到
        场景一致性和角色资产化相关教程，把基础锚点补齐，再回来做复杂动作。
      </p>
    </DocPage>
  )
}
