import { useEffect, useState } from 'react'

/**
 * 文档右侧"On this page"锚点目录
 *
 * 通过 IntersectionObserver 跟踪页面内 h2/h3 进出视口，
 * 把当前最靠近顶部的标题高亮。
 *
 * 期待页面结构：所有 heading 元素都设置了 id（DocPage 内通过 props.headings 提供）。
 */

export type Heading = {
  id: string
  text: string
  /** 当前只支持 2 / 3 级 */
  level: 2 | 3
}

export function AnchorNav({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (elements.length === 0) return

    // rootMargin 顶部留 80px，把屏幕顶端那个 heading 当作"当前"
    const observer = new IntersectionObserver(
      entries => {
        // 取所有当前可见 entry 中最靠上的那一个
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: [0, 1] },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="本页目录" className="flex flex-col gap-2 text-sm">
      <h5 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
        本页目录
      </h5>
      <ul className="flex flex-col gap-0.5 border-l border-white/10 pl-3">
        {headings.map(h => {
          const isActive = active === h.id
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={
                  'block py-1 text-[12.5px] leading-snug transition-colors ' +
                  (isActive
                    ? 'text-violet-300'
                    : 'text-ink-400 hover:text-ink-200') +
                  (h.level === 3 ? ' pl-3' : '')
                }
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
