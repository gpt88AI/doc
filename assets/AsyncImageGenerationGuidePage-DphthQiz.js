import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-BYmDWq8R.js";import{t as i}from"./CodeBlock-BvvKvitI.js";import{a,c as o,r as s,s as c}from"./index-FnOEfHfs.js";var l=e();function u({headers:e,rows:t}){return(0,l.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,l.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,l.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,l.jsx)(`tr`,{children:e.map(e=>(0,l.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,l.jsx)(`tbody`,{children:t.map((e,t)=>(0,l.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,l.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}var d=String.raw`export GPT88_API_KEY="YOUR_GPT88_API_KEY"
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
echo "created task: $TASK_ID"`,f=String.raw`MAX_ATTEMPTS=60
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
exit 4`,p=String.raw`const BASE_URL = "https://img.gpt88.cc";
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
console.log(output);`,m=String.raw`import base64
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
    raise TimeoutError(f"Polling timed out; keep task ID {task_id}")`,h=`{
  "task_id": "imgtask_123",
  "model": "gpt-image-2",
  "prompt_hash": "sha256:...",
  "status": "processing",
  "submitted_at": "2026-08-05T10:00:00Z",
  "last_polled_at": "2026-08-05T10:00:15Z",
  "attempts": 3,
  "result_url": null,
  "error": null
}`,g=[{name:`model`,type:`string`,required:!0,description:(0,l.jsxs)(l.Fragment,{children:[`Image model ID, such as `,(0,l.jsx)(`code`,{children:`gpt-image-2`}),`; confirm availability with the current model list or console.`]})},{name:`prompt`,type:`string`,required:!0,description:(0,l.jsx)(l.Fragment,{children:`The image intent and constraints. Keep the prompt stable while diagnosing polling behavior.`})},{name:`size`,type:`string`,description:(0,l.jsx)(l.Fragment,{children:`Use a size supported by the selected model. Start small while validating the workflow.`})},{name:`quality`,type:`string`,description:(0,l.jsx)(l.Fragment,{children:`Quality preset supported by the selected model. Higher quality may take longer.`})},{name:`n`,type:`integer`,description:(0,l.jsxs)(l.Fragment,{children:[`Number of images. Start with `,(0,l.jsx)(`code`,{children:`1`}),`; increase only after one task is reliable.`]})},{name:`async`,type:`boolean`,description:(0,l.jsxs)(l.Fragment,{children:[`The examples use `,(0,l.jsx)(`code`,{children:`true`}),` to request asynchronous task handling. If a model exposes a different async switch, follow its live contract.`]})}];function _(){return(0,l.jsxs)(o,{path:`/docs/guides/async-image-generation-guide/`,title:`Async Image Generation API Guide`,description:`A practical guide to submitting asynchronous image tasks, polling status, downloading results, handling failures, and scaling image-generation workers safely.`,headings:[{id:`purpose`,text:`Purpose and definition of done`,level:2},{id:`concepts`,text:`Core concepts`,level:2},{id:`prerequisites`,text:`Prerequisites`,level:2},{id:`shortest-path`,text:`Shortest successful path`,level:2},{id:`submit`,text:`1. Submit an image task`,level:2},{id:`poll`,text:`2. Poll until a terminal state`,level:2},{id:`download`,text:`3. Save the image result`,level:2},{id:`sdk`,text:`Node.js and Python clients`,level:2},{id:`decisions`,text:`Decision guide`,level:2},{id:`iteration`,text:`Iteration and evaluation loop`,level:2},{id:`production`,text:`Production task record`,level:2},{id:`troubleshooting`,text:`Troubleshooting and recovery`,level:2},{id:`practice`,text:`Practice task and checklist`,level:2},{id:`sources`,text:`Evidence and confidence notes`,level:2}],children:[(0,l.jsx)(c,{tone:`info`,title:`What this guide teaches`,children:(0,l.jsx)(`p`,{children:`You will submit one asynchronous image task, get a task ID, poll it with a bounded loop, and save a usable PNG or result URL. Once that path works, the same lifecycle can be moved into a worker, queue, or batch job.`})}),(0,l.jsx)(`h2`,{id:`purpose`,children:`Purpose and definition of done`}),(0,l.jsx)(`p`,{children:`This guide is for developers building a backend, CLI, scheduled job, or automation pipeline around the GPT88 image API. It is not a prompt-writing course; it focuses on reliable task orchestration.`}),(0,l.jsx)(`p`,{children:`You are done when all of the following are true:`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`The submit response produces a task ID that your service persists.`}),(0,l.jsx)(`li`,{children:`Polling can distinguish processing from success and failure.`}),(0,l.jsx)(`li`,{children:`A successful task produces a downloaded file or a deliberately stored result URL.`}),(0,l.jsx)(`li`,{children:`A timeout or transient error can resume with the same task ID without blindly generating again.`}),(0,l.jsx)(`li`,{children:`Usage and failures can be audited later with the task ID and request metadata.`})]}),(0,l.jsx)(`h2`,{id:`concepts`,children:`Core concepts`}),(0,l.jsx)(u,{headers:[`Term`,`Meaning`,`Implementation rule`],rows:[[`Submit`,`Send the image intent and generation parameters.`,`Persist the raw response and task ID before doing anything else.`],[`Task ID`,`The stable handle for later status queries.`,`Use task_id or id from the response; never synthesize one locally.`],[`Polling`,`Repeatedly query the task until it reaches a terminal state.`,`Use a bounded interval, maximum attempts, and backoff for transient errors.`],[`Terminal state`,`A final success, failure, or cancellation state.`,`Do not stop just because progress reaches 100.`],[`Result`,`The final image URL or base64 payload.`,`Download or decode immediately, then store your own durable copy.`],[`Task record`,`Your local persistence for orchestration and audit.`,`Store model, prompt hash, timestamps, attempts, status, and error.`]]}),(0,l.jsx)(`h2`,{id:`prerequisites`,children:`Prerequisites`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`A GPT88 API key with access to an image model.`}),(0,l.jsxs)(`li`,{children:[`One of: cURL plus `,(0,l.jsx)(`code`,{children:`jq`}),`, Node.js 20+, or Python 3.10+ with `,(0,l.jsx)(`code`,{children:`requests`}),`.`]}),(0,l.jsx)(`li`,{children:`A writable local directory or object-storage target for the generated image.`}),(0,l.jsx)(`li`,{children:`A known prompt and a small test size. Use one image first.`})]}),(0,l.jsx)(c,{tone:`warn`,title:`Check the live model contract first`,children:(0,l.jsxs)(`p`,{children:[`The examples use `,(0,l.jsx)(`code`,{children:`POST https://img.gpt88.cc/v1/images/generations`}),`, `,(0,l.jsx)(`code`,{children:`async: true`}),`, and`,(0,l.jsxs)(`code`,{children:[`GET /v1/images/generations/`,`{task_id}`]}),`. Model availability, supported fields, response envelopes, and result retention can change. If your active model rejects one field, keep the same lifecycle but follow the model-specific response and parameter contract shown by the console or live API.`]})}),(0,l.jsx)(`h2`,{id:`shortest-path`,children:`Shortest successful path`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Set the API key and choose a small, single-image request.`}),(0,l.jsx)(`li`,{children:`Submit with async mode and save the returned task ID.`}),(0,l.jsx)(`li`,{children:`Poll every five seconds, up to a bounded maximum.`}),(0,l.jsx)(`li`,{children:`On terminal success, extract the result URL or base64 payload.`}),(0,l.jsx)(`li`,{children:`Download or decode it, inspect the file, and record the winning request parameters.`})]}),(0,l.jsx)(`h2`,{id:`submit`,children:`1. Submit an image task`}),(0,l.jsx)(s,{method:`POST`,path:`https://img.gpt88.cc/v1/images/generations`}),(0,l.jsx)(a,{rows:g}),(0,l.jsx)(i,{lang:`bash`,filename:`submit-async-image.sh`,code:d}),(0,l.jsx)(`p`,{children:`Verify the step before polling:`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`create.json`}),` exists and contains the raw response.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`TASK_ID`}),` is non-empty.`]}),(0,l.jsx)(`li`,{children:`You have recorded the model, prompt hash, requested size, and submission timestamp.`})]}),(0,l.jsx)(c,{tone:`danger`,title:`A client timeout is not proof that the task was not created`,children:(0,l.jsx)(`p`,{children:`If the connection dies after the server may have accepted the request, first check whether your client or gateway exposed a request ID or task ID. If you cannot prove that no task was created, do not immediately submit an identical high-cost generation again.`})}),(0,l.jsx)(`h2`,{id:`poll`,children:`2. Poll until a terminal state`}),(0,l.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/images/generations/{task_id}`}),(0,l.jsx)(`p`,{children:`Polling is a control loop, not a tight retry loop. Five seconds is a reasonable starting point for a small test; increase it for high-volume workers or when the live service recommends a different interval.`}),(0,l.jsx)(i,{lang:`bash`,filename:`poll-async-image.sh`,code:f}),(0,l.jsx)(u,{headers:[`State family`,`What to do`,`What not to do`],rows:[[`queued / submitted`,`Keep the task ID and poll again.`,`Do not resubmit just because no image exists yet.`],[`processing / in_progress`,`Continue polling and update last_polled_at.`,`Do not treat an empty result URL as failure.`],[`succeeded / success / completed`,`Extract URL or base64, then download or decode.`,`Do not mark success if the result payload is empty.`],[`failed / failure`,`Persist the error and decide whether a parameter change is needed.`,`Do not retry the identical request forever.`],[`cancelled / canceled`,`Record cancellation and decide whether the user wants a new task.`,`Do not continue polling indefinitely.`]]}),(0,l.jsx)(`h2`,{id:`download`,children:`3. Save the image result`}),(0,l.jsxs)(`p`,{children:[`Prefer downloading a URL into storage you control. If the response only provides `,(0,l.jsx)(`code`,{children:`b64_json`}),`, decode it on the server and write the bytes to a file or object store. Treat a provider URL as a delivery address, not your permanent asset database.`]}),(0,l.jsx)(i,{lang:`bash`,filename:`download-result.sh`,code:String.raw`RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
if [ -n "$RESULT_URL" ]; then
  curl -L "$RESULT_URL" -o async-image.png
