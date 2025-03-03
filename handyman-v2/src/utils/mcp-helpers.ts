/**
 * MCP Helpers
 * 
 * This module provides utility functions for interacting with
 * Model Context Protocol (MCP) servers.
 */

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
    // Call the MCP server directly
    // Note: This assumes the MCP server is running on port 3001
    const response = await fetch('http://localhost:3001/mcp2_query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
      throw new Error(`Error executing query: ${response.statusText}`);
    }

    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    console.error('Error in executeMcpQuery:', error);
    throw error;
  }
}

/**
 * Execute a Google Maps API request using the MCP server
 * 
 * @param method The MCP method to call (e.g., 'mcp0_maps_search_places')
 * @param params The parameters for the method
 * @returns Promise resolving to the API response
 */
export async function executeMapsRequest(method: string, params: any): Promise<any> {
  try {
    // Call the MCP server directly
    // Note: This assumes the MCP server is running on port 3001
    const response = await fetch(`http://localhost:3001/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Error executing Maps request: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in executeMapsRequest (${method}):`, error);
    throw error;
  }
}
