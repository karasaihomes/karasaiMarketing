'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Loader2, Save, Eye, EyeOff, Mail, Lock, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface SecuritySectionProps {
  user: SupabaseUser
}

export default function SecuritySection({ user }: SecuritySectionProps) {
  const [emailData, setEmailData] = useState({
    newEmail: '',
  })
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const passwordStrength = getPasswordStrength(passwordData.newPassword)

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ]

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailData.newEmail.trim()) {
      toast.error('Please enter a new email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.newEmail)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsUpdatingEmail(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        email: emailData.newEmail,
      })

      if (error) throw error

      toast.success('Verification email sent! Check your new email to confirm the change.')
      setEmailData({ newEmail: '' })
    } catch (error: any) {
      console.error('Error updating email:', error)
      toast.error(error.message || 'Failed to update email')
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordData.newPassword) {
      toast.error('Please enter a new password')
      return
    }

    if (passwordStrength < 4) {
      toast.error('Password must meet all requirements')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsUpdatingPassword(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) throw error

      toast.success('Password updated successfully!')
      setPasswordData({ newPassword: '', confirmPassword: '' })
    } catch (error: any) {
      console.error('Error updating password:', error)
      toast.error(error.message || 'Failed to update password')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Change Email */}
      <div>
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-neutral-dark">
            Change Email
          </h2>
          <p className="text-sm text-neutral-dark/70">
            Update the email address associated with your account
          </p>
        </div>

        <form onSubmit={handleEmailUpdate} className="space-y-4">
          {/* Current Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
              Current Email
            </label>
            <div className="flex items-center gap-3 rounded-lg border-2 border-neutral-gray bg-neutral-gray/50 px-4 py-3">
              <Mail className="h-5 w-5 text-neutral-dark/40" />
              <span className="text-sm text-neutral-dark">{user.email}</span>
            </div>
          </div>

          {/* New Email */}
          <div>
            <label htmlFor="newEmail" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
              New Email
            </label>
            <input
              type="email"
              id="newEmail"
              value={emailData.newEmail}
              onChange={(e) => setEmailData({ newEmail: e.target.value })}
              className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
              placeholder="newemail@example.com"
            />
            <p className="mt-2 text-xs text-neutral-dark/60">
              You'll need to verify your new email address
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdatingEmail || !emailData.newEmail}
              className="flex items-center gap-2 rounded-lg bg-karasai-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-gray"></div>

      {/* Change Password */}
      <div>
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-neutral-dark">
            Change Password
          </h2>
          <p className="text-sm text-neutral-dark/70">
            Create a new password for your account
          </p>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 pr-12 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark/40 hover:text-neutral-dark"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Requirements */}
            {passwordData.newPassword && (
              <div className="mt-3 space-y-1">
                {passwordRequirements.map((req, index) => {
                  const passes = req.test(passwordData.newPassword)
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
            )}
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
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 pr-12 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
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

            {/* Match Indicator */}
            {passwordData.confirmPassword && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                {passwordData.newPassword === passwordData.confirmPassword ? (
                  <>
                    <Check className="h-4 w-4 text-status-available" />
                    <span className="text-status-available">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-status-rented" />
                    <span className="text-status-rented">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdatingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
              className="flex items-center gap-2 rounded-lg bg-karasai-blue px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}