else
  B64=$(jq -r '.data.result.data[0].b64_json // .data[0].b64_json // empty' status.json)
  test -n "$B64" || { echo "No URL or base64 image found" >&2; exit 1; }
  printf '%s' "$B64" | base64 -d > async-image.png
fi
file async-image.png`}),(0,l.jsx)(`p`,{children:`Verify the artifact, not only the HTTP status:`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`The file exists and has a non-zero size.`}),(0,l.jsx)(`li`,{children:`The MIME type and extension agree with the decoded content.`}),(0,l.jsx)(`li`,{children:`The dimensions and crop match the requested output.`}),(0,l.jsxs)(`li`,{children:[`The file opens in an image viewer and is not an error page saved as `,(0,l.jsx)(`code`,{children:`.png`}),`.`]})]}),(0,l.jsx)(`h2`,{id:`sdk`,children:`Node.js and Python clients`}),(0,l.jsx)(`p`,{children:`The following clients deliberately parse several common envelopes. This is useful while an API rollout or model family may return slightly different wrappers; once your production model is fixed, add strict schema validation around the fields you depend on.`}),(0,l.jsx)(i,{lang:`typescript`,filename:`async-image.ts`,code:p}),(0,l.jsx)(i,{lang:`python`,filename:`async_image.py`,code:m}),(0,l.jsx)(`h2`,{id:`decisions`,children:`Decision guide`}),(0,l.jsx)(u,{headers:[`Need`,`Start with`,`Reason and trade-off`],rows:[[`Fast interactive preview`,`Sync, n=1, small size`,`Shortest feedback loop; less orchestration.`],[`Long-running or high-resolution output`,`Async, n=1`,`Protects request timeouts; one task is easier to inspect.`],[`Several variants for one brief`,`Stabilize one task, then raise n or queue tasks`,`Avoid multiplying an untested prompt.`],[`Reference-image edit`,`Async if upload or generation is slow`,`Keep upload, task state, and final asset handling observable.`],[`Batch production`,`Queue with a concurrency limit`,`Throughput improves, but usage and retry pressure rise.`],[`Unknown model behavior`,`Run a small probe task`,`Learn accepted fields and response shape before scaling.`]]}),(0,l.jsx)(`p`,{children:`Use the narrowest change that solves the current problem: change one prompt field, one size, or one quality setting at a time.`}),(0,l.jsx)(`h2`,{id:`iteration`,children:`Iteration and evaluation loop`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Inspect the final file against correctness, composition, subject fidelity, format, and cost criteria.`}),(0,l.jsx)(`li`,{children:`Identify the single largest defect: wrong subject, crop, style, readability, or technical format.`}),(0,l.jsx)(`li`,{children:`Change one relevant input while keeping the task lifecycle code unchanged.`}),(0,l.jsx)(`li`,{children:`Submit one new task and compare it with the previous artifact.`}),(0,l.jsx)(`li`,{children:`Keep, revert, or save the winning prompt and parameter bundle as a template.`})]}),(0,l.jsx)(c,{tone:`tip`,title:`Separate image quality from task reliability`,children:(0,l.jsx)(`p`,{children:`A successful poll loop does not mean the prompt is good, and a poor image does not mean the async integration is broken. Record these as separate dimensions so you do not change transport code to fix a creative-quality issue.`})}),(0,l.jsx)(`h2`,{id:`production`,children:`Production task record`}),(0,l.jsx)(`p`,{children:`Keep a small durable record for every submitted task. It makes retries, support requests, and usage review much easier.`}),(0,l.jsx)(i,{lang:`json`,filename:`image-task-record.json`,code:h}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`prompt_hash`}),` lets you detect duplicate work without storing every prompt in a log.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`attempts`}),` counts polling attempts, not blind resubmissions.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`result_url`}),` should be copied into durable storage before the task record is archived.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`error`}),` should retain the raw provider message and your normalized error category.`]})]}),(0,l.jsx)(`h2`,{id:`troubleshooting`,children:`Troubleshooting and recovery`}),(0,l.jsx)(u,{headers:[`Symptom`,`Likely cause`,`Smallest recovery`],rows:[[`No task ID in the submit response`,`Rejected request, unexpected envelope, or unsupported async field`,`Save the raw response, check HTTP status, then inspect the active model contract.`],[`Polling returns 404`,`Wrong task ID, wrong path, or task not visible on that route`,`Verify the exact returned ID and endpoint; do not create a replacement task yet.`],[`Polling returns 401/403`,`Missing key, wrong key, or permission/quota issue`,`Use the same server-side auth header and verify account access.`],[`Many 429 responses`,`Polling or submissions are too frequent`,`Back off, reduce concurrency, and keep the same task ID.`],[`Progress stays unchanged`,`Queue pressure or model-side delay`,`Keep a maximum duration; report task ID rather than spawning duplicates.`],[`Success has no URL`,`Result is nested, base64-only, or response shape changed`,`Log the raw success payload and extend the extractor for that model.`],[`Downloaded file is invalid`,`Temporary URL expired or response was an error body`,`Check content type/size, download immediately, and store a durable copy.`],[`Cost is higher than expected`,`Repeated submissions, high quality, n > 1, or account-specific pricing`,`Inspect usage by task/request ID before changing concurrency.`]]}),(0,l.jsx)(c,{tone:`warn`,title:`Retry rule`,children:(0,l.jsx)(`p`,{children:`Retry transport failures and polling failures with backoff. Retry a generation only after you have established that no task was accepted, or after a human/product rule explicitly allows a new attempt. A task ID is the recovery handle.`})}),(0,l.jsx)(`h2`,{id:`practice`,children:`Practice task and checklist`}),(0,l.jsxs)(`p`,{children:[`Generate one square product image with `,(0,l.jsx)(`code`,{children:`n=1`}),`, save it locally, and verify the following:`]}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`[ ] API key is read from an environment variable.`}),(0,l.jsx)(`li`,{children:`[ ] Submit response is saved before polling begins.`}),(0,l.jsx)(`li`,{children:`[ ] The task ID is persisted and printed for recovery.`}),(0,l.jsx)(`li`,{children:`[ ] Polling stops on success, failure, cancellation, or timeout.`}),(0,l.jsx)(`li`,{children:`[ ] A transient poll error does not create a second task.`}),(0,l.jsx)(`li`,{children:`[ ] The result is downloaded or decoded and its file type is checked.`}),(0,l.jsx)(`li`,{children:`[ ] The raw success/failure response is available for support or debugging.`}),(0,l.jsx)(`li`,{children:`[ ] Actual usage is checked before increasing size, quality, n, or concurrency.`})]}),(0,l.jsx)(`p`,{children:`After this exercise works, move the same function into a worker and add a queue. Do not add batch concurrency until one task is reliable and its cost is understood.`}),(0,l.jsx)(`h2`,{id:`sources`,children:`Evidence and confidence notes`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`The documented workflow follows the image API entry point already used by the site and the existing asynchronous video task pattern.`}),(0,l.jsx)(`li`,{children:`The lifecycle concepts—task ID, polling, terminal state, result extraction, bounded retries—are high confidence.`}),(0,l.jsx)(`li`,{children:`The exact async switch, status spelling, result envelope, URL lifetime, limits, pricing, and model availability are dynamic; treat the compatibility examples as illustrative and verify the live response.`}),(0,l.jsxs)(`li`,{children:[`For the release summary, see the `,(0,l.jsx)(t,{to:r(`/docs/guides/async-image-generation-notice/`,`en`),children:`Async Image Generation Support Notice`}),`; for synchronous fields, see `,(0,l.jsx)(t,{to:r(`/docs/api/images/`,`en`),children:`Image Generation API`}),`.`]})]})]})}function v({headers:e,rows:t}){return(0,l.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,l.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,l.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,l.jsx)(`tr`,{children:e.map(e=>(0,l.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,l.jsx)(`tbody`,{children:t.map((e,t)=>(0,l.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,l.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}var y=String.raw`export GPT88_API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://img.gpt88.cc"

