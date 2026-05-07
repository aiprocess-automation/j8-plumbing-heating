import type { SectionOfType } from '@/lib/config'

export function Stats({ section }: { section: SectionOfType<'stats'> }) {
  const { data } = section
  return (
    <section className="border-y-4 border-black bg-orange-600 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {data.headline && (
          <h2 className="mb-8 font-display text-2xl font-black uppercase text-white sm:text-3xl">
            {data.headline}
          </h2>
        )}
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {data.items.map((s) => (
            <li key={s.label} className="text-white">
              <div className="font-display text-4xl font-black leading-none sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-bold uppercase tracking-widest text-orange-100">
                {s.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
