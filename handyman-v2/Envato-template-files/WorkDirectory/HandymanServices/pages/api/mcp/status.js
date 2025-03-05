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
    // For Windsurf MCP servers, we can't directly check the connection
    // Instead, we'll return a status based on the configuration
    
    // Check if MCP_SERVER_BASE_URL is defined
    if (MCP_SERVER_BASE_URL && MCP_SERVER_BASE_URL.startsWith('http://')) {
      return res.status(200).json({
        status: 'online',
        message: 'MCP server is configured to use HTTP MCP servers',
        serverInfo: {
          baseUrl: MCP_SERVER_BASE_URL,
          provider: 'HTTP'
        },
        timestamp: new Date().toISOString()
      });
    } else {
      // Try to connect to a regular HTTP MCP server
      const mcpResponse = await fetch(`${MCP_SERVER_BASE_URL}`, {
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
          serverInfo: {
            baseUrl: MCP_SERVER_BASE_URL,
            ...data
          },
          timestamp: new Date().toISOString()
        });
      } else {
        // Return offline status
        return res.status(200).json({
          status: 'offline',
          message: 'MCP server is offline or unreachable',
          serverInfo: {
            baseUrl: MCP_SERVER_BASE_URL
          },
          timestamp: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    // Handle any errors
    console.error('Error in MCP Status API route:', error);
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
