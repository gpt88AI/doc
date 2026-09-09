import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

export default function LoopEngineeringGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/loop-engineering-harness"
      title="What Is Loop Engineering? The Layer After the Harness"
      description="A practical explanation of Prompt, Context, Harness, and Loop, with a controlled workflow for turning agent execution into a verifiable recurring system."
      headings={[
        { id: 'source', text: 'Source and scope', level: 2 },
        { id: 'shift', text: 'From prompts to loops', level: 2 },
        { id: 'layers', text: 'Prompt, Context, Harness, Loop', level: 2 },
        { id: 'minimum-loop', text: 'Minimum viable loop', level: 2 },
        { id: 'design', text: 'Designing a controlled loop', level: 2 },
        { id: 'skills', text: 'Why Skills compound', level: 2 },
        { id: 'path', text: 'The correct adoption order', level: 2 },
        { id: 'risks', text: 'Real risks', level: 2 },
        { id: 'codex', text: 'Implications for Codex users', level: 2 },
      ]}
    >
      <Callout tone="info" title="A harness lets an agent work; a loop makes the work repeatable">
        <p>
          This page summarises a public article and keeps its claims source-bounded. The goal is to explain
          the operating model, not to present the article&apos;s benchmark or terminology as an official standard.
        </p>
      </Callout>

      <h2 id="source">Source and scope</h2>
      <p>
        The source was extracted from a public X article through its article data rather than guessed from a
        truncated web view. The article discusses how intensive AI users move from prompt design to context
        engineering, then to a harness, and finally to a loop that can schedule, verify, and accumulate work.
      </p>

      <h2 id="shift">From prompts to loops</h2>
      <p>
        A better prompt improves one execution. A harness gives an agent tools, permissions, files, and a
        working environment. A loop adds repeated scheduling, external state, checks, progress decisions, and
        a stop condition. The engineering problem therefore moves from wording one request to designing a system
        that can continue without silently drifting.
      </p>

      <h2 id="layers">Prompt, Context, Harness, Loop</h2>
      <ol>
        <li><strong>Prompt:</strong> the immediate instruction and expected response.</li>
        <li><strong>Context:</strong> the evidence, files, decisions, constraints, and current state.</li>
        <li><strong>Harness:</strong> tools, permissions, runtime, skills, and workflow boundaries.</li>
        <li><strong>Loop:</strong> triggers, external state, checkers, progress rules, retries, and stopping conditions.</li>
      </ol>
      <p>
        A loop sits above the harness because it decides when to run, what state to read, how to judge the result,
        and whether another iteration is justified.
      </p>

      <h2 id="minimum-loop">Minimum viable loop</h2>
      <ul>
        <li>A concrete goal and an observable completion condition.</li>
        <li>External state such as a worklog, database row, file, issue, or build artifact.</li>
        <li>A maker that changes the artifact and a checker that evaluates it.</li>
        <li>A bounded iteration count, budget, timeout, and no-progress detector.</li>
        <li>A stop path for success, failure, intervention, and repeated uncertainty.</li>
      </ul>

      <h2 id="design">Designing a controlled loop</h2>
      <ol>
        <li>Define the state machine before adding a scheduler.</li>
        <li>Make each iteration produce a small, inspectable artifact.</li>
        <li>Keep maker and checker responsibilities separate.</li>
        <li>Record decisions, evidence, errors, and next actions outside the chat context.</li>
        <li>Retry only when the failure is actionable; stop on repeated no-progress.</li>
        <li>Add triggers last, after completion and checking are reliable.</li>
      </ol>
      <p>
        A trigger without a checker, external state, and a stop condition only turns an unreliable one-shot task
        into an unreliable recurring task.
      </p>

      <h2 id="skills">Why Skills compound</h2>
      <p>
        Repeated directory rules, build order, SEO checks, image naming, and release steps should become Skills,
        scripts, or fixed workflows. That converts experience into a reusable capability instead of paying the
        explanation cost again in every session.
      </p>

      <h2 id="path">The correct adoption order</h2>
      <ol>
        <li>Stabilise one manual task with a clear acceptance check.</li>
        <li>Extract the repeatable instructions into a Skill or template.</li>
        <li>Write state and evidence to a durable worklog or artifact.</li>
        <li>Add an independent checker and recovery path.</li>
        <li>Only then add parallel work, scheduling, and automation.</li>
      </ol>

      <h2 id="risks">Real risks</h2>
      <ul>
        <li>The loop can retry forever.</li>
        <li>Each iteration can make context larger until noise overwhelms signal.</li>
        <li>A small first-round error can propagate through many later rounds.</li>
        <li>The checker can become decorative self-evaluation by the same maker.</li>
        <li>People may stop observing the system because it appears to be running.</li>
        <li>Repeated agent execution can cost more than the original code or content task.</li>
      </ul>

      <h2 id="codex">Implications for Codex users</h2>
      <Callout tone="tip" title="Put the loop around evidence, not around chat history">
        <p>
          Extract repeated practices into Skills, preserve progress in files or worklogs, and keep checkers
          independent from the maker. For a documentation site, checkers can include builds, route audits,
          screenshots, links, and SEO artifacts.
        </p>
      </Callout>
      <ul>
        <li><Link to="/docs/guides/codex-skills-context-engineering/">Codex Skills and context engineering</Link></li>
        <li><Link to="/docs/guides/codex-parallel-automation-workflow/">Codex parallel and automation workflow</Link></li>
        <li><Link to="/docs/guides/codex-tool-recovery/">Codex tool recovery</Link></li>
      </ul>
    </DocPage>
  )
}
