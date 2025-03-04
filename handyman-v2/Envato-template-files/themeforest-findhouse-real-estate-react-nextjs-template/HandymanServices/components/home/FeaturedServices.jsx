'use client'

import Link from "next/link";
import Slider from "react-slick";
import services from "../../data/services";
import Image from "next/image";

const FeaturedServices = () => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let content = services?.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_service">
        <div className="thumb">
          <Image
            width={343}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item.img}
            alt={item.title}
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {item.saleTag.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val}</a>
                </li>
              ))}
            </ul>
            <Link href={`/service-details/${item.id}`} className="fp_price">
              {item.price}
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link href={`/service-details/${item.id}`}>{item.title}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.location}
            </p>
            <ul className="prop_details mb0">
              {item.itemDetails.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val.name}: {val.number}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <section id="feature-service" className="feature-service bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Our Featured Services</h2>
                <p>Find the perfect handyman for any job.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="feature_service_slider">
                <Slider {...settings}>{content}</Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedServices;
