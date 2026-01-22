import { MapMarker as MapMarkerType } from '@/data/mockData';

interface MapMarkerProps {
  marker: MapMarkerType;
  onClick: (marker: MapMarkerType) => void;
}

export const MapMarker = ({ marker, onClick }: MapMarkerProps) => {
  const statusClasses = {
    healthy: 'marker-healthy',
    warning: 'marker-warning',
    critical: 'marker-critical',
  };

  return (
    <div
      className="absolute group cursor-pointer"
      style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={() => onClick(marker)}
    >
      {/* Outer pulse ring for critical markers */}
      {marker.status === 'critical' && (
        <div className="absolute inset-0 w-4 h-4 rounded-full bg-reef-critical/30 animate-pulse-ring" />
      )}
      
      {/* Main marker */}
      <div className={statusClasses[marker.status]} />
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 glass-panel text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-semibold text-foreground">{marker.siteName}</div>
        <div className="text-muted-foreground">{marker.location}</div>
      </div>
    </div>
  );
};
