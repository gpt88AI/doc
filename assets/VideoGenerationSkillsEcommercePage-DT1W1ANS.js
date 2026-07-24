import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`1. 读 cheatsheet.md
2. 读 confirmation-gates.md
3. 用 AskQuestion 问清品类、平台、输入素材
4. 输出工作流草案
5. 打开对应垂类 reference
6. 逐步输出 Prompt / 操作步骤 / 批量裂变策略`,s=`服装
  读：references/fashion.md

3C / 数码
  读：references/3c-digital.md

美妆 / 家居 / 宠物 / 保健
  读：references/verticals.md

通用工作流
  读：references/workflows.md`,c=`## 电商品类 & 平台
## 输入素材
## 工作流步骤
## 每步工具 & 提示词要点
## 批量裂变策略`,l=[`魔音音箱超写实电商产品图项目教学`,`漫步者音箱详情页教程`,`漫步者音箱 AI 视频教程`,`Sora2 + 剪映商业级音箱切片流程`,`大透视产品海报生成指南`,`多产品商业级组合场景工作流`,`Gemini 自动化生成 Seedance 2.0 产品 CG`,`批量生成高转化产品卖点海报`,`逆光剪影美学 3C 海报`,`GPT Image 详情页 3.0 工作流`,`泰式反转广告全流程`,`挂脖风扇广告实战`],u=`Sora2 图转视频铺量 TK 视频,LV 手袋商业级成片,AI 生成会说话的服装博主,海外 Ins 买家秀工作流,圣诞营销物料 5 分钟出图,上传一张图生成详情页,白底图生成种草视频,Keevx 电商服装视频实测,黑底闪光灯服装大片,版型 + 纹样自由组合,人货场自动化生成,单品图批量生成 Lookbook,Ins 风平铺穿搭,0 成本量产服装主图,批量制作 Plog 图文,素人种草视频自动生成,白底图裂变 10 条广告片,单品裂变生活方式视频,AI 美妆 UGC,低头杀 + 对镜拍素材,一张图裂变 9 种户外场景,Nike x Super-i 商业概念短片,连贯真实口播视频,冲锋衣详情页全流程,服装营销全链路 UGC,黑衣人赛博试衣,即梦 Seedance 2.0 变装视频,Seedance 2.0 服装视频 5 风格,Lovart 对话流复刻穿搭海报,复刻爆款 UGC 对镜自拍,AI 视频复刻 TVC 与 UGC,三张图生成服装工厂宣传视频`.split(`,`),d=[`电商业 AI 模特图`,`Nano Banana 电商模特`,`Nano Banana 场景适配`,`保健品多语种口播`,`保健品虚拟主播带货`,`保健品功效视频`,`官网宣传图制作全流程`,`AI 制作保健品广告`,`保健品身材延时摄影宣传`,`自动换衣 + 动态走秀`,`跨境电商 AI 场景图`,`收腹裤 TikTok 爆款视频`,`家居官方级宣传图`,`美妆情人节营销大片`,`宠物品牌全案`],f=[`AI 宠物带货视频三步工作流`,`爆款短视频裂变教程`,`亚马逊产品头图全流程`],p=`电商开工前先确认：
- 品类：服装 / 3C / 美妆 / 家居 / 宠物 / 保健
- 平台：淘宝 / 小红书 / TikTok / Amazon / 独立站
- 素材：白底图 / 详情图 / 模特图 / 参考视频 / 参考链接
- 目标：主图 / 详情页 / Lookbook / UGC / 短视频 / 广告片
- 规模：单素材试产 or 批量裂变`,m=`模式 A：白底图裂变
- 适合：先做主图、场景图、详情页和短视频首帧

模式 B：单产品做整套资产
- 适合：产品页、海报、A+、横竖版广告一起出

模式 C：从参考爆款反推
- 适合：要快速对标平台已有高转化内容

模式 D：把图扩成视频
- 适合：TikTok、Reels、种草和口播素材`,h=`输出建议：
1. 平台与受众
2. 素材现状
3. 推荐工作流
4. 首图 / 场景 / 视频分镜方案
5. 每一步工具与提示词重点
6. 批量裂变与复用策略`;function g({title:e,topics:t}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:t.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function _({title:e,intro:t,bullets:n}){return(0,a.jsxs)(`section`,{className:`not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5`,children:[(0,a.jsx)(`h3`,{className:`text-base font-semibold text-ink-50`,children:e}),(0,a.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:t}),(0,a.jsx)(`ul`,{className:`mt-3 grid gap-2 text-sm leading-6 text-ink-200`,children:n.map(e=>(0,a.jsx)(`li`,{children:e},e))})]})}function v(){return(0,a.jsxs)(r,{path:`/docs/guides/video-generation-skills-ecommerce`,title:`ecommerce 详细教程`,description:`讲清 video-generation-skills 里的 ecommerce skill 如何处理电商主图、详情页、UGC、种草视频，以及服装、3C、美妆等垂类素材工作流。`,headings:[{id:`position`,text:`它解决什么问题`,level:2},{id:`flow`,text:`标准工作流`,level:2},{id:`verticals`,text:`垂类路由`,level:2},{id:`topics`,text:`教程目录`,level:2},{id:`chapters`,text:`章节精华`,level:2},{id:`scaling`,text:`批量裂变模式`,level:2},{id:`boundaries`,text:`与其他 skill 的边界`,level:2},{id:`output`,text:`推荐输出结构`,level:2}],children:[(0,a.jsx)(i,{tone:`info`,title:`ecommerce 不只是出图，它强调工作流`,children:(0,a.jsx)(`p`,{children:`仓库给它的定义不是“电商提示词集合”，而是“AI 电商素材工作流”。重点在于从产品图走到主图、 详情页、种草视频，而不是单独一张图。`})}),(0,a.jsx)(`h2`,{id:`position`,children:`它解决什么问题`}),(0,a.jsx)(`p`,{children:`这个模块面向服装、3C/数码、美妆、家居、宠物等电商场景，覆盖详情页、主图、lookbook、 UGC 种草视频、TikTok / Ins 内容和批量素材生成。它的优势不是“审美更高级”，而是更懂转化和平台适配。`}),(0,a.jsx)(`h2`,{id:`flow`,children:`标准工作流`}),(0,a.jsx)(n,{lang:`text`,filename:`ecommerce-flow`,code:o}),(0,a.jsx)(n,{lang:`text`,filename:`ecommerce-gates`,code:p}),(0,a.jsx)(`p`,{children:`仓库里把“品类 / 平台 / 输入素材未说明时必须先 AskQuestion”写成了硬性规则，这一点非常对。 电商素材如果不知道是淘宝、亚马逊还是 TK Shop，不知道是服装还是耳机，提示词方向会直接错位。`}),(0,a.jsx)(`h2`,{id:`verticals`,children:`垂类路由`}),(0,a.jsx)(n,{lang:`text`,filename:`vertical-routing`,code:s}),(0,a.jsx)(`p`,{children:`这意味着它不是一套“大一统电商 Prompt”，而是按垂类拆不同 reference。服装和 3C 的卖点表达、 构图、材质细节和人群氛围差别很大，所以分开是合理的。`}),(0,a.jsx)(`h2`,{id:`topics`,children:`教程目录`}),(0,a.jsx)(`p`,{children:`这个模块的原始索引里已经把覆盖主题按垂类列出来了，下面直接整理进文档：`}),(0,a.jsx)(g,{title:`3C / 数码（12）`,topics:l}),(0,a.jsx)(g,{title:`服装（32）`,topics:u}),(0,a.jsx)(g,{title:`美妆 / 家居 / 宠物 / 保健（15）`,topics:d}),(0,a.jsx)(g,{title:`通用工作流（3）`,topics:f}),(0,a.jsx)(`h2`,{id:`chapters`,children:`章节精华`}),(0,a.jsx)(`p`,{children:`这个模块真正有价值的地方，在于它不是让你多记几十条提示词，而是把不同类目的素材生产方式拆开了。 下面按真实项目流程整理核心内容。`}),(0,a.jsx)(_,{title:`3C / 数码：先锁产品结构，再做卖点镜头`,intro:`3c-digital.md 的核心方法是：不要让模型自由发挥硬件结构。产品图、草图和关键角度必须先锚定。`,bullets:[`产品 Hero 图、材质特写、功能可视化、场景化使用，通常要拆成 4 类镜头分别做。`,`复杂透视海报、爆炸图和悬浮拆解，优先用草图或参考图锁结构，再图生图。`,`产品卖点海报更像“商业 CG + 文案留白区”，不是把卖点文字塞进图里。`,`泰式反转广告、挂脖风扇广告这类案例，重点是节奏和创意钩子，不是单纯硬件渲染。`]}),(0,a.jsx)(_,{title:`服装：先做人物与版型系统，再扩成 Lookbook / UGC`,intro:`fashion.md 覆盖最广，说明服装是最适合做批量裂变的品类。它的核心不是换背景，而是“人货场一起变”。`,bullets:[`单品平铺、挂拍、模特图、三视图要分开管理，不要用一张图硬扩所有用途。`,`详情页强调版型、面料、穿着场景；UGC 强调镜头真实感、手机拍摄感和人物动作。`,`白底图裂变种草视频时，先做生活方式首帧，再扩成 3 到 5 秒短段视频拼接。`,`对镜自拍、低头杀、买家秀这类内容，人物动作链和手机镜头感比光影华丽更重要。`]}),(0,a.jsx)(_,{title:`垂类项目：保健、美妆、家居、宠物要按卖点重组`,intro:`verticals.md 不是简单罗列案例，而是在提示你：每个垂类的说服方式不同。`,bullets:[`保健品更适合“功效可视化 + 口播 + 时间变化”，而不是纯静物摆拍。`,`家居图重点是空间可信度和尺度感，产品不能像贴纸一样浮在房间里。`,`美妆内容通常要拆成质地特写、模特使用、节日营销 KV 和短视频四条线。`,`宠物带货更适合人格化场景和轻剧情，不能只把商品摆在猫狗旁边。`]}),(0,a.jsx)(_,{title:`从白底图到整套资产`,intro:`product-to-assets.md 和 workflows.md 共同强调的是“同一个 SKU 要做成资产池”，而不是临时抽几张图。`,bullets:[`先把白底图扩成统一风格场景图，再衍生主图、详情页、短视频首帧和广告图。`,`Amazon、独立站和小红书的素材结构不同，前者强调卖点清晰，后者强调氛围和代入感。`,`批量生产时要固定主色、镜头语言和人物类型，否则同一批素材会像来自不同品牌。`,`同一产品适合先做 1 套标准模板，再换场景、道具和文案方向裂变。`]}),(0,a.jsx)(`h2`,{id:`scaling`,children:`批量裂变模式`}),(0,a.jsx)(`p`,{children:`workflows.md 里最值得保留的是模式化生产思路。它不是单独某个工具技巧，而是告诉你怎么把同一个产品扩成一组可复用资产。`}),(0,a.jsx)(n,{lang:`text`,filename:`ecommerce-modes`,code:m}),(0,a.jsxs)(`p`,{children:[`如果你现在就是从白底图起步，直接继续看`,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-white-background-scaling/`,children:` 电商白底图裂变专题`}),`。`]}),(0,a.jsx)(`h2`,{id:`boundaries`,children:`与其他 skill 的边界`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`如果你做的是大牌 TVC 或高端品牌感大片，应该看 `,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-brand-ad-cg/`,children:`brand-ad-cg`}),`。`]}),(0,a.jsxs)(`li`,{children:[`如果你做的是剧情短片、人物连续叙事，应该看 `,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-ai-video-director/`,children:`ai-video-director`}),`。`]}),(0,a.jsxs)(`li`,{children:[`如果你只是要学习提示词理论，而不是电商工作流，应该看 `,(0,a.jsx)(t,{to:`/docs/guides/video-generation-skills-prompt-director/`,children:`prompt-director`}),`。`]})]}),(0,a.jsx)(`h2`,{id:`output`,children:`推荐输出结构`}),(0,a.jsx)(n,{lang:`text`,filename:`ecommerce-output`,code:c}),(0,a.jsx)(n,{lang:`text`,filename:`ecommerce-output-template`,code:h})]})}export{v as default};