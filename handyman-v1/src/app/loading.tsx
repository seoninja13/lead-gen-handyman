export default function Loading() {
  return (
    <main className="min-h-screen p-8">
      <div className="animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded mb-8" />
        
        {/* Services Section Loading */}
        <section className="mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="p-6 rounded-lg border border-gray-200"
              >
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="h-20 bg-gray-200 rounded mb-4" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Section Loading */}
        <section className="mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg border border-gray-200"
              >
                <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* City Services Section Loading */}
        <section>
          <div className="h-8 w-64 bg-gray-200 rounded mb-4" />
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="p-6 rounded-lg border border-gray-200"
              >
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="h-24 bg-gray-200 rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j}
                      className="w-24 h-24 bg-gray-200 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
