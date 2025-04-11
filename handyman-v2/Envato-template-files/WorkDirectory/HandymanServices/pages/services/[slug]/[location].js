import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serviceService, cityService, businessService } from '../../../services';

const ServiceLocationPage = () => {
  const router = useRouter();
  const { slug, location } = router.query;

  const [service, setService] = useState(null);
  const [city, setCity] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceLocationDetails = async () => {
      if (!slug || !location) return;

      try {
        // For now, use static data
        const staticServices = require('../../../data/findServices');
        const staticCities = require('../../../data/cities');
        const staticBusinesses = require('../../../data/properties');
        
        const foundService = staticServices.find(s => s.slug === slug);
        const foundCity = staticCities.find(c => c.slug === location);
        
        if (!foundService || !foundCity) {
          setError('Service or location not found');
          setLoading(false);
          return;
        }
        
        setService(foundService);
        setCity(foundCity);
        
        // Filter businesses by service type and city
        const filteredBusinesses = staticBusinesses.filter(
          b => b.type === foundService.name && 
               b.location.toLowerCase().includes(foundCity.name.toLowerCase())
        );
        
        setBusinesses(filteredBusinesses);
        setLoading(false);

        // In production, we would fetch from Supabase
        // const serviceData = await serviceService.getServiceBySlug(slug);
        // const cityData = await cityService.getCityBySlug(location);
        
        // if (!serviceData || !cityData) throw new Error('Service or location not found');
        
        // setService(serviceData);
        // setCity(cityData);
        
        // const { data: businessData } = await businessService.getBusinesses({
        //   city: cityData.name,
        //   service: slug
        // });
        
        // setBusinesses(businessData || []);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching service location details:', err);
        setError('Failed to load service location details. Please try again later.');
        setLoading(false);
      }
    };

    fetchServiceLocationDetails();
  }, [slug, location]);

  if (loading) {
    return (
      <div className="preloader"></div>
    );
  }

  if (error || !service || !city) {
    return (
      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">Service or Location Not Found</h2>
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
        <title>{service.name} Services in {city.name} | Professional Handyman Services</title>
        <meta name="description" content={`Find professional ${service.name.toLowerCase()} services in ${city.name}. Browse our list of qualified service providers in your area.`} />
      </Head>

      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">{service.name} Services in {city.name}</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link href="/services">Services</Link></li>
                  <li className="breadcrumb-item"><Link href={`/services/${service.slug}`}>{service.name}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{city.name}</li>
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
                <h2>Professional {service.name} Services in {city.name}</h2>
                <p>Find the right {service.name.toLowerCase()} professional in {city.name} for your needs</p>
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
                          href={`/services/${service.slug}/${location}/${business.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
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
                            href={`/services/${service.slug}/${location}/${business.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
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
                <p>No {service.name} service providers found in {city.name}. Please check back later or try a different location.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceLocationPage;
