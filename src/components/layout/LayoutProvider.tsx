'use client';

import { ServiceProvider } from '@/providers/service.provider';
import { config } from '@/config/services';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <ServiceProvider config={config}>
      {children}
    </ServiceProvider>
  );
}
