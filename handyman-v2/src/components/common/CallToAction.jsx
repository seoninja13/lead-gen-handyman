/**
 * CallToAction Component
 * 
 * This component displays a call-to-action section.
 * Adapted from the Envato template's CallToAction component.
 */

import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>Need a Professional Handyman?</h2>
          <p>Get connected with top-rated handyman professionals in your area.</p>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/contact" className="btn btn-thm2">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
