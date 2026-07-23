import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import { SeoIntentSections } from '../../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../../components/seo/SeoIntentMeta'
import ClinePageEn from '../../../en/ClinePageEn'

const SETUP = `Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6`

const FLOW = `1. 打开 VS Code
2. 打开 Cline 设置
3. Provider 选择 OpenAI Compatible
4. 填入 Base URL 和 API Key
5. 添加默认模型
6. 先让 Cline 读取一个小文件验证工具链`

const TROUBLESHOOTING = `1. Cline 不调用工具
   - 先确认 VS Code 权限和工作区是否正常

2. 模型连接失败
   - 先用 curl 验证 gpt88.cc

3. 输出成本偏高
   - 降低上下文范围
   - 先用小模型做简单任务`

export default function ClineIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ClinePageEn />

  return (
    <DocPage
      path="/docs/integrations/dev/cline"
      title="Cline 配置 OpenAI 兼容 API"
      description="Cline 自定义 OpenAI 兼容提供商的配置、最短请求和常见错误排查。"
      headings={[
        { id: 'setup', text: '配置方法', level: 2 },
        { id: 'verify', text: '验证方式', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
        ...seoIntentHeadings('cline'),
      ]}
    >
      <Callout tone="info" title="先跑通小任务">
        <p>Cline 会读写文件和运行工具，先用小任务验证模型与文件权限，再交给它大规模改代码。</p>
      </Callout>

      <h2 id="setup">配置方法</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="verify">验证方式</h2>
      <ol>
        <li>让 Cline 解释当前项目 README。</li>
        <li>让它修改一个无风险的小文件。</li>
        <li>确认文件确实落盘，再执行复杂任务。</li>
      </ol>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
      <SeoIntentSections intent="cline" />
    </DocPage>
  )
}
