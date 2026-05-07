'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {})
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#0F4C81] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 transition-colors"
        />
      </div>
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a3960] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
