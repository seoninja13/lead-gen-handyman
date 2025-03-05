/**
 * Supabase MCP API Route
 * 
 * This endpoint provides a proxy to the Supabase MCP server.
 * It allows executing SQL queries via the MCP server.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../utils/mcp/config';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the SQL query from the request body
    const { sql } = req.body;

    // Validate the SQL query
    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'SQL query is required'
      });
    }

    // Forward the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));

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
    console.error('Error in Supabase MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
