'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'login' | 'signup' | 'forgot-password'
  onSuccess?: () => void
  redirectAfterAuth?: string
}

export default function AuthModal({
  isOpen,
  onClose,
  initialView = 'login',
  onSuccess,
  redirectAfterAuth,
}: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'forgot-password'>(initialView)

  // Reset view when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView)
    }
  }, [isOpen, initialView])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Desktop: Regular modal */}
        <div className="hidden rounded-lg bg-white shadow-2xl md:block">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-neutral-dark/40 transition-colors hover:bg-neutral-gray hover:text-neutral-dark"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="p-8">
            {view === 'login' && (
              <LoginForm
                onSuccess={handleSuccess}
                onSwitchToSignUp={() => setView('signup')}
                onSwitchToForgotPassword={() => setView('forgot-password')}
                redirectAfterAuth={redirectAfterAuth}
              />
            )}

            {view === 'signup' && (
              <SignUpForm
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setView('login')}
              />
            )}

            {view === 'forgot-password' && (
              <ForgotPasswordForm
                onSuccess={() => setView('login')}
                onSwitchToLogin={() => setView('login')}
              />
            )}
          </div>
        </div>

        {/* Mobile: Full-screen */}
        <div className="fixed inset-0 bg-white md:hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-dark/40 transition-colors hover:bg-neutral-gray hover:text-neutral-dark"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Scrollable content */}
          <div className="h-full overflow-y-auto p-6 pt-16">
            {view === 'login' && (
              <LoginForm
                onSuccess={handleSuccess}
                onSwitchToSignUp={() => setView('signup')}
                onSwitchToForgotPassword={() => setView('forgot-password')}
                redirectAfterAuth={redirectAfterAuth}
              />
            )}

            {view === 'signup' && (
              <SignUpForm
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setView('login')}
              />
            )}

            {view === 'forgot-password' && (
              <ForgotPasswordForm
                onSuccess={() => setView('login')}
                onSwitchToLogin={() => setView('login')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}