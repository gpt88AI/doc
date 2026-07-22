/**
 * 文档站全局导航结构
 *
 * 为什么集中放在这里：
 * - 顶部导航 / 侧边导航 / 移动端抽屉 共用同一份数据，避免漂移
 * - 后续加新页面时只需在这里追加一项
 *
 * path 必须以 `/` 起头，section 决定该路径在侧边栏所属分组。
 */

export type NavLeaf = {
  title: string
  path: string
  /** 短描述，用于卡片或预览悬浮 */
  blurb?: string
  /** 标记尚未完成（M3 任务）页面，避免视觉上看起来死链 */
  upcoming?: boolean
}

export type NavSection = {
  /** 分组标题，深色文档侧栏小标题 */
  title: string
  items: NavLeaf[]
}

/** 顶部主导航：聚焦核心入口，避免过载 */
export type TopNavItem = {
  title: string
  /** 优先匹配 `/docs` 等前缀 */
  match: string
  href: string
}

export const TOP_NAV: TopNavItem[] = [
  { title: '文档', match: '/docs', href: '/docs/overview/' },
  { title: '快速开始', match: '/docs/quickstart', href: '/docs/quickstart/' },
  {
    title: 'API Reference',
    match: '/docs/api',
    href: '/docs/api/chat-completions/',
  },
  { title: '模型导航', match: '/models', href: '/models/' },
]

