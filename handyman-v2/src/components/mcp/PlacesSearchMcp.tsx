/**
 * Places Search MCP Component
 * 
 * This component demonstrates the use of the Google Places API
 * through the Model Context Protocol (MCP) server.
 */

import React, { useState } from 'react';
import { searchPlaces, getPlaceDetails } from '../../lib/google-places-mcp';
import { PlaceData } from '../../lib/google-places-client';

interface PlacesSearchMcpProps {
  onSelectPlace?: (place: PlaceData) => void;
}

const PlacesSearchMcp: React.FC<PlacesSearchMcpProps> = ({ onSelectPlace }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceData[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle search form submission
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchPlaces(query);
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No results found');
      }
    } catch (err) {
      console.error('Error searching places:', err);
      setError('Error searching places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle place selection
   */
  const handleSelectPlace = async (placeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const place = await getPlaceDetails(placeId);
      
      if (place) {
        setSelectedPlace(place);
        
        if (onSelectPlace) {
          onSelectPlace(place);
        }
      } else {
        setError('Error retrieving place details');
      }
    } catch (err) {
      console.error('Error getting place details:', err);
      setError('Error retrieving place details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="places-search-mcp">
      <h2>Places Search (MCP)</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for places (e.g., handyman services Sacramento CA)"
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && (
          <div className="error-message">{error}</div>
        )}
      </form>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul className="results-list">
            {searchResults.map((place) => (
              <li key={place.place_id} className="result-item">
                <div className="result-content">
                  <h4>{place.name}</h4>
                  <p>{place.formatted_address}</p>
                  {place.rating && (
                    <div className="rating">
                      Rating: {place.rating} ({place.user_ratings_total} reviews)
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSelectPlace(place.place_id)}
                  className="view-details-button"
                  disabled={loading}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedPlace && (
        <div className="place-details">
          <h3>Place Details</h3>
          <div className="details-card">
            <h4>{selectedPlace.name}</h4>
            <p>{selectedPlace.formatted_address}</p>
            
            {selectedPlace.rating && (
              <div className="rating">
                Rating: {selectedPlace.rating} ({selectedPlace.user_ratings_total} reviews)
              </div>
            )}
            
            {selectedPlace.description && (
              <div className="description">
                <h5>Description</h5>
                <p>{selectedPlace.description}</p>
              </div>
            )}
            
            <div className="contact-info">
              {selectedPlace.phone_number && (
                <div className="phone">
                  <strong>Phone:</strong> {selectedPlace.phone_number}
                </div>
              )}
              
              {selectedPlace.website && (
                <div className="website">
                  <strong>Website:</strong>{' '}
                  <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer">
                    {selectedPlace.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .places-search-mcp {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h2 {
          color: #333;
          margin-bottom: 20px;
        }
        
        .search-form {
          margin-bottom: 20px;
        }
        
        .input-group {
          display: flex;
          gap: 10px;
        }
        
        .search-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .search-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .search-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .error-message {
          color: #e53e3e;
          margin-top: 10px;
        }
        
        .search-results {
          margin-top: 20px;
        }
        
        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        
        .result-content {
          flex: 1;
        }
        
        .result-content h4 {
          margin: 0 0 5px 0;
          color: #333;
        }
        
        .result-content p {
          margin: 0 0 5px 0;
          color: #666;
        }
        
        .rating {
          color: #f59e0b;
          font-size: 14px;
        }
        
        .view-details-button {
          padding: 8px 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .view-details-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .place-details {
          margin-top: 30px;
        }
        
        .details-card {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
        
        .details-card h4 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 20px;
        }
        
        .details-card p {
          margin: 0 0 15px 0;
          color: #666;
        }
        
        .description {
          margin: 15px 0;
        }
        
        .description h5 {
          margin: 0 0 5px 0;
          color: #333;
        }
        
        .description p {
          margin: 0;
          color: #666;
        }
        
        .contact-info {
          margin-top: 15px;
        }
        
        .phone, .website {
          margin-bottom: 5px;
        }
        
        .website a {
          color: #0070f3;
          text-decoration: none;
        }
        
        .website a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default PlacesSearchMcp;
