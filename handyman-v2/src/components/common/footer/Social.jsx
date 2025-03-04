/**
 * Social Component
 * 
 * This component displays social media links.
 * Adapted from the Envato template's Social component.
 */

import React from 'react';
import Link from 'next/link';

const Social = () => {
  return (
    <ul className="mb30">
      <li className="list-inline-item">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-facebook"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-twitter"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-pinterest"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-youtube"></i>
        </a>
      </li>
    </ul>
  );
};

export default Social;
