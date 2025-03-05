/**
 * MCP API Route
 * 
 * This is the main entry point for MCP API routes.
 * It provides information about available MCP endpoints.
 */

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return information about available MCP endpoints
  res.status(200).json({
    message: 'Handyman Services MCP API',
    endpoints: [
      {
        path: '/api/mcp/status',
        description: 'Check MCP server status',
        method: 'GET'
      },
      {
        path: '/api/mcp/supabase',
        description: 'Execute Supabase queries via MCP',
        method: 'POST'
      },
      {
        path: '/api/mcp/places/search',
        description: 'Search for places using Google Places API',
        method: 'POST'
      },
      {
        path: '/api/mcp/places/details',
        description: 'Get place details using Google Places API',
        method: 'POST'
      },
      {
        path: '/api/mcp/maps/directions',
        description: 'Get directions using Google Maps API',
        method: 'POST'
      }
    ],
    version: '1.0.0'
  });
}
