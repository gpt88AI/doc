import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'

/**
 * 顶层应用框架
 * - 顶部导航 + 内容区 + 全局底部
 * - 内容区不限制宽度，由具体页面决定（首页全宽，文档页带侧栏）
 */
export function SiteShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950 text-ink-100">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
