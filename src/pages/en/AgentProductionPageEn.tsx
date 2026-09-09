import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'

export default function AgentProductionPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-production"
      title="Agent evaluation, observability and productionization"
      description="Build a quality model, evaluation set, trace, cost and capacity model, then release agents with rollout, rollback and human takeover controls."
      headings={[
        { id: 'quality', text: 'Agent quality model', level: 2 },
        { id: 'dataset', text: 'Evaluation sets and metrics', level: 2 },
        { id: 'trace', text: 'Trace and observability', level: 2 },
        { id: 'performance', text: 'Latency, cost and capacity', level: 2 },
        { id: 'security', text: 'Security and human takeover', level: 2 },
        { id: 'release', text: 'Release and rollback', level: 2 },
        { id: 'runbook', text: 'Production checklist', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Production means recoverable and auditable behavior">
        <p>An agent is not production-ready because a demo succeeds. It must remain explainable, recoverable and auditable under changing inputs, failures, timeouts, permission issues and cost pressure.</p>
      </Callout>
      <h2 id="quality">Agent quality model</h2>
      <p>Measure more than answer accuracy. Failures can occur in retrieval, tool selection, argument generation, execution, state transitions or final presentation.</p>
      <ul>
        <li>Model: structured-output pass rate and factual consistency.</li>
        <li>Retrieval: Recall@K, MRR and context precision.</li>
        <li>Tools: tool-selection accuracy and argument validation rate.</li>
        <li>Task: completion rate, step success rate and retries.</li>
        <li>System: P50/P95 latency, throughput, errors and availability.</li>
        <li>Business: time saved, conversion, satisfaction and human handoff.</li>
        <li>Security: blocked violations, false positives and leakage incidents.</li>
      </ul>
      <h2 id="dataset">Evaluation sets and metrics</h2>
      <p>Build the set from real tasks and production Badcases, not only ideal developer-written questions. Each case should define input, expected result, allowed tools, unacceptable behavior and scoring rules.</p>
      <ul>
        <li>Facts and multi-document synthesis.</li>
        <li>Tool calls with invalid arguments or unavailable permissions.</li>
        <li>No-answer cases that must refuse instead of inventing.</li>
        <li>Unauthorized requests, prompt injection and malicious documents.</li>
        <li>Timeouts, conflicting results and downstream failures.</li>
      </ul>
      <p>Combine automated checks for structure and rules, calibrated model grading for semantic quality, and human review for complex or high-risk cases.</p>
      <h2 id="trace">Trace and observability</h2>
      <p>Every task needs a searchable trace connecting request, model, retrieval, tools, state and delivery.</p>
      <ul>
        <li>Request ID, user, tenant, model and version.</li>
        <li>Input summary, prompt version and context sources.</li>
        <li>Each state, tool, argument, result, duration and error.</li>
        <li>Tokens, retries, cost estimate and approvals.</li>
        <li>Final answer, citations, task status and user feedback.</li>
      </ul>
      <h2 id="performance">Latency, cost and capacity</h2>
      <ul>
        <li>Route simple tasks to smaller models and escalate only when needed.</li>
        <li>Summarize and retrieve only relevant context.</li>
        <li>Parallelize independent read-only tools with concurrency limits.</li>
        <li>Cache embeddings, retrieval and stable queries with permission-aware invalidation.</li>
        <li>Use streaming for responsiveness, but never hide final failure.</li>
        <li>Define fallback models, degraded modes and human handoff.</li>
      </ul>
      <p>Capacity planning must include entry QPS, steps per request, model time, tool concurrency, context tokens, downstream limits and retry amplification.</p>
      <h2 id="security">Security and human takeover</h2>
      <ul>
        <li>Input layer: detect malicious or untrusted content.</li>
        <li>Pre-execution layer: check tool allowlists and permissions.</li>
        <li>Execution layer: limit resources, network and side effects.</li>
        <li>Output layer: check sensitive data and business format.</li>
        <li>Require structured confirmation for deletion, payment and outbound messages.</li>
        <li>Freeze repeated failures or loops and preserve the complete trace.</li>
      </ul>
      <h2 id="release">Release and rollback</h2>
      <p>Version the model, prompt, tool schema, retrieval index and evaluation set together. Regress offline first, then run a small canary while watching quality, cost, latency and security.</p>
      <p>Rollback must restore the associated prompt, routing, tool protocol and index version, not only application code. Side-effecting tasks also need compensation and human runbooks.</p>
      <h2 id="runbook">Production checklist</h2>
      <ul>
        <li>Offline evaluation includes Badcases, no-answer cases and attacks.</li>
        <li>Every request has a trace that identifies model, retrieval, tool and state failures.</li>
        <li>Step, timeout, retry, rate-limit, circuit-breaker, fallback and cancellation controls exist.</li>
        <li>High-risk tools have authorization, approval, idempotency, audit and compensation.</li>
        <li>Prompt, model, schema and index versions can be rolled back.</li>
        <li>Quality, cost, latency, errors, success and security events have alerts.</li>
      </ul>
      <p>Continue with <Link to="/docs/guides/agent-interview-project/">interview questions and the practical project</Link>.</p>
    </DocPage>
  )
}
