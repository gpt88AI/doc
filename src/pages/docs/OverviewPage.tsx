import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, Code2, Compass, Image, Zap } from 'lucide-react'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { useLocale } from '../../lib/locale'
import OverviewPageEn from '../en/OverviewPageEn'

/**
 * 文档：产品概览
 *
 * 入口型页面：解释 gpt88.cc 是什么、能做什么、和读者最相关的下一步路径。
 * 此页面不包含真实计费/SLA 数字，避免传达不准确信息。
 *
 * 所有文档示例统一使用网站首页展示的 https://api.gpt88.cc。
 */

const NEXT_STEPS = [
  {
    title: '快速开始',
    desc: '5 分钟内通过 cURL 完成第一次 chat completion 调用。',
    href: '/docs/quickstart/',
    icon: Zap,
  },
  {
    title: 'API Reference',
    desc: '查看 /v1/chat/completions、/v1/models 与错误码细节。',
    href: '/docs/api/chat-completions/',
    icon: Code2,
  },
  {
    title: '模型导航',
    desc: '按 Chat / Image / Video / Audio 与场景挑选模型。',
    href: '/models/',
    icon: Compass,
  },
  {
    title: 'Agent 图片工作台',
    desc: '使用 agent.gpt88.cc 生成电商主图、场景图、模特图和批量图片。',
    href: '/docs/guides/agent-image-studio/',
    icon: Image,
  },
] as const

