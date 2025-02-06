import { ServiceList } from '@/components/features/ServiceList'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Services</h2>
          <Link 
            href="/services" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all services →
          </Link>
        </div>
        <ServiceList limit={6} />
      </section>

      {/* Other sections */}
    </main>
  )
}
