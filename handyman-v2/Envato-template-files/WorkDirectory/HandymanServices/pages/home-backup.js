import React from "react";
import Head from "next/head";
import Link from "next/link";

/**
 * Simple Home Page without external component dependencies
 */
const Home = () => {
  return (
    <>
      <Head>
        <title>Handyman Services | Professional Home Repair and Maintenance</title>
        <meta name="description" content="Find professional handyman services for all your home repair and maintenance needs. Browse our network of trusted service providers." />
      </Head>

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#333' }}>Handyman Services</h1>
          <p style={{ fontSize: '18px', color: '#666' }}>Professional Home Repair and Maintenance</p>
        </header>

        <div className="alert alert-info text-center" style={{ margin: '20px auto', maxWidth: '800px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '5px', color: '#0c5460' }}>
          <p style={{ margin: '0' }}>Check out our <Link href="/new-design" style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#0c5460' }}>new home page design</Link> based on the reference template!</p>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Featured Services</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 300px', border: '1px solid #ddd', borderRadius: '5px', padding: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#333' }}>Electrical Services</h3>
              <p style={{ color: '#666' }}>Professional electrical repairs and installations for your home.</p>
            </div>
            <div style={{ flex: '1 1 300px', border: '1px solid #ddd', borderRadius: '5px', padding: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#333' }}>Plumbing Services</h3>
              <p style={{ color: '#666' }}>Expert plumbing solutions for leaks, clogs, and installations.</p>
            </div>
            <div style={{ flex: '1 1 300px', border: '1px solid #ddd', borderRadius: '5px', padding: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#333' }}>Carpentry</h3>
              <p style={{ color: '#666' }}>Custom woodworking, repairs, and installations by skilled craftsmen.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Why Choose Us</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 300px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#007bff', marginBottom: '10px' }}>✓</div>
              <h3 style={{ fontSize: '20px', color: '#333' }}>Expert Craftsmen</h3>
              <p style={{ color: '#666' }}>Our professionals are highly skilled and experienced in their respective trades.</p>
            </div>
            <div style={{ flex: '1 1 300px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#007bff', marginBottom: '10px' }}>⏰</div>
              <h3 style={{ fontSize: '20px', color: '#333' }}>24/7 Emergency Service</h3>
              <p style={{ color: '#666' }}>We're available around the clock for your urgent home repair needs.</p>
            </div>
            <div style={{ flex: '1 1 300px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#007bff', marginBottom: '10px' }}>💰</div>
              <h3 style={{ fontSize: '20px', color: '#333' }}>Transparent Pricing</h3>
              <p style={{ color: '#666' }}>No hidden fees or surprises - we provide clear, upfront pricing for all services.</p>
            </div>
          </div>
        </section>

        <footer style={{ textAlign: 'center', marginTop: '60px', padding: '20px', borderTop: '1px solid #ddd' }}>
          <p style={{ color: '#666' }}>© 2025 Handyman Services. All rights reserved.</p>
          <div style={{ marginTop: '10px' }}>
            <Link href="/" style={{ color: '#007bff', marginRight: '15px' }}>Home</Link>
            <Link href="/services" style={{ color: '#007bff', marginRight: '15px' }}>Services</Link>
            <Link href="/about" style={{ color: '#007bff', marginRight: '15px' }}>About</Link>
            <Link href="/contact" style={{ color: '#007bff' }}>Contact</Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
