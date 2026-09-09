import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const ERROR = "Error during compaction: API Error: 400 Input exceeds the model's context window."

const RECOVERY = `1. Stop adding logs, full files, or repeated copies of the same error
2. Check the working tree:
   git status --short
   git diff --stat
3. Open the session history:
   claude --resume
4. Choose an earlier point before the largest tool outputs appeared
5. Fork or branch from that point
6. Run /compact in the new session
7. Re-read the current files and continue the task`

const DIAGNOSIS = `/context

# If the branch is still too large:
/resume -> choose session -> Fork / Branch
/compact

# If the task boundary has changed:
/clear`

const HANDOFF = `Task: continue one concrete feature

Completed:
- files changed
- checks already passed

Current state:
- active work
- unresolved issue

Next:
- one to three highest-priority actions

Constraints:
- files not to touch
- required validation commands`

export default function ClaudeCodeCompactionErrorPageEn() {
  return (
    <DocPage
      path="/docs/guides/claude-code-compaction-error"
      title="Claude Code Compaction Error: Input Exceeds the Context Window"
      description="Why Claude Code /compact can fail with a 400 context-window error, how to fork from an earlier session point, and how to recover safely."
      headings={[
        { id: 'summary', text: 'Short answer', level: 2 },
        { id: 'error', text: 'What the error means', level: 2 },
        { id: 'why', text: 'Why /compact can fail', level: 2 },
        { id: 'recovery', text: 'Fast recovery', level: 2 },
        { id: 'fork-point', text: 'Choose an earlier fork point', level: 2 },
        { id: 'fallback', text: 'If the fork still fails', level: 2 },
        { id: 'prevention', text: 'Prevent another overflow', level: 2 },
        { id: 'faq', text: 'FAQ', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Do not keep retrying /compact in the same huge session">
        <p>
          Open the session history, choose an earlier point before the context grew, create a new fork or
          branch, and compact there. The important part is reducing the inherited history, not the word “fork”.
        </p>
      </Callout>

      <h2 id="summary">Short answer</h2>
      <p>
        The usual fix is not re-authentication or repeating the same request. Fork from an earlier, smaller
        point in the session, then run <code>/compact</code> in the new branch. A fork from the final message
        may still inherit nearly the entire oversized history.
      </p>

      <h2 id="error">What the error means</h2>
      <CodeBlock lang="text" filename="error" code={ERROR} />
      <p>
        The server rejected the request because its input exceeded the model&apos;s context window. This refers
        to the accumulated conversation, tool calls, file contents, patches, logs, or images, not to one line
        of code or an API key.
      </p>

      <h2 id="why">Why /compact can fail</h2>
      <p>
        Compaction still needs to send the history to the model before the model can create a shorter summary.
        If the input is already too large, the compaction request itself is rejected before summarisation starts.
      </p>

      <h2 id="recovery">Fast recovery</h2>
      <CodeBlock lang="shell" filename="recovery" code={RECOVERY} />
      <p>
        A session branch is not automatically a Git branch. Check the actual files and worktree with Git before
        assuming that code was reverted or discarded.
      </p>

      <h2 id="fork-point">Choose an earlier fork point</h2>
      <p>
        Good fork points include the moment after the task and file scope were confirmed, before the first large
        repository search, or immediately after a completed phase whose result was already verified. Avoid the
        final message if it contains long logs or repeated file contents.
      </p>

      <h2 id="fallback">If the fork still fails</h2>
      <CodeBlock lang="text" filename="diagnosis" code={DIAGNOSIS} />
      <ol>
        <li>Fork further back if the new branch still contains too much history.</li>
        <li>Use <code>/clear</code> when most of the old context is no longer needed.</li>
        <li>Inspect <code>/context</code> for oversized tool output, MCP results, logs, images, or repeated files.</li>
        <li>Check model routing and proxy context limits if a short new session fails too.</li>
        <li>Check Claude Code, proxy, and model configuration compatibility.</li>
      </ol>
      <p>
        <code>/clear</code> starts an empty context. Write a short handoff before using it:
      </p>
      <CodeBlock lang="text" filename="handoff" code={HANDOFF} />

      <h2 id="prevention">Prevent another overflow</h2>
      <ul>
        <li>Separate exploration, implementation, testing, and release into phases or sessions.</li>
        <li>Read file ranges and log summaries instead of repeatedly printing complete outputs.</li>
        <li>Compact while the session is still comfortably below the limit.</li>
        <li>Save decisions, completed checks, and next actions in a worklog.</li>
        <li>Limit tool and MCP output, expanding only the relevant fragment.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <h3>Is this usually an invalid API key?</h3>
      <p>No. Invalid credentials usually produce authentication errors. A 400 context error points to input size, though a proxy or model-routing mismatch should be checked if a fresh short session also fails.</p>
      <h3>Does restarting Claude Code fix it?</h3>
      <p>Restarting alone may not reduce saved session history. Resume the session and fork from an earlier point, or start a new session with a short handoff.</p>
      <h3>Does a fork delete the original session?</h3>
      <p>A normal fork preserves the original conversation. Verify code state with <code>git status</code> and the actual files.</p>
      <p>
        See the <Link to="/docs/integrations/dev/claude-code/">Claude Code integration guide</Link> for API and routing issues, or{' '}
        <Link to="/docs/guides/codex-tool-recovery/">Codex tool recovery</Link> for a different class of tool failure.
      </p>
    </DocPage>
  )
}
