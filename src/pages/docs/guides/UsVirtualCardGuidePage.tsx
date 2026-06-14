import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const QUICK_SUMMARY = `这不是“直接给你一张能用的卡”。
而是教你自己注册并开出一张可长期使用的美区虚拟卡。

已知可确认要点：
1. 开卡本身不收开卡费
2. 首次需要充值 10U
3. 可绑定支付宝消费
4. 这类自己注册的卡，后续继续使用和二次验证通常比一次性代开卡更稳
5. 适合 AI 平台、海外订阅和需要长期维护卡片状态的场景`

const PREPARE_CHECKLIST = `开始前建议先准备：

1. 一个可正常访问外部网页的网络环境
2. 可接收邮件的常用邮箱
3. 一部能配合注册和验证的手机
4. 10U 左右的可用稳定币余额
5. 能完成链上转账或第三方代充的方式
6. 一个你后续准备绑定支付的平台或 AI 服务`

const OPEN_FLOW = `建议按这个顺序操作：

1. 打开教程页
2. 如果浏览器提示“继续访问”或加载慢，先等待页面完全展开
3. 按教程注册账号
4. 完成实名认证或基础资料填写（如果页面要求）
5. 进入开卡页面
6. 充值至少 10U
7. 提交开卡
8. 记录卡号、有效期、CVV、账单信息
9. 绑定到目标平台或钱包
10. 先做一笔小额验证消费`

const WARNING_NOTES = `这类卡常见风险点：

1. 平台页面字段和顺序可能会变，实际以页面为准
2. 部分海外平台会验证账单地址，不能乱填
3. 某些平台会预扣 1 美元或小额验证款
4. 如果你只买别人直接给你的“一次性卡”，后续风控复验时可能没法继续验证
5. 充 U 前先确认充值网络、地址和到账规则，转错链通常不可逆`

const AI_SCENES = `适合用这类长期虚拟卡的场景：

1. ChatGPT、Claude、Gemini 等海外 AI 工具订阅
2. 海外 SaaS 月付 / 年付
3. 海外 App Store / Google Play 类消费
4. 需要反复续费、改套餐、重新验证付款方式的平台

不太适合的场景：

1. 只想临时过一次验证，后续不维护
2. 不会处理 U 充值和地址确认
3. 希望拿来做高频大额支付
4. 看不懂外部页面字段和风控提示`

