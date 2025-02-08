Lets review our Documntation again and make sure it has a streamlined, simple way to be accessed, and understood by aeven a junir developer.# Handyman Website Project Requirements

## Overview
A programmatically generated handyman website for Placerville and Greater Sacramento area, focusing on SEO optimization and dynamic content generation.

## Project Structure

### 1. Core Architecture
- **Framework**: Next.js 14.2.23
- **UI Libraries**: 
  - TailwindCSS
  - ShadCN
- **Database**: Supabase
- **Deployment**: Netlify
- **Build Strategy**: Static Generation with ISR

### 2. Website Structure (3-Tier Approach)

#### Tier 1: Homepage (placervillehandyman.us)
- Content Requirements:
  - 3000+ words of SEO-optimized content
  - 4-5 embedded YouTube videos
  - FAQ section with schema markup
  - Internal contextual links to all Tier 2 pages
- UI Components:
  - Hero section with search
  - Featured services cards
  - City selection with interactive map
  - Video gallery
  - FAQ accordion

#### Tier 2: Service Category Pages
- Individual pages for each service (e.g., gutter cleaning, door repair)
- Content Requirements:
  - 1500-2000 words of unique content
  - Internal links to homepage and Tier 3 pages
  - 1-3 external authority links
  - Service-specific images and videos
  - Customer testimonials

#### Tier 3: City-Service Pages
- Dynamically generated pages combining services and cities
- Content Requirements:
  - Unique, city-specific content
  - 2-5 internal links:
    - 10% to homepage
    - 50% to Tier 2 pages
    - Remainder to other Tier 3 pages
  - Location-specific testimonials
  - Service area maps

### 3. URL Structure
- Service Pages: `/service/[service]/`
  - Example: `/service/gutter-cleaning/`
- Location Pages: `/location/[city]/`
  - Example: `/location/sacramento/`
- Combined Pages: `/service/[service]-[city]/`
  - Example: `/service/gutter-cleaning-sacramento/`
- Additional Pages:
  - Guides: `/guides/[topic]/`
  - Rebates: `/rebates/[state]/[city]/`

### 4. SEO Requirements

#### Technical SEO
- Meta Tags:
  - Dynamic title generation
  - Meta descriptions
  - Open Graph tags
- Schema Markup:
  - Service schema
  - FAQ schema
  - Local Business schema
- Sitemaps:
  - Split into 2500 URLs per file
  - Sitemap index for categories

#### Content SEO
- Internal Linking Strategy:
  - Homepage → Service pages
  - Service pages → City pages
  - Cross-linking between related services
- External Authority Links:
  - Industry resources
  - Professional associations
  - Home maintenance guides
- Content Structure:
  - Proper heading hierarchy
  - Featured snippets optimization
  - Location-specific keywords

### 5. Performance Requirements
- Implement ISR for static pages
- Caching strategy for database queries
- Image optimization
- Lazy loading for:
  - Images
  - Videos
  - Map components
- Core Web Vitals optimization

### 6. Data Management
- Database Schema (Supabase):
  - Cities table
  - Services table
  - City-Services junction table
- Content Types:
  - Service descriptions
  - City information
  - Testimonials
  - FAQs
  - Images and videos

### 7. Component Requirements
- Modern UI Components:
  - Service cards
  - City selection interface
  - Search functionality
  - Video gallery
  - FAQ accordion
  - Testimonial carousel
- Interactive Elements:
  - Service area maps
  - Contact forms
  - Rating system
  - Share buttons

### 8. Development Guidelines
- TypeScript for type safety
- Component-based architecture
- Error handling:
  - API failures
  - Loading states
  - Data validation
- Testing requirements:
  - Unit tests
  - Integration tests
  - E2E testing
- Documentation:
  - Code comments
  - API documentation
  - Deployment guide

## Project Documentation

### Core Documentation
1. [Project Requirements](project-requirements.md) - This file, main entry point
2. [Development Workflow](docs/development-workflow.md) - Development process and standards
3. [Database Schema](docs/database-schema.md) - Database structure and relationships
4. [UI Components](docs/ui-components.md) - Component library and usage

### Implementation Guidelines
1. [SEO Strategy](docs/seo-strategy.md) - SEO optimization and content structure
2. [Content Guidelines](docs/content-guidelines.md) - Content creation and maintenance

### Progress Tracking
- [Current Status](tracking-progress.md) - Implementation progress and next steps
- [TODO List](TODO.md) - Detailed task breakdown and priorities

## Quick Links

### Development Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ShadCN Documentation](https://ui.shadcn.com)

### Project Links
- [GitHub Repository](https://github.com/seoninja13/lead-gen-handyman)
- [Supabase Project](https://nshlrphkirhzchuodpeo.supabase.co)
- [Netlify Deployment](https://placervillehandyman.us)

## Getting Started

1. Review the documentation in this order:
   - Project Requirements (this file)
   - Development Workflow
   - Database Schema
   - UI Components
   - SEO Strategy
   - Content Guidelines

2. Check current status:
   - Review tracking-progress.md
   - Check TODO.md for next tasks

3. Set up development environment:
   - Follow setup instructions in development-workflow.md
   - Configure environment variables
   - Run local development server

## Notes
- All documentation is maintained in the /docs directory
- Each aspect has its own detailed documentation file
- Follow the development workflow for contributions
- Keep documentation updated as project evolves
