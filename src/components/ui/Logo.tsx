import { cn } from '../../lib/cn'

/**
 * gpt88.cc 文档站标志
 * 设计：紫色发光斜杠图形 + 文字组合
 * 使用纯 SVG/CSS，避免引入图片依赖
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        aria-hidden
        className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-500/30 to-cyan-400/20 ring-1 ring-violet-500/40"
      >
        {/* 中央闪电符号，强调 API 网关“快速通过”意象 */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 text-violet-200"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-md bg-violet-500/20 blur-md" />
      </span>
      <span className="font-semibold tracking-tight text-ink-50">
        gpt88<span className="text-violet-400">.cc</span>
      </span>
    </span>
  )
}
