import { useState } from 'react';
import Head from 'next/head';

const TestSupabase = () => {
  const [query, setQuery] = useState('SELECT * FROM "test-delete" LIMIT 10');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/api/supabase/execute-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTable = async () => {
    setQuery('CREATE TABLE IF NOT EXISTS "test-delete" (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT, price DECIMAL(10,2))');
  };

  const insertData = async () => {
    setQuery(`INSERT INTO "test-delete" (name, description, price) VALUES 
      ('Quick Fix Handyman', 'Professional electrical services', 75), 
      ('Pro Plumbing Solutions', 'Expert plumbing services', 85), 
      ('Master Carpentry', 'Custom carpentry work', 90), 
      ('Perfect Paint Pro', 'Interior and exterior painting', 65), 
      ('Floor Masters', 'Professional flooring installation', 70),
      ('HVAC Experts', 'Heating and cooling services', 95),
      ('Drywall Specialists', 'Drywall installation and repair', 60),
      ('Appliance Repair Pros', 'Appliance repair and maintenance', 80),
      ('Roofing Solutions', 'Roof repair and installation', 100),
      ('Lawn & Garden Care', 'Landscaping and garden maintenance', 55)`);
  };

  const selectData = async () => {
    setQuery('SELECT * FROM "test-delete" LIMIT 10');
  };

  return (
    <>
      <Head>
        <title>Supabase Test</title>
      </Head>
      
      <div className="container py-5">
        <h1 className="mb-4">Supabase SQL Test</h1>
        
        <div className="mb-4">
          <div className="btn-group mb-3">
            <button className="btn btn-outline-primary" onClick={createTable}>Create Table</button>
            <button className="btn btn-outline-success" onClick={insertData}>Insert Data</button>
            <button className="btn btn-outline-info" onClick={selectData}>Select Data</button>
          </div>
          
          <div className="form-group">
            <label htmlFor="sqlQuery" className="form-label">SQL Query:</label>
            <textarea 
              id="sqlQuery"
              className="form-control font-monospace" 
              rows="5" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <button 
            className="btn btn-primary mt-2" 
            onClick={executeQuery} 
            disabled={loading}
          >
            {loading ? 'Executing...' : 'Execute Query'}
          </button>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            <h5>Error:</h5>
            <pre className="mb-0">{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {result && (
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Result</h5>
            </div>
            <div className="card-body">
              <pre className="mb-0">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestSupabase;
