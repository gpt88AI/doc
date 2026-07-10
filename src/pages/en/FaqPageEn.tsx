import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { DocPage } from '../../components/layout/DocPage'
import { cn } from '../../lib/cn'
import { localizePath } from '../../lib/locale'

type QA = { q: string; a: React.ReactNode; group: string }

const FAQ: QA[] = [
  {
    group: 'Getting Started',
    q: 'Where do I get an API key?',
    a: (
      <p>
        Go to <a href="https://gpt88.cc" target="_blank" rel="noreferrer">https://gpt88.cc</a>,
        create a new key in the API Keys area, then export it as <code>GPT88_API_KEY</code> and follow the{' '}
        <Link to={localizePath('/docs/quickstart/', 'en')}>Quickstart</Link>.
      </p>
    ),
  },
  {
    group: 'Compatibility',
    q: 'Is gpt88.cc OpenAI compatible?',
    a: (
      <p>
        Yes. The request shape, error envelope, and streaming behavior are designed to stay compatible
        with OpenAI-style SDKs. In most cases you only replace <code>base_url</code> and the API key.
      </p>
    ),
  },
  {
    group: 'Compatibility',
    q: 'Can I use LangChain, LiteLLM, or Vercel AI SDK?',
    a: (
      <p>
        Yes. Any framework that supports an OpenAI-compatible provider can usually work by pointing it to{' '}
        <code>https://gpt88.cc/v1</code>.
      </p>
    ),
  },
  {
    group: 'Billing',
    q: 'Do you use multipliers or a points system?',
    a: (
      <p>
        No. gpt88.cc follows an RMB balance and real token usage model. Users see actual token
        consumption and actual cost instead of translating through points or multiplier logic.
      </p>
    ),
  },
  {
    group: 'Security',
    q: 'Can I call the API directly from the browser?',
    a: (
      <p>
        Not recommended. API keys should stay on the server side. Use your own backend or edge route
        to proxy requests.
      </p>
    ),
  },
  {
    group: 'Troubleshooting',
    q: 'What should I include in a support request?',
    a: (
      <ul className="list-disc pl-5">
        <li><code>error.request_id</code> or <code>X-Request-Id</code></li>
        <li>HTTP status and business error code</li>
        <li>Model ID and request timestamp with timezone</li>
        <li>Whether the issue is reproducible and under what pattern</li>
      </ul>
    ),
  },
]

function FaqItem({ item, defaultOpen }: { item: QA; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen))
  return (
    <div className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.015]">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink-100 hover:bg-white/[0.025]"
      >
        <span>{item.q}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="space-y-2 border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-ink-200 [&_a]:text-violet-300 hover:[&_a]:text-violet-200 [&_code]:rounded [&_code]:bg-white/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-violet-200">
          {item.a}
        </div>
      ) : null}
    </div>
  )
}

export default function FaqPageEn() {
  const groups = Array.from(new Set(FAQ.map(f => f.group)))
  return (
    <DocPage
      path="/docs/faq"
      title="FAQ"
      description="Common questions about compatibility, API keys, billing, and troubleshooting for gpt88.cc."
      headings={groups.map(g => ({ id: `g-${g}`, text: g, level: 2 }))}
    >
      {groups.map((group, gi) => (
        <section key={group}>
          <h2 id={`g-${group}`}>{group}</h2>
          <div className="not-prose flex flex-col gap-2">
            {FAQ.filter(f => f.group === group).map((item, i) => (
              <FaqItem key={item.q} item={item} defaultOpen={gi === 0 && i === 0} />
            ))}
          </div>
        </section>
      ))}
    </DocPage>
  )
}
