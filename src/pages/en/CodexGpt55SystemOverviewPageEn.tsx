import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { GuideScreenshot, MiniCardGrid, ReferenceVideo, SERIES_IMAGES, SimpleTable } from '../docs/guides/CodexGpt55SeriesShared'

export default function CodexGpt55SystemOverviewPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-gpt55-system-overview"
      title="Codex + GPT-5.5: A Practical System Overview"
      description="A source-bounded reconstruction of how Codex can become a reliable delivery system through context, skills, permissions, parallel work, and verification."
      headings={[
        { id: 'source', text: 'Source scope', level: 2 },
        { id: 'video-reference', text: 'Reference video', level: 2 },
        { id: 'core-idea', text: 'Core method', level: 2 },
        { id: 'system-map', text: 'System layers', level: 2 },
        { id: 'how-to-read', text: 'How to use this series', level: 2 },
        { id: 'next', text: 'Suggested reading order', level: 2 },
      ]}
    >
      <Callout tone="info" title="A reconstruction tutorial">
        <p>This series is based on visible interfaces, task descriptions, and outcomes in a public video. Unclear details are not presented as exact configuration.</p>
      </Callout>
      <h2 id="source">Source scope</h2>
      <p>The recurring themes are skills configuration, plugins, research tasks, automation, parallel work, and combining those capabilities into a durable development system.</p>
      <GuideScreenshot {...SERIES_IMAGES.researchChat} />
      <h2 id="video-reference">Reference video</h2>
      <p>The embedded video is the public source used for this series. Use it alongside the screenshots and chapter notes.</p>
      <ReferenceVideo />
      <h2 id="core-idea">Core method</h2>
      <p>This is not simply a prompt followed by an answer. First define the context, reusable skills, permissions, external tools, automation boundaries, and verification requirements; then let the model execute.</p>
      <MiniCardGrid items={[
        { title: 'Define the working method', body: 'Fix context, goals, permissions, project location, effort, and output format before execution.' },
        { title: 'Turn experience into skills', body: 'Capture repeated methods as reusable skills or templates instead of explaining them from scratch each time.' },
        { title: 'Run research and production together', body: 'Move research, implementation, validation, copy, assets, and delivery forward in parallel when they are independent.' },
        { title: 'Make results verifiable', body: 'A successful answer is not enough; builds, resources, documents, and final outputs must be checkable.' },
      ]} />
      <h2 id="system-map">System layers</h2>
      <SimpleTable headers={['Layer', 'Visible form', 'Purpose']} rows={[
        ['Context', 'Research conversations, project background, goals, and location', 'Reduce the problem space and establish the working environment.'],
        ['Capability', 'Skill management, creation, and reusable workflows', 'Turn experience and conventions into durable assets.'],
        ['Execution', 'Parallel tasks, worklogs, research, automation, and code changes', 'Advance multiple deliverables without manual turn-by-turn switching.'],
        ['Verification', 'Builds, resource fixes, simulator checks, and final artifacts', 'Ensure results are real and usable rather than merely plausible.'],
      ]} />
      <h2 id="how-to-read">How to use this series</h2>
      <p>Read the companion articles in this order: skills and context engineering, plugins and research workflows, parallel execution and automation, then project-factory delivery.</p>
      <Callout tone="tip" title="Suggested starting point"><p>If Codex repeatedly asks you to restate requirements, start with skills and context engineering. If you need to move several projects at once, start with parallel execution and automation.</p></Callout>
      <h2 id="next">Suggested reading order</h2>
      <p>Continue with <Link to="/docs/guides/codex-skills-context-engineering/">skills and context engineering</Link>, then use the previous and next links at the bottom of each page.</p>
    </DocPage>
  )
}
