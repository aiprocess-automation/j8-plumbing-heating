'use client'

import type { SiteConfig, Section as Sec, Cta } from '@/lib/schema'
import {
  TextField,
  TextAreaField,
  ContentTextField,
  ContentTextAreaField,
  ImageField,
  RepeatingList,
  Section,
  SelectField,
  inputClass,
  labelClass,
} from './fields'

/**
 * Editor card for a single section. Switches on the section's discriminated
 * `type` and renders the right form. The Content tab walks `data.sections`
 * and renders one of these per entry.
 */
export function SectionCard({
  section,
  index,
  update,
  data,
}: {
  section: Sec
  index: number
  update: (next: Sec) => void
  data: SiteConfig
}) {
  const title = labelFor(section.type, 'variant' in section ? section.variant : null)
  return (
    <Section title={`${index + 1}. ${title}`}>
      <Body section={section} update={update} data={data} />
    </Section>
  )
}

function labelFor(type: string, variant: string | null): string {
  const niceType = type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return variant ? `${niceType} (${variant})` : niceType
}

function Body({
  section,
  update,
  data,
}: {
  section: Sec
  update: (next: Sec) => void
  data: SiteConfig
}) {
  switch (section.type) {
    case 'hero':
      return <HeroEditor section={section} update={update} data={data} />
    case 'services':
      return <ServicesEditor section={section} update={update} data={data} />
    case 'reviews':
      return <ReviewsEditor section={section} update={update} data={data} />
    case 'about':
      return <AboutEditor section={section} update={update} data={data} />
    case 'stats':
      return <StatsEditor section={section} update={update} />
    case 'cta-banner':
      return <CtaBannerEditor section={section} update={update} data={data} />
    case 'contact-hours':
      return <ContactHoursEditor section={section} update={update} />
    case 'split-50-50':
      return <Split5050Editor section={section} update={update} data={data} />
    case 'centered-text':
      return <CenteredTextEditor section={section} update={update} data={data} />
    default:
      return (
        <p className="text-xs text-gray-500">
          This section type isn&rsquo;t editable yet. Edit{' '}
          <code className="bg-gray-100 px-1">content/site.json</code> in your repo
          directly to change it.
        </p>
      )
  }
}

// ─── CTA primitive ─────────────────────────────────────────────────

function CtaField({
  label,
  value,
  onChange,
  data,
  optional = false,
  onClear,
}: {
  label: string
  value: Cta
  onChange: (next: Cta) => void
  data: SiteConfig
  optional?: boolean
  onClear?: () => void
}) {
  return (
    <fieldset className="rounded-lg border border-gray-200 p-3 space-y-2">
      <legend className="px-1 text-xs font-semibold text-gray-500">
        {label}
      </legend>
      <ContentTextField
        label="Button label"
        value={value.label}
        onChange={(v) => onChange({ ...value, label: v })}
        placeholder="Call Now"
        data={data}
      />
      <SelectField
        label="Action"
        value={value.action}
        onChange={(v) => onChange({ ...value, action: v as Cta['action'] })}
        options={[
          { value: 'tel', label: 'Phone call' },
          { value: 'email', label: 'Email' },
          { value: 'scroll', label: 'Scroll to section' },
          { value: 'external', label: 'External URL' },
        ]}
      />
      <TextField
        label="Target"
        value={value.target ?? ''}
        onChange={(v) => onChange({ ...value, target: v })}
        placeholder={
          value.action === 'tel'
            ? '+16048795301'
            : value.action === 'email'
              ? 'you@example.com'
              : value.action === 'scroll'
                ? 'contact'
                : 'https://example.com'
        }
        hint={
          value.action === 'scroll'
            ? 'Section id to scroll to (e.g. "contact").'
            : undefined
        }
      />
      {optional && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-red-600 hover:underline"
        >
          Remove this CTA
        </button>
      )}
    </fieldset>
  )
}

function emptyCta(): Cta {
  return { label: '', action: 'tel' }
}

// ─── Per-section editors ───────────────────────────────────────────

function HeroEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'hero' }>
  update: (next: Extract<Sec, { type: 'hero' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow (small text above headline)"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
        placeholder="VANCOUVER PLUMBER"
      />
      <ContentTextAreaField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        rows={2}
        data={data}
      />
      <ContentTextAreaField
        label="Subhead (optional)"
        value={d.subhead ?? ''}
        onChange={(v) => patch({ subhead: v || undefined })}
        rows={2}
        data={data}
      />
      {section.variant === 'photo-led' && (
        <fieldset className="rounded-lg border border-gray-200 p-3 space-y-2">
          <legend className="px-1 text-xs font-semibold text-gray-500">
            Hero photo
          </legend>
          <ImageField
            label="Image"
            value={d.image?.src ?? ''}
            onChange={(v) =>
              patch({ image: { src: v, alt: d.image?.alt ?? '' } })
            }
          />
          <ContentTextField
            label="Caption / alt text"
            value={d.image?.alt ?? ''}
            onChange={(v) =>
              patch({ image: { src: d.image?.src ?? '', alt: v } })
            }
            data={data}
          />
        </fieldset>
      )}
      <fieldset className="rounded-lg border border-gray-200 p-3">
        <legend className="px-1 text-xs font-semibold text-gray-500">
          Trust badges
        </legend>
        <RepeatingList
          items={d.trustItems}
          onChange={(next) => patch({ trustItems: next })}
          makeEmpty={() => ''}
          addLabel="Add trust badge"
          renderItem={(item, set) => (
            <ContentTextField
              label=""
              value={item}
              onChange={set}
              placeholder="Licensed & Insured"
              data={data}
            />
          )}
        />
      </fieldset>
      <CtaField
        label="Primary CTA"
        value={d.primaryCta}
        onChange={(v) => patch({ primaryCta: v })}
        data={data}
      />
      {d.secondaryCta ? (
        <CtaField
          label="Secondary CTA"
          value={d.secondaryCta}
          onChange={(v) => patch({ secondaryCta: v })}
          data={data}
          optional
          onClear={() => patch({ secondaryCta: undefined })}
        />
      ) : (
        <button
          type="button"
          onClick={() => patch({ secondaryCta: emptyCta() })}
          className="text-xs text-blue-600 hover:underline"
        >
          + Add a secondary CTA
        </button>
      )}
    </>
  )
}

function ServicesEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'services' }>
  update: (next: Extract<Sec, { type: 'services' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <ContentTextField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        data={data}
      />
      <RepeatingList
        items={d.items}
        onChange={(next) => patch({ items: next })}
        makeEmpty={() => ({
          id: cryptoSlugId(),
          icon: 'Wrench',
          title: '',
          description: '',
        })}
        addLabel="Add service"
        renderItem={(item, set) => (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Icon (lucide-react name)"
                value={item.icon}
                onChange={(v) => set({ ...item, icon: v })}
                placeholder="Wrench"
                hint='See lucide.dev — names like "Wrench", "Flame", "Shield".'
              />
              <ContentTextField
                label="Service title"
                value={item.title}
                onChange={(v) => set({ ...item, title: v })}
                data={data}
              />
            </div>
            <ContentTextAreaField
              label="Description"
              value={item.description}
              onChange={(v) => set({ ...item, description: v })}
              rows={2}
              data={data}
            />
          </div>
        )}
      />
    </>
  )
}

function ReviewsEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'reviews' }>
  update: (next: Extract<Sec, { type: 'reviews' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <ContentTextField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        data={data}
      />
      <p className="text-xs text-gray-600">
        Edit any wording you&rsquo;d like. Reviews from your Google profile were
        pulled here when your site was generated.
      </p>
      <RepeatingList
        items={d.items}
        onChange={(next) => patch({ items: next })}
        makeEmpty={() => ({
          id: cryptoSlugId(),
          author: '',
          rating: 5,
          date: new Date().toISOString().slice(0, 10),
          text: '',
          source: 'google' as const,
        })}
        addLabel="Add review"
        renderItem={(item, set) => (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <TextField
                label="Customer name"
                value={item.author}
                onChange={(v) => set({ ...item, author: v })}
              />
              <TextField
                label="Date"
                value={item.date}
                onChange={(v) => set({ ...item, date: v })}
                placeholder="2025-03-12"
              />
              <RatingPicker
                value={item.rating}
                onChange={(r) => set({ ...item, rating: r })}
              />
            </div>
            <ContentTextAreaField
              label="Review text"
              value={item.text}
              onChange={(v) => set({ ...item, text: v })}
              rows={3}
              data={data}
            />
          </div>
        )}
      />
    </>
  )
}

function AboutEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'about' }>
  update: (next: Extract<Sec, { type: 'about' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <ContentTextField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        data={data}
      />
      <ContentTextAreaField
        label="Narrative"
        value={d.narrative}
        onChange={(v) => patch({ narrative: v })}
        rows={6}
        data={data}
      />
      <fieldset className="rounded-lg border border-gray-200 p-3">
        <legend className="px-1 text-xs font-semibold text-gray-500">
          Trust badges
        </legend>
        <RepeatingList
          items={d.badges}
          onChange={(next) => patch({ badges: next })}
          makeEmpty={() => ({ label: '', icon: 'Award' })}
          addLabel="Add badge"
          renderItem={(item, set) => (
            <div className="grid grid-cols-2 gap-2">
              <ContentTextField
                label="Label"
                value={item.label}
                onChange={(v) => set({ ...item, label: v })}
                placeholder="Family Owned Since 1962"
                data={data}
              />
              <TextField
                label="Icon (lucide name)"
                value={item.icon}
                onChange={(v) => set({ ...item, icon: v })}
                placeholder="Award"
              />
            </div>
          )}
        />
      </fieldset>
    </>
  )
}

function StatsEditor({
  section,
  update,
}: {
  section: Extract<Sec, { type: 'stats' }>
  update: (next: Extract<Sec, { type: 'stats' }>) => void
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow (optional)"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <TextField
        label="Headline (optional)"
        value={d.headline ?? ''}
        onChange={(v) => patch({ headline: v || undefined })}
      />
      <RepeatingList
        items={d.items}
        onChange={(next) => patch({ items: next })}
        makeEmpty={() => ({ value: '', label: '' })}
        addLabel="Add stat"
        renderItem={(item, set) => (
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Value"
              value={item.value}
              onChange={(v) => set({ ...item, value: v })}
              placeholder="60+"
            />
            <TextField
              label="Label"
              value={item.label}
              onChange={(v) => set({ ...item, label: v })}
              placeholder="Years in business"
            />
          </div>
        )}
      />
    </>
  )
}

function CtaBannerEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'cta-banner' }>
  update: (next: Extract<Sec, { type: 'cta-banner' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <ContentTextField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        data={data}
      />
      <ContentTextAreaField
        label="Subhead (optional)"
        value={d.subhead ?? ''}
        onChange={(v) => patch({ subhead: v || undefined })}
        rows={2}
        data={data}
      />
      <CtaField
        label="Primary CTA"
        value={d.primaryCta}
        onChange={(v) => patch({ primaryCta: v })}
        data={data}
      />
      {d.secondaryCta ? (
        <CtaField
          label="Secondary CTA"
          value={d.secondaryCta}
          onChange={(v) => patch({ secondaryCta: v })}
          data={data}
          optional
          onClear={() => patch({ secondaryCta: undefined })}
        />
      ) : (
        <button
          type="button"
          onClick={() => patch({ secondaryCta: emptyCta() })}
          className="text-xs text-blue-600 hover:underline"
        >
          + Add a secondary CTA
        </button>
      )}
    </>
  )
}

function ContactHoursEditor({
  section,
  update,
}: {
  section: Extract<Sec, { type: 'contact-hours' }>
  update: (next: Extract<Sec, { type: 'contact-hours' }>) => void
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow (optional)"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <TextField
        label="Headline (optional)"
        value={d.headline ?? ''}
        onChange={(v) => patch({ headline: v || undefined })}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={d.showHoursTable}
          onChange={(e) => patch({ showHoursTable: e.target.checked })}
        />
        Show hours table
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={d.showContactForm}
          onChange={(e) => patch({ showContactForm: e.target.checked })}
        />
        Show contact form
      </label>
      <p className="text-xs text-gray-500">
        Edit your hours and address from the <strong>Site Settings</strong> tab —
        this section pulls from there.
      </p>
    </>
  )
}

