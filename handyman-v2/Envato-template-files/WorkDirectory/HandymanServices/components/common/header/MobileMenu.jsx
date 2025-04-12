import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mobile-menu">
        <div className="header_user_notif text-end">
          <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
            <span className={isOpen ? "cross" : ""}></span>
            <span className={isOpen ? "cross" : ""}></span>
            <span className={isOpen ? "cross" : ""}></span>
          </div>
        </div>

        <div className={`mobile-menu-content ${isOpen ? "active" : ""}`}>
          <div className="mobile-menu-main">
            <ul className="mobile-menu-list">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default MobileMenu;
