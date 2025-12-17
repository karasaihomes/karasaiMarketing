'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Check } from 'lucide-react'
import AuthModal from '@/components/modals/AuthModal'
import { createClient } from '@/lib/supabase/client'
import type { Property } from '@/types/index'

interface PropertyCardProps {
  property: Property
  isCompared: boolean
  onToggleComparison: (id: string) => void
}

export default function PropertyCard({ property, isCompared, onToggleComparison }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const supabase = createClient()

  // Get image URL with fallback and cache-busting
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
    sessionStorage.setItem('from_search', 'true')
  }

  // Get status badge
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

  // Handle favorite/heart click
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsCheckingAuth(true)

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Check if user previously chose "Continue as Guest"
      const guestChoice = localStorage.getItem('karasai_guest_favorites')
      
      if (guestChoice === 'true') {
        // Handle guest favorites
        handleGuestFavorite()
      } else {
        // Show auth modal
        setShowAuthModal(true)
      }
    } else {
      // Handle authenticated favorite
      await handleAuthenticatedFavorite(user.id)
    }

    setIsCheckingAuth(false)
  }

  // Handle guest favorite (localStorage)
  const handleGuestFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('karasai_favorites') || '[]')
    
    if (favorites.includes(property.id)) {
      // Remove from favorites
      const updated = favorites.filter((id: string) => id !== property.id)
      localStorage.setItem('karasai_favorites', JSON.stringify(updated))
      setIsFavorited(false)
    } else {
      // Add to favorites
      favorites.push(property.id)
      localStorage.setItem('karasai_favorites', JSON.stringify(favorites))
      setIsFavorited(true)
    }
  }

  // Handle authenticated favorite (Supabase)
  const handleAuthenticatedFavorite = async (userId: string) => {
    const { data: existing } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', property.id)
      .single()

    if (existing) {
      // Remove from favorites
      await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', property.id)
      
      setIsFavorited(false)
    } else {
      // Add to favorites
      await supabase
        .from('saved_properties')
        .insert({
          user_id: userId,
          property_id: property.id,
        })
      
      setIsFavorited(true)
    }
  }

  // Handle auth modal choice
  const handleAuthChoice = (choice: 'signin' | 'guest') => {
    if (choice === 'guest') {
      localStorage.setItem('karasai_guest_favorites', 'true')
      handleGuestFavorite()
    }
    // If signin, modal will redirect to /login
    setShowAuthModal(false)
  }

  // Handle comparison checkbox
  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleComparison(property.id)
  }

  return (
    <>
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
              
              {/* Comparison Checkbox - Top Right */}
              <div 
                className="absolute right-2 top-2 z-10"
                onClick={handleComparisonClick}
              >
                <div
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded border-2 transition-all ${
                    isCompared
                      ? 'border-karasai-blue bg-karasai-blue'
                      : 'border-white bg-white/80 hover:bg-white'
                  }`}
                >
                  {isCompared && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </div>
              </div>
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
                
                {/* Heart Icon */}
                <button
                  onClick={handleFavoriteClick}
                  disabled={isCheckingAuth}
                  className="flex-shrink-0 transition-colors disabled:opacity-50"
                >
                  <Heart
                    className={`h-5 w-5 transition-all ${
                      isFavorited
                        ? 'fill-status-rented stroke-status-rented'
                        : 'stroke-neutral-dark/60 hover:stroke-status-rented'
                    }`}
                  />
                </button>
              </div>
              
              {/* Bed/Bath/Sqft */}
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">
                {property.bedrooms} BED / {property.bathrooms} BATH / {property.square_feet.toLocaleString()} SQ. FT.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onChoice={handleAuthChoice}
        />
      )}
    </>
  )
}