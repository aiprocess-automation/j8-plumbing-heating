import type { MetadataRoute } from 'next'
import { getContent } from '@/lib/content'
import { getSiteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getContent()
  const url = getSiteUrl(data)
  const now = new Date()
  return [
    { url: `${url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ]
}
