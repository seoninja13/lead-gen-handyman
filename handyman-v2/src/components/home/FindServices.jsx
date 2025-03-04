/**
 * FindServices Component
 * 
 * This component displays service areas/cities where handyman services are available.
 * Adapted from the Envato template's FindProperties component.
 */

import React from 'react';
import Link from 'next/link';

const FindServices = () => {
  // Sample service areas data
  const serviceAreas = [
    {
      id: 1,
      name: "Sacramento",
      image: "/assets/images/city/1.jpg",
      count: 24,
    },
    {
      id: 2,
      name: "Folsom",
      image: "/assets/images/city/2.jpg",
      count: 18,
    },
    {
      id: 3,
      name: "Roseville",
      image: "/assets/images/city/3.jpg",
      count: 16,
    },
    {
      id: 4,
      name: "Elk Grove",
      image: "/assets/images/city/4.jpg",
      count: 12,
    }
  ];

  return (
    <>
      {serviceAreas.map((area) => (
        <div className="col-sm-6 col-md-6 col-lg-3" key={area.id}>
          <div className="property_city_home6">
            <div className="thumb">
              <img
                className="img-fluid w100"
                src={area.image}
                alt={area.name}
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
