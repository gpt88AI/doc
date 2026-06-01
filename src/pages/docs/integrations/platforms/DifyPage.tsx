import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const PREPARE = `1. 已有 Dify 管理员权限
2. 已准备 gpt88.cc API Key
3. 已确认聊天模型 ID
4. 如果要做知识库，另外确认 embedding 模型
5. 已准备一个最小应用用于测试`

const PROVIDER_SETUP = `Provider: OpenAI Compatible
API Key: sk-你的-gpt88-api-key
API Base URL: https://gpt88.cc/v1
Model Type: LLM
Model Name: gpt-5-2-chat-latest 或 claude-sonnet-4-6`

const APP_SETUP = `1. 打开 Dify 控制台
2. 进入 Settings / Model Provider
3. 新增 OpenAI Compatible Provider
4. 填入 gpt88.cc API Key
5. Base URL 填 https://gpt88.cc/v1
6. 保存后进入应用
7. 在应用模型设置里选择刚才添加的模型
8. 发起一次最小对话测试`

const WORKFLOW_SETUP = `1. 新建 Chatflow 或 Workflow
2. 在 LLM 节点选择 gpt88.cc 模型
3. 输入一个固定测试问题
4. 运行节点，观察输出和错误信息
5. 再逐步加入知识库、工具和复杂 Prompt`

const KNOWLEDGE_NOTES = `知识库场景需要分开配置：

Chat Model: 负责最终回答
Embedding Model: 负责文档向量化
Rerank Model: 负责结果重排，可按需要配置

不要只配置聊天模型就直接导入大量知识库。先用 1-2 个短文档验证切块、召回和回答效果。`

const TROUBLESHOOTING = `1. Provider 保存失败
   - 检查 Base URL 是否为 https://gpt88.cc/v1
   - 检查 API Key 是否完整

2. 应用里看不到模型
   - 确认模型已添加到 Dify Provider
   - 手动输入真实模型 ID

3. Workflow 节点报错
   - 先单独测试 LLM 节点
   - 再接知识库或工具节点

4. 知识库回答不准
   - 调整切块大小
   - 检查 embedding 模型是否配置
   - 减少一次性导入的文档量

5. 成本不清楚
   - 到 gpt88.cc 控制台查看人民币余额和真实扣费`

export default function DifyIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/platforms/dify"
      title="Dify 接入 gpt88.cc"
      description="把 gpt88.cc 接入 Dify 平台、Chatflow、Workflow 和知识库的逐步教程。"
      headings={[
        { id: 'overview', text: '教程目标', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'provider', text: '第一步：添加模型供应商', level: 2 },
        { id: 'app', text: '第二步：接入应用', level: 2 },
        { id: 'workflow', text: '第三步：接入工作流', level: 2 },
        { id: 'knowledge', text: '知识库配置', level: 2 },
        { id: 'verify', text: '验证方式', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="Dify 推荐接法">
        <p>
          Dify 使用 OpenAI Compatible Provider 接入 gpt88.cc，Base URL 填
          <code>https://gpt88.cc/v1</code>。聊天模型、embedding 模型和知识库参数要分开验证。
        </p>
      </Callout>

      <h2 id="overview">教程目标</h2>
      <ul>
        <li>在 Dify 模型供应商里添加 gpt88.cc。</li>
        <li>把模型应用到普通聊天应用。</li>
        <li>在 Workflow / Chatflow 里验证 LLM 节点。</li>
        <li>把知识库相关模型和聊天模型拆开排查。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="provider">第一步：添加模型供应商</h2>
      <p>进入 Dify 后台的模型供应商设置，新增 OpenAI 兼容供应商。</p>
      <CodeBlock lang="text" filename="provider" code={PROVIDER_SETUP} />

      <h2 id="app">第二步：接入应用</h2>
      <p>供应商保存成功后，再把模型挂到具体应用里。</p>
      <CodeBlock lang="text" filename="app-setup" code={APP_SETUP} />

      <h2 id="workflow">第三步：接入工作流</h2>
      <p>
        Dify 工作流排障要从单节点开始。先让 LLM 节点独立成功，再接知识库、HTTP 工具或变量处理。
      </p>
      <CodeBlock lang="text" filename="workflow" code={WORKFLOW_SETUP} />

      <h2 id="knowledge">知识库配置</h2>
      <CodeBlock lang="text" filename="knowledge" code={KNOWLEDGE_NOTES} />

      <h2 id="verify">验证方式</h2>
      <ol>
        <li>在模型供应商页面保存并测试连接。</li>
        <li>在普通聊天应用里发一条最短问题。</li>
        <li>在 Workflow 里单独运行 LLM 节点。</li>
        <li>如果使用知识库，只导入一个短文档做第一次验证。</li>
      </ol>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/api/chat-completions/">查看 Chat Completions API</Link></li>
        <li><Link to="/docs/guides/complete-integration/">查看完整接入手册</Link></li>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
