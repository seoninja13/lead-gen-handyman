# Handyman Lead Generation - Project Rules and Documentation

## 1. Tech Stack and Architecture

### Foundational Website Architecture

- **Framework**: Next.js 14 with App Router
- **Routing Strategy**: Dynamic routing with Incremental Static Regeneration (ISR)
- **URL Structure**: City-specific, service-oriented pattern for hyperlocal targeting
  - `domain.com/[service-slug]-[city]-[state]`  
  - `domain.com/[business-name]-[city]-[state]`
- **Examples**:
  - `/emergency-plumbing-repair-sacramento-ca`
  - `/abc-handyman-services-sacramento-ca`

### Core Technical Components

- **Frontend**:
  - Next.js 14 with App Router
  - React 18
  - TypeScript
  - Tailwind CSS
  - Heroicons

- **API Integrations**:
  - Google Places API (with cost optimization)
  - OpenAI API (for profile enrichment)
  - Supabase (for data storage)

- **Authentication**:
  - Supabase Auth

- **Data Storage**:
  - Supabase (PostgreSQL)
  - File-based caching (for Google Places API responses)

- **Build Optimization**:
  - Incremental Static Regeneration
  - 6-month cached updates via ISR with revalidate: 86400
  - Staggered builds for top 50 cities during initial deployment
  - Fallback pages for long-tail cities

## 2. Data Management System

### Supabase Database Integration

#### 1. places Table

This table contains place data from Google Places API with the following columns:

