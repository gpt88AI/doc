import{n as e}from"./ui-Caz9BZV8.js";import{d as t}from"./Seo-zhKV3POX.js";import{t as n}from"./CodeBlock-D8kfQ6fq.js";import{c as r,l as i}from"./index-DCJmtdkW.js";var a=e(),o=`PROJECT_ID=$(workrally project create "My series" -o json | jq -r '.project_id')
SERIES_ID=$(workrally series create --project-id $PROJECT_ID --name "Episode 1" -o json | jq -r '.series_id')
workrally shot create --series-id $SERIES_ID --json-list '[
  {"image_prompt":"wide ancient courtyard","animation_prompt":"slow push-in"},
  {"image_prompt":"two heroes facing each other","animation_prompt":"push to close-up"}
]'
workrally shot recognize --project-id $PROJECT_ID --series-id $SERIES_ID
workrally shot image-models -o json
workrally shot video-models -o json
workrally shot set-model --series-id $SERIES_ID --video-provider <provider> --duration 5 --aspect-ratio 16:9
STORY_IDS=$(workrally shot list --series-id $SERIES_ID -o json | jq -r '[.story_list[].story_id] | join(",")')
workrally shot generate-image --story-ids "$STORY_IDS"
workrally shot generate-video --story-ids "$STORY_IDS"
workrally shot get-result --story-id <story_id> --type image --watch`;function s(){return(0,a.jsxs)(i,{path:`/docs/guides/workrally-shot-workflow`,title:`WorkRally series and shot workflow`,description:`Create projects, series and shots, recognize characters, configure models, generate batches and query results.`,headings:[{id:`structure`,text:`Structure`,level:2},{id:`workflow`,text:`Standard workflow`,level:2},{id:`models`,text:`Shot-specific model configuration`,level:2},{id:`recognize`,text:`Character recognition`,level:2},{id:`results`,text:`Result queries`,level:2}],children:[(0,a.jsx)(r,{tone:`info`,title:`The shot workflow is WorkRally's core production loop`,children:(0,a.jsxs)(`p`,{children:[`The durable `,(0,a.jsx)(`code`,{children:`project -> series -> shot`}),` structure is what turns individual generations into a repeatable production line.`]})}),(0,a.jsx)(`h2`,{id:`structure`,children:`Structure`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`project`}),` is the top-level container.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`series`}),` belongs to a project.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`shot`}),` or `,(0,a.jsx)(`code`,{children:`story`}),` belongs to a series and carries image and animation prompts.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`image_prompt`}),` defines the keyframe; `,(0,a.jsx)(`code`,{children:`animation_prompt`}),` defines motion and camera movement.`]})]}),(0,a.jsx)(`h2`,{id:`workflow`,children:`Standard workflow`}),(0,a.jsx)(n,{lang:`bash`,filename:`shot-workflow.sh`,code:o}),(0,a.jsxs)(`p`,{children:[`When starting from a novel, script or storyboard, split the story into scene paragraphs first, then write them in batches with `,(0,a.jsx)(`code`,{children:`shot create --json-list`}),`.`]}),(0,a.jsx)(`h2`,{id:`models`,children:`Shot-specific model configuration`}),(0,a.jsx)(r,{tone:`warn`,title:`Do not mix canvas and shot model endpoints`,children:(0,a.jsxs)(`p`,{children:[`Use `,(0,a.jsx)(`code`,{children:`workrally shot image-models`}),` and `,(0,a.jsx)(`code`,{children:`workrally shot video-models`}),` for shots. The generate endpoints return different fields and downstream behavior.`]})}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`Use `,(0,a.jsx)(`code`,{children:`--video-provider`}),`; the CLI derives the required mode and provider configuration.`]}),(0,a.jsxs)(`li`,{children:[`Select image models from the runtime `,(0,a.jsx)(`code`,{children:`models[].en_name`}),` values.`]}),(0,a.jsx)(`li`,{children:`Aspect ratio, duration and audio support come from the current model response.`})]}),(0,a.jsx)(`h2`,{id:`recognize`,children:`Character recognition`}),(0,a.jsxs)(`p`,{children:[(0,a.jsx)(`code`,{children:`shot recognize`}),` reads `,(0,a.jsx)(`code`,{children:`image_prompt`}),` and `,(0,a.jsx)(`code`,{children:`animation_prompt`}),` and writes recognition results back to their corresponding fields. If only one prompt exists, only that path is recognized.`]}),(0,a.jsx)(`h2`,{id:`results`,children:`Result queries`}),(0,a.jsxs)(`p`,{children:[(0,a.jsx)(`code`,{children:`generate-image`}),` and `,(0,a.jsx)(`code`,{children:`generate-video`}),` indicate submission, not completion. Query with `,(0,a.jsx)(`code`,{children:`shot get-result --story-id <id> --type image|video`}),`.`]}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`state = all_done`}),` means no task of that type remains in progress.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`doing_count`}),`, `,(0,a.jsx)(`code`,{children:`done_count`}),` and `,(0,a.jsx)(`code`,{children:`failed_count`}),` show progress.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`--watch`}),` polls at intervals until the task reaches a terminal state.`]})]})]})}var c=`# 1. 创建项目
PROJECT_ID=$(workrally project create "我的短番" -o json | jq -r '.project_id')

