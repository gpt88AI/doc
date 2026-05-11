# gpt88.cc API Docs

`gpt88.cc` 开发者文档站，使用 React + TypeScript + Vite + Tailwind CSS v4 构建。

站点内容围绕统一 AI API 网关展开，包含快速开始、认证与计费、API Reference、SDK 示例、配置文件导出指南、模型导航和模型详情页。

## 内容范围

- 首页：展示 gpt88.cc、OpenAI Compatible、统一 API 网关、多模型接入。
- 文档：概览、快速开始、认证与计费、FAQ。
- API Reference：`POST /v1/chat/completions`、`GET /v1/models`、错误码。
- SDK 示例：cURL、Python SDK、Node.js SDK。
- 指南：配置文件导出、gpt88.cc 接入教程。
- 模型市场：模型分类、搜索、能力标签、推荐场景、详情页。

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

## GitHub Pages

仓库使用 GitHub Actions 部署到 GitHub Pages：

```text
.github/workflows/pages.yml
```

如果部署到默认项目 Pages 地址：

```text
https://gpt88ai.github.io/doc/
```

构建时需要使用：

```bash
VITE_BASE_PATH=/doc/ npm run build
```

如果绑定自定义域名：

```text
https://doc.gpt88.cc/
```

构建时应使用根路径：

```bash
VITE_BASE_PATH=/ npm run build
```

DNS 配置：

```text
类型: CNAME
主机/名称: doc
记录值/目标: gpt88ai.github.io
```

GitHub 仓库设置：

1. 打开 `https://github.com/gpt88AI/doc/settings/pages`
2. `Source` 选择 `GitHub Actions`
3. `Custom domain` 填写 `doc.gpt88.cc`
4. DNS 检查通过后启用 `Enforce HTTPS`

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
- GitHub Pages workflow：构建后复制 `dist/index.html` 为 `dist/404.html`。

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
```

## 维护约定

- 不在静态文档中写死真实价格、限速、SLA 等强时效信息；这些内容应指向控制台或后端动态配置。
- 示例 Base URL 默认展示 `https://api.gpt88.cc/v1`，配置文件导出页面可展示按线路生成的地址。
- API Key、截图和日志中必须脱敏，禁止提交真实密钥。
- 新增模型时优先更新 `src/data/models.ts`，再补对应文档或详情页说明。
- 新增文档入口时同步更新 `src/data/nav.ts`。
