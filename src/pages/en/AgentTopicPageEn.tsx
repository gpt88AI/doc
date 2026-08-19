import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const AGENT_LOOP = `User goal
   ↓
Read context → plan next step → call the model
                                      ↓
                            Need a tool? ── no ──→ return answer
                                  │ yes
                                  ↓
                         execute and record the tool
                                  ↓
                              continue loop
                                  ↓
                          verify and deliver`

const TOOL_CALL_REQUEST = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "YOUR_MODEL_ID",
    "messages": [
      {"role": "user", "content": "Check the current project release status"}
    ],
    "tools": [{
      "type": "function",
      "function": {
        "name": "get_project_status",
        "description": "Read the current environment, version, and release status",
        "parameters": {
          "type": "object",
          "properties": {},
          "additionalProperties": false
        }
      }
    }],
    "tool_choice": "auto"
  }'`

const AGENT_WRAPPER = `const state = {
  goal,
  messages: [{ role: "user", content: goal }],
  steps: [],
  maxSteps: 8,
}

while (state.steps.length < state.maxSteps) {
  const response = await callModel(state.messages, tools)
  const toolCalls = response.choices?.[0]?.message?.tool_calls ?? []

  if (toolCalls.length === 0) {
    return verifyAndDeliver(response.choices[0].message.content)
  }

  state.messages.push(response.choices[0].message)
  for (const call of toolCalls) {
    const args = JSON.parse(call.function.arguments || "{}")
    const result = await executeAllowedTool(call.function.name, args)
    state.steps.push({ call, result })
    state.messages.push({
      role: "tool",
      tool_call_id: call.id,
      content: JSON.stringify(result),
    })
  }
}

throw new Error("agent step limit reached")`

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>{headers.map(header => <th key={header} className="px-4 py-2.5 font-medium">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-white/5 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.012]' : ''}`}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CardGrid({
  items,
}: {
  items: { title: string; href: string; desc: string }[]
}) {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <Link
          key={item.href}
          to={item.href}
          className="tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
        >
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
          <span className="mt-4 text-sm font-medium text-violet-300">Open guide</span>
        </Link>
      ))}
    </div>
  )
}

