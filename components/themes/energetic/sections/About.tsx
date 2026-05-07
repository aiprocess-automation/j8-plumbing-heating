import type { SectionOfType } from '@/lib/config'
import { Icon } from '../icon'

export function About({ section }: { section: SectionOfType<'about'> }) {
  const { data } = section
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {data.eyebrow && (
          <div className="inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
            {data.eyebrow}
          </div>
        )}
        <h2 className="mt-2 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
          {data.headline}
        </h2>
        <p className="mt-5 text-lg text-zinc-800">{data.narrative}</p>
        {data.badges.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {data.badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_#000]"
              >
                <span className="text-orange-600">
                  <Icon name={b.icon} size={18} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
