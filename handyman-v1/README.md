# Handyman Website Project

## 📍 Navigation
**Lost in the docs?** Use our [Documentation Navigation](docs/navigation.md) to find what you need!

## 🚀 Quick Start
**New to the project?** Start with our [Getting Started Guide](docs/getting-started.md) for a detailed walkthrough!

### Quick Setup
1. Clone: `git clone https://github.com/seoninja13/lead-gen-handyman.git`
2. Install: `npm install`
3. Configure: Copy `.env.example` to `.env.local` and add Supabase credentials
4. Run: `npm run dev`
5. View: Open [http://localhost:3000](http://localhost:3000)

## 🎯 Project Overview
A Next.js website for handyman services in the Greater Sacramento area, featuring:
- Service listings and city-specific pages
- Modern UI with ShadCN components
- Supabase database integration
- SEO optimization
- Dynamic content generation

## 📚 Documentation

### 1. Getting Started
Start here to understand the project:
- [Project Requirements](project-requirements.md) - Complete project overview
- [Development Workflow](docs/development-workflow.md) - How to develop and deploy

### 2. Technical Guides
Detailed technical documentation:
- [Database Operations](src/utils/supabase/README.md) - CRUD operations guide
- [Database Schema](docs/database-schema.md) - Database structure
- [UI Components](docs/ui-components.md) - Component library

### 3. Content & SEO
Content creation guidelines:
- [SEO Strategy](docs/seo-strategy.md) - SEO implementation
- [Content Guidelines](docs/content-guidelines.md) - Content creation

### 4. Progress
Track project progress:
- [Current Status](tracking-progress.md) - Implementation status
- [TODO List](TODO.md) - Upcoming tasks

## 🛠️ Tech Stack
- **Framework**: Next.js 14.2.23
- **Database**: Supabase
- **UI**: TailwindCSS + ShadCN
- **Deployment**: Netlify

## 📁 Project Structure
```
├── docs/               # Documentation files
├── public/            # Static assets
├── src/
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
└── scripts/          # Build scripts
```

## 🚀 Development

### Prerequisites
- Node.js v18+
- npm/yarn
- Git
- VS Code (recommended)

### Environment Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Add Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🧪 Testing
```bash
# Run all tests
npm test

# Run specific test
npm test [test-name]
```

## 📦 Database

### Supabase Tables
- `cities` - City information
- `services` - Service listings
- `city_services` - City-service relationships

### Data Management
- Use Supabase dashboard for data management
- Run migrations through Supabase CLI
- Regular backups are automated

## 🔍 SEO Structure
1. Homepage (Tier 1)
   - Main landing page
   - Service overview
   - City selection

2. Service Pages (Tier 2)
   - Individual service details
   - Pricing information
   - Service areas

3. City-Service Pages (Tier 3)
   - Location-specific content
   - Local pricing
   - Coverage areas

## 👥 Contributing
1. Create a feature branch
2. Make your changes
3. Run tests
4. Create a pull request
5. Wait for review

## 📝 Notes
- Follow TypeScript best practices
- Use ShadCN components when possible
- Keep SEO in mind for all content
- Test thoroughly before deployment

## 🔗 Useful Links
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [ShadCN Docs](https://ui.shadcn.com)

## 📞 Support
For questions or issues:
1. Check existing documentation
2. Search GitHub issues
3. Create a new issue if needed

## 🔄 Updates
- Check [tracking-progress.md](tracking-progress.md) for latest updates
- Review [TODO.md](TODO.md) for upcoming changes
- Monitor GitHub releases for versions
