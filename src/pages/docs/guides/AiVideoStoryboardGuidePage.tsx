import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const CORE_WORKFLOW = `1. 先定主题：你想讲的不是“画面”，而是“情绪变化”
2. 再拆人物：学生时代是谁，成年后是谁，现在的状态是什么
3. 再拆场景：教室、办公室、出租车、夜市、厨房、小摊
4. 每个场景只保留一个核心动作和一句核心台词
5. 统一画风参数：比例、光线、写实程度、镜头节奏、色调
6. 先出静态关键帧，再补视频动作提示词
7. 确认人物一致性后，再批量生成整条短片镜头
8. 最后才做配音、BGM、字幕和转场`

const PROMPT_FORMULA = `场景氛围：
时间、地点、空间结构、光线、颜色、时代感、环境细节

人物设定：
年龄、发型、衣着、面部特征、神态、情绪、身份状态

动作镜头：
站 / 坐 / 走 / 抬头 / 回头 / 开车 / 打包 / 对话

台词旁白：
一句话就够，尽量短，必须能推动情绪变化

画面参数：
写实 / 电影感 / 竖屏 9:16 / 景深 / 暖色调 / 慢节奏 / 胶片感`

const SHOT_TEMPLATE = `镜头 01
场景：阳光洒满老旧高中教室，浅绿色墙面，白色窗框，课桌整齐，黑板干净，校园暖光
人物：双马尾少女，蓝白校服，眼神清澈，带一点青涩笑意
动作：站在窗边，轻轻抬头看向远方，缓慢开口
台词：我以后的梦想就是去大城市闯荡，然后环游世界
参数：写实人像，暖色电影感，竖屏 9:16，细腻光影，青春胶片质感

镜头 02
场景：灰白色办公室，桌面电脑、文件、绿植，室内冷调柔光
人物：成年女性，低马尾，灰色职业装，略带疲惫
动作：拿起手机贴耳通话，低头轻叹气
台词：喂，妈，回来吃饭
参数：电影写实，冷白柔光，生活化纪实镜头，人物面部自然`

const VIDEO_PROMPT_EXAMPLE = `生成一条 9:16 写实短视频镜头：
老旧高中教室，午后阳光穿过白色窗框洒在课桌和黑板上，空气里有轻微粉笔灰，
青春怀旧暖色调。一个双高马尾少女穿着宽松蓝白校服，站在教室窗边，
眼神清澈，脸上带一点对未来的憧憬，轻轻抬头看向窗外远方，缓慢开口说话。
镜头轻微推近，人物动作自然，面部细节清晰，背景柔和虚化，
整体电影感、写实人像、细腻光影、慢节奏情绪片。`

const CONSISTENCY_RULES = `人物一致性规则：
1. 先确定一个“学生时代主角”参考图
2. 成年镜头只允许改发型、衣着、年龄状态，不要改五官骨相
3. 不同场景反复强调“面部五官一致”
4. 用“同一人物成年版 / 中年版”而不是“另一个女人”
5. 静态图确认一致后，再生成视频镜头

镜头一致性规则：
1. 同一段故事统一 9:16
2. 同一人物段落尽量统一色温和镜头语言
3. 每个镜头只保留一个主要动作
4. 台词不要过长，否则口型和节奏容易失真
5. 转场靠情绪对比，不靠复杂特效`

const EDITING_FLOW = `成片建议流程：
1. 用图像模型先做每个镜头关键帧
2. 从关键帧里筛出人物最稳定的一组
3. 再用视频模型生成单镜头动作片段
4. 把校园段、成年段、夜市场景段分别导出
5. 剪映 / PR / CapCut 里补字幕、BGM、环境音
6. 用“梦想 - 现实 - 再理解人生”三段式完成剪辑
7. 最后统一调色和片尾字幕`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
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

