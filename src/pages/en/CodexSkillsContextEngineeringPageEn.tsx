import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

const CONFIG = [
  ['Permissions', 'Define which directories Codex may read or write and whether it may run commands.', 'Too broad can modify unrelated files; too narrow can block delivery.'],
  ['Project location', 'Work in the correct repository and project directory.', 'A wrong directory creates files and context in the wrong project.'],
  ['Effort', 'Use higher reasoning effort for planning, architecture, and debugging; lower effort for small edits.', 'Always-high is slow; always-low can miss important details.'],
]

export default function CodexSkillsContextEngineeringPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-skills-context-engineering"
      title="Codex Skills and Context Engineering"
      description="Make Codex more reliable by defining context, skills, permissions, task boundaries, worklogs, and verification loops before execution."
      headings={[
        { id: 'why-first', text: 'Why context engineering comes first', level: 2 },
        { id: 'entry-config', text: 'Entry configuration', level: 2 },
        { id: 'skills', text: 'The role of a Skill', level: 2 },
        { id: 'context-stack', text: 'Recommended context layers', level: 2 },
        { id: 'task-boundary', text: 'Writing task boundaries', level: 2 },
        { id: 'operating-loop', text: 'An executable operating loop', level: 2 },
        { id: 'mistakes', text: 'Common mistakes', level: 2 },
      ]}
    >
      <Callout tone="info" title="Prepare the execution system before asking for output">
        <p>
          Stable Codex work starts by defining context, skills, process, permissions, and task boundaries.
          The model then behaves more like a controlled executor than a random answer generator.
        </p>
      </Callout>

      <h2 id="why-first">Why context engineering comes first</h2>
      <p>
        A strong model cannot compensate for the wrong repository, missing acceptance criteria, unclear
        scope, or unrestricted permissions. Context engineering makes the working location, available
        evidence, expected artifact, and verification gate explicit before implementation begins.
      </p>

      <h2 id="entry-config">Entry configuration</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-ink-400">
            <tr><th className="px-4 py-3">Setting</th><th className="px-4 py-3">Recommendation</th><th className="px-4 py-3">Risk</th></tr>
          </thead>
          <tbody>{CONFIG.map(([name, recommendation, risk]) => (
            <tr key={name} className="border-t border-white/5 align-top">
              <td className="px-4 py-3 font-medium text-ink-100">{name}</td>
              <td className="px-4 py-3 text-ink-300">{recommendation}</td>
              <td className="px-4 py-3 text-ink-300">{risk}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 id="skills">The role of a Skill</h2>
      <p>
        A Skill extracts a repeatable way of working and turns it into a reusable entry point. It can hold
        code conventions, directory rules, output formats, domain checklists, and validation steps so a new
        session does not need to rediscover them.
      </p>
      <ul>
        <li>Without a Skill, every session repeats the same standards and context.</li>
        <li>With a Skill, best practices become an executable capability template.</li>
        <li>Separate research, frontend, writing, video, and release Skills keep task expectations clear.</li>
      </ul>

      <h2 id="context-stack">Recommended context layers</h2>
      <ol>
        <li><strong>Project context:</strong> product, current stage, and final deliverable.</li>
        <li><strong>Task context:</strong> what this turn handles and what it explicitly does not handle.</li>
        <li><strong>Rules context:</strong> code style, naming, document format, and verification requirements.</li>
        <li><strong>Execution memory:</strong> worklogs, notes, and intermediate artifacts for recovery.</li>
      </ol>

      <h2 id="task-boundary">Writing task boundaries</h2>
      <Callout tone="warn" title="Unclear scope causes context drift">
        <p>
          Asking one session to research, code, redesign, publish, write SEO, and process media without
          priorities or output contracts makes the context expand until no result is clearly owned.
        </p>
      </Callout>
      <ul>
        <li><strong>Goal:</strong> one concrete result, such as completing five guides and wiring their routes.</li>
        <li><strong>Inputs:</strong> named files, screenshots, notes, links, and existing evidence.</li>
        <li><strong>Forbidden actions:</strong> no unrelated deletion, skipped checks, or broad refactors.</li>
        <li><strong>Output:</strong> code, docs, screenshots, build results, or a commit, not a generic summary.</li>
      </ul>

      <h2 id="operating-loop">An executable operating loop</h2>
      <ol>
        <li>Build the smallest context package that contains the evidence needed for the current task.</li>
        <li>Attach the Skill that matches the task instead of one oversized instruction.</li>
        <li>Write a worklog with completed steps, remaining work, and failure points.</li>
        <li>Verify the result through builds, assets, previews, routes, simulators, tests, or final artifacts.</li>
      </ol>

      <h2 id="mistakes">Common mistakes</h2>
      <p>
        Most instability comes from missing system design rather than a weak model: no Skill, no boundary,
        no worklog, and no verification. The fix is to make those four parts explicit and reusable.
      </p>
    </DocPage>
  )
}
