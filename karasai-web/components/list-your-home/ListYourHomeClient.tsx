'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Step1PropertyDetails from './Step1PropertyDetails'
import Step2ContactInfo from './Step2ContactInfo'
import Step3Verification from './Step3Verification'
import Step4Review from './Step4Review'
import SuccessMessage from './SuccessMessage'
import { createClient } from '@/lib/supabase/client'

export interface FormData {
  // Step 1: Property Details
  address: string
  city: string
  state: string
  zip: string
  bedrooms: string
  bathrooms: string
  square_feet: string
  rent: string
  
  // Step 2: Contact Info
  contact_name: string
  contact_email: string
  contact_phone: string
  company_name: string
  
  // Step 3: Verification
  verification_method: string
  
  // Step 4: Additional Notes
  additional_notes: string
}

const INITIAL_FORM_DATA: FormData = {
  address: '',
  city: '',
  state: '',
  zip: '',
  bedrooms: '',
  bathrooms: '',
  square_feet: '',
  rent: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  company_name: '',
  verification_method: '',
  additional_notes: '',
}

export default function ListYourHomeClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Ref for progress indicator
  const progressRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('list_your_home_form')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem('list_your_home_form', JSON.stringify(formData))
    }
  }, [formData, isSuccess])

  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  // Scroll to progress indicator
  const scrollToProgress = () => {
    if (progressRef.current) {
      const yOffset = -120 // 120px above to account for sticky header + padding
      const y = progressRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      scrollToProgress()
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      scrollToProgress()
    }
  }

  // Submit form to Supabase
  const submitForm = async () => {
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('listing_requests')
        .insert([
          {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
            bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
            square_feet: formData.square_feet ? parseInt(formData.square_feet) : null,
            rent: formData.rent ? parseFloat(formData.rent) : null,
            contact_name: formData.contact_name,
            contact_email: formData.contact_email,
            contact_phone: formData.contact_phone || null,
            company_name: formData.company_name || null,
            verification_method: formData.verification_method,
            additional_notes: formData.additional_notes || null,
            status: 'pending',
          },
        ])

      if (error) throw error

      // Success!
      setIsSuccess(true)
      localStorage.removeItem('list_your_home_form')
      
      // Scroll with offset for header
      setTimeout(() => {
        const yOffset = 120 // Same offset as step navigation
        window.scrollTo({ top: yOffset, behavior: 'smooth' })
      }, 100)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
    setIsSuccess(false)
    localStorage.removeItem('list_your_home_form')
  }

  // Show success message
  if (isSuccess) {
    return <SuccessMessage onReset={resetForm} />
  }

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Progress Indicator */}
          <div ref={progressRef} className="mb-8">
            {/* Circles and Lines */}
            <div className="relative flex items-center justify-between">
              {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                  {/* Circle */}
                  <div 
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all"
                    style={{
                      borderColor: step === currentStep || step < currentStep ? '#4E70C6' : '#F5F5F5',
                      backgroundColor: step === currentStep || step < currentStep ? '#4E70C6' : '#FFFFFF',
                      color: step === currentStep || step < currentStep ? '#FFFFFF' : '#33333366'
                    }}
                  >
                    {step}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < 3 && (
                    <div 
                      className="h-1 flex-1 rounded transition-all"
                      style={{
                        backgroundColor: step < currentStep ? '#4E70C6' : '#F5F5F5',
                        marginLeft: '8px',
                        marginRight: '8px'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Labels */}
            <div className="mt-4 flex justify-between">
              <div className={`flex-1 text-center text-xs md:text-sm ${currentStep === 1 ? 'font-bold text-karasai-blue' : 'text-neutral-dark/60'}`}>
                Property
              </div>
              <div className={`flex-1 text-center text-xs md:text-sm ${currentStep === 2 ? 'font-bold text-karasai-blue' : 'text-neutral-dark/60'}`}>
                Contact
              </div>
              <div className={`flex-1 text-center text-xs md:text-sm ${currentStep === 3 ? 'font-bold text-karasai-blue' : 'text-neutral-dark/60'}`}>
                Verify
              </div>
              <div className={`flex-1 text-center text-xs md:text-sm ${currentStep === 4 ? 'font-bold text-karasai-blue' : 'text-neutral-dark/60'}`}>
                Review
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
            {currentStep === 1 && (
              <Step1PropertyDetails
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}

            {currentStep === 2 && (
              <Step2ContactInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep === 3 && (
              <Step3Verification
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep === 4 && (
              <Step4Review
                formData={formData}
                updateFormData={updateFormData}
                onSubmit={submitForm}
                onBack={prevStep}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-dark/60">
              Questions? <a href="/contact" className="text-karasai-blue hover:underline">Contact us</a> for help.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}