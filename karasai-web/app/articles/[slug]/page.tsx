import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ArticleContent from '@/components/articles/ArticleContent'
import RelatedArticles from '@/components/articles/RelatedArticles'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params // ← AWAIT params (Next.js 15+ requirement)
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) {
    return {
      title: 'Article Not Found | Karasai',
    }
  }

  return {
    title: `${article.title} | Karasai`,
    description: article.meta_description || article.excerpt || article.title,
    keywords: article.meta_keywords || article.tags,
    authors: article.author_name ? [{ name: article.author_name }] : [],
    openGraph: {
      title: article.title,
      description: article.meta_description || article.excerpt || article.title,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: article.author_name ? [article.author_name] : [],
      images: article.featured_image_url ? [article.featured_image_url] : [],
      url: `https://karasai.com/articles/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_description || article.excerpt || article.title,
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
    alternates: {
      canonical: `https://karasai.com/articles/${article.slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params // ← AWAIT params (Next.js 15+ requirement)
  const supabase = await createClient()

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !article) {
    notFound()
  }

  // Fetch related articles based on tags and category
  const { data: relatedArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .neq('id', article.id)
    .or(`category.eq.${article.category},tags.cs.${JSON.stringify(article.tags)}`)
    .limit(3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        {/* Article Content */}
        <ArticleContent article={article} />

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </main>

      <Footer />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.meta_description || article.excerpt,
            image: article.featured_image_url,
            datePublished: article.published_at,
            dateModified: article.updated_at,
            author: {
              '@type': 'Person',
              name: article.author_name || 'Karasai Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Karasai',
              logo: {
                '@type': 'ImageObject',
                url: 'https://karasai.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://karasai.com/articles/${article.slug}`,
            },
          }),
        }}
      />
    </div>
  )
}