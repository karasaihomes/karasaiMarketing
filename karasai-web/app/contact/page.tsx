'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Contact Form Section */}
        <section className="bg-karasai-light py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-12 text-center text-3xl font-medium uppercase tracking-widest text-karasai-blue">
                Get In Touch
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-none border-0 bg-white px-6 py-4 text-sm uppercase tracking-wider placeholder:text-neutral-dark/40 focus:outline-none focus:ring-2 focus:ring-karasai-blue"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-none border-0 bg-white px-6 py-4 text-sm uppercase tracking-wider placeholder:text-neutral-dark/40 focus:outline-none focus:ring-2 focus:ring-karasai-blue"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    placeholder="MESSAGE"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full resize-none rounded-none border-0 bg-white px-6 py-4 text-sm uppercase tracking-wider placeholder:text-neutral-dark/40 focus:outline-none focus:ring-2 focus:ring-karasai-blue"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="rounded-md bg-karasai-blue px-16 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-karasai-blue/90"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
