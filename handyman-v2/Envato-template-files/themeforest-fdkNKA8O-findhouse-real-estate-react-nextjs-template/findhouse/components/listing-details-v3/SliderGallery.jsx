'use client'

import Image from "next/image";
import Slider from "react-slick";

const SliderGallery = () => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Array of image paths
  const imagePaths = [
    "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
    "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
    "/assets/images/resource/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
    "/assets/images/resource/close-up-image-of-a-wooden-staircase-with-several-2024-01-08-22-11-19-utc.jpg",
    "/assets/images/resource/stunning-interior-decor-with-a-wooden-floor-and-fu-2024-01-08-22-11-19-utc.jpg",
  ];

  return (
    <>
      <Slider {...settings} arrows={true}>
        {imagePaths.map((imagePath, index) => (
          <div className="item" key={index}>
            <Image
              width={515}
              height={435}
              className="img-fluid w-100 h-100 cover"
              src={imagePath}
              alt={`lsslider${index + 1}.jpg`}
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SliderGallery;
