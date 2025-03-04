/**
 * _app.js
 * 
 * This is the main application wrapper for Next.js.
 * It imports global styles and wraps all pages with common providers.
 * Adapted from the Envato template's _app.js file.
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import custom styles
import '../../styles/globals.css';
import '../../styles/components.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Import Bootstrap JS
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap');
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
