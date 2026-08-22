import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const SOURCE_POST = 'https://x.com/Gorden_Sun/status/2071484947391823966'
const SOURCE_ARTICLE = 'https://x.com/i/article/2071483468069117953'

const WORKSPACE_FILES = `workspace/
├── AGENTS.md          # Workspace overview: goals, entry points, and global boundaries
├── context.md         # Role, responsibilities, project background, tools, and collaborators
├── preferences.md     # Writing style, approval habits, and output preferences
├── rules.md           # Red lines, permissions, confidentiality, and must-approve actions
├── sources/           # Common links, source materials, and data-source notes
├── workflows/         # Verified workflows and prompt recipes
└── checklists/        # Acceptance criteria, common mistakes, and pre-release checks`

const WORKSPACE_PROMPT = `I want to create a Codex workspace.
Please ask me one question at a time to learn my role, responsibilities, current project,
repeated tasks, common tools, collaborators, deliverables, work preferences, and actions
I am not allowed to let you decide on your own.

After you finish, show me the folder structure and explain the purpose of each file.
Do not modify existing files, connect external services, or send any messages until I confirm.`

const TASK_PROMPT = `Task: turn this week’s customer feedback into a product-improvement brief.

Inputs:
- Local notes under sources/feedback/
- Confirmed customer-support exports
- Product rules and terminology

Output requirements:
- Group by problem type, impact scope, frequency, and suggested actions
- Tag each fact with its source file and date
- Separate raw facts, inferences, and recommendations
- Output a Markdown brief and list 3 questions that still need human confirmation

Before you start, tell me what sources you will read, what may be missing, and how you plan to verify facts.
Any sending, deleting, publishing, or modifying of formal materials must be approved first.`

const AUTOMATION_SCHEMA = `Workflow name:
Trigger frequency:
Input sources:
Final output:
Actions that can be automated:
Actions that must be approved by a human:
Acceptance criteria:
Result storage location:
How to stop or retry on failure:
When to update or disable:`

const REVIEW_PROMPT = `Review the last task and answer only these questions:
1. What key assumptions did you make?
2. Which decision was hardest, and what alternatives did you consider?
3. Which facts are still unconfirmed by the source material?
4. Did you modify anything outside the task scope?
5. Which steps should become rules, checklists, skills, or automation?`

