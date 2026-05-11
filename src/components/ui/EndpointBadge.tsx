import { cn } from '../../lib/cn'

/**
 * HTTP 端点徽章
 *
 * 用在 API Reference 页面顶部，把 method + path 用清晰的颜色块凸显出来，
 * 让读者即使快速扫描也能立刻看出这是 GET 还是 POST、路径是什么。
 *
 * 设计选色：
 * - GET     → 青色（读取，安全）
 * - POST    → 紫色（创建/调用，对应站点主色）
 * - PUT     → 琥珀色（更新）
 * - DELETE  → 红色（删除，警示）
 *
 * 注意：path 始终用 mono 字体，便于和正文区分；不做自动复制，避免误触。
 */

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const METHOD_STYLE: Record<Method, string> = {
  GET: 'bg-cyan-500/15 text-cyan-300 ring-cyan-400/30',
  POST: 'bg-violet-500/15 text-violet-300 ring-violet-400/30',
  PUT: 'bg-amber-500/15 text-amber-300 ring-amber-400/30',
  DELETE: 'bg-red-500/15 text-red-300 ring-red-400/30',
  PATCH: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
}

export function EndpointBadge({
  method,
  path,
  className,
}: {
  method: Method
  path: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'not-prose inline-flex items-center gap-2 rounded-md border border-white/10 bg-ink-900/60 p-1.5 pr-3 font-mono text-sm',
        className,
      )}
    >
      <span
        className={cn(
          'rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ring-1',
          METHOD_STYLE[method],
        )}
      >
        {method}
      </span>
      <span className="text-ink-100">{path}</span>
    </div>
  )
}
