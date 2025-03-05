# MCP Servers Documentation

## Overview

This document provides detailed information about the Model Context Protocol (MCP) servers used in the Handyman Lead Generation project. MCP servers enable our application to interact with external services like Google Maps API, OpenAI, and Supabase through a standardized protocol.

## MCP Server Types

### 1. Google Maps MCP Server

The Google Maps MCP server provides access to various Google Maps API services:

- **Server Package**: `@modelcontextprotocol/server-google-maps`
- **Configuration Location**: `C:\Users\JR\.codeium\windsurf\mcp_config.json`
- **API Key**: Stored in the MCP configuration
- **Available Endpoints**:
  - `/mcp0_maps_search_places`: Search for places using Google Places API
  - `/mcp0_maps_place_details`: Get place details using Google Places API
  - `/mcp0_maps_geocode`: Convert an address into geographic coordinates
  - `/mcp0_maps_reverse_geocode`: Convert coordinates into an address
  - `/mcp0_maps_directions`: Get directions between two points
  - `/mcp0_maps_distance_matrix`: Calculate travel distance and time for multiple origins and destinations
  - `/mcp0_maps_elevation`: Get elevation data for locations on the earth

### 2. Supabase MCP Server

The Supabase MCP server provides access to our PostgreSQL database:

- **Server Package**: `@modelcontextprotocol/server-postgres`
- **Configuration Location**: `C:\Users\JR\.codeium\windsurf\mcp_config.json`
- **Connection String**: Stored in the MCP configuration
- **Available Endpoints**:
  - `/mcp2_query`: Run a read-only SQL query

### 3. OpenAI MCP Server

The OpenAI MCP server provides access to OpenAI's models:

- **Server Package**: `@mzxrai/mcp-openai`
- **Configuration Location**: `C:\Users\JR\.codeium\windsurf\mcp_config.json`
- **API Key**: Stored in the MCP configuration
- **Available Endpoints**:
  - `/mcp1_openai_chat`: Send messages to OpenAI's chat completion API

## MCP Server Configuration

The MCP servers are configured in the Windsurf MCP configuration file located at `C:\Users\JR\.codeium\windsurf\mcp_config.json`. This file contains the configuration for all MCP servers used in the project:

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
        "GOOGLE_MAPS_API_KEY": "AIzaSyBeyHFbgaEtNd6n0OSNfvsOR9rq9ugZDHs"
      }
    },
    "mcp-openai": {
      "command": "npx",
      "args": ["-y", "@mzxrai/mcp-openai@latest"],
      "env": {
        "OPENAI_API_KEY": "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"
      }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres.nshlrphkirhzchuodpeo:[agavj^5436rxz32Qa108*B]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"]
    }
  }
}
```

## Application Integration

Our application is configured to connect to the MCP servers through the `utils/mcp/config.js` file:

```javascript
// MCP Server Base URL
export const MCP_SERVER_BASE_URL = process.env.MCP_SERVER_BASE_URL || 'http://localhost:8888';

// MCP Server Endpoints
export const MCP_ENDPOINTS = {
  // Supabase MCP
  SUPABASE_QUERY: `${MCP_SERVER_BASE_URL}/mcp2_query`,
  
  // Google Maps MCP
  MAPS_SEARCH_PLACES: `${MCP_SERVER_BASE_URL}/mcp0_maps_search_places`,
  MAPS_PLACE_DETAILS: `${MCP_SERVER_BASE_URL}/mcp0_maps_place_details`,
  MAPS_GEOCODE: `${MCP_SERVER_BASE_URL}/mcp0_maps_geocode`,
  MAPS_REVERSE_GEOCODE: `${MCP_SERVER_BASE_URL}/mcp0_maps_reverse_geocode`,
  MAPS_DIRECTIONS: `${MCP_SERVER_BASE_URL}/mcp0_maps_directions`,
  MAPS_DISTANCE_MATRIX: `${MCP_SERVER_BASE_URL}/mcp0_maps_distance_matrix`,
  MAPS_ELEVATION: `${MCP_SERVER_BASE_URL}/mcp0_maps_elevation`,
};
```

## Testing MCP Servers

You can test the MCP server connection by visiting the `/test/mcp` page in your browser or by using the API endpoint:

```
GET /api/mcp/status
```

This endpoint will return the status of the MCP server:

```json
{
  "status": "online",
  "message": "MCP server is online",
  "serverResponse": { ... },
  "timestamp": "2025-03-05T20:38:01.000Z"
}
```

## Troubleshooting

If you encounter issues with the MCP servers, try the following:

1. **Check MCP Server Status**: Visit `/test/mcp` in your browser to check the status of the MCP servers.
2. **Verify Configuration**: Ensure that the MCP server configuration in `mcp_config.json` is correct.
3. **Check API Keys**: Verify that the API keys for Google Maps and OpenAI are valid.
4. **Check Connection String**: Verify that the Supabase connection string is valid.
5. **Restart MCP Servers**: Restart the MCP servers by restarting Windsurf.

## Related Documentation

For more information about the MCP integration, refer to the following documents:

- [MCP Integration Documentation](./mcp-integration.md): Comprehensive overview of the MCP integration in the project.
- [Supabase MCP Documentation](https://supabase.com/docs/guides/getting-started/mcp): Official Supabase MCP documentation.
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction): Official MCP documentation.
