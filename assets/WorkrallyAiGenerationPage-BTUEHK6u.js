import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`workrally generate image-models -o json
workrally generate image   --prompt "an orange cat under a cherry tree"   --model <model_id> --aspect-ratio 16:9 --poll

# Reference-image generation
workrally generate image   --prompt "place the first image on the road in the second image"   --model <model_id> --input-images "https://image1,https://image2" --poll`,c=`workrally generate video-models -o json
workrally generate video --prompt "waves on a beach at sunset" --model <provider_id> --poll
workrally generate video --mode FirstLastFrame --prompt "the character walks left to right"   --model <provider_id> --first-frame-url "https://start.png" --last-frame-url "https://end.png" --poll
workrally generate video --mode SubjectToVideo --prompt "the character walks through the scene"   --model <provider_id> --reference-assets '[{"type":"image","url":"https://character.png"}]' --poll`;function l(){return(0,o.jsxs)(a,{path:`/docs/guides/workrally-ai-generation`,title:`WorkRally AI generation guide`,description:`Generate images and videos with dynamic model discovery, three video modes, canvas placeholders and task polling.`,headings:[{id:`rules`,text:`Core rules`,level:2},{id:`image`,text:`Image generation`,level:2},{id:`video`,text:`Video generation`,level:2},{id:`canvas`,text:`Canvas placeholders`,level:2},{id:`tasks`,text:`Task polling`,level:2}],children:[(0,o.jsx)(i,{tone:`danger`,title:`Two rules matter most`,children:(0,o.jsx)(`p`,{children:`Discover model IDs at runtime. URL parameters must point to WorkRally-managed media; upload local or third-party files before using them.`})}),(0,o.jsx)(`h2`,{id:`rules`,children:`Core rules`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[`Run `,(0,o.jsx)(`code`,{children:`workrally generate image-models -o json`}),` before image generation.`]}),(0,o.jsxs)(`li`,{children:[`Run `,(0,o.jsx)(`code`,{children:`workrally generate video-models -o json`}),` before video generation.`]}),(0,o.jsxs)(`li`,{children:[`Do not hard-code `,(0,o.jsx)(`code`,{children:`model_id`}),` or `,(0,o.jsx)(`code`,{children:`provider_id`}),`; availability varies by environment.`]}),(0,o.jsx)(`li`,{children:`Upload files and use the returned managed asset URL rather than passing local paths.`})]}),(0,o.jsx)(`h2`,{id:`image`,children:`Image generation`}),(0,o.jsx)(`p`,{children:`Start with a single prompt and a small output. Add reference images only after the basic generation path works.`}),(0,o.jsx)(r,{lang:`bash`,filename:`image-flow.sh`,code:s}),(0,o.jsx)(`h2`,{id:`video`,children:`Video generation`}),(0,o.jsx)(`p`,{children:`WorkRally exposes text, FirstLastFrame and SubjectToVideo drivers. Choose the mode according to the available anchor assets.`}),(0,o.jsx)(r,{lang:`bash`,filename:`video-flow.sh`,code:c}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`Text:`}),` the model creates the scene from the prompt.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`FirstLastFrame:`}),` the motion is constrained by start and end frames.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{children:`SubjectToVideo:`}),` a reference subject is placed into a generated motion scene.`]})]}),(0,o.jsx)(`h2`,{id:`canvas`,children:`Canvas placeholders`}),(0,o.jsx)(`p`,{children:`Generation can create a placeholder node in the canvas so the output remains connected to the project layout. Treat the canvas update as a separate state change from the generation task.`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Keep the project and canvas IDs explicit.`}),(0,o.jsx)(`li`,{children:`Do not assume a failed generation created a valid node.`}),(0,o.jsx)(`li`,{children:`Use incremental build or delete/overwrite behavior according to the operation.`})]}),(0,o.jsx)(`h2`,{id:`tasks`,children:`Task polling`}),(0,o.jsx)(r,{lang:`bash`,filename:`task-flow.sh`,code:`# Automatic polling
workrally generate image --prompt "..." --model <id> --poll

# Manual lookup
workrally generate task <task_id> -o json
workrally generate task <task_id> --poll`}),(0,o.jsx)(`p`,{children:`Keep the task ID, request parameters and raw response. Poll with a limit, classify queued, running, succeeded and failed states, and do not create duplicate work after a client timeout until the original task is checked.`}),(0,o.jsxs)(`p`,{children:[`For uploads, canvas composition and troubleshooting, continue with the `,(0,o.jsx)(t,{to:`/docs/guides/workrally-overview/`,children:`WorkRally overview`}),`.`]})]})}var u=`# 1. 先拿模型
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
  --poll`,d=`# 先拿视频模型
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
  --poll`,f=`# 自动轮询
workrally generate image --prompt "..." --model <id> --poll

# 手动查询
workrally generate task <task_id> -o json
workrally generate task <task_id> --poll`;function p({title:e,rows:t}){return(0,o.jsxs)(`section`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:[(0,o.jsx)(`div`,{className:`border-b border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-ink-50`,children:e}),(0,o.jsxs)(`table`,{className:`w-full min-w-[38rem] text-left text-sm`,children:[(0,o.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`参数`}),(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`说明`}),(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`重点`})]})}),(0,o.jsx)(`tbody`,{children:t.map((e,t)=>(0,o.jsxs)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:[(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] text-ink-100`,children:e[0]}),(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] text-ink-200`,children:e[1]}),(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] text-ink-200`,children:e[2]})]},e[0]))})]})]})}function m(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/workrally-ai-generation`,title:`WorkRally AI 生成指南`,description:`详细说明 WorkRally 的图片生成、视频生成、三种视频驱动模式、画布自动占位、任务轮询和模型动态获取规则。`,headings:[{id:`rules`,text:`核心规则`,level:2},{id:`image`,text:`图片生成`,level:2},{id:`video`,text:`视频生成`,level:2},{id:`canvas`,text:`画布内自动占位`,level:2},{id:`tasks`,text:`任务轮询`,level:2}],children:[(0,o.jsx)(i,{tone:`danger`,title:`最重要的两条规则`,children:(0,o.jsx)(`p`,{children:`第一，模型 ID 必须动态获取，不能猜。第二，所有 URL 类参数只接受 WorkRally 官方媒资 URL， 本地文件或第三方 URL 要先上传入库。`})}),(0,o.jsx)(`h2`,{id:`rules`,children:`核心规则`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:"生图前先跑 `workrally generate image-models -o json`。"}),(0,o.jsx)(`li`,{children:"生视频前先跑 `workrally generate video-models -o json`。"}),(0,o.jsx)(`li`,{children:"不同环境可用模型不一样，严禁硬编码 `model_id` 或 `provider_id`。"}),(0,o.jsx)(`li`,{children:"传入 `--project-id` 时，这里指的是画布 ID，不是项目 ID。"})]}),(0,o.jsx)(`h2`,{id:`image`,children:`图片生成`}),(0,o.jsx)(`p`,{children:"WorkRally 的图片生成围绕 Kontext 模型展开。除了纯文生图，还支持多参考图输入， 但参考图数量上限由模型动态下发的 `kontext_config.max_input_images` 决定。"}),(0,o.jsx)(r,{lang:`bash`,filename:`image-flow.sh`,code:u}),(0,o.jsx)(p,{title:`图片生成关键参数`,rows:[[`--model`,`从 image-models 返回的 model_id 中选取`,`不能手写猜测值`],[`--input-images`,`逗号分隔的参考图 URL`,`必须是官方媒资 URL`],[`--aspect-ratio`,`宽高比，如 1:1 / 16:9 / 9:16`,`默认 16:9`],[`--resolution`,`分辨率等级，具体看模型支持`,`不同模型支持不同`],[`--count`,`生成数量 1-4`,`count>1 会并发发起多个独立任务`]]}),(0,o.jsx)(`h2`,{id:`video`,children:`视频生成`}),(0,o.jsx)(`p`,{children:"视频生成按驱动模式区分，不是所有模型都支持所有输入类型。你需要先看 `video-models` 返回的 `duration_options`、`resolution_options` 和各种 `max_*_count`。"}),(0,o.jsx)(r,{lang:`bash`,filename:`video-flow.sh`,code:d}),(0,o.jsx)(p,{title:`视频生成三种模式`,rows:[[`Text`,`纯文生视频，或单图驱动视频`,`默认模式，最通用`],[`FirstLastFrame`,`首尾帧驱动`,`至少传首帧或尾帧之一`],[`SubjectToVideo`,`参考主体驱动`,`通过 reference-assets 传素材数组`]]}),(0,o.jsx)(`h2`,{id:`canvas`,children:`画布内自动占位`}),(0,o.jsxs)(`p`,{children:[`当你在 `,(0,o.jsx)(`code`,{children:`generate image`}),` 或 `,(0,o.jsx)(`code`,{children:`generate video`}),` 里传入`,` `,(0,o.jsx)(`code`,{children:`--project-id <画布ID>`}),` `,`时， 系统会自动在画布创建 running 状态的占位节点。这个行为是内建的。`]}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:"不需要再手动 `canvas build-draft` 创建生成器节点。"}),(0,o.jsx)(`li`,{children:`生成完成后，前端会自动刷新节点状态。`}),(0,o.jsx)(`li`,{children:"如果你只是要把“已有素材”摆进画布，才用 `canvas build-draft`。"})]}),(0,o.jsx)(`h2`,{id:`tasks`,children:`任务轮询`}),(0,o.jsx)(r,{lang:`bash`,filename:`task-flow.sh`,code:f}),(0,o.jsx)(`p`,{children:"`--poll` 是最省事的方式。它会自动提交任务、按固定间隔轮询并在完成后输出结果。 如果你要手动追踪任务，则使用 `generate task` 查询状态。"})]}):(0,o.jsx)(l,{})}export{m as default};