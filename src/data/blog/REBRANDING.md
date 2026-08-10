# GPT88 博客文章迁移规范（迁移自 yingtu.ai/zh/blog）

本文档约束从 `yingtu.ai/zh/blog` 迁移文章到 `doc.gpt88.cc` 的所有改写规则。
处理文章的 agent 必须严格遵循本规范。

## 一、目标文件结构

每篇文章两个 markdown 文件，均含 YAML frontmatter + 正文：

```
src/data/blog/posts/<slug>.md          # 简体中文（slug 沿用源站 slug）
src/data/blog/posts/en/<slug>.md       # 英文翻译
```

frontmatter 字段（严格按此格式）：

```yaml
---
title: <中文标题>
description: <80-160 字中文描述，用于 SEO meta>
date: YYYY-MM-DD
category: <分类>
tags: [标签1, 标签2]
readTime: <分钟数>
relatedPath: /docs/guides/...   # 可选：站内相关指南
relatedTitle: <相关指南标题>     # 可选
---
```

`category` 只能取以下 7 个之一：`图像生成`、`AI工具指南`、`API开发`、`Gemini专题`、`模型对比`、`技术教程`、`开发工具`。

## 二、品牌替换规则

| 源站表达 | 替换为 |
|---|---|
| YingTu / yingtu.ai / yingtu | gpt88.cc（或"GPT88"） |
| LaoZhang / laozhang.ai / Lao Zhang / laozhang | gpt88.cc（或"GPT88"） |
| docs.laozhang.ai（源站文档链接） | https://doc.gpt88.cc（或站内相对链接 /docs/...） |
| laozhang 登录/控制台 | gpt88.cc 控制台 |
| laozhang 图片/生图产品页 | https://agent.gpt88.cc（Agent 图片工作台） |
| "LaoZhang API 中转/供应商路线" | "GPT88 中转/统一网关" |
| 源站商品/图片生成器自营工具链接 | 对应 GPT88 入口，或移除具体产品并保留方法论 |
| YINGTU TECHNOLOGY PTE. LTD. / 服务条款 / 隐私政策 | 删除（不适用） |

## 三、外链替换为 GPT88 相关链接

原文中的外链按语义映射：

- 指向源站自身的登录/产品链接 → https://gpt88.cc 或 https://agent.gpt88.cc
- API 文档链接 → https://doc.gpt88.cc 或站内相对链接（如 `/docs/api/images/`、`/docs/guides/...`）
- OpenAI 兼容 base URL → `https://gpt88.cc/v1`
- 图片/多媒体 Base URL → `https://img.gpt88.cc`
- 官方模型/厂商链接（Google、OpenAI、Anthropic 等）**保留**，这是事实性信息
- 无法确认目标的第三方链接 → 删除
- 站内互链优先使用相对链接 `/docs/...`

## 四、内容改写规则

1. **保留核心方法与结论**：原文的结构、步骤、表格、代码示例、错误码、验收清单尽量保留；这些是有价值的实操内容。
2. **品牌口吻**：把"我们的中转站/我们的平台"一律改成 GPT88 的口吻；源站推荐的"走 LaoZhang 路线"改写为"走 GPT88 统一网关路线"。
3. **计费口径**：遵守站点核心理念 —— 充值 1 元 = 账户 1 元余额；实际扣费按官方用量 × 所选分组倍率；不写死强时效价格与 SLA。涉及价格时保留原文写明的日期（如"截至 2026-07"），并补一句"具体价格与配额以 gpt88.cc 控制台为准"。
4. **API Key 示例**：一律用 `sk-gpt88-...` 或 `YOUR_GPT88_API_KEY`，禁止出现真实密钥；Key 类内容打码。
5. **图片**：原文图片不迁移（无素材）。删除 `![...](...)` 图片引用；若图片承载关键信息，用文字补全该信息。
6. **模型事实**：模型名称、官方端点、错误码等第三方事实**不得改写**（例如 Gemini 官方接口路径、OpenAI 官方模型 ID）。GPT88 只是接入方。
7. **不夸大能力**：不要声称 GPT88 后端不存在的功能。源站自营工具功能若 GPT88 无对应物，删掉具体产品描述、保留通用方法论。
8. **语气**：与 doc.gpt88.cc 现有文档一致 —— 务实、少营销、面向开发者。
9. **标题/描述**：中文标题尽量沿用源站标题；description 面向搜索重写，避免重复标题。

## 五、英文翻译规则

- `en/<slug>.md` 必须是**全文翻译**（不是摘要），与中文信息量一致。
- frontmatter 的 title/description 用英文，category 保持中文分类值不变，date/tags 与中文一致。
- 代码示例内注释可译为英文，代码本身（URL、模型 ID、命令）不翻译。

## 六、质量验收

- [ ] 中文/英文两个文件都存在，frontmatter 完整
- [ ] 文中无 yingtu.ai / laozhang.ai / LaoZhang 字样残留
- [ ] 所有 `https://` 外链都已按第三节映射或删除
- [ ] 无 `![` 图片引用残留
- [ ] 无真实 API Key
- [ ] 正文是完整文章（段落、小标题、表格/列表齐全），不是占位符
- [ ] markdown 语法正确（代码块、表格、列表闭合）
