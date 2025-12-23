'use client'

import Link from 'next/link'
import { Search, ArrowRight, Home } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="border-t border-neutral-gray bg-gradient-to-b from-karasai-light/30 to-karasai-blue/10 py-16 md:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
            Don't Get Scammed. Verify First.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-neutral-dark/70 md:text-lg">
            Join thousands of renters who trust Karasai to help them avoid rental fraud and find legitimate homes.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 rounded-lg bg-karasai-blue px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-xl"
            >
              <Search className="h-6 w-6" />
              Verify a Property Now
            </button>
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-karasai-blue transition-all hover:bg-karasai-light"
            >
              <Home className="h-6 w-6" />
              Browse Verified Homes
            </Link>
          </div>

          {/* Bottom Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* For Renters */}
            <div className="rounded-lg border-2 border-neutral-gray bg-white p-6 text-center transition-all hover:border-karasai-blue hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-karasai-light">
                  <Search className="h-6 w-6 text-karasai-blue" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                For Renters
              </h3>
              <p className="mb-4 text-sm text-neutral-dark/70">
                Search verified properties and apply with confidence knowing you're protected from scams.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-sm font-semibold text-karasai-blue hover:underline"
              >
                Start Searching
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* For Property Managers */}
            <div className="rounded-lg border-2 border-neutral-gray bg-white p-6 text-center transition-all hover:border-karasai-blue hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-karasai-light">
                  <Home className="h-6 w-6 text-karasai-blue" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                For Property Managers
              </h3>
              <p className="mb-4 text-sm text-neutral-dark/70">
                Protect your properties from fraud and connect with qualified renters through our verified platform.
              </p>
              <Link
                href="/list-your-home"
                className="inline-flex items-center gap-2 text-sm font-semibold text-karasai-blue hover:underline"
              >
                List Your Properties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}