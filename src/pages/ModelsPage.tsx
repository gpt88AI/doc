import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  AudioLines,
  Image as ImageIcon,
  MessageSquare,
  Search,
  Sparkles,
  Star,
  Video,
} from 'lucide-react'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  MODELS,
  getFeaturedModels,
  searchModels,
  type ModelCategory,
  type ModelEntry,
} from '../data/models'
import { cn } from '../lib/cn'
import { Seo } from '../components/seo/Seo'

/**
 * 模型导航主页 (M3 + Human msg-20260509-qoz7ey/jwfia3/8ivlof 全量 catalog)
 *
 * 信息架构（参考 apimart.ai/zh/model 心智，UI 不照搬）：
 * 1) Hero：站点定位 + 搜索框
 * 2) 「主推模型」：固定 8 个 featured 卡片（人工运营展示位）
 * 3) 「全部模型」：分类切换（Chat/Image/Video/Audio） + 搜索过滤 + 网格
 *    - completion 7 条已经在 data/models.ts 按 canonical_name 与 chat 去重并入 chat
 *      （注释里标注「completion 暂归入 chat 待 human 确认」）
 *    - embedding 不展示
 *
 * 搜索范围：display_name / modelId / provider 推断 / descriptions_sample / 主推 8 的能力/场景
 *           （详细见 src/data/models.ts 中的 searchModels）
 *
 * 设计参考 derouter.ai/docs/api：深色底、卡片悬浮发光、网格背景。
 */

const CATEGORY_ICON: Record<ModelCategory, React.ComponentType<{ className?: string }>> = {
  chat: MessageSquare,
  image: ImageIcon,
  video: Video,
  audio: AudioLines,
}

