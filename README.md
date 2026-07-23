# gpt88.cc API Docs

`gpt88.cc` 开发者文档站，使用 React + TypeScript + Vite + Tailwind CSS v4 构建。

站点内容围绕统一 AI API 网关展开，包含快速开始、认证与计费、API Reference、SDK 示例、配置文件导出指南、Agent 图片工作台教程、Codex 工具教程、模型导航和模型详情页。

## 内容范围

- 首页：展示 gpt88.cc、OpenAI Compatible、统一 API 网关、多模型接入。
- 文档：概览、快速开始、认证与计费、FAQ。
- API Reference：`POST /v1/chat/completions`、Google / Gemini 图片生成、`GET /v1/models`、错误码。
- SDK 示例：cURL、Python SDK、Node.js SDK。
- 指南：配置文件导出、gpt88 AI 中转站、gpt88.cc 通用教程、完整接入手册、Agent 图片工作台、Codex 插件 OAuth 登录、Codex gpt-image-2 Skill 图片生成、Codex 前端设计 Skill、Codex 办公与知识工作、Claude Code 上下文恢复、Windows Codex PowerShell 7 / 524 排查。
- 模型市场：模型分类、搜索、能力标签、推荐场景、详情页。
- 外部参考：CodexGuide（https://github.com/freestylefly/CodexGuide）作为 Codex 使用和配置的扩展阅读。

## 重要入口

```text
文档站: https://doc.gpt88.cc/
控制台: https://gpt88.cc/
Agent 图片工作台: https://agent.gpt88.cc/
X / Twitter: https://x.com/webstarchina
Telegram: https://t.me/+CtlYILkGaY1jYzBl
默认 OpenAI 兼容 Base URL: https://gpt88.cc/v1
图片加速 Base URL: https://img.gpt88.cc
```

## 核心理念

gpt88.cc 文档站强调“AI 电网 / Token 电力”的计费理解方式：

- 充值 1 元 = 账户 1 元余额。
- 模型实际消耗多少，就按真实人民币余额扣多少。
- 不使用传统中转站的复杂倍率、积分盘、虚拟刀换算。
- 文档中避免写死强时效价格、限速和 SLA，具体数值以控制台动态配置为准。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:27891/
```

开发端口固定在 `27891`，避免与常见的 `3000`、`5173`、`8080` 冲突。

## 构建

```bash
npm run build
npm run preview
```

构建产物输出到 `dist/`。`dist/` 不提交到 Git，部署时由 CI 生成。

## SEO / GEO

本站在构建前会自动生成搜索引擎与 AI 引擎入口文件：

```bash
npm run seo
```

生成文件：

- `public/robots.txt`：允许抓取并声明 sitemap。
- `public/sitemap.xml`：包含首页、文档页和模型详情页 URL。
- `public/prerender-routes.json`：记录所有有效站内路由的静态预渲染清单；其中未完成翻译的英文页面会生成 `noindex` fallback，但不会进入 sitemap。
- `public/llms.txt`：面向 AI 搜索和开发者 Agent 的精简索引。
- `public/llms-full.txt`：面向 LLM 的完整文档与模型索引。

`npm run build` 会先执行 `npm run seo`，确保 GitHub Pages 发布产物包含最新 SEO/GEO 入口。

构建流程还会执行 SSR 预渲染：

```bash
npm run build:ssr
npm run prerender
```

预渲染会根据 `prerender-routes.json` 为所有有效中文/英文站内路由生成真实 HTML，并额外生成 `dist/404.html`。sitemap 只保留可索引内容，未完成翻译的英文页面仍可被直接访问，但通过 `noindex` 和中文 canonical 避免产生重复或低质量索引。构建审计还会检查每个预渲染页面的站内链接、canonical、sitemap/noindex 冲突和 Suspense SSR 完整性。

## GitHub Pages

仓库使用 GitHub Actions 构建后发布到 `gh-pages` 分支，再由 GitHub Pages 提供站点：

```text
.github/workflows/gh-pages.yml
```

当前发布方式面向自定义域名 `https://doc.gpt88.cc/`，构建时使用：

```bash
VITE_BASE_PATH=/ npm run build
```

GitHub Pages 设置：

```text
Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

DNS 配置：

```text
类型: CNAME
主机/名称: doc
记录值/目标: gpt88ai.github.io
```

GitHub 仓库设置：

1. 打开 `https://github.com/gpt88AI/doc/settings/pages`
2. `Source` 选择 `Deploy from a branch`
3. `Branch` 选择 `gh-pages`
4. `Custom domain` 填写 `doc.gpt88.cc`
5. DNS 检查通过后启用 `Enforce HTTPS`

如果你要改回 GitHub 项目页地址 `https://gpt88ai.github.io/doc/`，需要把构建基路径改回：

```bash
VITE_BASE_PATH=/doc/ npm run build
```

## SPA Fallback

本站使用 `react-router-dom` 的 `BrowserRouter`。像下面这些深链没有对应的物理 HTML 文件：

```text
/docs/quickstart
/docs/api/chat-completions
/docs/guides/config-export
/models/claude-opus-4-7
```

生产环境必须把不存在的路径回退到 `index.html`，否则刷新深链会出现 404。

仓库已包含：

- `public/_redirects`：Netlify / Cloudflare Pages fallback。
- `vercel.json`：Vercel fallback。
- GitHub Pages workflow：构建后输出到 `gh-pages` 分支，并生成 `404.html`。

## 项目结构

```text
src/
  App.tsx                         # 路由树
  main.tsx                        # React 入口
  data/
    models.ts                     # 模型导航与详情数据
    nav.ts                        # 文档侧栏与导航数据
  components/
    layout/                       # 顶部导航、文档布局、页脚、锚点导航
    ui/                           # CodeBlock、Callout、FieldTable 等文档组件
  pages/
    LandingPage.tsx               # 首页
    ModelsPage.tsx                # 模型导航
    ModelDetailPage.tsx           # 模型详情
    docs/                         # 文档页面
      api/                        # API Reference
      guides/                     # 任务式教程
      sdk/                        # SDK 示例
```

## 维护约定

- 不在静态文档中写死真实价格、限速、SLA 等强时效信息；这些内容应指向控制台或后端动态配置。
- 示例 Base URL 默认展示 `https://gpt88.cc/v1`，Google 图片生成示例使用 `https://img.gpt88.cc`，配置文件导出页面可展示按线路生成的地址。
- API Key、截图和日志中必须脱敏，禁止提交真实密钥。
- 新增模型时优先更新 `src/data/models.ts`，再补对应文档或详情页说明。
- 新增文档入口时同步更新 `src/data/nav.ts`、`src/App.tsx` 和 `scripts/generate-seo-assets.mjs`，然后执行 `npm run seo`。
- 新增面向搜索或 AI Agent 的重要页面后，必须确认 `public/sitemap.xml`、`public/llms.txt`、`public/llms-full.txt` 已包含对应 URL。
