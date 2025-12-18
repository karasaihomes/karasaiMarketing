'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { FormData } from './ListYourHomeClient'

interface Step2Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step2ContactInfo({ formData, updateFormData, onNext, onBack }: Step2Props) {
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

    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Name is required'
    }

    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address'
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
          Contact Information
        </h2>
        <p className="text-sm text-neutral-dark/70">
          How can we reach you about this listing?
        </p>
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="contact_name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Your Full Name *
        </label>
        <input
          type="text"
          id="contact_name"
          name="contact_name"
          value={formData.contact_name}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
            errors.contact_name ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
          }`}
          placeholder="John Smith"
        />
        {errors.contact_name && (
          <p className="mt-1 text-xs text-status-rented">{errors.contact_name}</p>
        )}
      </div>

      {/* Contact Email */}
      <div>
        <label htmlFor="contact_email" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Email Address *
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
            errors.contact_email ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
          }`}
          placeholder="john@example.com"
        />
        {errors.contact_email && (
          <p className="mt-1 text-xs text-status-rented">{errors.contact_email}</p>
        )}
      </div>

      {/* Contact Phone */}
      <div>
        <label htmlFor="contact_phone" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Phone Number <span className="text-neutral-dark/40">(Optional)</span>
        </label>
        <input
          type="tel"
          id="contact_phone"
          name="contact_phone"
          value={formData.contact_phone}
          onChange={handleChange}
          className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="company_name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Company / Organization Name <span className="text-neutral-dark/40">(Optional)</span>
        </label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
          placeholder="ABC Property Management"
        />
        <p className="mt-2 text-xs text-neutral-dark/60">
          If you manage properties for a company, please include the company name.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border-2 border-neutral-gray bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-neutral-dark transition-all hover:border-karasai-blue hover:text-karasai-blue"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>

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