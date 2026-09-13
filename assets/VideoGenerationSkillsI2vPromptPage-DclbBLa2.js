import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`Three hard rules for image-to-video:
1. The first frame already defines the style; describe motion and change only
2. Keep one dominant movement per prompt
3. Turn multiple actions into a timeline instead of one long sentence`,c=`0-2s: The girl remains in the snow, shoulders moving slightly, eyes looking into the distance
2-4s: She slowly turns, her gaze settles naturally on the camera, wind lifts her hair and coat
4-5s: The camera moves in slightly and stops at a medium close-up`,l=`Anchor: torso or center-of-mass action
Satellite: secondary changes in hands, head, clothing, and expression

Example:
Anchor: the subject steps forward and turns
Satellite: hair moves in the wind, fingers tighten slightly, gaze follows the turn`,u=`## First-frame responsibility
- Lock the character, scene, lighting, and color

## Video prompt
- Dominant action:
- Camera movement:
- Timeline:

## Constraints
- Do not change the first-frame style
- Do not add extra people
- Do not rebuild the background structure`,d=`1. Stabilize the first frame
2. Write one primary action before adding emotion
3. Convert two or more actions into a timeline
4. Use an anchor action for full-body movement
5. Generate only 3-5 seconds per shot
6. If unstable, repair the first frame instead of adding more prompt text`;function f(){return(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-i2v-prompt`,title:`Image-to-Video Prompt Guide`,description:`Learn how to write stable image-to-video prompts with one dominant action, timeline control, and anchor-based motion.`,headings:[{id:`principle`,text:`The core principle`,level:2},{id:`rules`,text:`Three hard rules`,level:2},{id:`timeline`,text:`Use a timeline for multiple actions`,level:2},{id:`anchor`,text:`The anchor-action method`,level:2},{id:`template`,text:`Single-shot template`,level:2},{id:`mistakes`,text:`Common mistakes`,level:2},{id:`workflow`,text:`Recommended workflow`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`Animate the first frame; do not rewrite it`,children:(0,o.jsx)(`p`,{children:`Image-to-video prompts are most stable when they describe what changes after the first frame. Repeating style, quality, and lighting instructions can make the model rebuild the image instead of animating it.`})}),(0,o.jsx)(`h2`,{id:`principle`,children:`The core principle`}),(0,o.jsx)(`p`,{children:`First lock the character, scene, lighting, and color in a still image. Then add only visible motion: a body action, a camera move, and changes over time. This keeps the video model from trying to solve composition, style, and movement at the same time.`}),(0,o.jsx)(`h2`,{id:`rules`,children:`Three hard rules`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-rules`,code:s}),(0,o.jsx)(`p`,{children:`For example, this timeline is more stable than a long sentence with conflicting actions:`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-example`,code:c}),(0,o.jsx)(`h2`,{id:`timeline`,children:`Use a timeline for multiple actions`}),(0,o.jsx)(`p`,{children:`When a shot contains a subject action, a camera change, and a secondary effect such as wind or a gaze shift, write explicit time ranges. The timeline tells the model the order of states and prevents every action from happening at once.`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Small head turns, hand movements, or breathing changes usually fit in 3-5 seconds.`}),(0,o.jsx)(`li`,{children:`Running, turning, stopping, and opening a door are often better as two shots.`}),(0,o.jsx)(`li`,{children:`Describe visible changes instead of abstract emotion labels.`})]}),(0,o.jsx)(`h2`,{id:`anchor`,children:`The anchor-action method`}),(0,o.jsx)(`p`,{children:`Choose one main action for the torso or center of mass. Let hair, clothing, hands, eyes, and facial expression follow as satellite changes. Without this hierarchy, each body part may move independently and the result feels disconnected.`}),(0,o.jsx)(r,{lang:`text`,filename:`anchor-action`,code:l}),(0,o.jsx)(`h2`,{id:`template`,children:`Single-shot template`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-shot-template`,code:u}),(0,o.jsx)(`h2`,{id:`mistakes`,children:`Common mistakes`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Repeating “8K”, “cinematic”, “hyper-realistic”, and “dreamy” in the video prompt.`}),(0,o.jsx)(`li`,{children:`Combining handheld motion, a smooth push-in, and a 360-degree orbit.`}),(0,o.jsx)(`li`,{children:`Asking one shot to run, jump, fall, look up, speak, and turn.`}),(0,o.jsx)(`li`,{children:`Changing a natural-light first frame into a high-contrast cyberpunk scene.`})]}),(0,o.jsx)(`h2`,{id:`workflow`,children:`Recommended workflow`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-workflow`,code:d}),(0,o.jsxs)(`p`,{children:[`For the full prompt design system, continue with`,` `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director`}),`. For spatial continuity, see `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-scene-consistency/`,children:`the scene consistency guide`}),`.`]})]})}var p=`图生视频三条硬规则：
1. 首帧已定风格，提示词只写运动和变化
2. 一条提示词只保留一种主导逻辑
3. 多动作必须写成时间线，不要一锅炖`,m=`错误写法：
电影级光影，8K，超写实，女孩站在雪地里慢慢转身看向镜头，
同时镜头高速环绕，头发随风飞舞，天空乌云翻滚，氛围非常高级梦幻`,h=`更稳的写法：
0-2s：女孩站在雪地里，肩膀轻微起伏，目光仍然看向远处
2-4s：她缓缓转身，视线自然落向镜头，寒风扬起发丝和衣角
4-5s：镜头轻微推近，停在半身近景`,g=`写法骨架：
[主导动作]
[运镜方式]
[从 0 到 n 秒的状态变化]

