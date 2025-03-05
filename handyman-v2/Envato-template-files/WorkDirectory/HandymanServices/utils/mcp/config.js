/**
 * MCP Server Configuration
 * 
 * This file contains configuration for the MCP servers used in the application.
 */

// MCP Server Base URL - using http instead of mcp protocol
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
  
  // OpenAI MCP
  OPENAI_CHAT: `${MCP_SERVER_BASE_URL}/mcp1_openai_chat`
};

/**
 * Get MCP request options
 * 
 * @param {Object} body Request body
 * @returns {Object} Request options
 */
export function getMcpRequestOptions(body) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

/**
 * Handle MCP error
 * 
 * @param {Error} error Error object
 * @returns {Error} Processed error
 */
export function handleMcpError(error) {
  console.error('MCP request error:', error);
  
  if (error.response) {
    return new Error(`MCP server error: ${error.response.status} ${error.response.statusText}`);
  }
  
  return error;
}
