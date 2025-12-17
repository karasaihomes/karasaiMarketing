'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(2) // Question 3 is open by default

  const faqData: FAQItem[] = [
    {
      question: 'QUESTION 1',
      answer: 'Answer to question 1.',
    },
    {
      question: 'QUESTION 2',
      answer: 'Answer to question 2.',
    },
    {
      question: 'QUESTION 3',
      answer: 'Nulla euismod elementum.',
    },
    {
      question: 'QUESTION 4',
      answer: 'Answer to question 4.',
    },
    {
      question: 'QUESTION 5',
      answer: 'Answer to question 5.',
    },
  ]

  // Sample expanded questions for Question 3
  const expandedQuestions = [
    {
      q: 'Q: Liquam ex cquam, fringilla ac ligula vitae?',
      a: 'A: Nulla euismod elementum.',
    },
    {
      q: 'Q: Fringilla ac ligula vitae?',
      a: 'A: Elementum tortor sed laoreet.',
    },
    {
      q: 'Q: Pellentesque egestas, tellus sed accumsan?',
      a: 'A: Euismod elementum tortor sed.',
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-karasai-blue py-16 text-white md:py-24">
          <div className="container-custom">
            <h1 className="mb-12 text-center text-4xl font-bold uppercase tracking-widest">
              FAQ
            </h1>
            
            <div className="mx-auto max-w-4xl space-y-0">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-white/20"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest">
                      {faq.question}
                    </span>
                  </button>
                  
                  {openIndex === index && (
                    <div className="pb-8">
                      {index === 2 ? (
                        // Special expanded content for Question 3
                        <div className="space-y-6">
                          {expandedQuestions.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                              <p className="text-white/90">{item.q}</p>
                              <p className="text-white/90">{item.a}</p>
                              {idx < expandedQuestions.length - 1 && (
                                <div className="my-4 border-t border-white/10" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/80">{faq.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
