import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const SETUP = `OpenAI API
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6 或 gpt-5-2-chat-latest`

export default function CursorIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/dev/cursor"
      title="Cursor 接入 gpt88.cc"
      description="在 Cursor 中使用 gpt88.cc 作为 OpenAI Compatible 提供商。"
      headings={[
        { id: 'setup', text: '配置方法', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <h2 id="setup">配置方法</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <p>如果你在 Cursor 中同时维护多个模型，建议先固定一个默认模型再逐步扩展。</p>
      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
