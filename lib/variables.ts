import type { SiteConfig } from './schema'

/** A variable the buyer can reference inside Page Content text fields. */
export type VariableDef = {
  key: string
  label: string
  example: string
}

/**
 * Variables exposed to the Page Content tab. They resolve to fields the buyer
 * has set in Site Settings — so editing the phone number in one place updates
 * every section that references {{business.phone}}.
 */
export const SITE_VARIABLES: VariableDef[] = [
  { key: 'business.name', label: 'Business name', example: 'Acme Plumbing' },
  { key: 'business.tagline', label: 'Tagline', example: '24/7 emergency service' },
  { key: 'business.phone', label: 'Phone', example: '604-555-0100' },
  { key: 'business.email', label: 'Email', example: 'hello@example.com' },
  { key: 'business.address.city', label: 'City', example: 'Vancouver' },
  { key: 'business.address.region', label: 'Region', example: 'BC' },
  { key: 'business.address.street', label: 'Street', example: '123 Main St' },
  { key: 'business.address.postal', label: 'Postal code', example: 'V5V 3M5' },
]

const TOKEN_RE = /\{\{\s*([\w.]+)\s*\}\}/g

/**
 * Replaces `{{path.to.field}}` tokens in `text` with values from `data`.
 * Unknown paths are left in place so the buyer can see what's broken
 * (rather than silently rendering an empty string).
 */
export function resolveVariables(text: string, data: SiteConfig): string {
  if (!text) return text
  return text.replace(TOKEN_RE, (match, path: string) => {
    const value = path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as object)) {
        return (acc as Record<string, unknown>)[key]
      }
      return undefined
    }, data)
    return typeof value === 'string' || typeof value === 'number' ? String(value) : match
  })
}

/** True if the text contains at least one variable reference. */
export function hasVariables(text: string): boolean {
  if (!text) return false
  TOKEN_RE.lastIndex = 0
  return TOKEN_RE.test(text)
}
