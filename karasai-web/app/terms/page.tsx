import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms of Service | Karasai',
  description: 'Terms of Service for using Karasai rental verification platform.',
}

export default function TermsPage() {
  const lastUpdated = 'December 18, 2024'

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-12 md:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
                Terms of Service
              </h1>
              <p className="text-sm text-white/90 md:text-base">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md md:p-10">
              <div className="prose prose-sm max-w-none md:prose-base">
                {/* Introduction */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    1. Agreement to Terms
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    By accessing and using Karasai's website and services (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Karasai reserves the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last Updated" date at the top of this page. Your continued use of the Service after such changes constitutes acceptance of the modified Terms.
                  </p>
                </section>

                {/* Service Description */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    2. Description of Service
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Karasai is a rental property verification platform that provides information about property ownership and management. We are not a property manager, broker, real estate agent, or rental marketplace.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Our Service allows users to:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Search for rental properties</li>
                    <li>Verify property ownership and management information</li>
                    <li>View verified contact information for property managers</li>
                    <li>Save and compare property listings</li>
                  </ul>
                </section>

                {/* User Responsibilities */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    3. User Responsibilities
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Use the Service for any fraudulent or illegal purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Scrape, copy, or download data from our Service without permission</li>
                    <li>Impersonate another person or entity</li>
                    <li>Submit false or misleading information</li>
                    <li>Interfere with the proper functioning of the Service</li>
                  </ul>
                </section>

                {/* Account Registration */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    4. Account Registration
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    To access certain features, you may need to create an account. You are responsible for:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized access</li>
                    <li>Providing accurate and complete information</li>
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You must be at least 18 years old to create an account.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    5. Intellectual Property Rights
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    All content on the Service, including text, graphics, logos, images, and software, is the property of Karasai or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You may not copy, modify, distribute, sell, or lease any part of our Service without express written permission from Karasai.
                  </p>
                </section>

                {/* Disclaimer of Warranties */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    6. Disclaimer of Warranties
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    While we strive to verify property information, we do not guarantee the accuracy, completeness, or reliability of any information provided through the Service. You use the Service at your own risk.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Karasai is not responsible for the conduct of property managers, landlords, or other users of the Service.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    7. Limitation of Liability
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, KARASAI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Our total liability to you for any claims arising from your use of the Service shall not exceed the amount you paid us in the past 12 months, or $100, whichever is greater.
                  </p>
                </section>

                {/* Indemnification */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    8. Indemnification
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You agree to indemnify and hold Karasai harmless from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
                  </p>
                </section>

                {/* Termination */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    9. Termination
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We reserve the right to suspend or terminate your access to the Service at any time, with or without notice, for any reason, including violation of these Terms.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You may terminate your account at any time by contacting us at support@karasai.com.
                  </p>
                </section>

                {/* Governing Law */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    10. Governing Law
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, United States, without regard to its conflict of law provisions.
                  </p>
                </section>

                {/* Dispute Resolution */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    11. Dispute Resolution
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in Phoenix, Arizona, in accordance with the rules of the American Arbitration Association.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You waive your right to participate in class action lawsuits or class-wide arbitration.
                  </p>
                </section>

                {/* Changes to Service */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    12. Changes to Service
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    13. Contact Information
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    If you have questions about these Terms, please contact us:
                  </p>
                  <div className="rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4">
                    <p className="text-sm leading-relaxed text-neutral-dark/80">
                      <strong>Email:</strong> support@karasai.com<br />
                      <strong>Website:</strong> <Link href="/contact" className="text-karasai-blue hover:underline">Contact Page</Link><br />
                      <strong>Address:</strong> Phoenix, Arizona, United States
                    </p>
                  </div>
                </section>

                {/* Entire Agreement */}
                <section>
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    14. Entire Agreement
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    These Terms, together with our <Link href="/privacy" className="text-karasai-blue hover:underline">Privacy Policy</Link>, constitute the entire agreement between you and Karasai regarding the use of our Service.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}