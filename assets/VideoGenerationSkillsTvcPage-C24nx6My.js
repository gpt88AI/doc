import{n as e}from"./ui-BNsvkuFE.js";import{t}from"./CodeBlock-6HZkGMv-.js";import{c as n,s as r}from"./index-ivPh6OuT.js";var i=e(),a=`TVC 推荐流程：
1. 先定 15 到 30 秒的核心情绪和卖点
2. 把广告拆成 5 到 8 个镜头
3. 每镜先做静帧，不直接做长视频
4. 关键帧之间保持同一色调和品牌气质
5. 每镜生成 3 到 5 秒动态
6. 最后剪辑、配乐、拟音、落版`,o=`常见 TVC 镜头结构：
1. 建立镜：空间和气氛
2. Hero 镜：产品或角色出场
3. 卖点镜：功能、材质、动作或情绪
4. 记忆点镜：最容易被记住的一幕
5. 落版镜：品牌名、Slogan、包装或产品定格`,s=`不要这样做：
- 一条 Prompt 生成完整 20 秒广告
- 把产品、角色、旁白、功能、环境全部塞进一个镜头
- 全片都用同一种运镜
- 前期不写脚本，只靠模型随机给你讲故事`,c=`TVC 脚本模板：
镜头 01：建立空间与情绪
镜头 02：主角或产品第一次出场
镜头 03：卖点或动作触发
镜头 04：记忆点镜头
镜头 05：品牌落版

每镜都写：
- 画面内容
- 动作
- 运镜
- 音效 / 配乐提示
- 时长`,l=`20 秒产品 TVC 示例：
0-3s：安静空间建立，镜头慢推，环境声先进入
3-6s：产品 Hero 出场，边缘高光拉出轮廓
6-10s：功能或使用动作被触发
10-15s：最有记忆点的一幕，节奏明显抬升
15-20s：品牌与产品定格，Slogan 落版`,u=`出片前检查：
- 有没有一个明确记忆点镜头
- 每镜是否只承担一个主要任务
- 卖点镜是否真的可见，而不是只存在于文案里
- 全片节奏有没有起承转合
- 结尾落版是否足够干净`;function d({title:e,intro:t,bullets:n}){return(0,i.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,i.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,i.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,i.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,i.jsx)(`li`,{children:e},e))})]})}function f(){return(0,i.jsxs)(n,{path:`/docs/guides/video-generation-skills-tvc-playbook`,title:`TVC 广告片专题`,description:`基于 video-generation-skills 的 brand-ad-cg 模块，详细讲清 TVC 脚本、分镜、关键帧、单镜头视频和后期拼接的工作流。`,headings:[{id:`why`,text:`为什么 TVC 不能直接文生长视频`,level:2},{id:`flow`,text:`推荐流程`,level:2},{id:`structure`,text:`镜头结构`,level:2},{id:`script`,text:`脚本模板`,level:2},{id:`case`,text:`20 秒案例结构`,level:2},{id:`avoid`,text:`最该避免的做法`,level:2}],children:[(0,i.jsx)(r,{tone:`info`,title:`TVC 是制片问题，不是单镜头问题`,children:(0,i.jsx)(`p`,{children:`TVC 的难点从来不只是画面好不好看，而是情绪、节奏、卖点和品牌记忆点能不能在几十秒里建立起来。`})}),(0,i.jsx)(`h2`,{id:`why`,children:`为什么 TVC 不能直接文生长视频`}),(0,i.jsx)(`p`,{children:`长视频一次生成时，模型会同时处理故事、产品、动作、镜头和空间关系，稳定性很差。对广告片来说， 更可靠的做法是先脚本，再分镜，再关键帧，再逐镜生成动态。`}),(0,i.jsx)(`h2`,{id:`flow`,children:`推荐流程`}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-flow`,code:a}),(0,i.jsx)(d,{title:`为什么要先拆成 5 到 8 个镜头`,intro:`广告片的节奏不是平均分布的，每一镜的职责不同。`,bullets:[`建立镜负责让观众进入氛围，不负责讲功能细节。`,`卖点镜负责解释产品或角色，不适合同时承担落版任务。`,`最值钱的记忆点镜头通常需要单独打磨，而不是平均分配到所有镜头。`]}),(0,i.jsx)(`h2`,{id:`structure`,children:`镜头结构`}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-shot-structure`,code:o}),(0,i.jsxs)(`ul`,{children:[(0,i.jsx)(`li`,{children:`建立镜负责气氛，不负责解释所有卖点。`}),(0,i.jsx)(`li`,{children:`Hero 镜负责让产品或角色立住，不要混进太多功能信息。`}),(0,i.jsx)(`li`,{children:`记忆点镜通常才是整条广告最值钱的一幕。`})]}),(0,i.jsx)(`h2`,{id:`script`,children:`脚本模板`}),(0,i.jsx)(`p`,{children:`在 AI 生成之前，先把 TVC 写成简化脚本。这里的脚本不用像传统广告分镜那么长，但一定要把镜头职责写清楚。`}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-script-template`,code:c}),(0,i.jsx)(d,{title:`镜头脚本怎么写才不空`,intro:`每镜最好都能回答“观众在这一秒看到什么、感受到什么、为什么要看下去”。`,bullets:[`画面内容要写到可见物，例如边缘高光、反射、水花、手部动作、空间层次。`,`动作要可拍，不要写成抽象情绪判断。`,`运镜只保留一种主导逻辑，避免监控感和平滑广告感互相打架。`,`音效提示很重要，它决定剪辑时广告有没有真实质感。`]}),(0,i.jsx)(`h2`,{id:`case`,children:`20 秒案例结构`}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-20s-case`,code:l}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-checklist`,code:u}),(0,i.jsx)(`h2`,{id:`avoid`,children:`最该避免的做法`}),(0,i.jsx)(t,{lang:`text`,filename:`tvc-avoid`,code:s}),(0,i.jsx)(`p`,{children:`如果你现在还处在“先把产品图做漂亮”的阶段，先回到产品 CG 专题更合适。等静帧体系稳定之后， 再把它扩成广告片，会省很多试错成本。`})]})}export{f as default};