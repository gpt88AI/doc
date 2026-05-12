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
  { title: '文档', match: '/docs', href: '/docs/overview' },
  { title: '快速开始', match: '/docs/quickstart', href: '/docs/quickstart' },
  {
    title: 'API Reference',
    match: '/docs/api',
    href: '/docs/api/chat-completions',
  },
  { title: '模型导航', match: '/models', href: '/models' },
]

export const DOCS_NAV: NavSection[] = [
  {
    title: '入门',
    items: [
      {
        title: '产品概览',
        path: '/docs/overview',
        blurb: 'gpt88.cc 是什么，能解决什么问题',
      },
      {
        title: '快速开始',
        path: '/docs/quickstart',
        blurb: '5 分钟内完成第一次模型调用',
      },
      {
        title: '认证与计费',
        path: '/docs/auth',
        blurb: 'API Key、用量与配额（数值由控制台动态下发）',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'POST /v1/chat/completions',
        path: '/docs/api/chat-completions',
        blurb: '对话补全主接口',
      },
      {
        title: 'POST /v1/images/generations',
        path: '/docs/api/images',
        blurb: '图片生成接口，支持文生图与图生图',
      },
      {
        title: 'GET /v1/models',
        path: '/docs/api/list-models',
        blurb: '列出可用模型',
      },
      {
        title: '错误码',
        path: '/docs/api/errors',
        blurb: 'HTTP / 业务错误码对照表',
      },
    ],
  },
  {
    title: 'SDK 与集成',
    items: [
      { title: 'cURL', path: '/docs/sdk/curl' },
      { title: 'Python', path: '/docs/sdk/python' },
      { title: 'Node.js', path: '/docs/sdk/nodejs' },
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
        path: '/docs/guides/config-export',
        blurb: '把 API Key + 模型 + 线路打包给 Claude Code / Cursor / Python SDK 等工具',
      },
      {
        title: '通用教程',
        path: '/docs/guides/gpt88-tutorial',
        blurb: 'Claude 与 OpenAI 通用接入、模型选择、线路选择、工具接入',
      },
    ],
  },
  {
    title: '资源',
    items: [
      {
        title: '模型导航',
        path: '/models',
        blurb: '按 Chat / Image / Video / Audio 浏览',
      },
      {
        title: 'FAQ',
        path: '/docs/faq',
      },
    ],
  },
]

/** 扁平化所有 docs 路径，便于 prev/next 导航 */
export const DOCS_FLAT: NavLeaf[] = DOCS_NAV.flatMap(s => s.items)
