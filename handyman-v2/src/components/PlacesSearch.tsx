/**
 * PlacesSearch Component
 * 
 * A reusable component for searching places using the Google Places API.
 * This component provides a search interface with autocomplete functionality.
 */

import React, { useState, useEffect } from 'react';
import { PlaceData } from '../lib/google-places-client';

interface PlacesSearchProps {
  onPlaceSelect?: (place: PlaceData) => void;
  onPlacesFound?: (places: PlaceData[]) => void;
  initialQuery?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const PlacesSearch: React.FC<PlacesSearchProps> = ({
  onPlaceSelect,
  onPlacesFound,
  initialQuery = '',
  placeholder = 'Search for handyman services...',
  buttonText = 'Search',
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search submission
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/places/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setPlaces(data.businesses || []);
      
      if (onPlacesFound) {
        onPlacesFound(data.businesses || []);
      }
    } catch (err) {
      console.error('Error searching places:', err);
      setError('Failed to search places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle place selection
  const handlePlaceSelect = (place: PlaceData) => {
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  // Search when initialQuery changes
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
      handleSearch();
    }
  }, [initialQuery]);

  return (
    <div className={`places-search ${className}`}>
      <form onSubmit={handleSearch} className="places-search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : buttonText}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="search-error">
          {error}
        </div>
      )}
      
      {places.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul className="places-list">
            {places.map((place) => (
              <li
                key={place.place_id}
                className="place-item"
                onClick={() => handlePlaceSelect(place)}
              >
                <div className="place-name">{place.name}</div>
                {place.formatted_address && (
                  <div className="place-address">{place.formatted_address}</div>
                )}
                {place.rating > 0 && (
                  <div className="place-rating">
                    Rating: {place.rating} ({place.user_ratings_total} reviews)
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .places-search {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .places-search-form {
          margin-bottom: 20px;
        }
        
        .search-input-container {
          display: flex;
          width: 100%;
        }
        
        .search-input {
          flex: 1;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          outline: none;
        }
        
        .search-button {
          padding: 12px 24px;
          background-color: #4a90e2;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .search-button:hover {
          background-color: #3a80d2;
        }
        
        .search-button:disabled {
          background-color: #a0a0a0;
          cursor: not-allowed;
        }
        
        .search-error {
          color: #e53935;
          margin-bottom: 20px;
          padding: 10px;
          background-color: #ffebee;
          border-radius: 4px;
        }
        
        .search-results {
          margin-top: 20px;
        }
        
        .places-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .place-item {
          padding: 16px;
          border: 1px solid #eee;
          border-radius: 4px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .place-item:hover {
          background-color: #f5f5f5;
        }
        
        .place-name {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 5px;
        }
        
        .place-address {
          color: #666;
          margin-bottom: 5px;
        }
        
        .place-rating {
          color: #ff9800;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default PlacesSearch;
