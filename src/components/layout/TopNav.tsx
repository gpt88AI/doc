import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { TOP_NAV } from '../../data/nav'
import { cn } from '../../lib/cn'

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
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="gpt88.cc 首页">
          <Logo />
        </Link>

        {/* 桌面端主导航 */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {TOP_NAV.map(item => {
            const active = pathname.startsWith(item.match)
            return (
              <NavLink
                key={item.match}
                to={item.href}
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
          {/*
           * Human msg-20260509-jwfia3 要求站内仅保留 *.gpt88.cc / *.claudecoder.me
           * 两个根域的链接。原先这里有一个指向外部参考文档站的
           * BookOpen "参考文档" 外链（连同图标一起），现已按 human 要求移除。
           * 旧域名不应再出现在源码（包括注释）中，以避免 QA grep 误报，
           * 也避免后续维护者误以为这里仍应保留第三方入口。
           */}
          {/*
           * "开始使用"是站内深链 (/docs/quickstart)，原先用 <a href> 在
           * BrowserRouter 下点击会触发整页刷新；改成 react-router 的 <Link>，
           * 只走前端路由，避免不必要的网络往返与潜在的 404（无 SPA rewrite）。
           */}
          <Link
            to="/docs/quickstart"
            className="hidden rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/20 hover:text-white md:inline-flex"
          >
            开始使用
          </Link>

          {/* 移动端开关 */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label="切换菜单"
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
            {TOP_NAV.map(item => {
              const active = pathname.startsWith(item.match)
              return (
                <NavLink
                  key={item.match}
                  to={item.href}
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
            {/*
             * 移动端抽屉里的"开始使用"同样是站内深链，统一改用 <Link>。
             * 点击后通过 onClick 关闭抽屉，再由 react-router 完成路由切换。
             */}
            <Link
              to="/docs/quickstart"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-center text-sm font-medium text-violet-200"
            >
              开始使用
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
