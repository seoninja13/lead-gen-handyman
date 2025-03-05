/**
 * Places Search MCP Component
 * 
 * This component provides a search interface for Google Places API via MCP.
 * It allows users to search for places and select one from the results.
 */

import React, { useState, useEffect, useRef } from 'react';
import { searchPlaces, getPlaceDetails } from '../../utils/mcp/google-places-client';

/**
 * PlacesSearchMcp Component
 * 
 * @param {Object} props Component props
 * @param {Function} props.onPlaceSelect Callback when a place is selected
 * @param {Function} props.onPlacesFound Callback when places are found
 * @param {string} props.placeholder Placeholder text for the search input
 * @param {string} props.buttonText Text for the search button
 * @param {Object} props.location Optional location to search near
 * @param {number} props.radius Optional radius to search within (in meters)
 * @returns {JSX.Element} Places Search component
 */
const PlacesSearchMcp = ({ 
  onPlaceSelect, 
  onPlacesFound, 
  placeholder = "Search for places...",
  buttonText = "Search",
  location,
  radius = 5000
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  /**
   * Add a search to history
   * 
   * @param {string} searchQuery The search query
   * @param {number} resultCount The number of results
   */
  const addSearchToHistory = (searchQuery, resultCount) => {
    const timestamp = new Date().toISOString();
    setSearchHistory(prevHistory => [
      {
        id: Date.now(),
        query: searchQuery,
        resultCount,
        timestamp
      },
      ...prevHistory.slice(0, 9) // Keep only the last 10 searches
    ]);
  };

  /**
   * Handle search query change
   * 
   * @param {Event} e The input change event
   */
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * Handle search submission
   * 
   * @param {Event} e The form submit event
   */
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedPlace(null);
    setShowResults(true);
    
    try {
      const searchResults = await searchPlaces(query, location, radius);
      setResults(searchResults);
      addSearchToHistory(query, searchResults.length);
      
      if (onPlacesFound) {
        onPlacesFound(searchResults);
      }
    } catch (err) {
      console.error('Error searching places:', err);
      setError(err.message || 'Failed to search places');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle place selection
   * 
   * @param {Object} place The selected place
   */
  const handlePlaceSelect = async (place) => {
    setLoading(true);
    setError(null);
    
    try {
      // If the place has a place_id, fetch the full details
      if (place.place_id) {
        const details = await getPlaceDetails(place.place_id);
        setSelectedPlace(details);
        
        if (onPlaceSelect) {
          onPlaceSelect(details);
        }
      } else {
        setSelectedPlace(place);
        
        if (onPlaceSelect) {
          onPlaceSelect(place);
        }
      }
    } catch (err) {
      console.error('Error getting place details:', err);
      setError(err.message || 'Failed to get place details');
    } finally {
      setLoading(false);
      setShowResults(false);
    }
  };

  /**
   * Clear search results
   */
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedPlace(null);
    setShowResults(false);
    setError(null);
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  /**
   * Repeat a previous search
   * 
   * @param {string} searchQuery The search query to repeat
   */
  const repeatSearch = (searchQuery) => {
    setQuery(searchQuery);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target) && 
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h5 className="mb-4">
          <i className="fas fa-map-marker-alt text-primary me-2"></i>
          Google Places Search
        </h5>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={query}
              onChange={handleQueryChange}
              ref={searchInputRef}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Searching...
                </>
              ) : (
                <>
                  <i className="fas fa-search me-2"></i>
                  {buttonText}
                </>
              )}
            </button>
            {query && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clearSearch}
                disabled={loading}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {/* Search Results */}
        {showResults && results.length > 0 && (
          <div ref={resultsRef} className="mb-4">
            <h6 className="mb-3">
              <i className="fas fa-list text-primary me-2"></i>
              Search Results
            </h6>
            <div className="list-group">
              {results.map((place) => (
                <button
                  key={place.place_id || place.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handlePlaceSelect(place)}
                  disabled={loading}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{place.name}</h6>
                      <small className="text-muted">{place.formatted_address || place.vicinity}</small>
                    </div>
                    <small className="text-primary">
                      <i className="fas fa-chevron-right"></i>
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Place */}
        {selectedPlace && (
          <div className="mb-4">
            <h6 className="mb-3">
              <i className="fas fa-map-pin text-primary me-2"></i>
              Selected Place
            </h6>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title">{selectedPlace.name}</h5>
                <p className="card-text text-muted mb-2">
                  {selectedPlace.formatted_address || selectedPlace.vicinity}
                </p>
                {selectedPlace.rating && (
                  <p className="card-text mb-0">
                    <small className="text-warning">
                      <i className="fas fa-star me-1"></i>
                      {selectedPlace.rating}
                    </small>
                    {selectedPlace.user_ratings_total && (
                      <small className="text-muted ms-2">
                        ({selectedPlace.user_ratings_total} reviews)
                      </small>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div>
            <h6 className="mb-3">
              <i className="fas fa-history text-primary me-2"></i>
              Recent Searches
            </h6>
            <div className="list-group">
              {searchHistory.map((search) => (
                <button
                  key={search.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => repeatSearch(search.query)}
                  disabled={loading}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{search.query}</h6>
                      <small className="text-muted">
                        {search.resultCount} results • {new Date(search.timestamp).toLocaleTimeString()}
                      </small>
                    </div>
                    <i className="fas fa-redo text-primary"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesSearchMcp;
