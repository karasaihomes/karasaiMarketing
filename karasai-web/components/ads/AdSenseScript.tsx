'use client'

import Script from 'next/script'

export default function AdSenseScript() {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  if (!adSenseId) {
    console.warn('Google AdSense ID not configured. Set NEXT_PUBLIC_ADSENSE_ID in environment variables.')
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}