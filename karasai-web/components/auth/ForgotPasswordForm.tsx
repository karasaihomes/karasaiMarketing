'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle } from 'lucide-react'

interface ForgotPasswordFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function ForgotPasswordForm({ onSuccess, onSwitchToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setIsSuccess(true)
    } catch (error: any) {
      console.error('Reset password error:', error)
      setErrors({ email: error.message || 'Failed to send reset email' })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-available/20">
            <CheckCircle className="h-10 w-10 text-status-available" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="mb-3 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
          Check Your Email
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-neutral-dark/70">
          We've sent a password reset link to <strong>{email}</strong>.
          <br />
          Click the link in the email to reset your password.
        </p>

        {/* Info Box */}
        <div className="mb-6 rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4 text-left">
          <p className="text-sm leading-relaxed text-neutral-dark/80">
            <strong>Didn't receive the email?</strong>
            <br />
            Check your spam folder or wait a few minutes and try again.
          </p>
        </div>

        {/* Back to Login */}
        <button
          onClick={onSwitchToLogin}
          className="w-full rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
          Reset Password
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
            }}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
              errors.email ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
            }`}
            placeholder="you@example.com"
            autoFocus
          />
          {errors.email && <p className="mt-1 text-xs text-status-rented">{errors.email}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-sm font-semibold text-karasai-blue hover:underline"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  )
}