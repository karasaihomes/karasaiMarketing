import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  author_name: string | null
  tags: string[]
  category: string | null
  published_at: string
}

interface ArticleCardProps {
  article: Article
  priority?: boolean
}

export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group overflow-hidden rounded-lg border-2 border-neutral-gray bg-white shadow-sm transition-all hover:border-karasai-blue hover:shadow-md"
    >
      {/* Featured Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-gray">
        {article.featured_image_url ? (
          <Image
            src={article.featured_image_url}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            quality={75}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-karasai-light to-karasai-blue/20 p-6">
            <svg
              className="mb-3 h-16 w-16 opacity-30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="80"
                height="80"
                rx="8"
                stroke="#4E70C6"
                strokeWidth="4"
                fill="none"
              />
              <text
                x="50"
                y="60"
                fontSize="36"
                fontWeight="bold"
                fill="#4E70C6"
                textAnchor="middle"
                fontFamily="Montserrat, sans-serif"
              >
                K
              </text>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-karasai-blue/60">
              Karasai
            </span>
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
      <div className="p-6">
        {/* Meta Info */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-neutral-dark/60">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.published_at)}</span>
          </div>
          {article.author_name && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author_name}</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark line-clamp-2 group-hover:text-karasai-blue">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 text-sm leading-relaxed text-neutral-dark/70 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-gray bg-neutral-gray/50 px-2 py-1 text-xs text-neutral-dark/70"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 text-xs text-neutral-dark/60">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        <div className="flex items-center gap-2 text-sm font-semibold text-karasai-blue">
          <span>Read Article</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}