'use client';

import React from 'react';

const FAQ = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-16">
      <h2 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
      {/* Replace with actual FAQ items */}
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-2">How long does a typical handyman project take?</h3>
        <p>The duration of a handyman project varies depending on the complexity and scope of the work. Simple tasks may take only a few hours, while larger projects can take several days.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-2">Do you offer free estimates?</h3>
        <p>Yes, we offer free estimates for all handyman projects. Contact us to schedule a consultation, and we'll provide you with a detailed estimate.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-2">Are you licensed and insured?</h3>
        <p>Yes, we are fully licensed and insured for your protection and peace of mind.</p>
      </div>
    </section>
  );
};

export default FAQ;
