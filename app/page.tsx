'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { 
  Star,
  Wifi,
  Car,
  Waves,
  SlidersHorizontal,
  Building,
  Home as HomeIcon,
  Droplet,
  Coffee
} from 'lucide-react'
import { RangeSlider } from '@/components/RangeSlider'
import { HotelCard } from '@/components/HotelCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

// Sample hotels data
const allHotels = [
  {
    id: 'hotel-saigon-1',
    name: 'Luxury Boutique Hotel Saigon',
    description: 'Modern hotel in the heart of Ho Chi Minh City with stunning city views',
    location: 'Ho Chi Minh City',
    rating: 4.8,
    reviews: 234,
    pricePerNight: 85,
    originalPrice: 120,
    discount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    amenities: ['wifi', 'breakfast', 'parking'],
    guests: 4,
    bedrooms: 2,
  },
  {
    id: 'hotel-vungtau-1',
    name: 'Beachfront Resort Vung Tau',
    description: 'Beautiful beachfront property with direct access to the beach',
    location: 'Vung Tau',
    rating: 4.9,
    reviews: 189,
    pricePerNight: 120,
    originalPrice: 150,
    discount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    amenities: ['wifi', 'breakfast', 'beach'],
    guests: 6,
    bedrooms: 3,
  },
  {
    id: 'hotel-dalat-1',
    name: 'Mountain View Villa Da Lat',
    description: 'Cozy villa with mountain views and French colonial architecture',
    location: 'Da Lat',
    rating: 4.7,
    reviews: 156,
    pricePerNight: 95,
    originalPrice: 130,
    discount: 27,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    amenities: ['wifi', 'parking'],
    guests: 4,
    bedrooms: 2,
  },
]

