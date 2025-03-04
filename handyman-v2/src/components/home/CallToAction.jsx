/**
 * CallToAction Component
 * 
 * This component displays a call-to-action section encouraging users to get a quote.
 * Adapted from the Envato template's CallToAction component.
 */

import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_creating">
          <h2>Need a Handyman Service Today?</h2>
          <p>
            Our professional handymen are ready to help with your home repairs and improvements.
            Get a free quote and book your service today!
          </p>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="start_creating_btn">
          <Link
            href="/get-quote"
            className="btn btn-thm btn-thm-2 rounded"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
