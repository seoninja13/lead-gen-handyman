# MCP Integration Documentation

## Overview

This document provides a comprehensive overview of the Model Context Protocol (MCP) integration in the Handyman Lead Generation project. The MCP integration enables direct access to external services like Google Maps API and Supabase database through a standardized protocol.

## Components

### 1. MCP Configuration (`mcp-config.ts`)

The central configuration file for all MCP-related settings:

- Defines all MCP endpoints for Google Maps and Supabase
- Provides standardized request options with authentication
- Implements consistent error handling
- Centralizes configuration for easier maintenance

```typescript
// Example usage
import { MCP_ENDPOINTS, getMcpRequestOptions } from '../config/mcp-config';

const response = await fetch(MCP_ENDPOINTS.MAPS_SEARCH_PLACES, 
  getMcpRequestOptions({ query: 'handyman services' }));
```

### 2. Supabase MCP Client (`mcp-client.ts`)

A comprehensive client for interacting with Supabase through MCP:

- Provides functions for executing SQL queries
- Implements CRUD operations for places and service areas
- Handles data transformation between API and database formats
- Includes robust error handling and input validation

```typescript
// Example usage
import { executeQuery, getPlaceById, savePlace } from '../utils/supabase/mcp-client';

// Execute a custom query
const results = await executeQuery('SELECT * FROM places LIMIT 10');

// Get a place by ID
const place = await getPlaceById('ChIJN1t_tDeuEmsRUsoyG83frY4');

// Save a place
await savePlace(placeData);
```

### 3. MCP Helpers (`mcp-helpers.ts`)

Utility functions for working with MCP servers:

- Provides direct access to MCP endpoints
- Implements type-safe function calls
- Handles response processing and error handling
- Simplifies integration with MCP servers

```typescript
// Example usage
import { executeMcpQuery, executeMapsRequest } from '../utils/mcp-helpers';

// Execute a SQL query directly
const results = await executeMcpQuery('SELECT NOW()');

// Search for places
const places = await executeMapsRequest('MAPS_SEARCH_PLACES', { 
  query: 'handyman services', 
  radius: 50000 
});
```

### 4. Authentication (`mcp-auth.ts`)

Security utilities for MCP server access:

- Implements API key validation
- Provides JWT token generation and validation
- Includes middleware for securing API routes
- Supports role-based access control

```typescript
// Example usage
import { authenticateMcpRequest, generateToken } from '../utils/mcp-auth';

// Generate a token for a user
const token = generateToken(userId, 'user');

// Use middleware to authenticate requests
export default function handler(req, res) {
  // Authenticate the request
  if (!authenticateMcpRequest(req, res)) {
    return;
  }
  
  // Process the authenticated request
  // ...
}
```

## Testing

Two test scripts are provided to verify the MCP integration:

1. **`test-mcp-integration.js`**: Tests the basic functionality of the MCP integration, including:
   - Connection to the Supabase MCP server
   - Integration with the Google Maps MCP server
   - Saving places to the database using MCP

2. **`test-mcp-auth.js`**: Tests the authentication functionality, including:
   - API key validation
   - JWT token authentication
   - Direct MCP server authentication

## Usage Examples

### Searching for Places

```typescript
import { executeMapsRequest } from '../utils/mcp-helpers';

async function searchPlaces(query, radius = 50000) {
  try {
    const result = await executeMapsRequest('MAPS_SEARCH_PLACES', { 
      query, 
      radius 
    });
    
    return result.results || [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}
```

### Saving a Place to the Database

```typescript
import { savePlace } from '../utils/supabase/mcp-client';

async function savePlaceToDatabase(placeData) {
  try {
    const success = await savePlace(placeData);
    
    if (success) {
      console.log(`Successfully saved place: ${placeData.name}`);
    } else {
      console.error('Failed to save place');
    }
    
    return success;
  } catch (error) {
    console.error('Error saving place:', error);
    return false;
  }
}
```

### Managing Service Areas

```typescript
import { saveServiceArea, getServiceAreas, deleteServiceArea } from '../utils/supabase/mcp-client';

// Save a service area
await saveServiceArea({
  provider_id: 'provider-123',
  name: 'Sacramento',
  address: 'Sacramento, CA',
  latitude: 38.5816,
  longitude: -121.4944,
  radius_miles: 25
});

// Get service areas for a provider
const serviceAreas = await getServiceAreas('provider-123');

// Delete a service area
await deleteServiceArea('area-456');
```

## Security Considerations

1. **API Key Authentication**: All MCP requests require a valid API key.
2. **JWT Authentication**: For user-specific operations, JWT tokens are used.
3. **SQL Injection Prevention**: All SQL queries are properly sanitized.
4. **Production Safeguards**: Dangerous operations are prevented in production.

## Next Steps

1. **Integration with Main Application**: Fully integrate MCP-based components into the main application.
2. **Performance Monitoring**: Add logging and metrics for MCP server requests.
3. **Security Enhancements**: Implement role-based access control and audit logging.
4. **User Interface**: Create admin interfaces for managing MCP-related settings.

## Conclusion

The MCP integration provides a powerful and flexible way to interact with external services and databases. By centralizing configuration and standardizing request handling, we ensure a more maintainable and secure codebase.
