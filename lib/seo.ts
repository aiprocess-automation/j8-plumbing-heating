import type { SiteConfig } from './schema'

/** Canonical site URL with no trailing slash. Reads from siteConfig, falls back to env, then localhost. */
export function getSiteUrl(data: SiteConfig): string {
  const fromConfig = data.meta.url?.trim()
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const url = fromConfig || fromEnv || 'http://localhost:3000'
  return url.replace(/\/+$/, '')
}

function timeToISO(t: string): string | null {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
  if (!m) return null
  let h = parseInt(m[1], 10)
  const mins = m[2] ? parseInt(m[2], 10) : 0
  const ap = m[3]?.toLowerCase()
  if (ap === 'pm' && h < 12) h += 12
  if (ap === 'am' && h === 12) h = 0
  if (h > 23 || mins > 59) return null
  return `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

function expandDays(label: string): string[] {
  const map: Record<string, string> = {
    monday: 'Mo', mon: 'Mo',
    tuesday: 'Tu', tue: 'Tu', tues: 'Tu',
    wednesday: 'We', wed: 'We',
    thursday: 'Th', thu: 'Th', thurs: 'Th',
    friday: 'Fr', fri: 'Fr',
    saturday: 'Sa', sat: 'Sa',
    sunday: 'Su', sun: 'Su',
  }
  const order = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const tokens = label.toLowerCase().split(/[–\-—,/&]+|\s+to\s+|\s+and\s+/).map(s => s.trim()).filter(Boolean)
  const codes = tokens.map(t => map[t]).filter(Boolean)
  if (codes.length === 0) return []
  if (codes.length === 1) return codes
  if (label.match(/[–\-—]|\bto\b/i)) {
    const [start, end] = [codes[0], codes[codes.length - 1]]
    const i0 = order.indexOf(start), i1 = order.indexOf(end)
    if (i0 >= 0 && i1 >= 0 && i1 >= i0) return order.slice(i0, i1 + 1)
  }
  return codes
}

export function buildLocalBusinessJsonLd(data: SiteConfig) {
  const { business, meta } = data
  const url = getSiteUrl(data)
  const sameAs = [business.socials.facebook, business.socials.instagram, business.socials.twitter, business.socials.linkedin]
    .filter((s): s is string => !!s)

  const openingHoursSpecification = business.hours.flatMap(h => {
    const days = expandDays(h.day)
    if (days.length === 0) return []
    const opens = timeToISO(h.open)
    const closes = h.close ? timeToISO(h.close) : null
    if (!opens && !closes) {
      return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: '00:00', closes: '23:59' }]
    }
    return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: opens ?? '00:00', closes: closes ?? '23:59' }]
  })

  // Walk sections for the first reviews block and aggregate-rate from it.
  const reviewItems =
    data.sections
      .flatMap((s) => (s.type === 'reviews' ? s.data.items : []))
  const aggregateRating = reviewItems.length
    ? {
        '@type': 'AggregateRating',
        ratingValue: (
          reviewItems.reduce((s, r) => s + r.rating, 0) / reviewItems.length
        ).toFixed(1),
        reviewCount: reviewItems.length,
      }
    : undefined

  const logoSrc = data.branding?.logo
  const logo = logoSrc
    ? (logoSrc.startsWith('http') ? logoSrc : `${url}${logoSrc.startsWith('/') ? '' : '/'}${logoSrc}`)
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': business.schemaType || 'LocalBusiness',
    '@id': `${url}#business`,
    name: business.name,
    description: meta.description,
    url,
    telephone: business.phone,
    email: business.email || undefined,
    logo,
    image: logo || `${url}${meta.ogImage || '/opengraph-image'}`,
    priceRange: business.priceRange || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postal,
      addressCountry: business.address.country,
    },
    geo: business.address.lat && business.address.lng ? {
      '@type': 'GeoCoordinates',
      latitude: business.address.lat,
      longitude: business.address.lng,
    } : undefined,
    openingHoursSpecification: openingHoursSpecification.length ? openingHoursSpecification : undefined,
    aggregateRating,
    sameAs: sameAs.length ? sameAs : undefined,
  }
}
