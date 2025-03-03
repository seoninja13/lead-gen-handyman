import { DatabaseService, ApiService, AnalyticsService, ImageService, CacheService, SeoService } from '@/interfaces/services';
import { createSupabaseService } from './database/supabase.service';

// Service container interface
export interface ServiceContainer {
  database: DatabaseService;
  api?: ApiService;
  analytics?: AnalyticsService;
  image?: ImageService;
  cache?: CacheService;
  seo?: SeoService;
}

// Service configuration interface
export interface ServiceConfig {
  api?: {
    baseUrl: string;
    apiKey?: string;
  };
  analytics?: {
    trackingId: string;
    debug?: boolean;
  };
  cache?: {
    ttl?: number;
  };
}

// Service factory class following Factory pattern
export class ServiceFactory {
  private static instance: ServiceContainer;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Initialize services with configuration
  static initialize(config: ServiceConfig): ServiceContainer {
    if (!ServiceFactory.instance) {
      const container: ServiceContainer = {
        database: createSupabaseService()
      };

      // Initialize other services as needed
      // Example:
      // if (config.api) {
      //   container.api = createApiService(config.api);
      // }

      ServiceFactory.instance = container;
    }

    return ServiceFactory.instance;
  }

  // Get service container instance
  static getServices(): ServiceContainer {
    if (!ServiceFactory.instance) {
      throw new Error('Services not initialized. Call initialize() first.');
    }

    return ServiceFactory.instance;
  }

  // Get individual service
  static getService<K extends keyof ServiceContainer>(
    serviceName: K
  ): ServiceContainer[K] {
    const services = ServiceFactory.getServices();
    const service = services[serviceName];

    if (!service) {
      throw new Error(`Service ${serviceName} not initialized`);
    }

    return service;
  }
}

// Export factory function for creating services
export function createServices(config: ServiceConfig): ServiceContainer {
  return ServiceFactory.initialize(config);
}

// Export function to get services
export function getServices(): ServiceContainer {
  return ServiceFactory.getServices();
}

// Export function to get individual service
export function getService<K extends keyof ServiceContainer>(
  serviceName: K
): ServiceContainer[K] {
  return ServiceFactory.getService(serviceName);
}

// Export service types
export type { DatabaseService, ApiService, AnalyticsService, ImageService, CacheService, SeoService };
