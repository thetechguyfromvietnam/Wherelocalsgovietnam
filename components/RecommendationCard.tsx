'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { MapPin, Star, ExternalLink, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RecommendationCardProps {
  recommendation: {
    id: string
    title: string
    description: string
    category: string
    rating: number
    priceRange?: string | null
    imageUrl?: string | null
    website?: string | null
    address?: string | null
    user: {
      id: string
      name: string | null
      image: string | null
    }
    location: {
      id: string
      name: string
      city: string
      province: string
    }
    createdAt: string
  }
}

const categoryLabels: Record<string, string> = {
  food: '🍜 Food',
  activity: '🎯 Activity',
  hidden_gem: '💎 Hidden Gem',
  accommodation: '🏨 Stay',
  transport: '🚗 Transport',
}

const priceLabels: Record<string, string> = {
  budget: '💰 Budget',
  moderate: '💵 Moderate',
  expensive: '💸 Expensive',
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {recommendation.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={recommendation.imageUrl}
            alt={recommendation.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{recommendation.title}</CardTitle>
            <CardDescription className="mt-1">
              {categoryLabels[recommendation.category] || recommendation.category}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{recommendation.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {recommendation.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            {recommendation.location.city}, {recommendation.location.province}
          </div>
          {recommendation.priceRange && (
            <span className="text-xs text-gray-500">
              {priceLabels[recommendation.priceRange] || recommendation.priceRange}
            </span>
          )}
        </div>
        {recommendation.address && (
          <p className="mt-2 text-xs text-gray-500">{recommendation.address}</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {recommendation.user.name || 'Local Guide'}
          </span>
        </div>
        {recommendation.website && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={recommendation.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Visit</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
