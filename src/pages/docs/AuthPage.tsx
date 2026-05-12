import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { FieldTable } from '../../components/ui/FieldTable'

/**
 * 文档：认证与计费
 *
 * 这页关键点是把"用户最常误解的安全细节"写清楚，
 * 而把所有具体定价、限速、SLA 数字都明确指向控制台动态下发，
 * 避免文档与现实漂移。
 */

const HEADER = `# 通用 HTTP Header
Authorization: Bearer $GPT88_API_KEY
Content-Type: application/json

# 可选：透传业务用户 ID，用于审计与风控
X-Gpt88-User: usr_abc123

# 可选：幂等键，重试同一逻辑请求时复用
Idempotency-Key: 9c4a52a4-2fdd-4b49-9e72-1a7b7b4e3a01`

const ROTATE = `# 1. 在控制台创建新 Key（标注用途，例如 web-prod-2026Q2）
# 2. 滚动部署：先把新 Key 发到环境变量 GPT88_API_KEY_NEXT
# 3. 应用读取顺序：优先 NEXT，回退老 Key（双 Key 阶段）
# 4. 监控指标全部稳定后，把新 Key 改回 GPT88_API_KEY，删除老 Key`

const BILLING_COMPARE = [
  {
    name: '传统中转站',
    type: '积分盘 / 虚拟额度',
    required: false,
    description: '充值后先换成虚拟额度、刀或积分，不同模型再乘倍率，用户需要自己换算真实成本。',
  },
  {
    name: 'gpt88.cc',
    type: '人民币余额 / Token 电力',
    required: true,
    description: '充值 1 元就是账户 1 元余额，模型实际消耗多少就扣多少，成本以人民币清晰呈现。',
  },
]

