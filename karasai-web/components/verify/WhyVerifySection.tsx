import { Shield, Lock, CheckCircle, AlertTriangle } from 'lucide-react'

export default function WhyVerifySection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Stop Scams Before They Start',
      description: 'Rental scams cost Americans over $350 million annually. Verify properties before you apply to avoid becoming a victim.',
    },
    {
      icon: Lock,
      title: '100% Verified Listings',
      description: 'Every property in our database is verified and connected directly to legitimate property management companies.',
    },
    {
      icon: CheckCircle,
      title: 'Instant Peace of Mind',
      description: 'Get immediate confirmation that the property you\'re interested in is real and managed by a verified company.',
    },
    {
      icon: AlertTriangle,
      title: 'Avoid Warning Signs',
      description: 'If a property isn\'t in our database, that\'s a red flag. Take extra caution and verify through other channels.',
    },
  ]

  return (
    <section className="border-t border-neutral-gray bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
            Why Verify a Rental Home?
          </h2>
          <p className="text-base leading-relaxed text-neutral-dark/70 md:text-lg">
            Rental fraud is on the rise. Protect yourself and your money by verifying every property before you apply.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-neutral-gray bg-white p-6 text-center transition-all hover:border-karasai-blue hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                  <benefit.icon className="h-8 w-8 text-karasai-blue" />
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-dark/70">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-8 rounded-lg border-2 border-karasai-blue bg-karasai-light/20 p-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">
              $350M+
            </div>
            <div className="text-sm uppercase tracking-wide text-neutral-dark/70">
              Lost to Rental Scams Annually
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">
              1 in 10
            </div>
            <div className="text-sm uppercase tracking-wide text-neutral-dark/70">
              Rental Listings Are Fraudulent
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">
              5,000+
            </div>
            <div className="text-sm uppercase tracking-wide text-neutral-dark/70">
              People Scammed Every Month
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}