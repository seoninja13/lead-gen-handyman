'use client'

import { businesses } from "@/data/businesses";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BusinessGallery from "./BusinessGallery";
import DetailsContent from "./DetailsContent";
import Sidebar from "./Sidebar";
import BusinessLocation from "./BusinessLocation";
import TabDetails from "./TabDetails";

const BusinessDetails = ({ businessId }) => {
  const business = businesses.find((b) => b.id === businessId) || businesses[0];

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!-- Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <section className="single_page_listing_style p0 mt85 md-mt0">
        <div className="container-fluid p0">
          <BusinessGallery business={business} />
        </div>
      </section>

      {/* <!-- Business Details --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description2 mt30-767 mb30-767">
                <div className="single_property_title">
                  <h2>{business.name}</h2>
                  <p>{business.address}</p>
                </div>
                <div className="single_property_social_share style2 static-title">
                  <div className="price">
                    <h2>
                      {business.rating} Stars
                      <small>({business.reviewCount}+ Reviews)</small>
                    </h2>
                  </div>
                </div>
              </div>
              {/* End .listing_single_description2 */}

              <DetailsContent business={business} />

              <div className="listing_single_description style2">
                <div className="lsd_list">
                  <TabDetails business={business} />
                </div>
              </div>
              {/* End .listing_single_description */}

              <div className="listing_single_description style2 mt30">
                <div className="lsd_list">
                  <BusinessLocation business={business} />
                </div>
              </div>
              {/* End .listing_single_description */}
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar business={business} />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default BusinessDetails;
