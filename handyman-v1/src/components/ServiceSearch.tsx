'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ServiceSearch() {
  const router = useRouter()
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      router.push(`/locations/${encodeURIComponent(location.toLowerCase())}`)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
