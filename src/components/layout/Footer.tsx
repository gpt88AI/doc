import { Link } from 'react-router-dom'

/**
 * 全局底部
 * 文档站底部保持极简：版权 + 关键链接，避免与首屏 CTA 视觉打架
 *
 * 链接处理原则：
 * - 站内深链（/docs/*、/models 等）一律使用 react-router 的 <Link>，
 *   避免在 BrowserRouter 下整页刷新；同时也防止部署环境缺少 SPA rewrite 时
 *   通过裸 <a href="/x"> 触发服务端 404。
 * - Human msg-20260509-jwfia3 要求站内仅保留 *.gpt88.cc / *.claudecoder.me
 *   两个根域的链接。原先这里有一个指向外部参考文档站的"状态"链接，
 *   现已按 human 要求移除；不替换成站内 placeholder，等 PM 派下"状态"页任务再加回。
 * - 旧域名不应再出现在源码（包括注释）中，以避免 QA grep 误报，
 *   也避免后续维护者误以为这里仍应保留第三方状态页入口。
 */
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span>© {new Date().getFullYear()} gpt88.cc</span>
          <span className="hidden sm:inline text-ink-600">•</span>
          <span>统一 API 网关 · OpenAI Compatible</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* 文档/快速开始/模型导航：站内深链，使用 <Link> */}
          <Link className="hover:text-ink-200" to="/docs/overview">
            文档
          </Link>
          <Link className="hover:text-ink-200" to="/docs/quickstart">
            快速开始
          </Link>
          <Link className="hover:text-ink-200" to="/models">
            模型
          </Link>
        </nav>
      </div>
    </footer>
  )
}
