import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * 文档：配置文件导出
 *
 * 文档来源：PM 任务 t-20260509-12if9n；草稿 doc-20260509-0myy76；面向用户与开发者。
 * 内容映射 PM 草稿 (config-export-doc.md) 的 8 个章节，章节标题与 Markdown 严格对齐。
 *
 * 编辑约束：
 * - 所有指向控制台的链接都使用 <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
 * - 所有 base_url（china.claudecoder.me / world.claudecoder.me / gpt88.cc/v1）作为代码字面量呈现
 * - 价格 / 限速 / SLA / 配额 / 模型可用性等数值不写死——以控制台为准，本文档不写死数值
 * - CC Switch 的自定义协议、桌面端调起、import URL 具体格式不写死，截图未提供，控制台行为为准
 */

const QUICK_FLOW = `1. 在控制台「API Keys」中创建或选择一个 API Key
2. 打开「配置文件导出」页面
3. 选择 API Key（默认列出你账号下的所有 Key）
4. 选择模型（如 claude-haiku-4-5-20251001 / claude-opus-4-7 / gpt-5.4 等）
5. 选择调用线路（中国大陆 → 中国调用；海外/跨境 → 海外全球加速）
6. 选择要接入的工具 tab（Claude Code / Cursor / Python SDK …）
7a. 复制 Base URL + 复制工具对应的配置片段，粘贴到目标工具的设置中；
    或
7b. 选择 CC Switch 导入目标，点击「一键导入到 CC Switch」
8. 在目标工具中触发一次请求，确认接入成功`

const BASE_URL_RULES = `OpenAI 兼容工具 / SDK
  → Base URL：以 /v1 结尾
  → 例：https://china.claudecoder.me/v1

Anthropic / Claude 工具 / SDK
  → Base URL：根地址，不带 /v1
  → 例：https://china.claudecoder.me

任何工具
  → 优先使用页面顶部「当前工具推荐 Base URL」给出的值，已经按线路 + 工具 tab 拼好`

/* ──────────────────────────────────────────────────────────────────
 * 表格：调用线路 / Base URL 风格 / 工具 tab / 导入目标差异 / 排障
 *
 * 用纯 Tailwind 实现深色文档站表格，移动端外层加 overflow-x-auto 横向滚动。
 * 不重新封装表格组件——本页是单次使用，复用现有 prose 体系下的 markdown table 风格。
 * ────────────────────────────────────────────────────────────────── */

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[36rem] text-left text-sm">
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
                <td
                  key={j}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
                >
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

