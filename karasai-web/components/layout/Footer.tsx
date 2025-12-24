import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const companyLinks = [
    { name: 'KARASAI', href: '/' },
    { name: 'VERIFY A RENTAL HOME', href: '/verify' },
    { name: 'LIST YOUR HOME WITH US', href: '/list-your-home' },
  ]

  const aboutLinks = [
    { name: 'ABOUT US', href: '/about' },
    { name: 'ARTICLES', href: '/articles' },
    { name: 'PRIVACY POLICY', href: '/privacy' },
    { name: 'TERMS OF SERVICE', href: '/terms' },
  ]

  const helpLinks = [
    { name: 'HELP CENTER', href: '/help' },
    { name: 'GET STARTED', href: '/search' },
    { name: 'CONTACT US', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ]

  const connectLinks = [
    { name: 'INSTAGRAM', href: '#' },
    { name: 'FACEBOOK', href: '#' },
    { name: 'LINKEDIN', href: '#' },
  ]

  return (
    <footer className="bg-karasai-blue text-white">
      {/* Top Section - Three Cards with Images */}
      <div className="container-custom py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* First Time Renter */}
          <div className="overflow-hidden rounded-lg bg-karasai-light shadow-lg">
            <div className="relative h-48">
              <Image
                src="/images/footer/ninthgrid-d6-bg-lCvZY-unsplash.jpg"
                alt="First time renter"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Link
                href="/help"
                className="inline-block rounded-md bg-karasai-blue px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-karasai-blue/90"
              >
                First Time Renter?
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div className="overflow-hidden rounded-lg bg-karasai-light shadow-lg">
            <div className="relative h-48">
              <Image
                src="/images/footer/rodeo-project-management-software-ONe-snuCaqQ-unsplash.jpg"
                alt="About us"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Link
                href="/about"
                className="inline-block rounded-md bg-karasai-blue px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-karasai-blue/90"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Karasai Guarantee */}
          <div className="overflow-hidden rounded-lg bg-karasai-light shadow-lg">
            <div className="relative h-48">
              <Image
                src="/images/footer/campaign-creators-qCi_MzVODoU-unsplash.jpg"
                alt="Karasai guarantee"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Link
                href="/about#guarantee"
                className="inline-block rounded-md bg-karasai-blue px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-karasai-blue/90"
              >
                Karasai Guarantee
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Bottom Section - Footer Links */}
      <div className="container-custom py-12">
        <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs uppercase tracking-wide text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
              About
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs uppercase tracking-wide text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs uppercase tracking-wide text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wide text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}