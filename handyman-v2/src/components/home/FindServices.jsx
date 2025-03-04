/**
 * FindServices Component
 * 
 * This component displays service areas/cities where handyman services are available.
 * Adapted from the Envato template's FindProperties component.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FindServices = () => {
  // Sample service areas data
  const serviceAreas = [
    {
      id: 1,
      name: "Sacramento",
      image: "/images/city1.jpg",
      count: 24,
    },
    {
      id: 2,
      name: "Folsom",
      image: "/images/city2.jpg",
      count: 18,
    },
    {
      id: 3,
      name: "Roseville",
      image: "/images/city3.jpg",
      count: 16,
    },
    {
      id: 4,
      name: "Elk Grove",
      image: "/images/city4.jpg",
      count: 12,
    }
  ];

  return (
    <>
      {serviceAreas.map((area) => (
        <div className="col-sm-6 col-md-6 col-lg-3" key={area.id}>
          <div className="property_city_home6">
            <div className="thumb">
              <Image
                className="img-fluid w100"
                src={area.image}
                alt={area.name}
                width={350}
                height={200}
              />
            </div>
            <div className="details">
              <h4>{area.name}</h4>
              <p>{area.count} Services</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FindServices;