curl -sS -X POST "$BASE_URL/v1/images/generations" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "高级电商护肤品主图，玻璃瓶身，白色石材台面，柔和晨光，干净高级构图，无文字，无水印",
    "size": "1024x1024",
    "quality": "high",
    "n": 1,
    "async": true
  }' | tee create.json

# 兼容顶层 task_id / id 和嵌套 data.task_id / data.id。
TASK_ID=$(jq -r '.task_id // .id // .data.task_id // .data.id // empty' create.json)
test -n "$TASK_ID" || { echo "没有返回 task ID："; cat create.json; exit 1; }
echo "created task: $TASK_ID"`,b=String.raw`MAX_ATTEMPTS=60
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
        echo "已保存 async-image.png"
        exit 0
      fi
      echo "任务成功但没有找到 URL；请检查 status.json 中是否返回 b64_json 或模型专属结果。" >&2
      exit 2
      ;;
    failed|failure|cancelled|canceled)
      echo "异步生图失败：" >&2
      cat status.json >&2
      exit 3
      ;;
  esac

  sleep "$INTERVAL_SECONDS"
done

echo "轮询超时。保留 TASK_ID=$TASK_ID，稍后继续查询。" >&2
exit 4`,x=String.raw`const BASE_URL = "https://img.gpt88.cc";
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
  if (!createResponse.ok) throw new Error("提交失败：" + JSON.stringify(created));

  const taskId = taskIdOf(created);
  if (!taskId) throw new Error("没有返回 task ID：" + JSON.stringify(created));

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    await sleep(5000);
    const pollResponse = await fetch(BASE_URL + "/v1/images/generations/" + encodeURIComponent(taskId), {
      headers: { Authorization: "Bearer " + API_KEY },
    });
    const payload = await pollResponse.json();
    if (!pollResponse.ok) throw new Error("轮询失败：" + JSON.stringify(payload));

    const status = statusOf(payload);
    if (["succeeded", "success", "completed"].includes(status)) {
      const result = resultOf(payload);
      if (!result) throw new Error("任务成功，但没有 URL 或 base64 结果");
      return { taskId, result, raw: payload };
    }
    if (["failed", "failure", "cancelled", "canceled"].includes(status)) {
      throw new Error("异步生图失败：" + JSON.stringify(payload));
    }
  }

  throw new Error("轮询超时，请保留 task ID 后继续查询：" + taskId);
}

