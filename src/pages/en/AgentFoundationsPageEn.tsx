import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const LOOP = `while not finished and steps < max_steps:
    decision = model(messages, tools, state)
    if decision requests a tool:
        validate(tool, arguments)
        result = execute(tool, arguments)
        state = reduce(state, result)
    else:
        return validate_and_deliver(decision.content)
raise StepLimitExceeded()`

export default function AgentFoundationsPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-foundations"
      title="AI Agent foundations, architecture and workflow design"
      description="Build a practical mental model of agents from models, context, tools, state, workflows and verification."
      headings={[
        { id: 'definition', text: 'What is an agent?', level: 2 },
        { id: 'architecture', text: 'Reference architecture', level: 2 },
        { id: 'loop', text: 'Execution loop and state machine', level: 2 },
        { id: 'patterns', text: 'ReAct, planning and workflows', level: 2 },
        { id: 'memory', text: 'Context and memory', level: 2 },
        { id: 'selection', text: 'Architecture selection rules', level: 2 },
        { id: 'practice', text: 'Minimum exercise', level: 2 },
      ]}
    >
      <Callout tone="tip" title="A strong interview definition">
        <p>An agent is a task-execution system with a model as its reasoning core, tools and external systems as action boundaries, state and workflow as control structure, and verification and permissions as safety constraints.</p>
      </Callout>
      <h2 id="definition">What is an agent?</h2>
      <p>A normal LLM call maps context to an answer. An agent places the model in a controlled loop: decide, call a tool, read the result, update state and stop only when a delivery condition is met.</p>
      <ul>
        <li>Conversation: one response for a question.</li>
        <li>RAG: retrieve context and generate an evidence-based answer.</li>
        <li>Workflow: code controls known nodes and branches.</li>
        <li>Single agent: dynamically selects restricted tools.</li>
        <li>Multi-agent: several specialized roles collaborate behind explicit boundaries.</li>
      </ul>
      <h2 id="architecture">Reference architecture</h2>
      <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'User/API -> session and auth -> orchestration and state -> model routing -> RAG/Memory/Tools/MCP -> business data -> trace, evaluation, cost and guardrails -> answer or approved action'}</code></pre>
      <p>Explain the architecture through the request lifecycle: identity, state, model decision, restricted tool execution, trace, output validation and business acceptance.</p>
      <h2 id="loop">Execution loop and state machine</h2>
      <CodeBlock code={LOOP} lang="pseudo" filename="agent-loop" />
      <p>Set explicit limits for steps, time, permissions and delivery. Persist task ID, current node, input summary, tool records, pending approvals and failure reason when a task must resume later.</p>
      <h2 id="patterns">ReAct, planning and workflows</h2>
      <ul>
        <li><strong>ReAct:</strong> flexible step-by-step action, but potentially expensive.</li>
        <li><strong>Plan and execute:</strong> easier to inspect for long tasks, but plans can become stale.</li>
        <li><strong>Supervisor:</strong> a central agent routes work to specialists, adding context complexity.</li>
        <li><strong>Fixed workflow:</strong> stable and auditable when the process or risk boundary is known.</li>
      </ul>
      <p>Do not add multi-agent complexity just to appear intelligent. Establish a measurable single-agent or workflow baseline first.</p>
      <h2 id="memory">Context and memory</h2>
      <ul>
        <li>Short-term context: messages, tool results and current constraints.</li>
        <li>Working memory: plan, intermediate variables and pending tasks.</li>
        <li>Long-term memory: stable preferences and facts with sources and timestamps.</li>
        <li>External knowledge: documents and business records entered through retrieval and permissions.</li>
      </ul>
      <p>Do not concatenate all history blindly. Keep required source text, summarize older context and re-check relevance and access when reading durable facts.</p>
      <h2 id="selection">Architecture selection rules</h2>
      <ul>
        <li>Fixed, approval-heavy process: deterministic workflow with a few LLM nodes.</li>
        <li>Enterprise knowledge: RAG with structured answers and citations.</li>
        <li>Dynamic but low-risk tools: one agent with restricted capabilities.</li>
        <li>Write, payment or deletion: deterministic code plus human approval.</li>
      </ul>
      <h2 id="practice">Minimum exercise</h2>
      <p>Build a project-status assistant with two read-only tools and explicit uncertainty handling.</p>
      <ul>
        <li>Validate tool arguments with JSON Schema.</li>
        <li>Set a four-step limit, a three-second tool timeout and a ten-second task timeout.</li>
        <li>Persist model requests, tool inputs, results and the final answer trace.</li>
        <li>Return structured errors instead of pretending a failed tool succeeded.</li>
        <li>Test success, missing permission, missing record, timeout and conflicting data.</li>
      </ul>
      <p>Continue with <Link to="/docs/guides/agent-rag/">RAG knowledge-base engineering</Link>.</p>
    </DocPage>
  )
}
