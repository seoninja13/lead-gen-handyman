/**
 * Test script for Brave Search MCP Server
 * 
 * This script tests the Brave Search MCP Server by making a search request
 * and displaying the results.
 * 
 * Run with: node test-brave-search-mcp.js
 */

const fetch = require('node-fetch');

// Base URL for MCP servers
const MCP_SERVER_URL = 'http://localhost:8888';

/**
 * Test the Brave Search MCP server
 */
async function testBraveSearchMCP() {
  console.log('\n===== Testing Brave Search MCP Server =====');
  try {
    // Search query
    const query = 'handyman services near me';
    
    console.log(`Searching for: "${query}"`);
    
    // Make a request to the MCP server
    const response = await fetch(`${MCP_SERVER_URL}/mcp4_brave_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query,
        count: 5  // Limit to 5 results for brevity
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
    console.log('SUCCESS! Brave Search MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Display a summary
    console.log(`\nFound ${data.total} results. Showing top ${data.results.length}:`);
    data.results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   ${result.description}`);
    });
    
    return true;
  } catch (error) {
    console.error('ERROR testing Brave Search MCP:', error.message);
    return false;
  }
}

// Run the test
testBraveSearchMCP().catch(error => {
  console.error('Error running test:', error);
});
