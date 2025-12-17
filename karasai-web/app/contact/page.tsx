'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    messageType: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const supabase = createClient()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            message_type: formData.messageType,
            message: formData.message.trim(),
          },
        ])

      if (error) throw error

      // Success!
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        messageType: 'general',
        message: '',
      })

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-karasai-blue py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
                Contact Us
              </h1>
              <p className="text-base text-white/90 md:text-lg">
                Have a question or need help? We're here for you.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-gray py-12 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Contact Info */}
                <div className="space-y-6 lg:col-span-1">
                  <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                    Get in Touch
                  </h2>
                  
                  {/* Email */}
                  <div className="rounded-lg bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
                        <Mail className="h-5 w-5 text-karasai-blue" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-dark">
                        Email
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-dark/80">
                      support@karasai.com
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="rounded-lg bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
                        <Phone className="h-5 w-5 text-karasai-blue" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-dark">
                        Phone
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-dark/80">
                      (555) 123-4567
                    </p>
                    <p className="mt-1 text-xs text-neutral-dark/60">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>

                  {/* Location */}
                  <div className="rounded-lg bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
                        <MapPin className="h-5 w-5 text-karasai-blue" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-dark">
                        Location
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-dark/80">
                      Phoenix, Arizona<br />
                      United States
                    </p>
                  </div>

                  {/* Response Time */}
                  <div className="rounded-lg border-2 border-karasai-light bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-karasai-blue">
                      Response Time
                    </p>
                    <p className="mt-2 text-sm text-neutral-dark/80">
                      We typically respond within 24-48 hours during business days.
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
                    <h2 className="mb-6 text-xl font-bold uppercase tracking-wide text-neutral-dark md:text-2xl">
                      Send Us a Message
                    </h2>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <div className="mb-6 rounded-lg border-2 border-status-available bg-status-available/10 p-4">
                        <p className="text-sm font-semibold text-status-available">
                          ✓ Message sent successfully! We'll get back to you soon.
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="mb-6 rounded-lg border-2 border-status-rented bg-status-rented/10 p-4">
                        <p className="text-sm font-semibold text-status-rented">
                          ✗ Something went wrong. Please try again or email us directly.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
                            errors.name ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-status-rented">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
                            errors.email ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-status-rented">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone (Optional) */}
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                          Phone <span className="text-neutral-dark/40">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      {/* Message Type */}
                      <div>
                        <label htmlFor="messageType" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                          Message Type
                        </label>
                        <select
                          id="messageType"
                          name="messageType"
                          value={formData.messageType}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark focus:border-karasai-blue focus:outline-none"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="support">Support</option>
                          <option value="partnership">Partnership Opportunity</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
                            errors.message ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
                          }`}
                          placeholder="Tell us how we can help you... (minimum 20 characters)"
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-status-rented">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-karasai-blue px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                      >
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-neutral-dark/60">
                        * Required fields
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}