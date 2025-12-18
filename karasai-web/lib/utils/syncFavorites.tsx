import { createClient } from '@/lib/supabase/client'

/**
 * Sync guest favorites from localStorage to user account after login
 * Call this after successful authentication
 */
export async function syncGuestFavoritesToAccount(userId: string): Promise<void> {
  try {
    const supabase = createClient()

    // Get guest favorites from localStorage
    const guestFavorites = JSON.parse(localStorage.getItem('karasai_favorites') || '[]')
    
    if (guestFavorites.length === 0) {
      return // Nothing to sync
    }

    console.log('Syncing guest favorites:', guestFavorites)

    // Get existing saved properties for this user
    const { data: existingSaved, error: fetchError } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', userId)

    if (fetchError) {
      console.error('Error fetching existing saved properties:', fetchError)
      return
    }

    const existingPropertyIds = existingSaved?.map(s => s.property_id) || []

    // Filter out properties that are already saved
    const newFavorites = guestFavorites.filter(
      (propertyId: string) => !existingPropertyIds.includes(propertyId)
    )

    if (newFavorites.length === 0) {
      console.log('No new favorites to sync')
      // Clear guest favorites since they're all already saved
      localStorage.removeItem('karasai_favorites')
      localStorage.removeItem('karasai_guest_favorites')
      return
    }

    // Insert new favorites
    const insertData = newFavorites.map((propertyId: string) => ({
      user_id: userId,
      property_id: propertyId,
    }))

    const { error: insertError } = await supabase
      .from('saved_properties')
      .insert(insertData)

    if (insertError) {
      console.error('Error syncing favorites:', insertError)
      return
    }

    console.log(`Successfully synced ${newFavorites.length} guest favorites`)

    // Clear guest favorites after successful sync
    localStorage.removeItem('karasai_favorites')
    localStorage.removeItem('karasai_guest_favorites')
  } catch (error) {
    console.error('Error in syncGuestFavoritesToAccount:', error)
  }
}

/**
 * Get all property IDs that are saved (both localStorage and database)
 * Useful for checking saved state on property cards
 */
export async function getAllSavedPropertyIds(userId?: string): Promise<string[]> {
  const savedIds: string[] = []

  // Get guest favorites from localStorage
  const guestFavorites = JSON.parse(localStorage.getItem('karasai_favorites') || '[]')
  savedIds.push(...guestFavorites)

  // Get authenticated favorites from database
  if (userId) {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('saved_properties')
        .select('property_id')
        .eq('user_id', userId)

      if (!error && data) {
        const dbIds = data.map(s => s.property_id)
        savedIds.push(...dbIds)
      }
    } catch (error) {
      console.error('Error fetching saved property IDs:', error)
    }
  }

  // Return unique IDs
  return [...new Set(savedIds)]
}