# Edge Case Handling

## Multi-Location Businesses
- Use canonical URLs pointing to headquarters
- Example: `/services/plumbing/sacramento/company#san-francisco`

## Discontinued Services
- 301 redirect to related service category
- Maintain link equity through redirects

## Home Page Image Handling
- SVG placeholders used for missing images
- Fallback system for image loading failures
- Image paths in data files use consistent format (e.g., `/assets/images/service/electrical.svg`)

## Supabase Table Name Handling
- Special handling for tables with hyphens in their names (e.g., 'test-delete')
- When using Supabase client, reference as 'test_delete' (with underscore)
- When writing SQL queries directly, use 'test-delete' (with hyphen)
- Multiple fallback mechanisms implemented:
  - Direct SQL execution via RPC functions
  - REST API fallback for hyphenated table names
  - Automatic hyphen-to-underscore conversion

## Mobile Responsiveness
- Bootstrap breakpoints used for responsive design
- Custom media queries in responsive.css
- Mobile-specific component adjustments (e.g., collapsible menu, stacked grid items)

## Browser Compatibility
- Tested on modern browsers (Chrome, Firefox, Safari)
- Polyfills for older browsers
- Graceful degradation for unsupported features
