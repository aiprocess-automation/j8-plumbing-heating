import { requireSession, checkAdminConfig } from '@/lib/session'
import { getContent } from '@/lib/content'
import { Editor } from './editor/editor'
import { SetupNeeded } from './setup-needed'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const config = checkAdminConfig()
  if (!config.ok) return <SetupNeeded missing={config.missing} />
  await requireSession()
  const content = await getContent()
  return <Editor initial={content} />
}
