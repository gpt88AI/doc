import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { localizePath } from '../../lib/locale'

const CURL_REQ = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.6-sol",
    "messages": [{"role": "user", "content": "Introduce gpt88.cc in one sentence."}]
  }'`

const PY = `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="gpt-5.6-sol",
    messages=[{"role": "user", "content": "Introduce gpt88.cc in one sentence."}],
)
print(resp.choices[0].message.content)`

export default function QuickstartPageEn() {
  return (
    <DocPage
      path="/docs/quickstart"
      title="Quickstart"
      description="Make your first gpt88.cc API request in 5 minutes by replacing only the base_url and API key."
      headings={[
        { id: 'prereq', text: 'Get an API key', level: 2 },
        { id: 'endpoints', text: 'Endpoints', level: 2 },
        { id: 'curl', text: 'cURL request', level: 2 },
        { id: 'sdk', text: 'Official SDK', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <h2 id="prereq">Get an API key</h2>
      <p>
        Go to <a href="https://gpt88.cc" target="_blank" rel="noreferrer">gpt88.cc</a>, create an API key,
        and export it into your shell environment.
      </p>
      <CodeBlock lang="bash" code={`export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`} />

      <h2 id="endpoints">Endpoints</h2>
      <ul>
        <li><code>https://gpt88.cc/v1</code> — default global endpoint</li>
        <li><code>https://china.claudecoder.me/v1</code> — China-priority route</li>
        <li><code>https://world.claudecoder.me/v1</code> — overseas-priority route</li>
        <li><code>https://test1122.up.railway.app/v1</code> — overseas direct route</li>
        <li><code>https://ai.orbitlink.me/v1</code> — overseas CDN route</li>
      </ul>

      <h2 id="curl">cURL request</h2>
      <CodeBlock lang="bash" code={CURL_REQ} />

      <h2 id="sdk">Official SDK</h2>
      <p>
        Any OpenAI-compatible SDK can be used by pointing <code>base_url</code> to <code>https://gpt88.cc/v1</code>.
      </p>
      <CodeBlock lang="python" filename="main.py" code={PY} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/api/chat-completions/', 'en')}>Read the Chat Completions API reference</Link>.</li>
        <li><Link to={localizePath('/models/', 'en')}>Browse available models</Link>.</li>
        <li><Link to={localizePath('/docs/auth/', 'en')}>Review auth and billing behavior</Link>.</li>
      </ul>
    </DocPage>
  )
}
