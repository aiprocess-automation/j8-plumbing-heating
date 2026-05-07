# Editor field reference

> **Audience:** AI agents writing the seed `content/site.json` for a new buyer site, and developers extending the editor.

This document maps every field in `SiteConfigSchema` to:
- Whether the buyer sees it in the editor
- Where it renders on the public site
- Whether it accepts `{{variable}}` references

## Site Settings tab (universal — same shape per business)

Buyer can edit these. They drive the universal surface (header, footer, contact, JSON-LD).

| Field | Editor label | Rendered in | Variables OK? |
| --- | --- | --- | --- |
| `business.name` | Business name | Header (text fallback), hero h1, footer copyright, browser tab, OG card, JSON-LD `name` | n/a (source) |
| `business.tagline` | Tagline | Hero subline, OG card | n/a (source) |
| `business.phone` | Phone | All "Call" buttons (header ×3, hero, footer, contact card), JSON-LD `telephone` | n/a (source) |
| `business.email` | Public email | Footer email link, contact card email link, JSON-LD `email` | n/a (source) |
| `business.ownerEmail` | Where to send contact form messages | Contact form `mailto:` recipient (never displayed) | n/a |
| `business.address.{street,city,region,postal,country}` | Address fields | Footer NAP, contact card, JSON-LD `address`, OG card location | n/a (source) |
| `business.hours[]` | Hours rows | Hours section, JSON-LD `openingHoursSpecification` | n/a |
| `business.socials.{facebook,instagram}` | Social URLs | Footer icons, JSON-LD `sameAs` | n/a |
| `branding.logo` | Logo (light bg) | Header, OG card | n/a |
| `branding.logoDark` | Logo (dark bg) | Footer | n/a |
| `branding.icon` | Favicon | `app/icon.tsx`, `app/apple-icon.tsx`, manifest | n/a |
| `theme.primary` | Primary color | All `bg-primary`, `text-primary`, `border-primary` (CSS var driven) | n/a |
| `theme.accent` | Accent color | All `bg-accent`, `text-accent` | n/a |
| `meta.title` | Page title | Browser tab, Google search snippet, OG/Twitter title | n/a |
| `meta.description` | Description | Google snippet, OG/Twitter description, JSON-LD `description` | n/a |
| `integrations.googleSiteVerification` | GSC verification | `<meta name="google-site-verification">` in `<head>` | n/a |
| `integrations.ga4MeasurementId` | GA4 Measurement ID | gtag.js script (loaded `afterInteractive`) | n/a |

## Page Content tab (variable per business — AI fills these)

Buyer can edit these. The AI generator should pre-fill them with archetype-specific copy. **All text fields here support `{{...}}` variable references.**

| Field | Editor label | Rendered in | Variables OK? |
| --- | --- | --- | --- |
| `hero.image` | Hero photo | Hero section background or photo | n/a (image) |
| `hero.trustItems[]` | Trust badge | Pills under hero phone | ✅ |
| `services[].title` | Service name | Service card heading | ✅ |
| `services[].description` | Short description | Service card body | ✅ |
| `gallery[].src` | Image | Gallery grid + lightbox | n/a (image) |
| `gallery[].alt` | Caption | `alt` attribute (SEO + a11y) | ✅ |
| `reviews[].author` | Customer name | Review card footer | ✅ |
| `reviews[].rating` | Stars (1–5) | Star icons | n/a |
| `reviews[].date` | Date (ISO) | Review card date | n/a |
| `reviews[].text` | Review text | Review card body | ✅ |
| `about.narrative` | About text | About section paragraph | ✅ |
| `about.badges[].label` | Trust highlight | Badge pill label | ✅ |

## Schema-only (NOT in the editor — set by AI at generation, hidden from buyer)

| Field | Purpose | Why hidden |
| --- | --- | --- |
| `meta.archetype` | "trades" / "wellness" / "food" / etc. — drives AI block selection | Internal AI input |
| `meta.url` | Canonical URL override | Auto-derives from deployment URL |
| `meta.locale` | "en" / "fr" / etc. | Default works |
| `meta.ogImage` | Custom OG upload override | OG auto-generated; rare override |
| `business.schemaType` | Schema.org type (`Plumber`, `HairSalon`, etc.) | AI picks correct type per archetype |
| `business.priceRange` | "$" / "$$" / "$$$" / "$$$$" | AI infers from category |
| `business.address.lat`, `business.address.lng` | Geocoded coords | AI geocodes; buyer can't fill |
| `hero.variant` | `phone-prominent` / `photo-led` / `dual-cta` | AI picks per archetype |
| `hero.primaryCta`, `hero.secondaryCta` | CTA label/action/target | Hardcoded behavior in component (call phone, scroll to contact) |
| `services[].id` | UUID slug | Auto-generated |
| `services[].icon` | Lucide-react icon name | AI picks; "Wrench" for trades, "Scissors" for hair, etc. |
| `about.badges[].icon` | Lucide-react icon name | Same |
| `theme.palette` | Palette name (cosmetic label) | Display-only string |

## Variable system

Every text field marked ✅ above renders through `resolveVariables(text, data)`. Available tokens (defined in `lib/variables.ts`):

```
{{business.name}}
{{business.tagline}}
{{business.phone}}
{{business.email}}
{{business.address.street}}
{{business.address.city}}
{{business.address.region}}
{{business.address.postal}}
```

**Generator pattern:** seed Page Content with variables wherever a value comes from Site Settings. For example:

```json
{
  "services": [
    {
      "id": "abc123",
      "icon": "Wrench",
      "title": "{{business.address.city}} Emergency Plumbing",
      "description": "Serving all of {{business.address.region}} 24/7. Call {{business.phone}}."
    }
  ]
}
```

The buyer edits "Emergency Plumbing" if they want to rename the service, but never has to update the city/region/phone in three places. Editing those once in Site Settings updates everywhere.

**Unknown tokens are left in place** (rendered literally as `{{whatever}}`) so generator typos surface visibly rather than silently producing empty strings.

## Validation rules

`SiteConfigSchema.parse(data)` runs on every save. Required fields not satisfied = error returned to the editor (and the bad save is rejected). Optional fields can be omitted entirely.

When the AI generator writes the seed, it should run the JSON through `SiteConfigSchema.parse()` before committing — same schema, same validation.
