import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6`

export default function DifyIntegrationPage() {
  return (
    <DocPage path="/docs/integrations/platforms/dify" title="Dify 接入 gpt88.cc" description="把 gpt88.cc 接入 Dify 平台、工作流和知识库。">
      <h2>配置方法</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <h2>下一步</h2>
      <ul>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
