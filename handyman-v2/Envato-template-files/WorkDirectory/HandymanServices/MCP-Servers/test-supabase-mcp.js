/**
 * Test script for Supabase MCP server
 * 
 * This script tests the connection to the Supabase MCP server
 * and executes a simple query to verify functionality.
 */

const fetch = require('node-fetch');

// Test the Supabase MCP server
async function testSupabaseMCP() {
  console.log('Testing Supabase MCP server...');
  
  try {
    // Test a simple query to check if the server is running
    const response = await fetch('http://localhost:8888/v1/execute_postgresql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'SELECT version();'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Supabase MCP server:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Supabase MCP server response:', JSON.stringify(data, null, 2));
    console.log('Supabase MCP server is working correctly!');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase MCP server:', error.message);
    return false;
  }
}

// Execute the test
testSupabaseMCP().then(success => {
  if (!success) {
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure the Supabase MCP server is running on port 8888');
    console.log('2. Check if the API key in mcp_config.json is valid');
    console.log('3. Verify the Supabase project is active and accessible');
    console.log('4. Check if there are any network issues blocking the connection');
  }
});
