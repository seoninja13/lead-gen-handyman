# UI Components Documentation

## Overview
Documentation for UI components using Next.js, TailwindCSS, and ShadCN UI, focusing on modern design and user experience.

## Core Components

### 1. Layout Components

#### Header Component
```tsx
// components/layout/Header.tsx
- Navigation menu
- Search bar
- Location selector
- Contact information
- Mobile responsive menu

Props:
- currentCity?: string
- searchQuery?: string
- onSearch: (query: string) => void
- onLocationChange: (city: string) => void
```

#### Footer Component
```tsx
// components/layout/Footer.tsx
- Service categories
- City links
- Contact information
- Social media links
- Newsletter signup
- Trust badges

Props:
- cities: City[]
- services: Service[]
- socialLinks: SocialLink[]
```

### 2. Service Components

#### ServiceCard
```tsx
// components/services/ServiceCard.tsx
- Service image
- Title
- Description
- Price range
- Duration
- Call-to-action button

Props:
- service: Service
- showPrice?: boolean
- showDuration?: boolean
- variant?: 'default' | 'featured' | 'compact'
```

#### ServiceGrid
```tsx
// components/services/ServiceGrid.tsx
- Grid of ServiceCard components
- Filtering options
- Sorting options
- Pagination

Props:
- services: Service[]
- filter?: FilterOptions
- sort?: SortOptions
- itemsPerPage?: number
```

### 3. City Components

#### CitySelector
```tsx
// components/cities/CitySelector.tsx
- Searchable dropdown
- Popular cities list
- Recent selections
- Map integration

Props:
- cities: City[]
- selectedCity?: string
- onSelect: (city: string) => void
- showMap?: boolean
```

#### CityServiceList
```tsx
// components/cities/CityServiceList.tsx
- List of services in city
- Filtering options
- Local pricing
- Availability info

Props:
- cityId: number
- services: CityService[]
- showPricing?: boolean
```

### 4. Search Components

#### SearchBar
```tsx
// components/search/SearchBar.tsx
- Service search
- Location search
- Autocomplete
- Recent searches

Props:
- onSearch: (query: SearchQuery) => void
- placeholder?: string
- initialValue?: string
- suggestions?: string[]
```

#### SearchResults
```tsx
// components/search/SearchResults.tsx
- Filtered results
- Sort options
- Filter sidebar
- Result cards

Props:
- results: SearchResult[]
- filters: FilterOptions
- onFilterChange: (filters: FilterOptions) => void
```

### 5. Content Components

#### FAQAccordion
```tsx
// components/content/FAQAccordion.tsx
- Question/answer pairs
- Schema markup
- Expandable sections
- Search/filter

Props:
- faqs: FAQ[]
- schema?: boolean
- searchable?: boolean
```

#### VideoGallery
```tsx
// components/content/VideoGallery.tsx
- YouTube embeds
- Video thumbnails
- Lazy loading
- Lightbox viewer

Props:
- videos: Video[]
- autoplay?: boolean
- showThumbnails?: boolean
```

#### TestimonialCarousel
```tsx
// components/content/TestimonialCarousel.tsx
- Customer reviews
- Rating display
- Auto-rotation
- Navigation controls

Props:
- testimonials: Testimonial[]
- autoRotate?: boolean
- interval?: number
```

### 6. Interactive Components

#### ServiceAreaMap
```tsx
// components/interactive/ServiceAreaMap.tsx
- Coverage area display
- Interactive markers
- Location search
- Zoom controls

Props:
- center: Coordinates
- markers: MapMarker[]
- zoom?: number
- interactive?: boolean
```

#### ContactForm
```tsx
// components/interactive/ContactForm.tsx
- Service selection
- Location input
- Contact details
- Validation

Props:
- services: Service[]
- initialService?: string
- onSubmit: (data: ContactFormData) => void
```

## Utility Components

### 1. Loading States
```tsx
// components/ui/loading/
- Skeleton loaders
- Spinners
- Progress bars
- Loading overlays
```

### 2. Error Boundaries
```tsx
// components/ui/errors/
- Error messages
- Fallback UI
- Retry mechanisms
- Error reporting
```

### 3. Common UI Elements
```tsx
// components/ui/common/
- Buttons
- Input fields
- Select dropdowns
- Modal dialogs
```

## Page Templates

### 1. Homepage Template
```tsx
// components/templates/HomePage.tsx
- Hero section
- Featured services
- City selection
- Video gallery
- FAQ section
```

### 2. Service Category Template
```tsx
// components/templates/ServicePage.tsx
- Service details
- Pricing
- City availability
- Related services
```

### 3. City Service Template
```tsx
// components/templates/CityServicePage.tsx
- Local service info
- Coverage map
- Local testimonials
- Contact form
```

## Component Guidelines

### 1. Design Principles
- Modern, clean aesthetics
- Mobile-first approach
- Consistent spacing
- Clear hierarchy
- Accessible colors

### 2. Performance
- Lazy loading
- Code splitting
- Image optimization
- Component memoization

### 3. Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast

### 4. State Management
- React hooks
- Context API
- Props drilling avoidance
- State isolation

## Notes
- Use TypeScript for all components
- Follow ShadCN component patterns
- Maintain consistent prop naming
- Document all props and types
- Include usage examples
