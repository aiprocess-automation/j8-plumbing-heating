import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { isLoggedIn } from '@/lib/session'

export async function POST(req: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }
  const body = (await req.json()) as HandleUploadBody
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
        addRandomSuffix: true,
        // Force everything under media/ for predictability.
        tokenPayload: JSON.stringify({ pathname }),
      }),
      onUploadCompleted: async () => {
        // Hook for future audit logging.
      },
    })
    return NextResponse.json(json)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
