import { useState } from 'react'
import { ChevronDown, Languages } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { switchLocalePath, useLocale, LOCALE_CONFIG, SUPPORTED_LOCALES } from '../../lib/locale'
import type { Locale } from '../../lib/locale'
import { cn } from '../../lib/cn'

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale } = useLocale()
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const current = LOCALE_CONFIG[locale]

  function targetHref(target: Locale) {
    return `${switchLocalePath(pathname, target)}${hash}`
  }

  return (
    <div className={cn('relative', mobile ? 'w-full' : '')}>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-label={`${current.nativeName} language`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-ink-200 hover:bg-white/[0.07]',
          mobile ? 'w-full justify-between' : '',
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5 text-ink-400" />
          {mobile ? current.nativeName : current.shortName}
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-ink-500 transition-transform', open ? 'rotate-180' : '')} />
      </button>
      {open ? (
        <div className={cn(
          'absolute right-0 z-50 mt-2 grid min-w-56 gap-1 rounded-lg border border-white/10 bg-ink-900 p-2 shadow-2xl',
          mobile ? 'left-0 right-auto w-full' : '',
        )}>
          {SUPPORTED_LOCALES.map(target => {
            const item = LOCALE_CONFIG[target]
            const active = target === locale
            return (
              <Link
                key={target}
                to={targetHref(target)}
                onClick={() => setOpen(false)}
                lang={item.hrefLang}
                dir={item.direction}
                className={cn(
                  'flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors',
                  active ? 'bg-violet-500/15 text-violet-200' : 'text-ink-300 hover:bg-white/5 hover:text-ink-100',
                )}
              >
                <span>{item.nativeName}</span>
                <span className="text-[11px] uppercase tracking-wide text-ink-500">{item.shortName}</span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
