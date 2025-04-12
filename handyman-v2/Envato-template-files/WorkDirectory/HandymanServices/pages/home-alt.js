import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "../components/common/header/MobileMenu";
import PopupSignInUp from "../components/common/PopupSignInUp";
import CopyrightFooter from "../components/common/footer/CopyrightFooter";
import Footer from "../components/common/footer/Footer";

const HomeAlt = () => {
  return (
    <>
      <Head>
        <title>Handyman Services | Professional Home Repair and Maintenance</title>
        <meta name="description" content="Find professional handyman services for all your home repair and maintenance needs. Browse our network of trusted service providers." />
      </Head>

      <div className="wrapper">
        <MobileMenu />
        <PopupSignInUp />

        {/* Hero Section */}
        <section className="home-one home1_bgi1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="home_content">
                  <div className="home-text">
                    <h2>Your Home Service Experts</h2>
                    <p>
                      Connect with our trusted and skilled home service professionals
                    </p>
                  </div>

                  {/* Search Form */}
                  <div className="home_adv_srch_opt">
                    <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="home1-advnc-search bg-white rounded">
                          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                              <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Search</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Zip Code</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">City</a>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                              <form className="row">
                                <div className="col-lg-5 col-md-5">
                                  <div className="form-group">
                                    <input type="text" className="form-control" placeholder="What service do you need?" />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                  <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter your location" />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  <div className="search_option_button">
                                    <button type="submit" className="btn btn-thm w-100">Search</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="our-services bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Our Featured Services</h2>
                  <p>Discover our most popular handyman services</p>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Service 1 */}
              <div className="col-lg-4 col-md-6">
                <div className="feat_property">
                  <div className="thumb">
                    <img
                      className="img-fluid w100"
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=340&h=230&q=80"
                      alt="Electrical Services"
                    />
                    <div className="property-tag">Featured</div>
                  </div>
                  <div className="details">
                    <div className="tc_content">
                      <h4>Top-Rated Electrical Services</h4>
                      <p><i className="fa fa-map-marker"></i> Providence, RI</p>
                      <ul className="prop_details mb0">
                        <li className="list-inline-item"><span className="flaticon-electricity pr5"></span> Electrical</li>
                      </ul>
                    </div>
                    <div className="fp_footer">
                      <ul className="fp_meta float-start mb0">
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star-half-o"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Service 2 */}
              <div className="col-lg-4 col-md-6">
                <div className="feat_property">
                  <div className="thumb">
                    <img
                      className="img-fluid w100"
                      src="https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=340&h=230&q=80"
                      alt="Plumbing Services"
                    />
                    <div className="property-tag">Featured</div>
                  </div>
                  <div className="details">
                    <div className="tc_content">
                      <h4>Expert Plumbing Services</h4>
                      <p><i className="fa fa-map-marker"></i> Atlanta, GA</p>
                      <ul className="prop_details mb0">
                        <li className="list-inline-item"><span className="flaticon-plumbing pr5"></span> Plumbing</li>
                      </ul>
                    </div>
                    <div className="fp_footer">
                      <ul className="fp_meta float-start mb0">
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Service 3 */}
              <div className="col-lg-4 col-md-6">
                <div className="feat_property">
                  <div className="thumb">
                    <img
                      className="img-fluid w100"
                      src="https://images.unsplash.com/photo-1601564921647-b446839a013a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=340&h=230&q=80"
                      alt="Carpentry Services"
                    />
                    <div className="property-tag">Featured</div>
                  </div>
                  <div className="details">
                    <div className="tc_content">
                      <h4>Quality Carpentry Services</h4>
                      <p><i className="fa fa-map-marker"></i> Alexandria, VA</p>
                      <ul className="prop_details mb0">
                        <li className="list-inline-item"><span className="flaticon-tools pr5"></span> Carpentry</li>
                      </ul>
                    </div>
                    <div className="fp_footer">
                      <ul className="fp_meta float-start mb0">
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-star-half-o"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              {/* Reason 1 */}
              <div className="col-md-4">
                <div className="why_chose_us text-center">
                  <div className="icon">
                    <div className="circle-icon bg-light-red">
                      <span className="flaticon-high-five text-thm"></span>
                    </div>
                  </div>
                  <div className="details">
                    <h4>Expert Craftsmen</h4>
                    <p>Our professionals are highly skilled and experienced in their respective trades.</p>
                  </div>
                </div>
              </div>
              
              {/* Reason 2 */}
              <div className="col-md-4">
                <div className="why_chose_us text-center">
                  <div className="icon">
                    <div className="circle-icon bg-light-blue">
                      <span className="flaticon-24-hours text-thm"></span>
                    </div>
                  </div>
                  <div className="details">
                    <h4>24/7 Emergency Service</h4>
                    <p>We're available around the clock for your urgent home repair needs.</p>
                  </div>
                </div>
              </div>
              
              {/* Reason 3 */}
              <div className="col-md-4">
                <div className="why_chose_us text-center">
                  <div className="icon">
                    <div className="circle-icon bg-light-green">
                      <span className="flaticon-shield text-thm"></span>
                    </div>
                  </div>
                  <div className="details">
                    <h4>Transparent Pricing</h4>
                    <p>No hidden fees or surprises - we provide clear, upfront pricing for all services.</p>
                  </div>
                </div>
              </div>
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
              {/* Article 1 */}
              <div className="col-lg-4">
                <div className="blog_post">
                  <div className="thumb">
                    <div className="blog-img-placeholder" style={{ width: "100%", height: "250px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "24px", color: "#888" }}>752X450</span>
                    </div>
                  </div>
                  <div className="details">
                    <div className="post_meta">
                      <ul className="mb0">
                        <li className="list-inline-item"><a href="#"><span className="flaticon-calendar pr10"></span> April 10, 2025</a></li>
                        <li className="list-inline-item"><a href="#"><span className="flaticon-user pr10"></span> Admin</a></li>
                      </ul>
                    </div>
                    <h4 className="title">
                      <Link href="/blog/essential-home-maintenance-tips">Essential Home Maintenance Tips for Every Season</Link>
                    </h4>
                    <p className="para">Learn how to keep your home in top condition year-round with these seasonal maintenance tips.</p>
                    <Link href="/blog/essential-home-maintenance-tips" className="more-link">
                      Read More <span className="flaticon-right-arrow"></span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div className="col-lg-4">
                <div className="blog_post">
                  <div className="thumb">
                    <div className="blog-img-placeholder" style={{ width: "100%", height: "250px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "24px", color: "#888" }}>752X450</span>
                    </div>
                  </div>
                  <div className="details">
                    <div className="post_meta">
                      <ul className="mb0">
                        <li className="list-inline-item"><a href="#"><span className="flaticon-calendar pr10"></span> April 5, 2025</a></li>
                        <li className="list-inline-item"><a href="#"><span className="flaticon-user pr10"></span> Admin</a></li>
                      </ul>
                    </div>
                    <h4 className="title">
                      <Link href="/blog/diy-home-repairs">10 DIY Home Repairs Anyone Can Do</Link>
                    </h4>
                    <p className="para">Save money with these simple DIY repairs that don't require professional help.</p>
                    <Link href="/blog/diy-home-repairs" className="more-link">
                      Read More <span className="flaticon-right-arrow"></span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Article 3 */}
              <div className="col-lg-4">
                <div className="blog_post">
                  <div className="thumb">
                    <div className="blog-img-placeholder" style={{ width: "100%", height: "250px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "24px", color: "#888" }}>752X450</span>
                    </div>
                  </div>
                  <div className="details">
                    <div className="post_meta">
                      <ul className="mb0">
                        <li className="list-inline-item"><a href="#"><span className="flaticon-calendar pr10"></span> March 28, 2025</a></li>
                        <li className="list-inline-item"><a href="#"><span className="flaticon-user pr10"></span> Admin</a></li>
                      </ul>
                    </div>
                    <h4 className="title">
                      <Link href="/blog/find-right-handyman">How to Find the Right Handyman for Your Project</Link>
                    </h4>
                    <p className="para">Tips for hiring the perfect handyman for your specific home improvement needs.</p>
                    <Link href="/blog/find-right-handyman" className="more-link">
                      Read More <span className="flaticon-right-arrow"></span>
                    </Link>
                  </div>
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
              <div className="col-lg-12">
                <div className="partner_slider">
                  <div className="row justify-content-center">
                    {/* Partner 1 */}
                    <div className="col-6 col-md-4 col-lg-2">
                      <div className="our_partner">
                        <img src="/assets/images/partners/1.png" alt="Partner Logo" className="img-fluid" />
                      </div>
                    </div>

                    {/* Partner 2 */}
                    <div className="col-6 col-md-4 col-lg-2">
                      <div className="our_partner">
                        <img src="/assets/images/partners/2.png" alt="Partner Logo" className="img-fluid" />
                      </div>
                    </div>

                    {/* Partner 3 */}
                    <div className="col-6 col-md-4 col-lg-2">
                      <div className="our_partner">
                        <img src="/assets/images/partners/3.png" alt="Partner Logo" className="img-fluid" />
                      </div>
                    </div>

                    {/* Partner 4 */}
                    <div className="col-6 col-md-4 col-lg-2">
                      <div className="our_partner">
                        <img src="/assets/images/partners/4.png" alt="Partner Logo" className="img-fluid" />
                      </div>
                    </div>

                    {/* Partner 5 */}
                    <div className="col-6 col-md-4 col-lg-2">
                      <div className="our_partner">
                        <img src="/assets/images/partners/5.png" alt="Partner Logo" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default HomeAlt;
