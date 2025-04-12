import Link from "next/link";
import Social from "./Social";

const Footer = () => {
  return (
    <>
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_about_widget">
                <h4>About Site</h4>
                <p>
                  We're dedicated to connecting homeowners with skilled handyman services.
                  Find reliable professionals for all your home maintenance and improvement needs.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_qlink_widget">
                <h4>Quick Links</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_contact_widget">
                <h4>Contact Us</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </li>
                  <li>
                    <a href="mailto:info@handyman.com">info@handyman.com</a>
                  </li>
                  <li>
                    <a>123 Business Street, Suite 100, City, State 12345</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_social_widget">
                <h4>Follow us</h4>
                <Social />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
