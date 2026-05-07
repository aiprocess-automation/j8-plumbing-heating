import { getContent } from '@/lib/content'
import { getSiteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getContent()
  const url = getSiteUrl(data)
  const { business } = data
  const location = [business.address.city, business.address.region]
    .filter(Boolean)
    .join(', ')

  // Walk sections for content the AI can summarize.
  const services = data.sections
    .flatMap((s) =>
      s.type === 'services'
        ? s.data.items.map(
            (i) => `- [${i.title}](${url}/#services): ${i.description}`,
          )
        : [],
    )
    .join('\n')
  const aboutNarrative = data.sections
    .flatMap((s) => (s.type === 'about' ? [s.data.narrative] : []))
    .join('\n\n')
  const hours = business.hours
    .map((h) => `${h.day}: ${h.open}${h.close ? `–${h.close}` : ''}`)
    .join('\n')

  const body = `# ${business.name}

> ${business.tagline || data.meta.description}

${aboutNarrative || data.meta.description}

**Location:** ${business.address.street}, ${location} ${business.address.postal}
**Phone:** ${business.phone}${business.email ? `\n**Email:** ${business.email}` : ''}

## Services
${services || '- See homepage for service details.'}

## Hours
${hours || 'Contact for hours.'}

## Key links
- [Homepage](${url}/)
- [Contact](${url}/#contact)
- [Privacy policy](${url}/privacy)
- [Terms](${url}/terms)
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
