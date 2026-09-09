import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'
import { getSdkCopy } from '../../../lib/sdkLocaleCopy'
import { SeoIntentSections } from '../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../components/seo/SeoIntentMeta'
import PythonPageEn from '../../en/PythonPageEn'

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
    base_url="https://api.gpt88.cc",
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

client = OpenAI(base_url="https://api.gpt88.cc")

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

client = AsyncOpenAI(base_url="https://api.gpt88.cc")

async def main():
    resp = await client.chat.completions.create(
        model="claude-opus-4-7",
        messages=[{"role": "user", "content": "hi"}],
    )
    print(resp.choices[0].message.content)

asyncio.run(main())`

const PYTHON_BODY_COPY: Record<string, { install: string; calloutTitle: string; callout: string; tools: string; async: string }> = {
  zh: { install: '直接使用 OpenAI 官方 SDK 即可，不需要任何 gpt88 私有依赖。建议 1.40 及以上版本，能完整支持流式 / tools / response_format。', calloutTitle: '也可以用 langchain / litellm 等上层框架', callout: '任何兼容 OpenAI 协议的框架都能直接用：把 base_url 或 provider 配置改成 https://api.gpt88.cc，再设置 OPENAI_API_KEY 为你的 gpt88 Key 即可。', tools: '当模型返回 tool_calls 时，由你的应用执行工具，再把结果以 role: "tool" 消息回传给模型，发起下一轮请求。', async: '高并发或在 FastAPI / asyncio 应用中，建议直接使用 AsyncOpenAI：' },
  hi: { install: 'OpenAI official SDK सीधे इस्तेमाल करें; gpt88 private dependency की जरूरत नहीं। Streaming / tools / response_format के लिए 1.40 या बाद का version उपयोग करें।', calloutTitle: 'langchain / litellm जैसे framework भी उपयोग कर सकते हैं', callout: 'OpenAI-compatible framework में base_url या provider को https://api.gpt88.cc पर सेट करें और OPENAI_API_KEY में gpt88 Key दें।', tools: 'Model tool_calls लौटाए तो application tool चलाकर परिणाम role: "tool" message के रूप में model को भेजे और अगला request करे।', async: 'High concurrency या FastAPI / asyncio app में AsyncOpenAI उपयोग करें:' },
  bn: { install: 'OpenAI official SDK সরাসরি ব্যবহার করুন; gpt88 private dependency দরকার নেই। Streaming / tools / response_format-এর জন্য 1.40 বা পরের version নিন।', calloutTitle: 'langchain / litellm-এর মতো framework-ও ব্যবহার করা যায়', callout: 'OpenAI-compatible framework-এ base_url বা provider https://api.gpt88.cc করুন এবং OPENAI_API_KEY-এ gpt88 Key দিন।', tools: 'Model tool_calls ফেরালে application tool চালিয়ে ফল role: "tool" message হিসেবে model-এ পাঠিয়ে পরের request করুন।', async: 'High concurrency বা FastAPI / asyncio app-এ AsyncOpenAI ব্যবহার করুন:' },
  ur: { install: 'OpenAI official SDK براہِ راست استعمال کریں؛ gpt88 private dependency درکار نہیں۔ Streaming / tools / response_format کے لیے 1.40 یا بعد کا version لیں۔', calloutTitle: 'langchain / litellm جیسے frameworks بھی استعمال کیے جا سکتے ہیں', callout: 'OpenAI-compatible framework میں base_url یا provider کو https://api.gpt88.cc کریں اور OPENAI_API_KEY میں gpt88 Key رکھیں۔', tools: 'Model tool_calls واپس کرے تو application tool چلا کر نتیجہ role: "tool" message کے طور پر model کو بھیج کر اگلی request کرے۔', async: 'High concurrency یا FastAPI / asyncio app میں AsyncOpenAI استعمال کریں:' },
  ta: { install: 'OpenAI official SDK-ஐ நேரடியாகப் பயன்படுத்தவும்; gpt88 private dependency தேவையில்லை. Streaming / tools / response_format-க்கு 1.40 அல்லது புதிய version பயன்படுத்தவும்.', calloutTitle: 'langchain / litellm போன்ற framework-களையும் பயன்படுத்தலாம்', callout: 'OpenAI-compatible framework-ல் base_url அல்லது provider-ஐ https://api.gpt88.cc ஆக அமைத்து OPENAI_API_KEY-ல் gpt88 Key கொடுக்கவும்.', tools: 'Model tool_calls திருப்பினால் application tool-ஐ இயக்கி முடிவை role: "tool" message ஆக model-க்கு அனுப்பி அடுத்த request செய்யவும்.', async: 'High concurrency அல்லது FastAPI / asyncio app-ல் AsyncOpenAI பயன்படுத்தவும்:' },
  ne: { install: 'OpenAI official SDK सिधै प्रयोग गर्नुहोस्; gpt88 private dependency चाहिँदैन। Streaming / tools / response_format का लागि 1.40 वा नयाँ version प्रयोग गर्नुहोस्।', calloutTitle: 'langchain / litellm जस्ता framework पनि प्रयोग गर्न सकिन्छ', callout: 'OpenAI-compatible framework मा base_url वा provider लाई https://api.gpt88.cc राखी OPENAI_API_KEY मा gpt88 Key दिनुहोस्।', tools: 'Model ले tool_calls फर्काउँदा application ले tool चलाएर परिणाम role: "tool" message का रूपमा model लाई पठाई अर्को request गर्नुपर्छ।', async: 'High concurrency वा FastAPI / asyncio app मा AsyncOpenAI प्रयोग गर्नुहोस्:' },
  si: { install: 'OpenAI official SDK සෘජුව භාවිතා කරන්න; gpt88 private dependency අවශ්‍ය නැත. Streaming / tools / response_format සඳහා 1.40 හෝ නව version භාවිතා කරන්න.', calloutTitle: 'langchain / litellm වැනි framework ද භාවිතා කළ හැක', callout: 'OpenAI-compatible framework එකක base_url හෝ provider https://api.gpt88.cc ලෙස සකසා OPENAI_API_KEY වෙත gpt88 Key දෙන්න.', tools: 'Model එක tool_calls ලබා දුන් විට application එක tool එක ධාවනය කර ප්‍රතිඵලය role: "tool" message එකක් ලෙස model වෙත යවා ඊළඟ request එක කරන්න.', async: 'High concurrency හෝ FastAPI / asyncio app එකක AsyncOpenAI භාවිතා කරන්න:' },
}

export default function PythonSdkPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <PythonPageEn />
  const copy = getSdkCopy(locale, 'python', { title: 'Python 调用 GPT88 API 完整示例', description: '用 OpenAI 官方 Python SDK 调用 GPT88 API，包含同步、流式和错误排查示例。', intro: '保留 OpenAI SDK，只替换 base_url 和 API Key 即可开始。', sections: { install: '安装与配置', basic: '基础调用', stream: '流式响应', tools: 'function calling', errors: '错误处理与重试', async: '异步用法' } })
  const bodyCopy = PYTHON_BODY_COPY[locale] ?? PYTHON_BODY_COPY.zh

  const keyUrl = buildAgentActivationUrl({
    locale,
    surface: 'sdk_python_setup',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/sdk/python"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'install', text: copy.sections.install, level: 2 },
        { id: 'basic', text: copy.sections.basic, level: 2 },
        { id: 'stream', text: copy.sections.stream, level: 2 },
        { id: 'tools', text: copy.sections.tools, level: 2 },
        { id: 'errors', text: copy.sections.errors, level: 2 },
        { id: 'async', text: copy.sections.async, level: 2 },
        ...seoIntentHeadings('python'),
      ]}
    >
      <p>{copy.intro}</p>
      <h2 id="install">{copy.sections.install}</h2>
      <p>{bodyCopy.install}</p>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在 INSTALL 代码块上方放一句外链提示，让读者知道 sk-xxx 该去哪取。
       */}
      <p className="text-sm text-ink-400">
        请将下方脚本中的 <code>sk-xxx</code> 替换为你在{' '}
        <a
          href={keyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          Agent API Keys
        </a>{' '}
        控制台「API Keys」页面创建的 Key。
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="info" title={bodyCopy.calloutTitle}>
        <p>{bodyCopy.callout}</p>
      </Callout>

      <h2 id="basic">{copy.sections.basic}</h2>
      <CodeBlock lang="python" filename="basic.py" code={BASIC} />

      <h2 id="stream">{copy.sections.stream}</h2>
      <CodeBlock lang="python" filename="stream.py" code={STREAM} />

      <h2 id="tools">function calling</h2>
      <CodeBlock lang="python" filename="tools.py" code={TOOLS} />
      <p>{bodyCopy.tools}</p>

      <h2 id="errors">{copy.sections.errors}</h2>
      <CodeBlock lang="python" filename="retry.py" code={ERROR} />
      <p>
        完整错误码语义见{' '}
        <Link to="/docs/api/errors/">错误码</Link> 页。
      </p>

      <h2 id="async">{copy.sections.async}</h2>
      <p>
        {bodyCopy.async}
      </p>
      <CodeBlock lang="python" filename="async.py" code={ASYNC} />
      <SeoIntentSections intent="python" />
    </DocPage>
  )
}
