'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Loader2, Save, Bell } from 'lucide-react'
import toast from 'react-hot-toast'

interface PreferencesSectionProps {
  user: SupabaseUser
}

export default function PreferencesSection({ user }: PreferencesSectionProps) {
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    priceDrops: true,
    statusChanges: true,
    newProperties: false,
    weeklyDigest: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchPreferences()
  }, [user])

  const fetchPreferences = async () => {
    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('user_profiles')
        .select('notification_preferences')
        .eq('id', user.id)
        .single()

      if (data?.notification_preferences) {
        setPreferences({
          emailAlerts: data.notification_preferences.email_alerts ?? true,
          priceDrops: data.notification_preferences.price_drops ?? true,
          statusChanges: data.notification_preferences.status_changes ?? true,
          newProperties: data.notification_preferences.new_properties ?? false,
          weeklyDigest: data.notification_preferences.weekly_digest ?? false,
        })
      }
    } catch (error) {
      console.error('Error fetching preferences:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          notification_preferences: {
            email_alerts: preferences.emailAlerts,
            price_drops: preferences.priceDrops,
            status_changes: preferences.statusChanges,
            new_properties: preferences.newProperties,
            weekly_digest: preferences.weeklyDigest,
          },
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast.success('Preferences updated successfully!')
    } catch (error: any) {
      console.error('Error updating preferences:', error)
      toast.error(error.message || 'Failed to update preferences')
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
          Notification Preferences
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Choose what notifications you'd like to receive
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Master Toggle */}
        <div className="rounded-lg border-2 border-karasai-light bg-karasai-light/20 p-4">
          <label className="flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              checked={preferences.emailAlerts}
              onChange={(e) => setPreferences({ ...preferences, emailAlerts: e.target.checked })}
              className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-neutral-gray text-karasai-blue focus:ring-2 focus:ring-karasai-blue"
            />
            <div>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-karasai-blue" />
                <span className="font-semibold text-neutral-dark">Enable Email Notifications</span>
              </div>
              <p className="mt-1 text-sm text-neutral-dark/70">
                Receive email alerts about your saved properties
              </p>
            </div>
          </label>
        </div>

        {/* Individual Preferences */}
        <div className="space-y-4">
          {/* Price Drops */}
          <div className="border-b border-neutral-gray pb-4">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={preferences.priceDrops}
                onChange={(e) => setPreferences({ ...preferences, priceDrops: e.target.checked })}
                disabled={!preferences.emailAlerts}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-neutral-gray text-karasai-blue focus:ring-2 focus:ring-karasai-blue disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div>
                <span className={`font-semibold ${preferences.emailAlerts ? 'text-neutral-dark' : 'text-neutral-dark/40'}`}>
                  Price Drops
                </span>
                <p className={`mt-1 text-sm ${preferences.emailAlerts ? 'text-neutral-dark/70' : 'text-neutral-dark/40'}`}>
                  Get notified when rent decreases on your saved properties
                </p>
              </div>
            </label>
          </div>

          {/* Status Changes */}
          <div className="border-b border-neutral-gray pb-4">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={preferences.statusChanges}
                onChange={(e) => setPreferences({ ...preferences, statusChanges: e.target.checked })}
                disabled={!preferences.emailAlerts}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-neutral-gray text-karasai-blue focus:ring-2 focus:ring-karasai-blue disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div>
                <span className={`font-semibold ${preferences.emailAlerts ? 'text-neutral-dark' : 'text-neutral-dark/40'}`}>
                  Status Changes
                </span>
                <p className={`mt-1 text-sm ${preferences.emailAlerts ? 'text-neutral-dark/70' : 'text-neutral-dark/40'}`}>
                  Get alerted when a saved property becomes available or is rented
                </p>
              </div>
            </label>
          </div>

          {/* New Properties */}
          <div className="border-b border-neutral-gray pb-4">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={preferences.newProperties}
                onChange={(e) => setPreferences({ ...preferences, newProperties: e.target.checked })}
                disabled={!preferences.emailAlerts}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-neutral-gray text-karasai-blue focus:ring-2 focus:ring-karasai-blue disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div>
                <span className={`font-semibold ${preferences.emailAlerts ? 'text-neutral-dark' : 'text-neutral-dark/40'}`}>
                  New Properties
                </span>
                <p className={`mt-1 text-sm ${preferences.emailAlerts ? 'text-neutral-dark/70' : 'text-neutral-dark/40'}`}>
                  Receive alerts about new properties matching your saved searches
                </p>
                <span className="mt-1 inline-block rounded-full bg-status-coming px-2 py-0.5 text-xs font-semibold text-white">
                  Coming Soon
                </span>
              </div>
            </label>
          </div>

          {/* Weekly Digest */}
          <div className="pb-4">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={preferences.weeklyDigest}
                onChange={(e) => setPreferences({ ...preferences, weeklyDigest: e.target.checked })}
                disabled={!preferences.emailAlerts}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-neutral-gray text-karasai-blue focus:ring-2 focus:ring-karasai-blue disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div>
                <span className={`font-semibold ${preferences.emailAlerts ? 'text-neutral-dark' : 'text-neutral-dark/40'}`}>
                  Weekly Digest
                </span>
                <p className={`mt-1 text-sm ${preferences.emailAlerts ? 'text-neutral-dark/70' : 'text-neutral-dark/40'}`}>
                  Get a weekly summary of market updates and new listings
                </p>
                <span className="mt-1 inline-block rounded-full bg-status-coming px-2 py-0.5 text-xs font-semibold text-white">
                  Coming Soon
                </span>
              </div>
            </label>
          </div>
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
                Save Preferences
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}