export function SetupNeeded({ missing }: { missing: string[] }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Admin setup needed</h1>
        <p className="text-sm text-gray-600 mb-6">
          The visual editor isn&rsquo;t configured yet. Set the following environment variables on this Vercel project, then redeploy.
        </p>
        <ul className="space-y-2 mb-6">
          {missing.map(name => (
            <li key={name} className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm">
              <code className="font-mono text-amber-900">{name}</code>
              <span className="text-amber-800">{describe(name)}</span>
            </li>
          ))}
        </ul>
        <details className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <summary className="cursor-pointer font-medium text-gray-900">How to generate values</summary>
          <pre className="mt-3 text-xs bg-gray-900 text-gray-100 rounded p-3 overflow-x-auto">{`# A random session secret (32+ chars)
openssl rand -hex 32

# A bcrypt hash of your chosen admin password
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 12))"

# BLOB_READ_WRITE_TOKEN is set automatically when you connect a
# Vercel Blob store to this project (Storage tab in Vercel dashboard).`}</pre>
        </details>
        <p className="mt-6 text-xs text-gray-500">
          See <code>docs/ADMIN.md</code> for full setup instructions and the handoff runbook.
        </p>
      </div>
    </main>
  )
}

function describe(name: string): string {
  switch (name) {
    case 'SESSION_SECRET': return '— at least 32 random characters; encrypts the admin login cookie.'
    case 'ADMIN_PASSWORD_HASH': return '— bcrypt hash of the admin password.'
    case 'BLOB_READ_WRITE_TOKEN': return '— auto-set when you connect Vercel Blob to the project.'
    default: return ''
  }
}
