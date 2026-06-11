import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import {
  GuideScreenshot,
  MiniCardGrid,
  SERIES_IMAGES,
  SimpleTable,
  StepPanel,
  TwoUpScreenshots,
} from './CodexGpt55SeriesShared'

export default function CodexParallelAutomationWorkflowPage() {
  return (
    <DocPage
      path="/docs/guides/codex-parallel-automation-workflow"
      title="Codex 并行任务与自动化工作流教程"
      description="这篇专门拆解视频里最醒目的部分：如何在 Codex 里同时推进多个任务，并通过 worklog、自动化和任务切分让系统保持稳定。"
      headings={[
        { id: 'parallel-why', text: '为什么要并行', level: 2 },
        { id: 'what-parallel', text: '视频里展示了哪些并行任务', level: 2 },
        { id: 'automation-role', text: '自动化在这里的作用', level: 2 },
        { id: 'coordination', text: '如何避免多任务互相打架', level: 2 },
        { id: 'recovery', text: '中断后如何恢复', level: 2 },
      ]}
    >
      <h2 id="parallel-why">为什么要并行</h2>
      <p>
        当 Codex 只是一个聊天工具时，工作天然是串行的：问一个问题，等一个回答，再切下一个任务。
        但视频展示的是另一种方式：把不同交付物切成多个执行单元，同时推进。
      </p>
      <GuideScreenshot {...SERIES_IMAGES.buildSixThings} />

      <h2 id="what-parallel">视频里展示了哪些并行任务</h2>
      <p>
        从画面可以确认的并行方向，至少包含研究、iOS、视频规划、Deck、Web 页面和 skill 管理。
      </p>
      <MiniCardGrid
        items={[
          {
            title: '研究任务',
            body: '收集公开资料、整理视频要点、生成报告和工作记录。',
          },
          {
            title: '产品 / App 任务',
            body: '整理 iOS 功能摘要、检查资源、修复 Logo、验证模拟器构建。',
          },
          {
            title: '内容任务',
            body: '准备 Deck 结构、写产品叙事、组织课程和训练资料。',
          },
          {
            title: '创意任务',
            body: '规划 Remotion launch video，包括镜头、字幕、音乐和配音方案。',
          },
        ]}
      />

      <h2 id="automation-role">自动化在这里的作用</h2>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.skillWorklog, SERIES_IMAGES.remotionPlan]}
      />
      <p>
        自动化的价值不是“省一次点击”，而是把重复任务从人工切换里解放出来。比如：
        研究结果整理、工作日志记录、固定格式输出、步骤检查和交付清单生成。
      </p>
      <SimpleTable
        headers={['如果没有自动化', '加入自动化之后']}
        rows={[
          [
            '需要人工记住每个任务做到哪里、下一步是什么。',
            '用 worklog 或固定流程记录进度，方便跨会话恢复。',
          ],
          [
            '每种任务都要重新组织输出格式。',
            '用模板或 skill 把输出结构固定下来。',
          ],
          [
            '任务一多就容易漏验证。',
            '把构建、截图、文档落盘、路由接入等检查动作放进标准流程。',
          ],
        ]}
      />

      <h2 id="coordination">如何避免多任务互相打架</h2>
      <StepPanel title="把并行建立在拆分之上">
        <p>并行不是把所有要求塞进一个超长 prompt，而是先拆成互相独立、边界明确的小任务。</p>
      </StepPanel>
      <StepPanel title="每个任务只负责一个产物">
        <p>例如一个任务只做截图整理，一个任务只写教程页面，一个任务只校验路由和 SEO。</p>
      </StepPanel>
      <StepPanel title="共享同一套约束">
        <p>所有任务都沿用同一套 skill、命名规则、输出模板和验证标准，避免结果风格漂移。</p>
      </StepPanel>
      <StepPanel title="把状态显式写出来">
        <p>worklog、任务板或阶段标记非常关键，否则并行很快会退化成上下文混乱。</p>
      </StepPanel>

      <h2 id="recovery">中断后如何恢复</h2>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.assetsFix, SERIES_IMAGES.appIconBuild]}
      />
      <p>
        恢复能力是这套系统是否真正稳定的分水岭。视频里能看到资源修复、图标、构建结果等“落地状态”，
        这说明任务并不是一句“完成了”就结束，而是有明确可回看的中间结果。
      </p>
      <Callout tone="warn" title="并行任务最怕只有脑内状态">
        <p>
          如果一个任务做到哪里完全靠操作者自己记忆，那么一旦切到别的项目或重开会话，效率会直接掉下来。
          worklog、截图、构建记录和明确的阶段文件，都是恢复能力的一部分。
        </p>
      </Callout>
    </DocPage>
  )
}
