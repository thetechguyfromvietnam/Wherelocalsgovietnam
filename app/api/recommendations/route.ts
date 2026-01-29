import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const category = searchParams.get('category')
    const locationId = searchParams.get('locationId')

    const recommendations = await prisma.recommendation.findMany({
      where: {
        ...(locationId && { locationId }),
        ...(city && { location: { city } }),
        ...(category && { category }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        location: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('Database error:', error)
    // Return empty array instead of error so frontend doesn't hang
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, category, rating, priceRange, imageUrl, website, address, locationId } = body

    if (!title || !description || !category || !locationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        title,
        description,
        category,
        rating: rating || 5,
        priceRange,
        imageUrl,
        website,
        address,
        userId: session.user.id,
        locationId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        location: true,
      },
    })

    return NextResponse.json(recommendation, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create recommendation' },
      { status: 500 }
    )
  }
}
