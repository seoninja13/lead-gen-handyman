import ServiceSearch from '@/components/ServiceSearch'

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Find Local Handyman Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with trusted handyman professionals in your area for home repairs, maintenance, and improvements.
          </p>
        </div>
        <ServiceSearch />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Professional Service</h3>
            <p className="text-gray-600">Experienced and vetted handyman professionals ready to help.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
            <p className="text-gray-600">Get connected with available professionals in your area quickly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quality Work</h3>
            <p className="text-gray-600">Satisfaction guaranteed with our trusted service providers.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
