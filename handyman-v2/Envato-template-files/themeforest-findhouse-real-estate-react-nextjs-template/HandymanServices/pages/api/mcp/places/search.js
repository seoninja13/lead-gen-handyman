/**
 * Places Search MCP API Route
 * 
 * This endpoint provides a proxy to the Google Places Search MCP endpoint.
 * It allows searching for places using the Google Places API via MCP.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../../utils/mcp/config';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract parameters from the request body
    const { query, location, radius } = req.body;

    // Validate the query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Search query is required'
      });
    }

    // Prepare the request parameters
    const params = { query };

    // Add location if provided
    if (location && location.latitude && location.longitude) {
      params.location = {
        latitude: location.latitude,
        longitude: location.longitude
      };
      
      // Add radius if provided
      if (radius && typeof radius === 'number') {
        params.radius = radius;
      }
    }

    // Forward the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.MAPS_SEARCH_PLACES, getMcpRequestOptions(params));

    // Check if the response is valid
    if (!mcpResponse.ok) {
      const errorText = await mcpResponse.text();
      return res.status(mcpResponse.status).json({
        error: 'MCP server error',
        message: errorText || mcpResponse.statusText
      });
    }

    // Return the response from the MCP server
    const data = await mcpResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    // Handle any errors
    console.error('Error in Places Search MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
