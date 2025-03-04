'use client'

import { useState } from "react";

const Filtering = () => {
  const [keyword, setKeyword] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState([]);
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [experience, setExperience] = useState("");

  return (
    <>
      <div className="sidebar_search_widget">
        <div className="blog_search_widget">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search business name or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-thm">
                <span className="flaticon-magnifying-glass"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End .sidebar_search_widget */}

      <div className="sidebar_select_options">
        <h4 className="title">Service Type</h4>
        <div className="selectbox_widget">
          <select
            className="selectpicker w100 show-tick form-select"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="carpentry">Carpentry</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="painting">Painting</option>
            <option value="hvac">HVAC</option>
            <option value="landscaping">Landscaping</option>
          </select>
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="sidebar_select_options">
        <h4 className="title">Location</h4>
        <div className="selectbox_widget">
          <select
            className="selectpicker w100 show-tick form-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="downtown">Downtown LA</option>
            <option value="south">South LA</option>
            <option value="east">East LA</option>
            <option value="west">West LA</option>
            <option value="valley">San Fernando Valley</option>
          </select>
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="sidebar_select_options">
        <h4 className="title">Rating</h4>
        <div className="ui_kit_checkbox">
          {[5, 4, 3].map((stars) => (
            <div className="custom-control custom-checkbox" key={stars}>
              <input
                type="checkbox"
                className="custom-control-input"
                id={`rating${stars}`}
                checked={rating.includes(stars)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setRating([...rating, stars]);
                  } else {
                    setRating(rating.filter((r) => r !== stars));
                  }
                }}
              />
              <label className="custom-control-label" htmlFor={`rating${stars}`}>
                {stars}+ Stars
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="sidebar_select_options">
        <h4 className="title">Availability</h4>
        <div className="selectbox_widget">
          <select
            className="selectpicker w100 show-tick form-select"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="">Any Availability</option>
            <option value="24-7">24/7 Service</option>
            <option value="weekdays">Weekdays Only</option>
            <option value="weekends">Weekends Available</option>
            <option value="emergency">Emergency Service</option>
          </select>
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="sidebar_select_options">
        <h4 className="title">Price Range</h4>
        <div className="selectbox_widget">
          <select
            className="selectpicker w100 show-tick form-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="low">$</option>
            <option value="medium">$$</option>
            <option value="high">$$$</option>
            <option value="premium">$$$$</option>
          </select>
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="sidebar_select_options">
        <h4 className="title">Years of Experience</h4>
        <div className="selectbox_widget">
          <select
            className="selectpicker w100 show-tick form-select"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Any Experience</option>
            <option value="1-5">1-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10-20">10-20 Years</option>
            <option value="20+">20+ Years</option>
          </select>
        </div>
      </div>
      {/* End .sidebar_select_options */}

      <div className="search_option_button">
        <button type="submit" className="btn btn-block btn-thm w-100">
          Search
        </button>
      </div>
    </>
  );
};

export default Filtering;
