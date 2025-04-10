/**
 * Google Maps MCP Server API Route
 *
 * This API route interacts with the Google Maps MCP server to perform various operations:
 * - Geocoding
 * - Place Search
 * - Directions
 *
 * Endpoint: /api/mcp/maps
 * Method: POST
 * Body: {
 *   operation: 'geocode' | 'search_places' | 'directions',
 *   address?: string (for geocode),
 *   query?: string (for search_places),
 *   origin?: string (for directions),
 *   destination?: string (for directions)
 * }
 */

// Helper function to make requests to the Google Maps MCP server
async function callGoogleMapsMCP(operation, params) {
  try {
    // Determine the appropriate MCP tool based on the operation
    let mcpTool = '';
    let mcpParams = {};

    switch (operation) {
      case 'geocode':
        mcpTool = 'mcp0_maps_geocode';
        mcpParams = { address: params.address };
        break;
      case 'search_places':
        mcpTool = 'mcp0_maps_search_places';
        mcpParams = { query: params.query };
        if (params.location) {
          mcpParams.location = params.location;
        }
        if (params.radius) {
          mcpParams.radius = params.radius;
        }
        break;
      case 'directions':
        mcpTool = 'mcp0_maps_directions';
        mcpParams = {
          origin: params.origin,
          destination: params.destination,
          mode: params.mode || 'driving'
        };
        break;
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }

    // In a real implementation, this would use the MCP server SDK or API
    // For now, we'll make a direct HTTP request to the MCP server
    const response = await fetch(`http://localhost:8888/${mcpTool}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mcpParams)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to execute ${operation} operation`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling Google Maps MCP server (${operation}):`, error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { operation, ...params } = req.body;

    // Validate required parameters
    if (!operation) {
      return res.status(400).json({ error: 'Operation is required' });
    }

    // Validate operation-specific parameters
    switch (operation) {
      case 'geocode':
        if (!params.address) {
          return res.status(400).json({ error: 'Address is required for geocode operation' });
        }
        break;
      case 'search_places':
        if (!params.query) {
          return res.status(400).json({ error: 'Query is required for search_places operation' });
        }
        break;
      case 'directions':
        if (!params.origin || !params.destination) {
          return res.status(400).json({ error: 'Origin and destination are required for directions operation' });
        }
        break;
      default:
        return res.status(400).json({ error: `Unsupported operation: ${operation}` });
    }

    // Log the request for debugging
    console.log(`Executing Google Maps MCP ${operation} operation:`, params);

    try {
      // Call the Google Maps MCP server to execute the operation
      const result = await callGoogleMapsMCP(operation, params);

      // Return the result
      return res.status(200).json(result);
    } catch (operationError) {
      console.error(`Error executing ${operation} operation:`, operationError);
      return res.status(500).json({ 
        error: `Failed to execute ${operation} operation: ${operationError.message}`,
        details: operationError.stack
      });
    }
  } catch (error) {
    console.error('Error in Google Maps MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