export default function AuthPage() {
  return (
    <DocPage
      path="/docs/auth"
      title="认证与计费"
      description="gpt88.cc 使用 Bearer Token 鉴权。计费、限速与 SLA 等数值由控制台与后端配置动态下发，本页面不固化具体数字。"
      headings={[
        { id: 'auth', text: '鉴权方式', level: 2 },
        { id: 'header', text: '通用 Header', level: 2 },
        { id: 'security', text: '密钥安全', level: 2 },
        { id: 'rotation', text: '密钥轮换', level: 2 },
        { id: 'billing', text: '用量与计费', level: 2 },
        { id: 'token-power', text: 'AI 电网与 Token 电力', level: 2 },
        { id: 'billing-questions', text: '用户常问：倍率、额度、积分', level: 2 },
        { id: 'limits', text: '限速与配额', level: 2 },
        { id: 'sla', text: 'SLA 与状态', level: 2 },
      ]}
    >
      <h2 id="auth">鉴权方式</h2>
      <p>
        所有请求都使用 HTTP <code>Authorization: Bearer &lt;API_KEY&gt;</code>。
        API Key 以 <code>sk-</code> 开头，长度 40+，请视为生产 secret 妥善保管。
      </p>

      <h2 id="header">通用 Header</h2>
      <p>除鉴权外，gpt88.cc 还认识下面这些可选 Header：</p>
      <CodeBlock lang="http" code={HEADER} />

      <h2 id="security">密钥安全</h2>
      <ul>
        <li>
          <strong>仅在服务端使用</strong>：浏览器、移动端、桌面客户端都无法可靠保管 secret，
          请通过自己的 server / Edge route 转发。
        </li>
        <li>
          <strong>不要写进代码仓库</strong>：使用环境变量、Vault、云厂商 secret manager。
        </li>
        <li>
          <strong>最小权限</strong>：在控制台为每个项目 / 每个环境创建独立 Key，
          只授予所需模型权限。
        </li>
        <li>
          <strong>泄露立刻撤销</strong>：在控制台「API Keys」页面一键 revoke，
          受影响的请求会立刻返回 <code>401 invalid_api_key</code>。
        </li>
      </ul>

      <Callout tone="danger" title="一旦发现泄露">
        <p>
          立刻在控制台撤销该 Key，并搜索代码仓库 / 日志确认是否还有备份；
          再创建新 Key 走<Link to="/docs/auth#rotation">滚动轮换</Link>。
        </p>
      </Callout>

      <h2 id="rotation">密钥轮换</h2>
      <p>推荐的零停机轮换流程：</p>
      <CodeBlock lang="bash" code={ROTATE} />

      <h2 id="billing">用量与计费</h2>
      <Callout tone="warn" title="本文档不写具体单价">
        <p>
          每个模型的 <strong>输入 / 输出单价</strong>、计费单位（千 token 或调用次数）、
          阶梯优惠均由 gpt88.cc 控制台与后端配置动态下发，会随上游 provider 政策与商务合同变更。
          请以你账号在控制台「Billing」页面看到的实时定价为准。
        </p>
        <p>
          每次成功响应都会带上 <code>usage.prompt_tokens</code> /
          <code>completion_tokens</code> / <code>total_tokens</code>，
          可以用于客户端侧的成本预估与告警。
        </p>
      </Callout>

      <h2 id="token-power">AI 电网与 Token 电力</h2>
      <p>
        很多用户从其他中转站迁移过来时，会习惯先问：
        <strong>倍率多少</strong>、<strong>1 块等于多少刀</strong>、
        <strong>额度怎么算</strong>、<strong>有没有积分体系</strong>。
        gpt88.cc 的计费思路和传统「积分盘」不太一样。我们更愿意把它理解成
        <strong>AI 电网</strong>：Token 就像 AI 世界里的电力，按真实消耗计费，而不是先把人民币换成一层空气积分。
      </p>

      <div className="my-6 rounded-xl border border-sky-400/20 bg-sky-400/[0.06] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
          AI Grid
        </div>
        <p className="mt-2 text-lg font-semibold text-ink-50">
          我们卖的不是「积分」，而是稳定的 AI Token 电力。
        </p>
        <p className="mt-2 text-sm leading-7 text-ink-300">
          就像用电按度计费、用水按吨计费，AI 使用也应该回到真实资源消耗：
          你实际用了多少 Token，就清楚看到花了多少钱。
        </p>
      </div>

      <FieldTable
        rows={BILLING_COMPARE}
      />

      <h3 id="billing-model">我们的计费方式</h3>
      <ul>
        <li>
          <strong>按人民币真实计价</strong>：充值 1 元 = 账户 1 元余额。
        </li>
        <li>
          <strong>按模型实际消耗扣费</strong>：模型实际消耗多少 Token，就按对应实时单价扣多少。
        </li>
        <li>
          <strong>不玩复杂倍率</strong>：不需要研究 0.5x、2x、组倍率或虚拟额度换算。
        </li>
        <li>
          <strong>成本透明可追踪</strong>：每次请求都能看到 token usage，用量、扣费和排障都围绕真实数据展开。
        </li>
      </ul>

      <Callout tone="info" title="像看电费一样看 AI 成本">
        <p>
          家里用电时，你不会问「电的倍率是多少」，只会看用了多少度电、花了多少钱。
          AI 未来也会越来越像这样：Token 是 AI 的电力，账户余额是你的电费余额。
        </p>
      </Callout>

      <h2 id="billing-questions">用户常问：倍率、额度、积分</h2>
      <p>
        如果你之前使用的是「充值 → 换额度 / 刀 / 积分 → 再按模型倍率扣除」的中转站，
        可以用下面的方式理解 gpt88.cc：
      </p>
      <ul>
        <li>
          <strong>你们倍率多少？</strong>
          没有传统积分盘里的复杂倍率。不同模型有不同实际单价，最终以人民币余额扣费。
        </li>
        <li>
          <strong>1 块等于多少刀？</strong>
          1 元就是账户 1 元余额，不再先折算成虚拟美元额度或空气积分。
        </li>
        <li>
          <strong>额度怎么算？</strong>
          额度就是人民币余额和模型实际消耗。看 Token 用量、看人民币扣费，不需要二次换算。
        </li>
        <li>
          <strong>有没有积分体系？</strong>
          核心计费不依赖积分体系。我们更偏向「电费模式」：透明、简单、可长期开发。
        </li>
      </ul>

      <h2 id="limits">限速与配额</h2>
      <Callout tone="warn" title="限速由控制台配置，本文档不固化数字">
        <p>
          gpt88.cc 在网关层提供：
        </p>
        <ul className="list-disc pl-5">
          <li>账号级 RPM / TPM 限速；</li>
          <li>单个 API Key 的 RPM / TPM / 并发数；</li>
          <li>单个模型的并发与排队上限。</li>
        </ul>
        <p>
          具体上限以你账号在控制台「Quota」页面看到的为准。触发时返回
          <code>429 rate_limit_exceeded</code>，请按{' '}
          <Link to="/docs/api/errors#retry">重试策略</Link> 处理。
        </p>
      </Callout>

      <h2 id="sla">SLA 与状态</h2>
      <p>
        gpt88.cc 是统一网关，整体可用性同时受网关本身和上游 provider 共同决定。
        在启用智能路由的账号上，单个 provider 故障会自动切换到备用 provider，
        进一步降低对应用的影响。
      </p>
      <Callout tone="info" title="实际 SLA 数值以合同为准">
        <p>
          月可用性目标、补偿条款等正式 SLA 文本以你的商务合同 / 控制台公开的服务条款为准，
          本文档不写具体百分比。运行状态可通过 gpt88.cc 状态页（控制台内提供链接）实时查看。
        </p>
      </Callout>
    </DocPage>
  )
}
