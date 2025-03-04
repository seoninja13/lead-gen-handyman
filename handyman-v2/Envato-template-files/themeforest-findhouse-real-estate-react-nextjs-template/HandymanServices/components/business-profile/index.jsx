'use client'

import { useParams } from 'next/navigation';
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import Footer from "../common/footer/Footer";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import TabDetails from "../business-details/TabDetails";
import BusinessGallery from "../business-details/BusinessGallery";
import DetailsContent from "../business-details/DetailsContent";
import Sidebar from "../business-details/Sidebar";

const BusinessProfile = () => {
  const params = useParams();

  // This would normally come from an API or database
  const business = {
    id: 1,
    name: "John's Handyman Services",
    description: "Professional handyman services with over 15 years of experience. Specializing in home repairs, maintenance, and improvements.",
    rating: 4.8,
    reviewCount: 120,
    experience: "15 years",
    projectsCompleted: "500+",
    satisfaction: "98%",
    services: ["Home Repairs", "Maintenance", "Improvements", "Carpentry", "Painting"],
    gallery: [
      { image: "/assets/images/property/fp1.jpg" },
      { image: "/assets/images/property/fp2.jpg" },
      { image: "/assets/images/property/fp3.jpg" },
    ],
    reviews: [
      {
        name: "Jane Smith",
        avatar: "/assets/images/testimonial/1.jpg",
        rating: 5,
        date: "January 15, 2024",
        comment: "Excellent service! Very professional and thorough with their work.",
      },
      // Add more reviews
    ],
    pastProjects: [
      {
        title: "Kitchen Renovation",
        description: "Complete kitchen remodel including cabinet installation and countertop replacement.",
        image: "/assets/images/property/fp4.jpg",
        date: "December 2023",
        location: "Los Angeles, CA",
      },
      // Add more projects
    ],
    credentials: [
      {
        title: "Licensed Contractor",
        issuer: "State of California",
        date: "2020",
      },
      {
        title: "Certified Handyman",
        issuer: "National Handyman Association",
        date: "2018",
      },
      // Add more credentials
    ],
  };

  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Modal */}
      <PopupSignInUp />

      {/* Business Profile Content */}
      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          <BusinessGallery business={business} />
        </div>
      </section>

      {/* Business Description */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description style2">
                <div className="lsd_list">
                  <DetailsContent business={business} />
                </div>
              </div>
              {/* End .listing_single_description */}

              <div className="listing_single_description style2 mt30">
                <div className="lsd_list">
                  <TabDetails business={business} />
                </div>
              </div>
              {/* End .listing_single_description */}
            </div>
            {/* End .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar business={business} />
            </div>
            {/* End .col-lg-4 */}
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

export default BusinessProfile;
