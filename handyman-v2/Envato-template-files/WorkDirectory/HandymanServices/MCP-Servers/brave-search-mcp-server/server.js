/**
 * Brave Search MCP Server
 *
 * This server implements the Model Context Protocol (MCP) for Brave Search API.
 * It provides a simple interface for searching the web using Brave Search.
 *
 * Environment variables:
 * - BRAVE_SEARCH_API_KEY: Your Brave Search API key
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// Configuration
const PORT = 8888;
const BRAVE_SEARCH_API_KEY = 'BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo'; // Direct API key
const BRAVE_SEARCH_API_URL = 'https://api.search.brave.com/res/v1/web/search';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Brave Search MCP Server is running',
    endpoints: ['/mcp4_brave_search']
  });
});

/**
 * MCP endpoint for Brave Search
 *
 * Request body:
 * {
 *   "query": "search query",
 *   "count": 10,  // optional, default: 10
 *   "offset": 0   // optional, default: 0
 * }
 *
 * Response:
 * {
 *   "results": [
 *     {
 *       "title": "Result title",
 *       "url": "https://example.com",
 *       "description": "Result description"
 *     },
 *     ...
 *   ],
 *   "total": 1000
 * }
 */
app.post('/mcp4_brave_search', async (req, res) => {
  try {
    // Validate API key
    if (!BRAVE_SEARCH_API_KEY) {
      return res.status(500).json({
        error: 'BRAVE_SEARCH_API_KEY environment variable is not set'
      });
    }

    // Get parameters from request
    const { query, count = 10, offset = 0 } = req.body;

    // Validate query
    if (!query) {
      return res.status(400).json({
        error: 'Missing required parameter: query'
      });
    }

    console.log(`Searching for: "${query}" (count: ${count}, offset: ${offset})`);

    // Make request to Brave Search API
    const response = await fetch(`${BRAVE_SEARCH_API_URL}?q=${encodeURIComponent(query)}&count=${count}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': BRAVE_SEARCH_API_KEY
      }
    });

    // Check for errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brave Search API error:', errorText);
      return res.status(response.status).json({
        error: `Brave Search API error: ${response.statusText}`,
        details: errorText
      });
    }

    // Parse response
    const data = await response.json();

    // Format results
    const results = data.web?.results?.map(result => ({
      title: result.title,
      url: result.url,
      description: result.description
    })) || [];

    // Return results
    res.json({
      results,
      total: data.web?.totalResults || 0
    });
  } catch (error) {
    console.error('Error processing Brave Search request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Brave Search MCP Server running on port ${PORT}`);
  console.log(`API Key: ${BRAVE_SEARCH_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log('Endpoints:');
  console.log(`- GET  / - Health check`);
  console.log(`- POST /mcp4_brave_search - Search the web using Brave Search`);
});
