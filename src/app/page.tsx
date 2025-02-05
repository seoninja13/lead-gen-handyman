import { getCities, getServices, getCityServices } from '@/utils/supabase/server'
import { City, Service, CityService } from '@/types/database'
import ServiceImage from '@/components/ServiceImage'

export default async function Home() {
  try {
    // Fetch initial data
    console.log('Fetching data...')
    const citiesPromise = getCities()
    const servicesPromise = getServices()
    const cityServicesPromise = getCityServices()

    const [cities, services, cityServices] = await Promise.all([
      citiesPromise.catch(error => {
        console.error('Error fetching cities:', error)
        return []
      }),
      servicesPromise.catch(error => {
        console.error('Error fetching services:', error)
        return []
      }),
      cityServicesPromise.catch(error => {
        console.error('Error fetching city services:', error)
        return []
      })
    ])

    console.log('Data fetched:', { 
      citiesCount: cities?.length, 
      servicesCount: services?.length, 
      cityServicesCount: cityServices?.length 
    })

    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Handyman Services</h1>
        
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service: Service) => (
              <div 
                key={service.id}
                className="p-6 rounded-lg border border-gray-200 shadow-sm"
              >
                <h3 className="text-xl font-medium mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Price: {service.price_range}</span>
                  <span>Duration: {service.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities?.map((city: City) => (
              <div 
                key={city.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer"
              >
                <h3 className="font-medium">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.state}</p>
              </div>
            ))}
          </div>
        </section>

        {/* City Services Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Services by Location</h2>
          <div className="space-y-6">
            {cityServices?.map((cityService: any) => (
              <div 
                key={cityService.id}
                className="p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-xl font-medium mb-2">
                  {cityService.services?.name} in {cityService.cities?.name}
                </h3>
                {cityService.main_content && (
                  <p className="text-gray-600 mb-4">{cityService.main_content}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {cityService.service_images && (() => {
                    try {
                      console.log('Raw service_images:', cityService.service_images);
                      const images = typeof cityService.service_images === 'string'
                        ? JSON.parse(cityService.service_images)
                        : cityService.service_images;
                      
                      console.log('Parsed images:', images);
                      
                      if (!Array.isArray(images)) {
                        console.warn('service_images is not an array:', images);
                        return null;
                      }

                      return images.map((image: any, index: number) => {
                        if (!image?.src) {
                          console.warn('Invalid image object:', image);
                          return null;
                        }

                        return (
                          <ServiceImage 
                            key={index}
                            src={image.src}
                            alt={image.alt || ''}
                            title={image.title}
                            width={image.width}
                            height={image.height}
                          />
                        );
                      });
                    } catch (error) {
                      console.error('Error parsing service_images:', error);
                      return null;
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Error</h1>
        <p className="text-red-500">Failed to load data. Please try again later.</p>
      </main>
    )
  }
}
