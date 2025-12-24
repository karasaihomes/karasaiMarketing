import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  category: string | null
  published_at: string
}

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section className="border-t border-neutral-gray bg-white py-12">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
            Related Articles
          </h2>
          <p className="mt-2 text-sm text-neutral-dark/70">
            Continue reading articles on similar topics
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group overflow-hidden rounded-lg border-2 border-neutral-gray bg-white shadow-sm transition-all hover:border-karasai-blue hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-gray">
                {article.featured_image_url ? (
                  <Image
                    src={article.featured_image_url}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-karasai-light">
                    <span className="text-4xl font-bold text-karasai-blue opacity-20">K</span>
                  </div>
                )}

                {/* Category Badge */}
                {article.category && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-karasai-blue px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {article.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Date */}
                <div className="mb-2 flex items-center gap-1 text-xs text-neutral-dark/60">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.published_at)}</span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-neutral-dark line-clamp-2 group-hover:text-karasai-blue">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-3 text-sm text-neutral-dark/70 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-xs font-semibold text-karasai-blue">
                  <span>Read More</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-karasai-blue transition-all hover:bg-karasai-light"
          >
            View All Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}