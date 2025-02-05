/// <reference types="@testing-library/jest-dom" />

// Extend Jest matchers
declare namespace jest {
  interface Matchers<R> {
    toHaveBeenCalledOnce(): R;
  }
}

// Extend expect
declare module '@jest/expect' {
  interface AsymmetricMatchers {
    toHaveBeenCalledOnce(): void;
  }
}

// Extend global
declare global {
  namespace jest {
    interface Expect {
      toHaveBeenCalledOnce(): void;
    }
  }
}

// Add missing types for testing-library
declare module '@testing-library/react' {
  import { queries, Queries, BoundFunction } from '@testing-library/dom';
  
  export * from '@testing-library/dom';

  export interface RenderResult extends ReturnType<typeof render> {
    rerender(ui: React.ReactElement): void;
  }

  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType;
  }

  export function render(
    ui: React.ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export const screen: typeof queries & {
    [K in keyof Queries]: BoundFunction<Queries[K]>;
  };

  export function waitFor<T>(
    callback: () => T | Promise<T>,
    options?: {
      container?: HTMLElement;
      timeout?: number;
      interval?: number;
      onTimeout?: (error: Error) => Error;
      mutationObserverOptions?: MutationObserverInit;
    }
  ): Promise<T>;
}

// Add types for environment variables used in tests
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
