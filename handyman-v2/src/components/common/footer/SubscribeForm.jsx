/**
 * SubscribeForm Component
 * 
 * This component displays a newsletter subscription form.
 * Adapted from the Envato template's SubscribeForm component.
 */

import React, { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to a backend service
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset the submitted state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form className="footer_mailchimp_form" onSubmit={handleSubmit}>
      <div className="form-row align-items-center">
        <div className="col-auto">
          <input
            type="email"
            className="form-control mb-2"
            id="inlineFormInput"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-2">
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      {isSubmitted && (
        <div className="text-success mt-2">
          Thank you for subscribing!
        </div>
      )}
    </form>
  );
};

export default SubscribeForm;
