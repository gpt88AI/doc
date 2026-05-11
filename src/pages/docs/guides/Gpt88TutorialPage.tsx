import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * 文档：gpt88.cc 通用接入教程
 *
 * 来源：PM 草稿 gpt88-tutorial-doc.md（知识库 doc-20260511-nbl1qf；任务 t-20260511-9i9k13）。
 * 目标：落成一篇统一 Claude / OpenAI 兼容教程，帮助真实用户建立整体接入心智，
 * 再把他们串联到 Quickstart / Auth / API Reference / 配置文件导出 / 模型导航 等页面。
 *
 * 编辑约束：
 * - 所有指向控制台的链接都使用 <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
 * - 不写死价格 / 限速 / SLA / 配额 / 模型上下文长度等数字；统一说明以控制台为准
 * - 强调三个等价端点：gpt88.cc / china.claudecoder.me / world.claudecoder.me
 * - 强调 OpenAI 风格用 /v1，Claude 风格用根地址
 */

const PREP_CHECKLIST = `1. 前往 gpt88.cc 控制台创建一把 API Key
2. 选一个默认模型（先求跑通，不必一上来就纠结最强）
3. 选对线路（中国调用 / 海外全球加速 / 主域）
4. 识别你当前工具属于 OpenAI 风格还是 Claude / Anthropic 风格
5. 先发一条最小请求验证连通性`

const OPENAI_EXAMPLE = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const PYTHON_EXAMPLE = `from openai import OpenAI

# OpenAI 风格工具 / SDK：base_url 以 /v1 结尾
client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="claude-haiku-4-5-20251001",
    messages=[{"role": "user", "content": "用一句话介绍 gpt88.cc"}],
)
print(resp.choices[0].message.content)`

const NODE_EXAMPLE = `import OpenAI from "openai";

// OpenAI 风格工具 / SDK：baseURL 以 /v1 结尾
const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "claude-haiku-4-5-20251001",
  messages: [{ role: "user", content: "用一句话介绍 gpt88.cc" }],
});
console.log(resp.choices[0].message.content);`

const CLAUDE_MINDSET = `OpenAI 风格工具 / SDK
  → Base URL：以 /v1 结尾
  → 例：https://gpt88.cc/v1
  → 典型：OpenAI Python / Node SDK、Cursor、OpenCode、cURL、Hermes

Claude / Anthropic 风格工具 / SDK
  → Base URL：根地址，不带 /v1
  → 例：https://gpt88.cc
  → 典型：Claude Code、Anthropic SDK、OpenClaw

你真正要记住的一句话
  → OpenAI 风格用 /v1，Claude 风格用根地址。`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[38rem] text-left text-sm">
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

