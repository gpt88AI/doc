import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SYMPTOM = `Typical failure pattern:

1. File tools, write tools, or patch tools suddenly become unavailable
2. Codex still responds, but cannot actually write code
3. Planned implementation is interrupted mid-task
4. Repeating the request does not restore tool behavior
5. It looks like a model issue, but it usually is not`

const FIRST_CHECK = `First ask Codex to do one explicit check:

1. Confirm whether file tools are currently available
2. Repeat back the currently available tool set
3. If file tools are unavailable, stop planning new implementation details
4. Do not accept "verbal completion" as real code delivery
5. Once tools recover, restart implementation from step one`

const RECOVERY_PROMPT = `Codex, first check whether file tools are currently available in this session.

If file tools are available:
1. Restart the implementation from step 1
2. Do not skip edit steps
3. Do not assume earlier draft text was written to disk
4. Re-run editing, verification, and save steps

If file tools are unavailable:
1. Tell me exactly which tools are unavailable
2. Stop expanding the implementation plan
3. Wait for tool recovery, then restart from step 1

This is a toolchain-state problem, not a model-quality problem.`

const WORKFLOW = `Recommended recovery flow:

1. Confirm tool state first
2. If file tools are back, restart from the original edit path
3. If file tools are still broken, stop producing new implementation drafts
4. After tool recovery, do not continue from the broken midpoint
5. Restart editing, validation, and save steps from the beginning`

export default function CodexToolRecoveryPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-tool-recovery"
      title="Codex Tool Recovery Guide"
      description="When Codex suddenly cannot call file or edit tools and code stops landing in the repository, verify tool state first and then restart implementation from step one after recovery."
      headings={[
        { id: 'symptom', text: 'Failure pattern', level: 2 },
        { id: 'first-check', text: 'What to check first', level: 2 },
        { id: 'prompt', text: 'Prompt you can paste to Codex', level: 2 },
        { id: 'workflow', text: 'Recovery workflow', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Classify the problem correctly">
        <p>
          This is usually not a model capability problem. It is usually a toolchain-state problem: file tools,
          patch tools, edit tools, or session permissions have broken.
        </p>
      </Callout>

      <h2 id="symptom">Failure pattern</h2>
      <CodeBlock lang="text" filename="symptom" code={SYMPTOM} />

      <h2 id="first-check">What to check first</h2>
      <CodeBlock lang="text" filename="first-check" code={FIRST_CHECK} />

      <h2 id="prompt">Prompt you can paste to Codex</h2>
      <CodeBlock lang="text" filename="prompt" code={RECOVERY_PROMPT} />

      <h2 id="workflow">Recovery workflow</h2>
      <CodeBlock lang="text" filename="recovery-flow" code={WORKFLOW} />
      <ul>
        <li>Do not keep adding new requirements while tools are broken.</li>
        <li>Do not assume draft text equals a landed code change.</li>
        <li>Once file tools recover, rerun the full edit-and-verify flow from the start.</li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/guides/codex-plugins-oauth/', 'en')}>Codex Plugins OAuth Login</Link> if the issue is actually around login or plugin mode.</li>
        <li><Link to={localizePath('/docs/guides/codex-gpt-image-2-skill/', 'en')}>Codex gpt-image-2 Skill</Link> if you want Codex to generate real image files after tool recovery.</li>
      </ul>
    </DocPage>
  )
}
