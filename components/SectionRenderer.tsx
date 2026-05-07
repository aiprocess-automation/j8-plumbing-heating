import type { Section, SiteConfig } from '@/lib/config'
import { Hero } from './themes/energetic/sections/Hero'
import { Services } from './themes/energetic/sections/Services'
import { Reviews } from './themes/energetic/sections/Reviews'
import { About } from './themes/energetic/sections/About'
import { Stats } from './themes/energetic/sections/Stats'
import { CtaBanner } from './themes/energetic/sections/CtaBanner'
import { ContactHours } from './themes/energetic/sections/ContactHours'
import { Split5050 } from './themes/energetic/sections/Split5050'
import { CenteredText } from './themes/energetic/sections/CenteredText'

/**
 * Dispatches every section to its theme's component. V1 ships only the
 * `energetic` theme; the dispatcher will switch on `theme` once more
 * themes ship. Section types not yet implemented render as null so a
 * stale catalog doesn't crash the page.
 */
export function SectionRenderer({
  sections,
  business,
}: {
  sections: Section[]
  business: SiteConfig['business']
}) {
  return (
    <>
      {sections.map((s, i) => {
        switch (s.type) {
          case 'hero':
            return <Hero key={i} section={s} business={business} />
          case 'services':
            return <Services key={i} section={s} />
          case 'reviews':
            return <Reviews key={i} section={s} />
          case 'about':
            return <About key={i} section={s} />
          case 'stats':
            return <Stats key={i} section={s} />
          case 'cta-banner':
            return <CtaBanner key={i} section={s} />
          case 'contact-hours':
            return <ContactHours key={i} section={s} business={business} />
          case 'split-50-50':
            return <Split5050 key={i} section={s} />
          case 'centered-text':
            return <CenteredText key={i} section={s} />
          // Section types defined in the schema but not yet shipped as
          // Energetic components. They render as nothing for now; expand
          // the catalog + components in follow-on themes work.
          case 'process-steps':
          case 'gallery':
          case 'faq':
          case 'service-area':
          case 'certifications':
          case 'media-and-text':
          case 'image-banner':
          case 'pull-quote':
          case 'two-column-text':
          case 'numbered-list':
          case 'logo-strip':
            return null
          default: {
            const _exhaustive: never = s
            void _exhaustive
            return null
          }
        }
      })}
    </>
  )
}
