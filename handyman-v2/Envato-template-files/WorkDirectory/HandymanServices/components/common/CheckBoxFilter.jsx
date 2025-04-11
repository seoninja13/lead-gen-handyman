'use client'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFeatures } from "../../features/properties/propertiesSlice";

const CheckBoxFilter = () => {
  const dispatch = useDispatch();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    dispatch(addFeatures(features));
  }, [dispatch, features]);

  // handler
  const featuresHandler = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter((item) => item !== value));
    }
  };

  return (
    <>
      <div className="col-xxs-6 col-sm-6 col-lg-4 col-xl-4">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck1"
                value="Licensed"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Licensed
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck2"
                value="Insured"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck2">
                Insured
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck3"
                value="Bonded"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck3">
                Bonded
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck4"
                value="Background Checked"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck4">
                Background Checked
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xxs-6 col-sm-6 col-lg-4 col-xl-4">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck5"
                value="Free Estimates"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck5">
                Free Estimates
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck6"
                value="Warranty"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck6">
                Warranty
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck7"
                value="Emergency Service"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck7">
                Emergency Service
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck8"
                value="Same Day Service"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck8">
                Same Day Service
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xxs-6 col-sm-6 col-lg-4 col-xl-4">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck9"
                value="Weekend Availability"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck9">
                Weekend Availability
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck10"
                value="Senior Discount"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck10">
                Senior Discount
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck11"
                value="Military Discount"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck11">
                Military Discount
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck12"
                value="Online Booking"
                onChange={featuresHandler}
              />
              <label className="form-check-label" htmlFor="customCheck12">
                Online Booking
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}
    </>
  );
};

export default CheckBoxFilter;
