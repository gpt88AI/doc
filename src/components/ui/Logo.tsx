import { cn } from '../../lib/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <img
        src="/favicon.svg"
        alt=""
        aria-hidden
        className="h-8 w-8 rounded-lg object-cover shadow-[0_0_24px_rgba(94,234,212,0.12)]"
      />
      <span className="font-semibold tracking-tight text-ink-50">
        GPT88 <span className="font-mono text-[0.78em] font-semibold tracking-[0.08em] text-[#9ee77d]">/ API</span>{' '}
        <span className="text-ink-300">Docs</span>
      </span>
    </span>
  )
}
