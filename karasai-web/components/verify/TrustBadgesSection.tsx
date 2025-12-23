import { Building2, Users, Shield, Award } from 'lucide-react'

export default function TrustBadgesSection() {
  const partners = [
    'Progress Residential',
    'Invitation Homes',
    'American Homes 4 Rent',
    'FirstKey Homes',
    'Tricon Residential',
    'Haven Realty Capital',
  ]

  const features = [
    {
      icon: Building2,
      title: 'Verified Property Managers',
      description: 'We partner with the industry\'s largest and most reputable property management companies.',
    },
    {
      icon: Users,
      title: 'Protecting Renters',
      description: 'Our mission is to eliminate rental fraud and give renters peace of mind.',
    },
    {
      icon: Shield,
      title: '100% Verified Data',
      description: 'Every property in our database is verified directly with property management companies.',
    },
    {
      icon: Award,
      title: 'Industry Leaders',
      description: 'Trusted by thousands of renters and partnered with top property managers nationwide.',
    },
  ]

  return (
    <section className="border-t border-neutral-gray bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide text-neutral-dark md:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base leading-relaxed text-neutral-dark/70 md:text-lg">
            We've partnered with some of the industry's largest owners and operators of rental homes. Listen to how Karasai is changing the way people find and verify their new rental home.
          </p>
        </div>

        {/* Partner Logos Placeholder */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg border-2 border-neutral-gray bg-white p-6 text-center transition-all hover:border-karasai-blue hover:shadow-md"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-neutral-dark/60">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                  <feature.icon className="h-8 w-8 text-karasai-blue" />
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-dark/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Verification Promise */}
        <div className="mt-16 rounded-lg border-2 border-karasai-blue bg-karasai-light/20 p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold uppercase tracking-wide text-karasai-blue">
            The Karasai Verification Promise
          </h3>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-neutral-dark/80">
            Every property in our database is verified through direct partnerships with property management companies. We guarantee that all contact information and property details are authentic and up-to-date. If you encounter any fraudulent activity through a Karasai-verified listing, we'll help make it right.
          </p>
        </div>
      </div>
    </section>
  )
}