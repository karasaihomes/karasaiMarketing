'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Check, Minus } from 'lucide-react'
import type { Property } from '@/types/index'

interface ComparisonModalProps {
  properties: Property[]
  onClose: () => void
}

export default function ComparisonModal({ properties, onClose }: ComparisonModalProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="inline-block rounded-full bg-status-available px-3 py-1 text-xs font-semibold text-white">Available</span>
      case 'coming_soon':
        return <span className="inline-block rounded-full bg-status-coming px-3 py-1 text-xs font-semibold text-white">Coming Soon</span>
      case 'rented':
        return <span className="inline-block rounded-full bg-status-rented px-3 py-1 text-xs font-semibold text-white">Occupied</span>
    }
  }

  const hasAmenity = (property: Property, amenity: string) => {
    return property.amenities && property.amenities.includes(amenity)
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-gray bg-white px-6 py-4">
          <h2 className="text-2xl font-semibold text-neutral-dark">
            Compare Properties
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-dark/60 transition-colors hover:bg-neutral-gray hover:text-neutral-dark"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-gray bg-neutral-gray/30">
                <th className="sticky left-0 z-10 bg-neutral-gray/30 px-6 py-4 text-left">
                  <span className="text-sm font-medium text-neutral-dark/60">Feature</span>
                </th>
                {properties.map((property) => {
                  const imageUrl = property.primary_image_url || 
                                   (property.images && property.images.length > 0 ? property.images[0] : null) ||
                                   '/images/properties/coming_soon_image.png'
                  
                  return (
                    <th key={property.id} className="px-4 py-4">
                      <div className="text-center">
                        <div className="relative mx-auto mb-3 h-32 w-full max-w-xs overflow-hidden rounded-lg">
                          <Image
                            src={imageUrl}
                            alt={property.address}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-sm font-semibold text-karasai-blue hover:underline"
                        >
                          {property.address}
                        </Link>
                        <p className="text-xs text-neutral-dark/60">
                          {property.city}, {property.state}
                        </p>
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray">
              {/* Status */}
              <tr>
                <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-neutral-dark">
                  Status
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center">
                    {getStatusBadge(property.status)}
                  </td>
                ))}
              </tr>

              {/* Rent */}
              <tr className="bg-neutral-gray/10">
                <td className="sticky left-0 z-10 bg-neutral-gray/10 px-6 py-4 text-sm font-medium text-neutral-dark">
                  Monthly Rent
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-lg font-semibold text-karasai-blue">
                    {formatPrice(property.rent)}
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr>
                <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-neutral-dark">
                  Bedrooms
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-neutral-dark">
                    {property.bedrooms}
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr className="bg-neutral-gray/10">
                <td className="sticky left-0 z-10 bg-neutral-gray/10 px-6 py-4 text-sm font-medium text-neutral-dark">
                  Bathrooms
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-neutral-dark">
                    {property.bathrooms}
                  </td>
                ))}
              </tr>

              {/* Square Feet */}
              <tr>
                <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-neutral-dark">
                  Square Feet
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-neutral-dark">
                    {property.square_feet.toLocaleString()} sq ft
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr className="bg-neutral-gray/10">
                <td className="sticky left-0 z-10 bg-neutral-gray/10 px-6 py-4 text-sm font-medium text-neutral-dark">
                  Property Type
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-sm text-neutral-dark">
                    {property.property_type ? property.property_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}
                  </td>
                ))}
              </tr>

              {/* Pet Policy */}
              <tr>
                <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-neutral-dark">
                  Pet Policy
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-sm text-neutral-dark">
                    {property.pet_policy ? property.pet_policy.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}
                  </td>
                ))}
              </tr>

              {/* Parking */}
              <tr className="bg-neutral-gray/10">
                <td className="sticky left-0 z-10 bg-neutral-gray/10 px-6 py-4 text-sm font-medium text-neutral-dark">
                  Parking
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center text-sm text-neutral-dark">
                    {property.parking_type ? property.parking_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}
                  </td>
                ))}
              </tr>

              {/* Amenities Header */}
              <tr>
                <td colSpan={properties.length + 1} className="bg-karasai-light/30 px-6 py-3 text-sm font-semibold text-neutral-dark">
                  Amenities
                </td>
              </tr>

              {/* Individual Amenities */}
              {['parking', 'laundry_in_unit', 'ac', 'pool', 'yard', 'dishwasher', 'fireplace'].map((amenity, idx) => (
                <tr key={amenity} className={idx % 2 === 0 ? 'bg-neutral-gray/10' : ''}>
                  <td className={`sticky left-0 z-10 px-6 py-3 text-sm font-medium text-neutral-dark ${idx % 2 === 0 ? 'bg-neutral-gray/10' : 'bg-white'}`}>
                    {amenity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </td>
                  {properties.map((property) => (
                    <td key={property.id} className="px-4 py-3 text-center">
                      {hasAmenity(property, amenity) ? (
                        <Check className="mx-auto h-5 w-5 text-status-available" />
                      ) : (
                        <Minus className="mx-auto h-5 w-5 text-neutral-dark/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* View Property Links */}
              <tr>
                <td className="sticky left-0 z-10 bg-white px-6 py-4"></td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-4 text-center">
                    <Link
                      href={`/properties/${property.id}`}
                      className="inline-block rounded-md bg-karasai-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-karasai-blue/90"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}