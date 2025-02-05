import './globals.css';

export const metadata = {
  title: 'Lead Gen Handyman',
  description: 'Professional handyman services in Greater Sacramento area',
};

import { LayoutProvider } from '@/components/layout/LayoutProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
