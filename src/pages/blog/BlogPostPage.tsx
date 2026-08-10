import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock, FolderOpen } from 'lucide-react'
import { BLOG_POSTS, getBlogContent, getBlogMetaLocalized } from '../../data/blog'
import { Seo } from '../../components/seo/Seo'
import { docStructuredData } from '../../components/seo/structuredData'
import { BlogMarkdown } from '../../components/blog/BlogMarkdown'
import { localizedContentPath, useLocale } from '../../lib/locale'

export default function BlogPostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { locale } = useLocale()
  const meta = getBlogMetaLocalized(slug, locale)
  const content = getBlogContent(slug)

  if (!meta || !content) {
    return <Navigate to={localizedContentPath('/docs/blog/', locale)} replace />
  }

  const markdown = locale === 'en' && content.en ? content.en : content.zh
  const isEn = locale === 'en'
  const basePath = `/docs/blog/${slug}`
  const dateLabel = meta.date
  const category = meta.category
  const related = meta.relatedPath && meta.relatedTitle
    ? { path: meta.relatedPath, title: meta.relatedTitle }
    : null

  const index = BLOG_POSTS.findIndex(post => post.slug === slug)
  const prev = index > 0 ? BLOG_POSTS[index - 1] : null
  const next = index >= 0 && index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null

  const description = meta.description

  return (
    <>
      <Seo
        title={meta.title}
        description={description}
        path={basePath}
        type="article"
        structuredData={docStructuredData(meta.title, description, basePath, locale)}
      />
      <div className="flex gap-10">
        <article className="prose prose-invert min-w-0 flex-1 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-h3:mt-8 prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-li:text-ink-200">
          <header className="not-prose mb-8 border-b border-white/5 pb-6">
            <Link
              to={localizedContentPath('/docs/blog/', locale)}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {isEn ? 'Back to blog' : '返回博客'}
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-50">{meta.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" />
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {dateLabel}
              </span>
              {meta.readTime ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {isEn ? `${meta.readTime} min read` : `约 ${meta.readTime} 分钟`}
                </span>
              ) : null}
              {meta.tags.length ? (
                <span className="flex flex-wrap items-center gap-1.5">
                  {meta.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              ) : null}
            </div>
          </header>

          <BlogMarkdown markdown={markdown} />

          {related ? (
            <div className="not-prose mt-10 rounded-lg border border-violet-500/20 bg-violet-500/[0.05] p-4">
              <p className="text-[11px] uppercase tracking-wider text-ink-400">
                {isEn ? 'Related guide' : '相关指南'}
              </p>
              <Link
                to={localizedContentPath(related.path, locale)}
                className="mt-1 block text-sm font-medium text-violet-200 transition-colors hover:text-violet-100"
              >
                {related.title}
              </Link>
            </div>
          ) : null}

          <nav
            aria-label={isEn ? 'Blog pagination' : '博客翻页'}
            className="not-prose mt-14 grid grid-cols-1 gap-3 border-t border-white/5 pt-6 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                to={localizedContentPath(`/docs/blog/${prev.slug}`, locale)}
                className="group flex flex-col items-start rounded-lg border border-white/5 p-4 transition-colors hover:border-violet-500/40 hover:bg-violet-500/5"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-500">
                  <ArrowLeft className="h-3 w-3" /> {isEn ? 'Newer' : '下一篇'}
                </span>
                <span className="mt-1 text-sm font-medium text-ink-100 group-hover:text-violet-200">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={localizedContentPath(`/docs/blog/${next.slug}`, locale)}
                className="group flex flex-col items-end rounded-lg border border-white/5 p-4 text-right transition-colors hover:border-violet-500/40 hover:bg-violet-500/5 sm:col-start-2"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-500">
                  {isEn ? 'Older' : '上一篇'} <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-1 text-sm font-medium text-ink-100 group-hover:text-violet-200">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </article>
      </div>
    </>
  )
}
