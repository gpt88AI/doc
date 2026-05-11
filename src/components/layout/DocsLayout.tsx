import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { cn } from '../../lib/cn'

/**
 * 文档区布局
 *
 * 桌面：左侧固定 Sidebar，中间主内容，右侧由具体 DocPage 渲染 AnchorNav。
 * 移动：默认折叠，点击顶部"目录"按钮抽屉式展开。
 */
export function DocsLayout() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 移动端目录开关 */}
      <div className="sticky top-14 z-30 -mx-4 flex items-center gap-2 border-b border-white/5 bg-ink-950/85 px-4 py-2 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setNavOpen(v => !v)}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-ink-200"
        >
          {navOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          {navOpen ? '关闭目录' : '文档目录'}
        </button>
      </div>

      <div className="flex gap-8 py-8">
        {/* 桌面端固定侧边导航 */}
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto md:block">
          <Sidebar />
        </aside>

        {/* 移动端抽屉 */}
        <aside
          className={cn(
            'fixed inset-x-0 top-[6.5rem] z-30 mx-4 max-h-[70dvh] origin-top overflow-y-auto rounded-lg border border-white/10 bg-ink-900/95 backdrop-blur md:hidden',
            navOpen ? 'block' : 'hidden',
          )}
        >
          <Sidebar onNavigate={() => setNavOpen(false)} />
        </aside>

        {/* 主内容 */}
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
