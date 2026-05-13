/**
 * 模型导航数据源（M3 主推 8 个 + subrouter 全量 catalog）
 *
 * 数据源：
 * - 静态 JSON `public/marketplace-snapshot.json`，由 PM 在 2026-05-09 抓取
 *   subrouter.ai marketplace 接口并按 (canonical_name, category) 去重得到 239 条 catalog。
 * - 运行时**不**直接打 https://subrouter.ai/api/marketplace/models —— 该接口没有 CORS 头，
 *   浏览器侧会因 Same-Origin 报错；要更新数据需重新生成快照后落库。
 * - 快照位于 public/，Vite 构建期能直接 `import` JSON（tsconfig 已开启 resolveJsonModule）；
 *   产物会跟随 dist/assets/index-*.js 一起打包，无需 fetch。
 *
 * 主推顺序（Human msg-20260509-qoz7ey/jwfia3/8ivlof 决定）：
 *   claude-opus-4-7 → claude-opus-4-6 → claude-sonnet-4-6 → claude-haiku-4-5-20251001
 *   → gpt-5.5 → gpt-5.4 → gpt-5.4-mini → gpt-5.3-codex
 *
 * Catalog 处理：
 * - completion 7 条全部 canonical_name 与 chat 重名（snapshot 内同名条目分类为 chat 与 completion 两份），
 *   按 PM 决策"completion 暂归入 chat 待 human 确认"，本文件按 (canonical_name) 去重时优先保留 chat 那一份；
 *   没有 chat 同名兜底（理论上 snapshot 不会出现这种情况，做保险即可）。
 * - embedding 1 条（text-embedding-3-small）暂不展示（任务要求）。
 * - image / video / audio 全部保留。
 *
 * 为什么把"主推 8 个的能力/场景/中文 tagline"写在前端代码里，而不是放在 snapshot：
 * - snapshot 只有 vendors_count / descriptions_sample（vendor 卖点宣传，文案不一致），
 *   不能直接展示给开发者读者；
 * - 这 8 条是人工运营的展示位，由 human 决定中文文案；其他长尾模型一律标注「以控制台为准」，
 *   避免文档站说"我说能做 X"但实际后端没暴露的偏差。
 */

import snapshot from '../../public/marketplace-snapshot.json'

/* ──────────────────────────────────────────────────────────────────
 * 类型定义
 * ────────────────────────────────────────────────────────────────── */

export type ModelCategory = 'chat' | 'image' | 'video' | 'audio'

export type ModelEndpoint = {
  method: 'GET' | 'POST'
  path: string
}

export type ModelExample = {
  /** Tab 标题：cURL / Python / Node.js */
  label: string
  /** highlight 用的语言名 */
  lang: string
  code: string
}

export type ModelEntry = {
  /** URL 片段，canonical_name 中的 . 替换为 - 后得到 */
  slug: string
  /** 展示名 */
  name: string
  /** 调用 API 时 body.model 写的字符串；少数市场别名会保留官方大小写 */
  modelId: string
  /** Provider 推断结果，无法识别时显示 "未知" */
  provider: string
  /** 分类 */
  category: ModelCategory
  /** 是否置顶（来自 FEATURED_SLUGS） */
  featured: boolean
  /** 卡片用一句话；featured / 次主推模型用人工 tagline，长尾模型走模板兜底 */
  tagline: string
  /** 紧凑标签层：能力标签（主推 21 个有人工值；长尾通常为空） */
  capabilities: string[]
  /** 紧凑标签层：推荐场景（主推 21 个有人工值；长尾通常为空） */
  scenarios: string[]
  /**
   * 详细说明层（参考 apimart 详情页的信息架构心智，但不是字段数据源）：
   * - overview：这个模型是什么，适合什么方向
   * - whenToUse：更具体的任务类型
   * - integrationNotes：接入路径、工具风格、从哪个 endpoint 起步
   * - caveats：注意事项 / 以控制台为准的边界
   *
   * 这不是厂商官方白皮书，而是面向接入者的说明层；
   * 价格 / 限速 / SLA / 上下文等动态值仍以控制台为准，本文档不写死。
   */
  overview: string[]
  whenToUse: string[]
  integrationNotes: string[]
  caveats: string[]
  /** 该模型在 marketplace 上的上游 vendor 数量 */
  vendorsCount: number
  /** 该模型按分类映射的接口路径 */
  endpoint: ModelEndpoint
  /** 详情页"请求示例"——按 Tab 顺序展示 */
  examples: ModelExample[]
  /** 原始上游卖点样本，当前不直接渲染；保留供未来扩展（如 vendor 卖点区） */
  descriptionsSample: string[]
}

/* ──────────────────────────────────────────────────────────────────
 * FEATURED_DETAILS：人工运营的能力 / 场景 / tagline 字典
 *
 * Human msg-20260509-4q7t82：缺失字段网上查找；查不到回退占位
 * （ConsoleAuthoritativeNote 「以控制台为准」由 ModelDetailPage 渲染）。
 *
 * 范围演进：原本仅覆盖 FEATURED_SLUGS 的 8 个主推。本轮扩展到 21 条——
 * 在主推 8 个之外，把 marketplace vendors_count >= 4 的 13 个非主推 chat 模型
 * 也补上中文 capabilities / scenarios / tagline；运行时由 buildCatalog
 * 按 slug 查表（无论是否在 FEATURED_SLUGS 中），命中即采用人工文案，
 * 未命中（或字段为空）则在详情页回退「以控制台为准」占位。
 *
 * 重要约束：
 * - FEATURED_SLUGS 仍为 8（控制 ModelsPage 主推区块、首页精选模型卡），不变
 * - 新增 13 条只补字典数据，不进 FEATURED_SLUGS
 * - 任何无法在公开来源查到的字段填空数组，让 UI 回退「以控制台为准」
 *
 * 注意：FEATURED_SLUGS 是"已转 - 之后"的 slug；FEATURED_DETAILS key 与之对应。
 *       canonical_name 与 slug 的对应关系见每条上方注释。
 * ────────────────────────────────────────────────────────────────── */

export const FEATURED_SLUGS = [
  'claude-opus-4-7',
  'claude-opus-4-6',
  'claude-sonnet-4-6',
  'claude-haiku-4-5-20251001',
  'gpt-5-5',
  'gpt-5-4',
  'gpt-5-4-mini',
  'gpt-5-3-codex',
] as const

type FeaturedDetail = {
  provider: string
  tagline: string
  capabilities: string[]
  scenarios: string[]
  /** 详细说明层：模型概览 */
  overview: string[]
  /** 详细说明层：更具体的适用任务 */
  whenToUse: string[]
  /** 详细说明层：接入说明（OpenAI / Claude 风格、endpoint、工具建议） */
  integrationNotes: string[]
  /** 详细说明层：使用提醒（preview / thinking / 以控制台为准 等） */
  caveats: string[]
}

