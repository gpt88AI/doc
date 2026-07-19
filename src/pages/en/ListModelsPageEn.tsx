import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { CodeTabs } from '../../components/ui/CodeTabs'
import { Callout } from '../../components/ui/Callout'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../components/ui/FieldTable'
import { buildAgentActivationUrl } from '../../lib/activationLinks'
import { localizePath } from '../../lib/locale'

const RESP_FIELDS: FieldRow[] = [
  { name: 'object', type: 'string', required: true, description: <>Always <code>"list"</code>.</> },
  { name: 'data', type: 'array&lt;Model&gt;', required: true, description: <>Models currently visible to the calling API key.</> },
]

const MODEL_FIELDS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>Model ID used in the <code>model</code> request field.</> },
  { name: 'owned_by', type: 'string', description: <>Upstream provider name.</> },
  { name: 'capabilities', type: 'string[]', description: <>gpt88 extension field, such as <code>chat</code>, <code>function_calling</code>, <code>vision</code>.</> },
  { name: 'context_window', type: 'integer', description: <>Current context size exposed by gateway config.</> },
  { name: 'modalities', type: 'string[]', description: <>Supported modalities such as text, image, audio, or video.</> },
]

const RESPONSE = `{
  "object": "list",
  "data": [
    {
      "id": "gpt-5.6-sol",
      "object": "model",
      "owned_by": "openai",
      "capabilities": ["chat", "streaming", "json_mode"],
      "context_window": 131072,
      "modalities": ["text"]
    }
  ]
}`

const TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl https://api.gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `from openai import OpenAI
client = OpenAI(base_url="https://api.gpt88.cc", api_key="YOUR_GPT88_API_KEY")
models = client.models.list()
for m in models.data:
    print(m.id, m.owned_by)`,
  },
]

export default function ListModelsPageEn() {
  const keyUrl = buildAgentActivationUrl({
    locale: 'en',
    surface: 'api_list_models_auth',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/api/list-models"
      title="GET /v1/models"
      description="List all models available to the current API key. gpt88.cc extends the response with capabilities and context metadata."
      headings={[
        { id: 'endpoint', text: 'Endpoint', level: 2 },
        { id: 'examples', text: 'Examples', level: 2 },
        { id: 'response', text: 'Response', level: 2 },
        { id: 'fields', text: 'Fields', level: 2 },
      ]}
    >
      <h2 id="endpoint">Endpoint</h2>
      <EndpointBadge method="GET" path="https://api.gpt88.cc/v1/models" />
      <p>
        Create a key in <a href={keyUrl} target="_blank" rel="noreferrer">Agent API Keys</a> before running
        the examples. The returned model list is permission-filtered, so different keys may see different
        subsets based on console permissions.
      </p>

      <h2 id="examples">Examples</h2>
      <CodeTabs tabs={TABS} />

      <h2 id="response">Response</h2>
      <CodeBlock lang="json" filename="200 OK" code={RESPONSE} />

      <h2 id="fields">Fields</h2>
      <FieldTable rows={RESP_FIELDS} />
      <FieldTable rows={MODEL_FIELDS} />

      <Callout tone="info" title="Treat the model list as dynamic">
        <p>
          Models may be added, removed, or updated. Cache the result briefly, and refresh it when you
          receive <code>model_not_found</code> or permission-related errors.
        </p>
      </Callout>
      <ul>
        <li>Use <code>capabilities</code> to filter for tool use, streaming, or vision support.</li>
        <li>Use <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link> for fallback handling.</li>
      </ul>
    </DocPage>
  )
}
