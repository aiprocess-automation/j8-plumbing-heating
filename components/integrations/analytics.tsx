import Script from 'next/script'
import type { SiteConfig } from '@/lib/schema'

export function Analytics({ data }: { data: SiteConfig }) {
  const ga4 = data.integrations?.ga4MeasurementId
  if (!ga4) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4}');`}
      </Script>
    </>
  )
}
