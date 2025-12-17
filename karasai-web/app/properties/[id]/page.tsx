import Image from 'next/image'
import Link from 'next/link'
import { Heart, Home, Car, ChevronLeft, ChevronRight, Share2, Phone, ExternalLink } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        <div className="container-custom py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Property Image Gallery */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-96">
                    <Image
                      src="https://placehold.co/1200x600/BFDBF7/333?text=6342+N+11th+St"
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                    {/* Available Badge */}
                    <span className="absolute left-0 top-0 bg-status-available px-6 py-2 text-sm font-semibold uppercase text-white">
                      Available
                    </span>
                    
                    {/* Navigation Arrows */}
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-colors hover:bg-white">
                      <ChevronLeft className="h-6 w-6 text-neutral-dark" />
                    </button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-colors hover:bg-white">
                      <ChevronRight className="h-6 w-6 text-neutral-dark" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Header */}
              <div className="mb-6 rounded-lg bg-white p-6">
                <h1 className="mb-2 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
                  6342 N. 11TH STREET
                </h1>
                <p className="mb-4 text-sm uppercase tracking-wide text-neutral-dark/60">
                  PHOENIX, AZ 85014
                </p>
                
                <div className="mb-4 flex items-center gap-6 text-sm uppercase tracking-wide text-neutral-dark">
                  <span className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    3 BED / 2 BATH / 1,672 SQ. FT.
                  </span>
                  <span className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    YES
                  </span>
                  <span className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    2 CAR
                  </span>
                </div>
              </div>

              {/* Management Company Info */}
              <div className="mb-6 rounded-lg bg-karasai-light p-6">
                <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                  Owned/Managed By: Progress Residential
                </h2>
                
                <div className="mb-4 space-y-2 text-sm text-neutral-dark">
                  <p>
                    <span className="font-semibold">APPLICATION:</span> RentProgress.com/6342N11STAZ_apply
                  </p>
                  <p>
                    <span className="font-semibold">PHONE:</span> 833.PRG.RESS
                  </p>
                  <p>
                    <span className="font-semibold">WEBSITE:</span> RentProgress.com/6342N11STAZ
                  </p>
                </div>
              </div>

              {/* Property Description */}
              <div className="mb-6 rounded-lg bg-white p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-dark">
                  From the Property Owner/Manager:
                </h3>
                
                <div className="space-y-4 text-sm text-neutral-dark/80">
                  <p>
                    At Progress Residential your peace of mind and make your time in the home as convenient as possible. We offer a safe and secure online portal where you can place maintenance requests and pay online, multiple payment options, 24/7
                  </p>
                  
                  <p>
                    Emergency maintenance response team available even on weekends, and well-maintained homes with regular preventative maintenance.
                  </p>
                  
                  <p>
                    Always apply for your Progress Residential home through RentProgress.com or with the help of one of our licensed Leasing Specialists. Progress Residential does not advertise on Craigslist and we will never ask you to wire money.
                  </p>
                  
                  <p>
                    Interested in this home? You clearly have exceptional taste. Like all our homes, this one features a great location in a desirable neighborhood, a comfortable layout with good-sized bedrooms and bathrooms, a great kitchen with plenty of counter and cabinet space, many recently updated and upgraded features, central HVAC and programmable thermostat, garage and a spacious yard, and it's pet friendly.
                  </p>
                </div>
              </div>

              {/* Karasai Promise */}
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-dark">
                  The Karasai Promise:
                </h3>
                
                <div className="space-y-4 text-sm text-neutral-dark/80">
                  <p>
                    We take rental home fraud very seriously, that's why every home on Karasai has been undergone a multi-step verification process to ensure that you're dealing with the actual owner/operator of the rental home you're applying for.
                  </p>
                  
                  <p>
                    Every owner/operator has their own application procedures. ONLY use the contact information listed above to apply for your new rental home or contact the owner/operator. Never send money via Zelle, PayPal, CashApp, ApplePay or similar cash transfer service.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Map */}
              <div className="rounded-lg bg-white p-4">
                <div className="relative h-64 overflow-hidden rounded-lg bg-neutral-gray">
                  <Image
                    src="https://placehold.co/600x400/BFDBF7/333?text=Map+View"
                    alt="Map"
                    fill
                    className="object-cover"
                  />
                  {/* Map Pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="h-12 w-12 rounded-full bg-status-rented shadow-lg"></div>
                  </div>
                  
                  {/* Map Controls */}
                  <div className="absolute right-4 top-4 space-y-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-blue shadow-lg">
                      <Share2 className="h-5 w-5 text-white" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-blue shadow-lg">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-blue shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ad - Harmon Foxbank */}
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <Image
                  src="https://placehold.co/600x400/4EC645/FFF?text=Harmon+Foxbank+Ad"
                  alt="Advertisement"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>

              {/* Ad - Book Club */}
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <Image
                  src="https://placehold.co/600x400/FFC409/FFF?text=Book+Club+Ad"
                  alt="Advertisement"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
