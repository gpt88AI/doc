import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { localizePath, useLocale } from '../../../lib/locale'
import BillingUnitsGuidePageEn from '../../en/BillingUnitsGuidePageEn'

const ACCOUNTING_FLOW = `支付货币
  ├─ 支付人民币（CNY）: ¥1 -> 账户增加 1.00 RMB balance
  └─ 支付美元（USD）: USD payment -> currency conversion -> RMB balance

模型请求
  官方 API 用量（USD） -> 所选分组倍率 -> 账户扣除（RMB）

实际扣费（人民币） = 官方用量（美元） × 所选分组倍率`

const CALCULATION_EXAMPLE = `演示汇率：1 USD = 7.20 CNY（仅用于说明计算方式，非实时价格承诺）

充值：支付 10 USD
换算：10 × 7.20 = 72 CNY
入账：账户增加约 72.00 RMB balance（最终以充值订单显示为准）

调用：官方用量 0.10 USD，所选分组倍率 2.0
扣费：0.10 × 2.0 = 0.20 CNY
剩余：72.00 - 0.20 = 71.80 CNY`

const SMOKE_TEST = `1. 登录控制台并确认账户余额
2. 在 API 密钥页面查看分组倍率
3. 在模型广场或定价页选择一个当前可用模型
4. 用最小请求调用一次
5. 在用量 / 余额记录中核对官方用量和人民币扣费
6. 保存这次成功请求作为自己的成本基线`

const REVIEW_TEMPLATE = `这次调用的成本核对：
- 支付货币：CNY / USD
- 充值订单最终入账：________ RMB balance
- 模型 ID：________
- 分组：________
- 分组倍率：________
- 官方用量（USD）：________
- 预期扣费（RMB）：官方用量 × 分组倍率 = ________
- 控制台实际扣费（RMB）：________
- 差异或待确认问题：________

结论：以充值订单、模型广场 / 定价页和账户用量记录的当前值为准。`

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}
            >
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

