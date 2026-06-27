import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const SAFE_PROMPT = `构图要求：
- 主体必须完整出现在画面内，不裁切头部、手部、脚部、道具和衣摆
- 主体居中，整体占画面高度约 65%-75%
- 四周保留 10%-15% 安全留白，背景可以延展到边缘
- 镜头为中远景 / 全身构图，不要 close-up，不要 macro shot
- 如果是角色设定图，每个视图独立占一个清晰分栏，分栏之间留出空隙
- 无文字、无水印、无 UI、无边框`

const PRODUCT_PROMPT = `电商产品防裁剪提示词模板：

一瓶高端护肤精华液，完整瓶身与泵头都必须出现在画面内。
商品居中，瓶身占画面高度约 70%，四周保留 12% 安全留白。
纯白或浅灰无影背景，柔和棚拍光，真实玻璃材质，边缘清晰。
不要裁切瓶盖、瓶底、标签和包装边缘。无文字，无水印。`

const CHARACTER_PROMPT = `国漫 3D 角色设定图防裁剪提示词模板：

清冷青年角色设定图，国漫电影级 3D 动画质感，纯白无影背景。
画面为横向角色设定表，分成 4 个等宽分栏：
1. 正视脸部特写
2. 正视全身立绘
3. 侧视全身立绘
4. 后视全身立绘

每个分栏中的人物都必须完整在框内，头发、手、脚、衣摆、道具不能被裁切。
全身视图人物高度控制在分栏高度的 72% 左右，四周保留清晰留白。
不要把角色放得过大，不要局部特写替代全身视图，不要让不同视图互相重叠。
材质细节：陶瓷裂纹、玉化质地、冷色能量流、PBR 质感。
无文字、无水印、无 UI 元素。`

const API_SAFE_CURL = `curl https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "完整全身角色设定图，人物居中，头发、手、脚、衣摆和道具都不能被裁切，四周保留 12% 安全留白，纯白背景，国漫电影级 3D 质感，无文字，无水印",
    "size": "1024x1536",
    "quality": "high",
    "n": 1
  }'`

const BATCH_CHECKLIST = `批量生图前检查：

1. 是否先用 1-3 张小批量验证过构图
2. 是否明确了最终比例：1:1、3:4、4:5、9:16、16:9 或横向设定表
3. 是否写了“完整主体可见”和“安全留白”
4. 是否避免了 close-up、macro、half body 与 full body 的互相冲突
5. 是否把复杂任务拆成多个步骤，而不是一张图里塞太多要求
6. 是否准备了失败重试策略：扩图、重绘、拆分生成、后期拼版
7. 是否保留了最终可复用的 prompt、尺寸、质量和样图编号`

const CAUSE_ANALYSIS = `问题链路可以拆成 5 层：

1. 需求层：一张图里要求太多主体、视角、材质、动作和背景
2. 画布层：目标比例不适合主体形状，例如方图里塞长角色或四视图设定表
3. 构图层：提示词没有指定镜头距离、主体占比和安全留白
4. 质量层：分辨率、细节量和任务复杂度不匹配，模型只能取舍
5. 发布层：原图完整，但平台卡片、视频封面或商品后台再次裁切`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
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
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
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

