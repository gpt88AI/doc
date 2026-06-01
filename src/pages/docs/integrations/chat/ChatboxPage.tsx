import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'

const PREPARE = `1. 已安装 ChatBox 桌面端
2. 已注册 gpt88.cc 账号并创建 API Key
3. 已确认你要接入的模型 ID
4. 已知道当前工具是 OpenAI 风格还是 Claude 风格
5. 已准备好一条最小测试消息`

const OPENAI_CONFIG = `Provider: OpenAI API
API Key: sk-你的-gpt88-api-key
API Host / API Domain: https://gpt88.cc/v1
Model: claude-haiku-4-5-20251001 或 gpt-5-2-chat-latest`

const CLAUDE_CONFIG = `如果你的 ChatBox 版本提供 Claude API 选项：

Provider: Claude API
API Key: sk-你的-gpt88-api-key
API Host / API Domain: https://gpt88.cc
Model: claude-sonnet-4-6 或 claude-haiku-4-5-20251001`

const SMOKE_TEST = `export GPT88_API_KEY="sk-你的-gpt88-api-key"

curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const TROUBLESHOOTING = `1. 连不上服务
   - 检查是否写成了 https://gpt88.cc 而不是 https://gpt88.cc/v1
   - 检查 API Key 是否完整
   - 先用 curl 验证，再回到 ChatBox

2. 模型列表为空
   - 手动输入模型 ID
   - 到 /v1/models 或模型导航复制真实模型名

3. 返回 401
   - Key 无效、过期或权限不足

4. 返回 404
   - 多半是 Base URL 或模型名写错

