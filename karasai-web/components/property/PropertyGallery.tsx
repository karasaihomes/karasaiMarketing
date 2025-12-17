'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  status: string
}

export default function PropertyGallery({ images, status }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Handle touch swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next image
      nextImage()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right - previous image
      previousImage()
    }
  }

  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'available':
        return (
          <span className="absolute left-0 top-0 z-10 bg-status-available px-4 py-1.5 text-xs font-semibold uppercase text-white sm:px-6 sm:py-2 sm:text-sm">
            Available
          </span>
        )
      case 'coming_soon':
        return (
          <span className="absolute left-0 top-0 z-10 bg-status-coming px-4 py-1.5 text-xs font-semibold uppercase text-white sm:px-6 sm:py-2 sm:text-sm">
            Coming Soon
          </span>
        )
      case 'rented':
        return (
          <span className="absolute left-0 top-0 z-10 bg-status-rented px-4 py-1.5 text-xs font-semibold uppercase text-white sm:px-6 sm:py-2 sm:text-sm">
            Occupied
          </span>
        )
    }
  }

  return (
    <div className="mb-6">
      <div className="relative overflow-hidden rounded-lg">
        {/* Main Image - Responsive Height */}
        <div 
          className="relative h-64 sm:h-80 md:h-96"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
          
          {/* Status Badge */}
          {getStatusBadge()}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Navigation Arrows - Larger touch targets on mobile */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white sm:left-4 sm:p-3"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-dark sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white sm:right-4 sm:p-3"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-neutral-dark sm:h-6 sm:w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip - Better mobile scrolling */}
        {images.length > 1 && (
          <div className="scrollbar-hide mt-2 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md transition-opacity sm:h-20 sm:w-32 ${
                  index === currentIndex ? 'ring-2 ring-karasai-blue' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}