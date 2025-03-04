/**
 * Service Finder Page
 * 
 * This page allows users to search for handyman services in their area using the MCP-based
 * Google Places integration and view service areas on a map.
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PlacesSearchMcp from '../components/PlacesSearchMcp';
import ServiceAreaMapMcp from '../components/ServiceAreaMapMcp';
import { PlaceData } from '../lib/google-places-client';
import { getPlaceDetails } from '../lib/google-places-mcp';

const ServiceFinderPage: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Get user's location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);
  
  // Handle place selection
  const handlePlaceSelect = async (place: PlaceData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get detailed place information
      const detailedPlace = await getPlaceDetails(place.place_id);
      setSelectedPlace(detailedPlace);
    } catch (err) {
      console.error('Error getting place details:', err);
      setError('Failed to get place details. Please try again.');
      setSelectedPlace(place);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="service-finder-page">
      <Head>
        <title>Find Handyman Services Near You | Handyman Lead Gen</title>
        <meta name="description" content="Search for handyman services in your area and get detailed information about service providers." />
      </Head>
      
      <header className="page-header">
        <h1>Find Handyman Services Near You</h1>
        <p>Search for handyman services in your area and get detailed information about service providers.</p>
      </header>
      
      <main className="page-content">
        <section className="search-section">
          <h2>Search for Services</h2>
          <PlacesSearchMcp
            onPlaceSelect={handlePlaceSelect}
            placeholder="Search for handyman services in your area..."
            buttonText="Find Services"
            location={userLocation || undefined}
            radius={50000} // 50km radius
          />
        </section>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="loading-message">
            Loading place details...
          </div>
        )}
        
        {selectedPlace && (
          <section className="place-details-section">
            <h2>{selectedPlace.name}</h2>
            
            <div className="place-details-grid">
              <div className="place-info">
                {selectedPlace.formatted_address && (
                  <div className="info-item">
                    <h3>Address</h3>
                    <p>{selectedPlace.formatted_address}</p>
                  </div>
                )}
                
                {selectedPlace.formatted_phone_number && (
                  <div className="info-item">
                    <h3>Phone</h3>
                    <p>{selectedPlace.formatted_phone_number}</p>
                  </div>
                )}
                
                {selectedPlace.rating > 0 && (
                  <div className="info-item">
                    <h3>Rating</h3>
                    <p>{selectedPlace.rating} stars ({selectedPlace.user_ratings_total} reviews)</p>
                  </div>
                )}
                
                {selectedPlace.website && (
                  <div className="info-item">
                    <h3>Website</h3>
                    <p>
                      <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer">
                        {selectedPlace.website}
                      </a>
                    </p>
                  </div>
                )}
                
                {selectedPlace.opening_hours && (
                  <div className="info-item">
                    <h3>Hours</h3>
                    <ul className="hours-list">
                      {selectedPlace.opening_hours.weekday_text?.map((day, index) => (
                        <li key={index}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="place-map">
                <h3>Service Area</h3>
                <ServiceAreaMapMcp
                  providerId={selectedPlace.place_id}
                  initialCenter={{
                    lat: selectedPlace.geometry?.location.lat || 0,
                    lng: selectedPlace.geometry?.location.lng || 0,
                  }}
                  editable={false}
                />
              </div>
            </div>
          </section>
        )}
      </main>
      
      <style jsx>{`
        .service-finder-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .page-header h1 {
          font-size: 36px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .page-header p {
          font-size: 18px;
          color: #666;
        }
        
        .search-section {
          margin-bottom: 40px;
        }
        
        .search-section h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .error-message {
          color: #e53935;
          margin-bottom: 20px;
          padding: 15px;
          background-color: #ffebee;
          border-radius: 4px;
        }
        
        .loading-message {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #f5f5f5;
          border-radius: 4px;
          text-align: center;
          color: #666;
        }
        
        .place-details-section {
          margin-top: 40px;
        }
        
        .place-details-section h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .place-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        
        @media (max-width: 768px) {
          .place-details-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .place-info {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 4px;
        }
        
        .info-item {
          margin-bottom: 20px;
        }
        
        .info-item h3 {
          font-size: 18px;
          margin-bottom: 5px;
          color: #333;
        }
        
        .info-item p {
          color: #666;
        }
        
        .hours-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .hours-list li {
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        
        .place-map {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 4px;
        }
        
        .place-map h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default ServiceFinderPage;
