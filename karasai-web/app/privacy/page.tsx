import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy | Karasai',
  description: 'Privacy Policy for Karasai rental verification platform - learn how we protect your data.',
}

export default function PrivacyPage() {
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
                Privacy Policy
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
                    1. Introduction
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Karasai ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (the "Service").
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
                  </p>
                </section>

                {/* Information We Collect */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    2. Information We Collect
                  </h2>
                  
                  <h3 className="mb-3 text-lg font-bold text-neutral-dark">
                    2.1 Personal Information
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Create an account (name, email address, password)</li>
                    <li>Save properties to your favorites</li>
                    <li>Contact us through our contact form (name, email, phone, message)</li>
                    <li>Subscribe to our newsletter (email address)</li>
                    <li>Submit a property listing request</li>
                  </ul>

                  <h3 className="mb-3 mt-6 text-lg font-bold text-neutral-dark">
                    2.2 Automatically Collected Information
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    When you access our Service, we automatically collect certain information, including:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Log data (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (device type, operating system, unique device identifiers)</li>
                    <li>Location data (general location based on IP address)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>

                  <h3 className="mb-3 mt-6 text-lg font-bold text-neutral-dark">
                    2.3 Information from Third Parties
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We may receive information about you from third-party services when you use social login features (Google, Facebook) or when property managers provide information about their properties.
                  </p>
                </section>

                {/* How We Use Your Information */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    3. How We Use Your Information
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We use the information we collect to:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Provide, operate, and maintain our Service</li>
                    <li>Create and manage your account</li>
                    <li>Process your saved properties and comparison lists</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                    <li>Improve and personalize your experience</li>
                    <li>Analyze usage patterns and optimize our Service</li>
                    <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                {/* Information Sharing */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    4. How We Share Your Information
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>

                  <h3 className="mb-3 text-lg font-bold text-neutral-dark">
                    4.1 With Property Managers
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    When you express interest in a property or contact a property manager through our Service, we may share your contact information with that specific property manager.
                  </p>

                  <h3 className="mb-3 text-lg font-bold text-neutral-dark">
                    4.2 With Service Providers
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We may share your information with third-party service providers who perform services on our behalf, such as:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Cloud hosting providers (Vercel, Supabase)</li>
                    <li>Analytics providers (Google Analytics)</li>
                    <li>Email service providers</li>
                    <li>Payment processors (if applicable)</li>
                  </ul>

                  <h3 className="mb-3 mt-6 text-lg font-bold text-neutral-dark">
                    4.3 For Legal Purposes
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We may disclose your information if required by law or in response to valid legal requests, such as:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>To comply with court orders or legal processes</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>To prevent fraud or illegal activity</li>
                    <li>To enforce our Terms of Service</li>
                  </ul>

                  <h3 className="mb-3 mt-6 text-lg font-bold text-neutral-dark">
                    4.4 Business Transfers
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    If Karasai is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    5. Cookies and Tracking Technologies
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We use cookies and similar tracking technologies to collect and track information about your use of our Service. Cookies are small data files stored on your device.
                  </p>

                  <h3 className="mb-3 text-lg font-bold text-neutral-dark">
                    Types of Cookies We Use:
                  </h3>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li><strong>Essential Cookies:</strong> Required for the Service to function (authentication, security)</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads (if applicable)</li>
                  </ul>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our Service.
                  </p>
                </section>

                {/* Data Security */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    6. Data Security
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We implement appropriate technical and organizational security measures to protect your personal information, including:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Secure hosting infrastructure</li>
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                {/* Data Retention */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    7. Data Retention
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When you delete your account, we will delete or anonymize your personal information within a reasonable timeframe.
                  </p>
                </section>

                {/* Your Rights */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    8. Your Privacy Rights
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                    <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
                    <li><strong>Object:</strong> Object to processing of your information</li>
                  </ul>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    To exercise these rights, please contact us at privacy@karasai.com. We will respond to your request within 30 days.
                  </p>
                </section>

                {/* Children's Privacy */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    9. Children's Privacy
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will delete it.
                  </p>
                </section>

                {/* California Privacy Rights */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    10. California Privacy Rights (CCPA)
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="ml-6 list-disc space-y-2 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    <li>Right to know what personal information we collect, use, and disclose</li>
                    <li>Right to request deletion of your personal information</li>
                    <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
                    <li>Right to non-discrimination for exercising your rights</li>
                  </ul>
                </section>

                {/* International Users */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    11. International Users
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    Our Service is operated in the United States. If you access our Service from outside the United States, your information will be transferred to, stored, and processed in the United States. By using our Service, you consent to this transfer and processing.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    12. Changes to This Privacy Policy
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    13. Contact Us
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                    If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4">
                    <p className="text-sm leading-relaxed text-neutral-dark/80">
                      <strong>Email:</strong> privacy@karasai.com<br />
                      <strong>Support:</strong> support@karasai.com<br />
                      <strong>Website:</strong> <Link href="/contact" className="text-karasai-blue hover:underline">Contact Page</Link><br />
                      <strong>Address:</strong> Phoenix, Arizona, United States
                    </p>
                  </div>
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