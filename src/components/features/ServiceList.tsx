'use client';

import { useRepository } from '@/providers/service.provider';
import { useEffect } from 'react';

interface ServiceListProps {
  category?: string;
  location?: string;
  limit?: number;
  showPrice?: boolean;
}

export function ServiceList({ 
  category,
  location,
  limit,
  showPrice = true 
}: ServiceListProps) {
  const { services, loading, error, fetchServices } = useRepository();

  useEffect(() => {
    fetchServices({ category, location, limit });
  }, [category, location, limit, fetchServices]);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error loading services: {error.message}</div>;
  if (!services.length) return <div>No services found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div 
          key={service.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
            {showPrice && (
              <p className="text-primary font-medium">
                Starting at ${service.price_range_min}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