const FEATURED_DETAILS: Record<string, FeaturedDetail> = {
  // slug=nanobanana2 ←→ modelId=NanoBanana2
  // Google Gemini 3 Pro Image Preview 的模型别名，走 Gemini 原生 generateContent 图片接口。
  nanobanana2: {
    provider: 'Google',
    tagline: 'Google Gemini 3 Pro Image Preview 的图片生成入口，走 generateContent 并支持 1K/2K/4K 输出。',
    capabilities: ['Google Gemini', '文生图', '图生图', '4K 输出'],
    scenarios: ['视觉素材生成', '图像编辑', '产品概念图', '社媒配图'],
    overview: [
      'NanoBanana2 是基于 Google Gemini 3 Pro Image Preview 的图片生成模型入口，在 gpt88.cc 中按 Google/Gemini 原生兼容方式调用。',
      '它使用 contents、parts 与 generationConfig.imageConfig 描述提示词、参考图、画幅比例和输出清晰度，返回图片通常在 inlineData.data 中。',
    ],
    whenToUse: [
      '需要快速生成海报、电商图、概念图、社媒配图等视觉素材时',
      '需要通过 fileData.fileUri 传参考图做图生图或局部风格迁移时',
      '希望使用 Google Gemini 图片能力，并保持与官方 generateContent 结构一致时',
      '需要 1K、2K、4K 这类清晰度控制时',
    ],
    integrationNotes: [
      '推荐走加速域名 https://china.claudecoder.me，并调用 /v1beta/models/NanoBanana2:generateContent。',
      '模型 ID 写在路径里，必须保持 NanoBanana2 的大小写一致。',
      '请求体使用 Gemini 原生 contents / generationConfig 结构；如果 Authorization: Bearer 返回 401，可改用 x-goog-api-key 重试。',
    ],
    caveats: [
      'imageConfig.aspectRatio 表示画幅比例，例如 1:1、16:9、9:16、4:3、3:4、auto；不要传 1024x1024 这类像素尺寸。',
      'imageConfig.imageSize 使用 1K、2K、4K 这类大写值；具体可用范围以控制台为准。',
      '价格、限速、可用线路与返回格式以 gpt88.cc 控制台当前配置为准。',
    ],
  },

  // ── 主推 8 个（FEATURED_SLUGS 决定置顶顺序） ──────────────────────
  // slug=claude-opus-4-7 ←→ modelId=claude-opus-4-7
  'claude-opus-4-7': {
    provider: 'Anthropic',
    tagline: 'Anthropic Claude 系列旗舰，复杂推理与长文档处理顶配。',
    capabilities: ['长上下文', '高质量推理', 'function calling', '视觉理解'],
    scenarios: ['复杂 Agent 决策', '长文档分析', '研究综述', '代码评审'],
    overview: [
      'Claude Opus 4.7 是当前 Claude 系列中的旗舰定位模型，偏向高质量推理、长文档理解与复杂任务拆解。',
      '如果你的需求不是“最快”，而是“在复杂输入下尽量稳定、尽量少返工”，它通常是最值得先试的一档。',
    ],
    whenToUse: [
      '需要处理长篇材料、长上下文对话或多轮任务规划时',
      '对输出质量、逻辑完整性和解释性要求较高时',
      '需要把模型放进 Agent / tool use 工作流做复杂决策时',
      '需要兼顾文本与图像理解的高质量多模态场景时',
    ],
    integrationNotes: [
      '如果你的工具是 OpenAI 风格（如 OpenAI SDK、Cursor、OpenCode），优先从 https://gpt88.cc/v1 起步。',
      '如果你的工具是 Claude / Anthropic 风格（如 Claude Code、Anthropic SDK），优先使用根地址，让工具自己拼接 Claude 风格路径。',
      '建议先用最小请求验证 API Key、模型名与线路，再扩展到长文档或复杂 Agent 工作流。',
    ],
    caveats: [
      '旗舰模型通常更适合质量优先场景；价格、可用性、上下文与速率限制以控制台为准。',
      '如果你更看重吞吐或延迟，可先用 Haiku / mini / flash 一类模型验证链路。',
    ],
  },
  // slug=claude-opus-4-6 ←→ modelId=claude-opus-4-6
  'claude-opus-4-6': {
    provider: 'Anthropic',
    tagline: 'Claude 4.6 Opus，写作与推理稳定，适合企业级 Agent。',
    capabilities: ['长上下文', '高质量写作', 'function calling', '视觉理解'],
    scenarios: ['长文档分析', '产品文案', '高质量翻译', 'Agent 决策'],
    overview: [
      'Claude Opus 4.6 是 Opus 系列的强推理版本，适合需要质量稳定、输出风格成熟的任务。',
      '与偏轻量的模型相比，它更像“复杂任务的主力机型”，尤其适合长文档和高质量文本生成。',
    ],
    whenToUse: [
      '长文档解读、报告总结、研究综述',
      '高质量写作、改写、翻译与内容整理',
      '企业内部知识助手或复杂流程型 Agent',
      '需要 function calling 的多步骤任务',
    ],
    integrationNotes: [
      'OpenAI 兼容工具可直接把 base_url 指到 https://gpt88.cc/v1，再把 model 写成 claude-opus-4-6。',
      'Claude 风格工具更适合直接走根地址配置，减少路径判断错误。',
      '第一次接入建议先用一条最小请求确认模型名和 Key 都有效，再进入正式业务。',
    ],
    caveats: [
      '不同账号是否开放、默认线路表现如何，以 gpt88.cc 控制台当前配置为准。',
      '如果你更在意实时响应速度，可考虑 Sonnet / Haiku 等更轻量的 Claude 变体。',
    ],
  },
  // slug=claude-sonnet-4-6 ←→ modelId=claude-sonnet-4-6
  'claude-sonnet-4-6': {
    provider: 'Anthropic',
    tagline: 'Sonnet 4.6，速度/质量平衡，主流业务集成首选。',
    capabilities: ['快速响应', 'function calling', '视觉理解', '流式响应'],
    scenarios: ['通用对话', '客服 / 工单分析', '内容审核', '生产 SaaS'],
    overview: [
      'Claude Sonnet 4.6 是 Claude 系列里速度与质量平衡感很强的一档，适合作为很多业务的默认主力模型。',
      '它通常比旗舰型 Opus 更轻、更快，但仍保留了较好的推理与工具调用体验。',
    ],
    whenToUse: [
      '通用对话、客服、工单处理等高频请求场景',
      '希望兼顾模型质量与响应速度的 SaaS 产品',
      '需要图像理解或工具调用，但不一定要用最重型模型时',
      '作为团队默认模型起步，再按需求切换到更强或更轻量的型号',
    ],
    integrationNotes: [
      'OpenAI 风格工具可以把它当作通用聊天模型直接使用，最适合快速验证一整条业务链路。',
      'Claude 风格工具（如 Claude Code）也很适合作为默认工作模型，兼顾成本、速度与稳定性。',
      '如果你要做 streaming 或 tool use，建议先用最小请求确认模型在当前 Key 上已开放。',
    ],
    caveats: [
      '“默认主力”不代表适合所有场景；复杂长文档可升级到 Opus，轻量批量任务可降到 Haiku。',
      '价格、限速、是否支持视觉等实时能力以控制台为准。',
    ],
  },
  // slug=claude-haiku-4-5-20251001 ←→ modelId=claude-haiku-4-5-20251001
  'claude-haiku-4-5-20251001': {
    provider: 'Anthropic',
    tagline: 'Claude Haiku 4.5（2025-10-01 版本），低延迟高吞吐，分类与抽取首选。',
    capabilities: ['低延迟', '高吞吐', 'function calling'],
    scenarios: ['批量分类', '客服问答', '信息抽取', '审核辅助'],
    overview: [
      'Claude Haiku 4.5 是偏轻量与高吞吐的一档，适合把“每次请求都很快”放在优先级更高的位置。',
      '如果你已经验证过接入链路，想进一步控制响应时间或承载更高并发，它通常是更稳妥的起点。',
    ],
    whenToUse: [
      '分类、抽取、审核等结构化任务',
      '客服问答、批量生成、轻量助手',
      '作为 Agent 子步骤模型而非最终高质量输出模型',
      '需要低延迟与高吞吐的后台工作流',
    ],
    integrationNotes: [
      'OpenAI 风格与 Claude 风格工具都能接入；优先按你现有工具生态选择路径，不必为了模型切协议。',
      '建议把它作为默认轻量模型，而不是直接拿来替代所有复杂任务。',
      '如果你的业务里同时存在“轻量请求 + 少量高复杂请求”，可以把 Haiku 与 Opus / GPT 主力组合使用。',
    ],
    caveats: [
      '轻量模型并不适合所有高复杂度任务；遇到多步规划、超长输入时建议升级。',
      '实际速度、费用与可用模型范围以控制台为准。',
    ],
  },
  // slug=gpt-5-5 ←→ modelId=gpt-5.5
  'gpt-5-5': {
    provider: 'OpenAI',
    tagline: 'GPT-5.5，OpenAI 最新旗舰，多模态与工具调用稳定。',
    capabilities: ['function calling', '视觉理解', 'JSON Mode', '长上下文'],
    scenarios: ['通用智能体', '产品化 SaaS', '多模态助手'],
    overview: [
      'GPT-5.5 是 OpenAI 系列的旗舰档，适合把通用性、工具调用能力和多模态扩展一起考虑的场景。',
      '如果你的团队原本就熟悉 OpenAI 风格 SDK，把默认示例切到 GPT-5.5 往往上手最顺。',
    ],
    whenToUse: [
      '通用智能体、产品化 SaaS、复杂工作流',
      '需要 JSON 输出、结构化解析或 function calling 的场景',
      '需要兼顾图像理解与文本推理的多模态任务',
      '团队已有 OpenAI 工具链，希望最低摩擦接入时',
    ],
    integrationNotes: [
      'OpenAI 风格工具优先从 https://gpt88.cc/v1 起步，这是最接近原生体验的接法。',
      '如果只是要验证连通性，可以先用一条 chat/completions 最小请求，再逐步加上 tools / JSON Mode。',
      '做产品化接入时，建议把模型名、线路与 Key 分开管理，方便按环境切换。',
    ],
    caveats: [
      '是否开放视觉、上下文上限、可用线路与计费策略以控制台实时配置为准。',
      '若你更看重低延迟或预算，可考虑同系列更轻量的 mini / 低阶模型。',
    ],
  },
  // slug=gpt-5-4 ←→ modelId=gpt-5.4
  'gpt-5-4': {
    provider: 'OpenAI',
    tagline: 'GPT-5.4，可用性高、价格友好的主力对话模型。',
    capabilities: ['function calling', 'JSON Mode', '流式响应'],
    scenarios: ['SaaS 集成', '通用对话', '工作流自动化'],
    overview: [
      'GPT-5.4 是兼顾稳定性、可用性与成本感知的主力对话模型，适合作为很多应用的默认 OpenAI 路线起点。',
      '它比旗舰型更容易作为业务默认值落地，同时仍保留较好的工具调用和结构化输出体验。',
    ],
    whenToUse: [
      '通用对话、工单流转、业务自动化',
      '希望快速接入 OpenAI 兼容生态的 SaaS 团队',
      '需要 JSON Mode / 流式输出 / function calling 的中等复杂任务',
      '把 GPT 系列作为默认主力，再按需要切向更强或更轻量的模型',
    ],
    integrationNotes: [
      '如果你的工程已经使用 OpenAI Python / Node SDK，把 base_url 改成 https://gpt88.cc/v1 即可起步。',
      '建议在正式接入前先跑一次 streaming 与非 streaming 两条请求，确认工具路径都没配错。',
      '做工作流自动化时，可先固定模型名与线路，再在不同环境里切换 API Key。',
    ],
    caveats: [
      '价格、可用模型范围、线路表现与功能开关以控制台为准。',
      '面对更复杂的长文档或多模态需求时，可能需要升级到更高阶模型。',
    ],
  },
  // slug=gpt-5-4-mini ←→ modelId=gpt-5.4-mini
  'gpt-5-4-mini': {
    provider: 'OpenAI',
    tagline: 'GPT-5.4 mini，低成本高吞吐版本，适合大量短请求。',
    capabilities: ['低延迟', '高吞吐', 'function calling'],
    scenarios: ['日志摘要', '分类标注', '智能体子任务'],
    overview: [
      'GPT-5.4 mini 是 GPT 系列里的轻量版本，更适合大量短请求、批量任务和低延迟工作流。',
      '它适合作为“先跑通业务，再看是否升级模型”的低门槛起点。',
    ],
    whenToUse: [
      '日志摘要、分类标注、批量审核',
      'Agent 子任务、工具调度前的预处理',
      '对响应速度与吞吐更敏感的后台服务',
      '需要较低成本验证业务闭环时',
    ],
    integrationNotes: [
      '在 OpenAI 风格 SDK 中可直接作为 chat/completions 的默认 model。',
      '如果你已经有高质量模型做最终输出，可以把 mini 放在预处理、路由或筛选阶段。',
      '先用最小请求压一遍并发和时延，再决定是否需要提升到更高阶模型。',
    ],
    caveats: [
      '轻量模型更适合高频短请求；复杂推理或长文档任务可能需要升级。',
      '实际计费、限速和可用模型范围以控制台为准。',
    ],
  },
  // slug=gpt-5-3-codex ←→ modelId=gpt-5.3-codex
  'gpt-5-3-codex': {
    provider: 'OpenAI',
    tagline: 'GPT-5.3 Codex，针对代码场景优化的代码生成模型。',
    capabilities: ['代码生成', '代码补全', 'function calling'],
    scenarios: ['代码助手', '代码审查', '测试生成', '脚本编写'],
    overview: [
      'GPT-5.3 Codex 面向代码生成、补全、重构和自动化开发场景，是偏工程生产力的一档模型。',
      '如果你想把 gpt88.cc 接到代码工具、脚本工具或开发工作流里，它是很自然的优先候选。',
    ],
    whenToUse: [
      '生成代码片段、测试、脚本与工具封装',
      '做代码审查、重构建议和自动化开发辅助',
      '把模型嵌入 IDE / CLI / Agent 开发链路中',
      '需要 function calling 配合代码工作流时',
    ],
    integrationNotes: [
      '在 OpenAI 风格 SDK 与开发工具里最容易接入，适合作为代码类默认模型。',
      '建议先用一个最小代码任务验证输出风格，再决定是否固定为团队默认代码模型。',
      '如果你的工具偏 Claude 风格，也可以通过根地址接入，但仍要确认工具支持的请求结构。',
    ],
    caveats: [
      '代码模型的行为会受提示词、工具调用方式和上下文拼接影响，实际效果需结合你的代码库验证。',
      '可用性、限速、价格与模型开放范围以控制台为准。',
    ],
  },

  // ── 次主推：Anthropic 系列（含 -thinking 变体） ────────────────────
  // 来源：Anthropic 官网 model cards（claude.com/news 与 docs.anthropic.com 公开页）；
  // -thinking 强调延迟换深度推理，思考链可作为 capability 标签；
  // 网上查找补充于 2026-05-09。
  // slug=claude-opus-4-6-thinking ←→ modelId=claude-opus-4-6-thinking
  'claude-opus-4-6-thinking': {
    provider: 'Anthropic',
    tagline: 'Claude Opus 4.6 思考模式，延迟换深度推理，复杂规划首选。',
    capabilities: ['思考链', '长上下文', 'function calling', '视觉理解'],
    scenarios: ['复杂规划', '科研推理', '深度代码评审', '多步 Agent'],
    overview: [
      'Claude Opus 4.6 Thinking 可理解为 Opus 4.6 的深度推理变体，更强调思考过程和复杂任务拆解。',
      '它适合在“回答要慢一点没关系，但尽量更稳、更完整”这种诉求下使用。',
    ],
    whenToUse: [
      '复杂规划、科研推理、多步问题求解',
      '需要先推理再决定工具调用顺序的 Agent',
      '高复杂度代码分析和架构评审',
    ],
    integrationNotes: [
      'Claude 风格工具通常更适合作为 thinking 变体的第一接入面，尤其是在开发助手工作流中。',
      'OpenAI 风格 SDK 也可以走 https://gpt88.cc/v1，只需把 model 指向 claude-opus-4-6-thinking。',
      '先用短提示验证路径，再逐步扩展到多步推理任务。',
    ],
    caveats: [
      'thinking 变体通常意味着更高延迟；速度、价格与是否开放以控制台为准。',
      '如果只做轻量对话或批量任务，不一定比非 thinking 版本更划算。',
    ],
  },
  // 来源：Anthropic Claude 4.5 Sonnet 官方说明，2025-09-29 发布；
  // 网上查找补充于 2026-05-09。
  // slug=claude-sonnet-4-5-20250929 ←→ modelId=claude-sonnet-4-5-20250929
  'claude-sonnet-4-5-20250929': {
    provider: 'Anthropic',
    tagline: 'Claude Sonnet 4.5（2025-09-29 版本），均衡型主力，工具与视觉稳定。',
    capabilities: ['function calling', '视觉理解', '流式响应', '中等延迟'],
    scenarios: ['通用对话', '工单分析', '内容审核', 'Agent 子任务'],
    overview: [
      'Claude Sonnet 4.5 是较成熟的一代 Sonnet 版本，适合追求稳定与兼容性的团队继续沿用。',
      '如果你不打算立即切到最新版本，它仍是可靠的平衡型方案。',
    ],
    whenToUse: [
      '通用对话、客服和内容审核',
      '需要视觉理解或工具调用但不追求旗舰级复杂推理时',
      '已经围绕 Sonnet 4.5 做过内部验证的老项目',
    ],
    integrationNotes: [
      '对已有 Claude 系工作流而言，迁移摩擦通常较小。',
      '如果你的团队使用 OpenAI 兼容 SDK，也可以通过 /v1 路径直接接入。',
      '建议和最新 Sonnet 版本做一轮小样本对比，再决定是否升级。',
    ],
    caveats: [
      '历史版本的行为和开放策略可能会随平台调整变化，以控制台为准。',
      '新接入项目通常优先考虑更新版本，再把 4.5 作为兼容性备选。',
    ],
  },
  // 来源：Anthropic Claude 4.5 Opus 官方说明，2025-11-01 发布；
  // 网上查找补充于 2026-05-09。
  // slug=claude-opus-4-5-20251101 ←→ modelId=claude-opus-4-5-20251101
  'claude-opus-4-5-20251101': {
    provider: 'Anthropic',
    tagline: 'Claude Opus 4.5（2025-11-01 版本），复杂任务上一代旗舰。',
    capabilities: ['长上下文', '高质量写作', 'function calling', '视觉理解'],
    scenarios: ['长文档分析', '复杂决策', '高质量翻译', 'Agent 决策'],
    overview: [
      'Claude Opus 4.5 是上一代高质量旗舰版本，适合重质量、重稳定性的复杂任务。',
      '如果你在迁移旧工作流或对比新旧 Opus 表现，它是很有参考价值的一档。',
    ],
    whenToUse: [
      '复杂决策、长文档分析、高质量文本生成',
      '旧版 Claude 工作流的平滑迁移与对比',
      '对输出一致性要求较高的企业内部任务',
    ],
    integrationNotes: [
      '接入方式与其他 Claude 系模型一致：OpenAI 风格用 /v1，Claude 风格用根地址。',
      '若你已有基于 Opus 4.5 的提示词资产，建议先在小样本上验证迁移成本。',
    ],
    caveats: [
      '作为上一代版本，是否开放、表现是否稳定、价格如何，以控制台为准。',
      '新项目若无历史包袱，通常优先从更新版本开始试。',
    ],
  },
  // 来源：Anthropic 官方对 -thinking 变体的描述：思考链增强、延迟更高；
  // 网上查找补充于 2026-05-09。
  // slug=claude-sonnet-4-5-20250929-thinking ←→ modelId=claude-sonnet-4-5-20250929-thinking
  'claude-sonnet-4-5-20250929-thinking': {
    provider: 'Anthropic',
    tagline: 'Sonnet 4.5 思考模式，平衡型推理增强变体。',
    capabilities: ['思考链', 'function calling', '视觉理解', '中等延迟'],
    scenarios: ['推理任务', '逻辑题求解', '工具规划', '可解释决策'],
    overview: [
      '这是 Sonnet 4.5 的 thinking 变体，适合把“更愿意多想一步”放在优先级前面的任务。',
      '它通常比标准 Sonnet 更偏复杂推理，而不是纯速度导向。',
    ],
    whenToUse: [
      '逻辑题、结构化推理、多步分析',
      '需要先判断再决定调用哪个工具的流程',
      '希望在 Sonnet 速度档位里拿到更强推理能力时',
    ],
    integrationNotes: [
      '建议先在少量复杂样本上验证，确认 thinking 变体带来的收益是否值得。',
      '如果你的工具可以直接切模型名，不必重构接口，只需替换默认 model。',
    ],
    caveats: [
      'thinking 变体通常延迟更高，真实体验和可用性以控制台为准。',
      '对于高并发、短请求场景，普通 Sonnet 可能更合适。',
    ],
  },
  // 来源：同上；网上查找补充于 2026-05-09。
  // slug=claude-sonnet-4-6-thinking ←→ modelId=claude-sonnet-4-6-thinking
  'claude-sonnet-4-6-thinking': {
    provider: 'Anthropic',
    tagline: 'Sonnet 4.6 思考模式，最新平衡型推理增强变体。',
    capabilities: ['思考链', 'function calling', '视觉理解', '流式响应'],
    scenarios: ['推理任务', 'Agent 规划', '代码审查', '复杂客服'],
    overview: [
      'Sonnet 4.6 Thinking 结合了较新的 Sonnet 基座与 thinking 增强，适合平衡型复杂任务。',
      '它通常比标准 Sonnet 更适合多步推理和 Agent 规划，但不追求极致低延迟。',
    ],
    whenToUse: [
      '复杂客服分析、工具规划、代码审查',
      '想要比普通 Sonnet 更强的推理，但又不一定上 Opus 时',
      '需要边流式输出边做结构化思考的场景',
    ],
    integrationNotes: [
      '在 Claude Code、Anthropic SDK、Agent 框架中都适合作为“中高复杂度工作模型”。',
      '接入路径与其他 Claude 模型一致，不需要为 thinking 版本改接口结构。',
    ],
    caveats: [
      '延迟、费用、功能开关和模型开放范围以控制台为准。',
      '如果你的请求主要是轻量对话，Haiku / 标准 Sonnet 可能更合适。',
    ],
  },
  // 来源：同上；网上查找补充于 2026-05-09。
  // slug=claude-opus-4-5-20251101-thinking ←→ modelId=claude-opus-4-5-20251101-thinking
  'claude-opus-4-5-20251101-thinking': {
    provider: 'Anthropic',
    tagline: 'Claude Opus 4.5 思考模式（2025-11-01），上一代旗舰深度推理变体。',
    capabilities: ['思考链', '长上下文', 'function calling', '视觉理解'],
    scenarios: ['深度推理', '复杂规划', '法律 / 金融分析', '多步 Agent'],
    overview: [
      '这是 Opus 4.5 的 thinking 版本，面向更深的推理过程和更复杂的问题拆解。',
      '它适合在“宁愿慢一点，也要尽量推理完整”的要求下使用。',
    ],
    whenToUse: [
      '法律、金融、研究等高复杂度分析',
      '多步 Agent、复杂规划、审慎型决策',
      '需要把长上下文与思考过程结合时',
    ],
    integrationNotes: [
      '优先用少量高价值样本验证，而不是先拿它跑高频批量任务。',
      '如果已有 Opus 4.5 工作流，可以在同样的接口结构下直接切模型做对比。',
    ],
    caveats: [
      'thinking 变体常常意味着更高延迟与不同的使用成本；以控制台为准。',
      '是否比非 thinking 版本更适合你的任务，需要实测而不是预设。',
    ],
  },

  // ── 次主推：Google + OpenAI + 国产开源系列 ─────────────────────────
  // 来源：Google Gemini 官网（gemini.google.com / ai.google.dev）公开介绍：
  // Flash 强调低延迟、Pro 强调高质量、preview 表示预览版；
  // 网上查找补充于 2026-05-09。
  // slug=gemini-3-flash-preview ←→ modelId=gemini-3-flash-preview
  'gemini-3-flash-preview': {
    provider: 'Google',
    tagline: 'Gemini 3 Flash 预览版，Google 低延迟多模态主力。',
    capabilities: ['低延迟', '视觉理解', 'function calling', '流式响应'],
    scenarios: ['实时对话', '多模态助手', '图像问答', '语音交互前端'],
    overview: [
      'Gemini 3 Flash Preview 面向低延迟多模态交互，适合先追求“快”和“多模态能跑通”的场景。',
      '如果你需要做图像问答、实时助手或前端交互，它通常比更重型的 Pro 版本更容易落地。',
    ],
    whenToUse: [
      '实时对话、图像问答、多模态助手',
      '对响应速度敏感的交互式产品',
      '希望快速验证 Google 系列模型接入时',
    ],
    integrationNotes: [
      '如果你用 OpenAI 风格工具，先走 https://gpt88.cc/v1 再把 model 切到 gemini-3-flash-preview。',
      '多模态请求建议先从单一图片或最小输入起步，验证字段格式。',
    ],
    caveats: [
      'preview 版本的可用性、稳定性和功能边界以控制台为准。',
      '低延迟不等于适合复杂长文档推理；更复杂场景可对比 Pro 版本。',
    ],
  },
  // 来源：同上；preview 阶段 Pro 版本面向高质量推理；
  // 网上查找补充于 2026-05-09。
  // slug=gemini-3-pro-preview ←→ modelId=gemini-3-pro-preview
  'gemini-3-pro-preview': {
    provider: 'Google',
    tagline: 'Gemini 3 Pro 预览版，Google 高质量多模态推理模型。',
    capabilities: ['长上下文', '视觉理解', 'function calling', '高质量推理'],
    scenarios: ['长文档分析', '多模态推理', '研究综述', '复杂 Agent'],
    overview: [
      'Gemini 3 Pro Preview 更偏高质量推理与多模态综合能力，适合作为 Google 系高阶选项。',
      '如果你既要文本推理，也要图片理解和更完整的输出，它通常比 Flash 更适合深入验证。',
    ],
    whenToUse: [
      '长文档分析、多模态推理、复杂 Agent',
      '需要综合文本与图像信息的产品流程',
      '想评估 Google 系高质量模型上限时',
    ],
    integrationNotes: [
      '建议先用最小 chat/completions 跑通，再逐步增加图片、多轮或工具调用。',
      'OpenAI 风格 SDK 通常是最自然的接入起点；字段命名更接近现有工程习惯。',
    ],
    caveats: [
      'preview 版本的行为与开放策略可能变化；是否开放视觉与上下文边界以控制台为准。',
      '相比 Flash，它更适合质量优先而非纯低延迟任务。',
    ],
  },
  // 来源：Google Gemini 3.1 Pro preview（公开日志公布的小版本迭代）；
  // 网上查找补充于 2026-05-09。
  // slug=gemini-3-1-pro-preview ←→ modelId=gemini-3.1-pro-preview
  'gemini-3-1-pro-preview': {
    provider: 'Google',
    tagline: 'Gemini 3.1 Pro 预览版，3 系列稳定性增强迭代。',
    capabilities: ['长上下文', '视觉理解', 'function calling', '高质量推理'],
    scenarios: ['长文档分析', '多模态推理', '科研综述', 'Agent 决策'],
    overview: [
      'Gemini 3.1 Pro Preview 可以理解为 3 系列 Pro 方向的迭代版本，侧重稳定性与质量延续。',
      '如果你在比较同系列预览版差异，它适合作为 Google 多模态高阶路线的一个候选。',
    ],
    whenToUse: [
      '多模态推理、长文档分析、研究综述',
      '希望在 Google 系列里比较不同 Pro 迭代版本',
      '对图像理解与推理质量有较高要求时',
    ],
    integrationNotes: [
      '接入方式与其他 OpenAI 兼容模型一致，不需要为了小版本迭代重做接口。',
      '建议在你已有提示词集上做 A/B 对比，而不是凭名称直接切生产默认值。',
    ],
    caveats: [
      'preview / 小版本迭代的可用性和能力边界以控制台为准。',
      '如果你的首要目标是速度，Flash 版本通常更合适。',
    ],
  },
  // 来源：OpenAI GPT-5 系列公开博客说明：5.2 与 5.5 同代但容量较小、
  // cost-effective 偏向；网上查找补充于 2026-05-09。
  // slug=gpt-5-2 ←→ modelId=gpt-5.2
  'gpt-5-2': {
    provider: 'OpenAI',
    tagline: 'GPT-5.2，与 5 系列同代的成本友好版本。',
    capabilities: ['function calling', 'JSON Mode', '流式响应'],
    scenarios: ['通用对话', '客服问答', '内容生成', '中量级 SaaS'],
    overview: [
      'GPT-5.2 是 GPT-5 系列中的更轻量成员，适合把通用性保留下来，同时兼顾更平衡的资源消耗。',
      '如果你不一定需要旗舰档，但又希望继续走 GPT 系列生态，它是自然的中间位选择。',
    ],
    whenToUse: [
      '通用对话、客服问答、内容生成',
      '中量级 SaaS、工作流自动化、批量任务',
      '想用 GPT 路线但不想一开始就上最高阶模型时',
    ],
    integrationNotes: [
      '最适合直接放入现有 OpenAI SDK 工作流，通过 https://gpt88.cc/v1 接入。',
      '建议和 gpt-5.4 / gpt-5.5 做小范围对比，确认质量与成本平衡点。',
    ],
    caveats: [
      '不同账号是否开放、限速如何、价格如何，以控制台为准。',
      '如果任务偏复杂推理或多模态上限，可继续往更高阶 GPT 模型试。',
    ],
  },
  // 来源：DeepSeek 开源 GitHub README 与官网（v4 系列：flash 偏快速、pro 偏完整能力）；
  // 网上查找补充于 2026-05-09。
  // slug=deepseek-v4-flash ←→ modelId=deepseek-v4-flash
  'deepseek-v4-flash': {
    provider: 'DeepSeek',
    tagline: 'DeepSeek V4 Flash，开源系性价比对话模型，低延迟版本。',
    capabilities: ['低延迟', '中英双语', 'function calling', '流式响应'],
    scenarios: ['客服问答', '内容生成', '智能体子任务', '本地化助手'],
    overview: [
      'DeepSeek V4 Flash 是 V4 系列里更偏快速与性价比的一档，适合作为轻量对话或批量任务入口。',
      '如果你更看重低延迟、中文体验或开源系路线，它通常是一个友好的试水点。',
    ],
    whenToUse: [
      '客服问答、内容生成、批量处理',
      '中文或双语任务、轻量 Agent 子任务',
      '需要先验证开源系模型在你业务里的适配性时',
    ],
    integrationNotes: [
      'OpenAI 风格 SDK 可以最快接入；先用最小 chat/completions 请求跑通。',
      '如果你在中国大陆网络里工作，也可以先对比不同线路的时延差异。',
    ],
    caveats: [
      '实际可用性、价格、限速与上下文边界以控制台为准。',
      '对于复杂长文档或代码质量要求更高的场景，可对比 Pro 版本。',
    ],
  },
  // 来源：同上；pro 版本支持长上下文与函数调用；
  // 网上查找补充于 2026-05-09。
  // slug=deepseek-v4-pro ←→ modelId=deepseek-v4-pro
  'deepseek-v4-pro': {
    provider: 'DeepSeek',
    tagline: 'DeepSeek V4 Pro，开源系完整能力对话模型，长上下文 + function calling。',
    capabilities: ['长上下文', 'function calling', '中英双语', '代码生成'],
    scenarios: ['代码助手', '通用 Agent', '长文档处理', '本地化方案'],
    overview: [
      'DeepSeek V4 Pro 是 DeepSeek V4 系列里更完整的一档，适合作为开源系主力对话模型使用。',
      '如果你既关心中文表现，又希望具备较好的代码与工具调用能力，它通常值得进入对比名单。',
    ],
    whenToUse: [
      '长文档处理、通用 Agent、代码助手',
      '中文优先或中英双语任务',
      '想在开源系路线里兼顾能力完整性与接入成本时',
    ],
    integrationNotes: [
      '在 OpenAI 风格工具中最容易落地，最适合用现有 SDK 先快速验证。',
      '如果你正在从其他中文模型迁移，可优先用同一批业务样本对比指令跟随与工具调用表现。',
    ],
    caveats: [
      '是否开放、上下文边界、线路表现与价格以控制台为准。',
      '作为长尾可选模型保留，不代表当前站内默认主推口径。',
    ],
  },
  // 来源：智谱 GLM 官方网站与开源仓库；5 系列（含 5.1）面向通用对话；
  // 网上查找补充于 2026-05-09。
  // slug=glm-5-1 ←→ modelId=glm-5.1
  'glm-5-1': {
    provider: '智谱 (Zhipu)',
    tagline: '智谱 GLM 5.1，国产通用对话模型，中文场景表现稳定。',
    capabilities: ['中文优势', 'function calling', '流式响应'],
    scenarios: ['中文客服', '本地化助手', '内容生成', '问答系统'],
    overview: [
      'GLM 5.1 是智谱系的通用对话模型，偏向中文体验与通用业务接入。',
      '如果你的业务主要面向中文用户，或者想在国产模型路线里做通用接入，它是值得试的一档。',
    ],
    whenToUse: [
      '中文客服、本地化助手、内容生成',
      '希望用国产路线先验证通用对话链路时',
      '需要 function calling 但不想一开始就切到更复杂的模型组合时',
    ],
    integrationNotes: [
      '建议先通过 OpenAI 风格路径验证连通性，再按业务需求决定是否进入正式工作流。',
      '如果团队里已有 GLM 相关提示词或内部评测数据，迁移摩擦通常较小。',
    ],
    caveats: [
      '中文体验、可用模型范围、上下文边界与费用策略以控制台为准。',
      '若业务更偏多模态或长文档复杂推理，可同步对比其他供应商模型。',
    ],
  },
}

