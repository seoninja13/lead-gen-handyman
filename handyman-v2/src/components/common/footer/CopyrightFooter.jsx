/**
 * CopyrightFooter Component
 * 
 * This component displays the copyright footer section.
 * Adapted from the Envato template's CopyrightFooter component.
 */

import React from 'react';
import Link from 'next/link';

const CopyrightFooter = () => {
  return (
    <div className="footer_middle_area pt30 pb30">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-6">
            <div className="footer_menu_widget">
              <ul className="list-unstyled">
                <li className="list-inline-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/services">Services</Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/about">About</Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="copyright-widget text-end">
              <p>
                &copy; {new Date().getFullYear()} Handyman Services. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
