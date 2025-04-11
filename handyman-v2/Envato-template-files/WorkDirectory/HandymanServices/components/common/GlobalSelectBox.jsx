const GlobalSelectBox = () => {
  return (
    <>
      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>Experience</option>
            <option>1+ years</option>
            <option>3+ years</option>
            <option>5+ years</option>
            <option>10+ years</option>
            <option>15+ years</option>
            <option>20+ years</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>Rating</option>
            <option>3+ stars</option>
            <option>4+ stars</option>
            <option>4.5+ stars</option>
            <option>5 stars</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>Availability</option>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Week</option>
            <option>This Weekend</option>
            <option>Next Week</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>Service Area</option>
            <option>Within 5 miles</option>
            <option>Within 10 miles</option>
            <option>Within 15 miles</option>
            <option>Within 20 miles</option>
            <option>Within 25 miles</option>
            <option>Within 50 miles</option>
          </select>
        </div>
      </li>
      {/* End li */}
    </>
  );
};

export default GlobalSelectBox;
