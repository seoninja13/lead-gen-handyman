/**
 * Footer Component
 * 
 * This component displays the main footer with multiple columns.
 * Adapted from the Envato template's Footer component.
 */

import React from 'react';
import Link from 'next/link';
import Social from './Social';
import SubscribeForm from './SubscribeForm';

const Footer = () => {
  return (
    <section className="footer_one">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="footer_about_widget">
              <h4>About Us</h4>
              <p>
                We provide professional handyman services for residential and commercial properties.
                Our team of skilled professionals is dedicated to delivering quality workmanship.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="footer_qlink_widget">
              <h4>Quick Links</h4>
              <ul className="list-unstyled">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="footer_contact_widget">
              <h4>Contact Us</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:info@handymanservices.com">
                    <span className="flaticon-email"></span>
                    info@handymanservices.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890">
                    <span className="flaticon-phone-call"></span>
                    (123) 456-7890
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="flaticon-pin"></span>
                    123 Main Street, Sacramento, CA 95814
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="footer_social_widget">
              <h4>Follow Us</h4>
              <Social />
            </div>
            <div className="footer_subscribe_widget">
              <h4>Subscribe</h4>
              <p>Subscribe to our newsletter for updates</p>
              <SubscribeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
