import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

export default function AgentInterviewProjectPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-interview-project"
      title="AI Agent interview questions, practical project and 30-day plan"
      description="Prepare structured answers, a company knowledge-base and multi-tool Agent project, system design, coding and project deep dives."
      headings={[
        { id: 'answer', text: 'A framework for answering design questions', level: 2 },
        { id: 'questions', text: 'Common questions and answer points', level: 2 },
        { id: 'project', text: 'Practical project design', level: 2 },
        { id: 'walkthrough', text: 'Project walkthrough template', level: 2 },
        { id: 'coding', text: 'Live coding and troubleshooting', level: 2 },
        { id: 'plan', text: '30-day review plan', level: 2 },
        { id: 'acceptance', text: 'Final acceptance checklist', level: 2 },
      ]}
    >
      <Callout tone="tip" title="The interview tests bounded system design, not framework memorization">
        <p>Interviewers want to know whether you can put uncertain model behavior inside a measurable, recoverable and permission-aware business system.</p>
      </Callout>
      <h2 id="answer">A framework for answering design questions</h2>
      <ol>
        <li><strong>Define the goal:</strong> who is the user and what counts as success?</li>
        <li><strong>Set boundaries:</strong> what belongs to the model, code or a human?</li>
        <li><strong>Split the chain:</strong> input, retrieval, planning, tools, state and output.</li>
        <li><strong>Describe data:</strong> context, memory, business data, vector data and permissions.</li>
        <li><strong>Give metrics:</strong> success, accuracy, latency, cost and security.</li>
        <li><strong>Explain failure:</strong> timeouts, permissions, conflicts, loops and model errors.</li>
        <li><strong>Explain evolution:</strong> evaluation, canary, rollback and tenant expansion.</li>
      </ol>
      <h2 id="questions">Common questions and answer points</h2>
      <ul>
        <li><strong>What is an Agent?</strong> A model-centered task system that uses tools, state, memory, workflows and verification; the model proposes actions and the application authorizes and executes them.</li>
        <li><strong>How are Agent and RAG related?</strong> RAG retrieves external knowledge; an Agent is the larger execution system that may call RAG and business APIs.</li>
        <li><strong>When should you avoid an Agent?</strong> Use deterministic workflows for fixed, high-risk or strongly audited processes.</li>
        <li><strong>How do you debug wrong RAG answers?</strong> Inspect parsing, index freshness, Recall@K, candidate relevance, filtering, reranking, context assembly, prompt constraints and citations.</li>
        <li><strong>How do you prevent tool privilege escalation?</strong> Use allowlists, server-side schema and resource checks, least privilege, approval, idempotency and audit.</li>
        <li><strong>Should every failed tool call be retried?</strong> Classify the error: argument and permission errors usually stop; timeouts may retry within bounds; conflicts require rereading state.</li>
      </ul>
      <h2 id="project">Practical project design</h2>
      <p>Build a company knowledge assistant that uses RAG for policy questions, read-only tools for status checks and a write tool that requires human approval before submission.</p>
      <ul>
        <li>Entry: sign-in, tenant, session and request ID.</li>
        <li>Knowledge: parsing, chunking, embeddings, hybrid retrieval and reranking.</li>
        <li>Orchestration: intent, retrieval, tool routing, state and stop conditions.</li>
        <li>Tools: read/write separation, schema, permissions and idempotency.</li>
        <li>Memory: session summary, user preference and task state.</li>
        <li>Evaluation: dataset, automated scoring, human review and Badcases.</li>
        <li>Operations: Docker, logs, Trace, alerts, canary and rollback.</li>
      </ul>
      <h2 id="walkthrough">Project walkthrough template</h2>
      <ol>
        <li>Business problem, current cost and user scale.</li>
        <li>Target metrics such as success, first-token latency, handoff and unit cost.</li>
        <li>Why the design uses RAG, workflow, single-agent or multi-agent execution.</li>
        <li>Tool contracts, permissions, memory, recovery and evaluation.</li>
        <li>Before/after evidence and the most serious remaining boundary.</li>
      </ol>
      <p>Prepare one concrete failure story, such as an outdated policy being retrieved. Explain the diagnosis, version filter, index state and regression case rather than saying only “we improved the prompt.”</p>
      <h2 id="coding">Live coding and troubleshooting</h2>
      <ul>
        <li>Agent loop: messages, tool results, stop conditions, maximum steps and structured errors.</li>
        <li>Tool executor: allowlist, schema, timeout, retry, authorization and Trace.</li>
        <li>RAG retrieval: metadata filters, top-k, deduplication, ranking and source retention.</li>
        <li>Online timeout: split model, retrieval, tool, queue and downstream time with Trace.</li>
        <li>High concurrency: pools, queues, rate limits, caching, streaming, degradation and capacity.</li>
      </ul>
      <h2 id="plan">30-day review plan</h2>
      <ol>
        <li>Days 1-3: classify roles and JD keywords; produce a gap list.</li>
        <li>Days 4-7: build a minimal model API and structured-output demo.</li>
        <li>Days 8-12: implement an Agent loop, state and workflow diagram.</li>
        <li>Days 13-18: implement RAG ingestion, retrieval, citation and evaluation.</li>
        <li>Days 19-21: add tool permissions, idempotency and MCP study notes.</li>
        <li>Days 22-25: add Trace, metrics, automated evaluation and Badcase review.</li>
        <li>Days 26-28: design capacity, cost, production architecture and runbook.</li>
        <li>Days 29-30: rehearse a three-minute introduction, deep dive and live coding problem.</li>
      </ol>
      <h2 id="acceptance">Final acceptance checklist</h2>
      <ul>
        <li>I can define an Agent in sixty seconds and distinguish it from RAG and workflows.</li>
        <li>I can draw model, context, orchestration, tools, data, permissions and observability.</li>
        <li>I can explain RAG ingestion, retrieval, reranking, citations, updates and evaluation.</li>
        <li>I can implement and debug tool calling with timeout, permission, retry and idempotency.</li>
        <li>I can explain MCP Host, Client, Server, discovery and security boundaries.</li>
        <li>I have metrics for success, latency, cost and security.</li>
        <li>I can tell one failure story with diagnosis, fix, regression and release evidence.</li>
      </ul>
      <p>Review the series in order: <Link to="/docs/guides/agent-job-map/">job map</Link> → <Link to="/docs/guides/agent-foundations/">foundations</Link> → <Link to="/docs/guides/agent-rag/">RAG</Link> → <Link to="/docs/guides/agent-tools-mcp/">tools and MCP</Link> → <Link to="/docs/guides/agent-production/">production</Link>.</p>
    </DocPage>
  )
}
