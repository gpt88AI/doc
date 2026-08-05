import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../components/ui/FieldTable'
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
            {headers.map(header => <th key={header} className="px-4 py-2.5 font-medium">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={'border-t border-white/5 align-top' + (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SUBMIT_CURL = String.raw`export GPT88_API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://img.gpt88.cc"

curl -sS -X POST "$BASE_URL/v1/images/generations" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "A premium ecommerce hero image of a glass skincare bottle on a white stone counter, soft morning light, clean luxury composition, no text, no watermark",
    "size": "1024x1024",
    "quality": "high",
    "n": 1,
    "async": true
  }' | tee create.json

# Accept task_id or id, including a nested data envelope.
TASK_ID=$(jq -r '.task_id // .id // .data.task_id // .data.id // empty' create.json)
test -n "$TASK_ID" || { echo "No task ID returned:"; cat create.json; exit 1; }
echo "created task: $TASK_ID"`

const POLL_CURL = String.raw`MAX_ATTEMPTS=60
INTERVAL_SECONDS=5

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  curl -sS "$BASE_URL/v1/images/generations/$TASK_ID" \
    -H "Authorization: Bearer $GPT88_API_KEY" > status.json

  STATUS=$(jq -r '.data.status // .status // .task.status // empty' status.json | tr '[:upper:]' '[:lower:]')
  echo "attempt=$attempt status=$STATUS"

  case "$STATUS" in
    succeeded|success|completed)
      RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
      if [ -n "$RESULT_URL" ]; then
        curl -L "$RESULT_URL" -o async-image.png
        echo "saved async-image.png"
        exit 0
      fi
      echo "Task succeeded but no URL was found; inspect status.json for b64_json or a model-specific result." >&2
      exit 2
      ;;
    failed|failure|cancelled|canceled)
      echo "Image task failed:" >&2
      cat status.json >&2
      exit 3
      ;;
  esac

  sleep "$INTERVAL_SECONDS"
done

echo "Polling timed out. Keep TASK_ID=$TASK_ID and resume later." >&2
exit 4`

const NODE_EXAMPLE = String.raw`const BASE_URL = "https://img.gpt88.cc";
const API_KEY = process.env.GPT88_API_KEY;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const first = (...values) => values.find(value => value !== undefined && value !== null && value !== "");

function taskIdOf(payload) {
  return first(payload.task_id, payload.id, payload.data?.task_id, payload.data?.id);
}

function statusOf(payload) {
  return String(first(payload.data?.status, payload.status, payload.task?.status, "")).toLowerCase();
}

function resultOf(payload) {
  return first(
    payload.data?.result_url,
    payload.result_url,
    payload.data?.result?.data?.[0]?.url,
    payload.result?.data?.[0]?.url,
    payload.data?.[0]?.url,
    payload.data?.result?.data?.[0]?.b64_json,
    payload.data?.[0]?.b64_json,
  );
}

async function generateAsyncImage(prompt) {
  const createResponse = await fetch(BASE_URL + "/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
      async: true,
    }),
  });

  const created = await createResponse.json();
  if (!createResponse.ok) throw new Error("Submit failed: " + JSON.stringify(created));

  const taskId = taskIdOf(created);
  if (!taskId) throw new Error("No task ID returned: " + JSON.stringify(created));

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    await sleep(5000);
    const pollResponse = await fetch(BASE_URL + "/v1/images/generations/" + encodeURIComponent(taskId), {
      headers: { Authorization: "Bearer " + API_KEY },
    });
    const payload = await pollResponse.json();
    if (!pollResponse.ok) throw new Error("Poll failed: " + JSON.stringify(payload));

    const status = statusOf(payload);
    if (["succeeded", "success", "completed"].includes(status)) {
      const result = resultOf(payload);
      if (!result) throw new Error("Task succeeded without a URL or base64 result");
      return { taskId, result, raw: payload };
    }
    if (["failed", "failure", "cancelled", "canceled"].includes(status)) {
      throw new Error("Image task failed: " + JSON.stringify(payload));
    }
  }

  throw new Error("Polling timed out. Resume later with task ID: " + taskId);
}

const output = await generateAsyncImage("A clean editorial product image of a silver desk lamp, warm side light, no text");
console.log(output);`

const PYTHON_EXAMPLE = String.raw`import base64
import os
import time
from pathlib import Path

import requests

BASE_URL = "https://img.gpt88.cc"
API_KEY = os.environ["GPT88_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

def first(*values):
    return next((value for value in values if value not in (None, "")), None)

def task_id_of(payload):
    data = payload.get("data") or {}
    return first(payload.get("task_id"), payload.get("id"), data.get("task_id"), data.get("id"))

def status_of(payload):
    data = payload.get("data") or {}
    task = payload.get("task") or {}
    return str(first(data.get("status"), payload.get("status"), task.get("status"), "")).lower()

def result_of(payload):
    data = payload.get("data") or {}
    result = data.get("result") or payload.get("result") or {}
    result_data = result.get("data") or data.get("data") or []
    first_item = result_data[0] if result_data else (data[0] if isinstance(data, list) and data else {})
    return first(data.get("result_url"), payload.get("result_url"), first_item.get("url"), first_item.get("b64_json"))

create = requests.post(
    BASE_URL + "/v1/images/generations",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={
        "model": "gpt-image-2",
        "prompt": "A premium ecommerce hero image of a glass skincare bottle, soft morning light, no text",
        "size": "1024x1024",
        "quality": "high",
        "n": 1,
        "async": True,
    },
    timeout=30,
)
create.raise_for_status()
created = create.json()
task_id = task_id_of(created)
if not task_id:
    raise RuntimeError(f"No task ID returned: {created}")

for _ in range(60):
    time.sleep(5)
    response = requests.get(
        BASE_URL + "/v1/images/generations/" + task_id,
        headers=HEADERS,
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    status = status_of(payload)
    if status in {"succeeded", "success", "completed"}:
        result = result_of(payload)
        if not result:
            raise RuntimeError(f"Task succeeded without an image result: {payload}")
        if result.startswith("http"):
            image = requests.get(result, timeout=60)
            image.raise_for_status()
            Path("async-image.png").write_bytes(image.content)
        else:
            Path("async-image.png").write_bytes(base64.b64decode(result))
        break
    if status in {"failed", "failure", "cancelled", "canceled"}:
        raise RuntimeError(f"Image task failed: {payload}")
else:
    raise TimeoutError(f"Polling timed out; keep task ID {task_id}")`

const TASK_RECORD = `{
  "task_id": "imgtask_123",
  "model": "gpt-image-2",
  "prompt_hash": "sha256:...",
  "status": "processing",
  "submitted_at": "2026-08-05T10:00:00Z",
  "last_polled_at": "2026-08-05T10:00:15Z",
  "attempts": 3,
  "result_url": null,
  "error": null
}`

const REQUEST_ROWS: FieldRow[] = [
  { name: 'model', type: 'string', required: true, description: <>Image model ID, such as <code>gpt-image-2</code>; confirm availability with the current model list or console.</> },
  { name: 'prompt', type: 'string', required: true, description: <>The image intent and constraints. Keep the prompt stable while diagnosing polling behavior.</> },
  { name: 'size', type: 'string', description: <>Use a size supported by the selected model. Start small while validating the workflow.</> },
  { name: 'quality', type: 'string', description: <>Quality preset supported by the selected model. Higher quality may take longer.</> },
  { name: 'n', type: 'integer', description: <>Number of images. Start with <code>1</code>; increase only after one task is reliable.</> },
  { name: 'async', type: 'boolean', description: <>The examples use <code>true</code> to request asynchronous task handling. If a model exposes a different async switch, follow its live contract.</> },
]

export default function AsyncImageGenerationGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/async-image-generation-guide/"
      title="Async Image Generation API Guide"
      description="A practical guide to submitting asynchronous image tasks, polling status, downloading results, handling failures, and scaling image-generation workers safely."
      headings={[
        { id: 'purpose', text: 'Purpose and definition of done', level: 2 },
        { id: 'concepts', text: 'Core concepts', level: 2 },
        { id: 'prerequisites', text: 'Prerequisites', level: 2 },
        { id: 'shortest-path', text: 'Shortest successful path', level: 2 },
        { id: 'submit', text: '1. Submit an image task', level: 2 },
        { id: 'poll', text: '2. Poll until a terminal state', level: 2 },
        { id: 'download', text: '3. Save the image result', level: 2 },
        { id: 'sdk', text: 'Node.js and Python clients', level: 2 },
        { id: 'decisions', text: 'Decision guide', level: 2 },
        { id: 'iteration', text: 'Iteration and evaluation loop', level: 2 },
        { id: 'production', text: 'Production task record', level: 2 },
        { id: 'troubleshooting', text: 'Troubleshooting and recovery', level: 2 },
        { id: 'practice', text: 'Practice task and checklist', level: 2 },
        { id: 'sources', text: 'Evidence and confidence notes', level: 2 },
      ]}
    >
      <Callout tone="info" title="What this guide teaches">
        <p>
          You will submit one asynchronous image task, get a task ID, poll it with a bounded loop, and save a usable
          PNG or result URL. Once that path works, the same lifecycle can be moved into a worker, queue, or batch job.
        </p>
      </Callout>

      <h2 id="purpose">Purpose and definition of done</h2>
      <p>
        This guide is for developers building a backend, CLI, scheduled job, or automation pipeline around the GPT88
        image API. It is not a prompt-writing course; it focuses on reliable task orchestration.
      </p>
      <p>You are done when all of the following are true:</p>
      <ul>
        <li>The submit response produces a task ID that your service persists.</li>
        <li>Polling can distinguish processing from success and failure.</li>
        <li>A successful task produces a downloaded file or a deliberately stored result URL.</li>
        <li>A timeout or transient error can resume with the same task ID without blindly generating again.</li>
        <li>Usage and failures can be audited later with the task ID and request metadata.</li>
      </ul>

      <h2 id="concepts">Core concepts</h2>
      <DocTable
        headers={['Term', 'Meaning', 'Implementation rule']}
        rows={[
          ['Submit', 'Send the image intent and generation parameters.', 'Persist the raw response and task ID before doing anything else.'],
          ['Task ID', 'The stable handle for later status queries.', 'Use task_id or id from the response; never synthesize one locally.'],
          ['Polling', 'Repeatedly query the task until it reaches a terminal state.', 'Use a bounded interval, maximum attempts, and backoff for transient errors.'],
          ['Terminal state', 'A final success, failure, or cancellation state.', 'Do not stop just because progress reaches 100.'],
          ['Result', 'The final image URL or base64 payload.', 'Download or decode immediately, then store your own durable copy.'],
          ['Task record', 'Your local persistence for orchestration and audit.', 'Store model, prompt hash, timestamps, attempts, status, and error.'],
        ]}
      />

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>A GPT88 API key with access to an image model.</li>
        <li>One of: cURL plus <code>jq</code>, Node.js 20+, or Python 3.10+ with <code>requests</code>.</li>
        <li>A writable local directory or object-storage target for the generated image.</li>
        <li>A known prompt and a small test size. Use one image first.</li>
      </ul>
      <Callout tone="warn" title="Check the live model contract first">
        <p>
          The examples use <code>POST https://img.gpt88.cc/v1/images/generations</code>, <code>async: true</code>, and
          <code>GET /v1/images/generations/{'{task_id}'}</code>. Model availability, supported fields, response envelopes,
          and result retention can change. If your active model rejects one field, keep the same lifecycle but follow the
          model-specific response and parameter contract shown by the console or live API.
        </p>
      </Callout>

      <h2 id="shortest-path">Shortest successful path</h2>
      <ol>
        <li>Set the API key and choose a small, single-image request.</li>
        <li>Submit with async mode and save the returned task ID.</li>
        <li>Poll every five seconds, up to a bounded maximum.</li>
        <li>On terminal success, extract the result URL or base64 payload.</li>
        <li>Download or decode it, inspect the file, and record the winning request parameters.</li>
      </ol>

      <h2 id="submit">1. Submit an image task</h2>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/generations" />
      <FieldTable rows={REQUEST_ROWS} />
      <CodeBlock lang="bash" filename="submit-async-image.sh" code={SUBMIT_CURL} />
      <p>Verify the step before polling:</p>
      <ul>
        <li><code>create.json</code> exists and contains the raw response.</li>
        <li><code>TASK_ID</code> is non-empty.</li>
        <li>You have recorded the model, prompt hash, requested size, and submission timestamp.</li>
      </ul>
      <Callout tone="danger" title="A client timeout is not proof that the task was not created">
        <p>
          If the connection dies after the server may have accepted the request, first check whether your client or
          gateway exposed a request ID or task ID. If you cannot prove that no task was created, do not immediately
          submit an identical high-cost generation again.
        </p>
      </Callout>

      <h2 id="poll">2. Poll until a terminal state</h2>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/images/generations/{task_id}" />
      <p>
        Polling is a control loop, not a tight retry loop. Five seconds is a reasonable starting point for a small test;
        increase it for high-volume workers or when the live service recommends a different interval.
      </p>
      <CodeBlock lang="bash" filename="poll-async-image.sh" code={POLL_CURL} />
      <DocTable
        headers={['State family', 'What to do', 'What not to do']}
        rows={[
          ['queued / submitted', 'Keep the task ID and poll again.', 'Do not resubmit just because no image exists yet.'],
          ['processing / in_progress', 'Continue polling and update last_polled_at.', 'Do not treat an empty result URL as failure.'],
          ['succeeded / success / completed', 'Extract URL or base64, then download or decode.', 'Do not mark success if the result payload is empty.'],
          ['failed / failure', 'Persist the error and decide whether a parameter change is needed.', 'Do not retry the identical request forever.'],
          ['cancelled / canceled', 'Record cancellation and decide whether the user wants a new task.', 'Do not continue polling indefinitely.'],
        ]}
      />

      <h2 id="download">3. Save the image result</h2>
      <p>
        Prefer downloading a URL into storage you control. If the response only provides <code>b64_json</code>, decode it
        on the server and write the bytes to a file or object store. Treat a provider URL as a delivery address, not your
        permanent asset database.
      </p>
      <CodeBlock lang="bash" filename="download-result.sh" code={String.raw`RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
if [ -n "$RESULT_URL" ]; then
  curl -L "$RESULT_URL" -o async-image.png
else
  B64=$(jq -r '.data.result.data[0].b64_json // .data[0].b64_json // empty' status.json)
  test -n "$B64" || { echo "No URL or base64 image found" >&2; exit 1; }
  printf '%s' "$B64" | base64 -d > async-image.png
fi
file async-image.png`}
      />
      <p>Verify the artifact, not only the HTTP status:</p>
      <ul>
        <li>The file exists and has a non-zero size.</li>
        <li>The MIME type and extension agree with the decoded content.</li>
        <li>The dimensions and crop match the requested output.</li>
        <li>The file opens in an image viewer and is not an error page saved as <code>.png</code>.</li>
      </ul>

      <h2 id="sdk">Node.js and Python clients</h2>
      <p>
        The following clients deliberately parse several common envelopes. This is useful while an API rollout or model
        family may return slightly different wrappers; once your production model is fixed, add strict schema validation
        around the fields you depend on.
      </p>
      <CodeBlock lang="typescript" filename="async-image.ts" code={NODE_EXAMPLE} />
      <CodeBlock lang="python" filename="async_image.py" code={PYTHON_EXAMPLE} />

      <h2 id="decisions">Decision guide</h2>
      <DocTable
        headers={['Need', 'Start with', 'Reason and trade-off']}
        rows={[
          ['Fast interactive preview', 'Sync, n=1, small size', 'Shortest feedback loop; less orchestration.'],
          ['Long-running or high-resolution output', 'Async, n=1', 'Protects request timeouts; one task is easier to inspect.'],
          ['Several variants for one brief', 'Stabilize one task, then raise n or queue tasks', 'Avoid multiplying an untested prompt.'],
          ['Reference-image edit', 'Async if upload or generation is slow', 'Keep upload, task state, and final asset handling observable.'],
          ['Batch production', 'Queue with a concurrency limit', 'Throughput improves, but usage and retry pressure rise.'],
          ['Unknown model behavior', 'Run a small probe task', 'Learn accepted fields and response shape before scaling.'],
        ]}
      />
      <p>Use the narrowest change that solves the current problem: change one prompt field, one size, or one quality setting at a time.</p>

      <h2 id="iteration">Iteration and evaluation loop</h2>
      <ol>
        <li>Inspect the final file against correctness, composition, subject fidelity, format, and cost criteria.</li>
        <li>Identify the single largest defect: wrong subject, crop, style, readability, or technical format.</li>
        <li>Change one relevant input while keeping the task lifecycle code unchanged.</li>
        <li>Submit one new task and compare it with the previous artifact.</li>
        <li>Keep, revert, or save the winning prompt and parameter bundle as a template.</li>
      </ol>
      <Callout tone="tip" title="Separate image quality from task reliability">
        <p>
          A successful poll loop does not mean the prompt is good, and a poor image does not mean the async integration is
          broken. Record these as separate dimensions so you do not change transport code to fix a creative-quality issue.
        </p>
      </Callout>

      <h2 id="production">Production task record</h2>
      <p>Keep a small durable record for every submitted task. It makes retries, support requests, and usage review much easier.</p>
      <CodeBlock lang="json" filename="image-task-record.json" code={TASK_RECORD} />
      <ul>
        <li><code>prompt_hash</code> lets you detect duplicate work without storing every prompt in a log.</li>
        <li><code>attempts</code> counts polling attempts, not blind resubmissions.</li>
        <li><code>result_url</code> should be copied into durable storage before the task record is archived.</li>
        <li><code>error</code> should retain the raw provider message and your normalized error category.</li>
      </ul>

      <h2 id="troubleshooting">Troubleshooting and recovery</h2>
      <DocTable
        headers={['Symptom', 'Likely cause', 'Smallest recovery']}
        rows={[
          ['No task ID in the submit response', 'Rejected request, unexpected envelope, or unsupported async field', 'Save the raw response, check HTTP status, then inspect the active model contract.'],
          ['Polling returns 404', 'Wrong task ID, wrong path, or task not visible on that route', 'Verify the exact returned ID and endpoint; do not create a replacement task yet.'],
          ['Polling returns 401/403', 'Missing key, wrong key, or permission/quota issue', 'Use the same server-side auth header and verify account access.'],
          ['Many 429 responses', 'Polling or submissions are too frequent', 'Back off, reduce concurrency, and keep the same task ID.'],
          ['Progress stays unchanged', 'Queue pressure or model-side delay', 'Keep a maximum duration; report task ID rather than spawning duplicates.'],
          ['Success has no URL', 'Result is nested, base64-only, or response shape changed', 'Log the raw success payload and extend the extractor for that model.'],
          ['Downloaded file is invalid', 'Temporary URL expired or response was an error body', 'Check content type/size, download immediately, and store a durable copy.'],
          ['Cost is higher than expected', 'Repeated submissions, high quality, n > 1, or account-specific pricing', 'Inspect usage by task/request ID before changing concurrency.'],
        ]}
      />
      <Callout tone="warn" title="Retry rule">
        <p>
          Retry transport failures and polling failures with backoff. Retry a generation only after you have established
          that no task was accepted, or after a human/product rule explicitly allows a new attempt. A task ID is the
          recovery handle.
        </p>
      </Callout>

      <h2 id="practice">Practice task and checklist</h2>
      <p>Generate one square product image with <code>n=1</code>, save it locally, and verify the following:</p>
      <ul>
        <li>[ ] API key is read from an environment variable.</li>
        <li>[ ] Submit response is saved before polling begins.</li>
        <li>[ ] The task ID is persisted and printed for recovery.</li>
        <li>[ ] Polling stops on success, failure, cancellation, or timeout.</li>
        <li>[ ] A transient poll error does not create a second task.</li>
        <li>[ ] The result is downloaded or decoded and its file type is checked.</li>
        <li>[ ] The raw success/failure response is available for support or debugging.</li>
        <li>[ ] Actual usage is checked before increasing size, quality, n, or concurrency.</li>
      </ul>
      <p>
        After this exercise works, move the same function into a worker and add a queue. Do not add batch concurrency until
        one task is reliable and its cost is understood.
      </p>

      <h2 id="sources">Evidence and confidence notes</h2>
      <ul>
        <li>The documented workflow follows the image API entry point already used by the site and the existing asynchronous video task pattern.</li>
        <li>The lifecycle concepts—task ID, polling, terminal state, result extraction, bounded retries—are high confidence.</li>
        <li>The exact async switch, status spelling, result envelope, URL lifetime, limits, pricing, and model availability are dynamic; treat the compatibility examples as illustrative and verify the live response.</li>
        <li>For the release summary, see the <Link to={localizePath('/docs/guides/async-image-generation-notice/', 'en')}>Async Image Generation Support Notice</Link>; for synchronous fields, see <Link to={localizePath('/docs/api/images/', 'en')}>Image Generation API</Link>.</li>
      </ul>
    </DocPage>
  )
}
