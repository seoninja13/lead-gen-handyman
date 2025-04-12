import { useState } from "react";

const PopupSignInUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <div className={`sign_up_modal ${isOpen ? "show" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>

            <div className="modal-body container pb20">
              <div className="tab-content container">
                <div className="row mt25">
                  <div className="col-lg-12">
                    <div className="login_form">
                      <h2>{isSignUp ? "Register" : "Login"}</h2>
                      <form>
                        {isSignUp && (
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                        <button type="submit" className="btn btn-log w-100">
                          {isSignUp ? "Register" : "Login"}
                        </button>
                        <p className="text-center">
                          {isSignUp ? "Already have an account? " : "Don't have an account? "}
                          <span
                            className="text-thm"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsSignUp(!isSignUp)}
                          >
                            {isSignUp ? "Login" : "Register"}
                          </span>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sign_up_modal_overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default PopupSignInUp;
