import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import FAQClient from '@/components/faq/FAQClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Frequently Asked Questions | Karasai',
  description: 'Find answers to common questions about Karasai rental verification platform.',
}

// Revalidate every hour
export const revalidate = 3600

interface FAQ {
  id: string
  slug: string
  question: string
  answer: string
  category: string
  is_featured: boolean
}

export default async function FAQPage() {
  const supabase = await createClient()

  // Fetch all published FAQs
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('id, slug, question, answer, category, is_featured')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching FAQs:', error)
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="text-base text-white/90 md:text-lg">
                Find answers to common questions about Karasai and rental verification.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Client Component */}
        <FAQClient faqs={faqs as FAQ[]} />

        {/* CTA Section */}
        <section className="bg-karasai-blue py-12 md:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-3xl">
                Still Have Questions?
              </h2>
              <p className="mb-6 text-sm text-white/90 md:text-base">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-karasai-blue shadow-lg transition-all hover:bg-white/90 hover:shadow-xl md:px-8 md:py-4 md:text-base"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}