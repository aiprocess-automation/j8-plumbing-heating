'use client'

import { useState, useTransition, useRef } from 'react'
import type { SiteConfig, Section as Sec } from '@/lib/schema'
import { saveContentAction } from '../actions'
import {
  Section,
  TextField,
  TextAreaField,
  ImageField,
  RepeatingList,
  IntegrationField,
} from './fields'
import { SectionCard } from './section-editors'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'
type Tab = 'settings' | 'content'

export function Editor({ initial }: { initial: SiteConfig }) {
  const [data, setData] = useState<SiteConfig>(initial)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [tab, setTab] = useState<Tab>('content')
  const previewRef = useRef<HTMLIFrameElement>(null)

  function patch<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function patchSection(idx: number, next: Sec) {
    setData((prev) => {
      const sections = prev.sections.slice()
      sections[idx] = next
      return { ...prev, sections }
    })
  }

  function save() {
    setSaveState('saving')
    setErrMsg(null)
    startTransition(async () => {
      const res = await saveContentAction(data)
      if (res.ok) {
        setSaveState('saved')
        if (previewRef.current) {
          previewRef.current.src = `/?_t=${res.savedAt ?? Date.now()}`
        }
        setTimeout(
          () => setSaveState((s) => (s === 'saved' ? 'idle' : s)),
          2500,
        )
      } else {
        setSaveState('error')
        setErrMsg(res.error ?? 'Save failed')
      }
    })
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">Site Editor</span>
          <StatusPill state={saveState} message={errMsg} />
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-900"
          >
            View live ↗
          </a>
          <button
            onClick={save}
            disabled={pending}
            className="rounded-lg bg-orange-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Save'}
          </button>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-full shrink-0 overflow-y-auto bg-gray-100 lg:w-[480px] xl:w-[560px]">
          <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-gray-100 px-4 pt-3">
            <TabButton active={tab === 'content'} onClick={() => setTab('content')}>
              Page Content
            </TabButton>
            <TabButton active={tab === 'settings'} onClick={() => setTab('settings')}>
              Site Settings
            </TabButton>
          </div>
          <div className="space-y-3 p-4">
            {tab === 'settings' && (
              <SettingsTab data={data} patch={patch} />
            )}
            {tab === 'content' && (
              <ContentTab data={data} patchSection={patchSection} />
            )}
          </div>
        </aside>

        <div className="hidden flex-1 min-w-0 flex-col bg-gray-200 p-3 lg:flex">
          <div className="mb-2 px-2 text-xs text-gray-500">
            Live preview — reloads when you click Save
          </div>
          <iframe
            ref={previewRef}
            src="/"
            className="w-full flex-1 rounded-xl border border-gray-300 bg-white shadow-sm"
            title="Live preview"
          />
        </div>
      </div>
    </div>
  )
}

