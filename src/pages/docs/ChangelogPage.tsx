import type { ReactNode } from 'react'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const UPDATE_SOURCE = `更新来源：
- 产品范围：GPT88 平台、gpt88.cc 控制台、agent.gpt88.cc 图片工作台和相关 API 能力
- 记录方式：按实际功能主题整理
- 更新原则：只记录用户可感知功能、重要修复、部署能力、计费和 API 行为变化

维护建议：
1. 每次 GPT88 发布或完成一组功能后，在本页新增日期分组
2. 先写用户能看懂的变化，再补技术细节
3. 不把纯内部临时提交、无用户影响的中间提交写进正式 changelog
4. 涉及计费、模型、图片生成、支付、部署的变化优先记录`

type ChangeItem = {
  type: '新增' | '优化' | '修复' | '调整'
  title: string
  detail: ReactNode
  commits?: string[]
}

type ChangeGroup = {
  date: string
  summary: string
  items: ChangeItem[]
}

const CHANGELOG: ChangeGroup[] = [
  {
    date: '2026-07-17',
    summary: '补充已发布的 Moonshot Kimi K3 推荐与接入资料，帮助开发者快速判断长上下文、编程和 Agent 场景的适配性。',
    items: [
      {
        type: '新增',
        title: '增加 Kimi K3 大模型推荐',
        detail: '模型导航新增 kimi-k3 目录和独立详情页，Overview、FAQ、英文文档及机器可读 SEO 索引同步补充 Kimi K3 的 1M-token 上下文、长周期编程、知识工作、原生视觉理解和工具调用说明。GPT88 接入统一使用 https://api.gpt88.cc，Model ID 为 kimi-k3。',
        commits: [],
      },
      {
        type: '新增',
        title: '补充 Kimi K3 第三方实战评测整理',
        detail: '新增公开评测参考页，整理 Arena.ai、Terminal-Bench 2.1、Program Bench 的文章记录，以及交互动画、3D 讲解、网页 PPT、足球游戏、肉鸽游戏和全栈 AI IDE 等 7 个项目案例，并明确第三方数据不等于官方性能或 GPT88 实时价格承诺。',
        commits: [],
      },
    ],
  },
  {
    date: '2026-07-16',
    summary: '开发者文档完成一轮 API 入口、计费说明、媒体接口、SEO 索引和 Claude Code 排障更新，减少接入时的地址歧义与搜索收录问题。',
    items: [
      {
        type: '新增',
        title: '补充 Claude Code compaction 恢复指南',
        detail: '新增从历史会话较早位置 fork，再执行 /compact 恢复上下文的排障文档，并补充上下文过长、错误 fork 位置和恢复后验证步骤，帮助用户处理 Input exceeds the model context window 错误。',
        commits: ['2a1ddbf'],
      },
      {
        type: '修复',
        title: '移除 sitemap 中的 noindex 页面',
        detail: '更新 SEO 生成和静态路由审计逻辑，避免把带 noindex 标记的页面继续放入 sitemap，并增加构建期检查，减少搜索引擎将页面标记为排除的情况。',
        commits: ['d43e042'],
      },
      {
        type: '调整',
        title: '统一首页展示的 API Base URL',
        detail: '普通文本、Claude、音频等标准 API 文档统一使用 https://api.gpt88.cc；图片和视频直连使用 https://img.gpt88.cc。/v1 与 /v1beta 仅作为 endpoint 路径保留，模型详情、SDK、集成教程和中英文示例同步更新。',
        commits: ['fe52aee', '4c92fed'],
      },
      {
        type: '优化',
        title: '补充倍率计费与充值说明',
        detail: '在认证与计费、FAQ、AI 中转站和英文文档中明确实际扣费公式：官方用量（美元）× 分组倍率；补充倍率 2.0、0.5 示例、分组选择位置、充值 1:1 说明，并链接大模型广场和官网定价页面。',
        commits: ['4c92fed'],
      },
      {
        type: '新增',
        title: '完善 Grok 视频 API 文档',
        detail: '新增模型查询、视频任务创建、参考图、多图输入、异步状态轮询和错误处理示例，视频请求统一使用图片与多媒体直连地址。',
        commits: ['3569acb', 'fe52aee'],
      },
    ],
  },
  {
    date: '2026-07-10',
    summary: '核心 API 网关完成一轮模型兼容、计费准确性、图片生成和运行稳定性更新，重点提升 Codex、GPT-5.6、Grok 及 Anthropic 请求的可用性。',
    items: [
      {
        type: '新增',
        title: '支持 OpenAI 用户级 Fast / Flex 策略',
        detail: '增加用户级 Fast / Flex 策略配置和强制优先策略动作，便于需要更快响应或更高吞吐的工作流按用户维度进行调度。',
        commits: ['f2966530c', 'e979990bf'],
      },
      {
        type: '优化',
        title: 'GPT-5.6 用量与缓存计费对齐',
        detail: '按官方计费口径完善 GPT-5.6 的输入、输出和缓存写入用量处理，保留明确的缓存价格配置，减少请求用量与账户扣费之间的偏差。',
        commits: ['4a2b10c94', '383f61d0e', '062af81fb', 'de28eba3c'],
      },
      {
        type: '修复',
        title: 'Codex 身份和客户端兼容性修复',
        detail: '优化 Codex 上游身份标识与最终 User-Agent 的匹配，升级兼容客户端版本，并修复特定 GPT-5.6 模型返回 404 的问题。',
        commits: ['8a51119e3', '657c4f97d'],
      },
      {
        type: '新增',
        title: '补齐 Codex 模型清单与工具调用兼容',
        detail: '支持 Codex 客户端模型清单透传，并增加 parallel_tool_calls 等兼容映射，减少客户端模型选择和工具调用参数不一致导致的失败。',
        commits: ['13e773ef5', 'ad8afc8a2'],
      },
      {
        type: '修复',
        title: 'Anthropic 缓存用量字段补齐',
        detail: '完善 Responses 与 Anthropic 协议互转时的 cache_creation_input_tokens 字段，流式和非流式请求都能更完整地保留缓存创建用量。',
        commits: ['83f169e4f', '0d28f7f90'],
      },
      {
        type: '新增',
        title: 'Grok 4.5 与多媒体能力更新',
        detail: '接入官方 Grok 4.5 支持，优化 Grok OAuth、图片和用量流程，并完善视频按秒计费、图片与视频分开定价以及文本视频请求路由。',
        commits: ['cccba9a82', 'b480545c1', 'd4952154f', '4d702e323', '3b2099350'],
      },
      {
        type: '优化',
        title: '图片生成尺寸与 Codex 生图请求处理',
        detail: '修复图片生成尺寸处理和工作台任务 worker 配置，识别并清理 Codex image_gen 命名空间声明，降低错误路由和参数不兼容问题。',
        commits: ['6440ce69e', 'd3a1835ed', 'a02700c16'],
      },
      {
        type: '修复',
        title: '流式响应错误和故障转移统一',
        detail: '改进 OpenAI 与 Anthropic 兼容入口的 response.failed、SSE 传输错误和回退链路处理，避免所有上游错误都被笼统转换为 502。',
        commits: ['8f97953e5', '1da3501af', '104fd2b6e', '7468427e4'],
      },
      {
        type: '修复',
        title: '压缩、心跳与连接稳定性加固',
        detail: '修复 Responses 压缩事件、SSE 心跳、流式输出合成和 Windows WebSocket 重置相关问题，提升长连接与长任务的稳定性。',
        commits: ['000f6dc65', 'ae9a01d85', '2cffe1cf5', '0a5f34a2e'],
      },
      {
        type: '修复',
        title: '并发计费和支付恢复加固',
        detail: '加强并发计费、支付恢复和过期锁处理，降低高并发场景下重复扣费、状态卡住或恢复不完整的风险。',
        commits: ['fc66a30ff', '5c15d32ff'],
      },
      {
        type: '新增',
        title: '后台用量与渠道管理增强',
        detail: '用量页面新增延迟健康列和用户 Token 排行，支持查看分组已用额度、API Key 最近使用 IP，以及创建或修改用户角色。',
        commits: ['1a3cc2a78', 'b062b3664', '54859022a', 'e0d149d51', '64fdc11ec'],
      },
      {
        type: '修复',
        title: '安全、国际化和依赖更新',
        detail: '补齐英文后台语言包，统一站点名称和文档地址的安全处理，升级 Go 工具链与 AWS SDK，并修复鉴权、支付和会话相关缺陷。',
        commits: ['e984b4e2e', 'bfb827b87', '29a5fcd25', '4a3049762', 'a4f942d8a'],
      },
    ],
  },
  {
    date: '2026-07-11',
    summary: '多语言文档、英文模型导航和搜索体验完成一轮发布级优化，同时降低首屏加载体积并补齐英文 SEO 页面资产。',
    items: [
      {
        type: '新增',
        title: '英文文档镜像正式完善',
        detail: '为快速开始、鉴权、常见问题、API 参考、SDK、主流客户端集成和重点教程补充英文页面，中文页面地址保持不变，英文内容统一通过 /en/ 路径访问。',
      },
      {
        type: '优化',
        title: '英文模型详情页补齐接口说明',
        detail: '英文模型页补充请求地址、协议提示、请求字段、响应字段、错误排查和代码示例，避免英文用户进入模型详情页后仍看到中文接口说明。',
      },
      {
        type: '优化',
        title: '多语言搜索结果统一',
        detail: '英文站内搜索不再混入中文摘要；导航标题、摘要、复制按钮、表格字段、分页标签、社区入口和页面辅助文本会根据当前语言显示。',
      },
      {
        type: '优化',
        title: '英文页面 SEO / GEO 资产扩展',
        detail: '英文重点文档和模型详情页纳入 sitemap、llms.txt、llms-full.txt 及预渲染路由，帮助搜索引擎和 AI 检索系统发现可索引的英文内容。',
      },
      {
        type: '优化',
        title: '文档首屏加载性能优化',
        detail: '对模型、教程和集成页面启用按路由加载，并拆分路由、图标、界面组件和第三方依赖包，减少首页初始 JavaScript 体积，加快首次打开速度。',
      },
      {
        type: '修复',
        title: '英文页面默认 SEO 文案修复',
        detail: '修复英文页面继承中文站点名称、描述和 noindex 状态的问题，让英文页面拥有独立的标题、描述和可索引状态。',
      },
    ],
  },
  {
    date: '2026-06-29',
    summary: '图片工作台构图继续收紧，NOWPayments 最小充值金额与后台配置完成同步。',
    items: [
      {
        type: '修复',
        title: '图片工作台构图收紧',
        detail: '进一步收紧图片工作台的安全构图逻辑，减少主体过大、边缘裁切、提示词安全框被弱化等问题，提升批量生图稳定性。',
        commits: ['8a6be308f'],
      },
      {
        type: '修复',
        title: 'NOWPayments 最小金额同步',
        detail: '同步 NOWPayments 最小充值金额配置，让后台支付渠道限制、前端提示和实际下单校验保持一致。',
        commits: ['421837255'],
      },
    ],
  },
  {
    date: '2026-06-28',
    summary: '新增 NOWPayments 加密支付能力，并优化模型广场、首页价格文案和图片工作台安全画幅。',
    items: [
      {
        type: '新增',
        title: 'NOWPayments 加密支付渠道',
        detail: '新增 NOWPayments 加密支付提供方，支持后台配置支付渠道、用户侧加密货币充值和支付回调处理。',
        commits: ['5ad7856c4'],
      },
      {
        type: '修复',
        title: 'NOWPayments 加密支付可用性恢复',
        detail: '修复 NOWPayments 在加密支付链路中的可用性问题，保证用户可以正常进入加密充值流程。',
        commits: ['2273ed4ce'],
      },
      {
        type: '修复',
        title: '加密充值汇率换算',
        detail: '修复加密充值时 USD/CNY 汇率应用逻辑，减少充值金额和到账金额口径不一致的问题。',
        commits: ['538dd0066'],
      },
      {
        type: '修复',
        title: 'NOWPayments 结账体验优化',
        detail: '优化 NOWPayments 加密支付结账流程，减少用户在选择币种、确认金额和跳转支付时的困惑。',
        commits: ['7919953bc'],
      },
      {
        type: '修复',
        title: '加密支付方式选择保持',
        detail: '修复编辑支付配置时加密支付方式选择被丢失的问题，避免管理员保存后配置回退。',
        commits: ['735d4a8f3'],
      },
      {
        type: '修复',
        title: '支付渠道限额保持',
        detail: '修复编辑支付渠道时 provider 支付限额被覆盖的问题，保持后台配置和支付渠道真实限制一致。',
        commits: ['626bd3c98'],
      },
      {
        type: '修复',
        title: 'NOWPayments 最小金额错误提示',
        detail: '优化 NOWPayments 最小金额不足时的错误提示，让用户知道需要提高充值金额，而不是只看到模糊失败。',
        commits: ['054309b46'],
      },
      {
        type: '修复',
        title: 'NOWPayments 不再要求手动地址',
        detail: '修复 NOWPayments 支付流程中错误要求手动填写加密地址的问题，减少用户操作步骤。',
        commits: ['cc31ee15e'],
      },
      {
        type: '调整',
        title: '默认关闭手动加密对账',
        detail: '默认禁用手动加密支付对账，并在自动支付渠道中跳过 NOWPayments 手动对账流程，降低误处理风险。',
        commits: ['94e557c01', '8e2363d56'],
      },
      {
        type: '优化',
        title: '模型广场移动端布局优化',
        detail: '优化模型广场在移动端的卡片、间距和列表展示，让手机用户更容易浏览模型。',
        commits: ['fc3c95c20'],
      },
      {
        type: '优化',
        title: '首页价格促销文案更新',
        detail: '调整首页价格与促销表达，让用户更容易理解当前套餐、优惠和入口信息。',
        commits: ['1635a31fb'],
      },
      {
        type: '优化',
        title: '首页与模型广场 UI 打磨',
        detail: '优化首页和模型广场的展示细节，提高模型浏览、筛选和落地页转化体验。',
        commits: ['d59e9f933'],
      },
      {
        type: '修复',
        title: '模型广场公共分组兜底',
        detail: '当模型广场缺少专属分组数据时，自动回退到公共分组，减少空白或加载失败情况。',
        commits: ['4fe459d49'],
      },
      {
        type: '修复',
        title: '图片工作台输出安全框',
        detail: '为图片工作台结果增加安全画幅处理，降低人物、商品、文字和关键边缘被裁切的概率。',
        commits: ['da862a254'],
      },
    ],
  },
  {
    date: '2026-06-27',
    summary: '图片工作台围绕安全构图、输出适配和首页 CTA 做了一轮集中修复。',
    items: [
      {
        type: '调整',
        title: '移除首页社区入口 CTA',
        detail: '减少首页干扰项，让用户更聚焦核心产品入口和主要转化路径。',
        commits: ['de21c66a4'],
      },
      {
        type: '修复',
        title: '图片工作台安全框提示词强化',
        detail: '在图片生成提示词中强化安全留白和主体完整性约束，提升批量出图的一致性。',
        commits: ['981c0f08f'],
      },
      {
        type: '修复',
        title: '图片工作台适配裁剪优化',
        detail: '改进图片工作台的输出适配策略，减少不同尺寸、不同平台预览时的裁剪问题。',
        commits: ['bbe8f81a0'],
      },
    ],
  },
  {
    date: '2026-06-22',
    summary: '新增 OpenAI 图片异步任务配置，并同步 infinite canvas 指针。',
    items: [
      {
        type: '新增',
        title: '可配置 OpenAI 图片异步任务',
        detail: '新增 OpenAI 图片异步任务配置能力，为长耗时图片生成、任务状态追踪和后台处理提供基础。',
        commits: ['619f3376c'],
      },
      {
        type: '调整',
        title: 'infinite canvas 指针更新',
        detail: '同步 infinite canvas 子项目指针，保持画布相关能力与主项目集成一致。',
        commits: ['b8c9de7b0'],
      },
      {
        type: '调整',
        title: '提交剩余工作区变更',
        detail: '整理并提交阶段性工作区变更，便于后续发布和回滚追踪。',
        commits: ['ba27655c2'],
      },
    ],
  },
  {
    date: '2026-06-20',
    summary: '图片工作台返回结果 URL 和 Responses 生成链路完成多次修复。',
    items: [
      {
        type: '修复',
        title: '图片工作台结果 URL 修复',
        detail: '修复图片生成结果 URL 返回问题，提升前端展示、下载和后续复用的稳定性。',
        commits: ['11b545e7c'],
      },
      {
        type: '修复',
        title: '返回图片工作台 S3 结果 URL',
        detail: '让图片工作台结果返回 S3 可访问地址，方便用户查看、保存和对接后续流程。',
        commits: ['7f6c59ba9'],
      },
      {
        type: '调整',
        title: '移除 Commerce Studio Responses 选项',
        detail: '收敛 Commerce Studio 的生成路径，减少不必要选项带来的误用和不一致。',
        commits: ['b1cbfccb0'],
      },
    ],
  },
  {
    date: '2026-06-19',
    summary: '图片工作台 Responses 生成链路修复。',
    items: [
      {
        type: '修复',
        title: '图片工作台 Responses 生成修复',
        detail: '修复图片工作台在 Responses 生成链路中的异常，提升特定图片模型调用稳定性。',
        commits: ['4a8aa3e62'],
      },
    ],
  },
  {
    date: '2026-06-18',
    summary: '批量图片任务、默认 API 端点和首页案例路由修复。',
    items: [
      {
        type: '修复',
        title: '批量图片任务单个失败不再中断全批次',
        detail: '批量生图时单个任务失败后继续处理剩余任务，降低大批量生产的失败成本。',
        commits: ['ca03e1ce7'],
      },
      {
        type: '新增',
        title: '隐藏默认 API 端点设置',
        detail: '新增隐藏默认 API 端点配置能力，便于部署方在不同环境中统一默认请求入口。',
        commits: ['4ae25720e'],
      },
      {
        type: '修复',
        title: '首页案例路由到 xsct 工作台',
        detail: '修复首页案例跳转目标，让案例入口正确进入对应工作台页面。',
        commits: ['6a8c4135b'],
      },
    ],
  },
  {
    date: '2026-06-17',
    summary: '图片尺寸、默认渠道 Key、案例库和计费边界完成集中更新。',
    items: [
      {
        type: '新增',
        title: '绘图尺寸对齐控制',
        detail: '新增绘图尺寸对齐能力，让图片生成结果更接近目标比例和目标输出尺寸。',
        commits: ['8c6ac0193'],
      },
      {
        type: '修复',
        title: '优先使用原生目标图片尺寸',
        detail: '图片生成时优先使用模型或平台支持的原生目标尺寸，减少后期缩放和裁剪带来的质量损失。',
        commits: ['3aeb304a4'],
      },
      {
        type: '新增',
        title: '图片工作台默认渠道 Key 配置',
        detail: '支持配置图片工作台默认渠道 Key，降低用户首次使用和管理员配置成本。',
        commits: ['e0c1f0314'],
      },
      {
        type: '新增',
        title: 'GPT 图片案例库扩充',
        detail: '新增 awesome gpt image cases 与 aiistudio prompt cases，为用户提供更多可复用图片生成案例。',
        commits: ['0e417d345', 'f588daeb4'],
      },
      {
        type: '修复',
        title: '图片聊天 Token 计费下限',
        detail: '修复图片聊天计费边界，避免零用量或异常用量造成计费口径不一致。',
        commits: ['a70d0afd5'],
      },
    ],
  },
  {
    date: '2026-06-16',
    summary: '图片模型接入聊天端点和计费口径完成多项修复。',
    items: [
      {
        type: '修复',
        title: '下拉选项展示分组倍率',
        detail: '在模型或分组下拉选项中展示分组倍率，帮助用户更清楚地理解调用成本。',
        commits: ['bbb8f6fcd'],
      },
      {
        type: '修复',
        title: '零用量图片聊天按图片计费',
        detail: '图片聊天即使返回零 token 用量，也按图片任务计费口径处理，避免漏计。',
        commits: ['71bd548db'],
      },
      {
        type: '修复',
        title: '允许图片模型进入聊天计费链路',
        detail: '修复图片模型在聊天兼容入口中的计费识别，让多模态调用保持统一账单口径。',
        commits: ['b439e00fc'],
      },
      {
        type: '修复',
        title: '阻止图片模型误走聊天端点',
        detail: '对不应进入聊天端点的图片模型进行拦截，减少错误调用和异常计费。',
        commits: ['46e44605d'],
      },
      {
        type: '调整',
        title: '记录图片用量结构',
        detail: '增加图片用量结构日志，便于排查计费、统计和模型返回差异。',
        commits: ['b86cf4896'],
      },
    ],
  },
]

