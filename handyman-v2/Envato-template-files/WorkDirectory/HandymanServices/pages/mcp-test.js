import React, { useState } from 'react';
import Head from 'next/head';

/**
 * MCP Test Page
 * 
 * This page provides a direct interface to test the Supabase MCP server.
 */
export default function MCPTestPage() {
  // State for Supabase MCP test
  const [mcpSqlQuery, setMcpSqlQuery] = useState("SELECT tablename FROM pg_tables WHERE schemaname = 'public';");
  const [mcpResult, setMcpResult] = useState(null);
  const [mcpLoading, setMcpLoading] = useState(false);
  const [mcpError, setMcpError] = useState(null);

  /**
   * Execute a SQL query via Supabase MCP server
   */
  const executeSupabaseMCP = async () => {
    try {
      setMcpLoading(true);
      setMcpError(null);
      setMcpResult(null);

      // Call the MCP server directly
      const response = await fetch('http://localhost:8888/mcp3_execute_postgresql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: mcpSqlQuery
        })
      });

      const data = await response.json();
      setMcpResult(data);
    } catch (error) {
      console.error('Error executing Supabase MCP query:', error);
      setMcpError(error.message || 'Failed to execute SQL query via MCP server');
    } finally {
      setMcpLoading(false);
    }
  };

  /**
   * Set example MCP SQL queries
   */
  const setExampleMcpQuery = (queryType) => {
    switch (queryType) {
      case 'list_tables':
        setMcpSqlQuery("SELECT tablename FROM pg_tables WHERE schemaname = 'public';");
        break;
      case 'table_info':
        setMcpSqlQuery(`SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'places';`);
        break;
      case 'count_records':
        setMcpSqlQuery("SELECT COUNT(*) FROM places;");
        break;
      default:
        setMcpSqlQuery("SELECT tablename FROM pg_tables WHERE schemaname = 'public';");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>MCP Test Page</title>
      </Head>
      
      <h1 className="text-4xl font-bold mb-8">Supabase MCP Server Test</h1>
      
      {/* Supabase MCP Server Test */}
      <div className="mb-12 p-6 border rounded-lg shadow-md bg-purple-50">
        <h2 className="text-2xl font-semibold mb-4">SQL Query Execution</h2>
        <p className="mb-4">
          Test the Supabase MCP server by executing SQL queries directly.
        </p>
        
        <form onSubmit={(e) => { e.preventDefault(); executeSupabaseMCP(); }}>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">SQL Query:</label>
              <div className="space-x-2">
                <button 
                  type="button"
                  onClick={() => setExampleMcpQuery('list_tables')}
                  className="px-3 py-1 bg-purple-200 text-purple-800 rounded hover:bg-purple-300"
                >
                  List Tables
                </button>
                <button 
                  type="button"
                  onClick={() => setExampleMcpQuery('table_info')}
                  className="px-3 py-1 bg-purple-200 text-purple-800 rounded hover:bg-purple-300"
                >
                  Table Info
                </button>
                <button 
                  type="button"
                  onClick={() => setExampleMcpQuery('count_records')}
                  className="px-3 py-1 bg-purple-200 text-purple-800 rounded hover:bg-purple-300"
                >
                  Count Records
                </button>
              </div>
            </div>
            <textarea 
              value={mcpSqlQuery} 
              onChange={(e) => setMcpSqlQuery(e.target.value)}
              className="w-full p-3 border rounded font-mono text-sm"
              rows="5"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={mcpLoading}
            className={`w-full p-3 rounded text-white font-medium ${
              mcpLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
            } transition`}
          >
            {mcpLoading ? 'Executing...' : 'Execute SQL via Supabase MCP'}
          </button>
        </form>

        {/* Supabase MCP Results */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Results:</h3>
          {mcpError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p><strong>Error:</strong> {mcpError}</p>
            </div>
          )}
          {mcpLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          )}
          {!mcpLoading && mcpResult && (
            <div>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 text-sm">
                {JSON.stringify(mcpResult, null, 2)}
              </pre>
            </div>
          )}
          {!mcpLoading && !mcpResult && !mcpError && (
            <p className="text-gray-500 text-center p-6">
              Execute a SQL query via Supabase MCP server to see results
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