例如：
主角缓慢抬头，先停顿，再向前迈出一步。
固定机位，轻微推近。
0-2s 低头静止，2-4s 抬头呼吸，4-5s 迈步。`,_=`动作锚点法：
Anchor：躯干或重心主动作
Satellite：手部、头部、衣角、表情跟随变化

例如：
Anchor：人物向前迈步并转身
Satellite：发丝被风扬起，手指轻微收紧，眼神随后转向镜头`,v=`案例：校园少女回头镜头
首帧：少女站在教室窗边，逆光暖色，半身构图

错误写法：
少女突然转身看向镜头，镜头快速环绕，头发飞舞，阳光更强，情绪梦幻，电影级

正确拆法：
0-2s：少女维持原站姿，肩膀轻微起伏，视线还在窗外
2-4s：她缓缓转头，目光自然移向镜头，发丝被微风带起
4-5s：镜头轻微推近，停在面部和肩线之间`,y=`单镜头输出模板：
## 首帧职责
- 锁定人物、场景、光线、色调

## 视频提示词
- 主导动作：
- 运镜方式：
- 时间线：

## 生成约束
- 不改首帧风格
- 不加额外人物
- 不重做背景结构`,b=`问题 -> 处理方式
人物动作像抽搐 -> 删掉多余动词，只保留一个主动作
镜头很乱 -> 只留一种运镜，不要再写环绕 + 推进 + 手持
表情假 -> 改成呼吸、停顿、视线转移、肩膀起伏
背景变了 -> 删除风格词和环境词，只保留动作变化
片段太空 -> 给动作加前后状态，而不是堆形容词`,x=`推荐执行顺序：
1. 先确认首帧静态图已经稳定
2. 先写 1 个主动作，不先写情绪判断
3. 如果动作超过 2 个，改成时间线
4. 如果涉及全身联动，先写锚点动作
5. 每镜只生成 3 到 5 秒
6. 不稳定就回到首帧修，不要一直追加视频提示词`;function S({title:e,intro:t,bullets:n}){return(0,o.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,o.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,o.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,o.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,o.jsx)(`li`,{children:e},e))})]})}function C(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/video-generation-skills-i2v-prompt`,title:`图生视频提示词专题`,description:`基于 video-generation-skills 的 prompt-director 模块，详细讲清图生视频提示词怎么写，怎样避免动作混乱、运镜冲突和 AI 味过重。`,headings:[{id:`why`,text:`为什么图生视频最容易写废`,level:2},{id:`rules`,text:`三条硬规则`,level:2},{id:`timeline`,text:`时间线写法`,level:2},{id:`anchor`,text:`动作锚点法`,level:2},{id:`case`,text:`案例拆解`,level:2},{id:`template`,text:`单镜头模板`,level:2},{id:`mistakes`,text:`最常见的错误`,level:2},{id:`workflow`,text:`推荐工作流`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`图生视频不是重写首帧`,children:(0,o.jsx)(`p`,{children:`首帧已经包含了光线、材质、色调、景别和主体外观。进入图生视频阶段后，提示词的职责只剩下 “接下来会发生什么”，而不是再把整张图描述一遍。`})}),(0,o.jsx)(`h2`,{id:`why`,children:`为什么图生视频最容易写废`}),(0,o.jsx)(`p`,{children:`很多失败案例都不是模型能力不够，而是提示词职责混乱。用户把静态图阶段的风格词、渲染词、 画质词重新抄进视频提示词里，结果模型一边想保留首帧，一边又被要求重做风格，最后动作和镜头都会漂。`}),(0,o.jsx)(`h2`,{id:`rules`,children:`三条硬规则`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-rules`,code:p}),(0,o.jsx)(`p`,{children:`对比一下最典型的错误写法和更稳的写法：`}),(0,o.jsx)(r,{lang:`text`,filename:`bad-i2v-example`,code:m}),(0,o.jsx)(r,{lang:`text`,filename:`good-i2v-example`,code:h}),(0,o.jsx)(`h2`,{id:`timeline`,children:`时间线写法`}),(0,o.jsx)(`p`,{children:`当一个镜头里出现两个以上动作时，就不要继续写自然语言长句，而应该切成时间线。 时间线的目的不是显得专业，而是让模型知道动作顺序。`}),(0,o.jsx)(r,{lang:`text`,filename:`action-template`,code:g}),(0,o.jsx)(S,{title:`什么时候必须改写成时间线`,intro:`只要镜头里既有主体动作，又有镜头变化，再加上一个次级动作，就已经该拆时间线了。`,bullets:[`人物从静止到转头，再到迈步，这已经是三个状态。`,`镜头先固定、后推进，也属于时间顺序变化。`,`如果还有风、衣角、头发、视线变化，就更不能继续写成长句。`]}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`如果角色只需要轻微转头、抬手、呼吸变化，3 到 5 秒就够了。`}),(0,o.jsx)(`li`,{children:`如果一个镜头需要奔跑、回头、停步、开门，通常应该拆成两个镜头。`}),(0,o.jsx)(`li`,{children:`时间线里尽量只保留肉眼可见的变化，不要写抽象情绪判断。`})]}),(0,o.jsx)(`h2`,{id:`anchor`,children:`动作锚点法`}),(0,o.jsx)(`p`,{children:`video-generation-skills 里一个很实用的思路是锚点动作。复杂动作时，不要让全身部位同时成为主语， 而是先确定一个主动作，再让其他细节跟随。`}),(0,o.jsx)(r,{lang:`text`,filename:`anchor-template`,code:_}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`奔跑、跳跃、转身、坐下、起身，通常由躯干和重心作为锚点。`}),(0,o.jsx)(`li`,{children:`头发、衣角、手指、眼神和表情更适合做从属变化。`}),(0,o.jsx)(`li`,{children:`如果主次不分，模型容易把每个部位都做成“各玩各的”。`})]}),(0,o.jsx)(`h2`,{id:`case`,children:`案例拆解`}),(0,o.jsx)(`p`,{children:`下面这个例子基本覆盖了最常见的图生视频错误。问题不在模型，而在于用户同时要求“改风格、改镜头、改动作、改情绪”。`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-case-breakdown`,code:v}),(0,o.jsx)(`h2`,{id:`template`,children:`单镜头模板`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-shot-template`,code:y}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-error-map`,code:b}),(0,o.jsx)(`h2`,{id:`mistakes`,children:`最常见的错误`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`把“8K、电影级、超写实、梦幻氛围”继续塞进视频提示词。`}),(0,o.jsx)(`li`,{children:`同时要求强手持、平滑推进、360 环绕，运镜逻辑互相冲突。`}),(0,o.jsx)(`li`,{children:`一条提示词里要求角色跑、跳、摔倒、抬头、说话、转身。`}),(0,o.jsx)(`li`,{children:`首帧是日系自然光，视频提示词却强行改成赛博朋克高对比。`})]}),(0,o.jsx)(`h2`,{id:`workflow`,children:`推荐工作流`}),(0,o.jsx)(r,{lang:`text`,filename:`i2v-workflow`,code:x}),(0,o.jsxs)(`p`,{children:[`更稳的流程通常是：先做关键帧，确认角色和场景，再写单镜头动作提示词。如果你还没把静态图锁稳， 先回到 `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director 总教程`}),`或 `,(0,o.jsx)(t,{to:`/docs/guides/video-generation-skills-scene-consistency/`,children:`场景一致性专题`}),`。`]})]}):(0,o.jsx)(f,{})}export{C as default};