import { AlertTriangle, Info, Lightbulb, ShieldAlert } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * 文档强调块
 *
 * 在文档里我们经常需要把某段信息从正文中"拎出来"——例如：
 * - 提示真实价格/限速由控制台动态下发，避免读者按文档示例当成 SLA；
 * - 提醒安全风险（不要把 API Key 写进客户端）；
 * - 给出与 OpenAI 行为不一致的边界。
 *
 * 用 4 种 tone 区分严重程度，颜色和图标都与正文保持低对比，避免抢戏。
 */

type Tone = 'info' | 'tip' | 'warn' | 'danger'

const TONE: Record<Tone, { ring: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  info: {
    ring: 'border-cyan-500/25',
    bg: 'bg-cyan-500/[0.05]',
    text: 'text-cyan-200',
    icon: Info,
  },
  tip: {
    ring: 'border-violet-500/25',
    bg: 'bg-violet-500/[0.05]',
    text: 'text-violet-200',
    icon: Lightbulb,
  },
  warn: {
    ring: 'border-amber-500/25',
    bg: 'bg-amber-500/[0.05]',
    text: 'text-amber-200',
    icon: AlertTriangle,
  },
  danger: {
    ring: 'border-red-500/25',
    bg: 'bg-red-500/[0.05]',
    text: 'text-red-200',
    icon: ShieldAlert,
  },
}

export function Callout({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: Tone
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const t = TONE[tone]
  const Icon = t.icon
  return (
    <aside
      className={cn(
        'not-prose my-6 flex gap-3 rounded-lg border p-4',
        t.ring,
        t.bg,
        className,
      )}
    >
      <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', t.text)} />
      <div className="flex-1 text-sm leading-relaxed text-ink-200">
        {title ? (
          <div className={cn('mb-1 font-semibold', t.text)}>{title}</div>
        ) : null}
        <div className="space-y-2">{children}</div>
      </div>
    </aside>
  )
}
