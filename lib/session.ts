import 'server-only'
import { cookies } from 'next/headers'
import { getIronSession, type SessionOptions } from 'iron-session'
import { redirect } from 'next/navigation'

export type AdminSession = {
  loggedIn?: boolean
  loggedInAt?: number
}

const SESSION_COOKIE_NAME = 'apa_admin_session'

export type AdminConfigStatus = {
  ok: boolean
  missing: string[]
}

/** Env vars required for login to function. BLOB_READ_WRITE_TOKEN is checked at save-time, not here. */
export function checkAdminConfig(): AdminConfigStatus {
  const missing: string[] = []
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) missing.push('SESSION_SECRET')
  if (!process.env.ADMIN_PASSWORD_HASH) missing.push('ADMIN_PASSWORD_HASH')
  return { ok: missing.length === 0, missing }
}

function options(): SessionOptions {
  const password = process.env.SESSION_SECRET!
  return {
    cookieName: SESSION_COOKIE_NAME,
    password,
    cookieOptions: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<AdminSession>(cookieStore, options())
}

export async function isLoggedIn(): Promise<boolean> {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) return false
  const session = await getSession()
  return !!session.loggedIn
}

export async function requireSession() {
  const session = await getSession()
  if (!session.loggedIn) redirect('/admin/login')
  return session
}
