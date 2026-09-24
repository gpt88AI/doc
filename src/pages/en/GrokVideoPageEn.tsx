import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../components/ui/FieldTable'
import { buildAgentActivationUrl } from '../../lib/activationLinks'

const MODEL_ROWS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>Model ID, such as <code>grok-image-video</code>.</> },
  { name: 'object', type: 'string', required: true, description: <>Always <code>model</code>.</> },
  { name: 'capabilities', type: 'string[]', description: <>Supported capabilities such as <code>video</code>, <code>image</code>, and <code>streaming</code>.</> },
  { name: 'modalities', type: 'string[]', description: <>Supported modalities, including <code>video</code> and <code>image</code>.</> },
]

const REQUEST_ROWS: FieldRow[] = [
  { name: 'model', type: 'string', required: true, description: <>Use <code>grok-image-video</code> or another ID returned by the model list.</> },
  { name: 'prompt', type: 'string', required: true, description: <>The video generation prompt.</> },
  { name: 'seconds', type: 'integer', description: <>Suggested values are 4, 6, 8, 10, 12, or 15 depending on the model and input images.</> },
  { name: 'aspect_ratio', type: 'string', description: <>For example <code>16:9</code> or <code>9:16</code>.</> },
  { name: 'resolution', type: 'string', description: <>Common values are <code>720p</code> and <code>480p</code>.</> },
  { name: 'image_urls', type: 'array<string>', description: <>Public HTTPS image URLs or complete base64 data URLs.</> },
  { name: 'input_reference', type: 'object | string', description: <>Single-reference compatibility field. Do not combine it with another image field.</> },
  { name: 'reference_images', type: 'array<string>', description: <>Multi-reference compatibility field. Do not combine it with <code>input_reference</code>.</> },
]

const CREATE_CURL = `curl -X POST "https://img.gpt88.cc/v1/videos/generations" \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "grok-image-video",
    "prompt": "A cinematic red sports car driving through rainy neon streets at night",
    "seconds": 6,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }'`

const POLL_CURL = `curl "https://img.gpt88.cc/v1/videos/<VIDEO_ID>" \\
  -H "Authorization: Bearer $GPT88_API_KEY"`

const DOWNLOAD_CURL = `curl "https://img.gpt88.cc/v1/videos/<VIDEO_ID>/content" \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -o generated-video.mp4`

export default function GrokVideoPageEn() {
  const keyUrl = buildAgentActivationUrl({
    locale: 'en',
    surface: 'api_grok_video_auth',
    intent: 'image_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/api/grok-video/"
      title="Grok Video API"
      description="Integrate asynchronous Grok video generation with model discovery, task creation, polling, content download, image references, and JavaScript-ready request patterns."
      headings={[
        { id: 'overview', text: 'Overview', level: 2 },
        { id: 'auth', text: 'Authentication', level: 2 },
        { id: 'models', text: 'List available models', level: 2 },
        { id: 'create', text: 'Create a video task', level: 2 },
        { id: 'poll', text: 'Poll task status', level: 2 },
        { id: 'download', text: 'Download the video', level: 2 },
        { id: 'errors', text: 'Common errors', level: 2 },
      ]}
    >
      <Callout tone="info" title="The workflow is asynchronous">
        <p>Submit a task, persist its returned ID, poll until it is completed or failed, then download the video bytes.</p>
      </Callout>

      <h2 id="overview">Overview</h2>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/models" />
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/videos/generations" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/videos/{id}" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/videos/{id}/content" />
      <FieldTable
        rows={[
          { name: 'Base URL', type: 'string', required: true, description: <code>https://img.gpt88.cc</code> },
          { name: 'Authentication', type: 'header', required: true, description: <code>Authorization: Bearer &lt;YOUR_API_KEY&gt;</code> },
          { name: 'Request format', type: 'string', required: true, description: <code>application/json</code> },
          { name: 'Task type', type: 'async', required: true, description: <>The create endpoint returns a task object before the final video is ready.</> },
        ]}
      />

      <h2 id="auth">Authentication</h2>
      <p>
        Create or copy an API key in <a href={keyUrl} target="_blank" rel="noreferrer">Agent API Keys</a> and send it as a Bearer token.
        Keep the key on your backend; do not expose it in a browser bundle or mobile app.
      </p>
      <CodeBlock lang="bash" filename="auth-header.txt" code="Authorization: Bearer <YOUR_API_KEY>" />

      <h2 id="models">List available models</h2>
      <CodeBlock lang="bash" filename="list-models.sh" code={'curl -H "Authorization: Bearer $GPT88_API_KEY" https://img.gpt88.cc/v1/models'} />
      <FieldTable rows={MODEL_ROWS} />
      <p>Use the live model response instead of hard-coding a model list. The examples below use <code>grok-image-video</code>.</p>

      <h2 id="create">Create a video task</h2>
      <FieldTable rows={REQUEST_ROWS} />
      <CodeBlock lang="bash" filename="create-video.sh" code={CREATE_CURL} />
      <Callout tone="warn" title="Reference-image constraints">
        <ul>
          <li><code>grok-video-1.5</code> accepts exactly one reference image and is intended for single-image video.</li>
          <li><code>grok-image-video</code> accepts text-to-video, single-reference, and multi-reference workflows.</li>
          <li>Do not send <code>image_urls</code>, <code>images</code>, <code>input_reference</code>, and <code>reference_images</code> together.</li>
        </ul>
      </Callout>

      <h2 id="poll">Poll task status</h2>
      <p>
        Save <code>id</code> first. For compatibility with older responses, also accept <code>request_id</code> or <code>task_id</code> when selecting the ID.
        Poll every five seconds for up to five minutes, and do not submit a duplicate generation task while the original is running.
      </p>
      <CodeBlock lang="bash" filename="poll-video.sh" code={POLL_CURL} />
      <p>
        Treat <code>status: completed</code> as success. <code>failed</code>, <code>cancelled</code>, and <code>expired</code> are terminal failures.
        A progress value of 100 does not prove that the task succeeded; always inspect the status field.
      </p>

      <h2 id="download">Download the video</h2>
      <p>When the task is completed, request the content endpoint and save the response as binary data.</p>
      <CodeBlock lang="bash" filename="download-video.sh" code={DOWNLOAD_CURL} />
      <p>
        If a response includes a relative <code>url</code> or <code>video_url</code>, resolve it against the image API host.
        The content endpoint is usually the most stable way to download the final file.
      </p>

      <h2 id="errors">Common errors</h2>
      <ul>
        <li><strong>401:</strong> recopy the API key and check the Bearer header.</li>
        <li><strong>403:</strong> inspect account permissions, balance, and model availability.</li>
        <li><strong>400 prompt or model required:</strong> send both fields and copy the exact model ID from <Link to="/en/docs/api/list-models/">GET /v1/models</Link>.</li>
        <li><strong>Reference image fetch failed:</strong> use a directly reachable HTTPS URL or a complete data URL.</li>
        <li><strong>Timeout:</strong> keep the task ID and continue polling instead of submitting the same generation again.</li>
        <li><strong>JSON returned from download:</strong> verify the task is completed and that you called <code>/v1/videos/&lt;id&gt;/content</code> with the key.</li>
      </ul>
    </DocPage>
  )
}
