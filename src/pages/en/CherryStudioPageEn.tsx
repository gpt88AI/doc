import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const QUICK_SETUP = `1. Open Cherry Studio
2. Go to model provider / API settings
3. Choose OpenAI Compatible
4. Set Base URL to https://gpt88.cc/v1
5. Paste the API key from the gpt88.cc console
6. Start with one stable chat model
7. Send one minimal test message`

const EXAMPLE = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"Introduce gpt88.cc"}]
  }'`

const CHECKLIST = `1. Set the provider to OpenAI Compatible
2. Make sure Base URL is exactly https://gpt88.cc/v1
3. Use a real API key from the console
4. Start with a known stable chat model
5. Send one minimal message to verify
6. If it fails, validate with curl first`

const TROUBLESHOOTING = `1. Model list is blank
   - Enter the model ID manually
   - Copy the exact name from the model catalog

2. 401 response
   - Key is invalid or expired

3. 404 response
   - Base URL is wrong or /v1 is missing

4. Replies are slow
   - Switch to a lighter model first
   - Disable knowledge base and long multi-turn context for the first test`

export default function CherryStudioPageEn() {
  return (
    <DocPage
      path="/docs/integrations/chat/cherry-studio"
      title="Cherry Studio with gpt88.cc"
      description="Connect gpt88.cc into Cherry Studio through the OpenAI-compatible workflow for multi-model usage, prompt templates, and routine chat scenarios."
      headings={[
        { id: 'overview', text: 'What this guide covers', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'setup', text: 'Quick setup', level: 2 },
        { id: 'verify', text: 'Verify connectivity', level: 2 },
        { id: 'tips', text: 'Usage tips', level: 2 },
        { id: 'faq', text: 'Common questions', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Most reliable setup">
        <p>
          Cherry Studio usually works best through the OpenAI-compatible path. First make
          <code> https://gpt88.cc/v1 </code>
          work, then expand to more models.
        </p>
      </Callout>

      <p>
        This guide walks the full setup path: opening provider settings, selecting the right route, verifying
        connectivity, and debugging failures without guessing.
      </p>

      <h2 id="overview">What this guide covers</h2>
      <ul>
        <li>How to connect Cherry Studio to the gpt88.cc OpenAI-compatible API.</li>
        <li>How to start with one stable model and expand later.</li>
        <li>What to check first when the connection fails.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">Quick setup</h2>
      <CodeBlock lang="text" filename="setup" code={QUICK_SETUP} />
      <p>Use one minimal request to confirm the path first, then import additional models or prompt templates.</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={EXAMPLE} />

      <h2 id="verify">Verify connectivity</h2>
      <ol>
        <li>Save the Cherry Studio provider settings.</li>
        <li>Create a new chat and send one short prompt.</li>
        <li>If that works, then gradually increase prompt or context complexity.</li>
        <li>If it fails, verify the API key and Base URL with curl first.</li>
      </ol>

      <h2 id="tips">Usage tips</h2>
      <ul>
        <li>Pin one default model to reduce unnecessary switching.</li>
        <li>Use stronger models for long-context tasks and cheaper models for fast Q&A.</li>
        <li>Create separate API keys per project for cost tracking and easier revocation.</li>
      </ul>

      <h2 id="faq">Common questions</h2>
      <ul>
        <li>If the model list does not load, enter the model ID manually.</li>
        <li>If you see 404, check whether <code>/v1</code> is present in the Base URL.</li>
        <li>If you see 401, verify that the API key was copied completely.</li>
      </ul>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
        <li><Link to={localizePath('/docs/guides/complete-integration/', 'en')}>Read the complete integration guide</Link>.</li>
      </ul>
    </DocPage>
  )
}
