'use client'

const FeaturedBusinesses = () => {
  const featuredBusinesses = [
    {
      id: 1,
      name: "Elite Handyman Services",
      rating: 5.0,
      image: "/assets/images/property/fp1.jpg",
      services: ["Home Repairs", "Maintenance"],
      experience: "20+ years",
    },
    {
      id: 2,
      name: "Pro Plumbing Solutions",
      rating: 4.9,
      image: "/assets/images/property/fp2.jpg",
      services: ["Plumbing", "Emergency Service"],
      experience: "15+ years",
    },
    {
      id: 3,
      name: "Master Electricians",
      rating: 4.8,
      image: "/assets/images/property/fp3.jpg",
      services: ["Electrical", "Installation"],
      experience: "12+ years",
    },
  ];

  return (
    <div className="feature_property_home3_slider">
      {featuredBusinesses.map((business) => (
        <div className="item" key={business.id}>
          <div className="feat_property home3">
            <div className="thumb">
              <img className="img-whp" src={business.image} alt={business.name} />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <a>Featured</a>
                  </li>
                </ul>
                <a className="fp_price">
                  {business.rating}{" "}
                  <span className="fa fa-star text-warning"></span>
                </a>
              </div>
            </div>
            <div className="details">
              <div className="tc_content">
                <h4>{business.name}</h4>
                <p>
                  {business.services.join(", ")}
                  <br />
                  Experience: {business.experience}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBusinesses;
