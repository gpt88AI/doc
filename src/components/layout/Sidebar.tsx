import { NavLink, useLocation } from 'react-router-dom'
import { DOCS_NAV } from '../../data/nav'
import { cn } from '../../lib/cn'

/**
 * 文档侧边导航
 *
 * 在桌面端固定在视口左侧，sticky 顶住 TopNav 之下；移动端在 DocsLayout 中折叠成可展开抽屉。
 * upcoming 标记的链接会显示一个虚化"WIP"小角标，提示读者该页面尚未填充内容（M2/M3 任务）。
 */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col gap-6 px-2 py-4 text-sm">
      {DOCS_NAV.map(section => (
        <div key={section.title} className="flex flex-col gap-1">
          <h4 className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            {section.title}
          </h4>
          <ul className="flex flex-col">
            {section.items.map(item => {
              // 精确匹配；overview/quickstart 等顶层路径恰好等于 path
              const active = pathname === item.path
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onNavigate}
                    className={cn(
                      'group relative flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] leading-snug transition-colors',
                      active
                        ? 'bg-violet-500/12 text-violet-200'
                        : 'text-ink-300 hover:bg-white/5 hover:text-ink-100',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {/* 活跃指示器：左侧细紫线 */}
                      <span
                        aria-hidden
                        className={cn(
                          'inline-block h-3.5 w-px transition-colors',
                          active
                            ? 'bg-violet-400'
                            : 'bg-transparent group-hover:bg-ink-600',
                        )}
                      />
                      <span className="truncate">{item.title}</span>
                    </span>
                    {item.upcoming ? (
                      <span className="rounded border border-white/10 bg-white/[0.03] px-1 text-[9px] font-medium uppercase tracking-wider text-ink-400">
                        WIP
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
