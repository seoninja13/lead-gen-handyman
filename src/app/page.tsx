'use client';

import { ServiceList } from '@/components/features/ServiceList';
import { HeroSection } from '@/components/features/HeroSection';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/services?search=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen">
      <HeroSection 
        onSearch={handleSearch} 
        className="mb-16"
      />

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Featured Services</h2>
          <a 
            href="/services" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all services →
          </a>
        </div>
        <ServiceList limit={6} />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8 mb-16">
        <h2 className="text-2xl font-semibold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Home Repair', 'Maintenance', 'Installation'].map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-medium mb-4">{category}</h3>
              <ServiceList category={category} limit={3} showPrice={false} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
