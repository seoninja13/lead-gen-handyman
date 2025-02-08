import ServiceDetails from '@/components/features/ServiceDetails'
import Link from 'next/link'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <ServiceDetails slug={params.slug} />
      <div className="mt-4">
        <Link 
          href="/services" 
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to services
        </Link>
      </div>
    </main>
  )
}
