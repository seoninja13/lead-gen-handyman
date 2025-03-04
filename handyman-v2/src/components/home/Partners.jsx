/**
 * Partners Component
 * 
 * This component displays logos of partner companies and suppliers.
 * Adapted from the Envato template's Partners component.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Partners = () => {
  // Sample partner data
  const partners = [
    {
      id: 1,
      name: "Home Depot",
      image: "/assets/images/partners/1.png",
      url: "#"
    },
    {
      id: 2,
      name: "Lowe's",
      image: "/assets/images/partners/2.png",
      url: "#"
    },
    {
      id: 3,
      name: "Ace Hardware",
      image: "/assets/images/partners/3.png",
      url: "#"
    },
    {
      id: 4,
      name: "Sherwin-Williams",
      image: "/assets/images/partners/4.png",
      url: "#"
    },
    {
      id: 5,
      name: "Benjamin Moore",
      image: "/assets/images/partners/5.png",
      url: "#"
    }
  ];

  return (
    <>
      {partners.map((item) => (
        <div className="col-sm-6 col-md-4 col-lg" key={item.id}>
          <div className="our_partner">
            <Link href={item.url}>
              <img
                className="img-fluid"
                src={item.image}
                alt={item.name}
              />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;
