import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Home Page - Redirects to the Handyman Services home page
 *
 * This page redirects to the handyman services home page while preserving
 * the MCP testing functionality at /mcp-test
 */
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the handyman services home page
    router.push('/home');
  }, []);

  // Function to test Supabase MCP server
  const testSupabaseMCP = async () => {
    try {
      // SQL query to list all tables in the public schema
      const query = "SELECT tablename FROM pg_tables WHERE schemaname = 'public';";

      // Make a direct request to the MCP server
      const response = await fetch('http://localhost:8888/mcp3_execute_postgresql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      // Parse the response
      const data = await response.json();

      // Display the result
      console.log('Supabase MCP Response:', data);
      alert('Check console for Supabase MCP response');
    } catch (error) {
      console.error('Error testing Supabase MCP:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to test Google Maps MCP server
  const testGoogleMapsMCP = async () => {
    try {
      // Make a geocoding request
      const response = await fetch('http://localhost:8888/mcp0_maps_geocode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: 'Sacramento, CA' })
      });

      // Parse the response
      const data = await response.json();

      // Display the result
      console.log('Google Maps MCP Response:', data);
      alert('Check console for Google Maps MCP response');
    } catch (error) {
      console.error('Error testing Google Maps MCP:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to test Perplexity MCP server
  const testPerplexityMCP = async () => {
    try {
      // Make a search request
      const response = await fetch('http://localhost:8888/mcp2_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 'handyman services in Sacramento' })
      });

      // Parse the response
      const data = await response.json();

      // Display the result
      console.log('Perplexity MCP Response:', data);
      alert('Check console for Perplexity MCP response');
    } catch (error) {
      console.error('Error testing Perplexity MCP:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to test OpenAI MCP server
  const testOpenAIMCP = async () => {
    try {
      // Make a chat completion request
      const response = await fetch('http://localhost:8888/mcp1_openai_chat', {
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
      console.log('OpenAI MCP Response:', data);
      alert('Check console for OpenAI MCP response');
    } catch (error) {
      console.error('Error testing OpenAI MCP:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>MCP Servers Test</title>
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">MCP Servers Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Supabase MCP Server Test */}
        <div className="border rounded-lg p-6 shadow-md bg-purple-50">
          <h2 className="text-2xl font-semibold mb-4">Supabase MCP Server</h2>
          <p className="mb-6">Test the Supabase MCP server by listing all tables in the public schema.</p>
          <button
            onClick={testSupabaseMCP}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Test Supabase MCP
          </button>
        </div>

        {/* Google Maps MCP Server Test */}
        <div className="border rounded-lg p-6 shadow-md bg-green-50">
          <h2 className="text-2xl font-semibold mb-4">Google Maps MCP Server</h2>
          <p className="mb-6">Test the Google Maps MCP server by geocoding "Sacramento, CA".</p>
          <button
            onClick={testGoogleMapsMCP}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Test Google Maps MCP
          </button>
        </div>

        {/* Perplexity MCP Server Test */}
        <div className="border rounded-lg p-6 shadow-md bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4">Perplexity MCP Server</h2>
          <p className="mb-6">Test the Perplexity MCP server by searching for "handyman services in Sacramento".</p>
          <button
            onClick={testPerplexityMCP}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Test Perplexity MCP
          </button>
        </div>

        {/* OpenAI MCP Server Test */}
        <div className="border rounded-lg p-6 shadow-md bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">OpenAI MCP Server</h2>
          <p className="mb-6">Test the OpenAI MCP server by generating a description for a handyman service business.</p>
          <button
            onClick={testOpenAIMCP}
            className="w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Test OpenAI MCP
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md max-w-4xl mx-auto">
        <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Make sure all MCP servers are running (check <code>mcp_config.json</code>)</li>
          <li>Click any of the test buttons above</li>
          <li>Check the browser console (F12) for the full response</li>
          <li>If you get an error, ensure the corresponding MCP server is running on port 8888</li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage;
