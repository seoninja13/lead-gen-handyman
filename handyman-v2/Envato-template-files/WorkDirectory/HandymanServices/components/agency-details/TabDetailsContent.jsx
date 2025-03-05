import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";

const serviceDetails = {
  carpentry: {
    description: `Our professional carpentry services cover all aspects of woodworking and construction. From custom cabinetry to structural repairs, our experienced carpenters deliver quality craftsmanship for your home.

    Services include:
    • Custom woodworking and furniture
    • Cabinet installation and repair
    • Door and window installation
    • Deck construction and repair
    • Trim and molding installation
    • Structural repairs and renovations

    All work is performed by licensed and insured professionals with years of experience in residential and commercial carpentry.`,
    
    process: [
      "Initial consultation and assessment",
      "Detailed project proposal and estimate",
      "Material selection and procurement",
      "Professional installation/construction",
      "Quality inspection and cleanup",
      "Final walkthrough and satisfaction guarantee"
    ]
  },
  plumbing: {
    description: `Our comprehensive plumbing services ensure your home's plumbing system runs smoothly and efficiently. We handle everything from minor repairs to major installations.

    Services include:
    • Leak detection and repair
    • Pipe installation and replacement
    • Drain cleaning and maintenance
    • Water heater services
    • Fixture installation
    • Emergency plumbing repairs

    All work is performed by licensed plumbers who prioritize quality and safety.`,
    
    process: [
      "Emergency response when needed",
      "Thorough inspection and diagnosis",
      "Upfront pricing and solutions",
      "Professional repair or installation",
      "Testing and quality assurance",
      "Cleanup and maintenance recommendations"
    ]
  },
  electrical: {
    description: `Trust our licensed electricians for all your electrical needs. We provide safe, reliable electrical services for residential and commercial properties.

    Services include:
    • Electrical repairs and upgrades
    • Panel installations and updates
    • Lighting installation
    • Outlet and switch installation
    • Safety inspections
    • Emergency electrical services

    All electrical work is performed to code by certified professionals.`,
    
    process: [
      "Safety assessment",
      "Detailed electrical inspection",
      "Code compliance review",
      "Professional installation/repair",
      "Testing and certification",
      "Safety documentation and recommendations"
    ]
  }
};

const TabDetailsContent = ({ service }) => {
  const details = service ? serviceDetails[service] : null;

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#description"
            role="tab"
            aria-controls="description"
            aria-selected="true"
          >
            Description
          </a>
        </li>
        {/* End Description tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#process"
            role="tab"
            aria-controls="process"
            aria-selected="false"
          >
            Our Process
          </a>
        </li>
        {/* End Process tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#reviews"
            role="tab"
            aria-controls="reviews"
            aria-selected="false"
          >
            Reviews
          </a>
        </li>
        {/* End Reviews tab */}
      </ul>
      {/* End .nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body">
                  <p className="mb25">
                    {details?.description || `
                      Professional handyman services for all your home repair and maintenance needs. 
                      Our experienced team provides quality workmanship and reliable service for both 
                      residential and commercial properties.

                      We offer a wide range of services including:
                      • General repairs and maintenance
                      • Home improvements
                      • Installation services
                      • Emergency repairs
                      • Property maintenance
                      
                      All work is performed by skilled professionals who take pride in their craft.
                    `}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Description details content*/}

        <div
          className="tab-pane fade"
          id="process"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body">
                  <h4 className="mb25">Our Service Process</h4>
                  <div className="process_list">
                    {(details?.process || [
                      "Initial consultation",
                      "Project assessment",
                      "Quote provision",
                      "Service scheduling",
                      "Professional service delivery",
                      "Quality assurance"
                    ]).map((step, index) => (
                      <div key={index} className="process_step">
                        <span className="step_number">{index + 1}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Process content */}

        <div
          className="tab-pane fade"
          id="reviews"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="total_review">
                <h4>Reviews</h4>
                <Ratings />
                <ReviewBox />
              </div>
              <Comments />
            </div>
          </div>
        </div>
        {/* End Reviews content */}
      </div>
    </>
  );
};

export default TabDetailsContent;
