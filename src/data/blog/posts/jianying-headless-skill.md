---
title: Jianying Headless：用 Agent Skill 生成、修改并导出可编辑剪映草稿
description: 整理 mcncarl/jianying-headless 项目，详细说明剪映无头编辑能力、yichen-jianying-edit Skill 的安装与调用、计划格式、独立副本编辑、原生导出、验收门禁和许可边界。
date: 2026-09-19
category: AI工具指南
tags: [Jianying Headless, 剪映, Agent Skill, AI视频, 无头剪辑, 视频工作流, Codex, GPT88]
readTime: 20
relatedPath: /docs/blog/codex-hyperframes-video-content-workflow/
relatedTitle: 用 Codex 和 HyperFrames 自动生成视频
---

很多 AI 视频工具可以直接生成一条成片，但如果团队还要继续修改字幕、轨道、片段、配音、画中画或导出参数，单纯拿到一个 MP4 往往不够。真正可复用的工作流，需要把素材、时间线、字幕和音频保留为可继续编辑的工程。

[`mcncarl/jianying-headless`](https://github.com/mcncarl/jianying-headless) 是一个面向剪映专业版 macOS 的本地自动化项目：在安装匹配版本剪映的 Apple Silicon Mac 上，通过结构化剪辑计划生成原生剪映草稿，在独立副本中修改已有多轨工程，并调用本机剪映引擎导出 H.264/AAC MP4。项目同时提供独立 Agent Skill：[`yichen-jianying-edit`](https://github.com/mcncarl/yichen-jianying-edit)，让 Codex 或其他支持 Skill 的 Agent 按固定流程完成环境检查、草稿构建、验证、登记和导出。

本文依据仓库 README、`SKILL.md`、安装教程、计划格式、已有工程编辑、原生导出、验证状态和分发范围整理，并补充 GPT88 / Codex 的调用边界与验收方法。

## 一、先看结论：它交付的是剪映工程，不只是视频文件

核心链路是：

```text
本地素材 + 结构化剪辑计划
  → 隔离构建目录
  → 可编辑的原生剪映草稿
  → 剪映首页登记与 UI 验收
  → 已验证快照的原生 MP4 导出
```

这和“调用视频生成 API，拿到 MP4”不同：

| 目标 | Jianying Headless 的处理方式 |
| --- | --- |
| 继续编辑 | 保留视频、音频、字幕和多轨结构 |
| 批量生成 | 用 JSON 计划描述轨道和片段，重复构建独立输出 |
| 修改旧工程 | 复制原草稿，在副本上执行明确操作 |
| 导出成片 | 只导出已经过构建验证的冻结快照 |
| 质量控制 | 检查素材字节、时间线、轨道、帧数、编解码和原生回读 |
| 安全边界 | 不复制剪映官方程序库，不读取账号凭据，不自动购买素材 |

默认交付物是可继续编辑的草稿。只有用户明确要求成片时，才进入原生导出流程。

## 二、核心项目和 Skill 的关系

```text
jianying-headless 核心项目
├── engine/       草稿构建、编辑、资源校验和原生导出
├── bridge/       文件与本机剪映程序库的桥接源码
├── tools/        构建和检查脚本
├── tests/        自动化测试
└── skills/       Agent Skill 与参考资料

yichen-jianying-edit Skill
├── SKILL.md      Agent 的行为边界和入口选择
├── scripts/      doctor、build、verify、edit、export 等入口
├── references/   计划、编辑、质检、导出和许可说明
└── agents/       宿主显示名、描述和默认提示词
```

核心项目负责“能不能构建和导出”；Skill 负责“Agent 应该如何选择入口、何时停止、如何验收”。只安装 Skill 不会自动获得剪映引擎，也不能绕过版本、签名、组件哈希和资源检查。

## 三、Skill 的详细能力

### 1. 新建可编辑草稿

Agent 可以根据 JSON 计划生成视频分段、多轨组合、独立配音、音乐和音效、可编辑字幕、变速、音量、位置、缩放、旋转、透明度、线性关键帧，以及已采集的几何蒙版和叠化转场。

### 2. 修改已有工程的独立副本

Skill 不直接覆盖原草稿，而是先检查源草稿身份、时间线哈希和文件清单，再复制到独立目录。支持替换字幕、调整片段属性、替换同类型本地素材、重命名轨道、复制片段、移除片段和调整已登记滤镜强度。源草稿发生变化时会停止，不用旧计划覆盖新状态。

### 3. 生成口播语义剪辑计划

对于删除停顿、保留完整句子、保留数字和产品名、按口播时间对齐字幕等需求，Skill 可通过 `edit_plan.py` 统一编译时间映射。转写是可选依赖：可以使用已有逐词稿，也可以接入另行授权的 ASR 执行器；不会自动充值、切换服务商或重复提交付费任务。

### 4. 导出已验证快照

用户明确要求成片时，Skill 可以从构建或编辑生成的独立快照导出 MP4，再用 FFmpeg / ffprobe 做完整解码、帧数、音频和媒体信息检查。它不会偷偷导出剪映 UI 中后来手工改过、但没有重新构建的版本。

## 四、运行前提：不是任意电脑都能直接运行

| 依赖 | 当前要求 |
| --- | --- |
| 电脑 | Apple Silicon Mac |
| 系统 | macOS 26.0+，仓库主要验证环境为 macOS 26.5.1 |
| 剪映 | 国内版剪映专业版 11.5.0；11.4.2 为兼容版本 |
| Python | 3.9+ |
| 媒体工具 | FFmpeg / ffprobe |
| 编译工具 | Xcode Command Line Tools，已验证 Apple clang 21.0.0 / macOS SDK 26.5 |
| 本地程序 | 匹配版本、签名、Team ID 和原生组件身份的剪映安装 |

这不是 Windows、Intel Mac、Rosetta 终端或任意剪映版本的兼容承诺。版本号相同也不够：项目还会检查安装身份、官方库哈希和签名。未知版本或组件不匹配时，应停在 `doctor`，不能修改固定哈希或删除检查。

## 五、安装核心项目与 Skill

### 安装核心项目

```bash
cd ~/Documents
git clone https://github.com/mcncarl/jianying-headless.git
cd jianying-headless
python3 tools/start_here.py check
python3 tools/build_native_codec.py
python3 skills/yichen-jianying-edit/scripts/headless_draft.py doctor
```

成功标志是桥接输出 `built-and-verified` 或 `already-valid`，并且 `doctor` 返回当前支持版本和 `status: ok`。`doctor` 只检查环境，不会剪视频。

### 独立安装 Skill

Skill 可以随核心仓库使用，也可以作为独立目录安装。独立安装时必须指定核心项目：

```bash
export JIANYING_HEADLESS_ROOT="$HOME/Documents/jianying-headless"
python3 "$JIANYING_HEADLESS_ROOT/skills/yichen-jianying-edit/scripts/headless_draft.py" doctor
```

Skill 应作为完整目录安装，而不是只复制 `SKILL.md`，因为入口脚本、参考资料、许可证、Agent 元数据和固定哈希检查都是交付的一部分。路径和环境变量应放在本机配置中，不写入 Git。

## 六、最短成功路径：先生成 2 秒基础草稿

第一次不要直接做复杂多轨视频。准备一段至少 2 秒的本地 H.264、yuv420p 视频：

```bash
python3 tools/start_here.py build
```

脚本会提示把视频拖入终端，并在新的 `work/first-draft-随机字符/` 目录中生成构建结果。它不会修改原视频、自动登记首页或直接导出 MP4。

构建完成后验证：

```bash
python3 skills/yichen-jianying-edit/scripts/headless_draft.py verify-build \
  --build /absolute/path/to/work/first-draft-xxxx
```

确认剪映保存工作并完全退出后，再登记到本机首页：

```bash
python3 skills/yichen-jianying-edit/scripts/headless_draft.py publish \
  --build /absolute/path/to/work/first-draft-xxxx \
  --audit /absolute/path/to/work/first-publish-audit
```

`publish` 只表示登记到本机剪映首页，不是上传互联网。打开剪映后要实际检查画面、字幕、声音和素材；保存、退出、冷重开后，再执行最终回读验证。

## 七、用 JSON 计划描述剪辑

新建草稿的输入格式是 `jy14-headless-plan/v1`：

```json
{
  "schema": "jy14-headless-plan/v1",
  "name": "独立剪辑示例",
  "canvas": {"width": 1280, "height": 720, "fps": 30},
  "tracks": [
    {"type": "video", "name": "主视频", "segments": [
      {"source": "/absolute/path/to/source.mp4", "start_us": 0,
       "duration_us": 2000000, "source_start_us": 0,
       "source_duration_us": 2000000, "speed": 1, "volume": 1}
    ]},
    {"type": "text", "name": "字幕", "segments": [
      {"text": "可继续编辑的字幕", "start_us": 0,
       "duration_us": 2000000, "size": 6, "x": 0, "y": -0.78,
       "color": "#FFFFFF", "border_color": "#000000", "border_width": 0.05}
    ]}
  ]
}
```

时间统一使用整数微秒。`start_us` / `duration_us` 是时间线位置，`source_start_us` / `source_duration_us` 是源素材范围；速度变化必须同时保持源时长和目标时长一致。绝对素材路径只是构建输入，工具会把素材复制到草稿内的隔离资源目录。

## 八、素材和轨道支持范围

适合优先使用的能力：

- 视频切段、拼接和多轨；
- 图片、透明 PNG 和 GIF；
- 独立配音、BGM 和音效；
- 中文标题和字幕；
- 线性位置、缩放、旋转、透明度和音量关键帧；
- 六类静态几何蒙版；
- 主视频相邻片段的叠化转场；
- 已采集并匹配本机资源的轻微抖动效果。

计划阶段应主动停止或降低承诺的情况：多时间线、云端工程、在线模板、未采集的花字/滤镜/特效/转场、需要保存为嵌套草稿的复合片段、曲线变速、复杂关键帧时间重映射、高清黑白滤镜、橙色描边花字，以及需要下载会员素材或绕过账号权益的操作。

## 九、修改已有草稿：只操作独立副本

先检查草稿，不按文件名猜测素材：

```bash
python3 skills/yichen-jianying-edit/scripts/headless_draft.py edit inspect \
  --draft /absolute/path/to/existing-draft \
  --out /absolute/path/to/work/source-inspection.json
```

再根据检查结果生成编辑计划：

```json
{
  "schema": "jy14-edit-plan/v1",
  "name": "本次修改副本",
  "source": {
    "draft_path": "/absolute/current/draft",
    "draft_id": "FROM_INSPECTION",
    "timeline_sha256": "FROM_INSPECTION"
  },
  "operations": [
    {"op": "replace_text", "id": "TEXT_MATERIAL_ID", "text": "新的字幕内容"},
    {"op": "set_segment", "id": "VIDEO_SEGMENT_ID", "set": {"x": -0.3, "scale": 0.5}},
    {"op": "set_segment", "id": "AUDIO_SEGMENT_ID", "set": {"volume": 0.15}}
  ]
}
```

然后执行 `edit build` 和 `edit verify-build`。构建通过后，仍要在剪映关闭状态下登记副本，并在剪映中播放、保存、退出、冷重开，最后回读验证。原工程不应被写入；源目录、素材字节、时间线哈希和草稿身份发生变化时应停止。

## 十、导出 MP4：只导出冻结快照

用户明确要求成片时：

```bash
python3 skills/yichen-jianying-edit/scripts/headless_draft.py export \
  --build /absolute/path/to/work/edited-build \
  --out /absolute/path/to/work/new-export
```

输出目录必须是新目录，成片固定为其中的 `render.mp4`。导出使用本机匹配版本的剪映原生引擎；FFmpeg / ffprobe 只负责检查，不替代剪映渲染。

`result.json` 中的 `encoded-and-decoded` 只说明导出完成事件收到、容器和编解码检查通过、完整解码通过、输入快照未改变。它不等于画面、字幕、切口、转场和音量已主观验收。交付前仍要实际播放成片，检查开头、结尾、字幕位置、变速段和音频。

剪映 UI 中后来手工修改的版本不会自动进入旧快照。需要导出最新手改内容时，要重新构建或使用剪映界面导出，不能把旧快照误当作最终版本。

## 十一、Skill 的 Agent 调用规则

```text
用户要新建草稿？
  → 读取 headless-macos.md → 生成计划 → build → verify-build

用户要改已有工程？
  → edit inspect → 读取源身份 → edit build → edit verify-build

用户明确要 MP4？
  → 先完成草稿/快照验收 → 读取 export-macos.md → export → 播放检查

用户只说“剪辑一下”但未说明删减规则？
  → 不猜速度、删减力度、BGM 和口播保留规则，集中澄清
```

Agent 必须遵守：

1. 不从聊天、浏览器或其他项目搜集 API Key、Cookie、账号凭据或剪映授权信息。
2. 不复制剪映官方程序库、素材缓存、账号数据或付费资源。
3. 不为通过检查而修改固定哈希、跳过版本/签名/组件身份校验。
4. 不把本机首页登记 `publish` 描述成互联网发布。
5. 不把复合片段的离线冻结快照描述成已通过原生保存的可编辑嵌套草稿。
6. 不把完整解码通过描述成画面和声音验收通过。
7. 不在用户未明确要求时自动导出临时 MP4。
8. 不因效果资源缺失而静默删除效果、替换旧快照或无限重试。
9. 保留失败现场、日志和审计结果，先解释失败责任边界再决定下一步。

## 十二、适合 GPT88 / Codex 的调用模板

```text
使用 yichen-jianying-edit 处理 /absolute/path/to/source.mp4。
目标：生成一份竖屏 1080×1920、30 fps 的可继续编辑剪映草稿。
素材：只使用我提供的本地视频和配音，不添加 BGM，不下载在线素材。
剪辑：保留完整口播，不删除数字、产品名和结论；按逐词稿生成可编辑字幕。
交付：先完成 doctor、build、verify-build；不要自动登记首页，不要导出 MP4。
如果要修改已有工程，先 inspect 并创建独立副本，不改原稿。
报告：列出素材哈希、计划路径、构建目录、验证结果和未完成的原生 UI 验收项。
```

这个模板把目标、素材许可、剪辑规则、交付物和禁止动作分开写，降低 Agent 把“做一个视频”误解为“直接生成并上传成片”的风险。

## 十三、真实案例：Hypit 到剪映的工程交接

仓库公开了一个约 50.23 秒的 IG 滚动动画教程交接案例：原始素材 39 份，剪映工程包含 8 条视频/图片轨道、1 条独立配音轨和 14 条可编辑文字轨，总计 23 条轨道、154 个片段。

![Hypit 原成片六帧对照](/docs/blog/zh/jianying-headless-skill/img/hypit-original-frames.png)

![剪映原生导出六帧对照](/docs/blog/zh/jianying-headless-skill/img/jianying-import-frames.png)

官方验证记录显示，该案例完成构建、打开播放、保存、退出、冷重开和结构回读，并通过 1507 / 1507 帧的原生导出与完整解码检查。但项目明确说明，这不是视觉无损转换：特殊字体、逐词颜色动画、部分裁切与阴影没有完全保留，第 37 秒的补充画面存在差异，完整主观视听验收仍需单独进行。

这个案例体现了项目的正确定位：解决的是可编辑工程交接与受控自动化，不是承诺任意编辑器工程的一键无损转换。

## 十四、验证矩阵：不要只看一个 PASS

| 验收层 | 要回答的问题 |
| --- | --- |
| 环境 | 剪映版本、身份、签名、组件哈希和工具链是否匹配？ |
| 构建 | 计划、素材和输出目录是否通过逐文件校验？ |
| 结构 | 轨道、片段、字幕、音频和时间是否符合计划？ |
| 原生 UI | 剪映能否打开、播放、保存、退出并冷重开？ |
| 导出 | 原生完成事件、帧数、编解码和完整解码是否通过？ |
| 主观媒体 | 开头、结尾、字幕、画面、声音和转场是否真的正确？ |
| 许可 | 素材、效果、剪映程序库、账号权益和商业用途是否分开确认？ |

`doctor` 通过只代表环境满足条件；`verify-build` 通过只代表构建快照结构和媒体校验通过；`encoded-and-decoded` 只代表导出文件成功编码并完整解码。它们不能互相替代。

## 十五、当前限制与许可边界

使用这个项目时，最需要记住：需要匹配版本的本机剪映，不是纯 Python 或纯远程服务；不支持任意剪映版本、在线模板、云端工程和资源下载；复合片段适合离线研究和冻结快照导出，不适合承诺可保存的嵌套工程；图片/GIF 曾出现间歇少一帧，严格帧数门禁会拒绝缺帧输出；原生资源缓存可能依赖本机，技术渲染成功不等于拥有商用或再分发许可；不同 Mac、系统用户和剪映安装仍需独立验收。

核心项目原创代码采用个人学习和非商业使用条款，不应把整个仓库称为 MIT / Apache-2.0 整包开源项目。剪映是独立的专有软件；项目不包含剪映安装包、官方动态库、内置字体、效果包、缓存音效、账号资料或付费权益。

## 来源与边界

原始项目：[mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless)。

独立 Skill：[yichen-jianying-edit](https://github.com/mcncarl/yichen-skills/tree/main/yichen-jianying-edit)。

本文依据仓库公开 README、`skills/yichen-jianying-edit/SKILL.md`、安装教程、计划格式、编辑、导出、验证和分发范围整理。版本、兼容范围、验证数字和限制以来源仓库当前内容为准；本文补充的 GPT88 / Codex 调用模板、决策树和工程解释是面向 Agent 使用的二次整理，不代表原项目新增了这些能力。
