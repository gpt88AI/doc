import{n as e}from"./ui-BNsvkuFE.js";import{t}from"./CodeBlock-6HZkGMv-.js";import{c as n,s as r}from"./index-ivPh6OuT.js";var i=e(),a=`# Step 1: 上传到 CDN
workrally upload ./character.png -o json

# Step 2: 入媒资库（必须）
workrally asset create --url <cdn_url> --project-id <project_id> -o json

# Step 3: 挂载到资产库（按需）
workrally material add --json-list '[{
  "material_id": "<asset_id>",
  "material_name": "角色名_状态",
  "material_type": 2,
  "parent_id": "<parent_id>",
  "material_detail": <asset_details>
}]' --project-ids <project_id>`,o=`# 上传并摆进画布
workrally upload ./file.png -o json
workrally asset create --url <cdn_url> --project-id <project_id> -o json
workrally canvas build-draft <canvas_id> --nodes '[
  {
    "id":"node1",
    "type":"image",
    "position":{"x":0,"y":0},
    "data":{"asset":{"id":"<asset_id>"}},
    "style":{"width":512,"height":512}
  }
]'`;function s(){return(0,i.jsxs)(n,{path:`/docs/guides/workrally-upload-assets`,title:`WorkRally 上传与素材管理`,description:`详细说明 WorkRally 的 upload、asset、material 三层素材体系，以及上传入库、角色/道具/场景归档和画布用图流程。`,headings:[{id:`systems`,text:`两套素材体系`,level:2},{id:`flow`,text:`标准三步上传流程`,level:2},{id:`when`,text:`什么时候需要几步`,level:2},{id:`canvas`,text:`画布场景怎么上传`,level:2}],children:[(0,i.jsx)(r,{tone:`danger`,title:`上传不等于可用`,children:(0,i.jsx)(`p`,{children:"`upload` 只是把文件传到 CDN。只有执行 `asset create` 入媒资库后，系统才真正认识这份素材。"})}),(0,i.jsx)(`h2`,{id:`systems`,children:`两套素材体系`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsxs)(`li`,{children:[(0,i.jsx)(`strong`,{children:`媒资库 asset`}),`：项目级文件池，所有素材都必须先进这里。`]}),(0,i.jsxs)(`li`,{children:[(0,i.jsx)(`strong`,{children:`资产库 material`}),`：树形目录视图，用来管理人物、道具、场景和网盘文件夹。`]})]}),(0,i.jsx)(`p`,{children:`换句话说，asset 解决“系统能否使用”，material 解决“人怎么组织和查找”。`}),(0,i.jsx)(`h2`,{id:`flow`,children:`标准三步上传流程`}),(0,i.jsx)(t,{lang:`bash`,filename:`upload-flow.sh`,code:a}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:`步骤 1 返回 CDN URL。`}),(0,i.jsx)(`li`,{children:"步骤 2 返回 `asset_id` 和完整 `asset_details`。"}),(0,i.jsx)(`li`,{children:`步骤 3 只有在你要挂进角色、道具、场景或文件夹时才需要。`})]}),(0,i.jsx)(`p`,{children:"注意：`material add` 的 JSON 里必须同时有 `material_id = asset_id` 和完整 `material_detail = asset_details`，缺任意一个都会导致素材不显示。"}),(0,i.jsx)(`h2`,{id:`when`,children:`什么时候需要几步`}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:"“上传文件”或“上传图片”：`upload → asset create` 两步。"}),(0,i.jsx)(`li`,{children:`“上传到角色 / 道具 / 场景”：三步全走。`}),(0,i.jsx)(`li`,{children:"“把已有媒资挂到资产库”：只做 `material add`。"}),(0,i.jsx)(`li`,{children:"“把素材摆进画布”：入媒资库后，再用 `canvas build-draft`。"})]}),(0,i.jsx)(`h2`,{id:`canvas`,children:`画布场景怎么上传`}),(0,i.jsx)(t,{lang:`bash`,filename:`canvas-upload.sh`,code:o}),(0,i.jsx)(`p`,{children:"这里同时出现两个 ID：`project_id` 是素材归属，`canvas_id` 是节点摆放位置。两者都需要。"})]})}export{s as default};