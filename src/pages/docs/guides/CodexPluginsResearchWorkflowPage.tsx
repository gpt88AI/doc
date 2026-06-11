import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import {
  GuideScreenshot,
  MiniCardGrid,
  SERIES_EXTRA_IMAGES,
  SERIES_IMAGES,
  SimpleTable,
  StepPanel,
  TwoUpScreenshots,
} from './CodexGpt55SeriesShared'

export default function CodexPluginsResearchWorkflowPage() {
  return (
    <DocPage
      path="/docs/guides/codex-plugins-research-workflow"
      title="Codex 插件与研究工作流教程"
      description="从公开视频里的研究型界面出发，拆解 Codex 如何结合插件、资料搜集和结构化报告，把“查资料”升级成可复用的研究工作流。"
      headings={[
        { id: 'research-mode', text: '研究模式长什么样', level: 2 },
        { id: 'plugin-role', text: '插件在这里解决什么问题', level: 2 },
        { id: 'transcript-tools', text: 'YouTube 转录工具对比', level: 2 },
        { id: 'report-shape', text: '研究结果应该长成什么样', level: 2 },
        { id: 'repeatable', text: '如何做成可重复流程', level: 2 },
        { id: 'use-cases', text: '适合哪些场景', level: 2 },
      ]}
    >
      <h2 id="research-mode">研究模式长什么样</h2>
      <p>
        视频中能看到明显的研究型会话：一边收集外部资料，一边让 Codex 整理结论、生成报告、
        输出摘要和工作记录。这和单纯的问答模式差别很大。
      </p>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.researchChat, SERIES_IMAGES.youtubeResearchReport]}
      />

      <h2 id="plugin-role">插件在这里解决什么问题</h2>
      <p>
        插件不是为了“多一个按钮”，而是为了把原本只能手工完成的资料访问、结构化获取、
        内容整理和结果落盘流程串起来。这样研究不会停留在聊天窗口里。
      </p>
      <MiniCardGrid
        items={[
          {
            title: '扩展输入来源',
            body: '让 Codex 可以读取更多外部材料，而不是只依赖当前会话里那一点文本。',
          },
          {
            title: '减少人工搬运',
            body: '把“复制网页、摘重点、整理结构”这种重复劳动尽量交给流程和工具。',
          },
          {
            title: '输出结构化结果',
            body: '最终形成报告、对比表、工作记录或后续执行清单，而不是只给一段散文式回答。',
          },
          {
            title: '给后续任务供料',
            body: '研究产出的结论可以直接喂给前端、文档、课程、Deck 或视频制作任务。',
          },
        ]}
      />

      <h2 id="transcript-tools">YouTube 转录工具对比</h2>
      <p>
        更细地核对视频后，可以看到作者让 Codex 研究 YouTube transcript 方案，并对 Supadata、
        TranscriptAPI 等服务做了比较。这里的重点不是某个 API 名字，而是研究流程本身：
        先比较可用工具，再要求 Codex 创建一个 skill，用来按频道拉取最新视频、获取 transcript、生成摘要。
      </p>
      <GuideScreenshot {...SERIES_EXTRA_IMAGES.youtubeTranscriptApiComparison} />
      <SimpleTable
        headers={['环节', '视频中可见做法', '可复用成什么']}
        rows={[
          [
            '工具调研',
            '比较多个 YouTube transcript / creator data API 的价格、可靠性和开发体验。',
            '形成“外部数据源选择清单”，避免每次临时搜索。',
          ],
          [
            '能力封装',
            '要求 Codex 创建一个 skill：输入频道，搜索最新视频，拉 transcript，再总结。',
            '沉淀成 research skill，后续可直接复用到竞品分析、课程整理和内容研究。',
          ],
          [
            '结果输出',
            '把视频信息整理成报告，而不是只返回散乱摘要。',
            '作为后续文档、课程、Deck、产品需求的输入材料。',
          ],
        ]}
      />

      <h2 id="report-shape">研究结果应该长成什么样</h2>
      <GuideScreenshot {...SERIES_IMAGES.youtubeResearchReport} />
      <p>
        从视频里“Analyze latest YouTube videos...”这类画面来看，好的研究输出至少包含三层：
      </p>
      <SimpleTable
        headers={['层次', '内容', '为什么重要']}
        rows={[
          [
            '事实层',
            '明确可见的信息、时间、对象、功能点、交付内容。',
            '先把确认无误的信息分离出来，避免一开始就混入推断。',
          ],
          [
            '判断层',
            '这些事实说明了什么工作方法、产品方向或流程设计。',
            '把研究从摘抄提升到可行动的洞察。',
          ],
          [
            '执行层',
            '下一步应该写什么文档、改什么页面、补哪些图、做哪些验证。',
            '让研究直接进入生产流程，而不是躺在笔记里。 ',
          ],
        ]}
      />

      <h2 id="repeatable">如何做成可重复流程</h2>
      <StepPanel title="1. 先固定研究输入">
        <p>只选当前任务需要的资料源，例如公开视频、截图、转录、README、页面源码，不要无限扩张范围。</p>
      </StepPanel>
      <StepPanel title="2. 再固定输出模板">
        <p>可以要求输出成对比表、章节提纲、发布清单、文档页面草案或任务拆解，而不是自由发挥。</p>
      </StepPanel>
      <StepPanel title="3. 给出验证标准">
        <p>例如“所有结论都要能在截图中找到依据”“不写看不见的精确参数”“整理后可直接转成站内教程”。</p>
      </StepPanel>
      <StepPanel title="4. 将结果回流到系统">
        <p>好的研究不应该只停在单次会话里，而要进入 skill、知识库、课程素材或下一阶段任务。</p>
      </StepPanel>

      <h2 id="use-cases">适合哪些场景</h2>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.agentCurriculum, SERIES_IMAGES.investorDeck]}
      />
      <p>
        从视频可以确认，这套研究工作流并不只服务于写报告。它还可以直接支持：
        课程整理、产品研究、市场素材汇总、Deck 叙事、网站文案和后续制作任务。
      </p>
      <Callout tone="tip" title="研究和交付最好不要拆开">
        <p>
          这段视频最值得借鉴的一点，是研究结果会立刻进入后续任务链路。这样同一份资料能被重复利用，不会只沉淀成一次性笔记。
        </p>
      </Callout>
    </DocPage>
  )
}
