import { useState } from 'react';
import { alerts } from '@/data/mockData';
import { AlertTriangle, AlertCircle, Info, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type FilterType = 'all' | 'critical' | 'warning' | 'info';

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle className="w-5 h-5 text-reef-critical" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-reef-warning" />;
    default:
      return <Info className="w-5 h-5 text-primary" />;
  }
};

const getAlertBorder = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'border-l-reef-critical';
    case 'warning':
      return 'border-l-reef-warning';
    default:
      return 'border-l-primary';
  }
};

// Extended alerts for demo
const allAlerts = [
  ...alerts,
  {
    id: '6',
    severity: 'warning' as const,
    siteName: 'Site LNG-04',
    siteCode: 'Long Island',
    message: 'pH level below threshold',
    timestamp: '4 hours ago',
  },
  {
    id: '7',
    severity: 'info' as const,
    siteName: 'Site DIG-02',
    siteCode: 'Diglipur',
    message: 'Monthly report submitted',
    timestamp: '5 hours ago',
  },
  {
    id: '8',
    severity: 'critical' as const,
    siteName: 'Site RTL-01',
    siteCode: 'Rutland Island',
    message: 'Severe coral bleaching observed',
    timestamp: '30 min ago',
  },
];

const groupAlerts = () => {
  const today: typeof allAlerts = [];
  const yesterday: typeof allAlerts = [];
  const thisWeek: typeof allAlerts = [];

  allAlerts.forEach((alert) => {
    if (alert.timestamp.includes('min') || alert.timestamp.includes('hour')) {
      today.push(alert);
    } else if (alert.timestamp.includes('1 day')) {
      yesterday.push(alert);
    } else {
      thisWeek.push(alert);
    }
  });

  // For demo, distribute alerts
  return {
    today: allAlerts.slice(0, 5),
    yesterday: allAlerts.slice(5, 7),
    thisWeek: allAlerts.slice(7),
  };
};

export const AlertsView = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const grouped = groupAlerts();

  const filterAlerts = (alertList: typeof allAlerts) => {
    if (filter === 'all') return alertList;
    return alertList.filter((a) => a.severity === filter);
  };

  const handleViewDetails = (siteName: string) => {
    toast.info(`Opening details for ${siteName}`);
  };

  const renderAlertGroup = (title: string, alertList: typeof allAlerts) => {
    const filtered = filterAlerts(alertList);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          {title}
        </h2>
        <div className="space-y-3">
          {filtered.map((alert, index) => (
            <div
              key={alert.id}
              className={`glass-panel p-4 border-l-4 ${getAlertBorder(alert.severity)} animate-fade-in hover:bg-secondary/30 transition-colors`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getAlertIcon(alert.severity)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{alert.siteName}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        alert.severity === 'critical'
                          ? 'bg-reef-critical/20 text-reef-critical'
                          : alert.severity === 'warning'
                          ? 'bg-reef-warning/20 text-reef-warning'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                  onClick={() => handleViewDetails(alert.siteName)}
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Alert Center</h1>
        
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'critical', 'warning', 'info'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{allAlerts.length}</div>
          <div className="text-xs text-muted-foreground">Total Alerts</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-reef-critical">
            {allAlerts.filter((a) => a.severity === 'critical').length}
          </div>
          <div className="text-xs text-muted-foreground">Critical</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-reef-warning">
            {allAlerts.filter((a) => a.severity === 'warning').length}
          </div>
          <div className="text-xs text-muted-foreground">Warnings</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {allAlerts.filter((a) => a.severity === 'info').length}
          </div>
          <div className="text-xs text-muted-foreground">Info</div>
        </div>
      </div>

      {/* Alert Groups */}
      {renderAlertGroup('Today', grouped.today)}
      {renderAlertGroup('Yesterday', grouped.yesterday)}
      {renderAlertGroup('This Week', grouped.thisWeek)}
    </div>
  );
};
