import { Provider } from 'react-redux';
import { store } from '../store';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
