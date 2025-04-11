/**
 * Supabase Client Utility
 * Provides direct SQL operations for the test-delete table
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Create - Direct SQL
export async function createRecord(data) {
  const { name, description, price } = data;
  const query = `
    INSERT INTO "test-delete" (name, description, price)
    VALUES ('${name}', '${description}', ${price})
    RETURNING *;
  `;
  
  const { data: result, error } = await supabase.rpc('execute_sql', { query });
  if (error) throw error;
  return result;
}

// Read - Direct SQL
export async function getRecords() {
  const query = `SELECT * FROM "test-delete" ORDER BY id DESC;`;
  
  const { data, error } = await supabase.rpc('execute_sql', { query });
  if (error) throw error;
  return data;
}

// Update - Direct SQL
export async function updateRecord(id, data) {
  const { name, description, price } = data;
  const query = `
    UPDATE "test-delete"
    SET name = '${name}', description = '${description}', price = ${price}
    WHERE id = ${id}
    RETURNING *;
  `;
  
  const { data: result, error } = await supabase.rpc('execute_sql', { query });
  if (error) throw error;
  return result;
}

// Delete - Direct SQL
export async function deleteRecord(id) {
  const query = `DELETE FROM "test-delete" WHERE id = ${id} RETURNING *;`;
  
  const { data, error } = await supabase.rpc('execute_sql', { query });
  if (error) throw error;
  return data;
}

// Check connection
export async function getConnectionStatus() {
  try {
    const query = `SELECT 1 FROM "test-delete" LIMIT 1;`;
    await supabase.rpc('execute_sql', { query });
    return { connected: true, message: 'Connected to Supabase' };
  } catch (error) {
    console.error('Connection error:', error);
    return { connected: false, message: error.message };
  }
}

// Check if table exists
export async function tableExists(tableName) {
  try {
    const query = `SELECT 1 FROM "test-delete" LIMIT 1;`;
    await supabase.rpc('execute_sql', { query });
    return true;
  } catch (error) {
    return false;
  }
}

export default supabase;
