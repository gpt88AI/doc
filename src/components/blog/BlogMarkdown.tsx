import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { localizedContentPath, useLocale } from '../../lib/locale'

/**
 * 博客 markdown 渲染器
 *
 * 复用 react-markdown + remark-gfm + rehype-highlight（依赖已在 package.json）。
 * 内链统一走 react-router 的 Link 并做 locale 前缀处理；外链新窗口打开。
 * 图片资源使用文章中的静态路径渲染，并限制最大宽度，避免破坏正文布局。
 */
export function BlogMarkdown({ markdown }: { markdown: string }) {
  const { locale } = useLocale()

  return (
    <div className="prose prose-invert min-w-0 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-2xl prose-h1:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-h3:mt-8 prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-li:text-ink-200 prose-table:text-[13px] prose-th:bg-white/[0.03] prose-th:font-medium">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href = '', children }) => {
            if (/\.mp4(?:$|[?#])/.test(href)) {
              return (
                <video
                  src={href}
                  controls
                  playsInline
                  preload="metadata"
                  className="my-6 h-auto max-w-full rounded-xl border border-white/10"
                >
                  {children}
                </video>
              )
            }
            const isInternal = href.startsWith('/')
            const isHash = href.startsWith('#')
            if (isInternal) {
              const clean = href.split(/[?#]/)[0] || '/'
              const hash = href.slice(clean.length)
              return (
                <Link to={localizedContentPath(clean, locale) + hash}>
                  {children}
                </Link>
              )
            }
            if (isHash) {
              return <a href={href}>{children}</a>
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
          img: ({ alt = '', src = '', title }) => (
            <img
              src={src}
              alt={alt}
              title={title}
              loading="lazy"
              decoding="async"
              className="my-6 h-auto max-w-full rounded-xl border border-white/10"
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
