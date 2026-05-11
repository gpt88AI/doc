import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Cpu,
  ExternalLink,
  Info,
  Layers,
  Rocket,
  SearchX,
  Star,
  Tag,
  Target,
} from 'lucide-react'
import { CodeTabs } from '../components/ui/CodeTabs'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Callout } from '../components/ui/Callout'
import { EndpointBadge } from '../components/ui/EndpointBadge'
import {
  CATEGORY_META,
  MODELS,
  findModel,
  type ModelEntry,
} from '../data/models'

/**
 * 模型详情页 (M3 + Human msg-20260509-qoz7ey/jwfia3/8ivlof 全量 catalog)
 *
 * 路由：/models/:slug
 *
 * 信息架构（参考 apimart 详情页心智，UI 不照搬）：
 * 1) Hero：模型名 + provider + tagline + 主 CTA「在 gpt88.cc 获取 API Key」(外链)
 *    + 次 CTA「快速开始」(站内 Link) + 复制 modelId 胶囊
 * 2) 关键信息卡（侧栏）：modelId / provider / category / vendors_count / 接口路径
 * 3) 能力标签 + 推荐场景：仅 featured 8 个有人工文案，其他模型显示「以控制台为准」
 * 4) 接口路径徽章 + 请求示例（cURL / Python / Node.js）
 * 5) 期望响应（精简 JSON 示例）
 * 6) 同分类相关模型（按 vendors_count 取前 4）
 *
 * 关于"slug 无效"的处理（QA 反馈 t-20260508-ekhzqd）：
 *
 * 早期实现是 `<Navigate to="/models" replace />`，纯客户端重定向。
 * 它依赖两个前提：
 *   1) 客户端 JS 能正常加载（react-router 需要先渲染才能触发 Navigate）；
 *   2) 托管平台已经把任意路径 200 rewrite 到 index.html。
 * 如果其中任一不成立——例如 SPA fallback 漏配、或者中间有 CDN 把 404 透传，
 * 用户会看到一闪而过的空白甚至直接 404，体验非常糟糕。
 *
 * 因此现在不再"悄悄重定向"，而是显式渲染一个内嵌的"模型未找到"分支：
 *   - 给出明确中文提示和返回入口；
 *   - 即使没拿到模型数据，路由本身仍命中 /models/:slug，
 *     一旦 SPA fallback 生效，用户立即看到的是友好提示而不是空白；
 *   - 没有埋在 useEffect 里，避免 SSR / hydration 闪烁与回退被生命周期吞掉。
 *
 * 注意：本分支只解决"客户端命中路由后 slug 无对应模型"这一情况。
 * 如果 SPA rewrite 完全没配置，浏览器在拿到 index.html 之前就已 404，
 * 那是部署侧问题，需要 web/public/_redirects + vercel.json 等配合解决，
 * 详见 README 的"静态部署 SPA Fallback"段落。
 */

export default function ModelDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const model = slug ? findModel(slug) : undefined

  // 路由切换时回到顶部，避免承接上一篇详情的滚动位置
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!model) {
    // 显式分支：渲染"模型未找到"提示，而不是悄悄 <Navigate>。
    // 这样在 SPA fallback 命中后，用户能立刻看到清晰的中文提示和回退入口。
    return <ModelNotFound slug={slug} />
  }

  return <DetailContent model={model} />
}

