'use server'

import { redirect } from 'next/navigation'
import { getSession, checkAdminConfig } from '@/lib/session'
import { verifyPassword } from '@/lib/auth'

export async function loginAction(_: unknown, formData: FormData): Promise<{ error?: string }> {
  const config = checkAdminConfig()
  if (!config.ok) return { error: `Admin not configured (missing ${config.missing.join(', ')})` }
  const password = String(formData.get('password') ?? '')
  if (!password) return { error: 'Password is required' }
  const ok = await verifyPassword(password)
  if (!ok) {
    // Small delay to slow brute-force attempts (the bcrypt compare itself adds ~100ms; this adds a touch more).
    await new Promise(r => setTimeout(r, 250))
    return { error: 'Incorrect password' }
  }
  const session = await getSession()
  session.loggedIn = true
  session.loggedInAt = Date.now()
  await session.save()
  redirect('/admin')
}
