'use client'

import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import type { SiteConfig } from '@/lib/schema'
import { SITE_VARIABLES, hasVariables, resolveVariables } from '@/lib/variables'

export const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 transition-colors'

export const labelClass = 'mb-1 block text-xs font-medium text-gray-600'

export function TextField({ label, value, onChange, placeholder, hint }: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type="text"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  )
}

export function TextAreaField({ label, value, onChange, rows = 3, hint }: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  )
}

export function NumberField({ label, value, onChange, step = 1 }: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        step={step}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className={inputClass}
      />
    </label>
  )
}

export function SelectField({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select value={value ?? ''} onChange={e => onChange(e.target.value)} className={inputClass}>
        <option value="">(none)</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value || '') ? value : '#000000'}
          onChange={e => onChange(e.target.value)}
          className="h-9 w-12 rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          placeholder="#000000"
        />
      </div>
    </label>
  )
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setBusy(true)
    setError(null)
    try {
      const result = await upload(`media/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/admin/api/upload',
      })
      onChange(result.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-start gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No image</div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            disabled={busy}
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
            className="block w-full text-xs text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200"
          />
          <input
            type="text"
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder="Or paste an image URL"
            className={inputClass}
          />
          {busy && <p className="text-xs text-gray-500">Uploading…</p>}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Variable-aware text fields (Page Content tab) ───────────────────────────

function VariablePicker({ onInsert }: { onInsert: (token: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        title="Insert a variable from Site Settings"
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-mono text-gray-600 hover:border-primary hover:text-primary"
      >
        {'{ }'}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
            <div className="px-3 py-2 text-[11px] uppercase tracking-wide text-gray-500 bg-gray-50 border-b border-gray-100">
              Insert from Site Settings
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {SITE_VARIABLES.map(v => (
                <li key={v.key}>
                  <button
                    type="button"
                    onClick={() => { onInsert(`{{${v.key}}}`); setOpen(false) }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-xs"
                  >
                    <span className="block font-medium text-gray-900">{v.label}</span>
                    <span className="block font-mono text-[11px] text-gray-500">{`{{${v.key}}}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

function PreviewLine({ value, data }: { value: string; data: SiteConfig }) {
  if (!hasVariables(value)) return null
  return (
    <p className="mt-1 text-xs text-gray-500">
      <span className="text-gray-400">Preview: </span>
      <span className="text-gray-700">{resolveVariables(value, data)}</span>
    </p>
  )
}

export function ContentTextField({
  label, value, onChange, placeholder, hint, data,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  data: SiteConfig
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  function insert(token: string) {
    const el = inputRef.current
    if (!el) { onChange((value ?? '') + token); return }
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const next = value.slice(0, start) + token + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + token.length
      el.setSelectionRange(pos, pos)
    })
  }
  return (
    <div>
      <div className="flex items-end gap-2 mb-1">
        <span className={labelClass + ' mb-0 flex-1 min-w-0 truncate'}>{label || ' '}</span>
        <VariablePicker onInsert={insert} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      <PreviewLine value={value} data={data} />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </div>
  )
}

export function ContentTextAreaField({
  label, value, onChange, rows = 3, hint, data,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
  data: SiteConfig
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  function insert(token: string) {
    const el = textareaRef.current
    if (!el) { onChange((value ?? '') + token); return }
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const next = value.slice(0, start) + token + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + token.length
      el.setSelectionRange(pos, pos)
    })
  }
  return (
    <div>
      <div className="flex items-end gap-2 mb-1">
        <span className={labelClass + ' mb-0 flex-1 min-w-0 truncate'}>{label || ' '}</span>
        <VariablePicker onInsert={insert} />
      </div>
      <textarea
        ref={textareaRef}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
      <PreviewLine value={value} data={data} />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </div>
  )
}

export function IntegrationField({
  label,
  value,
  onChange,
  placeholder,
  steps,
  helpUrl,
  helpUrlLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  steps: string[]
  helpUrl: string
  helpUrlLabel: string
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
      <label className="block">
        <span className={labelClass}>{label}</span>
        <input
          type="text"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      </label>
      <details className="group">
        <summary className="cursor-pointer text-xs text-[#0F4C81] hover:underline list-none flex items-center gap-1">
          <span className="group-open:rotate-90 transition-transform inline-block">›</span>
          How to set this up
        </summary>
        <div className="mt-2 rounded-md bg-blue-50 border border-blue-100 p-3 space-y-2">
          <ol className="list-decimal list-inside text-xs text-gray-700 space-y-1">
            {steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <a
            href={helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#0F4C81] hover:underline"
          >
            {helpUrlLabel} ↗
          </a>
        </div>
      </details>
    </div>
  )
}

export function RepeatingList<T>({ items, onChange, renderItem, makeEmpty, addLabel }: {
  items: T[]
  onChange: (next: T[]) => void
  renderItem: (item: T, update: (next: T) => void) => React.ReactNode
  makeEmpty: () => T
  addLabel: string
}) {
  function move(i: number, delta: number) {
    const j = i + delta
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  function remove(i: number) {
    const next = items.filter((_, k) => k !== i)
    onChange(next)
  }
  function update(i: number, value: T) {
    const next = [...items]
    next[i] = value
    onChange(next)
  }
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                className="rounded p-1 text-xs text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1}
                className="rounded p-1 text-xs text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move down">↓</button>
              <button type="button" onClick={() => remove(i)}
                className="rounded p-1 text-xs text-red-500 hover:bg-red-50" aria-label="Remove">✕</button>
            </div>
          </div>
          {renderItem(item, v => update(i, v))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, makeEmpty()])}
        className="w-full rounded-xl border border-dashed border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50"
      >
        + {addLabel}
      </button>
    </div>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-white" open>
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-900 flex items-center justify-between">
        {title}
        <span className="text-gray-400 group-open:rotate-90 transition-transform">›</span>
      </summary>
      <div className="border-t border-gray-100 p-4 space-y-4">{children}</div>
    </details>
  )
}
