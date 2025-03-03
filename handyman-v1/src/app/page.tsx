'use client';

import { ServiceList } from '@/components/features/ServiceList';
import { HeroSection } from '@/components/features/HeroSection';
import CitySelection from '@/components/features/CitySelection';
import YouTubeVideos from '@/components/features/YouTubeVideos';
import FAQ from '@/components/features/FAQ';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/services?q=${query}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection onSearch={handleSearch} />

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

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">City Selection</h2>
        <CitySelection />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">YouTube Videos</h2>
        <YouTubeVideos />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <FAQ />
      </section>
    </main>
  );
}
