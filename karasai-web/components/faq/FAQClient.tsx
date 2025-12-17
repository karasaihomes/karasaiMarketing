'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface FAQ {
  id: string
  slug: string
  question: string
  answer: string
  category: string
  is_featured: boolean
}

interface FAQClientProps {
  faqs: FAQ[]
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'renters' | 'managers' | 'general'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Handle direct linking to specific FAQ via URL hash
  useEffect(() => {
    // Check for hash in URL (e.g., /faq#is-karasai-free)
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // Find the FAQ with matching slug
      const faqIndex = filteredFAQs.findIndex((faq) => faq.slug === hash)
      if (faqIndex !== -1) {
        // Open the FAQ
        setOpenIndex(faqIndex)
        // Scroll to it after a brief delay to ensure rendering
        setTimeout(() => {
          const element = document.getElementById(`faq-${hash}`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    }
  }, [])

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Copy link to clipboard
  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/faq#${slug}`
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  return (
    <>
      {/* Search and Filter Section */}
      <section className="border-b border-neutral-gray bg-white py-6">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-dark/40" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-neutral-gray bg-white py-3 pl-12 pr-4 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none md:text-base"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                  selectedCategory === 'all'
                    ? 'bg-karasai-blue text-white'
                    : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('renters')}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                  selectedCategory === 'renters'
                    ? 'bg-karasai-blue text-white'
                    : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                }`}
              >
                For Renters
              </button>
              <button
                onClick={() => setSelectedCategory('managers')}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                  selectedCategory === 'managers'
                    ? 'bg-karasai-blue text-white'
                    : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                }`}
              >
                For Managers
              </button>
              <button
                onClick={() => setSelectedCategory('general')}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors md:px-6 md:text-base ${
                  selectedCategory === 'general'
                    ? 'bg-karasai-blue text-white'
                    : 'bg-neutral-gray text-neutral-dark hover:bg-karasai-light'
                }`}
              >
                General
              </button>
            </div>

            {/* Results Count */}
            <p className="mt-4 text-sm text-neutral-dark/60">
              Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-neutral-gray py-12 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center shadow-md">
                <p className="text-base text-neutral-dark/80 md:text-lg">
                  No questions found matching your search. Try different keywords or browse all questions.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={faq.id}
                    id={`faq-${faq.slug}`}
                    className={`overflow-hidden rounded-lg bg-white shadow-md transition-all ${
                      openIndex === index ? 'ring-2 ring-karasai-blue' : 'hover:shadow-lg'
                    }`}
                  >
                    {/* Question Button */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-neutral-gray/50 md:p-6"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-dark md:text-base">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-karasai-blue transition-transform md:h-6 md:w-6 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Answer */}
                    {openIndex === index && (
                      <div className="border-t border-neutral-gray bg-white">
                        <div className="p-4 md:p-6">
                          <p className="mb-4 text-sm leading-relaxed text-neutral-dark/80 md:text-base">
                            {faq.answer}
                          </p>
                          
                          {/* Share Link Button */}
                          <button
                            onClick={() => copyLink(faq.slug)}
                            className="text-xs font-semibold text-karasai-blue hover:underline md:text-sm"
                          >
                            📋 Copy link to this question
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}