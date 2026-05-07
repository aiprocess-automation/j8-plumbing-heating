import siteData from '@/content/site.json'
import { SiteConfigSchema, type SiteConfig, type Section } from './schema'

export type { SiteConfig, Section } from './schema'
export type HoursEntry = SiteConfig['business']['hours'][number]
export type SocialLinks = SiteConfig['business']['socials']

/** Bundled seed used as a fallback when Blob is empty (first deploy / local dev with no token). */
export const seedConfig: SiteConfig = SiteConfigSchema.parse(siteData)

export type SectionOfType<T extends Section['type']> = Extract<Section, { type: T }>
