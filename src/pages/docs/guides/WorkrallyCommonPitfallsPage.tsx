import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const PITFALLS = `1. 把项目 ID 当画布 ID 用
2. 硬编码模型 ID 或 provider
3. 自己拼接前端 URL
4. 画布内生成后又手工 build-draft
5. upload 后没执行 asset create
6. material add 缺 material_id 或 material_detail
7. 往 artboard 里放 text / freehand / generator
8. 给画板子节点设置 extent: "parent"
9. 用 material_id 去查 role get
10. 音视频错误使用 original_url`

const FIX_SAMPLE = `# 错误：上传后直接用 CDN URL 当 asset_id
workrally upload ./file.png -o json

# 正确：必须先入媒资库
workrally upload ./file.png -o json
workrally asset create --url <cdn_url> --project-id <project_id> -o json`

export default function WorkrallyCommonPitfallsPage() {
  return (
    <DocPage
      path="/docs/guides/workrally-common-pitfalls"
      title="WorkRally 常见坑点与错误排查"
      description="汇总 WorkRally CLI 最容易出错的 10 类问题，帮助快速判断项目与画布、上传入库、URL、模型、资产树和节点结构问题。"
      headings={[
        { id: 'list', text: '10 个高频坑点', level: 2 },
        { id: 'common', text: '最常见的 4 类误区', level: 2 },
        { id: 'checks', text: '排查顺序', level: 2 },
      ]}
    >
      <Callout tone="danger" title="先排基本面，再排模型">
        <p>
          WorkRally 的大多数失败，不是模型本身问题，而是 ID、URL、素材归属、节点类型或步骤顺序错了。
        </p>
      </Callout>

      <h2 id="list">10 个高频坑点</h2>
      <CodeBlock lang="text" filename="pitfalls" code={PITFALLS} />

      <h2 id="common">最常见的 4 类误区</h2>
      <ul>
        <li>把 `project list` 里的 ID 用在 `generate image --project-id` 上。</li>
        <li>觉得上传完成就能用了，跳过 `asset create`。</li>
        <li>看到某次模型能用，就把模型 ID 写死在代码里。</li>
        <li>明明是画布自动生成节点，还额外 `build-draft` 一次，导致重复节点。</li>
      </ul>
      <CodeBlock lang="bash" filename="fix-sample.sh" code={FIX_SAMPLE} />

      <h2 id="checks">排查顺序</h2>
      <ol>
        <li>先确认你现在操作的是 `project`、`canvas`、`asset`、`material` 还是 `shot`。</li>
        <li>再确认传入的 ID 是否来自正确的 list / get 命令。</li>
        <li>再确认 URL 是否是 WorkRally 官方媒资 URL，且未过期。</li>
        <li>最后才检查模型、比例、时长、数量和提示词。</li>
      </ol>
      <p>
        如果还是不确定，优先运行 <code>workrally tools describe &lt;tool_name&gt;</code> 看参数 schema，
        或回到对应专项页逐步核对。
      </p>
    </DocPage>
  )
}
