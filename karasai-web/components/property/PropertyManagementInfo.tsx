'use client'

import Image from 'next/image'
import { ExternalLink, Phone, Mail } from 'lucide-react'

interface ManagementCompany {
  id: string
  company_name: string
  logo_url?: string | null
  website?: string | null
  phone?: string | null
  email?: string | null
}

interface PropertyManagementInfoProps {
  company: ManagementCompany
  propertyId: string
}

export default function PropertyManagementInfo({ company, propertyId }: PropertyManagementInfoProps) {
  // Track clicks for analytics
  const handleApplyClick = () => {
    // You can add analytics tracking here
    console.log('Apply button clicked for property:', propertyId)
  }

  const handleWebsiteClick = () => {
    // You can add analytics tracking here
    console.log('Website link clicked for company:', company.company_name)
  }

  return (
    <div className="mb-6 rounded-lg bg-karasai-light p-6">
      <div className="mb-4 flex items-center gap-4">
        {/* Company Logo */}
        {company.logo_url && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white">
            <Image
              src={company.logo_url}
              alt={company.company_name}
              fill
              className="object-contain p-2"
            />
          </div>
        )}
        
        {/* Company Name */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide text-neutral-dark">
            Owned/Managed By:
          </h2>
          <p className="text-xl font-semibold text-karasai-blue">
            {company.company_name}
          </p>
        </div>
      </div>

      {/* Contact Information & Actions */}
      <div className="space-y-3">
        {/* Apply Now Button */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-karasai-blue px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
          >
            <ExternalLink className="h-5 w-5" />
            Apply Now
          </a>
        )}

        {/* Phone */}
        {company.phone && (
          <a
            href={`tel:${company.phone}`}
            className="flex items-center gap-3 rounded-lg border-2 border-neutral-gray bg-white p-4 text-sm transition-all hover:border-karasai-blue hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
              <Phone className="h-5 w-5 text-karasai-blue" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                Phone
              </p>
              <p className="font-bold text-neutral-dark">{company.phone}</p>
            </div>
          </a>
        )}

        {/* Email */}
        {company.email && (
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-3 rounded-lg border-2 border-neutral-gray bg-white p-4 text-sm transition-all hover:border-karasai-blue hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
              <Mail className="h-5 w-5 text-karasai-blue" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                Email
              </p>
              <p className="font-bold text-neutral-dark">{company.email}</p>
            </div>
          </a>
        )}

        {/* Website Link */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWebsiteClick}
            className="flex items-center justify-between rounded-lg border-2 border-neutral-gray bg-white p-4 text-sm transition-all hover:border-karasai-blue hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-karasai-light">
                <ExternalLink className="h-5 w-5 text-karasai-blue" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-dark/60">
                  Website
                </p>
                <p className="font-bold text-karasai-blue">
                  Visit {company.company_name}
                </p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-neutral-dark/40" />
          </a>
        )}
      </div>

      {/* Verification Badge */}
      <div className="mt-4 rounded-lg border-2 border-karasai-light bg-white p-4 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-karasai-blue">
          ✓ Verified by Karasai
        </p>
        <p className="mt-1 text-xs text-neutral-dark/60">
          All contact information has been verified as authentic
        </p>
      </div>
    </div>
  )
}