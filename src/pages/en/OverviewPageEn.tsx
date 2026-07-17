import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, Code2, Compass, Image, Zap } from 'lucide-react'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const NEXT_STEPS = [
  { title: 'Quickstart', desc: 'Make your first request in 5 minutes.', href: '/docs/quickstart/', icon: Zap },
  { title: 'API Reference', desc: 'Review request and response shapes.', href: '/docs/api/chat-completions/', icon: Code2 },
  { title: 'Models', desc: 'Browse chat, image, video, and audio models.', href: '/models/', icon: Compass },
  { title: 'Agent Image Studio', desc: 'Use agent.gpt88.cc for image workflows.', href: '/docs/guides/agent-image-studio/', icon: Image },
]

export default function OverviewPageEn() {
  return (
    <DocPage
      path="/docs/overview"
      title="Overview"
      description="gpt88.cc is a unified AI API gateway that aggregates multiple model vendors behind one OpenAI-compatible interface."
      headings={[
        { id: 'what-is-it', text: 'What it is', level: 2 },
        { id: 'who-is-it-for', text: 'Who it is for', level: 2 },
        { id: 'capabilities', text: 'Core capabilities', level: 2 },
        { id: 'kimi-3', text: 'Kimi K3 recommendation', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <h2 id="what-is-it">What it is</h2>
      <p>
        <strong>gpt88.cc</strong> lets developers keep one OpenAI-style integration while switching
        across multiple upstream model vendors. In most cases, the only required changes are the
        <code>base_url</code> and your API key.
      </p>
      <p>
        The default OpenAI-compatible endpoint is <code>https://api.gpt88.cc</code>. Equivalent
        regional endpoints are also available for China and overseas routing.
      </p>

      <h2 id="who-is-it-for">Who it is for</h2>
      <ul>
        <li>Teams building AI products that need a single integration layer.</li>
        <li>Developers comparing model quality, latency, and cost across vendors.</li>
        <li>Existing OpenAI SDK users who want more model coverage with minimal code changes.</li>
      </ul>

      <h2 id="capabilities">Core capabilities</h2>
      <ul>
        <li>
          <Boxes className="inline-block h-4 w-4 align-[-2px] text-violet-300" />{' '}
          <strong>Chat Completions</strong> with streaming, tool use, and multimodal request shapes
          depending on the model.
        </li>
        <li>
          <strong>Model listing</strong> through <code>GET /v1/models</code>.
        </li>
        <li>
          <strong>Image / audio / video extensions</strong> documented in the model navigation and API pages.
        </li>
        <li>
          <strong>Unified error handling</strong> so client-side retries and debugging stay consistent.
        </li>
      </ul>

      <h2 id="kimi-3">Kimi K3 recommendation</h2>
      <Callout tone="tip" title="Prioritize Kimi K3 for long-context coding and knowledge work">
        <p>
          Kimi K3 is Moonshot's launched flagship model. Its official API documentation lists model ID{' '}
          <code>kimi-k3</code>, 1M-token context, native visual understanding, long-horizon coding,
          knowledge work, reasoning, and tool calling.
        </p>
        <p>
          In GPT88, use <code>https://api.gpt88.cc</code> and set <code>model</code> to <code>kimi-k3</code>.
          Check <Link to={localizePath('/models/', 'en')}>model navigation</Link>, the{' '}
          <a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">model square</a>,
          or the console to confirm account access. See the{' '}
          <a href="https://platform.kimi.ai/docs/guide/kimi-k3-quickstart" target="_blank" rel="noreferrer">
            official Kimi K3 quickstart
          </a>{' '}
          for the upstream reference.
        </p>
      </Callout>
      <ul>
        <li><strong>Chinese long-context knowledge work</strong>: Summarization, research, meeting notes, and structured synthesis.</li>
        <li><strong>Long-horizon coding</strong>: Large-codebase analysis, multi-step fixes, refactoring, and engineering workflows.</li>
        <li><strong>Multimodal agents</strong>: Evaluate visual input, tool calling, and multi-step agent orchestration.</li>
        <li><strong>Cost control</strong>: Treat the 1M-token window as capacity, not a target; benchmark quality, latency, caching, and actual deductions.</li>
      </ul>

      <h2 id="next">Next steps</h2>
      <div className="not-prose mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {NEXT_STEPS.map(step => (
          <Link
            key={step.href}
            to={localizePath(step.href, 'en')}
            className="group tech-card tech-card-hover flex flex-col p-5"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-violet-500/12 ring-1 ring-violet-500/30 text-violet-300">
              <step.icon className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink-50">{step.title}</h3>
            <p className="mt-1 flex-1 text-xs text-ink-400">{step.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-300 group-hover:text-violet-200">
              Open <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </DocPage>
  )
}
