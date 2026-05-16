import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'

/**
 * 404 兜底
 * 文档站不需要复杂的错误页，给一句友好提示和回退入口即可
 */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="页面未找到"
        description="这条 gpt88.cc 文档 URL 对应的内容可能尚未上线，或者已经迁移。"
        path="/404"
        noindex
      />
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="font-mono text-5xl font-bold text-violet-400">404</div>
        <h1 className="mt-4 text-2xl font-semibold text-ink-50">页面不见了</h1>
        <p className="mt-2 text-sm text-ink-400">
          这条 URL 对应的内容可能尚未上线，或者已经迁移。
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400"
          >
            返回首页
          </Link>
          <Link
            to="/docs/overview"
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink-100 hover:border-violet-500/40"
          >
            浏览文档
          </Link>
        </div>
      </section>
    </>
  )
}
