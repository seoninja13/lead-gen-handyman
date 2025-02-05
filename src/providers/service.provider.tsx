'use client';

import React, { createContext, useContext, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface ServiceConfig {
  supabaseUrl: string;
  supabaseKey: string;
  defaultLimit: number;
  defaultCategory: string;
  defaultLocation: string;
  categories: string[];
  locations: string[];
}

interface ServiceContextType {
  services: any[];
  loading: boolean;
  error: Error | null;
  fetchServices: (params?: { category?: string; location?: string; limit?: number }) => Promise<void>;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
  children: React.ReactNode;
  config: ServiceConfig;
}

export function ServiceProvider({ children, config }: ServiceProviderProps) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  const fetchServices = async (params?: { category?: string; location?: string; limit?: number }) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('services')
        .select('*')
        .limit(params?.limit || config.defaultLimit);

      if (params?.category && params.category !== config.defaultCategory) {
        query = query.eq('category', params.category);
      }

      if (params?.location && params.location !== config.defaultLocation) {
        query = query.eq('location', params.location);
      }

      const { data, error } = await query;

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceContext.Provider value={{ services, loading, error, fetchServices }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}

export function useRepository() {
  const { services, loading, error, fetchServices } = useServices();
  return { services, loading, error, fetchServices };
}
