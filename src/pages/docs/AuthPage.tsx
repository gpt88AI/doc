import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { FieldTable } from '../../components/ui/FieldTable'
import { useLocale } from '../../lib/locale'
import AuthPageEn from '../en/AuthPageEn'
import LocalizedCorePage from '../LocalizedCorePage'

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
    type: '官方用量 / 分组倍率',
    required: true,
    description: '充值 1 元就是账户 1 元余额，实际扣费按官方用量乘所选分组倍率计算，成本以人民币清晰呈现。',
  },
]

export default function AuthPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <AuthPageEn />
  if (locale !== 'zh') return <LocalizedCorePage kind="auth" />

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
          再创建新 Key 走<Link to="/docs/auth/#rotation">滚动轮换</Link>。
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

      <Callout tone="danger" title="重要说明：分组倍率决定实际扣费">
        <p>
          <strong>倍率</strong>是指：您每消耗 <strong>$1</strong> 的官方 API 额度，平台从您的余额中扣除的人民币金额。
          实际扣费（元）= 官方用量（美元）× 该分组倍率。
        </p>
        <ul className="list-disc pl-5">
          <li>分组倍率为 2.0：消耗 $1 官方额度，扣除 ¥2.0。</li>
          <li>分组倍率为 0.5：消耗 $1 官方额度，扣除 ¥0.5。</li>
          <li>倍率越低，单位用量越便宜。</li>
        </ul>
        <p>
          各分组的倍率显示在「API 密钥」页面的分组选择处。不同分组对应不同的上游线路与稳定性，倍率随之不同，您可按需切换。
        </p>
        <p>
          查找模型和价格时，可先查看
          <a className="text-cyan-300 hover:text-cyan-200" href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>，
          再通过
          <a className="text-cyan-300 hover:text-cyan-200" href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">官网定价页面</a>了解公开价格与套餐。
          账户实际可用模型、分组倍率和最终扣费仍以控制台当前显示为准。
        </p>
        <p>
          充值为 1:1 折算：充值 ¥1 = 余额 1.00。页面以 <code>$</code> 符号显示时，实际单位仍为人民币。
        </p>
      </Callout>

      <h2 id="token-power">AI 电网与 Token 电力</h2>
      <p>
        很多用户从其他中转站迁移过来时，会习惯先问：
        <strong>倍率多少</strong>、<strong>1 块等于多少刀</strong>、
        <strong>额度怎么算</strong>、<strong>有没有积分体系</strong>。
        gpt88.cc 的计费思路是把 Token 看成 AI 世界里的电力：官方用量是实际消耗，
        分组倍率是不同上游线路对应的换算系数，最终从人民币余额中扣费。
      </p>

      <div className="my-6 rounded-xl border border-sky-400/20 bg-sky-400/[0.06] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
          AI Grid
        </div>
        <p className="mt-2 text-lg font-semibold text-ink-50">
          我们提供的是可按官方用量核算的 AI Token 电力。
        </p>
        <p className="mt-2 text-sm leading-7 text-ink-300">
          就像不同供电线路可能有不同服务成本，AI 分组也可能有不同倍率：
          你可以在 API 密钥页面查看当前分组倍率，再按官方用量核算实际扣费。
        </p>
      </div>

      <FieldTable
        rows={BILLING_COMPARE}
      />

      <h3 id="billing-model">我们的计费方式</h3>
      <ul>
        <li>
          <strong>充值按 1:1 折算</strong>：充值 ¥1 = 余额 1.00；页面的 <code>$</code> 符号不代表美元余额。
        </li>
        <li>
          <strong>按官方用量与分组倍率扣费</strong>：实际扣费（元）= 官方用量（美元）× 所选分组倍率。
        </li>
        <li>
          <strong>分组影响单位成本</strong>：倍率越低，单位用量越便宜；不同分组对应不同上游线路与稳定性。
        </li>
        <li>
          <strong>成本透明可追踪</strong>：分组倍率在「API 密钥」页面展示，每次请求的 Token usage 和扣费以控制台记录为准。
        </li>
      </ul>

      <Callout tone="info" title="像看电费一样看 AI 成本">
        <p>
          先确认所选分组的倍率，再结合官方用量判断成本。账户余额是你的人民币余额，
          充值到账和页面显示都按 1:1 处理。
        </p>
      </Callout>

      <h2 id="billing-questions">用户常问：倍率、额度、积分</h2>
      <p>
        如果你之前使用的是「充值 → 换额度 / 刀 / 积分 → 再按模型倍率扣除」的中转站，
        可以按下面的口径理解 gpt88.cc：
      </p>
      <ul>
        <li>
          <strong>你们倍率多少？</strong>
          倍率按分组显示在「API 密钥」页面的分组选择处，不同分组对应不同上游线路与稳定性。
        </li>
        <li>
          <strong>1 块等于多少刀？</strong>
          充值 ¥1 = 余额 1.00。页面以 <code>$</code> 符号展示时，实际单位仍为人民币；官方用量美元仅用于扣费公式换算。
        </li>
        <li>
          <strong>额度怎么算？</strong>
          先读取官方 API 用量，再乘以所选分组倍率得到人民币扣费；倍率越低，单位用量越便宜。
        </li>
        <li>
          <strong>有没有积分体系？</strong>
          充值余额不是积分。实际扣费只需要关注官方用量、所选分组倍率和控制台记录。
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
          <Link to="/docs/api/errors/#retry">重试策略</Link> 处理。
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
