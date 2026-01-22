import { X, MapPin, Activity, Droplets, Shell } from 'lucide-react';
import { MapMarker } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SiteDetailsDrawerProps {
  marker: MapMarker | null;
  isOpen: boolean;
  onClose: () => void;
}

const biomarkers = [
  { name: 'HSP70', level: 'high', icon: Activity },
  { name: 'MnSOD', level: 'elevated', icon: Droplets },
  { name: 'Symbiodiniaceae', level: 'declining', icon: Shell },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'high':
      return 'bg-reef-critical/20 text-reef-critical border-reef-critical/30';
    case 'elevated':
      return 'bg-reef-warning/20 text-reef-warning border-reef-warning/30';
    case 'declining':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default:
      return 'bg-reef-healthy/20 text-reef-healthy border-reef-healthy/30';
  }
};

export const SiteDetailsDrawer = ({ marker, isOpen, onClose }: SiteDetailsDrawerProps) => {
  const handleDeployProtocol = () => {
    toast.success('Shade Protocol Deployed Successfully', {
      description: `Emergency shade structures are being deployed at ${marker?.siteName}. Rangers have been alerted.`,
    });
    onClose();
  };

  if (!marker) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 glass-panel border-l border-primary/20 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <div>
            <h2 className="text-lg font-bold text-foreground">{marker.siteName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{marker.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              marker.status === 'critical' 
                ? 'bg-reef-critical/20 text-reef-critical' 
                : marker.status === 'warning'
                ? 'bg-reef-warning/20 text-reef-warning'
                : 'bg-reef-healthy/20 text-reef-healthy'
            }`}>
              {marker.status}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Coral Image Placeholder */}
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-primary/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Shell className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">Coral Site Image</span>
              </div>
            </div>
            {/* Overlay status indicator */}
            <div className="absolute top-3 right-3">
              <div className={`w-3 h-3 rounded-full ${
                marker.status === 'critical' ? 'bg-reef-critical animate-pulse' : 
                marker.status === 'warning' ? 'bg-reef-warning' : 'bg-reef-healthy'
              }`} />
            </div>
          </div>

          {/* Biomarker Data */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Biomarker Data</h3>
            <div className="space-y-2">
              {biomarkers.map((biomarker) => (
                <div
                  key={biomarker.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <biomarker.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{biomarker.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getLevelColor(biomarker.level)}`}>
                    {biomarker.level.charAt(0).toUpperCase() + biomarker.level.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Site Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/50 border border-primary/10">
              <div className="text-xs text-muted-foreground">Last Inspection</div>
              <div className="text-sm font-semibold text-foreground">2 days ago</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-primary/10">
              <div className="text-xs text-muted-foreground">Water Temp</div>
              <div className="text-sm font-semibold text-reef-warning">31.8°C</div>
            </div>
          </div>

          {/* Deploy Protocol Button */}
          {marker.status === 'critical' && (
            <Button
              className="w-full font-semibold"
              size="lg"
              onClick={handleDeployProtocol}
            >
              Deploy Shade Protocol
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
