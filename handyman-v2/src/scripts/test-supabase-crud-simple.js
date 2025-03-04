/**
 * Simple Test Script for Supabase CRUD Operations
 * 
 * This script tests the basic CRUD operations for Supabase through the MCP API.
 */

// Configuration
const MCP_SERVER_BASE_URL = process.env.MCP_SERVER_BASE_URL || 'http://localhost:3001';
const MCP_ENDPOINTS = {
  SUPABASE_QUERY: `${MCP_SERVER_BASE_URL}/mcp2_query`
};
const API_KEY = process.env.MCP_API_KEY || 'test-api-key';

// Test data
const TEST_TABLE = 'test_items';

// Helper function to get MCP request options
function getMcpRequestOptions(body) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(body)
  };
}

// Helper function to execute a query
async function executeQuery(sql) {
  try {
    const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Query error: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Create test table
async function createTestTable() {
  console.log('Creating test table...');
  
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS ${TEST_TABLE} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  
  try {
    await executeQuery(createTableSql);
    console.log(`✅ Test table '${TEST_TABLE}' created or already exists`);
    return true;
  } catch (error) {
    console.error('❌ Failed to create test table:', error);
    return false;
  }
}

// Insert test data
async function insertTestData() {
  console.log('Inserting test data...');
  
  const insertSql = `
    INSERT INTO ${TEST_TABLE} (name, description, created_at)
    VALUES ('Test Item', 'This is a test item', NOW())
    RETURNING *;
  `;
  
  try {
    const result = await executeQuery(insertSql);
    console.log('✅ Test data inserted:', result.rows[0]);
    return result.rows[0].id;
  } catch (error) {
    console.error('❌ Failed to insert test data:', error);
    return null;
  }
}

// Select test data
async function selectTestData(id) {
  console.log('Selecting test data...');
  
  const selectSql = id
    ? `SELECT * FROM ${TEST_TABLE} WHERE id = ${id};`
    : `SELECT * FROM ${TEST_TABLE} ORDER BY created_at DESC LIMIT 5;`;
  
  try {
    const result = await executeQuery(selectSql);
    console.log(`✅ Selected ${result.rows.length} rows`);
    result.rows.forEach(row => console.log(row));
    return true;
  } catch (error) {
    console.error('❌ Failed to select test data:', error);
    return false;
  }
}

// Update test data
async function updateTestData(id) {
  console.log('Updating test data...');
  
  const updateSql = `
    UPDATE ${TEST_TABLE}
    SET 
      description = 'This description was updated',
      status = 'updated',
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
  
  try {
    const result = await executeQuery(updateSql);
    console.log('✅ Test data updated:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Failed to update test data:', error);
    return false;
  }
}

// Delete test data
async function deleteTestData(id) {
  console.log('Deleting test data...');
  
  const deleteSql = `
    DELETE FROM ${TEST_TABLE}
    WHERE id = ${id}
    RETURNING *;
  `;
  
  try {
    const result = await executeQuery(deleteSql);
    console.log('✅ Test data deleted:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Failed to delete test data:', error);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('=== Supabase CRUD Tests ===');
  
  try {
    // Create test table
    const tableCreated = await createTestTable();
    if (!tableCreated) {
      throw new Error('Failed to create test table');
    }
    
    // Insert test data
    const testId = await insertTestData();
    if (!testId) {
      throw new Error('Failed to insert test data');
    }
    
    // Select test data
    const dataSelected = await selectTestData(testId);
    if (!dataSelected) {
      throw new Error('Failed to select test data');
    }
    
    // Update test data
    const dataUpdated = await updateTestData(testId);
    if (!dataUpdated) {
      throw new Error('Failed to update test data');
    }
    
    // Select updated data
    const updatedDataSelected = await selectTestData(testId);
    if (!updatedDataSelected) {
      throw new Error('Failed to select updated test data');
    }
    
    // Delete test data
    const dataDeleted = await deleteTestData(testId);
    if (!dataDeleted) {
      throw new Error('Failed to delete test data');
    }
    
    console.log('\n🎉 All tests passed! Supabase CRUD operations are working correctly.');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

// Import fetch for Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Run the tests
runTests();
