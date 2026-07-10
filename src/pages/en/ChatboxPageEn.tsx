import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREPARE = `1. Install the ChatBox desktop app
2. Create a gpt88.cc API key
3. Confirm the exact model ID you want to use
4. Know whether your client is using OpenAI-style or Claude-style settings
5. Prepare one minimal test prompt`

const OPENAI_CONFIG = `Provider: OpenAI API
API Key: sk-your-gpt88-api-key
API Host / API Domain: https://gpt88.cc/v1
Model: claude-haiku-4-5-20251001 or gpt-5-2-chat-latest`

const CLAUDE_CONFIG = `If your ChatBox build exposes a Claude API option:

Provider: Claude API
API Key: sk-your-gpt88-api-key
API Host / API Domain: https://gpt88.cc
Model: claude-sonnet-4-6 or claude-haiku-4-5-20251001`

const SMOKE_TEST = `export GPT88_API_KEY="sk-your-gpt88-api-key"

curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [
      {"role": "user", "content": "Introduce gpt88.cc in one sentence."}
    ]
  }'`

const TROUBLESHOOTING = `1. Cannot connect
   - Make sure you used https://gpt88.cc/v1, not just https://gpt88.cc
   - Make sure the API key is complete
   - Verify with curl before going back to ChatBox

2. Model list is empty
   - Enter the model ID manually
   - Copy the real model name from /v1/models or the model catalog

3. 401 response
   - The key is invalid, expired, or lacks permission

4. 404 response
   - Usually the Base URL or model name is wrong

5. Slow responses
   - First test with a lighter model to separate config problems from model latency`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChatboxPageEn() {
  return (
    <DocPage
      path="/docs/integrations/chat/chatbox"
      title="Use gpt88.cc in ChatBox"
      description="A complete ChatBox setup guide for gpt88.cc: provider selection, base URL, model choice, connection checks, and troubleshooting."
      headings={[
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'launch', text: 'Step 1: Open ChatBox and enter settings', level: 2 },
        { id: 'configure', text: 'Step 2: Configure gpt88.cc', level: 2 },
        { id: 'provider', text: '2.1 Choose the provider type', level: 3 },
        { id: 'api-info', text: '2.2 Fill in API settings', level: 3 },
        { id: 'model', text: '2.3 Select the model', level: 3 },
        { id: 'start', text: 'Step 3: Run the first test', level: 2 },
        { id: 'advanced', text: 'Advanced notes', level: 2 },
        { id: 'faq', text: 'Common questions', level: 2 },
        { id: 'tips', text: 'Usage tips', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting checklist', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Most reliable ChatBox setup">
        <p>
          In most cases, point ChatBox to <code>https://gpt88.cc/v1</code> through its OpenAI-compatible
          settings. If the model ID is correct, you usually do not need to change your chat workflow.
        </p>
      </Callout>

      <p>
        The goal here is not just to mention a config field. It is to take ChatBox from a blank setup to a
        working state: API key, base URL, model ID, then one verification round.
      </p>

      <h2 id="prepare">Preparation</h2>
      <p>Confirm these items before you start:</p>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />
      <DocTable
        headers={['Requirement', 'Recommended setting', 'Why it matters']}
        rows={[
          [
            <strong key="k1">ChatBox desktop app</strong>,
            'Use the latest stable release',
            'Newer versions usually handle custom API hosts and model settings more cleanly.',
          ],
          [
            <strong key="k2">API key</strong>,
            'Create a dedicated key in the gpt88.cc console',
            'This makes revocation, budgeting, and usage tracing easier per project.',
          ],
          [
            <strong key="k3">Model ID</strong>,
            'Start with a stable model such as gpt-5-2-chat-latest or claude-haiku-4-5-20251001',
            'First validate connectivity, then move to stronger or more expensive models.',
          ],
          [
            <strong key="k4">Base URL</strong>,
            'For OpenAI style, use https://gpt88.cc/v1',
            'This is the most universal and lowest-friction path in ChatBox.',
          ],
        ]}
      />

      <Callout tone="warn" title="Choose the protocol first">
        <p>
          If you are using an OpenAI-style model, start with <code>https://gpt88.cc/v1</code>. If you
          explicitly need Claude-style routing, then switch to the root host. Do not mix the two formats.
        </p>
      </Callout>

      <h2 id="launch">Step 1: Open ChatBox and enter settings</h2>
      <p>
        On first launch, ChatBox usually shows a setup wizard. If it has already been configured, reopen the
        settings panel. The immediate target is simple: set the provider and the API host correctly.
      </p>
      <ol>
        <li>Launch ChatBox.</li>
        <li>If this is the first run, enter the setup wizard or create a new chat.</li>
        <li>If it is already configured, open settings from the lower-left corner.</li>
        <li>Find the AI Provider or model provider section.</li>
      </ol>

      <h2 id="configure">Step 2: Configure gpt88.cc</h2>
      <h3 id="provider">2.1 Choose the provider type</h3>
      <p>
        For gpt88.cc, the most common option is <strong>OpenAI API</strong>. If your ChatBox build also
        exposes a Claude API option and you specifically want Claude-family models, you can switch to that
        route.
      </p>

      <h3 id="api-info">2.2 Fill in API settings</h3>
      <p>Recommended first pass: OpenAI-compatible settings.</p>
      <CodeBlock lang="text" filename="openai-config" code={OPENAI_CONFIG} />
      <p>If you intentionally want the Claude-style route, use this instead:</p>
      <CodeBlock lang="text" filename="claude-config" code={CLAUDE_CONFIG} />
      <p>The two most common mistakes are the host shape and the exact model name:</p>
      <DocTable
        headers={['Field', 'OpenAI style', 'Claude style']}
        rows={[
          ['API Key', 'Use the key generated in gpt88.cc', 'Use the same gpt88.cc key'],
          ['API Host / Domain', 'https://gpt88.cc/v1', 'https://gpt88.cc'],
          ['Model', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001'],
        ]}
      />

      <Callout tone="warn" title="Do not miss the path suffix">
        <p>
          OpenAI-compatible routing usually requires <code>/v1</code>; Claude-style routing usually uses the
          root host. Getting this wrong typically leads to connection errors, 404 responses, or empty model
          lists.
        </p>
      </Callout>

      <h3 id="model">2.3 Select the model</h3>
      <p>
        After the host is set, the next critical step is the model ID. ChatBox supports manual entry, and
        direct pasting is often faster than waiting for a model list to refresh.
      </p>
      <DocTable
        headers={['Use case', 'Recommended model', 'Why']}
        rows={[
          ['Quick validation', 'gpt-4o-mini / claude-haiku-4-5-20251001', 'Fast response, ideal for first-run connectivity checks.'],
          ['General chat', 'gpt-5-2-chat-latest / claude-sonnet-4-6', 'Good default choice for summarization, writing, and daily conversation.'],
          ['Long-context tasks', 'claude-sonnet-4-6', 'Better fit for long documents and more complex reasoning flows.'],
        ]}
      />

      <h2 id="start">Step 3: Run the first test</h2>
      <p>
        After saving the config, go back to the main screen and send one minimal request. Confirm a normal
        response first, then tune temperature, output length, or switch models.
      </p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={SMOKE_TEST} />
      <ol>
        <li>Create a new chat.</li>
        <li>Send a simple request such as “Introduce gpt88.cc in one sentence.”</li>
        <li>Confirm that the response returns normally.</li>
        <li>Only after that should you move to larger prompts or different models.</li>
      </ol>

      <h2 id="advanced">Advanced notes</h2>
      <DocTable
        headers={['Parameter', 'Effect', 'Practical starting point']}
        rows={[
          ['Temperature', 'Controls randomness', '0.7 for creative tasks, 0.3 for precise answers'],
          ['Max Tokens', 'Caps output length', 'Start around 2000-4000'],
          ['Top P', 'Controls sampling breadth', 'Default 0.9 is usually fine'],
        ]}
      />

      <h2 id="faq">Common questions</h2>
      <ul>
        <li>Can I use Claude-family models in ChatBox? Yes, as long as you use the correct host style and the exact model ID.</li>
        <li>Do I need the model list dropdown? No. Manual model ID entry is often the fastest route.</li>
        <li>Should I start with the strongest model? No. Start with a cheaper stable model so you can separate config issues from model behavior.</li>
      </ul>

      <h2 id="tips">Usage tips</h2>
      <ul>
        <li>Keep one dedicated ChatBox profile for gpt88.cc instead of mixing providers in one config.</li>
        <li>Copy real model IDs directly from the model catalog to avoid hidden typos.</li>
        <li>When troubleshooting, verify with curl first, then come back to the UI client.</li>
      </ul>

      <h2 id="troubleshoot">Troubleshooting checklist</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/api/chat-completions/', 'en')}>Read the Chat Completions API reference</Link>.</li>
        <li><Link to={localizePath('/models/', 'en')}>Browse available model IDs</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
