/**
 * WhyChoose Component
 * 
 * This component displays reasons why customers should choose our handyman services.
 * Adapted from the Envato template's WhyChoose component.
 */

import React from 'react';

const WhyChoose = () => {
  // Sample reasons data
  const reasons = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Trusted Professionals",
      text: "All our handymen are vetted, licensed, and insured professionals with years of experience."
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: "Quality Workmanship",
      text: "We stand behind our work with a satisfaction guarantee on all services."
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Competitive Pricing",
      text: "Fair, transparent pricing with no hidden fees or surprise charges."
    },
    {
      id: 4,
      icon: "flaticon-heart",
      title: "Customer Satisfaction",
      text: "Our priority is your satisfaction, with over 95% of customers rating us 5 stars."
    }
  ];

  return (
    <>
      {reasons.map((item) => (
        <div className="col-md-6 col-lg-3 col-xl-3" key={item.id}>
          <div className="why_chose_us">
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
