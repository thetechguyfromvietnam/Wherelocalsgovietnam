'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Star, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { BookingDialog } from './BookingDialog'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

interface ExperienceCardProps {
  experience: {
    id: string
    title: string
    description?: string
    location: string
    duration: string
    originalPrice: number
    discountedPrice: number
    discount: number
    imageUrl: string
    rating?: number
    reviews?: number
  }
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Discount Badge */}
          {experience.discount > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg px-3 py-1.5 flex items-center shadow-lg">
              <span className="text-sm font-bold">
                {experience.discount}% {language === 'vi' ? 'Giảm' : 'Off'}
              </span>
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? 'fill-red-600 text-red-600' : 'text-gray-700'
              }`}
            />
          </button>
          {/* Rating Badge */}
          {experience.rating && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 shadow-md">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{experience.rating}</span>
              {experience.reviews && (
                <span className="text-xs text-gray-500">({experience.reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
            {experience.title}
          </h3>

          {/* Description */}
          {experience.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {experience.description}
            </p>
          )}

          {/* Location and Duration */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-red-600" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2 text-red-600" />
              <span>{experience.duration}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline justify-between mb-4">
            <div>
              {experience.originalPrice > experience.discountedPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  ${experience.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${experience.discountedPrice}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                / {language === 'vi' ? 'người' : 'person'}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            onClick={() => setBookingOpen(true)}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('bookNow')}
          </Button>
        </div>
      </div>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tour={experience}
      />
    </>
  )
}
