import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const SHAPE = `{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded for model gpt-5.6-sol",
    "param": null,
    "request_id": "req_01HZX3..."
  }
}`

const ERROR_LIST = [
  ['400', 'invalid_request_error', 'Malformed request body or invalid field shape.'],
  ['401', 'invalid_api_key', 'Missing, revoked, or invalid API key.'],
  ['403', 'permission_denied', 'The current key cannot access the requested model or endpoint.'],
  ['404', 'model_not_found', 'Model ID does not exist or is not available to the key.'],
  ['408', 'request_timeout', 'The upstream response exceeded the gateway timeout window.'],
  ['429', 'rate_limit_exceeded', 'Rate limit was hit at account, key, or model level.'],
  ['429', 'insufficient_quota', 'Balance or quota is exhausted.'],
  ['500', 'internal_error', 'Gateway or upstream internal failure.'],
  ['502', 'upstream_error', 'Unexpected upstream provider response.'],
  ['503', 'service_unavailable', 'Upstream capacity is temporarily unavailable.'],
  ['504', 'gateway_timeout', 'Gateway timed out while waiting for upstream.'],
] as const

export default function ErrorsPageEn() {
  return (
    <DocPage
      path="/docs/api/errors"
      title="Error Codes"
      description="Stable HTTP status and business error code mappings used by gpt88.cc for client-side retry and troubleshooting logic."
      headings={[
        { id: 'shape', text: 'Error envelope', level: 2 },
        { id: 'codes', text: 'Common codes', level: 2 },
        { id: 'retry', text: 'Retry guidance', level: 2 },
      ]}
    >
      <h2 id="shape">Error envelope</h2>
      <CodeBlock lang="json" filename="error envelope" code={SHAPE} />

      <h2 id="codes">Common codes</h2>
      <div className="not-prose overflow-hidden rounded-lg border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">HTTP</th>
              <th className="px-4 py-2.5 font-medium">code</th>
              <th className="px-4 py-2.5 font-medium">meaning</th>
            </tr>
          </thead>
          <tbody>
            {ERROR_LIST.map((row, index) => (
              <tr key={`${row[0]}-${row[1]}`} className={`border-t border-white/5 ${index % 2 === 1 ? 'bg-white/[0.012]' : ''}`}>
                <td className="px-4 py-3 text-ink-100">{row[0]}</td>
                <td className="px-4 py-3"><code className="rounded bg-violet-500/10 px-1.5 py-0.5 text-violet-200">{row[1]}</code></td>
                <td className="px-4 py-3 text-ink-200">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="retry">Retry guidance</h2>
      <Callout tone="info" title="When to retry">
        <ul className="list-disc pl-5">
          <li>Retry 408, 429, 502, 503, and 504 with exponential backoff.</li>
          <li>Do not blindly retry 400, 401, 403, or 404 without changing the request or permissions.</li>
          <li>Always include <code>request_id</code> when reporting persistent failures.</li>
        </ul>
      </Callout>
    </DocPage>
  )
}
