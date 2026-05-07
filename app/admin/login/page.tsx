import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isLoggedIn, checkAdminConfig } from '@/lib/session'
import { LoginForm } from './login-form'
import { SetupNeeded } from '../setup-needed'

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  const config = checkAdminConfig()
  if (!config.ok) return <SetupNeeded missing={config.missing} />
  if (await isLoggedIn()) redirect('/admin')
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign in to your site</h1>
        <p className="text-sm text-gray-500 mb-6">Enter the admin password from your welcome email.</p>
        <LoginForm />
      </div>
    </main>
  )
}
