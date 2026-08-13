import { Callout } from '../../../components/ui/Callout'
import { DocPage } from '../../../components/layout/DocPage'

const SOURCE_URL = 'https://note.mowen.cn/detail/dc8O65jTVGq0SBGNqSvb5'

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-6 text-ink-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Grok46ReviewPage() {
  return (
    <DocPage
      path="/docs/guides/grok-4-6-review"
      title="Grok 4.6 评测：编码 Agent 与 DeepSeek V4 Pro 对比参考"
      description="整理一则公开笔记对 Grok 4.6 与 DeepSeek V4 Pro 的评测观察，涵盖 Artificial Analysis、Terminal-Bench、GDPval-AA、长程 Agent、价格与选型边界。"
      headings={[
        { id: 'source', text: '来源与使用边界', level: 2 },
        { id: 'conclusion', text: '先看结论', level: 2 },
        { id: 'scores', text: '笔记记录的 Grok 4.6 指标', level: 2 },
        { id: 'comparison', text: '与 DeepSeek V4 Pro 的侧重点', level: 2 },
        { id: 'choose', text: '如何做模型选型', level: 2 },
        { id: 'limitations', text: '局限与复测建议', level: 2 },
      ]}
    >
      <Callout tone="info" title="第三方评测整理，不是官方性能或价格承诺">
        <p>
          本页根据池建强于 <strong>2026 年 8 月 13 日</strong> 在墨问发布的公开笔记《用 AskCat 根据最新的评测对 DeepSeek V4 Pro 和 Grok 4.6 做了个对比》整理。
          笔记是对 AskCat 汇总结果的转述，并非本文作者对各基准的独立复现。
        </p>
        <p>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">查看原始笔记</a>。下列分数、价格倍数和“默认选择”等措辞仅代表该笔记记录时的内容；模型版本、测试配置、路由可用性和实际价格均可能变化。
        </p>
      </Callout>

      <h2 id="source">来源与使用边界</h2>
      <p>
        这则笔记比较了 Grok 4.6 与 DeepSeek V4 Pro 的定位：前者偏向编码、缺陷定位和长程 Agent 工作负载，后者突出较低价格、百万级上下文和可本地部署。它更适合作为建立候选集的线索，而不是替代你自己的上线验证。
      </p>
      <p>
        文中保留笔记所使用的模型名称与评测口径。特别是同名模型的预览版、正式版、推理模式、工具权限或上游服务商不同，都可能使数字不能直接横向套用。
      </p>

      <h2 id="conclusion">先看结论</h2>
      <ul>
        <li><strong>Grok 4.6 的重点是长程代码 Agent：</strong>笔记将其描述为编码与 bug 查找任务中的优先候选，并认为它在长期运行的 Agent 工作流、交互和视觉类任务上更有优势。</li>
        <li><strong>DeepSeek V4 Pro 的重点是性价比与部署弹性：</strong>笔记强调其低价、深度思考 / 非思考双模式、100 万 token 上下文以及开源、本地部署能力。</li>
        <li><strong>不要把“某一项分数更高”直接等同于生产更优：</strong>真实任务还取决于仓库规模、工具调用、响应格式、并发、延迟、失败恢复、数据合规和实际成本。</li>
      </ul>

      <h2 id="scores">笔记记录的 Grok 4.6 指标</h2>
      <p>
        下表仅转录原笔记明确给出的数值和描述，不补充未公开的测试设置，也不把这些结果转换为 GPT88 的能力保证。
      </p>
      <ComparisonTable
        headers={['指标', '笔记记录', '可如何理解']}
        rows={[
          ['Artificial Analysis Intelligence Index', '61 分；笔记称与 GPT-5.6 Sol Max 持平', '可作为综合能力的一个外部信号，但不能说明所有编程、推理或多模态任务均相同。'],
          ['Terminal-Bench v2.1', '88.4%', '更接近终端环境下的实际操作与 Agent 执行能力；仍需确认测试版本、工具权限与评测规则。'],
          ['GDPval-AA v2 Elo', '1753', '反映该评测体系中的相对排序，不可直接换算成你的业务成功率或人工返工时间。'],
          ['笔记给出的定位', '编码和 bug 查找工作负载的新默认选择', '这是第三方笔记的选型判断，不是官方 SLA，也不意味着所有代码库都应默认切换。'],
        ]}
      />
      <Callout tone="warn" title="基准数字需要带着版本和测试设置一起读">
        <p>
          Benchmark 的模型快照、提示词、采样次数、是否启用工具、超时阈值、系统依赖与评分脚本都会影响结果。即使分数相同，首 token 延迟、完整任务耗时、错误恢复和输出稳定性也可能完全不同。
        </p>
      </Callout>

      <h2 id="comparison">与 DeepSeek V4 Pro 的侧重点</h2>
      <ComparisonTable
        headers={['维度', 'Grok 4.6（笔记观察）', 'DeepSeek V4 Pro（笔记观察）', '选型提示']}
        rows={[
          ['主要工作负载', '长程 Agent、编码、bug 查找，以及更具野心的交互和视觉任务。', 'Sonnet 级旗舰定位，强调覆盖面与经济性。', '用同一批真实 issue、PR、终端任务和前端需求复测。'],
          ['上下文与缓存', '原笔记没有给出具体缓存结构或上下文参数。', '100 万 token 上下文；混合注意力机制将百万 token 缓存压缩至约 10%。', '容量上限不等于每次都适合塞满；长上下文要测试召回、延迟和费用。'],
          ['成本 / 部署', '原笔记没有给出 Grok 4.6 的实时价格。', '笔记称约比 Fable 低 57 倍，并提到开源、本地部署。', '所有价格均以实际接入渠道、输入输出倍率与当日控制台为准。'],
          ['发展状态', '笔记提到 Grok 4.7 已开始训练。', '笔记强调 V4 Pro 相比预览版的 Terminal Bench 提升 15.8%。', '后续版本变化会迅速改变结论，应记录确切的模型 ID 与测试日期。'],
        ]}
      />

      <h2 id="choose">如何做模型选型</h2>
      <ol>
        <li><strong>固定任务集：</strong>至少包含一个代码修复、一个多文件改动、一个终端 / 工具调用任务、一个长文档检索任务和一个失败恢复任务。</li>
        <li><strong>固定运行条件：</strong>统一系统提示词、上下文、工具权限、最大回合数、超时和验收规则，避免只比较“最好的一次回答”。</li>
        <li><strong>同时记录四类指标：</strong>任务成功率、端到端耗时、人工返工量、实际 token / 余额消耗。</li>
        <li><strong>再做灰度：</strong>先在低风险任务中观察连续多日表现，再决定是否用作默认模型或关键链路模型。</li>
      </ol>
      <Callout tone="tip" title="把“默认模型”拆成按任务路由">
        <p>
          比起给所有请求指定同一个冠军模型，更实用的策略通常是：把长程代码 Agent、快速问答、长文档整理、视觉前端原型和低成本批处理分开评测，然后基于成功率、延迟和成本选择不同的默认路由。
        </p>
      </Callout>

      <h2 id="limitations">局限与复测建议</h2>
      <ul>
        <li>来源是公开笔记对 AskCat 结果的汇总，本文没有独立复现 Artificial Analysis、Terminal-Bench v2.1 或 GDPval-AA v2。</li>
        <li>原笔记没有提供所有模型的精确版本号、完整提示词、工具配置、采样次数和置信区间，因此不能把分数当作严格的因果结论。</li>
        <li>“约低 57 倍”属于原笔记的相对价格表述，缺少完整计价口径时不应直接用于预算或采购决策。</li>
        <li>如果 GPT88 当前账号可使用相关模型，请先通过 <code>GET /v1/models</code> 确认模型可用性，并以控制台展示的模型 ID、分组与实际扣费为准。</li>
      </ul>
    </DocPage>
  )
}
