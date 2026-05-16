import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Globe,
  KeyRound,
  Rocket,
  ShieldCheck,
  Star,
  Terminal,
  Zap,
} from 'lucide-react'
import { CodeBlock } from '../components/ui/CodeBlock'
import {
  DEFAULT_FEATURED_SLUG,
  FEATURED_SLUGS,
  findModel,
} from '../data/models'
import { Seo } from '../components/seo/Seo'
import { websiteStructuredData } from '../components/seo/structuredData'

/**
 * gpt88.cc 首页（M1 首屏）
 *
 * 必须明确传达：
 * 1. gpt88.cc 是什么（统一 API 网关）
 * 2. OpenAI Compatible
 * 3. 多模型一站接入
 * 4. 快速开始入口
 *
 * 视觉：深色底 + 网格背景 + 紫/青强调；首屏以"快速调用"代码片段作为辅助主体，
 * 让访客一眼看到 SDK 形态。
 *
 * Human msg-20260509-qoz7ey/jwfia3/8ivlof 决定：
 * 默认主推 8 个模型按顺序为
 *   claude-opus-4-7 / claude-opus-4-6 / claude-sonnet-4-6 / claude-haiku-4-5-20251001
 *   / gpt-5.5 / gpt-5.4 / gpt-5.4-mini / gpt-5.3-codex
 * 首页"精选模型"区块展示前 4 张卡片，深入详情默认进 /models/claude-opus-4-7
 * （取代旧的 deepseek-v4-pro 默认入口；deepseek-v4-pro 仍作为 marketplace 长尾保留）。
 */

const QUICK_CURL = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const BASE_URL_SNIPPET = `# 只需要改这一行
base_url = "https://gpt88.cc/v1"

# model 按需切换，Claude / GPT / Gemini / DeepSeek 等都走同一个入口
model = "claude-opus-4-7"`

const FEATURES = [
  {
    icon: Globe,
    title: '一行 base_url',
    desc: '把现有 OpenAI 兼容 SDK 的 base_url 指到 gpt88.cc/v1，业务代码基本不用动。',
  },
  {
    icon: Zap,
    title: '一个入口切全部模型',
    desc: 'Claude、GPT、Gemini、DeepSeek、Qwen 等模型用同一套请求结构和鉴权方式。',
  },
  {
    icon: Boxes,
    title: '多模态统一接入',
    desc: 'Chat / Image / Video / Audio 统一管理，模型能力通过 model 字段自由切换。',
  },
  {
    icon: ShieldCheck,
    title: '透明用量',
    desc: '请求级别 token / 时延 / 状态记录，便于成本追踪与排障。',
  },
  {
    icon: Cpu,
    title: '智能路由',
    desc: '同一模型多 provider 自动备援，单点故障不影响业务。',
  },
  {
    icon: Terminal,
    title: '开发者优先',
    desc: '清晰错误码、稳定字段、长期不变更的请求结构。',
  },
] as const

const BULLETS = [
  '只改 base_url，不重写 SDK',
  '一个 API Key 调用全部已开通模型',
  '模型、线路、工具配置统一管理',
] as const

