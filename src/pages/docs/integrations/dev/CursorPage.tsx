import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import CursorPageEn from '../../../en/CursorPageEn'

const SETUP = `OpenAI API
Base URL: https://gpt88.cc/v1
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6 或 gpt-5-2-chat-latest`

const STEPS = `1. 打开 Cursor 设置
2. 找到 Models / API Keys / OpenAI Compatible 配置
3. 填入 gpt88.cc API Key
4. Base URL 填 https://gpt88.cc/v1
5. 手动添加模型 ID
6. 保存后在 Composer 或 Chat 里发起测试`

const TROUBLESHOOTING = `1. 模型不可选
   - 手动添加模型 ID

2. 请求 401
   - Key 无效或被环境变量覆盖

3. 请求 404
   - Base URL 少了 /v1 或模型名写错

4. Agent 改代码不稳定
   - 先换更强模型
   - 减少一次性上下文`

export default function CursorIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <CursorPageEn />

  return (
    <DocPage
      path="/docs/integrations/dev/cursor"
      title="Cursor 接入 gpt88.cc"
      description="在 Cursor 中使用 gpt88.cc 作为 OpenAI Compatible 提供商。"
      headings={[
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'setup', text: '配置方法', level: 2 },
        { id: 'verify', text: '验证方法', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="Cursor 推荐用 OpenAI Compatible">
        <p>Cursor 接 gpt88.cc 的核心就是两项：<code>API Key</code> 和 <code>https://gpt88.cc/v1</code>。</p>
      </Callout>

      <h2 id="prepare">准备工作</h2>
      <ul>
        <li>准备一把 gpt88.cc API Key。</li>
        <li>确认要用的模型 ID。</li>
        <li>先决定默认模型，再配置到 Cursor。</li>
      </ul>

      <h2 id="setup">配置方法</h2>
      <CodeBlock lang="text" filename="steps" code={STEPS} />
      <CodeBlock lang="text" filename="setup" code={SETUP} />
      <p>如果你在 Cursor 中同时维护多个模型，建议先固定一个默认模型再逐步扩展。</p>

      <h2 id="verify">验证方法</h2>
      <ol>
        <li>打开 Cursor Chat，发送一句简单问题。</li>
        <li>再打开 Composer，让它解释当前项目里的一个小文件。</li>
        <li>如果两步都通过，再让 Agent 执行改代码任务。</li>
      </ol>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
