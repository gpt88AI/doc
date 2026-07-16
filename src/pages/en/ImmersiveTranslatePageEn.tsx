import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREPARE = `1. Install the Immersive Translate browser extension
2. Prepare a gpt88.cc API key
3. Confirm the chat model you want to use
4. Make sure the browser can access the target page
5. Prepare a short page or short paragraph for the first test`

const SETUP = `Service Type: OpenAI Compatible / Custom OpenAI
API Key: sk-your-gpt88-api-key
API URL / Base URL: https://api.gpt88.cc
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`

const FLOW = `1. Open the browser extension management page
2. Enter Immersive Translate settings
3. Find AI translation service / OpenAI settings
4. Choose OpenAI Compatible or Custom OpenAI
5. Paste the API key
6. Set Base URL to https://api.gpt88.cc
7. Set the model name to gpt-5-2-chat-latest
8. Save
9. Open a short webpage and test translation`

const PROMPT = `You are a professional translation assistant.
Translate the user text into Simplified Chinese.
Requirements:
1. Preserve the original paragraph structure
2. Keep technical terminology accurate
3. Do not add explanations
4. Do not output anything unrelated to the translation`

const VERIFY = `Test text:
The model supports streaming responses and tool calls.

Expected result:
The translation should sound natural in Chinese while preserving the technical meaning of streaming responses and tool calls.`

const TROUBLESHOOTING = `1. The translate button does nothing
   - Check whether the extension is enabled
   - Check whether the current page allows extension execution

2. 401 response
   - Check whether the API key is complete
   - Remove accidental spaces around the key

3. 404 response
   - Base URL should be https://api.gpt88.cc
   - The model ID must be a real supported model

4. Translation is too slow
   - Switch to a lighter model
   - Reduce the paragraph length per request

5. Translation style is unstable
   - Lower Temperature
   - Use a fixed system prompt`

export default function ImmersiveTranslatePageEn() {
  return (
    <DocPage
      path="/docs/integrations/platforms/immersive-translate"
      title="Immersive Translate with gpt88.cc"
      description="Step-by-step guide for connecting the Immersive Translate browser extension to gpt88.cc through an OpenAI-compatible API."
      headings={[
        { id: 'overview', text: 'Use cases', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'configure', text: 'Step 1: Fill in service settings', level: 2 },
        { id: 'flow', text: 'Step 2: Walk through the setup', level: 2 },
        { id: 'prompt', text: 'Step 3: Improve the translation prompt', level: 2 },
        { id: 'verify', text: 'Step 4: Verify translation quality', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Recommended usage">
        <p>
          Immersive Translate works well through the OpenAI-compatible route. Translation tasks value stability
          and cost control, so start with a lighter chat model and adjust only after the workflow is stable.
        </p>
      </Callout>

      <h2 id="overview">Use cases</h2>
      <ul>
        <li>Full-page webpage translation.</li>
        <li>Technical documentation translation.</li>
        <li>Segmented translation for papers, blogs, and product docs.</li>
        <li>Cases where you want more natural output than baseline machine translation.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="configure">Step 1: Fill in service settings</h2>
      <p>Choose the OpenAI-compatible service inside Immersive Translate, then fill the fields below.</p>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="flow">Step 2: Walk through the setup</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />

      <h2 id="prompt">Step 3: Improve the translation prompt</h2>
      <p>
        If the extension supports a custom system prompt, use a constrained translation prompt. For technical
        content, preserve terminology instead of letting the model improvise.
      </p>
      <CodeBlock lang="text" filename="translation-prompt" code={PROMPT} />

      <h2 id="verify">Step 4: Verify translation quality</h2>
      <CodeBlock lang="text" filename="verify" code={VERIFY} />
      <ol>
        <li>Start with one short English paragraph.</li>
        <li>Confirm the translation does not add extra explanation.</li>
        <li>Then test a longer page with segmented translation.</li>
        <li>If cost is high, shorten each request or switch to a lighter model.</li>
      </ol>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/integrations/chat/chatbox/', 'en')}>Read the ChatBox guide</Link>.</li>
        <li><Link to={localizePath('/docs/guides/gpt88-tutorial/', 'en')}>Read the general gpt88.cc guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
