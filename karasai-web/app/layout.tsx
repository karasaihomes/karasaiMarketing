import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AdSenseScript from '@/components/ads/AdSenseScript'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Karasai | Verified Rental Properties',
    template: '%s | Karasai',
  },
  description:
    'Find verified rental homes without the fear of scams. Every property on Karasai is verified and connects you directly to legitimate property management companies.',
  keywords: [
    'rental homes',
    'verified rentals',
    'property management',
    'rental scam protection',
    'legitimate rentals',
  ],
  authors: [{ name: 'Karasai' }],
  creator: 'Karasai',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Karasai',
    title: 'Karasai | Verified Rental Properties',
    description:
      'Find verified rental homes without the fear of scams. Every property on Karasai is verified.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Karasai - Verified Rental Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karasai | Verified Rental Properties',
    description: 'Find verified rental homes without the fear of scams.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-screen">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              className: 'toast-success',
              iconTheme: {
                primary: '#4EC645',
                secondary: '#fff',
              },
            },
            error: {
              className: 'toast-error',
              iconTheme: {
                primary: '#D93C04',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}