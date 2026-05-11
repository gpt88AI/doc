# vercel.json 注释（与同目录 vercel.json 配套）

**为什么单独写一份说明：** Vercel 的 `vercel.json` 是严格 JSON，不允许 `//` 或 `#`
注释。为满足"配置文件需有中文说明"的要求，把注释抽到这份 Markdown 里，
不影响 `vercel.json` 自身的合法性。

## rewrites 规则

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- 本站使用 react-router-dom 的 **BrowserRouter**（HTML5 History 模式），
  深链如 `/docs/quickstart`、`/docs/api/chat-completions`、
  `/models/deepseek-v4-pro` 在 `dist/` 中并不存在对应的物理 `.html` 文件。
- 如果用户直接访问深链或在深链上刷新，Vercel 会找不到文件，
  默认返回 404（虽然某些项目会被 Vercel 自动检测为 SPA，但显式声明更稳妥）。
- 这条 `rewrites` 让任意路径都内部 rewrite 到 `/index.html`（**保留 URL**，
  不像 redirect 会改变浏览器地址栏），由 react-router 在客户端解析路径。
- 必须用 `rewrites`（200）而不是 `redirects`（301/302），
  否则 SEO 与 client 缓存都会被污染成"重定向"。

## 与 `public/_redirects` 的关系

- `public/_redirects` 服务于 Netlify / Cloudflare Pages，规则等价。
- 两份配置共存不冲突：每个平台只读自己识别的那一份。
- Vite 构建时会把 `public/_redirects` 复制到 `dist/_redirects`，
  Netlify / Cloudflare Pages 部署后即刻生效。
