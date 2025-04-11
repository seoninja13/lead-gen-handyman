import dynamic from "next/dynamic";
import Head from "next/head";
import Hero from "../components/home/Hero";
import FeaturedProperties from "../components/home/FeaturedProperties";
import FindProperties from "../components/home/FindProperties";
import WhyChoose from "../components/common/WhyChoose";
import Testimonial from "../components/common/Testimonial";
import CopyrightFooter from "../components/common/footer/CopyrightFooter";
import Footer from "../components/common/footer/Footer";
import MobileMenu from "../components/common/header/MobileMenu";
import Partners from "../components/common/Partners";
import PopupSignInUp from "../components/common/PopupSignInUp";
import { useEffect, useState } from "react";
import { businessService, serviceService, cityService } from "../services";

const Home = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For now, use static data
        const staticBusinesses = require('../data/properties');
        const staticServices = require('../data/findServices');
        const staticCities = require('../data/cities');
        
        // Filter featured businesses
        const featured = staticBusinesses.filter(business => business.featured === 'Yes');
        setFeaturedBusinesses(featured);
        
        setServices(staticServices);
        setCities(staticCities);
        setLoading(false);

        // In production, we would fetch from Supabase
        // const { data: featuredData } = await businessService.getFeaturedBusinesses(6);
        // setFeaturedBusinesses(featuredData || []);
        
        // const { data: servicesData } = await serviceService.getServices();
        // setServices(servicesData || []);
        
        // const { data: citiesData } = await cityService.getCities();
        // setCities(citiesData || []);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Handyman Services | Professional Home Repair and Maintenance</title>
        <meta name="description" content="Find professional handyman services for all your home repair and maintenance needs. Browse our network of trusted service providers." />
      </Head>
      
      <div className="wrapper">
        <MobileMenu />
        <PopupSignInUp />
        
        <Hero />
        
        {!loading && (
          <>
            {/* Featured Businesses Section */}
            <section className="featured-properties bgc-f7">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="main-title text-center mb40">
                      <h2>Featured Service Providers</h2>
                      <p>Handpicked professionals for your home repair needs</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="feature_property_slider">
                      <FeaturedProperties featuredProperties={featuredBusinesses} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Find Services Section */}
            <section className="property-city pb30">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="main-title text-center">
                      <h2>Find Services</h2>
                      <p>Browse our range of professional handyman services</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <FindProperties services={services} />
                </div>
              </div>
            </section>
            
            {/* Cities Section */}
            <section className="property-city pb30">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="main-title text-center">
                      <h2>Find Services by City</h2>
                      <p>Browse service providers in your area</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <FindProperties services={cities} />
                </div>
              </div>
            </section>
          </>
        )}
        
        {/* Why Choose Us Section */}
        <section className="why-chose-us bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Why Choose Us</h2>
                  <p>We provide full service at every step</p>
                </div>
              </div>
            </div>
            <div className="row">
              <WhyChoose />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="our-testimonials">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Testimonials</h2>
                  <p>Here's what our customers say</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="testimonial_slider_home1">
                  <Testimonial />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="our-partners">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Our Partners</h2>
                  <p>We only work with the best companies</p>
                </div>
              </div>
            </div>
            <div className="row">
              <Partners />
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <section className="footer_one">
          <div className="container">
            <div className="row">
              <Footer />
            </div>
          </div>
        </section>
        
        {/* Copyright */}
        <section className="footer_middle_area pt40 pb40">
          <div className="container">
            <CopyrightFooter />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