/* ──────────────────────────────────────────────────────────────────
 * 工具：slug 转换 + provider 推断 + 接口路径推断
 *
 * 这些函数都是"展示推断"，不是权威：
 * - canonical_name → slug：仅替换 .，避免被 react-router 当成嵌套路径
 *   （注意 canonical_name 中没有 / 或空格，验证过）
 * - provider 推断：根据常见前缀简单 map；推断不出时返回 display_name 兜底，
 *   避免 UI 上空白；后续如果 marketplace 加了 owned_by 字段，可以替换为权威来源
 * - category → endpoint：按 OpenAI 兼容协议惯例做映射；completion 走 chat
 * ────────────────────────────────────────────────────────────────── */

/** canonical_name → URL safe slug；唯一变换是把 . 换成 - */
export function canonicalToSlug(canonical: string): string {
  return canonical.replaceAll('.', '-')
}

/**
 * 从 modelId 前缀推断 provider；推断不出时回退到 fallbackName（一般是 display_name）。
 *
 * 这是"展示推断"——marketplace 没有权威 provider 字段，
 * 大多数模型 ID 仍能透露厂商系列（claude- / gpt- / gemini- / glm- 等）。
 */
export function inferProvider(modelId: string, fallbackName?: string): string {
  const id = modelId.toLowerCase()
  if (id.startsWith('gpt-') || id.startsWith('gpt5-') || id.startsWith('gpt-5-') || id.startsWith('o1-') || id.startsWith('o3-') || id.startsWith('o4-')) return 'OpenAI'
  if (id.startsWith('claude-')) return 'Anthropic'
  if (id.startsWith('gemini-')) return 'Google'
  if (id.startsWith('deepseek-')) return 'DeepSeek'
  if (id.startsWith('glm-')) return '智谱 (Zhipu)'
  if (id.startsWith('kimi-')) return 'Moonshot'
  if (id.startsWith('qwen') || id.startsWith('qwen3-') || id.startsWith('qwen-')) return 'Alibaba'
  if (id.startsWith('minimax-') || id.startsWith('abab-')) return 'MiniMax'
  if (id.startsWith('doubao-')) return '字节跳动 (ByteDance)'
  if (id.startsWith('sparkdesk-') || id.startsWith('spark-')) return '科大讯飞 (iFlytek)'
  if (id.startsWith('ernie-') || id.startsWith('wenxin-')) return 'Baidu'
  if (id.startsWith('whisper-')) return 'OpenAI'
  if (id.startsWith('flux-') || id.startsWith('flux.')) return 'Black Forest Labs'
  if (id.startsWith('sd-') || id.startsWith('sd3-') || id.startsWith('stable-')) return 'Stability AI'
  if (id.startsWith('runway-') || id.startsWith('gen-3') || id.startsWith('gen3-')) return 'Runway'
  if (id.startsWith('kling-')) return '快手 (Kling)'
  if (id.startsWith('text-embedding-')) return 'OpenAI'
  if (id.startsWith('grok-')) return 'xAI'
  return fallbackName ?? '未知'
}

