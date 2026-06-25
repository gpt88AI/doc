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
        GPT88 <span className="text-cyan-300">Agent</span>{' '}
        <span className="text-ink-300">Docs</span>
      </span>
    </span>
  )
}
