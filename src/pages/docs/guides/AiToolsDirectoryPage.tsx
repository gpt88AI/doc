import { useMemo, useState } from 'react'
import { ExternalLink, Flame, Search, SlidersHorizontal } from 'lucide-react'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { useLocale } from '../../../lib/locale'
import toolDirectory from '../../../data/hvoyAiTools.json'

type ToolCategory = (typeof toolDirectory.categories)[number]
type ToolItem = (typeof toolDirectory.items)[number]

const PAGE_SIZE = 60

function ToolCard({ item }: { item: ToolItem }) {
  return (
    <a
      href={item.officialUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-44 flex-col border border-white/6 bg-white/[0.02] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.05]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{item.name}</h3>
          <p className="mt-1 text-xs text-violet-300">{item.categoryName} · {item.subcategoryName}</p>
        </div>
        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-ink-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />
      </div>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink-300">{item.description}</p>
      <span className="mt-auto pt-4 text-xs text-ink-500">打开官方入口</span>
    </a>
  )
}

function CategorySummary({ category }: { category: ToolCategory }) {
  return (
    <div className="border border-white/6 bg-white/[0.02] p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-ink-100">{category.name}</h3>
        <span className="text-xs text-ink-500">{category.toolCount} 个</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-ink-400">
        {category.children.map(child => (
          <span key={child.slug}>{child.name} {child.toolCount}</span>
        ))}
      </div>
    </div>
  )
}

