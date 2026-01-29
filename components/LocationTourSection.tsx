'use client'

import { TourCard } from './TourCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

interface Tour {
  id: string
  title: string
  description?: string
  location: string
  duration: string
  originalPrice: number
  discountedPrice: number
  discount: number
  imageUrl: string
}

interface LocationTourSectionProps {
  locationName: string
  locationDescription?: string
  tours: Tour[]
}

export function LocationTourSection({ locationName, locationDescription, tours }: LocationTourSectionProps) {
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)
  
  if (tours.length === 0) return null

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Location Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('toursAt')} {locationName}
          </h2>
          {locationDescription && (
            <p className="text-gray-600 text-lg max-w-3xl">
              {locationDescription}
            </p>
          )}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
