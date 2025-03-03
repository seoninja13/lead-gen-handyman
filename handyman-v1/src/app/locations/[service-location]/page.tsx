import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: {
    'service-location': string
  }
}

export default function ServiceLocationPage({ params }: PageProps) {
  const location = decodeURIComponent(params['service-location'])

  // In a real app, you would fetch data for this location
  // For now, we'll just display the location
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">
            Handyman Services in {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Find reliable handyman services for home repairs, maintenance, and improvements in {location}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Home Repairs & Maintenance</li>
                  <li>Plumbing Services</li>
                  <li>Electrical Work</li>
                  <li>Carpentry & Woodwork</li>
                  <li>Painting Services</li>
                  <li>Furniture Assembly</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Licensed & Insured Professionals</li>
                  <li>Free Estimates</li>
                  <li>Satisfaction Guaranteed</li>
                  <li>Competitive Pricing</li>
                  <li>Emergency Services Available</li>
                  <li>Local Experts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
