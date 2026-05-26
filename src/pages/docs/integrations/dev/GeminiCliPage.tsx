import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const SETUP = `BASE_URL=https://china.claudecoder.me
API_KEY=你的-gpt88-api-key
MODEL=gemini-3-pro-image-preview

图片生成走 Gemini 原生 generateContent 接口。`

export default function GeminiCliIntegrationPage() {
  return (
    <DocPage path="/docs/integrations/dev/gemini-cli" title="Gemini CLI 接入 gpt88.cc" description="Gemini CLI 与 Google 图片模型的 gpt88.cc 接入说明。">
      <h2>配置方法</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <h2>下一步</h2>
      <ul>
        <li><Link to="/docs/api/images">查看图片 API 说明</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
