import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`# 方式 A: 安装 Taste Skill 完整技能包到 Codex skills 目录
npx skills add Leonxlnx/taste-skill -a codex

# 方式 B: 安装默认前端设计 skill
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# 方式 C: 如果你只想使用更适合 GPT / Codex 的严格变体
npx skills add https://github.com/Leonxlnx/taste-skill --skill "gpt-tasteskill"`,s=`检查点：

1. Codex 是否能读取新增的 SKILL.md
2. 当前项目是否已经有设计系统、组件库或品牌规范
3. 任务是否明确说明页面类型、用户、风格、参考站点和交互复杂度
4. Codex 是否先做设计解读，再开始写代码
5. 输出前是否完成 anti-slop pre-flight check`,c=`请使用 Taste Skill 的前端设计规则完成这个页面。

项目背景：
- 产品类型：AI API 文档站
- 目标用户：开发者、AI 工具用户、团队管理员
- 视觉方向：深色技术文档、克制高对比、不要 AI 紫色模板感
- 参考：保留当前 gpt88.cc 文档站风格，不要破坏已有导航和布局

执行要求：
1. 先读取现有页面和组件，不要直接重写全站
2. 先给出一句 design read，说明你判断的页面类型、密度、动效和布局方向
3. 使用现有组件和 CSS 变量，除非确实需要新增局部样式
4. 避免三等分功能卡、无意义渐变 blob、假 dashboard 装饰和占位内容
5. 完成后运行构建或最小验证，并说明改了什么`,l=`示例 design read：

这是一个开发者文档站，不是消费级营销页。
视觉应以信息密度、可读性、代码块、清晰锚点和稳定导航为核心。
布局可以使用不对称说明卡、步骤化流程、对比表和真实配置片段。
动效保持轻量，避免为了炫技影响阅读。`,u=`推荐工作流：

1. 先让 Codex 读取当前页面、组件、CSS 和导航结构
2. 让 Codex 输出 design read，不急着写代码
3. 让 Codex 列出页面信息架构：首屏、步骤、示例、FAQ、下一步
4. 只实现一版，不同时生成多个互相冲突的视觉方向
5. 运行构建、预览或截图验证
6. 如果不满意，基于具体问题迭代，不要让 Codex 整页推倒重来`,d=`输出前检查：

1. Hero 是否一眼说明页面价值
2. 是否用了真实产品语境，而不是泛泛的 AI 营销词
3. 是否避免三张等宽功能卡反复堆叠
4. 是否避免无意义的紫色渐变、网格、发光 blob
5. 是否保留现有设计系统和导航结构
6. 是否有真实步骤、真实命令、真实配置片段
7. 移动端布局是否可读
8. 代码是否能构建通过
9. 页面是否有内链、标题层级和 SEO 描述
10. 没有占位文案、TODO、假数据或未完成区块`,f=`常见问题：

1. Codex 没有使用 skill
   - 明确在提示词里写“使用 Taste Skill 规则”
   - 确认 SKILL.md 放在 Codex 能读取的位置

2. 页面还是很模板
   - 要求 Codex 先做 design read
   - 指定行业、受众、密度、参考站点和禁用模式

3. 和现有站点风格冲突
   - 让 Codex 先读取现有组件和 CSS
   - 明确要求继承当前设计系统

4. 改得太多
   - 限制只改某个页面或某个 section
   - 要求不改路由、不改全局导航、不改共享组件 API

5. 构建失败
   - 先修 TypeScript / JSX 错误
   - 再处理视觉细节，不要把失败版本继续扩写`;function p({headers:e,rows:t}){return(0,a.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,a.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,a.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,a.jsx)(`tr`,{children:e.map(e=>(0,a.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,a.jsx)(`tbody`,{children:t.map((e,t)=>(0,a.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,a.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}function m(){return(0,a.jsxs)(r,{path:`/docs/guides/codex-frontend-taste-skill`,title:`Codex 前端设计 Skill 教程：用 Taste Skill 避免 AI 模板感`,description:`使用 Taste Skill 为 Codex 增强前端设计判断力，改善 AI 生成页面的排版、动效、设计系统、反模板化检查和最终交付质量。`,headings:[{id:`intro`,text:`为什么需要前端设计 Skill`,level:2},{id:`taste-skill`,text:`Taste Skill 是什么`,level:2},{id:`install`,text:`安装到 Codex`,level:2},{id:`workflow`,text:`推荐工作流`,level:2},{id:`prompt`,text:`可复制提示词`,level:2},{id:`rules`,text:`设计规则怎么用`,level:2},{id:`checklist`,text:`Anti-slop 检查清单`,level:2},{id:`troubleshooting`,text:`常见问题`,level:2},{id:`references`,text:`参考资料`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,a.jsx)(i,{tone:`info`,title:`适用场景`,children:(0,a.jsx)(`p`,{children:`这篇教程适合用 Codex 做前端页面、落地页、文档站、控制台、营销页或组件重构时使用。 目标不是让 Codex 多写样式，而是让它先判断设计方向，再按规则交付不模板化的界面。`})}),(0,a.jsx)(`h2`,{id:`intro`,children:`为什么需要前端设计 Skill`}),(0,a.jsx)(`p`,{children:`AI 写前端很容易出现同质化结果：紫色渐变、三张功能卡、假 dashboard、空洞营销词、 过度发光和没有信息密度的首屏。Codex 能读代码、改代码、跑构建，但如果没有设计约束， 它也可能默认生成“看起来像 AI 生成”的界面。`}),(0,a.jsxs)(`p`,{children:[`前端设计 Skill 的价值是把审美判断、页面结构、禁用模式、动效边界和交付检查写成`,(0,a.jsx)(`code`,{children:`SKILL.md`}),`，让 Codex 在每次执行前都能读取这些规则。`]}),(0,a.jsx)(`h2`,{id:`taste-skill`,children:`Taste Skill 是什么`}),(0,a.jsxs)(`p`,{children:[(0,a.jsx)(`a`,{href:`https://www.tasteskill.dev/`,target:`_blank`,rel:`noreferrer`,children:`Taste Skill`}),`是一个开源的 AI agent 前端设计 skill 集合，定位是减少 AI 生成前端的模板感。 它支持 Codex、Claude Code、Cursor、Gemini CLI、v0、Lovable、OpenCode 等支持`,(0,a.jsx)(`code`,{children:`SKILL.md`}),` 的工具。`]}),(0,a.jsx)(`p`,{children:`根据官方文档，v2 会先读取 brief，再推断页面类型、受众、情绪、布局变化、动效深度和设计方向。 它还包含 dark mode protocol、redesign audit、block schema、hero discipline 和 hard pre-flight check。`}),(0,a.jsx)(p,{headers:[`能力`,`解决什么问题`,`Codex 使用建议`],rows:[[`Brief inference`,`避免没读需求就直接套模板`,`让 Codex 先输出一句 design read，再写代码。`],[`Design-system map`,`判断什么时候用官方设计系统，什么时候只做视觉近似`,`已有组件库时优先复用，不要另起一套风格。`],[`Animation skeletons`,`避免手写脆弱滚动监听和随机动效`,`有动效需求时让 Codex 使用明确的 motion / GSAP / CSS 模式。`],[`Anti-slop bans`,`限制常见 AI 模板套路`,`把禁用模式写进任务要求，减少返工。`],[`Pre-flight check`,`输出前强制自检`,`让 Codex 在最终回复前逐项确认页面、移动端和构建状态。`]]}),(0,a.jsx)(`h2`,{id:`install`,children:`安装到 Codex`}),(0,a.jsxs)(`p`,{children:[`Taste Skill 官方文档给出了通用安装命令，也提供 Codex 方向的安装方式。 如果你只是想给当前项目增强前端设计，可以先安装默认的 `,(0,a.jsx)(`code`,{children:`design-taste-frontend`}),`。 如果你希望 Codex 全局可用，可以把完整技能包装入 Codex skills 目录。`]}),(0,a.jsx)(n,{lang:`bash`,filename:`install-taste-skill.sh`,code:o}),(0,a.jsx)(i,{tone:`warn`,title:`不要盲目覆盖项目设计系统`,children:(0,a.jsx)(`p`,{children:`Taste Skill 是设计规则，不是让 Codex 推翻现有品牌。已有 Tailwind tokens、组件库、 shadcn、Radix、Material、Polaris、Carbon 或内部 design system 时，应该先继承现状。`})}),(0,a.jsx)(n,{lang:`text`,filename:`verify`,code:s}),(0,a.jsx)(`h2`,{id:`workflow`,children:`推荐工作流`}),(0,a.jsx)(n,{lang:`text`,filename:`workflow`,code:u}),(0,a.jsx)(`p`,{children:`对现有项目，最重要的是“先审计，再改造”。不要让 Codex 直接重写整个页面， 先让它指出哪些地方像模板、哪些地方要保留、哪些地方可以现代化。`}),(0,a.jsx)(`h2`,{id:`prompt`,children:`可复制提示词`}),(0,a.jsx)(`p`,{children:`下面这段适合直接发给 Codex。它把 Taste Skill 的重点翻译成可执行约束： 先读取上下文，先判断设计方向，再落代码，最后验证。`}),(0,a.jsx)(n,{lang:`text`,filename:`codex-prompt`,code:c}),(0,a.jsx)(n,{lang:`text`,filename:`design-read-example`,code:l}),(0,a.jsx)(`h2`,{id:`rules`,children:`设计规则怎么用`}),(0,a.jsx)(`p`,{children:`Taste Skill 官方文档把 v2 的规则拆成 brief inference、design-system map、animation skeletons、 dark mode protocol、redesign protocol、block library schema 和 hard pre-flight check。 在 Codex 里不需要一次性背完这些规则，重点是把它们变成任务过程。`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`新页面：先定义页面类型、用户、情绪、密度、参考站点，再实现。`}),(0,a.jsx)(`li`,{children:`旧页面改造：先做视觉 audit，列出保留项和改造项，再改代码。`}),(0,a.jsx)(`li`,{children:`组件库项目：先查现有组件、tokens、主题变量，避免新增冲突风格。`}),(0,a.jsx)(`li`,{children:`动效页面：优先使用稳定的动画模式，不要手写脆弱 scroll listener。`}),(0,a.jsx)(`li`,{children:`文档站：优先保障可读性、锚点、代码块、表格、内链和移动端阅读。`})]}),(0,a.jsx)(`h2`,{id:`checklist`,children:`Anti-slop 检查清单`}),(0,a.jsx)(n,{lang:`text`,filename:`anti-slop-checklist`,code:d}),(0,a.jsx)(`h2`,{id:`troubleshooting`,children:`常见问题`}),(0,a.jsx)(n,{lang:`text`,filename:`troubleshooting`,code:f}),(0,a.jsx)(`h2`,{id:`references`,children:`参考资料`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`a`,{href:`https://www.tasteskill.dev/`,target:`_blank`,rel:`noreferrer`,children:`Taste Skill 官网`}),` `,`：介绍 anti-slop frontend framework、支持的 agent 和当前 skill 列表。`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`a`,{href:`https://www.tasteskill.dev/docs`,target:`_blank`,rel:`noreferrer`,children:`Taste Skill Docs`}),` `,`：安装命令、Codex 安装方式、v2 思路、禁用模式和 pre-flight check。`]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`a`,{href:`https://github.com/Leonxlnx/taste-skill`,target:`_blank`,rel:`noreferrer`,children:`Leonxlnx/taste-skill GitHub`}),` `,`：开源 skill 文件、不同风格 skill、image generation skill 和 changelog。`]})]}),(0,a.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`如果你还没配置 Codex 模型调用，先看 `,(0,a.jsx)(t,{to:`/docs/integrations/dev/codex-cli/`,children:`Codex CLI 接入 gpt88.cc`}),`。`]}),(0,a.jsxs)(`li`,{children:[`如果 Codex 工具突然不可用，看 `,(0,a.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex 工具恢复`}),`。`]}),(0,a.jsxs)(`li`,{children:[`如果你要让 Codex 生成图片素材，看 `,(0,a.jsx)(t,{to:`/docs/guides/codex-gpt-image-2-skill/`,children:`Codex gpt-image-2 Skill`}),`。`]})]})]})}export{m as default};