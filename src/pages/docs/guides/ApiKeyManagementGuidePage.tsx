import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { useLocale } from '../../../lib/locale'
import ApiKeyManagementGuidePageEn from '../../en/ApiKeyManagementGuidePageEn'

const KEY_ENV = `# macOS / Linux
export GPT88_API_KEY="在创建时保存的完整 Key"

# Windows PowerShell
$env:GPT88_API_KEY="在创建时保存的完整 Key"`

const KEY_CHECKLIST = `[ ] Key 名称能说明项目、环境或用途
[ ] 已确认该 Key 使用的分组与当前可用模型
[ ] 完整 Key 已保存到环境变量或密钥管理器
[ ] 没有把 Key 放进前端、代码仓库、截图或公开日志
[ ] 已用最小请求验证，并在使用记录中找到对应请求`

export default function ApiKeyManagementGuidePage() {
  const { locale } = useLocale()
  if (locale === 'en') return <ApiKeyManagementGuidePageEn />

  return (
    <DocPage
      path="/docs/guides/api-key-management"
      title="GPT88 API Key 创建与管理"
      description="在 GPT88 控制台创建、保存、检查和轮换 API Key，并用最小请求确认密钥可用。"
      headings={[
        { id: 'scope', text: '先分清三个入口', level: 2 },
        { id: 'create', text: '创建一把可追踪的 Key', level: 2 },
        { id: 'store', text: '安全保存并配置', level: 2 },
        { id: 'verify', text: '发送请求并核对记录', level: 2 },
        { id: 'manage', text: '搜索、停用与轮换', level: 2 },
        { id: 'troubleshoot', text: '常见问题定位', level: 2 },
        { id: 'migration', text: '从其他平台迁移到 GPT88', level: 2 },
        { id: 'next', text: '相关教程', level: 2 },
      ]}
    >
      <Callout tone="info" title="完成标准">
        <p>你已为一个明确用途创建 GPT88 API Key，把它保存在服务端配置中，完成一次 API 请求，并能在 GPT88 使用记录中找到该请求。</p>
      </Callout>

      <h2 id="scope">先分清三个入口</h2>
      <ul>
        <li><strong>GPT88 控制台</strong>：登录、账户和余额入口是 <a href="https://agent.gpt88.cc" target="_blank" rel="noreferrer">agent.gpt88.cc</a>。</li>
        <li><strong>API Key 管理</strong>：登录后打开 <a href="https://agent.gpt88.cc/keys" target="_blank" rel="noreferrer">agent.gpt88.cc/keys</a> 创建和管理 Key。</li>
        <li><strong>程序调用</strong>：标准 API Base URL 使用 <code>https://api.gpt88.cc</code>；账户网页登录密码不是 API Key。</li>
      </ul>

      <h2 id="create">创建一把可追踪的 Key</h2>
      <ol>
        <li>登录 GPT88 控制台并进入「API 密钥」页面。</li>
        <li>选择“创建密钥”，用名称标明用途，例如 <code>web-prod</code>、<code>codex-dev</code> 或 <code>team-reporting</code>。按环境或应用分开创建，便于单独查用量和停用。</li>
        <li>查看当前表单提供的分组、权限或限制选项。先在模型广场确认目标模型所在分组；具体可选项和实时额度以当前账户控制台显示为准。</li>
        <li>创建后立即复制并保存完整 Key。控制台之后通常只显示脱敏值，无法从列表恢复完整密钥。</li>
      </ol>
      <Callout tone="warn" title="创建结果只复制到可信位置">
        <p>不要把完整 Key 发到聊天、工单、截图或邮件中。需要协助排查时，只提供 Key 名称或末尾几位、请求时间和 Request ID。</p>
      </Callout>

      <h2 id="store">安全保存并配置</h2>
      <p>本地验证可先通过环境变量提供凭证；生产环境使用部署平台的 Secret Manager 或等价密钥存储。</p>
      <CodeBlock lang="bash" filename="environment" code={KEY_ENV} />
      <ul>
        <li>只在服务端读取 Key。浏览器代码、移动端包和公开前端变量都不适合保存长期凭证。</li>
        <li>不要提交到 Git。若曾误提交，删除文件并不足够，需在控制台撤销泄露的 Key，再创建新 Key。</li>
        <li>为开发、测试、生产和不同应用使用独立 Key，降低泄露或异常用量的影响范围。</li>
      </ul>

      <h2 id="verify">发送请求并核对记录</h2>
      <p>在应用里使用 GPT88 Key 和标准 API Base URL。先用<Link to="/docs/quickstart/">快速开始</Link>中的 cURL 或 SDK 示例发送一个最小请求，再打开控制台「使用记录」按时间和 Key 名称检查模型、分组、请求状态与扣费。</p>
      <p>如果模型不可用，先从模型广场确认当前账户的可用分组和模型 ID；不要仅根据公开目录推断 Key 已获得权限。</p>

      <h2 id="manage">搜索、停用与轮换</h2>
      <p>API 密钥列表可按名称或 Key 搜索，并使用分组、状态筛选定位记录。定期清理不再使用的测试 Key；停用或撤销前，先确认没有仍在使用它的服务。</p>
      <ol>
        <li>创建一把新的 GPT88 Key，按用途命名并安全保存。</li>
        <li>先把新 Key 配置到一个服务或环境，发送最小请求并确认使用记录正常。</li>
        <li>逐个更新其他服务，观察它们是否已使用新 Key。</li>
        <li>确认旧 Key 不再产生请求后，在控制台撤销旧 Key。若旧 Key 已泄露，立即撤销，不要等待常规迁移窗口。</li>
      </ol>
      <p>排查成本时按 API Key、模型、分组、时间筛选使用记录；联系支持时附上时间范围、Key 名称或末尾几位、模型和 Request ID，不附完整密钥。</p>

      <h2 id="troubleshoot">常见问题定位</h2>
      <ul>
        <li><strong><code>401</code> / <code>invalid_api_key</code></strong>：检查是否误用网页登录密码、Key 是否完整、环境变量是否被当前进程读取，以及该 Key 是否已撤销。</li>
        <li><strong><code>403</code> / 权限错误</strong>：确认模型、接口或分组在当前 Key/账户下可用，并以控制台实际选项为准。</li>
        <li><strong><code>429</code></strong>：检查余额、限速和当前账户限制；不要靠重复创建 Key 来绕过账户级限制。</li>
        <li><strong>终端请求成功，客户端失败</strong>：对照客户端使用的 Base URL、认证方式和模型字段，先确认客户端确实读取了这把 Key。</li>
      </ul>
      <p>按端点、认证头、模型、余额和错误码逐项排查，参阅 <Link to="/docs/guides/api-key-first-request-failed/">API Key 首次请求失败排查</Link>。</p>

      <h2 id="migration">从其他平台迁移到 GPT88</h2>
      <p>把原有凭证当作原平台凭证处理，不要假设它能在 GPT88 使用，也不要把旧站登录密码当作新 API Key。先在 GPT88 创建新的 Key，再按客户端协议替换 Base URL、Key 和当前可用的 GPT88 模型 ID。</p>
      <p>迁移完成前保留旧客户端配置作为回退；验证新请求成功、用量记录出现后，再按原平台的安全流程撤销旧凭证。GPT88 的入口和账户迁移步骤见 <Link to="/docs/guides/gpt88-migration/">GPT88 新站迁移教程</Link>。</p>
      <CodeBlock lang="text" filename="acceptance-checklist" code={KEY_CHECKLIST} />

      <h2 id="next">相关教程</h2>
      <ul>
        <li><Link to="/docs/quickstart/">快速开始</Link>：创建 Key 后发送第一个请求。</li>
        <li><Link to="/docs/auth/">认证与计费</Link>：理解 Bearer 鉴权、余额、用量和分组倍率。</li>
        <li><Link to="/docs/guides/complete-integration/">完整接入手册</Link>：继续配置 SDK、客户端和用量核对。</li>
        <li><Link to="/docs/guides/config-export/">配置文件导出</Link>：为常见开发工具准备配置。</li>
      </ul>
    </DocPage>
  )
}
