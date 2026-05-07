import 'server-only'
import bcrypt from 'bcryptjs'

/**
 * Returns the bcrypt hash from the env var seeded at deploy time.
 * (Pre-pivot, a Blob doc could override this for password rotation. With
 * Blob removed, password rotation is deferred — V1 buyers use the
 * email-delivered password until handoff.)
 */
export async function getCurrentPasswordHash(): Promise<string | null> {
  return process.env.ADMIN_PASSWORD_HASH || null
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = await getCurrentPasswordHash()
  if (!hash) return false
  try {
    return await bcrypt.compare(input, hash)
  } catch {
    return false
  }
}
