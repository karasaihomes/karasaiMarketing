'use client'

import Link from 'next/link'
import { Heart, Search } from 'lucide-react'

export default function EmptyState() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-md text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-karasai-light">
              <Heart className="h-10 w-10 text-karasai-blue" />
            </div>
          </div>

          {/* Message */}
          <h2 className="mb-3 text-xl font-bold uppercase tracking-wide text-neutral-dark">
            No Saved Homes Yet
          </h2>
          <p className="mb-8 text-base leading-relaxed text-neutral-dark/70">
            Start exploring verified rental properties and save your favorites to view them here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 rounded-lg bg-karasai-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
            >
              <Search className="h-5 w-5" />
              Browse Properties
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-karasai-blue transition-all hover:bg-karasai-light"
            >
              Return Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-12 rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-6 text-left">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-karasai-blue">
              How to Save Properties
            </h3>
            <ol className="space-y-2 text-sm text-neutral-dark/80">
              <li className="flex items-start gap-2">
                <span className="font-bold text-karasai-blue">1.</span>
                <span>Browse verified rental properties on our search page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-karasai-blue">2.</span>
                <span>Click the heart icon on any property you like</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-karasai-blue">3.</span>
                <span>View all your saved properties here anytime</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}