export default function AgentTopicPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent"
      title="Agent topic: from the first API call to a recoverable workflow"
      description="A practical learning path for building agents with gpt88.cc: start with one verified request, then add tool calling, context, loops, permissions, observability, and production checks."
      headings={[
        { id: 'purpose', text: 'What this topic solves', level: 2 },
        { id: 'definition-of-done', text: 'Definition of done', level: 2 },
        { id: 'path', text: 'Recommended learning path', level: 2 },
        { id: 'concepts', text: 'Six core agent concepts', level: 2 },
        { id: 'shortest-path', text: 'Shortest success path: run one tool call', level: 2 },
        { id: 'tool-loop', text: 'What the application does after a tool call', level: 3 },
        { id: 'wrapper', text: 'Wrap calls in a recoverable loop', level: 2 },
        { id: 'decision', text: 'Choose an integration style', level: 2 },
        { id: 'tools', text: 'Choose a tool guide', level: 2 },
        { id: 'reliability', text: 'Observability, permissions, and recovery', level: 2 },
        { id: 'production', text: 'Production acceptance checklist', level: 2 },
        { id: 'troubleshooting', text: 'Troubleshooting order', level: 2 },
        { id: 'practice', text: 'Practice task', level: 2 },
        { id: 'next', text: 'Next reading', level: 2 },
      ]}
    >
      <Callout tone="info" title="Start with one small, verifiable task">
        <p>
          An agent is not just a longer prompt. A useful agent combines a goal, context, model, tools, an execution loop, permission boundaries, and verification. This topic follows those dependencies: get one verified result first, then add tools, automation, and production controls.
        </p>
      </Callout>

      <h2 id="purpose">What this topic solves</h2>
      <p>
        Many agent projects stop at one of three gaps: the API works but the model cannot use tools; tools work but there is no state, step limit, or permission boundary; or the task finishes but the team cannot explain, recover, or reuse the successful path.
      </p>
      <p>
        This topic connects GPT88 API references, model discovery, developer-tool integrations, and engineering guides into one route: quickstart, core concepts, developer API, tool integrations, observability, production, and troubleshooting.
      </p>
      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ['Quickstart', '/en/docs/quickstart/', 'Create a key and verify the first request.'],
          ['Core concepts', '#concepts', 'Understand context, tools, loops, state, and permissions.'],
          ['Developer API', '/en/docs/api/chat-completions/', 'Use tools, streaming, and multi-turn messages.'],
          ['Tool integrations', '/en/docs/integrations/', 'Connect Claude Code, Codex CLI, Cursor, Cline, or Dify.'],
          ['Observability', '/en/docs/guides/harness-inspector/', 'Trace intent, sessions, file activity, and delivery evidence.'],
          ['Production', '/en/docs/guides/complete-integration/', 'Cover keys, usage, retries, and release checks.'],
        ].map(([title, href, desc]) => (
          <a key={href} href={href} className="tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]">
            <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{desc}</p>
            <span className="mt-4 text-sm font-medium text-violet-300">Open topic section</span>
          </a>
        ))}
      </div>

      <h2 id="definition-of-done">Definition of done</h2>
      <p>You do not need to read every page. The minimum outcome is that you can:</p>
      <ul>
        <li>run a minimal request with an <code>API Key + Base URL + model ID</code>;</li>
        <li>declare a tool and inspect <code>tool_calls</code> in the response;</li>
        <li>execute an allowed function and return its result as a <code>role: tool</code> message;</li>
        <li>set step limits, timeouts, allowed actions, and human-approval boundaries;</li>
        <li>record request IDs, tool inputs, tool outputs, failures, and the final artifact;</li>
        <li>recover from 401, 404, 429, timeout, and tool-execution failures.</li>
      </ul>

      <h2 id="path">Recommended learning path</h2>
      <SimpleTable
        headers={['Stage', 'Capability', 'Start here']}
        rows={[
          ['1. Quickstart', 'Create a key, find a model, and make the first request', <Link key="quickstart" to="/en/docs/quickstart/">Quickstart</Link>],
          ['2. Concepts', 'Understand context, tools, loops, state, and permissions', <a key="concepts" href="#concepts">Core concepts below</a>],
          ['3. API', 'Build a loop with tools, streaming, and multi-turn messages', <Link key="api" to="/en/docs/api/chat-completions/">Chat Completions API</Link>],
          ['4. Integrations', 'Connect the same model capability to a CLI, IDE, or app', <Link key="integrations" to="/en/docs/integrations/">Integration guides</Link>],
          ['5. Observability', 'Inspect intent, sessions, file activity, tools, and delivery evidence', <Link key="harness" to="/en/docs/guides/harness-inspector/">Harness Inspector</Link>],
          ['6. Production', 'Manage keys, usage, recovery, releases, and reuse', <Link key="complete" to="/en/docs/guides/complete-integration/">Complete integration</Link>],
        ]}
      />

      <h2 id="concepts">Six core agent concepts</h2>
      <SimpleTable
        headers={['Concept', 'Question it answers', 'Minimum practice']}
        rows={[
          [<strong key="goal">Goal</strong>, 'What must be delivered?', 'Turn the natural-language request into an observable result and boundary.'],
          [<strong key="context">Context</strong>, 'Which facts may the agent use?', 'Provide only the files, messages, rules, and history needed for the task.'],
          [<strong key="model">Model</strong>, 'Who plans and generates the next step?', 'Use <Link to="/en/docs/api/list-models/">GET /v1/models</Link> to confirm availability for the current key.'],
          [<strong key="tools">Tools</strong>, 'Which external actions can be requested?', 'Document each tool, its JSON Schema, permission, and failure result.'],
          [<strong key="loop">Loop</strong>, 'Does the agent continue after a tool result?', 'Set a step limit, timeout, and explicit stop conditions.'],
          [<strong key="verify">Verify</strong>, 'How do we know it is done?', 'Use tests, diffs, structure checks, human approval, or an acceptance list.'],
        ]}
      />
      <CodeBlock lang="text" filename="agent-loop" code={AGENT_LOOP} />
      <p>
        The model proposes a tool call; your application or client executes it. Validate the tool name and arguments, decide whether the action is allowed, and return a structured result. A model request is not the same thing as an executed action.
      </p>

      <h2 id="shortest-path">Shortest success path: run one tool call</h2>
      <ol>
        <li><strong>Prepare input.</strong> Create an API key and use <Link to="/en/docs/api/list-models/">GET /v1/models</Link> to select a model visible to the account.</li>
        <li><strong>Run a normal request first.</strong> Follow <Link to="/en/docs/quickstart/">Quickstart</Link> and verify <code>choices[0].message</code>.</li>
        <li><strong>Declare one read-only tool.</strong> Start with project status, task status, or file listing. Do not open delete, publish, or payment actions first.</li>
        <li><strong>Inspect the tool call.</strong> Parse the tool name, call ID, and JSON arguments, then validate them against a local schema.</li>
        <li><strong>Execute and return.</strong> Execute an allowed function and append the result as a <code>role: tool</code> message in the same conversation.</li>
        <li><strong>Verify the final result.</strong> Check the tool result, conclusion, and output format instead of only checking that text was returned.</li>
      </ol>

      <h3 id="tool-loop">What the application does after a tool call</h3>
      <CodeBlock lang="bash" filename="tool-calling-request.sh" code={TOOL_CALL_REQUEST} />
      <Callout tone="tip" title="Start with read-only tools">
        <p>
          File reads, status queries, model listing, and test inspection are good first tools. File writes, shell commands, releases, external messages, permission changes, and payments need an allow-list, argument validation, preview, and human approval where appropriate.
        </p>
      </Callout>

      <h2 id="wrapper">Wrap calls in a recoverable loop</h2>
      <p>
        A prototype can handle one tool call manually. A real service needs an execution state that stores the goal, message history, tool calls, results, errors, timing, and final artifact.
      </p>
      <CodeBlock lang="javascript" filename="agent-loop.js" code={AGENT_WRAPPER} />
      <p>A production implementation should also add:</p>
      <ul>
        <li>parameter schema validation and a tool allow-list;</li>
        <li>timeouts, retries, exponential backoff, and idempotency keys;</li>
        <li>redaction, log retention, and an end-user identifier;</li>
        <li>step, cost, and resource budgets;</li>
        <li>pause-for-approval, safe rollback, and resume policies.</li>
      </ul>

      <h2 id="decision">Choose an integration style</h2>
      <SimpleTable
        headers={['Goal', 'Start with', 'Trade-off']}
        rows={[
          ['Validate the API', <Link key="curl" to="/en/docs/sdk/curl/">cURL</Link>, 'Fewest dependencies; ideal for the first request and health checks.'],
          ['Build your own agent service', <Link key="python" to="/en/docs/sdk/python/">Python SDK</Link>, 'Flexible for state, loops, retries, and tests; you own the executor.'],
          ['Integrate into a JavaScript app', <Link key="node" to="/en/docs/sdk/nodejs/">Node.js SDK</Link>, 'Good for services and queues; keep keys on the server.'],
          ['Use a coding agent', <Link key="codex" to="/en/docs/integrations/dev/codex-cli/">Codex CLI</Link>, 'Fastest path to files, commands, and verification; permissions matter.'],
          ['Work inside an IDE', <Link key="cursor" to="/en/docs/integrations/dev/cursor/">Cursor</Link>, 'Good for inspect-edit-run-review loops; preserve diffs and tests.'],
          ['Build a knowledge or business app', <Link key="dify" to="/en/docs/integrations/platforms/dify/">Dify</Link>, 'Useful for workflow orchestration; business-layer permissions remain yours.'],
        ]}
      />

      <h2 id="tools">Choose a tool guide</h2>
      <CardGrid items={[
        { title: 'Claude Code', href: '/en/docs/integrations/dev/claude-code/', desc: 'Terminal-based coding agent with project context and Claude-style routing.' },
        { title: 'Codex CLI', href: '/en/docs/integrations/dev/codex-cli/', desc: 'Command-line workflow for edits, tools, verification, and delivery.' },
        { title: 'Cursor / Cline', href: '/en/docs/integrations/dev/cursor/', desc: 'Inspect and modify code inside an editor while keeping a review loop.' },
        { title: 'Dify / AnythingLLM', href: '/en/docs/integrations/platforms/dify/', desc: 'Connect models to apps, workflows, knowledge bases, and team services.' },
      ]} />

      <h2 id="reliability">Observability, permissions, and recovery</h2>
      <p>
        Agent quality is not only the final answer. Track whether the agent followed the right path. A useful task record includes the goal, model, request ID, message summary, tool name, argument summary, result, error, approval point, and final artifact location.
      </p>
      <ul>
        <li><Link to="/en/docs/guides/harness-inspector/">Harness Inspector</Link>: connect intent, sessions, file activity, and commits into delivery evidence.</li>
        <li><Link to="/en/docs/guides/codex-tool-recovery/">Codex Tool Recovery</Link>: diagnose missing tools and recover from the smallest failed step.</li>
        <li><Link to="/en/docs/guides/loop-engineering-harness/">Loop Engineering</Link>: turn successful task paths into reusable execution loops.</li>
        <li><Link to="/en/docs/guides/codex-skills-context-engineering/">Skills and context engineering</Link>: combine rules, context, permissions, and work logs.</li>
      </ul>
      <Callout tone="warn" title="High-risk actions need boundaries">
        <p>
          Deletion, irreversible commands, releases, external messages, permission changes, and payment actions should not rely on model judgment alone. Use allow-lists, validation, previews, and human approval; pause when the action cannot be verified safely.
        </p>
      </Callout>

      <h2 id="production">Production acceptance checklist</h2>
      <CodeBlock lang="text" filename="agent-production-checklist.txt" code={`Identity and configuration
- Keep API keys in server-side environment variables or a secret manager
- Never print complete keys in logs, screenshots, prompts, or frontend code
- Verify the model ID, Base URL, and account visibility

Execution and reliability
- Validate tool names and arguments with an allow-list and schema
- Set step limits, timeouts, retries, and stop conditions
- Require approval for writes, releases, messages, and deletes
- Make tool execution idempotent or safely retryable

Observability and acceptance
- Record request_id, model, duration, tools, and error summaries
- Define structured acceptance criteria for the final result
- Resume failed tasks from the last safe state
- Save successful prompts, schemas, configurations, and checklists

Before scaling
- Test quality, duration, cost, and failure rate on a small sample
- Compose tools or batch tasks only after the path is stable
- Confirm current models, pricing, limits, and response details from live sources`} />

      <h2 id="troubleshooting">Troubleshooting order</h2>
      <SimpleTable
        headers={['Symptom', 'Check first', 'Next step']}
        rows={[
          ['401 / authentication', 'Authorization header, key validity, and environment variables', <Link key="auth" to="/en/docs/auth/">Auth & Billing</Link>],
          ['404 / model or path', 'Base URL, endpoint, model ID, and account visibility', <><Link key="models" to="/en/docs/api/list-models/">List models</Link>, then <Link key="errors" to="/en/docs/api/errors/">Error Codes</Link></>],
          ['429 / rate limit', 'Concurrency and whether retries are piling up', 'Reduce concurrency and add exponential backoff.'],
          ['Model does not call a tool', 'Tool description, schema, tool_choice, and model capability', 'Start with one read-only tool and a short prompt.'],
          ['Loop stops after the tool call', 'assistant tool_calls, tool_call_id, and role=tool message order', 'Compare with the function-calling API example.'],
          ['Task stalls or fails', 'Last successful step, tool timeout, context, and resource budget', <Link key="recovery" to="/en/docs/guides/codex-tool-recovery/">Recover from the smallest failed step</Link>],
        ]}
      />

      <h2 id="practice">Practice task</h2>
      <p>Build a read-only project-status agent:</p>
      <ol>
        <li>Declare <code>get_project_status</code>, returning environment, version, test status, and latest release result.</li>
        <li>Require the model to use the tool when the user asks for current status; it must not guess.</li>
        <li>Simulate a successful tool result and a timeout, then verify both responses.</li>
        <li>Write each step to JSONL or a database with call ID, arguments, result, and duration.</li>
        <li>Set a four-step limit and define when the agent pauses for human takeover.</li>
      </ol>
      <p>Acceptance criteria:</p>
      <ul>
        <li>Without a tool result, the agent says it cannot confirm instead of inventing a status;</li>
        <li>after a tool failure, the user gets an actionable next step;</li>
        <li>request IDs and tool call IDs can reconstruct the execution;</li>
        <li>the same checklist can regression-test a changed model or tool schema.</li>
      </ul>

      <h2 id="next">Next reading</h2>
      <ul>
        <li>First integration: <Link to="/en/docs/quickstart/">Quickstart</Link> → <Link to="/en/docs/api/list-models/">Models API</Link> → <Link to="/en/docs/api/chat-completions/">Chat Completions API</Link>.</li>
        <li>Use a mature tool: <Link to="/en/docs/integrations/">Integration guides</Link>, then open the Claude Code, Codex CLI, Cursor, Cline, or Dify guide.</li>
        <li>Build for production: <Link to="/en/docs/guides/complete-integration/">Complete integration</Link> → <Link to="/en/docs/guides/config-export/">Config export</Link> → <Link to="/en/docs/guides/harness-inspector/">Harness Inspector</Link>.</li>
        <li>Handle asynchronous media tasks: <Link to="/en/docs/guides/async-image-generation-guide/">Async image generation guide</Link>.</li>
      </ul>
    </DocPage>
  )
}