const output = await generateAsyncImage("一盏银色台灯的极简编辑风产品图，暖侧光，无文字");
console.log(output);`,S=String.raw`import base64
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
        "prompt": "高级电商护肤品主图，玻璃瓶身，柔和晨光，无文字",
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
    raise RuntimeError(f"没有返回 task ID：{created}")

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
            raise RuntimeError(f"任务成功但没有结果：{payload}")
        if result.startswith("http"):
            image = requests.get(result, timeout=60)
            image.raise_for_status()
            Path("async-image.png").write_bytes(image.content)
        else:
            Path("async-image.png").write_bytes(base64.b64decode(result))
        break
    if status in {"failed", "failure", "cancelled", "canceled"}:
        raise RuntimeError(f"异步生图失败：{payload}")
else:
    raise TimeoutError(f"轮询超时，请保留 task ID：{task_id}")`,C=`{
  "task_id": "imgtask_123",
  "model": "gpt-image-2",
  "prompt_hash": "sha256:...",
  "status": "processing",
  "submitted_at": "2026-08-05T10:00:00Z",
  "last_polled_at": "2026-08-05T10:00:15Z",
  "attempts": 3,
  "result_url": null,
  "error": null
}`,w=[{name:`model`,type:`string`,required:!0,description:(0,l.jsxs)(l.Fragment,{children:[`图片模型 ID，例如 `,(0,l.jsx)(`code`,{children:`gpt-image-2`}),`；请先确认当前账号和模型权限。`]})},{name:`prompt`,type:`string`,required:!0,description:(0,l.jsx)(l.Fragment,{children:`图片意图和限制条件。排查轮询问题时先保持 prompt 不变。`})},{name:`size`,type:`string`,description:(0,l.jsx)(l.Fragment,{children:`使用当前模型支持的尺寸。验证链路时先从小尺寸开始。`})},{name:`quality`,type:`string`,description:(0,l.jsx)(l.Fragment,{children:`当前模型支持的质量档位。质量越高，任务可能越慢。`})},{name:`n`,type:`integer`,description:(0,l.jsxs)(l.Fragment,{children:[`生成数量。先使用 `,(0,l.jsx)(`code`,{children:`1`}),`，单任务稳定后再增加。`]})},{name:`async`,type:`boolean`,description:(0,l.jsxs)(l.Fragment,{children:[`本文示例用 `,(0,l.jsx)(`code`,{children:`true`}),` 请求异步任务。如果当前模型暴露的是其他开关，以实时接口契约为准。`]})}];function T(){let{locale:e}=n();return e===`en`?(0,l.jsx)(_,{}):(0,l.jsxs)(o,{path:`/docs/guides/async-image-generation-guide/`,title:`异步生图 API 详细教程`,description:`从提交异步图片任务、轮询状态、下载结果，到失败恢复、任务持久化、Node.js / Python 客户端和批量扩展的完整教程。`,headings:[{id:`purpose`,text:`目标与完成标准`,level:2},{id:`concepts`,text:`核心概念`,level:2},{id:`prerequisites`,text:`开始前准备`,level:2},{id:`shortest-path`,text:`最短成功路径`,level:2},{id:`submit`,text:`1. 提交异步生图任务`,level:2},{id:`poll`,text:`2. 轮询直到任务结束`,level:2},{id:`download`,text:`3. 保存图片结果`,level:2},{id:`sdk`,text:`Node.js 与 Python 客户端`,level:2},{id:`decisions`,text:`模式选择指南`,level:2},{id:`iteration`,text:`迭代与评估循环`,level:2},{id:`production`,text:`生产环境任务记录`,level:2},{id:`troubleshooting`,text:`排错与失败恢复`,level:2},{id:`practice`,text:`练习任务与验收清单`,level:2},{id:`sources`,text:`依据与置信度说明`,level:2}],children:[(0,l.jsx)(c,{tone:`info`,title:`这篇教程要带你完成什么`,children:(0,l.jsx)(`p`,{children:`你会提交一张异步图片任务，拿到 task ID，用有上限的循环轮询，并把最终 PNG 或图片 URL 保存下来。 这条链路稳定后，再把同样的生命周期搬进 Worker、任务队列或批量脚本。`})}),(0,l.jsx)(`h2`,{id:`purpose`,children:`目标与完成标准`}),(0,l.jsx)(`p`,{children:`本教程面向要把 GPT88 图片 API 接入后端、CLI、定时任务或自动化流程的开发者。它不是提示词教程，重点是可靠地编排图片任务。`}),(0,l.jsx)(`p`,{children:`满足下面所有条件，就算完成：`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`提交响应返回的任务 ID 会被你的服务持久化。`}),(0,l.jsx)(`li`,{children:`轮询逻辑能区分处理中、成功和失败。`}),(0,l.jsx)(`li`,{children:`成功任务能得到可用图片文件，或明确保存结果 URL。`}),(0,l.jsx)(`li`,{children:`超时和临时错误能使用原 task ID 恢复，而不是盲目重新生成。`}),(0,l.jsx)(`li`,{children:`你可以凭 task ID 和请求元数据审计用量与失败原因。`})]}),(0,l.jsx)(`h2`,{id:`concepts`,children:`核心概念`}),(0,l.jsx)(v,{headers:[`术语`,`含义`,`实现规则`],rows:[[`提交任务`,`发送图片意图和生成参数。`,`先保存原始响应和任务 ID，再做后续处理。`],[`Task ID`,`后续查询任务状态的稳定句柄。`,`从响应的 task_id 或 id 读取，不要在本地自行伪造。`],[`轮询`,`重复查询任务，直到任务进入终态。`,`设置固定间隔、最大次数，临时错误使用退避。`],[`终态`,`最终成功、失败或取消状态。`,`不要因为 progress 到 100 就直接停止。`],[`结果`,`最终图片 URL 或 base64 payload。`,`尽快下载或解码，并转存到自己的持久化位置。`],[`任务记录`,`用于编排、恢复和审计的本地数据。`,`保存模型、prompt 哈希、时间、尝试次数、状态和错误。`]]}),(0,l.jsx)(`h2`,{id:`prerequisites`,children:`开始前准备`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`一个有图片模型权限的 GPT88 API Key。`}),(0,l.jsxs)(`li`,{children:[`以下任一环境：cURL + `,(0,l.jsx)(`code`,{children:`jq`}),`、Node.js 20+，或 Python 3.10+ + `,(0,l.jsx)(`code`,{children:`requests`}),`。`]}),(0,l.jsx)(`li`,{children:`一个可写的本地目录，或用于保存图片的对象存储位置。`}),(0,l.jsx)(`li`,{children:`一条已确定的 prompt 和一个小尺寸测试参数；第一次只生成 1 张。`})]}),(0,l.jsx)(c,{tone:`warn`,title:`先核对当前模型契约`,children:(0,l.jsxs)(`p`,{children:[`本文示例使用 `,(0,l.jsx)(`code`,{children:`POST https://img.gpt88.cc/v1/images/generations`}),`、`,(0,l.jsx)(`code`,{children:`async: true`}),` 和`,(0,l.jsxs)(`code`,{children:[`GET /v1/images/generations/`,`{task_id}`]}),`。模型权限、支持字段、响应外层结构和结果保留时间可能变化。 如果当前模型拒绝某个字段，保留“提交 → 保存 ID → 轮询 → 取结果”的生命周期，但以控制台或实时 API 返回的模型契约为准。`]})}),(0,l.jsx)(`h2`,{id:`shortest-path`,children:`最短成功路径`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`从环境变量读取 API Key，选择小尺寸、单张请求。`}),(0,l.jsx)(`li`,{children:`打开异步模式提交任务，并保存返回的任务 ID。`}),(0,l.jsx)(`li`,{children:`每 5 秒轮询一次，设置最大轮询次数。`}),(0,l.jsx)(`li`,{children:`任务成功后提取结果 URL 或 base64 图片。`}),(0,l.jsx)(`li`,{children:`下载或解码图片、检查文件，并记录本次成功参数。`})]}),(0,l.jsx)(`h2`,{id:`submit`,children:`1. 提交异步生图任务`}),(0,l.jsx)(s,{method:`POST`,path:`https://img.gpt88.cc/v1/images/generations`}),(0,l.jsx)(a,{rows:w}),(0,l.jsx)(i,{lang:`bash`,filename:`submit-async-image.sh`,code:y}),(0,l.jsx)(`p`,{children:`进入轮询前先验证：`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`create.json`}),` 存在，并保留了原始响应。`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`TASK_ID`}),` 非空。`]}),(0,l.jsx)(`li`,{children:`你记录了模型、prompt 哈希、请求尺寸和提交时间。`})]}),(0,l.jsx)(c,{tone:`danger`,title:`客户端超时不等于任务没有创建`,children:(0,l.jsx)(`p`,{children:`如果连接在服务端可能已经接受请求后断开，先检查客户端或网关是否暴露了 request ID 或 task ID。 在不能证明任务没有创建之前，不要立即重新提交同一条高成本生图请求。`})}),(0,l.jsx)(`h2`,{id:`poll`,children:`2. 轮询直到任务结束`}),(0,l.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/images/generations/{task_id}`}),(0,l.jsx)(`p`,{children:`轮询是一个有边界的控制循环，不是没有间隔的重试循环。小规模测试可以从 5 秒开始；批量 Worker 应根据服务建议和并发量调整间隔。`}),(0,l.jsx)(i,{lang:`bash`,filename:`poll-async-image.sh`,code:b}),(0,l.jsx)(v,{headers:[`状态类型`,`应该怎么做`,`不要怎么做`],rows:[[`queued / submitted`,`保留 task ID，继续轮询。`,`不要因为暂时没有图片就重新提交。`],[`processing / in_progress`,`继续轮询，更新 last_polled_at。`,`不要因为 result URL 为空就判定失败。`],[`succeeded / success / completed`,`提取 URL 或 base64，再下载或解码。`,`结果 payload 为空时不要标记成功。`],[`failed / failure`,`保存错误，并判断是否需要改参数后再试。`,`不要永远重试完全相同的请求。`],[`cancelled / canceled`,`记录取消，并由用户或业务决定是否新建任务。`,`不要继续无限轮询。`]]}),(0,l.jsx)(`h2`,{id:`download`,children:`3. 保存图片结果`}),(0,l.jsxs)(`p`,{children:[`优先把 URL 下载到自己控制的存储。如果响应只返回 `,(0,l.jsx)(`code`,{children:`b64_json`}),`，就在服务端解码成字节并写入文件或对象存储。 上游 URL 应当被视为交付地址，而不是永久素材库。`]}),(0,l.jsx)(i,{lang:`bash`,filename:`download-result.sh`,code:String.raw`RESULT_URL=$(jq -r '.data.result_url // .result_url // .data.result.data[0].url // .result.data[0].url // .data[0].url // empty' status.json)
if [ -n "$RESULT_URL" ]; then
  curl -L "$RESULT_URL" -o async-image.png