const SEVEN_DAY_PLAN = `Day 1: list the most repetitive, annoying, or information-heavy tasks from the week
Day 2: connect only two key sources and finish one small task
Day 3: create AGENTS.md, context.md, preferences.md, and rules.md
Day 4: complete one low-risk one-off task and review it manually
Day 5: try one multi-source task and ask for a plan before execution
Day 6: write the useful steps into workflows and acceptance checklists
Day 7: decide whether the task should become an automation or stay manual`

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-6 text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CodexKnowledgeWorkGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-knowledge-work"
      title="Codex for Office and Knowledge Work: From a Single Task to a Reusable System"
      description="An English guide to Codex knowledge work based on Gorden Sun’s X post: workspace files, a five-step workflow, task templates, review habits, and a seven-day onboarding plan."
      headings={[
        { id: 'source', text: 'Source and reading notes', level: 2 },
        { id: 'conclusion', text: 'Start with the conclusion', level: 2 },
        { id: 'audience', text: 'Who this is for and what success means', level: 2 },
        { id: 'concepts', text: 'Five core concepts', level: 2 },
        { id: 'five-step', text: 'The five-step workflow', level: 2 },
        { id: 'workspace', text: 'Set up the workspace first', level: 2 },
        { id: 'levels', text: 'Five usage levels', level: 2 },
        { id: 'shortest-path', text: 'Shortest success path: finish one brief', level: 2 },
        { id: 'workflow-catalog', text: 'Workflow selection table', level: 2 },
        { id: 'decision', text: 'When to automate vs. when to collaborate', level: 2 },
        { id: 'review', text: 'Checks, retrospectives, and reuse', level: 2 },
        { id: 'troubleshooting', text: 'Common failure modes and recovery', level: 2 },
        { id: 'collaboration', text: 'Team collaboration and adoption', level: 2 },
        { id: 'seven-days', text: 'Seven-day onboarding plan', level: 2 },
        { id: 'templates', text: 'Reusable prompts and templates', level: 2 },
        { id: 'references', text: 'Source and evidence notes', level: 2 },
      ]}
    >
      <h2 id="source">Source and reading notes</h2>
      <p>
        This guide is based on Gorden Sun’s X post about using Codex for office and knowledge work. The
        original post focuses on how to make Codex useful in recurring work, not just in one-off chatting.
      </p>
      <p>
        The practical idea is simple: when a task starts repeating, move the stable parts into files,
        checklists, and workflows so the next session does not need to rebuild the same context from scratch.
      </p>

      <h2 id="conclusion">Start with the conclusion</h2>
      <Callout tone="info" title="The real goal">
        <p>
          Don’t aim for “let AI think for me.” Aim for Codex to take over source handling, repetitive
          organization, and verifiable execution steps so your own attention is left for judgment, taste,
          strategy, and final responsibility.
        </p>
      </Callout>

      <h2 id="audience">Who this is for and what success means</h2>
      <p>
        This approach fits people who do a lot of office work, content work, research work, or project work
        that involves repeated information gathering and synthesis. Success is not “the model sounds smart.”
        Success means the output can be checked, recovered, reused, and handed to the next person or next task.
      </p>

      <h2 id="concepts">Five core concepts</h2>
      <SimpleTable
        headers={['Concept', 'Meaning', 'Why it matters']}
        rows={[
          ['Workspace', 'A stable folder structure that stores rules, context, sources, and workflows.', 'It gives Codex a place to keep long-lived knowledge instead of hiding it in chat history.'],
          ['Context', 'Role, project background, preferences, collaborators, and red lines.', 'It tells Codex what “good” looks like for this workspace.'],
          ['Workflow', 'A repeatable sequence for a specific recurring task.', 'It turns ad hoc help into something you can run again.'],
          ['Checklist', 'A short list of verification and approval steps.', 'It prevents invisible mistakes from slipping through.'],
          ['Recovery', 'A way to resume after interruption or failure.', 'It keeps the system useful when the session, model, or network changes.'],
        ]}
      />

      <h2 id="five-step">The five-step workflow</h2>
      <SimpleTable
        headers={['Stage', 'Input', 'Action', 'Verification signal']}
        rows={[
          ['Connect tools', 'Local files, connectors, web pages, databases, or human-provided material.', 'Connect only the sources the task really needs, and keep the scope small.', 'Codex can point back to the original sources and explain the source range.'],
          ['Write rules', 'Role, preferences, terminology, privacy rules, approval boundaries, and output format.', 'Write them into AGENTS.md, context.md, preferences.md, rules.md, or a task file.', 'Codex can restate the role, scope, forbidden actions, and acceptance criteria.'],
          ['Do the work', 'One clear goal, one input set, and one deliverable definition.', 'Low-risk tasks can run directly; multi-step tasks should get a plan first.', 'The output lands in the intended location and does not exceed its permissions.'],
          ['Check', 'Acceptance criteria, source material, and the real usage environment.', 'Verify facts, numbers, format, permissions, and the final effect one by one.', 'Problems can be traced back to the source, and important claims are confirmable.'],
          ['Capture', 'What worked, what failed, feedback, and open questions.', 'Update rules, workflows, prompts, and checklists.', 'The next similar task needs less explanation and can reuse the previous path.'],
        ]}
      />

      <h2 id="workspace">Set up the workspace first</h2>
      <p>
        The workspace is not there to create a pile of config files. Its purpose is to give Codex stable
        background information and clear boundaries. At the beginning, keep it simple: one overview file, three
        core context files, one source folder, one workflow folder, and one checklist folder are enough.
      </p>
      <CodeBlock lang="text" filename="workspace-layout" code={WORKSPACE_FILES} />
      <SimpleTable
        headers={['File', 'What to write', 'What not to write']}
        rows={[
          ['AGENTS.md', 'What the workspace does, the main entry points, global rules, and verification commands.', 'Long background notes, stale records, and per-task temporary instructions.'],
          ['context.md', 'Your role, responsibilities, project, common tools, collaborators, and current priorities.', 'Passwords, API keys, or unredacted customer data.'],
          ['preferences.md', 'Tone, format, review habits, and what results should be flagged.', 'Preferences presented as immovable facts or universal security rules.'],
          ['rules.md', 'Actions that need approval, such as sending, publishing, deleting, transferring money, or editing official records.', 'Vague “do what you think is right” language.'],
        ]}
      />
      <p>Use the following prompt to let Codex interview you first and then create the initial structure:</p>
      <CodeBlock lang="text" filename="workspace-interview.txt" code={WORKSPACE_PROMPT} />

      <h2 id="levels">Five usage levels</h2>
      <p>
        The original article breaks maturity into steps of complexity, not a ranking of talent. In practice,
        the upgrade condition is whether the task is stable, checkable, and recoverable—not whether you used a
        more complex plugin.
      </p>
      <SimpleTable
        headers={['Level', 'Typical task', 'Upgrade condition']}
        rows={[
          ['1. One-off task', 'Meeting notes, source summaries, outlines, edits, and checklists.', 'You know how to describe the input, output, and acceptance criteria.'],
          ['2. Multi-source synthesis', 'Briefs that combine email, chat, documents, local files, and data.', 'Sources, time range, and metric definitions can be checked one by one.'],
          ['3. Scheduled runs', 'Daily reports, weekly reports, missed-message digests, recurring checks.', 'The flow repeats, risk is manageable, and the checklist is clear.'],
          ['4. Small tools', 'Scripts, dashboards, converters, internal apps, and data helpers.', 'You can explain the input, output, failure mode, and human review point.'],
          ['5. A system that improves over time', 'Rules, templates, skills, automation, and feedback loops.', 'Each run reduces future explanation cost or error rate.'],
        ]}
      />
      <Callout tone="tip" title="Start by getting one low-risk task right">
        <p>
          Don’t jump into automation just because you have many tools connected. Finish one one-off task first,
          make sure the sources, output, checks, and recovery all work, and then increase the complexity.
        </p>
      </Callout>

      <h2 id="shortest-path">Shortest success path: finish one brief</h2>
      <p>Use “summarize customer feedback” as the practice task. It has real value, but it can still stop before sending, publishing, or deleting anything.</p>
      <ol>
        <li><strong>Prepare the input:</strong> pick two confirmed meeting notes or export files, place them in <code>sources/feedback/</code>, and label the date and origin.</li>
        <li><strong>Define the output:</strong> ask for a Markdown brief with problem categories, impact scope, frequency, suggested actions, and unresolved questions.</li>
        <li><strong>Ask for a plan first:</strong> make Codex explain which files it will read, what may be missing, and how it will separate facts from recommendations.</li>
        <li><strong>Execute and write to disk:</strong> tell it to save the result into <code>workflows/feedback-brief-YYYY-MM-DD.md</code> instead of only returning text in chat.</li>
        <li><strong>Check the sources:</strong> randomly verify at least three conclusions against the original files to make sure the meaning and dates are correct.</li>
        <li><strong>Run a real review:</strong> ask a product or business colleague to read the brief and confirm that the categories and suggestions are actually useful.</li>
        <li><strong>Capture the lesson:</strong> record the most common mistakes in <code>checklists/feedback-brief.md</code> and decide whether the workflow is worth reusing.</li>
      </ol>
      <CodeBlock lang="text" filename="first-real-task.txt" code={TASK_PROMPT} />
      <p>
        The success signal is simple: another person can read the brief, important conclusions can be traced
        back to the source, unconfirmed content is clearly labeled, and nothing was auto-sent or modified in a
        formal system.
      </p>

      <h2 id="workflow-catalog">Workflow selection table</h2>
      <p>
        The original article lists 16 starting workflows. Here they are regrouped by risk and by input/output
        shape so you can choose the first one without building everything at once.
      </p>
      <SimpleTable
        headers={['Category', 'Example workflow', 'Smallest output', 'First human check']}
        rows={[
          ['Messages and writing', 'Inbox zero, missed-message summaries, drafting while reviewing, source note cleanup.', 'A classification table, reply draft, edit suggestions, or a source library.', 'Check recipient, tone, facts, and whether anything would be sent without permission.'],
          ['Research and reports', 'Research brief, launch plan, weekly KPI report, strategy / OKR planning.', 'Source list, summary, comparison table, plan draft.', 'Re-check key numbers, date range, source, and opposing views.'],
          ['Support and operations', 'Customer issue summaries, candidate shortlists, release notes.', 'Issue categories, candidate shortlist, business-facing change summary.', 'Check for bias, sensitive data, recommendation rationale, and whether specialist review is needed.'],
          ['Tools and content', 'Text-to-audio, personal learning tools, idea library, shared boards.', 'An audio file, small tool, structured library, or shared page.', 'Check permissions, accessibility, storage location, and maintenance responsibility.'],
          ['Content maintenance', 'Content update review, public-page checks, knowledge-base resource audits.', 'A proposed edit queue, evidence links, and a publishing checklist.', 'Only allow human-approved edits and publishing.'],
        ]}
      />
      <p>
        When choosing the first one, try to satisfy three conditions: the input already exists, the output is
        easy to check, and failure will not cause irreversible damage. Email auto-send, formal data edits,
        candidate filtering, and public publishing should stay in “draft” or “suggestion” mode at first.
      </p>

      <h2 id="decision">When to automate vs. when to collaborate</h2>
      <SimpleTable
        headers={['Question', 'Lean toward full automation', 'Lean toward human + Codex']}
        rows={[
          ['Is the process stable?', 'The steps are mostly the same every time and there is a clear checklist.', 'Every run needs a fresh judgment about the goal or strategy.'],
          ['Can the result be checked?', 'There is an objective format, source, or test criterion.', 'Quality depends mostly on taste or complex business judgment.'],
          ['How costly is failure?', 'A failed run can be regenerated or the draft can be deleted.', 'It could send the wrong message, edit the wrong official file, leak data, or cause financial impact.'],
          ['Is the input complete?', 'The sources are stable, permissions are clear, and the time range is known.', 'Key data is missing and the model would have to guess.'],
          ['Is repetition worth it?', 'The cycle is fixed and repetitive effort is high.', 'It happens only once and the setup cost is larger than the benefit.'],
        ]}
      />
      <p>
        A practical rule is this: if a checklist can define what “done” means, automation can grow gradually.
        If you still need to decide from scratch what should happen, keep the task collaborative. Automation is
        not about skipping judgment; it is about turning stable judgment into a workflow and leaving unstable
        judgment to people.
      </p>
      <p>Before you automate anything, fill out this template:</p>
      <CodeBlock lang="text" filename="automation-design.txt" code={AUTOMATION_SCHEMA} />

      <h2 id="review">Checks, retrospectives, and reuse</h2>
      <p>The original article keeps emphasizing “check it where the result is actually used.” Verification has at least three layers:</p>
      <ol>
        <li><strong>Fact layer:</strong> numbers, dates, names, and statuses.</li>
        <li><strong>Interpretation layer:</strong> what those facts imply.</li>
        <li><strong>Action layer:</strong> what should happen next.</li>
      </ol>
      <CodeBlock lang="text" filename="review-prompt.txt" code={REVIEW_PROMPT} />
      <p>
        The best practice is not to save a long transcript of the conversation. Save the source, the final
        artifact, the review notes, the acceptance criteria, and the reusable template or workflow.
      </p>

      <h2 id="troubleshooting">Common failure modes and recovery</h2>
      <SimpleTable
        headers={['Failure mode', 'What usually went wrong', 'How to recover']}
        rows={[
          ['The output looks polished but is wrong', 'The model summarized without checking the source.', 'Force a source trace, separate fact from inference, and re-run with a smaller input set.'],
          ['The workspace becomes messy', 'Rules, drafts, and temporary notes were mixed together.', 'Move stable material into workspace files and archive the rest.'],
          ['An automation is too fragile', 'The workflow depends on hidden human memory.', 'Turn the hidden steps into worklogs, templates, or checklists.'],
          ['People stop trusting the result', 'The workflow cannot explain where claims came from.', 'Show the original source, the transform step, and the final validation rule.'],
        ]}
      />
      <p>
        When something goes wrong, don’t immediately restart with a bigger prompt. Check the input sources,
        check the output contract, and verify whether the task should really be automated at all.
      </p>

      <h2 id="collaboration">Team collaboration and adoption</h2>
      <p>
        Good team docs should serve both humans and agents. Every automation or reusable workflow should have a
        clear owner, input source, output location, approval boundary, acceptance method, and disable condition.
      </p>

      <h2 id="seven-days">Seven-day onboarding plan</h2>
      <p>Do not try to build a complete agent system on day one. Move in the order of observe, connect, execute, reuse, and automate.</p>
      <CodeBlock lang="text" filename="seven-day-plan.txt" code={SEVEN_DAY_PLAN} />
      <SimpleTable
        headers={['Day', 'Action', 'Acceptance']}
        rows={[
          ['Day 1', 'List the week’s most repetitive, annoying, or information-heavy tasks.', 'You have 3 candidate tasks and you can name their risks and inputs.'],
          ['Day 2', 'Use only two key sources to finish one small task.', 'The output can be traced to source and at least one gap is recorded.'],
          ['Day 3', 'Create the core workspace files.', 'Codex can restate the role, project, preferences, and red lines.'],
          ['Day 4', 'Run one low-risk one-off task and review it manually.', 'The result, assumptions, mistakes, and manual edits are preserved.'],
          ['Day 5', 'Run one multi-source task and ask for a plan before execution.', 'Different sources are compared and conflicts / unknowns are marked.'],
          ['Day 6', 'Write the effective steps into workflows and checklists.', 'A similar future task no longer needs the full background rewritten.'],
          ['Day 7', 'Decide whether the task deserves a recurring automation or a small tool.', 'Only tasks that are repetitive, controlled, and checkable move forward.'],
        ]}
      />

      <h2 id="templates">Reusable prompts and templates</h2>
      <h3>Multi-source research</h3>
      <CodeBlock
        lang="text"
        filename="multi-source-research.txt"
        code={`I need a [deliverable].
Please use these sources: [source 1], [source 2], [source 3].
The output must include facts, source links, conflicts between sources, inferences, unresolved questions, and next-step suggestions.
Before you start, tell me what you will read, what may be missing, and how you plan to verify it.
Pause and ask for approval before any sending, publishing, deleting, or modifying of formal materials.`}
      />
      <h3>Workflow reuse</h3>
      <CodeBlock
        lang="text"
        filename="workflow-retro.txt"
        code={`Based on the task that was just completed, write a reusable workflow.
Please spell out: the use case, input, steps, output format, acceptance criteria, risks, human approval points,
recovery method, and the project file where this should be stored. Do not turn unverified guesses into rules.`}
      />
      <h3>Low-risk starter tasks</h3>
      <ul>
        <li>Turn scattered notes into a structured outline.</li>
        <li>Generate meeting notes and action items from confirmed materials.</li>
        <li>Diagnose the structure, facts, and tone of a draft before editing it step by step.</li>
        <li>Write a business-facing impact summary for a code change without replacing engineering review.</li>
        <li>Organize an idea library and check for duplicates without deleting rejected ideas automatically.</li>
      </ul>

      <h2 id="references">Source and evidence notes</h2>
      <Callout tone="info" title="Keep facts and recommendations separate">
        <p>
          The original article clearly provides a framework for office work with Codex, a five-step workflow,
          five usage levels, workflow examples, team-collaboration guidance, and a seven-day plan. This guide
          reorganizes and compresses that material, and adds explicit input / output / verification / recovery
          fields as a documentation recommendation rather than a verbatim quote.
        </p>
        <p>
          The original post does not provide a stable product spec for every feature. The availability of
          connectors, goals, plugins, site features, mobile access, and team behavior should be checked against
          the current Codex UI and official docs.
        </p>
      </Callout>
      <ul>
        <li>
          Source article: <a href={SOURCE_ARTICLE} target="_blank" rel="noreferrer">Codex for office and knowledge work</a>
        </li>
        <li>
          Original post: <a href={SOURCE_POST} target="_blank" rel="noreferrer">Gorden Sun on X</a>
        </li>
        <li>
          Related reading: <Link to="/docs/guides/codex-gpt55-system-overview/">Codex + GPT-5.5 workflow breakdown</Link>,{' '}
          <Link to="/docs/guides/codex-skills-context-engineering/">Codex Skills &amp; Context Engineering</Link>,{' '}
          <Link to="/docs/guides/codex-plugins-research-workflow/">Codex Plugins and Research Workflow</Link>
        </li>
      </ul>
      <Callout tone="tip" title="The final goal">
        <p>
          Don’t try to make AI think for you. Let Codex handle source handling, repetitive organization, and
          verifiable execution steps so you can spend your attention on judgment, taste, strategy, and final
          responsibility.
        </p>
      </Callout>
    </DocPage>
  )
}
