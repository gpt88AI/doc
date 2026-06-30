import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const STAGES = `入门阶段
1. 平台概览与界面导览
2. 出你的第一张图
3. 工作台与场景怎么选

进阶阶段
4. 把提示词写好
5. 图生图与参考图
6. 创作模板与我的场景
7. 素材中心与提示词库

高阶阶段
8. 工具箱实战
9. 高效工作流与批量产出
10. 额度、计费与失败返还`

const STARTER_FLOW = `电商工具专题建议顺序：
1. 先理解平台和工作台
2. 跑通第一张图，确认账号、模型和导出流程
3. 再学提示词和图生图
4. 把常用模板、场景、素材沉淀下来
5. 最后再进入工具箱、批量工作流和成本控制`

const DELIVERY_CHECKLIST = `单个商品出图交付检查：
1. 白底主图是否主体完整、边缘干净、无裁切
2. 场景图是否符合渠道气质，而不是只追求“好看”
3. 详情图是否围绕卖点拆图，而不是把所有信息塞进一张
4. 模特图是否保持服装版型、颜色和材质一致
5. 不同渠道输出比例是否正确：商品图、详情图、社媒图分别检查
6. 是否保留可复用 prompt、模板、参考图和失败案例说明`

const BATCH_PLAYBOOK = `批量商品工作流：
1. 先挑一个代表 SKU 做标准样板
2. 样板通过后保存成模板和场景
3. 再按品类分批次生成，不同品类不要混在同一批
4. 每批先跑 3 到 5 张小样，不要直接全量开跑
5. 对失败案例做原因归档：构图、裁切、材质漂移、颜色偏差
6. 通过素材中心沉淀底图、场景图、模特图、详情模块和活动图`

const COST_RULES = `成本控制原则：
1. 白底图、主图修整优先用更稳定的低复杂度工作流
2. 场景图和模特图才使用更重的图生图或高质量档位
3. 复杂详情页先拆模块，不要一张图塞完全部卖点
4. 失败率高的任务先降复杂度，再升清晰度
5. 高分辨率只给最终交付图，不给所有测试图`

type Topic = {
  no: string
  title: string
  summary: string
  detail: ReactNode
  stage: '入门' | '进阶' | '高阶'
}

