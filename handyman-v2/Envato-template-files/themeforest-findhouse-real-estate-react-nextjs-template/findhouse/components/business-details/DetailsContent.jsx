'use client'

const DetailsContent = ({ business }) => {
  return (
    <>
      <div className="listing_single_description style2">
        <div className="lsd_list">
          <div className="lsd_list">
            {/* Business Overview */}
            <h4 className="mb30">Overview</h4>
            <p>{business.description}</p>
          </div>
        </div>
      </div>
      {/* End listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Services Offered</h4>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-4">
            <ul className="list-inline-item">
              {business.services.slice(0, Math.ceil(business.services.length / 2)).map((service, index) => (
                <li key={index}>
                  <p>
                    <i className="fa fa-check"></i> {service}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-4">
            <ul className="list-inline-item">
              {business.services.slice(Math.ceil(business.services.length / 2)).map((service, index) => (
                <li key={index}>
                  <p>
                    <i className="fa fa-check"></i> {service}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* End additional_details */}

      <div className="application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">Business Statistics</h4>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="icon_box_area style2">
              <div className="score">
                <span className="text-thm">{business.rating}</span>
              </div>
              <div className="details">
                <h5>Rating</h5>
                <p>Based on {business.reviewCount}+ Reviews</p>
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="icon_box_area style2">
              <div className="score">
                <span className="text-thm">{business.projectsCompleted}</span>
              </div>
              <div className="details">
                <h5>Projects</h5>
                <p>Completed Successfully</p>
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="icon_box_area style2">
              <div className="score">
                <span className="text-thm">{business.experience}</span>
              </div>
              <div className="details">
                <h5>Experience</h5>
                <p>Years in Business</p>
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
      {/* End .application_statics */}
    </>
  );
};

export default DetailsContent;
