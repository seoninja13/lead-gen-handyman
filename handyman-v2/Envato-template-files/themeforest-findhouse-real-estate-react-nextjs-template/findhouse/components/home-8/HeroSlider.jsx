'use client'

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const HeroSlider = () => {
  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const sliderContent = [
    {
      id: 1,
      bgImage: "/assets/images/Sample envato images/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
      title: "Find Reliable Handyman Services",
      subTitle: "Get connected with trusted professionals for all your home repair needs",
      propertyList: [
        {
          id: 1,
          img: "/assets/images/Sample envato images/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          price: "75",
          type: "Plumbing",
          title: "Plumbing Services",
          location: `Sacramento, CA`,
          saleTag: ["Featured", "Top Rated"],
          itemDetails: [
            { name: "Years of Experience", number: "10" },
            { name: "Number of Employees", number: "5" },
          ],
          posterAvatar: "/assets/images/Sample envato images/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          posterName: "Sacramento Plumbing Experts",
          postedYear: "1 year ago",
        },
      ],
    },
    {
      id: 2,
      bgImage: "/assets/images/Sample envato images/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
      title: "Your Home Repair, Our Priority.",
      subTitle: "We connect you with the best handyman services in your area",
      propertyList: [
        {
          id: 2,
          img: "/assets/images/Sample envato images/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
          price: "80",
          type: "Electrical",
          title: "Reliable Electrical Services",
          location: `Elk Grove, CA`,
          saleTag: ["Featured", "For Rent"],
          itemDetails: [
            { name: "Years of Experience", number: "15" },
            { name: "Employees", number: "8" },
          ],
          posterAvatar: "/assets/images/Sample envato images/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          posterName: "Elk Grove Electricians",
          postedYear: "1 year ago",
        },
      ],
    },
    {
      id: 3,
      bgImage: "/assets/images/Sample envato images/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
      title: "Quality Home Services",
      subTitle: "Find the perfect handyman for your next project",
      propertyList: [
        {
          id: 3,
          img: "/assets/images/Sample envato images/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
          price: "65",
          type: "Carpentry",
          title: "Quality Carpentry Services",
          location: `Roseville, CA`,
          saleTag: ["Featured", "For Rent"],
          itemDetails: [
            { name: "Years of Experience", number: "8" },
            { name: "Employees", number: "3" },
          ],
          posterAvatar: "/assets/images/Sample envato images/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          posterName: "Roseville Carpentry Pros",
          postedYear: "1 year ago",
        },
      ],
    },
  ];

  return (
    <Slider {...settings} arrows={false}>
      {sliderContent.map((singleItem) => (
        <div
          className={`bs_carousel_bg ${singleItem.bgImage} vh-100`}
          key={singleItem.id}
        >
          <div className="carousel-slide ">
            <div className="bs-caption">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-lg-8">
                    <div className="main_title">{singleItem.title}</div>
                    <p className="parag">{singleItem.subTitle}</p>
                    <Link href="/listing-grid-v4" className="btn-booking mt-4">
                      Book Now
                    </Link>
                  </div>

                  <div className="col-md-5 col-lg-4">
                    {singleItem.propertyList.map((item) => (
                      <div className="item" key={item.id}>
                        <div className="feat_property home8">
                          <div className="details">
                            <div className="tc_content">
                              <ul className="tag ">
                                {item.saleTag.map((val, i) => (
                                  <li className="list-inline-item" key={i}>
                                    <a href="#">{val}</a>
                                  </li>
                                ))}
                              </ul>
                              <p className="text-thm">{item.type}</p>
                              <h4>
                                <Link href={`/listing-details-v2/${item.id}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <p>
                                <span className="flaticon-placeholder"></span>
                                {item.location}
                              </p>

                              <ul className="prop_details ">
                                {item.itemDetails.map((val, i) => (
                                  <li className="list-inline-item" key={i}>
                                    <a href="#">
                                      {val.name}: {val.number}
                                    </a>
                                  </li>
                                ))}
                              </ul>

                              <ul className="icon mb0">
                                <li className="list-inline-item">
                                  <a href="#">
                                    <span className="flaticon-transfer-1"></span>
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a href="#">
                                    <span className="flaticon-heart"></span>
                                  </a>
                                </li>
                              </ul>

                              <Link
                                href={`/listing-details-v1/${item.id}`}
                                className="fp_price"
                              >
                                ${item.price}
                                <small>/mo</small>
                              </Link>
                            </div>
                            <div className="fp_footer">
                              <ul className="fp_meta float-start mb0">
                                <li className="list-inline-item">
                                  <Link href="/agent-v2">
                                    <Image
                                      width={40}
                                      height={40}
                                      src={item.posterAvatar}
                                      alt="pposter1.png"
                                    />
                                  </Link>
                                </li>
                                <li className="list-inline-item">
                                  <Link href="/agent-v2">
                                    {item.posterName}
                                  </Link>
                                </li>
                              </ul>
                              <div className="fp_pdate float-end">
                                {item.postedYear}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End .container */}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
