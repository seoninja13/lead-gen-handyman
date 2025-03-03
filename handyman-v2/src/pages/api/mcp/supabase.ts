/**
 * Supabase MCP API Route
 * 
 * This API route provides an interface for interacting with the Supabase database
 * through the Model Context Protocol (MCP) server.
 */

import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handle API requests to the Supabase MCP server
 * 
 * @param req The Next.js API request
 * @param res The Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sql } = req.body;

    // Validate the SQL query
    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({ error: 'Invalid SQL query' });
    }

    // Execute the query using the MCP server
    const response = await fetch('http://localhost:3001/mcp/supabase/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.error || 'Error executing query' });
    }

    const data = await response.json();
    return res.status(200).json({ data: data.rows || [] });
  } catch (error) {
    console.error('Error in Supabase MCP API route:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