export default function Gpt88TutorialPage() {
  return (
    <DocPage
      path="/docs/guides/gpt88-tutorial"
      title="gpt88.cc 通用接入教程"
      description="一篇统一 Claude 与 OpenAI 兼容心智的上手教程：理解 gpt88.cc 是什么、如何选择模型与线路、如何跑通第一次请求，以及接下来应该看哪篇文档。"
      headings={[
        { id: 'what-is-gpt88', text: '什么是 gpt88.cc', level: 2 },
        { id: 'who-is-this-for', text: '适合谁 / 这篇教程适用对象', level: 2 },
        { id: 'compat-mindset', text: 'Claude 与 OpenAI 通用兼容心智', level: 2 },
        { id: 'prepare', text: '开始前需要准备什么', level: 2 },
        { id: 'prepare-key', text: '准备一个 API Key', level: 3 },
        { id: 'prepare-model', text: '选一个默认模型', level: 3 },
        { id: 'prepare-route', text: '选对线路', level: 3 },
        { id: 'flow', text: '逐步接入流程', level: 2 },
        { id: 'by-tool', text: '按工具接入', level: 2 },
        { id: 'tool-curl', text: 'cURL：最快的连通性验证', level: 3 },
        { id: 'tool-python', text: 'Python SDK', level: 3 },
        { id: 'tool-node', text: 'Node.js SDK', level: 3 },
        { id: 'tool-claude-code', text: 'Claude Code', level: 3 },
        { id: 'tool-others', text: 'Cursor / OpenCode / OpenClaw / Hermes', level: 3 },
        { id: 'config-export', text: '为什么要有配置文件导出', level: 2 },
        { id: 'troubleshooting', text: '常见错误与排障', level: 2 },
        { id: 'best-practices', text: '最佳实践', level: 2 },
        { id: 'related-docs', text: '应该搭配阅读哪些文档', level: 2 },
        { id: 'summary', text: '一句话总结', level: 2 },
      ]}
    >
      <Callout tone="info" title="这篇教程的目标">
        <p>
          这不是某一个 SDK 的单页说明，而是一篇「统一 Claude / OpenAI 兼容心智」的总入口教程。
          如果你是第一次接入 gpt88.cc，建议先通读本文，再按需跳转到
          {' '}<Link to="/docs/quickstart">快速开始</Link>、
          <Link to="/docs/auth">认证与计费</Link>、
          <Link to="/docs/guides/config-export">配置文件导出</Link>、
          <Link to="/models">模型导航</Link> 等页面深入。
        </p>
      </Callout>

      <h2 id="what-is-gpt88">什么是 gpt88.cc</h2>
      <p>
        gpt88.cc 是一个面向开发者的统一大模型 API 网关。你不需要为每个模型单独维护一套接入方式，
        只要把请求指向 gpt88.cc，就可以在同一套协议下切换不同模型、不同线路和不同工具。
      </p>
      <p>从使用者角度看，它解决的是三类问题：</p>
      <ul>
        <li><strong>把多家模型统一成一套接口</strong>：你可以在 OpenAI 兼容工具里接入，也可以在 Claude / Anthropic 风格工具里接入。</li>
        <li><strong>把网络选择统一成一个开关</strong>：中国调用、海外全球加速、主域都可以作为等价端点使用。</li>
        <li><strong>把配置打包成可导出的文件</strong>：在控制台里选好 API Key、模型、调用线路和目标工具后，就能直接导出或一键导入。</li>
      </ul>
      <p>
        如果你已经会用 OpenAI SDK 或 Claude Code，这个教程会告诉你如何尽量少改代码；
        如果你还没接触过这些工具，它也会告诉你该从哪一步开始。
      </p>

      <h2 id="who-is-this-for">适合谁 / 这篇教程适用对象</h2>
      <p>你适合先看这篇教程，如果你是：</p>
      <ul>
        <li>第一次接入 gpt88.cc，想先建立整体心智；</li>
        <li>已经在用 OpenAI SDK，想最低成本迁移；</li>
        <li>已经在用 Claude Code / Anthropic SDK，想把同一套配置换到 gpt88.cc；</li>
        <li>团队里有多种工具（Claude Code、Cursor、OpenCode、cURL、Python、Node.js），希望统一成一套 Base URL 和一组模型。</li>
      </ul>
      <p>你看完后应该能做到：</p>
      <ul>
        <li>理解 <strong>OpenAI 兼容</strong> 和 <strong>Claude 兼容</strong> 的区别；</li>
        <li>知道什么时候用 <code>https://gpt88.cc/v1</code>，什么时候用根地址；</li>
        <li>会用 API Key + 模型 + 线路 + 工具这四个变量组合成一套可用配置；</li>
        <li>能在 cURL、Python、Node.js、Claude Code、Cursor 里跑通第一次请求；</li>
        <li>遇到 401、404、429、超时等常见问题时知道先查什么。</li>
      </ul>

      <h2 id="compat-mindset">Claude 与 OpenAI 通用兼容心智</h2>
      <p>你可以把 gpt88.cc 理解成“<strong>统一入口</strong>”。它不是让你再学一套全新的模型协议，而是把两种最常见的接法包在一起：</p>
      <DocTable
        headers={['接入模式', '典型工具', 'Base URL 形态', '你通常要改什么']}
        rows={[
          [
            <strong key="m1">OpenAI 兼容</strong>,
            'OpenAI Python / Node SDK、Cursor、OpenCode、cURL、Hermes、很多第三方框架',
            <code key="m3">https://gpt88.cc/v1</code>,
            '只改 base_url 和 api_key，其余尽量不动',
          ],
          [
            <strong key="m5">Claude / Anthropic 兼容</strong>,
            'Claude Code、Anthropic SDK、OpenClaw',
            <code key="m7">https://gpt88.cc</code>,
            '只改 base_url / endpoint 路径，让工具按 Claude 风格发请求',
          ],
        ]}
      />
      <p><strong>核心原则</strong>：</p>
      <ul>
        <li><strong>同一个 API Key</strong> 可以同时用于多种工具；</li>
        <li><strong>同一个模型</strong> 可以在不同工具里复用；</li>
        <li><strong>同一组端点</strong> 在中国调用、海外全球加速和主域之间是等价的；</li>
        <li>你真正需要关心的，通常只有 <strong>工具类型</strong>、<strong>Base URL</strong>、<strong>默认模型</strong>、<strong>网络线路</strong>。</li>
      </ul>

      {/*
       * OpenAI 兼容 / Claude 兼容 / 三个端点等价是本页的核心心智，
       * 用一个 text 代码块把规则压缩成三行，便于读者复制到脑中：
       * OpenAI 风格用 /v1，Claude 风格用根地址；三个端点作用相同。
       */}
      <CodeBlock lang="text" filename="mental model" code={CLAUDE_MINDSET} />

      <h2 id="prepare">开始前需要准备什么</h2>
      <p>开始之前，先完成下面这个最小清单：</p>
      <CodeBlock lang="text" filename="before you start" code={PREP_CHECKLIST} />

      <h3 id="prepare-key">准备一个 API Key</h3>
      <p>
        先去{' '}
        <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
          gpt88.cc 控制台
        </a>{' '}
        创建一把 Key。Key 是你的身份凭证，后续所有请求都会带上它。
      </p>
      <p>建议你这样管理：</p>
      <ul>
        <li>给每个项目 / 环境单独建一把 Key；</li>
        <li>Key 只放在服务端或受控配置里；</li>
        <li>截图、日志、分享文档时都要脱敏；</li>
        <li>一旦怀疑泄露，立刻 revoke 并重新生成。</li>
      </ul>

      <h3 id="prepare-model">选一个默认模型</h3>
      <p>如果你是新用户，建议先选一个最能代表你主要场景的模型：</p>
      <ul>
        <li><strong>通用聊天 / 产品原型</strong>：优先选响应快、稳定的通用模型；</li>
        <li><strong>复杂推理 / 长文档</strong>：优先选 Claude 系较强推理模型；</li>
        <li><strong>代码与 Agent 工作流</strong>：优先选适合编程和 tool use 的模型；</li>
        <li><strong>多模态任务</strong>：按你是否需要图像 / 音频 / 视频接口再做选择。</li>
      </ul>
      <p>不要在第一步就纠结“最强模型是哪一个”，更重要的是先跑通一次。</p>

      <h3 id="prepare-route">选对线路</h3>
      <p>
        如果你在中国大陆网络环境，优先选择中国调用；如果你在海外服务器、海外团队或跨境网络里工作，优先选择海外全球加速。
      </p>
      <p>这三个端点是等价的：</p>
      <ul>
        <li><code>https://gpt88.cc/v1</code></li>
        <li><code>https://china.claudecoder.me/v1</code></li>
        <li><code>https://world.claudecoder.me/v1</code></li>
      </ul>
      <p>它们共享同一套 API Key、模型和字段语义，只是网络路由不同。</p>

      <h2 id="flow">逐步接入流程</h2>
      <p>下面是最稳妥的顺序：</p>
      <ol>
        <li>创建或选择 API Key</li>
        <li>决定你要用的模型</li>
        <li>选择网络线路</li>
        <li>确认你要接入的工具属于 OpenAI 还是 Claude 风格</li>
        <li>生成配置或直接拼 Base URL</li>
        <li>先发一条最小请求验证连通性</li>
        <li>再扩展到正式业务场景</li>
      </ol>
      <p>如果你第一次接入失败，不要同时改很多变量。先只改一项：</p>
      <ul>
        <li>先换线路；</li>
        <li>再检查 Base URL；</li>
        <li>再检查模型名；</li>
        <li>最后检查 API Key。</li>
      </ul>

      <h2 id="by-tool">按工具接入</h2>
      <h3 id="tool-curl">cURL：最快的连通性验证</h3>
      <p>适合想快速确认“这条链路能不能通”的场景。你应该用它来：</p>
      <ul>
        <li>排查网络问题；</li>
        <li>验证 API Key 是否有效；</li>
        <li>验证模型名是否拼对；</li>
        <li>给 QA 或 CI 做健康检查。</li>
      </ul>
      <CodeBlock lang="bash" filename="curl-openai-compatible.sh" code={OPENAI_EXAMPLE} />

      <h3 id="tool-python">Python SDK</h3>
      <p>如果你写的是 Python 服务，通常有两种情况：</p>
      <ul>
        <li><strong>OpenAI SDK 风格</strong>：直接把 <code>base_url</code> 换成 <code>https://gpt88.cc/v1</code>；</li>
        <li><strong>Claude / Anthropic 风格</strong>：把 SDK 的 endpoint 指向根地址，并保持 Claude 风格请求结构。</li>
      </ul>
      <p>适合：Web 服务、脚本、数据分析、Agent 原型。</p>
      <CodeBlock lang="python" filename="python-openai-compatible.py" code={PYTHON_EXAMPLE} />

      <h3 id="tool-node">Node.js SDK</h3>
      <p>如果你在前后端同构或 Next.js / Express 项目里开发，Node.js SDK 是最常见的选择。</p>
      <p>适合：</p>
      <ul>
        <li>API 服务端代理；</li>
        <li>前端项目的边缘函数；</li>
        <li>CLI 工具；</li>
        <li>流式输出和工具调用。</li>
      </ul>
      <CodeBlock lang="typescript" filename="node-openai-compatible.ts" code={NODE_EXAMPLE} />

      <h3 id="tool-claude-code">Claude Code</h3>
      <p>Claude Code 的重点不是“写一个请求”，而是“让 AI 以开发者助手的方式工作”。</p>
      <p>适合：</p>
      <ul>
        <li>理解代码库；</li>
        <li>修改文件；</li>
        <li>跑测试；</li>
        <li>创建 PR；</li>
        <li>做持续性开发任务。</li>
      </ul>
      <p>这类工具通常走 Claude / Anthropic 风格配置，所以你要优先确认根地址和目标模型是否匹配。</p>

      <h3 id="tool-others">Cursor / OpenCode / OpenClaw / Hermes</h3>
      <p>这类工具通常已经提供了某种“兼容 OpenAI 或 Claude”的输入项。你要做的事情就是：</p>
      <ul>
        <li>选对工具类型；</li>
        <li>填对 Base URL；</li>
        <li>填对 API Key；</li>
        <li>选对默认模型。</li>
      </ul>
      <p>
        如果工具本身支持导入配置，那就把它交给{' '}
        <Link to="/docs/guides/config-export">配置文件导出</Link> 页面生成。
      </p>

      <Callout tone="tip" title="一个最容易成功的起步方式">
        <p>
          路线 A：OpenAI 风格起步 → 先用 <code>https://gpt88.cc/v1</code> + OpenAI SDK / cURL 跑一条最小请求；
          路线 B：Claude 风格起步 → 先用根地址 + Claude Code / Anthropic SDK 跑通一次。两条路线共用同一把 API Key。
        </p>
      </Callout>

      <h2 id="config-export">为什么要有配置文件导出</h2>
      <p>如果你只是单次测试，手工填 Base URL 和 Key 就够了。</p>
      <p>如果你已经在多个工具之间切换，就会反复遇到这些问题：</p>
      <ul>
        <li>每个工具配置项名字不一样；</li>
        <li>有的工具要 <code>/v1</code>，有的工具不要；</li>
        <li>有的工具要单独的模型名映射；</li>
        <li>有的工具需要导入链接，有的工具需要配置文件。</li>
      </ul>
      <p>
        <Link to="/docs/guides/config-export">配置文件导出</Link> 页面就是为了解决这些碎片化问题：
      </p>
      <ul>
        <li>先把 API Key、模型和线路选对；</li>
        <li>再选目标工具；</li>
        <li>页面自动生成对应格式；</li>
        <li>要么复制到目标工具，要么一键导入 CC Switch。</li>
      </ul>
      <p>如果你是团队负责人，这个页面尤其适合拿来统一标准。</p>

      <h2 id="troubleshooting">常见错误与排障</h2>
      <h3>401：API Key 有问题</h3>
      <ul>
        <li>Key 是否复制完整；</li>
        <li>是否已经被 revoke；</li>
        <li>是否填到了正确的环境变量；</li>
        <li>是否在客户端暴露了 Key。</li>
      </ul>

      <h3>404：Base URL 或路径不对</h3>
      <ul>
        <li>OpenAI 风格是不是忘了 <code>/v1</code>；</li>
        <li>Claude 风格是不是错误地拼了 <code>/v1</code>；</li>
        <li>你是否把中国调用 / 海外全球加速混用了；</li>
        <li>你要调用的 endpoint 是否和模型类型一致。</li>
      </ul>

      <h3>429：限速或配额到了</h3>
      <ul>
        <li>当前 Key 的配额；</li>
        <li>是否并发过高；</li>
        <li>是否触发了重试风暴；</li>
        <li>是否应该改用更稳定的模型或更低并发。</li>
      </ul>

      <h3>网络超时</h3>
      <ul>
        <li>当前线路是否适合你的网络；</li>
        <li>是不是本地网络到网关慢，还是网关到上游慢；</li>
        <li>是否需要切换线路重新导出配置。</li>
      </ul>

      <h3>模型不可用 / model not found</h3>
      <ul>
        <li>模型名是否拼错；</li>
        <li>该 Key 是否允许调用这个模型；</li>
        <li>该模型是否属于当前线路支持的集合；</li>
        <li>是否需要重新导出配置。</li>
      </ul>

      <Callout tone="warn" title="关于价格 / 限速 / SLA / 配额">
        {/*
         * 这些数字全部以控制台为准，本文档不写死任何值，避免与实时策略漂移。
         */}
        <p>
          具体价格、限速、SLA、配额上限、模型上下文长度等数值，以
          {' '}
          <a href="https://gpt88.cc" target="_blank" rel="noreferrer">
            gpt88.cc 控制台
          </a>{' '}
          为准，本文档不写死任何数字。
        </p>
      </Callout>

      <h2 id="best-practices">最佳实践</h2>
      <ul>
        <li><strong>先验证，再扩展</strong>：先用 cURL 或最小 SDK 调通，再上到复杂工具。</li>
        <li><strong>先统一，再分流</strong>：团队内先统一默认模型和默认 Base URL，再根据地区切线路。</li>
        <li><strong>Key 和模型分开管理</strong>：一个项目一把 Key，一个场景一个默认模型。</li>
        <li><strong>不要把 Key 写进前端</strong>：浏览器和客户端都不能作为 secret 的最终存放地。</li>
        <li><strong>保留排障证据</strong>：出问题时保留 request_id、时间、模型名、线路和错误码。</li>
        <li><strong>把文档和控制台一起看</strong>：本文档负责方法，控制台负责实时状态和数值。</li>
      </ul>

      <h2 id="related-docs">应该搭配阅读哪些文档</h2>
      <p>建议阅读顺序：</p>
      <ol>
        <li><Link to="/docs/overview">产品概览</Link> —— 先理解 gpt88.cc 是什么；</li>
        <li><Link to="/docs/quickstart">快速开始</Link> —— 跑通第一次请求；</li>
        <li><Link to="/docs/auth">认证与计费</Link> —— 理解 Key、限速、计费和安全；</li>
        <li><Link to="/docs/api/chat-completions">API Reference</Link> —— 看完整字段；</li>
        <li><Link to="/models">模型导航</Link> —— 选模型；</li>
        <li><Link to="/docs/guides/config-export">配置文件导出</Link> —— 把配置分发到具体工具；</li>
        <li><Link to="/docs/faq">FAQ</Link> —— 查常见问题。</li>
      </ol>

      <h2 id="summary">一句话总结</h2>
      <p>如果你只记住一句话，那就是：</p>
      <Callout tone="tip">
        <p>
          <strong>
            gpt88.cc 用同一把 API Key，把 Claude 风格和 OpenAI 风格的接入统一起来；
            你只需要选对模型、选对线路、选对 Base URL。
          </strong>
        </p>
      </Callout>
      <p>如果这篇文档和你的实际工具行为有差异，请以控制台实时配置为准。</p>
    </DocPage>
  )
}
