import Link from 'next/link'
import { Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HelpCenterClient from '@/components/help/HelpCenterClient'

export const metadata = {
  title: 'Help Center - Get Support | Karasai',
  description: 'Find help and resources for using Karasai rental verification platform.',
}

// Revalidate every hour
export const revalidate = 3600

export default async function HelpCenterPage() {
  const supabase = await createClient()

  // Fetch all published help categories
  const { data: categories, error: categoriesError } = await supabase
    .from('help_categories')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
    return notFound()
  }

  // Fetch all published articles
  const { data: articles, error: articlesError } = await supabase
    .from('help_articles')
    .select('id, slug, title, excerpt, category_id, is_featured')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (articlesError) {
    console.error('Error fetching articles:', articlesError)
    return notFound()
  }

  // Fetch featured FAQs for popular topics
  const { data: featuredFaqs, error: faqsError } = await supabase
    .from('faqs')
    .select('slug, question, answer')
    .eq('is_published', true)
    .eq('is_featured', true)
    .limit(4)

  const quickLinks = [
    { text: 'Browse All FAQs', href: '/faq', color: 'bg-karasai-blue' },
    { text: 'Contact Support', href: '/contact', color: 'bg-status-available' },
    { text: 'About Karasai', href: '/about', color: 'bg-neutral-dark' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
                How Can We Help?
              </h1>
              <p className="text-base text-white/90 md:text-lg">
                Search help articles or browse by category.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-b border-neutral-gray bg-white py-6">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`rounded-full ${link.color} px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 md:px-8 md:py-3 md:text-base`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Categories - Client Component */}
        <HelpCenterClient categories={categories} articles={articles} />

        {/* Popular Questions from FAQ */}
        {featuredFaqs && featuredFaqs.length > 0 && (
          <section className="border-t border-neutral-gray bg-white py-12 md:py-20">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                  Popular Questions
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {featuredFaqs.map((faq) => (
                    <Link
                      key={faq.slug}
                      href={`/faq#${faq.slug}`}
                      className="group rounded-lg border-2 border-neutral-gray bg-white p-4 transition-all hover:border-karasai-blue hover:shadow-md"
                    >
                      <h3 className="mb-1 text-base font-bold uppercase tracking-wide text-neutral-dark group-hover:text-karasai-blue">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-neutral-dark/70 line-clamp-2">
                        {faq.answer.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    href="/faq"
                    className="inline-block text-sm font-semibold uppercase text-karasai-blue hover:underline"
                  >
                    View All FAQs →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Support CTA */}
        <section className="bg-karasai-blue py-12 md:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
                Still Need Help?
              </h2>
              <p className="mb-6 text-base text-white/90 md:text-lg">
                Our support team is here to help you. We typically respond within 24-48 hours.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-karasai-blue shadow-lg transition-all hover:bg-white/90 hover:shadow-xl md:text-base"
                >
                  Contact Support
                </Link>
                <Link
                  href="/faq"
                  className="inline-block rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white/10 md:text-base"
                >
                  View All FAQs
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/80">
                Email: support@karasai.com | Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {articles.filter(a => a.is_featured).length > 0 && (
          <section className="bg-neutral-gray py-12 md:py-16">
            <div className="container-custom">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                  Featured Resources
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                  {articles.filter(a => a.is_featured).slice(0, 3).map((article) => (
                    <Link
                      key={article.id}
                      href={`/help/${article.slug}`}
                      className="rounded-lg bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg"
                    >
                      <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-neutral-dark">
                        {article.title}
                      </h3>
                      <p className="mb-4 text-sm text-neutral-dark/70 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <span className="text-sm font-semibold text-karasai-blue hover:underline">
                        Read More →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}