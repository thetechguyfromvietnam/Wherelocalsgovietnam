'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Star, Wifi, Car, UtensilsCrossed, Waves, Bed, Users } from 'lucide-react'
import { Button } from './ui/button'
import { BookingDialog } from './BookingDialog'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

interface HotelCardProps {
  hotel: {
    id: string
    name: string
    description?: string
    location: string
    rating: number
    reviews: number
    pricePerNight: number
    originalPrice?: number
    discount?: number
    imageUrl: string
    amenities: string[]
    guests?: number
    bedrooms?: number
  }
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />
      case 'parking':
      case 'transport':
        return <Car className="h-4 w-4" />
      case 'breakfast':
      case 'meals':
        return <UtensilsCrossed className="h-4 w-4" />
      case 'beach':
        return <Waves className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={hotel.imageUrl}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Discount Badge */}
          {hotel.discount && hotel.discount > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg px-3 py-1.5 flex items-center shadow-lg">
              <span className="text-sm font-bold">
                {hotel.discount}% {language === 'vi' ? 'Giảm' : 'Off'}
              </span>
            </div>
          )}
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 shadow-md">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{hotel.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
            {hotel.name}
          </h3>

          {/* Description */}
          {hotel.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {hotel.description}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-2 text-red-600" />
            <span>{hotel.location}</span>
          </div>

          {/* Guests and Bedrooms */}
          {(hotel.guests || hotel.bedrooms) && (
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              {hotel.guests && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{hotel.guests} {language === 'vi' ? 'khách' : 'guests'}</span>
                </div>
              )}
              {hotel.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{hotel.bedrooms} {language === 'vi' ? 'phòng' : 'bedrooms'}</span>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
                >
                  {getAmenityIcon(amenity)}
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{hotel.rating}</span>
            <span className="text-sm text-gray-500">({hotel.reviews} {language === 'vi' ? 'đánh giá' : 'reviews'})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline justify-between mb-4">
            <div>
              {hotel.originalPrice && hotel.originalPrice > hotel.pricePerNight && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  ${hotel.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${hotel.pricePerNight}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                / {language === 'vi' ? 'đêm' : 'night'}
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
        tour={{
          id: hotel.id,
          title: hotel.name,
          description: hotel.description,
          location: hotel.location,
          duration: language === 'vi' ? '1 đêm' : '1 night',
          originalPrice: hotel.originalPrice || hotel.pricePerNight,
          discountedPrice: hotel.pricePerNight,
          discount: hotel.discount || 0,
          imageUrl: hotel.imageUrl,
        }}
      />
    </>
  )
}
