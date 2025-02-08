import './globals.css';

export const metadata = {
  title: 'Lead Gen Handyman',
  description: 'Professional handyman services in Greater Sacramento area',
};

import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { config } from '@/config/services';
import { ServiceProvider } from '@/providers/service.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServiceProvider config={{
          defaultLimit: config.defaultLimit,
          defaultCategory: config.defaultCategory,
          defaultLocation: config.defaultLocation,
          categories: config.categories,
          locations: config.locations,
        }}>
          <LayoutProvider>{children}</LayoutProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
