import Image from 'next/image'
import Link from 'next/link'
import { Shield, Search, CheckCircle, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'About Us - Our Mission to Stop Rental Fraud | Karasai',
  description: 'Learn how Karasai is bringing clarity and confidence to rental housing by helping renters verify property listings in seconds. Free, independent, and trusted.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
                About Karasai
              </h1>
              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                We're on a mission to bring clarity and confidence to the rental housing industry.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-white p-6 shadow-md md:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-karasai-blue" />
                  <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                    Our Mission
                  </h2>
                </div>
                
                <div className="space-y-4 text-base leading-relaxed text-neutral-dark/80 md:text-lg">
                  <p>
                    Karasai was created to bring clarity and confidence to the rental housing industry. 
                    Fraudulent listings and rental scams cost renters millions of dollars each year and often 
                    target people in their most vulnerable state.
                  </p>
                  
                  <p>
                    Relocating, downsizing, and other major life changes are already stressful enough without 
                    having to worry about whether the perfect home you just found is legitimate or not.
                  </p>
                  
                  <p>
                    Karasai is a <strong>free and completely independent</strong> rental verification platform 
                    designed to help renters quickly confirm whether a property listing is legitimate or if they 
                    are dealing with the actual property owner.
                  </p>
                  
                  <p>
                    By connecting verified property data with rental listings, Karasai allows users to check 
                    ownership and management information in seconds so they can apply with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:mb-16 md:text-3xl">
                How Karasai Works
              </h2>
              
              <div className="grid gap-8 md:grid-cols-3">
                {/* Step 1 */}
                <div className="rounded-lg bg-white p-6 text-center shadow-md md:p-8">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                      <Search className="h-8 w-8 text-karasai-blue" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    1. Search the Address
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Found a rental you're interested in? Simply enter the property address into Karasai's 
                    search bar.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="rounded-lg bg-white p-6 text-center shadow-md md:p-8">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                      <Shield className="h-8 w-8 text-karasai-blue" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    2. Get Verified Info
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    In seconds, you'll see the verified name of the property owner or manager, so you know 
                    you're dealing with a real person.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="rounded-lg bg-white p-6 text-center shadow-md md:p-8">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-karasai-light">
                      <CheckCircle className="h-8 w-8 text-karasai-blue" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    3. Rent with Confidence
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Apply knowing the listing is legitimate and you're contacting the actual property owner 
                    or manager.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                What Makes Us Different
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Free & Independent */}
                <div className="rounded-lg border-2 border-karasai-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-karasai-blue">
                    100% Free & Independent
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    We are not a marketplace, broker, or property manager. Karasai does not create listings 
                    or charge renters to verify them. We exist to provide reliable information.
                  </p>
                </div>

                {/* No Hidden Fees */}
                <div className="rounded-lg border-2 border-karasai-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-karasai-blue">
                    Verified Information
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Every property listing is connected to verified property data, so you always know who 
                    really owns or manages the home.
                  </p>
                </div>

                {/* Transparency */}
                <div className="rounded-lg border-2 border-karasai-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-karasai-blue">
                    Complete Transparency
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    We believe renters deserve to know exactly who they're dealing with before sharing 
                    personal information or sending money.
                  </p>
                </div>

                {/* Safety First */}
                <div className="rounded-lg border-2 border-karasai-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-karasai-blue">
                    Your Safety First
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Our goal is simple: reduce fraud, increase transparency, and make renting safer for 
                    everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 text-center md:mb-16">
                <div className="mb-4 flex justify-center">
                  <Users className="h-12 w-12 text-karasai-blue" />
                </div>
                <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                  Meet the Team
                </h2>
                <p className="text-base text-neutral-dark/80 md:text-lg">
                  The people behind Karasai's mission to make renting safer for everyone.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Team Member 1 */}
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="relative h-80 bg-karasai-light">
                    <Image
                      src="/images/about/warren_jones.jpg"
                      alt="Team Member 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                      Warren Jones
                    </h3>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-karasai-blue">
                      Operations Leader
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-dark/80">
                      [Brief bio about team member, their role at Karasai, and their passion for helping 
                      renters. 2-3 sentences.]
                    </p>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="relative h-80 bg-karasai-light">
                    <Image
                      src="/images/about/josh_anderson.jpg"
                      alt="Team Member 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-xl font-bold uppercase tracking-wide text-neutral-dark">
                      Josh Anderson
                    </h3>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-karasai-blue">
                      Technology Leader
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-dark/80">
                      [Brief bio about team member, their role at Karasai, and their passion for helping 
                      renters. 2-3 sentences.]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-karasai-blue py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-white md:text-4xl">
                Ready to Find Your Next Home?
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                Search thousands of verified rental properties with confidence. Every listing is checked, 
                every landlord is verified.
              </p>
              <Link
                href="/search"
                className="inline-block rounded-lg bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-karasai-blue shadow-lg transition-all hover:bg-white/90 hover:shadow-xl md:text-base"
              >
                Start Your Search
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 text-center md:grid-cols-3">
                <div>
                  <p className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">1000s</p>
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-dark md:text-base">
                    Verified Properties
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">100%</p>
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-dark md:text-base">
                    Free to Use
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">24/7</p>
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-dark md:text-base">
                    Instant Verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}