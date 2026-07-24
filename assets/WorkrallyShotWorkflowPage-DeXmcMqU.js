import{n as e}from"./ui-BNsvkuFE.js";import{t}from"./CodeBlock-6HZkGMv-.js";import{c as n,s as r}from"./index-ivPh6OuT.js";var i=e(),a=`# 1. 创建项目
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
workrally shot get-result --story-id <story_id> --type video --watch`,o=`# 场次专用模型接口
workrally shot image-models -o json    # 取 models[].en_name
workrally shot video-models -o json    # 取 models[].provider

# 推荐写法：用 provider 让 CLI 自动补 mode=9
workrally shot set-model --story-ids st_1,st_2 --video-provider 1 --duration 5 --aspect-ratio 16:9

# 图片模型
workrally shot set-model --story-ids st_1,st_2 --image-model <en_name> --aspect-ratio 16:9`;function s(){return(0,i.jsxs)(n,{path:`/docs/guides/workrally-shot-workflow`,title:`WorkRally 场次与剧集工作流`,description:`详细说明 WorkRally 的 project、series、shot 结构，以及场次创建、角色识别、模型配置、批量生成、结果查询和多场次工作流。`,headings:[{id:`structure`,text:`结构关系`,level:2},{id:`workflow`,text:`标准工作流`,level:2},{id:`models`,text:`场次专用模型配置`,level:2},{id:`recognize`,text:`角色识别`,level:2},{id:`results`,text:`结果查询`,level:2}],children:[(0,i.jsx)(r,{tone:`info`,title:`场次工作流是 WorkRally 的核心`,children:(0,i.jsx)(`p`,{children:"真正把它和普通生图工具拉开差距的，不是单次生成，而是 `project → series → shot` 这条持久化生产线。"})}),(0,i.jsx)(`h2`,{id:`structure`,children:`结构关系`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"项目 `project` 是最上层容器。"}),(0,i.jsx)(`li`,{children:"剧集 `series` 归属项目。"}),(0,i.jsx)(`li`,{children:"场次 `shot` 或 `story` 归属剧集，是图像和动画提示词的核心承载单元。"}),(0,i.jsx)(`li`,{children:"`image_prompt` 决定关键帧画面，`animation_prompt` 决定动效与运镜。"})]}),(0,i.jsx)(`h2`,{id:`workflow`,children:`标准工作流`}),(0,i.jsx)(t,{lang:`bash`,filename:`shot-workflow.sh`,code:a}),(0,i.jsx)(`p`,{children:"如果你是从小说、剧本或故事分镜进入，建议先在外部用 LLM 拆成场景段落，再批量写入 `shot create --json-list`。"}),(0,i.jsx)(`h2`,{id:`models`,children:`场次专用模型配置`}),(0,i.jsx)(r,{tone:`warn`,title:`不要混用 canvas 的模型接口`,children:(0,i.jsx)(`p`,{children:"场次用 `workrally shot image-models / video-models`，不是 `workrally generate image-models / video-models`。 两者返回字段和下游逻辑不一样。"})}),(0,i.jsx)(t,{lang:`bash`,filename:`set-model.sh`,code:o}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"视频推荐用 `--video-provider`，CLI 会自动拼成 `mode=9 + provider`。"}),(0,i.jsx)(`li`,{children:"图片模型从 `models[].en_name` 里选。"}),(0,i.jsx)(`li`,{children:`比例、时长、音效支持都取决于模型动态返回结果。`})]}),(0,i.jsx)(`h2`,{id:`recognize`,children:`角色识别`}),(0,i.jsx)(`p`,{children:"`shot recognize` 会根据 `image_prompt` 和 `animation_prompt` 分别识别角色并写回对应字段。 如果你两个提示词都写了，就会有两路识别结果；只写一路，就只识别那一路。"}),(0,i.jsx)(`h2`,{id:`results`,children:`结果查询`}),(0,i.jsxs)(`p`,{children:["`shot generate-image` 和 `shot generate-video` 只代表“提交成功”，它们不是画布任务轮询模式。 结果查询必须走 ",(0,i.jsx)(`code`,{children:`shot get-result --story-id <id> --type image|video`}),`。`]}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"`state = all_done` 表示该场次该类型已经没有进行中任务。"}),(0,i.jsx)(`li`,{children:"`doing_count`、`done_count`、`failed_count` 可以直接看当前进度。"}),(0,i.jsx)(`li`,{children:"`--watch` 会自动按间隔轮询直到结束。"})]})]})}export{s as default};