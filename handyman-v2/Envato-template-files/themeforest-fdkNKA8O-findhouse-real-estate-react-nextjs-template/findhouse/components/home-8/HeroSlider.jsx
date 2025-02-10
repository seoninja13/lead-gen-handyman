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
      bgImage: "slidebg-1",
      title: "Reliable Handyman Services",
      subTitle: "Get your home repairs done quickly and efficiently.",
      propertyList: [
        {
          id: 1,
          img: "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          price: "50",
          type: "Plumbing",
          title: "Fix Leaky Faucet",
          location: `Sacramento, CA`,
          saleTag: ["Featured"],
          itemDetails: [
            { name: "Experience", number: "5" },
            { name: "Reviews", number: "4.5" },
          ],
          posterAvatar: "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
          posterName: "John Doe",
          postedYear: "1 day ago",
        },
      ],
    },
    {
      id: 2,
      bgImage: "slidebg-1",
      title: "Quality Home Repairs",
      subTitle: "We handle all types of home repairs and maintenance.",
      propertyList: [
        {
          id: 2,
          img: "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
          price: "75",
          type: "Electrical",
          title: "Install New Lighting",
          location: `Los Angeles, CA`,
          saleTag: ["Featured"],
          itemDetails: [
            { name: "Experience", number: "10" },
            { name: "Reviews", number: "4.8" },
          ],
          posterAvatar: "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
          posterName: "Jane Smith",
          postedYear: "2 days ago",
        },
      ],
    },
    {
      id: 3,
      bgImage: "slidebg-1",
      title: "Professional and Reliable",
      subTitle: "Your trusted partner for all your home improvement needs.",
      propertyList: [
        {
          id: 3,
          img: "/assets/images/resource/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
          price: "60",
          type: "Carpentry",
          title: "Build Custom Shelves",
          location: `San Francisco, CA`,
          saleTag: ["Featured"],
          itemDetails: [
            { name: "Experience", number: "7" },
            { name: "Reviews", number: "4.2" },
          ],
          posterAvatar: "/assets/images/resource/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
          posterName: "David Lee",
          postedYear: "3 days ago",
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
