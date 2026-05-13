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
import { CodeTabs, type CodeTab } from '../components/ui/CodeTabs'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Callout } from '../components/ui/Callout'
import { EndpointBadge } from '../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../components/ui/FieldTable'
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
                  path={`${apiOriginForModel(model)}${model.endpoint.path}`}
                />
                <p className="text-sm text-ink-300">
                  该路径由模型分类决定：Chat / Image / Video / Audio 使用不同 endpoint，
                  同一分类内通常只需要替换 <code>model</code> 字段。Chat 模型还要区分
                  OpenAI 兼容协议与 Anthropic / Claude 协议。
                </p>
                <p className="text-sm text-ink-300">
                  请求需在 Header 中携带{' '}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-violet-200">
                    Authorization: Bearer &lt;API_KEY&gt;
                  </code>
                  。完整字段说明见{' '}
                  <Link to={apiReferencePathForModel(model)} className="text-violet-300 hover:text-violet-200">
                    {apiReferenceLabelForModel(model)}
                  </Link>
                  。
                </p>
              </div>
            </Section>

            <ModelApiReference model={model} />

            {/* 请求示例 */}
            <Section icon={Cpu} title="请求示例">
              <ModelRequestExamples model={model} />
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

function ModelApiReference({ model }: { model: ModelEntry }) {
  return (
    <Section icon={Cpu} title="API 文档">
      <div className="space-y-6">
        <ApiQuickFacts model={model} />
        <div>
          <h3 className="text-sm font-semibold text-ink-100">Headers / 鉴权</h3>
          <FieldTable rows={headerFieldsForModel(model)} className="mb-0 mt-3" />
        </div>
        {model.category === 'chat' ? <ChatProtocolGuide model={model} /> : null}
        <div>
          <h3 className="text-sm font-semibold text-ink-100">请求参数</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-300">
            以下字段按当前模型分类生成。价格、上下文长度、限速、可用线路等动态信息以
            gpt88.cc 控制台为准。
          </p>
          <FieldTable rows={requestFieldsForModel(model)} className="mb-0 mt-3" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-100">响应字段</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-300">
            响应结构保持 OpenAI 兼容风格；媒体类模型可能返回异步任务 ID 或资源 URL。
          </p>
          <FieldTable rows={responseFieldsForModel(model)} className="mb-0 mt-3" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-100">状态码</h3>
          <FieldTable rows={statusCodeRows(model)} className="mb-0 mt-3" />
        </div>
        <ErrorChecklist model={model} />
      </div>
    </Section>
  )
}

function ApiQuickFacts({ model }: { model: ModelEntry }) {
  const contentType =
    model.category === 'audio' ? 'multipart/form-data' : 'application/json'
  const protocolHint = protocolHintForModel(model)
  const baseUrlHint =
    model.category === 'chat'
      ? chatBaseUrlHint(model)
      : isGeminiImageModel(model)
        ? 'Gemini 原生兼容接口使用根地址，例如 https://china.claudecoder.me。'
      : model.category === 'image'
        ? '图片接口使用加速域名 https://china.claudecoder.me/v1。'
      : '媒体类接口使用 https://gpt88.cc/v1，并按对应 endpoint 提交请求。'
  const endpointValue =
    model.category === 'chat' && isAnthropicModel(model)
      ? 'POST /v1/messages 或 POST /v1/chat/completions'
      : isGeminiImageModel(model)
        ? `POST /v1beta/models/${model.modelId}:generateContent`
      : `${model.endpoint.method} ${model.endpoint.path}`

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <QuickFact label="Endpoint" value={endpointValue} />
      <QuickFact label="Model ID" value={model.modelId} mono />
      <QuickFact label="Content-Type" value={contentType} mono />
      <QuickFact label="接口类型" value={protocolHint} />
      <QuickFact label="Base URL" value={baseUrlHint} />
    </div>
  )
}

function QuickFact({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-ink-500">
        {label}
      </div>
      <div
        className={
          'mt-1 text-sm leading-relaxed text-ink-100' +
          (mono ? ' font-mono text-violet-200' : '')
        }
      >
        {value}
      </div>
    </div>
  )
}

function apiOriginForModel(model: ModelEntry): string {
  if (model.category === 'image') {
    return 'https://china.claudecoder.me'
  }
  return 'https://gpt88.cc'
}

function apiReferencePathForModel(model: ModelEntry): string {
  switch (model.category) {
    case 'image':
      return '/docs/api/images'
    case 'chat':
      return '/docs/api/chat-completions'
    case 'video':
    case 'audio':
    default:
      return '/models'
  }
}

