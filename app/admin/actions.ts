'use server'

import { isLoggedIn } from '@/lib/session'
import { saveContent } from '@/lib/content'
import { SiteConfigSchema, type SiteConfig } from '@/lib/schema'

export async function saveContentAction(
  next: SiteConfig,
): Promise<{ ok: boolean; savedAt?: number; error?: string }> {
  if (!(await isLoggedIn())) return { ok: false, error: 'Not authorised' }
  try {
    const validated = SiteConfigSchema.parse(next)
    await saveContent(validated)
    return { ok: true, savedAt: Date.now() }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Save failed'
    return { ok: false, error: msg }
  }
}
