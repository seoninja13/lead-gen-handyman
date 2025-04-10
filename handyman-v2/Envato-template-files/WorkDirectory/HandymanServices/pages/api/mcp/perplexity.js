/**
 * Perplexity MCP Server API Route
 *
 * This API route interacts with the Perplexity MCP server to perform search operations
 * and content generation using the Perplexity AI models.
 *
 * Endpoint: /api/mcp/perplexity
 * Method: POST
 * Body: {
 *   operation: string ('search', 'generateContent', 'deepResearch')
 *   data: object (operation-specific data)
 * }
 */

// Helper function to make requests to the Perplexity MCP server
async function callPerplexityMCP(operation, data) {
  try {
    // Different endpoints based on operation
    let endpoint;
    let requestBody;
    
    switch (operation) {
      case 'search':
        // Use the MCP search endpoint
        endpoint = 'http://localhost:8888/mcp2_search';
        requestBody = {
          query: data.query,
          search_recency_filter: data.recency || undefined
        };
        break;
        
      case 'generateContent':
        // Use our local Perplexity server for content generation
        endpoint = 'http://localhost:3005/api/generate';
        requestBody = {
          modelId: data.model || 'perplexity-online-llama',
          params: {
            prompt: data.prompt
          }
        };
        break;
        
      case 'deepResearch':
        // Use our local Perplexity server for deep research
        endpoint = 'http://localhost:3005/api/generate';
        requestBody = {
          modelId: 'perplexity-deep-research',
          params: {
            topic: data.topic,
            depth: data.depth || 'standard'
          }
        };
        break;
        
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
    
    console.log(`Calling Perplexity MCP server at ${endpoint} with operation: ${operation}`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to execute ${operation} operation`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling Perplexity MCP server for ${operation}:`, error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { operation, data } = req.body;

    // Validate required parameters
    if (!operation) {
      return res.status(400).json({ error: 'Operation is required' });
    }
    
    if (!data) {
      return res.status(400).json({ error: 'Operation data is required' });
    }
    
    // Validate operation-specific parameters
    switch (operation) {
      case 'search':
        if (!data.query) {
          return res.status(400).json({ error: 'Search query is required' });
        }
        break;
        
      case 'generateContent':
        if (!data.prompt) {
          return res.status(400).json({ error: 'Content prompt is required' });
        }
        break;
        
      case 'deepResearch':
        if (!data.topic) {
          return res.status(400).json({ error: 'Research topic is required' });
        }
        break;
    }

    // Log the request for debugging
    console.log(`Executing ${operation} operation via Perplexity MCP server:`, data);

    try {
      // Call the Perplexity MCP server to execute the operation
      const result = await callPerplexityMCP(operation, data);

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
    console.error('Error in Perplexity MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
