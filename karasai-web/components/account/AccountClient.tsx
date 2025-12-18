'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import ProfileSection from './ProfileSection'
import SecuritySection from './SecuritySection'
import PreferencesSection from './PreferencesSection'
import DangerZoneSection from './DangerZoneSection'

type Tab = 'profile' | 'security' | 'preferences' | 'danger'

export default function AccountClient() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  // Show loading while checking auth
  if (authLoading) {
    return (
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-karasai-blue" />
          </div>
        </div>
      </section>
    )
  }

  if (!user) {
    return null
  }

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', description: 'Update your personal information' },
    { id: 'security' as Tab, label: 'Security', description: 'Change email and password' },
    { id: 'preferences' as Tab, label: 'Preferences', description: 'Manage notifications' },
    { id: 'danger' as Tab, label: 'Danger Zone', description: 'Delete your account' },
  ]

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="mx-auto max-w-5xl">
          {/* Tabs - Desktop */}
          <div className="mb-8 hidden md:block">
            <div className="flex gap-4 border-b-2 border-neutral-gray">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${
                    activeTab === tab.id
                      ? '-mb-0.5 border-karasai-blue text-karasai-blue'
                      : 'border-transparent text-neutral-dark/60 hover:text-neutral-dark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs - Mobile (Dropdown) */}
          <div className="mb-8 md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-dark focus:border-karasai-blue focus:outline-none"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tab Content */}
          <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
            {activeTab === 'profile' && <ProfileSection user={user} />}
            {activeTab === 'security' && <SecuritySection user={user} />}
            {activeTab === 'preferences' && <PreferencesSection user={user} />}
            {activeTab === 'danger' && <DangerZoneSection user={user} />}
          </div>
        </div>
      </div>
    </section>
  )
}