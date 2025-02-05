// Component interfaces following Interface Segregation Principle

import { City, Service, CityService, ServiceImage, FAQ, Testimonial } from './domain';

// Common Props
export interface BaseProps {
  className?: string;
  id?: string;
}

// Layout Components
export interface LayoutProps extends BaseProps {
  children: React.ReactNode;
}

export interface HeaderProps extends BaseProps {
  transparent?: boolean;
  sticky?: boolean;
}

export interface FooterProps extends BaseProps {
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
}

// Hero Section
export interface HeroProps extends BaseProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showSearch?: boolean;
  showCitySelector?: boolean;
}

export interface SearchBarProps extends BaseProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

// Service Components
export interface ServiceCardProps extends BaseProps {
  service: Service;
  showPrice?: boolean;
  showDuration?: boolean;
  variant?: 'default' | 'featured' | 'compact';
  onClick?: (service: Service) => void;
}

export interface ServiceGridProps extends BaseProps {
  services: Service[];
  columns?: number;
  gap?: number;
  loading?: boolean;
}

export interface ServiceImageProps extends BaseProps {
  image: ServiceImage;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

// City Components
export interface CityCardProps extends BaseProps {
  city: City;
  showPopulation?: boolean;
  showServiceCount?: boolean;
  variant?: 'default' | 'featured' | 'compact';
  onClick?: (city: City) => void;
}

export interface CitySelectorProps extends BaseProps {
  cities: City[];
  selectedCity?: City;
  onCityChange: (city: City) => void;
  showMap?: boolean;
}

export interface CityMapProps extends BaseProps {
  city: City;
  serviceAreas?: string[];
  interactive?: boolean;
  zoom?: number;
}

// Service Area Components
export interface ServiceAreaMapProps extends BaseProps {
  cityService: CityService;
  interactive?: boolean;
  showLegend?: boolean;
}

// FAQ Components
export interface FAQSectionProps extends BaseProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  categorized?: boolean;
}

export interface FAQItemProps extends BaseProps {
  faq: FAQ;
  expanded?: boolean;
  onToggle?: () => void;
}

// Testimonial Components
export interface TestimonialCardProps extends BaseProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured' | 'compact';
}

export interface TestimonialCarouselProps extends BaseProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

// Form Components
export interface FormFieldProps extends BaseProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectProps extends FormFieldProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Loading States
export interface LoadingProps extends BaseProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'spinner' | 'skeleton' | 'pulse';
}

export interface SkeletonProps extends BaseProps {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  animate?: boolean;
}

// Error States
export interface ErrorBoundaryProps extends BaseProps {
  fallback: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorMessageProps extends BaseProps {
  error: Error | string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// SEO Components
export interface SeoHeadProps extends BaseProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: string;
}

// Analytics Components
export interface AnalyticsProviderProps extends BaseProps {
  children: React.ReactNode;
  trackingId: string;
  debug?: boolean;
}

export interface TrackEventProps extends BaseProps {
  category: string;
  action: string;
  label?: string;
  value?: number;
}
