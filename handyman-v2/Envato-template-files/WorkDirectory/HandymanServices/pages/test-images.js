import React from 'react';
import Image from 'next/image';

const TestImages = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Images</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Plumbing</h2>
        <img 
          src="/assets/images/services/plumbing.jpg" 
          alt="Plumbing" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Electrical</h2>
        <img 
          src="/assets/images/services/electrical.jpg" 
          alt="Electrical" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Carpentry</h2>
        <img 
          src="/assets/images/services/carpentry.jpg" 
          alt="Carpentry" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Painting</h2>
        <img 
          src="/assets/images/services/painting.jpg" 
          alt="Painting" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>HVAC</h2>
        <img 
          src="/assets/images/services/hvac.jpg" 
          alt="HVAC" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Flooring</h2>
        <img 
          src="/assets/images/services/flooring.jpg" 
          alt="Flooring" 
          width={343} 
          height={220}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default TestImages;
