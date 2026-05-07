import type { SectionOfType } from '@/lib/config'
import { CtaButton } from '../cta'

export function CenteredText({
  section,
}: {
  section: SectionOfType<'centered-text'>
}) {
  const { data } = section
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        {data.eyebrow && (
          <div className="inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
            {data.eyebrow}
          </div>
        )}
        <h2 className="mt-2 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
          {data.headline}
        </h2>
        {data.subhead && (
          <p className="mt-4 text-lg text-zinc-800">{data.subhead}</p>
        )}
        {data.cta && (
          <div className="mt-6 inline-block">
            <CtaButton cta={data.cta} />
          </div>
        )}
      </div>
    </section>
  )
}