function apiReferenceLabelForModel(model: ModelEntry): string {
  switch (model.category) {
    case 'image':
      return '图片生成 API'
    case 'video':
      return '当前模型页的 Video API 文档'
    case 'audio':
      return '当前模型页的 Audio API 文档'
    case 'chat':
    default:
      return 'Chat Completions API'
  }
}

function protocolHintForModel(model: ModelEntry): string {
  switch (model.category) {
    case 'image':
      if (isGeminiImageModel(model)) {
        return 'Gemini 原生图片生成接口，generateContent 返回 inlineData base64 图片'
      }
      return '图像生成接口，支持文生图；部分模型支持图生图'
    case 'video':
      return '视频生成接口，通常为异步任务'
    case 'audio':
      return '音频转写接口，使用文件上传'
    case 'chat':
    default:
      return isAnthropicModel(model)
        ? 'Claude 模型：Claude 工具优先用 Anthropic Messages 协议；OpenAI 工具可用兼容协议'
        : 'OpenAI 兼容对话补全接口，支持非流式和流式输出'
  }
}

function isAnthropicModel(model: ModelEntry): boolean {
  return model.provider.includes('Anthropic') || model.modelId.toLowerCase().startsWith('claude-')
}

function isOpenAIModel(model: ModelEntry): boolean {
  return model.provider.includes('OpenAI') || model.modelId.toLowerCase().startsWith('gpt-')
}

function isGeminiImageModel(model: ModelEntry): boolean {
  return model.modelId.toLowerCase() === 'gemini-3-pro-image-preview'
}

function chatBaseUrlHint(model: ModelEntry): string {
  if (isAnthropicModel(model)) {
    return 'Claude Code / Anthropic SDK 用 https://gpt88.cc；OpenAI SDK / Cursor 用 https://gpt88.cc/v1。'
  }
  if (isOpenAIModel(model)) {
    return 'OpenAI SDK / Cursor / cURL 用 https://gpt88.cc/v1。'
  }
  return 'OpenAI 兼容工具用 https://gpt88.cc/v1；Claude 风格工具如支持该模型则用根地址。'
}

function ChatProtocolGuide({ model }: { model: ModelEntry }) {
  const anthropic = isAnthropicModel(model)
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
      <h3 className="text-sm font-semibold text-ink-100">Chat 协议差异</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-300">
        Chat 模型不只看模型名，还要看你使用的客户端协议。
        Claude Code / Anthropic SDK 和 OpenAI SDK 拼出来的路径不同。
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ProtocolCard
          title="OpenAI 兼容"
          endpoint="POST /v1/chat/completions"
          baseUrl="https://gpt88.cc/v1"
          body={`{ "model": "${model.modelId}", "messages": [...] }`}
          recommended={!anthropic}
        />
        <ProtocolCard
          title="Anthropic / Claude"
          endpoint="POST /v1/messages"
          baseUrl="https://gpt88.cc"
          body={`{ "model": "${model.modelId}", "messages": [...] }`}
          recommended={anthropic}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-400">
        {anthropic
          ? '这个模型属于 Claude 系列；Claude Code、Anthropic SDK、OpenClaw 等工具建议优先走 Anthropic / Claude 风格。'
          : '这个模型更适合优先走 OpenAI 兼容协议；只有当目标工具明确支持 Claude 风格接入时，才使用 Anthropic 路径。'}
      </p>
    </div>
  )
}

function ProtocolCard({
  title,
  endpoint,
  baseUrl,
  body,
  recommended = false,
}: {
  title: string
  endpoint: string
  baseUrl: string
  body: string
  recommended?: boolean
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-ink-900/40 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-100">{title}</span>
        {recommended ? (
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
            推荐
          </span>
        ) : null}
      </div>
      <dl className="mt-3 space-y-2 text-xs leading-relaxed">
        <div>
          <dt className="text-ink-500">Base URL</dt>
          <dd className="font-mono text-violet-200">{baseUrl}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Endpoint</dt>
          <dd className="font-mono text-ink-200">{endpoint}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Body</dt>
          <dd className="font-mono text-ink-200">{body}</dd>
        </div>
      </dl>
    </div>
  )
}

