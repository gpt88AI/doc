import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'
import { localizePath, useLocale } from '../../lib/locale'

const SOURCE_URL = 'https://mp.weixin.qq.com/s/1IkDdhFhpJQy3a9ABDuMsQ'
const GITHUB_URL = 'https://github.com/QoderAI/better-harness'
const INSPECTOR_URL = 'https://qoderai.github.io/better-harness/inspector/'

export default function HarnessInspectorGuidePageEn() {
  const { locale } = useLocale()

  return (
    <DocPage
      path="/docs/guides/harness-inspector"
      title="Harness Inspector: making agent delivery observable, inspectable, and traceable"
      description="A structured summary of the Harness Inspector article: how to connect intent, agent sessions, file activity, and Git commits into an evidence-backed delivery chain."
      headings={[
        { id: 'source', text: 'Source and reading boundaries', level: 2 },
        { id: 'delivery-chain', text: 'From a session to a delivery chain', level: 2 },
        { id: 'views', text: 'Workbench, Trace, and Replay', level: 2 },
        { id: 'workbench', text: 'Workbench: intent, process, and output', level: 3 },
        { id: 'trace', text: 'Trace: reading a session as a work trajectory', level: 3 },
        { id: 'replay', text: 'Replay: reviewing events in order', level: 3 },
        { id: 'skill-capture', text: 'From delivery evidence to reusable Skills', level: 2 },
        { id: 'gpt88', text: 'Using the idea with GPT88 workflows', level: 2 },
        { id: 'limitations', text: 'Limitations and safe adoption', level: 2 },
      ]}
    >
      <Callout tone="info" title="Third-party article summary, not official Better Harness documentation">
        <p>
          This page summarizes Phodal&apos;s public article, “Harness Inspector：让 Agent 交付过程可观察、可检查、可追溯”, published on August 14, 2026.
          It restructures the article for GPT88 documentation readers; it does not replace the project&apos;s current README or host-specific installation guide.
        </p>
        <p>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">Open the original WeChat article</a>. Product names, commands, host support, and report behavior may change.
        </p>
      </Callout>

      <h2 id="source">Source and reading boundaries</h2>
      <p>
        The article discusses Better Harness and its Harness Inspector, a local read-only workspace for examining how an AI coding task moved from an initial intent to a code contribution. The central idea is broader than a session viewer: a session only shows part of the work, while delivery review needs evidence about why the task started, what the agent did, and what finally entered the repository.
      </p>
      <p>
        The current project overview is available in the <a href={GITHUB_URL} target="_blank" rel="noreferrer">Better Harness repository</a>. Use the repository as the source of truth for current adapters, installation commands, and supported output formats.
      </p>

      <h2 id="delivery-chain">From a session to a delivery chain</h2>
      <p>
        The article models an agent delivery as three connected but distinct layers:
      </p>
      <ul>
        <li><strong>Intent:</strong> the semantic starting point, such as a user story, Issue, specification, or architecture constraint.</li>
        <li><strong>Process:</strong> how the change actually happened, including the session, searches, file reads, tool calls, edits, and validation.</li>
        <li><strong>Output:</strong> what the engineering system retained as the result, with a Git commit serving as the clearest current anchor.</li>
      </ul>
      <p>
        Story, Session, and Commit are therefore not three interchangeable views of the same object. They are observable proxies for Intent, Process, and Output. A single story may span multiple sessions, and one session may produce multiple commits, so the relationship is better understood as an evidence graph than as a perfectly linear timeline.
      </p>
      <Callout tone="tip" title="Why the final diff is not enough">
        <p>
          A diff shows what changed, but not whether the agent understood the request, explored the right context, tested the change, or recovered from a failure. Connecting intent, process, and output makes those review questions explicit without pretending to recover hidden model reasoning.
        </p>
      </Callout>

      <h2 id="views">Workbench, Trace, and Replay</h2>
      <p>
        Harness Inspector uses three complementary views. Each answers a different question and preserves the boundary between observed evidence and inferred relationships.
      </p>

      <h3 id="workbench">Workbench: intent, process, and output</h3>
      <p>
        Workbench is the overall delivery view. It places the triggering request, the agent&apos;s session activity, file changes, and observed commits in one workspace so a reviewer can inspect the relationship between them.
      </p>
      <p>
        The important design choice is that weak relationships stay visible as candidates or unmapped evidence. Inspector does not silently invent a complete delivery path merely because several records happen to exist near one another.
      </p>

      <h3 id="trace">Trace: reading a session as a work trajectory</h3>
      <p>
        Trace expands one session into turns, user inputs, intermediate responses, tool calls, and file activity. A timeline connects events in time, repeated operations can be folded, and a reviewer can jump from a summary segment to the corresponding call.
      </p>
      <p>
        Trace does not reconstruct private model reasoning. It reorganizes recorded behavior into a readable trajectory so teams can inspect how the agent searched for context, changed files, and performed validation.
      </p>

      <h3 id="replay">Replay: reviewing events in order</h3>
      <p>
        Replay follows the retained events in sequence: user input, agent response, tool call, file activity, and commit. It helps reviewers see when a direction was formed and when modifications or checks happened.
      </p>
      <p>
        Replay is read-only. It does not rerun tools, restore a workspace, or continue the original session. If an event has no precise timestamp, the ordering can still be preserved without manufacturing timing information.
      </p>

      <h2 id="skill-capture">From delivery evidence to reusable Skills</h2>
      <p>
        The article&apos;s original question is how to identify reusable work patterns from agent sessions. Its answer is deliberately stricter than counting frequent tool calls. Repeated file reads may indicate missing context, and repeated failed commands may be noise rather than a useful engineering habit.
      </p>
      <p>
        A stronger Skill candidate is a work path that recurs on similar tasks and is supported by the final output and validation evidence: defining the change boundary, collecting the required context, editing, validating, and checking the result. The same path should then be tested in later deliveries to see whether it actually improves the workflow.
      </p>
      <ol>
        <li>Start with multiple comparable deliveries instead of one impressive session.</li>
        <li>Keep the task intent, evidence links, validation result, and final output together.</li>
        <li>Separate stable reusable steps from accidental retries, environment noise, and host-specific details.</li>
        <li>Validate the proposed Skill on a later task before treating it as a default workflow.</li>
      </ol>

      <h2 id="gpt88">Using the idea with GPT88 workflows</h2>
      <p>
        Harness Inspector is a separate open-source workflow tool, not a GPT88 product or a replacement for API logs. The same evidence model is useful when reviewing coding agents that call GPT88 through an OpenAI-compatible route.
      </p>
      <ul>
        <li>Use a stable task identifier in the issue, agent session, commit message, and evaluation record.</li>
        <li>Keep the exact model ID, route, prompt version, tool permissions, and validation commands in the delivery record.</li>
        <li>Review the final code and test output together with the session instead of judging the agent only by its final answer.</li>
        <li>Use the <Link to={localizePath('/docs/guides/gpt88-tutorial/', locale)}>GPT88 integration guide</Link> and <Link to={localizePath('/docs/api/list-models/', locale)}>model list API</Link> to confirm the active route and account access.</li>
      </ul>
      <CodeBlock
        lang="text"
        code="/better-harness analyze this project's AI coding workflow and generate an evidence-backed report"
      />
      <p>
        The command above is the current Qoder-style entry described by the project README. For host-specific installation and invocation, follow the current instructions in the <a href={GITHUB_URL} target="_blank" rel="noreferrer">Better Harness repository</a>.
      </p>

      <h2 id="limitations">Limitations and safe adoption</h2>
      <ul>
        <li>A linked Story, Session, and Commit do not prove that the agent made the correct decision; they make the evidence easier to inspect.</li>
        <li>Observed events are not the same as hidden reasoning. Reviewers should avoid reading intent into unrecorded model state.</li>
        <li>A read-only inspector does not replace code review, tests, CI, permissions, secrets management, or rollback procedures.</li>
        <li>Different coding hosts expose different session and tool evidence. Treat missing evidence as an explicit limitation, not as proof that an event did not happen.</li>
        <li>Do not turn one successful delivery into a universal Skill. Compare repeated tasks and measure quality, rework, time, and operational risk.</li>
      </ul>
      <Callout tone="warn" title="Evidence is not an automatic quality score">
        <p>
          A well-connected delivery chain shows what can be checked. It does not guarantee that the change is correct, secure, or production-ready. Keep human review and project-level acceptance criteria in the loop.
        </p>
        <p><a href={INSPECTOR_URL} target="_blank" rel="noreferrer">Open the public Harness Inspector sample</a> to see the read-only interaction model.</p>
      </Callout>
    </DocPage>
  )
}
