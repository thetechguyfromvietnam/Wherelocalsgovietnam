import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'local@vietnam.com' },
    update: {},
    create: {
      email: 'local@vietnam.com',
      name: 'Local Guide',
      password: hashedPassword,
    },
  })

  console.log('✅ Created user:', user.email)

  // Create sample locations
  const locations = [
    {
      name: 'Hoan Kiem Lake',
      city: 'Hanoi',
      province: 'Hanoi',
      description: 'The heart of Hanoi, a beautiful lake in the Old Quarter',
      latitude: 21.0285,
      longitude: 105.8542,
    },
    {
      name: 'Ben Thanh Market',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh City',
      description: 'Famous central market in District 1',
      latitude: 10.7726,
      longitude: 106.6980,
    },
    {
      name: 'Hoi An Ancient Town',
      city: 'Hoi An',
      province: 'Quang Nam',
      description: 'UNESCO World Heritage site with beautiful lantern-lit streets',
      latitude: 15.8801,
      longitude: 108.3380,
    },
    {
      name: 'Ha Long Bay',
      city: 'Ha Long',
      province: 'Quang Ninh',
      description: 'Stunning bay with thousands of limestone karsts',
      latitude: 20.9101,
      longitude: 107.1839,
    },
    {
      name: 'Phong Nha Cave',
      city: 'Phong Nha',
      province: 'Quang Binh',
      description: 'Magnificent cave system in Phong Nha-Ke Bang National Park',
      latitude: 17.5400,
      longitude: 106.2731,
    },
  ]

  const createdLocations = []
  for (const location of locations) {
    // Check if location already exists
    const existing = await prisma.location.findFirst({
      where: {
        name: location.name,
        city: location.city,
      },
    })
    
    if (existing) {
      createdLocations.push(existing)
      console.log(`⏭️  Location already exists: ${location.name}`)
    } else {
      const loc = await prisma.location.create({
        data: location,
      })
      createdLocations.push(loc)
      console.log(`✅ Created location: ${location.name}`)
    }
  }

  // Create sample recommendations
  const recommendations = [
    {
      title: 'Best Pho in Hanoi',
      description: 'Authentic pho at a family-run restaurant in the Old Quarter. The broth is simmered for 12 hours and the beef is incredibly tender. A must-try for any visitor!',
      category: 'food',
      rating: 5,
      priceRange: 'budget',
      address: '49 Bat Dan Street, Hoan Kiem District',
      locationId: createdLocations[0].id,
    },
    {
      title: 'Hidden Rooftop Bar in Saigon',
      description: 'Amazing views of the city skyline. Great cocktails and a relaxed atmosphere. Perfect for sunset drinks.',
      category: 'hidden_gem',
      rating: 5,
      priceRange: 'moderate',
      address: 'District 1, Ho Chi Minh City',
      locationId: createdLocations[1].id,
    },
    {
      title: 'Lantern Making Workshop',
      description: 'Learn to make traditional Vietnamese lanterns in the heart of Hoi An. A unique cultural experience!',
      category: 'activity',
      rating: 5,
      priceRange: 'moderate',
      locationId: createdLocations[2].id,
    },
    {
      title: 'Overnight Cruise in Ha Long Bay',
      description: 'Experience the magic of Ha Long Bay on a traditional junk boat. The sunset and sunrise views are absolutely breathtaking.',
      category: 'activity',
      rating: 5,
      priceRange: 'expensive',
      locationId: createdLocations[3].id,
    },
    {
      title: 'Local Banh Mi Stand',
      description: 'The best banh mi I\'ve ever had! Fresh baguette, perfectly seasoned meat, and amazing pate. Only 20,000 VND!',
      category: 'food',
      rating: 5,
      priceRange: 'budget',
      address: 'Corner of Le Loi and Nguyen Hue, Ho Chi Minh City',
      locationId: createdLocations[1].id,
    },
  ]

  for (const rec of recommendations) {
    await prisma.recommendation.create({
      data: {
        ...rec,
        userId: user.id,
      },
    })
    console.log(`✅ Created recommendation: ${rec.title}`)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