export default function OverviewPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <OverviewPageEn />

  return (
    <DocPage
      path="/docs/overview"
      title="产品概览"
      description="gpt88.cc 是一个面向开发者的统一大模型 API 网关，把多家厂商和自托管模型聚合为一套 OpenAI 兼容接口。"
      headings={[
        { id: 'what-is-it', text: '一句话介绍', level: 2 },
        { id: 'who-is-it-for', text: '适合什么人', level: 2 },
        { id: 'capabilities', text: '核心能力', level: 2 },
        { id: 'kimi-3', text: 'Kimi K3 大模型推荐', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <h2 id="what-is-it">一句话介绍</h2>
      <p>
        <strong>gpt88.cc</strong> 是一个统一 API 网关，开发者只需将 base_url 指向
        <code>https://api.gpt88.cc</code>，即可使用一套 OpenAI 兼容协议调用多家厂商和自托管的大模型。
      </p>
      <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
        <a
          href="https://gpt88.cc/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4 transition hover:border-violet-400/45 hover:bg-violet-500/[0.1]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">gpt88.cc</div>
          <div className="mt-2 text-lg font-semibold text-ink-50">主推文本大模型</div>
          <p className="mt-2 text-sm leading-6 text-ink-300">
            Claude、GPT、Gemini、DeepSeek、Qwen 等文本模型与 SDK / Agent / 代码工作流优先看这里。
          </p>
        </a>
        <a
          href="https://agent.gpt88.cc/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-cyan-500/25 bg-cyan-500/[0.06] p-4 transition hover:border-cyan-400/45 hover:bg-cyan-500/[0.1]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">agent.gpt88.cc</div>
          <div className="mt-2 text-lg font-semibold text-ink-50">主推生图工作台</div>
          <p className="mt-2 text-sm leading-6 text-ink-300">
            图片生成、海报、电商图、场景图、模特图和批量素材优先看这里。
          </p>
        </a>
      </div>
      <p>
        标准 API 通过网站首页展示的 <code>https://api.gpt88.cc</code> 提供；图片和视频直连使用
        <code>https://img.gpt88.cc</code>。
        不同协议使用不同请求路径和字段，详见{' '}
        <Link to="/docs/quickstart/#endpoints">快速开始 · 统一服务端点</Link>。
      </p>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 把"获取 Key 是第一步"放在 Overview 的开篇，让初次访问站点的读者
       * 在快速开始入口之前就看到注册指引。
       */}
      <p>
        注册{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          gpt88.cc
        </a>{' '}
        控制台并创建 API Key 后，即可开始用 OpenAI 兼容协议调用各家模型；
        具体步骤请参考{' '}
        <Link to="/docs/quickstart/">快速开始</Link>。
      </p>

      <h2 id="who-is-it-for">适合什么人</h2>
      <ul>
        <li>正在构建 AI 产品、希望快速对接多模型的应用开发者；</li>
        <li>需要在多家供应商之间对比效果与成本的工程团队；</li>
        <li>已有 OpenAI 集成、希望最低改动接入更多模型的项目。</li>
      </ul>

      <h2 id="capabilities">核心能力</h2>
      <p>
        gpt88.cc 当前覆盖以下能力，所有接口形态均尽量与 OpenAI 标准对齐，最大限度降低迁移成本：
      </p>
      <ul>
        <li>
          <Boxes className="inline-block h-4 w-4 align-[-2px] text-violet-300" />
          {' '}
          <strong>Chat Completions</strong>：对话补全，支持流式 / 非流式、function calling
          字段、多模态输入（取决于具体模型）。
        </li>
        <li>
          <strong>Models 列表</strong>：通过 <code>GET /v1/models</code> 查询当前可用模型与其能力标签。
        </li>
        <li>
          <strong>多模态扩展</strong>：Image / Audio / Video 模型按厂商语义提供，详见{' '}
          <Link to="/models/">模型导航</Link>。
        </li>
        <li>
          <strong>错误码映射</strong>：把不同厂商的错误统一映射到稳定的 HTTP 状态与
          <code>error.code</code>，便于客户端做统一处理。
        </li>
      </ul>

      <p className="not-prose my-6 rounded-md border border-violet-500/20 bg-violet-500/[0.06] p-4 text-sm text-ink-300">
        <strong className="text-ink-50">说明：</strong>
        计费、限速与 SLA 相关数值由控制台与后端动态下发，本文档站不固化数字，
        以避免与真实情况漂移。需要查看你账号的当前用量请前往 gpt88.cc 控制台。
      </p>

      <h2 id="kimi-3">Kimi K3 大模型推荐</h2>
      <Callout tone="tip" title="中文长文本、代码与 Agent 场景优先关注 Kimi K3">
        <p>
          Kimi K3 是 Moonshot 官方已发布的旗舰模型，Model ID 为 <code>kimi-k3</code>。
          官方资料显示它面向长周期编程、知识工作和推理，支持原生视觉理解与 1M-token 上下文。
        </p>
        <p>
          在 GPT88 中请使用 <code>https://api.gpt88.cc</code>，并把 <code>model</code> 设置为{' '}
          <code>kimi-k3</code>。先到 <Link to="/models/">模型导航</Link>、
          <a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">
            大模型广场
          </a>{' '}
          或控制台确认当前账号已开放该模型。官方资料可参考{' '}
          <a href="https://platform.kimi.ai/docs/guide/kimi-k3-quickstart" target="_blank" rel="noreferrer">
            Kimi K3 API 快速开始
          </a>。
        </p>
      </Callout>
      <ul>
        <li><strong>中文长文本与知识工作</strong>：适合资料归纳、研究、会议纪要和复杂结构化总结。</li>
        <li><strong>长周期编程</strong>：适合大型代码库理解、持续修复、重构和多步骤工程任务。</li>
        <li><strong>多模态 Agent</strong>：可评测视觉输入、工具调用和复杂 Agent 编排。</li>
        <li><strong>成本控制</strong>：1M 上下文应按需使用，先用真实样本评测质量、延迟、缓存与实际扣费。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <div className="not-prose mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {NEXT_STEPS.map(step => (
          <Link
            key={step.href}
            to={step.href}
            className="group tech-card tech-card-hover flex flex-col p-5"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-violet-500/12 ring-1 ring-violet-500/30 text-violet-300">
              <step.icon className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink-50">{step.title}</h3>
            <p className="mt-1 flex-1 text-xs text-ink-400">{step.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-300 group-hover:text-violet-200">
              前往 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </DocPage>
  )
}
