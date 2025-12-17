'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Search, MapPin, Building2, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface SearchResult {
  type: 'address' | 'city' | 'zip'
  value: string
  display: string
  city?: string
  state?: string
}

interface SearchBarProps {
  onSearch: (query: string) => void
  onSelectResult?: (result: SearchResult) => void
  initialValue?: string
  placeholder?: string
  className?: string
  buttonText?: string
}

export default function SearchBar({ 
  onSearch, 
  onSelectResult,
  initialValue = '',
  placeholder = 'Search by address, city, or ZIP code...',
  className = '',
  buttonText
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  // Set mounted state for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [isOpen, results])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on scroll (page scroll only, not dropdown scroll)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (dropdownRef.current && e.target && dropdownRef.current.contains(e.target as Node)) {
        return
      }
      
      if (isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  // Fetch autocomplete results
  const fetchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('address, city, state, zip')
        .or(`address.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,zip.ilike.%${searchQuery}%`)
        .limit(20)

      if (!error && data) {
        const addressResults: SearchResult[] = []
        const cityResults: SearchResult[] = []
        const zipResults: SearchResult[] = []
        const seenAddresses = new Set<string>()
        const seenCities = new Set<string>()
        const seenZips = new Set<string>()

        data.forEach((property) => {
          if (property.address.toLowerCase().includes(searchQuery.toLowerCase())) {
            const key = property.address.toLowerCase()
            if (!seenAddresses.has(key) && addressResults.length < 5) {
              seenAddresses.add(key)
              addressResults.push({
                type: 'address',
                value: property.address,
                display: `${property.address}, ${property.city}, ${property.state}`,
                city: property.city,
                state: property.state,
              })
            }
          }

          if (property.city.toLowerCase().includes(searchQuery.toLowerCase())) {
            const key = `${property.city}, ${property.state}`.toLowerCase()
            if (!seenCities.has(key) && cityResults.length < 3) {
              seenCities.add(key)
              cityResults.push({
                type: 'city',
                value: property.city,
                display: `${property.city}, ${property.state}`,
                city: property.city,
                state: property.state,
              })
            }
          }

          if (property.zip.includes(searchQuery)) {
            const key = property.zip.toLowerCase()
            if (!seenZips.has(key) && zipResults.length < 2) {
              seenZips.add(key)
              zipResults.push({
                type: 'zip',
                value: property.zip,
                display: `${property.zip} (${property.city}, ${property.state})`,
                city: property.city,
                state: property.state,
              })
            }
          }
        })

        setResults([...addressResults, ...cityResults, ...zipResults].slice(0, 10))
      }
    } catch (error) {
      console.error('Search error:', error)
    }

    setIsLoading(false)
  }, [supabase])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchResults(query)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, fetchResults])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(true)
  }

  const handleSelectResult = (result: SearchResult) => {
    setQuery(result.display)
    setIsOpen(false)
    
    // If custom handler provided, use it
    if (onSelectResult) {
      onSelectResult(result)
    } else {
      // Default behavior: call onSearch with the appropriate value
      if (result.type === 'address') {
        onSearch(result.value)
      } else if (result.type === 'city') {
        onSearch(result.city || result.value)
      } else if (result.type === 'zip') {
        onSearch(result.value)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    } else if (e.key === 'Enter' && query) {
      setIsOpen(false)
      onSearch(query)
    }
  }

  const handleSearchClick = () => {
    if (query) {
      setIsOpen(false)
      onSearch(query)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'address':
        return <MapPin className="h-4 w-4 text-karasai-blue" />
      case 'city':
        return <Building2 className="h-4 w-4 text-karasai-blue" />
      case 'zip':
        return <Mail className="h-4 w-4 text-karasai-blue" />
      default:
        return <Search className="h-4 w-4 text-karasai-blue" />
    }
  }

  const dropdown = isOpen && query.length >= 2 && mounted ? (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
        zIndex: 9999,
      }}
      className="overflow-hidden rounded-lg border border-neutral-gray bg-white shadow-lg"
    >
      {isLoading ? (
        <div className="px-4 py-3 text-sm text-neutral-dark/60">
          Searching...
        </div>
      ) : results.length > 0 ? (
        <div className="max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={`${result.type}-${index}`}
              onClick={() => handleSelectResult(result)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-karasai-light"
            >
              {getIcon(result.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-dark">
                  {result.display}
                </p>
                <p className="text-xs text-neutral-dark/60 capitalize">
                  {result.type}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-3 text-sm text-neutral-dark/60">
          No results found. Try a different search.
        </div>
      )}
    </div>
  ) : null

  return (
    <>
      <div ref={searchRef} className={`relative w-full ${className}`}>
        {/* Search Input with optional button */}
        <div className={buttonText ? 'flex gap-2' : 'relative'}>
          <div className="relative flex-1">
            {!buttonText && (
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-dark/40" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query && setIsOpen(true)}
              placeholder={placeholder}
              className={`w-full rounded-lg border border-neutral-dark/20 bg-white ${
                buttonText 
                  ? 'px-4 py-3 md:px-6 md:py-4' 
                  : 'py-3 pl-10 pr-4'
              } text-sm transition-colors focus:border-karasai-blue focus:outline-none focus:ring-2 focus:ring-karasai-blue/20 md:text-base`}
            />
          </div>

          {/* Optional Search Button */}
          {buttonText && (
            <button
              onClick={handleSearchClick}
              className="rounded-md bg-karasai-blue px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-karasai-blue/90 md:px-8 md:py-4 md:text-base"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>

      {/* Portal the dropdown to body */}
      {mounted && dropdown && createPortal(dropdown, document.body)}
    </>
  )
}