function requestFieldsForModel(model: ModelEntry): FieldRow[] {
  switch (model.category) {
    case 'image':
      if (isGeminiImageModel(model)) {
        return geminiImageRequestFields(model)
      }
      return [
        modelField(model),
        {
          name: 'prompt',
          type: 'string',
          required: true,
          description: <>生成或编辑图片的文字指令。建议写清主体、风格、构图和不希望改变的内容。</>,
        },
        {
          name: 'image_urls',
          type: 'string[]',
          description: <>图生图参考图 URL 列表。图片需要能被 gpt88.cc 服务端访问。</>,
        },
        {
          name: 'size',
          type: 'string',
          default: usesRatioSizeCopy(model) ? '1:1' : '1024x1024',
          description: usesRatioSizeCopy(model) ? (
            <>
              画幅比例，例如 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、
              <code>auto</code>。该模型不要传 <code>1024x1024</code> 这类像素尺寸。
            </>
          ) : (
            <>输出尺寸或画幅配置。不同图像模型支持范围不同，以控制台为准。</>
          ),
        },
        {
          name: 'resolution',
          type: 'string',
          default: usesRatioSizeCopy(model) ? '1K' : undefined,
          description: <>输出清晰度，例如 <code>1K</code>。是否支持更高清晰度以控制台为准。</>,
        },
        {
          name: 'n',
          type: 'integer',
          default: '1',
          description: <>生成图片数量。批量生成时请关注账号限速与并发。</>,
        },
      ]
    case 'video':
      return [
        modelField(model),
        {
          name: 'prompt',
          type: 'string',
          required: true,
          description: <>视频画面、镜头运动、主体、风格和节奏描述。</>,
        },
        {
          name: 'image_url',
          type: 'string',
          description: <>可选参考图，用于图生视频或首帧约束；是否支持取决于具体模型。</>,
        },
        {
          name: 'duration',
          type: 'integer',
          default: '6',
          description: <>目标视频时长，单位秒。可用范围以模型和控制台配置为准。</>,
        },
        {
          name: 'aspect_ratio',
          type: 'string',
          default: '16:9',
          description: <>画幅比例，例如 <code>16:9</code>、<code>9:16</code>、<code>1:1</code>。</>,
        },
      ]
    case 'audio':
      return [
        modelField(model),
        {
          name: 'file',
          type: 'File',
          required: true,
          description: <>要转写的音频文件，使用 <code>multipart/form-data</code> 上传。</>,
        },
        {
          name: 'language',
          type: 'string',
          description: <>音频语言提示，例如 <code>zh</code>、<code>en</code>。不传时由模型自动判断。</>,
        },
        {
          name: 'prompt',
          type: 'string',
          description: <>可选上下文提示，用于专有名词、会议主题或人名纠偏。</>,
        },
        {
          name: 'response_format',
          type: 'string',
          default: 'json',
          description: <>返回格式，例如 <code>json</code>、<code>text</code>、<code>verbose_json</code>。</>,
        },
      ]
    case 'chat':
    default:
      return [
        modelField(model),
        {
          name: 'messages',
          type: 'array<Message>',
          required: true,
          description: (
            <>
              多轮对话历史。每条消息包含 <code>role</code> 和 <code>content</code>。
            </>
          ),
        },
        {
          name: 'stream',
          type: 'boolean',
          default: 'false',
          description: <>是否使用 SSE 流式返回。适合聊天界面和长回答。</>,
        },
        {
          name: 'temperature',
          type: 'number',
          default: '1',
          description: <>采样温度，值越高越发散。正式业务建议先固定后再调优。</>,
        },
        {
          name: 'max_tokens',
          type: 'integer',
          description: <>本次生成的最大 token 数。模型上下文边界以控制台为准。</>,
        },
        {
          name: 'response_format',
          type: 'object',
          description: <>结构化输出配置，例如 <code>{'{ "type": "json_object" }'}</code>。</>,
        },
        {
          name: 'tools',
          type: 'array<Tool>',
          description: <>Function calling 工具定义。是否支持取决于具体模型和账号配置。</>,
        },
      ]
  }
}

function headerFieldsForModel(model: ModelEntry): FieldRow[] {
  const contentType =
    model.category === 'audio' ? 'multipart/form-data' : 'application/json'
  const headers: FieldRow[] = [
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: (
        <>
          使用 <code>Bearer {'<GPT88_API_KEY>'}</code>。API Key 在 gpt88.cc 控制台创建。
        </>
      ),
    },
    {
      name: 'Content-Type',
      type: 'string',
      required: true,
      default: contentType,
      description: <>请求体格式。音频转写上传文件时使用 <code>multipart/form-data</code>。</>,
    },
    {
      name: 'Accept',
      type: 'string',
      default: model.category === 'chat' ? 'application/json 或 text/event-stream' : 'application/json',
      description: <>非流式接口返回 JSON；Chat 流式请求会返回 SSE 数据流。</>,
    },
  ]
  if (isGeminiImageModel(model)) {
    headers.push({
      name: 'x-goog-api-key',
      type: 'string',
      description: <>如果当前中转线路不接受 <code>Authorization: Bearer</code>，可改用该 Header 传 API Key。</>,
    })
  }
  return headers
}

