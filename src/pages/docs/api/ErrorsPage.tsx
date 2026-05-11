import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * API Reference: 错误码
 *
 * 表格构造：HTTP status -> 业务 code -> 含义 -> 客户端建议处理。
 * 使用一个简单的纯 JS 数组，再用一张表格渲染；不引入 markdown 解析。
 *
 * 注意：业务 code 与 OpenAI 错误码尽量对齐，gpt88.cc 自定义的码以
 * "_gpt88" 后缀或在说明中注明，便于读者识别。
 */

type ErrorRow = {
  status: number
  code: string
  type: string
  message: string
  /** 客户端常见处理策略 */
  handling: string
}

const HTTP_GROUPS: { title: string; rows: ErrorRow[] }[] = [
  {
    title: '4xx 客户端错误',
    rows: [
      {
        status: 400,
        code: 'invalid_request_error',
        type: 'invalid_request_error',
        message: '请求体不合法，例如缺少字段或字段类型错误。',
        handling: '修复请求结构后重试，不要无脑重试。',
      },
      {
        status: 400,
        code: 'context_length_exceeded',
        type: 'invalid_request_error',
        message: '输入 token 超过模型 context_window 上限。',
        handling:
          '裁剪历史消息或换用 context 更大的模型；可以先调用 /v1/models 查 context_window。',
      },
      {
        status: 400,
        code: 'invalid_model',
        type: 'invalid_request_error',
        message: 'model 字段非法或当前账号不可用。',
        handling: '调用 /v1/models 列出可用模型并刷新本地缓存。',
      },
      {
        status: 401,
        code: 'invalid_api_key',
        type: 'authentication_error',
        message: 'API Key 缺失、格式错误或已撤销。',
        handling: '检查环境变量与 Header；必要时在控制台重新生成。',
      },
      {
        status: 403,
        code: 'permission_denied',
        type: 'permission_error',
        message: '当前 Key 没有调用该模型 / 该端点的权限。',
        handling: '在控制台为对应 Key 开通模型权限，或换一把更高权限的 Key。',
      },
      {
        status: 404,
        code: 'model_not_found',
        type: 'invalid_request_error',
        message: '模型 ID 不存在或已下架。',
        handling: '回退到列表中的等价模型；同时刷新 /v1/models 缓存。',
      },
      {
        status: 408,
        code: 'request_timeout',
        type: 'timeout_error',
        message: '上游模型在网关侧设定的超时窗口内未返回。',
        handling: '建议带退避的重试；流式请求可在客户端做断点续读。',
      },
      {
        status: 409,
        code: 'conflict',
        type: 'invalid_request_error',
        message: '资源状态冲突，例如重复的 idempotency key。',
        handling: '更换 idempotency key 或确认上一次请求的最终状态后再处理。',
      },
      {
        status: 413,
        code: 'payload_too_large',
        type: 'invalid_request_error',
        message: '请求体超过网关上限（含 base64 多模态内容）。',
        handling: '压缩或分片上传；图片/音频走对应的多模态接口。',
      },
      {
        status: 422,
        code: 'unprocessable_entity',
        type: 'invalid_request_error',
        message: '语义合法但模型无法处理（例如违反 response_format 约束）。',
        handling: '检查 response_format / tools 定义。',
      },
      {
        status: 429,
        code: 'rate_limit_exceeded',
        type: 'rate_limit_error',
        message: '触发账号 / Key / 模型级限速。',
        handling:
          '退避重试；尊重 Retry-After Header。具体上限以控制台显示为准。',
      },
      {
        status: 429,
        code: 'insufficient_quota',
        type: 'rate_limit_error',
        message: '账户余额或额度不足。',
        handling: '在控制台充值或申请额度，不要重试。',
      },
    ],
  },
  {
    title: '5xx 服务端错误',
    rows: [
      {
        status: 500,
        code: 'internal_error',
        type: 'api_error',
        message: '网关或上游内部错误。',
        handling: '指数退避重试，超过 3 次仍失败建议人工排查并提供 request id。',
      },
      {
        status: 502,
        code: 'upstream_error',
        type: 'api_error',
        message: '上游 provider 返回非预期错误。',
        handling: '可重试；如果稳定复现，换备用模型或联系支持。',
      },
      {
        status: 503,
        code: 'service_unavailable',
        type: 'api_error',
        message: '上游容量受限，常见于热门模型瞬时拥塞。',
        handling: '退避重试；启用智能路由的账号一般会自动切换备用 provider。',
      },
      {
        status: 504,
        code: 'gateway_timeout',
        type: 'api_error',
        message: '网关到上游超时。',
        handling: '同 408；如果是流式请求注意检查 last-event-id。',
      },
    ],
  },
]

