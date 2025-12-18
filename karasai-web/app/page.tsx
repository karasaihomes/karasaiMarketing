'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SearchBar from '@/components/search/SearchBar'

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const router = useRouter()

  // Lock body scroll when modal is open (important for mobile)
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isVideoModalOpen])

  // Handle autocomplete result selection
  const handleSelectResult = (result: any) => {
    // Navigate to search page with appropriate query parameter
    if (result.type === 'city') {
      router.push(`/search?city=${encodeURIComponent(result.city)}`)
    } else if (result.type === 'zip') {
      router.push(`/search?zip=${encodeURIComponent(result.value)}`)
    } else if (result.type === 'address') {
      router.push(`/search?q=${encodeURIComponent(result.value)}`)
    }
  }

  // Handle manual search (Enter key or button click)
  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative bg-white py-8">
          <div className="container-custom">
            <div className="relative h-[400px] overflow-hidden rounded-lg sm:h-[450px] md:h-[500px]">
              <Image
                src="/images/hero/header-banner.jpg"
                alt="Hero Banner"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-karasai-blue/40 to-transparent" />
              
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
                  Verify Your Rental Home in Seconds
                </h1>
                <p className="mb-8 text-lg md:text-xl">
                  We make it simple to find verified rental homes
                </p>
                
                {/* Search Box with Autocomplete */}
                <div className="w-full max-w-2xl px-4 text-karasai-blue">
                  <SearchBar
                    buttonText="Search"
                    placeholder="City, state, or ZIP"
                    onSelectResult={handleSelectResult}
                    onSearch={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="bg-white py-12 pb-16">
          <div className="container-custom">
            <h2 className="mb-12 text-center text-2xl font-medium text-karasai-blue">
              Here are some homes we think you'll love.
            </h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Property Card 1 */}
              <Link href="/properties/1" className="group">
                <div className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src="/images/properties/charlotte-home.jpg"
                      alt="Charlotte, NC home"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white p-4 text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-neutral-dark">
                      Charlotte, NC
                    </p>
                  </div>
                </div>
              </Link>

              {/* Property Card 2 */}
              <Link href="/properties/2" className="group">
                <div className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src="/images/properties/odessa-home.jpg"
                      alt="Odessa, TX home"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white p-4 text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-neutral-dark">
                      Odessa, TX
                    </p>
                  </div>
                </div>
              </Link>

              {/* Property Card 3 */}
              <Link href="/properties/3" className="group">
                <div className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src="/images/properties/tulsa-home.jpg"
                      alt="Tulsa, OK home"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white p-4 text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-neutral-dark">
                      Tulsa, OK
                    </p>
                  </div>
                </div>
              </Link>

              {/* Property Card 4 */}
              <Link href="/properties/4" className="group">
                <div className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src="/images/properties/atlanta-home.jpg"
                      alt="Atlanta, GA home"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white p-4 text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-neutral-dark">
                      Atlanta, GA
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Video Testimonial Section */}
        <section className="relative bg-white pb-16 pt-8">
          <div className="container-custom">
            {/* Video positioned to extend above the light blue section */}
            <div className="relative z-10 mx-auto aspect-video w-[85%] overflow-hidden rounded-lg shadow-2xl md:w-[75%] lg:w-[65%]">
              <Image
                src="/images/testimonials/karasai_video.png"
                alt="Video testimonial"
                fill
                className="object-cover"
              />
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-2xl backdrop-blur-sm transition-transform hover:scale-110">
                  <Play className="ml-1 h-10 w-10 fill-white text-white" />
                </div>
              </button>
            </div>
            
            {/* Blue background box that sits behind/below video */}
            <div className="relative -mt-32 rounded-lg bg-karasai-light pb-16 pt-48 md:-mt-64 md:pb-24 md:pt-80 lg:-mt-80 lg:pt-96">
              {/* Text below video */}
              <div className="mx-auto w-[85%] text-center md:w-[75%] lg:w-[65%]">
                <p className="text-sm leading-relaxed text-neutral-dark/70">
                  We've partnered with some of the industry's largest owners and operators of rental homes. 
                  Listen to how Karasai is changing the way people find and verify their new rental home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Karasai Works Section - Gray background */}
        <section className="bg-neutral-gray py-16">
          <div className="container-custom">
            <div className="mx-auto w-[95%] md:w-[85%] lg:w-[70%]">
              <h2 className="mb-8 text-left text-3xl font-bold uppercase tracking-wide text-karasai-blue">
                How Karasai Works
              </h2>
              
              <div className="space-y-6 text-left text-neutral-dark/80">
                <p>
                  We hate hearing about people who have their hard earned money taken by unscrupulous people. 
                  So we created KARASAI, a verification service that exists to ensure you are dealing directly 
                  with the owner or landlord of a rental property.
                </p>
                
                <p>
                  We've done the hard work for you, and verified every single home in our database of rental 
                  properties that covers the entire United States. Each home listed on KARASAI is actually 
                  owned or operated by the stated landlord and ensure their contact information is current.
                </p>
                
                <p>
                  Once we've verified a home is a legitimate rental home, it's added to our searchable database 
                  to allow you to not only find a home, but also double check to ensure the person you're speaking 
                  with is the actual owner or operator of the home. We guarantee it.
                </p>
                
                <p>
                  Many of the homes listed are owned and operated by corporate entities, so you may be dealing 
                  with a group of people who represent that organization, but rest assured you are dealing with 
                  the legitimate owner and operator of that home.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute right-2 top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-dark shadow-xl transition-all hover:scale-110 hover:bg-neutral-gray md:-right-12 md:-top-12"
              aria-label="Close video"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </button>

            {/* Video Container */}
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl">
              {/* Self-hosted HTML5 Video */}
              <video
                className="h-full w-full"
                controls
                autoPlay
              >
                <source src="/videos/Rent_With_Confidence.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}