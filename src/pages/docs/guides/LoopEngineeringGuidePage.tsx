import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="not-prose my-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="m-0 text-base font-semibold text-ink-50">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-ink-200">{children}</div>
    </section>
  )
}

function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-5 border-l-2 border-brand-400/60 pl-4 text-base leading-7 text-ink-100">
      {children}
    </blockquote>
  )
}

function StepsTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={
                'border-t border-white/10 align-top' +
                (index % 2 === 1 ? ' bg-white/[0.02]' : '')
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-6 text-ink-200"
                >
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

export default function LoopEngineeringGuidePage() {
  return (
    <DocPage
      path="/docs/guides/loop-engineering-harness"
      title="Loop Engineering 是什么：Harness 之后的下一步"
      description="基于 Smith 铜匠在 X 上发布的《Harness之后,最近爆火的 Loop Engineering 是什么？怎么做？》正文稳定抽取结果，系统整理 Prompt、Context、Harness、Loop 四层结构，以及如何把 Loop Engineering 落到 Codex 工作流。"
      headings={[
        { id: 'source', text: '来源与抽取方式', level: 2 },
        { id: 'shift', text: 'Prompt 之后为什么会走到 Loop', level: 2 },
        { id: 'layers', text: 'Prompt → Context → Harness → Loop', level: 2 },
        { id: 'loop-over-harness', text: '为什么说 Loop 是 Harness 上面一层', level: 2 },
        { id: 'minimum-loop', text: '最小可用 Loop 需要什么', level: 2 },
        { id: 'why-hot', text: '为什么 Loop Engineering 突然变热', level: 2 },
        { id: 'design', text: '怎么设计一个可控的 Loop', level: 2 },
        { id: 'skills', text: '为什么 Skill 才是可复利资产', level: 2 },
        { id: 'path', text: '从 Harness 到 Loop 的正确顺序', level: 2 },
        { id: 'risks', text: 'Loop 的真实风险', level: 2 },
        { id: 'watershed', text: '真正的分水岭', level: 2 },
        { id: 'codex', text: '对 Codex 用户的直接启发', level: 2 },
        { id: 'refs', text: '资料来源', level: 2 },
      ]}
    >
      <Callout tone="info" title="正文来源说明">
        <p>
          本页正文不是二次猜测整理，而是从 X 公开 Web GraphQL 的{' '}
          <code>TweetResultByRestId</code> 返回中，直接提取
          <code>article.article_results.result.plain_text</code> 与
          <code>content_state.blocks</code> 得到。对应状态 ID 为 <code>2064237463338733882</code>，
          文章 ID 为 <code>2064229409247358976</code>。
        </p>
      </Callout>

      <h2 id="source">来源与抽取方式</h2>
      <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <img
          src="/images/guides/loop-engineering-cover.jpg"
          alt="Loop Engineering 相关文章封面图"
          loading="lazy"
          className="w-full object-cover"
        />
        <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
          来源封面：X Article《Harness之后,最近爆火的 Loop Engineering 是什么？怎么做？》。
        </figcaption>
      </figure>
      <p>
        原始 X Article 页面本身几乎不输出可见正文，SSR 数据里也没有直接展开文章内容。稳定抽取正文的方式，
        是先定位 tweet detail GraphQL 查询，再从返回里的文章字段取出 <code>plain_text</code> 与区块结构。
      </p>

      <h2 id="shift">Prompt 之后为什么会走到 Loop</h2>
      <p>
        这篇文章的核心起点，不是单纯讨论 prompt 是否过时，而是指出高强度使用 AI 的人，工作方式已经从
        Prompt 走到 Context，再走到 Harness。
      </p>
      <QuoteBlock>
        Harness 让 agent 能干活。Loop 让 agent 的工作可以被持续调度、验证和积累。
      </QuoteBlock>
      <p>
        文章认为，真正的问题已经不是“怎么把一句提示写得更好”，而是“当我们已经有了一个 agent harness，
        下一层到底是什么”。答案就是 loop。
      </p>

      <h2 id="layers">Prompt → Context → Harness → Loop</h2>
      <p>原文把这四层明确拆开，避免把不同问题揉在一起讨论。</p>
      <StepsTable
        headers={['阶段', '原文要点', '解决的问题']}
        rows={[
          [
            'Prompt',
            '靠表达能力赢，谁更会拆任务、写约束、追问、纠错，谁更像高手。',
            '把意图说清楚。',
          ],
          [
            'Context',
            '开始管理 repo、docs、examples、memory、constraints。',
            '减少模型乱猜，补足背景。',
          ],
          [
            'Harness',
            'agent 能读文件、改代码、跑命令、查 issue、用 connector、在隔离 worktree 工作。',
            '让 agent 真正进入可执行环境。',
          ],
          [
            'Loop',
            '让 agent 的工作被持续调度、验证、记录、恢复和停止。',
            '把单次执行变成闭环系统。',
          ],
        ]}
      />

      <h2 id="loop-over-harness">为什么说 Loop 是 Harness 上面一层</h2>
      <p>
        原文对 Harness 和 Loop 的区分非常清楚。Harness 主要解决的是单次执行质量，核心问题是：
      </p>
      <ul>
        <li>agent 能不能拿到正确上下文</li>
        <li>agent 能不能调用需要的工具</li>
        <li>agent 能不能访问真实文件</li>
        <li>agent 能不能跑测试</li>
        <li>agent 能不能交付一个结果</li>
      </ul>
      <p>而真正连续工作的麻烦，才是 Loop 的问题：</p>
      <ul>
        <li>谁来发现任务</li>
        <li>谁来启动任务</li>
        <li>谁来判断结果能不能用</li>
        <li>失败写在哪里</li>
        <li>明天从哪里继续</li>
        <li>跑偏了怎么停</li>
      </ul>
      <QuoteBlock>
        harness 是单个 agent 的运行环境。loop 在它上一层，负责触发、分派、检查、记录、恢复和停止。
      </QuoteBlock>
      <p>
        原文的比喻也很准确：如果 harness 是工作台，loop 就是工单系统、班次表和质检规则。工作台决定能不能干，
        loop 决定什么时候干、谁来干、谁检查、干到哪里、明天怎么接。
      </p>

      <h2 id="minimum-loop">最小可用 Loop 需要什么</h2>
      <p>原文把一个最小可用 loop 拆成五个部件：</p>
      <SectionCard title="done check">
        <p>先用代码定义什么叫完成，不让“完成”停留在模糊感受上。</p>
      </SectionCard>
      <SectionCard title="context builder">
        <p>每一轮从当前 state 生成 prompt，而不是靠人手动重新喂上下文。</p>
      </SectionCard>
      <SectionCard title="act and capture">
        <p>让 agent 执行，并捕获 diff、输出、错误和新状态。</p>
      </SectionCard>
      <SectionCard title="feedback path">
        <p>失败不是终点，失败要成为下一轮输入。</p>
      </SectionCard>
      <SectionCard title="stop conditions">
        <p>限制轮数、预算和风险动作，必要时强制拉人确认。</p>
      </SectionCard>
      <QuoteBlock>
        loop 不是一个更长的 prompt。loop 是一个把 prompt、状态、执行、验证和停止条件接起来的控制结构。
      </QuoteBlock>

      <h2 id="why-hot">为什么 Loop Engineering 突然变热</h2>
      <p>
        原文的判断是，大家并不是突然喜欢上了 “loop” 这个词，而是高强度 AI 用户集体撞上了同一个瓶颈：
        单次 agent 已经很强，但真实工作很少是一次性任务。
      </p>
      <p>
        当决策越来越多地发生在运行时，设计重点就不再只是代码本身，也不只是单个 agent，
        而是模型、工具、记忆、规划、状态和验证之间的执行结构。也正因为这样，Harness 和 Loop 才一起重要起来。
      </p>

      <h2 id="design">怎么设计一个可控的 Loop</h2>
      <p>原文建议，设计 loop 的第一步不是写 prompt，也不是加定时任务，而是先画出六个接口：</p>
      <ol>
        <li>目标接口：这次 loop 到底要推进什么任务。</li>
        <li>状态接口：每一轮开始时，它能读到哪些 state。</li>
        <li>上下文接口：state 怎么被组装成这一轮 prompt。</li>
        <li>执行接口：agent 能做哪些动作，能调用哪些工具。</li>
        <li>结果接口：执行后必须捕获哪些输出。</li>
        <li>停止接口：什么叫完成，什么叫失败，什么时候必须停。</li>
      </ol>
      <p>同时，原文特别强调一个容易被误解的点：</p>
      <QuoteBlock>
        真正的 loop 不是自动继续，而是有条件地继续。
      </QuoteBlock>
      <ul>
        <li>没有 done check，继续就是失控。</li>
        <li>没有 capture，继续就是失忆。</li>
        <li>没有 feedback，继续就是重复撞墙。</li>
        <li>没有 state，继续就是重新开聊。</li>
        <li>没有 stop condition，继续就是账单事故。</li>
      </ul>

      <h2 id="skills">为什么 Skill 才是可复利资产</h2>
      <p>这部分是全文里非常重要的一层判断：</p>
      <QuoteBlock>loop 是 plumbing，skill 才是资产。</QuoteBlock>
      <p>
        如果 loop 只是每次把一大段 prompt 塞给 agent，让它重新理解项目、重新猜规则、重新摸索做法，
        那它只是一个很贵的 <code>while true</code>。真正能复利的是 skill，因为 skill 把规则、经验、
        检查方式写到外部，让 agent 每轮都能读到同一套意图。
      </p>
      <ul>
        <li>没有 skill，loop 会反复冷启动。</li>
        <li>有 skill，loop 才会积累。</li>
        <li>重复出现的步骤，应该抽成 skill。</li>
        <li>解决过的难问题，也应该沉淀成 skill。</li>
      </ul>

      <h2 id="path">从 Harness 到 Loop 的正确顺序</h2>
      <p>原文明确反对一上来就追复杂 loop，尤其是先上定时、并发、多 agent、自动开 PR。</p>
      <QuoteBlock>
        先有 harness，再有 loop。跳过 harness 直接 loop，容易得到一台定时制造混乱的机器。
      </QuoteBlock>
      <p>它给出的更稳路径是：</p>
      <ol>
        <li>选一个你已经用 AI 做过 10 次以上的重复任务。</li>
        <li>先写完成条件，不写自动化。</li>
        <li>固定 context pack，让模型每次拿到同一组关键背景。</li>
        <li>把稳定做法沉淀成 skill。</li>
        <li>把 agent 放进已有 harness 里跑，确认它能访问工具、文件和测试。</li>
        <li>单独设计 checker，不让 maker 自己判自己完成。</li>
        <li>把结果、失败、下一步写进外部 state。</li>
        <li>最后才加 trigger：定时、事件、手动按钮，或 goal 条件。</li>
        <li>补预算上限、最大迭代次数、无进展检测和停止条件。</li>
      </ol>
      <p>
        原文还强调，trigger 之所以要最后加，是因为没有完成条件、没有 checker、没有 external state 的 trigger，
        只是把不可靠的单次执行改成不可靠的定期执行。
      </p>

      <h2 id="risks">Loop 的真实风险</h2>
      <p>
        Prompt 写坏了，通常一眼能看出来；Loop 设计坏了，可能连续几天产出看起来很完整的垃圾，
        而且你不一定第一时间察觉。
      </p>
      <ul>
        <li>它可能不停重试。</li>
        <li>它可能每一轮都把 context 塞得更大，最后噪音压过信号。</li>
        <li>它可能把第一轮的小错误带到第三轮、第五轮、第十轮。</li>
        <li>它可能让 checker 变成摆设。</li>
        <li>它可能让人误以为“系统在跑，我就不用看了”。</li>
      </ul>
      <QuoteBlock>
        loop 不会删除人。它只是把人的判断放到更高的位置。
      </QuoteBlock>
      <p>
        原文还给出一个很现实的提醒：写代码本身可能很便宜，但让一个 loop 一遍又一遍地写代码并不便宜。
        真正成熟的 loop 设计，必须把“会不会成功”和“失败时怎么停”放在同一优先级。
      </p>

      <h2 id="watershed">真正的分水岭</h2>
      <p>原文最后用一个问题来判断一个人是否已经进入下一层 AI 使用：</p>
      <QuoteBlock>
        他是不是还在展示“我让 AI 做了什么”，还是已经开始描述“我设计了一套什么系统，让 AI 持续做什么，并且我怎么知道它没跑偏”。
      </QuoteBlock>
      <p>
        前者更像 agent demo，后者才是 loop thinking。真正拉开差距的，也不是谁写了更长的 prompt，
        而是谁能把自己的 harness 变成一个有节奏、有状态、有验证、有停止条件的 loop。
      </p>

      <h2 id="codex">对 Codex 用户的直接启发</h2>
      <Callout tone="tip" title="把文章观点落回 Codex">
        <p>
          如果你在用 Codex、Claude Code、OpenCode 或类似 coding agent，这篇文章最值得直接落地的，不是
          “loop” 这个词本身，而是三件事：把重复做法抽成 skill、把结果写进外部状态、把 checker 与 maker 分开。
        </p>
      </Callout>
      <SectionCard title="1. 不要把经验只留在聊天上下文">
        <p>
          反复出现的目录规范、构建顺序、SEO 检查、图片命名、发布流程，应该写进 skill、脚本或固定流程，
          而不是每次重新解释。
        </p>
      </SectionCard>
      <SectionCard title="2. 每轮都要留下可续跑状态">
        <p>
          工作日志、任务文档、中间文件、提取结果、失败原因，都应该落盘。否则新会话只会重新冷启动。
        </p>
      </SectionCard>
      <SectionCard title="3. Checker 不能只是 maker 自评">
        <p>
          对文档站来说，checker 可以是 <code>npm run build</code>、路由存在性检查、截图检查、链接检查和 SEO 产物检查。
          没有 checker 的 loop，本质上还是半自动猜测。
        </p>
      </SectionCard>
      <ul>
        <li>
          继续看上下文和技能落地，可读{' '}
          <Link to="/docs/guides/codex-skills-context-engineering/">Codex Skills 与上下文工程</Link>。
        </li>
        <li>
          继续看持续执行与调度，可读{' '}
          <Link to="/docs/guides/codex-parallel-automation-workflow/">Codex 并行与自动化工作流</Link>。
        </li>
        <li>
          继续看工具失效时怎么恢复回路，可读{' '}
          <Link to="/docs/guides/codex-tool-recovery/">Codex 工具恢复</Link>。
        </li>
      </ul>

      <h2 id="refs">资料来源</h2>
      <p>原文列出的资料来源如下：</p>
      <ul>
        <li>
          Zhenfeng Cao, “The End of Software Engineering: How AI Agents Are Fundamentally
          Restructuring the Software Paradigm”, arXiv 2606.05608v1
        </li>
        <li>Matt Van Horn, “WTF Is a Loop? Peter Steinberger vs. Boris Cherny”</li>
        <li>Addy Osmani, “Loop Engineering.”</li>
        <li>Amit Shekhar, “How to design a loop that prompts your agent?”</li>
      </ul>
    </DocPage>
  )
}
