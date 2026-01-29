'use client'

import { TourCard } from './TourCard'

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

interface ToursSectionProps {
  title: string
  subtitle: string
  description: string
  tours: Tour[]
}

export function ToursSection({ title, subtitle, description, tours }: ToursSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#4a9ebd] italic text-base mb-3 font-normal">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-700 text-base max-w-2xl mx-auto mb-6">
            {description}
          </p>
          {/* Decorative wavy line */}
          <div className="mt-8 flex justify-center">
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 6 Q 30 0, 60 6 T 120 6"
                stroke="#4a9ebd"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
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
