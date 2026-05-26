import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'

const SETUP = `[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://gpt88.cc/v1"
wire_api = "responses"
requires_openai_auth = true`

export default function CodexCliIntegrationPage() {
  return (
    <DocPage path="/docs/integrations/dev/codex-cli" title="Codex CLI 接入 gpt88.cc" description="Codex CLI 使用 gpt88.cc 的模型接入与工具恢复说明。">
      <h2>配置方法</h2>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={SETUP} />
      <h2>下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-tool-recovery">查看工具恢复教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
