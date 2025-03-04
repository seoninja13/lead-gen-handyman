/**
 * Home Page
 * 
 * This is the main landing page for the Handyman Lead Generation application.
 * It uses the Envato template components adapted for handyman services.
 * Testing functionality is isolated to the /test route.
 */

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import components from the Envato template structure
const Header = dynamic(() => import('../components/home/Header'), { ssr: false });
const Hero = dynamic(() => import('../components/home/Hero'), { ssr: false });
const FeaturedServices = dynamic(() => import('../components/home/FeaturedServices'), { ssr: false });
const FindServices = dynamic(() => import('../components/home/FindServices'), { ssr: false });
const CallToAction = dynamic(() => import('../components/common/CallToAction'), { ssr: false });
const Footer = dynamic(() => import('../components/common/footer/Footer'), { ssr: false });
const CopyrightFooter = dynamic(() => import('../components/common/footer/CopyrightFooter'), { ssr: false });
const WhyChoose = dynamic(() => import('../components/common/WhyChoose'), { ssr: false });
const Partners = dynamic(() => import('../components/common/Partners'), { ssr: false });
const MobileMenu = dynamic(() => import('../components/common/header/MobileMenu'), { ssr: false });
const PopupSignInUp = dynamic(() => import('../components/common/PopupSignInUp'), { ssr: false });
const Blogs = dynamic(() => import('../components/common/Blogs'), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Home Design --> */}
      <Hero />

      {/* <!-- Featured Services --> */}
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Featured Services</h2>
                <p>Professional handyman services for your home.</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedServices />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Service Areas --> */}
      <section id="property-city" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Find Services in These Areas</h2>
                <p>Professional handyman services available in these locations.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <FindServices />
          </div>
        </div>
      </section>

      {/* <!-- Why Choose Us --> */}
      <section id="why-chose" className="whychose_us bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>We provide full service at every step.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section>

      {/* <!-- Our Blog --> */}
      <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Articles & Tips</h2>
                <p>Helpful resources for home maintenance and repairs.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Blogs />
          </div>
        </div>
      </section>

      {/* <!-- Our Partners --> */}
      <section id="our-partners" className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Partners</h2>
                <p>We only work with the best companies around the globe</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Partners />
          </div>
        </div>
      </section>

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
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

      {/* Developer Tools Link (Hidden in UI but accessible via URL) */}
      <div style={{ display: 'none' }}>
        <Link href="/test">Developer Tools</Link>
      </div>
    </>
  );
}
