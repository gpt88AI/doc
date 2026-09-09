import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'
import { getSdkCopy } from '../../../lib/sdkLocaleCopy'
import CurlPageEn from '../../en/CurlPageEn'

/**
 * SDK 示例：cURL
 *
 * 把"先验证一下、再做更复杂的事"这条线拉直：
 * 1. 检查环境变量；
 * 2. 列模型；
 * 3. 发一次最简调用；
 * 4. 流式调用；
 * 5. 错误处理 + 重试模式（用 shell 脚本演示）。
 */

const CHECK = `# 1. 准备 API Key
export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# 2. 检查 API 是否可达（鉴权 + 网络）
curl -s -o /dev/null -w "%{http_code}\\n" \\
  https://api.gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"
# 期望输出：200`

const LIST = `curl https://api.gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY" | jq '.data[].id'`

const CHAT = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "messages": [
      {"role": "system", "content": "You are a concise assistant."},
      {"role": "user", "content": "用 30 字介绍一下 gpt88.cc"}
    ]
  }'`

const STREAM = `# -N 关闭输出缓冲，按行实时打印 SSE
curl -N https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "stream": true,
    "messages": [{"role": "user", "content": "讲一个关于 API 网关的冷笑话"}]
  }'`

const RETRY = `#!/usr/bin/env bash
# 简单的 429/5xx 退避重试示例
set -euo pipefail

call() {
  curl -sS -w "\\n%{http_code}" \\
    https://api.gpt88.cc/v1/chat/completions \\
    -H "Authorization: Bearer $GPT88_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d "$1"
}

PAYLOAD='{"model":"claude-opus-4-7","messages":[{"role":"user","content":"hi"}]}'

for i in 1 2 3; do
  RESP=$(call "$PAYLOAD")
  CODE=$(echo "$RESP" | tail -n1)
  BODY=$(echo "$RESP" | sed '$d')

  if [ "$CODE" -lt 400 ]; then
    echo "$BODY"
    exit 0
  fi

  # 仅对可重试错误做退避
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

const CURL_BODY_COPY: Record<string, { prep: string; key: string; warningTitle: string; warning: string; list: string; response: string; retry: string; errors: string }> = {
  zh: { prep: '把环境准备好，确认 API Key 与网络都没问题：', key: '将下方脚本里的 sk-xxx 替换为你在 Agent API Keys 控制台创建的 API Key。', warningTitle: '不要把 API Key 放进客户端代码', warning: '浏览器与 App 客户端无法妥善保管 secret。生产环境请走自有后端转发，只有在 server-side 进程内使用 GPT88_API_KEY 环境变量。', list: '组合 jq 提取 ID，便于在脚本中按需挑选：', response: '响应字段与 OpenAI 一致；完整字段定义见', retry: '生产场景中务必处理 429 / 5xx。下面是一个最小可运行的 bash 重试模板，方便嵌入 CI 或排障会话：', errors: '关于错误码与各自的处理建议，请参阅' },
  hi: { prep: 'Environment तैयार करें और API Key तथा network की जांच करें:', key: 'नीचे के script में sk-xxx को Agent API Keys console से बनाए गए API Key से बदलें।', warningTitle: 'API Key को client code में न रखें', warning: 'Browser और App client secret को सुरक्षित नहीं रख सकते। Production में अपने backend से forward करें और GPT88_API_KEY केवल server-side process में पढ़ें।', list: 'Script में ID चुनने के लिए jq से निकालें:', response: 'Response fields OpenAI जैसे हैं; पूरी field definition देखें', retry: 'Production में 429 / 5xx को जरूर संभालें। नीचे CI या troubleshooting के लिए चलने योग्य bash retry template है:', errors: 'Error codes और handling के लिए देखें' },
  bn: { prep: 'Environment প্রস্তুত করে API Key ও network পরীক্ষা করুন:', key: 'নিচের script-এর sk-xxx-কে Agent API Keys console-এ তৈরি করা API Key দিয়ে বদলান।', warningTitle: 'Client code-এ API Key রাখবেন না', warning: 'Browser ও App client secret নিরাপদে রাখতে পারে না। Production-এ নিজের backend দিয়ে forward করুন এবং GPT88_API_KEY শুধু server-side process-এ ব্যবহার করুন।', list: 'Script-এ বাছাই করার জন্য jq দিয়ে ID বের করুন:', response: 'Response field OpenAI-এর মতো; সম্পূর্ণ field definition দেখুন', retry: 'Production-এ 429 / 5xx অবশ্যই handle করুন। নিচে CI বা troubleshooting-এর জন্য runnable bash retry template আছে:', errors: 'Error code ও handling-এর জন্য দেখুন' },
  ur: { prep: 'Environment تیار کریں اور API Key و network چیک کریں:', key: 'نیچے script میں sk-xxx کو Agent API Keys console سے بنائے گئے API Key سے بدلیں۔', warningTitle: 'API Key کو client code میں نہ رکھیں', warning: 'Browser اور App clients secret محفوظ نہیں رکھ سکتے۔ Production میں اپنے backend سے forward کریں اور GPT88_API_KEY صرف server-side process میں استعمال کریں۔', list: 'Script میں ID منتخب کرنے کے لیے jq سے نکالیں:', response: 'Response fields OpenAI جیسے ہیں؛ مکمل field definition دیکھیں', retry: 'Production میں 429 / 5xx لازماً handle کریں۔ نیچے CI یا troubleshooting کے لیے runnable bash retry template ہے:', errors: 'Error codes اور handling کے لیے دیکھیں' },
  ta: { prep: 'Environment-ஐத் தயார் செய்து API Key மற்றும் network-ஐச் சரிபார்க்கவும்:', key: 'கீழுள்ள script-ல் sk-xxx-ஐ Agent API Keys console-ல் உருவாக்கிய API Key-ஆல் மாற்றவும்.', warningTitle: 'API Key-ஐ client code-ல் வைக்க வேண்டாம்', warning: 'Browser மற்றும் App client-கள் secret-ஐ பாதுகாப்பாக வைத்திருக்க முடியாது. Production-ல் உங்கள் backend வழியாக forward செய்து GPT88_API_KEY-ஐ server-side process-ல் மட்டும் பயன்படுத்தவும்.', list: 'Script-ல் தேவையான ID-ஐ தேர்வு செய்ய jq-ஐப் பயன்படுத்தவும்:', response: 'Response fields OpenAI போலவே இருக்கும்; முழு field definition-ஐப் பார்க்கவும்', retry: 'Production-ல் 429 / 5xx-ஐ கட்டாயம் handle செய்யவும். CI அல்லது troubleshooting-க்கு கீழுள்ள bash retry template-ஐப் பயன்படுத்தலாம்:', errors: 'Error codes மற்றும் handling-ஐப் பார்க்கவும்' },
  ne: { prep: 'Environment तयार गरी API Key र network जाँच्नुहोस्:', key: 'तलको script मा sk-xxx लाई Agent API Keys console मा बनाइएको API Key ले बदल्नुहोस्।', warningTitle: 'API Key client code मा नराख्नुहोस्', warning: 'Browser र App client ले secret सुरक्षित राख्न सक्दैनन्। Production मा आफ्नै backend बाट forward गरी GPT88_API_KEY server-side process मा मात्र प्रयोग गर्नुहोस्।', list: 'Script मा आवश्यक ID छान्न jq प्रयोग गर्नुहोस्:', response: 'Response fields OpenAI जस्तै छन्; पूरा field definition हेर्नुहोस्', retry: 'Production मा 429 / 5xx अनिवार्य रूपमा handle गर्नुहोस्। CI वा troubleshooting का लागि तल runnable bash retry template छ:', errors: 'Error codes र handling का लागि हेर्नुहोस्' },
  si: { prep: 'Environment එක සකසා API Key සහ network පරීක්ෂා කරන්න:', key: 'පහත script එකේ sk-xxx Agent API Keys console තුළ සාදන ලද API Key එකෙන් වෙනස් කරන්න.', warningTitle: 'API Key client code තුළ නොතබන්න', warning: 'Browser සහ App clients හට secret ආරක්ෂිතව තබාගත නොහැක. Production තුළ ඔබේ backend හරහා forward කර GPT88_API_KEY server-side process එකේ පමණක් භාවිතා කරන්න.', list: 'Script එකේ අවශ්‍ය ID තෝරා ගැනීමට jq භාවිතා කරන්න:', response: 'Response fields OpenAI සමඟ එකසේය; සම්පූර්ණ field definition බලන්න', retry: 'Production තුළ 429 / 5xx අනිවාර්යයෙන් handle කරන්න. CI හෝ troubleshooting සඳහා පහත bash retry template භාවිතා කළ හැක:', errors: 'Error codes සහ handling බලන්න' },
}

export default function CurlSdkPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CurlPageEn />
  const copy = getSdkCopy(locale, 'curl', { title: 'cURL 示例', description: '所有 gpt88.cc API 都可以直接用 cURL 调用，方便快速验证、写 shell 脚本或在 CI 里做健康检查。', intro: '先检查 API Key 和 endpoint，再列出模型并发送一个最小请求。', sections: { check: '健康检查', list: '列模型', chat: '调用 chat/completions', stream: '流式响应', retry: '退避重试脚本' } })
  const bodyCopy = CURL_BODY_COPY[locale] ?? CURL_BODY_COPY.zh

  const keyUrl = buildAgentActivationUrl({
    locale,
    surface: 'sdk_curl_setup',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/sdk/curl"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'check', text: copy.sections.check, level: 2 },
        { id: 'list', text: copy.sections.list, level: 2 },
        { id: 'chat', text: copy.sections.chat, level: 2 },
        { id: 'stream', text: copy.sections.stream, level: 2 },
        { id: 'retry', text: copy.sections.retry, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <h2 id="check">{copy.sections.check}</h2>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 这里在第一段示例代码上方加一行简短引导，强调 sk-xxx 占位符要替换成真实 Key 来源。
       */}
      <p>{bodyCopy.prep}</p>
      <p className="text-sm text-ink-400">
        {bodyCopy.key.replace('sk-xxx', '')}<code>sk-xxx</code>{' '}
        <a
          href={keyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          Agent API Keys
        </a>{' '}
        控制台创建的 API Key。
      </p>
      <CodeBlock lang="bash" filename="check.sh" code={CHECK} />

      <Callout tone="warn" title={bodyCopy.warningTitle}>
        <p>{bodyCopy.warning}</p>
      </Callout>

      <h2 id="list">{copy.sections.list}</h2>
      <p>
        {bodyCopy.list}
      </p>
      <CodeBlock lang="bash" code={LIST} />

      <h2 id="chat">{copy.sections.chat}</h2>
      <CodeBlock lang="bash" code={CHAT} />
      <p>
        {bodyCopy.response}{' '}
        <Link to="/docs/api/chat-completions/">POST /v1/chat/completions</Link>。
      </p>

      <h2 id="stream">{copy.sections.stream}</h2>
      <CodeBlock lang="bash" code={STREAM} />

      <h2 id="retry">{copy.sections.retry}</h2>
      <p>
        {bodyCopy.retry}
      </p>
      <CodeBlock lang="bash" filename="call.sh" code={RETRY} />
      <p>
        {bodyCopy.errors}{' '}
        <Link to="/docs/api/errors/">错误码</Link> 页。
      </p>
    </DocPage>
  )
}
