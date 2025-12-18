import DashboardClient from '@/components/dashboard/DashboardClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Saved Homes | Karasai',
  description: 'View and manage your saved rental properties.',
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-gray">
        {/* Hero Section */}
        <section className="border-b border-neutral-gray bg-white py-8 md:py-12">
          <div className="container-custom">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-neutral-dark md:text-3xl">
              Saved Homes
            </h1>
            <p className="mt-2 text-sm text-neutral-dark/70 md:text-base">
              Properties you've saved for later
            </p>
          </div>
        </section>

        {/* Dashboard Content */}
        <DashboardClient />
      </main>

      <Footer />
    </div>
  )
}