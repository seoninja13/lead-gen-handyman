import { ServiceList } from '@/components/features/ServiceList'

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <ServiceList />
    </main>
  )
}
