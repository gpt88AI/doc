import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const SETUP = `1. 安装 Claude Code
2. 准备 API Key 或 OAuth 登录
3. 如果用 gpt88.cc，中转站走 OpenAI/Claude 兼容配置
4. 如果需要插件能力，改用 OAuth 登录
5. 先跑一条最小任务验证工具链`

const CHECKLIST = `1. 先判断你要的是模型调用还是插件能力
2. 模型调用优先走 API Key
3. 插件能力优先走 OAuth
4. 切换前先清理旧环境变量
5. 用最小任务验证切换是否成功`

const TROUBLESHOOTING = `1. 插件不可用
   - 先确认是不是 API Key 模式
   - 如果要插件，改用 OAuth

2. 反复 reconnect
   - 检查代理变量
   - 检查会话是否被旧配置污染

3. 模型调用失败
   - 先检查 Base URL 和 Key
   - 再确认模型名`

export default function ClaudeCodeIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/dev/claude-code"
      title="Claude Code 接入 gpt88.cc"
      description="Claude Code 通过 gpt88.cc 走模型调用、OAuth 与插件能力的接入说明。"
      headings={[
        { id: 'overview', text: '先理解这页讲什么', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'setup', text: '快速配置', level: 2 },
        { id: 'notes', text: '模式差异', level: 2 },
        { id: 'verify', text: '验证方法', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="warn" title="先分清两种模式">
        <p>API Key 模式主要解决模型调用；OAuth 模式主要解决插件和账号权益。不要混用。</p>
      </Callout>

      <p>
        Claude Code 这里最容易出错的是“把模型接入”和“把插件登录”混成一件事。
        如果目标只是让模型可用，API Key 就够了；如果目标是插件与账号权益，必须走 OAuth。
      </p>

      <h2 id="overview">先理解这页讲什么</h2>
      <ul>
        <li>模型调用怎么接 gpt88.cc。</li>
        <li>插件能力为什么会和 OAuth 绑定。</li>
        <li>切换时要先清理什么。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="setup">快速配置</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <h2 id="notes">模式差异</h2>
      <ul>
        <li>API Key 模式：更适合直接调用模型。</li>
        <li>OAuth 模式：更适合插件、扩展能力和账号权益。</li>
      </ul>

      <h2 id="verify">验证方法</h2>
      <ol>
        <li>先跑一条简单任务，看模型输出是否正常。</li>
        <li>如果插件面板不可见，再切换到 OAuth 流程。</li>
        <li>切换后重启会话，确认环境变量没有残留。</li>
      </ol>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth">查看 Codex 插件 OAuth 教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
