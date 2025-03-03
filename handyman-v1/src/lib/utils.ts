import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  // Add a day to account for timezone offset
  d.setDate(d.getDate() + 1);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Slugify text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  // Find the last complete word within the length limit
  const words = text.slice(0, length + 1).split(' ');
  // Remove the last word if it would exceed the limit
  words.pop();
  return words.join(' ') + '...';
}

// Parse price range string to min/max values
export function parsePriceRange(range: string): { min: number; max: number } {
  const numbers = range.match(/\d+/g)?.map(Number) || [];
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}

// Generate meta description
export function generateMetaDescription(
  service: string,
  city?: string,
  details?: string
): string {
  let description = `Professional ${service} services`;
  if (city) description += ` in ${city}`;
  if (details) description += `. ${details}`;
  return truncate(description, 160);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}

// Format phone number
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}

// Calculate service area radius
export function isWithinServiceArea(
  centerLat: number,
  centerLng: number,
  pointLat: number,
  pointLng: number,
  radiusMiles: number
): boolean {
  const earthRadiusMiles = 3959; // Earth's radius in miles

  const lat1 = toRadians(centerLat);
  const lat2 = toRadians(pointLat);
  const deltaLat = toRadians(pointLat - centerLat);
  const deltaLng = toRadians(pointLng - centerLng);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusMiles * c;

  return distance <= radiusMiles;
}

// Convert degrees to radians
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Generate schema markup
export function generateSchemaMarkup(type: string, data: Record<string, any>): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  return JSON.stringify(schema);
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
