/**
 * Test script for Perplexity MCP Server
 * This script tests the functionality of the Perplexity MCP server
 */
const fetch = require('node-fetch');

/**
 * Test the Perplexity server
 */
async function testPerplexityServer() {
  try {
    console.log('Testing Perplexity server...');
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3005/health');
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed with status: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('Health check response:', healthData);
    
    // Test basic query
    console.log('\n2. Testing basic query...');
    const basicResponse = await fetch('http://localhost:3005/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId: 'perplexity-online-llama',
        params: {
          prompt: 'What are the top 3 handyman services in high demand?'
        }
      })
    });
    
    if (!basicResponse.ok) {
      const errorData = await basicResponse.json();
      throw new Error(errorData.error || `HTTP error! Status: ${basicResponse.status}`);
    }
    
    const basicData = await basicResponse.json();
    console.log('Basic query response:');
    console.log('- Result:', basicData.result.substring(0, 100) + '...');
    console.log('- Full Result:', basicData.result);
    console.log('- Sources:', JSON.stringify(basicData.metadata.sources, null, 2));
    console.log('- Sources count:', (basicData.metadata.sources || []).length);
    
    // Test deep research
    console.log('\n3. Testing deep research...');
    const researchResponse = await fetch('http://localhost:3005/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId: 'perplexity-deep-research',
        params: {
          topic: 'Latest trends in handyman services for 2025',
          depth: 'basic'
        }
      })
    });
    
    if (!researchResponse.ok) {
      const errorData = await researchResponse.json();
      throw new Error(errorData.error || `HTTP error! Status: ${researchResponse.status}`);
    }
    
    const researchData = await researchResponse.json();
    console.log('Deep research response:');
    console.log('- Executive Summary:', 
      researchData.metadata.sections.executiveSummary.substring(0, 100) + '...');
    console.log('- Full Response:', researchData.result);
    console.log('- Sources:', JSON.stringify(researchData.metadata.sources, null, 2));
    console.log('- Sources count:', (researchData.metadata.sources || []).length);
    
    console.log('\nAll tests passed successfully!');
  } catch (error) {
    console.error('Error testing Perplexity server:', error);
  }
}

// Run the test
testPerplexityServer();