5. 返回很慢
   - 先换一个更轻的模型测试网络和配置`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChatboxPage() {
  return (
    <DocPage
      path="/docs/integrations/chat/chatbox"
      title="在 ChatBox 中使用 gpt88.cc"
      description="把 gpt88.cc 接入 ChatBox 桌面端的完整教程：如何配置 OpenAI 兼容接入、如何选择模型、如何验证连通性，以及常见问题怎么排查。"
      headings={[
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'launch', text: '第一步：启动 ChatBox 并开始配置', level: 2 },
        { id: 'configure', text: '第二步：配置 gpt88.cc', level: 2 },
        { id: 'provider', text: '2.1 选择模型提供商', level: 3 },
        { id: 'api-info', text: '2.2 填写 API 信息', level: 3 },
        { id: 'model', text: '2.3 选择模型', level: 3 },
        { id: 'start', text: '第三步：开始使用', level: 2 },
        { id: 'advanced', text: '高级功能', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
        { id: 'tips', text: '使用技巧', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="ChatBox 里最稳的接法">
        <p>
          绝大多数场景下，直接把 ChatBox 的 OpenAI 兼容配置指向
          <code>https://gpt88.cc/v1</code> 就够了。只要模型 ID 选对，
        你基本可以不改聊天工作流。
        </p>
      </Callout>

      <p>
        这篇教程的目标不是“知道有个配置项”，而是让你按截图一样把 ChatBox
        从空白状态接成可用状态：先填 API Key，再填 Base URL，再选模型，最后做一轮验证。
      </p>

      <h2 id="prepare">准备工作</h2>
      <p>开始之前，先确认这几件事：</p>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />
      <DocTable
        headers={['你需要什么', '建议', '原因']}
        rows={[
          [
            <strong key="k1">ChatBox 桌面端</strong>,
            '优先用最新稳定版',
            '新版本通常更好地兼容自定义 API Host 和模型选择。',
          ],
          [
            <strong key="k2">API Key</strong>,
            '在 gpt88.cc 控制台新建一把独立 Key',
            '方便按项目停用、限额和排查用量。',
          ],
          [
            <strong key="k3">模型 ID</strong>,
            '先从一个稳定模型开始，例如 gpt-5-2-chat-latest 或 claude-haiku-4-5-20251001',
            '先跑通连通性，再切换更强或更贵的模型。',
          ],
          [
            <strong key="k4">Base URL</strong>,
            'OpenAI 风格用 https://gpt88.cc/v1',
            '这是 ChatBox 最通用、最少配置的接法。',
          ],
        ]}
      />

      <Callout tone="warn" title="先决定你走哪种协议">
        <p>
          如果你当前要接的是 OpenAI 风格模型，优先按 <code>https://gpt88.cc/v1</code> 配置；
          如果你明确要走 Claude 风格，再切换到根地址。不要把两种风格混填。
        </p>
      </Callout>

      <h2 id="launch">第一步：启动 ChatBox 并开始配置</h2>
      <p>
        首次启动 ChatBox，通常会看到配置向导；如果已经配置过，也可以从设置里重新进入。
        目标只有一个：先把 API Host 和模型 Provider 配好。
      </p>
      <ol>
        <li>启动 ChatBox 应用。</li>
        <li>如果是首次使用，进入新建对话或配置向导。</li>
        <li>如果已经配置过，打开左下角设置。</li>
        <li>找到 AI Provider / 模型提供商相关配置项。</li>
      </ol>

      <h2 id="configure">第二步：配置 gpt88.cc</h2>
      <h3 id="provider">2.1 选择模型提供商</h3>
      <p>
        对 gpt88.cc 来说，最常见的方案是直接选择 <strong>OpenAI API</strong>。
        如果你的 ChatBox 版本也提供 Claude API 选项，并且你要用 Claude 系列模型，
        可以切到 Claude 风格。
      </p>

      <h3 id="api-info">2.2 填写 API 信息</h3>
      <p>推荐先按 OpenAI 风格配置：</p>
      <CodeBlock lang="text" filename="openai-config" code={OPENAI_CONFIG} />
      <p>如果你准备走 Claude 风格，再改成下面这样：</p>
      <CodeBlock lang="text" filename="claude-config" code={CLAUDE_CONFIG} />
      <p>配置时最容易出错的就是“地址形态”和“模型名”。你可以直接对照下面的简表：</p>
      <DocTable
        headers={['配置项', 'OpenAI 风格', 'Claude 风格']}
        rows={[
          ['API Key', '填写 gpt88.cc 控制台生成的 Key', '同样填写 gpt88.cc 控制台生成的 Key'],
          ['API Host / Domain', 'https://gpt88.cc/v1', 'https://gpt88.cc'],
          ['模型选择', 'gpt-5-2-chat-latest / gpt-4o-mini', 'claude-sonnet-4-6 / claude-haiku-4-5-20251001'],
        ]}
      />

      <Callout tone="warn" title="不要把路径填错">
        <p>
          OpenAI 风格通常需要 <code>/v1</code>；Claude 风格通常使用根地址。
          这类错误会直接表现为连接失败、404 或无法拉取模型列表。
        </p>
      </Callout>

      <h3 id="model">2.3 选择模型</h3>
      <p>
        配置好 Host 之后，模型选择是第二个关键点。ChatBox 支持手动输入模型 ID，
        如果下拉列表没有刷新，直接复制模型 ID 往往更快。
      </p>
      <DocTable
        headers={['场景', '建议模型', '说明']}
        rows={[
          ['快速问答', 'gpt-4o-mini / claude-haiku-4-5-20251001', '响应快，适合先验证连通性。'],
          ['通用对话', 'gpt-5-2-chat-latest / claude-sonnet-4-6', '更适合日常聊天、总结和写作。'],
          ['长上下文任务', 'claude-sonnet-4-6', '更适合长文分析和复杂推理。'],
        ]}
      />

      <h2 id="start">第三步：开始使用</h2>
      <p>
        配置完成后，回到主界面发一条最小请求。先确认能正常返回，再调整温度、最大输出长度和模型。
      </p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={SMOKE_TEST} />
      <ol>
        <li>返回主界面，新建一个对话。</li>
        <li>输入一句简单的问题，比如“用一句话介绍 gpt88.cc”。</li>
        <li>检查回复是否正常返回。</li>
        <li>如果成功，再逐步切换到更复杂的提示词。</li>
      </ol>

      <h3>调整模型参数（可选）</h3>
      <DocTable
        headers={['参数', '作用', '建议']}
        rows={[
          ['Temperature', '控制输出随机性', '0.7 适合创意，0.3 适合精确回答'],
          ['Max Tokens', '限制单次输出长度', '先从 2000-4000 试起'],
          ['Top P', '控制采样范围', '默认 0.9 通常足够'],
        ]}
      />

      <h2 id="advanced">高级功能</h2>
      <ul>
        <li>多会话管理：为不同任务建立独立聊天窗口，避免上下文串线。</li>
        <li>保存和导出对话：把有价值的讨论导出为 Markdown 或 JSON。</li>
        <li>提示词模板：把常用提示词存成模板，减少重复输入。</li>
        <li>模型切换：根据任务在快速模型和高质量模型之间切换。</li>
      </ul>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />
      <p>
        如果你已经按上面的步骤配置完，还是不通，优先去控制台和 cURL 里确认 Key、
        模型权限与 Base URL，而不是先怀疑 ChatBox 本身。
      </p>

      <h2 id="faq">常见问题</h2>
      <p><strong>Q1: 无法连接到 gpt88.cc？</strong></p>
      <ul>
        <li>先确认 API Host 是否写成了 <code>https://gpt88.cc/v1</code>。</li>
        <li>确认 API Key 是否完整，且前缀和控制台一致。</li>
        <li>先用 cURL 验证接口，再回到 ChatBox 排查客户端设置。</li>
      </ul>

      <p><strong>Q2: 模型列表里没有显示模型？</strong></p>
      <ul>
        <li>直接手动输入模型 ID。</li>
        <li>去 <Link to="/docs/api/list-models/">GET /v1/models</Link> 或 <Link to="/models/">模型导航</Link> 复制真实模型名。</li>
      </ul>

      <p><strong>Q3: 对话报错怎么办？</strong></p>
      <ul>
        <li>401: 检查 Key 是否有效。</li>
        <li>404: 检查模型名或接口路径。</li>
        <li>429: 降低并发或换低成本模型。</li>
      </ul>

      <p><strong>Q4: 怎么看用量和费用？</strong></p>
      <ul>
        <li>到 <a href="https://gpt88.cc" target="_blank" rel="noreferrer">gpt88.cc 控制台</a> 查看。</li>
        <li>建议给 ChatBox 单独用一把 Key，方便统计和停用。</li>
      </ul>

      <p><strong>Q5: ChatBox 支持哪些平台？</strong></p>
      <ul>
        <li>通常支持 Windows、macOS 和 Linux。</li>
        <li>不同版本的配置名称可能略有差异，但核心字段通常都是 API Key、API Host、Model。</li>
      </ul>

      <h2 id="tips">使用技巧</h2>
      <ol>
        <li>先跑通最小请求，再调参数。</li>
        <li>把常用模型固定成默认模型，减少每次手动输入。</li>
        <li>长任务用更强模型，简单问答用更便宜更快的模型。</li>
        <li>如果你主要做开发，建议先看 <Link to="/docs/guides/complete-integration/">完整接入手册</Link>。</li>
      </ol>

      <h2 id="next">下一步</h2>
      <ul>
        <li>
          如果你要先理解整个站点的接入心智，可以看{' '}
          <Link to="/docs/guides/gpt88-tutorial/">gpt88.cc 通用接入教程</Link>。
        </li>
        <li>
          如果你要把配置同步给别的工具，可以看{' '}
          <Link to="/docs/guides/config-export/">配置文件导出</Link>。
        </li>
        <li>
          如果你想继续看更细的 API 说明，可以看{' '}
          <Link to="/docs/quickstart/">快速开始</Link> 和{' '}
          <Link to="/docs/api/chat-completions/">Chat Completions API</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
