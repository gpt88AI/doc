import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { localizePath } from '../../lib/locale'

function DocTable({
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
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={'border-t border-white/5 align-top' + (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ENDPOINTS = `Async image entry points
  Submit: POST https://img.gpt88.cc/v1/images/generations
  Poll:   GET  https://img.gpt88.cc/v1/images/generations/{task_id}
  Result: data[0].url or data[0].b64_json, depending on the response`

export default function AsyncImageGenerationNoticePageEn() {
  return (
    <DocPage
      path="/docs/guides/async-image-generation-notice/"
      title="Async Image Generation Support Notice"
      description="GPT88 now documents an asynchronous image-generation workflow: submit a task, persist its ID, poll the task, and download the final image without holding the original request open."
      headings={[
        { id: 'date', text: 'Release date', level: 2 },
        { id: 'what-changed', text: 'What changed', level: 2 },
        { id: 'entry-points', text: 'Entry points', level: 2 },
        { id: 'when', text: 'When to use async generation', level: 2 },
        { id: 'compatibility', text: 'Compatibility and response fields', level: 2 },
        { id: 'migration', text: 'Migration checklist', level: 2 },
        { id: 'notes', text: 'Important notes', level: 2 },
      ]}
    >
      <Callout tone="tip" title="Short version">
        <p>
          Async image generation is a three-step workflow: submit a request, poll the returned task ID, and fetch the
          completed image. Existing synchronous image requests remain available; use async mode when generation may
          take longer than your request timeout or when your application already has a task queue.
        </p>
      </Callout>

      <h2 id="date">Release date</h2>
      <p>Published on <strong>August 5, 2026</strong>. This notice describes the documented client workflow and keeps dynamic model limits, pricing, and exact response fields subject to the live API response.</p>

      <h2 id="what-changed">What changed</h2>
      <p>
        Image generation can now be integrated as a background task. Your server does not need to keep the original
        HTTP request open until the image is ready. Instead, it records the task ID and checks the task state later.
      </p>
      <DocTable
        headers={['Before', 'Async workflow', 'Why it matters']}
        rows={[
          ['Wait for the image in one request', 'Return after the task is accepted', 'Avoid gateway, proxy, and serverless timeout pressure.'],
          ['Treat every response as final image data', 'Handle accepted, processing, succeeded, and failed states', 'Prevent a task object from being mistaken for an image.'],
          ['Retry the whole request after a timeout', 'Resume polling when a task ID already exists', 'Reduce duplicate generations and accidental extra usage.'],
          ['Download immediately from the response', 'Download after the task reaches a terminal state', 'Keep result handling separate from task orchestration.'],
        ]}
      />

      <h2 id="entry-points">Entry points</h2>
      <CodeBlock lang="text" filename="async-image-endpoints" code={ENDPOINTS} />
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/generations" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/images/generations/{task_id}" />
      <p>
        The submit request uses the image-generation endpoint. The asynchronous option and task response shape can vary
        by model or rollout; the detailed guide shows a compatibility-first parser instead of assuming one fixed JSON
        envelope.
      </p>

      <h2 id="when">When to use async generation</h2>
      <DocTable
        headers={['Scenario', 'Recommendation', 'Trade-off']}
        rows={[
          ['One small preview and an interactive UI', 'Start with synchronous generation', 'Simpler, but the UI must handle a longer request.'],
          ['High-resolution cover, poster, or hero image', 'Prefer async generation', 'More state handling, but better timeout resilience.'],
          ['Batch image jobs', 'Use async generation plus a durable task table', 'You must manage concurrency, retries, and result retention.'],
          ['Editing with large reference uploads', 'Prefer async when the client timeout is short', 'The task may be accepted before the final asset is available.'],
          ['A worker queue or scheduled pipeline', 'Use async as the default boundary', 'Polling adds API calls and needs a clear stop policy.'],
        ]}
      />

      <h2 id="compatibility">Compatibility and response fields</h2>
      <p>
        The stable concept is the task lifecycle, not a single vendor-specific JSON shape. Your client should accept a
        task identifier from <code>task_id</code> or <code>id</code>, read status from the top level or a nested
        <code>data</code> object, and look for the final URL or base64 payload in the result object.
      </p>
      <CodeBlock
        lang="json"
        filename="lifecycle-shapes.json"
        code={String.raw`// Illustrative compatibility shapes. Check the live response for your model.
{ "task_id": "imgtask_123", "status": "queued" }
{ "data": { "task_id": "imgtask_123", "status": "processing", "progress": 42 } }
{ "data": { "task_id": "imgtask_123", "status": "succeeded", "result_url": "https://.../image.png" } }
{ "data": { "task_id": "imgtask_123", "status": "failed", "error": { "message": "..." } }}`}
      />
      <Callout tone="warn" title="Do not infer success from progress alone">
        <p>
          A progress value such as <code>100</code> or <code>100%</code> is not enough to prove that an image is
          downloadable. Treat a task as successful only when its status is terminal-success and a usable URL or image
          payload is present.
        </p>
      </Callout>

      <h2 id="migration">Migration checklist</h2>
      <ol>
        <li>Keep your existing synchronous call as the small-preview path.</li>
        <li>Add an async submit path and persist <code>task_id</code>, model, prompt hash, and submission time.</li>
        <li>Implement polling with a bounded interval and maximum duration.</li>
        <li>Handle success, failure, cancellation, timeout, HTTP errors, and malformed responses separately.</li>
        <li>Download or persist the image as soon as a result URL appears; do not treat a temporary URL as permanent storage.</li>
        <li>Compare actual usage in the console before increasing concurrency or batch size.</li>
      </ol>

      <h2 id="notes">Important notes</h2>
      <ul>
        <li>Keep API keys on your server or worker. Do not expose them in browser JavaScript or a public repository.</li>
        <li>If a submit request returns a task ID, do not blindly submit the same prompt again after a client-side timeout.</li>
        <li>If polling receives a temporary network or rate-limit error, back off and resume with the same task ID.</li>
        <li>Failed, retried, async, image, and video accounting can have different behavior. Verify usage details instead of assuming a refund.</li>
        <li>For the complete cURL, Node.js, Python, troubleshooting, and production checklist, read the <Link to={localizePath('/docs/guides/async-image-generation-guide/', 'en')}>Async Image Generation Guide</Link>.</li>
        <li>For synchronous image request fields, see the <Link to={localizePath('/docs/api/images/', 'en')}>Image Generation API reference</Link>.</li>
      </ul>
    </DocPage>
  )
}
