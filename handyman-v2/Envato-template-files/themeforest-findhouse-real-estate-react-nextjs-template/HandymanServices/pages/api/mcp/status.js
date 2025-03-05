/**
 * MCP Status API Route
 * 
 * This endpoint checks the status of the MCP server.
 * It attempts to connect to the MCP server and returns its status.
 */

import { MCP_SERVER_BASE_URL } from '../../../utils/mcp/config';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Attempt to connect to the MCP server
    const mcpResponse = await fetch(`${MCP_SERVER_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Set a timeout to avoid hanging if the server is down
      signal: AbortSignal.timeout(5000),
    }).catch(error => {
      // Handle network errors
      console.error('Error connecting to MCP server:', error);
      return null;
    });

    // Check if the response is valid
    if (mcpResponse && mcpResponse.ok) {
      const data = await mcpResponse.json();
      return res.status(200).json({
        status: 'online',
        message: 'MCP server is online',
        serverResponse: data,
        timestamp: new Date().toISOString()
      });
    } else {
      // Server is not responding properly
      return res.status(200).json({
        status: 'offline',
        message: 'MCP server is offline or not responding',
        error: mcpResponse ? mcpResponse.statusText : 'Connection failed',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    // Handle any other errors
    console.error('Error checking MCP server status:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error checking MCP server status',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
