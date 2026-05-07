import type { SectionOfType } from '@/lib/config'
import { CtaButton } from '../cta'

export function CtaBanner({ section }: { section: SectionOfType<'cta-banner'> }) {
  const { data } = section
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl border-4 border-black bg-amber-300 p-8 shadow-[10px_10px_0_0_#000] sm:p-12">
        <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
          {data.headline}
        </h2>
        {data.subhead && (
          <p className="mt-3 text-lg text-zinc-800">{data.subhead}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <CtaButton cta={data.primaryCta} />
          {data.secondaryCta && (
            <CtaButton cta={data.secondaryCta} variant="secondary" />
          )}
        </div>
      </div>
    </section>
  )
}
