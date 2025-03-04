import FilterSearch from "./FilterSearch";

const SidebarListings = () => {
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">Find a Handyman</h4>
          <FilterSearch />
        </div>
      </div>
      {/* End filter and search area */}

      <div className="terms_condition_widget">
        <h4 className="title">Service Categories</h4>
        <div className="widget_list">
          <ul className="list_details">
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>Carpentry{" "}
                <span className="float-end">12</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>Plumbing{" "}
                <span className="float-end">8</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>Electrical{" "}
                <span className="float-end">15</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>HVAC{" "}
                <span className="float-end">6</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>Painting{" "}
                <span className="float-end">10</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-caret-right mr10"></i>Renovation{" "}
                <span className="float-end">7</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* End Categories widget */}

      <div className="terms_condition_widget">
        <h4 className="title">Service Areas</h4>
        <div className="widget_list">
          <ul className="list_details">
            <li>
              <a href="#">
                <i className="fa fa-map-marker mr10"></i>Sacramento{" "}
                <span className="float-end">32</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker mr10"></i>Elk Grove{" "}
                <span className="float-end">18</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker mr10"></i>Folsom{" "}
                <span className="float-end">12</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker mr10"></i>Roseville{" "}
                <span className="float-end">14</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* End Service Areas widget */}

      <div className="terms_condition_widget">
        <h4 className="title">Rating Filter</h4>
        <div className="widget_list">
          <ul className="list_details">
            <li>
              <a href="#">
                <i className="fa fa-star mr10"></i>5.0{" "}
                <span className="float-end">8</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-star mr10"></i>4.5+{" "}
                <span className="float-end">24</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-star mr10"></i>4.0+{" "}
                <span className="float-end">42</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* End Rating Filter widget */}
    </div>
  );
};

export default SidebarListings;