export default function AiToolsDirectoryPage() {
  const { locale } = useLocale()
  const [view, setView] = useState<'hot' | 'all'>('hot')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [query, setQuery] = useState('')
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE)

  const hotIds = useMemo(() => new Set(toolDirectory.hotIds), [])
  const categoryOptions = useMemo(() => toolDirectory.categories, [])
  const subcategoryOptions = useMemo(() => {
    if (category) {
      return toolDirectory.categories.find(item => item.slug === category)?.children ?? []
    }
    return toolDirectory.categories.flatMap(item => item.children)
  }, [category])

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return toolDirectory.items.filter(item => {
      if (view === 'hot' && !hotIds.has(item.id)) return false
      if (category && item.categorySlug !== category) return false
      if (subcategory && item.subcategorySlug !== subcategory) return false
      if (!normalizedQuery) return true
      return [item.name, item.description, item.categoryName, item.subcategoryName]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedQuery)
    })
  }, [category, hotIds, query, subcategory, view])

  const visibleItems = filteredItems.slice(0, displayLimit)
  const pageTitle = 'AI 工具导航：1,809 个工具与分类索引'
  const pageDescription = `根据禾维 AI（Hvoy AI）公开 AI 工具集整理的工具导航快照，包含 ${toolDirectory.source.totalTools} 个工具、${toolDirectory.categories.length} 个一级分类和官方入口。`

  if (locale !== 'zh') {
    return (
      <DocPage path="/docs/guides/ai-tools" title="AI 工具导航" description="A categorized index of AI tools sourced from the public Hvoy AI directory.">
        <p>This page is currently maintained in Chinese. The source snapshot contains {toolDirectory.source.totalTools} tools from the public Hvoy AI directory.</p>
        <p><a href={toolDirectory.source.url} target="_blank" rel="noreferrer">Open the Hvoy AI directory</a></p>
      </DocPage>
    )
  }

  return (
    <DocPage
      path="/docs/guides/ai-tools"
      title={pageTitle}
      description={pageDescription}
    >
      <nav aria-label="本页导航" className="not-prose mb-8 border border-white/6 bg-white/[0.02] p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-500">本页导航</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href="#scope" className="text-violet-300 hover:text-violet-200">收录范围</a>
          <a href="#directory" className="text-violet-300 hover:text-violet-200">工具索引</a>
          <a href="#categories" className="text-violet-300 hover:text-violet-200">分类统计</a>
        </div>
      </nav>

      <Callout tone="info" title="先看清这页是什么">
        <p>
          这是一份按公开目录快照整理的 AI 工具索引，不是对每个工具的独立测评，也不代表 GPT88 对第三方工具的背书。
          点击工具卡片会打开工具自己的入口，使用前请自行核验登录、收费、隐私、地区可用性和商用授权。
        </p>
      </Callout>

      <h2 id="scope">收录范围</h2>
      <p>
        当前目录包含 {toolDirectory.source.totalTools} 个工具，按对话、写作、图像、视频、音频、办公、编程、设计、搜索、翻译、模型资源、内容安全和行业场景分类。
      </p>
      <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
        <div className="border border-white/6 bg-white/[0.02] p-4"><p className="text-2xl font-semibold text-ink-50">{toolDirectory.source.totalTools}</p><p className="mt-1 text-xs text-ink-400">工具快照</p></div>
        <div className="border border-white/6 bg-white/[0.02] p-4"><p className="text-2xl font-semibold text-ink-50">{toolDirectory.categories.length}</p><p className="mt-1 text-xs text-ink-400">一级分类</p></div>
        <div className="border border-white/6 bg-white/[0.02] p-4"><p className="text-2xl font-semibold text-ink-50">{toolDirectory.source.hotToolCount}</p><p className="mt-1 text-xs text-ink-400">热门工具</p></div>
      </div>

      <h2 id="directory">工具索引</h2>
      <div className="not-prose border border-white/6 bg-white/[0.02] p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="flex shrink-0 items-center gap-2 text-sm text-ink-300">
            <SlidersHorizontal className="h-4 w-4 text-violet-300" aria-hidden="true" />
            <span>筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { setView('hot'); setDisplayLimit(PAGE_SIZE) }}
              className={`inline-flex items-center gap-1.5 border px-3 py-2 text-sm transition-colors ${view === 'hot' ? 'border-violet-400/50 bg-violet-500/15 text-violet-100' : 'border-white/10 text-ink-300 hover:border-white/20 hover:text-ink-100'}`}
            >
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> 热门
            </button>
            <button
              type="button"
              onClick={() => { setView('all'); setDisplayLimit(PAGE_SIZE) }}
              className={`border px-3 py-2 text-sm transition-colors ${view === 'all' ? 'border-violet-400/50 bg-violet-500/15 text-violet-100' : 'border-white/10 text-ink-300 hover:border-white/20 hover:text-ink-100'}`}
            >
              全部工具
            </button>
          </div>
          <label className="relative min-w-0 flex-1 xl:ml-auto xl:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
            <span className="sr-only">搜索工具</span>
            <input
              value={query}
              onChange={event => { setQuery(event.target.value); setDisplayLimit(PAGE_SIZE) }}
              placeholder="搜索工具名称或简介"
              className="w-full border border-white/10 bg-ink-950/50 py-2 pl-9 pr-3 text-sm text-ink-100 outline-none placeholder:text-ink-500 focus:border-violet-400/60"
            />
          </label>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <label className="flex items-center gap-3 text-sm text-ink-300">
            <span className="w-16 shrink-0 text-ink-500">分类</span>
            <select value={category} onChange={event => { setCategory(event.target.value); setSubcategory(''); setDisplayLimit(PAGE_SIZE) }} className="min-w-0 flex-1 border border-white/10 bg-ink-950/60 px-3 py-2 text-sm text-ink-200 outline-none focus:border-violet-400/60">
              <option value="">全部分类</option>
              {categoryOptions.map(item => <option key={item.slug} value={item.slug}>{item.name} · {item.toolCount}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm text-ink-300">
            <span className="w-16 shrink-0 text-ink-500">子分类</span>
            <select value={subcategory} onChange={event => { setSubcategory(event.target.value); setDisplayLimit(PAGE_SIZE) }} className="min-w-0 flex-1 border border-white/10 bg-ink-950/60 px-3 py-2 text-sm text-ink-200 outline-none focus:border-violet-400/60">
              <option value="">全部子分类</option>
              {subcategoryOptions.map(item => <option key={item.slug} value={item.slug}>{item.name} · {item.toolCount}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-ink-500">当前匹配 {filteredItems.length} 个工具，已显示 {visibleItems.length} 个。</p>
      </div>

      {visibleItems.length > 0 ? (
        <div className="not-prose mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map(item => <ToolCard key={item.id} item={item} />)}
        </div>
      ) : (
        <p className="not-prose mt-6 border border-dashed border-white/10 p-6 text-sm text-ink-400">没有匹配的工具，换一个关键词或分类。</p>
      )}
      {visibleItems.length < filteredItems.length ? (
        <div className="not-prose mt-6 text-center">
          <button type="button" onClick={() => setDisplayLimit(limit => limit + PAGE_SIZE)} className="border border-violet-400/40 px-4 py-2 text-sm text-violet-200 transition-colors hover:bg-violet-500/10">
            加载更多（剩余 {filteredItems.length - visibleItems.length} 个）
          </button>
        </div>
      ) : null}

      <h2 id="categories">分类统计</h2>
      <div className="not-prose grid gap-3 sm:grid-cols-2">
        {toolDirectory.categories.map(categoryItem => <CategorySummary key={categoryItem.slug} category={categoryItem} />)}
      </div>
    </DocPage>
  )
}
