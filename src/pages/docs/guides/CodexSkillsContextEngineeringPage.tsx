import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import {
  GuideScreenshot,
  SERIES_IMAGES,
  SimpleTable,
  StepPanel,
  TwoUpScreenshots,
} from './CodexGpt55SeriesShared'

export default function CodexSkillsContextEngineeringPage() {
  return (
    <DocPage
      path="/docs/guides/codex-skills-context-engineering"
      title="Codex Skills 与上下文工程教程"
      description="把 Codex 变稳定，第一步不是换模型，而是把上下文、技能、权限和任务边界定义清楚。这一篇专门拆解公开视频里能确认的这套做法。"
      headings={[
        { id: 'why-first', text: '为什么先做上下文工程', level: 2 },
        { id: 'skills', text: 'Skill 在这里扮演什么角色', level: 2 },
        { id: 'context-stack', text: '推荐的上下文分层', level: 2 },
        { id: 'task-boundary', text: '任务边界怎么写', level: 2 },
        { id: 'operating-loop', text: '一套可执行的落地流程', level: 2 },
        { id: 'mistakes', text: '常见错误', level: 2 },
      ]}
    >
      <h2 id="why-first">为什么先做上下文工程</h2>
      <p>
        视频里最重要的一句思路，可以概括成：
        <strong>先把上下文、技能、流程、权限、任务边界搭好，再让 AI 执行。</strong>
        这意味着 Codex 被当成一个执行器，而不是随机回答器。
      </p>
      <GuideScreenshot {...SERIES_IMAGES.skillsOverview} />

      <h2 id="skills">Skill 在这里扮演什么角色</h2>
      <p>
        从 “Make Codex work your way” 和 “manage/create skill” 这些画面看，
        skill 本质上是把你的做事方式抽出来，变成一个可持续复用的入口。
      </p>
      <SimpleTable
        headers={['如果没有 skill', '有了 skill 之后']}
        rows={[
          [
            '每次新会话都要重新解释代码风格、目录规范、交付要求、验证步骤。',
            '把这些固定要求放进 skill，让新任务从一开始就带着标准运行。',
          ],
          [
            '不同项目之间做法漂移，输出质量不稳定。',
            '把最佳实践沉淀成能力模板，减少随机发挥带来的质量波动。',
          ],
          [
            '研究、写作、前端、视频等不同任务需要手工切换脑回路。',
            '按任务类型建立 skill，明确每种任务应该产出什么。 ',
          ],
        ]}
      />

      <h2 id="context-stack">推荐的上下文分层</h2>
      <TwoUpScreenshots
        items={[SERIES_IMAGES.skillWorklog, SERIES_IMAGES.manageCreate]}
      />
      <p>
        结合画面里能看到的 worklog、skill 文件和管理界面，一个比较合理的上下文分层是：
      </p>
      <StepPanel title="1. 项目上下文">
        <p>说明这个任务服务于哪个产品、当前阶段是什么、最后要交付什么。</p>
      </StepPanel>
      <StepPanel title="2. 任务上下文">
        <p>写清楚本轮只处理什么，不处理什么，避免会话不断膨胀。</p>
      </StepPanel>
      <StepPanel title="3. 规范上下文">
        <p>包括代码风格、文档格式、命名规则、验证方式、图片资源命名等硬约束。</p>
      </StepPanel>
      <StepPanel title="4. 执行记忆">
        <p>用 worklog、notes 或中间文档记录做到了哪一步，便于断点恢复和多会话衔接。</p>
      </StepPanel>

      <h2 id="task-boundary">任务边界怎么写</h2>
      <p>
        视频强调的不是让 AI 自己“想做什么都行”，而是把任务边界写窄。边界清晰后，Codex
        的表现会更接近可靠的执行器。
      </p>
      <Callout tone="warn" title="边界不清，最容易出问题">
        <p>
          常见失控点是：一个会话里同时要求研究、写代码、做设计、改发布、写 SEO、处理图片，
          但没有先定义优先级和输出格式。这样会让上下文不断漂移。
        </p>
      </Callout>
      <SimpleTable
        headers={['边界项', '建议写法']}
        rows={[
          ['目标', '本轮只完成一个清晰结果，例如“补全 5 篇教程并接入路由”。'],
          ['输入', '明确告诉它可使用哪些文件、截图、笔记、链接或已有结果。'],
          ['禁止项', '不允许擅自删文件、不允许跳过验证、不允许改动无关模块。'],
          ['输出', '要求产出代码、文档、截图说明、构建结果或 commit，而不是泛泛总结。'],
        ]}
      />

      <h2 id="operating-loop">一套可执行的落地流程</h2>
      <GuideScreenshot {...SERIES_IMAGES.skillWorklog} />
      <StepPanel title="步骤 A：先建最小上下文包">
        <p>只放当前任务真正需要的材料，不要一开始把整个仓库和全部背景都塞进去。</p>
      </StepPanel>
      <StepPanel title="步骤 B：挂上对应 skill">
        <p>按任务类型选 skill，例如研究、前端实现、文档写作、视频规划，而不是混成一个大指令。</p>
      </StepPanel>
      <StepPanel title="步骤 C：记录 worklog">
        <p>关键节点写清楚做了什么、还差什么、失败点在哪里，下一次恢复速度会明显快很多。</p>
      </StepPanel>
      <StepPanel title="步骤 D：结果验证">
        <p>像视频里那样回到构建、资源、模拟器或产物页面检查结果，确认不是“纸面完成”。</p>
      </StepPanel>

      <h2 id="mistakes">常见错误</h2>
      <p>
        最常见的问题不是模型弱，而是系统没有搭好：没有 skill、没有任务边界、没有 worklog、
        也没有结果验证。这样每一轮都会重新消耗大量上下文，最后看起来像“AI 不稳定”。
      </p>
    </DocPage>
  )
}
