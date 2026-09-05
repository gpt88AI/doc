import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { BlogMarkdown } from '../../../components/blog/BlogMarkdown'
import { parseFrontmatter, type BlogFrontmatter } from '../../../lib/frontmatter'
import { localizedContentPath, useLocale } from '../../../lib/locale'

type Digest = BlogFrontmatter & {
  slug: string
  body: string
}

const modules = import.meta.glob('../../../data/follow-builders/digests/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const DIGESTS: Digest[] = Object.entries(modules)
  .map(([filePath, source]) => {
    const match = filePath.match(/\/([0-9]{4}-[0-9]{2}-[0-9]{2})\.md$/)
    if (!match) return null
    const { meta, body } = parseFrontmatter(source)
    return { ...meta, body, slug: match[1] }
  })
  .filter((digest): digest is Digest => digest !== null)
  .sort((a, b) => b.date.localeCompare(a.date))

export default function FollowBuildersDigestPage() {
  const { date } = useParams<{ date?: string }>()
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const title = isEn ? 'AI Builders Daily Digest' : 'AI Builders 每日摘要'
  const description = isEn
    ? 'A daily, source-linked digest of what leading AI builders are researching, shipping, and debating.'
    : '每天整理 AI 研究者、创始人、产品经理和工程师正在研究、发布与讨论的内容，并保留原始来源链接。'

  if (date) {
    const digest = DIGESTS.find(item => item.slug === date)
    if (!digest) return <Navigate to={localizedContentPath('/docs/guides/ai-builders-digest/', locale)} replace />

    const digestPath = `/docs/guides/ai-builders-digest/${digest.slug}/`
    return (
      <DocPage
        path={digestPath}
        title={digest.title}
        description={digest.description || description}
      >
        <div className="not-prose mb-6">
          <Link
            to={localizedContentPath('/docs/guides/ai-builders-digest/', locale)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {isEn ? 'Back to digest archive' : '返回摘要归档'}
          </Link>
        </div>
        <BlogMarkdown markdown={digest.body} />
      </DocPage>
    )
  }

  return (
    <DocPage
      path="/docs/guides/ai-builders-digest/"
      title={title}
      description={description}
      headings={[
        { id: 'how-to-read', text: isEn ? 'How to read' : '阅读方式', level: 2 },
        { id: 'digest-archive', text: isEn ? 'Digest archive' : '每日摘要', level: 2 },
      ]}
    >
      <section className="not-prose mb-10 rounded-lg border border-violet-500/20 bg-violet-500/[0.05] p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-violet-200">
          <FileText className="h-4 w-4" />
          {isEn ? 'Published from the Follow Builders skill' : '由 Follow Builders Skill 自动整理发布'}
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-300">
          {isEn
            ? 'Each entry is generated from the project feed, keeps a direct link to every included item, and is mirrored to the connected Obsidian vault.'
            : '每一期内容来自项目 feed，所有纳入的内容都保留直接来源链接，并同步写入已连接的 Obsidian vault。'}
        </p>
      </section>

      <h2 id="how-to-read">{isEn ? 'How to read' : '阅读方式'}</h2>
      <p>
        {isEn
          ? 'Start with the newest entry. The bottom line is the short operational takeaway; the bullets preserve the specific ideas worth following up. Treat each item as a pointer to the original source, not as a replacement for it.'
          : '优先阅读最新一期。“一句话结论”用于快速判断是否值得继续看，下面的要点保留值得跟进的具体观点。每一条都指向原始来源，摘要不替代原文。'}
      </p>

      <h2 id="digest-archive">{isEn ? 'Digest archive' : '每日摘要'}</h2>
      {DIGESTS.length ? (
        <div className="not-prose space-y-3">
          {DIGESTS.map(digest => (
            <Link
              key={digest.slug}
              to={localizedContentPath(`/docs/guides/ai-builders-digest/${digest.slug}/`, locale)}
              className="group flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-4 transition-colors hover:border-violet-500/40 hover:bg-violet-500/[0.05]"
            >
              <span className="min-w-0">
                <span className="block truncate text-base font-medium text-ink-100 group-hover:text-violet-200">
                  {digest.title}
                </span>
                <span className="mt-1 block text-xs text-ink-400">
                  {digest.description || (isEn ? 'Source-linked daily digest.' : '保留原始来源链接的每日摘要。')}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-ink-400">
                <Calendar className="h-3.5 w-3.5" />
                {digest.date}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="not-prose rounded-lg border border-white/5 p-6 text-sm text-ink-400">
          {isEn ? 'The first digest has not been published yet.' : '首期摘要尚未发布。'}
        </div>
      )}
    </DocPage>
  )
}
