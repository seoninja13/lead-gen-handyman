# Google Maps MCP Server Guide

## Overview
The Google Maps MCP (Model Context Protocol) server provides location-based services to the Handyman Lead Generation application through the Google Maps Platform APIs. This integration enables powerful mapping, geocoding, directions, and places search capabilities throughout the application.

## Features
- **Geocoding**: Convert addresses to geographic coordinates
- **Reverse Geocoding**: Convert coordinates to addresses
- **Directions**: Get detailed directions between locations
- **Distance Matrix**: Calculate distances and travel times between multiple origins and destinations
- **Places Search**: Find businesses and points of interest
- **Place Details**: Get detailed information about specific places
- **Elevation**: Get elevation data for locations

## Configuration
The Google Maps MCP server is configured in the MCP configuration file (`mcp_config.json`):

```json
{
  "mcpServers": {
    "google-maps": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-google-maps"
      ],
      "env": {
        "GOOGLE_MAPS_API_KEY": "AIzaSyDkdyCVOTE2wGREO1wwh-MHQyzFLKtK00g"
      }
    }
  }
}
```

## API Key Setup
To use the Google Maps MCP server, you need a valid Google Maps API key with the following requirements:
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the necessary Google Maps APIs:
   - Geocoding API
   - Directions API
   - Places API
   - Distance Matrix API
   - Elevation API
3. Create an API key with appropriate restrictions
4. Enable billing for the project (required for API access)

## Available Functions

### Geocoding
Convert addresses to geographic coordinates.

```javascript
// Example usage
const result = await mcp0_maps_geocode({
  address: "1600 Amphitheatre Parkway, Mountain View, CA"
});

// Example response
{
  "location": {
    "lat": 37.422011,
    "lng": -122.0847491
  },
  "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  "place_id": "ChIJF4Yf2Ry7j4AR__1AkytDyAE"
}
```

### Reverse Geocoding
Convert coordinates to addresses.

```javascript
// Example usage
const result = await mcp0_maps_reverse_geocode({
  latitude: 37.422011,
  longitude: -122.0847491
});

// Example response
{
  "address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  "place_id": "ChIJF4Yf2Ry7j4AR__1AkytDyAE"
}
```

### Directions
Get detailed directions between locations.

```javascript
// Example usage
const result = await mcp0_maps_directions({
  origin: "1600 Amphitheatre Parkway, Mountain View, CA",
  destination: "Golden Gate Bridge, San Francisco, CA",
  mode: "driving" // Options: driving, walking, bicycling, transit
});

// Example response (truncated)
{
  "routes": [
    {
      "summary": "US-101 N",
      "distance": {
        "text": "39.4 mi",
        "value": 63349
      },
      "duration": {
        "text": "52 mins",
        "value": 3118
      },
      "steps": [
        // Detailed steps...
      ]
    }
  ]
}
```

### Distance Matrix
Calculate distances and travel times between multiple origins and destinations.

```javascript
// Example usage
const result = await mcp0_maps_distance_matrix({
  origins: ["1600 Amphitheatre Parkway, Mountain View, CA"],
  destinations: ["Golden Gate Bridge, San Francisco, CA", "Fisherman's Wharf, San Francisco, CA"],
  mode: "driving" // Options: driving, walking, bicycling, transit
});

// Example response
{
  "origin_addresses": ["1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"],
  "destination_addresses": [
    "Golden Gate Bridge, San Francisco, CA 94129, USA",
    "Fisherman's Wharf, San Francisco, CA, USA"
  ],
  "rows": [
    {
      "elements": [
        {
          "distance": {
            "text": "39.4 mi",
            "value": 63349
          },
          "duration": {
            "text": "52 mins",
            "value": 3118
          },
          "status": "OK"
        },
        {
          "distance": {
            "text": "38.8 mi",
            "value": 62451
          },
          "duration": {
            "text": "55 mins",
            "value": 3300
          },
          "status": "OK"
        }
      ]
    }
  ]
}
```

### Places Search
Find businesses and points of interest.