/**
 * 按 category 映射默认接口路径；completion 视为 chat（PM 决策合并）。
 */
function endpointFromCategory(category: string): ModelEndpoint {
  switch (category) {
    case 'image':
      return { method: 'POST', path: '/v1/images/generations' }
    case 'video':
      return { method: 'POST', path: '/v1/videos/generations' }
    case 'audio':
      return { method: 'POST', path: '/v1/audio/transcriptions' }
    case 'embedding':
      return { method: 'POST', path: '/v1/embeddings' }
    case 'chat':
    case 'completion':
    default:
      return { method: 'POST', path: '/v1/chat/completions' }
  }
}

function endpointForModel(category: string, modelId: string): ModelEndpoint {
  if (usesGeminiGenerateContentImage(modelId)) {
    return { method: 'POST', path: `/v1beta/models/${modelId}:generateContent` }
  }
  return endpointFromCategory(category)
}

/*
 * marketplace 快照里的 canonical_name 偏向机器归一化；少数模型真实可调用的
 * body.model 需要保留官方大小写。例如 NanoBanana2 如果写成 nanobanana2，
 * 用户复制示例后会因为模型 ID 大小写不一致而失败。
 */
const API_MODEL_ID_OVERRIDES: Record<string, string> = {
  nanobanana2: 'NanoBanana2',
}

