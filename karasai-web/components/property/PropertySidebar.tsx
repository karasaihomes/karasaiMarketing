'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, Share2, Phone, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Property } from '@/types/index'
import AuthModal from '@/components/modals/AuthModal'
import AdSenseAd from '@/components/ads/AdSenseAd'
import { createClient } from '@/lib/supabase/client'

interface PropertySidebarProps {
  property: Property
  managementCompany: any
}

export default function PropertySidebar({ property, managementCompany }: PropertySidebarProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const supabase = createClient()

  // Initialize Mapbox
  useEffect(() => {
    if (!mapContainer.current || map.current) return
    
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    
    if (!mapboxToken) {
      console.error('Mapbox access token not found. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to environment variables.')
      return
    }

    mapboxgl.accessToken = mapboxToken

    // Default to property location, or fallback to center of US
    const lng = property.longitude || -98.5795
    const lat = property.latitude || 39.8283
    const zoom = property.longitude && property.latitude ? 14 : 3

    // Add a small delay to ensure container is fully rendered
    const timeoutId = setTimeout(() => {
      if (!mapContainer.current || map.current) return

      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom,
        })

        // Wait for map to load before adding markers
        map.current.on('load', () => {
          if (!map.current) return

          // Add marker if we have coordinates
          if (property.longitude && property.latitude) {
            new mapboxgl.Marker({ color: '#D93C04' })
              .setLngLat([property.longitude, property.latitude])
              .addTo(map.current)
          }

          // Add navigation controls
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        })
      } catch (error) {
        console.error('Error initializing Mapbox:', error)
      }
    }, 100)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [property.longitude, property.latitude])

  // Handle favorite click
  const handleFavoriteClick = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const guestChoice = localStorage.getItem('karasai_guest_favorites')
      
      if (guestChoice === 'true') {
        // Handle guest favorites
        const favorites = JSON.parse(localStorage.getItem('karasai_favorites') || '[]')
        const isFav = favorites.includes(property.id)
        
        if (isFav) {
          const updated = favorites.filter((id: string) => id !== property.id)
          localStorage.setItem('karasai_favorites', JSON.stringify(updated))
          setIsFavorited(false)
        } else {
          favorites.push(property.id)
          localStorage.setItem('karasai_favorites', JSON.stringify(favorites))
          setIsFavorited(true)
        }
      } else {
        setShowAuthModal(true)
      }
    } else {
      // Handle authenticated favorite
      const { data: existing } = await supabase
        .from('saved_properties')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', property.id)
        .single()

      if (existing) {
        await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', property.id)
        setIsFavorited(false)
      } else {
        await supabase
          .from('saved_properties')
          .insert({ user_id: user.id, property_id: property.id })
        setIsFavorited(true)
      }
    }
  }

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.address} - ${property.city}, ${property.state}`,
          text: `Check out this ${property.bedrooms}BR/${property.bathrooms}BA home for $${property.rent}/mo`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Handle call
  const handleCall = () => {
    if (managementCompany?.phone) {
      window.location.href = `tel:${managementCompany.phone}`
    }
  }

  // Handle auth modal choice
  const handleAuthChoice = (choice: 'signin' | 'guest') => {
    setShowAuthModal(false)
    
    if (choice === 'guest') {
      localStorage.setItem('karasai_guest_favorites', 'true')
      handleFavoriteClick()
    }
    // If 'signin', the AuthModal will handle navigation
  }

  // Track clicks for analytics
  const handleApplyClick = () => {
    console.log('Apply button clicked for property:', property.id)
  }

  const handleWebsiteClick = () => {
    console.log('Website link clicked for company:', managementCompany?.company_name)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Map */}
        <div className="rounded-lg bg-white p-4">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80">
            <div ref={mapContainer} className="h-full w-full" />
            
            {/* Action Buttons Overlay */}
            <div className="absolute right-4 top-4 space-y-2">
              <button
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-blue shadow-lg transition-transform hover:scale-110"
                aria-label="Share property"
              >
                <Share2 className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 ${
                  isFavorited ? 'bg-status-rented' : 'bg-karasai-blue'
                }`}
                aria-label="Save to favorites"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-white' : ''} text-white`} />
              </button>
              {managementCompany?.phone && (
                <button
                  onClick={handleCall}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-blue shadow-lg transition-transform hover:scale-110"
                  aria-label="Call management company"
                >
                  <Phone className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Management Company Info - Moved from main content */}
        {managementCompany && (
          <div className="rounded-lg bg-karasai-light p-4">
            <div className="mb-3 flex items-center gap-3">
              {/* Company Logo */}
              {managementCompany.logo_url && (
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image
                    src={managementCompany.logo_url}
                    alt={managementCompany.company_name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
              
              {/* Company Name */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-dark/60">
                  Owned/Managed By:
                </h3>
                <p className="text-sm font-bold text-karasai-blue sm:text-base">
                  {managementCompany.company_name}
                </p>
              </div>
            </div>

            {/* Contact Information & Actions */}
            <div className="space-y-2">
              {/* Apply Now Button - Larger on mobile */}
              {managementCompany.website && (
                <a
                  href={managementCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleApplyClick}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-karasai-blue px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  Apply Now
                </a>
              )}

              {/* Phone - Larger touch target */}
              {managementCompany.phone && (
                <a
                  href={`tel:${managementCompany.phone}`}
                  className="flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-white bg-white p-3 text-sm transition-all hover:border-karasai-blue hover:shadow-md sm:p-3 sm:text-xs"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-karasai-light">
                    <Phone className="h-4 w-4 text-karasai-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-neutral-dark sm:text-xs">{managementCompany.phone}</p>
                  </div>
                </a>
              )}

              {/* Email - Larger touch target */}
              {managementCompany.email && (
                <a
                  href={`mailto:${managementCompany.email}`}
                  className="flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-white bg-white p-3 text-sm transition-all hover:border-karasai-blue hover:shadow-md sm:p-3 sm:text-xs"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-karasai-light">
                    <Mail className="h-4 w-4 text-karasai-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                      Email
                    </p>
                    <p className="text-sm font-bold text-neutral-dark sm:text-xs">{managementCompany.email}</p>
                  </div>
                </a>
              )}

              {/* Website Link - Larger touch target */}
              {managementCompany.website && (
                <a
                  href={managementCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWebsiteClick}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border-2 border-white bg-white p-3 text-sm transition-all hover:border-karasai-blue hover:shadow-md sm:p-3 sm:text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-karasai-light">
                      <ExternalLink className="h-4 w-4 text-karasai-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                        Website
                      </p>
                      <p className="text-sm font-bold text-karasai-blue sm:text-xs">
                        Visit Website
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-3 w-3 text-neutral-dark/40" />
                </a>
              )}
            </div>

            {/* Verification Badge */}
            <div className="mt-3 rounded-lg border-2 border-white bg-white p-3 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-karasai-blue sm:text-xs">
                ✓ Verified by Karasai
              </p>
              <p className="mt-1 text-xs text-neutral-dark/60">
                Authentic contact info
              </p>
            </div>
          </div>
        )}

        {/* Google AdSense Ad 1 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <AdSenseAd 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 || 'DEFAULT_SLOT_1'} 
            style={{ display: 'block', minHeight: '250px' }}
            className="w-full"
          />
        </div>

        {/* Google AdSense Ad 2 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <AdSenseAd 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_2 || 'DEFAULT_SLOT_2'} 
            style={{ display: 'block', minHeight: '250px' }}
            className="w-full"
          />
        </div>
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