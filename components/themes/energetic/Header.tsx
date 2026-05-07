import type { SiteConfig } from '@/lib/schema'

export function Header({ business }: { business: SiteConfig['business'] }) {
  const phoneTel = business.phone.replace(/[^+0-9]/g, '')
  return (
    <header className="sticky top-0 z-40 border-b-4 border-black bg-orange-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#top"
          className="font-display text-xl font-black uppercase tracking-tight text-black sm:text-2xl"
        >
          {business.name}
        </a>
        <a
          href={`tel:${phoneTel}`}
          className="inline-flex items-center gap-2 border-4 border-black bg-orange-600 px-3 py-2 text-sm font-bold text-white shadow-[4px_4px_0_0_#000] hover:bg-orange-500 sm:px-5 sm:text-base"
        >
          {business.phone}
        </a>
      </div>
    </header>
  )
}