export const DOCS_NAV: NavSection[] = [
  {
    title: '入门',
    items: [
      {
        title: '产品概览',
        path: '/docs/overview/',
        blurb: 'gpt88.cc 是什么，能解决什么问题',
      },
      {
        title: '快速开始',
        path: '/docs/quickstart/',
        blurb: '5 分钟内完成第一次模型调用',
      },
      {
        title: '认证与计费',
        path: '/docs/auth/',
        blurb: 'API Key、用量与配额（数值由控制台动态下发）',
      },
      {
        title: '更新日志',
        path: '/docs/changelog/',
        blurb: '持续记录 GPT88 的产品更新、重要修复、图片工作台、模型广场、计费和部署变化',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'POST /v1/chat/completions',
        path: '/docs/api/chat-completions/',
        blurb: '对话补全主接口',
      },
      {
        title: 'Google 图片生成',
        path: '/docs/api/images/',
        blurb: 'Google / Gemini 图片生成接口，支持 NanoBanana2 文生图与图生图',
      },
      {
        title: 'Grok 视频 API',
        path: '/docs/api/grok-video/',
        blurb: 'Grok 视频生成接口、任务轮询、图生视频参数与错误排查',
      },
      {
        title: 'GET /v1/models',
        path: '/docs/api/list-models/',
        blurb: '列出可用模型',
      },
      {
        title: '错误码',
        path: '/docs/api/errors/',
        blurb: 'HTTP / 业务错误码对照表',
      },
    ],
  },
  {
    title: 'SDK 与集成',
    items: [
      { title: 'cURL', path: '/docs/sdk/curl/' },
      { title: 'Python', path: '/docs/sdk/python/' },
      { title: 'Node.js', path: '/docs/sdk/nodejs/' },
    ],
  },
  {
    title: '集成指南',
    items: [
      {
        title: '集成总览',
        path: '/docs/integrations/',
        blurb: '按聊天应用、开发工具、应用平台分类浏览所有集成教程',
      },
      {
        title: 'ChatBox',
        path: '/docs/integrations/chat/chatbox/',
        blurb: 'ChatBox 的 OpenAI 兼容接入与模型选择',
      },
      {
        title: 'Cherry Studio',
        path: '/docs/integrations/chat/cherry-studio/',
        blurb: 'Cherry Studio 的多模型与提示词工作流配置',
      },
      {
        title: 'AnythingLLM',
        path: '/docs/integrations/chat/anythingllm/',
        blurb: 'AnythingLLM 的知识库与聊天接入教程',
      },
      {
        title: 'Claude Code',
        path: '/docs/integrations/dev/claude-code/',
        blurb: 'Claude Code 的 OAuth、API Key 和路由接法',
      },
      {
        title: 'Cursor',
        path: '/docs/integrations/dev/cursor/',
        blurb: 'Cursor 编辑器里的模型接入指南',
      },
      {
        title: 'Cline',
        path: '/docs/integrations/dev/cline/',
        blurb: 'Cline 的 Agent 接入与模型切换',
      },
      {
        title: 'Gemini CLI',
        path: '/docs/integrations/dev/gemini-cli/',
        blurb: 'Gemini CLI 与 Google 图片模型接法',
      },
      {
        title: 'Codex CLI',
        path: '/docs/integrations/dev/codex-cli/',
        blurb: 'Codex CLI 通过 gpt88.cc 调模型的完整流程',
      },
      {
        title: 'CC-Switch',
        path: '/docs/integrations/dev/cc-switch/',
        blurb: '中转站路由与 OAuth 切换说明',
      },
      {
        title: 'Dify',
        path: '/docs/integrations/platforms/dify/',
        blurb: '把 gpt88.cc 接入 Dify 应用和工作流',
      },
      {
        title: '沉浸式翻译',
        path: '/docs/integrations/platforms/immersive-translate/',
        blurb: '浏览器翻译扩展接入 gpt88.cc',
      },
    ],
  },
  {
    // 指南：偏"任务式"内容，把 API Key + 模型 + 线路打包给具体工具的实操教程。
    // 当前只有"配置文件导出"一篇，未来可以追加更多 how-to。
    // TOP_NAV 暂不增加"指南"项以免顶部导航过载，依赖侧边栏即可。
    title: '指南',
    items: [
      {
        title: '配置文件导出',
        path: '/docs/guides/config-export/',
        blurb: '把 API Key + 模型 + 线路打包给 Claude Code / Cursor / Python SDK 等工具',
      },
      {
        title: 'gpt88 AI 中转站',
        path: '/docs/guides/gpt88-ai-proxy/',
        blurb: '面向搜索和 AI 引擎的 gpt88 AI 中转站介绍、接入方式、Base URL 与常见问题',
      },
      {
        title: 'gpt88 产品与文档地图',
        path: '/docs/guides/gpt88-docs-map/',
        blurb: '把主站、图片工作台、文档站、图片加速域名和主要教程分类整理成一张完整地图',
      },
      {
        title: '迁移新站新手教程',
        path: '/docs/guides/gpt88-migration/',
        blurb: '从旧站迁移到 agent.gpt88.cc，完成注册、登录和入口核对',
      },
      {
        title: '通用教程',
        path: '/docs/guides/gpt88-tutorial/',
        blurb: 'Claude 与 OpenAI 通用接入、模型选择、线路选择、工具接入',
      },
      {
        title: 'Kimi K3 实战评测',
        path: '/docs/guides/kimi-k3-review/',
        blurb: '整理公开基准、7 个真实项目、编程能力、稳定性和成本观察',
      },
      {
        title: '完整接入手册',
        path: '/docs/guides/complete-integration/',
        blurb: '从 API Key、Base URL、客户端配置到用量核对和错误排查的端到端教程',
      },
      {
        title: 'WorkRally Skills 总览',
        path: '/docs/guides/workrally-overview/',
        blurb: '基于 Tencent/workrally 官方 Skill 与 references 整理的总览页，覆盖安装、能力边界和阅读路线',
      },
      {
        title: 'WorkRally AI 生成指南',
        path: '/docs/guides/workrally-ai-generation/',
        blurb: '图片生成、视频生成、三种视频驱动模式、模型动态获取和任务轮询',
      },
      {
        title: 'WorkRally 无限画布指南',
        path: '/docs/guides/workrally-canvas-guide/',
        blurb: '8 种节点类型、画板规则、build-draft 增量合并与全量覆盖',
      },
      {
        title: 'WorkRally 上传与素材管理',
        path: '/docs/guides/workrally-upload-assets/',
        blurb: 'upload、asset、material 三层素材体系与标准三步流程',
      },
      {
        title: 'WorkRally 场次与剧集工作流',
        path: '/docs/guides/workrally-shot-workflow/',
        blurb: 'project、series、shot、角色识别、模型配置、批量生成和结果查询',
      },
      {
        title: 'WorkRally 常见坑点与错误排查',
        path: '/docs/guides/workrally-common-pitfalls/',
        blurb: '10 类高频错误与排查顺序，重点解决项目 / 画布、上传、URL、模型和节点结构问题',
      },
      {
        title: 'Agent 图片工作台',
        path: '/docs/guides/agent-image-studio/',
        blurb: '使用 agent.gpt88.cc 生成电商主图、场景图、模特图、详情页素材和批量图片',
      },
      {
        title: '电商工具专题教程',
        path: '/docs/guides/ecommerce-tools-special/',
        blurb: '一套更详细的电商工具实操教程，覆盖入门、提示词、图生图、模板、工具箱、批量工作流和交付检查',
      },
      {
        title: 'GPT-Image-2 生图服务通知',
        path: '/docs/guides/gpt-image-2-service-notice/',
        blurb: 'agent.gpt88.cc 图片工作台、统一图片 API、原生 4K 与超分 4K 区别、价格口径和客户场景选型建议',
      },
      {
        title: '生图质量与裁剪避坑',
        path: '/docs/guides/agent-image-quality-crop-guide/',
        blurb: '分析 agent.gpt88.cc 生图被裁剪、质量下降、多视图角色设定图失败的原因，并给出修复方案',
      },
      {
        title: 'Codex 插件 OAuth 登录',
        path: '/docs/guides/codex-plugins-oauth/',
        blurb: '使用 gpt88.cc API Key 后插件不可用时，切回 ChatGPT OAuth 的完整教程',
      },
      {
        title: 'ChatGPT 手机号二次验证',
        path: '/docs/guides/codex-chatgpt-phone-verification/',
        blurb: 'ChatGPT / Codex OAuth 登录要求手机号二次验证时，用高级账号安全与通行密钥降低短信依赖',
      },
      {
        title: 'ECC Agent 工作流',
        path: '/docs/guides/ecc-agent-harness/',
        blurb: '使用 affaan-m/ECC 为 Claude Code、Codex、Cursor 等工具配置可复用 Agent 工作流',
      },
      {
        title: 'Codex gpt-image-2 Skill',
        path: '/docs/guides/codex-gpt-image-2-skill/',
        blurb: '用 Codex skill 调用 gpt88.cc 的 gpt-image-2 生成真实图片文件',
      },
      {
        title: 'Codex 前端设计 Skill',
        path: '/docs/guides/codex-frontend-taste-skill/',
        blurb: '使用 Taste Skill 为 Codex 增强前端设计判断力，避免 AI 模板感',
      },
      {
        title: 'Codex + GPT-5.5 总览',
        path: '/docs/guides/codex-gpt55-system-overview/',
        blurb: '从公开视频还原一套把 Codex 从聊天窗口升级为稳定交付系统的方法',
      },
      {
        title: 'Codex Skills 与上下文工程',
        path: '/docs/guides/codex-skills-context-engineering/',
        blurb: '拆解 skills、上下文、权限、边界和 worklog 如何让 Codex 变得更稳定',
      },
      {
        title: 'Codex 插件与研究工作流',
        path: '/docs/guides/codex-plugins-research-workflow/',
        blurb: '研究型任务、插件扩展、结构化报告和结果回流的详细教程',
      },
      {
        title: 'Codex 并行与自动化',
        path: '/docs/guides/codex-parallel-automation-workflow/',
        blurb: '如何同时推进多个任务，并通过 worklog 与自动化保持稳定执行',
      },
      {
        title: 'Codex 项目工厂交付系统',
        path: '/docs/guides/codex-project-factory-delivery/',
        blurb: '把 App、网站、视频、Deck 和课程等多种交付物统一纳入一套 Codex 系统',
      },
      {
        title: 'Loop Engineering 与 Harness',
        path: '/docs/guides/loop-engineering-harness/',
        blurb: '结合 Smith 铜匠的文章，解释 Harness 之后为什么要进入 Loop Engineering，以及如何把它落到 Codex 工作流里',
      },
      {
        title: 'Codex 工具恢复',
        path: '/docs/guides/codex-tool-recovery/',
        blurb: 'Codex 执行中工具失效时，先检查文件工具是否可用，恢复后从第一步重新落代码',
      },
      {
        title: 'Windows Codex 524 与 PowerShell 7',
        path: '/docs/guides/codex-windows-powershell7-timeout/',
        blurb: 'Windows 上 Codex 调工具出现 524、中文乱码或流式输出异常时，切换并验证 PowerShell 7',
      },
      {
        title: 'Claude Code 上下文超限恢复',
        path: '/docs/guides/claude-code-compaction-error/',
        blurb: '解决 /compact 报 400 上下文超限：从历史会话较早位置 Fork / Branch 后重新压缩',
      },
      {
        title: '无停服更新技术方案',
        path: '/docs/guides/zero-downtime-release/',
        blurb: '基于蓝绿槽位、健康检查、反向代理切流和快速回滚的生产发布教程',
      },
      {
        title: 'giffgaff SIM 教程',
        path: '/docs/guides/giffgaff-sim-guide/',
        blurb: '英国 giffgaff 实体 SIM 卡激活、保号、查号、换号和 eSIM 转换详细教程',
      },
      {
        title: '美区虚拟卡开卡教程',
        path: '/docs/guides/us-virtual-card-guide/',
        blurb: '自己注册、自助开卡、首充 10U、可绑定支付宝消费，适合 AI 平台和海外订阅的长期虚拟卡教程',
      },
      {
        title: 'AI 视频分镜教程',
        path: '/docs/guides/ai-video-storyboard-guide/',
        blurb: '把分镜脚本、人物设定、场景氛围和情绪节奏整理成可直接用于 AI 视频生成的工作流',
      },
      {
        title: '6 个视频创作工具',
        path: '/docs/guides/video-creator-tools-workflow/',
        blurb: '整理 Excalidraw、Screen Studio、Rotato、Jacky Illustration、Jacky Motion、MD Publish 的定位和组合工作流',
      },
      {
        title: 'video-generation-skills 总览',
        path: '/docs/guides/video-generation-skills-overview/',
        blurb: '讲清 adoin/video-generation-skills 的 4 个 skill 模块、适用场景、组合方式和仓库结构',
      },
      {
        title: 'video-generation-skills 安装',
        path: '/docs/guides/video-generation-skills-install/',
        blurb: '把 video-generation-skills 安装到 Cursor、Claude Code、Codex 等 Agent 的详细步骤',
      },
      {
        title: 'prompt-director 教程',
        path: '/docs/guides/video-generation-skills-prompt-director/',
        blurb: '把小说、剧本、情节和创意 brief 转成分镜草案与 AI 图像 / 视频 Prompt 的方法论',
      },
      {
        title: 'ecommerce 教程',
        path: '/docs/guides/video-generation-skills-ecommerce/',
        blurb: '电商主图、详情页、UGC、种草视频和多品类素材工作流详解',
      },
      {
        title: 'brand-ad-cg 教程',
        path: '/docs/guides/video-generation-skills-brand-ad-cg/',
        blurb: '品牌广告、TVC、产品 CG、大牌质感和风格化商业视觉工作流',
      },
      {
        title: 'ai-video-director 教程',
        path: '/docs/guides/video-generation-skills-ai-video-director/',
        blurb: '短剧、漫剧、故事板、分镜、一致性和复杂动作视频制片工作流',
      },
      {
        title: '图生视频提示词专题',
        path: '/docs/guides/video-generation-skills-i2v-prompt/',
        blurb: '图生视频提示词怎么写，如何避免动作混乱、运镜冲突和重复写风格词',
      },
      {
        title: '电商白底图裂变',
        path: '/docs/guides/video-generation-skills-white-background-scaling/',
        blurb: '把白底产品图扩成主图、场景图、详情页、广告图和短视频首帧',
      },
      {
        title: '产品 CG 工作流',
        path: '/docs/guides/video-generation-skills-product-cg/',
        blurb: '产品关键帧、材质特写、动态镜头和商业级产品视觉制作方法',
      },
      {
        title: 'TVC 广告片专题',
        path: '/docs/guides/video-generation-skills-tvc-playbook/',
        blurb: '15 到 30 秒 TVC 的脚本、分镜、关键帧和单镜头视频工作流',
      },
      {
        title: '场景一致性专题',
        path: '/docs/guides/video-generation-skills-scene-consistency/',
        blurb: '九宫格、俯视图、环绕截图和全景图如何解决场景穿帮',
      },
      {
        title: '复杂动作与分镜',
        path: '/docs/guides/video-generation-skills-complex-action-storyboard/',
        blurb: '12 宫格分镜法、参考视频替换法和复杂动作镜头的拆解方法',
      },
    ],
  },
  {
    title: '资源',
    items: [
      {
        title: '模型导航',
        path: '/models/',
        blurb: '按 Chat / Image / Video / Audio 浏览',
      },
      {
        title: 'FAQ',
        path: '/docs/faq/',
      },
    ],
  },
]

