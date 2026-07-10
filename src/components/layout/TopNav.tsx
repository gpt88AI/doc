import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ExternalLink, Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { GlobalSearch } from '../search/GlobalSearch'
import { getTopNav } from '../../data/nav'
import { cn } from '../../lib/cn'
import { localizePath, stripLocalePrefix, useLocale } from '../../lib/locale'
import { LanguageSwitcher } from './LanguageSwitcher'

const COMMUNITY_LINKS = [
  { titleZh: 'X 社区', titleEn: 'X Community', href: 'https://x.com/webstarchina' },
  { titleZh: 'Telegram', titleEn: 'Telegram', href: 'https://t.me/+CtlYILkGaY1jYzBl' },
] as const

/**
 * 顶部主导航
 *
 * 视觉设计：
 * - 半透明深色背景 + 模糊，固定顶部，带细描边
 * - 高亮当前 section（按 path 前缀匹配）
 * - 桌面端横向链接，移动端折叠抽屉
 *
 * 注意：当前路径来自 `useLocation`，匹配逻辑用 startsWith 而不是精确相等，
 *      因为 `/docs/api/chat-completions` 这类深层路径仍应让"API Reference"高亮。
 */
export function TopNav() {
  const { pathname } = useLocation()
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const topNav = getTopNav(locale)
  const plainPath = stripLocalePrefix(pathname)
  const labels =
    locale === 'en'
      ? {
          home: 'gpt88.cc Home',
          getStarted: 'Get Started',
          community: 'Community',
          toggle: 'Toggle menu',
        }
      : {
          home: 'gpt88.cc 首页',
          getStarted: '开始使用',
          community: '社区',
          toggle: '切换菜单',
        }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to={localizePath('/', locale)} className="shrink-0" aria-label={labels.home}>
          <Logo />
        </Link>

        {/* 桌面端主导航 */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {topNav.map(item => {
            const active = plainPath.startsWith(item.match)
            return (
              <NavLink
                key={item.match}
                to={localizePath(item.href, locale)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-violet-500/10 text-violet-300'
                    : 'text-ink-300 hover:bg-white/5 hover:text-ink-100',
                )}
              >
                {item.title}
              </NavLink>
            )
          })}
        </nav>

        {/* 右侧操作区 */}
        <div className="ml-auto flex items-center gap-2">
          <GlobalSearch className="hidden md:inline-flex" />
          <LanguageSwitcher />
          {COMMUNITY_LINKS.map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-ink-300 transition-colors hover:bg-white/5 hover:text-ink-100 lg:inline-flex"
            >
              {locale === 'en' ? item.titleEn : item.titleZh}
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          ))}
          {/*
           * "开始使用"是站内深链 (/docs/quickstart)，原先用 <a href> 在
           * BrowserRouter 下点击会触发整页刷新；改成 react-router 的 <Link>，
           * 只走前端路由，避免不必要的网络往返与潜在的 404（无 SPA rewrite）。
           */}
          <Link
            to={localizePath('/docs/quickstart/', locale)}
            className="hidden rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/20 hover:text-white md:inline-flex"
          >
            {labels.getStarted}
          </Link>

          {/* 移动端开关 */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label={labels.toggle}
            className="rounded-md p-2 text-ink-200 hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      {open ? (
        <div className="border-t border-white/5 bg-ink-950/95 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {topNav.map(item => {
              const active = plainPath.startsWith(item.match)
              return (
                <NavLink
                  key={item.match}
                  to={localizePath(item.href, locale)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-violet-500/10 text-violet-300'
                      : 'text-ink-200 hover:bg-white/5',
                  )}
                >
                  {item.title}
                </NavLink>
              )
            })}
            <div className="mt-2 border-t border-white/5 pt-2">
              <div className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-500">
                {labels.community}
              </div>
              {COMMUNITY_LINKS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-white/5"
                >
                  {locale === 'en' ? item.titleEn : item.titleZh}
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              ))}
            </div>
            <LanguageSwitcher mobile />
            {/*
             * 移动端抽屉里的"开始使用"同样是站内深链，统一改用 <Link>。
             * 点击后通过 onClick 关闭抽屉，再由 react-router 完成路由切换。
             */}
            <GlobalSearch className="mt-2 w-full justify-center" onNavigate={() => setOpen(false)} />
            <Link
              to={localizePath('/docs/quickstart/', locale)}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-center text-sm font-medium text-violet-200"
            >
              {labels.getStarted}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
