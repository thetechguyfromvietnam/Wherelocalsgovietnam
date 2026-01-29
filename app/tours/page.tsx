'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { ExperienceCard } from '@/components/ExperienceCard'
import { RangeSlider } from '@/components/RangeSlider'
import { 
  Star,
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Mountain,
  Camera,
  SlidersHorizontal,
  Sunrise,
  Sunset,
  Users,
  TrendingUp
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

// Sample experiences data
const allExperiences = [
  {
    id: 'saigon-food-tour',
    title: 'Saigon Food Tour - Non Touristy Experience',
    description: 'Discover authentic local food spots where Saigonese actually eat.',
    location: 'Ho Chi Minh City',
    duration: 'Half Day',
    originalPrice: 65,
    discountedPrice: 55,
    discount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 127,
    amenities: ['food', 'culture'],
  },
  {
    id: 'vung-tau-2d',
    title: 'Vung Tau Beach Escape 2 Days 1 Night',
    description: 'Experience the adventure of a lifetime with our 2 days tour.',
    location: 'Vung Tau',
    duration: '2 Days',
    originalPrice: 185,
    discountedPrice: 149,
    discount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 89,
    amenities: ['beach', 'adventure'],
  },
  {
    id: 'vung-tau-3d',
    title: 'Vung Tau & Long Hai 3 Days Adventure',
    description: 'Explore the best of Ba Ria-Vung Tau province.',
    location: 'Vung Tau',
    duration: '3 Days',
    originalPrice: 245,
    discountedPrice: 199,
    discount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 156,
    amenities: ['beach', 'nature', 'food'],
  },
  {
    id: 'da-lat-3d',
    title: 'Da Lat Highland Escape 3 Days',
    description: 'Discover the romantic city of Da Lat.',
    location: 'Da Lat',
    duration: '3 Days',
    originalPrice: 275,
    discountedPrice: 229,
    discount: 17,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 203,
    amenities: ['nature', 'culture', 'adventure'],
  },
]

export default function ToursPage() {
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    duration: [0, 3] as [number, number], // Shorter duration for experiences (0-3 days)
    destination: '',
    activity: [] as string[], // Food, Beach, Nature, Culture, Adventure
    difficulty: '' as string, // Easy, Medium, Hard
    timeOfDay: [] as string[], // Morning, Afternoon, Evening
    groupSize: [1, 20] as [number, number],
    rating: 0,
  })
  const [showFilters, setShowFilters] = useState(true)

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleActivity = (activity: string) => {
    setFilters(prev => ({
      ...prev,
      activity: prev.activity.includes(activity)
        ? prev.activity.filter(a => a !== activity)
        : [...prev.activity, activity]
    }))
  }

  // Convert duration string to number for filtering
  const getDurationInDays = (duration: string): number => {
    if (duration.includes('Half Day')) return 0.5
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  // Filter experiences
  const filteredExperiences = allExperiences.filter(exp => {
    if (filters.destination && exp.location !== filters.destination) return false
    if (filters.priceRange[0] > exp.discountedPrice || filters.priceRange[1] < exp.discountedPrice) return false
    if (filters.rating > 0 && (exp.rating || 0) < filters.rating) return false
    const expDuration = getDurationInDays(exp.duration)
    if (expDuration < filters.duration[0] || expDuration > filters.duration[1]) return false
    if (filters.activity.length > 0) {
      const hasActivity = filters.activity.some(act => exp.amenities.includes(act))
      if (!hasActivity) return false
    }
    // Note: difficulty, timeOfDay, and groupSize filters are not applied yet
    // as the experience data doesn't include these fields
    // They can be added when the data structure is updated
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-6 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar Filters - Airbnb Style */}
            <aside className={`hidden lg:block w-80 flex-shrink-0`}>
              <div className="sticky top-24 space-y-8 pb-8">
                {/* Price Range */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Khoảng giá' : 'Price range'}
                  </h3>
                  <RangeSlider
                    min={0}
                    max={500}
                    value={filters.priceRange}
                    onChange={(value) => handleFilterChange('priceRange', value)}
                    formatValue={(v) => `$${v}`}
                  />
                </div>

                {/* Duration - Shorter for experiences */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Thời lượng' : 'Duration'}
                  </h3>
                  <RangeSlider
                    min={0}
                    max={3}
                    step={0.5}
                    value={filters.duration}
                    onChange={(value) => handleFilterChange('duration', value)}
                    formatValue={(v) => {
                      if (v === 0.5) return language === 'vi' ? 'Nửa ngày' : 'Half day'
                      return `${v} ${v === 1 ? (language === 'vi' ? 'ngày' : 'day') : (language === 'vi' ? 'ngày' : 'days')}`
                    }}
                  />
                </div>

                {/* Destination */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Điểm đến' : 'Destination'}
                  </h3>
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
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {language === 'vi' ? 'Bất kỳ đâu' : 'Anywhere'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Activity Type */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Loại hoạt động' : 'Type of activity'}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'food', label: language === 'vi' ? 'Ẩm thực' : 'Food & Dining', icon: UtensilsCrossed },
                      { id: 'beach', label: language === 'vi' ? 'Bãi biển' : 'Beach', icon: Waves },
                      { id: 'nature', label: language === 'vi' ? 'Thiên nhiên' : 'Nature', icon: Mountain },
                      { id: 'culture', label: language === 'vi' ? 'Văn hóa' : 'Culture', icon: Camera },
                      { id: 'adventure', label: language === 'vi' ? 'Phiêu lưu' : 'Adventure', icon: Car },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleActivity(id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          filters.activity.includes(id)
                            ? 'border-black bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        {filters.activity.includes(id) && (
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

                {/* Difficulty Level */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Mức độ khó' : 'Difficulty level'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'easy', label: language === 'vi' ? 'Dễ' : 'Easy' },
                      { id: 'medium', label: language === 'vi' ? 'Trung bình' : 'Medium' },
                      { id: 'hard', label: language === 'vi' ? 'Khó' : 'Hard' },
                    ].map(({ id, label }) => (
                      <label key={id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="difficulty"
                          value={id}
                          checked={filters.difficulty === id}
                          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                          className="mr-3 w-4 h-4 text-red-600"
                        />
                        <TrendingUp className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                      </label>
                    ))}
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="difficulty"
                        value=""
                        checked={filters.difficulty === ''}
                        onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                        className="mr-3 w-4 h-4 text-red-600"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {language === 'vi' ? 'Tất cả' : 'All levels'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Time of Day */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Thời gian trong ngày' : 'Time of day'}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'morning', label: language === 'vi' ? 'Buổi sáng' : 'Morning', icon: Sunrise },
                      { id: 'afternoon', label: language === 'vi' ? 'Buổi chiều' : 'Afternoon', icon: Star },
                      { id: 'evening', label: language === 'vi' ? 'Buổi tối' : 'Evening', icon: Sunset },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            timeOfDay: prev.timeOfDay.includes(id)
                              ? prev.timeOfDay.filter(t => t !== id)
                              : [...prev.timeOfDay, id]
                          }))
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          filters.timeOfDay.includes(id)
                            ? 'border-black bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        {filters.timeOfDay.includes(id) && (
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

                {/* Group Size */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'vi' ? 'Số người' : 'Group size'}
                  </h3>
                  <RangeSlider
                    min={1}
                    max={20}
                    value={filters.groupSize}
                    onChange={(value) => handleFilterChange('groupSize', value)}
                    formatValue={(v) => `${v} ${v === 1 ? (language === 'vi' ? 'người' : 'person') : (language === 'vi' ? 'người' : 'people')}`}
                  />
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
                    {filteredExperiences.length} {language === 'vi' ? 'trải nghiệm' : 'experiences'} available
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

              {/* Experiences Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredExperiences.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