function StepCard({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="not-prose my-5 rounded-xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-200">
          {step}
        </div>
        <div className="min-w-0">
          <h3 className="m-0 text-base font-semibold text-ink-50">{title}</h3>
          <div className="mt-2 space-y-2 text-sm leading-6 text-ink-200">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default function UsVirtualCardGuidePage() {
  return (
    <DocPage
      path="/docs/guides/us-virtual-card-guide"
      title="美区虚拟卡自助开卡教程"
      description="一篇面向 AI 平台和海外订阅场景的详细教程：不是直接卖一次性卡，而是教你自己注册、充值 10U、自助开卡、绑定支付宝消费，并长期维护可持续使用的虚拟卡。"
      headings={[
        { id: 'what', text: '这篇教程解决什么问题', level: 2 },
        { id: 'why-self', text: '为什么建议自己开卡', level: 2 },
        { id: 'prepare', text: '开始前要准备什么', level: 2 },
        { id: 'open', text: '按什么顺序操作', level: 2 },
        { id: 'topup', text: '10U 充值怎么理解', level: 2 },
        { id: 'bind', text: '开卡后怎么使用', level: 2 },
        { id: 'ai', text: '适合哪些 AI 平台场景', level: 2 },
        { id: 'avoid', text: '哪些坑最容易踩', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
        { id: 'source', text: '参考注册链接', level: 2 },
      ]}
    >
      <Callout tone="info" title="先看这一句">
        <p>
          这篇内容讲的是<strong>自己注册并开出一张可长期使用的虚拟卡</strong>，
          不是“下单后别人直接给你一张现成卡号”。如果你嫌麻烦，不适合继续看；如果你想后续能长期续费、
          二次验证和反复绑定平台，这种自助开卡方式通常更稳。
        </p>
      </Callout>

      <h2 id="what">这篇教程解决什么问题</h2>
      <p>
        很多人在找海外 AI 平台支付方案时，会先买别人临时给的虚拟卡号。这种卡短期看起来省事，但一旦平台后续要求重试扣款、
        更换套餐、补做风控验证或者重新绑卡，就容易卡住。你这次给出的信息更适合整理成一篇“自己开卡”的教程。
      </p>
      <CodeBlock lang="text" filename="quick-summary" code={QUICK_SUMMARY} />

      <h2 id="why-self">为什么建议自己开卡</h2>
      <p>这类教程最大的价值，不是“帮你代操作”，而是让你把卡的控制权拿回来。</p>
      <ul>
        <li>卡是你自己账号里开的，后续继续充值、续费、换绑都更主动。</li>
        <li>如果平台后面再做付款验证，你通常还有继续操作的入口。</li>
        <li>不是一次性卡号，用在长期订阅场景更合理。</li>
        <li>后续想切换到其他 AI 平台、SaaS 平台、海外服务，也不必重新找卡源。</li>
      </ul>
      <Callout tone="warn" title="不要把它理解成“零成本拿卡”">
        <p>
          开卡不等于不需要资金准备。你提供的信息里已经明确写了：开卡本身不需要额外开卡费，
          但首次需要充值 10U。这个 10U 更接近“入场余额”或“开卡所需账户资金”，不是完全零成本。
        </p>
      </Callout>

      <h2 id="prepare">开始前要准备什么</h2>
      <CodeBlock lang="text" filename="prepare-checklist" code={PREPARE_CHECKLIST} />
      <p>
        如果你连 U 充值、链路确认和邮箱注册这些基础操作都不想处理，那确实不适合走自助开卡路线。
        这类方案的前提就是：你愿意先多走几分钟流程，换取后续更长期的稳定性。
      </p>

      <h2 id="open">按什么顺序操作</h2>
      <CodeBlock lang="text" filename="open-flow" code={OPEN_FLOW} />
      <StepCard step="1" title="先打开参考注册链接，不要跳步骤">
        <p>
          先通过参考注册链接进入注册页，再按页面流程完成注册和后续开卡步骤。
          如果页面加载较慢，先等待完全展开，不要因为短暂空白就反复刷新。
        </p>
      </StepCard>
      <StepCard step="2" title="先注册，再充值，再开卡">
        <p>
          正确顺序通常是先注册账号、完成基础资料，再进入充值与开卡流程。不要一上来就想着先找卡号，因为这篇教程的重点不是代开卡。
        </p>
      </StepCard>
      <StepCard step="3" title="开卡后先做小额验证">
        <p>
          拿到卡信息后，不建议第一笔就直接拿去做高额支付。更稳的做法是先绑定一个目标平台，完成一笔小额验证或低风险扣款，
          确认账单信息、风控和余额逻辑都通了，再继续大额或长期使用。
        </p>
      </StepCard>

      <h2 id="topup">10U 充值怎么理解</h2>
      <p>
        你给出的说明里，最关键的一句是“开卡不需要开卡费，但是要充 10U”。这意味着：
      </p>
      <ul>
        <li>平台可能不额外收“工本费”，但仍要求账户里先有最低可用资金。</li>
        <li>这 10U 不是白交，通常会变成你的卡内或账户内可用余额的一部分。</li>
        <li>后续如果要继续消费、验证或维持可用状态，通常还需要自己继续充值。</li>
      </ul>
      <Callout tone="tip" title="关于代充">
        <p>
          你已经提到“充 U 可以闲鱼搜代充”。这确实是很多人会选的路径，但风险点也很明确：一定先确认对方支持的链、
          到账时间、是否需要备注、失败怎么处理。不要在没确认网络和地址的情况下直接转。
        </p>
      </Callout>

      <h2 id="bind">开卡后怎么使用</h2>
      <p>按你给出的信息，这类卡有两个非常实用的用途：</p>
      <ul>
        <li>可绑定海外 AI 平台、海外订阅平台或其他需要美区支付方式的服务。</li>
        <li>可绑定支付宝消费，作为后续日常使用或账户维护的一部分。</li>
      </ul>
      <p>实际绑定时，重点注意三件事：</p>
      <ul>
        <li>卡号、有效期、CVV、账单姓名和账单地址要和开卡平台给出的信息一致。</li>
        <li>平台如果做 1 美元预授权或小额验证，不要误判为异常扣费。</li>
        <li>第一次绑定失败时，先排查地址、IP、卡余额和平台风控，不要连续狂点重试。</li>
      </ul>

      <h2 id="ai">适合哪些 AI 平台场景</h2>
      <CodeBlock lang="text" filename="ai-scenes" code={AI_SCENES} />
      <p>
        对 AI 用户来说，这类长期虚拟卡的核心价值不在“首次付款”，而在“后续还能继续稳定扣款”。
        很多时候真正麻烦的是第二次、第三次验证，而不是第一次绑定。
      </p>

      <h2 id="avoid">哪些坑最容易踩</h2>
      <CodeBlock lang="text" filename="warning-notes" code={WARNING_NOTES} />
      <p>再强调一遍，这类教程最大的误区通常有两个：</p>
      <ul>
        <li>把“自己注册开卡”误解成“别人直接给你一张现成可用卡”。</li>
        <li>把“没有额外开卡费”误解成“完全不需要准备任何资金”。</li>
      </ul>

      <h2 id="faq">常见问题</h2>
      <h3>为什么不建议买一次性现成卡？</h3>
      <p>
        因为很多平台后续会重新验证付款方式。一次性卡号就算第一次过了，后面换套餐、续费、补验证时也可能彻底失去控制权。
      </p>

      <h3>10U 充值后可以提现吗？</h3>
      <p>
        这取决于开卡平台本身的余额规则、卡余额规则和退款规则。你给出的已知信息里没有明确说明，所以这一项必须以实际平台规则为准。
      </p>

      <h3>绑定支付宝消费是什么意思？</h3>
      <p>
        按你提供的说法，卡片可以用于绑定支付宝进行消费。但具体是直接绑卡消费、还是通过某种中间支付逻辑实现，仍然要以实际页面和绑定结果为准。
      </p>

      <h3>我只想拿来订阅 ChatGPT / Claude，可以吗？</h3>
      <p>
        从场景上看可以，但是否成功还取决于目标平台当前的风控策略、网络环境、账单信息匹配度和付款验证逻辑。这不是卡本身单方面决定的。
      </p>

      <h2 id="source">参考注册链接</h2>
      <p>
        注册链接：
        {' '}
        <a
          href="https://wap.roogoo.cloud/register?inviteCode=cg9rxt"
          target="_blank"
          rel="noreferrer"
        >
          https://wap.roogoo.cloud/register?inviteCode=cg9rxt
        </a>
      </p>
      <Callout tone="tip" title="注册链接权益说明">
        <p>
          通过本链接注册可享免费开卡、7 天 0 费率试用，并可按平台规则升级卡片终身 0 费率权益。
          页面还可能提供余额赚币收益、消费挖矿、邀请返佣等活动，具体以注册页和平台实时规则为准。
        </p>
      </Callout>
    </DocPage>
  )
}
