/**
 * Maps Directions MCP API Route
 * 
 * This endpoint provides a proxy to the Google Maps Directions MCP endpoint.
 * It allows retrieving directions between two points using the Google Maps API via MCP.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../../utils/mcp/config';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract parameters from the request body
    const { origin, destination, mode } = req.body;

    // Validate the parameters
    if (!origin || typeof origin !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Origin is required'
      });
    }

    if (!destination || typeof destination !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Destination is required'
      });
    }

    // Prepare the request parameters
    const params = {
      origin,
      destination,
      mode: mode || 'driving'
    };

    // Forward the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.MAPS_DIRECTIONS, getMcpRequestOptions(params));

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
    console.error('Error in Maps Directions MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
