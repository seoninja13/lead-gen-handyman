'use client'

import { useState } from "react";

const TabDetails = ({ business }) => {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Past Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "credentials" ? "active" : ""}`}
            onClick={() => setActiveTab("credentials")}
          >
            Credentials
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        {/* Reviews Tab */}
        <div
          className={`tab-pane fade ${
            activeTab === "reviews" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-lg-12">
              {business.reviews.map((review, index) => (
                <div key={index} className="my_dashboard_review mt30">
                  <div className="review_content">
                    <div className="review_content_head">
                      <div className="review_content_head_left">
                        <img src={review.avatar} alt={review.name} />
                        <div className="reviewer_details">
                          <h4>{review.name}</h4>
                          <div className="review_rating">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`fa fa-star ${
                                  i < review.rating ? "text-warning" : "text-gray"
                                }`}
                              ></span>
                            ))}
                          </div>
                          <div className="review_date">{review.date}</div>
                        </div>
                      </div>
                    </div>
                    <div className="review_content_body">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Projects Tab */}
        <div
          className={`tab-pane fade ${
            activeTab === "projects" ? "show active" : ""
          }`}
        >
          <div className="row">
            {business.pastProjects.map((project, index) => (
              <div key={index} className="col-lg-12">
                <div className="feat_property list style2 hvr-bxshd bdrrn mb10 mt20">
                  <div className="thumb">
                    <img
                      className="img-whp"
                      src={project.image}
                      alt={project.title}
                    />
                  </div>
                  <div className="details">
                    <div className="tc_content">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <ul className="prop_details mb0">
                        <li>
                          <a>
                            <span className="fas fa-calendar pr5"></span>
                            {project.date}
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="fas fa-map-marker-alt pr5"></span>
                            {project.location}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials Tab */}
        <div
          className={`tab-pane fade ${
            activeTab === "credentials" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="additional_details">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb15">Licenses & Certifications</h4>
                  </div>
                  {business.credentials.map((credential, index) => (
                    <div key={index} className="col-md-6 col-lg-6">
                      <div className="listing_feature_iconbox mb30">
                        <div className="icon">
                          <span className="fas fa-certificate"></span>
                        </div>
                        <div className="details">
                          <div className="title">{credential.title}</div>
                          <div className="subtitle">
                            {credential.issuer} - {credential.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabDetails;
