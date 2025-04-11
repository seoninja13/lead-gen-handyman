/**
 * Supabase Test Component
 * Tests direct SQL operations with Supabase
 */

import { useState, useEffect } from 'react';
import { getConnectionStatus, tableExists, createRecord, getRecords, updateRecord, deleteRecord } from '../utils/supabase-client';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState({ status: 'checking', message: 'Checking connection...' });
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testTableExists, setTestTableExists] = useState(false);

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
        // If connected, check if test table exists
        const exists = await tableExists('test-delete');
        setTestTableExists(exists);
      } else {
        setConnectionStatus({ status: 'error', message: status.message });
      }
    } catch (error) {
      console.error('Connection check error:', error);
      setConnectionStatus({ status: 'error', message: `Connection error: ${error.message}` });
    }
  };

  // Create test record
  const handleCreate = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await createRecord({
        name: 'Test Service',
        description: 'Test record created via direct SQL',
        price: 99.99
      });
      setQueryResult(result);
      await getLatestRecords();
    } catch (error) {
      console.error('Create error:', error);
      setError(`Create error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get all records
  const getLatestRecords = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const data = await getRecords();
      setQueryResult(data);
    } catch (error) {
      console.error('Read error:', error);
      setError(`Read error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update record
  const handleUpdate = async (id) => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await updateRecord(id, {
        name: `Updated Service ${new Date().toISOString()}`,
        description: 'Updated via direct SQL',
        price: Math.round(Math.random() * 100000) / 100
      });
      setQueryResult(result);
      await getLatestRecords();
    } catch (error) {
      console.error('Update error:', error);
      setError(`Update error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await deleteRecord(id);
      setQueryResult(result);
      await getLatestRecords();
    } catch (error) {
      console.error('Delete error:', error);
      setError(`Delete error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Direct SQL Test</h1>
      
      {/* Connection Status */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Connection Status:</h2>
        <p className={`${connectionStatus.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
          {connectionStatus.message}
        </p>
      </div>

      {/* Table Status */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Table Status:</h2>
        <p className={testTableExists ? 'text-green-600' : 'text-red-600'}>
          {testTableExists ? 'Table "test-delete" exists' : 'Table "test-delete" not found'}
        </p>
      </div>

      {/* CRUD Operations */}
      {testTableExists && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">CRUD Operations:</h2>
          <div className="space-x-2">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Create Record
            </button>
            <button
              onClick={getLatestRecords}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Read Records
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Results Display */}
      {queryResult && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Results:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(queryResult) ? (
                  queryResult.map((record) => (
                    <tr key={record.id}>
                      <td className="px-4 py-2 border">{record.id}</td>
                      <td className="px-4 py-2 border">{record.name}</td>
                      <td className="px-4 py-2 border">{record.description}</td>
                      <td className="px-4 py-2 border">${record.price.toFixed(2)}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleUpdate(record.id)}
                          disabled={loading}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          disabled={loading}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}