function responseFieldsForModel(model: ModelEntry): FieldRow[] {
  switch (model.category) {
    case 'image':
      if (isGeminiImageModel(model)) {
        return [
          { name: 'candidates', type: 'array<Candidate>', required: true, description: <>Gemini 返回候选结果数组。</> },
          {
            name: 'candidates[].content.parts',
            type: 'array<Part>',
            required: true,
            description: <>包含文本 part 和图片 part。图片通常在 <code>inlineData.data</code> 中。</>,
          },
          {
            name: 'inlineData.data',
            type: 'string',
            description: <>base64 编码图片数据，提取后可写入 PNG 文件。</>,
          },
          {
            name: 'usageMetadata',
            type: 'object',
            description: <>Gemini 风格用量信息；是否返回以实际响应为准。</>,
          },
        ]
      }
      return [
        { name: 'created', type: 'integer', required: true, description: <>生成时间，Unix 秒。</> },
        {
          name: 'data',
          type: 'array<Image>',
          required: true,
          description: <>生成结果数组，通常包含图片 <code>url</code> 或 <code>b64_json</code>。</>,
        },
        {
          name: 'usage',
          type: 'object',
          description: <>部分模型会返回用量统计；是否返回以模型实际响应为准。</>,
        },
      ]
    case 'video':
      return [
        { name: 'id', type: 'string', required: true, description: <>视频生成任务 ID，用于后续查询任务状态。</> },
        { name: 'status', type: 'string', required: true, description: <>任务状态，例如 <code>queued</code>、<code>processing</code>、<code>succeeded</code>。</> },
        { name: 'model', type: 'string', required: true, description: <>本次使用的模型 ID。</> },
        { name: 'url', type: 'string', description: <>任务完成后的视频文件 URL；异步任务未完成时可能为空。</> },
      ]
    case 'audio':
      return [
        { name: 'text', type: 'string', required: true, description: <>完整转写文本。</> },
        { name: 'language', type: 'string', description: <>识别到或指定的语言。</> },
        { name: 'duration', type: 'number', description: <>音频时长，单位秒。是否返回取决于响应格式。</> },
        { name: 'segments', type: 'array<Segment>', description: <>分段时间轴，仅在 verbose_json 等详细格式中返回。</> },
      ]
    case 'chat':
    default:
      return [
        { name: 'id', type: 'string', required: true, description: <>本次补全的唯一 ID，便于排障关联日志。</> },
        { name: 'object', type: 'string', required: true, description: <>固定为 <code>chat.completion</code> 或流式 chunk 类型。</> },
        { name: 'model', type: 'string', required: true, description: <>实际承担推理的模型 ID。</> },
        {
          name: 'choices',
          type: 'array<Choice>',
          required: true,
          description: <>生成结果数组，包含 <code>message</code>、<code>delta</code> 或 <code>finish_reason</code>。</>,
        },
        {
          name: 'usage',
          type: 'object',
          description: <>Token 用量统计。流式请求可能在结束包或非流式响应中返回。</>,
        },
      ]
  }
}

function statusCodeRows(model: ModelEntry): FieldRow[] {
  return [
    {
      name: '200',
      type: 'OK',
      required: true,
      description: model.category === 'video'
        ? <>请求已被接受或任务创建成功，响应中包含任务状态和任务 ID。</>
        : <>请求成功，响应体结构见上方响应字段。</>,
    },
    {
      name: '400',
      type: 'Bad Request',
      description: <>请求字段不合法，例如缺少必填字段、图片尺寸格式错误或文件格式不支持。</>,
    },
    {
      name: '401',
      type: 'Unauthorized',
      description: <>API Key 缺失、无效或格式错误。</>,
    },
    {
      name: '404',
      type: 'Not Found',
      description: (
        <>
          Endpoint 或模型不存在。请确认路径为 <code>{model.endpoint.path}</code>，
          模型 ID 为 <code>{model.modelId}</code>。
        </>
      ),
    },
    {
      name: '429',
      type: 'Rate Limited',
      description: <>触发限速、并发限制或余额不足。控制台会展示当前账号可用额度。</>,
    },
    {
      name: '5xx',
      type: 'Upstream Error',
      description: <>上游或线路异常。可切换等价线路重试，并保留请求 ID 便于排查。</>,
    },
  ]
}

