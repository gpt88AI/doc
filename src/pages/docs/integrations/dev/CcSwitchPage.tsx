import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const FLOW = `1. 打开 CC Switch
2. 新建 gpt88-api 路由
3. 选择 OpenAI / Claude 兼容模式
4. 填入对应 Base URL 和 API Key
5. 保存并启用路由`

export default function CcSwitchIntegrationPage() {
  return (
    <DocPage path="/docs/integrations/dev/cc-switch" title="CC-Switch 接入 gpt88.cc" description="CC-Switch 的中转站路由与 OAuth 切换说明。">
      <h2>配置流程</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <h2>下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth">查看插件 OAuth 教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