- id (UUID, primary key)
- place_id (string, Google Places ID)
- display_name (string)
- formatted_address (string)
- location (geography point)
- city (string)
- state (string)
- postal_code (string)
- rating (float)
- user_ratings_total (integer)
- business_status (string)
- types (array of strings)
- website (string)
- phone_number (string)
- opening_hours (jsonb)
- photos (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
- api_response (jsonb)
- cache_version (integer)

#### 2. service_areas Table

This table contains service area data with the following columns:

- id (UUID, primary key)
- place_id (string, reference to places.place_id)
- city (string)
- state (string)
- radius_miles (float)
- custom_polygon (geography polygon)
- created_at (timestamp)
- updated_at (timestamp)

#### 3. place_search_history Table

This table contains search history data with the following columns:

- id (UUID, primary key)
- query (string)
- location (geography point)
- city (string)
- state (string)
- result_count (integer)
- created_at (timestamp)

### Google Places API Integration

- Uses API key authentication
- Implements caching to reduce API costs
- Provides methods for searching places, retrieving details, and finding nearby places

### Data Pipeline Architecture

```javascript
// Data fetching workflow  
const fetchPlacesData = async (query, location) => {  
  // Check cache first
  const cachedData = await getCachedData(query, location);
  if (cachedData) return cachedData;
  
  // Fetch from API if not cached
  const data = await googlePlacesClient.searchPlaces(query, location);
  
  // Cache the results
  await cacheData(query, location, data);
  
  return data;
};
```

### Automation Workflow

- Database-to-JSON conversion via npm script
- Batch API requests to Google Places API
- Edge-cached storage in /public/data

## 3. UI Requirements

### Data Operation Buttons

- All API calls must have dedicated buttons with descriptive labels
- Buttons must show loading states during operations
- Success/error states must display in adjacent UI elements
- Use shared Button component with variant props for reusable operations

### Button Specifications

- **"Search Businesses"**: Triggers Google Places API search
- **"Get Place Details"**: Retrieves detailed information about a specific place
- **"Find Nearby Places"**: Searches for places near a specific location
- **"Save to Database"**: Saves place data to Supabase
- **"Update Service Areas"**: Updates service area data for a place
- **"Enrich Profile"**: Enriches place data using OpenAI API

### UI Components

- **Loading States**: Use Spin component during API calls
- **Error Displays**: Use Alert component for error messages
- **Data Tables**: Use Table component for displaying data
- **Business Cards**: Custom Card component for business listings
- **Tabs**: For organizing different functionalities
- **Notifications**: For success/error messages
- **Maps**: For displaying service areas and business locations

### Business Listings

```javascript
// Dynamic company card component  
<CompanyCard  
  name={company.displayName}  
  rating={company.rating}  
  services={company.types}  
  address={company.formattedAddress}
  phone={company.phoneNumber}
/>
```

### Service Area Visualization

```jsx
<ServiceAreaMap
  businessName={place.displayName}
  location={place.location}
  serviceRadius={serviceArea.radiusMiles}
  customPolygon={serviceArea.customPolygon}
/>
```

## 4. Content Optimization Framework

### Service Page Template Structure

- **Hero Section**:
  - H1: "Professional {{service_name}} in {{city}}, {{state}}"
  - Emergency CTA button with click-to-call functionality

- **Localized Content Modules**:
  - City-specific handyman statistics
  - Common local service needs
  - Climate impact analysis
  - Local regulation highlights

- **Educational Content**:
  - DIY vs. Professional service comparison
  - Cost-saving maintenance tips
  - When to call a professional

### Schema Implementation

```json
{  
  "@context": "https://schema.org",  
  "@type": "HomeAndConstructionBusiness",  
  "name": "{{business_name}}",  
  "serviceType": "{{service_type}}",  
  "areaServed": "{{city}}, {{state}}",  
  "image": "{{logo_url}}",  
  "priceRange": "$$",  
  "aggregateRating": {  
    "@type": "AggregateRating",  
    "ratingValue": "{{rating}}",  
    "reviewCount": "{{review_count}}"  
  }  
}
```

## 5. Technical SEO Implementation

### URL Structure Optimization

| Page Type | URL Pattern | Dynamic Params |
|-----------|-------------|---------------|
| Service Landing | /[service-slug]-[city]-[state] | city, state, service |
| Business Profile | /[business-slug]-[city]-[state] | city, state, business |
| Category Hub | /services/[category-slug] | category |

### ISR Configuration

```javascript
export async function generateStaticParams() {  
  const cities = await getCitiesFromDatabase();  
  return cities.map((city) => ({  
    city: city.slug,
    state: city.state_slug,
  }));  
}  

export const revalidate = 86400; // 24h cache
```

### Asset Optimization

```javascript
// next.config.js  
module.exports = {  
  images: {  
    remotePatterns: [  
      {  
        protocol: 'https',  
        hostname: 'lh3.googleusercontent.com',  
        pathname: '/**',  
      },  
    ],  
  },  
};
```

### Sitemap Generation

- Dynamic sitemap split into 2500-URL chunks
- Priority weighting for emergency services

## 6. Quality Assurance Protocols

### Automated Testing Suite

- Schema Validation

```bash
npm run test:schema
```

- JSON-LD markup verification
- Broken Link Monitoring

```javascript
// link-checker.js  
const BrokenLinkDetector = new Crawler({  
  maxConnections: 10,  
  callback: (error, res) => {  
    if(res.statusCode >= 400) logError(res.url);  
  }  
});
```

### Google Places Data Freshness

- Weekly audits via automated scripts
- Alert system for stale profiles (>30 days)

## 7. Monitoring & Optimization

### Core Web Vitals

- LCP optimization for hero images
- CLS reduction via stable ad placements

### Conversion Tracking

```javascript
// Telemetry setup  
window.dataLayer.push({  
  'event': 'service_page_view',  
  'city': currentCity,
  'state': currentState,
  'service': currentService  
});
```

### Content Refresh Protocol

- Quarterly service offering updates
- Annual pricing guideline revisions

## 8. Development Guidelines

### General Rules

- Before creating new folders or files, check whether they already exist
- All documentation is in the documentation folder
- All feature phases and tracking, TODO lists, etc. are in the documentation folder
- Use heavily commented code for clarity and maintainability

### Next.js Build Protocol

**Cache Cleanup Commands**:

```powershell
# Force-clean build artifacts
Get-Process node | Where-Object { $_.Path -match "next" } | Stop-Process -Force
Remove-Item -Recurse -Force .\.next, .\node_modules\.cache

# Production-grade dependency install
npm ci --production --silent

# Always set port in both env and CLI
$env:PORT=3000
npm run dev -- --port 3000
```

### Best Practices

- Use PowerShell-native commands instead of &&
- Use semicolons (;) to separate commands instead of &&
- Explicitly set port 3000 in both environment and CLI
- Silent install to reduce console noise
- Proper cleanup of Next.js cache folders
- Force removal without confirmation prompts
- Execute all necessary commands automatically

### Daily Logs

- Record all changes and progress in daily logs
- Ensure all changes are documented and tracked
- Include all relevant information to ensure consistency and readability
- Never delete a daily log, just add a new entry to the tracking-progress.md file

### Project Documentation

#### Location and Purpose

- Project documentation is stored in the `handyman-v2/documentation` directory
- This directory contains all project requirements, specifications, and development tracking

#### Key Documentation Files

- google-places-integration.md - Documentation for Google Places API integration
- profile-enrichment.md - Documentation for profile enrichment using OpenAI
- seo-audit.md - SEO audit and recommendations
- seo-mapping.md - SEO mapping for service pages
- tracking-progress.md - Overview of project progress and completed features
- project-rules.md - Project rules and documentation (this file)

#### How to Use

- Always check the documentation first when looking for project information
- Review daily logs for recent changes and development context
- Consult specific documentation files for detailed requirements
- Update documentation when implementing new features or making significant changes

### Command Line Best Practices

- Use semicolons (;) instead of && for joining multiple commands
- Example: `curl -s http://localhost:3000/api/test-places > test-places-output.json; type test-places-output.json`
- For killing ports: `npx kill-port 8888 3000; npx netlify dev --force`
