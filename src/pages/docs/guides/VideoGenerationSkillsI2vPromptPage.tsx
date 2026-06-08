import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const CORE_RULES = `图生视频三条硬规则：
1. 首帧已定风格，提示词只写运动和变化
2. 一条提示词只保留一种主导逻辑
3. 多动作必须写成时间线，不要一锅炖`

const BAD_EXAMPLE = `错误写法：
电影级光影，8K，超写实，女孩站在雪地里慢慢转身看向镜头，
同时镜头高速环绕，头发随风飞舞，天空乌云翻滚，氛围非常高级梦幻`

const GOOD_EXAMPLE = `更稳的写法：
0-2s：女孩站在雪地里，肩膀轻微起伏，目光仍然看向远处
2-4s：她缓缓转身，视线自然落向镜头，寒风扬起发丝和衣角
4-5s：镜头轻微推近，停在半身近景`

const ACTION_TEMPLATE = `写法骨架：
[主导动作]
[运镜方式]
[从 0 到 n 秒的状态变化]

例如：
主角缓慢抬头，先停顿，再向前迈出一步。
固定机位，轻微推近。
0-2s 低头静止，2-4s 抬头呼吸，4-5s 迈步。`

const ANCHOR_TEMPLATE = `动作锚点法：
Anchor：躯干或重心主动作
Satellite：手部、头部、衣角、表情跟随变化

例如：
Anchor：人物向前迈步并转身
Satellite：发丝被风扬起，手指轻微收紧，眼神随后转向镜头`

const CASE_BREAKDOWN = `案例：校园少女回头镜头
首帧：少女站在教室窗边，逆光暖色，半身构图

错误写法：
少女突然转身看向镜头，镜头快速环绕，头发飞舞，阳光更强，情绪梦幻，电影级

正确拆法：
0-2s：少女维持原站姿，肩膀轻微起伏，视线还在窗外
2-4s：她缓缓转头，目光自然移向镜头，发丝被微风带起
4-5s：镜头轻微推近，停在面部和肩线之间`

const SHOT_TEMPLATE = `单镜头输出模板：
## 首帧职责
- 锁定人物、场景、光线、色调

## 视频提示词
- 主导动作：
- 运镜方式：
- 时间线：

## 生成约束
- 不改首帧风格
- 不加额外人物
- 不重做背景结构`

const ERROR_MAP = `问题 -> 处理方式
人物动作像抽搐 -> 删掉多余动词，只保留一个主动作
镜头很乱 -> 只留一种运镜，不要再写环绕 + 推进 + 手持
表情假 -> 改成呼吸、停顿、视线转移、肩膀起伏
背景变了 -> 删除风格词和环境词，只保留动作变化
片段太空 -> 给动作加前后状态，而不是堆形容词`

const WORKFLOW = `推荐执行顺序：
1. 先确认首帧静态图已经稳定
2. 先写 1 个主动作，不先写情绪判断
3. 如果动作超过 2 个，改成时间线
4. 如果涉及全身联动，先写锚点动作
5. 每镜只生成 3 到 5 秒
6. 不稳定就回到首帧修，不要一直追加视频提示词`

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

