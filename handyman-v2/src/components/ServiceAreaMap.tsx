/**
 * ServiceAreaMap Component
 * 
 * A component for displaying a map with service areas using Google Maps.
 * This component allows users to visualize service coverage areas.
 */

import React, { useState, useEffect, useRef } from 'react';
import { PlaceData } from '../lib/google-places-client';

// Define the props interface
interface ServiceAreaMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  places?: PlaceData[];
  serviceRadius?: number; // in miles
  onMapClick?: (lat: number, lng: number) => void;
  height?: string;
  width?: string;
  className?: string;
}

const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  center = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 10,
  places = [],
  serviceRadius = 25, // Default 25 miles radius
  onMapClick,
  height = '400px',
  width = '100%',
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize the map
  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps) {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
      return;
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Initialize map when API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    setMap(newMap);

    // Add click event listener
    if (onMapClick) {
      newMap.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          onMapClick(event.latLng.lat(), event.latLng.lng());
        }
      });
    }

    return () => {
      // Clean up
      markers.forEach(marker => marker.setMap(null));
      circles.forEach(circle => circle.setMap(null));
    };
  }, [mapLoaded]);

  // Update markers and circles when places change
  useEffect(() => {
    if (!map || !places.length) return;

    // Clear existing markers and circles
    markers.forEach(marker => marker.setMap(null));
    circles.forEach(circle => circle.setMap(null));

    const newMarkers: google.maps.Marker[] = [];
    const newCircles: google.maps.Circle[] = [];

    // Create markers and circles for each place
    places.forEach(place => {
      if (place.geometry?.location) {
        const position = {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        };

        // Create marker
        const marker = new google.maps.Marker({
          position,
          map,
          title: place.name,
          animation: google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="info-window">
              <h3>${place.name}</h3>
              ${place.formatted_address ? `<p>${place.formatted_address}</p>` : ''}
              ${place.rating ? `<p>Rating: ${place.rating} (${place.user_ratings_total} reviews)</p>` : ''}
            </div>
          `,
        });

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        newMarkers.push(marker);

        // Create service area circle (convert miles to meters)
        const circle = new google.maps.Circle({
          map,
          center: position,
          radius: serviceRadius * 1609.34, // Convert miles to meters
          fillColor: '#4a90e2',
          fillOpacity: 0.2,
          strokeColor: '#4a90e2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        });

        newCircles.push(circle);
      }
    });

    setMarkers(newMarkers);
    setCircles(newCircles);

    // Fit bounds to include all markers if there are multiple
    if (newMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
    } else if (newMarkers.length === 1) {
      map.setCenter(newMarkers[0].getPosition()!);
      map.setZoom(11);
    }
  }, [map, places, serviceRadius]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (!map) return;
    map.setCenter(center);
    map.setZoom(zoom);
  }, [map, center, zoom]);

  return (
    <div 
      className={`service-area-map ${className}`}
      style={{ height, width }}
    >
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%' }}
      />
      {!mapLoaded && (
        <div className="map-loading">
          Loading map...
        </div>
      )}
      <style jsx>{`
        .service-area-map {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .map-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.8);
          font-size: 18px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default ServiceAreaMap;