export default function Home() {
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    duration: [1, 14] as [number, number], // Nights (min 1 night)
    destination: '',
    propertyType: [] as string[], // Hotel, Resort, Villa, Apartment
    amenities: [] as string[], // WiFi, Pool, Parking, Breakfast, Beach, etc.
    guests: [1, 10] as [number, number],
    bedrooms: [1, 5] as [number, number],
    rating: 0,
  })

  const [showFilters, setShowFilters] = useState(true)

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type]
    }))
  }

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  // Filter hotels
  const filteredHotels = allHotels.filter(hotel => {
    if (filters.destination && hotel.location !== filters.destination) return false
    if (filters.priceRange[0] > hotel.pricePerNight || filters.priceRange[1] < hotel.pricePerNight) return false
    if (filters.rating > 0 && hotel.rating < filters.rating) return false
    if (hotel.guests && (filters.guests[0] > hotel.guests || filters.guests[1] < hotel.guests)) return false
    if (hotel.bedrooms && (filters.bedrooms[0] > hotel.bedrooms || filters.bedrooms[1] < hotel.bedrooms)) return false
    if (filters.propertyType.length > 0) {
      // For now, we'll skip property type filter as hotels don't have this field yet
      // This can be added when hotel data includes propertyType
    }
    if (filters.amenities.length > 0) {
      const hasAmenity = filters.amenities.some(amenity => hotel.amenities.includes(amenity))
      if (!hasAmenity) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-6 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Airbnb Style */}
          <div className="mb-8">
            <div className="flex items-center gap-1 p-1 border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer">
                <div className="text-xs font-semibold text-gray-900">Where</div>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full border-0 p-0 focus:outline-none text-sm text-gray-600 bg-transparent"
                />
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer">
                <div className="text-xs font-semibold text-gray-900">Check in</div>
                <div className="text-sm text-gray-500">Add dates</div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer">
                <div className="text-xs font-semibold text-gray-900">Check out</div>
                <div className="text-sm text-gray-500">Add dates</div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer">
                <div className="text-xs font-semibold text-gray-900">Guests</div>
                <div className="text-sm text-gray-500">Add guests</div>
              </div>
              <button className="bg-red-600 text-white rounded-full p-2 m-1 hover:bg-red-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Airbnb Style */}
            <aside className={`hidden lg:block w-80 flex-shrink-0`}>
              <div className="sticky top-24 space-y-8 pb-8">
                {/* Price Range */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price range</h3>
                  <RangeSlider
                    min={0}
                    max={500}
                    value={filters.priceRange}
                    onChange={(value) => handleFilterChange('priceRange', value)}
                    formatValue={(v) => `$${v}`}
                  />
                  <div className="text-sm text-gray-600 mt-3">
                    The average nightly price is $150
                  </div>
                </div>

                {/* Duration (Nights) */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Số đêm' : 'Nights'}
                  </h3>
                  <RangeSlider
                    min={1}
                    max={14}
                    value={filters.duration}
                    onChange={(value) => handleFilterChange('duration', value)}
                    formatValue={(v) => `${v} ${v === 1 ? (language === 'vi' ? 'đêm' : 'night') : (language === 'vi' ? 'đêm' : 'nights')}`}
                  />
                </div>

                {/* Guests */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Số khách' : 'Guests'}
                  </h3>
                  <RangeSlider
                    min={1}
                    max={10}
                    value={filters.guests}
                    onChange={(value) => handleFilterChange('guests', value)}
                    formatValue={(v) => `${v} ${v === 1 ? (language === 'vi' ? 'khách' : 'guest') : (language === 'vi' ? 'khách' : 'guests')}`}
                  />
                </div>

                {/* Bedrooms */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Số phòng ngủ' : 'Bedrooms'}
                  </h3>
                  <RangeSlider
                    min={1}
                    max={5}
                    value={filters.bedrooms}
                    onChange={(value) => handleFilterChange('bedrooms', value)}
                    formatValue={(v) => `${v} ${v === 1 ? (language === 'vi' ? 'phòng' : 'bedroom') : (language === 'vi' ? 'phòng' : 'bedrooms')}`}
                  />
                </div>

                {/* Destination */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Destination</h3>
                  <div className="space-y-3">
                    {['Ho Chi Minh City', 'Vung Tau', 'Da Lat'].map((dest) => (
                      <label key={dest} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="destination"
                          value={dest}
                          checked={filters.destination === dest}
                          onChange={(e) => handleFilterChange('destination', e.target.value)}
                          className="mr-3 w-4 h-4 text-red-600"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{dest}</span>
                      </label>
                    ))}
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="destination"
                        value=""
                        checked={filters.destination === ''}
                        onChange={(e) => handleFilterChange('destination', e.target.value)}
                        className="mr-3 w-4 h-4 text-red-600"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">Anywhere</span>
                    </label>
                  </div>
                </div>

                {/* Property Type */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Loại chỗ ở' : 'Property type'}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'hotel', label: language === 'vi' ? 'Khách sạn' : 'Hotel', icon: Building },
                      { id: 'resort', label: language === 'vi' ? 'Resort' : 'Resort', icon: Waves },
                      { id: 'villa', label: language === 'vi' ? 'Biệt thự' : 'Villa', icon: HomeIcon },
                      { id: 'apartment', label: language === 'vi' ? 'Căn hộ' : 'Apartment', icon: Building },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => togglePropertyType(id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          filters.propertyType.includes(id)
                            ? 'border-black bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        {filters.propertyType.includes(id) && (
                          <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Tiện ích' : 'Amenities'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'wifi', label: 'WiFi', icon: Wifi },
                      { id: 'breakfast', label: language === 'vi' ? 'Bữa sáng' : 'Breakfast', icon: Coffee },
                      { id: 'parking', label: language === 'vi' ? 'Bãi đỗ xe' : 'Parking', icon: Car },
                      { id: 'pool', label: language === 'vi' ? 'Hồ bơi' : 'Pool', icon: Droplet },
                      { id: 'beach', label: language === 'vi' ? 'Gần biển' : 'Beach access', icon: Waves },
                    ].map(({ id, label, icon: Icon }) => (
                      <label key={id} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg group">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(id)}
                          onChange={() => toggleAmenity(id)}
                          className="mr-3 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                        />
                        <Icon className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Đánh giá' : 'Rating'}
                  </h3>
                  <div className="space-y-3">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                          className="mr-3 w-4 h-4 text-red-600"
                        />
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-black text-black" />
                          <span className="text-sm text-gray-700 ml-1 group-hover:text-gray-900">{rating}+</span>
                        </div>
                      </label>
                    ))}
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        value={0}
                        checked={filters.rating === 0}
                        onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                        className="mr-3 w-4 h-4 text-red-600"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {language === 'vi' ? 'Bất kỳ đánh giá nào' : 'Any rating'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {filteredHotels.length} {language === 'vi' ? 'khách sạn' : 'places'} available
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {filters.destination || (language === 'vi' ? 'Tất cả địa điểm' : 'All destinations')}
                  </p>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {language === 'vi' ? 'Bộ lọc' : 'Filters'}
                </button>
              </div>

              {/* Hotels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
