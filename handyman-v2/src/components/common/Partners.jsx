/**
 * Partners Component
 * 
 * This component displays partner logos.
 * Adapted from the Envato template's Partners component.
 */

import React from 'react';

const Partners = () => {
  // Sample partners data
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      image: "/assets/images/partners/1.png"
    },
    {
      id: 2,
      name: "Partner 2",
      image: "/assets/images/partners/2.png"
    },
    {
      id: 3,
      name: "Partner 3",
      image: "/assets/images/partners/3.png"
    },
    {
      id: 4,
      name: "Partner 4",
      image: "/assets/images/partners/4.png"
    },
    {
      id: 5,
      name: "Partner 5",
      image: "/assets/images/partners/5.png"
    }
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="our_partner">
          {partners.map((partner) => (
            <div className="single_partner" key={partner.id}>
              <img
                src={partner.image}
                alt={partner.name}
                width={120}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