function Split5050Editor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'split-50-50' }>
  update: (next: Extract<Sec, { type: 'split-50-50' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <SelectField
        label="Image side"
        value={d.side}
        onChange={(v) => patch({ side: v as 'image-left' | 'image-right' })}
        options={[
          { value: 'image-left', label: 'Image left, text right' },
          { value: 'image-right', label: 'Image right, text left' },
        ]}
      />
      <TextField
        label="Eyebrow (optional)"
        value={d.text.eyebrow ?? ''}
        onChange={(v) =>
          patch({ text: { ...d.text, eyebrow: v || undefined } })
        }
      />
      <ContentTextField
        label="Headline"
        value={d.text.headline}
        onChange={(v) => patch({ text: { ...d.text, headline: v } })}
        data={data}
      />
      <ContentTextAreaField
        label="Body text"
        value={d.text.body}
        onChange={(v) => patch({ text: { ...d.text, body: v } })}
        rows={4}
        data={data}
      />
      <fieldset className="rounded-lg border border-gray-200 p-3 space-y-2">
        <legend className="px-1 text-xs font-semibold text-gray-500">Image</legend>
        <ImageField
          label="Image"
          value={d.image.src}
          onChange={(v) => patch({ image: { ...d.image, src: v } })}
        />
        <ContentTextField
          label="Alt text"
          value={d.image.alt}
          onChange={(v) => patch({ image: { ...d.image, alt: v } })}
          data={data}
        />
      </fieldset>
      {d.text.cta ? (
        <CtaField
          label="CTA (optional)"
          value={d.text.cta}
          onChange={(v) => patch({ text: { ...d.text, cta: v } })}
          data={data}
          optional
          onClear={() => patch({ text: { ...d.text, cta: undefined } })}
        />
      ) : (
        <button
          type="button"
          onClick={() => patch({ text: { ...d.text, cta: emptyCta() } })}
          className="text-xs text-blue-600 hover:underline"
        >
          + Add a CTA button
        </button>
      )}
    </>
  )
}

function CenteredTextEditor({
  section,
  update,
  data,
}: {
  section: Extract<Sec, { type: 'centered-text' }>
  update: (next: Extract<Sec, { type: 'centered-text' }>) => void
  data: SiteConfig
}) {
  const d = section.data
  const patch = (p: Partial<typeof d>) => update({ ...section, data: { ...d, ...p } })
  return (
    <>
      <TextField
        label="Eyebrow (optional)"
        value={d.eyebrow ?? ''}
        onChange={(v) => patch({ eyebrow: v || undefined })}
      />
      <ContentTextField
        label="Headline"
        value={d.headline}
        onChange={(v) => patch({ headline: v })}
        data={data}
      />
      <ContentTextAreaField
        label="Subhead (optional)"
        value={d.subhead ?? ''}
        onChange={(v) => patch({ subhead: v || undefined })}
        rows={2}
        data={data}
      />
      {d.cta ? (
        <CtaField
          label="CTA (optional)"
          value={d.cta}
          onChange={(v) => patch({ cta: v })}
          data={data}
          optional
          onClear={() => patch({ cta: undefined })}
        />
      ) : (
        <button
          type="button"
          onClick={() => patch({ cta: emptyCta() })}
          className="text-xs text-blue-600 hover:underline"
        >
          + Add a CTA button
        </button>
      )}
    </>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────

function RatingPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block">
      <span className={labelClass}>Stars</span>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className={inputClass}
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {'★'.repeat(n)}
            {'☆'.repeat(5 - n)}
          </option>
        ))}
      </select>
    </label>
  )
}

function cryptoSlugId(): string {
  return (typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36)
  ).slice(0, 8)
}
