import React from 'react';
import { DatabaseOperations } from '@/utils/supabase/serverDatabase';
import { City } from '@/types/database';
import Link from 'next/link';

const getCities = async (): Promise<City[]> => {
  try {
    const citiesData = await DatabaseOperations.Cities.getAll();
    return citiesData;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

const CityList = async () => {
  const cities = await getCities();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cities.map((city) => (
        <div key={city.id}>
          <Link href={`/services/${city.name.toLowerCase().replace(/ /g, '-')}`}>
            {city.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

const CitySelection = async () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section className="max-w-7xl mx-auto px-8 mb-16">
      <h2 className="text-2xl font-semibold mb-8">Choose Your City</h2>
      {/* Interactive Map */}
      <div className="h-64 rounded-lg mb-4 overflow-hidden">
        <iframe
          className="w-full h-full border-0"
          src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=38.5816,-121.4944&zoom=10&maptype=roadmap`}
          allowFullScreen
        ></iframe>
      </div>
      {/* City List */}
      {await CityList()}
    </section>
  );
};

export default CitySelection;