/** 扁平化所有 docs 路径，便于 prev/next 导航 */
export const DOCS_FLAT: NavLeaf[] = DOCS_NAV.flatMap(s => s.items)

const TOP_NAV_EN_BY_HREF: Record<string, string> = {
  '/docs/overview/': 'Docs',
  '/docs/quickstart/': 'Quickstart',
  '/docs/api/chat-completions/': 'API Reference',
  '/models/': 'Models',
}

const SECTION_TITLE_EN_BY_ZH: Record<string, string> = {
  入门: 'Getting Started',
  'SDK 与集成': 'SDK & Integrations',
  '集成指南': 'Integration Guides',
  指南: 'Guides',
  资源: 'Resources',
}

const NAV_TITLE_EN_BY_PATH: Record<string, string> = {
  '/docs/overview/': 'Overview',
  '/docs/quickstart/': 'Quickstart',
  '/docs/auth/': 'Auth & Billing',
  '/docs/changelog/': 'Changelog',
  '/docs/api/chat-completions/': 'POST /v1/chat/completions',
  '/docs/api/images/': 'Google Image Generation',
  '/docs/api/list-models/': 'GET /v1/models',
  '/docs/api/errors/': 'Error Codes',
  '/docs/sdk/curl/': 'cURL',
  '/docs/sdk/python/': 'Python',
  '/docs/sdk/nodejs/': 'Node.js',
  '/docs/integrations/': 'Integrations Hub',
  '/docs/integrations/chat/chatbox/': 'ChatBox',
  '/docs/integrations/chat/cherry-studio/': 'Cherry Studio',
  '/docs/integrations/chat/anythingllm/': 'AnythingLLM',
  '/docs/integrations/dev/claude-code/': 'Claude Code',
  '/docs/integrations/dev/cursor/': 'Cursor',
  '/docs/integrations/dev/cline/': 'Cline',
  '/docs/integrations/dev/gemini-cli/': 'Gemini CLI',
  '/docs/integrations/dev/codex-cli/': 'Codex CLI',
  '/docs/integrations/dev/cc-switch/': 'CC-Switch',
  '/docs/integrations/platforms/dify/': 'Dify',
  '/docs/integrations/platforms/immersive-translate/': 'Immersive Translate',
  '/docs/guides/config-export/': 'Config Export',
  '/docs/guides/gpt88-ai-proxy/': 'gpt88 AI Gateway',
  '/docs/guides/gpt88-docs-map/': 'gpt88 Docs Map',
  '/docs/guides/gpt88-migration/': 'gpt88 New-Site Migration Guide',
  '/docs/guides/gpt88-tutorial/': 'General Tutorial',
  '/docs/guides/complete-integration/': 'Complete Integration Guide',
  '/docs/guides/workrally-overview/': 'WorkRally Skills Overview',
  '/docs/guides/workrally-ai-generation/': 'WorkRally AI Generation',
  '/docs/guides/workrally-canvas-guide/': 'WorkRally Canvas Guide',
  '/docs/guides/workrally-upload-assets/': 'WorkRally Upload & Assets',
  '/docs/guides/workrally-shot-workflow/': 'WorkRally Shot Workflow',
  '/docs/guides/workrally-common-pitfalls/': 'WorkRally Common Pitfalls',
  '/docs/guides/agent-image-studio/': 'Agent Image Studio',
  '/docs/guides/ecommerce-tools-special/': 'Ecommerce Tools Special',
  '/docs/guides/gpt-image-2-service-notice/': 'GPT-Image-2 Service Notice',
  '/docs/guides/agent-image-quality-crop-guide/': 'Image Quality & Crop Guide',
  '/docs/guides/codex-plugins-oauth/': 'Codex Plugins OAuth Login',
  '/docs/guides/codex-chatgpt-phone-verification/': 'ChatGPT Phone Verification',
  '/docs/guides/ecc-agent-harness/': 'ECC Agent Workflow',
  '/docs/guides/codex-gpt-image-2-skill/': 'Codex GPT-Image-2 Skill',
  '/docs/guides/codex-frontend-taste-skill/': 'Codex Frontend Taste Skill',
  '/docs/guides/codex-gpt55-system-overview/': 'Codex + GPT-5.5 Overview',
  '/docs/guides/codex-skills-context-engineering/': 'Codex Skills & Context Engineering',
  '/docs/guides/codex-plugins-research-workflow/': 'Codex Plugins Research Workflow',
  '/docs/guides/codex-parallel-automation-workflow/': 'Codex Parallel Automation',
  '/docs/guides/codex-project-factory-delivery/': 'Codex Project Factory Delivery',
  '/docs/guides/loop-engineering-harness/': 'Loop Engineering & Harness',
  '/docs/guides/codex-tool-recovery/': 'Codex Tool Recovery',
  '/docs/guides/codex-windows-powershell7-timeout/': 'Windows Codex 524 & PowerShell 7',
  '/docs/guides/claude-code-compaction-error/': 'Claude Code Context Recovery',
  '/docs/guides/zero-downtime-release/': 'Zero-Downtime Release',
  '/docs/guides/giffgaff-sim-guide/': 'giffgaff SIM Guide',
  '/docs/guides/us-virtual-card-guide/': 'US Virtual Card Guide',
  '/docs/guides/ai-video-storyboard-guide/': 'AI Video Storyboard Guide',
  '/docs/guides/video-creator-tools-workflow/': '6 Creator Tools Workflow',
  '/docs/guides/video-generation-skills-overview/': 'video-generation-skills Overview',
  '/docs/guides/video-generation-skills-install/': 'video-generation-skills Install',
  '/docs/guides/video-generation-skills-prompt-director/': 'prompt-director Guide',
  '/docs/guides/video-generation-skills-ecommerce/': 'ecommerce Guide',
  '/docs/guides/video-generation-skills-brand-ad-cg/': 'brand-ad-cg Guide',
  '/docs/guides/video-generation-skills-ai-video-director/': 'ai-video-director Guide',
  '/docs/guides/video-generation-skills-i2v-prompt/': 'I2V Prompt Guide',
  '/docs/guides/video-generation-skills-white-background-scaling/': 'White Background Scaling',
  '/docs/guides/video-generation-skills-product-cg/': 'Product CG Workflow',
  '/docs/guides/video-generation-skills-tvc-playbook/': 'TVC Playbook',
  '/docs/guides/video-generation-skills-scene-consistency/': 'Scene Consistency',
  '/docs/guides/video-generation-skills-complex-action-storyboard/': 'Complex Action Storyboard',
  '/models/': 'Models',
  '/docs/faq/': 'FAQ',
}

