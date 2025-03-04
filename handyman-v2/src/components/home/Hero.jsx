/**
 * Hero Component
 * 
 * This component renders the hero section of the home page, including
 * a search form for finding handyman services.
 * Adapted from the Envato template's Hero component.
 */

'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for', service, 'in', location);
    // In a real application, this would redirect to search results
    if (service && location) {
      router.push(`/services/${service.toLowerCase().replace(/\s+/g, '-')}-${location.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <section className="home-one home1-overlay home1_bgi1">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <div className="home_content">
              <div className="home-text text-center">
                <h2 className="fz55">Find Your Local Handyman Services</h2>
                <p className="fz18 color-white">Professional and reliable handyman services for all your home repair needs</p>
              </div>
              <div className="home_adv_srch_opt">
                <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="home1-advnc-search">
                      <form onSubmit={handleSearch}>
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="form-group">
                              <label>Service Type</label>
                              <select 
                                className="form-select form-control"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                              >
                                <option value="">Select Service</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Carpentry">Carpentry</option>
                                <option value="Painting">Painting</option>
                                <option value="Flooring">Flooring</option>
                                <option value="Roofing">Roofing</option>
                                <option value="General Handyman">General Handyman</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="form-group">
                              <label>Location</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="City, State or ZIP"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="search_option_button">
                              <button type="submit" className="btn btn-thm btn-search w-100">
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mouse_scroll">
        <a href="#feature-property">
          <div className="icon">
            <h4>Scroll Down</h4>
            <p>to discover more</p>
          </div>
          <div className="thumb">
            <img src="/assets/images/resource/mouse.png" alt="mouse.png" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
