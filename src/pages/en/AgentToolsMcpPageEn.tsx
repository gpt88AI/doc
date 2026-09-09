import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const SCHEMA = `{
  "name": "get_order_status",
  "description": "Read an order visible to the current user",
  "parameters": {
    "type": "object",
    "properties": { "order_id": { "type": "string" } },
    "required": ["order_id"],
    "additionalProperties": false
  }
}`

export default function AgentToolsMcpPageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-tools-mcp"
      title="Tool calling, MCP and secure agent execution"
      description="Design tool contracts and control external actions with permissions, idempotency, approval and auditability."
      headings={[
        { id: 'contract', text: 'Tool contracts', level: 2 },
        { id: 'flow', text: 'Tool-calling flow', level: 2 },
        { id: 'implementation', text: 'Server-side implementation', level: 2 },
        { id: 'mcp', text: 'MCP concepts', level: 2 },
        { id: 'security', text: 'Permissions, security and approval', level: 2 },
        { id: 'failure', text: 'Failure recovery and idempotency', level: 2 },
        { id: 'check', text: 'Tool design checklist', level: 2 },
      ]}
    >
      <Callout tone="danger" title="The model proposes a tool call; it does not execute the tool">
        <p>Your application, server or controlled runtime is the executor. It must validate the tool name, arguments, identity, permissions and side effects independently.</p>
      </Callout>
      <h2 id="contract">Tool contracts</h2>
      <p>A good description says when a tool should be used, which arguments it accepts, what it returns and when it must not be called.</p>
      <CodeBlock lang="json" filename="tool-schema.json" code={SCHEMA} />
      <ul>
        <li>Use short, stable, verb-object names.</li>
        <li>Describe limits and side effects, not only the happy path.</li>
        <li>Require explicit fields and reject unknown arguments.</li>
        <li>Return stable success and error structures.</li>
        <li>Derive authorization from the server-side session.</li>
      </ul>
      <h2 id="flow">Tool-calling flow</h2>
      <p>The application declares tools, the model returns a name and arguments, the server validates and executes them, then returns a structured result for the model to continue or explain failure.</p>
      <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'Goal -> model selects tool -> server validates schema, identity and permissions -> tool executes -> server records result and trace -> model continues or delivers an answer'}</code></pre>
      <p>Independent read-only calls may run in parallel, but writes and shared state need ordering, concurrency limits and cancellation.</p>
      <h2 id="implementation">Server-side implementation</h2>
      <p>Treat model output as untrusted input. A minimum executor needs an allowlist, schema validation, authorization, timeout, normalized errors and tracing.</p>
      <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'async def execute_call(call, user):\n    if call.name not in ALLOWED_TOOLS:\n        return error("tool_not_allowed")\n    args = validate_schema(call.arguments)\n    authorize(user, call.name, args)\n    return await run_with_timeout(call.name, args, seconds=3)'}</code></pre>
      <p>Side-effecting tools need an idempotency key such as <code>user_id + operation + client_request_id</code> so retries cannot duplicate payment, orders, messages or deletion.</p>
      <h2 id="mcp">MCP concepts</h2>
      <ul>
        <li><strong>Host:</strong> the agent application that owns the session and security policy.</li>
        <li><strong>Client:</strong> the connection to a particular MCP server.</li>
        <li><strong>Server:</strong> exposes tools, resources or prompts for an external system.</li>
        <li><strong>Transport:</strong> carries protocol messages, commonly local STDIO or a remote HTTP-style transport.</li>
        <li><strong>Authorization:</strong> determines access and must never be delegated to the model.</li>
      </ul>
      <p>Function calling is usually a tool contract inside one model request. MCP adds cross-application discovery, connections, resources and server boundaries. An MCP server can be an adapter layer, but it still needs internal authentication.</p>
      <h2 id="security">Permissions, security and approval</h2>
      <ul>
        <li>Derive tenant identity from the session instead of trusting a model argument.</li>
        <li>Require confirmation or human approval for deletion, payment, notifications and other high-impact writes.</li>
        <li>Isolate web or document content from system instructions to reduce prompt injection risk.</li>
        <li>Minimize, redact, audit and expire sensitive data.</li>
        <li>Review third-party MCP servers, allowlist tools and lock versions.</li>
      </ul>
      <h2 id="failure">Failure recovery and idempotency</h2>
      <ul>
        <li>Schema errors: fix arguments or re-plan; do not blindly retry.</li>
        <li>Network timeouts: use bounded exponential backoff with the same idempotency key.</li>
        <li>Rate limits: honor retry guidance, queue or degrade.</li>
        <li>Permission failures: stop and request authorization.</li>
        <li>Business conflicts: reread state before deciding whether a retry is safe.</li>
      </ul>
      <h2 id="check">Tool design checklist</h2>
      <ul>
        <li>Clear name, description, schema and return structure.</li>
        <li>Server-enforced allowlist, permissions and tenant isolation.</li>
        <li>Idempotency, audit records and compensation for every side effect.</li>
        <li>Separate timeout and retry policies for model, tool and task.</li>
        <li>Structured human approval for high-risk actions.</li>
        <li>MCP servers, third-party APIs and document content treated as untrusted input.</li>
      </ul>
      <p>Continue with <Link to="/docs/guides/agent-production/">agent evaluation and productionization</Link>.</p>
    </DocPage>
  )
}
