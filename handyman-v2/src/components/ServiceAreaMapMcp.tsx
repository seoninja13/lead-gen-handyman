/**
 * ServiceAreaMapMcp Component
 * 
 * A component for displaying and managing service areas using Google Maps via MCP.
 * This component allows users to view, create, and edit service areas.
 */

import React, { useState, useEffect } from 'react';
import { getDirections, geocodeAddress } from '../lib/google-places-mcp';
import { saveServiceArea, getServiceAreas } from '../utils/supabase/mcp-client';

interface ServiceAreaMapMcpProps {
  providerId: string;
  initialCenter?: { lat: number; lng: number };
  onServiceAreaChange?: (serviceAreas: any[]) => void;
  editable?: boolean;
  className?: string;
}

const ServiceAreaMapMcp: React.FC<ServiceAreaMapMcpProps> = ({
  providerId,
  initialCenter = { lat: 38.5816, lng: -121.4944 }, // Sacramento, CA
  onServiceAreaChange,
  editable = false,
  className = '',
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaAddress, setNewAreaAddress] = useState('');
  const [newAreaRadius, setNewAreaRadius] = useState(10); // Default 10 miles
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);

  // Initialize map
  useEffect(() => {
    // Load Google Maps script if not already loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);

  // Initialize map
  const initMap = () => {
    if (!document.getElementById('service-area-map')) return;

    const mapInstance = new google.maps.Map(
      document.getElementById('service-area-map') as HTMLElement,
      {
        center: initialCenter,
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      }
    );

    setMap(mapInstance);
    loadServiceAreas(mapInstance);
  };

  // Load service areas from database
  const loadServiceAreas = async (mapInstance: google.maps.Map | null = map) => {
    if (!mapInstance) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const areas = await getServiceAreas(providerId);
      setServiceAreas(areas);
      
      // Clear existing circles
      circles.forEach(circle => circle.setMap(null));
      
      // Create circles for each service area
      const newCircles = areas.map(area => {
        const circle = new google.maps.Circle({
          strokeColor: '#4a90e2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#4a90e2',
          fillOpacity: 0.3,
          map: mapInstance,
          center: { lat: area.latitude, lng: area.longitude },
          radius: area.radius_miles * 1609.34, // Convert miles to meters
        });
        
        // Add click listener for editable circles
        if (editable) {
          circle.addListener('click', () => {
            if (confirm(`Delete service area "${area.name}"?`)) {
              deleteServiceArea(area.id);
            }
          });
        }
        
        return circle;
      });
      
      setCircles(newCircles);
      
      if (onServiceAreaChange) {
        onServiceAreaChange(areas);
      }
    } catch (err) {
      console.error('Error loading service areas:', err);
      setError('Failed to load service areas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new service area
  const addServiceArea = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAreaName || !newAreaAddress || !map) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Geocode the address
      const geocodeResult = await geocodeAddress(newAreaAddress);
      
      if (!geocodeResult || !geocodeResult.latitude || !geocodeResult.longitude) {
        throw new Error('Failed to geocode address');
      }
      
      // Save the service area to the database
      const newArea = {
        provider_id: providerId,
        name: newAreaName,
        address: newAreaAddress,
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
        radius_miles: newAreaRadius,
      };
      
      await saveServiceArea(newArea);
      
      // Reset form
      setNewAreaName('');
      setNewAreaAddress('');
      setNewAreaRadius(10);
      
      // Reload service areas
      loadServiceAreas();
    } catch (err) {
      console.error('Error adding service area:', err);
      setError('Failed to add service area. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a service area
  const deleteServiceArea = async (areaId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Execute SQL query to delete the service area
      const sql = `DELETE FROM service_areas WHERE id = '${areaId}'`;
      
      // Use the MCP client to execute the query
      await fetch('/api/mcp/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
      });
      
      // Reload service areas
      loadServiceAreas();
    } catch (err) {
      console.error('Error deleting service area:', err);
      setError('Failed to delete service area. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate driving distance between two points
  const calculateDrivingDistance = async (origin: string, destination: string) => {
    try {
      const directions = await getDirections(origin, destination, 'driving');
      
      if (!directions || !directions.routes || directions.routes.length === 0) {
        throw new Error('No routes found');
      }
      
      const route = directions.routes[0];
      const distance = route.legs[0].distance.text;
      const duration = route.legs[0].duration.text;
      
      alert(`Driving distance: ${distance}\nDriving time: ${duration}`);
    } catch (err) {
      console.error('Error calculating driving distance:', err);
      alert('Failed to calculate driving distance. Please try again.');
    }
  };

  return (
    <div className={`service-area-map-container ${className}`}>
      <div id="service-area-map" style={{ width: '100%', height: '400px' }}></div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="loading-message">
          Loading service areas...
        </div>
      )}
      
      {editable && (
        <div className="service-area-form">
          <h3>Add Service Area</h3>
          <form onSubmit={addServiceArea}>
            <div className="form-group">
              <label htmlFor="area-name">Name</label>
              <input
                type="text"
                id="area-name"
                value={newAreaName}
                onChange={(e) => setNewAreaName(e.target.value)}
                placeholder="e.g., Downtown Sacramento"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="area-address">Address</label>
              <input
                type="text"
                id="area-address"
                value={newAreaAddress}
                onChange={(e) => setNewAreaAddress(e.target.value)}
                placeholder="e.g., Sacramento, CA"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="area-radius">Radius (miles)</label>
              <input
                type="number"
                id="area-radius"
                value={newAreaRadius}
                onChange={(e) => setNewAreaRadius(parseInt(e.target.value))}
                min="1"
                max="100"
                required
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Service Area'}
            </button>
          </form>
        </div>
      )}
      
      {serviceAreas.length > 0 && (
        <div className="service-areas-list">
          <h3>Service Areas</h3>
          <ul>
            {serviceAreas.map((area) => (
              <li key={area.id}>
                <strong>{area.name}</strong> - {area.radius_miles} miles
                {editable && (
                  <button
                    className="delete-button"
                    onClick={() => deleteServiceArea(area.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .service-area-map-container {
          width: 100%;
          margin-bottom: 30px;
        }
        
        .error-message {
          color: #e53935;
          margin: 10px 0;
          padding: 10px;
          background-color: #ffebee;
          border-radius: 4px;
        }
        
        .loading-message {
          margin: 10px 0;
          color: #666;
        }
        
        .service-area-form {
          margin-top: 20px;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        button {
          padding: 10px 20px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #3a80d2;
        }
        
        button:disabled {
          background-color: #a0a0a0;
          cursor: not-allowed;
        }
        
        .service-areas-list {
          margin-top: 20px;
        }
        
        .service-areas-list ul {
          list-style: none;
          padding: 0;
        }
        
        .service-areas-list li {
          padding: 10px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .delete-button {
          background-color: #e53935;
          padding: 5px 10px;
          font-size: 12px;
        }
        
        .delete-button:hover {
          background-color: #c62828;
        }
      `}</style>
    </div>
  );
};

export default ServiceAreaMapMcp;
