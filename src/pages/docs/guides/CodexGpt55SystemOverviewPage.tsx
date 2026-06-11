import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import {
  GuideScreenshot,
  MiniCardGrid,
  ReferenceVideo,
  SERIES_EXTRA_IMAGES,
  SERIES_IMAGES,
  SimpleTable,
  TwoUpScreenshots,
} from './CodexGpt55SeriesShared'

export default function CodexGpt55SystemOverviewPage() {
  return (
    <DocPage
      path="/docs/guides/codex-gpt55-system-overview"
      title="Codex + GPT-5.5 实战拆解总览"
      description="根据公开视频里可见的操作界面和工作流，还原一套把 Codex 从聊天窗口升级成稳定交付系统的方法：先搭上下文、技能、权限和边界，再让多个任务并行执行。"
      headings={[
        { id: 'source', text: '资料范围', level: 2 },
        { id: 'video-reference', text: '参考视频', level: 2 },
        { id: 'core-idea', text: '核心方法', level: 2 },
        { id: 'system-map', text: '系统拆成哪几层', level: 2 },
        { id: 'what-visible', text: '视频里看得到什么', level: 2 },
        { id: 'missing-details', text: '补充核对后的新增细节', level: 2 },
        { id: 'how-to-read', text: '如何使用这个系列', level: 2 },
        { id: 'next', text: '接下来阅读顺序', level: 2 },
      ]}
    >
      <Callout tone="info" title="这是一组重建教程">
        <p>
          本系列内容依据公开视频中可见的界面、任务描述和工作结果整理，不把看不清的细节强行写成“精确配置”。
          可确认的部分会明确写出来，推断性的部分会保持克制。
        </p>
      </Callout>

      <h2 id="source">资料范围</h2>
      <p>
        从这段约 1 小时 43 分钟的视频中，能稳定确认的主题包括：
        <strong>skills 配置、插件使用、研究型任务、自动化流程、并行多任务</strong>，以及如何把这些能力组合成一套更耐用的开发系统。
      </p>
      <GuideScreenshot {...SERIES_IMAGES.researchChat} />

      <h2 id="video-reference">参考视频</h2>
      <p>
        下面嵌入的是本系列使用的公开视频。视频较长，适合对照本文中的截图和章节逐段回看。
        如果浏览器无法播放，可以直接打开视频源链接查看。
      </p>
      <ReferenceVideo />

      <h2 id="core-idea">核心方法</h2>
      <p>
        这套做法并不是“给 Codex 一个 prompt，然后等它自己发挥”，而是先把工作环境定义清楚：
        上下文从哪里来、哪些能力需要被固化成 skill、哪些任务可以交给插件或自动化、哪些结果必须被验证，最后再让模型执行。
      </p>
      <GuideScreenshot {...SERIES_EXTRA_IMAGES.permissionsProjectLocation} />
      <MiniCardGrid
        items={[
          {
            title: '先定义工作方式',
            body: '把上下文、目标、权限、project location、effort 和输出格式先固定下来，再启动执行。',
          },
          {
            title: '把经验固化成 skill',
            body: '重复出现的方法论不要每次重讲，整理成可复用 skill 或模板入口。',
          },
          {
            title: '研究与生产并行',
            body: '一边做信息收集，一边做实现、验证、封面、文案和交付物。',
          },
          {
            title: '结果必须能验证',
            body: '从模拟器构建、资源修复到文档输出，重点不是回答，而是最终可检查的结果。',
          },
        ]}
      />

      <h2 id="system-map">系统拆成哪几层</h2>
      <SimpleTable
        headers={['层级', '在视频里的表现', '实际作用']}
        rows={[
          [
            '上下文层',
            '研究对话、工作背景、项目目标、project location',
            '把问题空间缩小，让模型知道它在什么环境里工作。',
          ],
          [
            '能力层',
            'skill 管理、create skill、manage skill、reusable workflows',
            '把经验、规范和常用流程沉淀成长期资产。',
          ],
          [
            '执行层',
            '多任务并行、worklog、研究报告、自动化、工程修改',
            '让多个交付物同时推进，而不是一轮一轮手工切换。',
          ],
          [
            '验证层',
            '构建成功、资源修复、模拟器检查、成品输出',
            '保证结果不是停留在“看起来合理”，而是能真正落地。',
          ],
        ]}
      />

      <h2 id="what-visible">视频里看得到什么</h2>
      <TwoUpScreenshots
        items={[
          SERIES_IMAGES.skillsOverview,
          SERIES_IMAGES.buildSixThings,
          SERIES_IMAGES.remotionPlan,
          SERIES_IMAGES.manageCreate,
        ]}
      />
      <p>
        从这些画面可以看出，作者的重点并不是演示某一个模型有多强，而是展示一套
        <strong>可复制的工作系统</strong>：研究、写作、前端、App、视频、Deck、资源修复和 skill 管理都放在同一条交付链路里。
      </p>

      <h2 id="missing-details">补充核对后的新增细节</h2>
      <p>
        重新按更密集关键帧核对视频后，可以补上几个此前写得不够细的点：
        开头有 permissions、effort、project location；研究段有 YouTube transcript 服务对比；
        自动化段出现 API Key 配置；产品段围绕 Chorus iOS app、landing page、数据库与下载页持续迭代。
      </p>
      <TwoUpScreenshots
        items={[
          SERIES_EXTRA_IMAGES.youtubeTranscriptApiComparison,
          SERIES_EXTRA_IMAGES.automationApiKey,
          SERIES_EXTRA_IMAGES.chorusLandingPage,
          SERIES_IMAGES.appIconBuild,
        ]}
      />

      <h2 id="how-to-read">如何使用这个系列</h2>
      <p>
        后面的 4 篇文章按能力层次拆开：先讲 <strong>skills 与上下文工程</strong>，
        再讲 <strong>插件与研究工作流</strong>，然后讲 <strong>并行与自动化</strong>，
        最后讲 <strong>如何形成项目工厂式交付</strong>。
      </p>
      <Callout tone="tip" title="阅读方式建议">
        <p>
          如果你现在最痛的是“Codex 经常每次都要重新解释需求”，先读 skills 与上下文篇；
          如果你最想解决“一个人同时推进多个项目”，先读并行与自动化篇。
        </p>
      </Callout>

      <h2 id="next">接下来阅读顺序</h2>
      <p>
        继续阅读：
        <Link to="/docs/guides/codex-skills-context-engineering/">skills 与上下文工程</Link>
        ，然后按页面底部的上一页 / 下一页继续即可。
      </p>
    </DocPage>
  )
}