function typeClass(type: ChangeItem['type']): string {
  switch (type) {
    case '新增':
      return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
    case '优化':
      return 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'
    case '修复':
      return 'border-amber-400/30 bg-amber-400/10 text-amber-200'
    case '调整':
    default:
      return 'border-violet-400/30 bg-violet-400/10 text-violet-200'
  }
}

function ChangelogItem({ item }: { item: ChangeItem }) {
  return (
    <li className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${typeClass(item.type)}`}>
          {item.type}
        </span>
        <h3 className="m-0 text-base font-semibold text-ink-50">{item.title}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-300">{item.detail}</p>
      {item.commits?.length ? (
        <p className="mt-2 text-xs text-ink-500">
          commits:{' '}
          {item.commits.map((commit, index) => (
            <span key={commit}>
              <code>{commit}</code>
              {index < item.commits!.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </p>
      ) : null}
    </li>
  )
}

export default function ChangelogPage() {
  return (
    <DocPage
      path="/docs/changelog"
      title="GPT88 更新日志"
      description="持续记录 GPT88 的产品更新、重要修复、图片工作台、模型广场、计费、部署和 API 行为变化。"
      headings={[
        { id: 'source', text: '更新来源', level: 2 },
        { id: 'latest', text: '最新更新', level: 2 },
        { id: 'history', text: '历史记录', level: 2 },
        { id: 'maintain', text: '维护规则', level: 2 },
      ]}
    >
      <Callout tone="info" title="页面用途">
        <p>
          这个页面用于持续记录 GPT88 的对外可感知更新。
          以后每次完成一组功能或发布前，都可以把 Git 提交整理成用户能看懂的 changelog 条目。
        </p>
      </Callout>

      <h2 id="source">更新来源</h2>
      <CodeBlock lang="text" filename="gpt88-changelog-source" code={UPDATE_SOURCE} />

      <h2 id="latest">最新更新</h2>
      <div className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.025] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
          {CHANGELOG[0].date}
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-300">{CHANGELOG[0].summary}</p>
        <ul className="mt-4 grid gap-3">
          {CHANGELOG[0].items.map(item => (
            <ChangelogItem key={item.title} item={item} />
          ))}
        </ul>
      </div>

      <h2 id="history">历史记录</h2>
      <div className="not-prose grid gap-5">
        {CHANGELOG.slice(1).map(group => (
          <section key={group.date} className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              {group.date}
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-300">{group.summary}</p>
            <ul className="mt-4 grid gap-3">
              {group.items.map(item => (
                <ChangelogItem key={item.title} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2 id="maintain">维护规则</h2>
      <ul>
        <li>新增功能、重要修复、计费变化、模型变化、支付变化、部署变化必须记录。</li>
        <li>纯内部重构、临时提交、无用户影响的格式化变更可以不写。</li>
        <li>每条更新都要用用户能理解的语言说明影响，不只贴 commit message。</li>
        <li>如果更新对应文档教程或 API 页面，后续可以在 changelog 条目里补链接。</li>
      </ul>
    </DocPage>
  )
}