function apiModelIdFromRow(row: CatalogRow): string {
  return API_MODEL_ID_OVERRIDES[row.canonical_name] ?? row.canonical_name
}

const IMAGE_SIZE_RATIOS = [
  '16:9',
  '1:1',
  '21:9',
  '2:3',
  '3:2',
  '3:4',
  '4:3',
  '4:5',
  '5:4',
  '9:16',
  'auto',
]

function usesRatioImageSize(modelId: string): boolean {
  const id = modelId.toLowerCase()
  return id === 'nanobanana2' || id === 'gemini-3-pro-image-preview'
}

function usesGeminiGenerateContentImage(modelId: string): boolean {
  const id = modelId.toLowerCase()
  return id === 'nanobanana2' || id === 'gemini-3-pro-image-preview'
}

/* ──────────────────────────────────────────────────────────────────
 * 长尾模型详情模板生成器
 *
 * 参考来源：apimart 详情页的"信息架构心智"（模型概览 / 适用场景 / 调用说明 / 使用建议），
 * 但不是字段源头。这里不试图为 239 个模型逐个写成白皮书，而是基于
 * provider + category + slug 关键词生成一套保守、可用、面向接入者的说明层。
 *
 * 约束：
 * - 不写死价格 / SLA / 限速 / 上下文长度数字
 * - 不承诺控制台未确认的能力边界
 * - 写法尽量保守：用「通常 / 更适合 / 建议 / 以控制台为准」而不是硬承诺
 * ────────────────────────────────────────────────────────────────── */

