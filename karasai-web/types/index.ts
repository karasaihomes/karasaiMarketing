// Shared type definitions for Karasai application

export interface Property {
  id: string
  address: string
  city: string
  state: string
  zip: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  status: 'available' | 'coming_soon' | 'rented'
  primary_image_url: string | null
  images: string[]
  rent: number
  pet_policy: string | null
  property_type: string | null
  amenities: string[]
  parking_type: string | null
  lease_term: string | null
  // Optional fields from database
  latitude?: number | null
  longitude?: number | null
  address_line_2?: string | null
  year_built?: number | null
  deposit?: number | null
  available_date?: string | null
  pet_deposit?: number | null
  smoking_allowed?: boolean | null
  parking_spaces?: number | null
  description?: string | null
  management_company_id?: string | null
  application_url?: string | null
  contact_phone?: string | null
  contact_email?: string | null
  verified?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface Filters {
  query: string
  city: string
  state: string
  zip: string
  beds: string[]
  baths: string[]
  minSqft?: number
  maxSqft?: number
  statuses: string[]
  petPolicy: string[]
  propertyTypes: string[]
  amenities: string[]
  managementCompanies: string[]
  sortBy: string
}

export interface ManagementCompany {
  id: string
  company_name: string
  logo_url: string | null
  website: string | null
  phone: string | null
  email: string | null
  verified: boolean
}

export interface SavedProperty {
  id: string
  user_id: string
  property_id: string
  saved_at: string
}