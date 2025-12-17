'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SearchPage() {
  const [filters, setFilters] = useState({
    onlyComingSoon: false,
    onlyAvailable: false,
  })

  // Sample properties
  const properties = [
    {
      id: '1',
      address: '1001 ROSE LANE',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1652,
      status: 'available',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=1001+Rose+Lane',
    },
    {
      id: '2',
      address: '5815 N 13TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1518,
      status: 'coming-soon',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=5815+N+13th+St',
    },
    {
      id: '3',
      address: '6342 N. 11TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1672,
      status: 'occupied',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=6342+N+11th+St',
    },
    {
      id: '4',
      address: '6342 N. 11TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1672,
      status: 'occupied',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+4',
    },
    {
      id: '5',
      address: '1001 ROSE LANE',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1652,
      status: 'available',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+5',
    },
    {
      id: '6',
      address: '5815 N 13TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1518,
      status: 'coming-soon',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+6',
    },
    {
      id: '7',
      address: '5815 N 13TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1518,
      status: 'coming-soon',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+7',
    },
    {
      id: '8',
      address: '6342 N. 11TH ST',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1672,
      status: 'occupied',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+8',
    },
    {
      id: '9',
      address: '1001 ROSE LANE',
      city: 'PHOENIX, AZ 85014',
      beds: 3,
      baths: 2,
      sqft: 1652,
      status: 'available',
      image: 'https://placehold.co/600x400/BFDBF7/333?text=Property+9',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="absolute left-0 top-0 bg-status-available px-4 py-1 text-xs font-semibold uppercase text-white">
            Available
          </span>
        )
      case 'coming-soon':
        return (
          <span className="absolute left-0 top-0 bg-status-coming px-4 py-1 text-xs font-semibold uppercase text-white">
            Coming Soon
          </span>
        )
      case 'occupied':
        return (
          <span className="absolute left-0 top-0 bg-status-rented px-4 py-1 text-xs font-semibold uppercase text-white">
            Occupied
          </span>
        )
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        <div className="container-custom py-8">
          {/* Header and Filters */}
          <div className="mb-8">
            <h1 className="mb-4 text-2xl font-medium uppercase tracking-wide text-neutral-dark">
              Homes in 85014
            </h1>
            
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-neutral-dark">
                <input
                  type="checkbox"
                  checked={filters.onlyComingSoon}
                  onChange={(e) =>
                    setFilters({ ...filters, onlyComingSoon: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-neutral-dark/30 text-karasai-blue focus:ring-karasai-blue"
                />
                <span className="uppercase tracking-wide">Only Coming Soon</span>
              </label>
              
              <label className="flex items-center gap-2 text-sm text-neutral-dark">
                <input
                  type="checkbox"
                  checked={filters.onlyAvailable}
                  onChange={(e) =>
                    setFilters({ ...filters, onlyAvailable: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-neutral-dark/30 text-karasai-blue focus:ring-karasai-blue"
                />
                <span className="uppercase tracking-wide">Only Available</span>
              </label>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property.id} className="group">
                <Link href={`/properties/${property.id}`}>
                  <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={property.image}
                        alt={property.address}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {getStatusBadge(property.status)}
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                            {property.address}
                          </h3>
                          <p className="text-xs uppercase tracking-wide text-neutral-dark/60">
                            {property.city}
                          </p>
                        </div>
                        <button className="text-neutral-dark/60 transition-colors hover:text-status-rented">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-xs uppercase tracking-wide text-neutral-dark/60">
                        {property.beds} BED / {property.baths} BATH / {property.sqft.toLocaleString()} SQ. FT.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-karasai-blue py-16 text-white">
          <div className="container-custom flex flex-col items-center justify-center gap-6 text-center md:flex-row md:justify-between">
            <h2 className="text-2xl font-medium uppercase tracking-wide md:text-3xl">
              Want to list your home on Karasai?
            </h2>
            <Link
              href="/contact"
              className="rounded-md bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-karasai-blue transition-colors hover:bg-neutral-gray"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
