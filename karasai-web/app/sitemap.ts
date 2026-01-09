import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://karasai.com'
  const supabase = await createClient()

  // Fetch all published articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .not('published_at', 'is', null)

  // Fetch all available properties
  const { data: properties } = await supabase
    .from('properties')
    .select('id, updated_at')
    .eq('status', 'available')

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/list-your-home`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic article pages
  const articlePages =
    articles?.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated_at || article.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || []

  // Dynamic property pages
  const propertyPages =
    properties?.map((property) => ({
      url: `${baseUrl}/properties/${property.id}`,
      lastModified: new Date(property.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })) || []

  return [...staticPages, ...articlePages, ...propertyPages]
}