```javascript
// Example usage
const result = await mcp0_maps_search_places({
  query: "handyman services near Mountain View, CA",
  radius: 5000,
  location: {
    latitude: 37.422011,
    longitude: -122.0847491
  }
});

// Example response (truncated)
{
  "places": [
    {
      "name": "Genuine Handyman Services LLC",
      "formatted_address": "55 Fairchild Dr, Mountain View, CA 94043, United States",
      "location": {
        "lat": 37.4063521,
        "lng": -122.0637462
      },
      "place_id": "ChIJicY5hq8zDogRetgk-pgfuEU",
      "rating": 5,
      "types": [
        "general_contractor",
        "point_of_interest",
        "establishment"
      ]
    },
    // More places...
  ]
}
```

### Place Details
Get detailed information about a specific place.

```javascript
// Example usage
const result = await mcp0_maps_place_details({
  place_id: "ChIJicY5hq8zDogRetgk-pgfuEU"
});

// Example response
{
  "name": "Genuine Handyman Services LLC",
  "formatted_address": "55 Fairchild Dr, Mountain View, CA 94043, United States",
  "formatted_phone_number": "(650) 555-1234",
  "website": "https://example.com",
  "rating": 5,
  "reviews": [
    // Reviews...
  ],
  "opening_hours": {
    // Hours...
  }
}
```

### Elevation
Get elevation data for locations.

```javascript
// Example usage
const result = await mcp0_maps_elevation({
  locations: [
    {
      latitude: 37.422011,
      longitude: -122.0847491
    }
  ]
});

// Example response
{
  "results": [
    {
      "elevation": 12.34,
      "location": {
        "lat": 37.422011,
        "lng": -122.0847491
      },
      "resolution": 4.771975994110107
    }
  ]
}
```

## Integration Examples

### Service Area Mapping
Display a handyman's service area on a map:

```javascript
// Get the handyman's location
const geocodeResult = await mcp0_maps_geocode({
  address: handyman.address
});

// Define a radius around the location (e.g., 10 miles)
const serviceArea = {
  center: geocodeResult.location,
  radius: 10 * 1609.34 // Convert miles to meters
};

// Display on map
// (Frontend implementation with Google Maps JavaScript API)
```

### Distance-Based Service Provider Filtering
Filter service providers based on distance from a customer:

```javascript
// Get customer location
const customerLocation = await mcp0_maps_geocode({
  address: customerAddress
});

// Get distances to all service providers
const distanceMatrix = await mcp0_maps_distance_matrix({
  origins: [customerAddress],
  destinations: serviceProviders.map(provider => provider.address),
  mode: "driving"
});

// Filter providers within desired distance
const nearbyProviders = serviceProviders.filter((provider, index) => {
  const distance = distanceMatrix.rows[0].elements[index].distance.value;
  return distance <= maxDistanceMeters;
});
```

### Finding Nearby Handyman Services
Search for handyman services near a specific location:

```javascript
// Search for handyman services
const searchResult = await mcp0_maps_search_places({
  query: "handyman services",
  radius: 5000,
  location: {
    latitude: customerLocation.lat,
    longitude: customerLocation.lng
  }
});

// Display results
const handymanServices = searchResult.places.map(place => ({
  name: place.name,
  address: place.formatted_address,
  rating: place.rating,
  location: place.location
}));
```

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - **Error**: "API key not valid"
   - **Solution**: Verify the API key is correct in the MCP configuration

2. **Billing Issues**
   - **Error**: "You must enable Billing on the Google Cloud Project"
   - **Solution**: Enable billing for the project in the Google Cloud Console

3. **API Enablement Issues**
   - **Error**: "This API is not enabled for your project"
   - **Solution**: Enable the specific API in the Google Cloud Console

4. **Usage Limits**
   - **Error**: "You have exceeded your daily request quota"
   - **Solution**: Check usage in the Google Cloud Console and consider upgrading your plan

## Best Practices

1. **API Key Security**
   - Store API keys securely in environment variables
   - Apply appropriate restrictions to the API key (HTTP referrers, IP addresses)

2. **Error Handling**
   - Implement robust error handling for API requests
   - Provide user-friendly error messages

3. **Performance Optimization**
   - Cache geocoding results for frequently accessed addresses
   - Batch geocoding requests when possible using the Distance Matrix API

4. **User Experience**
   - Implement loading states during API requests
   - Provide visual feedback for location-based operations

## Conclusion
The Google Maps MCP server provides powerful location-based capabilities to the Handyman Lead Generation application. By leveraging these features, the application can offer enhanced user experiences with accurate location data, directions, and place information.
