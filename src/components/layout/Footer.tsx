import { Link } from 'react-router-dom'
import { localizedContentPath, localizePath, useLocale } from '../../lib/locale'
import { getLocaleCopy } from '../../lib/localeCopy'

/**
 * 全局底部
 * 文档站底部保持极简：版权 + 关键链接，避免与首屏 CTA 视觉打架
 *
 * 链接处理原则：
 * - 站内深链（/docs/*、/models 等）一律使用 react-router 的 <Link>，
 *   避免在 BrowserRouter 下整页刷新；同时也防止部署环境缺少 SPA rewrite 时
 *   通过裸 <a href="/x"> 触发服务端 404。
 * - 社区入口使用官方 X 与 Telegram 链接，统一放在全局底部，避免分散到单篇文档。
 */
export function Footer() {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale)
  const labels = {
    slogan: locale === 'zh' ? '统一 API 网关 · OpenAI Compatible' : copy.home.eyebrow,
    docs: copy.nav.docs,
    quickstart: copy.nav.quickstart,
    models: copy.nav.models,
  }
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span>© {new Date().getFullYear()} gpt88.cc</span>
          <span className="hidden sm:inline text-ink-600">•</span>
          <span>{labels.slogan}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* 文档/快速开始/模型导航：站内深链，使用 <Link> */}
          <Link className="hover:text-ink-200" to={localizePath('/docs/overview/', locale)}>
            {labels.docs}
          </Link>
          <Link className="hover:text-ink-200" to={localizePath('/docs/quickstart/', locale)}>
            {labels.quickstart}
          </Link>
          <Link className="hover:text-ink-200" to={localizedContentPath('/models/', locale)}>
            {labels.models}
          </Link>
          <a
            className="hover:text-ink-200"
            href="https://x.com/webstarchina"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            className="hover:text-ink-200"
            href="https://t.me/+CtlYILkGaY1jYzBl"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
        </nav>
      </div>
    </footer>
  )
}
