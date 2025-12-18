'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { FormData } from './ListYourHomeClient'

interface Step1Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export default function Step1PropertyDetails({ formData, updateFormData, onNext }: Step1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required'
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'Invalid ZIP code format'
    }

    if (!formData.bedrooms.trim()) {
      newErrors.bedrooms = 'Bedrooms is required'
    }

    if (!formData.bathrooms.trim()) {
      newErrors.bathrooms = 'Bathrooms is required'
    }

    if (!formData.rent.trim()) {
      newErrors.rent = 'Monthly rent is required'
    } else if (isNaN(parseFloat(formData.rent)) || parseFloat(formData.rent) <= 0) {
      newErrors.rent = 'Please enter a valid rent amount'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
          Property Details
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Tell us about the property you'd like to list.
        </p>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Street Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
            errors.address ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
          }`}
          placeholder="123 Main St"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-status-rented">{errors.address}</p>
        )}
      </div>

      {/* City, State, ZIP */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.city ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="Phoenix"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-status-rented">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            State *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.state ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="AZ"
            maxLength={2}
          />
          {errors.state && (
            <p className="mt-1 text-xs text-status-rented">{errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="zip" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.zip ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="85001"
          />
          {errors.zip && (
            <p className="mt-1 text-xs text-status-rented">{errors.zip}</p>
          )}
        </div>
      </div>

      {/* Bedrooms, Bathrooms, Sqft */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="bedrooms" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Bedrooms *
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="0"
            step="1"
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.bedrooms ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="3"
          />
          {errors.bedrooms && (
            <p className="mt-1 text-xs text-status-rented">{errors.bedrooms}</p>
          )}
        </div>

        <div>
          <label htmlFor="bathrooms" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Bathrooms *
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min="0"
            step="0.5"
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.bathrooms ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="2"
          />
          {errors.bathrooms && (
            <p className="mt-1 text-xs text-status-rented">{errors.bathrooms}</p>
          )}
        </div>

        <div>
          <label htmlFor="square_feet" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            value={formData.square_feet}
            onChange={handleChange}
            min="0"
            step="1"
            className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
            placeholder="1500"
          />
        </div>
      </div>

      {/* Monthly Rent */}
      <div>
        <label htmlFor="rent" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Monthly Rent *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-dark">$</span>
          <input
            type="number"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full rounded-lg border-2 bg-white py-3 pl-8 pr-4 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.rent ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="2000"
          />
        </div>
        {errors.rent && (
          <p className="mt-1 text-xs text-status-rented">{errors.rent}</p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
        >
          Next Step
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}