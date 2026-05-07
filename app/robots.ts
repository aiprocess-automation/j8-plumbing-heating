import type { MetadataRoute } from 'next'
import { getContent } from '@/lib/content'
import { getSiteUrl } from '@/lib/seo'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const data = await getContent()
  const url = getSiteUrl(data)
  const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
  return {
    rules: isProduction
      ? [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  }
}
