/**
 * Supabase Test Component
 * 
 * This component tests the direct connection to Supabase and provides
 * a UI for executing various Supabase operations.
 */

import { useState, useEffect } from 'react';
import supabase, { getConnectionStatus, executeQuery, select, insert } from '../utils/supabase-client';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState({ status: 'checking', message: 'Checking connection...' });
  const [queryResult, setQueryResult] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('SELECT version();');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testTableCreated, setTestTableCreated] = useState(false);

  // Check connection status on component mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Check connection to Supabase
  const checkConnection = async () => {
    try {
      setConnectionStatus({ status: 'checking', message: 'Checking connection...' });
      const status = await getConnectionStatus();
      
      if (status.connected) {
        setConnectionStatus({ status: 'connected', message: status.message });
      } else {
        setConnectionStatus({ status: 'error', message: status.message });
      }
    } catch (error) {
      console.error('Connection check error:', error);
      setConnectionStatus({ status: 'error', message: `Connection error: ${error.message}` });
    }
  };

  // Execute SQL query
  const runQuery = async () => {
    setError(null);
    setLoading(true);
    
    try {
      let result;
      
      if (sqlQuery.trim().toLowerCase().startsWith('select')) {
        // For SELECT queries, use the supabase.rpc method
        const { data, error } = await supabase.rpc('execute_sql', {
          query_text: sqlQuery
        });
        
        if (error) throw error;
        result = data;
      } else {
        // For other queries, use the custom executeQuery function
        result = await executeQuery(sqlQuery);
      }
      
      setQueryResult(result);
    } catch (error) {
      console.error('Query execution error:', error);
      setError(`Failed to execute query: ${error.message}`);
      setQueryResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Create a test table
  const createTestTable = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS public.test_handyman_services (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          hourly_rate DECIMAL(10,2),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      await executeQuery(createTableQuery);
      setTestTableCreated(true);
      setQueryResult({ message: 'Test table created successfully!' });
    } catch (error) {
      console.error('Create table error:', error);
      setError(`Failed to create test table: ${error.message}`);
      
      // If the error is about execute_sql function not existing, provide alternative
      if (error.message.includes('function') && error.message.includes('execute_sql')) {
        setError(`The 'execute_sql' function doesn't exist in your Supabase database. 
                 Try using the native Supabase client methods instead.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Insert test data
  const insertTestData = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const testData = [
        { name: 'Plumbing Services', description: 'Professional plumbing repairs and installations', hourly_rate: 75.00 },
        { name: 'Electrical Work', description: 'Electrical repairs and installations', hourly_rate: 85.00 },
        { name: 'Carpentry', description: 'Custom woodworking and repairs', hourly_rate: 65.00 }
      ];
      
      const result = await insert('test_handyman_services', testData);
      setQueryResult({ message: 'Test data inserted successfully!', data: result });
    } catch (error) {
      console.error('Insert data error:', error);
      setError(`Failed to insert test data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Query test data
  const queryTestData = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await select('test_handyman_services');
      setQueryResult(result);
    } catch (error) {
      console.error('Query test data error:', error);
      setError(`Failed to query test data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Supabase Direct Connection Test</h1>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Connection Status</h2>
        <div className={`flex items-center ${
          connectionStatus.status === 'connected' ? 'text-green-600' : 
          connectionStatus.status === 'error' ? 'text-red-600' : 'text-yellow-600'
        }`}>
          <div className={`w-3 h-3 rounded-full mr-2 ${
            connectionStatus.status === 'connected' ? 'bg-green-600' : 
            connectionStatus.status === 'error' ? 'bg-red-600' : 'bg-yellow-600'
          }`}></div>
          <span>{connectionStatus.message}</span>
        </div>
        <button 
          onClick={checkConnection}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh Connection Status
        </button>
      </div>
      
      {/* SQL Query Execution */}
      <div className="mb-6 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Execute SQL Query</h2>
        <textarea
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="w-full h-32 p-2 border rounded mb-2 font-mono"
          placeholder="Enter SQL query here..."
        />
        <button 
          onClick={runQuery}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading ? 'Executing...' : 'Execute Query'}
        </button>
      </div>
      
      {/* Test Operations */}
      <div className="mb-6 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Test Operations</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={createTestTable}
            disabled={loading || testTableCreated}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:bg-green-300"
          >
            Create Test Table
          </button>
          <button 
            onClick={insertTestData}
            disabled={loading || !testTableCreated}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:bg-purple-300"
          >
            Insert Test Data
          </button>
          <button 
            onClick={queryTestData}
            disabled={loading || !testTableCreated}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:bg-indigo-300"
          >
            Query Test Data
          </button>
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
          <h3 className="font-semibold">Error</h3>
          <p className="whitespace-pre-line">{error}</p>
        </div>
      )}
      
      {/* Results Display */}
      {queryResult && (
        <div className="p-4 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Query Results</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(queryResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
