import { ImageResponse } from 'next/og'
import { getContent } from '@/lib/content'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const data = await getContent()
  if (data.branding?.icon?.startsWith('http')) {
    try {
      const res = await fetch(data.branding.icon, { cache: 'no-store' })
      if (res.ok) {
        const buf = await res.arrayBuffer()
        return new Response(buf, {
          headers: {
            'Content-Type': res.headers.get('content-type') || 'image/png',
            'Cache-Control': 'public, max-age=0, must-revalidate',
          },
        })
      }
    } catch {
      // Fall through to the generated ImageResponse fallback.
    }
  }
  const primary = '#EA580B'
  const initial = (data.business.name || 'B').trim().charAt(0).toUpperCase()
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: primary, color: '#fff', fontSize: 110, fontWeight: 800, fontFamily: 'system-ui, sans-serif', letterSpacing: -2 }}>
        {initial}
      </div>
    ),
    size,
  )
}
