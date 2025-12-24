import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react'
import ShareButtons from './ShareButtons'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url: string | null
  author_name: string | null
  tags: string[]
  category: string | null
  published_at: string
  updated_at: string
}

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="py-12">
      <div className="container-custom">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-karasai-blue hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-block rounded-full bg-karasai-blue px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-neutral-gray pb-6 text-sm text-neutral-dark/70">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(article.published_at)}</span>
            </div>
            {article.author_name && (
              <>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>By {article.author_name}</span>
                </div>
              </>
            )}
            <div className="ml-auto">
              <ShareButtons article={article} />
            </div>
          </div>

          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={article.featured_image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="mb-8 border-l-4 border-karasai-blue bg-karasai-light/20 p-6">
              <p className="text-lg leading-relaxed text-neutral-dark">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none"
            style={{
              // Custom prose styling to match Karasai brand
              '--tw-prose-body': '#333333',
              '--tw-prose-headings': '#333333',
              '--tw-prose-links': '#4E70C6',
              '--tw-prose-bold': '#333333',
              '--tw-prose-quotes': '#4E70C6',
            } as React.CSSProperties}
          >
            {/* Render markdown content - you'll need a markdown parser */}
            <div
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br />'),
              }}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 border-t border-neutral-gray pt-8">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-neutral-dark/60" />
                <span className="text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                  Tags:
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/articles?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border-2 border-neutral-gray bg-white px-4 py-2 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light hover:text-karasai-blue"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 rounded-lg border-2 border-karasai-blue bg-karasai-light/20 p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <Share2 className="h-8 w-8 text-karasai-blue" />
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                  Found This Helpful?
                </h3>
                <p className="text-sm text-neutral-dark/70">
                  Share this article with others who might benefit
                </p>
              </div>
              <ShareButtons article={article} variant="buttons" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}