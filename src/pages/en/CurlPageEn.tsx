import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const CHECK = `# 1. Export your API key
export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# 2. Check authentication and network reachability
curl -s -o /dev/null -w "%{http_code}\\n" \\
  https://gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"
# expected: 200`

const LIST = `curl https://gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY" | jq '.data[].id'`

const CHAT = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-8",
    "messages": [
      {"role": "system", "content": "You are a concise assistant."},
      {"role": "user", "content": "Introduce gpt88.cc in under 30 words"}
    ]
  }'`

const STREAM = `# -N disables output buffering so SSE arrives in real time
curl -N https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-8",
    "stream": true,
    "messages": [{"role": "user", "content": "Tell a short joke about API gateways"}]
  }'`

const RETRY = `#!/usr/bin/env bash
set -euo pipefail

call() {
  curl -sS -w "\\n%{http_code}" \\
    https://gpt88.cc/v1/chat/completions \\
    -H "Authorization: Bearer $GPT88_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d "$1"
}

PAYLOAD='{"model":"claude-opus-4-8","messages":[{"role":"user","content":"hi"}]}'

for i in 1 2 3; do
  RESP=$(call "$PAYLOAD")
  CODE=$(echo "$RESP" | tail -n1)
  BODY=$(echo "$RESP" | sed '$d')

  if [ "$CODE" -lt 400 ]; then
    echo "$BODY"
    exit 0
  fi

  case "$CODE" in
    408|429|500|502|503|504)
      sleep $((2 ** (i - 1)))
      ;;
    *)
      echo "Non-retryable error $CODE: $BODY" >&2
      exit 1
      ;;
  esac
done

echo "Exhausted retries" >&2
exit 1`

export default function CurlPageEn() {
  return (
    <DocPage
      path="/docs/sdk/curl"
      title="cURL Examples"
      description="All gpt88.cc APIs can be called directly with cURL for quick validation, shell automation, and CI health checks."
      headings={[
        { id: 'check', text: 'Health check', level: 2 },
        { id: 'list', text: 'List models', level: 2 },
        { id: 'chat', text: 'Call chat/completions', level: 2 },
        { id: 'stream', text: 'Streaming', level: 2 },
        { id: 'retry', text: 'Retry with backoff', level: 2 },
      ]}
    >
      <h2 id="check">Health check</h2>
      <p>Prepare the environment first and confirm both the API key and the network path are valid.</p>
      <p className="text-sm text-ink-400">
        Replace <code>sk-xxx</code> below with the key created in the{' '}
        <a href="https://gpt88.cc" target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">
          gpt88.cc console
        </a>.
      </p>
      <CodeBlock lang="bash" filename="check.sh" code={CHECK} />

      <Callout tone="warn" title="Do not embed API keys in client code">
        <p>
          Browsers and mobile apps cannot safely store secrets. In production, keep
          <code>GPT88_API_KEY</code> only on your own server-side runtime.
        </p>
      </Callout>

      <h2 id="list">List models</h2>
      <p>Use <code>jq</code> to extract model IDs for scripts and automation.</p>
      <CodeBlock lang="bash" code={LIST} />

      <h2 id="chat">Call chat/completions</h2>
      <CodeBlock lang="bash" code={CHAT} />
      <p>
        The response shape matches the OpenAI schema. For the full request and response contract, see{' '}
        <Link to={localizePath('/docs/api/chat-completions/', 'en')}>POST /v1/chat/completions</Link>.
      </p>

      <h2 id="stream">Streaming</h2>
      <CodeBlock lang="bash" code={STREAM} />

      <h2 id="retry">Retry with backoff</h2>
      <p>
        In production, handle <code>429</code> and <code>5xx</code> explicitly. This is a minimal retry
        template you can drop into CI or debugging scripts.
      </p>
      <CodeBlock lang="bash" filename="call.sh" code={RETRY} />
      <p>
        For status-code meanings and retry guidance, see{' '}
        <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link>.
      </p>
    </DocPage>
  )
}
