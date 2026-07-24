import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`Narrative 轨道
- 短剧 / 漫剧 / 短片
- 重点：故事、人物、场景、分镜节奏

Production 轨道
- 一致性 / 故事板 / 分镜 / 复杂动作
- 重点：镜头控制、场景连续性、角色不穿帮`,s=`1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 定 Narrative 还是 Production 轨道
4. 先出分镜草案
5. 用户确认镜号
6. 打开对应 reference
7. Prompt 技法回到 prompt-director`,c=`女频 / 古风短剧
  narrative/short-drama.md

3D 漫剧资产化
  narrative/3d-anime-drama.md

场景一致性
  narrative/scene-consistency.md

电影感 / 奇幻
  narrative/film-style.md

故事板
  production/storyboard.md

分镜 / 复杂动作
  production/shot-breakdown.md

人物 / 环境一致
  production/consistency.md

场景不穿帮
  production/scene-continuity.md`,l=`1. 成片感来自体系统一，不是单镜好看
2. 故事板优先
3. 每镜一个控制点
4. 一致性问题必须单独管理
5. 废片回收不是失败，而是制片流程的一部分`,u=[`女频古风短剧工作流`,`3D 漫剧角色极速资产化`,`720 全景虚拟影棚`,`复刻大师镜头`,`东方奇幻风骨荒原`,`30 秒日系预告`,`童话小剧场卖火柴的小女孩`],d=[`场景不穿帮 4 法`,`分镜逻辑拆解`,`复杂动作视频两种方法`,`企业宣传片图片到成片`],f=[[`narrative/short-drama.md`,`女频 / 古风短剧`],[`narrative/3d-anime-drama.md`,`3D 漫剧资产化`],[`narrative/scene-consistency.md`,`场景一致性`],[`narrative/film-style.md`,`电影感 / 奇幻`],[`production/storyboard.md`,`故事板`],[`production/shot-breakdown.md`,`分镜 / 复杂动作`],[`production/consistency.md`,`人物 / 环境一致`],[`production/scene-continuity.md`,`场景不穿帮`]],p=`先判断这条需求属于哪条轨道：
- narrative：短剧 / 漫剧 / 预告片 / 世界观短片
- production：故事板 / 分镜 / 场景连续性 / 复杂动作 / 角色不变脸

再确认：
- 已有素材：剧本 / 角色设定 / 场景参考 / 参考片
- 画幅：9:16 竖屏还是 16:9 横屏
- 工具：Seedance / 可灵 / 即梦 / FlowPix
- 痛点：变脸 / 穿帮 / 节奏断 / 动作崩`,m=`成片不是单镜堆叠：
1. 先造空间，再拍剧情
2. 先做角色资产，再做表演
3. 先做故事板，再做视频
4. 单段只保留一个主动作
5. 需要补拍时，优先补特写和空镜，不强求一条长镜`;function h({title:e,topics:t}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:t.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function g({title:e,intro:t,bullets:n}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function _(){return(0,a.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,a.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,a.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`reference`}),(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`覆盖主题`})]})}),(0,a.jsx)(`tbody`,{children:f.map((e,t)=>(0,a.jsxs)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:[(0,a.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-100`,children:e[0]}),(0,a.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e[1]})]},e[0]))})]})})}function v(){return(0,a.jsxs)(r,{path:`/docs/guides/video-generation-skills-ai-video-director`,title:`ai-video-director 详细教程`,description:`讲清 video-generation-skills 里的 ai-video-director 如何处理短剧、漫剧、分镜、故事板、场景一致性和复杂动作视频。`,headings:[{id:`position`,text:`它解决的不是单镜，而是制片问题`,level:2},{id:`modes`,text:`两条轨道`,level:2},{id:`flow`,text:`标准工作流`,level:2},{id:`routing`,text:`内容路由`,level:2},{id:`topics`,text:`教程目录`,level:2},{id:`chapters`,text:`章节精华`,level:2},{id:`rules`,text:`制片铁律`,level:2}],children:[(0,a.jsx)(i,{tone:`info`,title:`这是 4 个 skill 里最接近“导演 / 制片”思路的模块`,children:(0,a.jsx)(`p`,{children:`它不只是帮你写 Prompt，而是帮助你管理短剧、漫剧、故事板、一致性和复杂动作镜头， 本质上是在做 AI 视频制片。`})}),(0,a.jsx)(`h2`,{id:`position`,children:`它解决的不是单镜，而是制片问题`}),(0,a.jsx)(`p`,{children:`很多 AI 视频失败不是单个镜头不够美，而是整条片子人物变了、场景穿帮、镜头节奏断了、 动作接不上。这个模块就是专门处理这类“成片层问题”。`}),(0,a.jsx)(`h2`,{id:`modes`,children:`两条轨道`}),(0,a.jsx)(n,{lang:`text`,filename:`modes`,code:o}),(0,a.jsx)(`h2`,{id:`flow`,children:`标准工作流`}),(0,a.jsx)(n,{lang:`text`,filename:`flow`,code:s}),(0,a.jsx)(n,{lang:`text`,filename:`ai-video-director-gates`,code:p}),(0,a.jsxs)(`p`,{children:[`这个流程和 `,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director`}),` 有强关联： 它负责制片逻辑和分镜结构，真正落到 Prompt 时仍然会回到提示词底层方法论。`]}),(0,a.jsx)(`h2`,{id:`routing`,children:`内容路由`}),(0,a.jsx)(n,{lang:`text`,filename:`routing`,code:c}),(0,a.jsx)(`p`,{children:`仓库里把 narrative 和 production 拆开是很合理的。前者更偏故事和风格， 后者更偏镜头工程和连续性控制。`}),(0,a.jsx)(`h2`,{id:`topics`,children:`教程目录`}),(0,a.jsx)(_,{}),(0,a.jsx)(h,{title:`叙事轨主题（7）`,topics:u}),(0,a.jsx)(h,{title:`制片轨主题（4）`,topics:d}),(0,a.jsx)(`h2`,{id:`chapters`,children:`章节精华`}),(0,a.jsx)(`p`,{children:`ai-video-director 最重要的价值，是把“角色资产、场景资产、故事板、镜头逻辑、后期补拍”放到同一个流程里。下面按实际制片顺序整理。`}),(0,a.jsx)(g,{title:`短剧制片：先拆视觉母版，再写剧本`,intro:`short-drama.md 的方法很硬核，它要求先分析爆款画面的光线、景深、色偏和拍摄参数，再去写剧情。`,bullets:[`人物不能只做一张图，要做服装、发饰、面部和全身三视图资产包。`,`同一场景要先做九宫格，再按机位切镜，否则镜头间会像换了片场。`,`关键道具和角色同级管理，例如铃铛、河灯也要做参考图。`,`15 秒一段是上限，段内镜头和动作要做减法，声音也要在前期准备。`]}),(0,a.jsx)(g,{title:`3D 漫剧：先角色资产化，再做场景`,intro:`3d-anime-drama.md 的核心不是 Prompt，而是用 2D 原画把 3D 角色固定下来。`,bullets:[`先找 2D 参考图锁定气质，不要硬靠几百字描述捏脸。`,`输出要包含胸像特写和全身三视图，方便视频工具理解角色。`,`面部、发饰、服装褶皱必须在三视角一致，否则视频里会漂。`,`角色资产做好后，再配合 720 全景场景去做漫剧分镜。`]}),(0,a.jsx)(g,{title:`场景一致性：先造空间，再拍剧情`,intro:`scene-consistency.md 和 scene-continuity.md 共同解决“镜头一切场景就变”的问题。`,bullets:[`可以用九宫格、俯视图、360 环绕截图或 720 全景图做空间母版。`,`完整空间建立后，再在同一空间里截图、修透视、放人物。`,`人物和场景最好分参考提交：角色负责外观，场景负责空间。`,`外景转内景、街道转店内这类镜头，需要额外补空间连接镜。`]}),(0,a.jsx)(g,{title:`分镜与复杂动作：故事逻辑比镜头漂亮更重要`,intro:`shot-breakdown.md 和 storyboard.md 解决的是镜头因果链，不是单镜美术质量。`,bullets:[`分镜要回答四个问题：为什么动、去哪里、途中有什么阻力、结果为什么成立。`,`复杂动作优先做 12 宫格分镜，或者借参考视频锁运动节奏。`,`故事板适合先出静态图，再用首尾帧或相邻双图方式生成动态。`,`需要补拍时，优先补特写、空镜和情绪断点镜，而不是硬拉长主镜头。`]}),(0,a.jsx)(g,{title:`电影感项目：世界观、色板和镜头母版要独立存在`,intro:`film-style.md 提醒得很清楚，电影感不是写一句某导演风格，而是要拆成角色、环境、色板和运镜逻辑。`,bullets:[`大师镜头复刻更适合学“镜头如何揭示人物”，而不是只学构图外观。`,`世界观项目要把关键词、色板、材质规则和核心地域单独整理出来。`,`日系预告、童话小剧场这类内容，风格、角色、场景、镜头顺序不能颠倒。`,`如果一个项目需要多条线并行，最先固定的应该是视觉母版，而不是剧情细节。`]}),(0,a.jsxs)(`p`,{children:[`这条线再往下拆，最实用的两个专题是`,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-scene-consistency/`,children:` 场景一致性`}),` 和`,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-complex-action-storyboard/`,children:` 复杂动作与分镜`}),`。`]}),(0,a.jsx)(`h2`,{id:`rules`,children:`制片铁律`}),(0,a.jsx)(n,{lang:`text`,filename:`rules`,code:l}),(0,a.jsx)(n,{lang:`text`,filename:`production-rules`,code:m}),(0,a.jsxs)(`p`,{children:[`如果你现在主要在做剧情视频，还可以结合站内的`,(0,a.jsx)(t,{to:`/docs/guides/ai-video-storyboard-guide/`,children:` AI 视频分镜与提示词教程`}),` 一起看。`]})]})}export{v as default};