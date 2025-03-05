/**
 * Supabase Test Component
 * 
 * This component provides a UI for testing CRUD operations with Supabase via MCP.
 * It includes buttons for creating, reading, updating, and deleting place data.
 */

import React, { useState } from 'react';

/**
 * SupabaseTest Component
 * 
 * @returns {JSX.Element} Supabase Test component
 */
const SupabaseTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeOperation, setActiveOperation] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    lng: '',
    phone: '',
    website: '',
    rating: ''
  });
  const [operationHistory, setOperationHistory] = useState([]);

  /**
   * Add an operation to the history
   * 
   * @param {string} operation The operation type
   * @param {string} status The operation status
   * @param {Object} data The operation data
   * @param {string} errorMessage Optional error message
   */
  const addOperationToHistory = (operation, status, data, errorMessage = null) => {
    const timestamp = new Date().toISOString();
    setOperationHistory(prevHistory => [
      {
        id: Date.now(),
        operation,
        status,
        data,
        error: errorMessage,
        timestamp
      },
      ...prevHistory.slice(0, 9) // Keep only the last 10 operations
    ]);
  };

  /**
   * Handle form input changes
   * 
   * @param {Event} e The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Execute a SQL query via MCP
   * 
   * @param {string} sql The SQL query to execute
   * @returns {Promise<Object>} The query result
   */
  const executeQueryDirect = async (sql) => {
    const response = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  };

  /**
   * Create the places table if it doesn't exist
   */
  const createTable = async () => {
    setLoading(true);
    setError(null);
    setActiveOperation('create-table');
    
    try {
      const sql = `
        CREATE TABLE IF NOT EXISTS places (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          address TEXT,
          city TEXT,
          state TEXT,
          zip TEXT,
          lat NUMERIC,
          lng NUMERIC,
          phone TEXT,
          website TEXT,
          rating NUMERIC,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      const data = await executeQueryDirect(sql);
      setResult({
        operation: 'create-table',
        data
      });
      addOperationToHistory('Create Table', 'success', data);
    } catch (err) {
      console.error('Error creating table:', err);
      setError(err.message);
      addOperationToHistory('Create Table', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Insert a new place
   */
  const insertPlace = async () => {
    setLoading(true);
    setError(null);
    setActiveOperation('insert');
    
    try {
      if (!formData.name) {
        throw new Error('Name is required');
      }
      
      const sql = `
        INSERT INTO places (name, address, city, state, zip, lat, lng, phone, website, rating)
        VALUES (
          '${formData.name.replace(/'/g, "''")}',
          '${formData.address?.replace(/'/g, "''") || ''}',
          '${formData.city?.replace(/'/g, "''") || ''}',
          '${formData.state?.replace(/'/g, "''") || ''}',
          '${formData.zip?.replace(/'/g, "''") || ''}',
          ${formData.lat || 'NULL'},
          ${formData.lng || 'NULL'},
          '${formData.phone?.replace(/'/g, "''") || ''}',
          '${formData.website?.replace(/'/g, "''") || ''}',
          ${formData.rating || 'NULL'}
        )
        RETURNING *;
      `;
      
      const data = await executeQueryDirect(sql);
      setResult({
        operation: 'insert',
        data
      });
      addOperationToHistory('Insert', 'success', data);
    } catch (err) {
      console.error('Error inserting place:', err);
      setError(err.message);
      addOperationToHistory('Insert', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Query all places
   */
  const queryPlaces = async () => {
    setLoading(true);
    setError(null);
    setActiveOperation('query');
    
    try {
      const sql = `
        SELECT * FROM places
        ORDER BY created_at DESC
        LIMIT 10;
      `;
      
      const data = await executeQueryDirect(sql);
      setResult({
        operation: 'query',
        data
      });
      addOperationToHistory('Query', 'success', data);
    } catch (err) {
      console.error('Error querying places:', err);
      setError(err.message);
      addOperationToHistory('Query', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update a place
   */
  const updatePlace = async () => {
    setLoading(true);
    setError(null);
    setActiveOperation('update');
    
    try {
      if (!formData.id) {
        throw new Error('ID is required for update');
      }
      
      if (!formData.name) {
        throw new Error('Name is required');
      }
      
      const sql = `
        UPDATE places
        SET
          name = '${formData.name.replace(/'/g, "''")}',
          address = '${formData.address?.replace(/'/g, "''") || ''}',
          city = '${formData.city?.replace(/'/g, "''") || ''}',
          state = '${formData.state?.replace(/'/g, "''") || ''}',
          zip = '${formData.zip?.replace(/'/g, "''") || ''}',
          lat = ${formData.lat || 'NULL'},
          lng = ${formData.lng || 'NULL'},
          phone = '${formData.phone?.replace(/'/g, "''") || ''}',
          website = '${formData.website?.replace(/'/g, "''") || ''}',
          rating = ${formData.rating || 'NULL'},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${formData.id}
        RETURNING *;
      `;
      
      const data = await executeQueryDirect(sql);
      setResult({
        operation: 'update',
        data
      });
      addOperationToHistory('Update', 'success', data);
    } catch (err) {
      console.error('Error updating place:', err);
      setError(err.message);
      addOperationToHistory('Update', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a place
   */
  const deletePlace = async () => {
    setLoading(true);
    setError(null);
    setActiveOperation('delete');
    
    try {
      if (!formData.id) {
        throw new Error('ID is required for deletion');
      }
      
      const sql = `
        DELETE FROM places
        WHERE id = ${formData.id}
        RETURNING *;
      `;
      
      const data = await executeQueryDirect(sql);
      setResult({
        operation: 'delete',
        data
      });
      addOperationToHistory('Delete', 'success', data);
    } catch (err) {
      console.error('Error deleting place:', err);
      setError(err.message);
      addOperationToHistory('Delete', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear form data and results
   */
  const clearForm = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      lat: '',
      lng: '',
      phone: '',
      website: '',
      rating: ''
    });
    setResult(null);
    setError(null);
  };

  /**
   * Format timestamp for display
   * 
   * @param {string} timestamp ISO timestamp
   * @returns {string} Formatted time
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  /**
   * Get status badge class
   * 
   * @param {string} status The status value
   * @returns {string} CSS class for the badge
   */
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h5 className="mb-4">
          <i className="fas fa-database text-primary me-2"></i>
          Supabase CRUD Operations
        </h5>

        {/* Operation Controls */}
        <div className="mb-4">
          <div className="btn-group">
            <button
              className={`btn ${activeOperation === 'create-table' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={createTable}
              disabled={loading}
            >
              <i className="fas fa-table me-2"></i>
              Create Table
            </button>
            <button
              className={`btn ${activeOperation === 'query' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={queryPlaces}
              disabled={loading}
            >
              <i className="fas fa-search me-2"></i>
              Query Places
            </button>
          </div>
        </div>

        {/* Place Form */}
        <div className="card bg-light mb-4">
          <div className="card-body">
            <h6 className="mb-3">Place Details</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID (for update/delete)"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ZIP"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Latitude"
                  name="lat"
                  value={formData.lat}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Longitude"
                  name="lng"
                  value={formData.lng}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="btn-group">
                <button
                  className={`btn ${activeOperation === 'insert' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={insertPlace}
                  disabled={loading}
                >
                  <i className="fas fa-plus me-2"></i>
                  Insert
                </button>
                <button
                  className={`btn ${activeOperation === 'update' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={updatePlace}
                  disabled={loading}
                >
                  <i className="fas fa-edit me-2"></i>
                  Update
                </button>
                <button
                  className={`btn ${activeOperation === 'delete' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={deletePlace}
                  disabled={loading}
                >
                  <i className="fas fa-trash me-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status and Results */}
        {loading && (
          <div className="alert alert-info">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Running operation...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {result && !loading && !error && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            Operation completed successfully!
            <pre className="mt-3 bg-light p-3 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* Operation History */}
        {operationHistory.length > 0 && (
          <div className="mt-4">
            <h6 className="mb-3">
              <i className="fas fa-history text-primary me-2"></i>
              Operation History
            </h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Operation</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {operationHistory.map(op => (
                    <tr key={op.id}>
                      <td>{new Date(op.timestamp).toLocaleTimeString()}</td>
                      <td>{op.operation}</td>
                      <td>
                        <span className={`badge bg-${op.status === 'success' ? 'success' : 'danger'}`}>
                          {op.status}
                        </span>
                      </td>
                      <td>
                        {op.error ? (
                          <span className="text-danger">{op.error}</span>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setResult(op.data)}
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseTest;
