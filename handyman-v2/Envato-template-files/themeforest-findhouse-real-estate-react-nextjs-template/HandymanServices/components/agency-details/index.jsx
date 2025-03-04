import Image from "next/image";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumb2 from "./BreadCrumb2";
import SidebarListings from "./SidebarListings";
import TabDetailsContent from "./TabDetailsContent";

const serviceData = {
  carpentry: {
    title: "Professional Carpentry Services",
    description: "Expert carpentry solutions for all your woodworking needs",
    image: "/assets/images/services/carpentry.jpg",
    features: ["Custom Woodworking", "Cabinet Installation", "Door & Window Repair", "Deck Building"],
    pricing: "Starting from $75/hour",
  },
  plumbing: {
    title: "Professional Plumbing Services",
    description: "Reliable plumbing solutions for your home",
    image: "/assets/images/services/plumbing.jpg",
    features: ["Leak Repair", "Pipe Installation", "Drain Cleaning", "Water Heater Service"],
    pricing: "Starting from $85/hour",
  },
  electrical: {
    title: "Professional Electrical Services",
    description: "Licensed electrical services for your safety",
    image: "/assets/images/services/electrical.jpg",
    features: ["Wiring Installation", "Panel Upgrades", "Lighting Installation", "Safety Inspections"],
    pricing: "Starting from $90/hour",
  },
  // Add more services as needed
};

const index = ({ service }) => {
  const currentService = service ? serviceData[service] : null;

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Service Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <BreadCrumb2 service={service} />
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="feat_property list agency">
                    <div className="thumb">
                      <Image
                        width={265}
                        height={232}
                        className="img-whp contain"
                        src={currentService?.image || "/assets/images/services/default.jpg"}
                        alt={currentService?.title || "Service Image"}
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item">
                            <a href="#">{currentService?.pricing || "Contact for Pricing"}</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="details">
                      <div className="tc_content">
                        <h4>{currentService?.title || "Professional Handyman Services"}</h4>
                        <p className="text-thm">{currentService?.description || "Expert home services and repairs"}</p>
                        <ul className="prop_details mb0">
                          {currentService?.features?.map((feature, index) => (
                            <li className="list-inline-item" key={index}>
                              <a href="#">{feature}</a>
                            </li>
                          )) || (
                            <li className="list-inline-item">
                              <a href="#">Professional Services</a>
                            </li>
                          )}
                        </ul>
                      </div>
                      {/* End .tc_content */}

                      <div className="fp_footer">
                        <ul className="fp_meta float-start mb0">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">(5 Reviews)</a>
                          </li>
                        </ul>
                        <div className="fp_pdate float-end text-thm">
                          Book Now <i className="fa fa-arrow-right"></i>
                        </div>
                      </div>
                      {/* End .fp_footer */}
                    </div>
                  </div>
                  {/* End .feat_property */}

                  <div className="shop_single_tab_content style2 mt30">
                    <TabDetailsContent service={service} />
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-md-12 col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <SidebarListings />
            </div>
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
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

export default index;
