import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SETUP = `OpenAI API
Base URL: https://gpt88.cc/v1
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6 or gpt-5-2-chat-latest`

const STEPS = `1. Open Cursor settings
2. Find Models / API Keys / OpenAI Compatible settings
3. Paste the gpt88.cc API key
4. Set Base URL to https://gpt88.cc/v1
5. Add the model ID manually
6. Save and test in Composer or Chat`

const TROUBLESHOOTING = `1. Model cannot be selected
   - Add the model ID manually

2. 401 request
   - Key is invalid or overridden by an environment variable

3. 404 request
   - /v1 is missing or the model name is wrong

4. Agent edits are unstable
   - Switch to a stronger model
   - Reduce one-shot context size`

export default function CursorPageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/cursor"
      title="Cursor with gpt88.cc"
      description="Use gpt88.cc as the OpenAI-compatible provider inside Cursor."
      headings={[
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'setup', text: 'Configuration', level: 2 },
        { id: 'verify', text: 'Verification', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Use the OpenAI-compatible route">
        <p>
          The core Cursor setup is just two items: a real API key and
          <code> https://gpt88.cc/v1</code>.
        </p>
      </Callout>

      <h2 id="prepare">Preparation</h2>
      <ul>
        <li>Create a gpt88.cc API key.</li>
        <li>Confirm the exact model ID you want to use.</li>
        <li>Decide on a default model before adding more options.</li>
      </ul>

      <h2 id="setup">Configuration</h2>
      <CodeBlock lang="text" filename="steps" code={STEPS} />
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <p>If you maintain multiple models in Cursor, start with one default model and expand after verification.</p>

      <h2 id="verify">Verification</h2>
      <ol>
        <li>Open Cursor Chat and send one simple question.</li>
        <li>Then open Composer and ask it to explain one small file in the current project.</li>
        <li>If both succeed, move on to real editing tasks.</li>
      </ol>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
