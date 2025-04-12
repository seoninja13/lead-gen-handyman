import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Hero from "../components/home/Hero";
import FeaturedProviders from "../components/home/FeaturedProviders";
import FindServices from "../components/home/FindServices";
import WhyChoose from "../components/common/WhyChoose";
import Testimonial from "../components/common/Testimonial";
import ArticlesTips from "../components/common/ArticlesTips";
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

        <div className="alert alert-info text-center" style={{ margin: '20px auto', maxWidth: '800px' }}>
          <p className="mb-0">Check out our <Link href="/new-design" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>new home page design</Link> based on the reference template!</p>
        </div>

        {!loading && (
          <>


            {/* Find Services Section */}
            <section className="property-city pb30">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="main-title text-center">
                      <h2>Our Featured Services</h2>
                      <p>Browse our range of professional handyman services</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <FindServices services={services.slice(0, 3)} />
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



        {/* Articles & Tips Section */}
        <section className="our-blog bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Articles & Tips</h2>
                  <p>Latest articles and tips for homeowners</p>
                </div>
              </div>
            </div>
            <div className="row">
              <ArticlesTips />
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

        {/* Become a Professional Handyman */}
        <section className="start-partners bgc-thm pt50 pb50">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="start_partner tac-smd">
                  <h2 className="color-white">Become a Professional Handyman</h2>
                  <p className="color-white">Join our network of trusted service providers and grow your business</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="parner_reg_btn text-right tac-smd">
                  <a className="btn btn-thm2" href="/register">Get Started</a>
                </div>
              </div>
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