const NAV_BLURB_EN_BY_PATH: Record<string, string> = {
  '/docs/overview/': 'What gpt88.cc is and what problems it solves',
  '/docs/quickstart/': 'Make your first model call in under 5 minutes',
  '/docs/auth/': 'API keys, usage, and quota behavior from the console',
  '/docs/changelog/': 'Ongoing product updates, fixes, model changes, billing changes, and image workspace improvements',
  '/docs/api/chat-completions/': 'Primary chat completions endpoint',
  '/docs/api/images/': 'Google / Gemini image generation API for NanoBanana2 text-to-image and image-to-image',
  '/docs/api/list-models/': 'List available models',
  '/docs/api/errors/': 'HTTP and business error code reference',
  '/docs/integrations/': 'Browse all integration guides by chat apps, dev tools, and platforms',
  '/docs/integrations/chat/chatbox/': 'OpenAI-compatible setup and model selection in ChatBox',
  '/docs/integrations/chat/cherry-studio/': 'Multi-model setup and prompt workflow configuration in Cherry Studio',
  '/docs/integrations/chat/anythingllm/': 'Knowledge base and chat integration guide for AnythingLLM',
  '/docs/integrations/dev/claude-code/': 'OAuth, API key, and routing setup for Claude Code',
  '/docs/integrations/dev/cursor/': 'Model integration guide inside Cursor',
  '/docs/integrations/dev/cline/': 'Agent integration and model switching in Cline',
  '/docs/integrations/dev/gemini-cli/': 'Gemini CLI setup with Google image models',
  '/docs/integrations/dev/codex-cli/': 'Complete Codex CLI flow through gpt88.cc',
  '/docs/integrations/dev/cc-switch/': 'Routing and OAuth switching guide for relay setups',
  '/docs/integrations/platforms/dify/': 'Connect gpt88.cc to Dify apps and workflows',
  '/docs/integrations/platforms/immersive-translate/': 'Use gpt88.cc with the browser translation extension',
  '/docs/guides/config-export/': 'Package API keys, models, and routes for Claude Code, Cursor, Python SDK, and similar tools',
  '/docs/guides/gpt88-ai-proxy/': 'Search- and AI-engine-friendly introduction to the gpt88 AI gateway, integration flow, base URLs, and common questions',
  '/docs/guides/gpt88-docs-map/': 'A complete map of the main site, image workspace, docs site, accelerated image domains, and tutorial categories',
  '/docs/guides/gpt88-migration/': 'Beginner guide for moving from the legacy site to agent.gpt88.cc, including registration, login, and entry-point checks',
  '/docs/guides/gpt88-tutorial/': 'General Claude and OpenAI integration, model choice, route choice, and tool setup',
  '/docs/guides/complete-integration/': 'End-to-end guide from API key and base URL setup to usage verification and troubleshooting',
  '/docs/guides/workrally-overview/': 'Overview of Tencent/workrally skills and references, including install flow, capability boundaries, and reading order',
  '/docs/guides/workrally-ai-generation/': 'Image generation, video generation, three video-driving modes, dynamic model lookup, and task polling',
  '/docs/guides/workrally-canvas-guide/': 'Eight node types, board rules, and build-draft merge vs full overwrite behavior',
  '/docs/guides/workrally-upload-assets/': 'Upload, asset, and material layers with the standard three-step asset flow',
  '/docs/guides/workrally-shot-workflow/': 'Projects, series, shots, character recognition, model configuration, batch generation, and result lookup',
  '/docs/guides/workrally-common-pitfalls/': 'Ten common failure patterns and the recommended troubleshooting order for project, canvas, upload, URL, model, and node issues',
  '/docs/guides/agent-image-studio/': 'Use agent.gpt88.cc for ecommerce hero images, scene images, model images, detail-page assets, and batch image generation',
  '/docs/guides/ecommerce-tools-special/': 'Detailed ecommerce tooling tutorials covering onboarding, prompting, image-to-image, templates, toolboxes, batch workflows, and delivery checks',
  '/docs/guides/gpt-image-2-service-notice/': 'agent.gpt88.cc image workspace, the https://img.gpt88.cc image API, native 4K vs upscaled 4K, pricing rules, and customer scenario guidance',
  '/docs/guides/agent-image-quality-crop-guide/': 'Why images get cropped or lose quality in agent.gpt88.cc, and how to fix the workflow',
  '/docs/guides/codex-plugins-oauth/': 'Switch from API key mode back to ChatGPT OAuth when Codex plugins are unavailable',
  '/docs/guides/codex-chatgpt-phone-verification/': 'Reduce SMS dependence during ChatGPT / Codex OAuth verification with stronger account security and passkeys',
  '/docs/guides/ecc-agent-harness/': 'Reusable ECC agent workflow setup for Claude Code, Codex, Cursor, and related tools',
  '/docs/guides/codex-gpt-image-2-skill/': 'Generate real image files with gpt-image-2 through a Codex skill and gpt88.cc',
  '/docs/guides/codex-frontend-taste-skill/': 'Use a taste skill to improve Codex frontend judgment and avoid generic AI layouts',
  '/docs/guides/codex-gpt55-system-overview/': 'Reconstruct a stable Codex delivery system from the public GPT-5.5 workflow demos',
  '/docs/guides/codex-skills-context-engineering/': 'How skills, context, permissions, boundaries, and worklogs make Codex more reliable',
  '/docs/guides/codex-plugins-research-workflow/': 'Detailed workflow for research tasks, plugins, structured reports, and result feedback loops',
  '/docs/guides/codex-parallel-automation-workflow/': 'How to run multiple tasks in parallel and keep them stable with worklogs and automation',
  '/docs/guides/codex-project-factory-delivery/': 'A Codex delivery system for apps, websites, videos, decks, courses, and other outputs',
  '/docs/guides/loop-engineering-harness/': 'Why Loop Engineering follows Harness and how to apply that pattern inside Codex workflows',
  '/docs/guides/codex-tool-recovery/': 'When Codex tools fail mid-run, check file tools first, then restart code implementation from step one',
  '/docs/guides/codex-windows-powershell7-timeout/': 'Fix Windows Codex tool-call 524 errors, Chinese encoding failures, and unusable streams by verifying PowerShell 7',
  '/docs/guides/claude-code-compaction-error/': 'Fix Claude Code compaction context errors by branching from an earlier session point before running /compact again',
  '/docs/guides/zero-downtime-release/': 'Production release playbook using blue-green slots, health checks, reverse-proxy traffic switching, and fast rollback',
  '/docs/guides/giffgaff-sim-guide/': 'Detailed guide to activating, retaining, checking, changing, and converting a UK giffgaff SIM to eSIM',
  '/docs/guides/us-virtual-card-guide/': 'Self-service US virtual card setup with a 10U first top-up, Alipay support, and long-term use for AI platforms',
  '/docs/guides/ai-video-storyboard-guide/': 'Turn storyboard scripts, character setup, scene mood, and pacing into an AI video workflow',
  '/docs/guides/video-creator-tools-workflow/': 'Combined workflow for Excalidraw, Screen Studio, Rotato, Jacky Illustration, Jacky Motion, and MD Publish',
  '/docs/guides/video-generation-skills-overview/': 'Explain the four adoin/video-generation-skills modules, use cases, combinations, and repo structure',
  '/docs/guides/video-generation-skills-install/': 'Step-by-step install guide for Cursor, Claude Code, Codex, and related agents',
  '/docs/guides/video-generation-skills-prompt-director/': 'Method for turning novels, scripts, plots, and briefs into storyboards and AI image / video prompts',
  '/docs/guides/video-generation-skills-ecommerce/': 'Detailed workflows for ecommerce hero images, detail pages, UGC, seeding videos, and multi-category assets',
  '/docs/guides/video-generation-skills-brand-ad-cg/': 'Brand ads, TVCs, product CG, premium visual texture, and stylized commercial workflows',
  '/docs/guides/video-generation-skills-ai-video-director/': 'Short drama, comic adaptation, storyboard, consistency, and complex action production workflows',
  '/docs/guides/video-generation-skills-i2v-prompt/': 'How to write image-to-video prompts and avoid motion chaos, camera conflicts, and repetitive style terms',
  '/docs/guides/video-generation-skills-white-background-scaling/': 'Expand white-background product photos into hero, scene, detail-page, ad, and short-video assets',
  '/docs/guides/video-generation-skills-product-cg/': 'Keyframes, material close-ups, motion shots, and commercial-grade product visual production',
  '/docs/guides/video-generation-skills-tvc-playbook/': '15 to 30 second TVC workflow for scripts, storyboards, keyframes, and single-shot video',
  '/docs/guides/video-generation-skills-scene-consistency/': 'Use nine-grid, top-down, orbit screenshots, and panorama references to solve scene consistency problems',
  '/docs/guides/video-generation-skills-complex-action-storyboard/': '12-panel storyboarding, reference-video substitution, and breakdown methods for complex action shots',
  '/models/': 'Browse by Chat, Image, Video, and Audio categories',
  '/docs/faq/': 'Frequently asked questions',
}

