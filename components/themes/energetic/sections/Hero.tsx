import type { SectionOfType, SiteConfig } from '@/lib/config'
import { CtaButton } from '../cta'

export function Hero({
  section,
  business,
}: {
  section: SectionOfType<'hero'>
  business: SiteConfig['business']
}) {
  const { variant, data } = section
  const isPhotoLed = variant === 'photo-led' && data.image
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-4 border-black bg-orange-50 px-4 py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className={`mx-auto max-w-6xl ${isPhotoLed ? 'grid items-center gap-10 md:grid-cols-2' : ''}`}
      >
        <div>
          {data.eyebrow && (
            <div className="mb-3 inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
              {data.eyebrow}
            </div>
          )}
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl">
            {data.headline}
          </h1>
          {data.subhead && (
            <p className="mt-4 max-w-xl text-lg text-zinc-800 sm:text-xl">
              {data.subhead}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaButton cta={data.primaryCta} />
            {data.secondaryCta && (
              <CtaButton cta={data.secondaryCta} variant="secondary" />
            )}
          </div>
          {data.trustItems.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-zinc-700">
              {data.trustItems.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-2 bg-orange-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        {isPhotoLed && data.image && (
          <div className="relative">
            <div className="overflow-hidden border-4 border-black bg-zinc-100 shadow-[10px_10px_0_0_#000]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image.src}
                alt={data.image.alt}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <span className="sr-only">{business.name}</span>
    </section>
  )
}
