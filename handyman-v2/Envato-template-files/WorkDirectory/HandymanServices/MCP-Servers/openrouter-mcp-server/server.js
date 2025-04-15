/**
 * OpenRouter MCP Server
 *
 * This server implements the Model Context Protocol (MCP) for OpenRouter API.
 * It provides a simple interface for searching the web using OpenRouter's AI models.
 *
 * Environment variables:
 * - OPENROUTER_API_KEY: Your OpenRouter API key
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// Configuration
const PORT = 8890;
const OPENROUTER_API_KEY = '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'; // Replace with your actual API key
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.0-flash-001';
const FALLBACK_MODEL = 'openrouter/optimus-alpha';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OpenRouter MCP Server is running',
    endpoints: ['/mcp5_openrouter_search']
  });
});

/**
 * MCP endpoint for OpenRouter web search
 *
 * Request body:
 * {
 *   "query": "search query",
 *   "model": "google/gemini-2.0-flash-001",  // optional, default: "google/gemini-2.0-flash-001"
 *   "max_results": 5   // optional, default: 5
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
 *   ]
 * }
 */
app.post('/mcp5_openrouter_search', async (req, res) => {
  try {
    // Validate API key
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: 'OPENROUTER_API_KEY environment variable is not set'
      });
    }

    // Get parameters from request
    const { query, model = DEFAULT_MODEL, max_results = 5 } = req.body;

    // Validate query
    if (!query) {
      return res.status(400).json({
        error: 'Missing required parameter: query'
      });
    }

    console.log(`Searching for: "${query}" (model: ${model}, max_results: ${max_results})`);

    // Create prompt for web search
    const prompt = `I need you to act as a web search engine. I'll give you a search query, and you'll provide the top ${max_results} most relevant search results in JSON format.

For the query: "${query}"

Please return ONLY a valid JSON array of objects with the following structure, and nothing else:
[
  {
    "title": "Result title",
    "url": "https://example.com",
    "description": "A brief description of the result"
  },
  ...
]

Make sure to include real, relevant URLs and accurate descriptions. Do not make up information. If you don't have enough information to provide ${max_results} results, just provide as many as you can.`;

    // Make request to OpenRouter API
    let response;
    let currentModel = model;

    try {
      response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://handyman-services.com',
          'X-Title': 'Handyman Services'
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            { role: 'system', content: 'You are a helpful web search assistant that returns results in JSON format.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 2000,
          web_search: true // Enable web search feature
        })
      });

      // If the primary model fails with a 404, try the fallback model
      if (response.status === 404 && currentModel === DEFAULT_MODEL) {
        console.log(`Model ${currentModel} not available. Trying fallback model ${FALLBACK_MODEL}...`);
        currentModel = FALLBACK_MODEL;

        response = await fetch(OPENROUTER_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://handyman-services.com',
            'X-Title': 'Handyman Services'
          },
          body: JSON.stringify({
            model: currentModel,
            messages: [
              { role: 'system', content: 'You are a helpful web search assistant that returns results in JSON format.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.2,
            max_tokens: 2000,
            web_search: true // Enable web search feature
          })
        });
      }
    } catch (error) {
      console.error('Error making request to OpenRouter:', error);
      throw error;
    }

    // Check for errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return res.status(response.status).json({
        error: `OpenRouter API error: ${response.statusText}`,
        details: errorText
      });
    }

    // Parse response
    const data = await response.json();

    // Extract the content from the response
    const content = data.choices[0]?.message?.content || '';

    // Try to parse the JSON from the content
    let results = [];
    try {
      // Find JSON array in the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON array found in response');
      }
    } catch (error) {
      console.error('Error parsing results:', error);
      console.log('Raw content:', content);
      return res.status(500).json({
        error: 'Failed to parse search results',
        raw_content: content
      });
    }

    // Return results
    res.json({
      results
    });
  } catch (error) {
    console.error('Error processing OpenRouter search request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`OpenRouter MCP Server running on port ${PORT}`);
  console.log(`API Key: ${OPENROUTER_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log('Endpoints:');
  console.log(`- GET  / - Health check`);
  console.log(`- POST /mcp5_openrouter_search - Search the web using OpenRouter`);
});
