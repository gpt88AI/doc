import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * SDK 示例：Python
 *
 * 直接复用 OpenAI 官方 SDK，只换 base_url。
 * 文档结构按"安装 → 基础调用 → 流式 → 错误处理 → 异步"排布，
 * 全部用真实可跑的代码片段。
 */

const INSTALL = `pip install openai>=1.40.0

# 注入 API Key（推荐使用环境变量而不是硬编码）
export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`

const BASIC = `from openai import OpenAI

# 唯一的差异：base_url 指向 gpt88.cc
client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",  # 或读 os.environ["GPT88_API_KEY"]
)

resp = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[
        {"role": "system", "content": "You are a concise assistant."},
        {"role": "user", "content": "用 30 字介绍 gpt88.cc"},
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(resp.choices[0].message.content)
print("usage:", resp.usage.total_tokens, "tokens")`

const STREAM = `stream = client.chat.completions.create(
    model="claude-opus-4-7",
    stream=True,
    messages=[{"role": "user", "content": "讲一个关于 API 网关的冷笑话"}],
)

for chunk in stream:
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)
print()  # 换行`

const ERROR = `import time
from openai import OpenAI, RateLimitError, APIStatusError

client = OpenAI(base_url="https://gpt88.cc/v1")

def call_with_retry(messages, model="claude-opus-4-7", max_retries=3):
    """简易退避重试包装：仅对可重试错误退避。"""
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model=model,
                messages=messages,
            )
        except RateLimitError:
            # 429：尊重 Retry-After，简单退避即可
            time.sleep(2 ** attempt)
        except APIStatusError as e:
            # 5xx 才退避，4xx 直接抛出
            if 500 <= e.status_code < 600:
                time.sleep(2 ** attempt)
            else:
                raise
    raise RuntimeError("max retries exceeded")`

const TOOLS = `tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "查询某个城市的当前天气",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

resp = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[{"role": "user", "content": "上海现在几度？"}],
    tools=tools,
    tool_choice="auto",
)

tc = resp.choices[0].message.tool_calls
if tc:
    print("model wants to call:", tc[0].function.name, tc[0].function.arguments)`

const ASYNC = `import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(base_url="https://gpt88.cc/v1")

async def main():
    resp = await client.chat.completions.create(
        model="claude-opus-4-7",
        messages=[{"role": "user", "content": "hi"}],
    )
    print(resp.choices[0].message.content)

asyncio.run(main())`

export default function PythonSdkPage() {
  return (
    <DocPage
      path="/docs/sdk/python"
      title="Python 示例"
      description="使用 OpenAI 官方 Python SDK，把 base_url 指向 gpt88.cc 即可调用。提供同步、异步、流式、function calling 与重试范式。"
      headings={[
        { id: 'install', text: '安装与配置', level: 2 },
        { id: 'basic', text: '基础调用', level: 2 },
        { id: 'stream', text: '流式响应', level: 2 },
        { id: 'tools', text: 'function calling', level: 2 },
        { id: 'errors', text: '错误处理与重试', level: 2 },
        { id: 'async', text: '异步用法', level: 2 },
      ]}
    >
      <h2 id="install">安装与配置</h2>
      <p>
        直接使用 OpenAI 官方 SDK 即可，不需要任何 gpt88 私有依赖。
        建议 1.40 及以上版本，能完整支持流式 / tools / response_format。
      </p>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在 INSTALL 代码块上方放一句外链提示，让读者知道 sk-xxx 该去哪取。
       */}
      <p className="text-sm text-ink-400">
        请将下方脚本中的 <code>sk-xxx</code> 替换为你在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台「API Keys」页面创建的 Key。
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="info" title="也可以用 langchain / litellm 等上层框架">
        <p>
          任何兼容 OpenAI 协议的框架都能直接用：把 <code>base_url</code> 或
          provider 配置改成 <code>https://gpt88.cc/v1</code>，再设置
          <code>OPENAI_API_KEY</code> 为你的 gpt88 Key 即可。
        </p>
      </Callout>

      <h2 id="basic">基础调用</h2>
      <CodeBlock lang="python" filename="basic.py" code={BASIC} />

      <h2 id="stream">流式响应</h2>
      <CodeBlock lang="python" filename="stream.py" code={STREAM} />

      <h2 id="tools">function calling</h2>
      <CodeBlock lang="python" filename="tools.py" code={TOOLS} />
      <p>
        当模型返回 <code>tool_calls</code> 时，由你的应用执行工具，
        再把结果以 <code>role: "tool"</code> 消息回传给模型，发起下一轮请求。
      </p>

      <h2 id="errors">错误处理与重试</h2>
      <CodeBlock lang="python" filename="retry.py" code={ERROR} />
      <p>
        完整错误码语义见{' '}
        <Link to="/docs/api/errors">错误码</Link> 页。
      </p>

      <h2 id="async">异步用法</h2>
      <p>
        高并发或在 FastAPI / asyncio 应用中，建议直接使用 <code>AsyncOpenAI</code>：
      </p>
      <CodeBlock lang="python" filename="async.py" code={ASYNC} />
    </DocPage>
  )
}
