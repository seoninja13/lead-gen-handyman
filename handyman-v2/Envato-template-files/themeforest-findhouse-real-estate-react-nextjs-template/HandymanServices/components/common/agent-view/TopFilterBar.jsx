'use client'

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListen } from "../../../features/agent/agentSlice";

const TopFilterBar = () => {
  const { length, listen } = useSelector((state) => state.agent) || {};
  const [getListen, setListen] = useState(listen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addListen(getListen));
  }, [dispatch, getListen]);

  // clear filter
  useEffect(() => {
    if (listen == "") {
      setListen("");
    }
  }, [listen, setListen]);

  return (
    <div className="grid_list_search_result style2 d-flex align-items-center flex-wrap">
      <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
        <div className="left_area">
          <p>
            <span className={length == 0 ? "text-danger" : undefined}>
              {length}{" "}
            </span>
            {length !== 0 ? (
              "Handymen found"
            ) : (
              <span className="text-danger">No handymen found</span>
            )}
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9">
        <div className="right_area style2 text-end">
          <ul>
            <li className="list-inline-item">
              <span className="shrtby">Sort by:</span>
              <select
                onChange={(e) => setListen(e.target.value)}
                className="selectpicker show-tick"
                value={getListen}
              >
                <option value="">Default</option>
                <option value="150+">Most Jobs (150+)</option>
                <option value="120+">Popular (120+)</option>
                <option value="200+">Highly Experienced (200+)</option>
                <option value="5.0">Top Rated (5.0)</option>
                <option value="4.5">Highly Rated (4.5+)</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default TopFilterBar;
