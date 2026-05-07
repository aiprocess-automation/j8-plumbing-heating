import { ImageResponse } from 'next/og'
import { getContent } from '@/lib/content'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

function inferContentType(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase()
  if (ext === 'svg') return 'image/svg+xml'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'ico') return 'image/x-icon'
  return 'image/png'
}

export default async function Icon() {
  const data = await getContent()
  // Only fetch external icons (Blob URLs). Relative paths from the seed (/icon.svg)
  // can't be passed to fetch(); the ImageResponse fallback below renders instead.
  if (data.branding?.icon?.startsWith('http')) {
    try {
      const res = await fetch(data.branding.icon, { cache: 'no-store' })
      if (res.ok) {
        const buf = await res.arrayBuffer()
        return new Response(buf, {
          headers: {
            'Content-Type': res.headers.get('content-type') || inferContentType(data.branding.icon),
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
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: primary, color: '#fff', fontSize: 22, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>
        {initial}
      </div>
    ),
    size,
  )
}
