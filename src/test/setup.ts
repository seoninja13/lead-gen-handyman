import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toBeGreaterThan(expected: number): R;
      not: {
        toBeInTheDocument(): R;
      };
    }
  }
}

// Extend expect interface
declare module '@jest/expect' {
  interface AsymmetricMatchers {
    toBeInTheDocument(): void;
    toHaveBeenCalledWith(...args: any[]): void;
    toBeGreaterThan(expected: number): void;
  }
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveBeenCalledWith(...args: any[]): R;
    toBeGreaterThan(expected: number): R;
  }
}

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
      getAll: jest.fn(),
      has: jest.fn(),
      forEach: jest.fn(),
      entries: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      toString: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

import React from 'react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'example-anon-key',
};

// Extend Jest matchers
expect.extend({
  toHaveBeenCalledOnce(received: jest.Mock) {
    const pass = received.mock.calls.length === 1;
    if (pass) {
      return {
        message: () => `expected ${received} not to have been called exactly once`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to have been called exactly once, but it was called ${received.mock.calls.length} times`,
        pass: false,
      };
    }
  },
});

// Global test setup
beforeAll(() => {
  // Add any global setup here
});

afterAll(() => {
  // Add any global cleanup here
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
