'use client'

import { useEffect, useState } from 'react'
import MultiSelect from './MultiSelect'
import { fetchFilterOptions, type FilterOptions } from '@/lib/filterOptions'
import type { Filters } from '@/types/index'

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  clearFilters: () => void
}

export default function FilterSidebar({ filters, setFilters, clearFilters }: FilterSidebarProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)

  // Fetch dynamic filter options on mount
  useEffect(() => {
    const loadOptions = async () => {
      const options = await fetchFilterOptions()
      setFilterOptions(options)
      setIsLoadingOptions(false)
    }
    loadOptions()
  }, [])

  const toggleArrayFilter = (key: keyof Filters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value]
    setFilters({ ...filters, [key]: newArray })
  }

  if (isLoadingOptions || !filterOptions) {
    return (
      <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 w-20 rounded bg-neutral-gray"></div>
          <div className="mt-4 space-y-3">
            <div className="h-10 rounded bg-neutral-gray"></div>
            <div className="h-10 rounded bg-neutral-gray"></div>
            <div className="h-10 rounded bg-neutral-gray"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-dark">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-karasai-blue hover:text-karasai-blue/80"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-dark">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full rounded-md border border-neutral-dark/20 bg-white px-3 py-2 text-sm focus:border-karasai-blue focus:outline-none focus:ring-1 focus:ring-karasai-blue"
          >
            <option value="created_at_desc">Recently Listed</option>
            <option value="available_first">Availability</option>
            <option value="rent_asc">Price: Low to High</option>
            <option value="rent_desc">Price: High to Low</option>
            <option value="beds_desc">Bedrooms: High to Low</option>
            <option value="beds_asc">Bedrooms: Low to High</option>
          </select>
        </div>

        {/* Management Company */}
        {filterOptions.managementCompanies.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Management Company
            </label>
            <MultiSelect
              options={filterOptions.managementCompanies}
              selected={filters.managementCompanies}
              onChange={(selected) => setFilters({ ...filters, managementCompanies: selected })}
              placeholder="Select companies..."
              searchable={filterOptions.managementCompanies.length > 10}
            />
          </div>
        )}

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-dark">
            Status
          </label>
          <div className="space-y-2">
            {[
              { value: 'available', label: 'Available' },
              { value: 'coming_soon', label: 'Coming Soon' },
              { value: 'rented', label: 'Occupied' },
            ].map((status) => (
              <label key={status.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.statuses.includes(status.value)}
                  onChange={() => toggleArrayFilter('statuses', status.value)}
                  className="h-4 w-4 rounded border-neutral-dark/30 text-karasai-blue focus:ring-karasai-blue"
                />
                <span className="text-neutral-dark">{status.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        {filterOptions.bedrooms.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Bedrooms
            </label>
            <div className="grid grid-cols-3 gap-2">
              {filterOptions.bedrooms.map((bed) => (
                <button
                  key={bed}
                  onClick={() => toggleArrayFilter('beds', bed.toString())}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    filters.beds.includes(bed.toString())
                      ? 'border-karasai-blue bg-karasai-blue text-white'
                      : 'border-neutral-dark/20 bg-white text-neutral-dark hover:border-karasai-blue'
                  }`}
                >
                  {bed === 5 ? '5+' : bed}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bathrooms */}
        {filterOptions.bathrooms.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Bathrooms
            </label>
            <div className="grid grid-cols-3 gap-2">
              {filterOptions.bathrooms.map((bath) => (
                <button
                  key={bath}
                  onClick={() => toggleArrayFilter('baths', bath.toString())}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    filters.baths.includes(bath.toString())
                      ? 'border-karasai-blue bg-karasai-blue text-white'
                      : 'border-neutral-dark/20 bg-white text-neutral-dark hover:border-karasai-blue'
                  }`}
                >
                  {bath === 3 ? '3+' : bath}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Square Footage */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-dark">
            Square Footage
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minSqft || ''}
              onChange={(e) => setFilters({ ...filters, minSqft: e.target.value ? parseInt(e.target.value) : undefined })}
              className="rounded-md border border-neutral-dark/20 bg-white px-3 py-2 text-sm focus:border-karasai-blue focus:outline-none focus:ring-1 focus:ring-karasai-blue"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxSqft || ''}
              onChange={(e) => setFilters({ ...filters, maxSqft: e.target.value ? parseInt(e.target.value) : undefined })}
              className="rounded-md border border-neutral-dark/20 bg-white px-3 py-2 text-sm focus:border-karasai-blue focus:outline-none focus:ring-1 focus:ring-karasai-blue"
            />
          </div>
        </div>

        {/* Property Type */}
        {filterOptions.propertyTypes.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Property Type
            </label>
            <MultiSelect
              options={filterOptions.propertyTypes}
              selected={filters.propertyTypes}
              onChange={(selected) => setFilters({ ...filters, propertyTypes: selected })}
              placeholder="Select types..."
            />
          </div>
        )}

        {/* Pet Policy */}
        {filterOptions.petPolicies.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Pet Policy
            </label>
            <MultiSelect
              options={filterOptions.petPolicies}
              selected={filters.petPolicy}
              onChange={(selected) => setFilters({ ...filters, petPolicy: selected })}
              placeholder="Select policies..."
            />
          </div>
        )}

        {/* Amenities */}
        {filterOptions.amenities.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-dark">
              Amenities
            </label>
            <MultiSelect
              options={filterOptions.amenities}
              selected={filters.amenities}
              onChange={(selected) => setFilters({ ...filters, amenities: selected })}
              placeholder="Select amenities..."
              searchable
            />
          </div>
        )}
      </div>
    </div>
  )
}