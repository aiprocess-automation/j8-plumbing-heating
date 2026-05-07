import type { SectionOfType } from '@/lib/config'
import { Icon } from '../icon'

export function Services({ section }: { section: SectionOfType<'services'> }) {
  const { data, variant } = section
  if (variant === 'list-detailed') {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHead eyebrow={data.eyebrow} headline={data.headline} />
          <ul className="mt-10 space-y-6">
            {data.items.map((s) => (
              <li
                key={s.id}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center border-4 border-black bg-orange-600 text-white">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-black uppercase">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-zinc-700">{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  // grid-3 (default)
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={data.eyebrow} headline={data.headline} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((s) => (
            <div
              key={s.id}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
            >
              <span className="inline-flex size-12 items-center justify-center border-4 border-black bg-orange-600 text-white">
                <Icon name={s.icon} size={22} />
              </span>
              <h3 className="mt-4 font-display text-xl font-black uppercase">
                {s.title}
              </h3>
              <p className="mt-2 text-zinc-700">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHead({
  eyebrow,
  headline,
}: {
  eyebrow?: string | undefined
  headline: string
}) {
  return (
    <div>
      {eyebrow && (
        <div className="mb-3 inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
        {headline}
      </h2>
    </div>
  )
}
