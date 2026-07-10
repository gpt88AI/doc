import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://gpt88.cc/v1
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`

const FLOW = `1. Open VS Code
2. Open Cline settings
3. Choose OpenAI Compatible as the provider
4. Fill in Base URL and API key
5. Add a default model
6. Ask Cline to read one small file first`

const TROUBLESHOOTING = `1. Cline does not use tools
   - Confirm VS Code permissions and workspace access first

2. Model connection fails
   - Validate gpt88.cc with curl before debugging the editor

3. Cost is too high
   - Reduce context size
   - Use a smaller model for simple tasks`

export default function ClinePageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/cline"
      title="Cline with gpt88.cc"
      description="Model access and agent workflow configuration for using Cline with gpt88.cc."
      headings={[
        { id: 'setup', text: 'Configuration', level: 2 },
        { id: 'verify', text: 'Verification', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Validate with a small task first">
        <p>
          Cline reads files, writes files, and uses tools. Validate model routing and workspace permissions
          with a low-risk task before giving it broad code changes.
        </p>
      </Callout>

      <h2 id="setup">Configuration</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="verify">Verification</h2>
      <ol>
        <li>Ask Cline to explain the current project README.</li>
        <li>Ask it to modify one safe low-risk file.</li>
        <li>Confirm the file is actually written before using it for larger tasks.</li>
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
