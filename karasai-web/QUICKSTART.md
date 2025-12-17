# Karasai - Quick Start Guide

Get your development environment up and running in 5 minutes!

## ⚡ Quick Setup

### 1. Install pnpm (if you don't have it)
```bash
npm install -g pnpm
```

### 2. Install Dependencies
```bash
cd karasai-web
pnpm install
```

### 3. Set Up Supabase

#### Option A: Using Supabase Dashboard (Easiest)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **SQL Editor**
3. Copy and paste each migration file from `/supabase/migrations/` in order:
   - First: `001_initial_schema.sql`
   - Second: `002_rls_policies.sql`
   - Third (optional): `003_seed_data.sql` (test data)
4. Run each one by clicking "Run"
5. Go to **Project Settings** > **API** and copy:
   - Project URL
   - Anon (public) key
   - Service role key

#### Option B: Using Supabase CLI
```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 4. Configure Environment Variables
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials
```

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-mapbox-token (optional for now)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🧪 Testing with Seed Data

If you ran `003_seed_data.sql`, you now have:
- **4 management companies** (Progress Residential, Invitation Homes, AMH, FirstKey)
- **8 properties** in Phoenix, AZ (various statuses)
- **2 blog articles**

You can test the search by going to `/search` (we'll build this page next!)

## 📍 What You Have Now

### ✅ Working
- **Homepage**: Hero section with CTAs
- **Header**: Navigation with mobile menu
- **Footer**: Links and social media
- **Authentication Setup**: Ready for login/signup
- **Database**: Complete schema with test data
- **Design System**: Tailwind configured with Karasai colors

### 🚧 Coming Next
- Search page with filters
- Property detail pages
- User dashboard
- Login/signup pages
- API routes

## 🎨 Design Tokens

The design system is already configured in Tailwind:

**Colors:**
```tsx
className="bg-karasai-blue"        // #4E70C6
className="bg-karasai-light"       // #BFDBF7
className="text-status-available"  // Green
className="text-status-coming"     // Yellow
className="text-status-rented"     // Red
```

**Buttons:**
```tsx
className="btn-primary"    // Blue button
className="btn-secondary"  // Outlined button
className="btn-ghost"      // Text button
```

**Status Badges:**
```tsx
className="badge-available"  // Green badge
className="badge-coming"     // Yellow badge
className="badge-rented"     // Red badge
```

## 🔍 Testing the Setup

### Check Database Connection
Create a simple test page at `app/test/page.tsx`:
```tsx
import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .limit(5)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>
      <p className="mb-4">Found {properties?.length} properties</p>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(properties, null, 2)}
      </pre>
    </div>
  )
}
```

Visit [http://localhost:3000/test](http://localhost:3000/test) to see your properties!

## 🐛 Common Issues

### Port 3000 already in use
```bash
# Kill the process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
pnpm dev -- -p 3001
```

### Supabase connection errors
- Double-check your `.env.local` file
- Make sure you copied the URL and keys correctly
- Verify your Supabase project is active

### TypeScript errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Styling not working
- Make sure you ran `pnpm install`
- Restart the dev server after Tailwind config changes

## 📚 Next Steps

Now that your environment is set up, let's build the core features:

1. **Search Page** - Property search with filters
2. **Property Cards** - Reusable property display components
3. **API Routes** - Search, autocomplete, favorites
4. **Authentication Pages** - Login, signup, password reset
5. **User Dashboard** - Saved properties

Which would you like to build first?

## 🎯 Pro Tips

1. **Use the seed data** - Makes development much easier
2. **Check the README** - Full documentation is in `/karasai-web/README.md`
3. **Hot reload works** - Changes appear instantly
4. **TypeScript is your friend** - It catches bugs before runtime
5. **Tailwind IntelliSense** - Install the VS Code extension for autocomplete

## 🆘 Need Help?

- Check the main [README.md](./README.md)
- Review the [PRD](../Karasai_PRD.md)
- Check database schema in `/supabase/README.md`

---

**You're all set! Happy coding! 🚀**
