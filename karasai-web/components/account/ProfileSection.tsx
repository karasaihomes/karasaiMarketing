'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Loader2, Save, User } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProfileSectionProps {
  user: SupabaseUser
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    try {
      const supabase = createClient()

      // Try to get profile from user_profiles table
      const { data, error } = await supabase
        .from('user_profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single()

      if (data) {
        setFormData({
          fullName: data.full_name || '',
          phone: data.phone || '',
        })
      } else {
        // Fallback to user metadata
        setFormData({
          fullName: user.user_metadata?.full_name || '',
          phone: user.user_metadata?.phone || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone || null,
        },
      })

      if (metadataError) throw metadataError

      // Update user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          phone: formData.phone || null,
          updated_at: new Date().toISOString(),
        })

      if (profileError) {
        console.error('Profile table update failed:', profileError)
        // Don't throw - metadata update succeeded
      }

      toast.success('Profile updated successfully!')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-karasai-blue" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold uppercase tracking-wide text-neutral-dark">
          Profile Information
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Update your personal details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (Read-only) */}
        <div>
          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Email
          </label>
          <div className="flex items-center gap-3 rounded-lg border-2 border-neutral-gray bg-neutral-gray/50 px-4 py-3">
            <User className="h-5 w-5 text-neutral-dark/40" />
            <span className="text-sm text-neutral-dark">{user.email}</span>
          </div>
          <p className="mt-2 text-xs text-neutral-dark/60">
            To change your email, go to the Security tab
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
            placeholder="John Smith"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-neutral-dark">
            Phone Number <span className="text-neutral-dark/40">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-karasai-blue focus:outline-none"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-neutral-gray pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-karasai-blue px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}