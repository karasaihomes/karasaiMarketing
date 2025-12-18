'use client'

import { ChevronLeft, Send } from 'lucide-react'
import type { FormData } from './ListYourHomeClient'

interface Step4Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

export default function Step4Review({ formData, onSubmit, onBack, isSubmitting }: Step4Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const verificationLabels: Record<string, string> = {
    property_tax: 'Property Tax Records',
    management_agreement: 'Management Agreement',
    llc_documentation: 'LLC Documentation',
    business_license: 'Business License',
    other: 'Other Method',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
          Review Your Submission
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Please review your information before submitting.
        </p>
      </div>

      {/* Property Details */}
      <div className="rounded-lg border-2 border-neutral-gray bg-neutral-gray/50 p-4 md:p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-karasai-blue">
          Property Details
        </h3>
        <div className="space-y-3">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Address</p>
              <p className="text-sm text-neutral-dark">{formData.address}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">City</p>
              <p className="text-sm text-neutral-dark">{formData.city}, {formData.state} {formData.zip}</p>
            </div>
          </div>
          
          <div className="grid gap-2 md:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Bedrooms</p>
              <p className="text-sm text-neutral-dark">{formData.bedrooms}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Bathrooms</p>
              <p className="text-sm text-neutral-dark">{formData.bathrooms}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Square Feet</p>
              <p className="text-sm text-neutral-dark">{formData.square_feet || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Monthly Rent</p>
              <p className="text-sm text-neutral-dark">${formData.rent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border-2 border-neutral-gray bg-neutral-gray/50 p-4 md:p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-karasai-blue">
          Contact Information
        </h3>
        <div className="space-y-3">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Name</p>
              <p className="text-sm text-neutral-dark">{formData.contact_name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Email</p>
              <p className="text-sm text-neutral-dark">{formData.contact_email}</p>
            </div>
          </div>
          
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Phone</p>
              <p className="text-sm text-neutral-dark">{formData.contact_phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Company</p>
              <p className="text-sm text-neutral-dark">{formData.company_name || 'Individual owner'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Method */}
      <div className="rounded-lg border-2 border-neutral-gray bg-neutral-gray/50 p-4 md:p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-karasai-blue">
          Verification Method
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Selected Method</p>
            <p className="text-sm text-neutral-dark">{verificationLabels[formData.verification_method]}</p>
          </div>
          
          {formData.additional_notes && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">Additional Notes</p>
              <p className="text-sm text-neutral-dark">{formData.additional_notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4">
        <p className="text-sm leading-relaxed text-neutral-dark/80">
          By submitting this form, I confirm that I am the legal owner or authorized property manager for this property and that all information provided is accurate and truthful.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg border-2 border-neutral-gray bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-neutral-dark transition-all hover:border-karasai-blue hover:text-karasai-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              Submit Request
              <Send className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}