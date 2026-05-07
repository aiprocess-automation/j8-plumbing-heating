import type { SectionOfType } from '@/lib/config'

export function Reviews({ section }: { section: SectionOfType<'reviews'> }) {
  const { data, variant } = section
  const items = data.items
  if (variant === 'single-quote' && items[0]) {
    const r = items[0]
    return (
      <section className="bg-orange-50 px-4 py-16">
        <div className="mx-auto max-w-4xl border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_#000]">
          {data.eyebrow && <Eyebrow text={data.eyebrow} />}
          <blockquote className="mt-4 font-display text-2xl font-black uppercase leading-snug sm:text-3xl">
            “{r.text}”
          </blockquote>
          <div className="mt-6 text-sm font-bold uppercase tracking-widest">
            — {r.author} <Stars n={r.rating} /> · Google
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="bg-orange-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {data.eyebrow && <Eyebrow text={data.eyebrow} />}
        <h2 className="mt-2 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
          {data.headline}
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li
              key={r.id}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
            >
              <Stars n={r.rating} />
              <blockquote className="mt-3 text-zinc-800">“{r.text}”</blockquote>
              <div className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-600">
                — {r.author} · Google
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
      {text}
    </div>
  )
}

function Stars({ n }: { n: number }) {
  return (
    <div aria-label={`${n} star rating`} className="text-orange-600">
      {'★'.repeat(n)}
      <span className="text-zinc-300">{'★'.repeat(5 - n)}</span>
    </div>
  )
}
