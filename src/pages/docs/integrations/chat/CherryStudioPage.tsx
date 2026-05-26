import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const QUICK_SETUP = `1. 打开 Cherry Studio
2. 进入模型提供商 / API 配置
3. 选择 OpenAI Compatible
4. Base URL 填 https://gpt88.cc/v1
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 模型先选一个稳定可用的聊天模型
7. 发送一条最小消息测试连通性`

const EXAMPLE = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{"role":"user","content":"介绍一下 gpt88.cc"}]
  }'`

export default function CherryStudioPage() {
  return (
    <DocPage
      path="/docs/integrations/chat/cherry-studio"
      title="Cherry Studio 接入 gpt88.cc"
      description="把 gpt88.cc 接到 Cherry Studio 的 OpenAI 兼容工作流里，适合多模型管理、提示词模板和常用对话场景。"
      headings={[
        { id: 'setup', text: '快速配置', level: 2 },
        { id: 'tips', text: '使用建议', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="最稳接法">
        <p>Cherry Studio 直接按 OpenAI Compatible 接入即可，先用 <code>https://gpt88.cc/v1</code> 跑通，再切模型。</p>
      </Callout>

      <h2 id="setup">快速配置</h2>
      <CodeBlock lang="text" filename="setup" code={QUICK_SETUP} />
      <p>建议先用一条最小请求确认通路，再导入更多模型和提示词模板。</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={EXAMPLE} />

      <h2 id="tips">使用建议</h2>
      <ul>
        <li>把常用模型固定成默认项，减少每次手动切换。</li>
        <li>长上下文任务优先选更强模型，快速问答优先选低成本模型。</li>
        <li>给不同项目单独建 Key，方便统计成本和停用。</li>
      </ul>

      <h2 id="faq">常见问题</h2>
      <ul>
        <li>如果拉不到模型列表，手动输入模型 ID。</li>
        <li>如果报 404，优先检查 Base URL 是否带了正确的 <code>/v1</code>。</li>
        <li>如果返回 401，确认 Key 是否复制完整。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
        <li><Link to="/docs/guides/complete-integration">查看完整接入手册</Link></li>
      </ul>
    </DocPage>
  )
}
