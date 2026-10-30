---
title: huashu-bird-sticker：把 11064 种现生鸟类做成可用的开放素材库
description: 整理花叔 huashu-bird-sticker 项目，介绍全球鸟类贴纸、43 种语言名称、结构化物种数据、质量评审、按需下载方式和许可边界。
date: 2026-10-30
category: 开源项目
tags: [huashu-bird-sticker, 鸟类, 开源素材, 数据集, AI 插画, 鸣迹]
readTime: 13
---

[huashu-bird-sticker](https://github.com/Osub/huashu-bird-sticker) 是花叔（Huashu）为观鸟 App「鸣迹」制作并开源的全球鸟类贴纸库。项目把 IOC World Bird List v15.2 中的 11,064 种现生鸟类各做成一张带白边的透明贴纸，并为每个物种附上分类、名称、分布、形态、生态、保护等级和来源信息。

> **来源说明**：本文依据 [Osub/huashu-bird-sticker](https://github.com/Osub/huashu-bird-sticker) 当前公开的 README、中文说明和许可证整理。该仓库是 [alchaincyf/huashu-bird-sticker](https://github.com/alchaincyf/huashu-bird-sticker) 的 fork；项目规模、质量统计和“适合使用”的描述属于仓库作者公开说明，不是本文独立重新统计的结果。

![huashu-bird-sticker 的鸟类贴纸总览](https://raw.githubusercontent.com/Osub/huashu-bird-sticker/main/previews/header.webp)

## 它解决的是什么问题

鸟类素材经常分散在三种地方：图片适合看，但缺少统一名称和分类；数据集便于查询，却不适合直接用于界面和教育内容；观鸟 App 里的插图有风格，却不一定能独立复用。

这个项目把三者放在同一个物种记录中：

- 用一张透明底、带白边的贴纸表现鸟的外观；
- 用 JSON、CSV 和多语言文件保存可检索的物种数据；
- 用 `sticker.reference` 追溯每张贴纸使用的参考来源和许可信息。

因此，它既可以作为视觉素材，也可以作为鸟类目录、教学工具、小游戏或数据分析的起点。它不是完整的专业图鉴，也不应被当作识别细节的唯一依据。

## 项目里有什么

仓库的核心目录可以这样理解：

| 路径 | 内容 | 适合用来做什么 |
| --- | --- | --- |
| `stickers/<Order>/<Family>/<Genus_species>.webp` | 11,064 张透明贴纸，长边约 1,000 像素 | 网页、教育卡片、游戏、文创和界面素材 |
| `data/species.json` | 每个物种一条完整记录 | 应用查询、服务端接口和静态生成 |
| `data/species.csv` | 展平后的同一份数据 | 表格分析、筛选和批处理 |
| `data/names.csv` | 43 种语言名称 | 多语言界面和搜索索引 |
| `data/languages.json` | 语言代码与 IOC 列的映射 | 生成语言选择器和导入程序 |
| `data/field-guide.zh-Hans.json` | 1,596 种鸟的中文图鉴笔记 | 中文学习卡片和辅助说明 |
| `previews/` | README 用的画廊和预览图 | 了解覆盖范围和视觉风格 |

一个物种记录同时包含科学名称、分类系统、各语言名称、Wikidata/GBIF/eBird 等外部 ID、分布、亚种、体重和翼长等特征、栖息地、迁徙、营养生态位、IUCN/CITES 状态，以及贴纸文件和质量信息。

```json
{
  "id": "Accipiter_nisus",
  "scientificName": "Accipiter nisus",
  "taxonomy": {
    "system": "IOC 15.2",
    "order": "Accipitriformes",
    "family": "Accipitridae",
    "genus": "Accipiter"
  },
  "names": {
    "en": "Eurasian Sparrowhawk",
    "zh-Hans": "雀鹰"
  },
  "ids": {
    "wikidata": "Q25380",
    "ebird": "eurspa1",
    "gbif": "2480637"
  },
  "sticker": {
    "file": "stickers/Accipitriformes/Accipitridae/Accipiter_nisus.webp",
    "kind": "ai-illustration",
    "reviewScore": 91,
    "meetsQualityBar": true
  }
}
```

字段的完整定义以仓库的 [`data/README.md`](https://github.com/Osub/huashu-bird-sticker/blob/main/data/README.md) 为准。应用代码应按字段文档读取，不要把示例里的省略字段当作完整 schema。

## 覆盖范围：数量很大，但语言覆盖并不均匀

项目覆盖 44 个目、250 个科，贴纸数量为 11,064 张，一种不缺。名称覆盖则取决于 IOC 名录是否提供对应语言：英文覆盖全部物种，法文和简体中文接近全覆盖；日文、繁体中文、俄文、德文、西班牙文、波兰文、荷兰文、瑞典文等语言覆盖超过 90%；韩文、阿拉伯文、泰文、波斯文等语言目前只覆盖部分物种。

这意味着多语言应用不能简单假设 `names[language]` 一定存在。推荐为每种语言做回退策略：优先目标语言，其次英文，再显示科学名称；搜索索引则保留语言缺失状态，避免把缺失误报为“无此物种”。

![来自 15 个鸟类目的一组贴纸](https://raw.githubusercontent.com/Osub/huashu-bird-sticker/main/previews/hero.webp)

## 贴纸是怎么制作和审核的

README 说明，11,030 张贴纸是 AI 绘制，34 张是从真实照片抠出后通过盲审。制作流程大致是：为每个物种寻找参考照片；没有一张照片足够时，使用多张参考图和文字描述组成参考板；生成贴纸后放大和抠图；再由独立审核者依据喙、眼、腿脚、羽色和斑纹等辨识特征评分。

仓库公开的最后一轮统计是：

- 7,676 张达到项目定义的质量线；
- 3,388 张没有达到质量线，但为保证每个物种都有图，保留了重绘次数上限内的最佳版本；
- 其中 3,273 张分数在 70–79，109 张低于 70，另有 6 张初审达到 80 分以上但没有通过第二轮盲审。

这组数字有两个实际含义。第一，数据覆盖完整不等于每张图都适合细节辨识。第二，`meetsQualityBar` 和 `reviewScore` 应该在产品中作为质量元数据保留，而不是只读取图片文件名。

项目作者也明确提醒：这些是友好的插画，不是专业图鉴图版。涉及物种辨认、羽色细节或野外记录时，应使用可靠的现场图鉴和原始观察资料交叉确认。

## 一个最小的读取方式

如果只是做目录、搜索或统计，不需要把约 700 MB 的完整仓库全部下载下来。数据文件可以单独读取，贴纸则按物种或分类按需加载。

```python
import json

with open("data/species.json", encoding="utf-8") as f:
    species = json.load(f)["species"]

by_scientific_name = {
    item["scientificName"]: item
    for item in species
}

bird = by_scientific_name["Pica pica"]
print(bird["names"].get("zh-Hans"))
print(bird["sticker"]["file"])
```

仓库 README 给出的单张图片地址形式是：

```text
https://raw.githubusercontent.com/alchaincyf/huashu-bird-sticker/main/stickers/Accipitriformes/Accipitridae/Accipiter_nisus.webp
```

如果你只需要数据和某个目，可以使用 sparse checkout：

```bash
git clone --filter=blob:none --sparse https://github.com/alchaincyf/huashu-bird-sticker
cd huashu-bird-sticker
git sparse-checkout set data stickers/Strigiformes
```

实际生产环境还应给远程图片增加缓存、失败回退和版本固定。不要让用户每次打开页面都直接依赖 GitHub raw 链接，也不要把仓库当前分支当作不可变的 CDN 版本。

## 适合做什么

### 鸟类学习卡片

用贴纸、中文名、科学名、分类和分布做一张卡片，点击后再展示辨识要点、相似种和保护等级。对儿童或初学者，可以先隐藏科学名和外部 ID，避免界面过载。

### 多语言鸟类目录

用 `names.csv` 建立搜索索引，允许用户按中文、英文或科学名称搜索。语言缺失时显示明确的回退结果，不要自动翻译成未经核验的名称。

### 游戏和教育内容

贴纸的白边和统一尺寸适合做卡牌、拼图、分类游戏和博物馆互动展项。项目许可证明确允许出版、教学、科研、博物馆、游戏、文创、个人项目和其他领域的应用，但仍应保留版权和 NOTICE 信息。

### 数据可视化

可以把 44 个目、250 个科、体型、迁徙、保护等级或语言覆盖做成探索式目录。可视化时要注明数据版本和来源，尤其不要把“项目没有记录”绘制成“该物种没有这个特征”。

## 许可边界必须单独检查

仓库不是“所有文件一个许可证”。当前 README 和许可证文件将内容分成三类：

| 内容 | 许可证或限制 |
| --- | --- |
| `stickers/` 与 `previews/` 中的 AI 插画贴纸 | PolyForm Shield 1.0.0；可商用，但不能用于与鸣迹竞争的观鸟、识鸟或鸟类图鉴产品 |
| `data/` 中项目编制的数据 | MIT |
| IOC 名称、AVONET、34 张照片抠图和其他第三方材料 | 各自适用的条款，查看 `NOTICE.md` 和每条记录的来源 |

使用贴纸前至少做三件事：

1. 阅读仓库中的 [PolyForm Shield 许可证](https://github.com/Osub/huashu-bird-sticker/blob/main/LICENSES/PolyForm-Shield-1.0.0.md)。
2. 在发布物中保留 `NOTICE.md` 要求的版权和来源说明。
3. 如果对参考照片来源的许可很敏感，按 `sticker.reference.license` 过滤，而不是默认认为每张 AI 图都没有素材限制。

项目说明称贴纸是重新绘制的，参考照片本身不在仓库中；但“基于照片绘制的新图是否受原照片许可约束”存在法律不确定性。商业项目上线前应由有资质的法律或合规人员根据实际用途审查，尤其是涉及鸟类识别或野外图鉴功能时。

## 一个稳妥的接入流程

1. 固定仓库 commit 或发行快照，记录 IOC 版本和数据更新时间。
2. 先只下载 `data/`，确认字段、名称回退和许可证元数据能被应用正确读取。
3. 用小范围目或科加载贴纸，检查透明通道、尺寸、缓存和断链回退。
4. 在 UI 上显示贴纸许可、数据来源和“插画不是专业图鉴”的提示。
5. 对删除、替换和来源更新保留版本记录，不要静默覆盖已经发布的素材。

这套流程能把“下载一批好看的鸟图”变成可维护的内容资产：图片、数据、来源、质量和许可都能被单独检查。

## 参考资料

- [Osub/huashu-bird-sticker](https://github.com/Osub/huashu-bird-sticker)
- [项目中文说明](https://github.com/Osub/huashu-bird-sticker/blob/main/README.zh-Hans.md)
- [原始项目 alchaincyf/huashu-bird-sticker](https://github.com/alchaincyf/huashu-bird-sticker)
- [许可证与 NOTICE](https://github.com/Osub/huashu-bird-sticker/blob/main/LICENSE.md)
- [IOC World Bird List](https://www.worldbirdnames.org/)
