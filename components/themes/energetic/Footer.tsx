import type { SiteConfig } from '@/lib/schema'

export function Footer({ business }: { business: SiteConfig['business'] }) {
  return (
    <footer className="mt-16 border-t-4 border-black bg-black text-orange-100">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="font-display text-xl font-black uppercase text-white">
              {business.name}
            </div>
            <p className="mt-2 text-orange-200">{business.tagline}</p>
          </div>
          <div>
            <div className="font-bold uppercase text-white">Contact</div>
            <p className="mt-2">{business.phone}</p>
            {business.email && <p>{business.email}</p>}
          </div>
          <div>
            <div className="font-bold uppercase text-white">Find us</div>
            <p className="mt-2">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region}{' '}
              {business.address.postal}
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-orange-900/50 pt-4 text-orange-300">
          © {new Date().getFullYear()} {business.name}.
        </div>
      </div>
    </footer>
  )
}
