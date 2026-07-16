import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREPARE = `1. Install Codex CLI
2. Prepare a gpt88.cc API key
3. Decide whether you need API key mode or OAuth mode
4. Confirm the OpenAI-compatible Base URL: https://api.gpt88.cc
5. Prepare one minimal verification task, such as "create hello.txt"`

const INSTALL = `# macOS / Linux
npm install -g @openai/codex

# verify
codex --version`

const API_CONFIG = `[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[profiles.gpt88]
model_provider = "OpenAI"
model = "gpt-5-2-chat-latest"`

const ENV = `export OPENAI_API_KEY="sk-your-gpt88-api-key"
export OPENAI_BASE_URL="https://api.gpt88.cc"`

const VERIFY = `codex --profile gpt88

# after the session opens, ask:
Create a file named hello.txt with the content "hello gpt88", then check whether the file was written successfully.`

const OAUTH_NOTES = `1. For pure model access: use API key mode
2. For ChatGPT account plugin capability: log out of API key mode and use OAuth
3. In OAuth mode, do not keep OPENAI_API_KEY or OPENAI_BASE_URL in the environment
4. If you use CC-Switch, confirm the route is enabled
5. After switching modes, start a fresh Codex session and verify again`

const TROUBLESHOOTING = `1. New sessions reconnect repeatedly
   - Check proxy variables and old API key variables
   - Clear them and reopen the terminal

2. Tools suddenly become unavailable and code cannot be written
   - Ask Codex to check whether file tools are currently available
   - After tools recover, explicitly tell Codex: tools are restored, start implementing from step one
   - This is usually a session tool-state issue, not a model issue

3. 401 response
   - API key is wrong or lacks permission

4. 404 response
   - Base URL or model name is wrong

5. Plugin features are unavailable
   - This is expected if you are logged in with API key mode
   - Exit API key login and switch to OAuth`

export default function CodexCliPageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/codex-cli"
      title="Codex CLI with gpt88.cc"
      description="Connect Codex CLI to gpt88.cc, switch between API key and OAuth modes, understand plugin limits, and recover tool execution when sessions break."
      headings={[
        { id: 'overview', text: 'Bottom line first', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'install', text: 'Step 1: Install Codex CLI', level: 2 },
        { id: 'configure', text: 'Step 2: Configure API key mode', level: 2 },
        { id: 'verify', text: 'Step 3: Verify file tools', level: 2 },
        { id: 'oauth', text: 'OAuth and plugin capability', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'references', text: 'Further reading', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="warn" title="API key and OAuth solve different problems">
        <p>
          API key mode is the direct way to route Codex CLI model access through gpt88.cc. If you need
          ChatGPT account plugin capability, you must sign out of API key mode and use OAuth instead.
        </p>
      </Callout>

      <Callout tone="tip" title="Supplementary external reference">
        <p>
          For a broader Codex workflow reference, review{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>.
        </p>
      </Callout>

      <h2 id="overview">Bottom line first</h2>
      <p>
        The core path is simple: install the CLI, point it at <code>https://api.gpt88.cc</code>, and verify
        the toolchain with a task that actually reads and writes files. If plugin capability is missing, first
        check whether you are still in API key mode.
      </p>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="install">Step 1: Install Codex CLI</h2>
      <p>If Codex CLI is not installed yet, install it and confirm the command exists.</p>
      <CodeBlock lang="bash" filename="install.sh" code={INSTALL} />

      <h2 id="configure">Step 2: Configure API key mode</h2>
      <p>
        API key mode is for normal model usage. The two key checks are whether <code>base_url</code> includes
        <code>/v1</code> and whether the model name is a real model ID currently supported by gpt88.cc.
      </p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={API_CONFIG} />
      <p>If you prefer environment variables, set them in the terminal session:</p>
      <CodeBlock lang="bash" filename=".envrc" code={ENV} />

      <h2 id="verify">Step 3: Verify file tools</h2>
      <p>
        Do not stop at a simple chat reply. Codex is an agent, so the critical check is whether it can read
        files, write files, and continue an implementation task.
      </p>
      <CodeBlock lang="bash" filename="verify.sh" code={VERIFY} />
      <ol>
        <li>Start Codex CLI.</li>
        <li>Ask it to create a small file.</li>
        <li>Ask it to read the file back and confirm the content.</li>
        <li>If file tools are unavailable, fix tool state first instead of changing models.</li>
      </ol>

      <h2 id="oauth">OAuth and plugin capability</h2>
      <CodeBlock lang="text" filename="oauth-notes" code={OAUTH_NOTES} />
      <p>
        If your real goal is plugin capability, continue with the{' '}
        <Link to={localizePath('/docs/guides/codex-plugins-oauth/', 'en')}>Codex OAuth plugin guide</Link>.
        If you only need stable model access through gpt88.cc, API key mode is the simpler route.
      </p>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="references">Further reading</h2>
      <ul>
        <li>
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>{' '}
          for broader Codex onboarding, CLI configuration, and workflow practices.
        </li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/guides/codex-tool-recovery/', 'en')}>Read the tool recovery guide</Link>.</li>
        <li><Link to={localizePath('/docs/guides/codex-plugins-oauth/', 'en')}>Read the OAuth plugin guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/dev/cc-switch/', 'en')}>Read the CC-Switch route guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
