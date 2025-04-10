/**
 * Supabase Test Page
 * 
 * This page provides a UI for testing the direct connection to Supabase.
 * It allows users to check connection status, execute SQL queries, and create test tables.
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/SupabaseTest.module.css';

export default function SupabaseTestPage() {
  // State variables
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [statusDetails, setStatusDetails] = useState({});
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM test-delete LIMIT 10');
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableSchema, setTableSchema] = useState({
    id: 'serial primary key',
    name: 'text not null',
    email: 'text',
    created_at: 'timestamp with time zone default now()'
  });
  const [tableName, setTableName] = useState('test_table');

  // Check connection status on component mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Function to check Supabase connection status
  const checkConnectionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/supabase/status');
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      
      setConnectionStatus(data.status === 'ok' ? 'Connected' : 'Error');
      setStatusDetails(data);
    } catch (err) {
      console.error('Error checking connection status:', err);
      setConnectionStatus('Error');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to execute SQL query
  const executeQuery = async () => {
    try {
      setLoading(true);
      setError(null);
      setQueryResult(null);
      
      const response = await fetch('/api/supabase/execute-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sqlQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      setQueryResult(data);
    } catch (err) {
      console.error('Error executing query:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a test table
  const createTestTable = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Generate CREATE TABLE SQL statement
      const columns = Object.entries(tableSchema)
        .map(([name, type]) => `${name} ${type}`)
        .join(', ');
      
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
      
      setSqlQuery(createTableQuery);
      
      const response = await fetch('/api/supabase/execute-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: createTableQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      setQueryResult(data);
    } catch (err) {
      console.error('Error creating test table:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new column to the schema
  const addSchemaColumn = () => {
    setTableSchema({
      ...tableSchema,
      [`column_${Object.keys(tableSchema).length}`]: 'text'
    });
  };

  // Function to update a schema column
  const updateSchemaColumn = (key, value, type) => {
    const newSchema = { ...tableSchema };
    
    if (type === 'name') {
      // Rename the key
      const val = newSchema[key];
      delete newSchema[key];
      newSchema[value] = val;
    } else {
      // Update the value
      newSchema[key] = value;
    }
    
    setTableSchema(newSchema);
  };

  // Function to remove a schema column
  const removeSchemaColumn = (key) => {
    const newSchema = { ...tableSchema };
    delete newSchema[key];
    setTableSchema(newSchema);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Supabase Direct Connection Test</title>
        <meta name="description" content="Test direct connection to Supabase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Supabase Direct Connection Test</h1>
        
        <div className={styles.card}>
          <h2>Connection Status</h2>
          <div className={styles.statusContainer}>
            <div className={styles.statusIndicator}>
              <span 
                className={`${styles.statusDot} ${
                  connectionStatus === 'Connected' 
                    ? styles.statusGreen 
                    : connectionStatus === 'Error' 
                      ? styles.statusRed 
                      : styles.statusYellow
                }`}
              ></span>
              <span>{connectionStatus}</span>
            </div>
            <button 
              className={styles.button} 
              onClick={checkConnectionStatus}
              disabled={loading}
            >
              Refresh Status
            </button>
          </div>
          
          {statusDetails && (
            <div className={styles.details}>
              <h3>Status Details</h3>
              <pre>{JSON.stringify(statusDetails, null, 2)}</pre>
            </div>
          )}
        </div>
        
        <div className={styles.card}>
          <h2>Execute SQL Query</h2>
          <div className={styles.queryContainer}>
            <textarea
              className={styles.queryInput}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              rows={5}
              placeholder="Enter SQL query here..."
            />
            <button 
              className={styles.button} 
              onClick={executeQuery}
              disabled={loading}
            >
              Execute Query
            </button>
          </div>
          
          {queryResult && (
            <div className={styles.results}>
              <h3>Query Results</h3>
              <pre>{JSON.stringify(queryResult, null, 2)}</pre>
              
              {queryResult.data && Array.isArray(queryResult.data) && queryResult.data.length > 0 && (
                <div className={styles.tableContainer}>
                  <table className={styles.resultsTable}>
                    <thead>
                      <tr>
                        {Object.keys(queryResult.data[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.data.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((value, j) => (
                            <td key={j}>
                              {typeof value === 'object' ? JSON.stringify(value) : value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className={styles.card}>
          <h2>Create Test Table</h2>
          <div className={styles.tableNameContainer}>
            <label htmlFor="tableName">Table Name:</label>
            <input
              id="tableName"
              className={styles.input}
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name..."
            />
          </div>
          
          <div className={styles.schemaContainer}>
            <h3>Table Schema</h3>
            {Object.entries(tableSchema).map(([key, value]) => (
              <div key={key} className={styles.schemaRow}>
                <input
                  className={styles.input}
                  value={key}
                  onChange={(e) => updateSchemaColumn(key, e.target.value, 'name')}
                  placeholder="Column name"
                />
                <input
                  className={styles.input}
                  value={value}
                  onChange={(e) => updateSchemaColumn(key, e.target.value, 'type')}
                  placeholder="Column type"
                />
                <button 
                  className={styles.removeButton}
                  onClick={() => removeSchemaColumn(key)}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className={styles.schemaButtons}>
              <button 
                className={styles.button}
                onClick={addSchemaColumn}
              >
                Add Column
              </button>
              <button 
                className={styles.button}
                onClick={createTestTable}
                disabled={loading}
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className={styles.error}>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
