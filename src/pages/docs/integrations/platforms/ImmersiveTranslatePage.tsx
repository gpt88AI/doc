import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest`

export default function ImmersiveTranslateIntegrationPage() {
  return (
    <DocPage path="/docs/integrations/platforms/immersive-translate" title="沉浸式翻译接入 gpt88.cc" description="浏览器翻译扩展接入 gpt88.cc 的说明。">
      <h2>配置方法</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <h2>下一步</h2>
      <ul>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
