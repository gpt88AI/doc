import type { ReactNode } from 'react'

export const SERIES_IMAGE_BASE = '/images/guides/codex-gpt55-system'
export const SERIES_EXTRA_IMAGE_BASE = '/images/guides/codex-gpt55-system-extra'
export const REFERENCE_VIDEO_URL =
  'https://video.twimg.com/amplify_video/2064540117675790336/vid/avc1/480x270/Axa8Ank4BtvxukhK.mp4'

export const SERIES_IMAGES = {
  researchChat: {
    src: `${SERIES_IMAGE_BASE}/research-chat.jpg`,
    alt: 'Codex Desktop 里的研究对话与插件区域截图',
    caption: '研究型会话：视频里能看到 Codex Desktop 同时承载对话、插件和研究任务。',
  },
  skillsOverview: {
    src: `${SERIES_IMAGE_BASE}/skills-overview.jpg`,
    alt: 'Make Codex work your way 与 skill 管理界面截图',
    caption: 'Skill 视角：先定义自己的工作方式，再把它固化成可复用能力。',
  },
  youtubeResearchReport: {
    src: `${SERIES_IMAGE_BASE}/youtube-research-report.jpg`,
    alt: '分析最新 YouTube 视频并输出报告的会话截图',
    caption: '研究任务示例：从公开视频收集信息，并输出可复用的报告或工作记录。',
  },
  buildSixThings: {
    src: `${SERIES_IMAGE_BASE}/build-six-things.jpg`,
    alt: 'Building these 6 things at the same time with Codex 截图',
    caption: '并行任务：画面里明确展示了同时推进多个交付物的工作方式。',
  },
  iosSummary: {
    src: `${SERIES_IMAGE_BASE}/ios-summary.jpg`,
    alt: 'iOS 应用需求摘要和构建状态截图',
    caption: '产品交付：从需求摘要到 build 成功验证，说明任务并不是停在对话层。',
  },
  remotionPlan: {
    src: `${SERIES_IMAGE_BASE}/remotion-plan.jpg`,
    alt: 'Remotion launch video 规划截图',
    caption: '视频制作链路：脚本、画外音、音乐、字幕和镜头计划被整理成明确执行单。',
  },
  skillWorklog: {
    src: `${SERIES_IMAGE_BASE}/skill-worklog.jpg`,
    alt: 'skill 文件与 worklog 记录截图',
    caption: '执行记忆：Skill 和 worklog 组合，负责保存做事方式与当前进度。',
  },
  agentCurriculum: {
    src: `${SERIES_IMAGE_BASE}/agent-curriculum.jpg`,
    alt: '从视频和转录生成课程或 agent curriculum 的截图',
    caption: '知识产品化：公开资料被整理成课程、训练资料或 agent 可执行上下文。',
  },
  assetsFix: {
    src: `${SERIES_IMAGE_BASE}/assets-fix.jpg`,
    alt: '资源修复与工程验证截图',
    caption: '工程细节：资源打包、Logo 修复、构建校验都在同一工作流内完成。',
  },
  appIconBuild: {
    src: `${SERIES_IMAGE_BASE}/app-icon-build.jpg`,
    alt: 'App 图标与模拟器验证截图',
    caption: '结果验证：不仅修改代码，还验证 App 图标和模拟器构建是否真的通过。',
  },
  investorDeck: {
    src: `${SERIES_IMAGE_BASE}/investor-deck.jpg`,
    alt: '投资人 deck 结构化内容截图',
    caption: '跨交付物：同一个系统可以同时处理 deck、文案、产品叙事和视觉材料。',
  },
  webAppForm: {
    src: `${SERIES_IMAGE_BASE}/web-app-form.jpg`,
    alt: 'Web 应用表单与布局工作截图',
    caption: '前端落地：页面结构、表单与布局调整都能进入持续交付流程。',
  },
  manageCreate: {
    src: `${SERIES_IMAGE_BASE}/manage-create.jpg`,
    alt: '创建或管理 Skill 的界面截图',
    caption: '能力沉淀：把一次性成果整理回 skill 系统，形成下次可直接复用的入口。',
  },
} as const

export const SERIES_EXTRA_IMAGES = {
  permissionsProjectLocation: {
    src: `${SERIES_EXTRA_IMAGE_BASE}/permissions-project-location.jpg`,
    alt: 'Codex 权限、effort、project location 配置说明截图',
    caption: '入口配置：视频开头强调 permissions、effort 和 project location，不是直接开聊。',
  },
  youtubeTranscriptApiComparison: {
    src: `${SERIES_EXTRA_IMAGE_BASE}/youtube-transcript-api-comparison.jpg`,
    alt: 'YouTube transcript API、Supadata 和 TranscriptAPI 对比截图',
    caption: '研究能力外部化：视频中对 Supadata、TranscriptAPI 等 YouTube 转录方案做了对比。',
  },
  automationApiKey: {
    src: `${SERIES_EXTRA_IMAGE_BASE}/automation-api-key.jpg`,
    alt: 'Automation API Key 配置界面截图',
    caption: '自动化准备：画面中出现 Automation API Key，说明自动化任务需要单独配置外部服务凭证。',
  },
  chorusLandingPage: {
    src: `${SERIES_EXTRA_IMAGE_BASE}/chorus-landing-page.jpg`,
    alt: 'Chorus iPhone 应用 landing page 与 Codex 编辑环境截图',
    caption: '产品落地：Chorus 被描述为学习 agent 基础、比较平台、保存 reusable skills 的 iPhone app。',
  },
} as const

export function ReferenceVideo() {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <video
        controls
        preload="metadata"
        playsInline
        className="aspect-video w-full bg-black"
        src={REFERENCE_VIDEO_URL}
      >
        当前浏览器不支持内嵌视频播放。
      </video>
      <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
        参考视频：公开视频 MP4。本文只基于视频中可见界面、字幕和操作流程整理，不把模糊内容写成确定配置。
      </figcaption>
    </figure>
  )
}

export function GuideScreenshot({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <img src={src} alt={alt} loading="lazy" className="w-full object-cover" />
      <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
        {caption}
      </figcaption>
    </figure>
  )
}

export function TwoUpScreenshots({
  items,
}: {
  items: ReadonlyArray<{ src: string; alt: string; caption: string }>
}) {
  return (
    <div className="not-prose my-6 grid gap-4 lg:grid-cols-2">
      {items.map(item => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <img src={item.src} alt={item.alt} loading="lazy" className="w-full object-cover" />
          <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function StepPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="not-prose my-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="m-0 text-base font-semibold text-ink-50">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-6 text-ink-200">{children}</div>
    </section>
  )
}

export function MiniCardGrid({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: ReactNode }>
}) {
  return (
    <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
      {items.map(item => (
        <section
          key={item.title}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h3 className="m-0 text-base font-semibold text-ink-50">{item.title}</h3>
          <div className="mt-3 text-sm leading-6 text-ink-200">{item.body}</div>
        </section>
      ))}
    </div>
  )
}

export function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={
                'border-t border-white/10 align-top' +
                (index % 2 === 1 ? ' bg-white/[0.02]' : '')
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-6 text-ink-200"
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
