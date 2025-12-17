import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  const teamMembers = [
    { name: 'TITLE', position: 'POSITION' },
    { name: 'TITLE', position: 'POSITION' },
    { name: 'TITLE', position: 'POSITION' },
    { name: 'TITLE', position: 'POSITION' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* About Us Section */}
        <section className="bg-neutral-gray py-16">
          <div className="container-custom">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Left side - image placeholder */}
              <div className="bg-white"></div>
              
              {/* Right side - blue background with text */}
              <div className="bg-karasai-blue p-12 text-white lg:p-16">
                <h2 className="mb-8 text-3xl font-bold uppercase tracking-wide">
                  About Us
                </h2>
                
                <div className="space-y-6 text-white/90">
                  <p>
                    Nulla euismod elementum tortor sed laoreet. Maecenas vel sucipit lacus. 
                    Pellentesque egestas, tellus sed accumsan vulputate, magna nisl vulputate 
                    magna, non lacinia nisl sapien nec mauris.
                  </p>
                  
                  <p>
                    Nunc imperdiet nibh ac odio scelerisque laoreet. Sed et ligula sit amet 
                    velit consectetur fermentum a feugiat massa. Aliquam ex quam, fringilla ac 
                    ligula vitae, semper dapibus risus. Nullam at ipsum sed erat malesuada 
                    lacinia ac ut quam. Ut vel laoreet est.
                  </p>
                  
                  <p>
                    Morbi interdum viverra ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <h2 className="mb-12 text-center text-3xl font-medium uppercase tracking-wide text-neutral-dark">
              Meet The Team
            </h2>
            
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  {/* Avatar placeholder */}
                  <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-neutral-dark">
                    <div className="flex h-full w-full items-end justify-center pb-2">
                      <div className="h-24 w-24 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-neutral-dark">
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-neutral-dark/60">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-karasai-blue py-16 text-white">
          <div className="container-custom flex flex-col items-center justify-center gap-6 text-center md:flex-row md:justify-between">
            <h2 className="text-2xl font-medium uppercase tracking-wide md:text-3xl">
              Want to list your home on Karasai?
            </h2>
            <Link
              href="/contact"
              className="rounded-md bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-karasai-blue transition-colors hover:bg-neutral-gray"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
