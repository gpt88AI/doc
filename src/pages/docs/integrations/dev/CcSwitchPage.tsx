import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const PREPARE = `1. 已安装 CC-Switch
2. 已安装需要被路由的工具，例如 Codex CLI / Claude Code / Cursor
3. 已准备 gpt88.cc API Key
4. 已确认要配置 OpenAI 兼容路由还是 Claude 兼容路由
5. 已知道插件能力需要 OAuth，模型中转使用 API Key`

const ROUTES = `OpenAI 兼容路由
Name: gpt88-openai
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Default Model: gpt-5-2-chat-latest

Claude 兼容路由
Name: gpt88-claude
Base URL: https://gpt88.cc
API Key: sk-你的-gpt88-api-key
Default Model: claude-sonnet-4-6`

const FLOW = `1. 打开 CC-Switch
2. 进入 Routes / Providers / API 路由配置
3. 新建 gpt88-openai 路由
4. Base URL 填 https://gpt88.cc/v1
5. API Key 填 gpt88.cc 控制台生成的 Key
6. 填一个默认聊天模型
7. 保存路由
8. 启用路由
9. 重启目标工具并验证`

const OAUTH_FLOW = `1. 如果目标是 Codex / ChatGPT 插件能力，先退出 API Key 登录
2. 清理 OPENAI_API_KEY / OPENAI_BASE_URL 等环境变量
3. 在工具里重新走 OAuth 登录
4. 确认 CC-Switch 路由开启
5. 重新开一个干净会话测试插件是否可见`

const VERIFY = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [{"role": "user", "content": "测试 CC-Switch 路由"}]
  }'`

const TROUBLESHOOTING = `1. 工具仍然走旧地址
   - 确认 CC-Switch 路由已经启用
   - 重启终端和目标工具

2. 404
   - OpenAI 兼容路由必须带 /v1
   - Claude 兼容路由通常使用根地址

3. 插件不可用
   - 不要继续在 API Key 模式排查
   - 退出 API Key 登录后改用 OAuth

4. 路由看起来开启但请求失败
   - 先用 curl 直接请求 gpt88.cc
   - 再排查 CC-Switch 转发层`

export default function CcSwitchIntegrationPage() {
  return (
    <DocPage
      path="/docs/integrations/dev/cc-switch"
      title="CC-Switch 接入 gpt88.cc"
      description="CC-Switch 的 gpt88.cc 中转站路由、OpenAI/Claude 协议差异、OAuth 切换和排障教程。"
      headings={[
        { id: 'overview', text: '适用场景', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'routes', text: '路由怎么填', level: 2 },
        { id: 'flow', text: '逐步配置', level: 2 },
        { id: 'oauth', text: 'OAuth 场景', level: 2 },
        { id: 'verify', text: '验证路由', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="CC-Switch 的价值">
        <p>
          CC-Switch 适合在多个工具之间统一切换中转站路由。模型调用走 gpt88.cc API Key；
          插件能力仍然要看目标工具是否使用 OAuth 登录。
        </p>
      </Callout>

      <h2 id="overview">适用场景</h2>
      <ul>
        <li>你有多个开发工具，需要统一切换 gpt88.cc 路由。</li>
        <li>你想把 OpenAI 兼容和 Claude 兼容配置分开管理。</li>
        <li>你需要在 API Key 模型调用和 OAuth 插件能力之间切换。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="routes">路由怎么填</h2>
      <p>先按协议拆成两条路由。不要把 <code>/v1</code> 同时填到所有协议里。</p>
      <CodeBlock lang="text" filename="routes" code={ROUTES} />

      <h2 id="flow">逐步配置</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />

      <h2 id="oauth">OAuth 场景</h2>
      <p>
        如果你是为 Codex 插件、ChatGPT 账号能力或类似 OAuth 能力配置，重点不是模型
        Base URL，而是登录模式是否正确。
      </p>
      <CodeBlock lang="text" filename="oauth-flow" code={OAUTH_FLOW} />

      <h2 id="verify">验证路由</h2>
      <p>先绕过工具层，用最小请求验证 gpt88.cc 本身可用，再回到 CC-Switch。</p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={VERIFY} />

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/guides/codex-plugins-oauth">查看插件 OAuth 教程</Link></li>
        <li><Link to="/docs/integrations/dev/codex-cli">查看 Codex CLI 接入教程</Link></li>
        <li><Link to="/docs/integrations">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
