/**
 * Test MCP Authentication
 * 
 * This script tests the authentication functionality for MCP server access.
 * It verifies that the authentication middleware is properly configured and working.
 */

const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Import MCP configuration and authentication utilities
const { MCP_ENDPOINTS, getMcpRequestOptions } = require('../config/mcp-config');
const { generateToken } = require('../utils/mcp-auth');

// API key from environment variables
const API_KEY = process.env.MCP_API_KEY || 'test-api-key';
const API_KEY_HEADER = 'x-api-key';

/**
 * Test API key authentication
 */
async function testApiKeyAuth() {
  console.log('\n--- Testing API Key Authentication ---');
  
  try {
    // Test with valid API key
    console.log('Testing with valid API key...');
    
    const validResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({ sql: 'SELECT NOW()' }),
    });
    
    if (!validResponse.ok) {
      throw new Error(`Valid API key test failed: ${validResponse.status} ${validResponse.statusText}`);
    }
    
    console.log('✅ Valid API key authentication successful!');
    
    // Test with invalid API key
    console.log('Testing with invalid API key...');
    
    const invalidResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: 'invalid-key'
      },
      body: JSON.stringify({ sql: 'SELECT NOW()' }),
    });
    
    if (invalidResponse.status !== 401) {
      throw new Error(`Invalid API key test failed: Expected 401, got ${invalidResponse.status}`);
    }
    
    console.log('✅ Invalid API key correctly rejected!');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing API key authentication:', error.message);
    return false;
  }
}

/**
 * Test JWT token authentication
 */
async function testJwtAuth() {
  console.log('\n--- Testing JWT Authentication ---');
  
  try {
    // Generate a valid token
    const userId = 'test-user';
    const role = 'user';
    const validToken = generateToken(userId, role);
    
    console.log('Testing with valid JWT token...');
    
    const validResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${validToken}`
      },
      body: JSON.stringify({ sql: 'SELECT NOW()' }),
    });
    
    if (!validResponse.ok) {
      throw new Error(`Valid JWT test failed: ${validResponse.status} ${validResponse.statusText}`);
    }
    
    console.log('✅ Valid JWT authentication successful!');
    
    // Test with invalid token
    console.log('Testing with invalid JWT token...');
    
    const invalidResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-token'
      },
      body: JSON.stringify({ sql: 'SELECT NOW()' }),
    });
    
    if (invalidResponse.status !== 401) {
      throw new Error(`Invalid JWT test failed: Expected 401, got ${invalidResponse.status}`);
    }
    
    console.log('✅ Invalid JWT correctly rejected!');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing JWT authentication:', error.message);
    return false;
  }
}

/**
 * Test direct MCP server authentication
 */
async function testDirectMcpAuth() {
  console.log('\n--- Testing Direct MCP Server Authentication ---');
  
  try {
    // Test with valid API key
    console.log('Testing direct MCP access with valid API key...');
    
    const options = getMcpRequestOptions({ sql: 'SELECT NOW()' });
    
    const validResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, options);
    
    if (!validResponse.ok) {
      throw new Error(`Direct MCP auth test failed: ${validResponse.status} ${validResponse.statusText}`);
    }
    
    console.log('✅ Direct MCP authentication successful!');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing direct MCP authentication:', error.message);
    return false;
  }
}

/**
 * Run all authentication tests
 */
async function runTests() {
  console.log('=== MCP Authentication Tests ===');
  console.log('Testing authentication mechanisms for MCP server access...');
  
  // Test API key authentication
  const apiKeyResult = await testApiKeyAuth();
  
  // Test JWT authentication
  const jwtResult = await testJwtAuth();
  
  // Test direct MCP authentication
  const directMcpResult = await testDirectMcpAuth();
  
  // Print summary
  console.log('\n=== Test Summary ===');
  console.log(`API Key Authentication: ${apiKeyResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`JWT Authentication: ${jwtResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Direct MCP Authentication: ${directMcpResult ? '✅ PASS' : '❌ FAIL'}`);
  
  if (apiKeyResult && jwtResult && directMcpResult) {
    console.log('\n🎉 All authentication tests passed! MCP authentication is working correctly.');
  } else {
    console.log('\n❌ Some authentication tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run the tests
runTests();