function geminiImageRequestFields(model: ModelEntry): FieldRow[] {
  return [
    {
      name: 'contents',
      type: 'array<Content>',
      required: true,
      description: <>Gemini generateContent 输入。文字提示放在 <code>contents[].parts[].text</code>。</>,
    },
    {
      name: 'contents[].parts[].text',
      type: 'string',
      required: true,
      description: <>图片生成提示词，例如主体、风格、比例、细节和限制。</>,
    },
    {
      name: 'generationConfig.responseModalities',
      type: 'string[]',
      required: true,
      default: '["TEXT", "IMAGE"]',
      description: <>要求模型同时返回文本与图片。生成图片时需要包含 <code>IMAGE</code>。</>,
    },
    {
      name: 'generationConfig.imageConfig.aspectRatio',
      type: 'string',
      default: '1:1',
      description: <>图片比例，例如 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、<code>4:3</code>、<code>3:4</code>。</>,
    },
    {
      name: 'generationConfig.imageConfig.imageSize',
      type: 'string',
      default: '1K',
      description: <>输出清晰度，使用大写，例如 <code>1K</code>、<code>2K</code>、<code>4K</code>。</>,
    },
    {
      name: 'model',
      type: 'path parameter',
      required: true,
      description: (
        <>
          当前模型 ID 写在路径里：<code>/v1beta/models/{model.modelId}:generateContent</code>。
        </>
      ),
    },
  ]
}

function modelField(model: ModelEntry): FieldRow {
  return {
    name: 'model',
    type: 'string',
    required: true,
    description: (
      <>
        当前模型 ID：<code>{model.modelId}</code>。复制时请保持大小写一致。
      </>
    ),
  }
}

function usesRatioSizeCopy(model: ModelEntry): boolean {
  const id = model.modelId.toLowerCase()
  return id === 'nanobanana2' || id === 'gemini-3-pro-image-preview'
}

function ErrorChecklist({ model }: { model: ModelEntry }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
      <h3 className="text-sm font-semibold text-ink-100">错误与排查</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-300">
        <li>
          <code>401</code>：检查 <code>Authorization</code> 是否为
          <code> Bearer {'<API_KEY>'}</code>，以及 Key 是否仍有效。
        </li>
        <li>
          <code>404</code>：检查 endpoint 是否为 <code>{model.endpoint.path}</code>，
          以及模型名 <code>{model.modelId}</code> 是否在控制台可见。
        </li>
        <li>
          <code>429</code>：触发限速或余额不足时，降低并发、缩短请求，或到控制台查看额度。
        </li>
        <li>
          <code>5xx</code>：优先切换等价线路重试，并记录请求 ID 方便排障。
        </li>
      </ul>
    </div>
  )
}

function ModelRequestExamples({ model }: { model: ModelEntry }) {
  if (model.category !== 'image') {
    return <CodeTabs tabs={model.examples} />
  }

  const textToImageTabs = model.examples.filter(tab => tab.label.startsWith('文生图'))
  const imageToImageTabs = model.examples.filter(tab => tab.label.startsWith('图生图'))

  if (textToImageTabs.length === 0 || imageToImageTabs.length === 0) {
    return <CodeTabs tabs={model.examples} />
  }

  return (
    <div className="space-y-6">
      <ExampleGroup
        title="文生图"
        description="只传 prompt，由模型直接生成一张新图片。"
        tabs={textToImageTabs}
      />
      <ExampleGroup
        title="图生图"
        description="传入 image_urls 作为参考图，在保留主体或风格的基础上继续生成。"
        tabs={imageToImageTabs}
        highlighted
      />
    </div>
  )
}

function ExampleGroup({
  title,
  description,
  tabs,
  highlighted = false,
}: {
  title: string
  description: string
  tabs: CodeTab[]
  highlighted?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-ink-100">{title}</h3>
        {highlighted ? (
          <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium text-cyan-200">
            参考图生成
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-400">{description}</p>
      <CodeTabs tabs={tabs} className="mb-0 mt-3" />
    </div>
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
      if (isGeminiImageModel(model)) {
        return `{
  "candidates": [
    {
      "content": {
        "parts": [
          { "text": "已生成图片。" },
          {
            "inlineData": {
              "mimeType": "image/png",
              "data": "iVBORw0KGgoAAA..."
            }
          }
        ]
      }
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 24,
    "totalTokenCount": 88
  }
}`
      }
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
