import React from 'react';
import Head from 'next/head';

const TestRoute = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Head>
        <title>Test Route</title>
      </Head>
      <h1>Test Route Page</h1>
      <p>This is a test page to verify that Next.js routing is working correctly.</p>
    </div>
  );
};

export default TestRoute;
