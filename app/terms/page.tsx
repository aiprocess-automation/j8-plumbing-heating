import type { Metadata } from 'next'
import { getContent } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent()
  return {
    title: 'Terms of Use',
    description: `Terms of use for ${data.business.name}.`,
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage() {
  const data = await getContent()
  const { business } = data
  const updated = '2026-04-27'
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-gray-700 leading-relaxed [&_p]:mb-4 [&_a]:text-[--color-primary] [&_a]:underline">
      <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {updated}</p>
      <p>By using this website, you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">No professional advice</h2>
      <p>The information on this website is provided for general informational purposes only. It does not constitute professional advice. For specific recommendations regarding your situation, please contact {business.name} directly.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Service availability</h2>
      <p>Service descriptions, pricing, and availability are subject to change without notice. Quoted timeframes (e.g. &ldquo;24/7 emergency&rdquo;) reflect our typical operations and are not contractual guarantees.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Intellectual property</h2>
      <p>All content on this website — including text, photos, logos, and design — is the property of {business.name} or used with permission, and is protected by applicable copyright laws.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {business.name} is not liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Governing law</h2>
      <p>These terms are governed by the laws of {business.address.region}, {business.address.country}.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>
        Questions about these terms? Contact {business.name} at{' '}
        {business.phone && <a href={`tel:${business.phone}`}>{business.phone}</a>}
        {business.phone && business.email && ' or '}
        {business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}.
      </p>
    </main>
  )
}
