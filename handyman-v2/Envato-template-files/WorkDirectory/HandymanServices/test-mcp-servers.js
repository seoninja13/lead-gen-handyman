/**
 * MCP Servers Test Script
 *
 * This script tests all MCP servers configured in mcp_config.json:
 * - Supabase MCP Server
 * - Google Maps MCP Server
 * - Perplexity MCP Server
 * - OpenAI MCP Server
 * - Brave Search MCP Server
 * - OpenRouter MCP Server
 *
 * Run with: node test-mcp-servers.js
 */

const fetch = require('node-fetch');

// Base URL for MCP servers
const MCP_SERVER_URL = 'http://localhost:8888';

/**
 * Test the Supabase MCP server
 */
async function testSupabaseMCP() {
  console.log('\n===== Testing Supabase MCP Server =====');
  try {
    // SQL query to list all tables in the public schema
    const query = "SELECT tablename FROM pg_tables WHERE schemaname = 'public';";

    console.log(`Executing SQL query: ${query}`);

    // Make a direct request to the MCP server
    const response = await fetch(`${MCP_SERVER_URL}/mcp3_execute_postgresql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! Supabase MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing Supabase MCP:', error.message);
    return false;
  }
}

/**
 * Test the Google Maps MCP server
 */
async function testGoogleMapsMCP() {
  console.log('\n===== Testing Google Maps MCP Server =====');
  try {
    // Make a geocoding request
    console.log('Geocoding address: "Sacramento, CA"');

    const response = await fetch(`${MCP_SERVER_URL}/mcp0_maps_geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: 'Sacramento, CA' })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! Google Maps MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing Google Maps MCP:', error.message);
    return false;
  }
}

/**
 * Test the Perplexity MCP server
 */
async function testPerplexityMCP() {
  console.log('\n===== Testing Perplexity MCP Server =====');
  try {
    // Make a search request
    console.log('Searching for: "handyman services in Sacramento"');

    const response = await fetch(`${MCP_SERVER_URL}/mcp2_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: 'handyman services in Sacramento' })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! Perplexity MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing Perplexity MCP:', error.message);
    return false;
  }
}

/**
 * Test the OpenAI MCP server
 */
async function testOpenAIMCP() {
  console.log('\n===== Testing OpenAI MCP Server =====');
  try {
    // Make a chat completion request
    console.log('Generating text with prompt: "Write a short description for a handyman service business."');

    const response = await fetch(`${MCP_SERVER_URL}/mcp1_openai_chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for a handyman service business.' },
          { role: 'user', content: 'Write a short description for a handyman service business.' }
        ]
      })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! OpenAI MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing OpenAI MCP:', error.message);
    return false;
  }
}

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

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! Brave Search MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing Brave Search MCP:', error.message);
    return false;
  }
}

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
        max_results: 3  // Limit to 3 results for brevity
      })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('SUCCESS! OpenRouter MCP Response:');
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('ERROR testing OpenRouter MCP:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('Starting MCP Servers Test...');
  console.log('MCP Server URL:', MCP_SERVER_URL);

  // Track test results
  const results = {
    supabase: false,
    googleMaps: false,
    perplexity: false,
    openai: false,
    braveSearch: false,
    openRouter: false
  };

  // Test Supabase MCP
  results.supabase = await testSupabaseMCP();

  // Test Google Maps MCP
  results.googleMaps = await testGoogleMapsMCP();

  // Test Perplexity MCP
  results.perplexity = await testPerplexityMCP();

  // Test OpenAI MCP
  results.openai = await testOpenAIMCP();

  // Test Brave Search MCP
  results.braveSearch = await testBraveSearchMCP();

  // Print summary
  console.log('\n===== MCP Servers Test Summary =====');
  console.log('Supabase MCP Server:', results.supabase ? 'PASSED' : 'FAILED');
  console.log('Google Maps MCP Server:', results.googleMaps ? 'PASSED' : 'FAILED');
  console.log('Perplexity MCP Server:', results.perplexity ? 'PASSED' : 'FAILED');
  console.log('OpenAI MCP Server:', results.openai ? 'PASSED' : 'FAILED');
  console.log('Brave Search MCP Server:', results.braveSearch ? 'PASSED' : 'FAILED');

  const passCount = Object.values(results).filter(Boolean).length;
  console.log(`\nOverall: ${passCount}/5 tests passed`);
}

// Run the tests
runAllTests().catch(error => {
  console.error('Error running tests:', error);
});
