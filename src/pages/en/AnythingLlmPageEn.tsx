import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://gpt88.cc/v1
API Key: sk-your-gpt88-api-key
Model: gpt-5-2-chat-latest

If you use a knowledge base, configure embedding and chat models separately.`

const CHECKLIST = `1. Prepare an API key
2. Use https://gpt88.cc/v1 as the Base URL
3. Treat chat and embedding models separately
4. Run one minimal Q&A test first
5. Import knowledge documents only after that`

const TROUBLESHOOTING = `1. Knowledge answers are unstable
   - Switch to a more stable chat model first
   - Check document chunk size

2. Model is not visible
   - Enter the model ID manually
   - Copy the exact name from the model catalog

3. Authentication fails
   - Check whether the key is complete
   - Check whether an environment variable is overriding it`

export default function AnythingLlmPageEn() {
  return (
    <DocPage
      path="/docs/integrations/chat/anythingllm"
      title="AnythingLLM with gpt88.cc"
      description="Connect gpt88.cc to AnythingLLM for chat and knowledge-base workflows."
      headings={[
        { id: 'overview', text: 'Guide goals', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'setup', text: 'Configuration', level: 2 },
        { id: 'verify', text: 'Verification', level: 2 },
        { id: 'notes', text: 'Notes', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Recommended route">
        <p>
          AnythingLLM usually works directly through the OpenAI-compatible path with
          <code> https://gpt88.cc/v1</code>.
        </p>
      </Callout>

      <p>
        The important distinction in AnythingLLM is between the chat model and the knowledge-base pipeline.
        Keep them separate instead of mixing everything into one initial configuration.
      </p>

      <h2 id="overview">Guide goals</h2>
      <ul>
        <li>Connect gpt88.cc into AnythingLLM.</li>
        <li>Make chat work first, then add the knowledge base.</li>
        <li>Know which layer to inspect first when something fails.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">Configuration</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="verify">Verification</h2>
      <ol>
        <li>Send one short chat request and confirm the model path works.</li>
        <li>Then import a small batch of documents to validate retrieval and answers.</li>
        <li>If results are wrong, debug the knowledge layer and the chat layer separately.</li>
      </ol>

      <h2 id="notes">Notes</h2>
      <ul>
        <li>Configure knowledge and chat models separately when possible.</li>
        <li>If the client caches model lists, refresh after changing providers.</li>
        <li>Always validate connectivity before importing the document set.</li>
      </ul>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
