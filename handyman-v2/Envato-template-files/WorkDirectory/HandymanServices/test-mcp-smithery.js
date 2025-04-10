/**
 * MCP Servers Test Script for Smithery-based MCP servers
 * 
 * This script tests MCP servers that are run through the Smithery CLI,
 * which connect to remote WebSocket endpoints rather than exposing local HTTP endpoints.
 * 
 * To use this script:
 * 1. Start the MCP servers using the provided PowerShell scripts
 * 2. Run this script with: node test-mcp-smithery.js
 */

const { exec } = require('child_process');

/**
 * Run a command and return its output as a Promise
 * @param {string} command - The command to run
 * @returns {Promise<string>} - The command output
 */
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.warn(`Warning: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

/**
 * Test if the Smithery CLI is installed and working
 */
async function testSmitheryCLI() {
  console.log('\n===== Testing Smithery CLI =====');
  try {
    const output = await runCommand('npx @smithery/cli@latest --version');
    console.log(`Smithery CLI version: ${output.trim()}`);
    return true;
  } catch (error) {
    console.error('ERROR: Smithery CLI is not installed or not working properly');
    console.error(error);
    return false;
  }
}

/**
 * List available MCP servers from Smithery
 */
async function listSmitheryServers() {
  console.log('\n===== Listing Available Smithery MCP Servers =====');
  try {
    const output = await runCommand('npx @smithery/cli@latest list');
    console.log('Available Smithery MCP Servers:');
    console.log(output);
    return true;
  } catch (error) {
    console.error('ERROR: Failed to list Smithery MCP servers');
    console.error(error);
    return false;
  }
}

/**
 * Test the Supabase MCP server by inspecting it
 */
async function testSupabaseMCP() {
  console.log('\n===== Testing Supabase MCP Server =====');
  try {
    const output = await runCommand('npx @smithery/cli@latest inspect @alexander-zuev/supabase-mcp-server');
    console.log('Supabase MCP Server Information:');
    console.log(output);
    return true;
  } catch (error) {
    console.error('ERROR: Failed to inspect Supabase MCP server');
    console.error(error);
    return false;
  }
}

/**
 * Test the Perplexity MCP server by inspecting it
 */
async function testPerplexityMCP() {
  console.log('\n===== Testing Perplexity MCP Server =====');
  try {
    const output = await runCommand('npx @smithery/cli@latest inspect @arjunkmrm/perplexity-search');
    console.log('Perplexity MCP Server Information:');
    console.log(output);
    return true;
  } catch (error) {
    console.error('ERROR: Failed to inspect Perplexity MCP server');
    console.error(error);
    return false;
  }
}

/**
 * Test the Google Maps MCP server
 */
async function testGoogleMapsMCP() {
  console.log('\n===== Testing Google Maps MCP Server =====');
  try {
    // For Google Maps MCP server, we can only check if the package is installed
    const output = await runCommand('npm list @modelcontextprotocol/server-google-maps');
    console.log('Google Maps MCP Server Package Information:');
    console.log(output);
    return true;
  } catch (error) {
    console.error('ERROR: Failed to check Google Maps MCP server package');
    console.error(error);
    return false;
  }
}

/**
 * Test the OpenAI MCP server
 */
async function testOpenAIMCP() {
  console.log('\n===== Testing OpenAI MCP Server =====');
  try {
    // For OpenAI MCP server, we can only check if the package is installed
    const output = await runCommand('npm list @mzxrai/mcp-openai');
    console.log('OpenAI MCP Server Package Information:');
    console.log(output);
    return true;
  } catch (error) {
    console.error('ERROR: Failed to check OpenAI MCP server package');
    console.error(error);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('Starting MCP Servers Test for Smithery-based servers...');
  
  // Track test results
  const results = {
    smitheryCLI: false,
    smitheryServers: false,
    supabase: false,
    perplexity: false,
    googleMaps: false,
    openai: false
  };
  
  // Test Smithery CLI
  results.smitheryCLI = await testSmitheryCLI();
  
  // List available Smithery servers
  results.smitheryServers = await listSmitheryServers();
  
  // Test Supabase MCP
  results.supabase = await testSupabaseMCP();
  
  // Test Perplexity MCP
  results.perplexity = await testPerplexityMCP();
  
  // Test Google Maps MCP
  results.googleMaps = await testGoogleMapsMCP();
  
  // Test OpenAI MCP
  results.openai = await testOpenAIMCP();
  
  // Print summary
  console.log('\n===== MCP Servers Test Summary =====');
  console.log('Smithery CLI:', results.smitheryCLI ? 'PASSED' : 'FAILED');
  console.log('Smithery Servers List:', results.smitheryServers ? 'PASSED' : 'FAILED');
  console.log('Supabase MCP Server:', results.supabase ? 'PASSED' : 'FAILED');
  console.log('Perplexity MCP Server:', results.perplexity ? 'PASSED' : 'FAILED');
  console.log('Google Maps MCP Server:', results.googleMaps ? 'PASSED' : 'FAILED');
  console.log('OpenAI MCP Server:', results.openai ? 'PASSED' : 'FAILED');
  
  const passCount = Object.values(results).filter(Boolean).length;
  console.log(`\nOverall: ${passCount}/6 tests passed`);
}

// Run the tests
runAllTests().catch(error => {
  console.error('Error running tests:', error);
});
