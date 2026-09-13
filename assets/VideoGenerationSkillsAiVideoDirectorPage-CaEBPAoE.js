import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`Narrative track
- Short drama, anime drama, trailer, short film
- Focus: story, characters, world, and pacing

Production track
- Continuity, storyboard, shot breakdown, complex action
- Focus: camera control, spatial continuity, and stable characters`,c=`1. Read cheatsheet.md
2. Read confirmation-gates.md
3. Choose the Narrative or Production track
4. Draft the storyboard before final prompts
5. Wait for shot-number approval
6. Open only the references needed for the project
7. Return to prompt-director for prompt-level technique`,l=`Narrative
  short drama / anime drama / film style / scene consistency

Production
  storyboard / shot breakdown / character consistency / scene continuity`,u=`1. A finished film comes from a coherent system, not isolated beautiful shots
2. Storyboard first
3. Give each shot one control point
4. Manage continuity as a separate production task
5. Recovery and pickups are part of the workflow, not a failure`;function d(){return(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-ai-video-director`,title:`AI Video Director: Production Guide`,description:`Learn how ai-video-director handles narrative video, storyboards, shot breakdowns, scene continuity, character consistency, and complex actions.`,headings:[{id:`position`,text:`It solves a production problem`,level:2},{id:`modes`,text:`Two production tracks`,level:2},{id:`flow`,text:`Standard workflow`,level:2},{id:`routing`,text:`Content routing`,level:2},{id:`assets`,text:`Build assets before performance`,level:2},{id:`continuity`,text:`Spatial and character continuity`,level:2},{id:`shots`,text:`Storyboard and complex action`,level:2},{id:`rules`,text:`Production rules`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`Think at the finished-film level`,children:(0,o.jsx)(`p`,{children:`Many AI video failures are not isolated image failures. Characters change, locations drift, shots lose causal rhythm, and actions do not connect. This module manages those problems as a production system.`})}),(0,o.jsx)(`h2`,{id:`position`,children:`It solves a production problem`}),(0,o.jsx)(`p`,{children:`The director workflow coordinates character assets, environment assets, storyboards, shot logic, and pickups. It is designed for short drama, anime drama, trailers, product stories, and other sequences where the final result matters more than one attractive frame.`}),(0,o.jsx)(`h2`,{id:`modes`,children:`Two production tracks`}),(0,o.jsx)(r,{lang:`text`,filename:`modes`,code:s}),(0,o.jsx)(`h2`,{id:`flow`,children:`Standard workflow`}),(0,o.jsx)(r,{lang:`text`,filename:`flow`,code:c}),(0,o.jsx)(`p`,{children:`First decide whether the request is narrative or production work. Confirm source material, aspect ratio, tool, and the main failure mode before selecting references. Prompt-director then supplies the lower-level prompt method.`}),(0,o.jsx)(`h2`,{id:`routing`,children:`Content routing`}),(0,o.jsx)(r,{lang:`text`,filename:`routing`,code:l}),(0,o.jsx)(`p`,{children:`Narrative references focus on story and style. Production references focus on camera engineering, spatial logic, and continuity. Keeping the two tracks separate prevents a prompt from carrying too much unrelated instruction.`}),(0,o.jsx)(`h2`,{id:`assets`,children:`Build assets before performance`}),(0,o.jsx)(`p`,{children:`Do not define a recurring character with one portrait and a sentence. Build a small reference pack with face, hair, clothing, accessories, and full-body views. For 3D or anime work, anchor the character with a strong 2D reference before asking the model to place the character in scenes.`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Keep face, hairstyle, clothing folds, and accessories stable across views.`}),(0,o.jsx)(`li`,{children:`Create a location master before splitting the story into camera positions.`}),(0,o.jsx)(`li`,{children:`Treat important props as reference assets when they drive the plot.`})]}),(0,o.jsx)(`h2`,{id:`continuity`,children:`Spatial and character continuity`}),(0,o.jsx)(`p`,{children:`Build a spatial master with a grid, top-down view, orbit screenshots, or a panorama. Then place characters into that same space. Submit character and environment references separately when possible: the character reference controls appearance, while the environment reference controls geometry, scale, and lighting.`}),(0,o.jsx)(`p`,{children:`Exterior-to-interior transitions, entrances, corridors, and other location changes need bridge shots. A missing connection shot often looks like a continuity error even when both individual frames are good.`}),(0,o.jsx)(`h2`,{id:`shots`,children:`Storyboard and complex action`}),(0,o.jsx)(`p`,{children:`A storyboard should answer why the subject moves, where it goes, what blocks the action, and why the result follows. For complex movement, use a multi-panel storyboard or a reference video to lock timing before generating motion.`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Keep one dominant action per clip.`}),(0,o.jsx)(`li`,{children:`Prefer short clips with clear starts and ends.`}),(0,o.jsx)(`li`,{children:`When a shot fails, add a close-up, insert, or empty establishing shot before extending a long take.`})]}),(0,o.jsx)(`h2`,{id:`rules`,children:`Production rules`}),(0,o.jsx)(r,{lang:`text`,filename:`rules`,code:u}),(0,o.jsxs)(`p`,{children:[`Continue with `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-scene-consistency/`,children:`scene consistency`}),` `,`for spatial locking, `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-complex-action-storyboard/`,children:`complex action and storyboards`}),` `,`for shot engineering, and `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director`}),` `,`for prompt construction.`]})]})}var f=`Narrative 轨道
- 短剧 / 漫剧 / 短片
- 重点：故事、人物、场景、分镜节奏

Production 轨道
- 一致性 / 故事板 / 分镜 / 复杂动作
- 重点：镜头控制、场景连续性、角色不穿帮`,p=`1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 定 Narrative 还是 Production 轨道
4. 先出分镜草案
5. 用户确认镜号
6. 打开对应 reference
7. Prompt 技法回到 prompt-director`,m=`女频 / 古风短剧
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
  production/scene-continuity.md`,h=`1. 成片感来自体系统一，不是单镜好看
2. 故事板优先
3. 每镜一个控制点
4. 一致性问题必须单独管理
5. 废片回收不是失败，而是制片流程的一部分`,g=[`女频古风短剧工作流`,`3D 漫剧角色极速资产化`,`720 全景虚拟影棚`,`复刻大师镜头`,`东方奇幻风骨荒原`,`30 秒日系预告`,`童话小剧场卖火柴的小女孩`],_=[`场景不穿帮 4 法`,`分镜逻辑拆解`,`复杂动作视频两种方法`,`企业宣传片图片到成片`],v=[[`narrative/short-drama.md`,`女频 / 古风短剧`],[`narrative/3d-anime-drama.md`,`3D 漫剧资产化`],[`narrative/scene-consistency.md`,`场景一致性`],[`narrative/film-style.md`,`电影感 / 奇幻`],[`production/storyboard.md`,`故事板`],[`production/shot-breakdown.md`,`分镜 / 复杂动作`],[`production/consistency.md`,`人物 / 环境一致`],[`production/scene-continuity.md`,`场景不穿帮`]],y=`先判断这条需求属于哪条轨道：
- narrative：短剧 / 漫剧 / 预告片 / 世界观短片
- production：故事板 / 分镜 / 场景连续性 / 复杂动作 / 角色不变脸

再确认：
- 已有素材：剧本 / 角色设定 / 场景参考 / 参考片
- 画幅：9:16 竖屏还是 16:9 横屏
- 工具：Seedance / 可灵 / 即梦 / FlowPix
- 痛点：变脸 / 穿帮 / 节奏断 / 动作崩`,b=`成片不是单镜堆叠：
1. 先造空间，再拍剧情
2. 先做角色资产，再做表演
3. 先做故事板，再做视频
4. 单段只保留一个主动作
5. 需要补拍时，优先补特写和空镜，不强求一条长镜`;function x({title:e,topics:t}){return(0,o.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,o.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,o.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:t.map(e=>(0,o.jsx)(`li`,{children:e},e))})]})}function S({title:e,intro:t,bullets:n}){return(0,o.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,o.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,o.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,o.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,o.jsx)(`li`,{children:e},e))})]})}function C(){return(0,o.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,o.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,o.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`reference`}),(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:`覆盖主题`})]})}),(0,o.jsx)(`tbody`,{children:v.map((e,t)=>(0,o.jsxs)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:[(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-100`,children:e[0]}),(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e[1]})]},e[0]))})]})})}function w(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-ai-video-director`,title:`ai-video-director 详细教程`,description:`讲清 video-generation-skills 里的 ai-video-director 如何处理短剧、漫剧、分镜、故事板、场景一致性和复杂动作视频。`,headings:[{id:`position`,text:`它解决的不是单镜，而是制片问题`,level:2},{id:`modes`,text:`两条轨道`,level:2},{id:`flow`,text:`标准工作流`,level:2},{id:`routing`,text:`内容路由`,level:2},{id:`topics`,text:`教程目录`,level:2},{id:`chapters`,text:`章节精华`,level:2},{id:`rules`,text:`制片铁律`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`这是 4 个 skill 里最接近“导演 / 制片”思路的模块`,children:(0,o.jsx)(`p`,{children:`它不只是帮你写 Prompt，而是帮助你管理短剧、漫剧、故事板、一致性和复杂动作镜头， 本质上是在做 AI 视频制片。`})}),(0,o.jsx)(`h2`,{id:`position`,children:`它解决的不是单镜，而是制片问题`}),(0,o.jsx)(`p`,{children:`很多 AI 视频失败不是单个镜头不够美，而是整条片子人物变了、场景穿帮、镜头节奏断了、 动作接不上。这个模块就是专门处理这类“成片层问题”。`}),(0,o.jsx)(`h2`,{id:`modes`,children:`两条轨道`}),(0,o.jsx)(r,{lang:`text`,filename:`modes`,code:f}),(0,o.jsx)(`h2`,{id:`flow`,children:`标准工作流`}),(0,o.jsx)(r,{lang:`text`,filename:`flow`,code:p}),(0,o.jsx)(r,{lang:`text`,filename:`ai-video-director-gates`,code:y}),(0,o.jsxs)(`p`,{children:[`这个流程和 `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director`}),` 有强关联： 它负责制片逻辑和分镜结构，真正落到 Prompt 时仍然会回到提示词底层方法论。`]}),(0,o.jsx)(`h2`,{id:`routing`,children:`内容路由`}),(0,o.jsx)(r,{lang:`text`,filename:`routing`,code:m}),(0,o.jsx)(`p`,{children:`仓库里把 narrative 和 production 拆开是很合理的。前者更偏故事和风格， 后者更偏镜头工程和连续性控制。`}),(0,o.jsx)(`h2`,{id:`topics`,children:`教程目录`}),(0,o.jsx)(C,{}),(0,o.jsx)(x,{title:`叙事轨主题（7）`,topics:g}),(0,o.jsx)(x,{title:`制片轨主题（4）`,topics:_}),(0,o.jsx)(`h2`,{id:`chapters`,children:`章节精华`}),(0,o.jsx)(`p`,{children:`ai-video-director 最重要的价值，是把“角色资产、场景资产、故事板、镜头逻辑、后期补拍”放到同一个流程里。下面按实际制片顺序整理。`}),(0,o.jsx)(S,{title:`短剧制片：先拆视觉母版，再写剧本`,intro:`short-drama.md 的方法很硬核，它要求先分析爆款画面的光线、景深、色偏和拍摄参数，再去写剧情。`,bullets:[`人物不能只做一张图，要做服装、发饰、面部和全身三视图资产包。`,`同一场景要先做九宫格，再按机位切镜，否则镜头间会像换了片场。`,`关键道具和角色同级管理，例如铃铛、河灯也要做参考图。`,`15 秒一段是上限，段内镜头和动作要做减法，声音也要在前期准备。`]}),(0,o.jsx)(S,{title:`3D 漫剧：先角色资产化，再做场景`,intro:`3d-anime-drama.md 的核心不是 Prompt，而是用 2D 原画把 3D 角色固定下来。`,bullets:[`先找 2D 参考图锁定气质，不要硬靠几百字描述捏脸。`,`输出要包含胸像特写和全身三视图，方便视频工具理解角色。`,`面部、发饰、服装褶皱必须在三视角一致，否则视频里会漂。`,`角色资产做好后，再配合 720 全景场景去做漫剧分镜。`]}),(0,o.jsx)(S,{title:`场景一致性：先造空间，再拍剧情`,intro:`scene-consistency.md 和 scene-continuity.md 共同解决“镜头一切场景就变”的问题。`,bullets:[`可以用九宫格、俯视图、360 环绕截图或 720 全景图做空间母版。`,`完整空间建立后，再在同一空间里截图、修透视、放人物。`,`人物和场景最好分参考提交：角色负责外观，场景负责空间。`,`外景转内景、街道转店内这类镜头，需要额外补空间连接镜。`]}),(0,o.jsx)(S,{title:`分镜与复杂动作：故事逻辑比镜头漂亮更重要`,intro:`shot-breakdown.md 和 storyboard.md 解决的是镜头因果链，不是单镜美术质量。`,bullets:[`分镜要回答四个问题：为什么动、去哪里、途中有什么阻力、结果为什么成立。`,`复杂动作优先做 12 宫格分镜，或者借参考视频锁运动节奏。`,`故事板适合先出静态图，再用首尾帧或相邻双图方式生成动态。`,`需要补拍时，优先补特写、空镜和情绪断点镜，而不是硬拉长主镜头。`]}),(0,o.jsx)(S,{title:`电影感项目：世界观、色板和镜头母版要独立存在`,intro:`film-style.md 提醒得很清楚，电影感不是写一句某导演风格，而是要拆成角色、环境、色板和运镜逻辑。`,bullets:[`大师镜头复刻更适合学“镜头如何揭示人物”，而不是只学构图外观。`,`世界观项目要把关键词、色板、材质规则和核心地域单独整理出来。`,`日系预告、童话小剧场这类内容，风格、角色、场景、镜头顺序不能颠倒。`,`如果一个项目需要多条线并行，最先固定的应该是视觉母版，而不是剧情细节。`]}),(0,o.jsxs)(`p`,{children:[`这条线再往下拆，最实用的两个专题是`,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-scene-consistency/`,children:` 场景一致性`}),` 和`,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-complex-action-storyboard/`,children:` 复杂动作与分镜`}),`。`]}),(0,o.jsx)(`h2`,{id:`rules`,children:`制片铁律`}),(0,o.jsx)(r,{lang:`text`,filename:`rules`,code:h}),(0,o.jsx)(r,{lang:`text`,filename:`production-rules`,code:b}),(0,o.jsxs)(`p`,{children:[`如果你现在主要在做剧情视频，还可以结合站内的`,(0,o.jsx)(t,{to:`/docs/guides/ai-video-storyboard-guide/`,children:` AI 视频分镜与提示词教程`}),` 一起看。`]})]}):(0,o.jsx)(d,{})}export{w as default};