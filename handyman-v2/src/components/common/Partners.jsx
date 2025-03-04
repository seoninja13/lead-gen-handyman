/**
 * Partners Component
 * 
 * This component displays partner logos.
 * Adapted from the Envato template's Partners component.
 */

import React from 'react';
import Image from 'next/image';

const Partners = () => {
  // Sample partners data
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      image: "/images/partner1.png"
    },
    {
      id: 2,
      name: "Partner 2",
      image: "/images/partner2.png"
    },
    {
      id: 3,
      name: "Partner 3",
      image: "/images/partner3.png"
    },
    {
      id: 4,
      name: "Partner 4",
      image: "/images/partner4.png"
    },
    {
      id: 5,
      name: "Partner 5",
      image: "/images/partner5.png"
    }
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="our_partner">
          {partners.map((partner) => (
            <div className="single_partner" key={partner.id}>
              <Image
                src={partner.image}
                alt={partner.name}
                width={120}
                height={80}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
