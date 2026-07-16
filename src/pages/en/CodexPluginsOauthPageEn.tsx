import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SYMPTOM = `Typical state:

1. You routed Codex through gpt88.cc with CC-Switch
2. API-key mode uses https://api.gpt88.cc; OAuth mode does not configure an API Base URL
3. The API key is a gpt88.cc sk-... key
4. Model calls work
5. But plugin / app capability is missing or unavailable`

const INSTALL_CODEX = `node -v
npm -v
npm install -g @openai/codex
codex --version`

const ENABLE_OAUTH = `codex logout
codex --login

# choose:
# Sign in with ChatGPT

# do not paste a gpt88.cc API key during this flow`

const CC_SWITCH_FLOW = `1. Open CC-Switch
2. Go to Codex / Routes / route settings
3. Disable the current API-key route if it is active
4. Create a new profile such as chatgpt-oauth
5. Choose ChatGPT OAuth as the auth type
6. Keep the official default base URL
7. Enable the route
8. Save and apply
9. Complete ChatGPT login in the browser
10. Restart Codex and verify plugin visibility`

const ENV_CHECK = `unset OPENAI_API_KEY
unset OPENAI_BASE_URL
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL`

const DUAL_PROFILE = `Recommended two-profile setup:

profile: gpt88-api
  purpose: model access through gpt88.cc
  strength: flexible routing, multi-model access, transparent cost view
  limit: no ChatGPT OAuth plugin identity

profile: chatgpt-oauth
  purpose: Codex plugins / apps / ChatGPT account features
  strength: plugin capability and ChatGPT workspace identity
  limit: usage and permissions follow the official ChatGPT / Codex account system`

export default function CodexPluginsOauthPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-plugins-oauth"
      title="Codex Plugins and ChatGPT OAuth Login"
      description="If Codex can call models through gpt88.cc but plugin capability is missing, switch from API key mode to ChatGPT OAuth and keep CC-Switch on the OAuth route."
      headings={[
        { id: 'problem', text: 'Problem pattern', level: 2 },
        { id: 'why', text: 'Why API key mode cannot unlock plugins', level: 2 },
        { id: 'prepare', text: 'Prepare three things first', level: 2 },
        { id: 'install-codex', text: 'Install Codex CLI', level: 3 },
        { id: 'enable-oauth', text: 'Enable ChatGPT OAuth', level: 3 },
        { id: 'enable-cc-switch-route', text: 'Enable the CC-Switch OAuth route', level: 3 },
        { id: 'switch', text: 'Switch to ChatGPT OAuth', level: 2 },
        { id: 'env', text: 'Clear environment overrides', level: 2 },
        { id: 'verify', text: 'Verify plugin recovery', level: 2 },
        { id: 'two-profiles', text: 'Keep two separate profiles', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Clear boundary">
        <p>
          A gpt88.cc API key solves model access. Codex plugins depend on ChatGPT / Codex OAuth identity and
          the permissions attached to that identity. These are two different systems.
        </p>
      </Callout>

      <h2 id="problem">Problem pattern</h2>
      <CodeBlock lang="text" filename="typical-symptom" code={SYMPTOM} />
      <p>
        This usually does not mean your gpt88.cc API key is broken. It means you are still in API-key model
        mode while trying to use a product feature that requires ChatGPT OAuth identity.
      </p>

      <h2 id="why">Why API key mode cannot unlock plugins</h2>
      <p>
        API key mode only proves that a request may call a model and consume quota. It does not carry your
        ChatGPT account session, workspace identity, or plugin authorization state.
      </p>

      <h2 id="prepare">Prepare three things first</h2>
      <p>
        To restore plugin capability, do not only change the Base URL. You need a working Codex CLI install, a
        ChatGPT OAuth login, and the correct CC-Switch route if you use CC-Switch.
      </p>

      <h3 id="install-codex">Install Codex CLI</h3>
      <CodeBlock lang="bash" filename="terminal" code={INSTALL_CODEX} />

      <h3 id="enable-oauth">Enable ChatGPT OAuth</h3>
      <CodeBlock lang="bash" filename="terminal" code={ENABLE_OAUTH} />
      <p>During login, choose <strong>Sign in with ChatGPT</strong>. Do not paste the gpt88.cc API key in this flow.</p>

      <h3 id="enable-cc-switch-route">Enable the CC-Switch OAuth route</h3>
      <CodeBlock lang="text" filename="cc-switch-flow" code={CC_SWITCH_FLOW} />
      <p>
        The OAuth profile should use the official default login flow. Do not point the OAuth profile itself at
        <code>https://api.gpt88.cc</code>.
      </p>

      <h2 id="switch">Switch to ChatGPT OAuth</h2>
      <p>
        The goal is simple: exit API-key login mode and re-enter Codex with ChatGPT OAuth. If the interface
        keeps asking for an API key, you are still on the wrong path.
      </p>

      <h2 id="env">Clear environment overrides</h2>
      <p>
        Even after switching the visible login flow, environment variables may continue forcing API-key mode.
        Clear them before restarting Codex.
      </p>
      <CodeBlock lang="bash" filename="terminal" code={ENV_CHECK} />

      <h2 id="verify">Verify plugin recovery</h2>
      <ol>
        <li>Restart Codex.</li>
        <li>Confirm the session shows a ChatGPT login state rather than only API-key routing.</li>
        <li>Open the plugin or app area again.</li>
        <li>If it is still missing, verify that the OAuth route is the active one and that no API-key env vars remain.</li>
      </ol>

      <h2 id="two-profiles">Keep two separate profiles</h2>
      <CodeBlock lang="text" filename="dual-profile" code={DUAL_PROFILE} />
      <p>
        In practice, keeping one profile for model access and one profile for ChatGPT OAuth avoids a lot of
        confusion and makes switching intent explicit.
      </p>
      <p>
        For related setup work, continue with <Link to={localizePath('/docs/integrations/dev/codex-cli/', 'en')}>Codex CLI</Link> and{' '}
        <Link to={localizePath('/docs/integrations/dev/cc-switch/', 'en')}>CC-Switch</Link>.
      </p>
    </DocPage>
  )
}
