'use client';

import React, { createContext, useContext, useState } from 'react';
import { Service } from '@/interfaces/services';
import { ServiceRepository } from '@/repositories/service.repository';

export interface ServiceConfig {
  defaultLimit: number;
  defaultCategory: string;
  defaultLocation: string;
  categories: string[];
  locations: string[];
}

interface ServiceContextType {
  services: Service[];
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = React.useCallback(async (params?: { category?: string; location?: string; limit?: number }) => {
    try {
      setLoading(true);
      setError(null);

      const repository = ServiceRepository.getInstance();
      const data = await repository.getServices();
      
      let filteredData = data;
      if (params?.category) {
        filteredData = filteredData.filter(service => 
          service.category.toLowerCase().includes(params.category!.toLowerCase())
        );
      }
      
      if (params?.limit) {
        filteredData = filteredData.slice(0, params.limit);
      }

      setServices(filteredData);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
