'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import SavedPropertyCard from './SavedPropertyCard'
import EmptyState from './EmptyState'
import { Loader2 } from 'lucide-react'

interface Property {
  id: string
  address: string
  city: string
  state: string
  zip: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  rent: number
  status: string
  primary_image_url: string | null
  images: string[] | null
  property_type: string
  updated_at?: string
  saved_at?: string
}

export default function DashboardClient() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      router.push('/')
      return
    }

    if (user) {
      fetchSavedProperties()
    }
  }, [user, authLoading, router])

  const fetchSavedProperties = async () => {
    try {
      const supabase = createClient()

      // Fetch saved properties with join to properties table
      // Include images and updated_at for proper display
      const { data, error } = await supabase
        .from('saved_properties')
        .select(`
          saved_at,
          properties (
            id,
            address,
            city,
            state,
            zip,
            bedrooms,
            bathrooms,
            square_feet,
            rent,
            status,
            primary_image_url,
            images,
            property_type,
            updated_at
          )
        `)
        .eq('user_id', user?.id)
        .order('saved_at', { ascending: false })

      if (error) throw error

      // Flatten the data structure
      const formattedProperties = data?.map((item: any) => ({
        ...item.properties,
        saved_at: item.saved_at,
      })) || []

      setProperties(formattedProperties)
    } catch (error: any) {
      console.error('Error fetching saved properties:', error)
      setError('Failed to load saved properties')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveProperty = async (propertyId: string) => {
    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user?.id)
        .eq('property_id', propertyId)

      if (error) throw error

      // Remove from local state
      setProperties((prev) => prev.filter((p) => p.id !== propertyId))
    } catch (error: any) {
      console.error('Error removing property:', error)
      alert('Failed to remove property. Please try again.')
    }
  }

  // Show loading while checking auth
  if (authLoading || isLoading) {
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

  // Show error state
  if (error) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <div className="rounded-lg border-2 border-status-rented bg-status-rented/10 p-6 text-center">
            <p className="text-sm text-status-rented">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-karasai-blue px-6 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Show empty state
  if (properties.length === 0) {
    return <EmptyState />
  }

  // Show saved properties
  return (
    <section className="py-12">
      <div className="container-custom">
        {/* Stats */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-neutral-dark/70">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {/* Properties Grid - Matching search results layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <SavedPropertyCard
              key={property.id}
              property={property}
              onRemove={() => handleRemoveProperty(property.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}