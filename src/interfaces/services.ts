// Base interfaces for services following Interface Segregation Principle

// Database Service Interface
export interface DatabaseService {
  query<T>(sql: string): Promise<T>;
  queryOne<T>(sql: string): Promise<T | null>;
  insert<T>(table: string, data: Partial<T>): Promise<T>;
  update<T>(table: string, id: string | number, data: Partial<T>): Promise<T>;
  delete(table: string, id: string | number): Promise<void>;
}

// API Service Interface
export interface ApiService {
  get<T>(endpoint: string): Promise<T>;
  post<T, U>(endpoint: string, data: T): Promise<U>;
  put<T, U>(endpoint: string, data: T): Promise<U>;
  delete(endpoint: string): Promise<void>;
}

// Analytics Service Interface
export interface AnalyticsService {
  trackPageView(path: string): void;
  trackEvent(category: string, action: string, label?: string, value?: number): void;
  trackError(error: Error, context?: Record<string, unknown>): void;
}

// Image Service Interface
export interface ImageService {
  load(src: string): Promise<HTMLImageElement>;
  optimize(image: HTMLImageElement): Promise<Blob>;
  upload(image: Blob): Promise<string>;
}

// Cache Service Interface
export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

// SEO Service Interface
export interface SeoService {
  generateMetaTags(data: SeoData): MetaTags;
  generateSchema(type: SchemaType, data: Record<string, unknown>): string;
  generateSitemap(urls: string[]): string;
}

// Types used in interfaces
export interface SeoData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: string;
}

export interface MetaTags {
  title: string;
  meta: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export type SchemaType = 
  | 'LocalBusiness'
  | 'Service'
  | 'FAQPage'
  | 'Article'
  | 'BreadcrumbList';

// Result type for better error handling
export interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

// Generic Repository Interface
export interface Repository<T> {
  findAll(): Promise<Result<T[]>>;
  findById(id: string | number): Promise<Result<T>>;
  create(data: Partial<T>): Promise<Result<T>>;
  update(id: string | number, data: Partial<T>): Promise<Result<T>>;
  delete(id: string | number): Promise<Result<void>>;
}
