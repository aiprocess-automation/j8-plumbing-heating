import type { SectionOfType, SiteConfig } from '@/lib/config'

export function ContactHours({
  section,
  business,
}: {
  section: SectionOfType<'contact-hours'>
  business: SiteConfig['business']
}) {
  const { data } = section
  const phoneTel = business.phone.replace(/[^+0-9]/g, '')
  return (
    <section id="contact" className="bg-orange-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {data.eyebrow && (
          <div className="inline-block border-2 border-black bg-amber-300 px-2 py-1 text-xs font-bold uppercase tracking-widest">
            {data.eyebrow}
          </div>
        )}
        {data.headline && (
          <h2 className="mt-2 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
            {data.headline}
          </h2>
        )}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]">
            <h3 className="font-display text-xl font-black uppercase">Contact</h3>
            <dl className="mt-4 space-y-2 text-zinc-800">
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Phone
                </dt>
                <dd>
                  <a href={`tel:${phoneTel}`} className="text-lg font-bold underline">
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Address
                </dt>
                <dd>
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.region}{' '}
                  {business.address.postal}
                </dd>
              </div>
            </dl>
          </div>
          {data.showHoursTable && business.hours.length > 0 && (
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]">
              <h3 className="font-display text-xl font-black uppercase">Hours</h3>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {business.hours.map((h, i) => (
                    <tr key={i} className="border-b border-zinc-200 last:border-0">
                      <td className="py-1.5 pr-4 font-bold">{h.day}</td>
                      <td className="py-1.5 text-zinc-700">
                        {h.open}
                        {h.close ? ` – ${h.close}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
