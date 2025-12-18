'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff } from 'lucide-react'

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToSignUp: () => void
  onSwitchToForgotPassword: () => void
  redirectAfterAuth?: string
}

export default function LoginForm({
  onSuccess,
  onSwitchToSignUp,
  onSwitchToForgotPassword,
  redirectAfterAuth,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')

    if (!validate()) return

    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      onSuccess()
    } catch (error: any) {
      console.error('Login error:', error)
      setGeneralError(error.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true)
    setGeneralError('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            redirectAfterAuth ? `?redirect=${redirectAfterAuth}` : ''
          }`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error('OAuth error:', error)
      setGeneralError(error.message || `Failed to sign in with ${provider}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold uppercase tracking-wide text-neutral-dark">
          Welcome Back
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Sign in to save properties and manage your account
        </p>
      </div>

      {/* General Error */}
      {generalError && (
        <div className="mb-4 rounded-lg border-2 border-status-rented bg-status-rented/10 p-3">
          <p className="text-sm text-status-rented">{generalError}</p>
        </div>
      )}

      {/* OAuth Buttons */}
      <div className="mb-6 space-y-3">
        <button
          type="button"
          onClick={() => handleOAuthLogin('google')}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin('facebook')}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm font-semibold text-neutral-dark transition-all hover:border-karasai-blue hover:bg-karasai-light/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-gray"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-dark/60">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
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
          />
          {errors.email && <p className="mt-1 text-xs text-status-rented">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Password
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
          {errors.password && <p className="mt-1 text-xs text-status-rented">{errors.password}</p>}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm font-semibold text-karasai-blue hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-sm text-neutral-dark/70">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignUp}
          className="font-semibold text-karasai-blue hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}