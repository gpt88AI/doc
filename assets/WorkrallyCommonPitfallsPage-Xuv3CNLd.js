import{n as e}from"./ui-Caz9BZV8.js";import{d as t}from"./Seo-zhKV3POX.js";import{t as n}from"./CodeBlock-D8kfQ6fq.js";import{c as r,l as i}from"./index-DCJmtdkW.js";var a=e(),o=`1. Using a project ID as a canvas ID
2. Hard-coding a model ID or provider
3. Constructing frontend URLs by hand
4. Calling build-draft again after canvas generation already created a node
5. Skipping asset create after upload
6. Omitting material_id or material_detail from material add
7. Putting text, freehand or generator nodes inside an artboard
8. Setting extent: "parent" on artboard children
9. Using material_id with role get
10. Using original_url for audio/video operations`;function s(){return(0,a.jsxs)(i,{path:`/docs/guides/workrally-common-pitfalls`,title:`WorkRally common pitfalls and troubleshooting`,description:`Diagnose the most common WorkRally CLI failures involving projects, canvases, uploads, URLs, models, materials and node structure.`,headings:[{id:`list`,text:`Ten frequent pitfalls`,level:2},{id:`common`,text:`Four recurring mistakes`,level:2},{id:`checks`,text:`Troubleshooting order`,level:2}],children:[(0,a.jsx)(r,{tone:`danger`,title:`Check identifiers and ownership before blaming the model`,children:(0,a.jsx)(`p`,{children:`Most WorkRally failures come from IDs, URLs, asset ownership, node types or step order rather than from the model.`})}),(0,a.jsx)(`h2`,{id:`list`,children:`Ten frequent pitfalls`}),(0,a.jsx)(n,{lang:`text`,filename:`pitfalls`,code:o}),(0,a.jsx)(`h2`,{id:`common`,children:`Four recurring mistakes`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`Using an ID from `,(0,a.jsx)(`code`,{children:`project list`}),` where a canvas ID is required.`]}),(0,a.jsxs)(`li`,{children:[`Assuming upload is enough and skipping `,(0,a.jsx)(`code`,{children:`asset create`}),`.`]}),(0,a.jsx)(`li`,{children:`Hard-coding a model because it worked in one environment.`}),(0,a.jsxs)(`li`,{children:[`Adding a second `,(0,a.jsx)(`code`,{children:`build-draft`}),` after automatic generation already created the node.`]})]}),(0,a.jsx)(n,{lang:`bash`,filename:`fix-upload.sh`,code:`# Wrong: stop after upload
workrally upload ./file.png -o json

# Correct: ingest the returned URL as a project asset
workrally upload ./file.png -o json
workrally asset create --url <cdn_url> --project-id <project_id> -o json`}),(0,a.jsx)(`h2`,{id:`checks`,children:`Troubleshooting order`}),(0,a.jsxs)(`ol`,{children:[(0,a.jsx)(`li`,{children:`Identify whether the operation is for a project, canvas, asset, material or shot.`}),(0,a.jsx)(`li`,{children:`Confirm that every ID came from the matching list or get command.`}),(0,a.jsx)(`li`,{children:`Confirm the URL is a current WorkRally-managed media URL.`}),(0,a.jsx)(`li`,{children:`Only then inspect model, aspect ratio, duration, count and prompt.`})]}),(0,a.jsxs)(`p`,{children:[`When uncertain, run `,(0,a.jsx)(`code`,{children:`workrally tools describe <tool_name>`}),` to inspect the current schema, then compare the request with the relevant focused guide.`]})]})}var c=`1. 把项目 ID 当画布 ID 用
2. 硬编码模型 ID 或 provider
3. 自己拼接前端 URL
4. 画布内生成后又手工 build-draft
5. upload 后没执行 asset create
6. material add 缺 material_id 或 material_detail
7. 往 artboard 里放 text / freehand / generator
8. 给画板子节点设置 extent: "parent"
9. 用 material_id 去查 role get
10. 音视频错误使用 original_url`,l=`# 错误：上传后直接用 CDN URL 当 asset_id
workrally upload ./file.png -o json

# 正确：必须先入媒资库
workrally upload ./file.png -o json
workrally asset create --url <cdn_url> --project-id <project_id> -o json`;function u(){let{locale:e}=t();return e===`zh`?(0,a.jsxs)(i,{path:`/docs/guides/workrally-common-pitfalls`,title:`WorkRally 常见坑点与错误排查`,description:`汇总 WorkRally CLI 最容易出错的 10 类问题，帮助快速判断项目与画布、上传入库、URL、模型、资产树和节点结构问题。`,headings:[{id:`list`,text:`10 个高频坑点`,level:2},{id:`common`,text:`最常见的 4 类误区`,level:2},{id:`checks`,text:`排查顺序`,level:2}],children:[(0,a.jsx)(r,{tone:`danger`,title:`先排基本面，再排模型`,children:(0,a.jsx)(`p`,{children:`WorkRally 的大多数失败，不是模型本身问题，而是 ID、URL、素材归属、节点类型或步骤顺序错了。`})}),(0,a.jsx)(`h2`,{id:`list`,children:`10 个高频坑点`}),(0,a.jsx)(n,{lang:`text`,filename:`pitfalls`,code:c}),(0,a.jsx)(`h2`,{id:`common`,children:`最常见的 4 类误区`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:"把 `project list` 里的 ID 用在 `generate image --project-id` 上。"}),(0,a.jsx)(`li`,{children:"觉得上传完成就能用了，跳过 `asset create`。"}),(0,a.jsx)(`li`,{children:`看到某次模型能用，就把模型 ID 写死在代码里。`}),(0,a.jsx)(`li`,{children:"明明是画布自动生成节点，还额外 `build-draft` 一次，导致重复节点。"})]}),(0,a.jsx)(n,{lang:`bash`,filename:`fix-sample.sh`,code:l}),(0,a.jsx)(`h2`,{id:`checks`,children:`排查顺序`}),(0,a.jsxs)(`ol`,{children:[(0,a.jsx)(`li`,{children:"先确认你现在操作的是 `project`、`canvas`、`asset`、`material` 还是 `shot`。"}),(0,a.jsx)(`li`,{children:`再确认传入的 ID 是否来自正确的 list / get 命令。`}),(0,a.jsx)(`li`,{children:`再确认 URL 是否是 WorkRally 官方媒资 URL，且未过期。`}),(0,a.jsx)(`li`,{children:`最后才检查模型、比例、时长、数量和提示词。`})]}),(0,a.jsxs)(`p`,{children:[`如果还是不确定，优先运行 `,(0,a.jsx)(`code`,{children:`workrally tools describe <tool_name>`}),` 看参数 schema， 或回到对应专项页逐步核对。`]})]}):(0,a.jsx)(s,{})}export{u as default};