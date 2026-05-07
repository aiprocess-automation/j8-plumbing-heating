import { list } from '@vercel/blob'
import { requireSession } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function DiagnosePage() {
  await requireSession()

  const tokenSet = !!process.env.BLOB_READ_WRITE_TOKEN
  let listResult: { pathname: string; url: string; uploadedAt: string; size: number; fetchStatus?: number; firstChars?: string }[] = []
  let listError: string | null = null

  if (tokenSet) {
    try {
      const { blobs } = await list({ prefix: 'site.json', limit: 10 })
      for (const blob of blobs) {
        const row: typeof listResult[number] = {
          pathname: blob.pathname,
          url: blob.url,
          uploadedAt: blob.uploadedAt.toISOString(),
          size: blob.size,
        }
        try {
          const res = await fetch(`${blob.url}?_=${blob.uploadedAt.getTime()}`, {
            cache: 'no-store',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
              'Accept': 'application/json,*/*',
            },
          })
          row.fetchStatus = res.status
          if (res.ok) {
            const text = await res.text()
            row.firstChars = text.slice(0, 200)
          } else {
            row.firstChars = (await res.text()).slice(0, 200)
          }
        } catch (e) {
          row.firstChars = e instanceof Error ? e.message : 'fetch threw'
        }
        listResult.push(row)
      }
    } catch (e) {
      listError = e instanceof Error ? e.message : String(e)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold mb-1">Blob diagnostic</h1>
          <p className="text-sm text-gray-600">
            Server-side check of what&rsquo;s actually in your Blob store and whether it&rsquo;s readable.
          </p>
        </div>

        <Row label="BLOB_READ_WRITE_TOKEN set" value={String(tokenSet)} />

        {listError && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <strong>list() error:</strong> {listError}
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Blobs matching prefix &ldquo;site.json&rdquo;</h2>
          {listResult.length === 0 && (
            <p className="text-sm text-gray-500">None found — save once from the editor to create.</p>
          )}
          <div className="space-y-3">
            {listResult.map((row, i) => (
              <div key={i} className="rounded-lg bg-white border border-gray-200 p-4 text-xs font-mono space-y-1">
                <div><span className="text-gray-500">pathname:</span> {row.pathname}</div>
                <div><span className="text-gray-500">url:</span> <a className="text-blue-600 underline break-all" href={row.url} target="_blank" rel="noreferrer">{row.url}</a></div>
                <div><span className="text-gray-500">uploadedAt:</span> {row.uploadedAt}</div>
                <div><span className="text-gray-500">size:</span> {row.size} bytes</div>
                <div>
                  <span className="text-gray-500">server-side fetch status:</span>{' '}
                  <span className={row.fetchStatus === 200 ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                    {row.fetchStatus ?? 'threw'}
                  </span>
                </div>
                {row.firstChars && (
                  <div>
                    <span className="text-gray-500">first 200 chars:</span>
                    <pre className="mt-1 whitespace-pre-wrap text-[11px] bg-gray-50 p-2 rounded">{row.firstChars}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          <strong>How to read:</strong><br />
          • If a blob exists and fetch is 200 → reads work, save flow needs a different look.<br />
          • If fetch is 403 → your store has access restrictions. Click the URL above; if your browser ALSO gets 403, the blob is genuinely unreachable.<br />
          • If list returns zero → save isn&rsquo;t actually persisting.
        </div>
      </div>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-500 w-64">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  )
}
