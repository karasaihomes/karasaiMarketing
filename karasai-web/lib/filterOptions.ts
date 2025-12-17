import { createClient } from '@/lib/supabase/client'

export interface FilterOptions {
  bedrooms: number[]
  bathrooms: number[]
  propertyTypes: Array<{ value: string; label: string }>
  petPolicies: Array<{ value: string; label: string }>
  amenities: Array<{ value: string; label: string }>
  managementCompanies: Array<{ value: string; label: string }>
}

// Label mappings for better display
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  single_family: 'Single Family',
  townhouse: 'Townhouse',
  condo: 'Condo',
  apartment: 'Apartment',
}

const PET_POLICY_LABELS: Record<string, string> = {
  allowed: 'Pets Allowed',
  not_allowed: 'No Pets',
  conditional: 'Conditional',
}

const AMENITY_LABELS: Record<string, string> = {
  parking: 'Parking',
  laundry_in_unit: 'In-Unit Laundry',
  ac: 'Air Conditioning',
  pool: 'Pool',
  yard: 'Yard',
  dishwasher: 'Dishwasher',
  fireplace: 'Fireplace',
  garage: 'Garage',
  balcony: 'Balcony',
  gym: 'Gym/Fitness Center',
  hardwood_floors: 'Hardwood Floors',
  washer_dryer: 'Washer/Dryer',
  patio: 'Patio',
  walk_in_closet: 'Walk-in Closet',
  stainless_appliances: 'Stainless Steel Appliances',
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  const supabase = createClient()

  try {
    // Fetch all properties to get unique values
    const { data: properties, error } = await supabase
      .from('properties')
      .select('bedrooms, bathrooms, property_type, pet_policy, amenities, management_company_id')

    if (error) {
      console.error('Error fetching filter options:', error)
      return getDefaultFilterOptions()
    }

    if (!properties || properties.length === 0) {
      return getDefaultFilterOptions()
    }

    // Extract unique bedrooms (handle 5+)
    const bedroomsSet = new Set<number>()
    properties.forEach(p => {
      if (p.bedrooms !== null && p.bedrooms !== undefined) {
        // Cap at 5 for display purposes (5+ means >= 5)
        bedroomsSet.add(Math.min(p.bedrooms, 5))
      }
    })
    const bedrooms = Array.from(bedroomsSet).sort((a, b) => a - b)

    // Extract unique bathrooms
    const bathroomsSet = new Set<number>()
    properties.forEach(p => {
      if (p.bathrooms !== null && p.bathrooms !== undefined) {
        // Cap at 3 for display (3+ means >= 3)
        bathroomsSet.add(Math.min(p.bathrooms, 3))
      }
    })
    const bathrooms = Array.from(bathroomsSet).sort((a, b) => a - b)

    // Extract unique property types (exclude apartment unless it exists)
    const propertyTypesSet = new Set<string>()
    properties.forEach(p => {
      if (p.property_type) {
        propertyTypesSet.add(p.property_type)
      }
    })
    const propertyTypes = Array.from(propertyTypesSet)
      .map(type => ({
        value: type,
        label: PROPERTY_TYPE_LABELS[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    // Extract unique pet policies
    const petPoliciesSet = new Set<string>()
    properties.forEach(p => {
      if (p.pet_policy) {
        petPoliciesSet.add(p.pet_policy)
      }
    })
    const petPolicies = Array.from(petPoliciesSet)
      .map(policy => ({
        value: policy,
        label: PET_POLICY_LABELS[policy] || policy.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    // Extract unique amenities from JSONB arrays
    const amenitiesSet = new Set<string>()
    properties.forEach(p => {
      if (p.amenities && Array.isArray(p.amenities)) {
        p.amenities.forEach((amenity: string) => amenitiesSet.add(amenity))
      }
    })
    const amenities = Array.from(amenitiesSet)
      .map(amenity => ({
        value: amenity,
        label: AMENITY_LABELS[amenity] || amenity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    // Fetch management companies
    const managementCompanyIds = Array.from(
      new Set(properties.map(p => p.management_company_id).filter(Boolean))
    )

    let managementCompanies: Array<{ value: string; label: string }> = []
    
    if (managementCompanyIds.length > 0) {
      const { data: companies } = await supabase
        .from('management_companies')
        .select('id, company_name')
        .in('id', managementCompanyIds)

      if (companies) {
        managementCompanies = companies
          .map(company => ({
            value: company.id,
            label: company.company_name
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      }
    }

    return {
      bedrooms,
      bathrooms,
      propertyTypes,
      petPolicies,
      amenities,
      managementCompanies,
    }
  } catch (error) {
    console.error('Error in fetchFilterOptions:', error)
    return getDefaultFilterOptions()
  }
}

// Default fallback options
function getDefaultFilterOptions(): FilterOptions {
  return {
    bedrooms: [1, 2, 3, 4, 5],
    bathrooms: [1, 1.5, 2, 2.5, 3],
    propertyTypes: [
      { value: 'single_family', label: 'Single Family' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'condo', label: 'Condo' },
    ],
    petPolicies: [
      { value: 'allowed', label: 'Pets Allowed' },
      { value: 'not_allowed', label: 'No Pets' },
      { value: 'conditional', label: 'Conditional' },
    ],
    amenities: [
      { value: 'parking', label: 'Parking' },
      { value: 'laundry_in_unit', label: 'In-Unit Laundry' },
      { value: 'ac', label: 'Air Conditioning' },
      { value: 'pool', label: 'Pool' },
      { value: 'yard', label: 'Yard' },
      { value: 'dishwasher', label: 'Dishwasher' },
      { value: 'fireplace', label: 'Fireplace' },
    ],
    managementCompanies: [],
  }
}