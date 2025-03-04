/**
 * MCP Demo Page
 * 
 * This page demonstrates the use of the Model Context Protocol (MCP)
 * for interacting with Supabase and Google Places API.
 */

import React, { useState } from 'react';
import PlacesSearchMcp from '../components/mcp/PlacesSearchMcp';
import { executeMcpQuery } from '../utils/mcp-helpers';
import { PlaceData } from '../lib/google-places-client';

const McpDemoPage: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM places LIMIT 10');
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);

  /**
   * Execute a SQL query using the Supabase MCP server
   */
  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) {
      setError('Please enter a SQL query');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await executeMcpQuery(sqlQuery);
      setQueryResults(results);
      
      if (results.length === 0) {
        setError('No results found');
      }
    } catch (err: any) {
      console.error('Error executing query:', err);
      setError(`Error executing query: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle place selection from the Places Search component
   */
  const handleSelectPlace = (place: PlaceData) => {
    setSelectedPlace(place);
    
    // Update the SQL query to show the selected place in the database
    setSqlQuery(`SELECT * FROM places WHERE place_id = '${place.place_id}'`);
  };

  return (
    <div className="mcp-demo-page">
      <h1>Model Context Protocol (MCP) Demo</h1>
      
      <div className="demo-section">
        <h2>Google Places API (MCP)</h2>
        <p>
          This demo uses the Google Places API through the MCP server to search for places
          and retrieve place details.
        </p>
        
        <PlacesSearchMcp onSelectPlace={handleSelectPlace} />
      </div>
      
      <div className="demo-section">
        <h2>Supabase Database (MCP)</h2>
        <p>
          This demo uses the Supabase MCP server to execute SQL queries directly against
          the database.
        </p>
        
        <div className="sql-query-form">
          <div className="form-group">
            <label htmlFor="sql-query">SQL Query:</label>
            <textarea
              id="sql-query"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              rows={4}
              className="sql-textarea"
            />
          </div>
          
          <button
            onClick={handleExecuteQuery}
            className="execute-button"
            disabled={loading}
          >
            {loading ? 'Executing...' : 'Execute Query'}
          </button>
          
          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>
        
        {queryResults && (
          <div className="query-results">
            <h3>Query Results ({queryResults.length} rows)</h3>
            
            {queryResults.length > 0 ? (
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      {Object.keys(queryResults[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResults.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((value: any, colIndex) => (
                          <td key={colIndex}>
                            {value === null ? (
                              <span className="null-value">NULL</span>
                            ) : typeof value === 'object' ? (
                              JSON.stringify(value)
                            ) : (
                              String(value)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .mcp-demo-page {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h1 {
          color: #333;
          margin-bottom: 30px;
        }
        
        .demo-section {
          margin-bottom: 50px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        
        h2 {
          color: #0070f3;
          margin-top: 0;
        }
        
        p {
          color: #666;
          margin-bottom: 20px;
        }
        
        .sql-query-form {
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .sql-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: monospace;
          font-size: 14px;
        }
        
        .execute-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .execute-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .error-message {
          color: #e53e3e;
          margin-top: 10px;
        }
        
        .query-results {
          margin-top: 30px;
        }
        
        .results-table-container {
          overflow-x: auto;
          margin-top: 15px;
        }
        
        .results-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        
        .results-table th,
        .results-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ddd;
        }
        
        .results-table th {
          background-color: #f1f1f1;
          font-weight: bold;
        }
        
        .results-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .null-value {
          color: #999;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default McpDemoPage;
