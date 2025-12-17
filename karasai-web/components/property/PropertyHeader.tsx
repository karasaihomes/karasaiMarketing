import { Home, Dog, Calendar, Ruler } from 'lucide-react'
import type { Property } from '@/types/index'

interface PropertyHeaderProps {
  property: Property
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  // Format rent
  const formattedRent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.rent)

  // Format available date
  const availableDate = property.available_date 
    ? new Date(property.available_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Available Now'

  // Get pet policy display
  const getPetPolicyDisplay = () => {
    switch (property.pet_policy) {
      case 'allowed':
        return 'Pets Allowed'
      case 'not_allowed':
        return 'No Pets'
      case 'conditional':
        return 'Pets Conditional'
      default:
        return null
    }
  }

  return (
    <div className="mb-6 rounded-lg bg-white p-4 sm:p-6">
      {/* Address */}
      <h1 className="mb-2 text-xl font-bold uppercase tracking-wide text-neutral-dark sm:text-2xl">
        {property.address}
        {property.address_line_2 && (
          <span className="block text-lg sm:text-xl">{property.address_line_2}</span>
        )}
      </h1>
      <p className="mb-2 text-sm uppercase tracking-wide text-neutral-dark/60">
        {property.city}, {property.state} {property.zip}
      </p>

      {/* Beds/Baths/Sqft - Moved here with responsive text */}
      <p className="mb-4 text-sm uppercase tracking-wide text-neutral-dark sm:text-sm">
        {property.bedrooms} BED / {property.bathrooms} BATH
        {property.square_feet && ` / ${property.square_feet.toLocaleString()} SQ. FT.`}
      </p>

      {/* Rent - Responsive size */}
      <div className="mb-4 text-2xl font-bold text-karasai-blue sm:text-3xl">
        {formattedRent}
        <span className="text-base font-normal text-neutral-dark/60 sm:text-lg">/month</span>
      </div>

      {/* Property Details Grid - Better mobile spacing */}
      <div className="grid gap-3 border-t border-neutral-gray pt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {/* Available Date */}
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Available</p>
            <p className="text-sm font-semibold text-neutral-dark">{availableDate}</p>
          </div>
        </div>

        {/* Property Type */}
        {property.property_type && (
          <div className="flex items-start gap-2">
            <Home className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Type</p>
              <p className="text-sm font-semibold capitalize text-neutral-dark">
                {property.property_type.replace('_', ' ')}
              </p>
            </div>
          </div>
        )}

        {/* Pet Policy */}
        {getPetPolicyDisplay() && (
          <div className="flex items-start gap-2">
            <Dog className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Pets</p>
              <p className="text-sm font-semibold text-neutral-dark">{getPetPolicyDisplay()}</p>
              {property.pet_deposit && (
                <p className="text-sm text-neutral-dark/60">
                  ${property.pet_deposit} deposit
                </p>
              )}
            </div>
          </div>
        )}

        {/* Deposit */}
        {property.deposit && (
          <div className="flex items-start gap-2">
            <Ruler className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Deposit</p>
              <p className="text-sm font-semibold text-neutral-dark">
                ${property.deposit.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Lease Term */}
        {property.lease_term && (
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Lease Term</p>
              <p className="text-sm font-semibold text-neutral-dark">{property.lease_term}</p>
            </div>
          </div>
        )}

        {/* Year Built */}
        {property.year_built && (
          <div className="flex items-start gap-2">
            <Home className="mt-0.5 h-5 w-5 flex-shrink-0 text-karasai-blue" />
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-dark/60">Year Built</p>
              <p className="text-sm font-semibold text-neutral-dark">{property.year_built}</p>
            </div>
          </div>
        )}
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div className="mt-6 border-t border-neutral-gray pt-4">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-dark">
            Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-karasai-light px-3 py-1 text-xs capitalize text-neutral-dark sm:text-sm"
              >
                {amenity.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}