'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Loader2, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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

export default function VerifySearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [foundProperty, setFoundProperty] = useState<Property | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchPerformed(false)
    setFoundProperty(null)

    try {
      const supabase = createClient()

      // Search for property by address
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`address.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,zip.eq.${searchQuery}`)
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows, not an actual error
        throw error
      }

      setFoundProperty(data || null)
      setSearchPerformed(true)
    } catch (error) {
      console.error('Search error:', error)
      setFoundProperty(null)
      setSearchPerformed(true)
    } finally {
      setIsSearching(false)
    }
  }

  // Get image URL with fallback
  const getImageUrl = (property: Property) => {
    const baseUrl = property.primary_image_url || 
                    (property.images && property.images.length > 0 ? property.images[0] : null) ||
                    '/images/properties/coming_soon_image.png'
    
    if (baseUrl && baseUrl.includes('supabase') && property.updated_at) {
      const timestamp = new Date(property.updated_at).getTime()
      return `${baseUrl}?t=${timestamp}`
    }
    
    return baseUrl
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-block rounded-full bg-status-available px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Available
          </span>
        )
      case 'coming_soon':
        return (
          <span className="inline-block rounded-full bg-status-coming px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Coming Soon
          </span>
        )
      case 'rented':
        return (
          <span className="inline-block rounded-full bg-status-rented px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Occupied
          </span>
        )
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-karasai-light/30 to-white py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #4E70C6 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Hero Content */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-5xl">
            Verify a Rental Home
          </h1>
          <p className="mb-8 text-base leading-relaxed text-neutral-dark/70 md:text-lg">
            Stop rental scams before they start. Search any property address to instantly verify if it's listed with verified property management companies.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter property address, city, or ZIP code..."
                className="w-full rounded-lg border-2 border-karasai-blue bg-white px-6 py-4 pr-24 text-base text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none focus:ring-2 focus:ring-karasai-blue/20"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg bg-karasai-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Verify
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searchPerformed && (
            <div className="mx-auto max-w-2xl">
              {foundProperty ? (
                // Property Found
                <div className="overflow-hidden rounded-lg border-2 border-status-available bg-white shadow-lg">
                  {/* Success Header */}
                  <div className="bg-status-available px-6 py-4">
                    <div className="flex items-center justify-center gap-3 text-white">
                      <CheckCircle className="h-6 w-6" />
                      <span className="text-lg font-bold uppercase tracking-wide">
                        ✓ Verified Property
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="mb-4 flex flex-col gap-4 md:flex-row">
                      {/* Property Image */}
                      <div className="relative h-48 w-full overflow-hidden rounded-lg md:w-48">
                        <Image
                          src={getImageUrl(foundProperty)}
                          alt={foundProperty.address}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute left-2 top-2">
                          {getStatusBadge(foundProperty.status)}
                        </div>
                      </div>

                      {/* Property Info */}
                      <div className="flex-1 text-left">
                        <h3 className="mb-2 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                          {foundProperty.address}
                        </h3>
                        <p className="mb-3 text-sm uppercase tracking-wide text-neutral-dark/60">
                          {foundProperty.city}, {foundProperty.state} {foundProperty.zip}
                        </p>
                        <div className="mb-3 flex flex-wrap gap-4 text-sm text-neutral-dark/80">
                          <span>{foundProperty.bedrooms} Bed</span>
                          <span>•</span>
                          <span>{foundProperty.bathrooms} Bath</span>
                          <span>•</span>
                          <span>{foundProperty.square_feet.toLocaleString()} Sq. Ft.</span>
                        </div>
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-karasai-blue">
                            ${foundProperty.rent.toLocaleString()}<span className="text-base">/mo</span>
                          </span>
                        </div>

                        {/* View Details Button */}
                        <Link
                          href={`/properties/${foundProperty.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-karasai-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
                        >
                          View Full Details
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>

                    {/* Trust Message */}
                    <div className="mt-4 rounded-lg bg-karasai-light/20 p-4 text-center">
                      <p className="text-sm text-neutral-dark/80">
                        <strong className="text-karasai-blue">✓ This property is verified</strong> and managed by a legitimate property management company in our database.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Property Not Found
                <div className="overflow-hidden rounded-lg border-2 border-status-rented bg-white shadow-lg">
                  {/* Not Found Header */}
                  <div className="bg-status-rented px-6 py-4">
                    <div className="flex items-center justify-center gap-3 text-white">
                      <XCircle className="h-6 w-6" />
                      <span className="text-lg font-bold uppercase tracking-wide">
                        Not Verified
                      </span>
                    </div>
                  </div>

                  {/* Not Found Message */}
                  <div className="p-8 text-center">
                    <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                      Property Not Found in Our Database
                    </h3>
                    <p className="mb-6 text-base leading-relaxed text-neutral-dark/70">
                      We couldn't find "<strong>{searchQuery}</strong>" in our verified database. This doesn't necessarily mean it's a scam, but we recommend exercising caution.
                    </p>

                    {/* Warning Box */}
                    <div className="mb-6 rounded-lg border-2 border-status-coming bg-status-coming/10 p-4">
                      <h4 className="mb-2 text-sm font-bold uppercase text-status-coming">
                        ⚠️ Rental Scam Warning Signs
                      </h4>
                      <ul className="space-y-1 text-left text-sm text-neutral-dark/80">
                        <li>• Asking for payment before viewing the property</li>
                        <li>• Price significantly below market rate</li>
                        <li>• Landlord claims to be out of town/country</li>
                        <li>• Pressure to act quickly without proper documentation</li>
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Link
                        href="/search"
                        className="flex items-center justify-center gap-2 rounded-lg bg-karasai-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
                      >
                        <Search className="h-5 w-5" />
                        Browse Verified Properties
                      </Link>
                      <Link
                        href="/list-your-home"
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-karasai-blue transition-all hover:bg-karasai-light"
                      >
                        List Your Property
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}