/**
 * MCP Server Configuration
 * 
 * This file contains configuration for the MCP servers used in the application.
 */

// MCP Server Base URL
export const MCP_SERVER_BASE_URL = process.env.MCP_SERVER_BASE_URL || 'http://localhost:3001';

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

// MCP Request Headers
export function getMcpHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add API key if available
  if (process.env.MCP_API_KEY) {
    headers['x-api-key'] = process.env.MCP_API_KEY;
  }
  
  return headers;
}

// MCP Request Options
export function getMcpRequestOptions(body) {
  return {
    method: 'POST',
    headers: getMcpHeaders(),
    body: JSON.stringify(body),
  };
}

// MCP Error Handling
export function handleMcpError(error) {
  console.error('MCP request error:', error);
  
  if (error instanceof Response) {
    return new Error(`MCP server error: ${error.status} ${error.statusText}`);
  }
  
  return error instanceof Error ? error : new Error(String(error));
}
