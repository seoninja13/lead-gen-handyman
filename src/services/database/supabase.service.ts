import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseService } from '@/interfaces/services';

export class SupabaseService implements DatabaseService {
  private client: SupabaseClient;

  constructor(url: string, key: string) {
    this.client = createClient(url, key);
  }

  async query<T>(sql: string): Promise<T> {
    const { data, error } = await this.client.rpc('execute_sql', { sql_query: sql });
    
    if (error) {
      console.error('Database query error:', error);
      throw error;
    }

    return data as T;
  }

  async queryOne<T>(sql: string): Promise<T | null> {
    const { data, error } = await this.client.rpc('execute_sql', { sql_query: sql });
    
    if (error) {
      console.error('Database query error:', error);
      throw error;
    }

    if (Array.isArray(data) && data.length > 0) {
      return data[0] as T;
    }

    return null;
  }

  async insert<T>(table: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.client
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    return result as T;
  }

  async update<T>(table: string, id: string | number, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.client
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database update error:', error);
      throw error;
    }

    return result as T;
  }

  async delete(table: string, id: string | number): Promise<void> {
    const { error } = await this.client
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database delete error:', error);
      throw error;
    }
  }

  // Additional helper methods specific to Supabase
  async upsert<T>(table: string, data: Partial<T>, onConflict?: string): Promise<T> {
    const { data: result, error } = await this.client
      .from(table)
      .upsert(data, { 
        onConflict: onConflict ? onConflict : undefined 
      })
      .select()
      .single();

    if (error) {
      console.error('Database upsert error:', error);
      throw error;
    }

    return result as T;
  }

  async bulkInsert<T>(table: string, data: Partial<T>[]): Promise<T[]> {
    const { data: result, error } = await this.client
      .from(table)
      .insert(data)
      .select();

    if (error) {
      console.error('Database bulk insert error:', error);
      throw error;
    }

    return result as T[];
  }

  async bulkUpsert<T>(table: string, data: Partial<T>[], onConflict?: string): Promise<T[]> {
    const { data: result, error } = await this.client
      .from(table)
      .upsert(data, {
        onConflict: onConflict ? onConflict : undefined
      })
      .select();

    if (error) {
      console.error('Database bulk upsert error:', error);
      throw error;
    }

    return result as T[];
  }

  async transaction<T>(callback: (client: SupabaseClient) => Promise<T>): Promise<T> {
    // Note: Supabase doesn't support true transactions in the client library
    // This is a placeholder for future implementation
    // For now, we just pass the client and execute operations sequentially
    return callback(this.client);
  }

  // Method to get the raw Supabase client for advanced operations
  getRawClient(): SupabaseClient {
    return this.client;
  }
}

// Factory function to create a Supabase service instance
export function createSupabaseService(url: string, key: string): DatabaseService {
  return new SupabaseService(url, key);
}
