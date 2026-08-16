import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { DocPage } from '../../../components/layout/DocPage'
import { localizePath, useLocale } from '../../../lib/locale'
import HarnessInspectorGuidePageEn from '../../en/HarnessInspectorGuidePageEn'

const SOURCE_URL = 'https://mp.weixin.qq.com/s/1IkDdhFhpJQy3a9ABDuMsQ'
const GITHUB_URL = 'https://github.com/QoderAI/better-harness'
const INSPECTOR_URL = 'https://qoderai.github.io/better-harness/inspector/'

export default function HarnessInspectorGuidePage() {
  const { locale } = useLocale()
  if (locale === 'en') return <HarnessInspectorGuidePageEn />

  return (
    <DocPage
      path="/docs/guides/harness-inspector"
      title="Harness Inspector：让 Agent 交付过程可观察、可检查、可追溯"
      description="整理 Harness Inspector 如何把需求意图、Agent Session、文件活动和 Git Commit 连接成可检查的交付证据链，并说明 Workbench、Trace、Replay 与 SKILL 沉淀。"
      headings={[
        { id: 'source', text: '来源与阅读边界', level: 2 },
        { id: 'delivery-chain', text: '从 Session 到完整交付链', level: 2 },
        { id: 'views', text: 'Workbench、Trace 与 Replay', level: 2 },
        { id: 'workbench', text: 'Workbench：连接意图、过程与产出', level: 3 },
        { id: 'trace', text: 'Trace：把 Session 读成工作轨迹', level: 3 },
        { id: 'replay', text: 'Replay：沿事件顺序回看交付', level: 3 },
        { id: 'skill-capture', text: '从交付证据到 SKILL 沉淀', level: 2 },
        { id: 'gpt88', text: '与 GPT88 工作流结合', level: 2 },
        { id: 'limitations', text: '局限与安全采用建议', level: 2 },
      ]}
    >
      <Callout tone="info" title="第三方文章整理，不是 Better Harness 官方文档">
        <p>
          本页根据 Phodal 于 <strong>2026 年 8 月 14 日</strong> 发布的文章《Harness Inspector：让 Agent 交付过程可观察、可检查、可追溯》整理。
          这里将原文观点改写成 GPT88 文档站的阅读结构，不替代项目当前 README、安装指南或 Host Adapter 说明。
        </p>
        <p>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">查看原始微信公众号文章</a>。项目名称、命令、Host 支持范围和报告行为都可能随版本变化。
        </p>
      </Callout>

      <h2 id="source">来源与阅读边界</h2>
      <p>
        文章介绍了 Better Harness 及其 Harness Inspector：一个本地、只读的工作台，用来观察一次 AI 编程任务如何从最初意图走向代码交付。它关注的不是把 Session 聊天记录展示得更长，而是补齐“为什么开始、怎样执行、最终留下什么”这三类证据。
      </p>
      <p>
        Better Harness 当前项目说明和适配器列表以{' '}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">QoderAI/better-harness GitHub 仓库</a>为准。
        文档中涉及的产品能力、安装命令和 Host 支持，不应脱离仓库版本直接视为长期不变的承诺。
      </p>

      <h2 id="delivery-chain">从 Session 到完整交付链</h2>
      <p>
        文章把一次 Coding Agent 交付拆成三个连续、但边界不同的部分：
      </p>
      <ul>
        <li><strong>意图（Intent）：</strong>一次变化的语义化起点，例如用户需求、Issue、Spec 或架构约束。</li>
        <li><strong>过程（Process）：</strong>变化真正发生的过程，包括 Session、搜索、读取文件、工具调用、修改和验证。</li>
        <li><strong>产出（Output）：</strong>最终进入工程系统的结果，现阶段最清晰的锚点通常是 Git Commit。</li>
      </ul>
      <p>
        因此 Story、Session 和 Commit 不是三个并列的抽象概念，而是 Intent、Process 和 Output 在当前软件工具链中的可观察对象。一个 Story 可能经历多个 Session，一段 Session 也可能产生多个 Commit，所以真实项目更像一张证据图，而不是一条绝对线性的链。
      </p>
      <Callout tone="tip" title="为什么只看最终 diff 不够">
        <p>
          diff 能说明改了什么，却不能单独说明 Agent 是否理解了需求、是否探索了正确上下文、是否完成了验证、是否从失败中恢复。把意图、过程和产出连接起来，可以让评审问题变得可检查，同时不假装能够还原模型没有暴露的思考过程。
        </p>
      </Callout>

      <h2 id="views">Workbench、Trace 与 Replay</h2>
      <p>
        Harness Inspector 提供三种互补的观察方式。每种视图回答不同问题，并且保留“已观察证据”和“推测关系”之间的边界。
      </p>

      <h3 id="workbench">Workbench：连接意图、过程与产出</h3>
      <p>
        Workbench 是一次交付的整体视图：将触发 Session 的需求、Agent 执行过程中的活动、文件变化和当前观察到的 Commit 放到同一个工作区，帮助 Reviewer 检查它们之间的关系。
      </p>
      <p>
        它的重要设计是：当关系证据不足时，Inspector 会把记录保留为候选或未映射，而不是因为几条记录时间接近，就自动拼出一条看起来完整的交付路径。
      </p>

      <h3 id="trace">Trace：把 Session 读成工作轨迹</h3>
      <p>
        Trace 进入单个 Session，按 Turn 展开用户输入、中间回复、Tool Call 和文件活动，并用时间轴连接事件位置。连续重复的操作可以折叠，Reviewer 也可以从摘要片段跳转到对应调用。
      </p>
      <p>
        Trace 不尝试还原模型的私有思考，而是把已经记录下来的行为重新组织成可阅读的轨迹，用来检查 Agent 如何寻找上下文、修改代码和执行验证。
      </p>

      <h3 id="replay">Replay：沿事件顺序回看交付</h3>
      <p>
        Replay 沿着已保留的事件逐步回放：用户输入、Agent 回复、Tool Call、文件活动和 Commit。它帮助 Reviewer 观察 Agent 在什么上下文中形成方向，又在什么时候进行了修改和验证。
      </p>
      <p>
        Replay 是只读证据回放，不会重新运行工具、恢复工作区或继续原来的 Session。没有精确时间的内容仍然可以保留顺序，但不会凭空补出不存在的时间信息。
      </p>

      <h2 id="skill-capture">从交付证据到 SKILL 沉淀</h2>
      <p>
        文章最初想解决的问题，是如何从 Agent Session 中识别可复用的工作路径。但真正值得沉淀的并不是出现次数最多的 Tool Call：重复读取文件可能说明上下文不足，反复失败重试也可能只是一次交付中的噪声。
      </p>
      <p>
        更可靠的 SKILL 候选，应该是一条在相似任务中反复出现，并且得到最终产出与验证结果支持的工作路径：如何确定修改边界、如何建立必要上下文、如何完成修改、如何验证并检查最终结果。之后还要在新的交付中复测它是否真的改善了工作方式。
      </p>
      <ol>
        <li>从多个可比较的交付开始，不要只根据一次漂亮的 Session 下结论。</li>
        <li>把任务意图、证据链接、验证结果和最终产出放在一起看。</li>
        <li>区分稳定可复用步骤、偶发重试、环境噪声和 Host 特有细节。</li>
        <li>在后续任务中验证候选 SKILL，再决定是否把它设为默认工作流。</li>
      </ol>

      <h2 id="gpt88">与 GPT88 工作流结合</h2>
      <p>
        Harness Inspector 是独立的开源工作流工具，不是 GPT88 产品，也不能替代 API 日志。可是，当 Coding Agent 通过 OpenAI 兼容接口调用 GPT88 时，Intent—Process—Output 的证据模型仍然适合用来做交付评审。
      </p>
      <ul>
        <li>在 Issue、Agent Session、Commit 和评测记录中使用稳定的任务标识。</li>
        <li>在交付记录中保留准确的模型 ID、线路、提示词版本、工具权限和验证命令。</li>
        <li>把最终代码和测试结果与 Session 一起评审，不要只看 Agent 最后一条回答。</li>
        <li>可结合 <Link to={localizePath('/docs/guides/gpt88-tutorial/', locale)}>GPT88 通用教程</Link> 和 <Link to={localizePath('/docs/api/list-models/', locale)}>模型列表 API</Link>确认当前路由与账号权限。</li>
      </ul>
      <CodeBlock
        lang="text"
        code="/better-harness analyze this project's AI coding workflow and generate an evidence-backed report"
      />
      <p>
        上面的命令是项目当前 README 描述的 Qoder 风格入口。具体安装方式、Host 适配器和输出格式，请以{' '}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">Better Harness 仓库当前版本</a>为准。
      </p>

      <h2 id="limitations">局限与安全采用建议</h2>
      <ul>
        <li>Story、Session 和 Commit 被连接起来，不代表 Agent 的判断一定正确，只代表证据更容易被检查。</li>
        <li>已记录事件不等于隐藏思考过程；不要把未记录的模型状态当成确定事实。</li>
        <li>只读 Inspector 不能替代代码评审、测试、CI、权限、密钥管理和回滚流程。</li>
        <li>不同 Coding Host 暴露的 Session 与工具证据不同；缺少证据应被视为明确限制，而不是证明某个事件没有发生。</li>
        <li>不要把一次成功交付直接升级成通用 SKILL，应通过相似任务比较质量、返工、耗时和运行风险。</li>
      </ul>
      <Callout tone="warn" title="证据链不是自动质量分数">
        <p>
          一条连接完整的交付链，说明有哪些内容可以检查；它不保证代码正确、安全或已经达到生产标准。人工评审和项目验收标准仍然必须保留。
        </p>
        <p>
          <a href={INSPECTOR_URL} target="_blank" rel="noreferrer">打开公开 Harness Inspector 示例</a>，查看只读交互方式。
        </p>
      </Callout>
    </DocPage>
  )
}
