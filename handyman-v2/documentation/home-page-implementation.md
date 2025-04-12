# Handyman Services Website - Home Page Implementation

## Overview

This document outlines the implementation details of the handyman services website home page. The home page has been restored to match the original real estate template design while adapting it for handyman services.

## Components Structure

The home page is built using the following components:

1. **Hero Section**
   - Component: `Hero.jsx`
   - Features: Background image, headline, and search functionality
   - Implementation: Uses `GlobalHeroFilter` for search functionality

2. **Featured Service Providers**
   - Component: `FeaturedProperties.jsx`
   - Features: Displays featured handyman businesses
   - Data Source: `data/properties.js`

3. **Find Services Section**
   - Component: `FindProperties.jsx`
   - Features: Displays available handyman services
   - Data Source: `data/findServices.js`

4. **Find Services by City**
   - Component: `FindProperties.jsx` (reused)
   - Features: Displays services by city
   - Data Source: `data/cities.js`

5. **Why Choose Us**
   - Component: `WhyChoose.jsx`
   - Features: Highlights benefits of using the platform

6. **Testimonials**
   - Component: `Testimonial.jsx`
   - Features: Customer reviews and ratings

7. **Partners**
   - Component: `Partners.jsx`
   - Features: Displays partner companies

8. **Footer**
   - Component: `Footer.jsx` and `CopyrightFooter.jsx`
   - Features: Contact information and copyright

## Data Management

The website uses a combination of static data files and will eventually connect to Supabase for dynamic data:

1. **Static Data Files**
   - `properties.js`: Handyman businesses data
   - `findServices.js`: Service categories
   - `cities.js`: City locations

2. **Future Supabase Integration**
   - The home page includes commented code for future Supabase integration
   - Services: `businessService`, `serviceService`, `cityService`
   - Test page available at: `/test/supabase-test.js`

## Assets

All assets are stored in the `/public/assets` directory:

1. **Images**
   - Handyman business images: `/assets/images/handyman/`
   - Service category images: `/assets/images/service/`
   - City images: `/assets/images/cities/`
   - Partner logos: `/assets/images/partners/`

2. **CSS**
   - Main stylesheet: `/assets/css/style.css`
   - Responsive styles: `/assets/css/responsive.css`

## Special Handling for Supabase Integration

When integrating with Supabase, note the following:

1. **Table Name Handling**
   - The test table is named 'test-delete'
   - When using Supabase client, reference as 'test_delete' (with underscore)
   - When writing SQL queries directly, use 'test-delete' (with hyphen)

2. **Implementation Details**
   - Special handling for tables with hyphens in their names
   - Multiple fallback mechanisms implemented
   - Direct SQL execution via RPC functions
   - REST API fallback for hyphenated table names
   - Automatic hyphen-to-underscore conversion

## Development Notes

1. **Image Placeholders**
   - SVG placeholders created for missing images
   - Script available: `create-placeholders.js`

2. **Styling**
   - Original template styling preserved
   - Bootstrap integration via CDN
   - Custom styles in style.css and responsive.css

3. **Browser Compatibility**
   - Tested on modern browsers (Chrome, Firefox, Safari)
   - Responsive design for mobile and tablet

## Running the Application

1. **Development Mode**

```bash
yarn dev
```

2. **Production Build**

```bash
yarn build
yarn start
```

## Next Steps

1. Replace placeholder images with actual handyman service images
2. Complete Supabase integration for dynamic data
3. Implement user authentication
4. Add service booking functionality