function SettingsTab({
  data,
  patch,
}: {
  data: SiteConfig
  patch: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void
}) {
  return (
    <>
      <Section title="Business Info">
        <TextField
          label="Business name"
          value={data.business.name}
          onChange={(v) => patch('business', { ...data.business, name: v })}
        />
        <TextField
          label="Tagline"
          value={data.business.tagline}
          onChange={(v) => patch('business', { ...data.business, tagline: v })}
          hint="One short line. Used in meta + footer."
        />
        <TextField
          label="Phone"
          value={data.business.phone}
          onChange={(v) => patch('business', { ...data.business, phone: v })}
          placeholder="+1-604-555-0100"
          hint="Use international format. Powers the click-to-call button in the header + hero."
        />
        <TextField
          label="Public email (shown on the website)"
          value={data.business.email}
          onChange={(v) => patch('business', { ...data.business, email: v })}
        />
        <TextField
          label="Where to send contact form messages"
          value={data.business.ownerEmail ?? ''}
          onChange={(v) =>
            patch('business', { ...data.business, ownerEmail: v })
          }
          hint="Optional. Defaults to the public email above. Never appears on the website."
        />

        <fieldset className="space-y-3 rounded-lg border border-gray-200 p-3">
          <legend className="px-1 text-xs font-semibold text-gray-500">
            Address
          </legend>
          <TextField
            label="Street"
            value={data.business.address.street}
            onChange={(v) =>
              patch('business', {
                ...data.business,
                address: { ...data.business.address, street: v },
              })
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="City"
              value={data.business.address.city}
              onChange={(v) =>
                patch('business', {
                  ...data.business,
                  address: { ...data.business.address, city: v },
                })
              }
            />
            <TextField
              label="Region / State"
              value={data.business.address.region}
              onChange={(v) =>
                patch('business', {
                  ...data.business,
                  address: { ...data.business.address, region: v },
                })
              }
            />
            <TextField
              label="Postal code"
              value={data.business.address.postal}
              onChange={(v) =>
                patch('business', {
                  ...data.business,
                  address: { ...data.business.address, postal: v },
                })
              }
            />
            <TextField
              label="Country"
              value={data.business.address.country}
              onChange={(v) =>
                patch('business', {
                  ...data.business,
                  address: { ...data.business.address, country: v },
                })
              }
            />
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-200 p-3">
          <legend className="px-1 text-xs font-semibold text-gray-500">
            Hours
          </legend>
          <RepeatingList
            items={data.business.hours}
            onChange={(next) =>
              patch('business', { ...data.business, hours: next })
            }
            makeEmpty={() => ({ day: '', open: '', close: '' })}
            addLabel="Add hours row"
            renderItem={(item, update) => (
              <div className="grid grid-cols-3 gap-2">
                <TextField
                  label="Day(s)"
                  value={item.day}
                  onChange={(v) => update({ ...item, day: v })}
                  placeholder="Mon – Fri"
                />
                <TextField
                  label="Open"
                  value={item.open}
                  onChange={(v) => update({ ...item, open: v })}
                  placeholder="9am"
                />
                <TextField
                  label="Close"
                  value={item.close}
                  onChange={(v) => update({ ...item, close: v })}
                  placeholder="5pm"
                />
              </div>
            )}
          />
        </fieldset>

        <fieldset className="space-y-3 rounded-lg border border-gray-200 p-3">
          <legend className="px-1 text-xs font-semibold text-gray-500">
            Social links (optional)
          </legend>
          <TextField
            label="Facebook page URL"
            value={data.business.socials.facebook ?? ''}
            onChange={(v) =>
              patch('business', {
                ...data.business,
                socials: { ...data.business.socials, facebook: v },
              })
            }
          />
          <TextField
            label="Instagram URL"
            value={data.business.socials.instagram ?? ''}
            onChange={(v) =>
              patch('business', {
                ...data.business,
                socials: { ...data.business.socials, instagram: v },
              })
            }
          />
        </fieldset>
      </Section>

      <Section title="Branding (optional)">
        <ImageField
          label="Logo (used in header)"
          value={data.branding?.logo ?? ''}
          onChange={(v) => patch('branding', { ...(data.branding ?? {}), logo: v })}
        />
        <ImageField
          label="Logo for dark backgrounds (footer)"
          value={data.branding?.logoDark ?? ''}
          onChange={(v) =>
            patch('branding', { ...(data.branding ?? {}), logoDark: v })
          }
        />
        <ImageField
          label="Favicon"
          value={data.branding?.icon ?? ''}
          onChange={(v) => patch('branding', { ...(data.branding ?? {}), icon: v })}
        />
      </Section>

      <Section title="Page Title & Description">
        <TextField
          label="Page title (browser tab + Google results)"
          value={data.meta.title}
          onChange={(v) => patch('meta', { ...data.meta, title: v })}
        />
        <TextAreaField
          label="Description (Google snippet)"
          value={data.meta.description}
          onChange={(v) => patch('meta', { ...data.meta, description: v })}
          rows={3}
          hint="Keep under 160 characters. Mention your city + service for SEO."
        />
      </Section>

      <Section title="Search & Analytics (optional)">
        <p className="-mt-2 mb-2 text-xs text-gray-600">
          Connect Google so you can see who&rsquo;s finding you. Skip this if it
          feels overwhelming — you can come back any time.
        </p>
        <IntegrationField
          label="Google Search Console verification"
          value={data.integrations?.googleSiteVerification ?? ''}
          onChange={(v) =>
            patch('integrations', {
              ...(data.integrations ?? {}),
              googleSiteVerification: v,
            })
          }
          placeholder="Paste the code Google gives you"
          steps={[
            'Open Google Search Console (link below) and sign in.',
            'Click "Add property" → choose "URL prefix" → enter your website URL.',
            'Pick the "HTML tag" verification option.',
            "You'll see <meta name=\"google-site-verification\" content=\"XYZ…\">. Copy ONLY the part inside the quotes after content=.",
            'Paste it above, click Save here, then click "Verify" back in Google.',
          ]}
          helpUrl="https://search.google.com/search-console"
          helpUrlLabel="Open Google Search Console"
        />
        <IntegrationField
          label="Google Analytics — Measurement ID"
          value={data.integrations?.ga4MeasurementId ?? ''}
          onChange={(v) =>
            patch('integrations', {
              ...(data.integrations ?? {}),
              ga4MeasurementId: v,
            })
          }
          placeholder="G-XXXXXXXXXX"
          steps={[
            'Open Google Analytics (link below) and sign in.',
            'Click the gear icon → "Create" → "Property". Follow the wizard for a Web data stream.',
            'On the "Web stream details" screen, copy the Measurement ID — it starts with "G-".',
            'Paste it above and Save.',
          ]}
          helpUrl="https://analytics.google.com"
          helpUrlLabel="Open Google Analytics"
        />
      </Section>

    </>
  )
}

function ContentTab({
  data,
  patchSection,
}: {
  data: SiteConfig
  patchSection: (idx: number, next: Sec) => void
}) {
  return (
    <>
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900">
        Edit the content of each section below. Section order and structure were
        set when your site was generated; for layout changes, contact us.
      </div>
      {data.sections.map((section, idx) => (
        <SectionCard
          key={idx}
          section={section}
          index={idx}
          update={(next) => patchSection(idx, next)}
          data={data}
        />
      ))}
    </>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ' +
        (active
          ? 'border-orange-600 text-orange-600'
          : 'border-transparent text-gray-500 hover:text-gray-900')
      }
    >
      {children}
    </button>
  )
}

function StatusPill({
  state,
  message,
}: {
  state: SaveState
  message: string | null
}) {
  if (state === 'idle') return null
  const config = {
    saving: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Saving…' },
    saved: { bg: 'bg-green-50', text: 'text-green-700', label: 'Saved ✓' },
    error: { bg: 'bg-red-50', text: 'text-red-700', label: message ?? 'Error' },
  }[state]
  return (
    <span
      className={`rounded-full ${config.bg} ${config.text} px-2.5 py-1 text-xs font-medium`}
    >
      {config.label}
    </span>
  )
}
