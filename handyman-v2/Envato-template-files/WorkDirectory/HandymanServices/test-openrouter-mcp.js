/**
 * Test script for OpenRouter MCP Server
 *
 * This script tests the OpenRouter MCP Server by making a search request
 * and displaying the results.
 *
 * Run with: node test-openrouter-mcp.js
 */

const fetch = require('node-fetch');

// Base URL for MCP servers
const MCP_SERVER_URL = 'http://localhost:8890';

/**
 * Test the OpenRouter MCP server
 */
async function testOpenRouterMCP() {
  console.log('\n===== Testing OpenRouter MCP Server =====');
  try {
    // Search query
    const query = 'handyman services near me';

    console.log(`Searching for: "${query}"`);

    // Make a request to the MCP server
    const response = await fetch(`${MCP_SERVER_URL}/mcp5_openrouter_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        max_results: 5
      })
    });

    // Check for errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! OpenRouter MCP Response:');
    console.log(JSON.stringify(data, null, 2));

    // Display a summary
    console.log(`\nFound ${data.results.length} results:`);
    data.results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   ${result.description}`);
    });

    return true;
  } catch (error) {
    console.error('ERROR testing OpenRouter MCP:', error.message);
    return false;
  }
}

// Run the test
testOpenRouterMCP().catch(error => {
  console.error('Error running test:', error);
});
