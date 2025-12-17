'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import ComparisonModal from './ComparisonModal'
import type { Property } from '@/types/index'

interface ComparisonTrayProps {
  propertyIds: string[]
  properties: Property[]
  onRemove: (id: string) => void
  onClear: () => void
}

export default function ComparisonTray({ propertyIds, properties, onRemove, onClear }: ComparisonTrayProps) {
  const [showModal, setShowModal] = useState(false)

  if (propertyIds.length === 0) return null

  return (
    <>
      {/* Sticky Tray */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-gray bg-white shadow-lg">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Property Thumbnails */}
            <div className="flex flex-1 items-center gap-3 overflow-x-auto">
              <div className="flex-shrink-0">
                <p className="text-sm font-medium text-neutral-dark">
                  Compare ({propertyIds.length}/4)
                </p>
              </div>
              
              <div className="flex gap-2">
                {properties.map((property) => {
                  const imageUrl = property.primary_image_url || 
                                   (property.images && property.images.length > 0 ? property.images[0] : null) ||
                                   '/images/properties/coming_soon_image.png'
                  
                  return (
                    <div key={property.id} className="relative flex-shrink-0">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-gray">
                        <Image
                          src={imageUrl}
                          alt={property.address}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => onRemove(property.id)}
                        className="absolute -right-1 -top-1 rounded-full bg-neutral-dark p-0.5 text-white transition-colors hover:bg-status-rented"
                        aria-label="Remove from comparison"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                
                {/* Empty Slots */}
                {Array.from({ length: 4 - propertyIds.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-16 w-16 flex-shrink-0 rounded-md border-2 border-dashed border-neutral-gray bg-neutral-gray/20"
                  />
                ))}
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                onClick={onClear}
                className="rounded-md border border-neutral-dark/20 bg-white px-4 py-2 text-sm font-medium text-neutral-dark transition-colors hover:bg-neutral-gray"
              >
                Clear
              </button>
              <button
                onClick={() => setShowModal(true)}
                disabled={propertyIds.length < 2}
                className="flex items-center gap-2 rounded-md bg-karasai-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-karasai-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showModal && (
        <ComparisonModal
          properties={properties}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}