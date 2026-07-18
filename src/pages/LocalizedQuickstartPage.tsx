import { Link } from 'react-router-dom'
import { DocPage } from '../components/layout/DocPage'
import { CodeBlock } from '../components/ui/CodeBlock'
import { localizedContentPath, localizePath, useLocale } from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'

const CURL_REQ = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.6-sol",
    "messages": [{"role": "user", "content": "Hello from gpt88.cc"}]
  }'`

const PYTHON = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.gpt88.cc",
    api_key="YOUR_GPT88_API_KEY",
)

response = client.chat.completions.create(
    model="gpt-5.6-sol",
    messages=[{"role": "user", "content": "Hello from gpt88.cc"}],
)
print(response.choices[0].message.content)`

export default function LocalizedQuickstartPage() {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale).quickstart

  return (
    <DocPage
      path="/docs/quickstart"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'key', text: copy.headings.key, level: 2 },
        { id: 'endpoints', text: copy.headings.endpoints, level: 2 },
        { id: 'curl', text: copy.headings.curl, level: 2 },
        { id: 'sdk', text: copy.headings.sdk, level: 2 },
        { id: 'next', text: copy.headings.next, level: 2 },
      ]}
    >
      <h2 id="key">{copy.headings.key}</h2>
      <p>{copy.keyBody} <a href="https://gpt88.cc" target="_blank" rel="noreferrer">gpt88.cc</a>.</p>
      <CodeBlock lang="bash" code="export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx" />

      <h2 id="endpoints">{copy.headings.endpoints}</h2>
      <p>{copy.endpointBody}</p>
      <ul>
        <li><code>https://api.gpt88.cc</code> — {copy.endpointStandard}</li>
        <li><code>https://img.gpt88.cc</code> — {copy.endpointMedia}</li>
      </ul>

      <h2 id="curl">{copy.headings.curl}</h2>
      <p>{copy.curlBody}</p>
      <CodeBlock lang="bash" code={CURL_REQ} />

      <h2 id="sdk">{copy.headings.sdk}</h2>
      <p>{copy.sdkBody}</p>
      <CodeBlock lang="python" filename="main.py" code={PYTHON} />

      <h2 id="next">{copy.headings.next}</h2>
      <p>{copy.nextBody}</p>
      <ul>
        <li><Link to={localizedContentPath('/docs/api/chat-completions/', locale)}>{copy.nextLinks.api}</Link>.</li>
        <li><Link to={localizedContentPath('/models/', locale)}>{copy.nextLinks.models}</Link>.</li>
        <li><Link to={localizePath('/docs/auth/', locale)}>{copy.nextLinks.billing}</Link>.</li>
      </ul>
    </DocPage>
  )
}
