'use client';

import React, { useState, useEffect } from 'react';

/**
 * Supabase Test Component
 * 
 * This component tests the Supabase connection and CRUD operations.
 * It provides a UI for testing various Supabase operations.
 */
export default function SupabaseTest() {
  // State for connection status
  const [connectionStatus, setConnectionStatus] = useState({
    status: 'unknown',
    message: 'Checking connection...',
    error: null
  });

  // State for CRUD operations
  const [operation, setOperation] = useState('select');
  const [table, setTable] = useState('places');
  const [queryParams, setQueryParams] = useState('{\n  "limit": 5\n}');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check connection status on mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Function to check Supabase connection status
  const checkConnectionStatus = async () => {
    try {
      setConnectionStatus({
        status: 'checking',
        message: 'Checking connection...',
        error: null
      });

      const response = await fetch('/api/supabase/status');
      const data = await response.json();

      if (response.ok) {
        setConnectionStatus({
          status: 'connected',
          message: data.message,
          url: data.url,
          count: data.count,
          error: null
        });
      } else {
        setConnectionStatus({
          status: 'error',
          message: data.message || 'Failed to connect to Supabase',
          error: data.error || 'Unknown error'
        });
      }
    } catch (error) {
      setConnectionStatus({
        status: 'error',
        message: 'Error checking connection',
        error: error.message
      });
    }
  };

  // Function to execute a Supabase query
  const executeQuery = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // Parse query parameters
      let parsedQuery;
      try {
        parsedQuery = JSON.parse(queryParams);
      } catch (e) {
        throw new Error(`Invalid JSON in query parameters: ${e.message}`);
      }

      // Execute the query
      const response = await fetch('/api/supabase/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation,
          table,
          query: parsedQuery
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        throw new Error(data.message || data.error || 'Unknown error');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    executeQuery();
  };

  // Function to set example query parameters based on operation
  const setExampleParams = () => {
    switch (operation) {
      case 'select':
        setQueryParams('{\n  "limit": 5,\n  "order": {\n    "column": "id",\n    "ascending": true\n  }\n}');
        break;
      case 'insert':
        setQueryParams('{\n  "records": [\n    {\n      "name": "Test Place",\n      "address": "123 Test St",\n      "city": "Test City",\n      "state": "TS",\n      "zip": "12345"\n    }\n  ]\n}');
        break;
      case 'update':
        setQueryParams('{\n  "values": {\n    "name": "Updated Place"\n  },\n  "eq": {\n    "id": 1\n  }\n}');
        break;
      case 'delete':
        setQueryParams('{\n  "eq": {\n    "name": "Test Place"\n  }\n}');
        break;
      default:
        setQueryParams('{\n  "limit": 5\n}');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>

      {/* Connection Status */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <div className="flex items-center mb-2">
          <div 
            className={`w-4 h-4 rounded-full mr-2 ${
              connectionStatus.status === 'connected' ? 'bg-green-500' : 
              connectionStatus.status === 'error' ? 'bg-red-500' : 
              'bg-yellow-500'
            }`}
          ></div>
          <span className="font-medium">{connectionStatus.message}</span>
        </div>
        {connectionStatus.url && (
          <p className="text-sm text-gray-600">URL: {connectionStatus.url}</p>
        )}
        {connectionStatus.count !== undefined && (
          <p className="text-sm text-gray-600">Records: {connectionStatus.count}</p>
        )}
        {connectionStatus.error && (
          <p className="text-sm text-red-600 mt-2">Error: {connectionStatus.error}</p>
        )}
        <button 
          onClick={checkConnectionStatus}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Refresh Status
        </button>
      </div>

      {/* Query Form */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Execute Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Operation:</label>
              <select 
                value={operation} 
                onChange={(e) => {
                  setOperation(e.target.value);
                  // Reset query params when operation changes
                  setExampleParams();
                }}
                className="w-full p-2 border rounded"
              >
                <option value="select">SELECT</option>
                <option value="insert">INSERT</option>
                <option value="update">UPDATE</option>
                <option value="delete">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Table:</label>
              <input 
                type="text" 
                value={table} 
                onChange={(e) => setTable(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium">Query Parameters (JSON):</label>
              <button 
                type="button"
                onClick={setExampleParams}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Set Example
              </button>
            </div>
            <textarea 
              value={queryParams} 
              onChange={(e) => setQueryParams(e.target.value)}
              className="w-full p-2 border rounded font-mono text-sm"
              rows="10"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white ${
              loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            } transition`}
          >
            {loading ? 'Executing...' : 'Execute Query'}
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!loading && result && (
          <div>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
            {result.data && Array.isArray(result.data) && (
              <p className="mt-2 text-gray-600">
                {result.data.length} record(s) returned
              </p>
            )}
          </div>
        )}
        {!loading && !result && !error && (
          <p className="text-gray-500 text-center p-12">
            Execute a query to see results
          </p>
        )}
      </div>
    </div>
  );
}
