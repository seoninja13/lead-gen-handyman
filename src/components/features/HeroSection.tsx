import React from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function HeroSection({ onSearch, className = '' }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className={`relative w-full ${className}`} role="region" aria-label="Hero section">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" role="heading" aria-level={1}>
            Find Trusted Handyman Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200" role="text">
            Professional handyman services in Greater Sacramento area. Get instant quotes and book services online.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mt-12 sm:mx-auto sm:max-w-xl" role="search">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <Input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 bg-white/95 text-lg placeholder:text-gray-400"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mt-8" role="navigation" aria-label="Popular services">
            <p className="text-sm text-gray-200" role="text">Popular Services:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {['Plumbing', 'Electrical', 'Carpentry', 'Painting'].map((service) => (
                <Button
                  key={service}
                  variant="secondary"
                  size="sm"
                  onClick={() => onSearch(service)}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
