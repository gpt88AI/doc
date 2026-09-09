import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

const DELIVERABLES = [
  ['Application delivery', 'iOS requirements, assets, icons, simulator builds, and result checks.'],
  ['Frontend delivery', 'Web forms, layouts, page structures, and interaction changes.'],
  ['Video delivery', 'Remotion scenes, captions, voice-over, music, and visual direction.'],
  ['Documentation and courses', 'Research reports, course structures, agent curricula, and knowledge bases.'],
  ['Business materials', 'Investor-deck storylines, value propositions, and presentation structure.'],
  ['The system itself', 'Skills and templates that make the workflow reusable on the next project.'],
]

const PIPELINE = [
  ['Input collection', 'Read public sources, project state, existing files, screenshots, and requirements.', 'Executable context package'],
  ['Capability assembly', 'Attach skills, select tools, and define boundaries and conventions.', 'Stable execution environment'],
  ['Parallel production', 'Advance research, development, design, video, and documentation together.', 'Several work products in progress'],
  ['Result verification', 'Run builds, screenshots, previews, simulator checks, route checks, SEO checks, and asset checks.', 'Confirmable final result'],
  ['Capability feedback', 'Capture useful methods in skills, templates, or the knowledge base.', 'A faster and more reliable next cycle'],
]

export default function CodexProjectFactoryDeliveryPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-project-factory-delivery"
      title="Turn Codex into a Project Factory"
      description="A delivery system for producing apps, websites, videos, decks, courses, and asset packages from one verified Codex environment."
      headings={[
        { id: 'factory', text: 'What a project factory means', level: 2 },
        { id: 'deliverables', text: 'Types of deliverables', level: 2 },
        { id: 'pipeline', text: 'The delivery pipeline', level: 2 },
        { id: 'quality', text: 'Quality control', level: 2 },
        { id: 'adopt', text: 'Adoption in a team', level: 2 },
      ]}
    >
      <Callout tone="info" title="A factory is a reusable delivery system, not a content spigot">
        <p>
          The goal is to let one context-aware system produce different finished artifacts while sharing
          the same capabilities, evidence, and verification standards.
        </p>
      </Callout>

      <h2 id="factory">What a project factory means</h2>
      <p>
        A project factory does not mean mass-producing low-quality output. It means that documents, web
        apps, mobile apps, videos, decks, courses, and asset packages can move through a common system of
        context collection, capability assembly, execution, verification, and reuse.
      </p>

      <h2 id="deliverables">Types of deliverables</h2>
      <div className="not-prose grid gap-4 md:grid-cols-2">
        {DELIVERABLES.map(([title, body]) => (
          <section key={title} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
            <h3 className="text-base font-semibold text-ink-50">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{body}</p>
          </section>
        ))}
      </div>

      <h2 id="pipeline">The delivery pipeline</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-ink-400">
            <tr><th className="px-4 py-3">Stage</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Output</th></tr>
          </thead>
          <tbody>
            {PIPELINE.map(([stage, action, output]) => (
              <tr key={stage} className="border-t border-white/5 align-top">
                <td className="px-4 py-3 font-medium text-ink-100">{stage}</td>
                <td className="px-4 py-3 text-ink-300">{action}</td>
                <td className="px-4 py-3 text-ink-300">{output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="quality">Quality control</h2>
      <p>
        Quality does not come from a cleverer prompt alone. Make builds, previews, resource checks,
        simulator runs, route audits, SEO checks, and final review formal production stages. Research is
        only useful when it can become a guide, deck, course, page, implementation checklist, or other
        deliverable.
      </p>
      <ul>
        <li>Capture repeatable methods as skills or templates.</li>
        <li>Keep evidence from each stage: diffs, tests, logs, screenshots, and benchmarks.</li>
        <li>Keep research close to implementation so notes do not become a dead-end archive.</li>
      </ul>

      <h2 id="adopt">Adoption in a team</h2>
      <Callout tone="tip" title="Start with one verifiable workflow">
        <p>
          Begin with a high-frequency task such as research-to-documentation or page-change-to-build-check.
          Stabilise it before adding parallel agents and automation.
        </p>
      </Callout>
      <ol>
        <li>Choose one fixed scenario and define its acceptance checks.</li>
        <li>Encode constraints, naming, output format, and verification in a skill.</li>
        <li>Add parallel production and automation only after the single workflow is reliable.</li>
      </ol>
      <p>
        The purpose is not to remove people from the process. It is to let people focus on judgement,
        trade-offs, and final acceptance instead of repeatedly moving context by hand.
      </p>
    </DocPage>
  )
}
