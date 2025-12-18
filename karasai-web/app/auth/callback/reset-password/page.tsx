'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface PasswordStrength {
  score: number
  label: string
  color: string
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Calculate password strength
  const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
    const colors = ['#D93C04', '#FFC409', '#FFC409', '#4EC645', '#4EC645']

    return {
      score,
      label: labels[score] || 'Weak',
      color: colors[score] || '#D93C04',
    }
  }

  const passwordStrength = getPasswordStrength(password)

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ]

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (passwordStrength.score < 4) {
      newErrors.password = 'Password must meet all requirements'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setIsSuccess(true)

      // Redirect to homepage after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error: any) {
      console.error('Reset password error:', error)
      setErrors({ password: error.message || 'Failed to reset password' })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-neutral-gray py-12">
          <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-available/20">
                <Check className="h-10 w-10 text-status-available" />
              </div>
            </div>
            <h1 className="mb-4 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
              Password Reset Successfully
            </h1>
            <p className="mb-6 text-sm text-neutral-dark/70">
              Your password has been updated. Redirecting to homepage...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center bg-neutral-gray py-12">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
              Reset Your Password
            </h1>
            <p className="text-sm text-neutral-dark/70">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
                  }}
                  className={`w-full rounded-lg border-2 bg-white px-4 py-3 pr-12 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
                    errors.password ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark/40 hover:text-neutral-dark"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-gray">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.score / 4) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    {passwordRequirements.map((req, index) => {
                      const passes = req.test(password)
                      return (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {passes ? (
                            <Check className="h-4 w-4 text-status-available" />
                          ) : (
                            <X className="h-4 w-4 text-neutral-dark/20" />
                          )}
                          <span className={passes ? 'text-status-available' : 'text-neutral-dark/60'}>
                            {req.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {errors.password && <p className="mt-1 text-xs text-status-rented">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }))
                  }}
                  className={`w-full rounded-lg border-2 bg-white px-4 py-3 pr-12 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:outline-none ${
                    errors.confirmPassword ? 'border-status-rented' : 'border-neutral-gray focus:border-karasai-blue'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark/40 hover:text-neutral-dark"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-status-rented">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}