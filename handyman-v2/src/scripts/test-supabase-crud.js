/**
 * Test Supabase CRUD Operations
 * 
 * This script tests the CRUD (Create, Read, Update, Delete) operations
 * for the Supabase database through the MCP API.
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Import MCP configuration
import { MCP_ENDPOINTS, getMcpRequestOptions } from '../config/mcp-config.js';

// API key from environment variables
const API_KEY = process.env.MCP_API_KEY || 'test-api-key';
const API_KEY_HEADER = 'x-api-key';

// Test data
const TEST_TABLE = 'test_items';
const TEST_ITEM = {
  name: 'Test Item',
  description: 'This is a test item created by the CRUD test script',
  created_at: new Date().toISOString()
};

// Store test item ID
let testItemId;

/**
 * Create the test table if it doesn't exist
 */
async function setupTestTable() {
  console.log('\n--- Setting Up Test Table ---');
  
  try {
    // Check if the table exists
    const checkTableSql = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = '${TEST_TABLE}'
      );
    `;
    
    const checkResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: checkTableSql }));
    
    if (!checkResponse.ok) {
      throw new Error(`HTTP error! Status: ${checkResponse.status}`);
    }
    
    const checkResult = await checkResponse.json();
    const tableExists = checkResult.rows && checkResult.rows[0] && checkResult.rows[0].exists;
    
    if (tableExists) {
      console.log(`✅ Test table '${TEST_TABLE}' already exists`);
      return true;
    }
    
    // Create the table
    const createTableSql = `
      CREATE TABLE ${TEST_TABLE} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const createResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: createTableSql }));
    
    if (!createResponse.ok) {
      throw new Error(`HTTP error! Status: ${createResponse.status}`);
    }
    
    console.log(`✅ Created test table '${TEST_TABLE}'`);
    return true;
  } catch (error) {
    console.error('❌ Error setting up test table:', error.message);
    return false;
  }
}

/**
 * Test the CREATE operation
 */
async function testCreate() {
  console.log('\n--- Testing CREATE Operation ---');
  
  try {
    // Test using direct SQL
    console.log('Testing CREATE with direct SQL...');
    
    const insertSql = `
      INSERT INTO ${TEST_TABLE} (name, description, created_at)
      VALUES ('${TEST_ITEM.name}', '${TEST_ITEM.description}', '${TEST_ITEM.created_at}')
      RETURNING *;
    `;
    
    const sqlResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({ sql: insertSql }),
    });
    
    if (!sqlResponse.ok) {
      throw new Error(`SQL INSERT failed: ${sqlResponse.status} ${sqlResponse.statusText}`);
    }
    
    const sqlResult = await sqlResponse.json();
    console.log('SQL INSERT result:', sqlResult.rows[0]);
    
    // Test using CRUD API
    console.log('Testing CREATE with CRUD API...');
    
    const crudResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'INSERT',
        table: TEST_TABLE,
        data: {
          name: 'CRUD API Test Item',
          description: 'This item was created using the CRUD API',
          created_at: new Date().toISOString()
        }
      }),
    });
    
    if (!crudResponse.ok) {
      throw new Error(`CRUD INSERT failed: ${crudResponse.status} ${crudResponse.statusText}`);
    }
    
    const crudResult = await crudResponse.json();
    console.log('CRUD INSERT result:', crudResult.rows[0]);
    
    // Save the ID for later tests
    testItemId = crudResult.rows[0].id;
    
    console.log('✅ CREATE operations successful!');
    return true;
  } catch (error) {
    console.error('❌ Error testing CREATE operation:', error.message);
    return false;
  }
}

/**
 * Test the READ operation
 */
async function testRead() {
  console.log('\n--- Testing READ Operation ---');
  
  try {
    // Test using direct SQL
    console.log('Testing READ with direct SQL...');
    
    const selectSql = `
      SELECT * FROM ${TEST_TABLE}
      ORDER BY created_at DESC
      LIMIT 5;
    `;
    
    const sqlResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({ sql: selectSql }),
    });
    
    if (!sqlResponse.ok) {
      throw new Error(`SQL SELECT failed: ${sqlResponse.status} ${sqlResponse.statusText}`);
    }
    
    const sqlResult = await sqlResponse.json();
    console.log(`SQL SELECT found ${sqlResult.rows.length} items`);
    
    // Test using CRUD API
    console.log('Testing READ with CRUD API...');
    
    const crudResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'SELECT',
        table: TEST_TABLE,
        fields: '*',
        orderBy: 'created_at',
        orderDir: 'DESC',
        limit: 5
      }),
    });
    
    if (!crudResponse.ok) {
      throw new Error(`CRUD SELECT failed: ${crudResponse.status} ${crudResponse.statusText}`);
    }
    
    const crudResult = await crudResponse.json();
    console.log(`CRUD SELECT found ${crudResult.rows.length} items`);
    
    // Test reading a specific item
    if (testItemId) {
      console.log(`Testing READ for specific item (ID: ${testItemId})...`);
      
      const specificResponse = await fetch('/api/mcp/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: API_KEY
        },
        body: JSON.stringify({
          operation: 'SELECT',
          table: TEST_TABLE,
          where: { id: testItemId }
        }),
      });
      
      if (!specificResponse.ok) {
        throw new Error(`Specific item SELECT failed: ${specificResponse.status} ${specificResponse.statusText}`);
      }
      
      const specificResult = await specificResponse.json();
      
      if (specificResult.rows.length === 0) {
        throw new Error(`Item with ID ${testItemId} not found`);
      }
      
      console.log('Specific item found:', specificResult.rows[0]);
    }
    
    console.log('✅ READ operations successful!');
    return true;
  } catch (error) {
    console.error('❌ Error testing READ operation:', error.message);
    return false;
  }
}

