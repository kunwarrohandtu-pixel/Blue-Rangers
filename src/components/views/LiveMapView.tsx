import { useState } from 'react';
import { mapMarkers, alerts } from '@/data/mockData';
import { MapMarker } from '@/components/MapMarker';
import { HUDCards, WeatherWidget } from '@/components/HUDCards';
import { AlertsSidebar } from '@/components/AlertsSidebar';
import { SiteDetailsDrawer } from '@/components/SiteDetailsDrawer';
import { BottomTicker } from '@/components/BottomTicker';
import { MapMarker as MapMarkerType } from '@/data/mockData';

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
      {/* Map Background with Grid Overlay */}
      <div className="absolute inset-0 bg-ocean-gradient">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(100, 255, 218, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Simulated Island Shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main Andaman Island Shape */}
          <path
            d="M 10 15 Q 15 10, 20 15 Q 25 20, 22 30 Q 25 40, 20 50 Q 18 60, 22 70 L 18 75 Q 12 70, 10 60 Q 8 50, 12 40 Q 10 30, 10 15 Z"
            fill="rgba(34, 84, 61, 0.4)"
            stroke="rgba(100, 255, 218, 0.2)"
            strokeWidth="0.3"
          />
          {/* Middle Islands */}
          <ellipse cx="35" cy="48" rx="8" ry="12" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          <ellipse cx="48" cy="60" rx="6" ry="8" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          <ellipse cx="58" cy="68" rx="5" ry="6" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          {/* Havelock Area */}
          <ellipse cx="62" cy="58" rx="8" ry="10" fill="rgba(34, 84, 61, 0.4)" stroke="rgba(100, 255, 218, 0.2)" strokeWidth="0.3" />
          {/* North Islands */}
          <ellipse cx="72" cy="25" rx="6" ry="8" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          <ellipse cx="78" cy="42" rx="5" ry="6" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          {/* South Islands */}
          <ellipse cx="70" cy="72" rx="7" ry="9" fill="rgba(34, 84, 61, 0.4)" stroke="rgba(100, 255, 218, 0.2)" strokeWidth="0.3" />
          <ellipse cx="58" cy="82" rx="4" ry="5" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
        </svg>

        {/* Ocean depth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/30 pointer-events-none" />
      </div>

      {/* HUD Elements */}
      <HUDCards totalSites={42} criticalAlerts={criticalCount} activeRangers={8} />
      <WeatherWidget />

      {/* Map Markers */}
      <div className="absolute inset-0 right-80">
        {mapMarkers.map((marker) => (
          <MapMarker key={marker.id} marker={marker} onClick={handleMarkerClick} />
        ))}
      </div>

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
