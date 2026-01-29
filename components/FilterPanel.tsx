'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Search, Activity, DollarSign, MapPin, Clock, Calendar, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'
import { RangeSlider } from './RangeSlider'

interface FilterPanelProps {
  onSearch?: (filters: FilterValues) => void
}

interface FilterValues {
  activity: string
  moneySpent: [number, number]
  destination: string
  lengthOfExperience: [number, number]
  date: string
}

export function FilterPanel({ onSearch }: FilterPanelProps) {
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)

  const [filters, setFilters] = useState<FilterValues>({
    activity: '',
    moneySpent: [0, 740],
    destination: '',
    lengthOfExperience: [0, 14],
    date: '',
  })

  const handleSearch = () => {
    onSearch?.(filters)
  }

  const formatMoney = (value: number) => `$${value}`
  const formatDays = (value: number) => `${value} ${value === 1 ? t('day') : t('days')}`

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Search Tours</h3>
      
      <div className="space-y-6">
        {/* Activity */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
            <div className="bg-blue-50 p-1.5 rounded-lg mr-2">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            Activity
          </label>
          <div className="relative">
            <select
              value={filters.activity}
              onChange={(e) => setFilters({ ...filters, activity: e.target.value })}
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-gray-700 font-medium transition-all hover:border-gray-300"
            >
              <option value="">Select Activity</option>
              <option value="food">Food Tour</option>
              <option value="beach">Beach</option>
              <option value="culture">Culture</option>
              <option value="adventure">Adventure</option>
              <option value="nature">Nature</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Money Spent - Range Slider */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
            <div className="bg-green-50 p-1.5 rounded-lg mr-2">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            Money Spent
          </label>
          <div className="px-1">
            <RangeSlider
              min={0}
              max={740}
              value={filters.moneySpent}
              onChange={(value) => setFilters({ ...filters, moneySpent: value })}
              formatValue={formatMoney}
            />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
            <div className="bg-red-50 p-1.5 rounded-lg mr-2">
              <MapPin className="h-4 w-4 text-red-600" />
            </div>
            Destination
          </label>
          <div className="relative">
            <select
              value={filters.destination}
              onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-gray-700 font-medium transition-all hover:border-gray-300"
            >
              <option value="">Select Destination</option>
              <option value="ho-chi-minh">Ho Chi Minh City</option>
              <option value="vung-tau">Vung Tau</option>
              <option value="da-lat">Da Lat</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Length of Experience - Range Slider */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
            <div className="bg-purple-50 p-1.5 rounded-lg mr-2">
              <Clock className="h-4 w-4 text-purple-600" />
            </div>
            Length of Experience
          </label>
          <div className="px-1">
            <RangeSlider
              min={0}
              max={14}
              value={filters.lengthOfExperience}
              onChange={(value) => setFilters({ ...filters, lengthOfExperience: value })}
              formatValue={formatDays}
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
            <div className="bg-orange-50 p-1.5 rounded-lg mr-2">
              <Calendar className="h-4 w-4 text-orange-600" />
            </div>
            Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 font-medium transition-all hover:border-gray-300"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-2"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
