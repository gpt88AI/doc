import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const PIPELINE = `产品 CG 标准管线：
1. 产品图 / 草图 / 白模作为锚点
2. 先做关键帧静图
3. 每种镜头单独出图：Hero、材质、拆解、场景
4. 选每镜最稳定的一帧做视频起点
5. 每镜生成 3 到 5 秒动态
6. 最后剪辑成 15 到 30 秒成片`

const FIVE_DIMENSIONS = `提示词五维：
1. 主体：产品本体 + 最多 3 个辅助道具
2. 场景：一个主环境，不要乱换空间
3. 构图：Hero、低角度、俯视、微距先选一种
4. 色彩：主色、辅色、点缀色
5. 材质：金属、玻璃、塑料、皮革、织物要明确`

const SPLIT = `常见镜头拆法：
Hero 图：定产品气质和品牌感
材质特写：定边缘、纹理、反光
功能镜头：定卖点和结构
场景镜头：定使用方式和生活场景
动态镜头：只处理运动，不重做结构`

const CASE_FLOW = `案例：一款蓝牙音箱做 20 秒产品短片
1. 先做 1 张正 Hero 图，锁材质、按键、Logo、比例
2. 再做 2 张材质特写，分别锁金属边框和网布细节
3. 再做 2 张场景图，分别对应桌面使用和客厅氛围
4. 再做 1 张功能拆解图，表现低音单元或接口结构
5. 每张静帧各自生成 3 到 4 秒动态
6. 剪成 建立 - 卖点 - 氛围 - 落版 四段`

const SHOT_OUTPUT = `推荐输出格式：
## 产品基础锚点
- 主体图
- 材质关键词
- 品牌色

## 镜头列表
- 镜头 01：Hero
- 镜头 02：材质特写
- 镜头 03：功能镜头
- 镜头 04：场景镜头
- 镜头 05：落版镜

## 每镜静帧提示词
## 每镜视频提示词
## 剪辑顺序与 BGM 节点`

const FIX_CHECKLIST = `关键帧检查清单：
- Logo 有没有变形
- 边缘有没有融化
- 按键和接口位置有没有漂
- 金属 / 玻璃 / 织物反光是否符合材质
- 背景是不是压过了主体
- 同一批镜头的主色和光线方向是否一致`

