'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, Filter, Loader2, X } from 'lucide-react'
import ArticleCard from './ArticleCard'

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
  meta_description: string | null
}

export default function ArticlesClient() {
  const searchParams = useSearchParams()
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [])

  // Read URL params on mount and when searchParams change
  useEffect(() => {
    const tagParam = searchParams.get('tag')
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')

    if (tagParam) {
      setSelectedTag(decodeURIComponent(tagParam))
    }
    if (categoryParam) {
      setSelectedCategory(decodeURIComponent(categoryParam))
    }
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam))
    }
  }, [searchParams])

  useEffect(() => {
    filterArticles()
  }, [searchQuery, selectedCategory, selectedTag, articles])

  const fetchArticles = async () => {
    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })

      if (error) throw error

      setArticles(data || [])

      // Extract unique categories and tags
      const uniqueCategories = [...new Set(data?.map(a => a.category).filter(Boolean))] as string[]
      setCategories(uniqueCategories)

      const allArticleTags = data?.flatMap(a => a.tags || []) || []
      const uniqueTags = [...new Set(allArticleTags)] as string[]
      setAllTags(uniqueTags)

    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterArticles = () => {
    let filtered = [...articles]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(article => article.tags?.includes(selectedTag))
    }

    setFilteredArticles(filtered)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTag('all')
    // Update URL
    window.history.pushState({}, '', '/articles')
  }

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-karasai-blue" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container-custom">
        {/* Search & Filters */}
        <div className="mb-8 rounded-lg border-2 border-neutral-gray bg-white p-4 md:p-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-dark/40 md:left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border-2 border-neutral-gray bg-white py-3 pl-10 pr-4 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none md:pl-12"
              />
            </div>
          </div>

          {/* Mobile: Filter Toggle Button */}
          <div className="mb-4 md:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-4 py-3 text-sm font-semibold text-karasai-blue transition-all hover:bg-karasai-light"
            >
              <Filter className="h-5 w-5" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              {(selectedCategory !== 'all' || selectedTag !== 'all') && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-karasai-blue text-xs text-white">
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedTag !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Filters (Always Visible) + Mobile Filters (Collapsible) */}
          <div className={`space-y-4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
            {/* Filter Header */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-neutral-dark/60" />
              <span className="text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                Filters:
              </span>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              {/* Category Filter */}
              <div className="flex-1 md:flex-none">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-2.5 text-sm text-neutral-dark focus:border-karasai-blue focus:outline-none md:w-auto"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="flex-1 md:flex-none">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-2.5 text-sm text-neutral-dark focus:border-karasai-blue focus:outline-none md:w-auto"
                >
                  <option value="all">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-4 py-2.5 text-sm font-semibold text-karasai-blue transition-all hover:bg-karasai-light"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-neutral-dark/60">
              Showing {filteredArticles.length} of {articles.length} articles
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-lg border-2 border-neutral-gray bg-white p-8 text-center md:p-12">
            <Search className="mx-auto mb-4 h-12 w-12 text-neutral-dark/20" />
            <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
              No Articles Found
            </h3>
            <p className="mb-4 text-sm text-neutral-dark/70">
              {searchQuery || selectedCategory !== 'all' || selectedTag !== 'all'
                ? 'Try adjusting your filters or search query.'
                : 'No published articles yet. Check back soon!'}
            </p>
            {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="rounded-lg bg-karasai-blue px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-opacity-90"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}