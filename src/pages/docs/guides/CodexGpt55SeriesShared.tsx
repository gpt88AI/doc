import type { ReactNode } from 'react'
import { useLocale } from '../../../lib/locale'

export const SERIES_IMAGE_BASE = '/images/guides/codex-gpt55-system'
export const SERIES_EXTRA_IMAGE_BASE = '/images/guides/codex-gpt55-system-extra'
export const REFERENCE_VIDEO_URL =
  '/videos/codex-gpt55-workflow.mp4'

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

const ENGLISH_IMAGE_COPY: Record<string, { alt: string; caption: string }> = {
  'research-chat.jpg': { alt: 'Research conversation and plugin area in Codex Desktop', caption: 'Research session: Codex Desktop carries conversation, plugins, and research tasks in one workspace.' },
  'skills-overview.jpg': { alt: 'Make Codex work your way and skill management interface', caption: 'Skill view: define a working method first, then turn it into reusable capability.' },
  'youtube-research-report.jpg': { alt: 'Session analyzing a YouTube video and producing a report', caption: 'Research example: collect information from a public video and produce a reusable report or worklog.' },
  'build-six-things.jpg': { alt: 'Building six things at the same time with Codex', caption: 'Parallel work: the screen shows several deliverables moving forward at the same time.' },
  'ios-summary.jpg': { alt: 'iOS app requirements summary and build status', caption: 'Product delivery: a successful build check shows that the work continues beyond the chat layer.' },
  'remotion-plan.jpg': { alt: 'Remotion launch video plan', caption: 'Video workflow: script, voice-over, music, captions, and shot planning become an execution list.' },
  'skill-worklog.jpg': { alt: 'Skill files and worklog records', caption: 'Execution memory: skills and worklogs preserve the method and current progress.' },
  'agent-curriculum.jpg': { alt: 'Generating a course or agent curriculum from video and transcript', caption: 'Knowledge productization: public material becomes a course, training set, or executable agent context.' },
  'assets-fix.jpg': { alt: 'Asset repair and engineering verification', caption: 'Engineering detail: packaging, logo repair, and build checks happen in the same delivery workflow.' },
  'app-icon-build.jpg': { alt: 'App icon and simulator verification', caption: 'Result verification: change the code, then verify the app icon and simulator build.' },
  'investor-deck.jpg': { alt: 'Structured investor deck content', caption: 'Cross-deliverable work: one system can handle decks, copy, product narrative, and visual material.' },
  'web-app-form.jpg': { alt: 'Web app form and layout work', caption: 'Frontend delivery: page structure, forms, and layout changes can enter a continuous workflow.' },
  'manage-create.jpg': { alt: 'Skill creation and management interface', caption: 'Capability capture: turn one-off results back into reusable skill entry points.' },
  'permissions-project-location.jpg': { alt: 'Codex permissions, effort, and project location settings', caption: 'Entry configuration: permissions, effort, and project location are set before the conversation starts.' },
  'youtube-transcript-api-comparison.jpg': { alt: 'Comparison of YouTube transcript APIs', caption: 'Externalized research: the video compares several YouTube transcription approaches.' },
  'automation-api-key.jpg': { alt: 'Automation API key configuration screen', caption: 'Automation setup: an external service credential is configured separately for automated tasks.' },
  'chorus-landing-page.jpg': { alt: 'Chorus iPhone app landing page and Codex workspace', caption: 'Product delivery: Chorus is described as an iPhone app for learning agent basics and saving reusable skills.' },
}

function localizedImageCopy(locale: string, src: string, alt: string, caption: string) {
  if (locale === 'zh') return { alt, caption }
  return ENGLISH_IMAGE_COPY[src.split('/').pop() ?? ''] ?? { alt, caption }
}

export function ReferenceVideo() {
  const { locale } = useLocale()
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <video
        controls
        preload="metadata"
        playsInline
        poster={SERIES_IMAGES.researchChat.src}
        className="aspect-video w-full bg-black"
        src={REFERENCE_VIDEO_URL}
      >
        {locale === 'zh' ? '当前浏览器不支持内嵌视频播放。' : 'This browser does not support embedded video playback.'}
      </video>
      <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
        {locale === 'zh' ? '参考视频：已切换为站内同域 MP4，避免外链播放器拦截。' : 'Reference video: using the same-origin MP4 avoids external player blocking.'}
        <a
          href={REFERENCE_VIDEO_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-violet-300 hover:text-violet-200"
        >
          {locale === 'zh' ? '直接打开视频文件' : 'Open the video file'}
        </a>
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
  const { locale } = useLocale()
  const copy = localizedImageCopy(locale, src, alt, caption)
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <img src={src} alt={copy.alt} loading="lazy" className="w-full object-cover" />
      <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
        {copy.caption}
      </figcaption>
    </figure>
  )
}

export function TwoUpScreenshots({
  items,
}: {
  items: ReadonlyArray<{ src: string; alt: string; caption: string }>
}) {
  const { locale } = useLocale()
  return (
    <div className="not-prose my-6 grid gap-4 lg:grid-cols-2">
      {items.map(item => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <img src={item.src} alt={locale === 'zh' ? item.alt : localizedImageCopy(locale, item.src, item.alt, item.caption).alt} loading="lazy" className="w-full object-cover" />
          <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
            {locale === 'zh' ? item.caption : localizedImageCopy(locale, item.src, item.alt, item.caption).caption}
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
