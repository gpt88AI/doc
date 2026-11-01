---
title: 自媒体创作者 Skills 工具链：从选题、生产到发布复盘
description: 整理 lumxss 分享的创作者 Skills 清单，按内容生产、趋势与选题、多平台发布、视频剪辑和工具目录分类，并给出从选题到复盘的组合方式与链接核验说明。
date: 2026-11-01
category: AI 工具指南
tags: [AI Agent, Skills, 自媒体, 内容创作, 视频生产, 多平台发布]
readTime: 12
---

AI 创作工具越来越多，刚开始做自媒体的人常会陷入“先装一堆工具”的误区。lumxss（[@bkdgiffug](https://x.com/bkdgiffug)）在 [这条 X 帖子](https://x.com/bkdgiffug/status/2116416881372643391)里，把自己整理的创作者 Skills 清单分成内容生产、热点选题、多平台发布、剪辑与视频生产、工具目录几类。

这份清单的实用之处，不在于某个工具能代替完整创作，而在于它提示了一个内容工作流需要哪些环节：发现值得做的话题，形成适合账号和平台的方案，制作图文或视频，发布后再看数据和反馈。本文按这条工作流重新整理，并保留原帖信息的边界。

> **来源说明**：以下功能概述仅转述原帖作者对项目的简短描述，不代表本文已逐一安装、运行或评测这些工具。若原帖链接只给出部分仓库路径，文中会保留原始写法；通过 GitHub 搜索找到的相似项目仅作为可能候选，不据此断言原帖链接的目标。

![原帖配图：烽火台 Beacon 的创作者多平台选题创作界面示例](https://pbs.twimg.com/media/HV4E1wbawAAwhbX.png?name=large)

## 先把内容工作拆成五步

```text
发现选题 → 形成内容方案 → 制作图文或视频 → 多平台发布 → 复盘数据
     ↑                                                        ↓
     └──────────────── 下一轮选题与表达调整 ──────────────────┘
```

清单里的工具覆盖其中不同环节。它们不必全部接入一个自动化流程，也不必同时安装。更稳妥的起点是选一个真实、重复出现的工作痛点，例如每周要从多个来源找选题，或同一篇文章需要改写成公众号和小红书版本，再为这一段流程挑工具。

## 一、内容生产 Skills：从方向到可发布内容

### 模块化自媒体 Skills

原帖链接写作 `yanhua1010/sel`，并将它概括为覆盖选题、账号策略、平台文案、短视频方案、发布和复盘的一组模块化 Skills。该短地址当前无法直接确认仓库；GitHub 搜索找到名称和描述高度吻合的 [`yanhua1010/self-media-content-workflow`](https://github.com/yanhua1010/self-media-content-workflow)，这里将它作为可能匹配项，仍建议从原帖跳转核对。

### 宝玉的内容创作 Skills

原帖链接写作 `JimLiu/baoyu-s`，并提到小红书信息图、封面、公众号发布和 X 发布等场景。GitHub 上的 [`JimLiu/baoyu-skills`](https://github.com/JimLiu/baoyu-skills) 是名称相近的项目；原帖链接本身未能确认是否指向它，使用前请核对原帖跳转目标和 README。

### LDJ-creat 的媒体创作项目

原帖给出 `LDJ-creat/medi`，并描述选题、写作、配图、微信/CSDN/掘金发布和数据；随后标注“升级版”，链接写作 `LDJ-creat/Medi`。这两条链接在帖子中都只显示部分仓库名。

GitHub 当前在该账号下能搜索到 [`MediaManager`](https://github.com/LDJ-creat/MediaManager) 和 [`media-skills`](https://github.com/LDJ-creat/media-skills) 等名称相近的仓库。它们的简介与原帖描述有重合，但仅凭简介不能确认哪个对应“旧版”或“升级版”，因此不替作者补全映射。落地前请以原帖链接实际跳转结果、仓库 README 和提交历史为准。

### 多位创作者风格的可调用 Skill

原帖链接写作 `momozi1996/awe`，并称其把多位 AI 自媒体创作者的写法整理成可调用 Skill，覆盖选题、热点和合规。GitHub 搜索到描述相近的 [`momozi1996/awesome-ai-persona-skills`](https://github.com/momozi1996/awesome-ai-persona-skills)，但不能确认它就是帖子中的目标仓库。风格参考可以帮助形成草稿，但应避免直接模仿仍在世创作者的独特表达；更可靠的做法是提炼可公开描述的写作属性，例如句长、段落结构、受众知识水平和论证顺序，再用自己的案例和观点完成内容。

## 二、热点与选题：把信息流变成待验证的题目

| 原帖资源 | 作者给出的用途 | 适合承担的环节 |
| --- | --- | --- |
| 原帖写作 `sansan0/TrendR`；可能匹配 [`sansan0/TrendRadar`](https://github.com/sansan0/TrendRadar) | 多平台热点聚合 | 发现候选话题 |
| [`AiyaFun/beacon`](https://github.com/AiyaFun/beacon) | 热榜、竞品、选题、一稿多平台改写、敏感词检测 | 把话题变成内容简报 |
| [`DIYgod/RSSHub`](https://github.com/DIYgod/RSSHub) | 将各平台内容转成 RSS | 订阅公开资讯和行业来源 |

热点列表只是选题信号，不是选题结论。发布前仍要核对事实来源、时间、数据和上下文；平台热度也不代表话题适合账号受众。可以把每条候选题目记录成一个简报：

```text
受众是谁：
他们正在问什么：
事实来源与时间：
这条内容能补充什么新信息：
适合发布的平台与形式：
潜在误解、版权或合规风险：
发布后观察什么指标：
```

RSSHub 更适合搭建订阅入口。使用时应遵守各来源网站的服务条款和访问频率要求；抓到内容也不代表可以直接转载全文或图片。

## 三、多平台发布：减少重复操作，保留人工审核

原帖列出的多平台发布项目包括：

- 原帖写作 `rehatRobot/omn`：作者称支持抖音、B 站、小红书、快手、视频号、头条等平台发布。GitHub 上的 [`rehatRobot/omnipost`](https://github.com/rehatRobot/omnipost) 是名称相近的候选，是否为原帖目标仍需确认。
- 原帖写作 `spider-ios/aut`：帖子描述为多平台发布、视频搬运和监控。该账号下的 [`spider-ios/autox-release`](https://github.com/spider-ios/autox-release) 是候选，不能仅根据前缀认定链接目标。

自动发布最值得检查的是平台授权、发布范围和失败恢复，而不只是平台数量。建议先用测试账号和一条低风险内容验证：

1. 账号授权是否只请求必要权限，令牌如何保存和撤销。
2. 图片比例、视频编码、标题长度和话题标签是否符合目标平台要求。
3. 发布失败时是否会重复发出相同内容。
4. 定时任务、草稿和审核状态能否追踪。
5. 平台规则或接口变化后，是否有人工复核机制。

不要把账号 Cookie、密码或长期令牌粘贴进 Skill、提示词、公开日志或仓库配置。优先使用平台提供的授权方式，并限制自动化账号的权限。

## 四、剪辑与视频生产：按文稿切片、去静音和程序化生成

原帖按视频环节列出几类工具：

| 工具链接 | 原帖描述 | 使用前重点确认 |
| --- | --- | --- |
| [`FernandoAbisha`](https://github.com/FernandoAbisha) | 按文稿剪口播并导出短视频切片 | 原帖只链接到 GitHub 用户名，没有给出具体仓库；需自行核对该账号当前项目 |
| 原帖写作 `WyattBlue/auto`；可能匹配 [`WyattBlue/auto-editor`](https://github.com/WyattBlue/auto-editor) | 自动去除口播静音 | 原帖链接并未确认是否对应候选 |
| 原帖写作 `remotion-dev/r`；项目候选 [`remotion-dev/remotion`](https://github.com/remotion-dev/remotion) | 用代码批量生成视频 | 使用前核对原帖最终跳转目标 |
| 原帖写作 `mifi/lossless-`；项目候选 [`mifi/lossless-cut`](https://github.com/mifi/lossless-cut) | 无损剪切 | 原帖路径不完整，需确认链接对应关系 |

剪辑自动化适合处理重复、边界明确的任务，例如检测静音段、按时间点拆分片段、套用字幕样式和批量渲染。它不能自动判断某段口播是否有价值，也不能保证切点符合语义。导出后至少检查：

- 人声是否被误剪，句子开头和结尾是否完整；
- 字幕、画面和音频是否同步；
- 画面中是否出现隐私信息或未授权素材；
- 不同平台的尺寸、码率和时长要求是否满足；
- 是否保留项目文件和可重新导出的源素材。

程序化视频可以重复生成一致的图表动画、字幕和品牌片头；相比随机剪辑，它更适合模板化、结构稳定的内容。生成的画面仍需检查事实、版权、可读性和无障碍字幕。

## 五、工具目录：用来发现候选，不是认证名单

原帖还列出两个工具集合：

- 原帖写作 `lucky-verma/aw`：作者称是剪辑、字幕、发布等创作者工具合集。GitHub 上的 [`awesome-creator-tools`](https://github.com/lucky-verma/awesome-creator-tools) 是名称相近的候选。
- 原帖写作 `JuneYaooo/awes`：作者称是 AI 视频与社媒自动化工具列表。该账号下有 [`awesome-ai-media-cn`](https://github.com/JuneYaooo/awesome-ai-media-cn) 和 [`awesome-ai-media`](https://github.com/JuneYaooo/awesome-ai-media) 等相近项目，不能只凭缩写判定目标。

两条仓库路径在原帖中都只显示了开头。GitHub 当前搜索可以找到 `awesome-creator-tools`、`awesome-ai-media-cn` 等名称相近的项目，但无法凭部分路径确定原帖链接究竟指向哪个仓库。把目录当成发现入口即可；安装、授权和付费前，应检查最近提交、许可证、维护者说明和工具实际访问的数据。

## 用最小组合开始

对于个人创作者，先以现有发布平台和编辑软件为基础，只补齐最薄弱的一环：

1. **选题不稳定**：建立少量可信 RSS 来源，再用趋势聚合工具生成候选，不直接自动发稿。
2. **同一内容要多平台适配**：把原始事实和核心观点固定下来，再生成不同平台的结构和长度，人工核对差异。
3. **视频剪辑重复劳动多**：从静音检测或口播切片中的一个步骤开始，检查误剪率和返工时间。
4. **发布后没有复盘**：固定记录选题、发布时间、平台、展示量、互动和有效反馈，比较一段时间内的变化。

每加一个工具，都问三个问题：它减少了哪项具体工作？产出如何检查？失败时如何恢复？如果答案不明确，先不要把它接入自动发布或账号授权链路。

## 参考来源

- lumxss（[@bkdgiffug](https://x.com/bkdgiffug)）：[自媒体创作者必备 Skill 清单](https://x.com/bkdgiffug/status/2116416881372643391)，发布于 2026 年 10 月 31 日。
- [AiyaFun/beacon](https://github.com/AiyaFun/beacon)
- [DIYgod/RSSHub](https://github.com/DIYgod/RSSHub)
- 原帖中其余项目链接按作者发布时可见的仓库路径保留；缩写与候选仓库之间的对应关系尚未确认。
