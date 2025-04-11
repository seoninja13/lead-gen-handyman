import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serviceService, businessService } from '../../services';

const ServiceDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [service, setService] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!slug) return;

      try {
        // For now, use static data
        const staticServices = require('../../data/findServices');
        const staticBusinesses = require('../../data/properties');
        
        const foundService = staticServices.find(s => s.slug === slug);
        if (!foundService) {
          setError('Service not found');
          setLoading(false);
          return;
        }
        
        setService(foundService);
        
        // Filter businesses by service type (using the service name as the type)
        const filteredBusinesses = staticBusinesses.filter(b => b.type === foundService.name);
        setBusinesses(filteredBusinesses);
        setLoading(false);

        // In production, we would fetch from Supabase
        // const serviceData = await serviceService.getServiceBySlug(slug);
        // if (!serviceData) throw new Error('Service not found');
        // setService(serviceData);
        
        // const { data: businessData } = await serviceService.getBusinessesByService(slug);
        // setBusinesses(businessData || []);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="preloader"></div>
    );
  }

  if (error || !service) {
    return (
      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">Service Not Found</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link href="/services">Services</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Not Found</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.name} Services | Professional Handyman Services</title>
        <meta name="description" content={`Find professional ${service.name.toLowerCase()} services for your home. Browse our list of qualified service providers.`} />
      </Head>

      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">{service.name} Services</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link href="/services">Services</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{service.name}</li>
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
                <h2>Professional {service.name} Services</h2>
                <p>Find the right {service.name.toLowerCase()} professional for your needs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <div className="col-lg-4 col-xl-4" key={business.id}>
                  <div className="feat_property">
                    <div className="thumb">
                      <img className="img-whp" src={business.img} alt={business.title} />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          {business.saleTag.map((tag, index) => (
                            <li className="list-inline-item" key={index}>
                              <a href="#">{tag}</a>
                            </li>
                          ))}
                        </ul>
                        <ul className="icon mb0">
                          <li className="list-inline-item">
                            <a href="#">
                              <span className="flaticon-transfer-1"></span>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <span className="flaticon-heart"></span>
                            </a>
                          </li>
                        </ul>
                        <Link 
                          className="fp_price" 
                          href={`/services/${service.slug}/${business.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}/${business.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        >
                          {business.price}
                        </Link>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <p className="text-thm">{business.type}</p>
                        <h4>
                          <Link 
                            href={`/services/${service.slug}/${business.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}/${business.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          >
                            {business.title}
                          </Link>
                        </h4>
                        <p>
                          <span className="flaticon-placeholder"></span> {business.location}
                        </p>
                        <ul className="prop_details mb0">
                          {business.itemDetails.map((item, index) => (
                            <li className="list-inline-item" key={index}>
                              <a href="#">
                                {item.name}: {item.number}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="fp_footer">
                        <ul className="fp_meta float-start mb0">
                          <li className="list-inline-item">
                            <a href="#">
                              <img src={business.posterAvatar} alt={business.posterName} />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">{business.posterName}</a>
                          </li>
                        </ul>
                        <div className="fp_pdate float-end">{business.postedYear}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-lg-12 text-center">
                <p>No service providers found for {service.name}. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
