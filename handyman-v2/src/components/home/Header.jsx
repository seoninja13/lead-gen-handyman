/**
 * Header Component
 * 
 * This component renders the main navigation header for the handyman services application.
 * Adapted from the Envato template's Header component.
 */

'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeaderMenuContent from '../common/header/HeaderMenuContent';

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link href="/" className="navbar_brand float-start dn-smd">
          <img
            className="logo1 img-fluid"
            src="/assets/images/header-logo.png"
            alt="header-logo.png"
          />
          <img
            className="logo2 img-fluid"
            src="/assets/images/header-logo2.png"
            alt="header-logo2.png"
          />
          <span>Handyman Services</span>
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
