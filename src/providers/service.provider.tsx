import React, { createContext, useContext } from 'react';
import { ServiceContainer, ServiceConfig, createServices } from '@/services';
import { createRepositories } from '@/repositories';

// Create context for services
const ServiceContext = createContext<ServiceContainer | null>(null);

// Props interface for the provider
interface ServiceProviderProps {
  config: ServiceConfig;
  children: React.ReactNode;
}

// Service provider component
export function ServiceProvider({ config, children }: ServiceProviderProps) {
  // Initialize services with configuration
  const services = createServices(config);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

// Custom hook to use services
export function useServices(): ServiceContainer {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}

// Custom hooks for individual services
export function useDatabase() {
  const services = useServices();
  return services.database;
}

export function useApi() {
  const services = useServices();
  if (!services.api) {
    throw new Error('API service not initialized');
  }
  return services.api;
}

export function useAnalytics() {
  const services = useServices();
  if (!services.analytics) {
    throw new Error('Analytics service not initialized');
  }
  return services.analytics;
}

export function useImage() {
  const services = useServices();
  if (!services.image) {
    throw new Error('Image service not initialized');
  }
  return services.image;
}

export function useCache() {
  const services = useServices();
  if (!services.cache) {
    throw new Error('Cache service not initialized');
  }
  return services.cache;
}

export function useSeo() {
  const services = useServices();
  if (!services.seo) {
    throw new Error('SEO service not initialized');
  }
  return services.seo;
}

// Repository provider hook factory
export function createRepositoryHook<T>(repositoryName: string) {
  return function useRepository() {
    const { database } = useServices();
    const repositories = createRepositories(database);
    return repositories[repositoryName as keyof typeof repositories] as T;
  };
}

// Import repository types
import { CityRepository, ServiceRepository, CityServiceRepository } from '@/repositories';

// Export pre-configured repository hooks
export const useCityRepository = createRepositoryHook<CityRepository>('cities');
export const useServiceRepository = createRepositoryHook<ServiceRepository>('services');
export const useCityServiceRepository = createRepositoryHook<CityServiceRepository>('cityServices');

// Export context for advanced use cases
export { ServiceContext };
