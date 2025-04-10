'use client';

import React, { useState } from 'react';
import PerplexityTest from '../../components/PerplexityTest';

/**
 * MCP Test Page
 * 
 * This page provides a UI for testing various MCP servers:
 * - Supabase MCP Server
 * - Google Maps MCP Server
 * - Perplexity MCP Server
 * - OpenAI MCP Server
 */
export default function MCPTestPage() {
  // State for Supabase MCP test
  const [supabaseResult, setSupabaseResult] = useState(null);
  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState(null);
  const [supabaseQuery, setSupabaseQuery] = useState("SELECT tablename FROM pg_tables WHERE schemaname = 'public';");

  // State for Google Maps MCP test
  const [mapsResult, setMapsResult] = useState(null);
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsError, setMapsError] = useState(null);
  const [mapsQuery, setMapsQuery] = useState({
    operation: 'geocode',
    address: 'Sacramento, CA'
  });

  // State for Perplexity MCP test
  const [perplexityResult, setPerplexityResult] = useState(null);
  const [perplexityLoading, setPerplexityLoading] = useState(false);
  const [perplexityError, setPerplexityError] = useState(null);
  const [perplexityQuery, setPerplexityQuery] = useState('handyman services in Sacramento');

  /**
   * Test the Supabase MCP server by executing a SQL query
   */
  const testSupabaseMCP = async () => {
    try {
      setSupabaseLoading(true);
      setSupabaseError(null);
      setSupabaseResult(null);

      const response = await fetch('/api/mcp/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: supabaseQuery
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSupabaseResult(data);
      } else {
        throw new Error(data.message || data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error testing Supabase MCP:', error);
      setSupabaseError(error.message);
    } finally {
      setSupabaseLoading(false);
    }
  };

  /**
   * Test the Google Maps MCP server
   */
  const testGoogleMapsMCP = async () => {
    try {
      setMapsLoading(true);
      setMapsError(null);
      setMapsResult(null);

      const response = await fetch('/api/mcp/maps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mapsQuery)
      });

      const data = await response.json();

      if (response.ok) {
        setMapsResult(data);
      } else {
        throw new Error(data.message || data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error testing Google Maps MCP:', error);
      setMapsError(error.message);
    } finally {
      setMapsLoading(false);
    }
  };

  /**
   * Test the Perplexity MCP server
   */
  const testPerplexityMCP = async () => {
    try {
      setPerplexityLoading(true);
      setPerplexityError(null);
      setPerplexityResult(null);

      const response = await fetch('/api/mcp/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: perplexityQuery
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPerplexityResult(data);
      } else {
        throw new Error(data.message || data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error testing Perplexity MCP:', error);
      setPerplexityError(error.message);
    } finally {
      setPerplexityLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">MCP Servers Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Supabase MCP Server</h2>
        {/* Supabase MCP Test Section */}
        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Supabase MCP Server Test</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">SQL Query:</label>
            <textarea
              value={supabaseQuery}
              onChange={(e) => setSupabaseQuery(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          
          <button
            onClick={testSupabaseMCP}
            disabled={supabaseLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {supabaseLoading ? 'Running Query...' : 'Execute SQL Query'}
          </button>
          
          {supabaseError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="text-red-700 font-semibold">Error:</h3>
              <p className="text-red-600">{supabaseError}</p>
            </div>
          )}
          
          {supabaseResult && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-50 p-4 rounded border overflow-auto max-h-60">
                {JSON.stringify(supabaseResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Google Maps MCP Server</h2>
        {/* Google Maps MCP Test Section */}
        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Google Maps MCP Server Test</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Operation:</label>
            <select
              value={mapsQuery.operation}
              onChange={(e) => setMapsQuery({...mapsQuery, operation: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="geocode">Geocode</option>
              <option value="search_places">Search Places</option>
              <option value="directions">Directions</option>
            </select>
          </div>
          
          {mapsQuery.operation === 'geocode' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address:</label>
              <input
                type="text"
                value={mapsQuery.address || ''}
                onChange={(e) => setMapsQuery({...mapsQuery, address: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          
          {mapsQuery.operation === 'search_places' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Query:</label>
              <input
                type="text"
                value={mapsQuery.query || ''}
                onChange={(e) => setMapsQuery({...mapsQuery, query: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          
          {mapsQuery.operation === 'directions' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Origin:</label>
                <input
                  type="text"
                  value={mapsQuery.origin || ''}
                  onChange={(e) => setMapsQuery({...mapsQuery, origin: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Destination:</label>
                <input
                  type="text"
                  value={mapsQuery.destination || ''}
                  onChange={(e) => setMapsQuery({...mapsQuery, destination: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}
          
          <button
            onClick={testGoogleMapsMCP}
            disabled={mapsLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {mapsLoading ? 'Loading...' : 'Test Google Maps MCP'}
          </button>
          
          {mapsError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="text-red-700 font-semibold">Error:</h3>
              <p className="text-red-600">{mapsError}</p>
            </div>
          )}
          
          {mapsResult && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-50 p-4 rounded border overflow-auto max-h-60">
                {JSON.stringify(mapsResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Perplexity MCP Server</h2>
        <PerplexityTest />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">OpenAI MCP Server</h2>
        {/* OpenAI MCP Test Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">OpenAI MCP Server Test</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Search Query:</label>
            <input
              type="text"
              value={perplexityQuery}
              onChange={(e) => setPerplexityQuery(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            onClick={testPerplexityMCP}
            disabled={perplexityLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {perplexityLoading ? 'Searching...' : 'Test Perplexity MCP'}
          </button>
          
          {perplexityError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="text-red-700 font-semibold">Error:</h3>
              <p className="text-red-600">{perplexityError}</p>
            </div>
          )}
          
          {perplexityResult && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-50 p-4 rounded border overflow-auto max-h-60">
                {JSON.stringify(perplexityResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
