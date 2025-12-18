'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'

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
}

interface SavedPropertyCardProps {
  property: Property
  onRemove: () => void
}

export default function SavedPropertyCard({ property, onRemove }: SavedPropertyCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  // Get image URL with fallback and cache-busting (matching search results)
  const getImageUrl = () => {
    const baseUrl = property.primary_image_url || 
                    (property.images && property.images.length > 0 ? property.images[0] : null) ||
                    '/images/properties/coming_soon_image.png'
    
    // Add cache-busting parameter for Supabase images
    if (baseUrl && baseUrl.includes('supabase') && property.updated_at) {
      const timestamp = new Date(property.updated_at).getTime()
      return `${baseUrl}?t=${timestamp}`
    }
    
    return baseUrl
  }
  
  const imageUrl = getImageUrl()

  // Handle property click - Set flag for "Back to Results" button
  const handlePropertyClick = () => {
    sessionStorage.setItem('from_dashboard', 'true')
  }

  // Get status badge (matching search results)
  const getStatusBadge = () => {
    switch (property.status) {
      case 'available':
        return (
          <span className="absolute left-0 top-0 bg-status-available px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Available
          </span>
        )
      case 'coming_soon':
        return (
          <span className="absolute left-0 top-0 bg-status-coming px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Coming Soon
          </span>
        )
      case 'rented':
        return (
          <span className="absolute left-0 top-0 bg-status-rented px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Occupied
          </span>
        )
    }
  }

  // Handle remove click
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Remove this property from your saved homes?')) {
      return
    }

    setIsRemoving(true)
    await onRemove()
  }

  return (
    <div className="group relative">
      <Link 
        href={`/properties/${property.id}`}
        onClick={handlePropertyClick}
      >
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
          {/* Image */}
          <div className="relative h-48">
            <Image
              src={imageUrl}
              alt={property.address}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            
            {/* Status Badge */}
            {getStatusBadge()}
            
            {/* Heart Icon - Remove from Saved */}
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="absolute right-2 top-2 z-10 flex-shrink-0 transition-colors disabled:opacity-50"
            >
              {isRemoving ? (
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              ) : (
                <Heart
                  className="h-5 w-5 fill-status-rented stroke-status-rented transition-all hover:scale-110"
                />
              )}
            </button>
          </div>
          
          {/* Property Details */}
          <div className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                  {property.address}
                </h3>
                <p className="text-xs uppercase tracking-wide text-neutral-dark/60">
                  {property.city}, {property.state} {property.zip}
                </p>
              </div>
            </div>
            
            {/* Bed/Bath/Sqft */}
            <p className="text-xs uppercase tracking-wide text-neutral-dark/60">
              {property.bedrooms} BED / {property.bathrooms} BATH / {property.square_feet.toLocaleString()} SQ. FT.
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}