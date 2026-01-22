import { Waves, AlertTriangle, Users, Thermometer } from 'lucide-react';

interface HUDCardsProps {
  totalSites: number;
  criticalAlerts: number;
  activeRangers: number;
}

export const HUDCards = ({ totalSites, criticalAlerts, activeRangers }: HUDCardsProps) => {
  return (
    <div className="absolute top-4 left-4 flex gap-3 z-20">
      <div className="hud-card animate-fade-in">
        <Waves className="w-5 h-5 text-primary" />
        <div>
          <div className="text-xs text-muted-foreground">Total Sites</div>
          <div className="text-xl font-bold text-foreground">{totalSites}</div>
        </div>
      </div>
      
      <div className="hud-card animate-fade-in" style={{ animationDelay: '100ms' }}>
        <AlertTriangle className="w-5 h-5 text-reef-critical" />
        <div>
          <div className="text-xs text-muted-foreground">Critical Alerts</div>
          <div className="text-xl font-bold text-reef-critical">{criticalAlerts}</div>
        </div>
      </div>
      
      <div className="hud-card animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Users className="w-5 h-5 text-reef-healthy" />
        <div>
          <div className="text-xs text-muted-foreground">Rangers Active</div>
          <div className="text-xl font-bold text-foreground">{activeRangers}</div>
        </div>
      </div>
    </div>
  );
};

export const WeatherWidget = () => {
  return (
    <div className="absolute top-4 right-[340px] z-20">
      <div className="hud-card animate-fade-in" style={{ animationDelay: '300ms' }}>
        <Thermometer className="w-6 h-6 text-reef-warning" />
        <div>
          <div className="text-xs text-muted-foreground">Sea Surface Temp</div>
          <div className="text-2xl font-bold text-foreground">31.2°C</div>
          <div className="text-xs text-reef-critical font-medium">+1.5°C anomaly</div>
        </div>
      </div>
    </div>
  );
};
