/**
 * _document.js
 * 
 * This file is used to customize the HTML document that is rendered by Next.js.
 * We use it to include the CSS files from the Envato template.
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Template CSS Files */}
        <link rel="stylesheet" href="/assets/scss/main.css" />
        <link rel="stylesheet" href="/assets/scss/responsive.css" />
        <link rel="stylesheet" href="/assets/scss/menu.css" />
        <link rel="stylesheet" href="/assets/scss/megadropdown.css" />
        <link rel="stylesheet" href="/assets/scss/ace-responsive-menu.css" />
        <link rel="stylesheet" href="/assets/scss/dashbord_navitaion.css" />
        <link rel="stylesheet" href="/assets/scss/flaticon.css" />
        <link rel="stylesheet" href="/assets/scss/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/scss/font-awesome-animation.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
