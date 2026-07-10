import { Link } from 'react-router-dom'
import { ArrowRight, Globe, KeyRound, Rocket, Zap } from 'lucide-react'
import { Seo } from '../../components/seo/Seo'
import { websiteStructuredData } from '../../components/seo/structuredData'
import { localizePath } from '../../lib/locale'

const CURL_EXAMPLE = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.6-sol",
    "messages": [{"role": "user", "content": "Introduce gpt88.cc in one sentence."}]
  }'`

export default function LandingPageEn() {
  return (
    <>
      <Seo
        title="gpt88.cc API Docs"
        description="One OpenAI-compatible base_url for Claude, GPT, Gemini, DeepSeek, Qwen, and more."
        path="/"
        structuredData={websiteStructuredData('en', '/en/')}
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
            Unified API Gateway · OpenAI Compatible
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            One <code className="rounded-md border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[0.86em] text-violet-100">base_url</code>
            {' '}for all models on gpt88.cc
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink-300 sm:text-lg">
            Point your existing OpenAI-compatible SDK to <code>https://gpt88.cc/v1</code>,
            then switch models through the <code>model</code> field. No vendor-by-vendor rewrite.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={localizePath('/docs/quickstart/', 'en')}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Rocket className="h-4 w-4" />
              Quickstart
            </Link>
            <a
              href="https://gpt88.cc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100"
            >
              <KeyRound className="h-4 w-4" />
              Get API Key
            </a>
            <Link
              to={localizePath('/docs/api/chat-completions/', 'en')}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink-100"
            >
              API Reference
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-ink-50">Minimal migration</div>
              <p className="mt-2 text-sm leading-6 text-ink-300">
                Replace the base URL and API key. Keep the same OpenAI-style request body.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-ink-50">One gateway, many models</div>
              <p className="mt-2 text-sm leading-6 text-ink-300">
                Claude, GPT, Gemini, DeepSeek, Qwen, image models, and more under one entry point.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-ink-50">Transparent billing</div>
              <p className="mt-2 text-sm leading-6 text-ink-300">
                RMB balance and real token usage. No multiplier game, no opaque points system.
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80">
            <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ink-500">
              Quick cURL
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-6 text-ink-200">
              <code>{CURL_EXAMPLE}</code>
            </pre>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-ink-300">
            <Link to={localizePath('/docs/overview/', 'en')} className="inline-flex items-center gap-1 text-violet-300">
              Overview <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to={localizePath('/docs/auth/', 'en')} className="inline-flex items-center gap-1 text-violet-300">
              Auth & Billing <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to={localizePath('/models/', 'en')} className="inline-flex items-center gap-1 text-violet-300">
              Models <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to={localizePath('/docs/quickstart/', 'en')} className="inline-flex items-center gap-1 text-violet-300">
              Start in 5 minutes <Zap className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
