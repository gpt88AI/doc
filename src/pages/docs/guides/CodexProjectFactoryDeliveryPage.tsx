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

export default function CodexProjectFactoryDeliveryPage() {
  return (
    <DocPage
      path="/docs/guides/codex-project-factory-delivery"
      title="把 Codex 变成项目工厂的交付系统"
      description="最后一篇把前面的 skills、研究、并行和自动化收束成完整交付系统：同一个 Codex 环境，如何同时产出 App、网站、视频、Deck、课程和资产包。"
      headings={[
        { id: 'factory', text: '什么叫项目工厂', level: 2 },
        { id: 'deliverables', text: '视频里能确认的交付物类型', level: 2 },
        { id: 'pipeline', text: '一条完整的交付流水线', level: 2 },
        { id: 'quality', text: '如何控制质量', level: 2 },
        { id: 'adopt', text: '如何在自己的团队里落地', level: 2 },
      ]}
    >
      <h2 id="factory">什么叫项目工厂</h2>
      <p>
        这里说的“项目工厂”，不是批量生成低质量内容，而是让一个统一系统持续产出不同类型的成品：
        文档、网站、App、视频、Deck、课程、素材包，都共用同一套上下文、能力和验证方法。
      </p>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.iosSummary, SERIES_IMAGES.webAppForm]}
      />

      <h2 id="deliverables">视频里能确认的交付物类型</h2>
      <p>
        公开视频里已经能看到至少 6 类交付物，不是停留在单一代码任务。
      </p>
      <MiniCardGrid
        items={[
          {
            title: '应用交付',
            body: 'iOS 需求摘要、资源修复、图标配置、模拟器构建与结果确认。',
          },
          {
            title: '前端交付',
            body: 'Web 应用表单、布局和页面结构调整。',
          },
          {
            title: '视频交付',
            body: 'Remotion launch video 的镜头、字幕、配音、音乐和风格方案。',
          },
          {
            title: '文档 / 课程交付',
            body: '研究报告、课程结构、agent curriculum、知识整理。',
          },
          {
            title: '商务材料',
            body: 'Investor deck 的故事线、卖点组织和表达方式。',
          },
          {
            title: '系统能力本身',
            body: 'skill 创建与管理，让这套方法下次还能直接复用。',
          },
        ]}
      />

      <h2 id="pipeline">一条完整的交付流水线</h2>
      <GuideScreenshot {...SERIES_IMAGES.investorDeck} />
      <SimpleTable
        headers={['阶段', '关键动作', '产出']}
        rows={[
          ['输入收集', '读取公开资料、项目现状、已有文件、截图和需求。', '可执行上下文包'],
          ['能力装配', '挂 skill、选择插件、建立边界与规范。', '稳定的执行环境'],
          ['并行生产', '研究、开发、设计、视频、文档等任务同时推进。', '多个半成品并行出现'],
          ['结果验证', '构建、截图、预览、模拟器、路由、SEO、资源检查。', '可确认的最终结果'],
          ['能力回流', '把做法沉淀回 skill、模板或知识库。', '下一轮更快、更稳的系统'],
        ]}
      />

      <h2 id="quality">如何控制质量</h2>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.agentCurriculum, SERIES_IMAGES.manageCreate]}
      />
      <p>
        质量控制不是靠“更聪明的 prompt”，而是靠结构化流程。视频给出的启发是：
        任何一次产出，只要值得重复，都应该尽快回流进系统。
      </p>
      <StepPanel title="把可复用方法沉淀成 skill">
        <p>这样下一次做相近任务时，不需要再从零解释标准、格式和步骤。</p>
      </StepPanel>
      <StepPanel title="把验证动作当成正式工序">
        <p>构建、预览、资源检查、成品审阅必须是流程的一部分，而不是最后临时想起来。</p>
      </StepPanel>
      <StepPanel title="让研究直接服务交付">
        <p>研究结果要能立刻转成教程、Deck、课程、页面或实现清单，否则系统只会堆积笔记。</p>
      </StepPanel>

      <h2 id="adopt">如何在自己的团队里落地</h2>
      <Callout tone="tip" title="推荐从小范围开始">
        <p>
          不要一开始就试图把整个团队全部流程 AI 化。先挑一个高频、容易验证的任务链，
          例如“研究资料整理 + 文档落地”或“页面修改 + 构建验证”，跑通后再继续扩展。
        </p>
      </Callout>
      <p>比较稳妥的落地顺序是：</p>
      <StepPanel title="第一步：选一个固定场景">
        <p>例如教程网站更新、单页前端修改、集成文档补全或素材归档。</p>
      </StepPanel>
      <StepPanel title="第二步：补 skill 和边界">
        <p>先把约束、命名规范、输出格式和验证动作固化，不要急着追求并行规模。</p>
      </StepPanel>
      <StepPanel title="第三步：再加并行和自动化">
        <p>当单一任务链稳定以后，再把研究、写作、实现、校验拆成多个可协同任务。</p>
      </StepPanel>
      <p>
        这样做的目标不是把人从流程里完全拿掉，而是让人把注意力集中在判断、取舍和最终验收上，
        而不是反复手工搬运上下文。
      </p>
    </DocPage>
  )
}
