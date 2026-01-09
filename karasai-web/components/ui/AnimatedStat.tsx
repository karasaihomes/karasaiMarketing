// components/ui/AnimatedStat.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedStatProps {
  value: string
  label: string
  duration?: number
}

export default function AnimatedStat({ value, label, duration = 2000 }: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const statRef = useRef<HTMLDivElement>(null)

  // Parse value and determine format
  const isSlashFormat = value.includes('/')
  
  let numericValue1: number
  let numericValue2: number | null = null
  let suffix: string = ''

  if (isSlashFormat) {
    // Handle "24/7" format
    const parts = value.split('/')
    numericValue1 = parseInt(parts[0]) || 0
    numericValue2 = parseInt(parts[1]) || 0
  } else {
    // Handle "100%" and "1000s" formats
    numericValue1 = parseInt(value.replace(/\D/g, '')) || 0
    suffix = value.replace(/\d/g, '')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateValue()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateValue = () => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentCount1 = Math.floor(easeOutQuart * numericValue1)
      setCount(currentCount1)

      if (numericValue2 !== null) {
        const currentCount2 = Math.floor(easeOutQuart * numericValue2)
        setCount2(currentCount2)
      }

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(numericValue1)
        if (numericValue2 !== null) {
          setCount2(numericValue2)
        }
      }
    }

    requestAnimationFrame(updateCount)
  }

  return (
    <div ref={statRef}>
      <p className="mb-2 text-4xl font-bold text-karasai-blue md:text-5xl">
        {hasAnimated ? count : 0}
        {isSlashFormat ? (
          <>/{hasAnimated ? count2 : 0}</>
        ) : (
          suffix
        )}
      </p>
      <p className="text-sm font-semibold uppercase tracking-wide text-neutral-dark md:text-base">
        {label}
      </p>
    </div>
  )
}