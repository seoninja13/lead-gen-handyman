# Getting Started Guide

## Introduction
Welcome to the Handyman Website project! This guide will help you get up and running quickly.

## 1. First Steps

### Set Up Your Environment
1. Install required tools:
   - Node.js v18+ from [nodejs.org](https://nodejs.org)
   - Git from [git-scm.com](https://git-scm.com)
   - VS Code from [code.visualstudio.com](https://code.visualstudio.com)

2. Clone the repository:
   ```bash
   git clone https://github.com/seoninja13/lead-gen-handyman.git
   cd lead-gen-handyman
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add these Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://nshlrphkirhzchuodpeo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 2. Project Structure Overview

### Key Directories
- `/src/app` - Next.js pages and routes
- `/src/components` - Reusable React components
- `/src/utils` - Utility functions and helpers
- `/public` - Static assets (images, etc.)
- `/docs` - Project documentation

### Important Files
- `README.md` - Project overview
- `project-requirements.md` - Detailed requirements
- `tracking-progress.md` - Current status
- `TODO.md` - Upcoming tasks

## 3. Documentation Guide

### Read These First (In Order)
1. [README.md](../README.md)
   - Quick start guide
   - Project overview
   - Basic setup instructions

2. [Project Requirements](../project-requirements.md)
   - Complete project overview
   - Website structure
   - Technical requirements

3. [Development Workflow](development-workflow.md)
   - Development process
   - Build and deployment
   - Best practices

### Technical Documentation
1. [Database Schema](database-schema.md)
   - Table structures
   - Relationships
   - Type definitions

2. [UI Components](ui-components.md)
   - Component library
   - Usage examples
   - Props documentation

### Content & SEO
1. [SEO Strategy](seo-strategy.md)
   - SEO implementation
   - Content structure
   - Meta tags and schema

2. [Content Guidelines](content-guidelines.md)
   - Writing style
   - Content organization
   - Media guidelines

## 4. Common Tasks

### Running the Project
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### Working with Components
1. Components are in `/src/components`
2. Use TypeScript for all components
3. Follow ShadCN patterns
4. Include proper types and documentation

### Database Operations
1. Use Supabase client from `/src/utils/supabase`
2. Follow type definitions in `/src/types`
3. Handle errors appropriately
4. Use proper data validation

### Adding New Pages
1. Create page in `/src/app`
2. Add necessary components
3. Implement SEO metadata
4. Add to sitemap

## 5. Getting Help

### When You're Stuck
1. Check the documentation in this order:
   - This getting started guide
   - Relevant documentation file
   - Component documentation
   - External documentation (Next.js, Supabase)

2. Look for examples:
   - Similar components
   - Similar pages
   - Test files

3. Ask for help:
   - Create a GitHub issue
   - Ask team members
   - Check external resources

### Common Issues

#### Development Server Won't Start
- Check Node.js version (v18+ required)
- Verify all dependencies are installed
- Confirm environment variables are set

#### TypeScript Errors
- Check types in `/src/types`
- Verify imports are correct
- Ensure proper type usage

#### Database Connection Issues
- Verify Supabase credentials
- Check network connectivity
- Review error messages

## 6. Next Steps

### Start Contributing
1. Pick a task from TODO.md
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Create a pull request

### Learn More
- Review all documentation
- Study existing components
- Understand the data flow
- Explore the codebase

## Notes
- Keep this guide open while working
- Reference documentation frequently
- Follow established patterns
- Ask questions when needed
