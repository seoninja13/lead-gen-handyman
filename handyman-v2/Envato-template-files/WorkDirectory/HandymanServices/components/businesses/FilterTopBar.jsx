import React from 'react';

const FilterTopBar = () => {
  return (
    <div className="col-lg-8 col-xl-9">
      <div className="grid_list_search_result style2">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="shorting_pagination_style2">
              <div className="shorting_personal_widget">
                <p className="m0">Showing 1–25 of 128 results</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="sorting_content style2">
              <select className="selectpicker show-tick">
                <option>Default Sorting</option>
                <option>Newest First</option>
                <option>Best Rated</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTopBar;
