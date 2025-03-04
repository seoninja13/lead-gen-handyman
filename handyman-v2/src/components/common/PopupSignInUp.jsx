/**
 * PopupSignInUp Component
 * 
 * This component displays the sign in and sign up modal.
 * Adapted from the Envato template's PopupSignInUp component.
 */

import React from 'react';

const PopupSignInUp = () => {
  return (
    <div className="sign_up_modal modal fade" id="logInModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* End .modal-header */}

          <div className="modal-body container pb20">
            <div className="tab-content container" id="myTabContent">
              <div className="row mt25 tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="col-lg-12">
                  <div className="login_form">
                    <p>New to Handyman Services? <a href="#" className="signup_form" data-bs-toggle="tab" data-bs-target="#profile">Sign Up</a></p>
                    <form action="#">
                      <div className="mb-2 mr-sm-2">
                        <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username or email address" />
                      </div>
                      <div className="form-group mb5">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="exampleCheck1" />
                        <label className="custom-control-label" htmlFor="exampleCheck1">Remember me</label>
                        <a className="btn-fpswd float-end" href="#">Lost your password?</a>
                      </div>
                      <button type="submit" className="btn btn-log btn-thm mt5">Sign in</button>
                    </form>
                  </div>
                </div>
              </div>
              {/* End .tab-pane */}

              <div className="row mt25 tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="col-lg-12">
                  <div className="sign_up_form">
                    <p>Already have an account? <a href="#" className="login_form" data-bs-toggle="tab" data-bs-target="#home">Sign In</a></p>
                    <form action="#">
                      <div className="form-group input-group mb-3">
                        <input type="text" className="form-control" id="exampleInputName" placeholder="Username" />
                      </div>
                      <div className="form-group input-group mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email" />
                      </div>
                      <div className="form-group input-group mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                      </div>
                      <div className="form-group input-group mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Re-enter password" />
                      </div>
                      <div className="form-group form-check custom-checkbox mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="terms" />
                        <label className="form-check-label form-check-label" htmlFor="terms">
                          I have read and accept the Terms and Privacy Policy
                        </label>
                      </div>
                      <button type="submit" className="btn btn-log btn-thm mb0">Register</button>
                    </form>
                  </div>
                </div>
              </div>
              {/* End .tab-pane */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSignInUp;
