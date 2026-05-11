import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * 简洁深色代码块
 *
 * 不引入完整的 markdown/highlight 流程（M2 再考虑），
 * 这里只用 <pre><code> + 复制按钮，文字用 mono 字体即可获得文档质感。
 */
export function CodeBlock({
  code,
  lang,
  filename,
  className,
}: {
  code: string
  lang?: string
  filename?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* 复制失败时静默忽略，不打断阅读 */
    }
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-white/5 bg-ink-900/80',
        className,
      )}
    >
      {(filename || lang) ? (
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-3 py-1.5 text-[11px] text-ink-400">
          <span className="font-mono">{filename ?? lang}</span>
          {lang && filename ? (
            <span className="font-mono uppercase tracking-wider">{lang}</span>
          ) : null}
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-6 text-ink-100">
        <code className="font-mono">{code}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label="复制代码"
        className="absolute right-2 top-2 rounded-md border border-white/10 bg-ink-900/80 p-1.5 text-ink-300 opacity-0 transition-opacity hover:text-ink-100 group-hover:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}
