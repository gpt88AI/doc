import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../lib/activationLinks'
import { localizePath } from '../../lib/locale'

const INSTALL = `pip install openai>=1.40.0

# export the API key instead of hardcoding it
export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`

const BASIC = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.gpt88.cc",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="claude-opus-4-8",
    messages=[
        {"role": "system", "content": "You are a concise assistant."},
        {"role": "user", "content": "Introduce gpt88.cc in under 30 words"},
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(resp.choices[0].message.content)
print("usage:", resp.usage.total_tokens, "tokens")`

const STREAM = `stream = client.chat.completions.create(
    model="claude-opus-4-8",
    stream=True,
    messages=[{"role": "user", "content": "Tell a short joke about API gateways"}],
)

for chunk in stream:
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)
print()`

const ERROR = `import time
from openai import OpenAI, RateLimitError, APIStatusError

client = OpenAI(base_url="https://api.gpt88.cc")

def call_with_retry(messages, model="claude-opus-4-8", max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model=model,
                messages=messages,
            )
        except RateLimitError:
            time.sleep(2 ** attempt)
        except APIStatusError as e:
            if 500 <= e.status_code < 600:
                time.sleep(2 ** attempt)
            else:
                raise
    raise RuntimeError("max retries exceeded")`

const TOOLS = `tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get the current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

resp = client.chat.completions.create(
    model="claude-opus-4-8",
    messages=[{"role": "user", "content": "What's the weather in Shanghai?"}],
    tools=tools,
    tool_choice="auto",
)

tc = resp.choices[0].message.tool_calls
if tc:
    print("model wants to call:", tc[0].function.name, tc[0].function.arguments)`

const ASYNC = `import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(base_url="https://api.gpt88.cc")

async def main():
    resp = await client.chat.completions.create(
        model="claude-opus-4-8",
        messages=[{"role": "user", "content": "hi"}],
    )
    print(resp.choices[0].message.content)

asyncio.run(main())`

export default function PythonPageEn() {
  const keyUrl = buildAgentActivationUrl({
    locale: 'en',
    surface: 'sdk_python_setup',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/sdk/python"
      title="Python Examples"
      description="Use the official OpenAI Python SDK by pointing base_url to gpt88.cc. Includes sync, async, streaming, function calling, and retry patterns."
      headings={[
        { id: 'install', text: 'Install and configure', level: 2 },
        { id: 'basic', text: 'Basic call', level: 2 },
        { id: 'stream', text: 'Streaming', level: 2 },
        { id: 'tools', text: 'Function calling', level: 2 },
        { id: 'errors', text: 'Errors and retries', level: 2 },
        { id: 'async', text: 'Async usage', level: 2 },
      ]}
    >
      <h2 id="install">Install and configure</h2>
      <p>
        Use the official OpenAI SDK directly. No private gpt88 package is required. Version 1.40 or higher is
        recommended for complete support of streaming, tools, and response formatting.
      </p>
      <p className="text-sm text-ink-400">
        Replace <code>sk-xxx</code> with the key created in the{' '}
        <a href={keyUrl} target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">
          Agent API Keys
        </a>.
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="info" title="Higher-level frameworks also work">
        <p>
          Any OpenAI-compatible framework such as LangChain or LiteLLM can work here. Point
          <code>base_url</code> to <code>https://api.gpt88.cc</code> and use your gpt88 API key.
        </p>
      </Callout>

      <h2 id="basic">Basic call</h2>
      <CodeBlock lang="python" filename="basic.py" code={BASIC} />

      <h2 id="stream">Streaming</h2>
      <CodeBlock lang="python" filename="stream.py" code={STREAM} />

      <h2 id="tools">Function calling</h2>
      <CodeBlock lang="python" filename="tools.py" code={TOOLS} />
      <p>
        When the model returns <code>tool_calls</code>, your application executes the tool and sends the tool
        result back as a <code>role: "tool"</code> message in the next request.
      </p>

      <h2 id="errors">Errors and retries</h2>
      <CodeBlock lang="python" filename="retry.py" code={ERROR} />
      <p>
        See <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link> for full status semantics.
      </p>

      <h2 id="async">Async usage</h2>
      <p>For FastAPI, asyncio, or higher-concurrency services, use <code>AsyncOpenAI</code> directly.</p>
      <CodeBlock lang="python" filename="async.py" code={ASYNC} />
    </DocPage>
  )
}
