/**
 * WhyChoose Component
 * 
 * This component displays reasons why customers should choose our handyman services.
 * Adapted from the Envato template's WhyChoose component.
 */

import React from 'react';
import Link from 'next/link';

const WhyChoose = () => {
  // Sample reasons data
  const reasons = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Trusted Professionals",
      description: "All our handymen are vetted, background-checked, and highly skilled in their trade."
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: "Quality Workmanship",
      description: "We stand behind our work with satisfaction guarantees and follow-up service."
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Competitive Pricing",
      description: "Transparent pricing with no hidden fees. Get quotes upfront before work begins."
    }
  ];

  return (
    <>
      <div className="col-lg-6 offset-lg-3">
        <div className="main-title text-center">
          <h2>Why Choose Us</h2>
          <p>We deliver quality handyman services with a focus on reliability and customer satisfaction</p>
        </div>
      </div>
      
      {reasons.map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className="why_chose_us">
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