else
  B64=$(jq -r '.data.result.data[0].b64_json // .data[0].b64_json // empty' status.json)
  test -n "$B64" || { echo "没有找到 URL 或 base64 图片" >&2; exit 1; }
  printf '%s' "$B64" | base64 -d > async-image.png
fi
file async-image.png`}),(0,l.jsx)(`p`,{children:`验证最终文件，而不只是验证 HTTP 状态：`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`文件存在且大小大于 0。`}),(0,l.jsx)(`li`,{children:`MIME 类型和文件扩展名一致。`}),(0,l.jsx)(`li`,{children:`尺寸和裁切符合请求参数。`}),(0,l.jsxs)(`li`,{children:[`图片查看器可以打开，且不是被保存成 `,(0,l.jsx)(`code`,{children:`.png`}),` 的错误页。`]})]}),(0,l.jsx)(`h2`,{id:`sdk`,children:`Node.js 与 Python 客户端`}),(0,l.jsx)(`p`,{children:`下面的客户端故意兼容几种常见响应外层结构。API 灰度或不同模型可能返回不同包装时，这种写法更容易先跑通； 生产模型固定后，再围绕实际字段增加严格 schema 校验。`}),(0,l.jsx)(i,{lang:`typescript`,filename:`async-image.ts`,code:x}),(0,l.jsx)(i,{lang:`python`,filename:`async_image.py`,code:S}),(0,l.jsx)(`h2`,{id:`decisions`,children:`模式选择指南`}),(0,l.jsx)(v,{headers:[`需求`,`建议起点`,`原因与取舍`],rows:[[`快速交互式预览`,`同步、n=1、小尺寸`,`反馈链路最短，编排代码最少。`],[`长耗时或高分辨率成图`,`异步、n=1`,`更抗请求超时；先把单个任务看清楚。`],[`同一 brief 生成多个变体`,`先稳定 1 张，再提高 n 或排队`,`避免把错误 prompt 批量放大。`],[`参考图编辑`,`上传或生成较慢时使用异步`,`上传、任务状态和最终文件都更容易观察。`],[`批量生产`,`队列 + 并发上限`,`吞吐提高，但用量和重试压力也会上升。`],[`不确定模型行为`,`先跑一条小探针任务`,`先确认支持字段和响应结构，再扩大规模。`]]}),(0,l.jsx)(`p`,{children:`每次只改一个相关变量：一次改 prompt 的一个字段、尺寸或质量档位，便于判断到底是什么造成了变化。`}),(0,l.jsx)(`h2`,{id:`iteration`,children:`迭代与评估循环`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`根据主体正确性、构图、参考图一致性、格式和成本检查最终文件。`}),(0,l.jsx)(`li`,{children:`找出最大的单一缺陷：主体、裁切、风格、文字可读性或技术格式。`}),(0,l.jsx)(`li`,{children:`只修改一个相关输入，保持任务提交和轮询代码不变。`}),(0,l.jsx)(`li`,{children:`重新提交一条任务，与上一张结果做对比。`}),(0,l.jsx)(`li`,{children:`保留、回退，或把获胜的 prompt 和参数组合保存成模板。`})]}),(0,l.jsx)(c,{tone:`tip`,title:`把图片质量和任务可靠性分开评估`,children:(0,l.jsx)(`p`,{children:`轮询成功不代表 prompt 写得好，图片不好也不代表异步接入坏了。把“传输/任务链路”和“创意/图片质量”分成两项记录， 不要用改 transport 代码的方式修复创意问题。`})}),(0,l.jsx)(`h2`,{id:`production`,children:`生产环境任务记录`}),(0,l.jsx)(`p`,{children:`为每条提交任务保留一条持久化记录，重试、客服排查和用量核对都会简单很多。`}),(0,l.jsx)(i,{lang:`json`,filename:`image-task-record.json`,code:C}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`prompt_hash`}),` 可以在不把完整 prompt 写进日志的情况下识别重复任务。`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`attempts`}),` 统计轮询次数，不统计盲目重新提交。`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`result_url`}),` 应在归档任务前转存到持久化存储。`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`code`,{children:`error`}),` 同时保留上游原始消息和你自己的标准化错误分类。`]})]}),(0,l.jsx)(`h2`,{id:`troubleshooting`,children:`排错与失败恢复`}),(0,l.jsx)(v,{headers:[`现象`,`可能原因`,`最小恢复动作`],rows:[[`提交响应没有 task ID`,`请求被拒绝、响应外层不同或异步字段不被支持。`,`保留原始响应，先看 HTTP 状态，再核对当前模型契约。`],[`轮询返回 404`,`task ID、查询路径错误，或任务暂时不在该路径可见。`,`确认原始返回的 ID 和 endpoint，先不要创建替代任务。`],[`轮询返回 401/403`,`Key 缺失、错误，或权限/额度问题。`,`检查服务端认证头和账号图片模型权限。`],[`大量 429`,`轮询或提交过于频繁。`,`退避、降低并发，继续使用原 task ID。`],[`进度长时间不变`,`队列拥塞或模型侧延迟。`,`保留最大时长，提交 task ID 做排查，不要复制出多个任务。`],[`成功但没有 URL`,`结果嵌套、只返回 base64，或响应结构变化。`,`记录完整成功 payload，为该模型扩展结果提取器。`],[`下载文件打不开`,`临时 URL 过期，或下载到的是错误响应正文。`,`检查 Content-Type/大小，尽快下载并转存自己的副本。`],[`实际扣费高于预期`,`重复提交、高质量、n > 1 或账号定价差异。`,`按 task/request ID 查看用量，再调整并发。`]]}),(0,l.jsx)(c,{tone:`warn`,title:`重试规则`,children:(0,l.jsx)(`p`,{children:`网络传输失败和轮询失败可以退避重试。只有在确认没有任务被接受，或业务规则明确允许新建任务时，才重新生成；task ID 就是恢复句柄。`})}),(0,l.jsx)(`h2`,{id:`practice`,children:`练习任务与验收清单`}),(0,l.jsxs)(`p`,{children:[`使用 `,(0,l.jsx)(`code`,{children:`n=1`}),` 生成一张正方形商品图，保存到本地，然后逐项检查：`]}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`[ ] API Key 从环境变量读取。`}),(0,l.jsx)(`li`,{children:`[ ] 轮询前已经保存提交响应。`}),(0,l.jsx)(`li`,{children:`[ ] task ID 已持久化并打印，方便恢复。`}),(0,l.jsx)(`li`,{children:`[ ] 轮询会在成功、失败、取消或超时时停止。`}),(0,l.jsx)(`li`,{children:`[ ] 临时轮询错误不会创建第二条任务。`}),(0,l.jsx)(`li`,{children:`[ ] 结果已经下载或解码，并检查文件类型。`}),(0,l.jsx)(`li`,{children:`[ ] 原始成功/失败响应可用于客服或调试。`}),(0,l.jsx)(`li`,{children:`[ ] 提高尺寸、质量、n 或并发前，已经核对真实用量。`})]}),(0,l.jsx)(`p`,{children:`这条链路稳定后，再把同一个函数搬进 Worker，并加上队列。不要在单任务还不可靠、成本还没弄清楚之前就上批量并发。`}),(0,l.jsx)(`h2`,{id:`sources`,children:`依据与置信度说明`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:`本文入口沿用站内已有的图片 API，并参考站内已有异步视频任务的“创建 → 保存 ID → 轮询 → 取结果”范式。`}),(0,l.jsx)(`li`,{children:`任务 ID、轮询、终态、结果提取、有上限的重试等生命周期概念，置信度高。`}),(0,l.jsx)(`li`,{children:`异步开关的准确字段、状态拼写、结果外层结构、临时 URL 有效期、限速、价格和模型权限都可能动态变化；兼容 JSON 只是示例，实际接入必须验证实时响应。`}),(0,l.jsxs)(`li`,{children:[`发布摘要请看`,(0,l.jsx)(t,{className:`ml-1`,to:r(`/docs/guides/async-image-generation-notice/`,e),children:`异步生图支持公告`}),`；同步字段请看`,(0,l.jsx)(t,{className:`ml-1`,to:r(`/docs/api/images/`,e),children:`图片生成 API`}),`。`]})]})]})}export{T as default};