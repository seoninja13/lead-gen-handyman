/**
 * Supabase MCP Server API Route
 *
 * This API route interacts with the Supabase MCP server to execute SQL queries.
 * It uses the mcp3_execute_postgresql tool from the Supabase MCP server.
 *
 * Endpoint: /api/mcp/supabase
 * Method: POST
 * Body: {
 *   query: string (SQL query to execute)
 * }
 */

// Helper function to make requests to the Supabase MCP server
async function callSupabaseMCP(query) {
  try {
    // In a real implementation, this would use the MCP server SDK or API
    // For now, we'll make a direct HTTP request to the MCP server
    const response = await fetch('http://localhost:8888/mcp3_execute_postgresql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to execute SQL query');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Supabase MCP server:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    // Validate required parameters
    if (!query) {
      return res.status(400).json({ error: 'SQL query is required' });
    }

    // Log the request for debugging
    console.log('Executing SQL query via Supabase MCP server:', query);

    try {
      // Call the Supabase MCP server to execute the query
      const result = await callSupabaseMCP(query);

      // Return the result
      return res.status(200).json(result);
    } catch (operationError) {
      console.error('Error executing SQL query:', operationError);
      return res.status(500).json({ 
        error: `Failed to execute SQL query: ${operationError.message}`,
        details: operationError.stack
      });
    }
  } catch (error) {
    console.error('Error in Supabase MCP API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
