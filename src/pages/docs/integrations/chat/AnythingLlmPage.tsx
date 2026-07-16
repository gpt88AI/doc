import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import AnythingLlmPageEn from '../../../en/AnythingLlmPageEn'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: gpt-5-2-chat-latest

如果你做知识库问答，先确认 embedding 和 chat 模型分别配置清楚。`

const CHECKLIST = `1. 先准备好 API Key
2. Base URL 用 https://api.gpt88.cc
3. 聊天模型和 embedding 模型分开看
4. 先跑一条最小问答
5. 再导入知识库文档`

const TROUBLESHOOTING = `1. 知识库问答结果不稳定
   - 先换一个更稳的聊天模型
   - 检查文档切块大小

2. 模型不可见
   - 手动输入模型 ID
   - 到模型导航复制真实名称

3. 认证失败
   - 检查 Key 是否完整
   - 检查环境变量是否被覆盖`

export default function AnythingLlmPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <AnythingLlmPageEn />

  return (
    <DocPage
      path="/docs/integrations/chat/anythingllm"
      title="AnythingLLM 接入 gpt88.cc"
      description="把 gpt88.cc 接到 AnythingLLM 的聊天和知识库工作流里。"
      headings={[
        { id: 'overview', text: '教程目标', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'setup', text: '配置方式', level: 2 },
        { id: 'verify', text: '验证方式', level: 2 },
        { id: 'notes', text: '注意事项', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="接法">
        <p>AnythingLLM 通常可以直接按 OpenAI Compatible 接入，Base URL 使用 <code>https://api.gpt88.cc</code>。</p>
      </Callout>

      <p>
        这页重点是把 AnythingLLM 里的“聊天模型”和“知识库模型”拆清楚，避免一上来把所有能力混到同一个配置里。
      </p>

      <h2 id="overview">教程目标</h2>
      <ul>
        <li>把 gpt88.cc 接进 AnythingLLM。</li>
        <li>先跑通聊天，再接知识库。</li>
        <li>知道失败时先查哪一层。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">配置方式</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="verify">验证方式</h2>
      <ol>
        <li>先发一条最短对话，确认模型通路可用。</li>
        <li>再导入一小批知识库文档，验证检索和回答是否正常。</li>
        <li>如果结果异常，先把知识库和聊天模型分开排查。</li>
      </ol>

      <h2 id="notes">注意事项</h2>
      <ul>
        <li>知识库和聊天模型最好分开配置，避免成本和效果混在一起。</li>
        <li>如果有模型缓存，更新后记得刷新。</li>
        <li>先用最小问题测试连通性，再导入文档库。</li>
      </ul>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
