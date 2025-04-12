const CopyrightFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer_middle_area pt10 pb10">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-6">
            <div className="footer_menu_widget">
              <ul className="list-unstyled">
                <li className="list-inline-item">
                  <a href="#">Privacy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="copyright-widget text-end">
              <p>
                &copy; {year} Handyman Services. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
