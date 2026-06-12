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
        title: '通用教程',
        path: '/docs/guides/gpt88-tutorial/',
        blurb: 'Claude 与 OpenAI 通用接入、模型选择、线路选择、工具接入',
      },
      {
        title: '完整接入手册',
        path: '/docs/guides/complete-integration/',
        blurb: '从 API Key、Base URL、客户端配置到用量核对和错误排查的端到端教程',
      },
      {
        title: 'Agent 图片工作台',
        path: '/docs/guides/agent-image-studio/',
        blurb: '使用 agent.gpt88.cc 生成电商主图、场景图、模特图、详情页素材和批量图片',
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
        title: 'AI 视频分镜教程',
        path: '/docs/guides/ai-video-storyboard-guide/',
        blurb: '把分镜脚本、人物设定、场景氛围和情绪节奏整理成可直接用于 AI 视频生成的工作流',
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
