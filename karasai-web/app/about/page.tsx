import Image from 'next/image'
import Link from 'next/link'
import { Shield, Search, CheckCircle, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedStat from '@/components/ui/AnimatedStat'

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
                    At Karasai, we want you to feel safe and confident when you’re looking for a place to live. Every year, thousands of people lose money or are scammed by fake rental listings online. These scams can take your cash and even put your identity at risk if someone tricks you into sharing personal information.
                  </p>
                  
                  <p>
                    That’s why Karasai was built – to give you a clear and trustworthy way to check rental homes before you make a move. When you search a home on Karasai, you aren’t guessing if it’s real or who’s on the other end. You get verified information about who actually owns or manages the property, so you know exactly who you’re dealing with before you reach out or send any money.
                  </p>
                  
                  <p>
                    This means you don’t have to worry about wasting time on fake listings or being bullied into paying fees before you’ve confirmed the rental is real. Karasai gives you full transparency, reduces your risk of being scammed, and helps you move forward with confidence.
                  </p>
                  
                  <p>
                    Make Karasai your first stop when searching for a rental home. The faster you can verify a listing, the sooner you can find a great place and feel confident about your decision.
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
                    Found a rental home you're interested in? Simply enter the address for the home into the Karasai search bar.
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
                    In seconds, you'll see the verified name of the property owner or manager, so you know you're dealing with the actual owner or operator.
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
                    Our goal is simple: help eliminate rental home fraud, increase transparency for renters, and make renting a home safer and easier for everyone.
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
                      With over 12 years of marketing strategy experience across diverse industries, Warren understands how to connect people with information that protects them. At Karasai, he focuses on making rental verification accessible and understood by everyone, from first-time renters to seasoned apartment hunters. His ability to read audiences and craft impactful messaging ensures that Karasai's transparency-first approach reaches the people who need it most, when they need it most.
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
                      Josh brings 15 years of full-stack development and operations expertise to Karasai's mission of making rental housing safer. He architected the platform that connects renters to verified property ownership data in seconds, combining technical precision with strategic vision to eliminate the inefficiencies that allow rental scams to thrive. At Karasai, Josh doesn't just strategize solutions; he builds them, ensuring every renter has instant access to the truth about who they're dealing with.
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
                <AnimatedStat value="1000s" label="Verified Properties" />
                <AnimatedStat value="100%" label="Free to Use" />
                <AnimatedStat value="24/7" label="Instant Verification" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}