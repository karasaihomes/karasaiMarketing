# Karasai Web Application

Verified rental property platform built with Next.js 16+, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Mapbox GL JS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+ (recommended) or npm
- Supabase account
- Mapbox account (for map features)

## 🛠️ Setup

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations from `/supabase/migrations/`:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_seed_data.sql` (optional - test data only)
3. Get your project URL and anon key from Project Settings > API

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Generate Database Types (Optional but Recommended)

```bash
npx supabase gen types typescript --project-id your-project-ref > types/supabase.ts
```

### 5. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
karasai-web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and configs
│   ├── supabase/         # Supabase client setup
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
│   └── supabase.ts       # Auto-generated database types
├── public/               # Static assets
└── supabase/             # Database migrations
```

## 🎨 Design System

### Colors

- **Karasai Light**: `#BFDBF7`
- **Karasai Blue**: `#4E70C6`
- **Status Available**: `#4EC645` (Green)
- **Status Coming Soon**: `#FFC409` (Yellow)
- **Status Rented**: `#D93C04` (Red)

### Typography

- **Font**: Montserrat (300, 400, 500, 600, 700)
- **Base Size**: 16px

### Components

Tailwind utility classes are available:
- `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- `.badge-available`, `.badge-coming`, `.badge-rented`
- `.card`, `.input`
- `.container-custom`

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to add all environment variables from `.env.local.example` to your production environment.

## 📝 Key Features (MVP)

- ✅ Property search with filters
- ✅ Real-time property status updates
- ✅ User authentication (email, Google, Facebook)
- ✅ Save favorite properties
- ✅ Property comparison (up to 4)
- ✅ Map view with geolocation
- ✅ Contact forms
- ✅ Blog/Articles
- ✅ Mobile-first responsive design

## 🔐 Authentication Flow

- Users can browse properties without authentication
- Authentication required for:
  - Saving favorite properties
  - Accessing user dashboard
  - Viewing saved properties

## 🗺️ Map Integration

Uses Mapbox GL JS for:
- Property location display
- Map-based property search
- Radius/bounds filtering
- Clustered property pins

## 📊 Analytics

Google Analytics 4 is configured to track:
- Page views
- Property views
- Search queries
- Filter applications
- Contact clicks
- Application clicks

## 🧪 Testing

### With Seed Data

The database includes seed data for testing:
- 4 management companies
- 8 properties in Phoenix, AZ
- 2 published articles

Test accounts can be created through the sign-up flow.

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Supabase Auth handles session management
- Middleware protects authenticated routes
- API routes validate authentication
- Environment variables for sensitive data

## 📚 Additional Documentation

- [PRD](../Karasai_PRD.md) - Product Requirements Document
- [Database Schema](../supabase/README.md) - Database documentation
- [API Routes](./app/api/README.md) - API documentation (coming soon)

## 🐛 Troubleshooting

### Common Issues

**Issue**: `Cannot find module '@/components/...'`
- **Solution**: Make sure TypeScript paths in `tsconfig.json` are correct

**Issue**: Supabase client errors
- **Solution**: Check that environment variables are set correctly

**Issue**: Styles not applying
- **Solution**: Restart dev server after Tailwind config changes

**Issue**: Map not loading
- **Solution**: Verify Mapbox token is set in environment variables

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ by the Karasai Team**
