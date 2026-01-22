import { Alert, stressPredictionData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { toast } from 'sonner';

interface AlertsSidebarProps {
  alerts: Alert[];
}

export const AlertsSidebar = ({ alerts }: AlertsSidebarProps) => {
  const handleDeployProtocol = (siteName: string) => {
    toast.success(`Shade protocol deployed at ${siteName}`, {
      description: 'Rangers have been notified.',
    });
  };

  return (
    <div className="absolute top-0 right-0 w-80 h-full glass-panel rounded-l-lg border-l border-primary/20 p-4 overflow-y-auto z-10">
      <h2 className="text-lg font-bold text-foreground mb-4">Live Alerts & Data</h2>
      
      {/* Alerts List */}
      <div className="space-y-3 mb-6">
        {alerts.slice(0, 2).map((alert) => (
          <div
            key={alert.id}
            className={`alert-card ${
              alert.severity === 'critical' ? 'alert-critical' : 'alert-warning'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`text-xs font-bold uppercase ${
                alert.severity === 'critical' ? 'text-reef-critical' : 'text-reef-warning'
              }`}>
                {alert.severity}:
              </span>
              <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">
              {alert.siteName} ({alert.severity === 'critical' ? 'Red' : 'Yellow'})
            </div>
            <div className="text-sm text-muted-foreground mb-3">- {alert.message}</div>
            
            {alert.severity === 'critical' && (
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                onClick={() => handleDeployProtocol(alert.siteName)}
              >
                Deploy Protocol
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 7-Day Stress Prediction */}
      <div className="glass-panel p-4 border border-primary/10">
        <h3 className="text-sm font-semibold text-foreground mb-3">7-Day Stress Prediction</h3>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stressPredictionData}>
              <defs>
                <linearGradient id="stressGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(150, 100%, 50%)" />
                  <stop offset="50%" stopColor="hsl(45, 100%, 50%)" />
                  <stop offset="100%" stopColor="hsl(344, 100%, 60%)" />
                </linearGradient>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(150, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(344, 100%, 60%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="url(#stressGradient)"
                strokeWidth={2}
                fill="url(#areaFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Today</span>
          <span>+7 Days</span>
        </div>
      </div>
    </div>
  );
};
