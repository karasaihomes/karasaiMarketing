import ListYourHomeClient from '@/components/list-your-home/ListYourHomeClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'List Your Property | Karasai',
  description: 'List your rental properties on Karasai and reach verified renters looking for their next home.',
}

export default function ListYourHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-12 md:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
                List Your Property on Karasai
              </h1>
              <p className="text-base text-white/90 md:text-lg">
                Join our verified network and connect with renters looking for legitimate homes.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-b border-neutral-gray bg-white py-8 md:py-12">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-karasai-light">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-dark">
                    Verified Listings
                  </h3>
                  <p className="text-sm text-neutral-dark/70">
                    Your properties are verified and protected from scammers
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-karasai-light">
                      <span className="text-2xl">👥</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-dark">
                    Quality Renters
                  </h3>
                  <p className="text-sm text-neutral-dark/70">
                    Reach renters who value verified, legitimate listings
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-karasai-light">
                      <span className="text-2xl">🚀</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-dark">
                    Easy Setup
                  </h3>
                  <p className="text-sm text-neutral-dark/70">
                    Simple verification process to get your listings live
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Step Form */}
        <ListYourHomeClient />

        {/* Why Choose Karasai */}
        <section className="bg-neutral-gray py-12 md:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
                Why List with Karasai?
              </h2>

              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    Protection from Scammers
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Scammers steal property photos and create fake listings. When your properties are verified on Karasai, renters can instantly confirm you're the legitimate owner or manager.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    Trusted Platform
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Karasai is completely independent and exists solely to verify property ownership. We don't compete with you - we protect you and help you reach qualified renters.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-neutral-dark">
                    Free for Renters
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80">
                    Renters use Karasai for free, making it a go-to resource for anyone looking to verify rental listings and find legitimate homes.
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