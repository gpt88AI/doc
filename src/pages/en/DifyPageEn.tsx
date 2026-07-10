import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREPARE = `1. Admin access to Dify
2. A gpt88.cc API key
3. The chat model ID you plan to use
4. If you will build a knowledge base, also confirm the embedding model
5. One minimal app or workflow for testing`

const PROVIDER_SETUP = `Provider: OpenAI Compatible
API Key: sk-your-gpt88-api-key
API Base URL: https://gpt88.cc/v1
Model Type: LLM
Model Name: gpt-5-2-chat-latest or claude-sonnet-4-6`

const APP_SETUP = `1. Open the Dify console
2. Go to Settings / Model Provider
3. Add a new OpenAI Compatible provider
4. Fill in the gpt88.cc API key
5. Set Base URL to https://gpt88.cc/v1
6. Save, then open an application
7. Select the model you just added
8. Run one minimal chat test`

const WORKFLOW_SETUP = `1. Create a new Chatflow or Workflow
2. Choose the gpt88.cc model in the LLM node
3. Send one fixed test prompt
4. Run the node and inspect output and error details
5. Only then add knowledge, tools, or more complex prompts`

const KNOWLEDGE_NOTES = `Knowledge workflows should be configured separately:

Chat Model: final response generation
Embedding Model: document vectorization
Rerank Model: result reranking when needed

Do not configure only the chat model and then immediately import a large knowledge base.
Start with one or two short documents and validate chunking, retrieval, and answer quality first.`

const TROUBLESHOOTING = `1. Provider save fails
   - Check that the Base URL is https://gpt88.cc/v1
   - Check that the API key is complete

2. Model does not appear in the app
   - Confirm the model was added to the Dify provider
   - Enter the real model ID manually

3. Workflow node fails
   - Test the LLM node on its own first
   - Then add knowledge or tool nodes

4. Knowledge answers are inaccurate
   - Adjust chunk size
   - Confirm the embedding model is configured
   - Reduce the initial document import scope

5. Cost is unclear
   - Check RMB balance and real deductions in the gpt88.cc console`

export default function DifyPageEn() {
  return (
    <DocPage
      path="/docs/integrations/platforms/dify"
      title="Dify with gpt88.cc"
      description="A step-by-step guide for using gpt88.cc in Dify providers, chat apps, workflows, and knowledge base pipelines."
      headings={[
        { id: 'overview', text: 'Goal of this guide', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'provider', text: 'Step 1: Add the model provider', level: 2 },
        { id: 'app', text: 'Step 2: Attach the model to an app', level: 2 },
        { id: 'workflow', text: 'Step 3: Attach the model to a workflow', level: 2 },
        { id: 'knowledge', text: 'Knowledge base configuration', level: 2 },
        { id: 'verify', text: 'Verification', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Recommended Dify setup">
        <p>
          In Dify, use an OpenAI Compatible provider pointing to <code>https://gpt88.cc/v1</code>. Validate
          chat models, embedding models, and knowledge settings separately instead of changing everything at once.
        </p>
      </Callout>

      <h2 id="overview">Goal of this guide</h2>
      <ul>
        <li>Add gpt88.cc as a Dify model provider.</li>
        <li>Use the model inside a standard chat application.</li>
        <li>Validate the LLM node in Chatflow or Workflow.</li>
        <li>Troubleshoot chat-model and knowledge-model issues separately.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="provider">Step 1: Add the model provider</h2>
      <p>Open the Dify model provider settings and add a new OpenAI-compatible provider.</p>
      <CodeBlock lang="text" filename="provider" code={PROVIDER_SETUP} />

      <h2 id="app">Step 2: Attach the model to an app</h2>
      <p>After the provider is saved successfully, assign the model inside a real application.</p>
      <CodeBlock lang="text" filename="app-setup" code={APP_SETUP} />

      <h2 id="workflow">Step 3: Attach the model to a workflow</h2>
      <p>
        Dify workflow troubleshooting should start with a single LLM node. Make that node succeed first, then
        connect knowledge, HTTP tools, or variable processing.
      </p>
      <CodeBlock lang="text" filename="workflow" code={WORKFLOW_SETUP} />

      <h2 id="knowledge">Knowledge base configuration</h2>
      <CodeBlock lang="text" filename="knowledge" code={KNOWLEDGE_NOTES} />

      <h2 id="verify">Verification</h2>
      <ol>
        <li>Save the provider and test the connection.</li>
        <li>Send one minimal question in a basic chat app.</li>
        <li>Run the LLM node by itself inside a workflow.</li>
        <li>If you use knowledge, import only one short document for the first validation pass.</li>
      </ol>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/api/chat-completions/', 'en')}>Read the Chat Completions API reference</Link>.</li>
        <li><Link to={localizePath('/docs/guides/complete-integration/', 'en')}>Read the complete integration guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
