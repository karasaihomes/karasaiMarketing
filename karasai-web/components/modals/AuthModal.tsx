'use client'

import { useRouter } from 'next/navigation'
import { X, LogIn, User } from 'lucide-react'
import { useEffect } from 'react'

interface AuthModalProps {
  onClose: () => void
  onChoice: (choice: 'signin' | 'guest') => void
}

export default function AuthModal({ onClose, onChoice }: AuthModalProps) {
  const router = useRouter()

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleSignIn = () => {
    onChoice('signin')
    router.push('/login')
  }

  const handleGuest = () => {
    onChoice('guest')
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-neutral-dark/60 transition-colors hover:bg-neutral-gray hover:text-neutral-dark"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-neutral-dark">
            Save Your Favorites
          </h2>
          <p className="text-sm text-neutral-dark/70">
            Sign in to save properties across devices, or continue as a guest to save locally.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-karasai-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-karasai-blue/90"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>

          {/* Continue as Guest Button */}
          <button
            onClick={handleGuest}
            className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-karasai-blue bg-white px-6 py-3 text-base font-semibold text-karasai-blue transition-colors hover:bg-karasai-light"
          >
            <User className="h-5 w-5" />
            Continue as Guest
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-center text-xs text-neutral-dark/60">
          Guest favorites are saved on this device only. Sign in to access them anywhere.
        </p>
      </div>
    </div>
  )
}