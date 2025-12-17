'use client'

import { useEffect, useRef } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
}: AdSenseAdProps) {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const adRef = useRef<HTMLModElement>(null)
  const isAdPushed = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && adSenseId && adRef.current && !isAdPushed.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isAdPushed.current = true
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adSenseId])

  // If AdSense not configured, show placeholder
  if (!adSenseId) {
    return (
      <div className={`flex min-h-[250px] items-center justify-center rounded-lg bg-neutral-gray text-neutral-dark/40 ${className}`}>
        <div className="text-center">
          <p className="text-sm font-semibold">Advertisement</p>
          <p className="mt-1 text-xs">AdSense not configured</p>
          <p className="mt-2 text-xs">Add NEXT_PUBLIC_ADSENSE_ID to environment</p>
        </div>
      </div>
    )
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adSenseId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}