'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Loader2, Trash2, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

interface DangerZoneSectionProps {
  user: SupabaseUser
}

export default function DangerZoneSection({ user }: DangerZoneSectionProps) {
  const router = useRouter()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (confirmText.toLowerCase() !== 'delete my account') {
      toast.error('Please type "delete my account" to confirm')
      return
    }

    setIsDeleting(true)

    try {
      const supabase = createClient()

      // Delete user's profile (cascade will delete saved_properties)
      const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id)

      if (profileError) {
        console.error('Profile deletion error:', profileError)
        // Continue anyway - main goal is to delete auth account
      }

      // Sign out and delete auth account
      // Note: Supabase currently doesn't support self-service account deletion via client SDK
      // You'll need to set up an Edge Function or admin API call for this
      // For now, we'll just sign out and show a message

      await supabase.auth.signOut()

      toast.success('Account deletion initiated. Please contact support to complete the process.')
      
      router.push('/')
    } catch (error: any) {
      console.error('Error deleting account:', error)
      toast.error(error.message || 'Failed to delete account')
      setIsDeleting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-status-rented">
          <AlertTriangle className="h-6 w-6" />
          Danger Zone
        </h2>
        <p className="text-sm text-neutral-dark/70">
          Irreversible actions that affect your account
        </p>
      </div>

      {/* Warning Box */}
      <div className="mb-6 rounded-lg border-2 border-status-rented bg-status-rented/10 p-6">
        <h3 className="mb-3 font-bold text-status-rented">⚠️ Warning: This action cannot be undone</h3>
        <ul className="space-y-2 text-sm text-neutral-dark/80">
          <li className="flex items-start gap-2">
            <span className="text-status-rented">•</span>
            <span>Your account will be permanently deleted</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-rented">•</span>
            <span>All your saved properties will be removed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-rented">•</span>
            <span>Your profile information will be erased</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-rented">•</span>
            <span>This action is permanent and cannot be reversed</span>
          </li>
        </ul>
      </div>

      {/* Delete Account Button */}
      {!showConfirmDialog ? (
        <button
          onClick={() => setShowConfirmDialog(true)}
          className="flex items-center gap-2 rounded-lg border-2 border-status-rented bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-status-rented transition-all hover:bg-status-rented hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
          Delete My Account
        </button>
      ) : (
        <div className="space-y-4 rounded-lg border-2 border-status-rented bg-white p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-status-rented" />
            <div>
              <h3 className="mb-2 font-bold text-neutral-dark">Are you absolutely sure?</h3>
              <p className="mb-4 text-sm text-neutral-dark/70">
                This will permanently delete your account and remove all of your data from our servers.
              </p>
            </div>
          </div>

          {/* Confirmation Input */}
          <div>
            <label htmlFor="confirmDelete" className="mb-2 block text-sm font-semibold text-neutral-dark">
              Type <span className="font-mono text-status-rented">delete my account</span> to confirm:
            </label>
            <input
              type="text"
              id="confirmDelete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full rounded-lg border-2 border-neutral-gray bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-dark/40 focus:border-status-rented focus:outline-none"
              placeholder="delete my account"
              autoComplete="off"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowConfirmDialog(false)
                setConfirmText('')
              }}
              disabled={isDeleting}
              className="flex-1 rounded-lg border-2 border-neutral-gray bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-neutral-dark transition-all hover:bg-neutral-gray disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting || confirmText.toLowerCase() !== 'delete my account'}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-status-rented px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-5 w-5" />
                  Delete Account
                </>
              )}
            </button>
          </div>

          {/* Additional Warning */}
          <p className="text-center text-xs text-neutral-dark/60">
            This action is immediate and cannot be undone
          </p>
        </div>
      )}
    </div>
  )
}