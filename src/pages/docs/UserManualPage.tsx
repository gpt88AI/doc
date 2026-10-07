import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, Image, KeyRound, ListChecks, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { DocPage } from '../../components/layout/DocPage'
import type { Heading } from '../../components/layout/AnchorNav'
import { getUserManualItems, getUserManualItem, type UserManualItem } from '../../data/user-manual'
import NotFoundPage from '../NotFoundPage'

const markdownFiles = import.meta.glob('../../data/user-manual/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function markdownFor(item: UserManualItem) {
  if (item.slug === 'api-configuration') return markdownFiles['../../data/user-manual/api-configuration.md'] ?? ''
  return markdownFiles[`../../data/user-manual/${item.sourcePage.replace(/\.html$/, '.md')}`] ?? ''
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section'
}

function textFromNode(value: React.ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map(textFromNode).join('')
  if (value && typeof value === 'object' && 'props' in value) {
    return textFromNode((value as { props?: { children?: React.ReactNode } }).props?.children)
  }
  return ''
}

function markdownHeadings(markdown: string): Heading[] {
  const usedIds = new Map<string, number>()
  const headings: Heading[] = []
  let inFence = false
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) continue
    const text = match[2].replace(/[`*_~]/g, '').replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim()
    const base = slugifyHeading(text)
    const count = usedIds.get(base) ?? 0
    usedIds.set(base, count + 1)
    headings.push({ id: count === 0 ? base : `${base}-${count + 1}`, text, level: match[1].length as 2 | 3 })
  }
  return headings
}

function UserManualMarkdown({ markdown }: { markdown: string }) {
  const usedIds = new Map<string, number>()
  const idFor = (children: React.ReactNode) => {
    const text = textFromNode(children)
    const base = slugifyHeading(text)
    const count = usedIds.get(base) ?? 0
    usedIds.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }

  return (
    <div className="prose prose-invert min-w-0 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-h3:mt-8 prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-li:text-ink-200 prose-table:text-[13px] prose-th:bg-white/[0.03] prose-th:font-medium">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children }) => <h2 id={idFor(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={idFor(children)}>{children}</h3>,
          a: ({ href = '', children }) => href.startsWith('/')
            ? <Link to={href}>{children}</Link>
            : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
          img: ({ alt = '', src = '', title }) => (
            <img src={src} alt={alt} title={title} loading="lazy" decoding="async" className="my-6 h-auto max-w-full rounded-xl border border-white/10" />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

const GROUP_ICONS = {
  '接入与画布入门': KeyRound,
  '绘图与图解': Image,
  'AI 创作': Sparkles,
  '进阶与管理': ListChecks,
} as const

function ManualHub() {
  const items = getUserManualItems()
  const groups = [...new Set(items.map(item => item.group))]
  const groupHeadings = groups.map(group => ({ id: slugifyHeading(group), text: group, level: 2 as const }))
  return <DocPage
    path="/docs/user-manual/"
    title="OpenTu 用户手册"
    description="GPT88 OpenTu 工作台的 21 篇操作教程：API 配置、画布、绘图、AI 创作与进阶管理。"
    headings={groupHeadings}
  >
      <div className="not-prose mb-8 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"><BookOpen className="h-4 w-4" />重点入口 · 21 篇教程</div>
            <h2 className="mt-3 text-2xl font-semibold text-ink-50">在 GPT88 OpenTu 工作台完成创作</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-300">从 API 配置、画布操作到图片、视频和知识库管理，按任务选择教程。产品入口与教程对应的是 GPT88 的 OpenTu 工作台。</p>
          </div>
          <a href="https://agent.gpt88.cc/opentu" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-cyan-200">打开 OpenTu <ExternalLink className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="not-prose mb-10 grid gap-3 sm:grid-cols-3">
        <Link to="/docs/user-manual/api-configuration/" className="rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50"><KeyRound className="h-5 w-5 text-violet-300" /><div className="mt-2 font-semibold text-ink-50">先配置 API</div><p className="mt-1 text-sm text-ink-300">创建 Key、加载模型、完成首次生成</p></Link>
        <Link to="/docs/user-manual/ai-generation-image-generation/" className="rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50"><Sparkles className="h-5 w-5 text-violet-300" /><div className="mt-2 font-semibold text-ink-50">开始 AI 创作</div><p className="mt-1 text-sm text-ink-300">提示词、参考图、批量与 Agent</p></Link>
        <Link to="/docs/guides/agent-image-studio/" className="rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50"><ArrowRight className="h-5 w-5 text-violet-300" /><div className="mt-2 font-semibold text-ink-50">看 GPT88 工作台指南</div><p className="mt-1 text-sm text-ink-300">了解 agent.gpt88.cc 的图片工作流</p></Link>
      </div>
      {groups.map(group => {
        const Icon = GROUP_ICONS[group as keyof typeof GROUP_ICONS] ?? BookOpen
        return <section key={group} className="not-prose mb-10"><h2 id={slugifyHeading(group)} className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-100"><Icon className="h-4 w-4 text-cyan-300" />{group}</h2><div className="grid gap-3 md:grid-cols-2">{items.filter(item => item.group === group).map(item => <Link key={item.slug} to={`/docs/user-manual/${item.slug}/`} className="group rounded-lg border border-white/5 bg-white/[0.02] p-4 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"><div className="flex items-start justify-between gap-3"><h3 className="font-medium text-ink-50 group-hover:text-cyan-200">{item.title}</h3><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-500 group-hover:text-cyan-300" /></div><p className="mt-2 text-sm leading-6 text-ink-300">{item.description}</p></Link>)}</div></section>
      })}
      <div className="not-prose mt-12 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm leading-6 text-ink-400">本手册根据 OpenTu 用户手册整理。原画布界面的截图和菜单名称可能随版本变化；GPT88 的接入地址、模型权限、计费和当前工作台功能，以 <a href="https://agent.gpt88.cc/opentu" target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">OpenTu 工作台</a>与对应 API 文档为准。</div>
  </DocPage>
}

export default function UserManualPage() {
  const { slug } = useParams()
  if (!slug) return <ManualHub />
  const item = getUserManualItem(slug)
  if (!item) return <NotFoundPage />
  const markdown = markdownFor(item)
  return <DocPage path={`/docs/user-manual/${item.slug}/`} title={item.title} description={item.description} headings={markdownHeadings(markdown)}>
    <div className="not-prose mb-7 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3 text-sm">
      <span className="text-ink-200">按本页步骤操作时，可直接在 GPT88 OpenTu 工作台完成创作。</span>
      <a href="https://agent.gpt88.cc/opentu" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200">打开 OpenTu <ExternalLink className="h-3.5 w-3.5" /></a>
    </div>
    <UserManualMarkdown markdown={markdown} />
  </DocPage>
}
