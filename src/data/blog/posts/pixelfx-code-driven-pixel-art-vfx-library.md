---
title: PixelFX：把像素风游戏特效做成可运行代码和精灵图
description: 整理 TaoBuilds 分享的 PixelFX 项目，介绍代码驱动的像素风 VFX、实时预览与调色、游戏引擎接入、精灵图导出、角色动作编排和 MIT 许可边界。
date: 2026-11-01
category: 开源项目
tags: [PixelFX, 像素画, 游戏开发, VFX, Sprite Sheet, Canvas, Claude Code]
readTime: 12
---

像素风游戏里的爆炸、火焰、闪电、魔法阵和受击反馈，经常要在“买素材、逐帧手绘、自己写粒子效果”之间做取舍。TaoBuilds 在 [X 帖](https://x.com/Tao_Builds/status/2116414245097423359)中分享了 [PixelFX](https://github.com/patch-gg/pixelfx)：一套用代码绘制像素风游戏特效的开源库，提供在线画廊、调色与精灵图导出。

> **来源说明**：原帖发布于 2026 年 10 月 31 日，写的是“232 种”特效。本文根据原帖及项目 README、目录、包配置和 NOTICE 整理。查看仓库当前主分支时，README 和目录标为 **244 个特效、21 个类别**；这是之后更新后的仓库快照，与原帖发布时的数量不同。本文没有独立运行项目或复测每个效果。

![PixelFX 的像素风游戏特效动画合集预览](https://raw.githubusercontent.com/patch-gg/pixelfx/main/docs/readme/montage.gif)

## 它不只是一个视频素材库

PixelFX 的效果由代码按时间绘制，而不是预先录制好的视频片段。每个效果可以在画廊里播放、换色和镜像；开发者可以把效果代码放进浏览器游戏，也可以输出序列帧作为精灵图，在 Godot、Unity、GameMaker、Defold 或 Bevy 等环境中使用。

仓库 README 当前列出 21 个类别，包含角色动作、火焰、爆炸、水、冰、闪电、科幻、近战、冲击、投射物、出生与消散、奥术、神圣、暗影、状态效果、自然、天气、UI、拾取物、转场和小生物。类别中既有循环效果，例如火把、瀑布或传送门，也有一次性效果，例如爆炸、命中闪光和火球投掷。

## 两种接入方式

### 在浏览器游戏里直接使用效果代码

如果游戏已经使用 Canvas 或 WebGL 相关运行时，可以从 PixelFX 的 API 读取效果、更新动画并绘制到帧缓冲。仓库提供 `createFrame`、`createFx`、`composite` 等接口；效果可以指定位置、角度、镜像、随机种子和调色板。

安装与使用示意：

```bash
npm i github:patch-gg/pixelfx
```

```js
import { createFrame, createFx } from "pixelfx";
import * as frostNova from "pixelfx/fx/ice/frost-nova";

const frame = createFrame(320, 180);
const effect = createFx(frostNova, { x: 160, y: 140, seed: 7 });

function update(dt) {
  effect.update(dt);
  effect.draw(frame);
}
```

上面只是简化的使用轮廓。实际绘制还需按照 README 示例清屏、合成颜色和发光缓冲，再把像素数据放到 Canvas；具体接口应以当前版本为准。为了保持像素边缘清晰，通常还需要使用整数倍放大，并避免浏览器的平滑插值。

### 导出精灵图给其他引擎

对不是 JavaScript 的游戏，或希望将素材放进既有动画管线的团队，可以用仓库工具渲染 PNG 精灵图。单个效果的导出形式例如：

```bash
node tools/render.mjs ice/frost-nova --sheet
```

项目说明会同时输出帧网格 PNG 和 Aseprite 风格 JSON，其中包含每帧位置、持续时间、帧率、循环信息和 pivot 等元数据。引擎侧再根据精灵表和 JSON 播放动画。仓库还提供 `node tools/sheets.mjs` 批量导出整个效果库的方式。

## 调色、镜像和确定性

多数效果接受调色板参数，因此同一个火焰或治疗光效可以按项目美术风格改成不同颜色，不一定需要复制一份代码再逐色修改。镜像和旋转参数可以复用方向性效果，随机种子则让带粒子的效果能够确定性复现，便于录屏、回归检查和排查某一帧的问题。

README 描述的渲染实现使用两类缓冲：像素颜色与单独的发光层；模拟类效果按固定高频步进更新粒子，纯函数类效果则根据时间直接计算画面。这样可以处理火花、烟雾、碎片等需要状态的动画，也能让循环波纹、光束和光环保持无缝。

## 让攻击动作看起来有起伏

许多特效素材只表现爆炸或刀光本身，缺少施法者的预备动作、接触停顿和后摇。PixelFX 除了单独特效，还把部分角色动作编成可组合的 moves：例如拉弓、冲刺斩、火球投掷和连击。

动作数据可以描述角色姿态时间点、命中时的短暂停顿、画面震动和目标受击反应。项目 README 将其称为 acts；目标是把“人物做了什么”和“特效何时发生”对齐，而不是把一个静态效果贴在角色旁边。游戏开发者可以把这类数据作为动画参考，也可以直接用仓库提供的角色和靶子预览完整动作。

如果游戏已有自己的角色骨骼或动画系统，最好先只接入特效本身，再把预备动作、命中停顿和后摇映射到自己的动画状态机。项目中的灰色示例角色是演示资源，不会自动适配任意游戏角色。

## 自己写特效的循环

仓库还带有面向 Claude Code 的 `pixelfx` Skill，用于查找、使用、导出和制作新效果。README 提供的基本创作循环是：

1. 用模板创建新的效果文件。
2. 渲染单帧、GIF 或动作序列，观察真实尺寸下的轮廓和节奏。
3. 运行检查工具，发现循环接缝、随机不确定性、帧耗时或姿态字段问题。
4. 根据预览修正最明显的问题，再次渲染确认。

这套工作方式强调“代码是绘画材料，效果要靠眼睛检查”。特效即使通过程序检查，也不代表视觉重心、可读性或游戏反馈已经足够好；最终仍需要在实际背景、角色尺寸和战斗节奏下预览。

项目内的 Skill 安装说明针对 Claude Code。其他 Agent 可以参考效果文件和命令行工具，但不能假设同一 Skill 能未经适配直接使用。

## 适合哪些项目

- **像素风独立游戏**：快速浏览已有火焰、投射物、状态效果和 UI 反馈，减少从空白开始的时间。
- **原型和 Game Jam**：用可直接播放的效果验证玩法节奏，后续再替换成统一的正式美术资产。
- **程序化动画或视频**：以时间和参数生成可复现的效果，适合批量输出或统一调色。
- **美术工具链**：导出 PNG 帧表和 JSON 元数据，交由非 Web 引擎读取。
- **学习像素 VFX**：阅读单个效果文件，观察颜色分层、粒子运动、循环和受击反馈如何组合。

## 使用前的限制与许可证

项目 README 当前把代码和特效标为 MIT，可用于商业项目。与此同时，NOTICE 明确指出：`src/core/sim.js` 和部分效果改编自 Hugo Duprez 的 Sprite Fusion 特效代码；`src/core/act.js` 借鉴了 Hollow Crown 项目中的动作处理方式。再分发或改编时，应保留仓库许可证和 NOTICE 中要求的来源说明。

画廊字体 `gallery/fonts` 不包含在仓库的 MIT 许可范围内，使用该字体需要单独查看字体目录中的 NOTICE。不要把“仓库是 MIT”扩展成“仓库中每个文件都可按 MIT 任意使用”。

还需要留意：

- 像素动画需要在实际游戏分辨率和整数倍缩放下检查，网页画廊中的预览尺寸不一定代表游戏中的可读性。
- 带人物动作的示例围绕项目自带的角色骨架制作，接入自己的角色时可能需要重新编排动作。
- 原帖的 232 是发布时的数字；仓库当前 README 显示 244，项目仍可能继续增加效果。
- 使用在线画廊只能说明可以浏览演示，不能替代对项目代码、性能和许可证的检查。

## 一个低成本试用顺序

1. 先打开 [在线画廊](https://patch-gg.github.io/pixelfx/)，挑一个与玩法相近的效果，在目标画面尺寸下观察它的速度、轮廓和颜色。
2. 如果项目运行在浏览器中，先接入单个效果，确认更新节奏、图层和像素缩放。
3. 如果项目使用其他引擎，导出一个 PNG 精灵图和 JSON 元数据，验证导入器能否正确处理帧时长、循环和 pivot。
4. 在不同背景、角色尺寸和实际战斗场景中测试，确认特效不会遮住角色、文字或重要提示。
5. 核对当前 commit 的 LICENSE 和 NOTICE，再决定是否纳入商业构建。

## 参考资料

- TaoBuilds：[X 帖：分享 PixelFX 像素风代码特效库](https://x.com/Tao_Builds/status/2116414245097423359)，发布于 2026 年 10 月 31 日。
- [patch-gg/pixelfx GitHub 仓库](https://github.com/patch-gg/pixelfx)
- [PixelFX 在线画廊](https://patch-gg.github.io/pixelfx/)
- [项目效果目录](https://github.com/patch-gg/pixelfx/blob/main/docs/CATALOG.md)
- [项目 LICENSE](https://github.com/patch-gg/pixelfx/blob/main/LICENSE)
- [项目 NOTICE](https://github.com/patch-gg/pixelfx/blob/main/NOTICE.md)
