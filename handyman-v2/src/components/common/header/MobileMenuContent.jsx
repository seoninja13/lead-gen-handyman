/**
 * MobileMenuContent Component
 * 
 * This component displays the content of the mobile navigation menu.
 * Adapted from the Envato template's MobileMenuContent component.
 */

'use client'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MobileMenuContent = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("");

  const toggleSubMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu("");
    } else {
      setActiveMenu(menuName);
    }
  };

  // Define menu items for services dropdown
  const services = [
    {
      id: 1,
      name: "Plumbing",
      routerPath: "/services/plumbing",
    },
    {
      id: 2,
      name: "Electrical",
      routerPath: "/services/electrical",
    },
    {
      id: 3,
      name: "Carpentry",
      routerPath: "/services/carpentry",
    },
    {
      id: 4,
      name: "Painting",
      routerPath: "/services/painting",
    },
    {
      id: 5,
      name: "Flooring",
      routerPath: "/services/flooring",
    },
    {
      id: 6,
      name: "Roofing",
      routerPath: "/services/roofing",
    },
  ];

  // Define menu items for locations dropdown
  const locations = [
    {
      id: 1,
      name: "Sacramento",
      routerPath: "/locations/sacramento",
    },
    {
      id: 2,
      name: "San Francisco",
      routerPath: "/locations/san-francisco",
    },
    {
      id: 3,
      name: "Los Angeles",
      routerPath: "/locations/los-angeles",
    },
    {
      id: 4,
      name: "San Diego",
      routerPath: "/locations/san-diego",
    },
  ];

  return (
    <div className="offcanvas-body">
      <div className="offcanvas-header">
        <div className="offcanvas-logo">
          <Link href="/">
            <img
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/header-logo2.png"
              alt="Handyman Services"
            />
          </Link>
        </div>
        {/* End .offcanvas-logo */}
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      {/* End .offcanvas-header */}

      <div className="mobile-menu-list">
        <ul className="navbar-nav">
          {/* Home */}
          <li className={router.pathname === "/" ? "active" : ""}>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>

          {/* Services */}
          <li className={router.pathname.includes("/services") ? "active" : ""}>
            <a
              className="nav-link"
              role="button"
              onClick={() => toggleSubMenu("services")}
            >
              Services
              <span className="flaticon-right-arrow"></span>
            </a>
            <ul
              className={`dropdown-menu ${
                activeMenu === "services" ? "show" : ""
              }`}
            >
              {services.map((item) => (
                <li key={item.id}>
                  <Link href={item.routerPath} className="dropdown-item">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Locations */}
          <li className={router.pathname.includes("/locations") ? "active" : ""}>
            <a
              className="nav-link"
              role="button"
              onClick={() => toggleSubMenu("locations")}
            >
              Locations
              <span className="flaticon-right-arrow"></span>
            </a>
            <ul
              className={`dropdown-menu ${
                activeMenu === "locations" ? "show" : ""
              }`}
            >
              {locations.map((item) => (
                <li key={item.id}>
                  <Link href={item.routerPath} className="dropdown-item">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* About */}
          <li className={router.pathname === "/about" ? "active" : ""}>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>

          {/* Blog */}
          <li className={router.pathname.includes("/blog") ? "active" : ""}>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
          </li>

          {/* Contact */}
          <li className={router.pathname === "/contact" ? "active" : ""}>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      {/* End .mobile-menu-list */}

      <div className="mobile-menu-contact-info">
        <div className="contact-info">
          <h5 className="mb20">Contact Info</h5>
          <div className="contact-info-details">
            <p>
              <span className="flaticon-phone-call"></span>
              <a href="tel:+1234567890">(123) 456-7890</a>
            </p>
            <p>
              <span className="flaticon-email"></span>
              <a href="mailto:info@handymanservices.com">info@handymanservices.com</a>
            </p>
            <p>
              <span className="flaticon-map-marker"></span>
              123 Main Street, Sacramento, CA 95814
            </p>
          </div>
        </div>
        {/* End .contact-info */}

        <div className="mobile-menu-social-links">
          <h5 className="mb20">Follow Us</h5>
          <ul className="social-icons">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="flaticon-facebook"></span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="flaticon-twitter"></span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="flaticon-instagram"></span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="flaticon-linkedin"></span>
              </a>
            </li>
          </ul>
        </div>
        {/* End .mobile-menu-social-links */}
      </div>
      {/* End .mobile-menu-contact-info */}
    </div>
  );
};

export default MobileMenuContent;
