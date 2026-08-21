import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const SYMPTOM = `Reconnecting... 1/5
Reconnecting... 2/5
Reconnecting... 3/5
Reconnecting... 4/5
Reconnecting... 5/5
Thinking...`

const LOCATE_CONFIG = `# macOS / Linux
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# Windows PowerShell
if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "config.toml"
} else {
  Join-Path $HOME ".codex/config.toml"
}

# You can also ask Codex to locate it without editing:
Locate the current Codex config.toml path and tell me only the path. Do not modify the file.`

const BACKUP_CONFIG = `# macOS / Linux
cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml" "$HOME\\.codex\\config.toml.bak"`

const SOURCE_PROVIDER = `# OpenAI / ChatGPT authentication example from the source post
model_provider = "openai_http"

[model_providers.openai_http]
name = "OpenAI HTTP"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false`

const GPT88_PROVIDER = `# gpt88.cc API key example
model = "YOUR_MODEL_ID"
model_provider = "gpt88_http"

[model_providers.gpt88_http]
name = "gpt88 HTTP / Responses"
base_url = "https://api.gpt88.cc"
env_key = "OPENAI_API_KEY"
wire_api = "responses"

# Add this only if your Codex version recognizes it:
# supports_websockets = false`

const ENV_SETUP = `# Set an API key for the current shell
export OPENAI_API_KEY="sk-your-gpt88-api-key"

# Windows PowerShell
$env:OPENAI_API_KEY = "sk-your-gpt88-api-key"`

const VERIFY = `# Verify the Codex version after reopening the terminal
codex --version

# Start a fresh session
codex

# Start with a minimal test:
Reply with one sentence: Codex connection test passed.

# Then verify a read-only tool task:
List the files in the current directory. Only return file names; do not modify anything.`

const DIAGNOSE = `# 1. Confirm that the provider id matches exactly
model_provider = "gpt88_http"
[model_providers.gpt88_http]

# 2. Confirm which config directory is active
printf '%s\\n' "\${CODEX_HOME:-$HOME/.codex}/config.toml"

# 3. Check for stale overrides
env | grep -E '^(OPENAI_API_KEY|OPENAI_BASE_URL|CODEX_HOME)='

# 4. Upgrade Codex if npm is your installation method
npm install -g @openai/codex@latest`

const ROLLBACK = `# macOS / Linux
cp ~/.codex/config.toml.bak ~/.codex/config.toml

# Windows PowerShell
Copy-Item "$HOME\\.codex\\config.toml.bak" "$HOME\\.codex\\config.toml"`

const CHECKLIST = `□ Record the original error, time, model, and network
□ Locate the user-level config.toml and check CODEX_HOME
□ Back up the original configuration
□ Make model_provider and the provider id match exactly
□ Set wire_api = "responses"
□ Use env_key for the gpt88 API key path; do not mix it with requires_openai_auth
□ Verify supports_websockets against the installed Codex version
□ Fully close the old session and restart Codex
□ Confirm a normal text request
□ Confirm a minimal read-only tool request
□ Check workspace changes before resuming the original task`

export default function CodexHttpResponsesReconnectPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-http-responses-reconnect"
      title="Codex keeps reconnecting 5/5: HTTP / Responses troubleshooting"
      description="A practical guide to Codex Reconnecting 1/5 through 5/5 symptoms, WebSocket versus HTTP / Responses transport, config.toml providers, verification, and rollback."
      headings={[
        { id: 'conclusion', text: 'Bottom line first', level: 2 },
        { id: 'symptom', text: 'What the symptom means', level: 2 },
        { id: 'shortest-path', text: 'Fastest recovery path', level: 2 },
        { id: 'locate', text: 'Step 1: Find the user-level config.toml', level: 2 },
        { id: 'backup', text: 'Step 2: Back up the configuration', level: 2 },
        { id: 'configure', text: 'Step 3: Configure an HTTP / Responses provider', level: 2 },
        { id: 'restart', text: 'Step 4: Restart and verify', level: 2 },
        { id: 'decision', text: 'API key, OAuth, and field choices', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting order', level: 2 },
        { id: 'rollback', text: 'Rollback', level: 2 },
        { id: 'checklist', text: 'Acceptance checklist', level: 2 },
        { id: 'references', text: 'Sources and references', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Do not assume that Thinking means the model is slow">
        <p>
          If Codex first shows <code>Reconnecting 1/5</code> through <code>5/5</code> and only then shows{' '}
          <code>Thinking...</code>, investigate transport, proxy, and provider fallback first. Replaying the same
          long task usually adds waiting time and context noise.
        </p>
      </Callout>

      <Callout tone="info" title="This is a prioritized troubleshooting path, not a universal root cause">
        <p>
          This guide summarizes{' '}
          <a
            href="https://x.com/yunxi0623/status/2074818514612035683"
            target="_blank"
            rel="noreferrer"
          >
            the Codex reconnecting article shared by Yunxi on X
          </a>
          . The source attributes the behavior to WebSocket retries followed by an HTTP fallback. Real environments can
          also involve version, proxy, gateway, firewall, authentication, and upstream routing issues. Treat the HTTP /
          Responses switch as an isolation test and verify each layer with a minimal request.
        </p>
      </Callout>

      <h2 id="conclusion">Bottom line first</h2>
      <p>
        When Codex is stuck reconnecting, use this order: stop the old session → back up the user-level{' '}
        <code>config.toml</code> → use an HTTP / Responses provider → fully restart Codex → verify normal text first,
        then a minimal read-only tool call → resume the original task last.
      </p>
      <p>
        The purpose is to separate model behavior from transport behavior. If a minimal HTTP request is not stable,
        do not start by changing prompts, choosing a more complex model, or replaying a long task.
      </p>

      <h2 id="symptom">What the symptom means</h2>
      <CodeBlock lang="text" filename="codex-output.txt" code={SYMPTOM} />
      <p>
        WebSocket is useful for real-time, long-lived interactions and tool calls, but it is more sensitive to proxies,
        network nodes, corporate firewalls, and intermediary gateways. When connection setup fails, the client may go
        through a retry and fallback sequence. Five reconnect attempts do not necessarily mean five rounds of deep model
        reasoning.
      </p>
      <p>
        This is a troubleshooting hypothesis, not a confirmed root cause from terminal text alone. Confidence increases
        only when a provider or network change produces a clear before-and-after result for both normal and tool requests.
      </p>

      <h2 id="shortest-path">Fastest recovery path</h2>
      <ol>
        <li>Stop the Codex process stuck in reconnecting. Preserve the workspace; do not delete the project.</li>
        <li>Find the user-level <code>config.toml</code> and check whether <code>CODEX_HOME</code> is set.</li>
        <li>Back up the file and add a provider; do not delete the original configuration first.</li>
        <li>Set the provider protocol to <code>responses</code>; use <code>supports_websockets = false</code> only if the installed version supports it.</li>
        <li>Close the old Codex session and terminal completely.</li>
        <li>Run one sentence test, then a read-only tool test.</li>
        <li>Resume the original task only after both minimal tests pass.</li>
      </ol>

      <h2 id="locate">Step 1: Find the user-level config.toml</h2>
      <p>
        Codex normally stores user configuration at <code>~/.codex/config.toml</code>. If{' '}
        <code>CODEX_HOME</code> is set, use that directory instead. On Windows, the usual location is{' '}
        <code>%USERPROFILE%\.codex\config.toml</code>.
      </p>
      <CodeBlock lang="bash" filename="locate-config.sh" code={LOCATE_CONFIG} />
      <Callout tone="tip" title="Do not put provider changes only in the project directory">
        <p>
          The current Codex configuration reference says that project-level <code>.codex/config.toml</code> cannot
          override some machine-level provider, authentication, and profile settings. Put provider changes in the
          user-level configuration.
        </p>
      </Callout>

      <h2 id="backup">Step 2: Back up the configuration</h2>
      <p>
        Back up before editing. Also record the Codex version, selected profile, model, and network environment so a
        rollback has a clear before-and-after comparison.
      </p>
      <CodeBlock lang="bash" filename="backup-config.sh" code={BACKUP_CONFIG} />

      <h2 id="configure">Step 3: Configure an HTTP / Responses provider</h2>
      <p>
        The source post gives an OpenAI / ChatGPT authentication provider example. Its main idea is to use the Responses
        protocol and avoid preferring the WebSocket path.
      </p>
      <CodeBlock lang="toml" filename="source-provider.toml" code={SOURCE_PROVIDER} />

      <Callout tone="warn" title="supports_websockets is version-dependent">
        <p>
          The current public Codex configuration reference documents custom providers,{' '}
          <code>wire_api = "responses"</code>, <code>env_key</code>, and{' '}
          <code>requires_openai_auth</code>. The <code>supports_websockets</code> field comes from the source post and
          must be checked against your installed version. If Codex reports an unknown field or fails to parse the file,
          remove that line, keep the Responses provider, and check the current schema or release notes.
        </p>
      </Callout>

      <p>
        If you use Codex through a gpt88.cc API key, do not copy <code>requires_openai_auth = true</code> from the source
        post. Use <code>env_key</code> and the gpt88.cc compatible endpoint instead:
      </p>
      <CodeBlock lang="toml" filename="gpt88-provider.toml" code={GPT88_PROVIDER} />
      <CodeBlock lang="bash" filename="set-api-key.sh" code={ENV_SETUP} />
      <p>
        The value of <code>model_provider</code> must exactly match the provider id in{' '}
        <code>[model_providers.&lt;id&gt;]</code>. If the id is <code>gpt88_http</code>, do not write{' '}
        <code>openai_http</code> or <code>chatgpt_http</code> at the top.
      </p>

      <h2 id="restart">Step 4: Restart and verify</h2>
      <p>
        Save the file, quit Codex and the terminal, open a new terminal, and start a fresh session. Do not continue only
        inside the old session; it may retain stale provider, connection, or failure context.
      </p>
      <CodeBlock lang="bash" filename="verify-connection.sh" code={VERIFY} />
      <ol>
        <li>Normal text succeeds: authentication, model, and basic HTTP path are at least working.</li>
        <li>Read-only tool succeeds: the Agent can receive a tool result without failing at the first tool turn.</li>
        <li>The original task succeeds: the configuration is useful for your real workflow, not just a short smoke test.</li>
      </ol>

      <h2 id="decision">API key, OAuth, and field choices</h2>
      <table>
        <thead>
          <tr>
            <th>Your goal</th>
            <th>Prefer</th>
            <th>Do not mix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Call models through gpt88.cc</td>
            <td><code>base_url</code> + <code>env_key</code> + <code>wire_api = "responses"</code></td>
            <td>Do not set <code>requires_openai_auth = true</code> in the same profile</td>
          </tr>
          <tr>
            <td>Use OpenAI / ChatGPT OAuth</td>
            <td><code>requires_openai_auth = true</code> and the official login flow</td>
            <td>Do not leave gpt88 API key environment variables in the same profile</td>
          </tr>
          <tr>
            <td>Test WebSocket compatibility</td>
            <td>Use a minimal HTTP / Responses request as the comparison</td>
            <td>Do not treat one successful short response as proof that long tasks are stable</td>
          </tr>
        </tbody>
      </table>
      <p>
        For the complete gpt88.cc Codex CLI setup, continue to{' '}
        <Link to="/en/docs/integrations/dev/codex-cli/">Codex CLI with gpt88.cc</Link>. For ChatGPT plugins or OAuth,
        read <Link to="/en/docs/guides/codex-plugins-oauth/">Codex OAuth and plugin login</Link>.
      </p>

      <h2 id="troubleshoot">Troubleshooting order</h2>
      <ol>
        <li>
          <strong>Check the version.</strong> Run <code>codex --version</code>. If it is old, upgrade using your current
          installation method; npm installations can use <code>npm install -g @openai/codex@latest</code>.
        </li>
        <li>
          <strong>Confirm provider activation.</strong> Check that <code>model_provider</code> and the provider id match
          exactly, and that Codex is reading the intended <code>CODEX_HOME</code>.
        </li>
        <li>
          <strong>Compare networks.</strong> Test another network, proxy node, or route. If failure is isolated to a
          corporate network, firewall, or specific node, focus on WebSocket and long-lived connection support.
        </li>
        <li>
          <strong>Start a fresh session.</strong> Reopen the project and launch Codex again. A failed old session is not a
          valid test of the new provider.
        </li>
        <li>
          <strong>Classify the error.</strong> 401 / 403 usually points to authentication or permission, 404 to Base URL
          or model, and 524 to a gateway that did not receive a usable upstream response in time. Use the complete error,
          timestamp, and request id for confirmation.
        </li>
        <li>
          <strong>Check tools separately.</strong> If normal text works but tools fail, inspect shell, hooks, MCP,
          subprocesses, and tool recovery instead of attributing everything to WebSocket.
        </li>
      </ol>
      <CodeBlock lang="bash" filename="diagnose.sh" code={DIAGNOSE} />

      <Callout tone="danger" title="Do not retry the same long task forever">
        <p>
          Unstable transport can cause duplicate writes, repeated tool calls, and context growth. Preserve the workspace,
          run normal and read-only checks first, and inspect <code>git status --short</code> before deciding whether to
          resume, roll back, or continue.
        </p>
      </Callout>

      <h2 id="rollback">Rollback</h2>
      <p>
        If Codex reports a configuration parse error, model list issue, or worse connection behavior, restore the backup
        and restart. Rolling back the configuration does not undo files already written to the project; inspect those
        changes separately.
      </p>
      <CodeBlock lang="bash" filename="rollback-config.sh" code={ROLLBACK} />
      <p>
        After configuration recovery, run the minimal text test again. If text works but tools still fail, continue with{' '}
        <Link to="/en/docs/guides/codex-tool-recovery/">Codex tool recovery</Link> and{' '}
        <Link to="/en/docs/guides/codex-windows-powershell7-timeout/">Windows Codex 524 and PowerShell 7</Link>.
      </p>

      <h2 id="checklist">Acceptance checklist</h2>
      <CodeBlock lang="text" filename="acceptance-checklist" code={CHECKLIST} />

      <h2 id="references">Sources and references</h2>
      <ul>
        <li>
          <a
            href="https://x.com/yunxi0623/status/2074818514612035683"
            target="_blank"
            rel="noreferrer"
          >
            Source X article: Codex keeps reconnecting 5/5
          </a>
          {' '}— summarized here with the gpt88 API key boundary added.
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-basic" target="_blank" rel="noreferrer">
            Codex Config basics
          </a>
          {' '}— official configuration layers and provider overview.
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-advanced" target="_blank" rel="noreferrer">
            Codex Advanced Config
          </a>
          {' '}— custom providers, Base URL, authentication, and Responses examples.
        </li>
        <li>
          <a href="https://learn.chatgpt.com/docs/config-file/config-reference" target="_blank" rel="noreferrer">
            Codex Configuration Reference
          </a>
          {' '}— current config.toml fields and version-sensitive checks.
        </li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          <Link to="/en/docs/integrations/dev/codex-cli/">Codex CLI with gpt88.cc</Link>: complete API key, model, and
          file-tool setup.
        </li>
        <li>
          <Link to="/en/docs/guides/codex-tool-recovery/">Codex tool recovery</Link>: confirm tool state and restart
          implementation from step one.
        </li>
        <li>
          <Link to="/en/docs/guides/codex-windows-powershell7-timeout/">Windows Codex 524 and PowerShell 7</Link>:
          continue shell, encoding, and stream troubleshooting.
        </li>
      </ul>
    </DocPage>
  )
}
