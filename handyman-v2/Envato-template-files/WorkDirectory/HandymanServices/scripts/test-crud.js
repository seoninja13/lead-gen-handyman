/**
 * CRUD Test Script for Supabase
 * 
 * This script tests all CRUD operations on the test-delete table.
 * Each operation is tested separately and results are logged.
 */

import fetch from 'node-fetch';

async function executeSQL(query) {
  const response = await fetch('http://localhost:3002/api/supabase/execute-sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.text(); // Read as text first for better debugging
    let errorMessage = `Failed to execute SQL (Status: ${response.status})`;
    try {
        const errorJson = JSON.parse(errorData);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch (e) {
        // If parsing fails, use the raw text
        errorMessage += `: ${errorData}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

async function testCRUD() {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting CRUD tests...\n`);

  try {
    // Test 0: CREATE TABLE - Ensure table exists
    console.log(`[${new Date().toISOString()}] Test 0: CREATE TABLE - Sending request...`);
    const start = Date.now();
    try {
      await executeSQL(`
        CREATE TABLE IF NOT EXISTS "test-delete" (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT
        )
      `);
      const end = Date.now();
      console.log(`[${new Date().toISOString()}] Test 0: CREATE TABLE - Success. Table created or already exists. (Took ${end - start}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 0: CREATE TABLE - Error:`, error.message);
    }

    // Test 1: SELECT - Get current data
    console.log(`[${new Date().toISOString()}] Test 1: SELECT - Sending request...`);
    const start1 = Date.now();
    try {
      const result = await executeSQL('SELECT * FROM "test-delete"');
      const end1 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 1: SELECT - Success. Current data:`, result || [], `(Took ${end1 - start1}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 1: SELECT - Error:`, error.message);
    }

    // Test 2: INSERT - Add new records
    console.log(`[${new Date().toISOString()}] Test 2: INSERT - Sending request...`);
    const start2 = Date.now();
    try {
      const result = await executeSQL(`
        INSERT INTO "test-delete" (name, email) 
        VALUES 
          ('Test User 1', 'test1@example.com'),
          ('Test User 2', 'test2@example.com')
        RETURNING *
      `);
      const end2 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 2: INSERT - Success. Inserted data:`, result || [], `(Took ${end2 - start2}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 2: INSERT - Error:`, error.message);
    }

    // Test 3: SELECT - Verify insertion
    console.log(`[${new Date().toISOString()}] Test 3: SELECT after INSERT - Sending request...`);
    const start3 = Date.now();
    try {
      const result = await executeSQL(`
        SELECT * FROM "test-delete"
        ORDER BY id DESC
        LIMIT 5
      `);
      const end3 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 3: SELECT after INSERT - Success. Latest 5 records:`, result || [], `(Took ${end3 - start3}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 3: SELECT after INSERT - Error:`, error.message);
    }

    // Test 4: UPDATE - Modify a record
    console.log(`[${new Date().toISOString()}] Test 4: UPDATE - Sending request...`);
    const start4 = Date.now();
    try {
      const result = await executeSQL(`
        UPDATE "test-delete"
        SET name = 'Updated Name', email = 'updated@example.com'
        WHERE email IN ('test1@example.com', 'test2@example.com')
        RETURNING *
      `);
      const end4 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 4: UPDATE - Success. Updated records:`, result || [], `(Took ${end4 - start4}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 4: UPDATE - Error:`, error.message);
    }

    // Test 5: SELECT - Verify update
    console.log(`[${new Date().toISOString()}] Test 5: SELECT after UPDATE - Sending request...`);
    const start5 = Date.now();
    try {
      const result = await executeSQL(`
        SELECT * FROM "test-delete"
        WHERE email = 'updated@example.com'
      `);
      const end5 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 5: SELECT after UPDATE - Success. Verified update:`, result || [], `(Took ${end5 - start5}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 5: SELECT after UPDATE - Error:`, error.message);
    }

    // Test 6: DELETE - Remove test records
    console.log(`[${new Date().toISOString()}] Test 6: DELETE - Sending request...`);
    const start6 = Date.now();
    try {
      const result = await executeSQL(`
        DELETE FROM "test-delete"
        WHERE email IN ('test1@example.com', 'test2@example.com', 'updated@example.com')
        RETURNING *
      `);
      const end6 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 6: DELETE - Success. Deleted records:`, result || [], `(Took ${end6 - start6}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 6: DELETE - Error:`, error.message);
    }

    // Test 7: SELECT - Final verification
    console.log(`[${new Date().toISOString()}] Test 7: Final SELECT - Sending request...`);
    const start7 = Date.now();
    try {
      const result = await executeSQL(`
        SELECT * FROM "test-delete"
        ORDER BY id DESC
        LIMIT 5
      `);
      const end7 = Date.now();
      console.log(`[${new Date().toISOString()}] Test 7: Final SELECT - Success. Final data state:`, result || [], `(Took ${end7 - start7}ms)\n`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test 7: Final SELECT - Error:`, error.message);
    }

    const endTime = Date.now();
    console.log(`[${new Date().toISOString()}] All tests completed in ${(endTime - startTime) / 1000} seconds.`);

  } catch (error) {
    const endTime = Date.now();
    console.error(`[${new Date().toISOString()}] Error during CRUD tests after ${(endTime - startTime) / 1000} seconds:`, error);
  }
}

// Run the tests
testCRUD();
