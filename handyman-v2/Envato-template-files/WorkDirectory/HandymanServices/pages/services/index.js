import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { serviceService } from '../../services';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // For now, use static data
        const staticServices = require('../../data/findServices');
        setServices(staticServices);
        setLoading(false);

        // In production, we would fetch from Supabase
        // const { data, error } = await serviceService.getServices();
        // if (error) throw error;
        // setServices(data);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Head>
        <title>Handyman Services | Find Professional Services Near You</title>
        <meta name="description" content="Browse our wide range of professional handyman services including electrical, plumbing, carpentry, painting, and more." />
      </Head>

      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">Our Services</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Services</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="our-service bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Professional Handyman Services</h2>
                <p>Find the right service for your home maintenance and repair needs</p>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>Loading services...</p>
              </div>
            </div>
          ) : error ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <p className="text-danger">{error}</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {services.map((service) => (
                <div className={`col-sm-6 col-md-4 ${service.column}`} key={service.id}>
                  <Link href={`/services/${service.slug}`}>
                    <div className="service_grid">
                      <div className="thumb">
                        <img className="img-fluid w100" src={service.img} alt={service.name} />
                      </div>
                      <div className="details">
                        <h4>{service.name}</h4>
                        <p>{service.number} Providers</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
