import type { Metadata } from 'next'
import { Inter, Limelight } from 'next/font/google'
import { headers } from 'next/headers'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { getContent } from '@/lib/content'
import { buildLocalBusinessJsonLd, getSiteUrl } from '@/lib/seo'
import { Analytics } from '@/components/integrations/analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const limelight = Limelight({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

/**
 * AIPA-preview subdomains must not be indexed (per docs/dns-strategy.md).
 * Once the buyer migrates to a custom domain, the host check flips off
 * and search engines can index normally.
 */
function isAipaPreviewHost(host: string | null): boolean {
  if (!host) return false
  return host.toLowerCase().endsWith('aiprocessautomation.co')
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent()
  const url = getSiteUrl(data)
  const ogImage = data.meta.ogImage || '/opengraph-image'
  const hdrs = await headers()
  const noindex = isAipaPreviewHost(hdrs.get('host'))
  return {
    metadataBase: new URL(url),
    title: { default: data.meta.title, template: `%s — ${data.business.name}` },
    description: data.meta.description,
    applicationName: data.business.name,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: data.business.name,
      title: data.meta.title,
      description: data.meta.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.business.name }],
      locale: data.meta.locale || 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: process.env.VERCEL_ENV === 'production', follow: true },
    manifest: '/manifest.webmanifest',
    verification: {
      google: data.integrations?.googleSiteVerification,
    },
    other: {
      'theme-color': '#EA580B',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getContent()
  const lang = data.meta.locale || 'en'
  const jsonLd = buildLocalBusinessJsonLd(data)
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${limelight.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics data={data} />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
