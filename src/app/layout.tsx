import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ServiceProvider } from '@/providers/service.provider'
import { serviceConfig, validateConfig } from '@/config/services'

const inter = Inter({ subsets: ['latin'] })

// Validate environment variables
validateConfig()

export const metadata: Metadata = {
  title: 'Lead Gen Handyman',
  description: 'Find trusted handyman services in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceProvider config={serviceConfig}>
          {children}
        </ServiceProvider>
      </body>
    </html>
  )
}
