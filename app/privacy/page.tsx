import type { Metadata } from 'next'
import { getContent } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent()
  return {
    title: 'Privacy Policy',
    description: `Privacy policy for ${data.business.name}.`,
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage() {
  const data = await getContent()
  const { business } = data
  const contactEmail = business.email || business.ownerEmail || ''
  const updated = '2026-04-27'
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-gray-700 leading-relaxed [&_p]:mb-4 [&_a]:text-[--color-primary] [&_a]:underline">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {updated}</p>
      <p>This Privacy Policy describes how {business.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;) collects, uses, and shares information when you use this website or contact us through it.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Information we collect</h2>
      <p>When you submit our contact form, we collect the name, email address, phone number (if provided), and message you supply. We also temporarily log your IP address to prevent abuse of the form.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">How we use it</h2>
      <p>We use the information you submit solely to respond to your enquiry. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">How it&rsquo;s stored</h2>
      <p>Form submissions are delivered to our private email inbox via a transactional email service. We retain emailed enquiries for as long as is reasonable to handle the request and any follow-up.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Cookies and analytics</h2>
      <p>This website may use privacy-friendly analytics to understand aggregate visitor counts. No personally identifying information is collected for analytics, and no advertising cookies are set.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Your rights</h2>
      <p>You may request a copy of any personal information we hold about you, or ask us to delete it, by contacting us at the address below.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <address className="not-italic">
        {business.name}<br />
        {business.address.street}<br />
        {business.address.city}, {business.address.region} {business.address.postal}<br />
        {contactEmail && <>Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a><br /></>}
        {business.phone && <>Phone: <a href={`tel:${business.phone}`}>{business.phone}</a></>}
      </address>
    </main>
  )
}
