import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { BookOpen, Boxes, FileText, Search, X } from 'lucide-react'
import { DOCS_NAV } from '../../data/nav'
import { MODELS } from '../../data/models'
import { cn } from '../../lib/cn'

type SearchItem = {
  id: string
  title: string
  description: string
  path: string
  section: string
  type: 'doc' | 'model'
  keywords: string
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function buildSearchItems(): SearchItem[] {
  const docs = DOCS_NAV.flatMap(section =>
    section.items.map(item => ({
      id: `doc:${item.path}`,
      title: item.title,
      description: item.blurb ?? section.title,
      path: item.path,
      section: section.title,
      type: 'doc' as const,
      keywords: [item.title, item.blurb, item.path, section.title].filter(Boolean).join(' '),
    })),
  )

  const models = MODELS.map(model => ({
    id: `model:${model.slug}`,
    title: model.name,
    description: `${model.modelId} · ${model.tagline}`,
    path: `/models/${model.slug}/`,
    section: `模型 · ${model.category}`,
    type: 'model' as const,
    keywords: [
      model.name,
      model.modelId,
      model.provider,
      model.category,
      model.tagline,
      ...model.capabilities,
      ...model.scenarios,
      ...model.descriptionsSample,
    ].join(' '),
  }))

  return [...docs, ...models]
}

function filterItems(items: SearchItem[], query: string) {
  const q = normalize(query)
  if (!q) return items.slice(0, 12)

  const tokens = q.split(/\s+/).filter(Boolean)
  return items
    .map(item => {
      const title = normalize(item.title)
      const keywords = normalize(item.keywords)
      const matched = tokens.every(token => keywords.includes(token))
      if (!matched) return null

      let score = 0
      if (title === q) score += 40
      if (title.startsWith(q)) score += 24
      if (title.includes(q)) score += 14
      if (normalize(item.path).includes(q)) score += 8
      if (item.type === 'doc') score += 4
      if (item.section.includes('API')) score += 2

      return { item, score }
    })
    .filter((entry): entry is { item: SearchItem; score: number } => Boolean(entry))
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 30)
    .map(entry => entry.item)
}

function SearchResults({
  items,
  query,
  onSelect,
}: {
  items: SearchItem[]
  query: string
  onSelect: (path: string) => void
}) {
  if (items.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <Search className="mx-auto h-6 w-6 text-ink-500" />
        <div className="mt-3 text-sm font-medium text-ink-200">没有找到匹配结果</div>
        <p className="mt-1 text-xs leading-5 text-ink-500">
          可以尝试搜索模型名、接口路径、Codex、图片生成、ChatBox、giffgaff 等关键词。
        </p>
      </div>
    )
  }

  return (
    <Command.List className="max-h-[25rem] overflow-y-auto p-2">
      <Command.Group
        heading={query.trim() ? `搜索结果 · ${items.length}` : '推荐入口'}
        className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-500"
      >
        {items.map(item => {
          const Icon = item.type === 'model' ? Boxes : FileText
          return (
            <Command.Item
              key={item.id}
              value={`${item.title} ${item.description} ${item.keywords}`}
              onSelect={() => onSelect(item.path)}
              className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left outline-none transition-colors aria-selected:bg-violet-500/10 aria-selected:text-violet-100"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-ink-100">{item.title}</span>
                  <span className="shrink-0 rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-400">
                    {item.section}
                  </span>
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-5 text-ink-400">
                  {item.description}
                </span>
                <span className="mt-1 block truncate font-mono text-[11px] text-ink-600">
                  {item.path}
                </span>
              </span>
            </Command.Item>
          )
        })}
      </Command.Group>
    </Command.List>
  )
}

export function GlobalSearch({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const items = useMemo(() => buildSearchItems(), [])
  const results = useMemo(() => filterItems(items, query), [items, query])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null
        const tag = target?.tagName?.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea' && !target?.isContentEditable) {
          event.preventDefault()
          setOpen(true)
        }
      }
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function close() {
    setOpen(false)
    setQuery('')
  }

  function go(path: string) {
    navigate(path)
    onNavigate?.()
    close()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm text-ink-300 transition-colors hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-ink-100',
          className,
        )}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">搜索文档</span>
        <kbd className="hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-ink-500 lg:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-ink-950/70 p-4 backdrop-blur-sm"
          onMouseDown={event => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <Command
            shouldFilter={false}
            className="mx-auto mt-[12dvh] max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <BookOpen className="h-4 w-4 text-violet-300" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                autoFocus
                placeholder="搜索 API、模型、教程、集成指南..."
                className="min-w-0 flex-1 bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
              />
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-white/5 hover:text-ink-100"
                aria-label="关闭搜索"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <SearchResults items={results} query={query} onSelect={go} />

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] text-ink-500">
              <span>↑↓ 选择 · Enter 打开 · Esc 关闭</span>
              <span>{items.length} 个可搜索入口</span>
            </div>
          </Command>
        </div>
      ) : null}
    </>
  )
}
