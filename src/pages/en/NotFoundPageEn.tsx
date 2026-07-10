import { Link } from 'react-router-dom'
import { Seo } from '../../components/seo/Seo'
import { localizePath } from '../../lib/locale'

export default function NotFoundPageEn() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="This gpt88.cc docs URL may not exist yet, or the page has moved."
        path="/404"
        noindex
      />
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="font-mono text-5xl font-bold text-violet-400">404</div>
        <h1 className="mt-4 text-2xl font-semibold text-ink-50">Page not found</h1>
        <p className="mt-2 text-sm text-ink-400">
          This URL may not exist yet, or the content has moved.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={localizePath('/', 'en')}
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400"
          >
            Home
          </Link>
          <Link
            to={localizePath('/docs/overview/', 'en')}
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink-100 hover:border-violet-500/40"
          >
            Browse docs
          </Link>
        </div>
      </section>
    </>
  )
}
