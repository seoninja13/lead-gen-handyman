/**
 * API Route for Testing Supabase CRUD Operations
 * 
 * This API route tests the CRUD operations for the Supabase database
 * through the MCP API.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../config/mcp-config';

// Test table name
const TEST_TABLE = 'test_items';

/**
 * Handle API requests to test Supabase CRUD operations
 * 
 * @param req The Next.js API request
 * @param res The Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results: Record<string, any> = {
    setup: null,
    create: null,
    read: null,
    update: null,
    delete: null,
    cleanup: null,
    errors: []
  };

  try {
    // Step 1: Setup - Create test table if it doesn't exist
    try {
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
      
      const setupResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: createTableSql }));
      
      if (!setupResponse.ok) {
        const errorData = await setupResponse.json();
        throw new Error(`Setup error: ${errorData.error || setupResponse.statusText}`);
      }
      
      results.setup = { success: true, message: 'Test table created or already exists' };
    } catch (error: any) {
      results.errors.push({ step: 'setup', message: error.message });
      results.setup = { success: false, error: error.message };
      return res.status(500).json(results);
    }
    
    // Step 2: Create - Insert test data
    let testItemId: number | null = null;
    try {
      const insertSql = `
        INSERT INTO ${TEST_TABLE} (name, description, created_at)
        VALUES ('Test Item', 'This is a test item', NOW())
        RETURNING *;
      `;
      
      const createResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: insertSql }));
      
      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(`Create error: ${errorData.error || createResponse.statusText}`);
      }
      
      const createResult = await createResponse.json();
      testItemId = createResult.rows[0].id;
      
      results.create = { 
        success: true, 
        message: 'Test data inserted successfully', 
        data: createResult.rows[0] 
      };
    } catch (error: any) {
      results.errors.push({ step: 'create', message: error.message });
      results.create = { success: false, error: error.message };
      return res.status(500).json(results);
    }
    
    // Step 3: Read - Select test data
    try {
      const selectSql = `
        SELECT * FROM ${TEST_TABLE}
        WHERE id = ${testItemId};
      `;
      
      const readResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: selectSql }));
      
      if (!readResponse.ok) {
        const errorData = await readResponse.json();
        throw new Error(`Read error: ${errorData.error || readResponse.statusText}`);
      }
      
      const readResult = await readResponse.json();
      
      results.read = { 
        success: true, 
        message: 'Test data retrieved successfully', 
        data: readResult.rows[0] 
      };
    } catch (error: any) {
      results.errors.push({ step: 'read', message: error.message });
      results.read = { success: false, error: error.message };
    }
    
    // Step 4: Update - Update test data
    try {
      const updateSql = `
        UPDATE ${TEST_TABLE}
        SET 
          description = 'This description was updated',
          status = 'updated',
          updated_at = NOW()
        WHERE id = ${testItemId}
        RETURNING *;
      `;
      
      const updateResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: updateSql }));
      
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Update error: ${errorData.error || updateResponse.statusText}`);
      }
      
      const updateResult = await updateResponse.json();
      
      results.update = { 
        success: true, 
        message: 'Test data updated successfully', 
        data: updateResult.rows[0] 
      };
    } catch (error: any) {
      results.errors.push({ step: 'update', message: error.message });
      results.update = { success: false, error: error.message };
    }
    
    // Step 5: Delete - Delete test data
    try {
      const deleteSql = `
        DELETE FROM ${TEST_TABLE}
        WHERE id = ${testItemId}
        RETURNING *;
      `;
      
      const deleteResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: deleteSql }));
      
      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(`Delete error: ${errorData.error || deleteResponse.statusText}`);
      }
      
      const deleteResult = await deleteResponse.json();
      
      results.delete = { 
        success: true, 
        message: 'Test data deleted successfully', 
        data: deleteResult.rows[0] 
      };
    } catch (error: any) {
      results.errors.push({ step: 'delete', message: error.message });
      results.delete = { success: false, error: error.message };
    }
    
    // Step 6: Cleanup - Drop test table (optional)
    if (req.query.cleanup === 'true') {
      try {
        const dropTableSql = `
          DROP TABLE IF EXISTS ${TEST_TABLE};
        `;
        
        const cleanupResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: dropTableSql }));
        
        if (!cleanupResponse.ok) {
          const errorData = await cleanupResponse.json();
          throw new Error(`Cleanup error: ${errorData.error || cleanupResponse.statusText}`);
        }
        
        results.cleanup = { success: true, message: 'Test table dropped successfully' };
      } catch (error: any) {
        results.errors.push({ step: 'cleanup', message: error.message });
        results.cleanup = { success: false, error: error.message };
      }
    } else {
      results.cleanup = { success: true, message: 'Cleanup skipped' };
    }
    
    // Calculate overall success
    const allStepsSuccessful = 
      results.setup?.success && 
      results.create?.success && 
      results.read?.success && 
      results.update?.success && 
      results.delete?.success &&
      (results.cleanup?.success || results.cleanup === null);
    
    // Return results
    return res.status(allStepsSuccessful ? 200 : 500).json({
      ...results,
      success: allStepsSuccessful,
      message: allStepsSuccessful 
        ? 'All Supabase CRUD operations completed successfully' 
        : 'Some Supabase CRUD operations failed'
    });
  } catch (error: any) {
    console.error('Error in Supabase CRUD test:', error);
    return res.status(500).json({ 
      ...results,
      success: false,
      message: 'Error in Supabase CRUD test',
      error: error.message 
    });
  }
}
