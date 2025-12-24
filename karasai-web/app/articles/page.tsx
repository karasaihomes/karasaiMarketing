import ArticlesClient from '@/components/articles/ArticlesClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Guides & Articles | Karasai - Expert Advice on Renting',
  description: 'Expert guides and articles on rental home verification, avoiding scams, tenant rights, and finding the perfect rental property. Free resources from Karasai.',
  keywords: ['rental guides', 'renting tips', 'avoid rental scams', 'tenant rights', 'property management', 'rental advice'],
  openGraph: {
    title: 'Rental Guides & Articles | Karasai',
    description: 'Expert guides and articles on rental home verification, avoiding scams, and finding the perfect rental property.',
    type: 'website',
    url: 'https://karasai.com/articles',
  },
  alternates: {
    canonical: 'https://karasai.com/articles',
  },
}

export default function ArticlesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        {/* Hero Section */}
        <section className="border-b border-neutral-gray bg-white py-8 md:py-12">
          <div className="container-custom">
            <h1 className="mb-3 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
              Rental Guides & Articles
            </h1>
            <p className="text-base text-neutral-dark/70 md:text-lg">
              Expert advice on finding verified rentals, avoiding scams, and navigating the rental process.
            </p>
          </div>
        </section>

        {/* Articles Content */}
        <ArticlesClient />
      </main>

      <Footer />
    </div>
  )
}