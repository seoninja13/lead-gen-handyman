/**
 * OpenAI MCP API
 * 
 * This API endpoint handles requests to the OpenAI MCP server.
 * It forwards the request to the OpenAI MCP server and returns the response.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../../utils/mcp/config';

/**
 * OpenAI MCP API handler
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
    const { messages, model = 'gpt-4o-mini' } = req.body;

    // Validate the request body
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request body. Messages array is required.' });
    }

    // Prepare the request parameters
    const params = {
      messages,
      model
    };

    // Make the request to the MCP server
    const mcpResponse = await fetch(MCP_ENDPOINTS.OPENAI_CHAT, getMcpRequestOptions(params));
    
    // Check if the response is OK
    if (!mcpResponse.ok) {
      const errorData = await mcpResponse.json();
      console.error('OpenAI MCP error:', errorData);
      return res.status(mcpResponse.status).json({ 
        error: 'Error from OpenAI MCP server', 
        details: errorData 
      });
    }

    // Return the response data
    const responseData = await mcpResponse.json();
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error in OpenAI MCP API:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