function DetailBlock({
  title,
  intro,
  bullets,
}: {
  title: string
  intro: string
  bullets: readonly string[]
}) {
  return (
    <section className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
      <h3 className="text-base font-semibold text-ink-50">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-300">{intro}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-200">
        {bullets.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default function VideoGenerationSkillsProductCgPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-product-cg"
      title="产品 CG 工作流专题"
      description="基于 video-generation-skills 的 brand-ad-cg 模块，详细讲清产品 CG、关键帧重塑、商业级静帧到短视频的生产流程。"
      headings={[
        { id: 'position', text: '什么场景该用产品 CG', level: 2 },
        { id: 'pipeline', text: '标准管线', level: 2 },
        { id: 'split', text: '镜头怎么拆', level: 2 },
        { id: 'prompt', text: '五维提示词法', level: 2 },
        { id: 'case', text: '案例拆解', level: 2 },
        { id: 'delivery', text: '推荐交付结构', level: 2 },
        { id: 'mistakes', text: '商单里最常见的坑', level: 2 },
      ]}
    >
      <Callout tone="info" title="复杂产品不要迷信一步成片">
        <p>
          product-cg 的核心逻辑是关键帧重塑。对汽车、球鞋、耳机、音箱、手机壳这类产品来说，
          先把静帧做对，比直接赌长视频可靠得多。
        </p>
      </Callout>

      <h2 id="position">什么场景该用产品 CG</h2>
      <p>
        当你的目标不是普通详情页，而是更高一级的产品大片、品牌视觉、发售预热片、功能拆解片或高级海报，
        就应该进入产品 CG 思路，而不是继续用普通电商主图流程。
      </p>

      <h2 id="pipeline">标准管线</h2>
      <CodeBlock lang="text" filename="product-cg-pipeline" code={PIPELINE} />
      <DetailBlock
        title="为什么关键帧要先于视频"
        intro="视频模型最擅长处理运动，不擅长在运动过程中重新设计产品结构。"
        bullets={[
          '静帧阶段先锁住 Logo、边缘、材质和结构，视频阶段只负责让它动起来。',
          '如果静帧都没稳定，直接上视频只会把小问题放大成整段废片。',
          '复杂角度、翻转和拆解镜头，优先多做几版关键帧，不要急着生成视频。',
        ]}
      />

      <h2 id="split">镜头怎么拆</h2>
      <CodeBlock lang="text" filename="product-cg-split" code={SPLIT} />
      <ul>
        <li>不要让 Hero 图、材质特写、功能镜头和动态镜头同时在一帧里完成。</li>
        <li>每一类镜头都在解决不同问题，混在一起会让产品结构崩掉。</li>
        <li>复杂翻转、大透视和拆解镜头，优先用草图、白模或关键帧辅助。</li>
      </ul>

      <h2 id="prompt">五维提示词法</h2>
      <CodeBlock lang="text" filename="product-cg-five-dimensions" code={FIVE_DIMENSIONS} />
      <p>
        商业级产品图最怕“什么都想要”。五维法的价值就在于让你知道每一步该控制什么，不让模型乱补。
      </p>
      <DetailBlock
        title="五维法怎么落到实操"
        intro="真正写提示词时，不是五维都平均用力，而是先定主体，再让其他四维为主体服务。"
        bullets={[
          '主体不清时，先删掉多余道具，不要让产品被场景吞掉。',
          '场景只负责交代语境，不负责抢主角；一个主环境通常比三种背景更稳。',
          '构图要先定景别，不要一条提示词里同时要求微距和大场景。',
          '色彩建议固定主色比例，再换点缀色，不要每张图都重新猜配色。',
          '材质词要写可见表现，例如拉丝金属、磨砂塑料、玻璃高光，不要只写高级感。',
        ]}
      />

      <h2 id="case">案例拆解</h2>
      <p>
        下面用一个最常见的 3C 产品场景举例。这个结构可以直接套到耳机、音箱、鼠标、手柄、手机壳等项目里。
      </p>
      <CodeBlock lang="text" filename="product-cg-case" code={CASE_FLOW} />
      <DetailBlock
        title="案例里的关键判断"
        intro="这个案例的重点不是镜头数量，而是先后顺序。"
        bullets={[
          'Hero 图先锁品牌气质，后面所有镜头都要和它同源。',
          '材质特写负责解决“看起来贵不贵”，功能镜头负责解决“为什么值得买”。',
          '场景镜头负责告诉用户“它属于什么生活方式”，不要拿来解释结构。',
          '落版镜通常最简单，但它决定成片是否像真正广告而不是素材拼盘。',
        ]}
      />

      <h2 id="delivery">推荐交付结构</h2>
      <CodeBlock lang="text" filename="product-cg-output" code={SHOT_OUTPUT} />
      <CodeBlock lang="text" filename="product-cg-checklist" code={FIX_CHECKLIST} />

      <h2 id="mistakes">商单里最常见的坑</h2>
      <ul>
        <li>没有先锁产品结构，导致不同镜头里的按键、边缘和 Logo 都不一样。</li>
        <li>想一条长视频同时完成所有卖点，结果每一段都不够稳。</li>
        <li>材质词写得很空，只写高级感、未来感，不写金属、玻璃、皮革的真实反应。</li>
        <li>场景和光影不断切换，整条片子像多个品牌拼出来的。</li>
      </ul>
      <p>
        如果你的目标更偏广告结构和成片节奏，而不是纯产品视觉，可以继续看
        <Link to="/docs/guides/video-generation-skills-tvc-playbook/"> TVC 专题</Link>。
      </p>
    </DocPage>
  )
}