function DetailContent({ model }: { model: ModelEntry }) {
  // 同分类的相关模型，按 vendors_count 降序取前 4
  const related = useMemo(
    () =>
      MODELS
        .filter(m => m.category === model.category && m.slug !== model.slug)
        .sort((a, b) => b.vendorsCount - a.vendorsCount)
        .slice(0, 4),
    [model],
  )

  return (
    <div className="relative isolate">
      {/* 背景光晕 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="text-xs text-ink-400" aria-label="面包屑">
          <Link to="/models" className="inline-flex items-center gap-1 hover:text-ink-200">
            <ArrowLeft className="h-3 w-3" />
            模型导航
          </Link>
          <span className="mx-2 text-ink-600">/</span>
          <span className="text-ink-300">
            {CATEGORY_META[model.category].title}
          </span>
          <span className="mx-2 text-ink-600">/</span>
          <span className="text-ink-100">{model.name}</span>
        </nav>

        {/* Hero */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-200 ring-1 ring-violet-500/30">
              {CATEGORY_META[model.category].title}
            </span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-ink-300">
              {model.provider}
            </span>
            {model.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-semibold text-amber-200">
                <Star className="h-3 w-3" />
                主推模型
              </span>
            ) : null}
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-ink-300">
              {model.vendorsCount} 家上游
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
            {model.name}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-ink-300 sm:text-base">
            {model.tagline}
          </p>

          {/* 主 CTA / 次 CTA / 复制 modelId */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/*
             * 主 CTA：跳到 gpt88.cc 控制台获取 API Key。
             * 这是站点根域 gpt88.cc 本身（白名单内），用 <a target="_blank">
             * 真实跳转，不要试图用 <Link>。
             */}
            <a
              href="https://gpt88.cc"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.02]"
            >
              在 gpt88.cc 获取 API Key
              <ExternalLink className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink-100 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              <Rocket className="h-4 w-4 text-violet-300" />
              快速开始
            </Link>
            <ModelIdPill modelId={model.modelId} />
          </div>
        </header>

        {/* 主体 */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          {/* 左主体 */}
          <div className="min-w-0 space-y-10">
            {/*
             * Human 新需求：每个模型都要有更完整的文字介绍，而不只是标签。
             * 这里把数据层新增的 overview / whenToUse / integrationNotes / caveats
             * 渲染成四个文本区块；主推 21 个走人工精修层，其他长尾走模板层。
             * 如果未来某些模型对应数组为空，仍由 ConsoleAuthoritativeNote 兜底。
             */}
            <Section icon={Info} title="模型概览">
              <DetailBulletList field="模型概览" items={model.overview} />
            </Section>

            <Section icon={Target} title="适用场景">
              <DetailBulletList field="适用场景" items={model.whenToUse} />
            </Section>

            <Section icon={Layers} title="接入说明">
              <DetailBulletList field="接入说明" items={model.integrationNotes} />
            </Section>

            <Section icon={Info} title="使用提醒">
              <DetailBulletList field="使用提醒" items={model.caveats} />
            </Section>

            {/* 能力标签：紧凑标签层 */}
            <Section icon={Tag} title="能力标签">
              {model.capabilities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {model.capabilities.map(cap => (
                    <span
                      key={cap}
                      className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              ) : (
                <ConsoleAuthoritativeNote field="能力标签" />
              )}
            </Section>

            {/* 推荐场景：紧凑标签层 */}
            <Section icon={Target} title="推荐场景">
              {model.scenarios.length > 0 ? (
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {model.scenarios.map(s => (
                    <li
                      key={s}
                      className="flex items-start gap-2 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-ink-200"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <ConsoleAuthoritativeNote field="推荐场景" />
              )}
            </Section>

            {/* 接口路径 */}
            <Section icon={Layers} title="接口路径">
              <div className="space-y-3">
                <EndpointBadge
                  method={model.endpoint.method}
                  path={`https://gpt88.cc${model.endpoint.path}`}
                />
                <p className="text-sm text-ink-300">
                  请求需在 Header 中携带{' '}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-violet-200">
                    Authorization: Bearer &lt;API_KEY&gt;
                  </code>
                  。完整字段说明见{' '}
                  <Link to="/docs/api/chat-completions" className="text-violet-300 hover:text-violet-200">
                    API Reference
                  </Link>
                  。
                </p>
              </div>
            </Section>

            {/* 请求示例 */}
            <Section icon={Cpu} title="请求示例">
              <CodeTabs tabs={model.examples} />
              <Callout tone="warn" title="价格、限速、SLA 不在此页固化">
                <p>
                  不同模型的单价、并发上限、限速、SLA 与可用上下文，会随账号等级与控制台配置动态调整。
                  本页面只描述协议字段；具体数字请以 gpt88.cc 控制台为准。
                </p>
              </Callout>
              <ExpectedResponse model={model} />
            </Section>
          </div>

          {/* 右侧栏 */}
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* 基础信息 */}
            <div className="tech-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                基础信息
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <InfoRow label="Provider" value={model.provider} />
                <InfoRow
                  label="Model ID"
                  value={<code className="font-mono text-violet-200">{model.modelId}</code>}
                />
                <InfoRow label="分类" value={CATEGORY_META[model.category].title} />
                <InfoRow
                  label="上游"
                  value={`${model.vendorsCount} 家 vendor`}
                />
                <InfoRow
                  label="接口"
                  value={
                    <code className="font-mono text-ink-200">
                      {model.endpoint.method} {model.endpoint.path}
                    </code>
                  }
                />
              </dl>
            </div>

            {/* 同分类相关模型 */}
            {related.length > 0 ? (
              <div className="tech-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  同分类相关模型
                </h3>
                <ul className="mt-3 space-y-2">
                  {related.map(r => (
                    <li key={r.slug}>
                      <Link
                        to={`/models/${r.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-ink-200 hover:bg-white/5"
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-ink-100 group-hover:text-violet-200">
                            {r.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-400">
                            {r.provider} · {r.vendorsCount} 家上游
                          </span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* 返回模型导航 */}
            <Link
              to="/models"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-200"
            >
              <ArrowLeft className="h-3 w-3" />
              返回模型导航
            </Link>
          </aside>
        </div>
      </section>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 详细说明层列表
 *
 * overview / whenToUse / integrationNotes / caveats 都走这一层：
 * - 主推 21 个使用人工精修文案
 * - 长尾模型使用模板生成文案
 * - 若未来有模型对应字段为空，则回退到「以控制台为准」而不是留白
 * ────────────────────────────────────────────────────────────────── */
function DetailBulletList({
  field,
  items,
}: {
  field: string
  items: string[]
}) {
  if (items.length === 0) {
    return <ConsoleAuthoritativeNote field={field} />
  }
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-md border border-white/5 bg-white/[0.02] px-3 py-3 text-sm leading-relaxed text-ink-200"
        >
          <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 「以控制台为准」占位
 *
 * 用于长尾模型的能力标签 / 推荐场景区。marketplace 快照里没有这些字段，
 * 也不能瞎猜——直接告诉读者去控制台看，避免文档与真实能力漂移。
 * ────────────────────────────────────────────────────────────────── */
function ConsoleAuthoritativeNote({ field }: { field: string }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-white/5 bg-white/[0.02] px-3 py-3 text-sm text-ink-300">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
      <p>
        该模型的{field}以 gpt88.cc 控制台为准。本页只展示协议字段与请求示例，
        具体能力 / 推荐场景 / 上下文长度等信息会随上游版本变更，
        请在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          gpt88.cc 控制台
        </a>{' '}
        查看实时清单。
      </p>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 辅助：可复制的 Model ID 胶囊
 * ────────────────────────────────────────────────────────────────── */
function ModelIdPill({ modelId }: { modelId: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(modelId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* 复制失败时静默忽略，不打断用户 */
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      className="group inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 font-mono text-xs text-violet-100 hover:bg-violet-500/15"
      aria-label="复制 model id"
      title="复制 model id"
    >
      <span className="text-ink-400">model:</span>
      <span>{modelId}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-300" />
      ) : (
        <span className="text-[10px] uppercase tracking-wider text-violet-300/80 group-hover:text-violet-200">
          复制
        </span>
      )}
    </button>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[11.5px] uppercase tracking-wider text-ink-500">
        {label}
      </dt>
      <dd className="min-w-0 truncate text-right text-sm text-ink-100">
        {value}
      </dd>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
        <Icon className="h-4 w-4 text-violet-300" />
        <h2 className="text-base font-semibold text-ink-50">{title}</h2>
      </div>
      {children}
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 期望响应：每个分类各自有一个示例 JSON，让读者看完调用就知道返回什么
 * ────────────────────────────────────────────────────────────────── */
function ExpectedResponse({ model }: { model: ModelEntry }) {
  const code = useMemo(() => buildExpectedResponse(model), [model])
  return (
    <div className="mt-4">
      <p className="text-sm text-ink-300">期望响应（精简示例）：</p>
      <CodeBlock lang="json" filename="200 OK" code={code} className="mt-2" />
    </div>
  )
}

function buildExpectedResponse(model: ModelEntry): string {
  switch (model.category) {
    case 'chat':
      return `{
  "id": "chatcmpl-${model.slug.slice(0, 8)}",
  "object": "chat.completion",
  "created": 1730000000,
  "model": "${model.modelId}",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": { "role": "assistant", "content": "..." }
    }
  ],
  "usage": { "prompt_tokens": 24, "completion_tokens": 64, "total_tokens": 88 }
}`
    case 'image':
      return `{
  "created": 1730000000,
  "data": [
    { "url": "https://cdn.gpt88.cc/images/${model.slug}-001.png" }
  ]
}`
    case 'video':
      return `{
  "id": "video_${model.slug.slice(0, 8)}",
  "status": "queued",
  "model": "${model.modelId}",
  "created": 1730000000
}`
    case 'audio':
      // TTS 与 STT 返回不同；用 model.endpoint.path 区分
      if (model.endpoint.path.includes('transcriptions')) {
        return `{
  "text": "完整识别文本……",
  "language": "zh",
  "duration": 124.6,
  "segments": [
    { "id": 0, "start": 0.0, "end": 4.2, "text": "..." }
  ]
}`
      }
      return `// 二进制响应：Content-Type: audio/mpeg
// 直接写入磁盘即可，例如 speech.mp3`
  }
}

/* ──────────────────────────────────────────────────────────────────
 * 模型未找到分支
 *
 * 当用户访问 /models/<未知 slug> 时显示。
 *
 * 设计要点：
 * - 不再使用 <Navigate>。原因见文件顶部说明：纯客户端重定向在静态深链
 *   场景下要么闪一下、要么和 SPA fallback 缺失叠加成 404。
 * - 这里给出明确中文文案、原始 slug 回显，以及"返回模型导航"和
 *   "查看快速开始"两条出口，让用户立刻有下一步操作。
 * - 复用现有 Tailwind class 与 lucide 图标，不引入新依赖。
 * ────────────────────────────────────────────────────────────────── */
function ModelNotFound({ slug }: { slug?: string }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30">
        <SearchX className="h-6 w-6" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
        没有找到这个模型
      </h1>
      <p className="mt-3 text-sm text-ink-300 sm:text-base">
        我们在模型清单里没有匹配
        {slug ? (
          <>
            {' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-violet-200">
              {slug}
            </code>{' '}
          </>
        ) : (
          ' '
        )}
        的条目。可能是模型已下线、链接拼写有误，或者还未上线。
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {/* 站内深链统一使用 <Link>，避免在 BrowserRouter 下整页刷新 */}
        <Link
          to="/models"
          className="inline-flex items-center gap-2 rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400"
        >
          <Compass className="h-4 w-4" />
          查看全部模型
        </Link>
        <Link
          to="/docs/quickstart"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink-100 hover:border-violet-500/40 hover:bg-violet-500/10"
        >
          先看快速开始
        </Link>
      </div>
    </section>
  )
}
