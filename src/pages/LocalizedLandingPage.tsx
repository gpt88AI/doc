import { Link } from 'react-router-dom'
import { ArrowRight, Globe, KeyRound, Rocket, Zap } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { websiteStructuredData } from '../components/seo/structuredData'
import { ActivationQuickStarts } from '../components/activation/ActivationQuickStarts'
import { buildAgentActivationUrl } from '../lib/activationLinks'
import { localizedContentPath, localizePath, useLocale } from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'

const CURL_EXAMPLE = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.6-sol",
    "messages": [{"role": "user", "content": "Hello from gpt88.cc"}]
  }'`

export default function LocalizedLandingPage() {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale)
  const getKeyUrl = buildAgentActivationUrl({
    locale,
    surface: 'home_primary',
    intent: 'api_access',
    destination: 'keys',
  })

  return (
    <>
      <Seo
        title={copy.siteName}
        description={copy.home.description}
        path="/"
        structuredData={websiteStructuredData(locale, '/')}
      />
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
          <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
            <Globe className="h-3.5 w-3.5" />
            {copy.home.eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            {copy.home.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink-300 sm:text-lg">
            {copy.home.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={localizePath('/docs/quickstart/', locale)} className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white">
              <Rocket className="h-4 w-4" /> {copy.home.quickstart}
            </Link>
            <a href={getKeyUrl} className="inline-flex items-center gap-2 rounded-md border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100">
              <KeyRound className="h-4 w-4" /> {copy.home.getKey}
            </a>
            <Link to={localizedContentPath('/docs/api/chat-completions/', locale)} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink-100">
              {copy.home.apiReference}
            </Link>
          </div>

          <div className="mt-8">
            <ActivationQuickStarts surface="home" />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {copy.home.cards.map(card => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm font-semibold text-ink-50">{card.title}</div>
                <p className="mt-2 text-sm leading-6 text-ink-300">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80">
            <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ink-500">{copy.home.codeLabel}</div>
            <pre className="overflow-x-auto p-4 text-sm leading-6 text-ink-200"><code>{CURL_EXAMPLE}</code></pre>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-ink-300">
            <Link to={localizePath('/docs/overview/', locale)} className="inline-flex items-center gap-1 text-violet-300">{copy.home.links.overview} <ArrowRight className="h-3 w-3" /></Link>
            <Link to={localizePath('/docs/auth/', locale)} className="inline-flex items-center gap-1 text-violet-300">{copy.home.links.billing} <ArrowRight className="h-3 w-3" /></Link>
            <Link to={localizedContentPath('/models/', locale)} className="inline-flex items-center gap-1 text-violet-300">{copy.home.links.models} <ArrowRight className="h-3 w-3" /></Link>
            <Link to={localizePath('/docs/quickstart/', locale)} className="inline-flex items-center gap-1 text-violet-300">{copy.home.links.fiveMinutes} <Zap className="h-3 w-3" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
