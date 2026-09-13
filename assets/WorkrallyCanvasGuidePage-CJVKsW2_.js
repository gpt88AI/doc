import{n as e}from"./ui-Caz9BZV8.js";import{d as t}from"./Seo-zhKV3POX.js";import{t as n}from"./CodeBlock-D8kfQ6fq.js";import{c as r,l as i}from"./index-DCJmtdkW.js";var a=e(),o=`[
  {
    "id": "board_001", "type": "artboard",
    "position": { "x": 0, "y": 0 }, "data": {},
    "style": { "width": 600, "height": 800 }
  },
  {
    "id": "img_in_board", "type": "image",
    "position": { "x": 20, "y": 20 },
    "data": { "asset": { "id": "asset_abc123" } },
    "style": { "width": 256, "height": 256 },
    "parentId": "board_001"
  }
]`,s=`# Incremental merge
workrally canvas build-draft <canvas_id> --nodes '[...]'

# Delete nodes
workrally canvas build-draft <canvas_id> --delete-node-ids "id1,id2"

# Delete and add in one operation
workrally canvas build-draft <canvas_id> --nodes '[...]' --delete-node-ids "old1"

# Replace the entire canvas
workrally canvas build-draft <canvas_id> --nodes '[...]' --mode overwrite`;function c(){return(0,a.jsxs)(i,{path:`/docs/guides/workrally-canvas-guide`,title:`WorkRally infinite canvas guide`,description:`Understand WorkRally canvas nodes, artboard rules, build-draft merge and overwrite modes, and project/canvas boundaries.`,headings:[{id:`concepts`,text:`Project and canvas boundaries`,level:2},{id:`nodes`,text:`Eight node types`,level:2},{id:`artboard`,text:`Artboard rules`,level:2},{id:`build-draft`,text:`build-draft modes`,level:2}],children:[(0,a.jsx)(r,{tone:`warn`,title:`The most common mistake`,children:(0,a.jsxs)(`p`,{children:[(0,a.jsx)(`code`,{children:`project`}),` and `,(0,a.jsx)(`code`,{children:`canvas`}),` are different. A project owns assets; a canvas is a layout surface. Never interchange their IDs.`]})}),(0,a.jsx)(`h2`,{id:`concepts`,children:`Project and canvas boundaries`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`workrally project list`}),` returns project IDs for `,(0,a.jsx)(`code`,{children:`asset create --project-id`}),`.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`workrally canvas list`}),` returns canvas IDs for `,(0,a.jsx)(`code`,{children:`canvas build-draft`}),` and canvas generation.`]}),(0,a.jsx)(`li`,{children:`A canvas asset usually belongs to a project and also needs a node on the canvas.`})]}),(0,a.jsx)(`h2`,{id:`nodes`,children:`Eight node types`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`image`}),`, `,(0,a.jsx)(`code`,{children:`video`}),`, `,(0,a.jsx)(`code`,{children:`audio`}),`: actual media nodes backed by assets or tasks.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`imageGenerator`}),`, `,(0,a.jsx)(`code`,{children:`videoGenerator`}),`: generation controls, normally created by the system.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`artboard`}),`: a container for image, video and audio children.`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`code`,{children:`text`}),`, `,(0,a.jsx)(`code`,{children:`freehand`}),`: labels and annotations, not artboard children.`]})]}),(0,a.jsx)(`h2`,{id:`artboard`,children:`Artboard rules`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`Artboards can contain only `,(0,a.jsx)(`code`,{children:`image`}),`, `,(0,a.jsx)(`code`,{children:`video`}),` and `,(0,a.jsx)(`code`,{children:`audio`}),` nodes.`]}),(0,a.jsx)(`li`,{children:`Artboards cannot be nested.`}),(0,a.jsxs)(`li`,{children:[`Do not set `,(0,a.jsx)(`code`,{children:`extent: "parent"`}),` on artboard children or dragging can become locked.`]}),(0,a.jsx)(`li`,{children:`If dimensions are omitted, the system supplies default artboard dimensions.`})]}),(0,a.jsx)(n,{lang:`json`,filename:`artboard-example.json`,code:o}),(0,a.jsx)(`h2`,{id:`build-draft`,children:`build-draft modes`}),(0,a.jsx)(n,{lang:`bash`,filename:`build-draft.sh`,code:s}),(0,a.jsx)(`p`,{children:`The default is incremental merge:`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`An existing ID is updated.`}),(0,a.jsx)(`li`,{children:`A new ID is appended.`}),(0,a.jsx)(`li`,{children:`An omitted node remains unchanged.`})]}),(0,a.jsxs)(`p`,{children:[`Use `,(0,a.jsx)(`code`,{children:`overwrite`}),` only when intentionally rebuilding the entire canvas. In collaborative work, prefer incremental updates and explicit node deletion.`]})]})}var l=`[
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
]`,u=`# 增量合并
workrally canvas build-draft <canvas_id> --nodes '[...]'

# 删除节点
workrally canvas build-draft <canvas_id> --delete-node-ids "id1,id2"

# 同时删除 + 新增
workrally canvas build-draft <canvas_id> --nodes '[...]' --delete-node-ids "old1"

# 全量覆盖
workrally canvas build-draft <canvas_id> --nodes '[...]' --mode overwrite`;function d(){return(0,a.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,a.jsxs)(`table`,{className:`w-full min-w-[42rem] text-left text-sm`,children:[(0,a.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`type`}),(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`说明`}),(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`关键字段`}),(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`画板内可用`})]})}),(0,a.jsx)(`tbody`,{children:[[`image`,`图片素材节点`,`asset.id 或 task`,`可放入画板`],[`video`,`视频素材节点`,`asset.id 或 task`,`可放入画板`],[`audio`,`音频素材节点`,`asset.id`,`可放入画板`],[`imageGenerator`,`图片生成器节点`,`通常无需手工创建`,`不可放入画板`],[`videoGenerator`,`视频生成器节点`,`通常无需手工创建`,`不可放入画板`],[`artboard`,`画板容器`,`建议设置 width/height`,`不可嵌套`],[`text`,`文本节点`,`data.text.content`,`不可放入画板`],[`freehand`,`涂鸦节点`,`points + initialSize`,`不可放入画板`]].map((e,t)=>(0,a.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,a.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},e[0]))})]})})}function f(){let{locale:e}=t();return e===`zh`?(0,a.jsxs)(i,{path:`/docs/guides/workrally-canvas-guide`,title:`WorkRally 无限画布指南`,description:`详细说明 WorkRally Infinite Canvas 的节点模型、画板规则、build-draft 增量合并与覆盖模式，以及项目和画布的区别。`,headings:[{id:`concepts`,text:`项目与画布的区别`,level:2},{id:`nodes`,text:`8 种节点类型`,level:2},{id:`artboard`,text:`画板规则`,level:2},{id:`build-draft`,text:`build-draft 操作模式`,level:2}],children:[(0,a.jsx)(r,{tone:`warn`,title:`最容易犯错的地方`,children:(0,a.jsx)(`p`,{children:"`project` 和 `canvas` 不是一个概念。项目是素材归属容器，画布是排版空间。两者 ID 不能混用。"})}),(0,a.jsx)(`h2`,{id:`concepts`,children:`项目与画布的区别`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"`workrally project list` 返回项目 ID，用于 `asset create --project-id`。"}),(0,a.jsx)(`li`,{children:"`workrally canvas list` 返回画布 ID，用于 `canvas build-draft` 和画布内 AI 生成。"}),(0,a.jsx)(`li`,{children:`在画布场景下，素材通常既要关联项目，也要在画布中有节点。`})]}),(0,a.jsx)(`h2`,{id:`nodes`,children:`8 种节点类型`}),(0,a.jsx)(d,{}),(0,a.jsx)(`p`,{children:"其中 `image`、`video`、`audio` 是实际素材节点；`text` 和 `freehand` 是说明与标注节点； `artboard` 是容器；`imageGenerator` 和 `videoGenerator` 通常不需要手工创建。"}),(0,a.jsx)(`h2`,{id:`artboard`,children:`画板规则`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"画板只能承载 `image`、`video`、`audio` 子节点。"}),(0,a.jsx)(`li`,{children:`画板不可嵌套。`}),(0,a.jsx)(`li`,{children:'不要给画板子节点设置 `extent: "parent"`，否则拖拽会被锁死。'}),(0,a.jsx)(`li`,{children:`如果没传尺寸，系统会按默认值补齐画板大小。`})]}),(0,a.jsx)(n,{lang:`json`,filename:`artboard-example.json`,code:l}),(0,a.jsx)(`h2`,{id:`build-draft`,children:`build-draft 操作模式`}),(0,a.jsx)(n,{lang:`bash`,filename:`build-draft.sh`,code:u}),(0,a.jsx)(`p`,{children:`默认模式是增量合并，规则是：`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"相同 `id`：覆盖更新。"}),(0,a.jsx)(`li`,{children:"新 `id`：追加到现有画布。"}),(0,a.jsx)(`li`,{children:`未提及节点：保持不变。`})]}),(0,a.jsx)(`p`,{children:"`overwrite` 只适合你明确要重建整张画布的场景。多人协作时优先用默认的增量模式。"})]}):(0,a.jsx)(c,{})}export{f as default};