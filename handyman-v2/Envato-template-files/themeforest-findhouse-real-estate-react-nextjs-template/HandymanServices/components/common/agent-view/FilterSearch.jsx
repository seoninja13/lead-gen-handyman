'use client'

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addCity,
  addListen,
  addName,
} from "../../../features/agent/agentSlice";

const FilterSearch = () => {
  const { name, category, city } = useSelector((state) => state.agent) || {};

  const [getName, setName] = useState(name);
  const [getCategory, setCategory] = useState(category);
  const [getCity, setCity] = useState(city);
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();

  // name
  useEffect(() => {
    dispatch(addName(getName));
  }, [dispatch, getName]);

  // category
  useEffect(() => {
    dispatch(addCategory(getCategory));
  }, [dispatch, getCategory]);

  // city
  useEffect(() => {
    dispatch(addCity(getCity));
  }, [dispatch, getCity]);

  const clearHandler = () => {
    setName("");
    setCategory("");
    setCity("");
    dispatch(addListen(""));
  };

  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Handyman Name"
            value={getName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </li>
      {/* End name */}

      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getCategory}
            >
              <option value="">Service Type</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="HVAC">HVAC</option>
              <option value="Painting">Painting</option>
              <option value="Renovation">Renovation</option>
            </select>
          </div>
        </div>
      </li>
      {/* End Service Type */}

      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCity(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getCity}
            >
              <option value="">Location</option>
              <option value="Sacramento">Sacramento</option>
              <option value="Elk Grove">Elk Grove</option>
              <option value="Folsom">Folsom</option>
              <option value="Roseville">Roseville</option>
            </select>
          </div>
        </div>
      </li>
      {/* End Location */}

      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Clear Filters
          </button>
        </div>
      </li>
      {/* End submit */}
    </ul>
  );
};

export default FilterSearch;
