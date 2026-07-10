import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import GeminiCliPageEn from '../../../en/GeminiCliPageEn'

const SETUP = `BASE_URL=https://china.claudecoder.me
API_KEY=你的-gpt88-api-key
MODEL=gemini-3-pro-image-preview

图片生成走 Gemini 原生 generateContent 接口。`

const IMAGE_TEST = `curl -s -X POST \\
  "https://china.claudecoder.me/v1beta/models/gemini-3-pro-image-preview:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "生成一张 1:1 的科技感图标，无文字"}]}],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }'`

export default function GeminiCliIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <GeminiCliPageEn />

  return (
    <DocPage
      path="/docs/integrations/dev/gemini-cli"
      title="Gemini CLI 接入 gpt88.cc"
      description="Gemini CLI 与 Google 图片模型的 gpt88.cc 接入说明。"
      headings={[
        { id: 'setup', text: '配置方法', level: 2 },
        { id: 'image', text: '图片接口测试', level: 2 },
        { id: 'notes', text: '注意事项', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="Gemini 图片模型走原生 generateContent">
        <p>Gemini 图片生成不是普通 <code>/v1/chat/completions</code>，需要走 <code>/v1beta/models/:generateContent</code>。</p>
      </Callout>

      <h2 id="setup">配置方法</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="image">图片接口测试</h2>
      <CodeBlock lang="bash" filename="gemini-image-test.sh" code={IMAGE_TEST} />

      <h2 id="notes">注意事项</h2>
      <ul>
        <li>图片模型建议使用 <code>https://china.claudecoder.me</code> 加速域名。</li>
        <li>比例使用 <code>1:1</code>、<code>16:9</code>、<code>9:16</code> 等 Gemini 支持的枚举。</li>
        <li>尺寸使用 <code>1K</code>、<code>2K</code>、<code>4K</code> 这种大写格式。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/api/images/">查看图片 API 说明</Link></li>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
