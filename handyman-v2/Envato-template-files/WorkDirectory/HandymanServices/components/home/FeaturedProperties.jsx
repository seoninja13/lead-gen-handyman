import Link from "next/link";
import Slider from "react-slick";

const FeaturedProperties = ({ featuredProperties }) => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
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
      <Slider {...settings} arrows={false}>
        {featuredProperties.map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property">
              <div className="thumb">
                <img className="img-whp" src={item.img} alt={item.title} />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item.saleTag.map((tag, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">{tag}</a>
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
                    className="fp_price" 
                    href={`/services/${item.type.toLowerCase()}/${item.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    {item.price}
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{item.type}</p>
                  <h4>
                    <Link 
                      href={`/services/${item.type.toLowerCase()}/${item.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <p>
                    <span className="flaticon-placeholder"></span> {item.location}
                  </p>
                  <ul className="prop_details mb0">
                    {item.itemDetails.map((detail, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">
                          {detail.name}: {detail.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <img src={item.posterAvatar} alt={item.posterName} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{item.posterName}</a>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">{item.postedYear}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
