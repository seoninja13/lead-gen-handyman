'use client'

import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumb from "./BreadCrumb";
import BusinessCard from "./BusinessCard";
import Filtering from "./Filtering";
import GridListButton from "../common/listing/GridListButton";
import ShowFilter from "../common/listing/ShowFilter";
import Pagination from "../common/blog/Pagination";
import Footer from "../common/footer/Footer";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import FeaturedBusinesses from "./FeaturedBusinesses";
import FilterTopBar from './FilterTopBar';

const BusinessesList = () => {
  const businesses = [
    {
      id: 1,
      name: "John's Handyman Services",
      description: "Professional handyman services with over 15 years of experience. Specializing in home repairs, maintenance, and improvements.",
      rating: 4.8,
      reviewCount: 120,
      experience: "15 years",
      projectsCompleted: "500+",
      satisfaction: "98%",
      services: ["Home Repairs", "Maintenance", "Improvements", "Carpentry", "Painting"],
      gallery: [{ image: "/assets/images/property/fp1.jpg" }],
    },
    // Add more businesses here
  ];

  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Modal */}
      <PopupSignInUp />

      {/* Listing Grid View */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb />
            </div>
            {/* End .col */}

            <div className="col-lg-6 position-relative">
              <div className="listing_list_style mb20-xsd tal-991">
                <GridListButton />
              </div>
              {/* End list grid */}

              <div className="dn db-991 mt30 mb0">
                <ShowFilter />
              </div>
              {/* End button for mobile sidebar show */}
            </div>
            {/* End .col filter grid list */}
          </div>
          {/* End Page Breadcrumb and Grid,List and filter Button */}

          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <div className="sidebar_advanced_search_widget">
                  <h4 className="mb25">Filter</h4>
                  <Filtering />
                </div>
              </div>
              {/* End .sidebar-listing-wrapper */}

              <div className="terms_condition_widget style2">
                <h4 className="title">Featured Businesses</h4>
                <div className="sidebar_feature_property_slider">
                  <FeaturedBusinesses />
                </div>
              </div>
              {/* End Featured Businesses */}
            </div>
            {/* End sidebar content */}

            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result">
                <div className="row align-items-center">
                  <FilterTopBar />
                </div>
              </div>
              {/* End .grid_list_search_result */}

              <div className="row">
                {businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination />
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Start Footer */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* Start Copyright */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default BusinessesList;
