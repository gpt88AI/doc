import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const DECISION = `This guide fits when:
1. You use ChatGPT or Codex OAuth
2. The account suddenly asks for phone verification again
3. The original number is unavailable
4. You want to reduce future dependence on SMS codes

Do not proceed until you have:
1. A reliable place to store recovery material
2. At least two usable sign-in methods
3. A second device or a hardware security key`

const RECOVERY = `Recovery-key rules:
1. Back it up offline immediately
2. Keep at least two copies in separate locations
3. Do not leave it only in the browser downloads folder
4. Do not send it to chat tools or third parties
5. Regenerate it from Advanced Account Security if you suspect exposure`

const RELATION = `GPT88 API-key mode does not depend on ChatGPT phone verification.
ChatGPT OAuth may be required for Codex plugins and official account capabilities.
Advanced Account Security changes the ChatGPT sign-in path, not the GPT88 API key.
Keep separate profiles: gpt88-api for model calls and chatgpt-oauth for plugins.`

export default function CodexChatgptPhoneVerificationPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-chatgpt-phone-verification"
      title="ChatGPT and Codex Phone Verification Recovery"
      description="Use passkeys, security keys, and recovery keys to reduce repeated phone verification for ChatGPT OAuth and Codex, without bypassing account security."
      headings={[
        { id: 'background', text: 'Background', level: 2 },
        { id: 'principle', text: 'The security model', level: 2 },
        { id: 'before', text: 'Before you start', level: 2 },
        { id: 'steps', text: 'Recommended steps', level: 2 },
        { id: 'passkey-choice', text: 'Choosing passkeys', level: 2 },
        { id: 'recovery', text: 'Recovery keys', level: 2 },
        { id: 'codex', text: 'Relationship to Codex', level: 2 },
        { id: 'errors', text: 'Common mistakes', level: 2 },
        { id: 'faq', text: 'FAQ', level: 2 },
      ]}
    >
      <Callout tone="warn" title="This is account security setup, not a verification bypass">
        <p>
          The goal is to strengthen an account that you can still access by adding passkeys or security keys
          and safely storing the recovery key. If you are completely locked out, use the official account
          recovery process instead.
        </p>
      </Callout>

      <h2 id="background">Background</h2>
      <p>
        Codex users often have two independent authentication paths: a GPT88 API key for model calls and
        ChatGPT OAuth for plugins or official account capabilities. Phone verification problems usually affect
        the second path, especially when the original number was temporary or is no longer available.
      </p>
      <CodeBlock lang="text" filename="when-to-use" code={DECISION} />

      <h2 id="principle">The security model</h2>
      <p>
        Advanced Account Security moves sign-in toward passkeys or compatible FIDO security keys and may disable
        weaker recovery paths such as email codes, SMS codes, password login, or email recovery. This is a security
        migration, not a way to skip verification. Losing every passkey, hardware key, and recovery key can make
        account recovery harder.
      </p>

      <h2 id="before">Before you start</h2>
      <ul>
        <li>Confirm that you can still sign in to the ChatGPT web account.</li>
        <li>Prepare at least two independent sign-in methods.</li>
        <li>Use a modern browser with passkey support.</li>
        <li>Prepare a secure, durable place for the recovery key.</li>
        <li>Do not keep all recovery material on one temporary device or inside the current session.</li>
      </ul>

      <h2 id="steps">Recommended steps</h2>
      <ol>
        <li>Open the account security settings while you still have access.</li>
        <li>Enable Advanced Account Security only after confirming its recovery implications.</li>
        <li>Add a passkey or hardware security key.</li>
        <li>Add a second independent passkey or key, ideally on another device or backup key.</li>
        <li>Download and verify the recovery key, then store it offline in separate secure locations.</li>
        <li>Sign out and test a normal sign-in using the new method before relying on it for Codex.</li>
      </ol>

      <h2 id="passkey-choice">Choosing passkeys</h2>
      <ul>
        <li>Synced passkeys are convenient across devices, but verify that the password manager sync is enabled.</li>
        <li>A hardware FIDO key is useful for high-security accounts and team administrators; keep a spare.</li>
        <li>Do not create a passkey in a temporary browser profile that you cannot recover later.</li>
        <li>Do not remove the original working method until the backup method has been tested.</li>
      </ul>

      <h2 id="recovery">Recovery keys</h2>
      <p>
        The recovery key may be the last path back into an account after stronger security is enabled.
      </p>
      <CodeBlock lang="text" filename="recovery-key-rules" code={RECOVERY} />

      <h2 id="codex">Relationship to Codex</h2>
      <CodeBlock lang="text" filename="codex-relation" code={RELATION} />
      <p>
        If the goal is to restore a Codex plugin, continue with the <Link to="/docs/guides/codex-plugins-oauth/">Codex OAuth guide</Link>.
        If you only need model calls, use the <Link to="/docs/quickstart/">GPT88 Quickstart</Link> and keep the API-key path separate.
      </p>

      <h2 id="errors">Common mistakes</h2>
      <ul>
        <li>Adding only one passkey and assuming the account is recoverable.</li>
        <li>Keeping both passkeys on the same device without a tested backup.</li>
        <li>Confirming “I saved it” without actually storing the recovery key.</li>
        <li>Forgetting to enable password-manager or keychain synchronisation.</li>
        <li>Assuming every device will remain signed in after the security change.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <h3>Will phone verification never appear again?</h3>
      <p>Security behaviour can vary by region, account type, and risk checks. Follow the current account-security UI and keep recovery material available.</p>
      <h3>Can this help if I am already locked out?</h3>
      <p>No. The setup requires access to the account security settings. Use the official recovery options if sign-in is already blocked.</p>
      <h3>Does this apply to enterprise accounts?</h3>
      <p>Enterprise-managed or organisation-domain accounts may have different controls. If the setting is absent, contact the organisation administrator or follow the account-specific support path.</p>
      <p>
        For the current rules, consult the <a href="https://help.openai.com/en/articles/20001221-advanced-account-security" target="_blank" rel="noreferrer">OpenAI Advanced Account Security documentation</a>.
      </p>
    </DocPage>
  )
}
