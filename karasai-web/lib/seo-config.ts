import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = 'https://karasai.com/og-image.png',
    url = 'https://karasai.com',
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
  } = config

  return {
    title,
    description,
    keywords,
    authors: authors?.map(name => ({ name })),
    openGraph: {
      title,
      description,
      url,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Karasai',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@karasai',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'g45BfB5R1tZh7ZjnBUkYCys-fo4c8Vr7Xl68pv0lTBvk',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  }
}

// Default SEO values
export const defaultSEO = {
  title: 'Karasai | Verified Rental Homes - Stop Rental Scams',
  description:
    'Find 100% verified rental homes from legitimate property management companies. Search thousands of rental properties with confidence. Stop rental fraud with Karasai.',
  keywords: [
    'rental homes',
    'verified rentals',
    'rental fraud prevention',
    'legitimate landlords',
    'property search',
    'rental scam prevention',
    'verified property managers',
    'rental home verification',
  ],
}

// Property-specific SEO
export function generatePropertySEO(property: {
  address: string
  city: string
  state: string
  bedrooms: number
  bathrooms: number
  rent: number
  primary_image_url?: string
}) {
  return generateMetadata({
    title: `${property.bedrooms}BR/${property.bathrooms}BA Home for Rent in ${property.city}, ${property.state} - $${property.rent}/mo | Karasai`,
    description: `Verified rental property at ${property.address} in ${property.city}, ${property.state}. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms. Monthly rent: $${property.rent}. 100% verified by Karasai.`,
    keywords: [
      `rental ${property.city}`,
      `${property.bedrooms} bedroom rental`,
      `homes for rent ${property.state}`,
      `verified rentals ${property.city}`,
      property.address,
    ],
    image: property.primary_image_url,
    url: `https://karasai.com/properties/${property.address}`,
  })
}

// Article-specific SEO
export function generateArticleSEO(article: {
  title: string
  excerpt: string
  meta_description?: string
  meta_keywords?: string[]
  tags?: string[]
  slug: string
  featured_image_url?: string
  author_name?: string
  published_at: string
  updated_at: string
}) {
  return generateMetadata({
    title: `${article.title} | Karasai`,
    description: article.meta_description || article.excerpt,
    keywords: article.meta_keywords || article.tags,
    image: article.featured_image_url,
    url: `https://karasai.com/articles/${article.slug}`,
    type: 'article',
    publishedTime: article.published_at,
    modifiedTime: article.updated_at,
    authors: article.author_name ? [article.author_name] : ['Karasai Team'],
  })
}