export function getTopNav(locale: Locale) {
  if (locale === 'zh') return TOP_NAV
  const labels = getLocaleCopy(locale).nav
  const titles = [labels.docs, labels.quickstart, labels.api, labels.models]
  return TOP_NAV.map((item, index) => ({ ...item, title: titles[index] ?? TOP_NAV_EN_BY_HREF[item.href] ?? item.title }))
}

const SECTION_TITLE_BY_LOCALE: Partial<Record<Locale, Record<string, string>>> = {
  'zh-TW': { 入门: '入門', 'SDK 与集成': 'SDK 與整合', 集成指南: '整合指南', 指南: '指南' },
  es: { 入门: 'Primeros pasos', 'SDK 与集成': 'SDK e integración', 集成指南: 'Guías de integración', 指南: 'Guías' },
  'pt-BR': { 入门: 'Primeiros passos', 'SDK 与集成': 'SDK e integração', 集成指南: 'Guias de integração', 指南: 'Guias' },
  fr: { 入门: 'Premiers pas', 'SDK 与集成': 'SDK et intégration', 集成指南: 'Guides d’intégration', 指南: 'Guides' },
  de: { 入门: 'Erste Schritte', 'SDK 与集成': 'SDK und Integration', 集成指南: 'Integrationsleitfäden', 指南: 'Anleitungen' },
  ar: { 入门: 'البدء', 'SDK 与集成': 'SDK والتكامل', 集成指南: 'أدلة التكامل', 指南: 'الأدلة' },
  ja: { 入门: '入門', 'SDK 与集成': 'SDK と統合', 集成指南: '統合ガイド', 指南: 'ガイド' },
  id: { 入门: 'Memulai', 'SDK 与集成': 'SDK dan integrasi', 集成指南: 'Panduan integrasi', 指南: 'Panduan' },
  ru: { 入门: 'Начало работы', 'SDK 与集成': 'SDK и интеграция', 集成指南: 'Руководства по интеграции', 指南: 'Руководства' },
  ko: { 入门: '시작하기', 'SDK 与集成': 'SDK 및 통합', 集成指南: '통합 가이드', 指南: '가이드' },
  vi: { 入门: 'Bắt đầu', 'SDK 与集成': 'SDK và tích hợp', 集成指南: 'Hướng dẫn tích hợp', 指南: 'Hướng dẫn' },
}

export function getDocsNav(locale: Locale) {
  if (locale === 'zh') return DOCS_NAV
  return DOCS_NAV.map(section => ({
    ...section,
    title: SECTION_TITLE_BY_LOCALE[locale]?.[section.title] ?? SECTION_TITLE_EN_BY_ZH[section.title] ?? section.title,
    items: section.items.map(item => ({
      ...item,
      title: NAV_TITLE_EN_BY_PATH[item.path] ?? item.title,
      blurb: NAV_BLURB_EN_BY_PATH[item.path] ?? item.blurb,
    })),
  }))
}

export function getDocsFlat(locale: Locale) {
  return getDocsNav(locale).flatMap(section => section.items)
}
import type { Locale } from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'
