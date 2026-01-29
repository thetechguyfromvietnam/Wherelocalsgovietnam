'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'
import { Button } from './ui/button'
import { BookingDialog } from './BookingDialog'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

interface TourCardProps {
  tour: {
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
}

export function TourCard({ tour }: TourCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-64 w-full">
          <Image
            src={tour.imageUrl}
            alt={tour.title}
            fill
            className="object-cover"
          />
          {/* Discount Badge */}
          <div className="absolute top-4 left-4 bg-yellow-400 rounded-lg px-3 py-1.5 flex items-center shadow-sm">
            <span className="text-sm font-bold text-gray-900">
              {tour.discount}% {language === 'vi' ? 'Giảm' : 'Off'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {tour.title}
          </h3>

          {/* Description (optional) */}
          {tour.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {tour.description}
            </p>
          )}

          {/* Location and Duration */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{tour.duration}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-sm text-gray-400 line-through">
              ${tour.originalPrice}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ${tour.discountedPrice}
            </span>
          </div>

          {/* Book Now Button */}
          <Button
            onClick={() => setBookingOpen(true)}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {t('bookNow')}
          </Button>
        </div>
      </div>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tour={tour}
      />
    </>
  )
}
