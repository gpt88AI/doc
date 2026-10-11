---
title: Cloudflare 从域名接入到 AI 后端：一个域名搭起网站、邮箱、存储与 Agent 工具链
description: 以一个示例域名串起 Cloudflare 的 DNS、HTTPS、GitHub 网站部署、邮件转发、R2、AI 爬虫控制、Workers、Workers AI 与 cf CLI，给出个人站点从接入到维护的可执行路径。
date: 2026-10-11
category: 技术教程
tags: [Cloudflare, DNS, Workers, R2, Workers AI, Agent, cf CLI]
readTime: 22
---

> 来源：[小墨同学的 X 长文《万字长文｜Cloudflare 从入门到精通，一个域名搞定建站、邮箱、存储和 AI 后端》](https://x.com/xiaomovps/status/2108371593747709979)，原文发表于 2026 年 10 月 9 日。本文按原文结构做中文整理，保留其操作边界、命令示例和官方资料链接；Cloudflare 菜单、免费额度、模型与 CLI 都可能变化，正式操作前请以当前控制台和官方文档为准。

![Cloudflare 从域名、网站到 AI 后端的文章封面](/docs/blog/zh/cloudflare-domain-to-ai-backend/img/cover.jpg)

很多人把 Cloudflare 当作 CDN。更准确的理解是：域名接入后，访客请求先进入 Cloudflare，再由它决定返回缓存、转发到源站、拦截可疑流量，或交给运行在 Cloudflare 网络上的代码。这样，DNS、HTTPS、静态站点、邮箱转发、对象存储和小型 AI 接口可以围绕同一个域名逐步搭起来。

本文用 `example.com` 作为示例，实际操作时换成自己的域名。原作者演示过 `79702701.xyz`，但不需要照抄这个域名。

## 先看完成标准

完成后，你应当能够：

- 将域名交给 Cloudflare 管理，分清橙色云（已代理）与灰色云（仅 DNS）。
- 选择合适的 SSL/TLS 模式，避免源站与 Cloudflare 之间反复重定向。
- 从 GitHub 导入网站，并绑定自定义域名。
- 用 Email Routing 把 `hi@example.com` 转发到已有邮箱。
- 创建 R2 存储桶，用自定义域名公开图片或备份。
- 查看 AI 爬虫并选择放行、拦截或启用 AI Labyrinth。
- 部署 Worker，绑定 Workers AI，返回一个模型回答。
- 用 `cf` CLI 让 Agent 查询命令、先 `--dry-run`，再执行变更。

个人站点通常做到 HTTPS 和静态部署就够了。邮箱、R2、Worker 和 AI 按实际需求增加，不需要一次开完所有服务。

## 一、Cloudflare 对个人站点能做什么

### 1. 三层能力

1. **网站入口**：DNS 解析、CDN、HTTPS 证书和基础防护。
2. **开发者平台**：Workers 运行代码，R2、KV、D1 提供对象、键值和关系型存储。
3. **Agent 基础设施**：Workers AI 调用开源模型，Clef 处理分类和路由判断，`cf` 提供面向 Agent 的 Cloudflare 操作入口。

原文的所有操作都以免费计划为例，但免费额度会调整，不能把历史数字当作长期 SLA。生产项目还要考虑备份、访问控制、日志和超额后的处理方式。

## 二、把域名接进 Cloudflare

### 1. 添加域名并核对 DNS

在“域名”中选择接入新域名，输入根域名 `example.com`，选择 Free 计划。Cloudflare 会扫描现有 DNS 记录，但扫描结果不一定完整，至少要核对根域名与 `www` 等网站记录，以及邮箱使用的 MX、SPF、DKIM 和其他 TXT 记录。漏掉邮件记录，切换名称服务器后最常见的结果就是收不到邮件。

### 2. 去注册商更换名称服务器

Cloudflare 会分配两条名称服务器，例如 `ashton.ns.cloudflare.com`。回到域名注册商，把原来的名称服务器换成这两条。若注册商启用了 DNSSEC，切换前先关闭旧 DNSSEC；域名激活后再按当前配置重新启用。传播可能几分钟，也可能更久，期间不要反复修改多套 DNS。

## 三、DNS、代理与 HTTPS

### 1. 橙色云和灰色云

- **已代理（橙色云）**：访客先到 Cloudflare，再到源站；CDN、边缘 HTTPS 与隐藏源站 IP 依赖它。
- **仅 DNS（灰色云）**：Cloudflare 只回答解析，访客直接连接源站。

网站的根域名和 `www` 通常可以开橙色云。SSH、邮件服务器主机名和需要访客直连的非 HTTP 服务通常保持灰色云。MX、TXT 本身没有代理开关，但 MX 指向的 A/AAAA 主机名不能误开代理。

### 2. SSL/TLS 选择

优先使用自动 SSL/TLS；手动选择时，源站有有效证书就用“完整（严格）”。“灵活”会让 Cloudflare 到源站走 HTTP，容易与源站的 HTTPS 跳转形成“重定向次数过多”。在边缘证书中打开“始终使用 HTTPS”。

## 四、从 GitHub 发布网站

在“计算 → Workers 和 Pages”中选择从 GitHub 导入仓库。纯 HTML 项目可以不填构建命令；使用 Astro、VitePress 或其他框架时填写对应构建命令和输出目录。部署命令通常保留：

```bash
npx wrangler deploy
```

授权 GitHub 时只开放实际需要的仓库。部署完成后，在项目的“域”或“自定义域和路由”中添加 `www.example.com` 或 `example.com`。绑定前确认该主机名没有被旧 CNAME 占用；如果根域名仍指向 VPS，可以先用 `www` 或 `blog` 子域名验证。以后向 `main` 推送提交，项目可以按配置自动重新部署。

## 五、用 Email Routing 做收信转发

Email Routing 负责接收发往 `hi@example.com` 的邮件，再转发到 Gmail、Outlook 或其他已有邮箱；它不是完整邮箱服务。接入域名时按提示添加 MX、SPF、DKIM 等记录。若域名已有企业邮箱，先决定由哪一方接收，避免 MX 冲突。

1. 在“目标地址”添加常用邮箱并完成验证。
2. 在“路由规则”中匹配 `hi` 和你的域名，操作选择发送到电子邮件，目标选择已验证地址。
3. 用另一邮箱发测试邮件，收不到时先查垃圾箱和 MX 记录。

## 六、用 R2 存图片和备份

R2 适合图片、视频、备份压缩包和静态资源。原文记录的免费计划额度为每月 10 GB 标准存储、100 万次 A 类操作和 1,000 万次 B 类操作，下载出站流量不收费；这些数字应以当前 [R2 价格文档](https://developers.cloudflare.com/r2/pricing/) 为准。

创建存储桶时，桶名是永久性的，默认存储类选“标准”。存储桶默认私有，要公开图片可添加自定义域，例如 `img.example.com`。`r2.dev` 公共开发 URL 适合测试，正式站点优先使用自定义域。公开访问前确认桶里没有私密备份、日志或用户上传文件；账户 ID、访问密钥和令牌不要截图或提交仓库。

## 七、查看并控制 AI 爬虫

在域名的 AI Crawl Control 中，可以按运营商查看 OpenAI、Anthropic、Common Crawl、ByteDance、Google 等爬虫的请求。在“安全性”中按爬虫选择放行或拦截。搜索引擎类爬虫通常需要放行，纯训练用途的爬虫则按站点内容策略决定。

AI Labyrinth 是干扰不遵守 robots.txt 的自动程序的机制：它加入只有爬虫能看到的 nofollow 链接，把程序引向 AI 生成内容。它是拖住和识别，不是拦截；需要明确阻断时仍要配置拦截策略。

## 八、用 Workers 加一个后端

静态网站只能返回固定文件，Worker 可以接收请求、调用 API 并返回动态数据。在“计算 → Workers 和 Pages”中从 Hello World 创建 Worker，部署后会得到 `hello-ai.你的子域.workers.dev`。Worker 本身不保存持久数据，需要键值数据时接 KV，需要关系查询时接 D1。

截至原文记录，免费计划限额以官方 [Workers 价格文档](https://developers.cloudflare.com/workers/platform/pricing/) 为准，不能照抄旧教程中的数字。

## 九、用 Workers AI 调用模型

Workers AI 把开源模型放在 Cloudflare 的 GPU 上，Worker 可通过绑定调用。给 Worker 添加 Workers AI 绑定，变量名设为 `AI`，代码中使用 `env.AI`：

```js
export default {
  async fetch(request, env) {
    const result = await env.AI.run('@cf/google/gemma-4-9b-it', {
      messages: [
        { role: 'system', content: 'You are a concise assistant.' },
        { role: 'user', content: '用一句话解释 DNS。' },
      ],
    })
    return Response.json(result)
  },
}
```

模型 ID 以当前 [Workers AI 入门文档](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/) 和控制台列表为准。原文还介绍 Clef 与 Clef-flash 决策模型：它们适合给选项打概率，用于工单分流、垃圾信息判断和工具路由，不是通用聊天模型，具体状态以 [Cloudflare 的 Clef 介绍](https://blog.cloudflare.com/clef-decision-models/) 为准。

公开的 `workers.dev` 地址可能被任何人调用并消耗额度。演示结束后可关闭公开访问，生产接口必须增加身份验证、限流和输入约束。

## 十、让 Agent 用 `cf` 管理 Cloudflare

Wrangler 仍适合项目开发和部署；新 `cf` CLI 覆盖更广的账号操作，并默认输出 JSON，便于 Agent 读取。原文记录它在 2026 年 9 月处于公开测试，状态和命令集应以 [cf CLI 发布说明](https://blog.cloudflare.com/cloudflare-cf-cli-launch/) 与 [官方 Agent 文档](https://developers.cloudflare.com/cf/agents/) 为准。

```bash
npm install -g cf
cf auth login
cf d1 create --name my-database --dry-run
```

`--dry-run` 只展示请求，不会真正修改账号。删除操作在非交互模式下还需要显式 `--force`；即使命令退出码为 0，也要再次查询资源确认删除。给 Agent 的令牌只授予当前任务需要的账号、域名和动作，设置有效期，不要放进代码、仓库或对话。一旦泄露，立即撤销并重新创建。

## 十一、免费额度与日常排错

按渐进式路径操作：接入域名并核对 DNS/DNSSEC；配好代理、证书和 HTTPS；从 GitHub 部署站点；需要收信时启用 Email Routing；需要文件时创建 R2；需要后端时创建 Worker；需要模型时绑定 Workers AI；日常维护坚持查询、`--dry-run`、执行、复查四步。

| 现象 | 先检查什么 |
| --- | --- |
| 域名未激活 | 名称服务器、旧 DNSSEC、传播状态 |
| 网站重定向循环 | SSL/TLS 模式、源站 HTTPS、代理状态 |
| 邮件收不到 | MX 冲突、目标地址验证、路由日志 |
| R2 文件打不开 | 存储桶公开状态、自定义域、对象路径 |
| Worker 部署失败 | 构建命令、输出目录、绑定变量和第一条错误 |
| AI 请求失败或额度异常 | 当前模型 ID、计量、公开入口是否被滥用 |
| Agent 误改资源 | 是否先 dry-run、令牌权限、执行后复查 |

Cloudflare 的免费额度、菜单、产品名称和模型列表会变。把官方资料作为最终依据，把本篇作为从域名入口走到 AI 后端的路线图即可。

## 官方资料

- [添加域名](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
- [Email Routing](https://developers.cloudflare.com/email-service/get-started/route-emails/)
- [R2 价格与公开存储桶](https://developers.cloudflare.com/r2/pricing/)
- [管理 AI 爬虫](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
- [AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)
- [Workers 价格](https://developers.cloudflare.com/workers/platform/pricing/)
- [Workers AI 入门](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/)
- [Cloudflare cf CLI](https://blog.cloudflare.com/cloudflare-cf-cli-launch/)
- [Cloudflare Agents](https://developers.cloudflare.com/cf/agents/)
