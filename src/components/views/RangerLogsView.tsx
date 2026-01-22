import { rangerLogs } from '@/data/mockData';
import { useState } from 'react';
import { MapPin, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="w-4 h-4 text-reef-healthy" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-reef-warning" />;
    case 'critical':
      return <XCircle className="w-4 h-4 text-reef-critical" />;
    default:
      return null;
  }
};

export const RangerLogsView = () => {
  const [selectedLog, setSelectedLog] = useState(rangerLogs[0]);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left Panel - Logs List */}
      <div className="w-1/2 p-6 border-r border-primary/20 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Ranger Activity Logs</h1>
        
        <div className="space-y-4">
          {rangerLogs.map((log, index) => (
            <div
              key={log.id}
              className={`glass-panel p-4 cursor-pointer transition-all hover:border-primary/40 animate-fade-in ${
                selectedLog.id === log.id ? 'border-primary/50 bg-primary/5' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedLog(log)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: `${log.avatarColor}20`, color: log.avatarColor }}
                >
                  {log.rangerInitials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground">{log.rangerName}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{log.site}</span>
                    <span className="text-xs text-primary">({log.siteCode})</span>
                  </div>
                  
                  <p className="text-sm text-foreground/80">{log.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Map View */}
      <div className="w-1/2 relative bg-ocean-gradient">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(100, 255, 218, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Map Island Shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="30" cy="40" rx="15" ry="20" fill="rgba(34, 84, 61, 0.4)" stroke="rgba(100, 255, 218, 0.2)" strokeWidth="0.3" />
          <ellipse cx="55" cy="55" rx="12" ry="15" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
          <ellipse cx="75" cy="35" rx="10" ry="12" fill="rgba(34, 84, 61, 0.35)" stroke="rgba(100, 255, 218, 0.15)" strokeWidth="0.2" />
        </svg>

        {/* Selected Log Marker */}
        <div
          className="absolute transition-all duration-500"
          style={{
            left: `${selectedLog.coordinates.x}%`,
            top: `${selectedLog.coordinates.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 w-8 h-8 -translate-x-2 -translate-y-2 rounded-full bg-primary/20 animate-pulse-ring" />
          
          {/* Main marker */}
          <div
            className="w-4 h-4 rounded-full shadow-lg cursor-pointer"
            style={{
              backgroundColor: selectedLog.status === 'healthy' ? 'hsl(150, 100%, 50%)' :
                selectedLog.status === 'warning' ? 'hsl(45, 100%, 50%)' : 'hsl(344, 100%, 60%)',
              boxShadow: `0 0 20px ${
                selectedLog.status === 'healthy' ? 'rgba(0, 255, 136, 0.5)' :
                selectedLog.status === 'warning' ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 51, 102, 0.5)'
              }`,
            }}
          />
        </div>

        {/* Info Card */}
        <div className="absolute bottom-6 left-6 right-6 glass-panel p-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: `${selectedLog.avatarColor}20`, color: selectedLog.avatarColor }}
            >
              {selectedLog.rangerInitials}
            </div>
            <div>
              <div className="font-semibold text-foreground">{selectedLog.rangerName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedLog.timestamp}
              </div>
            </div>
          </div>
          <div className="text-sm text-foreground/80">
            <span className="text-primary">{selectedLog.site}</span> — {selectedLog.action}
          </div>
        </div>
      </div>
    </div>
  );
};
