# Database Schema Documentation

## Overview
Database schema for the handyman website using Supabase, focusing on cities, services, and their relationships.

## Tables

### 1. Cities Table
```sql
create table cities (
  id bigint primary key,
  name varchar not null,
  slug varchar not null,
  state varchar not null,
  county varchar not null,
  description text not null,
  population integer not null,
  coordinates jsonb not null,
  meta_title varchar not null,
  meta_description text not null,
  created_at timestamptz not null default now()
);
```

#### Fields Description
- `id`: Unique identifier for the city
- `name`: City name (e.g., "Sacramento")
- `slug`: URL-friendly version of name (e.g., "sacramento")
- `state`: State abbreviation (e.g., "CA")
- `county`: County name (e.g., "Sacramento County")
- `description`: SEO-optimized city description
- `population`: City population count
- `coordinates`: JSON object containing lat/lng
- `meta_title`: SEO title for city pages
- `meta_description`: SEO description for city pages
- `created_at`: Timestamp of record creation

### 2. Services Table
```sql
create table services (
  id bigint primary key,
  name varchar not null,
  slug varchar not null,
  category varchar not null,
  description text not null,
  price_range varchar not null,
  duration varchar not null,
  meta_title varchar not null,
  meta_description text not null,
  images jsonb not null,
  created_at timestamptz not null default now()
);
```

#### Fields Description
- `id`: Unique identifier for the service
- `name`: Service name (e.g., "Gutter Cleaning")
- `slug`: URL-friendly version of name
- `category`: Service category (e.g., "Maintenance")
- `description`: Detailed service description
- `price_range`: Price range for service
- `duration`: Estimated duration
- `meta_title`: SEO title for service pages
- `meta_description`: SEO description
- `images`: JSON array of service images
- `created_at`: Timestamp of record creation

### 3. City Services Junction Table
```sql
create table city_services (
  id bigint primary key,
  city_id bigint references cities(id),
  service_id bigint references services(id),
  service_city_ca text,
  main_content text,
  features_content text,
  benefits_content text,
  service_area_content text,
  seo_title text,
  seo_description text,
  seo_h1 text,
  seo_url text,
  service_images jsonb default '[]',
  image_alt_tags jsonb default '[]',
  maps_data jsonb default '{}',
  faq_content jsonb default '[]',
  testimonials jsonb default '[]',
  structured_data jsonb default '{}',
  created_at timestamptz not null default now()
);
```

#### Fields Description
- `id`: Unique identifier
- `city_id`: Reference to cities table
- `service_id`: Reference to services table
- Content Fields:
  - `service_city_ca`: California-specific service info
  - `main_content`: Primary content
  - `features_content`: Service features
  - `benefits_content`: Service benefits
  - `service_area_content`: Coverage area details
- SEO Fields:
  - `seo_title`: Page title
  - `seo_description`: Meta description
  - `seo_h1`: Main heading
  - `seo_url`: URL path
- Media Fields:
  - `service_images`: JSON array of images
  - `image_alt_tags`: JSON array of alt texts
  - `maps_data`: Service area map data
- Additional Fields:
  - `faq_content`: JSON array of FAQs
  - `testimonials`: JSON array of reviews
  - `structured_data`: JSON-LD schema data
- `created_at`: Timestamp of record creation

## JSON Field Structures

### 1. Coordinates (cities.coordinates)
```typescript
type Coordinates = {
  lat: number;
  lng: number;
}
```

### 2. Service Images (services.images)
```typescript
type ServiceImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
}
```

### 3. FAQ Content (city_services.faq_content)
```typescript
type FAQ = {
  question: string;
  answer: string;
}
```

### 4. Testimonials (city_services.testimonials)
```typescript
type Testimonial = {
  author: string;
  rating: number;
  content: string;
  date: string;
}
```

### 5. Maps Data (city_services.maps_data)
```typescript
type MapsData = {
  center: Coordinates;
  zoom: number;
  markers?: Array<{
    position: Coordinates;
    title: string;
  }>;
}
```

## Indexes and Constraints

### Cities Table
```sql
create index idx_cities_slug on cities(slug);
create index idx_cities_state on cities(state);
```

### Services Table
```sql
create index idx_services_slug on services(slug);
create index idx_services_category on services(category);
```

### City Services Table
```sql
create index idx_city_services_city on city_services(city_id);
create index idx_city_services_service on city_services(service_id);
create index idx_city_services_seo_url on city_services(seo_url);
```

## Type Guards

```typescript
// Type guard for coordinates
function isCoordinates(json: Json): json is Coordinates {
  return (
    typeof json === 'object' &&
    json !== null &&
    'lat' in json &&
    'lng' in json &&
    typeof json.lat === 'number' &&
    typeof json.lng === 'number'
  );
}

// Type guard for service images
function isServiceImage(json: Json): json is ServiceImage {
  return (
    typeof json === 'object' &&
    json !== null &&
    'url' in json &&
    'alt' in json &&
    'width' in json &&
    'height' in json &&
    typeof json.url === 'string' &&
    typeof json.alt === 'string' &&
    typeof json.width === 'number' &&
    typeof json.height === 'number'
  );
}
```

## Notes
- All tables include created_at timestamp
- JSON fields use default empty values
- Foreign key constraints maintain referential integrity
- Indexes optimize common queries
- Type guards ensure data validation
