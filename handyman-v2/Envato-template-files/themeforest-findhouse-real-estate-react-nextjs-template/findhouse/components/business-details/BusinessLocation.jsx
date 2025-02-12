'use client'

const BusinessLocation = ({ business }) => {
  return (
    <>
      <h4 className="mb30">
        Location{" "}
        <small className="float-end">
          <a href={`https://maps.google.com/?q=${business.address}`} target="_blank">
            View on Map
          </a>
        </small>
      </h4>

      <div className="row">
        <div className="col-lg-12">
          <div className="application_statics">
            <div className="location_details">
              <div className="mb20">
                <h5>Service Areas</h5>
                <div className="service_areas">
                  {business.serviceAreas.map((area, index) => (
                    <span key={index} className="badge badge-light mr10 mb10">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb20">
                <h5>Business Hours</h5>
                <ul className="list-unstyled mb0">
                  {business.hours.map((schedule, index) => (
                    <li key={index} className="mb10">
                      <span className="fw600">{schedule.days}:</span>{" "}
                      {schedule.hours}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb20">
                <h5>Emergency Service</h5>
                <p>{business.emergencyService}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessLocation;
