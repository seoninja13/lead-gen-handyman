# API Endpoint Documentation Template

Use this template when documenting API endpoints in the project.

## Endpoint Name

[Brief description of the endpoint's purpose and functionality]

## URL

```
/api/path/to/endpoint
```

## Method

`GET` | `POST` | `PUT` | `DELETE`

## URL Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `param1` | Yes | Description of param1 |
| `param2` | No | Description of param2 |

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `query1` | Yes | - | Description of query1 |
| `query2` | No | `default` | Description of query2 |
| `limit` | No | `10` | Number of results to return |
| `offset` | No | `0` | Number of results to skip |

## Request Body

```json
{
  "field1": "string",
  "field2": 123,
  "field3": {
    "nestedField": "value"
  },
  "field4": [1, 2, 3]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `field1` | `string` | Yes | Description of field1 |
| `field2` | `number` | Yes | Description of field2 |
| `field3.nestedField` | `string` | No | Description of nestedField |
| `field4` | `number[]` | No | Array of numbers |

## Success Response

**Code:** 200 OK

**Content:**

```json
{
  "id": "uuid",
  "field1": "string",
  "field2": 123,
  "createdAt": "2025-04-11T12:00:00Z",
  "updatedAt": "2025-04-11T12:00:00Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `field1` | `string` | Description of field1 |
| `field2` | `number` | Description of field2 |
| `createdAt` | `string` | ISO timestamp of creation |
| `updatedAt` | `string` | ISO timestamp of last update |

## Error Responses

**Code:** 400 BAD REQUEST

**Content:**

```json
{
  "error": "Invalid request",
  "message": "field1 is required"
}
```

**Code:** 401 UNAUTHORIZED

**Content:**

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

**Code:** 404 NOT FOUND

**Content:**

```json
{
  "error": "Not found",
  "message": "Resource with id 'uuid' not found"
}
```

**Code:** 500 INTERNAL SERVER ERROR

**Content:**

```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Implementation Details

### File Location

```
pages/api/path/to/endpoint.js
```

### Database Queries

```sql
-- Example SQL query used by this endpoint
SELECT * FROM "table_name" WHERE field1 = $1 AND field2 = $2;
```

### Authentication

[Describe authentication requirements for this endpoint]

- Requires valid JWT token
- Requires user to have 'admin' role
- No authentication required

### Rate Limiting

[Describe any rate limiting applied to this endpoint]

- Limited to 100 requests per minute per IP
- Limited to 1000 requests per day per user

## Usage Example

### cURL

```bash
curl -X POST \
  https://yourdomain.com/api/path/to/endpoint \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{
    "field1": "example",
    "field2": 123
  }'
```

### JavaScript Fetch

```javascript
fetch('/api/path/to/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    field1: 'example',
    field2: 123
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### React Hook

```javascript
import { useEffect, useState } from 'react';

function useEndpoint(param1, param2) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/path/to/endpoint?param1=${param1}&param2=${param2}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param1, param2]);

  return { data, loading, error };
}
```

## Notes

[Any additional notes, caveats, or important information about the endpoint]

---

## Example Documentation

### Get Service Providers

Retrieves a list of service providers based on location and service type.

## URL

```
/api/providers
```

## Method

`GET`

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `location` | Yes | - | City or zip code to search in |
| `serviceType` | No | - | Type of service to filter by |
| `radius` | No | `10` | Search radius in miles |
| `limit` | No | `20` | Number of results to return |
| `offset` | No | `0` | Number of results to skip |
| `sort` | No | `rating` | Sort by: `rating`, `distance`, or `price` |

## Success Response

**Code:** 200 OK

**Content:**

```json
{
  "providers": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "businessName": "ABC Plumbing",
      "description": "Professional plumbing services",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "phone": "555-123-4567",
      "email": "contact@abcplumbing.com",
      "website": "https://abcplumbing.com",
      "rating": 4.8,
      "reviewCount": 24,
      "services": ["Plumbing", "Water Heater Installation"],
      "distance": 2.4
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174000",
      "businessName": "XYZ Plumbing",
      "description": "Residential and commercial plumbing",
      "address": "456 Oak St",
      "city": "New York",
      "state": "NY",
      "zip": "10002",
      "phone": "555-987-6543",
      "email": "info@xyzplumbing.com",
      "website": "https://xyzplumbing.com",
      "rating": 4.5,
      "reviewCount": 18,
      "services": ["Plumbing", "Drain Cleaning"],
      "distance": 3.1
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

| Field | Type | Description |
|-------|------|-------------|
| `providers` | `array` | List of provider objects |
| `providers[].id` | `string` | Unique identifier for the provider |
| `providers[].businessName` | `string` | Name of the business |
| `providers[].description` | `string` | Business description |
| `providers[].address` | `string` | Street address |
| `providers[].city` | `string` | City |
| `providers[].state` | `string` | State code |
| `providers[].zip` | `string` | ZIP code |
| `providers[].phone` | `string` | Contact phone number |
| `providers[].email` | `string` | Contact email address |
| `providers[].website` | `string` | Business website URL |
| `providers[].rating` | `number` | Average rating (0-5) |
| `providers[].reviewCount` | `number` | Number of reviews |
| `providers[].services` | `string[]` | List of services offered |
| `providers[].distance` | `number` | Distance in miles from search location |
| `total` | `number` | Total number of matching providers |
| `limit` | `number` | Number of results returned |
| `offset` | `number` | Number of results skipped |

## Error Responses

**Code:** 400 BAD REQUEST

**Content:**

```json
{
  "error": "Invalid request",
  "message": "location parameter is required"
}
```

**Code:** 500 INTERNAL SERVER ERROR

**Content:**

```json
{
  "error": "Internal server error",
  "message": "Error connecting to database"
}
```

## Implementation Details

### File Location

```
pages/api/providers.js
```

### Database Queries

```sql
-- Main query to get providers
SELECT 
  p.id, p.business_name, p.description, p.address, p.city, p.state, p.zip,
  p.phone, p.email, p.website, 
  COALESCE(AVG(r.rating), 0) as rating,
  COUNT(r.id) as review_count,
  ARRAY_AGG(DISTINCT s.name) as services,
  -- Calculate distance using PostGIS
  ST_Distance(
    ST_SetSRID(ST_MakePoint(p.longitude, p.latitude), 4326),
    ST_SetSRID(ST_MakePoint($1, $2), 4326)
  ) * 0.000621371 as distance -- Convert meters to miles
FROM 
  providers p
LEFT JOIN 
  reviews r ON p.id = r.provider_id
LEFT JOIN 
  provider_services ps ON p.id = ps.provider_id
LEFT JOIN 
  services s ON ps.service_id = s.id
WHERE 
  -- Filter by distance
  ST_DWithin(
    ST_SetSRID(ST_MakePoint(p.longitude, p.latitude), 4326),
    ST_SetSRID(ST_MakePoint($1, $2), 4326),
    $3 * 1609.34 -- Convert miles to meters
  )
  -- Filter by service type if provided
  AND ($4::text IS NULL OR s.name = $4)
GROUP BY 
  p.id
ORDER BY 
  CASE WHEN $5 = 'rating' THEN COALESCE(AVG(r.rating), 0) END DESC,
  CASE WHEN $5 = 'distance' THEN distance END ASC,
  CASE WHEN $5 = 'price' THEN p.avg_price END ASC
LIMIT $6
OFFSET $7;
```

### Authentication

- No authentication required for this endpoint
- Rate limited to prevent abuse

### Rate Limiting

- Limited to 100 requests per minute per IP
- Cached responses for 5 minutes to improve performance

## Usage Example

### JavaScript Fetch

```javascript
// Get plumbers in New York within 5 miles
fetch('/api/providers?location=New York&serviceType=Plumbing&radius=5')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.total} providers`);
    data.providers.forEach(provider => {
      console.log(`${provider.businessName} - ${provider.rating} stars (${provider.distance.toFixed(1)} miles away)`);
    });
  })
  .catch(error => console.error('Error:', error));
```

### React Hook

```javascript
import { useEffect, useState } from 'react';

function useProviders(location, serviceType, radius = 10, sort = 'rating') {
  const [providers, setProviders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;
    
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          location,
          ...(serviceType && { serviceType }),
          radius,
          sort
        });
        
        const response = await fetch(`/api/providers?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const data = await response.json();
        setProviders(data.providers);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProviders([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [location, serviceType, radius, sort]);

  return { providers, total, loading, error };
}
```

## Notes

- The distance calculation requires valid latitude and longitude coordinates
- For performance reasons, consider using a geospatial index on the providers table
- Response is cached for 5 minutes to reduce database load
- For large result sets, use pagination with the limit and offset parameters
