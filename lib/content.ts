import 'server-only'
import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { SiteConfigSchema, type SiteConfig } from './schema'
import { seedConfig } from './config'

const DISK_CONTENT_PATH = path.join(process.cwd(), 'content', 'site.json')

/**
 * GitHub-as-CMS architecture:
 *
 *   - Local dev (pnpm dev): reads/writes content/site.json on disk
 *   - Production: reads the bundled seedConfig (the content/site.json
 *     committed at build time). /admin saves go through the GitHub API
 *     to commit a new content/site.json, which Vercel auto-rebuilds. So
 *     the deployed site sees the change after the next build (~30-60s).
 *
 * No Blob store, no runtime mutation of the deployed site state — content
 * lives in git history. Clean handoff: when the buyer is transferred the
 * repo, all their edit history transfers with it.
 */

async function readContentFromDisk(): Promise<SiteConfig> {
  try {
    const text = await fs.readFile(DISK_CONTENT_PATH, 'utf8')
    return SiteConfigSchema.parse(JSON.parse(text))
  } catch (err) {
    console.error('[getContent] disk read failed, returning seed:', err)
    return seedConfig
  }
}

async function writeContentToDisk(data: SiteConfig): Promise<void> {
  await fs.writeFile(DISK_CONTENT_PATH, JSON.stringify(data, null, 2), 'utf8')
}

function isLocalDev(): boolean {
  return process.env.NODE_ENV !== 'production'
}

async function commitContentToGitHub(data: SiteConfig): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const buyerRepo = process.env.BUYER_REPO
  if (!token || !buyerRepo) {
    throw new Error(
      'GITHUB_TOKEN + BUYER_REPO env vars must be set for production saves',
    )
  }
  const [owner, repo] = buyerRepo.split('/')
  if (!owner || !repo) {
    throw new Error(`BUYER_REPO must be "owner/repo" — got "${buyerRepo}"`)
  }

  const path = 'content/site.json'
  const content = Buffer.from(JSON.stringify(data, null, 2), 'utf8').toString(
    'base64',
  )
  const branch = 'main'

  // Get the file's current sha (required for updates).
  const headRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    },
  )
  let sha: string | undefined
  if (headRes.status === 200) {
    const meta = (await headRes.json()) as { sha?: string }
    sha = meta.sha
  } else if (headRes.status !== 404) {
    throw new Error(
      `GitHub HEAD failed (${headRes.status}): ${await headRes.text()}`,
    )
  }

  const putRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Edit from /admin',
        content,
        branch,
        ...(sha ? { sha } : {}),
      }),
    },
  )
  if (!putRes.ok) {
    throw new Error(
      `GitHub PUT failed (${putRes.status}): ${await putRes.text()}`,
    )
  }
}

/**
 * Single-request memoization. React cache() ensures multiple components
 * on the same request only trigger one disk read or one seedConfig call.
 */
export const getContent = cache(async (): Promise<SiteConfig> => {
  if (isLocalDev()) return readContentFromDisk()
  return seedConfig
})

export async function saveContent(next: SiteConfig): Promise<void> {
  const validated = SiteConfigSchema.parse(next)
  if (isLocalDev()) {
    await writeContentToDisk(validated)
    revalidatePath('/', 'layout')
    return
  }
  await commitContentToGitHub(validated)
  // Vercel will rebuild on push; no revalidate needed (the rebuild
  // produces a new bundle with seedConfig=updated content).
}
