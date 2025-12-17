import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyHeader from '@/components/property/PropertyHeader'
import PropertyDescription from '@/components/property/PropertyDescription'
import PropertySidebar from '@/components/property/PropertySidebar'
import KarasaiPromise from '@/components/property/KarasaiPromise'
import BackToResults from '@/components/property/BackToResults'

// Force dynamic rendering for fresh property data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch property data with management company info
  const { data: property, error } = await supabase
    .from('properties')
    .select(`
      *,
      management_company:management_companies (
        id,
        company_name,
        logo_url,
        website,
        phone,
        email,
        description
      )
    `)
    .eq('id', id)
    .single()

  if (error || !property) {
    notFound()
  }

  // Parse images from JSONB
  const images = property.images || []
  const primaryImage = property.primary_image_url
  
  // Create full image array with primary image first
  const allImages = primaryImage 
    ? [primaryImage, ...images.filter((img: string) => img !== primaryImage)]
    : images.length > 0 
      ? images 
      : ['/images/properties/coming_soon_image.png']

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        <div className="container-custom py-8">
          {/* Back to Results Button */}
          <BackToResults />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Property Image Gallery */}
              <Suspense fallback={<div className="h-96 rounded-lg bg-white animate-pulse" />}>
                <PropertyGallery images={allImages} status={property.status} />
              </Suspense>

              {/* Property Header */}
              <PropertyHeader property={property} />

              {/* Property Description */}
              {property.description && (
                <PropertyDescription description={property.description} />
              )}

              {/* Management Company Description */}
              {property.management_company?.description && (
                <div className="mb-6 rounded-lg bg-white p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-dark">
                    From the Property Owner/Manager:
                  </h3>
                  <div className="whitespace-pre-line text-sm leading-relaxed text-neutral-dark/80">
                    {property.management_company.description}
                  </div>
                </div>
              )}

              {/* Karasai Promise */}
              <KarasaiPromise />
            </div>

            {/* Sidebar - Right Side */}
            <PropertySidebar 
              property={property}
              managementCompany={property.management_company}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from('properties')
    .select('address, city, state, bedrooms, bathrooms, rent, primary_image_url')
    .eq('id', id)
    .single()

  if (!property) {
    return {
      title: 'Property Not Found | Karasai',
    }
  }

  return {
    title: `${property.bedrooms}BR/${property.bathrooms}BA Home in ${property.city}, ${property.state} - $${property.rent}/mo | Karasai`,
    description: `${property.address}, ${property.city}, ${property.state}. ${property.bedrooms} bed, ${property.bathrooms} bath home for rent at $${property.rent}/month. Verified by Karasai.`,
    openGraph: {
      title: `${property.address} - ${property.city}, ${property.state}`,
      description: `${property.bedrooms}BR/${property.bathrooms}BA - $${property.rent}/mo`,
      images: property.primary_image_url ? [property.primary_image_url] : [],
    },
  }
}