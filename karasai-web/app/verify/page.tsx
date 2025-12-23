import VerifySearchSection from '@/components/verify/VerifySearchSection'
import WhyVerifySection from '@/components/verify/WhyVerifySection'
import HowItWorksSection from '@/components/verify/HowItWorksSection'
import TrustBadgesSection from '@/components/verify/TrustBadgesSection'
import CTASection from '@/components/verify/CTASection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Verify a Rental Home | Karasai - Stop Rental Scams',
  description: 'Verify any rental property instantly. Check if a rental listing is legitimate before you apply. Protected by Karasai\'s verified database.',
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero + Search Section */}
        <VerifySearchSection />

        {/* Why Verify Section */}
        <WhyVerifySection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Trust Badges */}
        <TrustBadgesSection />

        {/* Final CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}