/**
 * Test the UPDATE operation
 */
async function testUpdate() {
  console.log('\n--- Testing UPDATE Operation ---');
  
  try {
    if (!testItemId) {
      throw new Error('No test item ID available for UPDATE test');
    }
    
    // Test using direct SQL
    console.log('Testing UPDATE with direct SQL...');
    
    const updateSql = `
      UPDATE ${TEST_TABLE}
      SET 
        description = 'This description was updated with SQL',
        updated_at = NOW()
      WHERE id = ${testItemId}
      RETURNING *;
    `;
    
    const sqlResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({ sql: updateSql }),
    });
    
    if (!sqlResponse.ok) {
      throw new Error(`SQL UPDATE failed: ${sqlResponse.status} ${sqlResponse.statusText}`);
    }
    
    const sqlResult = await sqlResponse.json();
    console.log('SQL UPDATE result:', sqlResult.rows[0]);
    
    // Test using CRUD API
    console.log('Testing UPDATE with CRUD API...');
    
    const crudResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'UPDATE',
        table: TEST_TABLE,
        data: {
          description: 'This description was updated with the CRUD API',
          status: 'updated',
          updated_at: new Date().toISOString()
        },
        where: { id: testItemId }
      }),
    });
    
    if (!crudResponse.ok) {
      throw new Error(`CRUD UPDATE failed: ${crudResponse.status} ${crudResponse.statusText}`);
    }
    
    const crudResult = await crudResponse.json();
    console.log('CRUD UPDATE result:', crudResult.rows[0]);
    
    console.log('✅ UPDATE operations successful!');
    return true;
  } catch (error) {
    console.error('❌ Error testing UPDATE operation:', error.message);
    return false;
  }
}

/**
 * Test the DELETE operation
 */
async function testDelete() {
  console.log('\n--- Testing DELETE Operation ---');
  
  try {
    if (!testItemId) {
      throw new Error('No test item ID available for DELETE test');
    }
    
    // Create a new item to delete
    console.log('Creating a new item to delete...');
    
    const createResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'INSERT',
        table: TEST_TABLE,
        data: {
          name: 'Item to Delete',
          description: 'This item will be deleted',
          created_at: new Date().toISOString()
        }
      }),
    });
    
    if (!createResponse.ok) {
      throw new Error(`Failed to create item for deletion: ${createResponse.status} ${createResponse.statusText}`);
    }
    
    const createResult = await createResponse.json();
    const deleteItemId = createResult.rows[0].id;
    
    console.log(`Created item with ID ${deleteItemId} for deletion`);
    
    // Test using direct SQL
    console.log('Testing DELETE with direct SQL...');
    
    const deleteSql = `
      DELETE FROM ${TEST_TABLE}
      WHERE id = ${deleteItemId}
      RETURNING *;
    `;
    
    const sqlResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({ sql: deleteSql }),
    });
    
    if (!sqlResponse.ok) {
      throw new Error(`SQL DELETE failed: ${sqlResponse.status} ${sqlResponse.statusText}`);
    }
    
    const sqlResult = await sqlResponse.json();
    console.log('SQL DELETE result:', sqlResult.rows[0]);
    
    // Create another item to delete with the CRUD API
    console.log('Creating another item to delete with CRUD API...');
    
    const createResponse2 = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'INSERT',
        table: TEST_TABLE,
        data: {
          name: 'CRUD Delete Item',
          description: 'This item will be deleted with the CRUD API',
          created_at: new Date().toISOString()
        }
      }),
    });
    
    if (!createResponse2.ok) {
      throw new Error(`Failed to create item for CRUD deletion: ${createResponse2.status} ${createResponse2.statusText}`);
    }
    
    const createResult2 = await createResponse2.json();
    const crudDeleteItemId = createResult2.rows[0].id;
    
    console.log(`Created item with ID ${crudDeleteItemId} for CRUD deletion`);
    
    // Test using CRUD API
    console.log('Testing DELETE with CRUD API...');
    
    const crudResponse = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: API_KEY
      },
      body: JSON.stringify({
        operation: 'DELETE',
        table: TEST_TABLE,
        where: { id: crudDeleteItemId },
        confirmDelete: true
      }),
    });
    
    if (!crudResponse.ok) {
      throw new Error(`CRUD DELETE failed: ${crudResponse.status} ${crudResponse.statusText}`);
    }
    
    const crudResult = await crudResponse.json();
    console.log('CRUD DELETE result:', crudResult.rows[0]);
    
    console.log('✅ DELETE operations successful!');
    return true;
  } catch (error) {
    console.error('❌ Error testing DELETE operation:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('=== Supabase CRUD Tests ===');
  console.log('Testing CRUD operations through the MCP API...');
  
  // Setup the test table
  const setupResult = await setupTestTable();
  
  if (!setupResult) {
    console.error('❌ Failed to set up test table. Aborting tests.');
    process.exit(1);
  }
  
  // Test CREATE operation
  const createResult = await testCreate();
  
  // Test READ operation
  const readResult = await testRead();
  
  // Test UPDATE operation
  const updateResult = await testUpdate();
  
  // Test DELETE operation
  const deleteResult = await testDelete();
  
  // Print summary
  console.log('\n=== Test Summary ===');
  console.log(`Setup Test Table: ${setupResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`CREATE Operations: ${createResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`READ Operations: ${readResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`UPDATE Operations: ${updateResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`DELETE Operations: ${deleteResult ? '✅ PASS' : '❌ FAIL'}`);
  
  if (setupResult && createResult && readResult && updateResult && deleteResult) {
    console.log('\n🎉 All tests passed! Supabase CRUD operations are working correctly.');
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run the tests
runTests();
