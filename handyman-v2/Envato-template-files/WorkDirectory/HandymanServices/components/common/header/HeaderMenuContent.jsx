'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();

  const services = [
    {
      id: 1,
      title: "Home Services",
      items: [
        {
          name: "Carpentry",
          routerPath: "/agency-details?service=carpentry",
        },
        {
          name: "Plumbing",
          routerPath: "/agency-details?service=plumbing",
        },
        {
          name: "Electrical",
          routerPath: "/agency-details?service=electrical",
        },
        {
          name: "HVAC",
          routerPath: "/agency-details?service=hvac",
        },
        {
          name: "Painting",
          routerPath: "/agency-details?service=painting",
        },
        {
          name: "Renovation",
          routerPath: "/agency-details?service=renovation",
        },
      ],
    },
    {
      id: 2,
      title: "Outdoor Services",
      items: [
        {
          name: "Landscaping",
          routerPath: "/agency-details?service=landscaping",
        },
        {
          name: "Deck & Patio",
          routerPath: "/agency-details?service=deck-patio",
        },
        {
          name: "Fencing",
          routerPath: "/agency-details?service=fencing",
        },
      ],
    },
    {
      id: 3,
      title: "Specialty Services",
      items: [
        {
          name: "Kitchen Remodeling",
          routerPath: "/agency-details?service=kitchen-remodeling",
        },
        {
          name: "Bathroom Remodeling",
          routerPath: "/agency-details?service=bathroom-remodeling",
        },
        {
          name: "Flooring Installation",
          routerPath: "/agency-details?service=flooring",
        },
      ],
    },
    {
      id: 4,
      title: "Emergency Services",
      items: [
        {
          name: "24/7 Emergency Repair",
          routerPath: "/agency-details?service=emergency-repair",
        },
        {
          name: "Water Damage",
          routerPath: "/agency-details?service=water-damage",
        },
        {
          name: "Storm Damage",
          routerPath: "/agency-details?service=storm-damage",
        },
      ],
    },
  ];

  const property = [
    {
      id: 1,
      title: "User Admin",
      items: [
        {
          name: "Dashboard",
          routerPath: "/my-dashboard",
        },
        {
          name: "My Properties",
          routerPath: "/my-properties",
        },
        {
          name: "My Message",
          routerPath: "/my-message",
        },
        {
          name: "My Review",
          routerPath: "/my-review",
        },
        {
          name: "My Favourites",
          routerPath: "/my-favourites",
        },
        {
          name: "My Profile",
          routerPath: "/my-profile",
        },
        {
          name: "My Package",
          routerPath: "/my-package",
        },
        {
          name: "My Saved Search",
          routerPath: "/my-saved-search",
        },
        {
          name: "Add Property",
          routerPath: "/create-listing",
        },
      ],
    },
    {
      id: 2,
      title: "Listing Single",
      items: [
        {
          name: "Single V1",
          routerPath: "/listing-details-v1",
        },
        {
          name: "Single V2",
          routerPath: "/listing-details-v2",
        },
        {
          name: "Single V3",
          routerPath: "/listing-details-v3",
        },
        {
          name: "Single V4",
          routerPath: "/listing-details-v4",
        },
      ],
    },
  ];

  const blog = [
    { id: 1, name: "Blog List 1", routerPath: "/blog-list-1" },
    { id: 2, name: "Blog List 2", routerPath: "/blog-list-2" },
    { id: 3, name: "Blog List 3", routerPath: "/blog-list-3" },
    {
      id: 4,
      name: "Blog Details",
      routerPath: "/blog-details",
    },
  ];

  const pages = [
    { id: 1, name: "About Us", routerPath: "/about-us" },
    { id: 2, name: "Gallery", routerPath: "/gallery" },
    { id: 3, name: "Faq", routerPath: "/faq" },
    { id: 4, name: "LogIn", routerPath: "/login" },
    { id: 5, name: "Compare", routerPath: "/compare" },
    { id: 6, name: "Membership", routerPath: "/membership" },

    { id: 7, name: "Register", routerPath: "/register" },
    { id: 8, name: "Service", routerPath: "/service" },
    { id: 9, name: "404 Page", routerPath: "/404" },
    { id: 10, name: "Terms & Conditions", routerPath: "/terms" },
  ];

  return (
    <ul
      id="respMenu"
      className={`ace-responsive-menu text-end d-lg-block d-none wa ${float}`}
      data-menu-style="horizontal"
    >
      <li className="last">
        <Link
          href="/"
          className={pathname === "/" ? "ui-active" : undefined}
        >
          Home
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <a
          href="#"
          className={
            pathname === "/agency-details" ? "ui-active" : undefined
          }
        >
          <span className="title">Services</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {services.map((item) => (
            <li className="dropitem" key={item.id}>
              <a href="#">
                {item.title}
              </a>
              <ul className="sub-menu">
                {item.items.map((subitem) => (
                  <li key={subitem.name}>
                    <Link
                      href={subitem.routerPath}
                      className={
                        pathname === "/agency-details" &&
                        typeof window !== "undefined" &&
                        window.location.search === `?service=${subitem.routerPath.split("=")[1]}`
                          ? "ui-active"
                          : undefined
                      }
                    >
                      {subitem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="list-inline-item">
        <Link
          href="/businesses"
          className={pathname === "/businesses" ? "ui-active" : undefined}
        >
          Businesses
        </Link>
      </li>

      <li className="dropitem">
        <a
          href="#"
          className={
            property.some((parent) => {
              return parent.items.some(
                (page) =>
                  page.routerPath?.split('/')[1] === pathname?.split('/')[1] 
                  // page.routerPath?.split('/')[1] + "/[id]" === pathname?.split('/')[1]
              );
            })
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">Property</span>{" "}
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {property.map((item) => (
            <li className="dropitem arrow" key={item.id}>
              <a
                href="#"
                className={
                  item.items.some(
                    (page) =>
                      page.routerPath?.split('/')[1] === pathname?.split('/')[1] 
                      // page.routerPath?.split('/')[1] + "/[id]" === pathname?.split('/')[1]
                  )
                    ? "ui-active"
                    : undefined
                }
              >
                {item.title}
              </a>
              {/* <!-- Level Three--> */}
              <ul className="sub-menu ">
                {item.items.map((val, i) => (
                  <li key={i}>
                    <Link
                      href={val.routerPath}
                      className={
                        pathname?.split('/')[1] === val.routerPath?.split('/')[1] 
                        // val.routerPath + "/[id]" === pathname?.split('/')[1]
                          ? "ui-active"
                          : undefined
                      }
                    >
                      {val.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <a
          href="#"
          className={
            pages.some((page) => page.routerPath?.split('/')[1] === pathname?.split('/')[1])
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">Pages</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {pages.map((item) => (
            <li key={item.id}>
              <Link
                href={item.routerPath}
                className={
                  pathname?.split('/')[1] === item.routerPath?.split('/')[1] ? "ui-active" : undefined
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <a
          href="#"
          className={
            blog.some(
              (page) =>
                page.routerPath?.split('/')[1] === pathname?.split('/')[1] 
                // page.routerPath?.split('/')[1] + "/[id]" === pathname?.split('/')[1]
            )
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">Blog</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {blog.map((item) => (
            <li key={item.id}>
              <Link
                href={item.routerPath}
                className={
                  pathname?.split('/')[1] === item.routerPath?.split('/')[1]
                  // item.routerPath + "/[id]" === pathname?.split('/')[1]
                    ? "ui-active"
                    : undefined
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="last">
        <Link
          href="/contact"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          Contact
        </Link>
      </li>
      {/* End .dropitem */}

      <li className={`list-inline-item list_s ${float}`}>
        <a
          href="#"
          className="btn flaticon-user"
          data-bs-toggle="modal"
          data-bs-target=".bd-example-modal-lg"
        >
          <span className="dn-lg">Login/Register</span>
        </a>
      </li>
      {/* End .dropitem */}

      <li className={`list-inline-item add_listing ${float}`}>
        <Link href="/create-listing">
          <span className="flaticon-plus"></span>
          <span className="dn-lg"> Create Listing</span>
        </Link>
      </li>
      {/* End .dropitem */}
    </ul>
  );
};

export default HeaderMenuContent;
