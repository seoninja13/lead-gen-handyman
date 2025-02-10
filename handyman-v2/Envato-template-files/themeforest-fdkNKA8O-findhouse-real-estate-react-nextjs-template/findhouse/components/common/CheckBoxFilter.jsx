const CheckBoxFilter = () => {
  return (
    <>
      <div className="col-xxs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck1"
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Plumbing
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
              />
              <label className="form-check-label" htmlFor="customCheck2">
                Electrical
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
              />
              <label className="form-check-label" htmlFor="customCheck3">
                Carpentry
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck4"
              />
              <label className="form-check-label" htmlFor="customCheck4">
                Painting
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck5"
              />
              <label className="form-check-label" htmlFor="customCheck5">
                Drywall Repair
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
              />
              <label className="form-check-label" htmlFor="customCheck6">
                Flooring
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck7"
              />
              <label className="form-check-label" htmlFor="customCheck7">
                Appliance Repair
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
              />
              <label className="form-check-label" htmlFor="customCheck8">
                Furniture Assembly
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck9"
              />
              <label className="form-check-label" htmlFor="customCheck9">
                General Handyman
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