export default function AgentImageQualityCropGuidePage() {
  return (
    <DocPage
      path="/docs/guides/agent-image-quality-crop-guide"
      title="agent.gpt88.cc 生图质量与裁剪避坑指南"
      description="解释 agent.gpt88.cc 生图时主体被裁剪、细节变糊、多视图角色设定图质量下降、电商产品边缘丢失和批量生成不稳定的原因，并给出解决方案。"
      headings={[
        { id: 'overview', text: '先判断问题类型', level: 2 },
        { id: 'root-cause', text: '问题出现原因分析', level: 2 },
        { id: 'crop-causes', text: '为什么会被裁剪', level: 2 },
        { id: 'safe-area', text: '防裁剪核心写法', level: 2 },
        { id: 'quality', text: '质量下降怎么处理', level: 2 },
        { id: 'character-sheet', text: '角色设定图专项', level: 2 },
        { id: 'repair', text: '已经裁剪怎么修', level: 2 },
        { id: 'api', text: 'API 批量对接建议', level: 2 },
        { id: 'checklist', text: '交付检查清单', level: 2 },
      ]}
    >
      <Callout tone="tip" title="核心结论">
        <p>
          生图被裁剪通常不是模型“不会画完整”，而是画幅、主体数量、镜头距离和提示词互相冲突。
          先把构图、比例和安全留白写清楚，再追求材质、风格和细节，成功率会明显提高。
        </p>
      </Callout>

      <h2 id="overview">先判断问题类型</h2>
      <p>
        在 <code>agent.gpt88.cc</code> 做海报、电商图、角色设定图或批量素材时，常见问题可以先分成三类。
        只有先判断是哪一类，后面的解决方案才不会跑偏。
      </p>
      <DocTable
        headers={['问题', '表现', '优先处理方式']}
        rows={[
          [
            '生成时就裁剪',
            '人物头顶、脚、手、商品瓶盖、道具或衣摆直接不在画面里。',
            '改提示词里的镜头距离、主体占比、安全留白和画幅比例。',
          ],
          [
            '预览时被裁剪',
            '原图打开是完整的，但网页卡片、朋友圈、店铺后台或视频封面预览切掉边缘。',
            '按最终平台比例重新导出，给预览区域留安全框。',
          ],
          [
            '质量不够',
            '细节糊、文字乱、材质假、人物手脸崩、复杂设定丢失。',
            '减少单张图承载的信息量，提高质量档位，必要时拆分生成再合成。',
          ],
        ]}
      />

      <h2 id="root-cause">问题出现原因分析</h2>
      <p>
        很多生图问题看起来像“模型质量不行”，实际更常见的是任务设计不合理。图片模型需要在固定画布内同时决定主体大小、
        镜头距离、构图重心、背景空间和细节优先级。只要这些约束没有写清楚，模型就会按“视觉冲击力”自动取舍，
        结果往往是主体放大、边缘被切、细节挤压或多视图互相干扰。
      </p>
      <CodeBlock lang="text" filename="root-cause-map" code={CAUSE_ANALYSIS} />
      <DocTable
        headers={['根因', '怎么判断', '为什么会导致问题']}
        rows={[
          [
            '画布比例不匹配',
            '方图里要全身长角色、长条包装、四视图角色表，主体天然放不下。',
            '模型为了让主体清楚，会把主体放大；画布边缘就会先切掉头发、脚、道具或商品边缘。',
          ],
          [
            '镜头语言冲突',
            <span>
              同时出现 <code>close-up</code>、<code>portrait</code>、<code>full body</code>、
              <code>character sheet</code> 这类互相拉扯的词。
            </span>,
            '近景词会推动模型拉近镜头，全身词又要求完整展示，冲突时通常牺牲完整性。',
          ],
          [
            '单张信息过载',
            '一张图里同时要求脸部特写、正面全身、侧面全身、背面全身、复杂材质、道具和背景。',
            '模型会把注意力分散到多个目标，导致每个局部都不够稳定，常见结果是糊、变形、裁边和视图错位。',
          ],
          [
            '质量词替代构图词',
            <span>
              Prompt 里大量写 <code>4K</code>、<code>ultra detailed</code>、<code>cinematic</code>，
              但没有写主体占比和留白。
            </span>,
            '质量词只会强化局部细节，不会自动保证完整构图；细节越密，模型越容易选择更近的镜头。',
          ],
          [
            '生成图和发布图不是同一比例',
            '原图下载后完整，但上传到商品后台、视频封面或社媒卡片后被切。',
            '这是展示容器二次裁剪，不是模型生成失败；需要按最终平台比例重新留安全框。',
          ],
        ]}
      />
      <Callout tone="info" title="先区分两种裁剪">
        <p>
          如果下载原图已经缺头、缺脚、缺商品边缘，这是生成裁剪，要改 prompt 和尺寸。
          如果原图完整但发布后被切，这是展示裁剪，要改最终比例和安全边距。
        </p>
      </Callout>

      <h2 id="crop-causes">为什么会被裁剪</h2>
      <p>
        裁剪问题最常见的根因，是提示词只描述“画什么”，没有描述“怎么放进画面”。模型会自动选择它认为更有冲击力的构图，
        这通常意味着主体更大、更近，也更容易切边。
      </p>
      <DocTable
        headers={['容易踩坑的写法', '为什么会出问题', '建议改法']}
        rows={[
          [
            <code>close-up, full body</code>,
            '近景和全身互相冲突，模型往往优先放大主体。',
            '明确写“中远景，全身完整可见，主体占画面高度约 70%”。',
          ],
          [
            '一张图里塞多个视图、特写、道具和复杂背景',
            '画布空间不够，模型会压缩或裁掉某些部分。',
            '拆成多张图，或明确分栏数量、分栏间距和每栏安全留白。',
          ],
          [
            '只写 4K、超清、极致细节',
            '质量词不能解决构图问题，还会让模型优先画局部细节。',
            '先写构图和安全框，再写材质和细节。',
          ],
          [
            '方图里生成全身长角色或长条商品',
            '主体纵向比例和画布不匹配。',
            '全身角色用竖图，横向设定表用横图，电商主图按平台比例选。',
          ],
        ]}
      />

      <h2 id="safe-area">防裁剪核心写法</h2>
      <p>
        防裁剪不是只加一句“不要裁剪”。更稳定的写法是同时给出主体位置、主体占比、镜头距离和安全留白。
      </p>
      <CodeBlock lang="text" filename="safe-area-prompt" code={SAFE_PROMPT} />
      <p>
        如果你做的是电商商品图，可以直接把“完整主体”和“安全留白”写到主体描述前面。
      </p>
      <CodeBlock lang="text" filename="product-prompt" code={PRODUCT_PROMPT} />
      <Callout tone="warn" title="不要只依赖负面词">
        <p>
          “不要裁剪”是必要的，但不够。模型需要知道主体应该占多大、放在哪里、四周留多少空间。
          只写 negative prompt，通常不如“完整主体 + 中远景 + 70% 占比 + 12% 留白”稳定。
        </p>
      </Callout>

      <h2 id="quality">质量下降怎么处理</h2>
      <p>
        生图质量问题通常来自三个地方：提示词过载、参考图质量差、最终分辨率和任务不匹配。
        不要把所有问题都归因于模型，先用下面这张表排查。
      </p>
      <DocTable
        headers={['质量问题', '常见原因', '解决方案']}
        rows={[
          [
            '细节糊',
            '低分辨率试图承载太多角色、道具和材质。',
            '先拆图，最终图用高质量或原生 4K；复杂材质不要和复杂排版挤在同一张图里。',
          ],
          [
            '人物手脸不稳',
            '多人、多姿势、多视角同时出现，模型一致性压力过大。',
            '单人单视角先生成，再用后期拼版；必要时每个视图单独生成。',
          ],
          [
            '商品结构变形',
            '参考图不清楚，或提示词过度改造商品。',
            '上传清晰参考图，明确“不改变瓶型、包装比例、颜色和标签位置”。',
          ],
          [
            '文字乱码',
            '图片模型不适合承载精确小字排版。',
            '先生成无字底图，再用设计工具或前端模板加文字。',
          ],
          [
            '风格变散',
            '提示词堆了太多风格词，例如国漫、赛博、写实、油画、电影海报同时出现。',
            '只保留一个主风格，材质、光线、镜头作为辅助描述。',
          ],
        ]}
      />

      <h2 id="character-sheet">角色设定图专项</h2>
      <p>
        角色设定图最容易出问题，因为它经常要求一张图里同时出现脸部特写、正视全身、侧视全身、背视全身、材质细节和道具。
        如果没有明确分栏和安全框，模型会把角色放大，导致全身视图被裁切。
      </p>
      <CodeBlock lang="text" filename="character-sheet-prompt" code={CHARACTER_PROMPT} />
      <DocTable
        headers={['目标', '推荐做法', '不建议']}
        rows={[
          [
            '高质量角色设定',
            '先单独生成正视全身，再生成侧视、背视和脸部特写，最后拼版。',
            '一条 prompt 同时要求四视图、复杂材质、复杂背景和极致细节。',
          ],
          [
            '四视图同图',
            '明确 4 个等宽分栏、每栏留白、全身视图高度占 72%。',
            '只写“从左到右排列四个视图”，不写分栏和占比。',
          ],
          [
            '保持不裁剪',
            '写清楚头发、手、脚、衣摆、武器、道具都必须完整可见。',
            '只写“full body”，但同时又写 close-up 或 cinematic portrait。',
          ],
        ]}
      />

      <h2 id="repair">已经裁剪怎么修</h2>
      <p>
        如果图已经生成出来但边缘被切，不一定要完全重跑。先判断是不是还有可修复价值。
      </p>
      <ol>
        <li>如果主体只轻微切边，优先使用扩图 / outpainting，把画布向被裁切方向延展。</li>
        <li>如果头、脸、手、商品 logo 已经变形，建议重生成，不要在错误图上继续修。</li>
        <li>如果只是平台预览裁剪，保留原图，在外层加安全边距或重新排版导出。</li>
        <li>如果是角色设定图某一栏裁剪，单独重做那一栏，再后期拼版。</li>
      </ol>
      <Callout tone="info" title="修图优先级">
        <p>
          轻微切边用扩图，结构错误用重生成，文字和排版问题用后期工具。
          不要把所有修复都交给同一次重绘，否则容易把原本正确的部分也改坏。
        </p>
      </Callout>

      <h2 id="api">API 批量对接建议</h2>
      <p>
        批量生图时，先用 <code>agent.gpt88.cc</code> 手动打样，确认构图模板稳定后，再把同一套提示词迁移到
        <code>img.gpt88.cc</code> 图片专线。API 参数以站内 <Link to="/docs/api/images/">图片 API 文档</Link> 为准。
      </p>
      <CodeBlock lang="bash" filename="safe-image-generation.sh" code={API_SAFE_CURL} />
      <p>
        批量任务不要一开始就跑几十张。先抽 3 张样图，确认不裁剪、比例正确、主体完整，再扩大数量。
      </p>
      <CodeBlock lang="text" filename="batch-checklist" code={BATCH_CHECKLIST} />

      <h2 id="checklist">交付检查清单</h2>
      <DocTable
        headers={['检查项', '通过标准']}
        rows={[
          ['主体完整', '头部、手脚、商品边缘、道具、衣摆、包装标签都没有被切。'],
          ['比例正确', '生成图比例和最终平台比例一致，不依赖平台自动裁剪。'],
          ['安全留白', '主体四周有 10%-15% 可裁切缓冲区。'],
          ['质量足够', '材质、边缘、五官、商品纹理和关键细节经放大检查可用。'],
          ['文字处理', '精确文字、价格、卖点和按钮尽量后期排版，不直接让模型画小字。'],
          ['可复用', '保留 prompt、尺寸、质量档位、样图编号和失败原因，方便批量复现。'],
        ]}
      />
    </DocPage>
  )
}
