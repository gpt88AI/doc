import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const ERROR = `Reconnecting... 1/5
Unexpected status 524: responses stream finished without usable output
url: https://<upstream>/v1/responses`

const CHECK = `$PSVersionTable | Format-List PSVersion, PSEdition, OS
(Get-Command powershell -ErrorAction SilentlyContinue).Source
(Get-Command pwsh -ErrorAction SilentlyContinue).Source

$utf8 = [System.Text.UTF8Encoding]::new($false)
[Console]::InputEncoding = $utf8
[Console]::OutputEncoding = $utf8
$OutputEncoding = $utf8
Write-Output "UTF-8 test / tool-stream-ok"
{ text = "sample"; ok = $true } | ConvertTo-Json -Compress`

const DIAGNOSIS = `winget install --id Microsoft.PowerShell --source winget
pwsh
Set-Location C:\\path\\to\\your\\project
git status --short
codex

# Compare against a clean shell
pwsh -NoLogo -NoProfile`

export default function CodexWindowsPowershell7TimeoutPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-windows-powershell7-timeout"
      title="Windows Codex Tool Timeout 524: Switch to PowerShell 7"
      description="Diagnose Windows Codex reconnect loops, HTTP 524 responses, broken tool streams, and UTF-8 output issues caused by PowerShell environments."
      headings={[
        { id: 'conclusion', text: 'Short answer', level: 2 },
        { id: 'symptom', text: 'What the error means', level: 2 },
        { id: 'root-cause', text: 'Why PowerShell 5.1 can trigger it', level: 2 },
        { id: 'repair', text: 'Fastest repair path', level: 2 },
        { id: 'encoding', text: 'Set and verify UTF-8', level: 2 },
        { id: 'diagnose', text: 'Layered diagnosis if 524 remains', level: 2 },
        { id: 'checklist', text: 'Acceptance checklist', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Stop retrying from PowerShell 5.1 first">
        <p>
          Stop the reconnect loop, open PowerShell 7, verify UTF-8 output, and start Codex from that window.
          PowerShell 7 uses <code>pwsh.exe</code>; Windows PowerShell 5.1 uses <code>powershell.exe</code>.
        </p>
      </Callout>

      <h2 id="conclusion">Short answer</h2>
      <ol>
        <li>Stop repeating the request and inspect the active shell.</li>
        <li>Switch from 5.1 / <code>powershell.exe</code> to PowerShell 7 / <code>pwsh.exe</code>.</li>
        <li>Set input, output, and native-command encoding to UTF-8.</li>
        <li>Verify a real Unicode string and JSON value locally.</li>
        <li>Start Codex from the verified PowerShell 7 window and run one minimal tool call.</li>
      </ol>
      <p>
        This is a practical path for the combination of Windows shell, Unicode output, and streaming-tool
        symptoms. It is not proof that every 524 comes from PowerShell; short-session failures still require
        checking hooks, proxy routing, upstream services, and server logs.
      </p>

      <h2 id="symptom">What the error means</h2>
      <CodeBlock lang="text" filename="terminal-output" code={ERROR} />
      <p>
        Reconnecting means the client is trying to recover. A 524 usually means a gateway did not receive a
        usable upstream response in time. The empty stream means the client received no usable output. Authentication
        problems more commonly appear as 401 or 403.
      </p>

      <h2 id="root-cause">Why PowerShell 5.1 can trigger it</h2>
      <p>
        PowerShell version, console encoding, native-command encoding, profile output, and agent protocol output
        can disagree. Unicode or JSON tool results may be truncated, altered, or polluted by profile banners and
        debug text, causing the client to retry a request whose real failure is local output handling.
      </p>

      <h2 id="repair">Fastest repair path</h2>
      <CodeBlock lang="powershell" filename="install-and-launch.ps1" code={DIAGNOSIS} />
      <p>
        Confirm the edition is <code>Core</code>, the version is 7.x, and the resolved command source is the
        actual <code>pwsh.exe</code>. Installing PowerShell 7 does not replace Windows PowerShell 5.1.
      </p>

      <h2 id="encoding">Set and verify UTF-8</h2>
      <CodeBlock lang="powershell" filename="utf8-check.ps1" code={CHECK} />
      <p>
        A code-page command alone is not enough. Verify complete Unicode and JSON output, then compare with
        <code>pwsh -NoLogo -NoProfile</code> if a profile may print to standard output.
      </p>

      <h2 id="diagnose">Layered diagnosis if 524 remains</h2>
      <ol>
        <li>Compare a clean PowerShell 7 process without profiles.</li>
        <li>Check agent hooks, shell wrappers, and environment variables.</li>
        <li>Check proxy routing, upstream response, model, URL, and request ID.</li>
        <li>Reproduce one minimal tool call before returning to the long task.</li>
      </ol>

      <h2 id="checklist">Acceptance checklist</h2>
      <ul>
        <li>Edition is <code>Core</code> and version is 7.x.</li>
        <li><code>pwsh.exe</code> resolves from the expected path.</li>
        <li>Unicode text and JSON are complete, without replacement characters or truncation.</li>
        <li>The profile does not write unrelated text to standard output.</li>
        <li>The agent&apos;s real launch command has been confirmed.</li>
        <li>A minimal tool call succeeds before the original long task resumes.</li>
        <li>If 524 remains, the request ID, time, URL, model, and clean-shell comparison are recorded.</li>
      </ul>
      <p>
        For broader recovery, see <Link to="/docs/guides/codex-tool-recovery/">Codex tool recovery</Link> and{' '}
        <Link to="/docs/integrations/dev/codex-cli/">Codex CLI integration</Link>.
      </p>
    </DocPage>
  )
}