const TOPICS: Topic[] = [
  {
    no: '01',
    stage: '入门',
    title: '平台概览与界面导览',
    summary: '先建立心智：平台能做什么、不同页面分别负责什么、第一次使用从哪里开始。',
    detail: (
      <>
        <p>
          这一部分解决的是“我打开平台后到底该先看哪里”。对电商用户来说，最重要的不是先研究所有功能，
          而是先知道自己要解决的是主图、详情图、场景图、模特图、批量素材，还是成套模板生产。
        </p>
        <p>
          建议先看 <Link to="/docs/guides/agent-image-studio/">Agent 图片工作台</Link>，
          理解工作台、场景、模型、结果区和导出区之间的关系，再进入具体图像任务。
        </p>
        <ul>
          <li>先区分你要做的是主图、场景图、详情图、模特图，还是整套营销素材。</li>
          <li>先找入口，再找参数。不要一上来就在错误工作台里反复试 prompt。</li>
          <li>第一次使用时只关心“能不能稳定出图”，先不要追求复杂视觉风格。</li>
        </ul>
      </>
    ),
  },
  {
    no: '02',
    stage: '入门',
    title: '出你的第一张图',
    summary: '从选场景到生成、下载、复用，把最短出图路径跑通。',
    detail: (
      <>
        <p>
          第一张图的目标不是做出最完美作品，而是验证账号、线路、模型、提示词和结果下载链路都是通的。
          对电商业务，建议第一张图直接用“白底主图”或“单商品场景图”起步，不要一开始就做复杂详情页或多商品拼图。
        </p>
        <p>
          如果你做的是商品首图，优先选择主体清晰、背景简单、裁剪风险低的任务，再参考{' '}
          <Link to="/docs/guides/agent-image-quality-crop-guide/">生图质量与裁剪避坑</Link> 控制安全留白。
        </p>
        <ol>
          <li>先选单商品、简单背景任务，不要第一次就做模特换装或多商品拼图。</li>
          <li>先生成 1 张，再确认下载、保存和复用链路正常。</li>
          <li>通过后再复制 prompt，扩展到同商品的场景图和详情模块图。</li>
        </ol>
      </>
    ),
  },
  {
    no: '03',
    stage: '入门',
    title: '工作台与场景怎么选',
    summary: '工作台是人群预设，场景是任务预设；选对入口能省掉大量试错。',
    detail: (
      <>
        <p>
          工作台决定你进入哪类生产环境，场景决定默认提示词方向、画面结构和输出目标。电商用户通常会在
          白底图、场景图、模特试穿、详情页素材、海报封面之间切换，所以先选对场景比一开始狂写提示词更重要。
        </p>
        <p>
          一个简单原则是：先按业务目标选工作台，再按画面任务选场景。不要用“模特试穿”的思路去做“白底主图”，
          也不要用“海报视觉”的思路去做“平台详情图”。
        </p>
        <DocTable
          headers={['任务类型', '优先工作台 / 场景', '不要这样做']}
          rows={[
            ['白底主图', '白底、抠图、轻修整场景', '不要直接用海报风或复杂棚拍风格起步'],
            ['场景图', '商品入场景、品牌氛围、平台营销图场景', '不要让场景抢掉商品主体'],
            ['模特图', '试穿、上身、模特替换场景', '不要在没有清晰参考图时直接强改版型'],
            ['详情图', '卖点模块、局部特写、信息拆图场景', '不要把所有卖点堆进一张长图'],
          ]}
        />
      </>
    ),
  },
  {
    no: '04',
    stage: '进阶',
    title: '把提示词写好',
    summary: '正向词、负向词、描述结构、AI 优化和英文构图词，决定出图上限。',
    detail: (
      <>
        <p>
          电商场景里的提示词重点不是“写得华丽”，而是写得可控。一个稳定提示词通常包括：主体、材质、
          背景、镜头距离、主体占比、安全留白、光线、风格、不能出现的元素。
        </p>
        <p>
          可以直接结合 <Link to="/docs/guides/agent-image-quality-crop-guide/">生图质量与裁剪避坑</Link>
          里的 size、构图词和英文提示词优化模板，把商品主图、场景图、模特图分别沉淀成固定模板。
        </p>
        <DocTable
          headers={['提示词模块', '应该写什么', '常见错误']}
          rows={[
            ['主体', '商品名、材质、颜色、结构、不能改变的元素', '只写“一个高级产品图”，不写具体结构'],
            ['构图', '主体占比、镜头距离、安全留白、比例', '只写“高清、好看”，不写画面结构'],
            ['背景', '白底、棚拍、厨房、卧室、户外、平台风格', '背景比商品更抢戏'],
            ['限制', '无文字、无水印、不改颜色、不裁切标签', '没有限制词，导致品牌元素漂移'],
          ]}
        />
      </>
    ),
  },
  {
    no: '05',
    stage: '进阶',
    title: '图生图与参考图',
    summary: '上传参考图做白底、入场景、模特上身、风格迁移，比纯文生图更可控。',
    detail: (
      <>
        <p>
          对电商来说，图生图通常比纯文生图更稳定，因为商品结构、颜色、品牌元素和材质边界更容易保住。
          常见用法包括：白底图扩场景、服装上身、包装入棚拍、品牌物料换背景、旧图局部改造。
        </p>
        <p>
          参考图要优先保证清晰、无遮挡、主体完整。如果是做商品图，最好明确写“不改变瓶型、比例、颜色和标签位置”。
        </p>
        <ul>
          <li>白底主图转场景图：适合先保住商品结构，再增加营销氛围。</li>
          <li>服装图转模特图：适合做上身效果，但必须先保证版型、肩线、长度不漂移。</li>
          <li>包装图换背景：适合节日活动和平台专题页，但要锁住标签和包装边缘。</li>
        </ul>
      </>
    ),
  },
  {
    no: '06',
    stage: '进阶',
    title: '创作模板与我的场景',
    summary: '把常用商品图、详情图、平台图模板沉淀下来，减少重复试错。',
    detail: (
      <>
        <p>
          模板的价值在于“复用”，不是“一次性好看”。当你已经跑通一套主图、场景图、详情页模块或节日活动图，
          就应该把它保存成模板或场景，下次只替换商品、卖点和节日元素。
        </p>
        <p>
          对商家团队而言，模板还可以让不同运营、设计、投手使用同一风格基线，避免每个人都重新发明提示词。
        </p>
        <ol>
          <li>先把通过率最高的一版主图存为模板。</li>
          <li>再按品类拆模板：护肤、女装、男装、数码、家居不要混用一套场景。</li>
          <li>最后再按活动节点补模板：618、七夕、开学季、黑五等。</li>
        </ol>
      </>
    ),
  },
  {
    no: '07',
    stage: '进阶',
    title: '素材中心与提示词库',
    summary: '把成果、失败案例、可复用提示词和参考图沉淀下来，越用越快。',
    detail: (
      <>
        <p>
          电商内容生产最怕“每次从零开始”。素材中心适合沉淀成品图、局部可复用素材、品牌参考图、模特底图、
          节日视觉元素；提示词库适合沉淀稳定模板、失败案例和修复方案。
        </p>
        <p>
          最有效的做法是给素材和提示词都加标签，例如：白底图、3C、服装女装、模特半身、618、七夕、黑五。
        </p>
        <DocTable
          headers={['沉淀对象', '建议内容', '价值']}
          rows={[
            ['素材中心', '白底底图、优质场景图、局部特写、模特参考图', '减少重复上传和重复筛选'],
            ['提示词库', '稳定 prompt、失败案例、修复方案、节日模板', '让团队复用更快'],
            ['标签体系', '品类、渠道、节日、风格、比例', '后续批量检索和复用更顺'],
          ]}
        />
      </>
    ),
  },
  {
    no: '08',
    stage: '高阶',
    title: '工具箱实战',
    summary: '抠图、批量、扩图、消除等工具单独可用，也可以串成完整工作流。',
    detail: (
      <>
        <p>
          工具箱不是边角功能，而是把电商图做完整的关键环节。抠图适合做白底与主图清理，扩图适合补安全留白，
          消除适合去水印、去杂物、去穿帮，批量工具适合把同一商品快速扩成多场景。
        </p>
        <p>
          一条常见链路是：抠图 → 白底图修整 → 场景图扩图 → 细节消除 → 批量换背景。这样比一次性大 prompt 更稳定。
        </p>
        <ul>
          <li>抠图：先解决边缘脏、背景不干净的问题。</li>
          <li>扩图：解决安全留白不足和平台裁切问题。</li>
          <li>消除：解决桌面杂物、反光、水印、穿帮元素。</li>
          <li>批量：把同一商品复制成多渠道、多背景、多活动版本。</li>
        </ul>
      </>
    ),
  },
  {
    no: '09',
    stage: '高阶',
    title: '高效工作流与批量产出',
    summary: '从单张图扩成主图、详情图、场景图、海报、社媒图的组合拳。',
    detail: (
      <>
        <p>
          高效工作流的核心不是“生成更多图”，而是“同一个商品在多个渠道稳定复用”。一个成熟流程通常是：
          白底主图打底，扩成场景图，再拆成详情模块图、广告图、活动封面和社媒配图。
        </p>
        <p>
          如果你需要进一步做成视频首帧或广告素材，可以结合{' '}
          <Link to="/docs/guides/video-generation-skills-white-background-scaling/">电商白底图裂变</Link>{' '}
          和 <Link to="/docs/guides/video-generation-skills-product-cg/">产品 CG 工作流</Link> 继续扩展。
        </p>
        <CodeBlock lang="text" filename="ecommerce-batch-playbook" code={BATCH_PLAYBOOK} />
      </>
    ),
  },
  {
    no: '10',
    stage: '高阶',
    title: '额度、计费与失败返还',
    summary: '理解消耗规则、充值方式、失败任务处理和成本控制，才能长期稳定使用。',
    detail: (
      <>
        <p>
          电商团队会高频生成图片，所以成本透明很关键。实际使用时要区分：文生图、图生图、批量任务、失败重试、
          返还规则、分辨率成本和不同模型的消耗口径。
        </p>
        <p>
          先看 <Link to="/docs/auth/">认证与计费</Link>，再看{' '}
          <Link to="/docs/guides/gpt-image-2-service-notice/">GPT-Image-2 生图服务通知</Link>，
          把充值、图片成本和分辨率选择一起理解，避免一边批量出图一边盲目试错。
        </p>
        <CodeBlock lang="text" filename="ecommerce-cost-rules" code={COST_RULES} />
      </>
    ),
  },
]

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                'border-t border-white/5 align-top' +
                (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
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

export default function EcommerceToolsSpecialPage() {
  const beginner = TOPICS.filter(topic => topic.stage === '入门')
  const intermediate = TOPICS.filter(topic => topic.stage === '进阶')
  const advanced = TOPICS.filter(topic => topic.stage === '高阶')

  return (
    <DocPage
      path="/docs/guides/ecommerce-tools-special"
      title="电商工具专题教程"
      description="整理成一套更详细的电商工具专题教程，覆盖入门、提示词、图生图、模板、素材中心、工具箱、批量工作流、交付检查和计费。"
      headings={[
        { id: 'overview', text: '专题结构', level: 2 },
        { id: 'beginner', text: '入门阶段', level: 2 },
        { id: 'intermediate', text: '进阶阶段', level: 2 },
        { id: 'advanced', text: '高阶阶段', level: 2 },
        { id: 'path', text: '建议学习顺序', level: 2 },
        { id: 'delivery', text: '交付检查', level: 2 },
        { id: 'related', text: '相关文档', level: 2 },
      ]}
    >
      <Callout tone="info" title="专题定位">
        <p>
          这个专题把电商 AI 作图相关教程按“入门、进阶、高阶”三阶段重组，适合电商、跨境、外贸、
          小红书、TikTok 和平台详情图生产场景。重点不是列目录，而是把“怎么开始、怎么稳定出图、怎么批量复用、
          怎么做成本控制”讲成一套可执行工作流。
        </p>
      </Callout>

      <h2 id="overview">专题结构</h2>
      <p>
        这个专题不是一篇孤立教程，而是一整套电商图像生产路径：先跑通第一张图，再掌握提示词和图生图，
        最后进入模板、工具箱、批量产出和成本控制。
      </p>
      <CodeBlock lang="text" filename="ecommerce-tools-stages" code={STAGES} />
      <DocTable
        headers={['阶段', '目标', '覆盖内容']}
        rows={[
          ['入门', '建立平台心智并跑通第一张图', '平台概览、第一次出图、工作台与场景选择'],
          ['进阶', '提升画面可控性和复用效率', '提示词、图生图、模板、素材中心与提示词库'],
          ['高阶', '进入规模化生产和成本控制', '工具箱、批量工作流、额度与计费'],
        ]}
      />

      <h2 id="beginner">入门阶段</h2>
      {beginner.map(topic => (
        <section key={topic.no} className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{topic.no} · {topic.stage}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink-50">{topic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{topic.summary}</p>
          <div className="mt-3 text-sm leading-6 text-ink-200">{topic.detail}</div>
        </section>
      ))}

      <h2 id="intermediate">进阶阶段</h2>
      {intermediate.map(topic => (
        <section key={topic.no} className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{topic.no} · {topic.stage}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink-50">{topic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{topic.summary}</p>
          <div className="mt-3 text-sm leading-6 text-ink-200">{topic.detail}</div>
        </section>
      ))}

      <h2 id="advanced">高阶阶段</h2>
      {advanced.map(topic => (
        <section key={topic.no} className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">{topic.no} · {topic.stage}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink-50">{topic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{topic.summary}</p>
          <div className="mt-3 text-sm leading-6 text-ink-200">{topic.detail}</div>
        </section>
      ))}

      <h2 id="path">建议学习顺序</h2>
      <CodeBlock lang="text" filename="ecommerce-tools-learning-path" code={STARTER_FLOW} />

      <h2 id="delivery">交付检查</h2>
      <p>
        电商图的完成标准不是“好看就行”，而是能稳定上线、能适配渠道、能复用。建议每次交付前都按同一张清单检查。
      </p>
      <CodeBlock lang="text" filename="ecommerce-delivery-checklist" code={DELIVERY_CHECKLIST} />

      <h2 id="related">相关文档</h2>
      <ul>
        <li><Link to="/docs/guides/agent-image-studio/">Agent 图片工作台</Link>：从平台工作台视角理解图片生成入口和常见任务。</li>
        <li><Link to="/docs/guides/agent-image-quality-crop-guide/">生图质量与裁剪避坑</Link>：解决电商图裁切、构图和安全留白问题。</li>
        <li><Link to="/docs/guides/gpt-image-2-service-notice/">GPT-Image-2 生图服务通知</Link>：理解分辨率、4K、专线和图片成本。</li>
        <li><Link to="/docs/guides/video-generation-skills-white-background-scaling/">电商白底图裂变</Link>：把商品图扩成更多营销素材。</li>
      </ul>
    </DocPage>
  )
}
