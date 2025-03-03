'use client';

import { useRepository } from '@/providers/service.provider';
import { useEffect } from 'react';
import Link from 'next/link';
import ServiceImage from '@/components/ServiceImage';

const images = [
  'house10.jpg',
  'house5.jpg',
  'house6.jpg',
  'house7.jpg',
  'house8.jpg',
  'house9.jpg',
];

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

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link 
          key={service.id} 
          href={`/services/${service.slug}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
        >
          <div className="relative">
            <ServiceImage
              src={`/images/${images[Math.floor(Math.random() * images.length)]}`}
              alt={service.title}
              title={service.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-primary">{service.title || "No Title"}</h3>
            <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
            {showPrice && (service.price_range || service.base_price) && (
              <div className="bg-primary/10 text-primary font-bold py-2 px-4 rounded-lg inline-block">
                {service.price_range || (service.base_price && `Starting at ${formatPrice(service.base_price)}`)}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
