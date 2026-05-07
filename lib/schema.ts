import { z } from 'zod'

/**
 * Mirror of @aipa/schema/site.ts. Lives here because the template is a
 * separate repo from the operator monorepo. Keep these two files in sync
 * when the SiteConfig contract changes.
 */

const Cta = z.object({
  label: z.string().min(1),
  action: z.enum(['tel', 'email', 'scroll', 'external']),
  target: z.string().optional(),
})
export type Cta = z.infer<typeof Cta>

const Image = z.object({ src: z.string(), alt: z.string() })
export type Image = z.infer<typeof Image>

const Review = z.object({
  id: z.string(),
  author: z.string(),
  rating: z.number().min(1).max(5),
  date: z.string(),
  text: z.string(),
  source: z.literal('google'),
})
export type Review = z.infer<typeof Review>

const Address = z.object({
  street: z.string(),
  city: z.string(),
  region: z.string(),
  postal: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
})

const HoursEntry = z.object({
  day: z.string(),
  open: z.string(),
  close: z.string(),
})

const Socials = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
})

// ─── Section variants ──────────────────────────────────────────────

const HeroSection = z.object({
  type: z.literal('hero'),
  variant: z.enum(['phone-prominent', 'photo-led']),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    subhead: z.string().optional(),
    image: Image.optional(),
    trustItems: z.array(z.string()).default([]),
    primaryCta: Cta,
    secondaryCta: Cta.optional(),
  }),
})

const ServicesSection = z.object({
  type: z.literal('services'),
  variant: z.enum(['grid-3', 'list-detailed']),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
})

const ReviewsSection = z.object({
  type: z.literal('reviews'),
  variant: z.enum(['testimonial-stack', 'single-quote', 'marquee']),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    items: z.array(Review).min(1),
  }),
})

const AboutSection = z.object({
  type: z.literal('about'),
  variant: z.enum(['narrative-with-badges', 'founder-story']),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    narrative: z.string(),
    badges: z
      .array(z.object({ label: z.string(), icon: z.string() }))
      .default([]),
    image: Image.optional(),
  }),
})

const StatsSection = z.object({
  type: z.literal('stats'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    items: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
})

const ProcessStepsSection = z.object({
  type: z.literal('process-steps'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    steps: z.array(
      z.object({
        number: z.number().int(),
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      }),
    ),
  }),
})

const GallerySection = z.object({
  type: z.literal('gallery'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    images: z.array(Image).min(1),
  }),
})

const FaqSection = z.object({
  type: z.literal('faq'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    items: z.array(z.object({ question: z.string(), answer: z.string() })),
  }),
})

const ServiceAreaSection = z.object({
  type: z.literal('service-area'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    areas: z.array(z.string()),
    mapEmbedUrl: z.string().optional(),
  }),
})

const CertificationsSection = z.object({
  type: z.literal('certifications'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    items: z.array(z.object({ label: z.string(), icon: z.string().optional() })),
  }),
})

const CtaBannerSection = z.object({
  type: z.literal('cta-banner'),
  data: z.object({
    headline: z.string(),
    subhead: z.string().optional(),
    primaryCta: Cta,
    secondaryCta: Cta.optional(),
    background: Image.optional(),
  }),
})

const ContactHoursSection = z.object({
  type: z.literal('contact-hours'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    showHoursTable: z.boolean().default(true),
    showContactForm: z.boolean().default(true),
    mapEmbedUrl: z.string().optional(),
  }),
})

const Split5050Section = z.object({
  type: z.literal('split-50-50'),
  data: z.object({
    side: z.enum(['image-left', 'image-right']),
    text: z.object({
      eyebrow: z.string().optional(),
      headline: z.string(),
      body: z.string(),
      cta: Cta.optional(),
    }),
    image: Image,
  }),
})

const MediaAndTextSection = z.object({
  type: z.literal('media-and-text'),
  data: z.object({
    layout: z.enum(['60-40', '40-60']),
    text: z.object({
      eyebrow: z.string().optional(),
      headline: z.string(),
      body: z.string(),
      cta: Cta.optional(),
    }),
    media: Image,
  }),
})

const CenteredTextSection = z.object({
  type: z.literal('centered-text'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    subhead: z.string().optional(),
    cta: Cta.optional(),
  }),
})

const ImageBannerSection = z.object({
  type: z.literal('image-banner'),
  data: z.object({
    image: Image,
    overlay: z
      .object({
        headline: z.string(),
        subhead: z.string().optional(),
        cta: Cta.optional(),
      })
      .optional(),
  }),
})

const PullQuoteSection = z.object({
  type: z.literal('pull-quote'),
  data: z.object({ quote: z.string(), attribution: z.string().optional() }),
})

const TwoColumnTextSection = z.object({
  type: z.literal('two-column-text'),
  data: z.object({
    left: z.object({ headline: z.string(), body: z.string() }),
    right: z.object({ headline: z.string(), body: z.string() }),
  }),
})

const NumberedListSection = z.object({
  type: z.literal('numbered-list'),
  data: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    items: z.array(
      z.object({
        number: z.number().int(),
        title: z.string(),
        body: z.string(),
        icon: z.string().optional(),
      }),
    ),
  }),
})

const LogoStripSection = z.object({
  type: z.literal('logo-strip'),
  data: z.object({
    eyebrow: z.string().optional(),
    logos: z.array(Image),
  }),
})

export const Section = z.discriminatedUnion('type', [
  HeroSection,
  ServicesSection,
  ReviewsSection,
  AboutSection,
  StatsSection,
  ProcessStepsSection,
  GallerySection,
  FaqSection,
  ServiceAreaSection,
  CertificationsSection,
  CtaBannerSection,
  ContactHoursSection,
  Split5050Section,
  MediaAndTextSection,
  CenteredTextSection,
  ImageBannerSection,
  PullQuoteSection,
  TwoColumnTextSection,
  NumberedListSection,
  LogoStripSection,
])
export type Section = z.infer<typeof Section>
export type SectionType = Section['type']

export const Theme = z.enum(['energetic'])
export type Theme = z.infer<typeof Theme>

export const SiteConfigSchema = z.object({
  meta: z.object({
    archetype: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    ogImage: z.string().optional(),
    locale: z.string().default('en'),
  }),
  branding: z
    .object({
      logo: z.string().optional(),
      logoDark: z.string().optional(),
      icon: z.string().optional(),
    })
    .optional(),
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    phone: z.string(),
    email: z.string(),
    ownerEmail: z.string().optional(),
    schemaType: z.string().optional(),
    priceRange: z.string().optional(),
    address: Address,
    hours: z.array(HoursEntry),
    socials: Socials,
  }),
  theme: Theme,
  sections: z.array(Section).min(1),
  integrations: z
    .object({
      googleSiteVerification: z.string().optional(),
      ga4MeasurementId: z.string().optional(),
    })
    .optional(),
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>
