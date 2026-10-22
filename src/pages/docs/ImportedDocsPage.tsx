import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, CircleAlert, KeyRound, Sparkles, Wrench } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import catalog from '../../data/gpt88-library/catalog.json'
import { DocPage } from '../../components/layout/DocPage'
import type { Heading } from '../../components/layout/AnchorNav'
import NotFoundPage from '../NotFoundPage'

type LibraryArticle = {
  id: number
  slug: string
  path: string
  title: string
  description: string
  group: string
}

const articles = catalog as LibraryArticle[]
const markdownFiles = import.meta.glob('../../data/gpt88-library/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function markdownFor(article: LibraryArticle) {
  return markdownFiles[`../../data/gpt88-library/articles/${article.slug}.md`] ?? ''
}

function getHeadings(markdown: string): Heading[] {
  const used = new Map<string, number>()
  return markdown.split(/\r?\n/).flatMap(line => {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) return []
    const text = match[2].replace(/[`*_~]/g, '').trim()
    const base = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
    const count = used.get(base) ?? 0
    used.set(base, count + 1)
    return [{ id: count ? `${base}-${count + 1}` : base, text, level: match[1].length as 2 | 3 }]
  })
}

const GROUP_ICONS: Record<string, typeof BookOpen> = {
  'API 与账户': KeyRound,
  '开发工具接入': Wrench,
  'Codex 实战': BookOpen,
  'AI 图片与视频创作': Sparkles,
}

function LibraryHub() {
  const groups = [...new Set(articles.map(article => article.group))]
  const headings = groups.map(group => ({
    id: group.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-'),
    text: group,
    level: 2 as const,
  }))

  return <DocPage
    path="/docs/guides/gpt88-library/"
    title="GPT88 教程库"
    description="GPT88 教程库收录 API 与账户、开发工具、Codex 工作流和 AI 创作内容。"
    headings={headings}
  >
    <div className="not-prose mb-8 border-l-2 border-cyan-300 pl-4 py-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200"><BookOpen className="h-4 w-4" />41 篇教程 · 4 个主题</div>
      <p className="mt-2 text-sm leading-6 text-ink-300">通用操作与工作流已整理为 GPT88 教程。涉及平台地址、账户、Key、计费、模型参数或接口的步骤，都标出适用范围并链接到 GPT88 当前资料。</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link className="text-cyan-300 hover:text-cyan-200" to="/docs/quickstart/">快速开始</Link>
        <Link className="text-cyan-300 hover:text-cyan-200" to="/docs/guides/api-key-management/">API Key 管理</Link>
        <Link className="text-cyan-300 hover:text-cyan-200" to="/models/">模型导航</Link>
      </div>
    </div>
    {groups.map(group => {
      const Icon = GROUP_ICONS[group] ?? CircleAlert
      return <section key={group} className="not-prose mb-10">
        <h2 id={group.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-')} className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-100">
          <Icon className="h-4 w-4 text-cyan-300" />{group}
        </h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {articles.filter(article => article.group === group).map(article => <Link
            key={article.id}
            to={article.path === 'api-key-management' ? '/docs/guides/api-key-management/' : `/docs/guides/gpt88-library/${article.path}/`}
            className="group flex items-start justify-between gap-4 py-4"
          >
            <span className="min-w-0">
              <span className="block font-medium text-ink-50 group-hover:text-cyan-200">{article.title}</span>
              <span className="mt-1 block text-sm leading-6 text-ink-400">{article.description}</span>
            </span>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-500 group-hover:text-cyan-300" />
          </Link>)}
        </div>
      </section>
    })}
  </DocPage>
}

export default function ImportedDocsPage() {
  const params = useParams()
  const sourcePath = params['*']?.replace(/\/$/, '') ?? ''
  if (!sourcePath) return <LibraryHub />
  const article = articles.find(item => item.path === sourcePath)
  if (!article) return <NotFoundPage />
  if (article.path === 'api-key-management') return <Navigate to="/docs/guides/api-key-management/" replace />
  const markdown = markdownFor(article)
  return <DocPage
    path={`/docs/guides/gpt88-library/${article.path}/`}
    title={article.title}
    description={article.description}
    headings={getHeadings(markdown)}
  >
    <div className="not-prose mb-7 border-l-2 border-amber-300 pl-4 py-1 text-sm leading-6 text-amber-100/90">
      <p><strong>适用范围：</strong>涉及账户、Key、模型、计费或接口的内容，请以 GPT88 当前控制台和对应 API 文档为准。</p>
      <Link to="/docs/guides/gpt88-library/" className="mt-2 inline-block text-cyan-300 hover:text-cyan-200">返回教程库</Link>
    </div>
    <div className="prose prose-invert min-w-0 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-li:text-ink-200 prose-table:text-[13px] prose-th:bg-white/[0.03] prose-th:font-medium">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href = '', children }) => href.startsWith('/')
            ? <Link to={href}>{children}</Link>
            : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
          img: ({ alt = '', src = '', title }) => <img src={src} alt={alt} title={title} loading="lazy" decoding="async" className="my-6 h-auto max-w-full rounded-md border border-white/10" />,
        }}
      >{markdown}</ReactMarkdown>
    </div>
  </DocPage>
}
