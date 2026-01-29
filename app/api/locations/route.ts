import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const province = searchParams.get('province')

    const locations = await prisma.location.findMany({
      where: {
        ...(city && { city }),
        ...(province && { province }),
      },
      include: {
        _count: {
          select: {
            recommendations: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, city, province, latitude, longitude, description } = body

    if (!name || !city || !province) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const location = await prisma.location.create({
      data: {
        name,
        city,
        province,
        latitude,
        longitude,
        description,
      },
    })

    return NextResponse.json(location, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    )
  }
}
