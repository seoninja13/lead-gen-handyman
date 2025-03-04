/**
 * HeaderMenuContent Component
 * 
 * This component renders the main navigation menu content.
 * Adapted from the Envato template's HeaderMenuContent component.
 */

'use client'
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderMenuContent = ({ float = "" }) => {
  const router = useRouter();
  
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
    <div className={`menu-and-user ${float}`}>
      <div className="ace-responsive-menu">
        <ul>
          {/* Home */}
          <li className={router.pathname === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>

          {/* Services */}
          <li className={router.pathname.includes("/services") ? "active" : ""}>
            <Link href="/services">
              Services
              <span className="caret"></span>
            </Link>
            <ul>
              {services.map((item) => (
                <li key={item.id}>
                  <Link href={item.routerPath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Locations */}
          <li className={router.pathname.includes("/locations") ? "active" : ""}>
            <Link href="/locations">
              Locations
              <span className="caret"></span>
            </Link>
            <ul>
              {locations.map((item) => (
                <li key={item.id}>
                  <Link href={item.routerPath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* About */}
          <li className={router.pathname === "/about" ? "active" : ""}>
            <Link href="/about">About</Link>
          </li>

          {/* Blog */}
          <li className={router.pathname.includes("/blog") ? "active" : ""}>
            <Link href="/blog">Blog</Link>
          </li>

          {/* Contact */}
          <li className={router.pathname === "/contact" ? "active" : ""}>
            <Link href="/contact">Contact</Link>
          </li>

          {/* Developer Tools (hidden in regular menu) */}
          <li className={router.pathname === "/test" ? "active" : ""} style={{ display: 'none' }}>
            <Link href="/test">Developer Tools</Link>
          </li>
        </ul>
      </div>

      {/* Right side user controls */}
      <div className="header_user_notif">
        <div className="header_user_notif_icon">
          <span className="flaticon-user"></span>
        </div>
        <div className="header_user_notif_dropdown">
          <ul>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
          </ul>
        </div>
      </div>

      {/* Add Listing Button */}
      <div className="add_listing">
        <Link href="/get-quote">
          <span className="icon">+</span> Get a Quote
        </Link>
      </div>
    </div>
  );
};

export default HeaderMenuContent;
