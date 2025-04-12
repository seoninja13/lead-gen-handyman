import Image from "next/image";
import Slider from "react-slick";
import testimonialData from "../../data/testimonial";

const Testimonial = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="our-testimonials-client bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Client Reviews</h2>
                <p>Real experiences from our satisfied customers</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="testimonial_grid_slider">
                <Slider {...settings}>
                  {testimonialData.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="testimonial_grid">
                        <div className="thumb">
                          <img
                            className="rounded-circle"
                            src={item.img}
                            alt={item.name}
                            style={{ width: "70px", height: "70px" }}
                          />
                        </div>
                        <div className="details">
                          <h4>{item.name}</h4>
                          <p>{item.designation}</p>
                          <p className="mt25">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