export default function AiVideoStoryboardGuidePage() {
  return (
    <DocPage
      path="/docs/guides/ai-video-storyboard-guide"
      title="AI 视频分镜与提示词教程"
      description="把分镜脚本、人物设定、场景氛围和情绪节奏整理成可直接用于 AI 视频生成的工作流，适合短视频剧情片、情绪片和口播叙事片。"
      headings={[
        { id: 'overview', text: '先理解 AI 视频到底在生成什么', level: 2 },
        { id: 'workflow', text: '推荐工作流', level: 2 },
        { id: 'formula', text: '分镜提示词公式', level: 2 },
        { id: 'storyboard', text: '如何拆分镜头', level: 2 },
        { id: 'case', text: '案例拆解：少年梦情绪短片', level: 2 },
        { id: 'models', text: '模型与工具选择', level: 2 },
        { id: 'consistency', text: '人物与镜头一致性', level: 2 },
        { id: 'editing', text: '从单镜头到成片', level: 2 },
        { id: 'mistakes', text: '最常见的失败原因', level: 2 },
      ]}
    >
      <Callout tone="info" title="AI 视频不是一句提示词直接出成片">
        <p>
          真正稳定的做法是先写分镜，再做关键帧，再生成单镜头，最后进入剪辑。
          如果一开始就要求模型“一次性生成完整剧情短片”，大概率会出现人物漂移、动作混乱和情绪断裂。
        </p>
      </Callout>

      <h2 id="overview">先理解 AI 视频到底在生成什么</h2>
      <p>
        AI 视频模型最擅长的不是长篇叙事，而是单个镜头里的空间、人物、动作和情绪表达。
        所以文档、提示词和分镜设计的核心任务，不是写文学作品，而是把每个镜头压缩成
        “一个场景、一个人物状态、一个动作、一句台词、一个明确的画面风格”。
      </p>
      <p>
        你给的这份分镜 PDF 很典型：它不是先讲复杂剧情，而是先用校园、办公室、出租车、夜市、厨房这些场景，
        把“梦想”和“现实”做出反差。这种结构非常适合 AI 视频生成，因为每个镜头都足够独立。
      </p>

      <h2 id="workflow">推荐工作流</h2>
      <CodeBlock lang="text" filename="ai-video-workflow" code={CORE_WORKFLOW} />

      <h2 id="formula">分镜提示词公式</h2>
      <p>
        一个可复用的视频镜头提示词，不要只写“一个女生在教室里说梦想”。那样太短，
        模型不知道空间层次、人物状态和镜头节奏。更稳的写法是下面这种五段式：
      </p>
      <CodeBlock lang="text" filename="prompt-formula" code={PROMPT_FORMULA} />

      <h2 id="storyboard">如何拆分镜头</h2>
      <DocTable
        headers={['拆解项', '你要写什么', '错误写法']}
        rows={[
          ['场景', '教室、办公室、出租车、夜市、厨房这类空间 + 光线 + 时代感', '只写“一个室内场景”'],
          ['人物', '发型、衣着、年龄状态、神态、微表情', '只写“一个女生”'],
          ['动作', '抬头、开车、打包、接电话、托腮、握方向盘', '动作写成一长串，模型抓不住重点'],
          ['台词', '一句话推动情绪变化', '整段口播或长段旁白'],
          ['风格参数', '写实、电影暖色、纪实、景深、竖屏 9:16', '参数前后互相打架，例如既要纪实又要夸张动漫'],
        ]}
      />

      <h2 id="case">案例拆解：少年梦情绪短片</h2>
      <p>
        这类题材最适合做“三段式结构”：第一段是青春时的梦想，第二段是成年后的现实，
        第三段是对现实的重新理解。你给的 PDF 基本就是这个结构。
      </p>
      <CodeBlock lang="text" filename="shot-template" code={SHOT_TEMPLATE} />
      <p>如果你要直接喂给视频模型，可以先把镜头写成下面这种单镜头视频提示词：</p>
      <CodeBlock lang="text" filename="video-prompt-example" code={VIDEO_PROMPT_EXAMPLE} />

      <Callout tone="tip" title="先做关键帧，再做动态镜头">
        <p>
          校园少女、成年白领、出租车司机、夜市摊主这些身份跨度很大。先用图像模型确认关键帧，
          再进入视频生成，会比直接做视频更容易保持人物一致。
        </p>
      </Callout>

      <h2 id="models">模型与工具选择</h2>
      <DocTable
        headers={['任务', '推荐入口', '说明']}
        rows={[
          ['看可用视频模型', <Link to="/models/">模型导航</Link>, '在 Video 分类下看模型、能力和接口路径。'],
          ['先做人物关键帧', <Link to="/docs/guides/agent-image-studio/">Agent 图片工作台</Link>, '先把主角长相、服装和氛围打样固定。'],
          ['做程序化接入', <code>/v1/videos/generations</code>, '适合把单镜头生成流程接进自己的产品或脚本。'],
          ['先做图片再做视频', <Link to="/docs/api/images/">图片生成 API</Link>, '先锁住角色、场景和构图，再转视频。'],
        ]}
      />
      <p>
        当前站内模型导航已经把视频模型单独归类，你可以先去 <Link to="/models/">模型导航</Link> 的
        Video 分类查看，再决定是先出关键帧，还是直接走视频生成接口。
      </p>

      <h2 id="consistency">人物与镜头一致性</h2>
      <CodeBlock lang="text" filename="consistency-rules" code={CONSISTENCY_RULES} />

      <h2 id="editing">从单镜头到成片</h2>
      <p>
        AI 视频最稳的生产链路通常不是“一个模型包办所有环节”，而是图像模型、视频模型和剪辑工具分工合作。
      </p>
      <CodeBlock lang="text" filename="editing-flow" code={EDITING_FLOW} />

      <h2 id="mistakes">最常见的失败原因</h2>
      <DocTable
        headers={['问题', '原因', '解决方式']}
        rows={[
          ['人物越做越不像同一个人', '每个镜头都重新描述了一个“新人物”', '先固定主角关键帧，反复强调五官一致。'],
          ['动作很假或很乱', '一个镜头里塞了太多动作', '每个镜头只保留一个核心动作。'],
          ['情绪不连贯', '台词、镜头和场景反差没有被设计', '用梦想 - 现实 - 和解三段式重新排。'],
          ['画面好看但成不了片', '只会做单图，不会做镜头顺序', '先写镜头表，再做单镜头生成。'],
          ['成本过高', '直接高分辨率批量生成', '先低成本验证关键帧和单镜头。'],
        ]}
      />
    </DocPage>
  )
}
