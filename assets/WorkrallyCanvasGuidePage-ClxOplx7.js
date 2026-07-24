import{n as e}from"./ui-BNsvkuFE.js";import{t}from"./CodeBlock-6HZkGMv-.js";import{c as n,s as r}from"./index-ivPh6OuT.js";var i=e(),a=`[
  {
    "id": "board_001",
    "type": "artboard",
    "position": { "x": 0, "y": 0 },
    "data": {},
    "style": { "width": 600, "height": 800 }
  },
  {
    "id": "img_in_board",
    "type": "image",
    "position": { "x": 20, "y": 20 },
    "data": { "asset": { "id": "asset_abc123" } },
    "style": { "width": 256, "height": 256 },
    "parentId": "board_001"
  }
]`,o=`# 增量合并
workrally canvas build-draft <canvas_id> --nodes '[...]'

# 删除节点
workrally canvas build-draft <canvas_id> --delete-node-ids "id1,id2"

# 同时删除 + 新增
workrally canvas build-draft <canvas_id> --nodes '[...]' --delete-node-ids "old1"

# 全量覆盖
workrally canvas build-draft <canvas_id> --nodes '[...]' --mode overwrite`;function s(){return(0,i.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,i.jsxs)(`table`,{className:`w-full min-w-[42rem] text-left text-sm`,children:[(0,i.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,i.jsxs)(`tr`,{children:[(0,i.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`type`}),(0,i.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`说明`}),(0,i.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`关键字段`}),(0,i.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`画板内可用`})]})}),(0,i.jsx)(`tbody`,{children:[[`image`,`图片素材节点`,`asset.id 或 task`,`可放入画板`],[`video`,`视频素材节点`,`asset.id 或 task`,`可放入画板`],[`audio`,`音频素材节点`,`asset.id`,`可放入画板`],[`imageGenerator`,`图片生成器节点`,`通常无需手工创建`,`不可放入画板`],[`videoGenerator`,`视频生成器节点`,`通常无需手工创建`,`不可放入画板`],[`artboard`,`画板容器`,`建议设置 width/height`,`不可嵌套`],[`text`,`文本节点`,`data.text.content`,`不可放入画板`],[`freehand`,`涂鸦节点`,`points + initialSize`,`不可放入画板`]].map((e,t)=>(0,i.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,i.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},e[0]))})]})})}function c(){return(0,i.jsxs)(n,{path:`/docs/guides/workrally-canvas-guide`,title:`WorkRally 无限画布指南`,description:`详细说明 WorkRally Infinite Canvas 的节点模型、画板规则、build-draft 增量合并与覆盖模式，以及项目和画布的区别。`,headings:[{id:`concepts`,text:`项目与画布的区别`,level:2},{id:`nodes`,text:`8 种节点类型`,level:2},{id:`artboard`,text:`画板规则`,level:2},{id:`build-draft`,text:`build-draft 操作模式`,level:2}],children:[(0,i.jsx)(r,{tone:`warn`,title:`最容易犯错的地方`,children:(0,i.jsx)(`p`,{children:"`project` 和 `canvas` 不是一个概念。项目是素材归属容器，画布是排版空间。两者 ID 不能混用。"})}),(0,i.jsx)(`h2`,{id:`concepts`,children:`项目与画布的区别`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"`workrally project list` 返回项目 ID，用于 `asset create --project-id`。"}),(0,i.jsx)(`li`,{children:"`workrally canvas list` 返回画布 ID，用于 `canvas build-draft` 和画布内 AI 生成。"}),(0,i.jsx)(`li`,{children:`在画布场景下，素材通常既要关联项目，也要在画布中有节点。`})]}),(0,i.jsx)(`h2`,{id:`nodes`,children:`8 种节点类型`}),(0,i.jsx)(s,{}),(0,i.jsx)(`p`,{children:"其中 `image`、`video`、`audio` 是实际素材节点；`text` 和 `freehand` 是说明与标注节点； `artboard` 是容器；`imageGenerator` 和 `videoGenerator` 通常不需要手工创建。"}),(0,i.jsx)(`h2`,{id:`artboard`,children:`画板规则`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"画板只能承载 `image`、`video`、`audio` 子节点。"}),(0,i.jsx)(`li`,{children:`画板不可嵌套。`}),(0,i.jsx)(`li`,{children:'不要给画板子节点设置 `extent: "parent"`，否则拖拽会被锁死。'}),(0,i.jsx)(`li`,{children:`如果没传尺寸，系统会按默认值补齐画板大小。`})]}),(0,i.jsx)(t,{lang:`json`,filename:`artboard-example.json`,code:a}),(0,i.jsx)(`h2`,{id:`build-draft`,children:`build-draft 操作模式`}),(0,i.jsx)(t,{lang:`bash`,filename:`build-draft.sh`,code:o}),(0,i.jsx)(`p`,{children:`默认模式是增量合并，规则是：`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"相同 `id`：覆盖更新。"}),(0,i.jsx)(`li`,{children:"新 `id`：追加到现有画布。"}),(0,i.jsx)(`li`,{children:`未提及节点：保持不变。`})]}),(0,i.jsx)(`p`,{children:"`overwrite` 只适合你明确要重建整张画布的场景。多人协作时优先用默认的增量模式。"})]})}export{c as default};