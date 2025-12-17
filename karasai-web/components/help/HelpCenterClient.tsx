'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Shield, Home, Users, FileText, HelpCircle } from 'lucide-react'

interface HelpCategory {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  display_order: number
}

interface HelpArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category_id: string | null
  is_featured: boolean
}

interface HelpCenterClientProps {
  categories: HelpCategory[]
  articles: HelpArticle[]
}

// Icon mapping
const iconMap: Record<string, any> = {
  BookOpen,
  Shield,
  Home,
  Users,
  FileText,
  HelpCircle,
}

export default function HelpCenterClient({ categories, articles }: HelpCenterClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = 
      selectedCategory === null || 
      article.category_id === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get articles for a specific category
  const getArticlesForCategory = (categoryId: string) => {
    return filteredArticles.filter((article) => article.category_id === categoryId)
  }

  return (
    <>
      {/* Search Section */}
      <section className="border-b border-neutral-gray bg-white py-6">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-dark/40" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-neutral-gray bg-white py-3 pl-12 pr-4 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none md:py-4 md:text-base"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                  selectedCategory === null
                    ? 'bg-karasai-blue text-white'
                    : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                    selectedCategory === category.id
                      ? 'bg-karasai-blue text-white'
                      : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Results Count */}
            {searchQuery && (
              <p className="mt-4 text-sm text-neutral-dark/60">
                Found {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search Results or Categories */}
      {searchQuery ? (
        // Show search results
        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                Search Results
              </h2>

              {filteredArticles.length === 0 ? (
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                  <p className="text-base text-neutral-dark/80 md:text-lg">
                    No articles found matching "{searchQuery}". Try different keywords or{' '}
                    <Link href="/faq" className="text-karasai-blue hover:underline">
                      check our FAQs
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredArticles.map((article) => {
                    const category = categories.find((c) => c.id === article.category_id)
                    const Icon = category ? iconMap[category.icon] : HelpCircle

                    return (
                      <Link
                        key={article.id}
                        href={`/help/${article.slug}`}
                        className="group rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          {Icon && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
                              <Icon className="h-5 w-5 text-karasai-blue" />
                            </div>
                          )}
                          {category && (
                            <span className="rounded-full bg-karasai-light px-3 py-1 text-xs font-semibold uppercase text-karasai-blue">
                              {category.name}
                            </span>
                          )}
                        </div>
                        <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-neutral-dark group-hover:text-karasai-blue">
                          {article.title}
                        </h3>
                        <p className="text-sm text-neutral-dark/70 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        // Show categories (default view)
        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:mb-16 md:text-3xl">
                Browse by Category
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || HelpCircle
                  const categoryArticles = getArticlesForCategory(category.id)

                  return (
                    <div
                      key={category.id}
                      className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                    >
                      {/* Icon */}
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-karasai-light">
                        <Icon className="h-7 w-7 text-karasai-blue" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                        {category.name}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-neutral-dark/70">
                        {category.description}
                      </p>

                      {/* Article Links */}
                      {categoryArticles.length > 0 ? (
                        <ul className="space-y-2">
                          {categoryArticles.slice(0, 4).map((article) => (
                            <li key={article.id}>
                              <Link
                                href={`/help/${article.slug}`}
                                className="text-sm font-semibold text-karasai-blue transition-colors hover:text-karasai-blue/80 hover:underline"
                              >
                                {article.title} →
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs italic text-neutral-dark/40">
                          No articles in this category yet
                        </p>
                      )}

                      {/* View All Link */}
                      {categoryArticles.length > 4 && (
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className="mt-3 inline-block text-xs font-semibold uppercase text-neutral-dark/60 hover:text-karasai-blue"
                        >
                          View All ({categoryArticles.length})
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}