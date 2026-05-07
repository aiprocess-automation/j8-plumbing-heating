import type { Cta } from '@/lib/schema'

export function ctaHref(cta: Cta): string {
  if (cta.action === 'tel') return `tel:${cta.target ?? ''}`
  if (cta.action === 'email') return `mailto:${cta.target ?? ''}`
  if (cta.action === 'scroll') return `#${cta.target ?? ''}`
  return cta.target ?? '#'
}

export function CtaButton({
  cta,
  variant = 'primary',
  className = '',
}: {
  cta: Cta
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-base sm:text-lg border-4 transition-transform active:translate-y-1'
  const styles =
    variant === 'primary'
      ? 'bg-orange-600 text-white border-black hover:bg-orange-500 shadow-[6px_6px_0_0_#000]'
      : 'bg-amber-300 text-black border-black hover:bg-amber-200 shadow-[6px_6px_0_0_#000]'
  return (
    <a href={ctaHref(cta)} className={`${base} ${styles} ${className}`}>
      {cta.label}
    </a>
  )
}
