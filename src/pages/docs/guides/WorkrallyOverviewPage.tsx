import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const CAPABILITIES = `AI 生图
- Kontext 图片生成
- 多参考图输入
- 画布内自动占位节点

AI 生视频
- Text / FirstLastFrame / SubjectToVideo 三种驱动
- 动态模型与分辨率
- 任务轮询与批量生成

项目与场次
- project / series / shot 全流程 CRUD
- 角色识别、模型配置、结果查询

上传与素材
- upload → asset create → material add 三段式
- 媒资库与资产库分层管理

无限画布
- Yjs 协同
- 8 种节点类型
- build-draft 增量 / 删除 / 覆盖`

const QUICKSTART = `npm install -g workrally
workrally auth login
workrally auth status

# 先看自己要做哪类工作
# 1. 生图 / 生视频 → 先读 AI 生成指南
# 2. 上传素材 → 先读上传与素材管理
# 3. 做场次 / 漫剧 → 先读场次工作流
# 4. 操作画布 → 先读无限画布指南`

const ROUTING = `你要生成图片 / 视频
  读：AI 生成指南

你要上传文件 / 建素材树 / 角色道具场景归档
  读：上传与素材管理指南

你要做剧集 / 场次 / 分镜 / 角色识别 / 批量出图出视频
  读：场次与剧集工作流

你要在无限画布里排版 / 摆素材 / 建画板 / 涂鸦标注
  读：无限画布指南

你已经报错或结果不对
  读：常见坑点与错误排查`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[40rem] text-left text-sm">
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
          {rows.map((row, index) => (
            <tr
              key={index}
              className={
                'border-t border-white/5 align-top' +
                (index % 2 === 1 ? ' bg-white/[0.012]' : '')
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

export default function WorkrallyOverviewPage() {
  return (
    <DocPage
      path="/docs/guides/workrally-overview"
      title="WorkRally Skills 总览"
      description="基于 Tencent/workrally 官方 Skill 与参考文档整理，完整说明 WorkRally CLI 的能力边界、安装方式、场景路由和各专项教程入口。"
      headings={[
        { id: 'what', text: '这套 Skill 是什么', level: 2 },
        { id: 'capabilities', text: '核心能力', level: 2 },
        { id: 'install', text: '安装与接入', level: 2 },
        { id: 'concepts', text: '先建立 4 个关键概念', level: 2 },
        { id: 'pages', text: '专项教程地图', level: 2 },
        { id: 'routing', text: '如何判断先看哪篇', level: 2 },
      ]}
    >
      <Callout tone="info" title="来源说明">
        <p>
          本组页面基于{' '}
          <a href="https://github.com/Tencent/workrally" target="_blank" rel="noreferrer">
            Tencent/workrally
          </a>{' '}
          的官方 Skill、README 与 references 文档整理而成。这里不是逐字搬运，而是面向 gpt88
          文档站做了重组、补充和任务化改写。
        </p>
      </Callout>

      <h2 id="what">这套 Skill 是什么</h2>
      <p>
        WorkRally CLI 是一套面向 AI Agent 的漫剧视频创作工具链。它不是单个“生图命令”，而是把
        <strong>项目</strong>、<strong>剧集</strong>、<strong>场次</strong>、
        <strong>素材上传</strong>、<strong>资产库</strong>、<strong>画布</strong>、
        <strong>AI 生图</strong> 和 <strong>AI 生视频</strong> 串成了完整工作流。
      </p>
      <p>
        从使用者视角看，它解决的是“先有故事和角色，再批量做关键帧、动画、素材管理和画布排版”的问题，
        比单纯的图片 API 或视频 API 更接近生产流。
      </p>

      <h2 id="capabilities">核心能力</h2>
      <CodeBlock lang="text" filename="workrally-capabilities" code={CAPABILITIES} />

      <h2 id="install">安装与接入</h2>
      <CodeBlock lang="bash" filename="quickstart.sh" code={QUICKSTART} />
      <p>
        官方 Skill 的入口是命令行工具 `workrally`。认证完成后，后续所有能力都通过该 CLI
        访问，不需要你自己拼接大量后端接口。
      </p>

      <h2 id="concepts">先建立 4 个关键概念</h2>
      <DocTable
        headers={['概念', '作用', '常见误区']}
        rows={[
          [
            <strong key="p">项目 project</strong>,
            '素材归属的上层容器。所有 asset 都必须属于项目，否则 Web 端不可见。',
            '把项目 ID 当成画布 ID 用。',
          ],
          [
            <strong key="c">画布 canvas</strong>,
            '无限画布空间，用于排版节点、放素材、放画板、文本和涂鸦。',
            '以为 canvas 和 project 是同一个东西。',
          ],
          [
            <strong key="a">媒资库 asset</strong>,
            '项目级文件池。上传完成后必须先入库，后续画布、资产库、生成能力都依赖它。',
            '上传后直接拿 CDN URL 当 asset_id 用。',
          ],
          [
            <strong key="m">资产库 material</strong>,
            '树形组织视图。把人物、道具、场景、网盘目录组织起来。',
            '以为上传文件后会自动出现在角色/道具/场景目录。',
          ],
        ]}
      />

      <h2 id="pages">专项教程地图</h2>
      <ul>
        <li>
          <Link to="/docs/guides/workrally-ai-generation/">AI 生成指南</Link>：
          生图、生视频、画布自动占位、轮询、模型动态获取。
        </li>
        <li>
          <Link to="/docs/guides/workrally-upload-assets/">上传与素材管理</Link>：
          `upload`、`asset create`、`material add` 的三段式流程。
        </li>
        <li>
          <Link to="/docs/guides/workrally-shot-workflow/">场次与剧集工作流</Link>：
          `series`、`shot`、角色识别、模型配置、批量生成和结果查询。
        </li>
        <li>
          <Link to="/docs/guides/workrally-canvas-guide/">无限画布指南</Link>：
          8 种节点类型、画板规则、增量合并、覆盖模式。
        </li>
        <li>
          <Link to="/docs/guides/workrally-common-pitfalls/">常见坑点与错误排查</Link>：
          项目 / 画布混淆、URL 过期、模型硬编码、无效节点等高频问题。
        </li>
      </ul>

      <h2 id="routing">如何判断先看哪篇</h2>
      <CodeBlock lang="text" filename="routing" code={ROUTING} />
    </DocPage>
  )
}
