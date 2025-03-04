/**
 * FeaturedServices Component
 * 
 * This component displays featured handyman services.
 * Adapted from the Envato template's FeaturedProperties component.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedServices = () => {
  // Sample featured services data
  const featuredServices = [
    {
      id: 1,
      title: "Plumbing Repair",
      price: "$75",
      type: "Residential",
      image: "/assets/images/service/1.jpg",
      location: "Sacramento, CA",
      description: "Professional plumbing services including leak repair, pipe installation, and drain cleaning."
    },
    {
      id: 2,
      title: "Electrical Services",
      price: "$85",
      type: "Commercial & Residential",
      image: "/assets/images/service/2.jpg",
      location: "Folsom, CA",
      description: "Electrical installation, repair, and maintenance for homes and businesses."
    },
    {
      id: 3,
      title: "Carpentry & Woodwork",
      price: "$65",
      type: "Residential",
      image: "/assets/images/service/3.jpg",
      location: "Roseville, CA",
      description: "Custom woodworking, furniture repair, and general carpentry services."
    },
    {
      id: 4,
      title: "Painting Services",
      price: "$45",
      type: "Commercial & Residential",
      image: "/assets/images/service/4.jpg",
      location: "Elk Grove, CA",
      description: "Interior and exterior painting for homes and commercial properties."
    }
  ];

  return (
    <div className="row">
      {featuredServices.map((service) => (
        <div className="col-lg-3 col-md-6" key={service.id}>
          <div className="feat_property">
            <div className="thumb">
              <Image 
                className="img-whp" 
                src={service.image} 
                alt={service.title}
                width={350}
                height={220}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <a href="#">{service.type}</a>
                  </li>
                </ul>
                <ul className="icon mb0">
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-heart"></span>
                    </a>
                  </li>
                </ul>
                <Link
                  href={`/service-details/${service.id}`}
                  className="fp_price"
                >
                  {service.price}
                  <small>/hour</small>
                </Link>
              </div>
            </div>
            <div className="details">
              <div className="tc_content">
                <h4>
                  <Link href={`/service-details/${service.id}`}>
                    {service.title}
                  </Link>
                </h4>
                <p>
                  <span className="flaticon-placeholder"></span>
                  {service.location}
                </p>
                <p>{service.description}</p>
              </div>
              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <Link href={`/service-details/${service.id}`}>
                      <span className="flaticon-zoom"></span>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href={`/service-details/${service.id}`}>
                      Book Now
                    </Link>
                  </li>
                </ul>
                <div className="fp_pdate float-end">Available Now</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedServices;
