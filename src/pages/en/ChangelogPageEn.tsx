import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const SOURCE = `Update sources:
- GPT88 platform, gpt88.cc Console, agent.gpt88.cc Image Studio, and related APIs
- Entries are grouped by user-visible product area
- Record meaningful features, important fixes, deployment changes, billing changes, and API behavior

Maintenance:
1. Add a dated section after each release or meaningful feature group
2. Explain the user impact before technical detail
3. Exclude internal-only commits with no user impact
4. Prioritise billing, models, image generation, payments, and deployment changes`

const LATEST = [
  ['New', 'Enterprise AI training and delivery guidance', 'Added structured guidance for training, collaboration, knowledge capture, tool governance, and adoption checks.'],
  ['New', 'Codex desktop startup troubleshooting', 'Documented PATH, npm global installation, Windows packages, version mismatches, desktop process environments, and rollback checks.'],
  ['Improved', 'Search and machine-readable indexes', 'New blog content is synchronized with prerender routes, sitemaps, llms.txt, and llms-full.txt.'],
]

const HISTORY = [
  ['2026-08-25', 'Added DeepSeek Harness architecture and advanced workflow documentation.'],
  ['2026-08-22', 'Expanded GPT88 blog, model reviews, developer guides, and multilingual index coverage.'],
  ['2026-08-21', 'Added Codex connection recovery guidance and DeepSeek Harness plugin ecosystem notes.'],
  ['2026-08-19', 'Added an Agent learning path covering API calls, tools, context, permissions, recovery, and production checks.'],
  ['2026-08-16', 'Added Harness Inspector guidance and GPT88 public-interest project and SEO documentation.'],
  ['2026-08-13', 'Added Grok 4.6 model recommendations, integration notes, and practical evaluation material.'],
  ['2026-08-10', 'Improved the multilingual homepage and migrated historical blog content into the GPT88 blog system.'],
  ['2026-08-05', 'Added asynchronous image-generation integration guidance with task persistence, polling, recovery, and production checks.'],
  ['2026-07-21', 'Expanded multilingual entry points, core onboarding pages, RTL support, canonical URLs, hreflang, sitemaps, and prerender audits.'],
  ['2026-07-16', 'Updated API routes, billing explanations, media endpoints, SEO indexes, and Claude Code recovery documentation.'],
]

export default function ChangelogPageEn() {
  return (
    <DocPage
      path="/docs/changelog"
      title="GPT88 Changelog"
      description="A record of GPT88 product updates, fixes, image tools, model catalog changes, billing, deployment, and API behavior."
      headings={[
        { id: 'source', text: 'Update sources', level: 2 },
        { id: 'latest', text: 'Latest updates', level: 2 },
        { id: 'history', text: 'History', level: 2 },
        { id: 'maintain', text: 'Maintenance rules', level: 2 },
      ]}
    >
      <Callout tone="info" title="What this page records">
        <p>
          This page records changes that users can observe in GPT88. It turns implementation work into
          a readable release history instead of exposing raw internal commit messages.
        </p>
      </Callout>

      <h2 id="source">Update sources</h2>
      <CodeBlock lang="text" filename="gpt88-changelog-source" code={SOURCE} />

      <h2 id="latest">Latest updates</h2>
      <section className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.025] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">2026-08-27</div>
        <p className="mt-2 text-sm leading-6 text-ink-300">Recent documentation and platform improvements for AI delivery and developer recovery.</p>
        <ul className="mt-4 grid gap-3">
          {LATEST.map(([type, title, detail]) => (
            <li key={title} className="border-t border-white/5 pt-3">
              <div className="text-sm font-semibold text-ink-100">{type}: {title}</div>
              <p className="mt-1 text-sm leading-6 text-ink-300">{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <h2 id="history">History</h2>
      <div className="not-prose grid gap-4">
        {HISTORY.map(([date, summary]) => (
          <section key={date} className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{date}</div>
            <p className="mt-2 text-sm leading-6 text-ink-300">{summary}</p>
          </section>
        ))}
      </div>

      <h2 id="maintain">Maintenance rules</h2>
      <ul>
        <li>Record new features, important fixes, billing, model, payment, and deployment changes.</li>
        <li>Skip internal refactors, temporary commits, and formatting-only changes without user impact.</li>
        <li>Explain the user impact in plain language instead of pasting a commit message.</li>
        <li>Add links to the related guide or API page when a change has a dedicated reference.</li>
      </ul>
    </DocPage>
  )
}
