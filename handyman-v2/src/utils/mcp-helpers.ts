/**
 * MCP Helpers
 * 
 * This module provides utility functions for interacting with
 * Model Context Protocol (MCP) servers.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from '../config/mcp-config';

/**
 * Execute a SQL query using the Supabase MCP server directly
 * 
 * This function is intended for use in server-side code or
 * in development environments where the MCP server is running locally.
 * 
 * @param sql The SQL query to execute
 * @returns Promise resolving to the query results
 */
export async function executeMcpQuery(sql: string): Promise<any> {
  try {
    // Call the MCP server directly using the configured endpoint
    const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));

    if (!response.ok) {
      throw new Error(`Error executing query: ${response.statusText}`);
    }

    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    console.error('Error in executeMcpQuery:', error);
    throw handleMcpError(error);
  }
}

/**
 * Execute a Google Maps API request using the MCP server
 * 
 * @param method The MCP method key from MCP_ENDPOINTS
 * @param params The parameters for the method
 * @returns Promise resolving to the API response
 */
export async function executeMapsRequest(method: keyof typeof MCP_ENDPOINTS, params: any): Promise<any> {
  try {
    // Call the MCP server using the configured endpoint
    const endpoint = MCP_ENDPOINTS[method];
    
    if (!endpoint) {
      throw new Error(`Unknown MCP endpoint: ${method}`);
    }
    
    const response = await fetch(endpoint, getMcpRequestOptions(params));

    if (!response.ok) {
      throw new Error(`Error executing Maps request: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in executeMapsRequest (${method}):`, error);
    throw handleMcpError(error);
  }
}
