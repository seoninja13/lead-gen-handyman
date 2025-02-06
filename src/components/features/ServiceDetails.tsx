'use client';

import { Service } from '@/interfaces/services'
import { useEffect, useState } from 'react'
import { ServiceRepository } from '@/repositories/service.repository'

interface ServiceDetailsProps {
  slug: string
}

export default function ServiceDetails({ slug }: ServiceDetailsProps) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true)
        setError(null)
        const repository = ServiceRepository.getInstance()
        const data = await repository.getServiceBySlug(slug)
        if (!data) {
          throw new Error('Service not found')
        }
        setService(data)
      } catch (err) {
        console.error('Error fetching service:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch service'))
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-600">{error.message}</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Service not found</div>
      </div>
    )
  }

  return (
    <div className="service-details bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
      {service.base_price && (
        <div className="text-2xl font-semibold text-primary mb-6">
          {service.price_range || `Starting at $${service.base_price.toLocaleString()}`}
        </div>
      )}
      <div className="flex gap-4 text-sm">
        <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
          {service.category}
        </span>
        <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
          {service.availability}
        </span>
      </div>
    </div>
  )
}