export default function ConfigExportPage() {
  return (
    <DocPage
      path="/docs/guides/config-export"
      title="配置文件导出"
      description="把 API Key + 模型 + 调用线路打包给 Claude Code、Cursor、Python SDK、CC Switch 等工具的一站式接入助手。"
      headings={[
        { id: 'purpose', text: '这个页面是用来做什么的', level: 2 },
        { id: 'flow', text: '快速开始流程', level: 2 },
        { id: 'fields', text: '字段说明', level: 2 },
        { id: 'field-key', text: '选择 API Key', level: 3 },
        { id: 'field-model', text: '选择模型', level: 3 },
        { id: 'field-route', text: '选择调用线路', level: 3 },
        { id: 'field-baseurl', text: 'API 接入地址', level: 3 },
        { id: 'field-tool', text: '选择工具', level: 3 },
        { id: 'field-cc-switch', text: 'CC Switch 一键导入', level: 3 },
        { id: 'baseurl-rules', text: 'Base URL 使用规则速查', level: 2 },
        { id: 'cc-switch', text: 'CC Switch 一键导入说明', level: 2 },
        { id: 'security', text: '安全与排障', level: 2 },
        { id: 'relations', text: '与本文档站现有内容的关系', level: 2 },
        { id: 'feedback', text: '反馈渠道', level: 2 },
      ]}
    >
      <Callout tone="info" title="文档定位">
        <p>
          本文档面向 gpt88.cc API 用户与开发者，说明
          {' '}
          <a
            href="https://gpt88.cc"
            target="_blank"
            rel="noreferrer"
          >
            gpt88.cc 控制台
          </a>{' '}
          内「配置文件导出」页面的完整使用方法。具体菜单路径、字段顺序与按钮文案以控制台为准。
        </p>
      </Callout>

      {/* ── 1. 这个页面是用来做什么的 ─────────────────────────────── */}
      <h2 id="purpose">这个页面是用来做什么的</h2>
      <p>「配置文件导出」是一站式接入助手。它把以下四个变量组合成可以直接复制粘贴或一键导入的配置：</p>
      <ul>
        <li>
          你已创建的 <strong>API Key</strong>（控制台中签发的 <code>sk-...</code> 凭证）
        </li>
        <li>
          这次接入想默认使用的 <strong>模型</strong>（如 <code>claude-haiku-4-5-20251001</code>）
        </li>
        <li>
          适合你网络环境的 <strong>调用线路</strong>（中国大陆 / 海外全球加速）
        </li>
        <li>
          你要接入的 <strong>目标工具</strong>（Claude Code、Cursor、OpenCode、OpenClaw、Hermes、cURL、Python SDK、Anthropic SDK 等）
        </li>
      </ul>

      <p>页面会按以上四项动态生成：</p>
      <ul>
        <li>
          推荐使用的 <strong>Base URL</strong>（OpenAI 兼容版与 Anthropic / Claude 兼容版）
        </li>
        <li>
          每个工具对应的 <strong>配置片段</strong> 或 <strong>导入说明</strong>
        </li>
        <li>
          <strong>CC Switch 一键导入</strong> 入口，直接把生成的应用配置写入 CC Switch（支持 Codex、Claude Code、OpenCode、OpenClaw 等目标）
        </li>
      </ul>

      <p>
        如果你只是想快速试一次接口调用，参见站内文档{' '}
        <Link to="/docs/quickstart">快速开始</Link>。
        如果你要把 gpt88.cc 接到本地工具或团队 IDE，使用本页面更省事。
      </p>

      {/* ── 2. 快速开始流程 ─────────────────────────────────────── */}
      <h2 id="flow">快速开始流程（推荐顺序）</h2>
      <CodeBlock lang="text" filename="recommended order" code={QUICK_FLOW} />

      {/* ── 3. 字段说明 ──────────────────────────────────────────── */}
      <h2 id="fields">字段说明（按页面顺序）</h2>

      <h3 id="field-key">3.1 选择 API Key</h3>
      <ul>
        <li>下拉列出当前账号下所有可用的 API Key（如 <code>ClaudeCode（sk-F9flH0n…）</code>）。</li>
        <li>
          列表里只显示 Key 的名称和首尾几位字符，<strong>完整 Key 不会在前端裸露</strong>；
          导出生成的配置文件中会写入完整 Key。
        </li>
      </ul>
      <p><strong>安全提醒</strong>：</p>
      <ul>
        <li>不要把生成的配置文件、截图或日志直接发到群聊 / 公共代码仓库 / 第三方截图工具。</li>
        <li>在做技术分享或写文档时，请把 Key 中段替换为 <code>***</code>，例如 <code>sk-F9flH0n***ABC1</code>。</li>
        <li>
          如果误泄漏了 Key，请立刻在{' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            控制台
          </a>{' '}
          「API Keys」中<strong>禁用并重新生成</strong>。
        </li>
        {/*
         * Key 的权限范围、用量上限、可调用模型范围以控制台为准，本文档不写死具体数值。
         */}
        <li>Key 的权限范围、用量上限、可调用模型范围以控制台显示为准，本文档不写死具体数值。</li>
      </ul>

      <h3 id="field-model">3.2 选择模型</h3>
      <ul>
        <li>该字段决定生成的配置文件中工具的「默认模型」。</li>
        <li>
          默认模型可以是任意可用的聊天模型（如 <code>claude-opus-4-7</code>、
          <code>claude-haiku-4-5-20251001</code>、<code>gpt-5.4</code>、
          <code>deepseek-v4-pro</code> 等）。
        </li>
        <li>
          <strong>切换模型后必须重新生成或重新导入</strong>：旧配置中的模型字段不会自动更新。
        </li>
        <li>
          工具运行时如果需要切换模型，可以在工具自身的 UI 或运行参数中临时覆盖
          （例如 Claude Code 在会话中可指定 model；cURL 请求可在 body 里换 <code>model</code> 字段）。
        </li>
      </ul>

      <h3 id="field-route">3.3 选择调用线路</h3>
      <p>页面提供两个等价的服务端点，作用完全相同，只是网络路由不同。请按你的网络环境选：</p>
      <DocTable
        headers={['线路', '推荐场景', '示例地址']}
        rows={[
          [
            <strong key="r1-1">中国调用</strong>,
            '国内办公网络、中国大陆 IDC、个人开发机走中国出口',
            <code key="r1-3">https://china.claudecoder.me</code>,
          ],
          [
            <strong key="r2-1">海外全球加速</strong>,
            '海外服务器、海外团队、跨境网络、走 VPN 的用户',
            <code key="r2-3">https://world.claudecoder.me</code>,
          ],
        ]}
      />
      <ul>
        <li>
          主域 <code>https://gpt88.cc</code> 同样作为等价 API 端点可用，
          文档站默认在示例代码中使用 <code>https://gpt88.cc/v1</code>。
        </li>
        <li>切换线路只影响 Base URL，不影响 API Key、模型或鉴权方式。</li>
        <li>
          <strong>何时切换线路</strong>：请求延迟显著偏高、连接被重置或超时、工具下载配置时被卡住，
          可以切到另一条线路重新生成配置再试。
        </li>
      </ul>

      <h3 id="field-baseurl">3.4 API 接入地址</h3>
      <p>页面会根据所选「调用线路」实时显示推荐 Base URL，并以两张卡片形式给出两种风格：</p>
      <DocTable
        headers={['风格', '路径形态', '适用场景']}
        rows={[
          [
            <strong key="b1-1">OpenAI 兼容 Base URL</strong>,
            <code key="b1-2">https://china.claudecoder.me/v1</code>,
            'OpenAI 风格 SDK / 工具（OpenAI Python SDK、OpenAI Node.js SDK、Cursor、OpenCode、按 OpenAI 协议写的 cURL、Hermes 等）',
          ],
          [
            <strong key="b2-1">Anthropic / Claude Base URL</strong>,
            <code key="b2-2">https://china.claudecoder.me</code>,
            'Anthropic 风格 SDK / 工具（Claude Code、OpenClaw、Anthropic Python / TypeScript SDK 等）',
          ],
        ]}
      />
      <ul>
        <li>
          两个地址对应同一组上游服务，路由规则不同：OpenAI 风格的 SDK 期望最终 URL 是
          {' '}<code>…/v1/chat/completions</code>，所以 Base URL 末尾加 <code>/v1</code>；
          Anthropic 风格 SDK 自己会拼 <code>/v1/messages</code>，所以 Base URL 不带 <code>/v1</code>。
        </li>
        <li>
          <strong>拼错的典型症状</strong>：404 Not Found、
          <code>unknown route /v1/v1/...</code>、
          <code>unknown route /messages</code>。
          出现这些错误时，先确认你用的 SDK 是 OpenAI 还是 Anthropic 风格，并对照上表的路径形态。
        </li>
        <li>
          点击地址或右上角「复制当前工具地址」按钮可一键复制；当前工具地址会随上方
          「调用线路 + 工具 tab」自动联动，避免你手动拼接。
        </li>
      </ul>

      <h3 id="field-tool">3.5 选择工具</h3>
      <p>页面以 tab 形式列出常见的接入目标，每个 tab 会生成对应工具能识别的配置：</p>
      <DocTable
        headers={['工具 tab', '配置形态', '备注']}
        rows={[
          [<strong key="t1-1">Claude Code</strong>, 'Claude 风格配置（包含 baseURL、apiKey、defaultModel）', 'Anthropic SDK 风格'],
          [<strong key="t2-1">Hermes</strong>, '工具自有配置文件', '按 OpenAI 兼容协议接入'],
          [<strong key="t3-1">OpenClaw</strong>, 'Anthropic 风格配置', '配合 Anthropic Base URL 使用'],
          [<strong key="t4-1">OpenCode</strong>, 'OpenAI 风格配置', '配合 OpenAI Base URL 使用'],
          [<strong key="t5-1">Cursor</strong>, 'Cursor 设置中的「Custom OpenAI Base URL」+ 模型映射', 'Settings → Models → Custom'],
          [<strong key="t6-1">cURL</strong>, '一段可直接 curl 的命令片段', '验证连通性最快的方式'],
          [<strong key="t7-1">Python SDK</strong>, <><code>OpenAI</code> 或 <code>Anthropic</code> 客户端初始化代码片段</>, '按所选工具自动选择 SDK'],
          [<strong key="t8-1">Anthropic SDK</strong>, 'Anthropic Python / TypeScript 客户端示例', '配合 Anthropic Base URL 使用'],
        ]}
      />
      <p>切换 tab 时，页面下方的代码块或配置片段会自动重写；右侧「复制」按钮也会随之更新内容。</p>
      <Callout tone="info">
        <p>
          上表中各工具的「配置形态」描述基于截图与通用习惯；
          具体字段以控制台实际生成的配置为准。
        </p>
      </Callout>

      <h3 id="field-cc-switch">3.6 CC Switch 一键导入</h3>
      <p>
        CC Switch 是统一管理多套上游 API 配置的桌面客户端。本节让你跳过手动复制粘贴：
      </p>
      <ul>
        <li>
          <strong>导入目标</strong>：Codex、Claude Code、OpenCode、OpenClaw 等。
          导入目标决定 CC Switch 中创建的「应用配置」名称和适用对象。
        </li>
        <li>
          <strong>一键导入到 CC Switch</strong>：点击后浏览器会调起本地 CC Switch（通过自定义协议）。
          如果你已安装并登录了 CC Switch，配置会直接写入。
        </li>
        <li>
          <strong>复制导入链接</strong>：在浏览器无法调起 CC Switch（例如系统未注册自定义协议、或浏览器安全策略阻止）时，
          使用此按钮把导入链接复制到剪贴板，再在 CC Switch 内手动粘贴导入。
        </li>
      </ul>
      <p><strong>导入前的校验清单</strong>：</p>
      <ol>
        <li>API Key 已选中且未禁用</li>
        <li>模型字段为目标应用支持的模型（例如 Claude Code 应选择 Claude 系模型）</li>
        <li>调用线路与目标应用所在网络匹配</li>
        <li>工具 tab 与导入目标一致（例如要导入到 Claude Code，工具 tab 也建议选 Claude Code）</li>
      </ol>

      {/* ── 4. Base URL 使用规则速查 ────────────────────────────── */}
      <h2 id="baseurl-rules">Base URL 使用规则速查</h2>
      <CodeBlock lang="text" filename="rules of thumb" code={BASE_URL_RULES} />
      <p>
        如果你既要在 OpenAI 风格工具中接入，又要在 Anthropic 风格工具中接入，
        可以使用同一个 API Key，只是 Base URL 路径形态不同。
      </p>

      {/* ── 5. CC Switch 一键导入说明 ───────────────────────────── */}
      <h2 id="cc-switch">CC Switch 一键导入说明</h2>

      <h3>5.1 适用场景</h3>
      <ul>
        <li>你已经在桌面安装了 CC Switch，并经常在多套配置之间切换（例如在 Claude Code、Codex、OpenCode 之间）。</li>
        <li>你不想手动维护每个工具的 <code>~/.config/...</code> 文件。</li>
        <li>你希望 API Key、Base URL、默认模型在多个工具之间保持一致。</li>
      </ul>

      <h3>5.2 导入目标差异</h3>
      <DocTable
        headers={['导入目标', 'CC Switch 中生成的配置类型']}
        rows={[
          [<strong key="c1-1">Codex</strong>, 'OpenAI 风格 Base URL；OpenAI Compatible 调用'],
          [<strong key="c2-1">Claude Code</strong>, 'Anthropic 风格 Base URL；Claude CLI 风格调用'],
          [<strong key="c3-1">OpenCode</strong>, 'OpenAI 风格 Base URL；OpenCode 兼容'],
          [<strong key="c4-1">OpenClaw</strong>, 'Anthropic 风格 Base URL；OpenClaw 兼容'],
        ]}
      />
      <p>实际生成的字段以 CC Switch 的最新版本为准；本表只描述大致风格归属。</p>

      <h3>5.3 一键导入失败时的兜底</h3>
      <ul>
        <li>浏览器报「无法访问该协议 / Custom protocol blocked」→ 改用「复制导入链接」，在 CC Switch 内手动粘贴。</li>
        <li>CC Switch 收到后未弹出 → 检查 CC Switch 是否已登录、版本是否过旧；必要时退出重启。</li>
        <li>导入后调用失败 → 检查导入的 API Key 是否仍在有效期、模型是否仍可用、线路是否被重置。</li>
      </ul>

      {/* ── 6. 安全与排障 ───────────────────────────────────────── */}
      <h2 id="security">安全与排障</h2>

      <h3>6.1 API Key 安全</h3>
      <ul>
        <li>不要把 Key 放进 Git 仓库；本地用 <code>.env</code>、<code>~/.aws/credentials</code> 等机制隔离。</li>
        <li>不要在公开论坛、博客、群聊、视频教程中展示完整 Key。</li>
        <li>导出的配置文件本身就含完整 Key，等同于密码：传输用私聊或加密通道，存档用受限目录。</li>
        <li>
          当怀疑 Key 已泄漏：进入{' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            控制台
          </a>{' '}
          禁用旧 Key、生成新 Key、回到本页面重新导出配置、在所有用到的工具里更新。
        </li>
      </ul>

      <h3>6.2 线路选择建议</h3>
      <ul>
        <li>默认按你的物理位置选：中国大陆 → 中国调用；其他地区 → 海外全球加速。</li>
        <li>
          如果当前线路出现连续失败、超时或下载缓慢，
          <strong>先切到另一条线路再排查其他原因</strong>——线路切换是最便宜的修复尝试。
        </li>
        <li>不要在生产环境频繁切线路；切换会改变 Base URL，使所有已部署服务的请求路径变化。</li>
      </ul>

      <h3>6.3 常见问题与处理</h3>
      <DocTable
        headers={['问题', '可能原因', '处理']}
        rows={[
          [
            <>请求返回 <strong>401 Unauthorized</strong></>,
            'API Key 错误、被禁用、复制时少了字符',
            <>重新从控制台复制 Key，或重新生成；确认 <code>Authorization: Bearer sk-...</code> 头没拼错</>,
          ],
          [
            <>请求返回 <strong>404 Not Found</strong> 或 <code>unknown route</code></>,
            <>OpenAI 风格 SDK 用了不带 <code>/v1</code> 的 Base URL，或 Anthropic 风格 SDK 用了带 <code>/v1</code> 的 Base URL</>,
            '对照本文 §3.4 的「路径形态」表选对版本',
          ],
          [
            <>请求返回 <strong>429</strong></>,
            '用量配额或上游限流',
            <>控制台查看用量；降低并发、加重试退避；具体限速以控制台为准</>,
          ],
          [
            <><strong>网络超时 / Connection reset</strong></>,
            '当前线路在你的网络下不稳定',
            '切换调用线路重新生成配置',
          ],
          [
            <>模型调用返回 <strong>model not found</strong></>,
            '模型 ID 拼错、所选模型未对该 Key 开放',
            '重新选择模型导出；在控制台确认 Key 可用模型范围',
          ],
          [
            <><strong>CC Switch 一键导入无反应</strong></>,
            '系统未注册 CC Switch 自定义协议 / 浏览器拦截',
            '改用「复制导入链接」，在 CC Switch 内粘贴',
          ],
          [
            '导入到 CC Switch 后调用失败',
            '旧 Key 缓存、模型不兼容目标工具',
            '重新导入；检查目标工具与所选模型的兼容性',
          ],
        ]}
      />

      <Callout tone="warn" title="关于价格 / 限速 / SLA">
        {/*
         * 这些数值（每分钟请求数、单 Key 月度上限、并发上限、SLA 等）
         * 都以控制台为准，本文档不写死任何数字以避免与控制台不同步。
         */}
        <p>
          具体数值（每分钟请求数、单 Key 月度上限、并发上限、SLA 等）以你登录的{' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            gpt88.cc 控制台
          </a>{' '}
          为准。本页面不写死任何数字以避免与控制台不同步。
        </p>
      </Callout>

      {/* ── 7. 与现有文档的关系 ────────────────────────────────── */}
      <h2 id="relations">与本文档站现有内容的关系</h2>
      <ul>
        <li>
          <Link to="/docs/quickstart">快速开始</Link> 偏重「拿到 Key 后写第一行代码」。
        </li>
        <li>
          <Link to="/docs/api/chat-completions">API Reference</Link> 列出每个接口的参数和响应。
        </li>
        <li>本「配置文件导出」文档侧重「把 Key + 模型 + 线路打包给某个具体工具」。</li>
      </ul>
      <p>
        三者互为补充。开发者第一次接入建议按
        {' '}<strong>配置文件导出 → 快速开始 → API Reference</strong>{' '}
        的顺序看。
      </p>

      {/* ── 8. 反馈渠道 ─────────────────────────────────────────── */}
      <h2 id="feedback">反馈渠道</h2>
      <ul>
        <li>
          若发现本文档与{' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            控制台
          </a>{' '}
          实际行为不符，请通过控制台内的反馈入口反馈，并附上「线路 + 工具 tab + 期望 vs 实际」三项最小信息。
        </li>
        <li>
          文档站本身的纠错、补充建议，欢迎在{' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            gpt88.cc
          </a>{' '}
          控制台或仓库 issue 中提出。
        </li>
      </ul>
    </DocPage>
  )
}
