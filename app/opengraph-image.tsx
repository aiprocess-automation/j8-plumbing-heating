import { ImageResponse } from 'next/og'
import { getContent } from '@/lib/content'
import { getSiteUrl } from '@/lib/seo'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-dynamic'

export default async function OpengraphImage() {
  const data = await getContent()
  const primary = '#EA580B'
  const accent = '#F59E0B'
  const { address } = data.business
  const location = [address.city, address.region].filter(Boolean).join(', ')
  const subline = data.business.tagline || data.meta.description
  const logo = data.branding?.logo
  const absoluteLogo = logo
    ? (logo.startsWith('http') ? logo : `${getSiteUrl(data)}${logo.startsWith('/') ? '' : '/'}${logo}`)
    : undefined

  let logoDataUrl: string | undefined
  if (absoluteLogo) {
    try {
      const res = await fetch(absoluteLogo)
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer())
        const ct = res.headers.get('content-type') || 'image/png'
        // Satori has limited SVG support; only embed raster formats inline.
        if (!ct.includes('svg')) logoDataUrl = `data:${ct};base64,${buf.toString('base64')}`
      }
    } catch {
      // Skip logo on any fetch failure — render the OG card without it.
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: `linear-gradient(135deg, ${primary} 0%, ${primary} 60%, ${accent} 140%)`,
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 32, opacity: 0.85, display: 'flex' }}>{location}</div>
          {logoDataUrl && (
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.95)', padding: 16, borderRadius: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoDataUrl} alt="" height={72} style={{ height: 72, width: 'auto', objectFit: 'contain' }} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
            {data.business.name}
          </div>
          <div style={{ fontSize: 36, opacity: 0.92, maxWidth: 1000, display: 'flex' }}>
            {subline}
          </div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.8, display: 'flex' }}>{data.business.phone}</div>
      </div>
    ),
    size,
  )
}
