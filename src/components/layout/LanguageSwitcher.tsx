import { Languages } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { switchLocalePath, useLocale } from '../../lib/locale'
import type { Locale } from '../../lib/locale'
import { cn } from '../../lib/cn'

const LABELS: Record<Locale, { zh: string; en: string }> = {
  zh: { zh: '中文', en: 'EN' },
  en: { zh: 'ZH', en: 'English' },
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale } = useLocale()
  const { pathname, hash } = useLocation()

  function targetHref(target: Locale) {
    return `${switchLocalePath(pathname, target)}${hash}`
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] p-1 text-xs',
        mobile ? 'w-full justify-between px-2 py-1.5' : '',
      )}
    >
      <span className="inline-flex items-center gap-1 px-1.5 text-ink-400">
        <Languages className="h-3.5 w-3.5" />
        {mobile ? (locale === 'en' ? 'Language' : '语言') : null}
      </span>
      {(['zh', 'en'] as const).map(target => {
        const active = target === locale
        return (
          <Link
            key={target}
            to={targetHref(target)}
            className={cn(
              'rounded px-2 py-1 font-medium transition-colors',
              active
                ? 'bg-violet-500/15 text-violet-200'
                : 'text-ink-300 hover:bg-white/5 hover:text-ink-100',
            )}
          >
            {LABELS[locale][target]}
          </Link>
        )
      })}
    </div>
  )
}
