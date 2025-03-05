# MCP Integration for HandymanServices

This directory contains the Model Context Protocol (MCP) integration for the HandymanServices application. MCP is a protocol for interacting with external services like Google Maps API and Supabase through a secure server.

## Directory Structure

- `config.js`: Configuration for MCP server endpoints and request helpers
- `helpers.js`: Utility functions for interacting with MCP servers
- `google-places-client.js`: Client for interacting with Google Places API via MCP

## API Routes

The MCP API routes are located in `/pages/api/mcp/`:

- `/api/mcp/status`: Check MCP server status
- `/api/mcp/supabase`: Execute Supabase queries via MCP
- `/api/mcp/places/search`: Search for places using Google Places API
- `/api/mcp/places/details`: Get place details using Google Places API
- `/api/mcp/maps/directions`: Get directions using Google Maps API

## Components

MCP-specific components are located in `/components/mcp/`:

- `PlacesSearchMcp.jsx`: A reusable component for searching places using Google Places API
- `McpStatusTest.jsx`: A component for testing MCP server connection

## Testing

You can test the MCP integration by visiting `/test/mcp` in your browser. This page includes:

- MCP server status check
- Supabase query test
- Google Places search test

## MCP Servers

This project uses the following MCP servers:

1. **Google Maps MCP Server**: For accessing Google Maps API services
2. **Supabase MCP Server**: For accessing our PostgreSQL database
3. **OpenAI MCP Server**: For accessing OpenAI's models

For detailed information about the MCP servers, refer to the [MCP Servers Documentation](../../documentation/mcp-servers.md).

## Environment Variables

The following environment variables are used for MCP integration:

```
MCP_SERVER_BASE_URL=http://localhost:8888
```

The MCP servers are configured in the Windsurf MCP configuration file located at `C:\Users\JR\.codeium\windsurf\mcp_config.json`.

## Usage Examples

### Google Places Search

```javascript
import { searchPlaces } from '../../utils/mcp/google-places-client';

// Search for places
const results = await searchPlaces('handyman services', {
  latitude: 37.7749,
  longitude: -122.4194
}, 50000);
```

### Supabase Query

```javascript
import { executeQuery } from '../../utils/supabase/mcp-client';

// Execute a SQL query
const results = await executeQuery('SELECT * FROM places LIMIT 10');
```

### MCP Status Check

```javascript
// Check MCP server status
const response = await fetch('/api/mcp/status');
const data = await response.json();
console.log('MCP server status:', data.status);
