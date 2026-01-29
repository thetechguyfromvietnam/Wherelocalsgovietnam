'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Search } from 'lucide-react'
import Link from 'next/link'

interface Location {
  id: string
  name: string
  city: string
  province: string
  description?: string | null
  _count: {
    recommendations: number
  }
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations')
      const data = await res.json()
      setLocations(data)
    } catch (error) {
      console.error('Failed to fetch locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLocations = locations.filter((location) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      location.name.toLowerCase().includes(searchLower) ||
      location.city.toLowerCase().includes(searchLower) ||
      location.province.toLowerCase().includes(searchLower)
    )
  })

  // Group by province
  const groupedByProvince = filteredLocations.reduce((acc, location) => {
    if (!acc[location.province]) {
      acc[location.province] = []
    }
    acc[location.province].push(location)
    return acc
  }, {} as Record<string, Location[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Locations</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : Object.keys(groupedByProvince).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No locations found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByProvince).map(([province, provinceLocations]) => (
              <div key={province}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{province}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provinceLocations.map((location) => (
                    <Card key={location.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{location.name}</CardTitle>
                            <CardDescription className="mt-1">
                              <MapPin className="inline h-3 w-3 mr-1" />
                              {location.city}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {location.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {location.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {location._count.recommendations} recommendation{location._count.recommendations !== 1 ? 's' : ''}
                          </span>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/?locationId=${location.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