# 2. 创建剧集
SERIES_ID=$(workrally series create --project-id $PROJECT_ID --name "第一集" -o json | jq -r '.series_id')

# 3. 批量创建场次
workrally shot create --series-id $SERIES_ID --json-list '[
  {"image_prompt":"古风庭院全景","animation_prompt":"镜头缓推"},
  {"image_prompt":"两位侠客对峙","animation_prompt":"推近脸部特写"}
]'

# 4. 识别角色
workrally shot recognize --project-id $PROJECT_ID --series-id $SERIES_ID

# 5. 配置模型
workrally shot image-models -o json
workrally shot video-models -o json
workrally shot set-model --series-id $SERIES_ID --video-provider <N> --duration 5 --aspect-ratio 16:9

# 6. 批量生成
STORY_IDS=$(workrally shot list --series-id $SERIES_ID -o json | jq -r '[.story_list[].story_id] | join(",")')
workrally shot generate-image --story-ids "$STORY_IDS"
workrally shot generate-video --story-ids "$STORY_IDS"

# 7. 按场次查结果
workrally shot get-result --story-id <story_id> --type image --watch
workrally shot get-result --story-id <story_id> --type video --watch`,l=`# 场次专用模型接口
workrally shot image-models -o json    # 取 models[].en_name
workrally shot video-models -o json    # 取 models[].provider

# 推荐写法：用 provider 让 CLI 自动补 mode=9
workrally shot set-model --story-ids st_1,st_2 --video-provider 1 --duration 5 --aspect-ratio 16:9

# 图片模型
workrally shot set-model --story-ids st_1,st_2 --image-model <en_name> --aspect-ratio 16:9`;function u(){let{locale:e}=t();return e===`zh`?(0,a.jsxs)(i,{path:`/docs/guides/workrally-shot-workflow`,title:`WorkRally 场次与剧集工作流`,description:`详细说明 WorkRally 的 project、series、shot 结构，以及场次创建、角色识别、模型配置、批量生成、结果查询和多场次工作流。`,headings:[{id:`structure`,text:`结构关系`,level:2},{id:`workflow`,text:`标准工作流`,level:2},{id:`models`,text:`场次专用模型配置`,level:2},{id:`recognize`,text:`角色识别`,level:2},{id:`results`,text:`结果查询`,level:2}],children:[(0,a.jsx)(r,{tone:`info`,title:`场次工作流是 WorkRally 的核心`,children:(0,a.jsx)(`p`,{children:"真正把它和普通生图工具拉开差距的，不是单次生成，而是 `project → series → shot` 这条持久化生产线。"})}),(0,a.jsx)(`h2`,{id:`structure`,children:`结构关系`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"项目 `project` 是最上层容器。"}),(0,a.jsx)(`li`,{children:"剧集 `series` 归属项目。"}),(0,a.jsx)(`li`,{children:"场次 `shot` 或 `story` 归属剧集，是图像和动画提示词的核心承载单元。"}),(0,a.jsx)(`li`,{children:"`image_prompt` 决定关键帧画面，`animation_prompt` 决定动效与运镜。"})]}),(0,a.jsx)(`h2`,{id:`workflow`,children:`标准工作流`}),(0,a.jsx)(n,{lang:`bash`,filename:`shot-workflow.sh`,code:c}),(0,a.jsx)(`p`,{children:"如果你是从小说、剧本或故事分镜进入，建议先在外部用 LLM 拆成场景段落，再批量写入 `shot create --json-list`。"}),(0,a.jsx)(`h2`,{id:`models`,children:`场次专用模型配置`}),(0,a.jsx)(r,{tone:`warn`,title:`不要混用 canvas 的模型接口`,children:(0,a.jsx)(`p`,{children:"场次用 `workrally shot image-models / video-models`，不是 `workrally generate image-models / video-models`。 两者返回字段和下游逻辑不一样。"})}),(0,a.jsx)(n,{lang:`bash`,filename:`set-model.sh`,code:l}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"视频推荐用 `--video-provider`，CLI 会自动拼成 `mode=9 + provider`。"}),(0,a.jsx)(`li`,{children:"图片模型从 `models[].en_name` 里选。"}),(0,a.jsx)(`li`,{children:`比例、时长、音效支持都取决于模型动态返回结果。`})]}),(0,a.jsx)(`h2`,{id:`recognize`,children:`角色识别`}),(0,a.jsx)(`p`,{children:"`shot recognize` 会根据 `image_prompt` 和 `animation_prompt` 分别识别角色并写回对应字段。 如果你两个提示词都写了，就会有两路识别结果；只写一路，就只识别那一路。"}),(0,a.jsx)(`h2`,{id:`results`,children:`结果查询`}),(0,a.jsxs)(`p`,{children:["`shot generate-image` 和 `shot generate-video` 只代表“提交成功”，它们不是画布任务轮询模式。 结果查询必须走 ",(0,a.jsx)(`code`,{children:`shot get-result --story-id <id> --type image|video`}),`。`]}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"`state = all_done` 表示该场次该类型已经没有进行中任务。"}),(0,a.jsx)(`li`,{children:"`doing_count`、`done_count`、`failed_count` 可以直接看当前进度。"}),(0,a.jsx)(`li`,{children:"`--watch` 会自动按间隔轮询直到结束。"})]})]}):(0,a.jsx)(s,{})}export{u as default};