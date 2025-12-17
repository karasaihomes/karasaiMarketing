'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToResults() {
  const router = useRouter()
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    // Check if user came from search page
    const referrer = document.referrer
    const cameFromSearch = referrer.includes('/search') || 
                          sessionStorage.getItem('from_search') === 'true'
    
    setShowBack(cameFromSearch)
  }, [])

  const handleBack = () => {
    // If we came from search, go back
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to search page
      router.push('/search')
    }
  }

  if (!showBack) return null

  return (
    <button
      onClick={handleBack}
      className="mb-4 flex min-h-[44px] items-center gap-2 text-sm font-semibold text-karasai-blue transition-colors hover:text-karasai-blue/80 sm:text-base"
    >
      <ChevronLeft className="h-5 w-5" />
      Back to Results
    </button>
  )
}