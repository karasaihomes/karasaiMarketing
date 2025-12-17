'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import PropertyCard from './PropertyCard'
import FilterSidebar from './FilterSidebar'
import FilterDrawer from './FilterDrawer'
import ComparisonTray from './ComparisonTray'
import SearchBar from './SearchBar'
import { createClient } from '@/lib/supabase/client'
import type { Property, Filters } from '@/types/index'

interface SearchResultsProps {
  initialProperties: Property[]
  totalCount: number
  searchLocation: string
  initialFilters: Filters
}

export default function SearchResults({
  initialProperties,
  totalCount,
  searchLocation,
  initialFilters,
}: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [properties, setProperties] = useState(initialProperties)
  const [filters, setFilters] = useState(initialFilters)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [comparedProperties, setComparedProperties] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(totalCount > 50)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  // Track previous filters to detect changes
  const prevFiltersRef = useRef(filters)

  // Handle search from SearchBar
  const handleSearch = (query: string) => {
    setFilters({ ...filters, query })
  }

  // OPTIMIZATION: Fetch only columns needed for property cards
  const fetchProperties = useCallback(async (filterParams: Filters) => {
    setIsFiltering(true)
    
    let queryBuilder = supabase
      .from('properties')
      // Only select columns used by PropertyCard - reduces payload size
      .select(`
        id,
        address,
        city,
        state,
        zip,
        bedrooms,
        bathrooms,
        square_feet,
        status,
        primary_image_url,
        images,
        rent
      `, { count: 'exact' })

    // Apply filters
    if (filterParams.query) {
      queryBuilder = queryBuilder.or(`city.ilike.%${filterParams.query}%,state.ilike.%${filterParams.query}%,zip.ilike.%${filterParams.query}%,address.ilike.%${filterParams.query}%`)
    }
    if (filterParams.city) queryBuilder = queryBuilder.ilike('city', `%${filterParams.city}%`)
    if (filterParams.state) queryBuilder = queryBuilder.ilike('state', `%${filterParams.state}%`)
    if (filterParams.zip) queryBuilder = queryBuilder.eq('zip', filterParams.zip)
    if (filterParams.beds.length > 0) queryBuilder = queryBuilder.in('bedrooms', filterParams.beds.map(b => parseFloat(b)))
    if (filterParams.baths.length > 0) queryBuilder = queryBuilder.in('bathrooms', filterParams.baths.map(b => parseFloat(b)))
    if (filterParams.minSqft) queryBuilder = queryBuilder.gte('square_feet', filterParams.minSqft)
    if (filterParams.maxSqft) queryBuilder = queryBuilder.lte('square_feet', filterParams.maxSqft)
    if (filterParams.statuses.length > 0) queryBuilder = queryBuilder.in('status', filterParams.statuses)
    if (filterParams.petPolicy.length > 0) queryBuilder = queryBuilder.in('pet_policy', filterParams.petPolicy)
    if (filterParams.propertyTypes.length > 0) queryBuilder = queryBuilder.in('property_type', filterParams.propertyTypes)
    if (filterParams.managementCompanies.length > 0) queryBuilder = queryBuilder.in('management_company_id', filterParams.managementCompanies)
    
    // Amenities
    if (filterParams.amenities.length > 0) {
      filterParams.amenities.forEach(amenity => {
        queryBuilder = queryBuilder.contains('amenities', [amenity])
      })
    }

    // Sorting
    switch (filterParams.sortBy) {
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
      default:
        queryBuilder = queryBuilder.order('created_at', { ascending: false })
        break
    }

    queryBuilder = queryBuilder.range(0, 49)

    const { data, error, count } = await queryBuilder

    if (!error && data) {
      setProperties(data as Property[])
      setPage(1)
      setHasMore((count || 0) > 50)
    }
    
    setIsFiltering(false)
    
    // Update URL
    const params = new URLSearchParams()
    if (filterParams.query) params.set('q', filterParams.query)
    if (filterParams.city) params.set('city', filterParams.city)
    if (filterParams.state) params.set('state', filterParams.state)
    if (filterParams.zip) params.set('zip', filterParams.zip)
    if (filterParams.beds.length > 0) params.set('beds', filterParams.beds.join(','))
    if (filterParams.baths.length > 0) params.set('baths', filterParams.baths.join(','))
    if (filterParams.minSqft) params.set('min_sqft', filterParams.minSqft.toString())
    if (filterParams.maxSqft) params.set('max_sqft', filterParams.maxSqft.toString())
    if (filterParams.statuses.length > 0 && filterParams.statuses.length < 3) {
      params.set('status', filterParams.statuses.join(','))
    }
    if (filterParams.petPolicy.length > 0) params.set('pet_policy', filterParams.petPolicy.join(','))
    if (filterParams.propertyTypes.length > 0) params.set('property_type', filterParams.propertyTypes.join(','))
    if (filterParams.amenities.length > 0) params.set('amenities', filterParams.amenities.join(','))
    if (filterParams.managementCompanies.length > 0) params.set('management_companies', filterParams.managementCompanies.join(','))
    if (filterParams.sortBy !== 'created_at_desc') params.set('sort', filterParams.sortBy)
    
    router.push(`/search?${params.toString()}`, { scroll: false })
  }, [supabase, router])

  // OPTIMIZATION: Smart debouncing - instant for buttons/checkboxes, debounced for text
  useEffect(() => {
    // Skip initial render
    if (prevFiltersRef.current === filters) {
      prevFiltersRef.current = filters
      return
    }

    const prev = prevFiltersRef.current
    prevFiltersRef.current = filters

    // Detect if change is from text input or instant filter
    const textFieldsChanged = 
      filters.query !== prev.query ||
      filters.city !== prev.city ||
      filters.state !== prev.state ||
      filters.zip !== prev.zip ||
      filters.minSqft !== prev.minSqft ||
      filters.maxSqft !== prev.maxSqft

    if (textFieldsChanged) {
      // Debounce text inputs (user might still be typing)
      const timer = setTimeout(() => {
        fetchProperties(filters)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      // Instant for checkboxes, buttons, dropdowns
      fetchProperties(filters)
    }
  }, [filters, fetchProperties])

  // Load more properties (infinite scroll)
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    const nextPage = page + 1
    const limit = 50
    const offset = (nextPage - 1) * limit

    let queryBuilder = supabase
      .from('properties')
      .select(`
        id,
        address,
        city,
        state,
        zip,
        bedrooms,
        bathrooms,
        square_feet,
        status,
        primary_image_url,
        images,
        rent
      `)

    // Apply all filters
    if (filters.query) {
      queryBuilder = queryBuilder.or(`city.ilike.%${filters.query}%,state.ilike.%${filters.query}%,zip.ilike.%${filters.query}%,address.ilike.%${filters.query}%`)
    }
    if (filters.city) queryBuilder = queryBuilder.ilike('city', `%${filters.city}%`)
    if (filters.state) queryBuilder = queryBuilder.ilike('state', `%${filters.state}%`)
    if (filters.zip) queryBuilder = queryBuilder.eq('zip', filters.zip)
    if (filters.beds.length > 0) queryBuilder = queryBuilder.in('bedrooms', filters.beds.map(b => parseFloat(b)))
    if (filters.baths.length > 0) queryBuilder = queryBuilder.in('bathrooms', filters.baths.map(b => parseFloat(b)))
    if (filters.minSqft) queryBuilder = queryBuilder.gte('square_feet', filters.minSqft)
    if (filters.maxSqft) queryBuilder = queryBuilder.lte('square_feet', filters.maxSqft)
    if (filters.statuses.length > 0) queryBuilder = queryBuilder.in('status', filters.statuses)
    if (filters.petPolicy.length > 0) queryBuilder = queryBuilder.in('pet_policy', filters.petPolicy)
    if (filters.propertyTypes.length > 0) queryBuilder = queryBuilder.in('property_type', filters.propertyTypes)
    if (filters.managementCompanies.length > 0) queryBuilder = queryBuilder.in('management_company_id', filters.managementCompanies)
    
    // Amenities
    if (filters.amenities.length > 0) {
      filters.amenities.forEach(amenity => {
        queryBuilder = queryBuilder.contains('amenities', [amenity])
      })
    }

    // Sorting
    switch (filters.sortBy) {
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
      default:
        queryBuilder = queryBuilder.order('created_at', { ascending: false })
        break
    }

    queryBuilder = queryBuilder.range(offset, offset + limit - 1)

    const { data, error } = await queryBuilder

    if (!error && data) {
      setProperties(prev => [...prev, ...data as Property[]])
      setPage(nextPage)
      setHasMore(data.length === limit)
    }

    setIsLoadingMore(false)
  }, [page, hasMore, isLoadingMore, filters, supabase])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = document.querySelector('#scroll-sentinel')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, loadMore])

  // Handle comparison toggle
  const toggleComparison = (propertyId: string) => {
    setComparedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId)
      } else if (prev.length < 4) {
        return [...prev, propertyId]
      }
      return prev
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      query: '',
      city: '',
      state: '',
      zip: '',
      beds: [],
      baths: [],
      minSqft: undefined,
      maxSqft: undefined,
      statuses: ['available', 'coming_soon', 'rented'],
      petPolicy: [],
      propertyTypes: [],
      amenities: [],
      managementCompanies: [],
      sortBy: 'created_at_desc',
    })
    setProperties(initialProperties)
    setPage(1)
    setHasMore(totalCount > 50)
  }

  // Count active filters
  const activeFilterCount = 
    (filters.beds.length > 0 ? 1 : 0) +
    (filters.baths.length > 0 ? 1 : 0) +
    (filters.minSqft ? 1 : 0) +
    (filters.maxSqft ? 1 : 0) +
    (filters.statuses.length < 3 ? 1 : 0) +
    (filters.petPolicy.length > 0 ? 1 : 0) +
    (filters.propertyTypes.length > 0 ? 1 : 0) +
    (filters.amenities.length > 0 ? 1 : 0) +
    (filters.managementCompanies.length > 0 ? 1 : 0)

  return (
    <>
      <div className="container-custom py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar & Mobile Filter Button */}
            <div className="mb-6 flex items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} initialValue={filters.query} />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex flex-shrink-0 items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-medium text-karasai-blue shadow-sm transition-colors hover:bg-karasai-light lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-karasai-blue px-2 py-0.5 text-xs text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-neutral-dark/60">
                {properties.length} of {totalCount} properties
              </p>
            </div>

            {/* Results Area - Relative for Loading Overlay */}
            <div className="relative min-h-[400px]">
              {/* No Results */}
              {properties.length === 0 && !isFiltering && (
                <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                  <h3 className="mb-2 text-lg font-medium text-neutral-dark">No properties found</h3>
                  <p className="mb-4 text-neutral-dark/60">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="rounded-md bg-karasai-blue px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-karasai-blue/90"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Property Grid */}
              {properties.length > 0 && (
                <>
                  {/* Loading Overlay */}
                  {isFiltering && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-karasai-blue border-t-transparent"></div>
                        <p className="text-sm font-medium text-karasai-blue">Updating results...</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isCompared={comparedProperties.includes(property.id)}
                        onToggleComparison={toggleComparison}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="mt-8 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-karasai-blue border-t-transparent"></div>
                </div>
              )}

              {/* Scroll Sentinel for Infinite Scroll */}
              <div id="scroll-sentinel" className="h-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />

      {/* Comparison Tray */}
      {comparedProperties.length > 0 && (
        <ComparisonTray
          propertyIds={comparedProperties}
          properties={properties.filter(p => comparedProperties.includes(p.id))}
          onRemove={(id) => setComparedProperties(prev => prev.filter(pid => pid !== id))}
          onClear={() => setComparedProperties([])}
        />
      )}
    </>
  )
}