import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const SETUP = `1. 安装 Claude Code
2. 准备 API Key 或 OAuth 登录
3. 如果用 gpt88.cc，中转站走 OpenAI/Claude 兼容配置
4. 如果需要插件能力，改用 OAuth 登录
5. 先跑一条最小任务验证工具链`

export default function ClaudeCodeIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/dev/claude-code"
      title="Claude Code 接入 gpt88.cc"
      description="Claude Code 通过 gpt88.cc 走模型调用、OAuth 与插件能力的接入说明。"
      headings={[
        { id: 'setup', text: '快速配置', level: 2 },
        { id: 'notes', text: '模式差异', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="warn" title="先分清两种模式">
        <p>API Key 模式主要解决模型调用；OAuth 模式主要解决插件和账号权益。不要混用。</p>
      </Callout>
      <h2 id="setup">快速配置</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <h2 id="notes">模式差异</h2>
      <ul>
        <li>API Key 模式：更适合直接调用模型。</li>
        <li>OAuth 模式：更适合插件、扩展能力和账号权益。</li>
      </ul>
      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth">查看 Codex 插件 OAuth 教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
