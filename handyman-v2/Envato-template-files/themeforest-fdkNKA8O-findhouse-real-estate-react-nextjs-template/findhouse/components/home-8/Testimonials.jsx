'use client'

import { useState } from "react";
import Slider from "react-slick";
import testimonial from "../../data/testimonial";
import Image from "next/image";

export default function SlickAsNav() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  var settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
  };

  const imgItem = [
    "54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc",
    "a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc",
    "beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc",
    "close-up-image-of-a-wooden-staircase-with-several-2024-01-08-22-11-19-utc",
    "stunning-interior-decor-with-a-wooden-floor-and-fu-2024-01-08-22-11-19-utc",
    "what-a-beautiful-place-to-call-home-2024-06-25-15-39-29-utc",
  ];

  return (
    <>
      <Slider
        {...settings}
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
      >
        {imgItem.map((item, i) => (
          <div className="item" key={i}>
            <Image
              width={100}
              height={100}
              src={`/assets/images/resource/${item}.jpg`}
              alt="feature"
            />
          </div>
        ))}
      </Slider>
      {/* Top Image slide */}

      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        autoplay={true}
        arrows={false}
        className="tes-for"
      >
        {testimonial.slice(6, 12).map((item) => (
          <div className="testimonial_item" key={item.id}>
            <div className="details">
              <h4>{item.name}</h4>
              <span className="small text-thm">{item.designation}</span>
              <p>{item.text}</p>
              <p className="mt25">{item.feedback}</p>
            </div>
          </div>
        ))}
      </Slider>
      {/* Bottom text slide */}
    </>
  );
}