export default function ModelsPage() {
  const [category, setCategory] = useState<ModelCategory>('chat')
  const [query, setQuery] = useState('')

  const featured = useMemo(() => getFeaturedModels(), [])

  // 「全部模型」= MODELS 排除 featured；按 vendors_count 降序优先
  const nonFeatured = useMemo(() => {
    const featuredSlugs = new Set(featured.map(m => m.slug))
    return MODELS.filter(m => !featuredSlugs.has(m.slug)).sort(
      (a, b) => b.vendorsCount - a.vendorsCount,
    )
  }, [featured])

  // 分类计数（基于 nonFeatured，让"全部模型"右侧 Tab 数字与展示一致）
  const counts = useMemo(() => {
    const m: Record<ModelCategory, number> = { chat: 0, image: 0, video: 0, audio: 0 }
    nonFeatured.forEach(item => {
      m[item.category]++
    })
    return m
  }, [nonFeatured])

  // 当前分类 + 搜索过滤后的模型
  const filteredAll = useMemo<ModelEntry[]>(() => {
    const inCategory = nonFeatured.filter(m => m.category === category)
    return searchModels(inCategory, query)
  }, [nonFeatured, category, query])

  // 搜索状态下，主推 8 也参与匹配
  const filteredFeatured = useMemo<ModelEntry[]>(
    () => searchModels(featured, query),
    [featured, query],
  )

  return (
    <>
      <Seo
        title="模型导航"
        description="按 Chat / Image / Video / Audio 分类浏览 gpt88.cc 可用模型，复制 Model ID 即可接入 OpenAI 兼容 API。"
        path="/models"
      />
      <div className="relative isolate">
      {/* 背景：和首页同款光晕 + 网格，但更克制 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            模型导航
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
            找到适合你场景的模型
          </h1>
          <p className="mt-3 text-sm text-ink-300 sm:text-base">
            上方为人工主推，下方为 marketplace 全量目录（按 vendors_count 排序）。
            可按模型名、provider、能力或场景搜索；所有模型均通过 OpenAI 兼容协议接入，
            复制 model id 即可调用。
          </p>
        </div>

        {/* ── 全局搜索框（同时过滤主推 + 全部模型） ── */}
        <label className="relative mt-8 flex w-full max-w-md items-center">
          <span className="sr-only">搜索模型</span>
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-ink-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索 opus / sonnet / gpt-5 / kimi / glm …"
            className="w-full rounded-md border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-colors focus:border-violet-500/60 focus:bg-violet-500/[0.06] focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        {/* ── 主推区 ── */}
        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink-50">
              <Star className="h-4 w-4 text-amber-300" />
              主推模型
              <span className="ml-2 text-xs font-normal text-ink-400">
                Human 运营选定 · 共 {filteredFeatured.length}/{featured.length} 个
              </span>
            </h2>
          </div>
          {filteredFeatured.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredFeatured.map(m => (
                <li key={m.slug}>
                  <ModelCard model={m} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-md border border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink-400">
              主推模型没有匹配 “{query}”，可看下方「全部模型」的搜索结果。
            </p>
          )}
        </div>

        {/* 分隔线 */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── 全部模型 ── */}
        <div className="mt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg font-semibold text-ink-50">
              全部模型
              <span className="ml-2 text-xs font-normal text-ink-400">
                共 {nonFeatured.length} 个 · 数据来自 marketplace 快照
              </span>
            </h2>

            {/* 分类切换 */}
            <div
              role="tablist"
              aria-label="模型分类"
              className="flex flex-wrap gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-1"
            >
              {CATEGORY_ORDER.map(c => {
                const Icon = CATEGORY_ICON[c]
                const active = c === category
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-violet-500/15 text-violet-100 ring-1 ring-violet-500/40'
                        : 'text-ink-300 hover:bg-white/5 hover:text-ink-100',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {CATEGORY_META[c].title}
                    <span
                      className={cn(
                        'rounded-full px-1.5 text-[10.5px] font-semibold',
                        active
                          ? 'bg-violet-500/20 text-violet-100'
                          : 'bg-white/5 text-ink-400',
                      )}
                    >
                      {counts[c]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-xs text-ink-400">{CATEGORY_META[category].subtitle}</p>
            <span className="text-xs text-ink-400">
              当前共 {filteredAll.length} 个匹配
            </span>
          </div>

          {filteredAll.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAll.map(m => (
                <li key={m.slug}>
                  <ModelCard model={m} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState query={query} onClear={() => setQuery('')} />
          )}
        </div>
      </section>
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 模型卡片
 *
 * 视觉差异：featured 卡右上角带 ⭐ 推荐徽章；长尾卡片仅显示 vendors_count 上游数。
 * 长尾模型的 capabilities/scenarios 在 data/models.ts 是空数组，
 * 卡片这里直接不渲染那两行，避免空白行。
 * ────────────────────────────────────────────────────────────────── */
function ModelCard({ model }: { model: ModelEntry }) {
  return (
    <Link
      to={`/models/${model.slug}`}
      className="tech-card tech-card-hover group flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">
            {model.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] text-ink-400">
            <span>{model.provider}</span>
            <span className="text-ink-600">•</span>
            <code className="font-mono text-ink-300">{model.modelId}</code>
          </div>
        </div>
        {model.featured ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
            <Star className="h-3 w-3" /> 推荐
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-ink-300">
            {model.vendorsCount} 家上游
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-ink-300">{model.tagline}</p>

      {/* 能力标签：仅 featured 8 个有 */}
      {model.capabilities.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {model.capabilities.slice(0, 4).map(cap => (
            <span
              key={cap}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-ink-300"
            >
              {cap}
            </span>
          ))}
        </div>
      ) : null}

      {/* 底部：场景小字（仅 featured） + 箭头 */}
      <div className="mt-auto flex items-center justify-between pt-4 text-[11.5px] text-ink-400">
        {model.scenarios.length > 0 ? (
          <span className="line-clamp-1">
            推荐场景：{model.scenarios.slice(0, 2).join(' / ')}
          </span>
        ) : (
          <span className="line-clamp-1 text-ink-500">能力 / 场景以控制台为准</span>
        )}
        <ArrowRight className="h-3.5 w-3.5 text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-300" />
      </div>
    </Link>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * 空态（仅"全部模型"区使用）
 * ────────────────────────────────────────────────────────────────── */
function EmptyState({
  query,
  onClear,
}: {
  query: string
  onClear: () => void
}) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
      <Search className="mx-auto h-6 w-6 text-ink-500" />
      <p className="mt-3 text-sm text-ink-300">
        {query
          ? `没有匹配 "${query}" 的模型，换个关键词或切换分类试试。`
          : '该分类下暂无模型，敬请期待。'}
      </p>
      {query ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-ink-200 hover:border-violet-500/40 hover:bg-violet-500/10"
        >
          清空搜索
        </button>
      ) : null}
    </div>
  )
}
