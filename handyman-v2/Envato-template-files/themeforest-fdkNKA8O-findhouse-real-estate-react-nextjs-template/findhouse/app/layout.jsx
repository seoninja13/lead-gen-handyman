
import { Providers } from './providers'
import "./globals.css"

export const metadata = {
  title: 'FindHouse - Real Estate React Template',
  description: 'FindHouse - Real Estate React Template',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