export default function BillingUnitsGuidePage() {
  const { locale } = useLocale()

  if (locale === 'en') return <BillingUnitsGuidePageEn />

  return (
    <DocPage
      path="/docs/guides/billing-units"
      title="1 元为什么等于 1 余额？人民币结算与 USD 充值换算新手指南"
      description="用最简单的方式解释 gpt88.cc 的人民币余额、美元充值换算、模型官方用量和分组倍率，帮助中国用户和外国用户理解 1:1 余额与实际结算。"
      headings={[
        { id: 'summary', text: '先记住这句话', level: 2 },
        { id: 'audience', text: '适用人群与完成标准', level: 2 },
        { id: 'units', text: '先分清三层单位与一个倍率', level: 2 },
        { id: 'why-one-to-one', text: '为什么会出现 1:1', level: 2 },
        { id: 'top-up', text: '充值如何换算', level: 2 },
        { id: 'settlement', text: '模型调用如何结算', level: 2 },
        { id: 'example', text: '完整计算示例', level: 2 },
        { id: 'where-to-check', text: '应该去哪里查看', level: 2 },
        { id: 'shortest-path', text: '新手最短成功路径', level: 2 },
        { id: 'decisions', text: '模型与分组怎么选', level: 2 },
        { id: 'iteration', text: '成本核对与迭代方法', level: 2 },
        { id: 'troubleshooting', text: '常见问题与恢复方式', level: 2 },
        { id: 'practice', text: '练习任务与验收清单', level: 2 },
        { id: 'template', text: '可复用成本核对模板', level: 2 },
        { id: 'evidence', text: '口径与证据边界', level: 2 },
      ]}
    >
      <Callout tone="danger" title="重要：1 元余额不等于 1 美元">
        <p>
          <strong>“1 元 = 1.00 余额”描述的是平台内部的人民币记账关系，不是汇率。</strong>
          它不表示 1 CNY 等于 1 USD，也不表示支付 1 USD 只会得到 1 CNY 余额。
        </p>
        <p>
          如果充值页面或后台界面出现 <code>$</code> 符号，请以当前计费说明、充值订单和账户用量记录中的单位为准。在本套结算逻辑中，账户余额和调用扣费按人民币理解；支付美元时，美元会先经过支付渠道或平台配置的换算，再以人民币余额入账。
        </p>
      </Callout>

      <h2 id="summary">先记住这句话</h2>
      <p>
        这里同时存在三个不同层次：你支付时使用的货币、账户里用于扣费的人民币余额，以及上游模型用来计算成本的官方 USD 用量。平台把它们转换到一个简单的人民币余额系统里，方便用户查看和控制支出。
      </p>
      <CodeBlock lang="text" filename="billing-map" code={ACCOUNTING_FLOW} />
      <p>
        因此，“1:1”只适用于 <strong>人民币充值金额到人民币账户余额</strong>：充值 ¥1，账户增加 1.00 RMB balance。美元充值不是 1 USD = 1 balance，而是先换算成人民币，再把换算后的金额加入余额。
      </p>

      <h2 id="audience">适用人群与完成标准</h2>
      <p>这篇指南适合第一次使用 AI API 中转平台、看到美元价格但使用人民币余额结算的中国用户，也适合习惯美元计价、需要确认人民币结算方式的外国用户。</p>
      <p>读完后的最低完成标准是：你能用一次小额充值和一次最小模型请求，分别核对充值入账、分组倍率、官方用量和人民币扣费，而不是只根据页面上的货币符号猜测价格。</p>
      <ul>
        <li>知道充值货币和账户结算单位不是同一个概念。</li>
        <li>能解释“充值 ¥1 = 1.00 余额”，但不把它解释成“¥1 = $1”。</li>
        <li>能用官方用量和分组倍率估算一次请求的扣费。</li>
        <li>能在模型广场、官网定价页和账户用量记录之间找到正确的核对位置。</li>
      </ul>

      <h2 id="units">先分清三层单位与一个倍率</h2>
      <SimpleTable
        headers={['单位 / 层次', '它代表什么', '应该在哪里核对']}
        rows={[
          ['支付货币', '你实际付款时使用的 CNY、USD 或其他支付币种。', '支付页面、订单金额和支付渠道。'],
          ['账户余额', '平台内部用于扣费的人民币余额，例如 72.00 RMB balance。', '控制台余额、充值订单和用量记录。'],
          ['官方 API 用量', '上游厂商按 USD 计算的模型用量，常与 token 或媒体用量相关。', '请求用量、账单明细和模型计费说明。'],
          ['分组倍率', '把官方 USD 用量换算成人民币扣费的系数。', '「API 密钥」页面的分组选择处。'],
        ]}
      />
      <p>
        这四项不能混为一个数字。比如页面显示一个模型的公开价格，不代表你的账户一定会按同一个数字扣费；你的实际扣费还取决于当前模型、输入输出用量、所选分组和账号权限。
      </p>

      <h2 id="why-one-to-one">为什么会出现 1:1</h2>
      <p>
        这是平台为了简化记账和用户理解而设置的虚拟余额机制。平台后台需要一个统一的内部单位，而用户更容易理解“余额 ¥100、调用扣 ¥0.05”，不需要每次先把积分、虚拟刀和美元再换算一遍。
      </p>
      <SimpleTable
        headers={['常见误解', '正确理解']}
        rows={[
          ['1 元 = 1 美元', '错误。1.00 是账户余额数量，不是美元金额。'],
          ['支付 1 USD 得到 1.00 余额', '错误。支付 USD 后要先按订单显示的换算结果转成人民币余额。'],
          ['页面的 $ 符号决定余额是 USD', '不一定。当前结算单位要看计费说明、订单和余额记录。'],
          ['模型广场上的公开价就是最终扣费', '不一定。最终扣费以当前账号的模型、分组、用量和控制台记录为准。'],
        ]}
      />

      <h2 id="top-up">充值如何换算</h2>
      <ol>
        <li><strong>使用人民币充值：</strong>充值 ¥1，账户增加 1.00 RMB balance；充值 ¥100，账户增加 100.00 RMB balance。</li>
        <li><strong>使用美元充值：</strong>支付金额先按充值页面、支付渠道或平台当时采用的换算规则转换成人民币，再以换算后的人民币金额入账。</li>
        <li><strong>以订单为准：</strong>手续费、汇率时间点、支付渠道规则或优惠可能影响最终入账，不能只用一个固定汇率倒推。</li>
      </ol>
      <Callout tone="info" title="美元充值示例是计算方法，不是实时汇率">
        <p>
          假设充值页面显示的演示汇率为 1 USD = 7.20 CNY，支付 10 USD 的理论换算结果是 72 CNY。实际到账仍应以充值订单最终显示的人民币余额为准；本文不承诺实时汇率、手续费或固定到账金额。
        </p>
      </Callout>

      <h2 id="settlement">模型调用如何结算</h2>
      <p>
        官方模型服务通常以 USD 表示 API 用量。平台不会把“官方 1 USD”直接当成账户里的 1 USD，而是使用你选择的分组倍率换算成人民币扣费：
      </p>
      <CodeBlock lang="text" filename="billing-formula" code="实际扣费（人民币） = 官方用量（美元） × 所选分组倍率" />
      <SimpleTable
        headers={['分组倍率', '官方用量', '账户扣费', '解释']}
        rows={[
          ['2.0', '$1.00', '¥2.00', '每消耗 $1 官方额度，扣除 ¥2.00。'],
          ['0.5', '$1.00', '¥0.50', '每消耗 $1 官方额度，扣除 ¥0.50。'],
          ['2.0', '$0.10', '¥0.20', '扣费随官方用量按比例变化。'],
        ]}
      />
      <p>
        倍率越低，单位用量通常越便宜，但不同分组可能对应不同上游线路、稳定性、可用模型或账号权限。不要只看倍率，还要结合自己的延迟、成功率、模型能力和预算来选。
      </p>

      <h2 id="example">完整计算示例</h2>
      <CodeBlock lang="text" filename="billing-example" code={CALCULATION_EXAMPLE} />
      <p>
        这是为了展示计算顺序的演示。它没有固定你的支付汇率，也没有固定任何模型的实时单价。实际操作时应把示例里的 7.20、0.10 和 2.0 换成充值订单、请求用量和 API 密钥页面显示的当前值。
      </p>

      <h2 id="where-to-check">应该去哪里查看</h2>
      <SimpleTable
        headers={['你想确认什么', '优先查看位置', '不要只看什么']}
        rows={[
          ['模型有哪些、公开价如何比较', <a key="square" href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>, '不要只看搜索引擎缓存或旧截图。'],
          ['套餐、公开价格和充值入口', <a key="pricing" href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">网站定价页面</a>, '不要把公开说明当成账号最终扣费承诺。'],
          ['当前分组倍率和可用线路', <><Link to="/docs/auth/#billing">认证与计费</Link> 与 API 密钥页面</>, '不要只按模型名称猜倍率。'],
          ['某次请求究竟扣了多少', '控制台用量、账单和余额变化记录', '不要只用公开单价手算后当作最终结果。'],
        ]}
      />
      <Callout tone="warn" title="动态数据优先级">
        <p>公开模型页和定价页用于了解产品范围与价格口径；你的账号能否使用某模型、选择哪个分组以及最终扣费，始终以当前控制台、API 密钥页面和使用记录为准。</p>
      </Callout>

      <h2 id="shortest-path">新手最短成功路径</h2>
      <p>不要一开始就批量调用或用高成本任务测试。先完成一次可核对的小请求：</p>
      <CodeBlock lang="text" filename="billing-smoke-test" code={SMOKE_TEST} />
      <ol>
        <li><strong>准备输入：</strong>已有账号、API Key，以及一笔你能接受的小额余额。</li>
        <li><strong>确认入账：</strong>充值后记录支付币种、订单金额和最终人民币余额。</li>
        <li><strong>选择分组：</strong>打开 API 密钥页面，记录分组名称、倍率和线路说明。</li>
        <li><strong>选择模型：</strong>通过<a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>或<a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">官网定价页</a>了解模型，再以控制台当前可用模型为准。</li>
        <li><strong>发送最小请求：</strong>使用短文本、低并发和一个明确的问题，避免第一次就提交长上下文或批量任务。</li>
        <li><strong>核对结果：</strong>记录模型、分组、官方 USD 用量、调用前后余额和实际人民币扣费。</li>
      </ol>
      <p>完成最后一步后，你就拥有了自己的成本基线，之后再比较模型或分组会比猜测页面上的货币符号可靠。</p>

      <h2 id="decisions">模型与分组怎么选</h2>
      <SimpleTable
        headers={['你的目标', '建议起点', '需要接受的取舍']}
        rows={[
          ['第一次验证是否能用', '选择一个当前可用模型，发最小请求。', '结果只说明链路可用，不代表复杂任务质量。'],
          ['优先控制成本', '比较当前分组倍率和输入 / 输出用量。', '低倍率不保证最低延迟或最高稳定性。'],
          ['优先稳定性', '选择控制台说明中更适合你线路的分组，并先做小样本测试。', '可能需要接受更高的单位扣费。'],
          ['比较模型能力', '固定同一输入、输出长度和分组，再比较结果与用量。', '不同上下文和输出长度会让价格比较失真。'],
          ['核对最终账单', '看控制台使用记录和余额变化。', '公开价格页只能作为参考，不能代替账户明细。'],
        ]}
      />

      <h2 id="iteration">成本核对与迭代方法</h2>
      <p>每次成本异常时，使用一个变量一次的排查循环：</p>
      <ol>
        <li>先看控制台记录：模型、分组、输入输出用量、扣费和时间。</li>
        <li>找出最大差异：是支付换算、官方用量、倍率，还是重复重试。</li>
        <li>只改变一个变量：例如固定模型，只更换分组；或固定分组，只缩短输入。</li>
        <li>重发相同的小请求，与上一条结果比较。</li>
        <li>确认后保存有效组合，异常组合不要直接扩大到批量任务。</li>
      </ol>
      <Callout tone="info" title="先验证，再放大">
        <p>批量、长上下文、图片、视频和多轮工具调用都可能放大成本与失败影响。先用小样本确认计费逻辑、输出质量和线路稳定性，再扩大调用量。</p>
      </Callout>

      <h2 id="troubleshooting">常见问题与恢复方式</h2>
      <SimpleTable
        headers={['现象', '可能原因', '恢复动作']}
        rows={[
          ['以为支付 1 USD 只能得到 1.00 余额', '把平台余额单位误当成美元。', '查看充值订单的人民币最终入账金额，不用 1:1 美元假设。'],
          ['余额显示 $，但文档说人民币结算', '界面货币符号和内部结算口径不一致。', '以计费说明、订单和用量记录的单位为准，并保留订单截图或编号。'],
          ['手算价格和实际扣费不同', '分组倍率、输入输出用量、模型版本或重试次数不同。', '固定模型和分组，查看一次成功请求的完整用量记录。'],
          ['模型广场能看到模型，但 API 不可用', '模型权限、分组或线路不是对所有账号相同。', '以当前控制台可选模型和 API 返回为准，先换可用模型做最小测试。'],
          ['请求失败后不知道是否扣费', '失败、重试、异步任务和媒体请求的记账规则可能不同。', '不要猜测退款或扣费结果，查看账户用量明细；无法判断时提交 request_id。'],
          ['余额变化和预期不一致', '充值订单仍在处理中，或存在并发请求 / 自动重试。', '先停止扩大调用，核对订单状态、请求时间、日志和用量明细。'],
        ]}
      />

      <h2 id="practice">练习任务与验收清单</h2>
      <p>用一个低风险的文本请求完成下面练习，不要使用批量图片、视频或超长上下文：</p>
      <ol>
        <li>记录充值前余额和充值订单的支付币种。</li>
        <li>记录充值后最终人民币余额。</li>
        <li>记录模型 ID、分组名称和分组倍率。</li>
        <li>发送一次固定长度的最小请求。</li>
        <li>记录官方 USD 用量和人民币实际扣费。</li>
        <li>用公式反算并标记任何差异。</li>
      </ol>
      <ul>
        <li>□ 我没有把 CNY 和 USD 的数值直接按 1:1 比较。</li>
        <li>□ 我知道美元充值会先换算成人民币余额。</li>
        <li>□ 我从 API 密钥页面记录了当前分组倍率。</li>
        <li>□ 我通过控制台用量记录核对了实际扣费。</li>
        <li>□ 我在批量调用前完成了小样本测试。</li>
      </ul>

      <h2 id="template">可复用成本核对模板</h2>
      <CodeBlock lang="text" filename="billing-review-template" code={REVIEW_TEMPLATE} />
      <p>
        这个模板可以放在团队的项目文档、账单复盘或接入验收清单里。它的作用不是替代控制台，而是让每次比较都有同样的输入和证据。
      </p>

      <h2 id="evidence">口径与证据边界</h2>
      <p>
        本文解释的是平台当前公开的人民币余额与分组倍率记账方式：充值 ¥1 对应 1.00 余额，美元充值先转换成人民币入账，模型调用按官方 USD 用量乘所选分组倍率扣除人民币。模型价格、汇率、手续费、可用模型、权限、限速和失败请求的处理方式都可能随支付渠道、上游供应商、账号和控制台配置变化。
      </p>
      <p>
        因此，本文中的公式用于理解和估算；充值订单、<a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>、<a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">网站定价页面</a>、API 密钥页面和账户用量记录才是实际操作时的证据来源。需要排查具体扣费时，请同时保留订单号、request_id、模型、分组和请求时间。
      </p>
      <Callout tone="info" title="相关文档">
        <p>
          先看<a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>了解模型，再看<a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">官网定价页</a>了解公开价格，最后回到<Link to={localizePath('/docs/auth/', locale)}>认证与计费</Link>和控制台核对账号实际余额与用量。
        </p>
      </Callout>
    </DocPage>
  )
}
