'use client';

import React from 'react';

const CitySelection = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-16">
      <h2 className="text-2xl font-semibold mb-8">Choose Your City</h2>
      {/* Interactive Map Placeholder */}
      <div className="h-64 bg-gray-200 rounded-lg mb-4">
        {/* Replace with actual map component */}
        Interactive Map Here
      </div>
      {/* City List Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Replace with actual city list */}
        <div>City 1</div>
        <div>City 2</div>
        <div>City 3</div>
        <div>City 4</div>
      </div>
    </section>
  );
};

export default CitySelection;
