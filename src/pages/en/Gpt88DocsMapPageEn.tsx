import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

const ENTRIES = [
  ['gpt88.cc', 'Main console for text models, API keys, account management, and request debugging.'],
  ['agent.gpt88.cc', 'Image workspace for posters, ecommerce images, model photos, scenes, and batch assets.'],
  ['doc.gpt88.cc', 'Documentation for API integration, model selection, tools, and troubleshooting.'],
  ['img.gpt88.cc', 'Direct image API base URL for GPT-Image-2 and automated image workflows.'],
]

const CATEGORIES = [
  ['Getting started', 'Overview, quickstart, authentication, billing, and the complete integration guide.'],
  ['API and models', 'Chat Completions, image generation, Grok video, model navigation, and errors.'],
  ['Clients and tools', 'ChatBox, Claude Code, Codex CLI, CC-Switch, and other integration paths.'],
  ['Images and ecommerce', 'Agent Image Studio, image quality, ecommerce production, and batch assets.'],
  ['Codex and Agent', 'OAuth, tool recovery, Skills, context engineering, and production workflows.'],
]

export default function Gpt88DocsMapPageEn() {
  return (
    <DocPage
      path="/docs/guides/gpt88-docs-map"
      title="GPT88 Product and Documentation Map"
      description="Choose the right GPT88 product entry, documentation category, API route, and learning path."
      headings={[
        { id: 'why', text: 'What this page solves', level: 2 },
        { id: 'entries', text: 'Product entries', level: 2 },
        { id: 'categories', text: 'Documentation categories', level: 2 },
        { id: 'read-order', text: 'Recommended reading order', level: 2 },
        { id: 'community', text: 'Feedback and updates', level: 2 },
      ]}
    >
      <Callout tone="info" title="Start with the right entry point">
        <p>
          GPT88 covers text models, image generation, API integration, model navigation, Codex and Agent
          workflows, and ecommerce production. This map helps you choose the right site before opening a
          detailed guide.
        </p>
      </Callout>

      <h2 id="why">What this page solves</h2>
      <p>
        The most common first-use problem is not request syntax. It is knowing which console, API host,
        model page, or tutorial matches the job. Use the product map for destinations and the documentation
        map for the next action.
      </p>

      <h2 id="entries">Product entries</h2>
      <div className="not-prose grid gap-4 md:grid-cols-2">
        {ENTRIES.map(([name, description]) => (
          <section key={name} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
            <h3 className="text-base font-semibold text-ink-50">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{description}</p>
          </section>
        ))}
      </div>

      <h2 id="categories">Documentation categories</h2>
      <div className="not-prose grid gap-4">
        {CATEGORIES.map(([name, description]) => (
          <section key={name} className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
            <h3 className="text-base font-semibold text-ink-50">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{description}</p>
          </section>
        ))}
      </div>

      <h2 id="read-order">Recommended reading order</h2>
      <ol>
        <li>Read the <Link to="/docs/overview/">product overview</Link> to understand the main console and image workspace.</li>
        <li>Use <Link to="/docs/quickstart/">Quickstart</Link> to confirm the API key, base URL, model, and first request.</li>
        <li>For development, continue with the <Link to="/docs/api/chat-completions/">API reference</Link> and <Link to="/models/">model catalog</Link>.</li>
        <li>For existing tools, open the <Link to="/docs/integrations/">integration guides</Link> and choose the client or IDE.</li>
        <li>For image and ecommerce work, start with <Link to="/docs/guides/agent-image-studio/">Agent Image Studio</Link> and the <Link to="/docs/guides/ecommerce-tools-special/">ecommerce guide</Link>.</li>
      </ol>

      <h2 id="community">Feedback and updates</h2>
      <p>
        Report broken links, outdated model IDs, inaccurate parameters, or missing tool guides through the
        GPT88 community channels. Check the <Link to="/docs/changelog/">changelog</Link> for recent model,
        tutorial, and documentation updates.
      </p>
      <Callout tone="tip" title="A practical starting rule">
        <p>
          Do not begin by comparing every model. Choose the correct entry point, run one minimal scenario,
          and then refine the workflow by model, tool, and business type.
        </p>
      </Callout>
    </DocPage>
  )
}
