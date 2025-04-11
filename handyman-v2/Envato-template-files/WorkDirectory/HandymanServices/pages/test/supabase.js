import React from 'react';
import SupabaseTest from '../../components/test/SupabaseTest';

/**
 * Supabase Test Page
 * This page provides a UI for testing Supabase direct database operations.
 */
export default function SupabaseTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Supabase Database Testing Interface
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              Test and verify Supabase database operations in real-time.
              All operations are executed directly against your Supabase database.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-left">
              <h3 className="font-semibold mb-2">Quick Guide:</h3>
              <ul className="list-disc list-inside space-y-1 text-base">
                <li>SELECT - View existing records (try: {'{'}limit: 5{'}'})</li>
                <li>INSERT - Add new records (use example parameters)</li>
                <li>UPDATE - Modify records (use SQL format)</li>
                <li>DELETE - Remove records (use SQL format)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <SupabaseTest />
        </div>
      </div>
    </div>
  );
}