export default function VideoGenerationSkillsI2vPromptPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-i2v-prompt"
      title="图生视频提示词专题"
      description="基于 video-generation-skills 的 prompt-director 模块，详细讲清图生视频提示词怎么写，怎样避免动作混乱、运镜冲突和 AI 味过重。"
      headings={[
        { id: 'why', text: '为什么图生视频最容易写废', level: 2 },
        { id: 'rules', text: '三条硬规则', level: 2 },
        { id: 'timeline', text: '时间线写法', level: 2 },
        { id: 'anchor', text: '动作锚点法', level: 2 },
        { id: 'case', text: '案例拆解', level: 2 },
        { id: 'template', text: '单镜头模板', level: 2 },
        { id: 'mistakes', text: '最常见的错误', level: 2 },
        { id: 'workflow', text: '推荐工作流', level: 2 },
      ]}
    >
      <Callout tone="info" title="图生视频不是重写首帧">
        <p>
          首帧已经包含了光线、材质、色调、景别和主体外观。进入图生视频阶段后，提示词的职责只剩下
          “接下来会发生什么”，而不是再把整张图描述一遍。
        </p>
      </Callout>

      <h2 id="why">为什么图生视频最容易写废</h2>
      <p>
        很多失败案例都不是模型能力不够，而是提示词职责混乱。用户把静态图阶段的风格词、渲染词、
        画质词重新抄进视频提示词里，结果模型一边想保留首帧，一边又被要求重做风格，最后动作和镜头都会漂。
      </p>

      <h2 id="rules">三条硬规则</h2>
      <CodeBlock lang="text" filename="i2v-rules" code={CORE_RULES} />
      <p>对比一下最典型的错误写法和更稳的写法：</p>
      <CodeBlock lang="text" filename="bad-i2v-example" code={BAD_EXAMPLE} />
      <CodeBlock lang="text" filename="good-i2v-example" code={GOOD_EXAMPLE} />

      <h2 id="timeline">时间线写法</h2>
      <p>
        当一个镜头里出现两个以上动作时，就不要继续写自然语言长句，而应该切成时间线。
        时间线的目的不是显得专业，而是让模型知道动作顺序。
      </p>
      <CodeBlock lang="text" filename="action-template" code={ACTION_TEMPLATE} />
      <DetailBlock
        title="什么时候必须改写成时间线"
        intro="只要镜头里既有主体动作，又有镜头变化，再加上一个次级动作，就已经该拆时间线了。"
        bullets={[
          '人物从静止到转头，再到迈步，这已经是三个状态。',
          '镜头先固定、后推进，也属于时间顺序变化。',
          '如果还有风、衣角、头发、视线变化，就更不能继续写成长句。',
        ]}
      />
      <ul>
        <li>如果角色只需要轻微转头、抬手、呼吸变化，3 到 5 秒就够了。</li>
        <li>如果一个镜头需要奔跑、回头、停步、开门，通常应该拆成两个镜头。</li>
        <li>时间线里尽量只保留肉眼可见的变化，不要写抽象情绪判断。</li>
      </ul>

      <h2 id="anchor">动作锚点法</h2>
      <p>
        video-generation-skills 里一个很实用的思路是锚点动作。复杂动作时，不要让全身部位同时成为主语，
        而是先确定一个主动作，再让其他细节跟随。
      </p>
      <CodeBlock lang="text" filename="anchor-template" code={ANCHOR_TEMPLATE} />
      <ul>
        <li>奔跑、跳跃、转身、坐下、起身，通常由躯干和重心作为锚点。</li>
        <li>头发、衣角、手指、眼神和表情更适合做从属变化。</li>
        <li>如果主次不分，模型容易把每个部位都做成“各玩各的”。</li>
      </ul>

      <h2 id="case">案例拆解</h2>
      <p>
        下面这个例子基本覆盖了最常见的图生视频错误。问题不在模型，而在于用户同时要求“改风格、改镜头、改动作、改情绪”。
      </p>
      <CodeBlock lang="text" filename="i2v-case-breakdown" code={CASE_BREAKDOWN} />

      <h2 id="template">单镜头模板</h2>
      <CodeBlock lang="text" filename="i2v-shot-template" code={SHOT_TEMPLATE} />
      <CodeBlock lang="text" filename="i2v-error-map" code={ERROR_MAP} />

      <h2 id="mistakes">最常见的错误</h2>
      <ul>
        <li>把“8K、电影级、超写实、梦幻氛围”继续塞进视频提示词。</li>
        <li>同时要求强手持、平滑推进、360 环绕，运镜逻辑互相冲突。</li>
        <li>一条提示词里要求角色跑、跳、摔倒、抬头、说话、转身。</li>
        <li>首帧是日系自然光，视频提示词却强行改成赛博朋克高对比。</li>
      </ul>

      <h2 id="workflow">推荐工作流</h2>
      <CodeBlock lang="text" filename="i2v-workflow" code={WORKFLOW} />
      <p>
        更稳的流程通常是：先做关键帧，确认角色和场景，再写单镜头动作提示词。如果你还没把静态图锁稳，
        先回到 <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director 总教程</Link>
        或 <Link to="/docs/guides/video-generation-skills-scene-consistency/">场景一致性专题</Link>。
      </p>
    </DocPage>
  )
}
