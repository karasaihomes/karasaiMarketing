'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { FormData } from './ListYourHomeClient'

interface Step3Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step3Verification({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.verification_method) {
      newErrors.verification_method = 'Please select a verification method'
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

  const verificationOptions = [
    {
      value: 'property_tax',
      label: 'Property Tax Records',
      description: 'I can provide property tax documentation showing ownership',
    },
    {
      value: 'management_agreement',
      label: 'Management Agreement',
      description: 'I have a management agreement or contract',
    },
    {
      value: 'llc_documentation',
      label: 'LLC Documentation',
      description: 'I can provide LLC or business entity documentation',
    },
    {
      value: 'business_license',
      label: 'Business License',
      description: 'I have a valid property management business license',
    },
    {
      value: 'other',
      label: 'Other Method',
      description: 'I have another way to verify ownership (explain in notes)',
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
          Verification Method
        </h2>
        <p className="text-sm text-neutral-dark/70">
          How can you verify your ownership or management rights for this property?
        </p>
      </div>

      {/* Verification Options */}
      <div className="space-y-3">
        {verificationOptions.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all ${
              formData.verification_method === option.value
                ? 'border-karasai-blue bg-karasai-light/20'
                : 'border-neutral-gray bg-white hover:border-karasai-light'
            }`}
          >
            <input
              type="radio"
              name="verification_method"
              value={option.value}
              checked={formData.verification_method === option.value}
              onChange={handleChange}
              className="mt-1 h-5 w-5 cursor-pointer text-karasai-blue"
            />
            <div className="flex-1">
              <div className="font-semibold text-neutral-dark">{option.label}</div>
              <div className="mt-1 text-sm text-neutral-dark/70">{option.description}</div>
            </div>
          </label>
        ))}
      </div>

      {errors.verification_method && (
        <p className="text-xs text-status-rented">{errors.verification_method}</p>
      )}

      {/* Additional Notes */}
      <div>
        <label htmlFor="additional_notes" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
          Additional Notes <span className="text-neutral-dark/40">(Optional)</span>
        </label>
        <textarea
          id="additional_notes"
          name="additional_notes"
          value={formData.additional_notes}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
          placeholder="Any additional information you'd like to share about this property or your verification method..."
        />
        <p className="mt-2 text-xs text-neutral-dark/60">
          Include any special circumstances or additional details that might help us verify your listing faster.
        </p>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-karasai-blue">
          What Happens Next?
        </h3>
        <ul className="space-y-2 text-sm text-neutral-dark/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>Our team will review your submission within 1-2 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>We'll contact you to verify ownership using your selected method</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>Once verified, your property will be added to our platform</span>
          </li>
        </ul>
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
          Review Submission
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}