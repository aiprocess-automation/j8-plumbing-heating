import { getContent } from '@/lib/content'
import { Header } from '@/components/themes/energetic/Header'
import { Footer } from '@/components/themes/energetic/Footer'
import { SectionRenderer } from '@/components/SectionRenderer'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await getContent()
  return (
    <>
      <Header business={data.business} />
      <main>
        <SectionRenderer sections={data.sections} business={data.business} />
      </main>
      <Footer business={data.business} />
    </>
  )
}
