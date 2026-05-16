import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnchorNav, type Heading } from './AnchorNav'
import { DOCS_FLAT } from '../../data/nav'
import { Seo } from '../seo/Seo'
import { docStructuredData } from '../seo/structuredData'

type DocPageProps = {
  /** 页面在 DOCS_FLAT 中的 path，用于 prev/next */
  path: string
  /** 主标题 */
  title: string
  /** 副标题/导语 */
  description?: string
  /** 锚点目录数据，由具体页面手动维护，避免运行时遍历 DOM 出错 */
  headings?: Heading[]
  children: React.ReactNode
}

/**
 * 单篇文档页脚手架
 * - 标题区 + 主内容（prose 排版）+ Prev/Next 翻页 + 右侧锚点目录
 * - 内容由父组件传入，可以是任意 JSX；若有标题需要被锚点跟踪，需自行加 id 并在 headings 中登记
 */
export function DocPage({ path, title, description, headings = [], children }: DocPageProps) {
  const seoDescription = description ?? `${title} - gpt88.cc API 文档。`

  // 翻页导航：从扁平结构中找上一/下一篇
  const { prev, next } = useMemo(() => {
    const idx = DOCS_FLAT.findIndex(item => item.path === path)
    return {
      prev: idx > 0 ? DOCS_FLAT[idx - 1] : null,
      next: idx >= 0 && idx < DOCS_FLAT.length - 1 ? DOCS_FLAT[idx + 1] : null,
    }
  }, [path])

  // 路由切换时滚动回顶部
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [path])

  return (
    <>
      <Seo
        title={title}
        description={seoDescription}
        path={path}
        type="article"
        structuredData={docStructuredData(title, seoDescription, path)}
      />
      <div className="flex gap-10">
      <article className="prose prose-invert min-w-0 flex-1 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:tracking-tight prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-h3:mt-8 prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-li:text-ink-200">
        <header className="not-prose mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-50">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-base text-ink-300">{description}</p>
          ) : null}
        </header>

        {children}

        {/* 翻页 */}
        <nav
          aria-label="文档翻页"
          className="not-prose mt-14 grid grid-cols-1 gap-3 border-t border-white/5 pt-6 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              to={prev.path}
              className="group flex flex-col items-start rounded-lg border border-white/5 p-4 transition-colors hover:border-violet-500/40 hover:bg-violet-500/5"
            >
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-500">
                <ArrowLeft className="h-3 w-3" /> 上一页
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
              to={next.path}
              className="group flex flex-col items-end rounded-lg border border-white/5 p-4 text-right transition-colors hover:border-violet-500/40 hover:bg-violet-500/5 sm:col-start-2"
            >
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-ink-500">
                下一页 <ArrowRight className="h-3 w-3" />
              </span>
              <span className="mt-1 text-sm font-medium text-ink-100 group-hover:text-violet-200">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </article>

      {/* 右侧锚点目录：仅 xl 以上显示，避免主内容被挤窄 */}
      {headings.length > 0 ? (
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-52 shrink-0 overflow-y-auto pt-1 xl:block">
          <AnchorNav headings={headings} />
        </aside>
      ) : null}
      </div>
    </>
  )
}
