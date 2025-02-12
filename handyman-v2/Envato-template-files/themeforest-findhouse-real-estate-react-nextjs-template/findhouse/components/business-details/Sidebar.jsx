'use client'

const Sidebar = ({ business }) => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Contact Business</h4>
            <div className="media">
              <img
                className="mr-3"
                src={business.ownerImage}
                alt={business.owner}
              />
              <div className="media-body">
                <h5 className="mt-0 mb0">{business.owner}</h5>
                <p className="mb0">Owner</p>
              </div>
            </div>
          </div>
          {/* End .sl_creator */}

          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>
            {/* End .form-group */}

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
              />
            </div>
            {/* End .form-group */}

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            {/* End .form-group */}

            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            {/* End .form-group */}

            <button type="submit" className="btn btn-block btn-thm">
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">Quick Contact</h4>
          <ul className="list-inline-item">
            <li>
              <p>
                <span className="flaticon-phone mr15"></span>
                {business.phone}
              </p>
            </li>
            <li>
              <p>
                <span className="flaticon-email mr15"></span>
                {business.email}
              </p>
            </li>
            <li>
              <p>
                <span className="flaticon-pin mr15"></span>
                {business.address}
              </p>
            </li>
            <li>
              <p>
                <span className="flaticon-clock mr15"></span>
                Available: {business.availability}
              </p>
            </li>
          </ul>
        </div>
      </div>
      {/* End .sidebar_listing_list */}
    </>
  );
};

export default Sidebar;
