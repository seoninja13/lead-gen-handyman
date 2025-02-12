'use client'

import Link from "next/link";

const BusinessCard = ({ business }) => {
  return (
    <div className="col-md-12">
      <div className="feat_property list">
        <div className="thumb">
          <img
            className="img-whp"
            src={business.gallery[0].image}
            alt={business.name}
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item">
                <a>Licensed & Insured</a>
              </li>
            </ul>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <div className="dtls_headr">
              <h4 className="title">
                <Link href={`/business-details?id=${business.id}`}>
                  {business.name}
                </Link>
              </h4>
              <div className="review-rating">
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={`fa fa-star ${index < Math.floor(business.rating) ? "text-warning" : "text-gray"}`}></span>
                  ))}
                </div>
                <span className="rating-count">
                  ({business.reviewCount}+ Reviews)
                </span>
              </div>
            </div>
            <p className="text">{business.description.substring(0, 150)}...</p>

            <ul className="prop_details mb0">
              <li className="list-inline-item">
                <a>
                  <span className="flaticon-user pr5"></span>
                  {business.experience} Experience
                </a>
              </li>
              <li className="list-inline-item">
                <a>
                  <span className="flaticon-home pr5"></span>
                  {business.projectsCompleted} Projects
                </a>
              </li>
              <li className="list-inline-item">
                <a>
                  <span className="flaticon-heart pr5"></span>
                  {business.satisfaction} Satisfaction
                </a>
              </li>
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              {business.services.slice(0, 3).map((service, index) => (
                <li className="list-inline-item" key={index}>
                  <a>{service}</a>
                </li>
              ))}
              {business.services.length > 3 && (
                <li className="list-inline-item">
                  <a>+{business.services.length - 3} more</a>
                </li>
              )}
            </ul>
            <div className="fp_pdate float-end text-thm">
              <Link
                href={`/business-details?id=${business.id}`}
                className="btn btn-thm"
              >
                View Details
              </Link>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
