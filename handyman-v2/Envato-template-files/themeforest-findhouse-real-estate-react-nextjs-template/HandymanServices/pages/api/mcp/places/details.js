/**
 * Place Details MCP API Route
 * 
 * This endpoint provides a proxy to the Google Place Details MCP endpoint.
 * It allows retrieving details for a specific place using the Google Places API via MCP.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../../utils/mcp/config';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the place_id from the request body
    const { place_id } = req.body;

    // Validate the place_id
    if (!place_id || typeof place_id !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Place ID is required'
      });
    }

    // Forward the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.MAPS_PLACE_DETAILS, getMcpRequestOptions({ place_id }));

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
    console.error('Error in Place Details MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
