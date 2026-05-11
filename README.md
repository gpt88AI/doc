# Agency Console（Web）

React + TypeScript + Vite + Tailwind CSS v4 + **pnpm**。轻量控制台壳子，后续对接 agencycli 工作区数据。

**信息架构**：**团队**（编制 / hire）与 **项目**（任务、消息、项目内成员）分离；进入 `/projects/:id` 后侧栏展开 **任务 / 消息 / 成员**。主题：**中性灰 + sky 强调色**（浅色 `neutral`，深色 `zinc`），侧栏加宽与间距已优化。

## 开发

```bash
pnpm install
pnpm dev
# 默认 http://localhost:27891 （避免与 3000/5173/8080 等常见端口冲突）
```

## 国际化（i18n）

- 使用 **i18next** + **react-i18next** + **i18next-browser-languagedetector**。
- 文案放在 `src/locales/<语言>/common.json`（当前：`en`、`zh-CN`）。
- 语言会写入 `localStorage`（`i18nextLng`），并同步 `<html lang>`。
- 新增文案：在两个 JSON 中加同名 key，在组件里 `useTranslation()` → `t('…')`。

## 主题（浅色 / 深色 / 跟随系统）

- `ThemeProvider`（`src/theme/ThemeProvider.tsx`）管理 `light` | `dark` | `system`。
- 持久化键：`localStorage['agency-console-theme']`。
- Tailwind 使用 **`dark:`** 变体；根节点 **`class="dark"`** 表示深色。
- `index.html` 内联脚本在首屏前应用主题，减轻闪烁（FOUC）。
- **顶部栏** 太阳 / 月亮 / 显示器图标：**循环** 浅色 → 深色 → 跟随系统。
- **设置页** 可精确选择语言与外观。

## 构建

```bash
pnpm run build          # 输出到 dist/
pnpm preview            # 本地预览

# 或使用根目录 Makefile（自动 npm install + vite build）
cd .. && make web
```

## 嵌入到 Go 二进制

`web/embed.go` 使用 `//go:embed all:dist` 将 `dist/` 目录编译进 Go 二进制。
`agencycli start` 命令在同一端口同时服务 API 和 SPA 前端。

```bash
cd .. && make build     # 构建前端 + Go 二进制（dist/agencycli）
./dist/agencycli start  # http://127.0.0.1:27892
```

## 静态部署 SPA Fallback

> 本站使用 **react-router-dom 的 BrowserRouter**（HTML5 History 模式）。
> 像 `/docs/quickstart`、`/docs/api/chat-completions`、`/models/deepseek-v4-pro`
> 这类深链在打包后的 `dist/` 中**没有**对应的物理 `.html` 文件——它们由
> react-router 在客户端根据 `location.pathname` 渲染。
>
> 因此，托管服务器必须把任何"找不到文件"的 GET 请求**用 200 状态码回退到
> `/index.html`**，否则用户直接访问深链或刷新页面就会拿到 404。

仓库已经准备好两份开箱即用的配置：

- `public/_redirects` — Netlify / Cloudflare Pages（Vite 默认会把 `public/`
  下的文件原样复制到 `dist/`，构建产物 `dist/_redirects` 部署后立即生效）。
- `vercel.json` — Vercel 平台。规则与 `_redirects` 等价（详见 `vercel.json.md`，
  因为 Vercel 的 JSON 不接受注释，注释抽到了同名 Markdown）。

### 其它常见托管平台

#### Nginx

```nginx
server {
  listen 80;
  server_name docs.example.com;
  root   /var/www/gpt88-docs/dist;
  index  index.html;

  # 关键：找不到文件时回退到 index.html，并保持 200 状态码
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源加长缓存（assets/ 下都是带 hash 的文件名，可放心 immutable）
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

#### Apache（启用 mod_rewrite）

在 `dist/.htaccess` 写入：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 真实存在的文件 / 目录直接放行
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 其它路径全部 rewrite 到 index.html，由 react-router 接管
  RewriteRule ^ index.html [L]
</IfModule>
```

#### AWS S3 + CloudFront

- S3 静态站点托管：把 **错误页（Error document）** 设为 `index.html`，
  这样 S3 会用 200 返回 index.html 给所有不存在的对象。
- CloudFront：在 **Error Pages** 把 403 / 404 都重写为响应 `200 /index.html`，
  避免 S3 的 SignatureV4 路径上把 404 透传给浏览器。

#### Cloudflare Pages

- 优先使用 `public/_redirects`（已包含在仓库中）。
- 也可以使用 `_routes.json` 精细化控制；常规文档站不需要。

### 验证 fallback 是否生效

```bash
# 本地起一个最小静态服务器（任选其一）：
npx serve dist                # 默认端口 3000，无 fallback，可用来对比
npx vite preview              # 自动带 SPA fallback，行为最贴近生产 BrowserRouter
```

直接访问 `http://localhost:<port>/docs/quickstart`：

- 在带 fallback 的环境（`vite preview`、配置好的 Netlify / Vercel / Nginx）应能直接渲染快速开始页面；
- 在不带 fallback 的环境（裸 `serve dist`）会得到 404——这正说明 fallback 配置必不可少。