export default function LandingPage() {
  return (
    <>
      <Seo
        title="gpt88.cc API 文档"
        description="gpt88.cc 开发者文档首页，一行 base_url 接入 Claude、GPT、Gemini、DeepSeek、Qwen 等模型。"
        path="/"
        structuredData={websiteStructuredData()}
      />
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* 背景：网格 + 双色辐射光晕 */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
          <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl animate-glow" />
          <div className="absolute right-[-10%] top-40 h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          {/* 顶部小标签 */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            统一 API 网关 · OpenAI Compatible
          </span>

          {/* 主标题 */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            一行 <code className="rounded-md border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 font-mono text-[0.86em] text-violet-100">base_url</code>
            <br className="hidden sm:block" />
            接入 <span className="text-gradient-violet">gpt88.cc</span> 全部模型
          </h1>

          <p className="mt-6 max-w-2xl text-center text-base text-ink-300 sm:text-lg">
            不再为每个模型、每家厂商、每个工具维护一套接入方式。把
            <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-violet-200">base_url</code>
            指向 gpt88.cc，再通过
            <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-violet-200">model</code>
            字段切换 Claude、GPT、Gemini、DeepSeek、Qwen 等模型。
          </p>

          <div className="mt-7 grid w-full max-w-4xl gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                Before
              </div>
              <p className="mt-2 text-sm text-ink-300">
                不同厂商各有 endpoint、鉴权方式、SDK 参数和错误结构。
              </p>
            </div>
            <div className="hidden items-center justify-center text-violet-300 sm:flex">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="rounded-lg border border-violet-500/35 bg-violet-500/10 p-4 text-left shadow-lg shadow-violet-900/20">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                After
              </div>
              <p className="mt-2 text-sm text-ink-100">
                一行 <code className="font-mono text-violet-100">https://gpt88.cc/v1</code>，
                用同一套协议接入全部已开通模型。
              </p>
            </div>
          </div>

          {/* CTA 按钮组
           * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
           * 这里在原有「快速开始 / 查看 API Reference」之间插入主入口
           * 「在 gpt88.cc 获取 API Key」（外链 → 控制台），让访客在第一屏就看到完整链路。
           */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs/quickstart"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.02]"
            >
              <Rocket className="h-4 w-4" />
              快速开始
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://gpt88.cc"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100 hover:bg-violet-500/15 hover:text-white"
            >
              <KeyRound className="h-4 w-4" />
              在 gpt88.cc 获取 API Key
              <ExternalLink className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/docs/api/chat-completions"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink-100 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              查看 API Reference
            </Link>
          </div>

          {/* 卖点小列表 */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-400">
            {BULLETS.map(b => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
                {b}
              </li>
            ))}
          </ul>

          {/* 首屏代码示例 */}
          <div className="mt-14 grid w-full max-w-5xl gap-4 lg:grid-cols-[0.86fr_1.14fr]">
            <CodeBlock
              code={BASE_URL_SNIPPET}
              lang="python"
              filename="config"
            />
            <CodeBlock
              code={QUICK_CURL}
              lang="bash"
              filename="terminal"
            />
          </div>
        </div>
      </section>

      {/* ─── 特性 ─── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
              从一行配置开始，后面都交给网关
            </h2>
            <p className="mt-3 text-sm text-ink-300">
              你继续使用熟悉的 SDK、工具和请求结构，gpt88.cc 负责模型聚合、线路选择、用量记录和后续扩展。
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="tech-card tech-card-hover p-5"
              >
                <div className="grid h-9 w-9 place-items-center rounded-md bg-violet-500/12 ring-1 ring-violet-500/30 text-violet-300">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-50">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 精选模型 ─── */}
      {/*
       * Human msg-20260509-qoz7ey/jwfia3/8ivlof 决定的主推 8 个；
       * 首页只展示前 4 个卡片，把"全部主推 + 全量目录"留给 /models 页面。
       * 默认深入入口（"查看更多模型"按钮指向）= /models/${DEFAULT_FEATURED_SLUG}。
       */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                <Star className="h-3 w-3" />
                精选模型
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
                Human 主推 · 一键即可调用
              </h2>
              <p className="mt-2 text-sm text-ink-300">
                运营人工挑选的 4 张主推卡，覆盖通用对话、长上下文、代码与高吞吐场景。
              </p>
            </div>
            <Link
              to="/models"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-ink-100 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              浏览全部模型
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_SLUGS.slice(0, 4).map(slug => {
              const m = findModel(slug)
              if (!m) return null
              return (
                <li key={slug}>
                  <Link
                    to={`/models/${slug}`}
                    className="tech-card tech-card-hover group flex h-full flex-col p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">
                        {m.name}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                        <Star className="h-3 w-3" /> 推荐
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[11.5px] text-ink-400">
                      <span>{m.provider}</span>
                      <span className="text-ink-600">•</span>
                      <code className="font-mono text-ink-300">{m.modelId}</code>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-ink-300">
                      {m.tagline}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-[11.5px] text-ink-400">
                      <span className="line-clamp-1">
                        推荐场景：{m.scenarios.slice(0, 2).join(' / ')}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-300" />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ─── 底部 CTA ─── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="tech-card relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink-50 sm:text-2xl">
                  现在就开始你的第一次模型调用
                </h3>
                <p className="mt-2 text-sm text-ink-300">
                  从 5 分钟快速开始指南起步，或直接进入主推模型详情页查看示例。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/docs/quickstart"
                  className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400"
                >
                  快速开始
                </Link>
                {/*
                 * 默认主推入口：由 DEFAULT_FEATURED_SLUG 提供，等价 /models/claude-opus-4-7。
                 * 后续 human 改主推顺序时，无需改首页代码。
                 */}
                <Link
                  to={`/models/${DEFAULT_FEATURED_SLUG}`}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink-100 hover:border-violet-500/40"
                >
                  查看默认主推模型
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
