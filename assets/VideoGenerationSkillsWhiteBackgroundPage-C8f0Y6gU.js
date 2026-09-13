import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`1. Start with a clean white-background product image
2. Lock product proportions, material, and main angle
3. Expand it into 3-5 lifestyle scene images
4. Derive detail-page panels, posters, and video first frames
5. Turn selected frames into 3-5 second clips
6. Batch-vary scenes, props, and copy directions last`,c=`Taobao / Tmall: clear hero image, strong benefit, restrained background
Amazon: structured layout, modular benefits, more comparison panels
Xiaohongshu / Douyin: lifestyle, identification, and human context
TikTok Shop: a strong first-frame hook and direct action`,l=`Keep the original product proportions, material, and control layout unchanged.
Place it on a warm wooden sideboard in a sunlit living room.
Use afternoon side light, a slightly blurred plant in the foreground,
and leave clean copy space on the right.`,u=`1. Hero image
2. Lifestyle scene image
3. Detail-page module
4. Advertising poster
5. Short-video first frame`,d=`- Product proportions remain unchanged
- Edges are not melted
- Material and color stay consistent
- Copy space is large enough
- The scene supports the product instead of competing with it
- Color temperature and composition language match across the batch`;function f(){return(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-white-background-scaling`,title:`White-Background Product Image Scaling`,description:`Learn how to turn a clean product image into lifestyle scenes, detail-page assets, video first frames, and scalable advertising variations.`,headings:[{id:`why`,text:`Why white-background images scale well`,level:2},{id:`flow`,text:`Standard flow`,level:2},{id:`platform`,text:`Adapt assets to each platform`,level:2},{id:`prompt`,text:`Scene-generation prompt structure`,level:2},{id:`assets`,text:`Recommended asset set`,level:2},{id:`steps`,text:`Step-by-step execution`,level:2},{id:`mistakes`,text:`Common failure points`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`The white-background image is an asset starting point`,children:(0,o.jsx)(`p`,{children:`A clean product image has little background noise, so proportions, structure, material, and color can become stable anchors for the rest of the SKU asset pool.`})}),(0,o.jsx)(`h2`,{id:`why`,children:`Why white-background images scale well`}),(0,o.jsx)(`p`,{children:`The product is already isolated from competing visual information. That makes it easier to preserve geometry while changing the scene, light, props, and copy space for different channels.`}),(0,o.jsx)(`h2`,{id:`flow`,children:`Standard flow`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-flow`,code:s}),(0,o.jsx)(`p`,{children:`Do not jump directly from a white-background image to a full advertisement. Validate a small set of lifestyle stills first, then expand the approved visual language into video and batch variants.`}),(0,o.jsx)(`h2`,{id:`platform`,children:`Adapt assets to each platform`}),(0,o.jsx)(r,{lang:`text`,filename:`platform-split`,code:c}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`One product should not use one identical image set across every channel.`}),(0,o.jsx)(`li`,{children:`Conversion-focused channels prioritise clarity; content channels prioritise atmosphere and identification.`}),(0,o.jsx)(`li`,{children:`For TikTok Shop, the first-frame hook and direct action often matter more than static layout.`})]}),(0,o.jsx)(`h2`,{id:`prompt`,children:`Scene-generation prompt structure`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-prompt`,code:l}),(0,o.jsx)(`p`,{children:`Repeat the constraint that the product structure stays unchanged. Scene, light, and copy space may change; the SKU should not look redrawn in every variation.`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`State the preservation constraint before describing the new scene.`}),(0,o.jsx)(`li`,{children:`Name a concrete setting such as a sideboard, desk, or bedside table.`}),(0,o.jsx)(`li`,{children:`Specify where copy space should remain.`}),(0,o.jsx)(`li`,{children:`Avoid stacking conflicting style directions in one prompt.`})]}),(0,o.jsx)(`h2`,{id:`assets`,children:`Recommended asset set`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-assets`,code:u}),(0,o.jsx)(`h2`,{id:`steps`,children:`Step-by-step execution`}),(0,o.jsxs)(`ol`,{children:[(0,o.jsx)(`li`,{children:`Inspect the source image for contour, color, material, and sharpness.`}),(0,o.jsx)(`li`,{children:`Generate three scene images before attempting thirty.`}),(0,o.jsx)(`li`,{children:`Choose the most stable visual direction.`}),(0,o.jsx)(`li`,{children:`Expand that direction into detail-page panels and posters.`}),(0,o.jsx)(`li`,{children:`Turn two or three approved frames into short-video first frames.`}),(0,o.jsx)(`li`,{children:`Batch-vary scenes only after the visual system is stable.`})]}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-qc`,code:d}),(0,o.jsx)(`h2`,{id:`mistakes`,children:`Common failure points`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`The scene competes with the product and the hero image becomes unclear.`}),(0,o.jsx)(`li`,{children:`Product scale drifts and it looks pasted into the room.`}),(0,o.jsx)(`li`,{children:`Lighting, color temperature, and composition vary across the batch.`}),(0,o.jsx)(`li`,{children:`The team skips still-image validation and starts with a long advertisement.`})]}),(0,o.jsxs)(`p`,{children:[`For premium product visuals, continue with`,` `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-product-cg/`,children:`the product CG guide`}),`.`]})]})}var p=`白底图裂变常用流程：
1. 先拿到干净白底图
2. 固定产品比例、材质和主视角
3. 扩成 3 到 5 张场景主图
4. 从主图衍生详情页、海报和短视频首帧
5. 再扩成 3 到 5 秒单镜头视频片段
6. 最后批量替换场景、道具和文案方向`,m=`平台差异：
淘宝 / 天猫：主图清晰、卖点强、背景克制
Amazon：结构规范、卖点模块化、对比图多
小红书 / 抖音：生活方式、代入感、人物感
TikTok Shop：短视频首帧钩子强、动作更直接`,h=`白底图转场景图写法：
[产品主体]
[目标场景]
[光线方向]
[构图留白区]
[限制比例与材质不变]

例如：
保留原始蓝牙音箱的材质、比例和按键结构不变，
放置在暖色木质客厅边柜上，午后侧光，前景有轻微虚化绿植，
画面右侧保留文案留白区。`,g=`同一 SKU 推荐至少做这 5 类资产：
1. 主图
2. 场景图
3. 详情页模块图
4. 广告海报
5. 短视频首帧`,_=`逐步执行：
第一步：白底图验收，确认轮廓、颜色、材质、清晰度
第二步：先做 3 张场景图，不先做 30 张
第三步：从 3 张里选 1 套最稳定的风格
第四步：把这套风格扩成详情页和海报
第五步：再把其中 2 到 3 张扩成短视频首帧
第六步：最后才做批量裂变`,v=`白底图裂变检查清单：
- 产品比例是否保持不变
- 主体边缘有没有融化
- 材质和颜色有没有跑偏
- 留白区是否足够放文案
- 场景是否在服务产品，而不是喧宾夺主
- 同一组素材的色温和构图语言是否统一`;function y({title:e,intro:t,bullets:n}){return(0,o.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,o.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,o.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,o.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,o.jsx)(`li`,{children:e},e))})]})}function b(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-white-background-scaling`,title:`电商白底图裂变专题`,description:`基于 video-generation-skills 的 ecommerce 模块，详细讲清如何把白底产品图扩成主图、详情页、场景图、短视频首帧和批量广告素材。`,headings:[{id:`why`,text:`为什么白底图最适合裂变`,level:2},{id:`flow`,text:`标准流程`,level:2},{id:`platform`,text:`按平台拆素材`,level:2},{id:`prompt`,text:`白底图转场景图写法`,level:2},{id:`assets`,text:`推荐资产结构`,level:2},{id:`steps`,text:`逐步执行`,level:2},{id:`mistakes`,text:`最常见的失败点`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`白底图不是最终素材，而是资产起点`,children:(0,o.jsx)(`p`,{children:`ecommerce 模块反复强调的一件事，就是把单个 SKU 做成资产池。白底图之所以重要， 是因为它最适合当作结构锚点，方便后续批量裂变。`})}),(0,o.jsx)(`h2`,{id:`why`,children:`为什么白底图最适合裂变`}),(0,o.jsx)(`p`,{children:`白底图没有复杂背景干扰，产品比例、结构、材质和颜色最容易被锁定。对于电商工作流来说， 它是最适合做主锚点的输入素材。`}),(0,o.jsx)(`h2`,{id:`flow`,children:`标准流程`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-flow`,code:p}),(0,o.jsx)(`p`,{children:`正确顺序通常不是“先直接生视频”，而是先扩场景静帧，再把静帧变成视频。这样主图、详情页和短视频会共享同一套视觉系统。`}),(0,o.jsx)(y,{title:`为什么先做 3 张，不先做 30 张`,intro:`很多人一开始就追求批量，结果把错误风格一起批量放大。`,bullets:[`先用小批量验证产品比例、光线、场景和构图是不是成立。`,`确认一套风格稳定后，再做批量裂变，返工成本最低。`,`如果前 3 张都不稳定，直接扩 30 张只会浪费算力和时间。`]}),(0,o.jsx)(`h2`,{id:`platform`,children:`按平台拆素材`}),(0,o.jsx)(r,{lang:`text`,filename:`platform-split`,code:m}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`同一款商品不能用一套图同时兼顾淘宝、Amazon 和小红书。`}),(0,o.jsx)(`li`,{children:`转化平台更重信息清晰，内容平台更重氛围和代入感。`}),(0,o.jsx)(`li`,{children:`做 TikTok 时，首帧钩子和动作感通常比静态排版更重要。`})]}),(0,o.jsx)(`h2`,{id:`prompt`,children:`白底图转场景图写法`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-prompt`,code:h}),(0,o.jsx)(`p`,{children:`白底图转场景图时，最关键的是反复强调产品结构不变。场景、光线和留白区可以改，但主体不能像被重新画了一遍。`}),(0,o.jsx)(y,{title:`提示词里真正要强调什么`,intro:`白底图裂变不是写得越华丽越好，而是约束越明确越好。`,bullets:[`先写保留主体结构不变，再写场景和光线。`,`留白区要明确写出来，否则后面文案会没地方放。`,`目标场景要足够具体，例如客厅边柜、办公桌角、床头柜，而不是泛泛的生活场景。`,`不要同时要求太多风格，例如既要极简又要复古又要赛博。`]}),(0,o.jsx)(`h2`,{id:`assets`,children:`推荐资产结构`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-assets`,code:g}),(0,o.jsx)(`h2`,{id:`steps`,children:`逐步执行`}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-steps`,code:_}),(0,o.jsx)(r,{lang:`text`,filename:`white-bg-qc`,code:v}),(0,o.jsx)(`h2`,{id:`mistakes`,children:`最常见的失败点`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`场景比产品更抢戏，导致主图看不清卖什么。`}),(0,o.jsx)(`li`,{children:`产品尺寸漂移，放进房间后像贴纸或模型。`}),(0,o.jsx)(`li`,{children:`同一批商品图的光线、色温和构图语言完全不统一。`}),(0,o.jsx)(`li`,{children:`一开始就想做完整广告视频，跳过了静态场景验证。`})]}),(0,o.jsxs)(`p`,{children:[`如果你接下来要把商品做成更高级的视觉大片，可以继续看`,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-product-cg/`,children:` 产品 CG 专题`}),`。`]})]}):(0,o.jsx)(f,{})}export{b as default};