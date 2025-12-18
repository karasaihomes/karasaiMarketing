import { createClient } from '@/lib/supabase/client'

/**
 * Check if a property is saved by the current user
 */
export async function isPropertySaved(propertyId: string, userId: string): Promise<boolean> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned (not an error in this case)
      throw error
    }

    return !!data
  } catch (error) {
    console.error('Error checking if property is saved:', error)
    return false
  }
}

/**
 * Toggle property save status (add or remove from favorites)
 */
export async function togglePropertySave(
  propertyId: string,
  userId: string
): Promise<{ isSaved: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // Check if already saved
    const { data: existing } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()

    if (existing) {
      // Remove from saved
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId)

      if (error) throw error

      return { isSaved: false }
    } else {
      // Add to saved
      const { error } = await supabase
        .from('saved_properties')
        .insert([
          {
            user_id: userId,
            property_id: propertyId,
          },
        ])

      if (error) throw error

      return { isSaved: true }
    }
  } catch (error: any) {
    console.error('Error toggling property save:', error)
    return {
      isSaved: false,
      error: error.message || 'Failed to save property',
    }
  }
}

/**
 * Get all saved property IDs for a user
 */
export async function getSavedPropertyIds(userId: string): Promise<string[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', userId)

    if (error) throw error

    return data?.map((item) => item.property_id) || []
  } catch (error) {
    console.error('Error fetching saved property IDs:', error)
    return []
  }
}

/**
 * Get count of saved properties for a user
 */
export async function getSavedPropertiesCount(userId: string): Promise<number> {
  try {
    const supabase = createClient()

    const { count, error } = await supabase
      .from('saved_properties')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (error) throw error

    return count || 0
  } catch (error) {
    console.error('Error fetching saved properties count:', error)
    return 0
  }
}