/**
 * Google Maps Geocoding MCP API
 * 
 * This API endpoint handles geocoding requests to the Google Maps MCP server.
 * It forwards the request to the Google Maps MCP server and returns the response.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../../utils/mcp/config';

/**
 * Google Maps Geocoding MCP API handler
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the request body
    const { address } = req.body;

    // Validate the request body
    if (!address) {
      return res.status(400).json({ error: 'Invalid request body. Address is required.' });
    }

    // Prepare the request parameters
    const params = {
      address
    };

    // Make the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.MAPS_GEOCODE, getMcpRequestOptions(params));
    
    // Check if the response is OK
    if (!mcpResponse.ok) {
      const errorData = await mcpResponse.json();
      console.error('Google Maps Geocoding MCP error:', errorData);
      return res.status(mcpResponse.status).json({ 
        error: 'Error from Google Maps Geocoding MCP server', 
        details: errorData 
      });
    }
    
    // Parse the response
    const data = await mcpResponse.json();
    
    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in Google Maps Geocoding MCP API:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
