import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`四种空间锁定法：
1. 场景九宫格
2. 俯视图 + 多机位
3. 360 环绕截图
4. 720 全景图 + 透视修复`,s=`场景一致性铁律：
1. 先造空间，再拍剧情
2. 先确定空间母版，再拆镜头
3. 角色和场景分参考提交
4. 外景转内景要补连接镜
5. 全景截图必须做透视修复`,c=`生成前检查：
- 有没有空间母版
- 有没有统一光线方向
- 有没有明确人物站位
- 镜头之间是否共享同一物理逻辑
- 是否需要补外到内、门口到室内的连接镜`,l=`推荐执行顺序：
1. 先找 1 张理想环境参考图
2. 反推完整空间描述
3. 生成空间母版：九宫格 / 俯视图 / 全景图三选一
4. 从母版里拆出多个机位
5. 再把角色放进这些机位
6. 最后才生成正式动态镜头`,u=`怎么选方法：
对话室内戏：优先九宫格
结构复杂的室内：优先俯视图 + 多机位
想快速看多个背景角度：优先 360 环绕截图
需要高自由度取景：优先 720 全景图`,d=`常见修复方式：
背景比例怪：先图生图修透视，再继续做视频
人物站位飘：用底图标框或箭头锁位置
光线方向变了：回到空间母版重新统一光源
外景切内景太突兀：补门口、走廊、推门等连接镜`;function f({title:e,intro:t,bullets:n}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function p(){return(0,a.jsxs)(r,{path:`/docs/guides/video-generation-skills-scene-consistency`,title:`场景一致性专题`,description:`基于 video-generation-skills 的 ai-video-director 模块，详细讲清九宫格、俯视图、全景图和环绕截图如何解决短剧、漫剧和叙事视频的场景穿帮问题。`,headings:[{id:`why`,text:`为什么场景最容易穿帮`,level:2},{id:`methods`,text:`四种空间锁定法`,level:2},{id:`rules`,text:`场景一致性铁律`,level:2},{id:`flow`,text:`推荐执行顺序`,level:2},{id:`fix`,text:`常见修复方式`,level:2},{id:`check`,text:`生成前检查`,level:2}],children:[(0,a.jsx)(i,{tone:`info`,title:`不要让 AI 每个镜头重新想象场景`,children:(0,a.jsx)(`p`,{children:`scene-consistency 和 scene-continuity 的核心不是“写更长的场景提示词”， 而是先建立空间母版，让后续镜头在同一物理空间里工作。`})}),(0,a.jsx)(`h2`,{id:`why`,children:`为什么场景最容易穿帮`}),(0,a.jsx)(`p`,{children:`人物漂移还能通过参考图修，场景穿帮更难补，因为空间逻辑一旦断掉，观众会立刻出戏。 所以短剧、漫剧、剧情广告都应该把场景母版放在人物出图之前。`}),(0,a.jsx)(`h2`,{id:`methods`,children:`四种空间锁定法`}),(0,a.jsx)(n,{lang:`text`,filename:`scene-methods`,code:o}),(0,a.jsx)(n,{lang:`text`,filename:`scene-method-picker`,code:u}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`九宫格适合同一空间多机位，尤其是室内短剧和对话场景。`}),(0,a.jsx)(`li`,{children:`俯视图适合先锁家具、门窗和动线关系。`}),(0,a.jsx)(`li`,{children:`360 环绕截图适合快速探索同空间多个背景角度。`}),(0,a.jsx)(`li`,{children:`720 全景图最自由，但后处理要求也最高。`})]}),(0,a.jsx)(`h2`,{id:`rules`,children:`场景一致性铁律`}),(0,a.jsx)(n,{lang:`text`,filename:`scene-rules`,code:s}),(0,a.jsxs)(`p`,{children:[`这一套规则和 `,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-complex-action-storyboard/`,children:`复杂动作与分镜专题`}),`是配套的。空间先稳，人物动作和镜头调度才有意义。`]}),(0,a.jsx)(f,{title:`为什么角色和场景要分参考提交`,intro:`很多场景穿帮，本质上是模型在同一轮里同时重算人物和空间。`,bullets:[`角色参考只负责人长什么样，不负责房间长什么样。`,`场景参考只负责空间结构和光线方向，不负责人物状态。`,`把两者职责拆开后，模型更容易稳定执行。`]}),(0,a.jsx)(`h2`,{id:`flow`,children:`推荐执行顺序`}),(0,a.jsx)(n,{lang:`text`,filename:`scene-flow`,code:l}),(0,a.jsx)(`h2`,{id:`fix`,children:`常见修复方式`}),(0,a.jsx)(n,{lang:`text`,filename:`scene-fixes`,code:d}),(0,a.jsx)(`h2`,{id:`check`,children:`生成前检查`}),(0,a.jsx)(n,{lang:`text`,filename:`scene-checklist`,code:c})]})}export{p as default};