const SHAPE = `{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded for model deepseek-v4-pro",
    "param": null,
    "request_id": "req_01HZX3..."
  }
}`

const STATUS_COLOR: Record<string, string> = {
  '2': 'text-emerald-300 bg-emerald-500/10 ring-emerald-400/30',
  '4': 'text-amber-300 bg-amber-500/10 ring-amber-400/30',
  '5': 'text-red-300 bg-red-500/10 ring-red-400/30',
}

function StatusPill({ status }: { status: number }) {
  const cls = STATUS_COLOR[String(status)[0]] ?? 'text-ink-300 bg-white/5'
  return (
    <span
      className={`inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded font-mono text-[12px] font-semibold ring-1 ${cls}`}
    >
      {status}
    </span>
  )
}

export default function ErrorsPage() {
  return (
    <DocPage
      path="/docs/api/errors"
      title="错误码"
      description="gpt88.cc 把上游 provider 的错误统一映射为稳定的 HTTP 状态与业务 code，方便客户端做统一处理。"
      headings={[
        { id: 'shape', text: '错误响应结构', level: 2 },
        { id: 'http', text: 'HTTP 状态对照', level: 2 },
        { id: 'retry', text: '重试策略', level: 2 },
        { id: 'request-id', text: '排障：使用 request_id', level: 2 },
      ]}
    >
      <h2 id="shape">错误响应结构</h2>
      <p>所有错误响应都遵循以下统一结构（与 OpenAI 协议保持兼容）：</p>
      <CodeBlock lang="json" filename="error envelope" code={SHAPE} />

      <Callout tone="info" title="字段语义">
        <ul className="list-disc pl-5">
          <li><code>type</code>：错误类别，对客户端按类别处理更稳定；</li>
          <li><code>code</code>：更精细的业务码，便于日志检索；</li>
          <li><code>message</code>：人类可读描述，可能随版本微调，不要用作匹配依据；</li>
          <li><code>request_id</code>：唯一请求 ID，提交工单时一定要附上。</li>
        </ul>
      </Callout>

      <h2 id="http">HTTP 状态对照</h2>

      {HTTP_GROUPS.map(group => (
        <div key={group.title} className="not-prose mt-8">
          <h3 className="mb-2 text-base font-semibold text-ink-50">
            {group.title}
          </h3>
          <div className="overflow-hidden rounded-lg border border-white/5">
            <table className="hidden w-full text-left text-sm md:table">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="w-20 px-4 py-2.5 font-medium">HTTP</th>
                  <th className="px-4 py-2.5 font-medium">code</th>
                  <th className="px-4 py-2.5 font-medium">含义</th>
                  <th className="px-4 py-2.5 font-medium">建议处理</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r, i) => (
                  <tr
                    key={r.code + i}
                    className={`border-t border-white/5 align-top ${
                      i % 2 === 1 ? 'bg-white/[0.012]' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                        {r.code}
                      </code>
                      <div className="mt-1 font-mono text-[11px] text-ink-500">
                        type: {r.type}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                      {r.message}
                    </td>
                    <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-300">
                      {r.handling}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 移动端：卡片 */}
            <ul className="divide-y divide-white/5 md:hidden">
              {group.rows.map((r, i) => (
                <li key={r.code + i} className="space-y-2 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusPill status={r.status} />
                    <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                      {r.code}
                    </code>
                  </div>
                  <div className="text-[13px] text-ink-200">{r.message}</div>
                  <div className="text-[12px] text-ink-400">
                    建议：{r.handling}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <h2 id="retry">重试策略</h2>
      <ul>
        <li>
          <strong>立即失败</strong>：<code>4xx</code> 中除
          <code>429</code> / <code>408</code> 外，多数无需重试。
        </li>
        <li>
          <strong>指数退避</strong>：<code>429</code> / <code>5xx</code> 推荐
          base = 500ms 起，乘 2，最大 8s，并尊重响应 Header
          <code>Retry-After</code>。
        </li>
        <li>
          <strong>幂等性</strong>：可选发送
          <code>Idempotency-Key</code> Header（UUID v4），
          重试时复用同一个 key，网关会避免重复扣费。
        </li>
        <li>
          <strong>退路模型</strong>：在客户端定义一个备选模型列表，
          遇到 <code>model_not_found</code> / <code>service_unavailable</code> 时降级。
        </li>
      </ul>

      <h2 id="request-id">排障：使用 request_id</h2>
      <p>
        每次响应（成功或失败）都会带上 <code>X-Request-Id</code> Header，
        失败响应体也包含 <code>error.request_id</code>。
        提交工单或在{' '}
        <Link to="/docs/faq">FAQ</Link>
        提到的任何排查流程中都需要这个 ID——它能让我们直接定位到具体一次请求的链路日志。
      </p>
    </DocPage>
  )
}
