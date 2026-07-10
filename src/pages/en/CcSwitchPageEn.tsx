import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREPARE = `1. Install CC-Switch
2. Install the target tools, such as Codex CLI, Claude Code, or Cursor
3. Prepare a gpt88.cc API key
4. Decide whether you need OpenAI-compatible or Claude-compatible routing
5. Remember: plugin capability needs OAuth; model relay uses API key mode`

const ROUTES = `OpenAI-compatible route
Name: gpt88-openai
Base URL: https://gpt88.cc/v1
API Key: sk-your-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude-compatible route
Name: gpt88-claude
Base URL: https://gpt88.cc
API Key: sk-your-gpt88-api-key
Default Model: claude-sonnet-4-6`

const FLOW = `1. Open CC-Switch
2. Go to Routes / Providers / API route settings
3. Create the gpt88-openai route
4. Set Base URL to https://gpt88.cc/v1
5. Paste the API key
6. Fill in one default chat model
7. Save the route
8. Enable the route
9. Restart the target tool and verify`

const OAUTH_FLOW = `1. If the target is Codex or ChatGPT plugin capability, sign out of API key mode first
2. Clear OPENAI_API_KEY, OPENAI_BASE_URL, and related variables
3. Sign in again with OAuth inside the tool
4. Confirm the CC-Switch route is enabled
5. Start a clean session and verify that plugins are visible`

const VERIFY = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "Test the CC-Switch route"}]
  }'`

const TROUBLESHOOTING = `1. The tool still uses the old route
   - Confirm the CC-Switch route is enabled
   - Restart the terminal and the target tool

2. 404 response
   - OpenAI-compatible routes must include /v1
   - Claude-compatible routes usually use the root host

3. Plugins are unavailable
   - Do not keep debugging inside API key mode
   - Sign out of API key mode and switch to OAuth

4. Route looks enabled but requests still fail
   - Test gpt88.cc directly with curl first
   - Then debug the CC-Switch forwarding layer`

export default function CcSwitchPageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/cc-switch"
      title="CC-Switch with gpt88.cc"
      description="Route configuration, OpenAI/Claude protocol differences, OAuth switching, and troubleshooting for using gpt88.cc with CC-Switch."
      headings={[
        { id: 'overview', text: 'When to use it', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'routes', text: 'How to fill the routes', level: 2 },
        { id: 'flow', text: 'Step-by-step setup', level: 2 },
        { id: 'oauth', text: 'OAuth scenarios', level: 2 },
        { id: 'verify', text: 'Verify the route', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshooting', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Why CC-Switch matters">
        <p>
          CC-Switch is useful when you want to standardize gpt88.cc routing across multiple tools. API key mode
          is for model access. Plugin capability still depends on whether the target tool is using OAuth.
        </p>
      </Callout>

      <h2 id="overview">When to use it</h2>
      <ul>
        <li>You use multiple development tools and want to switch routes centrally.</li>
        <li>You want OpenAI-compatible and Claude-compatible configurations managed separately.</li>
        <li>You need to move between API key model access and OAuth-based plugin usage.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="routes">How to fill the routes</h2>
      <p>Split routes by protocol first. Do not put <code>/v1</code> into every protocol blindly.</p>
      <CodeBlock lang="text" filename="routes" code={ROUTES} />

      <h2 id="flow">Step-by-step setup</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />

      <h2 id="oauth">OAuth scenarios</h2>
      <p>
        If you are configuring for Codex plugins, ChatGPT account features, or similar OAuth behavior, the key
        question is the login mode, not just the model Base URL.
      </p>
      <CodeBlock lang="text" filename="oauth-flow" code={OAUTH_FLOW} />

      <h2 id="verify">Verify the route</h2>
      <p>Bypass the tool layer first. Verify that gpt88.cc itself works, then come back to CC-Switch.</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={VERIFY} />

      <h2 id="troubleshoot">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/guides/codex-plugins-oauth/', 'en')}>Read the OAuth plugin guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/dev/codex-cli/', 'en')}>Read the Codex CLI guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