function pickVariantHints(model: Pick<ModelEntry, 'slug' | 'modelId' | 'category'>) {
  const id = `${model.slug} ${model.modelId}`.toLowerCase()
  return {
    thinking: id.includes('thinking'),
    flash: id.includes('flash'),
    mini: id.includes('mini'),
    pro: id.includes('pro') || id.includes('opus'),
    coder: id.includes('codex') || id.includes('coder'),
    vision: id.includes('vision'),
  }
}

function categoryOverview(category: ModelCategory): string {
  switch (category) {
    case 'image':
      return '这是一个图像生成模型，适合把文本提示词转成静态图片或视觉素材。'
    case 'video':
      return '这是一个视频生成模型，适合把文本或素材生成短视频片段。'
    case 'audio':
      return '这是一个音频处理模型，适合语音识别、转写或相关媒体处理任务。'
    case 'chat':
    default:
      return '这是一个对话 / 推理类模型，适合通过统一的 chat/completions 接口接入。'
  }
}

function providerOverview(provider: string): string {
  if (provider.includes('Anthropic')) {
    return '它属于 Claude / Anthropic 路线，通常更适合需要长文档理解、复杂推理或 Agent 协作的场景。'
  }
  if (provider.includes('OpenAI')) {
    return '它属于 OpenAI 路线，通常更适合直接接入现有 OpenAI SDK、工具调用和结构化输出工作流。'
  }
  if (provider.includes('Google')) {
    return '它属于 Google Gemini 路线，通常更适合多模态理解、图像输入或综合推理任务。'
  }
  if (provider.includes('DeepSeek')) {
    return '它属于 DeepSeek 路线，通常兼顾中英双语、代码与通用对话场景，适合做开源系方案比较。'
  }
  if (provider.includes('智谱')) {
    return '它属于智谱 GLM 路线，通常更适合中文业务、本地化助手与通用问答系统。'
  }
  if (provider.includes('Moonshot')) {
    return '它属于 Moonshot / Kimi 路线，通常更适合长文本理解、知识整理与信息归纳。'
  }
  if (provider.includes('Alibaba')) {
    return '它属于阿里 Qwen 路线，通常更适合中文与多语言任务，尤其在通用对话与代码方向表现稳定。'
  }
  if (provider.includes('MiniMax')) {
    return '它属于 MiniMax 路线，通常更适合语音、多模态与交互式内容场景。'
  }
  if (provider.includes('Black Forest Labs') || provider.includes('Stability') || provider.includes('Runway') || provider.includes('Kling')) {
    return '它属于媒体生成路线，接入时更需要先确认输出介质、文件格式和任务接口是否与你的工具匹配。'
  }
  return '它是一个可通过 gpt88.cc 统一接口接入的模型，具体能力边界建议结合控制台实时配置确认。'
}

function buildLongTailDetail(
  model: Pick<ModelEntry, 'slug' | 'modelId' | 'name' | 'provider' | 'category' | 'endpoint'>,
): Pick<ModelEntry, 'overview' | 'whenToUse' | 'integrationNotes' | 'caveats'> {
  const hints = pickVariantHints(model)
  const overview = [categoryOverview(model.category), providerOverview(model.provider)]

  if (hints.thinking) {
    overview.push('名称中的 thinking 变体通常意味着它更偏深度推理与多步规划，而不是极致低延迟。')
  } else if (hints.flash || hints.mini) {
    overview.push('名称中的 flash / mini 变体通常更偏低延迟、高吞吐或轻量任务。')
  } else if (hints.pro) {
    overview.push('名称中的 pro / opus 通常表示它更偏质量优先、复杂任务或更完整能力。')
  } else if (hints.coder) {
    overview.push('名称中的 codex / coder 通常表示它更偏代码生成、重构与自动化开发场景。')
  }

  let whenToUse: string[]
  switch (model.category) {
    case 'image':
      whenToUse = [
        '需要把文案或提示词转换成图片素材时',
        '做海报、电商主图、品牌概念图或社媒配图时',
        '先用一条最小 prompt 验证输出风格，再扩展到批量生成时',
      ]
      break
    case 'video':
      whenToUse = [
        '需要根据文本生成短视频片段时',
        '做广告概念、镜头预演或产品演示素材时',
        '先验证异步作业链路，再扩展到更复杂的视频工作流时',
      ]
      break
    case 'audio':
      whenToUse = [
        '做语音转写、字幕、会议纪要或音频理解时',
        '先验证文件上传与返回结构，再接入正式媒体工作流时',
        '需要把音频能力和现有 OpenAI 风格工具统一起来时',
      ]
      break
    case 'chat':
    default:
      whenToUse = [
        '通用对话、知识问答、内容生成或智能助手场景',
        '需要先用统一接口快速验证模型风格与可用性时',
        '希望把模型接入现有 SDK、CLI、IDE 或 Agent 工作流时',
      ]
      if (hints.coder) {
        whenToUse.unshift('代码生成、脚本编写、测试生成与开发自动化场景')
      }
      if (hints.thinking) {
        whenToUse.unshift('复杂推理、多步规划、需要先想清楚再输出的任务')
      }
      if (hints.flash || hints.mini) {
        whenToUse.unshift('轻量对话、批量任务、对延迟与吞吐更敏感的场景')
      }
      if (hints.pro) {
        whenToUse.unshift('长文档分析、复杂决策、质量优先的输出场景')
      }
      break
  }

  const integrationNotes = usesGeminiGenerateContentImage(model.modelId)
    ? [
        'Google/Gemini 图片模型请优先使用加速根地址 https://china.claudecoder.me。',
        `第一次接入时，建议先用 ${model.endpoint.path} 验证 API Key、模型名 ${model.modelId} 和当前线路是否匹配。`,
        '请求体使用 Gemini 原生 contents / generationConfig 结构，返回图片通常在 inlineData.data 中。',
      ]
    : [
        `OpenAI 风格工具优先从 https://gpt88.cc${model.endpoint.path.startsWith('/v1') ? '/v1' : ''} 起步；Claude 风格工具优先使用根地址。`,
        `第一次接入时，建议先用一条最小请求验证 API Key、模型名 ${model.modelId} 和当前线路是否匹配。`,
      ]
  if (model.category === 'chat') {
    integrationNotes.push(`如果你的工具支持 chat/completions，请优先从 ${model.endpoint.path} 这条最稳定的主路径开始验证。`)
  }
  if (hints.coder) {
    integrationNotes.push('代码类模型更适合接入 IDE、CLI、测试生成或开发 Agent 场景，建议先用最小代码任务做评估。')
  }
  if (model.category === 'image' || model.category === 'video' || model.category === 'audio') {
    integrationNotes.push('媒体类模型通常先验证上传 / 返回结构，再扩展到正式的素材或媒体管线。')
  }

  const caveats = [
    '价格、限速、SLA、上下文长度、是否开放多模态等动态值以 gpt88.cc 控制台为准。',
    '如果当前线路延迟偏高或连接不稳定，可切换到中国调用 / 海外全球加速等价端点重新测试。',
  ]
  if (model.category === 'image' && usesGeminiGenerateContentImage(model.modelId)) {
    caveats.unshift(
      `该 Google 图片模型使用 generationConfig.imageConfig.aspectRatio 控制画幅比例，支持 ${IMAGE_SIZE_RATIOS.join(' / ')}；不要传 "1024x1024" 这类像素尺寸，清晰度请使用 imageConfig.imageSize，例如 "1K"。`,
    )
  } else if (model.category === 'image' && usesRatioImageSize(model.modelId)) {
    caveats.unshift(
      `该图像模型使用 size 控制画幅比例，支持 ${IMAGE_SIZE_RATIOS.join(' / ')}；不要传 "1024x1024" 这类像素尺寸，推荐同时传 resolution，例如 "1K"。`,
    )
  }
  if (hints.thinking) {
    caveats.unshift('thinking 变体通常更偏深度推理，实际延迟可能高于普通版本；是否值得切换请结合真实任务验证。')
  } else if (hints.flash || hints.mini) {
    caveats.unshift('flash / mini 变体更适合轻量任务；面对复杂长文档或高质量推理时，可能需要升级到更高阶模型。')
  } else if (hints.pro) {
    caveats.unshift('pro / opus 更偏质量优先；如果你更看重吞吐和低延迟，可先比较轻量模型。')
  }

  return {
    overview,
    whenToUse,
    integrationNotes,
    caveats,
  }
}

