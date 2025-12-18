import AccountClient from '@/components/account/AccountClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Account Settings | Karasai',
  description: 'Manage your account settings and preferences.',
}

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        {/* Hero Section */}
        <section className="border-b border-neutral-gray bg-white py-8 md:py-12">
          <div className="container-custom">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
              Account Settings
            </h1>
            <p className="mt-2 text-sm text-neutral-dark/70 md:text-base">
              Manage your profile, security, and preferences
            </p>
          </div>
        </section>

        {/* Account Content */}
        <AccountClient />
      </main>

      <Footer />
    </div>
  )
}