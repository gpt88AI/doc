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

const CHECKLIST = `1. 先把 Provider 选成 OpenAI Compatible
2. Base URL 一定要写成 https://gpt88.cc/v1
3. API Key 使用控制台生成的真实 Key
4. 先选一个已知稳定的聊天模型
5. 发一条最小消息验证
6. 如果失败，先回到 cURL 检查接口`

const TROUBLESHOOTING = `1. 模型列表空白
   - 手动输入模型 ID
   - 到模型导航复制真实模型名

2. 返回 401
   - Key 无效或过期

3. 返回 404
   - Base URL 写错，或者没带 /v1

4. 回复很慢
   - 先换一个更轻的模型
   - 先关掉知识库和多轮长上下文`

export default function CherryStudioPage() {
  return (
    <DocPage
      path="/docs/integrations/chat/cherry-studio"
      title="Cherry Studio 接入 gpt88.cc"
      description="把 gpt88.cc 接到 Cherry Studio 的 OpenAI 兼容工作流里，适合多模型管理、提示词模板和常用对话场景。"
      headings={[
        { id: 'overview', text: '这篇教程讲什么', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'setup', text: '快速配置', level: 2 },
        { id: 'verify', text: '验证连通性', level: 2 },
        { id: 'tips', text: '使用建议', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="最稳接法">
        <p>Cherry Studio 直接按 OpenAI Compatible 接入即可，先用 <code>https://gpt88.cc/v1</code> 跑通，再切模型。</p>
      </Callout>

      <p>
        这篇教程不是只告诉你“怎么填几个框”，而是按 APIMart 那种方式，把
        进入配置、选择提供商、验证连通性、排查失败这条线完整走一遍。
      </p>

      <h2 id="overview">这篇教程讲什么</h2>
      <ul>
        <li>如何把 Cherry Studio 接到 gpt88.cc 的 OpenAI 兼容接口。</li>
        <li>如何选择一个稳定模型先跑通。</li>
        <li>如果连接失败，应该先检查什么。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">快速配置</h2>
      <CodeBlock lang="text" filename="setup" code={QUICK_SETUP} />
      <p>建议先用一条最小请求确认通路，再导入更多模型和提示词模板。</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={EXAMPLE} />

      <h2 id="verify">验证连通性</h2>
      <ol>
        <li>先在 Cherry Studio 里保存配置。</li>
        <li>新建一个对话并发送最短问题。</li>
        <li>如果能返回内容，再逐步增加上下文和提示词复杂度。</li>
        <li>如果不能返回，先用 cURL 验证 Key 和 Base URL。</li>
      </ol>

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

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
        <li><Link to="/docs/guides/complete-integration/">查看完整接入手册</Link></li>
      </ul>
    </DocPage>
  )
}