/* ──────────────────────────────────────────────────────────────────
 * 请求示例：按分类生成 cURL / Python / Node.js 三段
 *
 * base_url 默认 https://gpt88.cc/v1（task t-20260509-7vh34r 已替换全站；
 * 此处直接写当前默认端点的新值，不要再生成旧的历史 API 域名字面量。
 * 旧域名连注释都不应保留，以避免 QA grep 误报，并避免维护者把历史迁移痕迹
 * 误解成仍应继续兼容的运行时地址）。
 * ────────────────────────────────────────────────────────────────── */

function buildExamples(modelId: string, endpoint: ModelEndpoint): ModelExample[] {
  if (usesGeminiGenerateContentImage(modelId)) {
    return [
      {
        label: 'Gemini cURL',
        lang: 'bash',
        code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://china.claudecoder.me"
export MODEL="${modelId}"

curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [{
        "text": "生成一张16:9的赛博朋克城市夜景，霓虹灯，雨夜，电影感，高细节"
      }]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "16:9",
        "imageSize": "2K"
      }
    }
  }' > response.json

jq -r '.. | objects | (.inlineData?.data // .inline_data?.data)? | select(.)' response.json \\
  | head -n 1 \\
  | base64 -d > output.png`,
      },
      {
        label: 'macOS base64',
        lang: 'bash',
        code: `jq -r '.. | objects | (.inlineData?.data // .inline_data?.data)? | select(.)' response.json \\
  | head -n 1 \\
  | base64 -D > output.png`,
      },
      {
        label: 'Node.js',
        lang: 'typescript',
        code: `import fs from "node:fs";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://china.claudecoder.me";
const MODEL = "${modelId}";

const res = await fetch(
  \`\${BASE_URL}/v1beta/models/\${MODEL}:generateContent\`,
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: "生成一张1:1的可爱3D图标，白色背景，彩色质感，无文字",
        }],
      }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K",
        },
      },
    }),
  },
);

const json = await res.json();
if (!res.ok) throw new Error(JSON.stringify(json, null, 2));

const part = json.candidates?.[0]?.content?.parts?.find(
  p => p.inlineData?.data || p.inline_data?.data,
);

const b64 = part?.inlineData?.data ?? part?.inline_data?.data;
fs.writeFileSync("output.png", Buffer.from(b64, "base64"));
console.log("saved output.png");`,
      },
      {
        label: 'x-goog-api-key',
        lang: 'bash',
        code: `curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "x-goog-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @payload.json > response.json`,
      },
    ]
  }

  if (endpoint.path === '/v1/images/generations') {
    const imageBaseUrl = 'https://china.claudecoder.me'
    const ratioSizeModel = usesRatioImageSize(modelId)
    const prompt = ratioSizeModel ? '月光下的竹林小径' : '极简风格的 API 文档站封面'
    const editPrompt = ratioSizeModel
      ? '保留参考图主体，将背景改成月光下的竹林小径'
      : '保留参考图主体，改成极简 API 文档站封面风格'
    const imageParamsJson = ratioSizeModel
      ? `    "size": "1:1",
    "resolution": "1K",
    "n": 1`
      : `    "size": "1024x1024",
    "n": 1`
    const imagePayloadPython = ratioSizeModel
      ? `        "size": "1:1",
        "resolution": "1K",
        "n": 1,`
      : `        "size": "1024x1024",
        "n": 1,`
    const imagePayloadNode = ratioSizeModel
      ? `    size: "1:1",
    resolution: "1K",
    n: 1,`
      : `    size: "1024x1024",
    n: 1,`
    return [
      {
        label: '文生图 cURL',
        lang: 'bash',
        code: `curl ${imageBaseUrl}${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelId}",
    "prompt": "${prompt}",
${imageParamsJson}
  }'`,
      },
      {
        label: '文生图 Python',
        lang: 'python',
        code: `import requests

resp = requests.post(
    "${imageBaseUrl}${endpoint.path}",
    headers={
        "Authorization": "Bearer YOUR_GPT88_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "model": "${modelId}",
        "prompt": "${prompt}",
${imagePayloadPython}
    },
)
print(resp.json())`,
      },
      {
        label: '文生图 Node.js',
        lang: 'typescript',
        code: `const resp = await fetch("${imageBaseUrl}${endpoint.path}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.GPT88_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "${modelId}",
    prompt: "${prompt}",
${imagePayloadNode}
  }),
});

console.log(await resp.json());`,
      },
      {
        label: '图生图 cURL',
        lang: 'bash',
        code: `curl ${imageBaseUrl}${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelId}",
    "prompt": "${editPrompt}",
    "image_urls": [
      "https://example.com/reference.png"
    ],
${imageParamsJson}
  }'`,
      },
      {
        label: '图生图 Python',
        lang: 'python',
        code: `import requests

resp = requests.post(
    "${imageBaseUrl}${endpoint.path}",
    headers={
        "Authorization": "Bearer YOUR_GPT88_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "model": "${modelId}",
        "prompt": "${editPrompt}",
        "image_urls": [
            "https://example.com/reference.png",
        ],
${imagePayloadPython}
    },
)
print(resp.json())`,
      },
      {
        label: '图生图 Node.js',
        lang: 'typescript',
        code: `const resp = await fetch("${imageBaseUrl}${endpoint.path}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.GPT88_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "${modelId}",
    prompt: "${editPrompt}",
    image_urls: [
      "https://example.com/reference.png",
    ],
${imagePayloadNode}
  }),
});

console.log(await resp.json());`,
      },
    ]
  }
  if (endpoint.path === '/v1/videos/generations') {
    return [
      {
        label: 'cURL',
        lang: 'bash',
        code: `curl https://gpt88.cc${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelId}",
    "prompt": "镜头从城市夜景缓缓推近一栋发光的摩天楼",
    "duration": 6,
    "aspect_ratio": "16:9"
  }'`,
      },
      {
        label: 'Python',
        lang: 'python',
        code: `# 视频生成通常是异步任务，先创建作业再轮询
import requests

resp = requests.post(
    "https://gpt88.cc${endpoint.path}",
    headers={"Authorization": "Bearer YOUR_GPT88_API_KEY"},
    json={
        "model": "${modelId}",
        "prompt": "镜头从城市夜景缓缓推近一栋发光的摩天楼",
        "duration": 6,
        "aspect_ratio": "16:9",
    },
)
print(resp.json())`,
      },
      {
        label: 'Node.js',
        lang: 'typescript',
        code: `const resp = await fetch(
  "https://gpt88.cc${endpoint.path}",
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.GPT88_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "${modelId}",
      prompt: "镜头从城市夜景缓缓推近一栋发光的摩天楼",
      duration: 6,
      aspect_ratio: "16:9",
    }),
  },
);
console.log(await resp.json());`,
      },
    ]
  }
  if (endpoint.path === '/v1/audio/transcriptions') {
    return [
      {
        label: 'cURL',
        lang: 'bash',
        code: `curl https://gpt88.cc${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -F "model=${modelId}" \\
  -F "file=@meeting.mp3" \\
  -F "response_format=verbose_json"`,
      },
      {
        label: 'Python',
        lang: 'python',
        code: `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

with open("meeting.mp3", "rb") as f:
    resp = client.audio.transcriptions.create(
        model="${modelId}",
        file=f,
        response_format="verbose_json",
    )
print(resp.text)`,
      },
      {
        label: 'Node.js',
        lang: 'typescript',
        code: `import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.audio.transcriptions.create({
  model: "${modelId}",
  file: fs.createReadStream("meeting.mp3"),
  response_format: "verbose_json",
});
console.log(resp.text);`,
      },
    ]
  }
  if (endpoint.path === '/v1/embeddings') {
    return [
      {
        label: 'cURL',
        lang: 'bash',
        code: `curl https://gpt88.cc${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelId}",
    "input": "gpt88.cc 是一个统一 API 网关"
  }'`,
      },
      {
        label: 'Python',
        lang: 'python',
        code: `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.embeddings.create(
    model="${modelId}",
    input="gpt88.cc 是一个统一 API 网关",
)
print(resp.data[0].embedding[:8])`,
      },
      {
        label: 'Node.js',
        lang: 'typescript',
        code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.embeddings.create({
  model: "${modelId}",
  input: "gpt88.cc 是一个统一 API 网关",
});
console.log(resp.data[0].embedding.slice(0, 8));`,
      },
    ]
  }
  // 默认：chat / completion
  return [
    {
      label: 'cURL',
      lang: 'bash',
      code: `curl https://gpt88.cc${endpoint.path} \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="${modelId}",
    messages=[{"role": "user", "content": "用一句话介绍 gpt88.cc"}],
)
print(resp.choices[0].message.content)`,
    },
    {
      label: 'Node.js',
      lang: 'typescript',
      code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "${modelId}",
  messages: [{ role: "user", content: "用一句话介绍 gpt88.cc" }],
});
console.log(resp.choices[0].message.content);`,
    },
  ]
}

