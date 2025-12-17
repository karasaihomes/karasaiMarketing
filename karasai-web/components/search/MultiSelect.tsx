'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, X } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchable?: boolean
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
  searchable = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  // Set mounted state for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4, // 4px gap
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on scroll (page scroll only, not dropdown scroll)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      // Don't close if scrolling inside the dropdown
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

  // Filter options based on search
  const filteredOptions = searchable && searchQuery
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const dropdown = isOpen && mounted ? (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
        zIndex: 9999,
      }}
      className="max-h-64 overflow-hidden rounded-md border border-neutral-gray bg-white shadow-lg"
    >
      {/* Search Input */}
      {searchable && (
        <div className="border-b border-neutral-gray p-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded border border-neutral-dark/20 px-2 py-1 text-sm focus:border-karasai-blue focus:outline-none focus:ring-1 focus:ring-karasai-blue"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Options List */}
      <div className="max-h-52 overflow-y-auto">
        {filteredOptions.length === 0 ? (
          <div className="px-3 py-2 text-sm text-neutral-dark/60">
            No options found
          </div>
        ) : (
          filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-karasai-light"
            >
              <div
                className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${
                  selected.includes(option.value)
                    ? 'border-karasai-blue bg-karasai-blue'
                    : 'border-neutral-dark/30'
                }`}
              >
                {selected.includes(option.value) && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </div>
              <span className="text-neutral-dark">{option.label}</span>
            </button>
          ))
        )}
      </div>
    </div>
  ) : null

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-neutral-dark/20 bg-white px-3 py-2 text-left text-sm transition-colors hover:border-karasai-blue focus:border-karasai-blue focus:outline-none focus:ring-1 focus:ring-karasai-blue"
      >
        <span className={selected.length === 0 ? 'text-neutral-dark/40' : 'text-neutral-dark'}>
          {selected.length === 0
            ? placeholder
            : `${selected.length} selected`}
        </span>
        <div className="flex items-center gap-1">
          {selected.length > 0 && (
            <div
              onClick={clearAll}
              className="rounded p-0.5 hover:bg-neutral-gray cursor-pointer"
            >
              <X className="h-3 w-3" />
            </div>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Portal the dropdown to body */}
      {mounted && dropdown && createPortal(dropdown, document.body)}
    </>
  )
}