import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * 多语言代码切换器
 *
 * 在 API 文档里非常常见的一种 UI：同一个示例提供 cURL / Python / Node 三种语言。
 * 我们不再每个示例都重复写一份"复制按钮 + 语言条"，而是统一封装。
 *
 * 注意：选中态保留在组件内部，每个 CodeTabs 实例独立；
 *      未来如果想做"全局联动"（用户在一处切换 Python，所有示例都切到 Python），
 *      可以把 active 抽到 Context。M2 暂不需要。
 */

export type CodeTab = {
  /** 显示标签，例如 "cURL" / "Python" / "Node.js" */
  label: string
  /** 语言用于代码块小角标，可与 label 不同（例如 label="Node.js" / lang="typescript"） */
  lang?: string
  code: string
}

export function CodeTabs({
  tabs,
  className,
}: {
  tabs: CodeTab[]
  className?: string
}) {
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const active = tabs[idx]

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* 复制失败时静默忽略 */
    }
  }

  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-white/5 bg-ink-900/80',
        className,
      )}
    >
      {/* 顶部 Tab 条 */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] pl-1 pr-2">
        <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setIdx(i)}
              className={cn(
                'relative shrink-0 px-3 py-1.5 text-xs font-medium transition-colors',
                i === idx
                  ? 'text-violet-200'
                  : 'text-ink-400 hover:text-ink-200',
              )}
            >
              {t.label}
              {i === idx ? (
                <span
                  aria-hidden
                  className="absolute inset-x-2 bottom-0 h-px bg-violet-400"
                />
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="复制代码"
          className="rounded p-1.5 text-ink-300 hover:bg-white/5 hover:text-ink-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-6 text-ink-100">
        <code className="font-mono">{active.code}</code>
      </pre>
    </div>
  )
}
