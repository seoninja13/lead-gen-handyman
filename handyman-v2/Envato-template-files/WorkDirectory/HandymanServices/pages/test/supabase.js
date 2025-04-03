import React from 'react';
import SupabaseTest from '../../components/test/SupabaseTest';

/**
 * Supabase Test Page
 * 
 * This page provides a UI for testing the Supabase connection and CRUD operations.
 */
export default function SupabaseTestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Supabase Test Page</h1>
      <p className="mb-6">
        This page allows you to test the Supabase connection and CRUD operations.
        Use the form below to execute queries against the Supabase database.
      </p>
      
      <SupabaseTest />
    </div>
  );
}
