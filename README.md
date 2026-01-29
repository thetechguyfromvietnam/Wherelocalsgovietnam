# Where Locals Go Vietnam

A full-stack platform where locals in Vietnam share authentic recommendations about food, activities, hidden gems, accommodations, and more.

## Features

- 🔍 **Discover Recommendations**: Browse authentic recommendations from locals
- 📍 **Location-Based**: Find recommendations by city and province
- 🏷️ **Categories**: Filter by food, activities, hidden gems, accommodations, and transport
- 👤 **User Profiles**: Create an account and share your own recommendations
- ⭐ **Ratings & Reviews**: See ratings and detailed descriptions
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI + Custom components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Wherelocalsgovietnam
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed initial data:
You can add some sample locations and recommendations through Prisma Studio:
```bash
npx prisma studio
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── recommendations/   # Recommendation pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   └── RecommendationCard.tsx
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # Auth configuration
│   └── utils.ts          # Helper functions
└── prisma/               # Database schema
    └── schema.prisma
```

## Features to Add

- [ ] Image upload functionality
- [ ] Interactive map with location markers
- [ ] User profile pages
- [ ] Recommendation editing/deletion
- [ ] Comments and discussions
- [ ] Search with advanced filters
- [ ] Social sharing
- [ ] Email notifications
- [ ] Admin dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
