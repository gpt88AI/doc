---
title: RuiC-PoseAtlas：一个零依赖、三语、多视角的人体姿态参考图库
description: 整理 Osub/RuiC-PoseAtlas 项目，介绍 288 组姿态、1,439 张多角度人台线稿、三语搜索筛选、键盘浏览、深链接、静态部署和图片版权边界。
date: 2026-10-29
category: 开发工具
tags: [RuiC-PoseAtlas, 人体姿态, AI绘画, 3D建模, 静态网站, 三语i18n, 前端学习]
readTime: 12
---

> 本文根据 [Osub/RuiC-PoseAtlas](https://github.com/Osub/RuiC-PoseAtlas) 的公开 README、项目结构和许可证整理。README 将在线演示指向 [hruiccc.github.io/RuiC-PoseAtlas](https://hruiccc.github.io/RuiC-PoseAtlas/)，并注明原始资料来自 [POSE-DB-01](https://ai-pose-gallery.pages.dev/) 和作者 [ギア（@giaaibusi）](https://x.com/giaaibusi)。数量和功能以仓库当前公开说明为准。

![RuiC-PoseAtlas 人体姿态参考图库](https://raw.githubusercontent.com/Osub/RuiC-PoseAtlas/main/og-cover.jpg)

很多创作任务并不缺生成能力，缺的是一个可以快速比较姿态、镜头和体块关系的参考入口。单张参考图只能回答一个角度的问题；如果正面、斜侧、侧面、俯视和仰视分散在不同页面，创作者还要确认它们是不是同一组姿态。

[RuiC-PoseAtlas](https://github.com/Osub/RuiC-PoseAtlas) 以“姿态组”为索引单位，把同一姿态的多个角度放在一张卡片里，再用搜索、分类筛选和大图浏览把它们串起来。它不是姿态估计模型或在线生成器，而是一个可以直接打开和部署的参考图库。

```text
姿态数据 → 三语索引 → 搜索与筛选 → 姿态卡片 → 多角度浏览 → 深链接或 PNG 下载
```

## 数据规模与适用场景

README 给出的数据概览是：288 组姿态、1,439 张参考图、4 个内容系列、26 个子分类，以及最多 5 个视角：正面、斜侧、侧面、俯视和仰视。原图为 900 × 1200 PNG，缩略图为 300 × 400 JPEG，界面支持中文、English、日本語，前端依赖为 0。

图库主体是没有面部特征的灰色人台线稿，重点放在体态、比例、四肢走向和镜头关系。它适合：

- AI 绘画中的姿态、构图和机位参考；
- 3D 建模与动画中的 blockout、比例和镜头设计；
- 插画、漫画中的动态、透视和多人互动构图；
- 摄影与视觉设计中的站位和人物关系；
- 前端学习中的无框架、数据驱动静态站点案例。

## 用姿态组组织多角度数据

项目的 `data/poses.json` 是前端数据入口。一条记录包含姿态 ID、系列、分类、编号、三语名称和多个角度变体，每个变体分别指向缩略图和原图。

```json
{
  "id": "full_single_P019",
  "series": "full_std",
  "category": "站姿",
  "no": "P019",
  "names": {
    "zh": "站立・双臂上举伸展",
    "en": "Standing, arms reaching overhead",
    "ja": "立ち・両腕を頭上に伸ばす"
  },
  "variants": [{
    "angle": "front",
    "thumb": "thumbs/full_single_P019_front.jpg",
    "full": "img/full_single_P019_front.png"
  }]
}
```

这种结构把“姿态是什么”和“姿态有哪些视角”放在一起，适合做卡片、详情页、预加载和分享链接，也方便在新增姿态时校验角度是否齐全。

## 搜索、筛选和大图浏览

项目提供“按姿势”和“单张”两种浏览模式。前者以姿态组为单位展示，后者展开每个角度，方便逐张比较。搜索索引同时包含中文、英文和日文名称，还可以命中编号、系列和分类；系列、子分类和角度筛选可以组合使用。

打开大图后，可以用键盘连续浏览：

| 按键 | 功能 |
| --- | --- |
| `←` / `→` | 切换当前姿态的角度 |
| `↑` / `↓` | 切换姿态 |
| `Esc` | 关闭大图 |
| `Tab` | 在控件之间循环聚焦 |

网格只加载缩略图，原图在打开大图或下载时才请求；相邻角度和相邻姿态会在空闲时预加载。项目还支持深链接，例如：

```text
?lang=ja#pose=full_single_P019&angle=side
```

这比让协作者从首页重新搜索更适合设计讨论、提示词记录和教程引用。

## 三语 i18n 的边界

语言选择优先读取 URL 参数 `?lang=zh|en|ja`，其次读取 `localStorage`，最后根据浏览器语言决定。需要同步的内容不只是按钮，还包括页面标题、系列、分类、姿态名称、搜索占位符、结果计数、大图元信息、下载按钮、键盘提示和页脚说明。

对静态站点而言，三语名称直接随姿态数据提供，比运行时请求翻译服务更可控。代价是新增姿态时必须维护三语字段，并用校验脚本发现缺失键。

## 零框架的静态前端结构

项目使用原生 HTML、CSS 和 ES Modules，没有 React、Vue、打包器或运行时依赖。主要文件包括 `index.html`、`assets/css/app.css`、`assets/js/app.js`、`assets/js/i18n.js`、`data/poses.json`、`img/` 和 `thumbs/`。数据、筛选、卡片、灯箱和大图元信息都从同一份姿态数据派生。

零依赖不等于只做展示页面。项目仍然处理了搜索防抖、懒加载、异步解码、事件委托、焦点陷阱、关闭后焦点归还、`aria-live` 结果计数、`aria-pressed` 状态和 `prefers-reduced-motion`。

## 缩略图和原图分层

README 估算缩略图约 25 MB，原图约 654 MB，姿态数据约 186 KB。完整仓库包含 1,439 张 PNG 和 1,439 张 JPEG，因此首次克隆会明显大于普通静态前端项目。

```text
网格浏览 → 300 × 400 JPEG
打开大图 → 900 × 1200 PNG
点击下载 → 当前 PNG
```

这套策略把首页速度和原图质量分开。如果只部署缩略图，网格仍可用，但大图查看和下载会失效；是否部署完整图片集，应按实际使用场景决定。

## 本地运行和部署

页面通过 `fetch()` 读取 `data/poses.json`，不能直接双击 `index.html` 用 `file://` 打开。最小运行方式是：

```bash
git clone https://github.com/Osub/RuiC-PoseAtlas.git
cd RuiC-PoseAtlas
python3 -m http.server 8123 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:8123/`。项目也提供 `npm start`，但站点本身没有构建步骤。

仓库内置 GitHub Pages 工作流，涉及站点文件的 `main` 分支 push 会触发部署；也可以使用 Cloudflare Pages、Netlify、Vercel 或任意静态服务器。README 建议使用 Actions 打包站点文件，避免把脚本、文档和赞赏码等仓库文件一起暴露为静态资源。

## 数据构建和校验

项目提供：

```bash
npm run data      # 合并中文、日文原始记录和英文名称表
npm run verify    # 校验数量、翻译、尺寸、引用和 i18n
```

校验脚本会检查姿态和图片数量、三语名称、系列与角度翻译、图片引用和尺寸、i18n 键完整性，以及页面不应公开的区块。对于没有服务端数据库的静态图库，这些检查可以在提交前发现缺图、断链和漏翻译。

## 许可证和图片版权不能混为一谈

仓库的 `LICENSE` 是 MIT，但它只覆盖项目作者编写的源代码、样式、脚本和文档，不自动覆盖 `img/`、`thumbs/`、`scripts/source/` 中的图片和原始数据，也不覆盖文档中的赞赏二维码。

README 说明图片与原始数据来自 POSE-DB-01，允许作为创作参考使用，但禁止重新分发、转载或转售图片数据本身。使用前仍应阅读仓库和原始站点的最新说明。

| 内容 | 应如何理解 |
| --- | --- |
| HTML、CSS、JavaScript、校验脚本和文档 | 按仓库 MIT 许可证查看和使用 |
| 图片、原始姿态记录和名称数据 | 按原作者及仓库的单独说明使用，不要再分发数据集 |
| 你的作品和生成结果 | 另行检查模型、参考图、字体、音乐和平台授权 |

把某个姿态作为自己的绘画、3D 或摄影参考，与把整套图片下载后重新打包成另一个图库，授权含义不同。博客整理不会把“可用于创作”简化成“图片可以任意复制或销售”。

## 一个低风险的使用顺序

1. 先打开在线演示，搜索一个具体动作。
2. 用系列、分类和角度筛选，找到同一姿态的多个视角。
3. 用键盘比较正面、侧面和俯仰角度，记录姿态编号。
4. 通过深链接把指定姿态发给协作者。
5. 需要高分辨率时再下载单张 PNG，不要先批量复制整个图片集。
6. 将参考图用于自己的创作前，确认原作者的当前许可和平台规则。

如果你正在学习前端，可以先读 `data/poses.json` 和 `assets/js/app.js`，观察筛选、灯箱、键盘事件、i18n 和图片预加载如何围绕同一份数据工作。

## 来源与边界

- [Osub/RuiC-PoseAtlas GitHub 仓库](https://github.com/Osub/RuiC-PoseAtlas)
- [RuiC-PoseAtlas 在线演示](https://hruiccc.github.io/RuiC-PoseAtlas/)
- [POSE-DB-01 原始站点](https://ai-pose-gallery.pages.dev/)
- [原作者ギア（@giaaibusi）](https://x.com/giaaibusi)

本文只整理仓库当前公开的 README、项目结构和许可证，没有独立审计每张图片的来源或授权链，也没有把 GitHub Pages 的在线状态当成部署保证。项目数据、图片、链接、工具说明和许可证可能变化，使用前请查看仓库最新版本。
