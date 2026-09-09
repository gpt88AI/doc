import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

export default function AgentJobMapPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-job-map"
      title="AI Agent job map: turn job descriptions into a skills plan"
      description="Break down Agent, LLM application, RAG, MCP and AI product roles into an actionable learning map and portfolio plan."
      headings={[
        { id: 'scope', text: 'How to read an Agent job description', level: 2 },
        { id: 'roles', text: 'Role map', level: 2 },
        { id: 'matrix', text: 'Capability matrix', level: 2 },
        { id: 'seniority', text: 'Expectations by seniority', level: 2 },
        { id: 'keywords', text: 'Infer the work from keywords', level: 2 },
        { id: 'resume', text: 'Resume and portfolio evidence', level: 2 },
        { id: 'check', text: 'Role-fit checklist', level: 2 },
      ]}
    >
      <Callout tone="info" title="Job samples change; deliverables are more stable than titles">
        <p>Recruiting information varies by city, account state, date and hiring plan. This guide extracts recurring responsibilities and evidence requirements rather than claiming a live count of openings.</p>
      </Callout>
      <h2 id="scope">How to read an Agent job description</h2>
      <p>Convert every keyword into three questions: what business result will you deliver, which layer owns the work, and what evidence proves that you have done it?</p>
      <ul>
        <li>“Agent planning and tool calling” implies state, contracts, loops and failure branches.</li>
        <li>“Enterprise knowledge base and RAG” implies parsing, retrieval, reranking, citations and updates.</li>
        <li>“LLM application delivery” implies business APIs, permissions, monitoring and cost.</li>
        <li>“Agent platform” implies orchestration, models, tools, tenants, capacity and governance.</li>
      </ul>
      <h2 id="roles">Role map</h2>
      <ul>
        <li><strong>Agent application:</strong> a business assistant with APIs, prompts, tools and RAG.</li>
        <li><strong>RAG / knowledge engineering:</strong> searchable, citable and updateable enterprise knowledge.</li>
        <li><strong>Agent platform:</strong> workflows, tools, model routing, tenancy and observability.</li>
        <li><strong>Model application / algorithm:</strong> adaptation, inference, fine-tuning and evaluation.</li>
        <li><strong>AI product:</strong> scenarios, metrics, experience, evaluation and business value.</li>
        <li><strong>Quality / evaluation:</strong> datasets, scorers, regression and human review.</li>
        <li><strong>Solutions / delivery:</strong> customer modeling, integration, deployment and operations.</li>
      </ul>
      <h2 id="matrix">Capability matrix</h2>
      <ul>
        <li><strong>Model:</strong> prompts, structured output, context and routing.</li>
        <li><strong>Capability:</strong> RAG, tools, memory, MCP and skills.</li>
        <li><strong>Orchestration:</strong> state machines, branches, loops, parallelism and approval.</li>
        <li><strong>Engineering:</strong> auth, rate limits, timeouts, retries, idempotency and monitoring.</li>
        <li><strong>Business:</strong> success rate, efficiency, cost and risk.</li>
      </ul>
      <h2 id="seniority">Expectations by seniority</h2>
      <ul>
        <li><strong>Junior:</strong> connect models, build basic knowledge Q&A, wrap tools and produce structured output.</li>
        <li><strong>Mid-level:</strong> make the chain stable with state, concurrency, retries, evaluation, cost and permissions.</li>
        <li><strong>Senior:</strong> define boundaries between model and code, and design multi-tenant, multi-model, rollout and governance capabilities.</li>
      </ul>
      <h2 id="keywords">Infer the work from keywords</h2>
      <ul>
        <li>LangGraph + state machine + workflow: prepare checkpoints, transitions and recovery.</li>
        <li>RAG + vector database + rerank: prepare Recall@K, MRR, citation accuracy and Badcases.</li>
        <li>MCP + tools + permissions: explain discovery, authentication, isolation and audit.</li>
        <li>Inference engine + quantization + GPU: prepare throughput, memory and degradation strategy.</li>
        <li>Agent evaluation + Trace + quality: show how a non-deterministic system becomes measurable.</li>
      </ul>
      <h2 id="resume">Resume and portfolio evidence</h2>
      <p>Do not write only “built an Agent with LangChain.” Explain the scenario, architecture, action loop, metrics, constraints and result.</p>
      <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'Scenario: who had which task\nArchitecture: model + RAG + tools + orchestration + storage\nActions: how the agent planned, called and verified\nMetrics: success, latency, cost and human handoff\nConstraints: permissions, sensitive data, failures and rollback\nResult: reproducible tests or production evidence'}</code></pre>
      <h2 id="check">Role-fit checklist</h2>
      <ul>
        <li>I can state the business result the role delivers.</li>
        <li>I can draw model, state, tools, data and permission boundaries.</li>
        <li>I have an RAG or tool-calling project with an evaluation method.</li>
        <li>I can explain a failure, not only show a success screenshot.</li>
        <li>I can classify a role as application, platform, algorithm, product or delivery.</li>
        <li>I can describe a project as problem, solution, metrics and retrospective.</li>
      </ul>
      <p>Continue with <Link to="/docs/guides/agent-foundations/">Agent foundations and architecture</Link>.</p>
    </DocPage>
  )
}
