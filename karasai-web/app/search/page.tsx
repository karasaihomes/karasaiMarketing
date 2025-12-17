import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import SearchResults from '@/components/search/SearchResults'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Force fresh data on every request - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    city?: string
    state?: string
    zip?: string
    beds?: string
    baths?: string
    min_sqft?: string
    max_sqft?: string
    status?: string
    pet_policy?: string
    property_type?: string
    amenities?: string
    management_companies?: string
    sort?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const supabase = await createClient()
  
  // Await searchParams for Next.js 15+ compatibility
  const params = await searchParams
  
  // Parse search params
  const query = params.q || ''
  const city = params.city || ''
  const state = params.state || ''
  const zip = params.zip || ''
  const beds = params.beds ? params.beds.split(',') : []
  const baths = params.baths ? params.baths.split(',') : []
  const minSqft = params.min_sqft ? parseInt(params.min_sqft) : undefined
  const maxSqft = params.max_sqft ? parseInt(params.max_sqft) : undefined
  const statuses = params.status ? params.status.split(',') : ['available', 'coming_soon', 'rented']
  const petPolicy = params.pet_policy ? params.pet_policy.split(',') : []
  const propertyTypes = params.property_type ? params.property_type.split(',') : []
  const amenities = params.amenities ? params.amenities.split(',') : []
  const managementCompanies = params.management_companies ? params.management_companies.split(',') : []
  const sortBy = params.sort || 'created_at_desc'
  const page = params.page ? parseInt(params.page) : 1
  
  // Build query
  let queryBuilder = supabase
    .from('properties')
    .select('*', { count: 'exact' })
  
  // Text search (city, state, zip, or address)
  if (query) {
    queryBuilder = queryBuilder.or(`city.ilike.%${query}%,state.ilike.%${query}%,zip.ilike.%${query}%,address.ilike.%${query}%`)
  }
  
  // City filter
  if (city) {
    queryBuilder = queryBuilder.ilike('city', `%${city}%`)
  }
  
  // State filter
  if (state) {
    queryBuilder = queryBuilder.ilike('state', `%${state}%`)
  }
  
  // ZIP filter
  if (zip) {
    queryBuilder = queryBuilder.eq('zip', zip)
  }
  
  // Bedrooms filter
  if (beds.length > 0) {
    queryBuilder = queryBuilder.in('bedrooms', beds.map(b => parseFloat(b)))
  }
  
  // Bathrooms filter
  if (baths.length > 0) {
    queryBuilder = queryBuilder.in('bathrooms', baths.map(b => parseFloat(b)))
  }
  
  // Square footage range
  if (minSqft) {
    queryBuilder = queryBuilder.gte('square_feet', minSqft)
  }
  if (maxSqft) {
    queryBuilder = queryBuilder.lte('square_feet', maxSqft)
  }
  
  // Status filter
  if (statuses.length > 0) {
    queryBuilder = queryBuilder.in('status', statuses)
  }
  
  // Pet policy filter
  if (petPolicy.length > 0) {
    queryBuilder = queryBuilder.in('pet_policy', petPolicy)
  }
  
  // Property type filter
  if (propertyTypes.length > 0) {
    queryBuilder = queryBuilder.in('property_type', propertyTypes)
  }
  
  // Management companies filter
  if (managementCompanies.length > 0) {
    queryBuilder = queryBuilder.in('management_company_id', managementCompanies)
  }
  
  // Amenities filter (JSONB contains)
  if (amenities.length > 0) {
    amenities.forEach(amenity => {
      queryBuilder = queryBuilder.contains('amenities', [amenity])
    })
  }
  
  // Sorting
  switch (sortBy) {
    case 'rent_asc':
      queryBuilder = queryBuilder.order('rent', { ascending: true })
      break
    case 'rent_desc':
      queryBuilder = queryBuilder.order('rent', { ascending: false })
      break
    case 'beds_asc':
      queryBuilder = queryBuilder.order('bedrooms', { ascending: true })
      break
    case 'beds_desc':
      queryBuilder = queryBuilder.order('bedrooms', { ascending: false })
      break
    case 'available_first':
      queryBuilder = queryBuilder.order('status', { ascending: true }).order('created_at', { ascending: false })
      break
    case 'created_at_desc':
    default:
      queryBuilder = queryBuilder.order('created_at', { ascending: false })
      break
  }
  
  // Pagination
  const limit = 50
  const offset = (page - 1) * limit
  queryBuilder = queryBuilder.range(offset, offset + limit - 1)
  
  // Execute query
  const { data: properties, error, count } = await queryBuilder
  
  if (error) {
    console.error('Error fetching properties:', error.message || error)
    // Return empty results on error
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1 bg-neutral-gray">
          <Suspense fallback={<div className="container-custom py-8">Loading...</div>}>
            <SearchResults
              initialProperties={[]}
              totalCount={0}
              searchLocation="All Areas"
              initialFilters={{
                query,
                city,
                state,
                zip,
                beds,
                baths,
                minSqft,
                maxSqft,
                statuses,
                petPolicy,
                propertyTypes,
                amenities,
                managementCompanies,
                sortBy,
              }}
            />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    )
  }
  
  // Get search location for display (city or query)
  const searchLocation = city || query || 'All Areas'
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        <Suspense fallback={<div className="container-custom py-8">Loading...</div>}>
          <SearchResults
            initialProperties={properties || []}
            totalCount={count || 0}
            searchLocation={searchLocation}
            initialFilters={{
              query,
              city,
              state,
              zip,
              beds,
              baths,
              minSqft,
              maxSqft,
              statuses,
              petPolicy,
              propertyTypes,
              amenities,
              managementCompanies,
              sortBy,
            }}
          />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}