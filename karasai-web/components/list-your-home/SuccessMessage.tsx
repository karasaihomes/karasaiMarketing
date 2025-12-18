'use client'

import { CheckCircle, Home, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SuccessMessageProps {
  onReset: () => void
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-8 text-center shadow-lg md:p-12">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-status-available/20">
                <CheckCircle className="h-12 w-12 text-status-available" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
              Request Submitted Successfully!
            </h2>
            
            <p className="mb-8 text-base leading-relaxed text-neutral-dark/80 md:text-lg">
              Thank you for your submission. Our team will review your listing request and contact you within 1-2 business days.
            </p>

            {/* What Happens Next */}
            <div className="mb-8 rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-6 text-left">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-karasai-blue">
                What Happens Next:
              </h3>
              <ul className="space-y-3 text-sm text-neutral-dark/80">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-karasai-blue text-xs font-bold text-white">
                    1
                  </span>
                  <span>We'll review your submission and verify the property details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-karasai-blue text-xs font-bold text-white">
                    2
                  </span>
                  <span>A team member will contact you via email to verify ownership</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-karasai-blue text-xs font-bold text-white">
                    3
                  </span>
                  <span>Once verified, your property will be added to our platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-karasai-blue text-xs font-bold text-white">
                    4
                  </span>
                  <span>You'll receive confirmation when your listing goes live</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
              >
                <Home className="h-5 w-5" />
                Return Home
              </Link>

              <button
                onClick={onReset}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-karasai-blue bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-karasai-blue transition-all hover:bg-karasai-light"
              >
                Submit Another Property
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 border-t border-neutral-gray pt-6">
              <p className="text-sm text-neutral-dark/60">
                Questions? Contact us at{' '}
                <a href="mailto:support@karasai.com" className="font-semibold text-karasai-blue hover:underline">
                  support@karasai.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}