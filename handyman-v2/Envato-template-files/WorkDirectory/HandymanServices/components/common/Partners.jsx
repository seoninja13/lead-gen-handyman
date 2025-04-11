import Image from "next/image";
import Slider from "react-slick";

const Partners = () => {
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const partnersImages = [
    {
      id: 1,
      name: "Home Depot",
      img: "/assets/images/partners/home-depot.png",
    },
    {
      id: 2,
      name: "Lowes",
      img: "/assets/images/partners/lowes.png",
    },
    {
      id: 3,
      name: "Ace Hardware",
      img: "/assets/images/partners/ace-hardware.png",
    },
    {
      id: 4,
      name: "Sherwin Williams",
      img: "/assets/images/partners/sherwin-williams.png",
    },
    {
      id: 5,
      name: "Benjamin Moore",
      img: "/assets/images/partners/benjamin-moore.png",
    },
    {
      id: 6,
      name: "Kohler",
      img: "/assets/images/partners/kohler.png",
    },
    {
      id: 7,
      name: "Moen",
      img: "/assets/images/partners/moen.png",
    },
    {
      id: 8,
      name: "Delta",
      img: "/assets/images/partners/delta.png",
    },
  ];

  return (
    <>
      <Slider {...settings} arrows={false}>
        {partnersImages.map((item) => (
          <div className="item" key={item.id}>
            <div className="our_partner">
              <Image
                width={140}
                height={37}
                className="img-fluid"
                src={item.img}
                alt={item.name}
              />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Partners;
