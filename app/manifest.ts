import type { MetadataRoute } from 'next'
import { getContent } from '@/lib/content'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const data = await getContent()
  return {
    name: data.business.name,
    short_name: data.business.name,
    description: data.meta.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#EA580B',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