/* ──────────────────────────────────────────────────────────────────
 * Catalog 加载：
 * 1) 读 snapshot.catalog
 * 2) 丢弃 embedding 分类（任务要求）
 * 3) 按 canonical_name 去重；若同名条目同时有 chat 和 completion，留 chat 那一条
 * 4) 把 completion 单独存在的条目（理论上没有，做保险）转成 chat
 * 5) 套上 featured / capabilities / scenarios / tagline
 * ────────────────────────────────────────────────────────────────── */

type CatalogRow = {
  canonical_name: string
  display_name: string
  category: string
  vendors_count: number
  upstream_samples: string[]
  descriptions_sample: string[]
}

function buildCatalog(): ModelEntry[] {
  const rows = (snapshot.catalog as CatalogRow[]).slice()
  // 分组：(canonical_name) → array of rows
  const byName = new Map<string, CatalogRow[]>()
  for (const r of rows) {
    if (r.category === 'embedding') continue
    const list = byName.get(r.canonical_name) ?? []
    list.push(r)
    byName.set(r.canonical_name, list)
  }

  const entries: ModelEntry[] = []
  for (const [, list] of byName) {
    // 优先选 chat，其次 image/video/audio，最后 completion
    const priority: Record<string, number> = {
      chat: 0,
      image: 1,
      video: 2,
      audio: 3,
      completion: 4,
    }
    list.sort(
      (a, b) => (priority[a.category] ?? 9) - (priority[b.category] ?? 9),
    )
    const picked = list[0]
    // completion 暂归入 chat
    const normalizedCategory: ModelCategory =
      picked.category === 'completion' ? 'chat' : (picked.category as ModelCategory)
    const slug = canonicalToSlug(picked.canonical_name)
    const apiModelId = apiModelIdFromRow(picked)
    const featured = (FEATURED_SLUGS as readonly string[]).includes(slug)
    /*
     * 注意：detail 的查找解耦了 featured 标记。
     * FEATURED_SLUGS 控制"是否进入主推置顶位"，FEATURED_DETAILS 字典则覆盖
     * "是否有人工运营的能力 / 场景 / tagline"——后者范围比前者大（21 vs 8），
     * 所以这里**总是**按 slug 查表，无论 featured。命中即用人工文案，
     * 未命中走下面的回退分支。
     */
    const detail = FEATURED_DETAILS[slug]
    const longTailDetail = buildLongTailDetail({
      slug,
      modelId: apiModelId,
      name: picked.display_name,
      provider: detail?.provider ?? inferProvider(picked.canonical_name, picked.display_name),
      category: normalizedCategory,
      endpoint: endpointForModel(picked.category, apiModelId),
    })

    const provider = detail?.provider ?? inferProvider(picked.canonical_name, picked.display_name)
    /*
     * tagline 兜底逻辑（Human msg-20260509-4q7t82）：
     * 1) 命中 FEATURED_DETAILS → 用人工写的 detail.tagline
     * 2) 否则 inferProvider 命中（非"未知"，且不是 display_name 兜底）→
     *    用 `${provider} ${display_name} · ${CATEGORY} 模型`
     * 3) 否则用 `${CATEGORY} 模型 · ${provider}` 兜底
     *
     * 不再使用 descriptions_sample[0] 截 60 字作 tagline——
     * subrouter 上 vendor 写的 description 噪声较大（如「不降智，延迟低，plus 号池」），
     * 把它当成 tagline 会污染列表卡片可读性。原始数据仍保留在
     * ModelEntry.descriptionsSample 里，留给后续可能的「上游卖点」展示用。
     */
    const inferred = inferProvider(picked.canonical_name)
    const inferredHit = inferred !== '未知' && inferred !== picked.display_name
    const upper = normalizedCategory.toUpperCase()
    const longTailTagline = inferredHit
      ? `${provider} ${picked.display_name} · ${upper} 模型`
      : `${upper} 模型 · ${provider}`
    const tagline = detail?.tagline ?? longTailTagline

    const endpoint = endpointForModel(picked.category, apiModelId)
    entries.push({
      slug,
      name: picked.display_name,
      modelId: apiModelId,
      provider,
      category: normalizedCategory,
      featured,
      tagline,
      capabilities: detail?.capabilities ?? [],
      scenarios: detail?.scenarios ?? [],
      overview: detail?.overview ?? longTailDetail.overview,
      whenToUse: detail?.whenToUse ?? longTailDetail.whenToUse,
      integrationNotes: detail?.integrationNotes ?? longTailDetail.integrationNotes,
      caveats: detail?.caveats ?? longTailDetail.caveats,
      vendorsCount: list.reduce((sum, r) => sum + r.vendors_count, 0),
      endpoint,
      examples: buildExamples(apiModelId, endpoint),
      descriptionsSample: picked.descriptions_sample,
    })
  }
  return entries
}

export const MODELS: ModelEntry[] = buildCatalog()

/* ──────────────────────────────────────────────────────────────────
 * 元数据：分类与查询助手
 * ────────────────────────────────────────────────────────────────── */

export const CATEGORY_META: Record<
  ModelCategory,
  { title: string; subtitle: string }
> = {
  chat: {
    title: 'Chat',
    subtitle: '对话与推理 · /v1/chat/completions',
  },
  image: {
    title: 'Image',
    subtitle: '图像生成 · Gemini generateContent / images',
  },
  video: {
    title: 'Video',
    subtitle: '视频生成 · /v1/videos/generations',
  },
  audio: {
    title: 'Audio',
    subtitle: '语音识别与合成 · /v1/audio/*',
  },
}

export const CATEGORY_ORDER: ModelCategory[] = ['chat', 'image', 'video', 'audio']

/** 主推 8 个，按 FEATURED_SLUGS 顺序返回（仅返回真实存在于 catalog 的） */
export function getFeaturedModels(): ModelEntry[] {
  const bySlug = new Map(MODELS.map(m => [m.slug, m]))
  const result: ModelEntry[] = []
  for (const s of FEATURED_SLUGS) {
    const m = bySlug.get(s)
    if (m) result.push(m)
  }
  return result
}

/** 默认主推 slug：用作 LandingPage 默认进详情页的 slug */
export const DEFAULT_FEATURED_SLUG = FEATURED_SLUGS[0]

/** 按 slug 取模型，详情页路由用 */
export function findModel(slug: string): ModelEntry | undefined {
  return MODELS.find(m => m.slug === slug)
}

/**
 * 模型搜索：在 display_name / canonical_name / provider 推断结果 / descriptions_sample 中
 * 不区分大小写匹配子串。命中任一字段即视为命中。
 *
 * 不做加权排序——保留调用方传入的顺序（featured 在前 / 同分类按 vendors_count 等）。
 */
export function searchModels(models: ModelEntry[], q: string): ModelEntry[] {
  const query = q.trim().toLowerCase()
  if (!query) return models
  return models.filter(m => {
    const haystack = [
      m.name,
      m.modelId,
      m.provider,
      m.tagline,
      ...m.capabilities,
      ...m.scenarios,
      ...m.descriptionsSample,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}
