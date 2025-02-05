import { useEffect, useState } from 'react';
import { Service } from '@/interfaces/domain';
import { useServiceRepository } from '@/providers/service.provider';

interface ServiceListProps {
  category?: string;
  limit?: number;
  showPrice?: boolean;
}

export function ServiceList({ category, limit, showPrice = true }: ServiceListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const serviceRepository = useServiceRepository();

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const result = category 
          ? await serviceRepository.findByCategory(category)
          : await serviceRepository.findAll();

        if (!result.success || !result.data) {
          throw result.error || new Error('Failed to load services');
        }

        // Apply limit if specified
        const limitedServices = limit 
          ? result.data.slice(0, limit)
          : result.data;

        setServices(limitedServices);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, [category, limit, serviceRepository]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(limit || 6)].map((_, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg border border-gray-200 shadow-sm bg-gray-100 h-48"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
        <h3 className="font-semibold mb-2">Error Loading Services</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700">
        <p>No services found{category ? ` in category "${category}"` : ''}.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div 
          key={service.id}
          className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-medium mb-2">{service.name}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          {showPrice && service.price_range && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>Price: {service.price_range}</span>
              {service.duration && (
                <span>Duration: {service.duration}</span>
              )}
            </div>
          )}
          {service.tags && service.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
