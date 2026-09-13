import{n as e}from"./ui-Caz9BZV8.js";import{d as t}from"./Seo-zhKV3POX.js";import{t as n}from"./CodeBlock-D8kfQ6fq.js";import{c as r,l as i}from"./index-DCJmtdkW.js";var a=e(),o=`Four storyboard questions:
1. Why does the character act?
2. Where are they going?
3. What blocks the action?
4. Why does the result make sense?`,s=`Two main methods for complex action:
Method A: 12-panel storyboard
- Best for original action design

Method B: Reference-video replacement
- Best for quickly getting a stable movement rhythm`,c=`1. Define the character and environment
2. Break down shots before writing a long action sentence
3. Choose the dominant action anchor
4. Lock the sequence with a 12-panel board or reference video
5. Keep one dominant action per shot
6. Generate short segments and edit them together`,l=`12-panel method:
1. Lock the character and environment
2. Split the complex action into 12 continuous states
3. Give each panel one intermediate pose
4. Group the panels into 3-4 video segments
5. Keep one main action chain per segment`,u=`Reference-video method:
1. Find a reference with the right movement rhythm
2. Extract its key shots and action beats
3. Replace the subject with your character, scene, and style
4. Preserve the movement structure instead of rewriting it completely
5. Repair local issues and edit the segments together`,d=`Action looks convulsive -> too many main actions; keep one
Character drifts -> missing character or scene anchor
Causal break -> missing reason, destination, obstacle, or result
Action is correct but unattractive -> repair shot logic before aesthetics
Reference replacement fails -> the movement structure was changed, not just the subject`,f=`## Story goal
## Answers to the four storyboard questions
## Character and environment references
## 12-panel or reference-video plan
## Segmented video prompts
## Editing order`;function p(){return(0,a.jsxs)(i,{path:`/docs/guides/video-generation-skills-complex-action-storyboard`,title:`Complex Action and Storyboard Guide`,description:`Learn how to plan complex AI video actions with causal storyboards, 12-panel breakdowns, reference videos, and short editable segments.`,headings:[{id:`why`,text:`Why complex action breaks`,level:2},{id:`logic`,text:`Fix the storyboard logic first`,level:2},{id:`methods`,text:`Two action methods`,level:2},{id:`case`,text:`Case structure`,level:2},{id:`template`,text:`Output template`,level:2},{id:`workflow`,text:`Recommended workflow`,level:2}],children:[(0,a.jsx)(r,{tone:`info`,title:`Complex action is about order before beauty`,children:(0,a.jsx)(`p`,{children:`A model may know how to render running, jumping, turning, or waving. It still fails when too many actions arrive without a causal chain or a clear hierarchy.`})}),(0,a.jsx)(`h2`,{id:`why`,children:`Why complex action breaks`}),(0,a.jsx)(`p`,{children:`When one shot asks a character to run, jump, turn, wave, look back, and speak, the model often blends the actions into one unstable movement. The fix is to split the sequence before adding more descriptive words.`}),(0,a.jsx)(`h2`,{id:`logic`,children:`Fix the storyboard logic first`}),(0,a.jsx)(n,{lang:`text`,filename:`shot-logic`,code:o}),(0,a.jsx)(`p`,{children:`These questions solve causality, not visual style. Once the reason and destination are clear, camera and prompt decisions become easier to evaluate.`}),(0,a.jsx)(`h2`,{id:`methods`,children:`Two action methods`}),(0,a.jsx)(n,{lang:`text`,filename:`action-methods`,code:s}),(0,a.jsx)(n,{lang:`text`,filename:`twelve-grid-method`,code:l}),(0,a.jsx)(n,{lang:`text`,filename:`reference-video-method`,code:u}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`Use the 12-panel method for original action, parkour, fights, dance, and emotional chains.`}),(0,a.jsx)(`li`,{children:`Use a reference video for fast rhythm matching, while respecting rights and publishing boundaries.`})]}),(0,a.jsx)(`h2`,{id:`case`,children:`Case structure`}),(0,a.jsx)(`p`,{children:`A character rushing to meet someone at a cafe is a useful example: message received, late arrival noticed, rush outside, blocked by a red light, pause at the entrance, then enter and face the waiting person. The intermediate obstacles make the final tension believable.`}),(0,a.jsx)(`p`,{children:`Split this into three or four clips: reaction and departure, street obstacle, entrance and pause, then the final encounter. Keep each clip around 3-5 seconds and connect them in the edit.`}),(0,a.jsx)(`h2`,{id:`template`,children:`Output template`}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-output`,code:f}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-troubleshoot`,code:d}),(0,a.jsx)(`h2`,{id:`workflow`,children:`Recommended workflow`}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-workflow`,code:c}),(0,a.jsxs)(`p`,{children:[`If the real problem is character or spatial drift, repair those anchors first with the`,` `,(0,a.jsx)(`a`,{href:`/docs/guides/video-generation-skills-scene-consistency/`,children:`scene consistency guide`}),` `,`and the `,(0,a.jsx)(`a`,{href:`/docs/guides/video-generation-skills-ai-video-director/`,children:`AI video director guide`}),`.`]})]})}var m=`分镜四问：
1. 角色为什么行动
2. 角色要去哪里
3. 中途有什么阻力
4. 结果为什么成立`,h=`复杂动作两种主方法：
方法 A：12 宫格分镜法
- 适合原创动作设计

方法 B：参考视频替换法
- 适合快速拿到稳定运动节奏`,g=`推荐流程：
1. 先做角色与场景设定
2. 先拆分镜，不先写长动作句
3. 确定主动作锚点
4. 用 12 宫格或参考视频锁动作顺序
5. 单镜只做一个主动作
6. 生成多个短段，再剪辑拼接`,_=`案例：男主赶去咖啡馆见人
错误分镜：
收到消息 -> 出门 -> 走街上 -> 坐到女主对面

更完整的分镜：
收到消息 -> 看时间发现迟到 -> 快速出门 -> 路口被红灯拦住
-> 到咖啡馆门口停一下确认 -> 推门进去 -> 看到女主已经等很久 -> 坐下后冷场`,v=`12 宫格分镜法：
1. 先定角色和场景
2. 把复杂动作拆成 12 个连续状态
3. 每格只表达一个中间姿态
4. 再把 12 格整理成 3 到 4 个可生成视频的短段
5. 每段只保留一个主动作链`,y=`参考视频替换法：
1. 找动作节奏合适的参考视频
2. 拆出关键镜头和动作节点
3. 用自己的角色、场景和风格替换主体
4. 保留原动作节奏，不重写成完全不同的运动结构
5. 生成后再做局部修正和剪辑拼接`,b=`复杂动作排错：
动作像抽搐 -> 一个镜头里主动作太多，删到只剩一个
角色突然飘移 -> 没有角色资产或场景锚点
镜头因果断裂 -> 缺少“为什么动、去哪、结果为什么成立”
动作虽然对但不好看 -> 先修分镜逻辑，再谈镜头美学
参考视频复刻失败 -> 你换掉了动作结构，只保留了外观`,x=`推荐输出：
## 剧情目标
## 分镜四问回答
## 角色 / 场景参考
## 12 宫格或参考视频方案
## 拆段视频提示词
## 剪辑拼接顺序`;function S({title:e,intro:t,bullets:n}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function C(){let{locale:e}=t();return e===`zh`?(0,a.jsxs)(i,{path:`/docs/guides/video-generation-skills-complex-action-storyboard`,title:`复杂动作与分镜专题`,description:`基于 video-generation-skills 的 ai-video-director 模块，详细讲清复杂动作、分镜逻辑、12 宫格设计法和参考视频替换法。`,headings:[{id:`why`,text:`为什么复杂动作最容易崩`,level:2},{id:`logic`,text:`先补分镜逻辑`,level:2},{id:`methods`,text:`两种动作方法`,level:2},{id:`case`,text:`案例拆解`,level:2},{id:`template`,text:`输出模板`,level:2},{id:`workflow`,text:`推荐流程`,level:2}],children:[(0,a.jsx)(r,{tone:`info`,title:`复杂动作的核心不是画面好看，而是顺序正确`,children:(0,a.jsx)(`p`,{children:`复杂动作失败，通常不是因为模型不会动，而是因为提示词没有给出动作因果链和主次关系。`})}),(0,a.jsx)(`h2`,{id:`why`,children:`为什么复杂动作最容易崩`}),(0,a.jsx)(`p`,{children:`一旦一个镜头里同时出现奔跑、跳跃、转身、挥手、回头、说话，模型就会把多个动作揉成一团。 正确方式不是继续加描述，而是先拆镜头和动作顺序。`}),(0,a.jsx)(`h2`,{id:`logic`,children:`先补分镜逻辑`}),(0,a.jsx)(n,{lang:`text`,filename:`shot-logic`,code:m}),(0,a.jsx)(`p`,{children:`这四个问题解决的是镜头因果，而不是动作美学。先知道角色为什么动，再决定镜头怎么拍。`}),(0,a.jsx)(S,{title:`为什么复杂动作首先是剧情工程`,intro:`多数动作崩坏都不是身体不会动，而是前后动作缺少逻辑支撑。`,bullets:[`观众不知道角色为什么急，就感受不到奔跑的压力。`,`观众不知道角色要去哪，镜头切换就只剩随机运动。`,`观众不知道结果为什么成立，最后的情绪反应就会显得假。`]}),(0,a.jsx)(`h2`,{id:`methods`,children:`两种动作方法`}),(0,a.jsx)(n,{lang:`text`,filename:`action-methods`,code:h}),(0,a.jsx)(n,{lang:`text`,filename:`twelve-grid-method`,code:v}),(0,a.jsx)(n,{lang:`text`,filename:`ref-video-method`,code:y}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`12 宫格分镜法更适合原创内容、跑酷、格斗、舞蹈和情绪动作链。`}),(0,a.jsx)(`li`,{children:`参考视频替换法更适合快速复现已有节奏，但要注意版权和发布边界。`})]}),(0,a.jsx)(`h2`,{id:`case`,children:`案例拆解`}),(0,a.jsx)(`p`,{children:`下面这个“赶去咖啡馆见人”的案例很典型。它说明复杂动作的问题，往往不是跑得不够像，而是中间缺了因果节点。`}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-case`,code:_}),(0,a.jsx)(S,{title:`这个案例该怎么拆成视频段`,intro:`比起一条长镜到底，更稳的是拆成几段各有重点的片段。`,bullets:[`第一段做“收到消息 + 看时间 + 立刻起身”。`,`第二段做“街头赶路 + 红灯受阻”。`,`第三段做“门口停顿 + 推门进入 + 对视冷场”。`,`每段控制在 3 到 5 秒，再通过剪辑把压力和节奏连起来。`]}),(0,a.jsx)(`h2`,{id:`template`,children:`输出模板`}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-output`,code:x}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-troubleshoot`,code:b}),(0,a.jsx)(`h2`,{id:`workflow`,children:`推荐流程`}),(0,a.jsx)(n,{lang:`text`,filename:`complex-action-workflow`,code:g}),(0,a.jsx)(`p`,{children:`如果你发现问题并不在动作本身，而是在人物和空间不稳定，先回到 场景一致性和角色资产化相关教程，把基础锚点补齐，再回来做复杂动作。`})]}):(0,a.jsx)(p,{})}export{C as default};