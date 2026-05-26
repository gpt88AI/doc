import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest

如果你做知识库问答，先确认 embedding 和 chat 模型分别配置清楚。`

export default function AnythingLlmPage() {
  return (
    <DocPage
      path="/docs/integrations/chat/anythingllm"
      title="AnythingLLM 接入 gpt88.cc"
      description="把 gpt88.cc 接到 AnythingLLM 的聊天和知识库工作流里。"
      headings={[
        { id: 'setup', text: '配置方式', level: 2 },
        { id: 'notes', text: '注意事项', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="接法">
        <p>AnythingLLM 通常可以直接按 OpenAI Compatible 接入，Base URL 使用 <code>https://gpt88.cc/v1</code>。</p>
      </Callout>

      <h2 id="setup">配置方式</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="notes">注意事项</h2>
      <ul>
        <li>知识库和聊天模型最好分开配置，避免成本和效果混在一起。</li>
        <li>如果有模型缓存，更新后记得刷新。</li>
        <li>先用最小问题测试连通性，再导入文档库。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
