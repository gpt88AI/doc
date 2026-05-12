import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { DocPage } from '../../components/layout/DocPage'
import { cn } from '../../lib/cn'

/**
 * 文档：FAQ
 *
 * 这个页面价值在于把"读完文档前最常误解的点"集中放出来。
 * 用一个轻量的可展开列表（不依赖 details/summary 的 marker 难定制问题），
 * 同时仍保持纯静态 + 可服务端渲染。
 *
 * Human msg-20260509-jwfia3 + msg-20260509-qoz7ey 确认：
 * base_url 默认 https://gpt88.cc/v1；china.claudecoder.me 与 world.claudecoder.me
 * 是等价端点，本页"兼容性"分组新增「我能用其他 base_url 吗？」一条 FAQ 说明这一点。
 */

type QA = { q: string; a: React.ReactNode; group: string }

const FAQ: QA[] = [
  {
    // Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
    // 放在最前面、单独"入门"分组，让首次到访 FAQ 页的读者第一眼就看到答案。
    group: '入门',
    q: '我在哪里获取 API Key？',
    a: (
      <p>
        访问{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台 → 「API Keys」页面 → 创建新的 Key。复制后注入到环境变量
        <code>GPT88_API_KEY</code>，再按照{' '}
        <Link to="/docs/quickstart">快速开始</Link> 跑通第一次调用。
      </p>
    ),
  },
  {
    // PM 任务 t-20260509-12if9n / 草稿 doc-20260509-0myy76：
    // 控制台「配置文件导出」可以把 Key + 模型 + 线路打包给目标工具，
    // 这里在"入门"分组紧邻 API Key 那一条放一条配套 FAQ。
    group: '入门',
    q: '我能否把 API Key 一键导入到 Claude Code / Cursor / OpenCode？',
    a: (
      <p>
        可以。在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台进入「配置文件导出」，选择 API Key、模型、调用线路和目标工具后即可复制配置或一键导入到 CC Switch；
        详见站内文档{' '}
        <Link to="/docs/guides/config-export">配置文件导出</Link>。
      </p>
    ),
  },
  {
    group: '兼容性',
    q: 'gpt88.cc 与 OpenAI API 完全兼容吗？',
    a: (
      <>
        <p>
          兼容 OpenAI 的请求结构、错误外形和流式协议。任何官方 / 社区
          OpenAI SDK 把 <code>base_url</code> 改为
          <code>https://gpt88.cc/v1</code> 即可使用。
        </p>
        <p>
          细节差异：<code>/v1/models</code> 返回多了
          <code>capabilities</code> / <code>context_window</code> /
          <code>modalities</code> 字段（向前兼容），错误体里多了
          <code>request_id</code>。详见{' '}
          <Link to="/docs/api/list-models">GET /v1/models</Link>。
        </p>
      </>
    ),
  },
  {
    group: '兼容性',
    q: '能直接用 langchain / litellm / vercel ai sdk 吗？',
    a: (
      <p>
        可以。任何兼容 OpenAI 协议的上层框架都能直接用：把 provider 配置改为
        OpenAI compatible，<code>base_url</code> 设置为
        <code>https://gpt88.cc/v1</code>，<code>api_key</code> 用 gpt88 Key。
      </p>
    ),
  },
  {
    group: '兼容性',
    q: '我能用其他 base_url 吗？',
    a: (
      <>
        <p>
          可以，<code>china.claudecoder.me</code> /{' '}
          <code>world.claudecoder.me</code> /{' '}
          <code>gpt88.cc</code> 三个端点完全等价，
          按你的网络情况选择即可：
        </p>
        <ul className="list-disc pl-5">
          <li><code>https://gpt88.cc/v1</code> — 默认端点；</li>
          <li><code>https://china.claudecoder.me/v1</code> — 中国大陆优先；</li>
          <li><code>https://world.claudecoder.me/v1</code> — 海外优先。</li>
        </ul>
        <p>
          API Key、模型清单、字段语义在三个端点上保持一致，<strong>无需重新生成 Key</strong>。
          详细说明见{' '}
          <Link to="/docs/quickstart#endpoints">快速开始 · 可选服务端点</Link>。
        </p>
      </>
    ),
  },
  {
    group: '模型',
    q: '默认推荐用哪个模型？',
    a: (
      <p>
        无特殊场景时，建议优先从 <code>claude-opus-4-7</code> 或{' '}
        <code>gpt-5.4</code> 起步。轻量任务可选{' '}
        <code>claude-haiku-4-5-20251001</code> 或{' '}
        <code>gpt-5.4-mini</code>；如果你更偏好开源 / 高性价比路线，
        <code>deepseek-v4-pro</code> 等模型也仍是可选补充，但不再作为默认首推。
        模型导航页提供按场景挑选的视图。
      </p>
    ),
  },
  {
    group: '模型',
    q: '如何确认我的账号能调哪些模型？',
    a: (
      <p>
        调用 <Link to="/docs/api/list-models">GET /v1/models</Link>{' '}
        返回的列表就是你这把 Key 当前可用的模型。控制台「API Keys」页面也能查看每把
        Key 的模型权限。
      </p>
    ),
  },
  {
    group: '安全',
    q: '可以在前端浏览器里直接调用 API 吗？',
    a: (
      <p>
        不推荐。任何浏览器或客户端 App 都无法可靠保管 API Key。
        请走自己的 server / Edge route 做转发，仅在服务端进程读取 Key。
        Node SDK 默认 <code>dangerouslyAllowBrowser</code> 为 false，建议保留。
      </p>
    ),
  },
  {
    group: '安全',
    q: 'API Key 泄露了怎么办？',
    a: (
      <p>
        立刻在控制台「API Keys」页面 revoke 该 Key——之后任何使用都会
        返回 <code>401 invalid_api_key</code>。再创建新 Key 走{' '}
        <Link to="/docs/auth#rotation">滚动轮换</Link>，并扫一遍代码仓库 /
        日志确认是否还有备份。
      </p>
    ),
  },
  {
    group: '计费与限速',
    q: '你们倍率多少？1 块等于多少刀？有没有积分体系？',
    a: (
      <>
        <p>
          gpt88.cc 不采用传统「积分盘」逻辑。我们更像 AI 电网：Token 是 AI 世界里的电力，
          充值 1 元就是账户 1 元余额，模型实际消耗多少就按人民币余额扣多少。
        </p>
        <p>
          所以你不需要每天研究模型倍率、组倍率、虚拟额度或真假积分，只需要关注实际用了多少
          Token、实际花了多少钱。详细说明见{' '}
          <Link to="/docs/auth#token-power">AI 电网与 Token 电力</Link>。
        </p>
      </>
    ),
  },
  {
    group: '计费与限速',
    q: '不同模型的具体单价是多少？',
    a: (
      <p>
        本文档不写具体单价。每个模型的输入 / 输出单价、计费单位、阶梯优惠都
        由 gpt88.cc 控制台与后端配置动态下发，会随上游 provider 政策与商务合同变更。
        请以你账号在「Billing」页面看到的实时定价为准。
      </p>
    ),
  },
  {
    group: '计费与限速',
    q: '账号的限速 / 并发上限是多少？',
    a: (
      <p>
        同样不写死。账号级 RPM / TPM、单 Key 的 RPM / TPM / 并发、单个模型的并发与排队
        上限均由控制台 Quota 配置决定。触发时返回{' '}
        <code>429 rate_limit_exceeded</code>，请参考{' '}
        <Link to="/docs/api/errors#retry">重试策略</Link>。
      </p>
    ),
  },
  {
    group: '可靠性',
    q: '上游 provider 故障时会发生什么？',
    a: (
      <p>
        启用智能路由的账号，gpt88.cc 会在多个 provider 之间自动切换，
        优先选择健康节点。完全无法路由时返回 <code>503 service_unavailable</code>，
        建议客户端按指数退避重试。
      </p>
    ),
  },
  {
    group: '可靠性',
    q: '正式 SLA 数值是多少？',
    a: (
      <p>
        正式 SLA（月可用性目标、补偿条款等）以你的商务合同与控制台公开的服务条款为准，
        本文档不写具体百分比。
      </p>
    ),
  },
  {
    group: '排障',
    q: '提交工单时需要提供什么？',
    a: (
      <>
        <p>
          请至少附上：
        </p>
        <ul className="list-disc pl-5">
          <li>失败响应里的 <code>error.request_id</code> 或 Header <code>X-Request-Id</code>；</li>
          <li>HTTP 状态与业务 code；</li>
          <li>调用的模型 ID 与请求时间（含时区）；</li>
          <li>是否有定时复现规律（每小时整点 / 大流量段等）。</li>
        </ul>
      </>
    ),
  },
  {
    group: '排障',
    q: '调用一直慢，是上游问题还是网络问题？',
    a: (
      <p>
        响应 Header <code>X-Upstream-Latency</code> 给出上游模型推理耗时，
        <code>X-Gateway-Latency</code> 给出 gpt88.cc 网关耗时。
        如果两个都很正常但客户端测到很慢，问题大概率在客户端到网关的网络链路上。
      </p>
    ),
  },
]

function FaqItem({ item, defaultOpen }: { item: QA; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen))
  return (
    <div className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.015]">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink-100 hover:bg-white/[0.025]"
      >
        <span>{item.q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-400 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? (
        <div className="space-y-2 border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-ink-200 [&_a]:text-violet-300 hover:[&_a]:text-violet-200 [&_code]:rounded [&_code]:bg-white/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-violet-200">
          {item.a}
        </div>
      ) : null}
    </div>
  )
}

export default function FaqPage() {
  // 按 group 分组渲染
  const groups = Array.from(new Set(FAQ.map(f => f.group)))

  return (
    <DocPage
      path="/docs/faq"
      title="常见问题（FAQ）"
      description="开发者最常踩到的兼容性、安全、计费、可靠性、排障问题。如果还没回答到你的疑问，请提工单并附上 request_id。"
      headings={groups.map(g => ({
        id: `g-${g}`,
        text: g,
        level: 2,
      }))}
    >
      {groups.map((group, gi) => (
        <section key={group}>
          <h2 id={`g-${group}`}>{group}</h2>
          <div className="not-prose flex flex-col gap-2">
            {FAQ.filter(f => f.group === group).map((item, i) => (
              // 第一个分组的第一项默认展开，给读者一个示范
              <FaqItem
                key={item.q}
                item={item}
                defaultOpen={gi === 0 && i === 0}
              />
            ))}
          </div>
        </section>
      ))}
    </DocPage>
  )
}
