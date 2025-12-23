'use client'

import { Search, CheckCircle, Home } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      icon: Search,
      title: 'Enter the Address',
      description: 'Type in the full property address, city, or ZIP code of the rental home you\'re considering.',
    },
    {
      number: '2',
      icon: CheckCircle,
      title: 'Get Instant Verification',
      description: 'Our system instantly checks our database of verified properties from trusted property management companies.',
    },
    {
      number: '3',
      icon: Home,
      title: 'Apply with Confidence',
      description: 'If verified, you\'ll see the property details and can proceed safely. If not verified, proceed with extreme caution.',
    },
  ]

  return (
    <section className="border-t border-neutral-gray bg-neutral-gray/50 py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
            How Verification Works
          </h2>
          <p className="text-base leading-relaxed text-neutral-dark/70 md:text-lg">
            Protect yourself from rental scams in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-karasai-blue/20 md:block" />
                )}

                <div className="relative rounded-lg border-2 border-neutral-gray bg-white p-6 text-center transition-all hover:border-karasai-blue hover:shadow-lg">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-karasai-blue text-sm font-bold text-white">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex justify-center pt-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                      <step.icon className="h-8 w-8 text-karasai-blue" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-base text-neutral-dark/70">
            Ready to verify a property?
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
          >
            <Search className="h-5 w-5" />
            Verify Now
          </button>
        </div>
      </div>
    </section>
  )
}