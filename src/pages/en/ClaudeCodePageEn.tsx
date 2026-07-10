import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SETUP = `1. Install Claude Code
2. Prepare either an API key or OAuth login
3. For gpt88.cc, use the compatible OpenAI/Claude routing mode
4. If you need plugin capability, use OAuth instead of API key login
5. Validate the toolchain with one minimal task first`

const CHECKLIST = `1. Decide whether you need model access or plugin capability
2. Prefer API key mode for pure model calls
3. Prefer OAuth mode for plugins and account-linked features
4. Clear old environment variables before switching modes
5. Use a minimal task to verify the switch`

const TROUBLESHOOTING = `1. Plugins are unavailable
   - Confirm whether you are still in API key mode
   - If you need plugins, switch to OAuth

2. Repeated reconnect loops
   - Check proxy variables
   - Check whether an old session config is polluting the environment

3. Model calls fail
   - Check Base URL and API key first
   - Then verify the model name`

export default function ClaudeCodePageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/claude-code"
      title="Claude Code with gpt88.cc"
      description="How to use Claude Code with gpt88.cc for model access, OAuth login, plugins, and routing decisions."
      headings={[
        { id: 'overview', text: 'What this page covers', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'setup', text: 'Quick setup', level: 2 },
        { id: 'notes', text: 'Mode differences', level: 2 },
        { id: 'verify', text: 'Verification', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Separate the two modes">
        <p>
          API key mode is primarily for model access. OAuth mode is primarily for plugins and account-linked
          features. Do not troubleshoot them as if they were the same path.
        </p>
      </Callout>

      <p>
        The most common mistake in Claude Code is treating “model access” and “plugin login” as one problem.
        If you only need the model, API key mode is enough. If you need plugins or account features, you need
        OAuth.
      </p>

      <h2 id="overview">What this page covers</h2>
      <ul>
        <li>How to route Claude Code model calls through gpt88.cc.</li>
        <li>Why plugin capability is tied to OAuth instead of raw API key mode.</li>
        <li>What should be cleaned before switching modes.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">Quick setup</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="notes">Mode differences</h2>
      <ul>
        <li>API key mode: better for direct model routing through gpt88.cc.</li>
        <li>OAuth mode: better for plugins, extensions, and ChatGPT account-linked features.</li>
      </ul>

      <h2 id="verify">Verification</h2>
      <ol>
        <li>Run one small task and confirm the model responds normally.</li>
        <li>If the plugin panel is missing, switch to the OAuth path.</li>
        <li>After switching, restart the session and verify no old environment variables remain.</li>
      </ol>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/guides/codex-plugins-oauth/', 'en')}>Read the Codex OAuth plugin guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
