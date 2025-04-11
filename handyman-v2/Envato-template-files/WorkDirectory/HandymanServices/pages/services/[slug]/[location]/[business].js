import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serviceService, cityService, businessService } from '../../../../services';

const BusinessDetailPage = () => {
  const router = useRouter();
  const { slug, location, business } = router.query;

  const [service, setService] = useState(null);
  const [city, setCity] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!slug || !location || !business) return;

      try {
        // For now, use static data
        const staticServices = require('../../../../data/findServices');
        const staticCities = require('../../../../data/cities');
        const staticBusinesses = require('../../../../data/properties');
        
        const foundService = staticServices.find(s => s.slug === slug);
        const foundCity = staticCities.find(c => c.slug === location);
        
        if (!foundService || !foundCity) {
          setError('Service or location not found');
          setLoading(false);
          return;
        }
        
        setService(foundService);
        setCity(foundCity);
        
        // Find the business by slug (created from title)
        const foundBusiness = staticBusinesses.find(
          b => b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === business &&
               b.type === foundService.name && 
               b.location.toLowerCase().includes(foundCity.name.toLowerCase())
        );
        
        if (!foundBusiness) {
          setError('Business not found');
          setLoading(false);
          return;
        }
        
        setBusinessData(foundBusiness);
        setLoading(false);

        // In production, we would fetch from Supabase
        // const serviceData = await serviceService.getServiceBySlug(slug);
        // const cityData = await cityService.getCityBySlug(location);
        
        // if (!serviceData || !cityData) throw new Error('Service or location not found');
        
        // setService(serviceData);
        // setCity(cityData);
        
        // const { data: businesses } = await businessService.getBusinesses({
        //   city: cityData.name,
        //   service: slug
        // });
        
        // const foundBusiness = businesses.find(b => b.slug === business);
        
        // if (!foundBusiness) throw new Error('Business not found');
        
        // setBusinessData(foundBusiness);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching business details:', err);
        setError('Failed to load business details. Please try again later.');
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [slug, location, business]);

  if (loading) {
    return (
      <div className="preloader"></div>
    );
  }

  if (error || !service || !city || !businessData) {
    return (
      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">Business Not Found</h2>
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
        <title>{businessData.title} | {service.name} Services in {city.name}</title>
        <meta name="description" content={`${businessData.title} provides professional ${service.name.toLowerCase()} services in ${city.name}. ${businessData.description?.substring(0, 100)}...`} />
      </Head>

      <div className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">{businessData.title}</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link href="/services">Services</Link></li>
                  <li className="breadcrumb-item"><Link href={`/services/${service.slug}`}>{service.name}</Link></li>
                  <li className="breadcrumb-item"><Link href={`/services/${service.slug}/${location}`}>{city.name}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{businessData.title}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="listing_single_description">
                    <div className="lsd_list">
                      <ul className="mb0">
                        {businessData.itemDetails.map((item, index) => (
                          <li className="list-inline-item" key={index}>
                            <a href="#">{item.name}: {item.number}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h4 className="mb30">Description</h4>
                    <p className="mb25">{businessData.description}</p>
                    
                    {businessData.floorPlans && (
                      <div className="application_statics mt30">
                        <div className="row">
                          <div className="col-lg-12">
                            <h4 className="mb10">Services Offered</h4>
                          </div>
                          {businessData.floorPlans.map((plan, index) => (
                            <div className="col-sm-6 col-md-6 col-lg-6" key={index}>
                              <div className="icon_box_area style2">
                                <div className="score">
                                  <span className="text-thm">{plan.price}</span>
                                </div>
                                <div className="details">
                                  <h5>{plan.name}</h5>
                                  <p>{plan.details}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {businessData.otherFeatures && (
                      <div className="application_statics mt30">
                        <h4 className="mb30">Features</h4>
                        <ul className="order_list list-inline-item">
                          {businessData.otherFeatures.map((feature, index) => (
                            <li key={index}>
                              <span className="flaticon-tick"></span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="additional_details">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb15">Contact Information</h4>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <ul className="list-inline-item">
                          <li>
                            <p>Phone:</p>
                            <p><a href={`tel:${businessData.contactInfo?.phone}`}>{businessData.contactInfo?.phone}</a></p>
                          </li>
                          <li>
                            <p>Email:</p>
                            <p><a href={`mailto:${businessData.contactInfo?.email}`}>{businessData.contactInfo?.email}</a></p>
                          </li>
                          <li>
                            <p>Website:</p>
                            <p><a href={`https://${businessData.contactInfo?.website}`} target="_blank" rel="noopener noreferrer">{businessData.contactInfo?.website}</a></p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <ul className="list-inline-item">
                          <li>
                            <p>Address:</p>
                            <p>{businessData.address?.city}, {businessData.address?.state} {businessData.address?.zipCode}</p>
                          </li>
                          <li>
                            <p>Years in Business:</p>
                            <p>{businessData.postedYear}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {businessData.reviews && (
                  <div className="col-lg-12">
                    <div className="product_single_content">
                      <div className="mbp_pagination_comments mt30">
                        <div className="total_review">
                          <h4>{businessData.reviews.length} Reviews</h4>
                          <ul className="review_star_list mb0 pl10">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <li className="list-inline-item" key={star}>
                                <i className={`fa fa-star ${star <= Math.round(businessData.rating) ? 'text-warning' : ''}`}></i>
                              </li>
                            ))}
                            <li className="list-inline-item">{businessData.rating} out of 5</li>
                          </ul>
                        </div>
                        
                        {businessData.reviews.map((review, index) => (
                          <div className="mbp_first media" key={index}>
                            <div className="media-body">
                              <h4 className="sub_title mt-0">{review.name}</h4>
                              <div className="sspd_review dif">
                                <ul className="review_star">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <li className="list-inline-item" key={star}>
                                      <i className={`fa fa-star ${star <= review.rating ? 'text-warning' : ''}`}></i>
                                    </li>
                                  ))}
                                  <li className="list-inline-item">{review.date}</li>
                                </ul>
                              </div>
                              <p>{review.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar_listing_list">
                <div className="sidebar_advanced_search_widget">
                  <div className="sl_creator">
                    <h4 className="mb25">Contact {businessData.title}</h4>
                    <div className="media">
                      <img className="mr-3" src={businessData.posterAvatar} alt={businessData.posterName} />
                      <div className="media-body">
                        <h5 className="mt-0 mb0">{businessData.posterName}</h5>
                        <p className="mb0">{businessData.postedYear}</p>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Phone" />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-block btn-thm">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessDetailPage;
