import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ReactMarkdown from 'react-markdown'

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 3600

interface HelpArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the article
  const { data: article, error } = await supabase
    .from('help_articles')
    .select(`
      *,
      category:help_categories (
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !article) {
    notFound()
  }

  // Increment view count (fire and forget)
  supabase.rpc('increment_view_count', {
    table_name: 'help_articles',
    record_id: article.id
  }).then()

  // Fetch related FAQs if they exist
  let relatedFaqs = null
  if (article.related_faqs && article.related_faqs.length > 0) {
    const { data } = await supabase
      .from('faqs')
      .select('slug, question, answer')
      .in('id', article.related_faqs)
      .eq('is_published', true)
    
    relatedFaqs = data
  }

  // Fetch related articles if they exist
  let relatedArticles = null
  if (article.related_articles && article.related_articles.length > 0) {
    const { data } = await supabase
      .from('help_articles')
      .select('slug, title, excerpt')
      .in('id', article.related_articles)
      .eq('is_published', true)
    
    relatedArticles = data
  }

  // Format date
  const publishedDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb & Back */}
        <section className="border-b border-neutral-gray bg-white py-4">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-sm font-semibold text-karasai-blue transition-colors hover:text-karasai-blue/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Help Center
              </Link>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <article className="rounded-lg bg-white p-6 shadow-md md:p-10">
                {/* Category Badge */}
                {article.category && (
                  <Link
                    href={`/help?category=${article.category.slug}`}
                    className="mb-4 inline-block rounded-full bg-karasai-light px-4 py-1 text-xs font-semibold uppercase tracking-wide text-karasai-blue hover:bg-karasai-blue hover:text-white"
                  >
                    {article.category.name}
                  </Link>
                )}

                {/* Title */}
                <h1 className="mb-4 text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
                  {article.title}
                </h1>

                {/* Metadata */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-neutral-dark/60">
                  {publishedDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {publishedDate}
                    </div>
                  )}
                  {article.author && (
                    <div>By {article.author}</div>
                  )}
                </div>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="mb-8 text-base italic leading-relaxed text-neutral-dark/80 md:text-lg">
                    {article.excerpt}
                  </p>
                )}

                {/* Article Content - Markdown */}
                <div className="prose prose-sm max-w-none md:prose-base prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-xl prose-h2:text-neutral-dark md:prose-h2:text-2xl prose-h3:text-lg prose-h3:text-neutral-dark md:prose-h3:text-xl prose-p:leading-relaxed prose-p:text-neutral-dark/80 prose-a:text-karasai-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-dark prose-ul:text-neutral-dark/80 prose-ol:text-neutral-dark/80">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              </article>

              {/* Related FAQs */}
              {relatedFaqs && relatedFaqs.length > 0 && (
                <div className="mt-8 rounded-lg bg-white p-6 shadow-md md:p-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                    Related Questions
                  </h2>
                  <div className="space-y-3">
                    {relatedFaqs.map((faq) => (
                      <Link
                        key={faq.slug}
                        href={`/faq#${faq.slug}`}
                        className="block rounded-lg border-2 border-neutral-gray p-4 transition-all hover:border-karasai-blue hover:shadow-md"
                      >
                        <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-neutral-dark">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-neutral-dark/70 line-clamp-2">
                          {faq.answer}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="mt-8 rounded-lg bg-white p-6 shadow-md md:p-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                    Related Articles
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/help/${related.slug}`}
                        className="rounded-lg border-2 border-neutral-gray p-4 transition-all hover:border-karasai-blue hover:shadow-md"
                      >
                        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-dark">
                          {related.title}
                        </h3>
                        <p className="text-sm text-neutral-dark/70 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Help CTA */}
              <div className="mt-8 rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-6 text-center md:p-8">
                <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                  Was this article helpful?
                </h3>
                <p className="mb-4 text-sm text-neutral-dark/70">
                  Still have questions? Our support team is here to help.
                </p>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-karasai-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('help_articles')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    return {
      title: 'Article Not Found | Karasai Help Center',
    }
  }

  return {
    title: `${article.title} | Karasai Help Center`,
    description: article.excerpt,
  }
}