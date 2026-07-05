import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const IMAGE_FLOW = `# 1. 先拿模型
workrally generate image-models -o json

# 2. 纯文生图
workrally generate image \\
  --prompt "一只橘猫坐在樱花树下" \\
  --model <model_id> \\
  --aspect-ratio 16:9 \\
  --poll

# 3. 参考图生图
workrally generate image \\
  --prompt "第一张图片趴在第二张图片路中间" \\
  --model <model_id> \\
  --input-images "https://image1,https://image2" \\
  --poll`

const VIDEO_FLOW = `# 先拿视频模型
workrally generate video-models -o json

# Text 模式
workrally generate video \\
  --prompt "夕阳下海浪拍打沙滩" \\
  --model <provider_id> \\
  --poll

# FirstLastFrame 模式
workrally generate video \\
  --mode FirstLastFrame \\
  --prompt "角色从左走到右" \\
  --model <provider_id> \\
  --first-frame-url "https://start.png" \\
  --last-frame-url "https://end.png" \\
  --poll

# SubjectToVideo 模式
workrally generate video \\
  --mode SubjectToVideo \\
  --prompt "角色在场景中行走" \\
  --model <provider_id> \\
  --reference-assets '[{"type":"image","url":"https://character.png"}]' \\
  --poll`

const TASK_FLOW = `# 自动轮询
workrally generate image --prompt "..." --model <id> --poll

# 手动查询
workrally generate task <task_id> -o json
workrally generate task <task_id> --poll`

function ParamTable({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string, string]>
}) {
  return (
    <section className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <div className="border-b border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-ink-50">
        {title}
      </div>
      <table className="w-full min-w-[38rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            <th className="px-4 py-2.5 font-medium">参数</th>
            <th className="px-4 py-2.5 font-medium">说明</th>
            <th className="px-4 py-2.5 font-medium">重点</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row[0]}
              className={
                'border-t border-white/5 align-top' +
                (index % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              <td className="px-4 py-3 text-[13px] text-ink-100">{row[0]}</td>
              <td className="px-4 py-3 text-[13px] text-ink-200">{row[1]}</td>
              <td className="px-4 py-3 text-[13px] text-ink-200">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default function WorkrallyAiGenerationPage() {
  return (
    <DocPage
      path="/docs/guides/workrally-ai-generation"
      title="WorkRally AI 生成指南"
      description="详细说明 WorkRally 的图片生成、视频生成、三种视频驱动模式、画布自动占位、任务轮询和模型动态获取规则。"
      headings={[
        { id: 'rules', text: '核心规则', level: 2 },
        { id: 'image', text: '图片生成', level: 2 },
        { id: 'video', text: '视频生成', level: 2 },
        { id: 'canvas', text: '画布内自动占位', level: 2 },
        { id: 'tasks', text: '任务轮询', level: 2 },
      ]}
    >
      <Callout tone="danger" title="最重要的两条规则">
        <p>
          第一，模型 ID 必须动态获取，不能猜。第二，所有 URL 类参数只接受 WorkRally 官方媒资 URL，
          本地文件或第三方 URL 要先上传入库。
        </p>
      </Callout>

      <h2 id="rules">核心规则</h2>
      <ul>
        <li>生图前先跑 `workrally generate image-models -o json`。</li>
        <li>生视频前先跑 `workrally generate video-models -o json`。</li>
        <li>不同环境可用模型不一样，严禁硬编码 `model_id` 或 `provider_id`。</li>
        <li>传入 `--project-id` 时，这里指的是画布 ID，不是项目 ID。</li>
      </ul>

      <h2 id="image">图片生成</h2>
      <p>
        WorkRally 的图片生成围绕 Kontext 模型展开。除了纯文生图，还支持多参考图输入，
        但参考图数量上限由模型动态下发的 `kontext_config.max_input_images` 决定。
      </p>
      <CodeBlock lang="bash" filename="image-flow.sh" code={IMAGE_FLOW} />
      <ParamTable
        title="图片生成关键参数"
        rows={[
          ['--model', '从 image-models 返回的 model_id 中选取', '不能手写猜测值'],
          ['--input-images', '逗号分隔的参考图 URL', '必须是官方媒资 URL'],
          ['--aspect-ratio', '宽高比，如 1:1 / 16:9 / 9:16', '默认 16:9'],
          ['--resolution', '分辨率等级，具体看模型支持', '不同模型支持不同'],
          ['--count', '生成数量 1-4', 'count>1 会并发发起多个独立任务'],
        ]}
      />

      <h2 id="video">视频生成</h2>
      <p>
        视频生成按驱动模式区分，不是所有模型都支持所有输入类型。你需要先看 `video-models`
        返回的 `duration_options`、`resolution_options` 和各种 `max_*_count`。
      </p>
      <CodeBlock lang="bash" filename="video-flow.sh" code={VIDEO_FLOW} />
      <ParamTable
        title="视频生成三种模式"
        rows={[
          ['Text', '纯文生视频，或单图驱动视频', '默认模式，最通用'],
          ['FirstLastFrame', '首尾帧驱动', '至少传首帧或尾帧之一'],
          ['SubjectToVideo', '参考主体驱动', '通过 reference-assets 传素材数组'],
        ]}
      />

      <h2 id="canvas">画布内自动占位</h2>
      <p>
        当你在 <code>generate image</code> 或 <code>generate video</code> 里传入
        {' '}<code>--project-id &lt;画布ID&gt;</code>{' '}
        时，
        系统会自动在画布创建 running 状态的占位节点。这个行为是内建的。
      </p>
      <ul>
        <li>不需要再手动 `canvas build-draft` 创建生成器节点。</li>
        <li>生成完成后，前端会自动刷新节点状态。</li>
        <li>如果你只是要把“已有素材”摆进画布，才用 `canvas build-draft`。</li>
      </ul>

      <h2 id="tasks">任务轮询</h2>
      <CodeBlock lang="bash" filename="task-flow.sh" code={TASK_FLOW} />
      <p>
        `--poll` 是最省事的方式。它会自动提交任务、按固定间隔轮询并在完成后输出结果。
        如果你要手动追踪任务，则使用 `generate task` 查询状态。
      </p>
    </DocPage>
  )
}
