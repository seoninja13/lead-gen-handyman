'use client';

import React, { useState, useEffect } from 'react';

/**
 * Supabase Test Component
 * Provides a clean interface for testing Supabase database operations
 */
export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState({
    status: 'unknown',
    message: 'Checking connection...',
    error: null
  });

  // Check connection status on mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);
  const [operation, setOperation] = useState('SELECT');
  const [table, setTable] = useState('test-delete');
  const [query, setQuery] = useState('SELECT * FROM test_delete LIMIT 5');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          status: data.status === 'ok' ? 'connected' : 'error',
          message: data.message,
          url: data.url,
          mockData: data.mockData,
          error: data.error || null
        });
      } else {
        setConnectionStatus({
          status: 'error',
          message: data.message || 'Failed to connect',
          error: data.error
        });
      }
    } catch (error) {
      setConnectionStatus({
        status: 'error',
        message: 'Connection check failed',
        error: error.message
      });
    }
  };

  const executeQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!query.trim()) {
        throw new Error('Query cannot be empty');
      }

      // Convert SQL query to Supabase API format
      let apiOperation = operation.toLowerCase();
      let apiQuery = {};

      if (apiOperation === 'select') {
        apiQuery = { limit: 10 };
      } else if (apiOperation === 'insert') {
        apiQuery = {
          records: [{
            city: 'New City ' + new Date().toISOString().substring(11, 19),
            business: 'Test Business',
            service: 'Created via test interface at ' + new Date().toLocaleString()
          }]
        };
      } else if (apiOperation === 'update') {
        // Get the ID from the query if possible
        const idMatch = query.match(/WHERE\s+id\s*=\s*(\d+)/i);
        const id = idMatch ? parseInt(idMatch[1]) : 1;

        apiQuery = {
          values: {
            city: 'Updated City ' + new Date().toISOString().substring(11, 19),
            business: 'Updated Business',
            service: 'Updated via test interface at ' + new Date().toLocaleString()
          },
          eq: { id: id }
        };
      } else if (apiOperation === 'delete') {
        // Get the ID from the query if possible
        const idMatch = query.match(/WHERE\s+id\s*=\s*(\d+)/i);
        const id = idMatch ? parseInt(idMatch[1]) : 1;

        apiQuery = {
          eq: { id: id }
        };
      }

      const response = await fetch('/api/supabase/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: apiOperation,
          table: 'test-delete',
          query: apiQuery
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute query');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError({
        message: err.message || 'An unexpected error occurred',
        details: err.details || null,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  // Error display component
  const ErrorDisplay = ({ error }) => {
    if (!error) return null;
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
            <h3 className="text-sm text-gray-700">
              <span className="text-red-600 font-medium">Error:</span> Query execution failed
            </h3>
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="text-sm text-gray-800 font-medium mb-2">
            {error.message}
          </div>

          {error.details && (
            <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200 text-sm">
              <div className="font-medium text-gray-700 mb-1">Error Details:</div>
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {typeof error.details === 'string'
                  ? error.details
                  : JSON.stringify(error.details, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-3 text-xs text-gray-500">
            Timestamp: {new Date(error.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    );
  };

  // Result display component
  const ResultDisplay = ({ result }) => {
    if (!result) return null;

    // Format the data for better display
    const formatData = () => {
      if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
        return (
          <div className="text-gray-500 italic">No data returned</div>
        );
      }

      // Get column headers from the first item
      const columns = Object.keys(result.data[0]);

      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(column => (
                  <th
                    key={column}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.data.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns.map(column => (
                    <td key={`${rowIndex}-${column}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeof row[column] === 'object' ? JSON.stringify(row[column]) : String(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
            <h3 className="text-sm text-gray-700">
              <span className="text-green-600 font-medium">Success:</span> Query executed successfully
            </h3>
          </div>
        </div>

        <div className="p-4 bg-white">
          {/* Operation info */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Operation:</span>{' '}
                <span className="text-gray-600">{result.operation || 'SELECT'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Records:</span>{' '}
                <span className="text-gray-600">{result.data ? result.data.length : 0}</span>
              </div>
            </div>
          </div>

          {/* Data table */}
          {formatData()}

          {/* Raw response */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <details className="text-sm">
              <summary className="font-medium text-gray-700 cursor-pointer hover:text-blue-600">
                View raw response
              </summary>
              <pre className="mt-2 bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="divide-y divide-gray-100">
      {/* Connection Status */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Connection</h2>

        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${connectionStatus.status === 'connected' ? 'bg-green-500' : connectionStatus.status === 'checking' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <h3 className="text-sm text-gray-700">
                <span className={`font-medium ${connectionStatus.status === 'connected' ? 'text-green-600' : connectionStatus.status === 'checking' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {connectionStatus.status === 'connected' ? 'Connected:' : connectionStatus.status === 'checking' ? 'Checking:' : 'Error:'}
                </span>{' '}
                {connectionStatus.message}
              </h3>
            </div>
          </div>

          <div className="p-4 bg-white">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {connectionStatus.url && (
                <div>
                  <span className="font-medium text-gray-700">Database URL:</span>{' '}
                  <span className="text-gray-600">{connectionStatus.url}</span>
                </div>
              )}

              {connectionStatus.mockData && (
                <div className="text-yellow-600 font-medium">
                  <svg className="inline-block h-4 w-4 mr-1 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Using mock data for testing purposes
                </div>
              )}

              {connectionStatus.error && (
                <div className="mt-2 p-3 bg-red-50 rounded border border-red-100">
                  <div className="font-medium text-red-800 mb-1">Error:</div>
                  <div className="text-red-700">{connectionStatus.error}</div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={checkConnectionStatus}
                className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Connection
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Query Builder */}
      <div className="px-8 py-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Operations</h2>

        {/* Error Display */}
        <ErrorDisplay error={error} />

        {/* Result Display */}
        <ResultDisplay result={result} />

        <div className="rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Query Builder</h3>
          </div>

          <div className="p-4 bg-white">
            {/* Operation Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operation Type
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['SELECT', 'INSERT', 'UPDATE', 'DELETE'].map((op) => (
                  <button
                    key={op}
                    onClick={() => {
                      setOperation(op);
                      // Set example query based on operation
                      if (op === 'UPDATE') {
                        setQuery("UPDATE test-delete SET service = 'Updated Service' WHERE id = 1");
                      } else if (op === 'SELECT') {
                        setQuery('SELECT * FROM "test-delete" LIMIT 5');
                      } else if (op === 'INSERT') {
                        setQuery("INSERT INTO \"test-delete\" (city, business, service) VALUES ('New City', 'New Business', 'New Service')");
                      } else if (op === 'DELETE') {
                        setQuery('DELETE FROM "test-delete" WHERE id = 1');
                      }
                    }}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                      operation === op
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SQL Query
              </label>
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your SQL query here..."
                />
                <div className="absolute right-2 bottom-2">
                  <button
                    onClick={() => setQuery('')}
                    className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                {operation === 'SELECT' && (
                  <p>Example: <code className="bg-gray-100 px-1 py-0.5 rounded">SELECT * FROM "test-delete" LIMIT 5</code></p>
                )}
                {operation === 'INSERT' && (
                  <p>Example: <code className="bg-gray-100 px-1 py-0.5 rounded">INSERT INTO "test-delete" (city, business, service) VALUES ('New City', 'New Business', 'New Service')</code></p>
                )}
                {operation === 'UPDATE' && (
                  <p>Example: <code className="bg-gray-100 px-1 py-0.5 rounded">UPDATE "test-delete" SET service = 'Updated Service' WHERE id = 1</code></p>
                )}
                {operation === 'DELETE' && (
                  <p>Example: <code className="bg-gray-100 px-1 py-0.5 rounded">DELETE FROM "test-delete" WHERE id = 1</code></p>
                )}
              </div>
            </div>

            {/* Execute Button */}
            <div className="flex justify-end">
              <button
                onClick={executeQuery}
                disabled={loading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Execute Query
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* We don't need a separate results section anymore since we've integrated the results into the query builder */}
    </div>
  );
}
