import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapMarkers, alerts, MapMarker as MapMarkerType } from '@/data/mockData';
import { HUDCards, WeatherWidget } from '@/components/HUDCards';
import { AlertsSidebar } from '@/components/AlertsSidebar';
import { SiteDetailsDrawer } from '@/components/SiteDetailsDrawer';
import { BottomTicker } from '@/components/BottomTicker';

// Custom marker icons
const createCustomIcon = (status: 'healthy' | 'warning' | 'critical') => {
  const colors = {
    healthy: { bg: '#00ff88', shadow: 'rgba(0, 255, 136, 0.6)' },
    warning: { bg: '#ffd700', shadow: 'rgba(255, 215, 0, 0.6)' },
    critical: { bg: '#ff3366', shadow: 'rgba(255, 51, 102, 0.6)' },
  };

  const color = colors[status];
  const size = status === 'critical' ? 16 : 14;

  return L.divIcon({
    className: `custom-marker-${status}`,
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color.bg};
      border-radius: 50%;
      box-shadow: 0 0 15px ${color.shadow};
      border: 2px solid ${color.bg};
      ${status === 'critical' ? 'animation: pulse-glow 2s ease-in-out infinite;' : ''}
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Map bounds for Andaman Islands
const andamanBounds: L.LatLngBoundsExpression = [
  [10.5, 92.0], // Southwest
  [14.0, 94.0], // Northeast
];

const andamanCenter: L.LatLngExpression = [12.2, 92.9];

// Component to set map view and bounds
const MapController = () => {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(andamanBounds);
    map.setMinZoom(7);
    map.setMaxZoom(14);
  }, [map]);

  return null;
};

export const LiveMapView = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMarkerClick = (marker: MapMarkerType) => {
    setSelectedMarker(marker);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedMarker(null), 300);
  };

  const criticalCount = mapMarkers.filter((m) => m.status === 'critical').length;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      {/* Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={andamanCenter}
          zoom={8}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          attributionControl={true}
        >
          <MapController />
          
          {/* ESRI World Imagery (Satellite) */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          />
        
        {/* Semi-transparent overlay for ocean depth effect */}
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png"
          attribution=""
          opacity={0.1}
        />

        {/* Markers */}
        {mapMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon(marker.status)}
            eventHandlers={{
              click: () => handleMarkerClick(marker),
            }}
          >
            <Popup className="custom-popup">
              <div className="text-sm">
                <div className="font-bold text-foreground">{marker.siteName}</div>
                <div className="text-muted-foreground">{marker.location}</div>
                <div className={`mt-1 text-xs font-medium uppercase ${
                  marker.status === 'critical' ? 'text-reef-critical' :
                  marker.status === 'warning' ? 'text-reef-warning' : 'text-reef-healthy'
                }`}>
                  {marker.status}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        </MapContainer>
      </div>

      {/* Dark overlay gradient for edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ocean-deep/30 via-transparent to-ocean-deep/50 z-[5]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-ocean-deep/20 via-transparent to-ocean-deep/40 z-[5]" />

      {/* HUD Elements */}
      <HUDCards totalSites={42} criticalAlerts={criticalCount} activeRangers={8} />
      <WeatherWidget />

      {/* Alerts Sidebar */}
      <AlertsSidebar alerts={alerts} />

      {/* Bottom Ticker */}
      <BottomTicker />

      {/* Site Details Drawer */}
      <SiteDetailsDrawer
        marker={selectedMarker}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};
